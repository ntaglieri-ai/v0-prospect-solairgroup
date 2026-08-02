import Anthropic from "@anthropic-ai/sdk"
import { NextResponse } from "next/server"
import { getRobertaKnowledge, formattaKnowledge } from "@/lib/chat/knowledge"
import { chatTools, eseguiTool } from "@/lib/chat/tools"

export const dynamic = "force-dynamic"

export const runtime = "nodejs"

// La knowledge API e' leggera, ma il modello con thinking puo' impiegare
// qualche secondo: si tiene un margine comodo rispetto al default di 10s.
export const maxDuration = 60

// Modelli configurabili via env, con default sensati. Se il primario fallisce
// si riprova una volta col fallback.
const MODELLO = process.env.ROBERTA_CHAT_MODEL || "claude-sonnet-5"
const MODELLO_FALLBACK = process.env.ROBERTA_FALLBACK_MODEL || "claude-sonnet-4-5"

// Roberta chiama al massimo due strumenti per turno; il tetto serve solo a non
// lasciare aperto un loop se il modello continua a richiedere tool.
const MAX_ITERAZIONI_TOOL = 6

type ChatMessage = {
  role: "user" | "assistant"
  content: string
}

const SISTEMA_BASE = `Sei Roberta, assistente virtuale di Solair Group (azienda di impianti fotovoltaici). Rispondi in modo naturale e cordiale a qualunque cosa ti scrivano, anche se fuori tema: sei una persona vera nella conversazione, non un albero di risposte fisse.

Per prezzi, offerte, listini e prodotti usa SOLO le informazioni che trovi nella sezione "CONOSCENZA SOLAIR" qui sotto (informazioni rilevanti e catalogo). Non inventare mai un prezzo, una potenza o una condizione commerciale che non sia scritta lì. Se il dato che serve non c'è, dillo con semplicità e proponi di far ricontattare il cliente da un consulente.

Non promettere mai un orario specifico per un sopralluogo e non prenotare appuntamenti da sola. Quando il cliente è pronto per il passo successivo, usa lo strumento richiedi_contatto_umano e digli che un consulente lo ricontatterà a breve.

Chiedi nome e telefono solo se il cliente vuole essere ricontattato. Quando hai raccolto nome e almeno un contatto, usa lo strumento crea_lead per salvarlo: il salvataggio richiede sempre il numero di telefono, quindi se hai solo l'email chiedi con garbo anche il telefono prima di salvare.

Scrivi in italiano, con messaggi brevi da chat: una o due frasi per volta, senza elenchi puntati se non servono davvero. Non nominare mai al cliente i sistemi interni (CRM, database, strumenti, API o simili) né eventuali problemi tecnici: parla solo di quello che gli serve sapere.`

function isChatMessage(value: unknown): value is ChatMessage {
  if (typeof value !== "object" || value === null) return false
  const m = value as Record<string, unknown>
  return (m.role === "user" || m.role === "assistant") && typeof m.content === "string"
}

function ultimoMessaggioUtente(storico: ChatMessage[]): string {
  for (let i = storico.length - 1; i >= 0; i--) {
    if (storico[i].role === "user") return storico[i].content
  }
  return ""
}

function testoDellaRisposta(message: Anthropic.Message): string {
  return message.content
    .filter((block): block is Anthropic.TextBlock => block.type === "text")
    .map((block) => block.text)
    .join("\n")
    .trim()
}

export async function POST(request: Request) {
  let storico: ChatMessage[]
  try {
    const body = await request.json()
    const grezzi: unknown[] = Array.isArray(body?.messages) ? body.messages : []
    storico = grezzi.filter(isChatMessage)
  } catch {
    return NextResponse.json({ error: "Richiesta non valida" }, { status: 400 })
  }

  if (storico.length === 0) {
    return NextResponse.json({ error: "Nessun messaggio da elaborare" }, { status: 400 })
  }

  if (!process.env.ANTHROPIC_API_KEY) {
    console.error("[chat] ANTHROPIC_API_KEY non configurata")
    return NextResponse.json(
      {
        error: "Chat non configurata",
        message: {
          role: "assistant",
          content: "Sono momentaneamente offline. Riprova tra poco, oppure scrivici dal form contatti.",
        },
      },
      { status: 503 },
    )
  }

  try {
    // Si interroga la knowledge API solo con l'ultima domanda del cliente: il
    // payload e' piccolo e mirato, niente piu' download dei PDF di listino.
    const knowledge = await getRobertaKnowledge(ultimoMessaggioUtente(storico))
    const contesto = formattaKnowledge(knowledge)
    if (!contesto) {
      console.warn("[chat] knowledge vuota per la domanda corrente: proseguo senza contesto")
    }

    const client = new Anthropic()
    const conversazione: Anthropic.MessageParam[] = storico.map((m) => ({
      role: m.role,
      content: m.content,
    }))

    const system = contesto
      ? `${SISTEMA_BASE}\n\n--- CONOSCENZA SOLAIR (usala per prezzi e prodotti) ---\n${contesto}`
      : `${SISTEMA_BASE}\n\nATTENZIONE: in questo momento non hai informazioni di listino sulla domanda corrente. Non citare prezzi o condizioni commerciali: spiega che per i dettagli economici serve un consulente e usa richiedi_contatto_umano.`

    const parametriBase = {
      max_tokens: 8192,
      // Il thinking adattivo e' anche il default su Sonnet 5; lasciarlo attivo
      // mantiene affidabile la scelta degli strumenti.
      thinking: { type: "adaptive" as const },
      output_config: { effort: "medium" as const },
      system,
      tools: chatTools,
    }

    // Prima chiamata: prova col modello primario, ricadi sul fallback se fallisce.
    let modelloAttivo = MODELLO
    let risposta: Anthropic.Message
    try {
      risposta = await client.messages.create({
        ...parametriBase,
        model: modelloAttivo,
        messages: conversazione,
      })
    } catch (errorePrimario) {
      const msg = errorePrimario instanceof Error ? errorePrimario.message : "errore sconosciuto"
      console.error(`[chat] modello primario "${MODELLO}" fallito: ${msg}. Riprovo col fallback.`)
      modelloAttivo = MODELLO_FALLBACK
      risposta = await client.messages.create({
        ...parametriBase,
        model: modelloAttivo,
        messages: conversazione,
      })
    }

    for (let i = 0; i < MAX_ITERAZIONI_TOOL && risposta.stop_reason === "tool_use"; i++) {
      const chiamate = risposta.content.filter(
        (block): block is Anthropic.ToolUseBlock => block.type === "tool_use",
      )

      // Va rimandato indietro l'intero content, blocchi di thinking compresi.
      conversazione.push({ role: "assistant", content: risposta.content })

      const risultati: Anthropic.ToolResultBlockParam[] = await Promise.all(
        chiamate.map(async (chiamata) => {
          const esito = await eseguiTool(chiamata.name, chiamata.input)
          return {
            type: "tool_result" as const,
            tool_use_id: chiamata.id,
            content: esito.content,
            is_error: esito.isError,
          }
        }),
      )

      conversazione.push({ role: "user", content: risultati })
      risposta = await client.messages.create({
        ...parametriBase,
        model: modelloAttivo,
        messages: conversazione,
      })
    }

    if (risposta.stop_reason === "tool_use") {
      console.error(`[chat] raggiunto il tetto di ${MAX_ITERAZIONI_TOOL} iterazioni di tool use`)
    }

    const contenuto =
      risposta.stop_reason === "refusal"
        ? "Su questo argomento preferisco non rispondere. Posso aiutarti su impianti fotovoltaici, preventivi e sopralluoghi."
        : testoDellaRisposta(risposta) ||
          "Scusa, non sono riuscita a completare la risposta. Puoi ripetermi la domanda?"

    const message: ChatMessage = { role: "assistant", content: contenuto }
    return NextResponse.json({ message })
  } catch (error) {
    const message = error instanceof Error ? error.message : "errore sconosciuto"
    console.error(`[chat] ${message}`)
    return NextResponse.json(
      {
        error: "Errore durante la generazione della risposta",
        message: {
          role: "assistant",
          content: "Ho avuto un problema tecnico. Riprova tra un attimo.",
        },
      },
      { status: 500 },
    )
  }
}
