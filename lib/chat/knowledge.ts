// Recupero della conoscenza di Roberta dal CRM tramite la knowledge API.
//
// Sostituisce il vecchio download dei PDF di listino: invece di allegare decine
// di MB di documenti a ogni messaggio, si interroga un endpoint che restituisce
// solo i pochi chunk testuali e le voci di catalogo rilevanti per la domanda.
// Il payload e' piccolo, quindi non serve cache in memoria.

export type KnowledgeChunk = {
  source: string
  categoria: string
  titolo: string
  contenuto: string
  score: number
}

export type KnowledgeCatalogoItem = {
  source: string
  categoria: string
  nome: string
  descrizione: string
  prezzo: number
  potenza_kw: number
  accumulo_kwh: number
  score: number
}

export type RobertaKnowledge = {
  query: string
  chunks: KnowledgeChunk[]
  catalogo: KnowledgeCatalogoItem[]
}

const CRM_KNOWLEDGE_URL = "https://crm.solairgroup.it/api/public/roberta-knowledge"

const LIMIT_DEFAULT = 8
const LIMIT_BROAD_SOURCE_LIST = 20

const BROAD_SOURCE_TERMS = new Set([
  "brand",
  "dimmi",
  "elenca",
  "linee",
  "marca",
  "marche",
  "prodotti",
  "proponete",
  "quali",
  "soluzioni",
  "tutti",
  "trattate",
])

const PRODUCT_SOURCE_TERMS = new Set([
  "accumuli",
  "accumulo",
  "batteria",
  "batterie",
  "inverter",
  "moduli",
  "modulo",
  "pannelli",
  "pannello",
])

function normalize(value: string) {
  return value
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
}

function tokens(value: string) {
  return Array.from(
    new Set(
      normalize(value)
        .replace(/[^a-z0-9]+/g, " ")
        .split(/\s+/)
        .filter((token) => token.length >= 3),
    ),
  )
}

function isBroadSourceListQuery(query: string) {
  const queryTokens = tokens(query)
  return queryTokens.some((token) => BROAD_SOURCE_TERMS.has(token)) &&
    queryTokens.some((token) => PRODUCT_SOURCE_TERMS.has(token))
}

export function knowledgeFormatOptionsForQuery(query: string) {
  return isBroadSourceListQuery(query)
    ? { maxChunks: 20, maxCatalogo: 8, includeSourceIndex: true }
    : { maxChunks: 4, maxCatalogo: 6 }
}

function sourceLabel(source: string, titolo: string) {
  const raw = titolo.replace(/\s+#\d+$/, "") || source.split("/").pop() || source
  return raw
    .replace(/\.(pdf|png|jpg|jpeg|webp)$/i, "")
    .replace(/_scheda$/i, "")
    .replace(/_/g, " ")
    .trim()
}

function isChunk(value: unknown): value is KnowledgeChunk {
  if (typeof value !== "object" || value === null) return false
  const c = value as Record<string, unknown>
  return typeof c.contenuto === "string" && c.contenuto.length > 0
}

function isCatalogoItem(value: unknown): value is KnowledgeCatalogoItem {
  if (typeof value !== "object" || value === null) return false
  const c = value as Record<string, unknown>
  return typeof c.nome === "string" && c.nome.length > 0
}

/**
 * Chiede al CRM i dati rilevanti per la domanda del cliente.
 *
 * Non lancia mai: se il CRM non risponde restituisce chunk e catalogo vuoti,
 * cosi' la chat prosegue (Roberta dira' che per i dettagli serve un consulente)
 * invece di interrompersi. L'errore viene loggato lato server.
 */
export async function getRobertaKnowledge(
  query: string,
  limit: number = isBroadSourceListQuery(query) ? LIMIT_BROAD_SOURCE_LIST : LIMIT_DEFAULT,
): Promise<RobertaKnowledge> {
  const vuoto: RobertaKnowledge = { query, chunks: [], catalogo: [] }

  const key = process.env.LISTINO_READ_KEY
  if (!key) {
    console.error("[chat/knowledge] LISTINO_READ_KEY non configurata")
    return vuoto
  }

  const q = query.trim()
  if (!q) return vuoto

  const url = `${CRM_KNOWLEDGE_URL}?q=${encodeURIComponent(q)}&limit=${limit}`

  try {
    const res = await fetch(url, {
      headers: { Authorization: `Bearer ${key}` },
      cache: "no-store",
    })

    if (!res.ok) {
      throw new Error(`il CRM ha risposto ${res.status}`)
    }

    const body: unknown = await res.json()
    const chunksGrezzi = (body as { chunks?: unknown })?.chunks
    const catalogoGrezzo = (body as { catalogo?: unknown })?.catalogo

    return {
      query: q,
      chunks: Array.isArray(chunksGrezzi) ? chunksGrezzi.filter(isChunk) : [],
      catalogo: Array.isArray(catalogoGrezzo) ? catalogoGrezzo.filter(isCatalogoItem) : [],
    }
  } catch (error) {
    const message = error instanceof Error ? error.message : "errore sconosciuto"
    console.error(`[chat/knowledge] recupero knowledge fallito: ${message}`)
    return vuoto
  }
}

/**
 * Formatta chunk e catalogo in testo leggibile da inserire nel contesto del
 * modello. Restituisce stringa vuota se non c'e' nulla di rilevante.
 *
 * Per contenere la dimensione del prompt si tengono solo i primi `maxChunks`
 * chunk e le prime `maxCatalogo` voci di catalogo (gia' ordinati per rilevanza
 * dal CRM).
 */
export function formattaKnowledge(
  knowledge: RobertaKnowledge,
  {
    maxChunks = 4,
    maxCatalogo = 6,
    includeSourceIndex = false,
  }: { maxChunks?: number; maxCatalogo?: number; includeSourceIndex?: boolean } = {},
): string {
  const parti: string[] = []

  const chunks = knowledge.chunks.slice(0, maxChunks)
  const catalogo = knowledge.catalogo.slice(0, maxCatalogo)

  if (includeSourceIndex && knowledge.chunks.length > 0) {
    const labels = new Map<string, string>()
    for (const chunk of knowledge.chunks) {
      if (chunk.source.toLowerCase().startsWith("listini/")) continue
      if (!labels.has(chunk.source)) labels.set(chunk.source, sourceLabel(chunk.source, chunk.titolo))
    }
    if (labels.size > 0) {
      parti.push(
        `SCHEDE / LINEE DISPONIBILI (usa questo come elenco completo, senza citare nomi file):\n${Array.from(labels.values()).map((label) => `- ${label}`).join("\n")}`,
      )
    }
  }

  if (chunks.length > 0) {
    const righe = chunks
      .map((c) => {
        const intestazione = [c.categoria, c.titolo].filter(Boolean).join(" — ")
        return intestazione ? `- [${intestazione}] ${c.contenuto}` : `- ${c.contenuto}`
      })
      .join("\n")
    parti.push(`INFORMAZIONI RILEVANTI:\n${righe}`)
  }

  if (catalogo.length > 0) {
    const righe = catalogo
      .map((v) => {
        const dettagli: string[] = []
        if (Number.isFinite(v.potenza_kw) && v.potenza_kw > 0) dettagli.push(`${v.potenza_kw} kW`)
        if (Number.isFinite(v.accumulo_kwh) && v.accumulo_kwh > 0)
          dettagli.push(`accumulo ${v.accumulo_kwh} kWh`)
        if (Number.isFinite(v.prezzo) && v.prezzo > 0)
          dettagli.push(`prezzo ${v.prezzo.toLocaleString("it-IT")} € IVA inclusa`)
        const spec = dettagli.length ? ` (${dettagli.join(", ")})` : ""
        const desc = v.descrizione ? ` — ${v.descrizione}` : ""
        return `- ${v.nome}${spec}${desc}`
      })
      .join("\n")
    parti.push(`CATALOGO / LISTINO:\n${righe}`)
  }

  return parti.join("\n\n")
}
