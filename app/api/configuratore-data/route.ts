export const dynamic = 'force-dynamic';

import { NextResponse } from 'next/server'
import { getPrezzi, getDBTable, getSettings, getLinee } from '@/lib/sanity-queries'

export const revalidate = 3600 // Cache for 1 hour

export async function GET() {
  try {
    const [prezzi, dbTable, settings, linee] = await Promise.all([
      getPrezzi(),
      getDBTable(),
      getSettings(),
      getLinee(),
    ])

    // Build KWH_OPTIONS from prezzi
    const kwhOptions: Record<string, number[]> = {}
    for (const linea of Object.keys(prezzi)) {
      const firstKwp = Object.keys(prezzi[linea])[0]
      if (firstKwp) {
        kwhOptions[linea] = Object.keys(prezzi[linea][Number(firstKwp)]).map(Number)
      }
    }

    // Build ZAVORRE_COSTO from settings
    const zavorreCosto = {
      piano: 0,
      falde: settings?.costoZavorreFalde ?? 100,
      vento: settings?.costoZavorreVento ?? 150,
    }

    return NextResponse.json({
      prezzi,
      kwhOptions,
      zavorreCosto,
      dbTable: dbTable.table,
      tan: dbTable.tan,
      whatsapp: settings?.whatsapp ?? '393497988101',
      trustBar: settings?.trustBar ?? [],
      pannelli: settings?.pannelli ?? [],
      linee,
    })
  } catch (error) {
    console.error('Error fetching configuratore data:', error)
    // Return fallback data on error
    return NextResponse.json({
      prezzi: null,
      kwhOptions: null,
      zavorreCosto: null,
      dbTable: null,
      tan: 6.9,
      whatsapp: '393497988101',
      trustBar: [],
      pannelli: [],
      linee: [],
      error: 'Failed to fetch data from Sanity',
    })
  }
}
