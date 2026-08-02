// Recupero dei documenti di listino dal CRM, con cache in memoria di processo.
//
// I PDF cambiano raramente ma sono pesanti (decine di MB in base64) e la
// chiamata al CRM costa alcuni secondi: senza cache ogni messaggio della stessa
// conversazione la ripeterebbe. La cache vive nel processo serverless, quindi
// non e' condivisa fra istanze — va bene, e' un'ottimizzazione, non una fonte
// di verita'.

export type DocumentoListino = {
  nome: string
  cartella: string
  contenuto_base64: string
}

const CRM_LISTINO_URL = "https://crm.solairgroup.it/api/public/listino"

const TTL_MS = 10 * 60 * 1000

// L'API Anthropic rifiuta richieste oltre i 32MB. I documenti non sono l'unica
// cosa nel body, quindi ci si ferma prima e si scartano gli eccedenti (loggati).
const MAX_BASE64_BYTES = 26 * 1024 * 1024

type CacheEntry = {
  documenti: DocumentoListino[]
  fetchedAt: number
}

const cache = new Map<string, CacheEntry>()
const CACHE_KEY = "listino"

// Se due messaggi arrivano insieme a cache scaduta, la seconda richiesta
// aspetta la prima invece di scaricare di nuovo tutti i PDF.
let inFlight: Promise<DocumentoListino[]> | null = null

function isDocumento(value: unknown): value is DocumentoListino {
  if (typeof value !== "object" || value === null) return false
  const doc = value as Record<string, unknown>
  return (
    typeof doc.nome === "string" &&
    typeof doc.cartella === "string" &&
    typeof doc.contenuto_base64 === "string" &&
    doc.contenuto_base64.length > 0
  )
}

function entroBudget(documenti: DocumentoListino[]): DocumentoListino[] {
  const tenuti: DocumentoListino[] = []
  let totale = 0

  for (const doc of documenti) {
    const peso = doc.contenuto_base64.length
    if (totale + peso > MAX_BASE64_BYTES) {
      console.warn(
        `[chat/listino] "${doc.nome}" scartato: superato il budget di ${MAX_BASE64_BYTES} byte base64`,
      )
      continue
    }
    tenuti.push(doc)
    totale += peso
  }

  return tenuti
}

async function scaricaDocumenti(): Promise<DocumentoListino[]> {
  const key = process.env.LISTINO_READ_KEY
  if (!key) {
    console.error("[chat/listino] LISTINO_READ_KEY non configurata")
    return []
  }

  const res = await fetch(CRM_LISTINO_URL, {
    headers: { Authorization: `Bearer ${key}` },
    cache: "no-store",
  })

  if (!res.ok) {
    throw new Error(`il CRM ha risposto ${res.status}`)
  }

  const body: unknown = await res.json()
  const grezzi = (body as { documenti?: unknown })?.documenti
  const documenti = Array.isArray(grezzi) ? grezzi.filter(isDocumento) : []

  return entroBudget(documenti)
}

/**
 * Documenti di listino da allegare alla conversazione.
 *
 * Non lancia mai: se il CRM non risponde restituisce l'ultima copia in cache
 * (anche scaduta) o un array vuoto, cosi' la chat continua senza documenti
 * invece di interrompersi. L'errore viene loggato lato server.
 */
export async function getDocumentiListino(): Promise<DocumentoListino[]> {
  const cached = cache.get(CACHE_KEY)
  if (cached && Date.now() - cached.fetchedAt < TTL_MS) {
    return cached.documenti
  }

  const richiesta =
    inFlight ??
    scaricaDocumenti()
      .then((documenti) => {
        cache.set(CACHE_KEY, { documenti, fetchedAt: Date.now() })
        return documenti
      })
      .catch((error: unknown) => {
        const message = error instanceof Error ? error.message : "errore sconosciuto"
        console.error(`[chat/listino] recupero listini fallito: ${message}`)
        // Meglio dei documenti vecchi che nessun documento.
        return cached?.documenti ?? []
      })
      .finally(() => {
        inFlight = null
      })

  inFlight = richiesta
  return richiesta
}
