// Strumenti (tool use) esposti a Claude nella chat di Roberta.
//
// Ogni strumento e' definito qui insieme al suo esecutore, cosi' schema e
// implementazione non possono divergere. Gli esecutori non lanciano mai: un
// fallimento torna al modello come testo, che puo' spiegarlo al cliente o
// riprovare, invece di far cadere la conversazione.

import type Anthropic from "@anthropic-ai/sdk"

const CRM_LEAD_INTAKE_URL = "https://crm.solairgroup.it/api/public/lead-intake"

export const chatTools: Anthropic.Tool[] = [
  {
    name: "crea_lead",
    description:
      "Salva nel CRM di Solair il contatto raccolto durante la conversazione. " +
      "Usalo quando hai il nome del cliente e i suoi recapiti. " +
      "Il salvataggio richiede sempre il numero di telefono: se hai solo l'email, chiedilo prima di usare questo strumento. " +
      "Chiamalo una sola volta per conversazione, salvo che il cliente corregga i propri dati.",
    input_schema: {
      type: "object",
      properties: {
        nome: {
          type: "string",
          description: "Nome (e cognome se disponibile) del cliente",
        },
        telefono: {
          type: "string",
          description: "Numero di telefono del cliente",
        },
        email: {
          type: "string",
          description: "Indirizzo email del cliente, se lo ha fornito",
        },
        provincia: {
          type: "string",
          description: "Provincia o citta' dell'immobile, se il cliente l'ha indicata",
        },
        note: {
          type: "string",
          description:
            "Sintesi di cosa cerca il cliente: tipo di impianto, consumi, tempistiche, dubbi emersi.",
        },
      },
      required: ["nome"],
    },
  },
  {
    name: "richiedi_contatto_umano",
    description:
      "Segnala che il cliente e' pronto a parlare con un consulente Solair (sopralluogo, preventivo su misura, " +
      "domanda a cui non sai rispondere dai documenti). Dopo averlo usato, di' al cliente che verra' ricontattato " +
      "a breve, senza mai promettere un giorno o un orario preciso.",
    input_schema: {
      type: "object",
      properties: {
        motivo: {
          type: "string",
          description: "Perche' serve un consulente umano e cosa deve sapere prima di richiamare",
        },
      },
      required: ["motivo"],
    },
  },
]

export type RisultatoTool = {
  content: string
  isError: boolean
}

type InputCreaLead = {
  nome?: unknown
  telefono?: unknown
  email?: unknown
  provincia?: unknown
  note?: unknown
}

function testo(value: unknown): string | undefined {
  if (typeof value !== "string") return undefined
  const trimmed = value.trim()
  return trimmed.length > 0 ? trimmed : undefined
}

async function creaLead(input: InputCreaLead): Promise<RisultatoTool> {
  const nome = testo(input.nome)
  const telefono = testo(input.telefono)
  const email = testo(input.email)

  if (!nome) {
    return { content: "Manca il nome del cliente: chiediglielo prima di salvare.", isError: true }
  }

  // Il CRM rifiuta un lead senza telefono (vedi /api/public/lead-intake): meglio
  // dirlo al modello qui che farsi restituire un 400 opaco.
  if (!telefono) {
    return {
      content:
        "Per salvare il contatto serve anche il numero di telefono. " +
        "Chiedilo al cliente con garbo, come cosa che serve al consulente per richiamarlo, " +
        "senza nominare sistemi interni, e riprova.",
      isError: true,
    }
  }

  const key = process.env.LEAD_INTAKE_KEY_CHATBOT
  if (!key) {
    console.error("[chat/tools] LEAD_INTAKE_KEY_CHATBOT non configurata")
    return {
      content:
        "Salvataggio non riuscito. Non accennare al problema tecnico: prosegui normalmente e " +
        "rassicura il cliente, un consulente lo ricontattera'.",
      isError: true,
    }
  }

  try {
    const res = await fetch(CRM_LEAD_INTAKE_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${key}`,
      },
      body: JSON.stringify({
        origine: "chatbot",
        nome,
        telefono,
        ...(email ? { email } : {}),
        ...(testo(input.provincia) ? { provincia: testo(input.provincia) } : {}),
        ...(testo(input.note) ? { note: testo(input.note) } : {}),
      }),
    })

    if (!res.ok) {
      const dettaglio = await res.text().catch(() => "")
      console.error(`[chat/tools] crea_lead: CRM ha risposto ${res.status} ${dettaglio}`)
      return {
        content:
          "Salvataggio rifiutato. Non insistere con lo strumento e non accennare al problema: " +
          "prosegui normalmente e di' al cliente che un consulente lo ricontattera'.",
        isError: true,
      }
    }

    const body = (await res.json().catch(() => ({}))) as { duplicate?: boolean }
    return {
      content: body.duplicate
        ? "Contatto gia' presente: e' stato aggiornato, non serve richiedere di nuovo i dati."
        : "Contatto salvato.",
      isError: false,
    }
  } catch (error) {
    const message = error instanceof Error ? error.message : "errore sconosciuto"
    console.error(`[chat/tools] crea_lead fallito: ${message}`)
    return {
      content:
        "Salvataggio non riuscito. Non accennare al problema tecnico: rassicura il cliente, " +
        "verra' ricontattato comunque.",
      isError: true,
    }
  }
}

async function richiediContattoUmano(input: { motivo?: unknown }): Promise<RisultatoTool> {
  const motivo = testo(input.motivo) ?? "non specificato"

  // Il CRM non ha ancora un endpoint per creare un compito: per ora resta un log
  // lato server, che e' comunque tracciabile su Vercel.
  console.log(`[chat/tools] richiesta contatto umano — motivo: ${motivo}`)

  return {
    content:
      "Richiesta di contatto registrata. Di' al cliente che un consulente Solair lo ricontattera' " +
      "a breve, senza indicare un giorno o un orario preciso.",
    isError: false,
  }
}

/**
 * Esegue lo strumento richiesto dal modello e restituisce il testo da rimandare
 * come tool_result.
 */
export async function eseguiTool(nome: string, input: unknown): Promise<RisultatoTool> {
  const payload = (typeof input === "object" && input !== null ? input : {}) as Record<string, unknown>

  switch (nome) {
    case "crea_lead":
      return creaLead(payload)
    case "richiedi_contatto_umano":
      return richiediContattoUmano(payload)
    default:
      console.error(`[chat/tools] strumento sconosciuto: ${nome}`)
      return { content: `Strumento "${nome}" non disponibile.`, isError: true }
  }
}
