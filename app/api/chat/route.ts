import Anthropic from "@anthropic-ai/sdk"
import { NextResponse } from "next/server"
import { getDocumentiListino, type DocumentoListino } from "@/lib/chat/listino"
import { chatTools, eseguiTool } from "@/lib/chat/tools"

export const dynamic = "force-dynamic"

// I PDF vengono maneggiati in base64: serve il runtime Node.
export const runtime = "nodejs"

// Scaricare i listini dal CRM costa qualche secondo e Claude legge documenti
// pesanti: il default di 10s sta stretto, soprattutto al primo messaggio quando
// la cache e' fredda.
export const maxDuration = 60

const MODELLO = "claude-sonnet-5"

// Roberta chiama al massimo due strumenti per turno; il tetto serve solo a non
// lasciare aperto un loop se il modello continua a richiedere tool.
const MAX_ITERAZIONI_TOOL = 6

type ChatMessage = {
  role: "user" | "assistant"
  content: string
}

const SISTEMA_BASE = `Sei Roberta, assistente virtuale di Solair Group (azienda di impianti fotovoltaici). Rispondi in modo naturale e cordiale a qualunque cosa ti scrivano, anche se fuori tema: sei una persona vera nella conversazione, non un albero di risposte fisse.

Hai accesso ai documenti reali di Solair (listini, offerte, schede tecniche) allegati qui sotto. Usa SOLO queste informazioni per parlare di prezzi e prodotti: non inventare mai un prezzo che non è scritto nei documenti. Se un dato non c'è, dillo con semplicità e proponi di far ricontattare il cliente da un consulente.

Non promettere mai un orario specifico per un sopralluogo. Quando il cliente è pronto per il passo successivo, usa lo strumento richiedi_contatto_umano e digli che un consulente lo ricontatterà a breve.

Quando hai raccolto nome e almeno un contatto (telefono o email), usa lo strumento crea_lead per salvarlo. Il salvataggio richiede sempre il numero di telefono: se hai solo l'email, chiedi con garbo anche il telefono prima di salvare.

Scrivi in italiano, con messaggi brevi da chat: una o due frasi per volta, senza elenchi puntati se non servono davvero. Non nominare mai al cliente i sistemi interni (CRM, strumenti, database) né eventuali problemi tecnici: parla solo di quello che gli serve sapere.`

const SENZA_DOCUMENTI = `

ATTENZIONE: in questo momento i documenti Solair non sono disponibili. Non citare prezzi, potenze o condizioni commerciali di nessun tipo: spiega che per i dettagli economici serve un consulente e usa richiedi_contatto_umano.`

function isChatMessage(value: unknown): value is ChatMessage {
  if (typeof value !== "object" || value === null) return false
  const m = value as Record<string, unknown>
  return (m.role === "user" || m.role === "assistant") && typeof m.content === "string"
}

/**
 * I documenti diventano content block PDF nel primo messaggio user, prima del
 * testo. Il cache_control sull'ultimo congela il prefisso (tools + system +
 * documenti) in cache: i messaggi successivi della stessa conversazione non
 * ripagano l'intero listino.
 */
function bloccoDocumenti(documenti: DocumentoListino[]): Anthropic.ContentBlockParam[] {
  return documenti.map((doc, i) => ({
    type: "document",
    title: doc.nome,
    context: `Cartella Solair: ${doc.cartella}`,
    source: {
      type: "base64",
      media_type: "application/pdf",
      data: doc.contenuto_base64,
    },
    ...(i === documenti.length - 1 ? { cache_control: { type: "ephemeral" as const } } : {}),
  }))
}

function costruisciConversazione(
  storico: ChatMessage[],
  documenti: DocumentoListino[],
): Anthropic.MessageParam[] {
  const conversazione: Anthropic.MessageParam[] = storico.map((m) => ({
    role: m.role,
    content: m.content,
  }))

  const primo = conversazione[0]
  if (documenti.length === 0 || primo === undefined || primo.role !== "user") {
    return conversazione
  }

  conversazione[0] = {
    role: "user",
    content: [
      ...bloccoDocumenti(documenti),
      { type: "text", text: typeof primo.content === "string" ? primo.content : "" },
    ],
  }

  return conversazione
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
    // Se il CRM non risponde si continua senza documenti: la conversazione
    // degrada, non si blocca (l'errore e' gia' loggato dentro il modulo).
    const documenti = await getDocumentiListino()
    if (documenti.length === 0) {
      console.warn("[chat] nessun documento di listino disponibile: proseguo senza allegati")
    }

    const client = new Anthropic()
    const conversazione = costruisciConversazione(storico, documenti)

    const parametri = {
      model: MODELLO,
      max_tokens: 8192,
      // Il thinking adattivo e' anche il default su Sonnet 5; lasciarlo attivo
      // mantiene affidabile la scelta degli strumenti.
      thinking: { type: "adaptive" as const },
      output_config: { effort: "medium" as const },
      system: SISTEMA_BASE + (documenti.length === 0 ? SENZA_DOCUMENTI : ""),
      tools: chatTools,
    }

    let risposta = await client.messages.create({ ...parametri, messages: conversazione })

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
      risposta = await client.messages.create({ ...parametri, messages: conversazione })
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
