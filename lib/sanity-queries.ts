// lib/sanity-queries.ts
// Query GROQ da usare nel frontend Next.js per leggere i dati dal CMS

import { client } from './sanity' // il tuo client Sanity configurato

// ── LINEE ──
export async function getLinee() {
  return client.fetch(`
    *[_type == "linea"] | order(ordine asc) {
      linea, ordine, livello, nome, brand,
      consigliata, badgeLabel,
      features, tags
    }
  `, {}, { cache: 'no-store' })
}

// ── LISTINO PREZZI ──
// Restituisce la struttura PREZZI[linea][kwp][kwh] = prezzo
export async function getPrezzi() {
  const raw = await client.fetch(`
    *[_type == "priceList"] {
      linea,
      righe[] { kwp, prezzi[] { kwh, prezzo } }
    }
  `, {}, { cache: 'no-store' })

  const PREZZI: Record<string, Record<number, Record<number, number>>> = {}
  for (const pl of raw) {
    PREZZI[pl.linea] = {}
    for (const riga of pl.righe ?? []) {
      PREZZI[pl.linea][riga.kwp] = {}
      for (const cella of riga.prezzi ?? []) {
        PREZZI[pl.linea][riga.kwp][cella.kwh] = cella.prezzo
      }
    }
  }
  return PREZZI
}

// ── TABELLA FINANZIAMENTO ATTIVA ──
// Restituisce la stessa struttura DB_TABLE usata nel configuratore HTML
export async function getDBTable() {
  const raw = await client.fetch(`
    *[_type == "finanziamentoTable" && attiva == true][0] {
      tan,
      righe[] { importo, nRate, rata, taeg }
    }
  `, {}, { cache: 'no-store' })

  if (!raw) return { tan: 6.9, table: [] }

  return {
    tan: raw.tan,
    table: (raw.righe ?? []).map((r: any) => [r.importo, r.nRate, r.rata, r.taeg]) as [number, number, number, number][],
  }
}

// ── IMPOSTAZIONI ──
export async function getSettings() {
  return client.fetch(`
    *[_type == "configuratoreSettings"][0] {
      whatsapp,
      trustBar,
      costoZavorreFalde,
      costoZavorreVento,
      pannelli
    }
  `, {}, { cache: 'no-store' })
}
