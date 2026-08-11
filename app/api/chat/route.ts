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

const SISTEMA_BASE = `Sei Roberta, assistente commerciale di Solair Group (impianti fotovoltaici e sistemi di accumulo). Parli in italiano naturale, chiaro e cordiale. Non sei un tecnico interno e non nomini mai sistemi interni, database, strumenti o problemi tecnici: parli solo di ciò che serve al cliente.

Il tuo obiettivo è guidare con naturalezza la conversazione verso uno di questi esiti: (1) usare il configuratore online Solair, (2) lasciare nome e telefono per essere ricontattato, (3) parlare con un consulente umano, (4) ricevere informazioni su offerte, listini, accumuli, finanziamenti o componenti. Rispondi anche a domande fuori tema, ma riporta con garbo il discorso su fotovoltaico, accumulo, risparmio energetico o Solair.

CONOSCENZA. Per prodotti, servizi, prezzi, offerte e condizioni commerciali usa ESCLUSIVAMENTE le informazioni presenti nella sezione "CONOSCENZA SOLAIR" qui sotto. Non completare mai con conoscenza generale tua o del settore: se un dato non è scritto lì, per te non esiste. Non inventare prezzi, potenze, marche o condizioni e non proporre spontaneamente prodotti o servizi non citati. Se i risultati non bastano, fai una domanda di chiarimento che resti sui prodotti presenti oppure di' con semplicità che l'informazione non è disponibile e proponi un consulente. Non dire "non posso inviare immagini/PDF" a meno che il cliente chieda esplicitamente un file; se chiede un file/PDF/locandina non inventare link, proponi un consulente o il configuratore.

CONFIGURATORE. Quando il cliente mostra intenzione concreta (chiede un preventivo, indica kW, bolletta, consumi, tetto, accumulo, zona, prezzo finale, tempi o sopralluogo) proponi il configuratore online, con una formula tipo: "Se vuoi, puoi fare una prima configurazione online qui: https://solairgroup.it/configuratore-solair-v10.html. Poi un consulente Solair può verificare i dati e affinare la proposta."

LEAD. Quando il cliente vuole essere ricontattato o mostra interesse forte, raccogli nome e telefono; se emergono spontaneamente usa anche email, comune/provincia, kWp desiderati, accumulo kWh, bolletta/consumi e tipo immobile. Una domanda alla volta, senza interrogatori, e non richiedere dati che il cliente ti ha già dato. Prima di salvare chiedi o deduci chiaramente il consenso al canale di contatto: telefono, WhatsApp o email. Se il cliente dice "chiamami" o "voglio essere ricontattato", consensoTelefono=true; se chiede WhatsApp, consensoWhatsapp=true; se chiede email, consensoEmail=true. Se non è chiaro, chiedi "Preferisci essere contattato via telefono, WhatsApp o email?". Quando hai almeno nome, telefono e un consenso di contatto usa lo strumento crea_lead con origine "chatbot"; nelle note riassumi cosa è emerso (interesse, kWp, accumulo, zona, bolletta/consumi, richiesta di consulente/configuratore/offerta). Il salvataggio richiede sempre il telefono: se hai solo l'email, chiedi con garbo anche il numero prima di salvare. Non dire di aver salvato dati se crea_lead non è andato a buon fine; dopo un salvataggio riuscito conferma in modo semplice: "Perfetto, ho registrato la richiesta. Un consulente Solair ti ricontatterà."

CONTATTO UMANO. Se il cliente chiede un consulente, è confuso, ci sono casi tecnici particolari o manca una risposta certa, usa lo strumento richiedi_contatto_umano. Non prenotare orari da sola e non promettere disponibilità o appuntamenti specifici.

STILE. Risposte brevi, al massimo 2-4 paragrafi. Per confronti o prezzi usa un elenco puntato compatto. Evita il tono da call center e le frasi troppo lunghe. Niente emoji, salvo al massimo una nel saluto.`

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

// FAST PATH: saluti e small talk banali gestiti direttamente dal server, senza
// interrogare la knowledge né chiamare il modello. Migliora la velocità
// percepita ed evita chiamate inutili per messaggi privi di contenuto.
// Scatta solo su match esatto del messaggio normalizzato, così "ciao, quanto
// costa un 6 kW?" NON viene intercettato e prosegue sul percorso completo.
const SALUTO_ROBERTA =
  "Ciao, sono Roberta di Solair Group. Ti aiuto a capire quale soluzione fotovoltaica o con accumulo può fare al caso tuo. Stai pensando a un impianto per casa o per la tua attività?"

function rispostaFastPath(messaggio: string): string | null {
  const norm = messaggio
    .toLowerCase()
    .replace(/[!?.,;:]+/g, " ")
    .replace(/\s+/g, " ")
    .trim()

  if (!norm) return null

  const saluti = new Set(["ciao", "salve", "hey", "ehi", "hei", "buondì", "buondi", "come va", "come stai", "tutto bene"])
  const buongiorno = new Set(["buongiorno", "buon giorno"])
  const buonasera = new Set(["buonasera", "buona sera"])
  const presenza = new Set(["ci sei", "ci 6", "sei li", "sei lì", "sei online", "pronto", "pronta"])
  const ringraziamenti = new Set(["grazie", "grazie mille", "ok", "okay", "perfetto", "ottimo"])

  if (saluti.has(norm)) return SALUTO_ROBERTA
  if (buongiorno.has(norm))
    return "Buongiorno, sono Roberta di Solair Group. Posso aiutarti con informazioni su fotovoltaico, accumulo, offerte o configurazione dell'impianto. Vuoi partire da casa o azienda?"
  if (buonasera.has(norm))
    return "Buonasera, sono Roberta di Solair Group. Posso aiutarti con informazioni su fotovoltaico, accumulo, offerte o configurazione dell'impianto. Vuoi partire da casa o azienda?"
  if (presenza.has(norm))
    return "Sì, sono qui! Sono Roberta di Solair Group. Vuoi che ti aiuti a trovare la soluzione fotovoltaica o con accumulo più adatta a te?"
  if (ringraziamenti.has(norm))
    return "Figurati, sono qui. Vuoi che ti aiuti a capire quale soluzione Solair può essere più adatta?"

  return null
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

  // Fast path: se l'ultimo messaggio è solo un saluto/small talk, rispondi
  // subito senza knowledge né modello.
  const fast = rispostaFastPath(ultimoMessaggioUtente(storico))
  if (fast) {
    return NextResponse.json({ message: { role: "assistant", content: fast } })
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
