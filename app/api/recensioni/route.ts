import { NextResponse } from 'next/server'
import { getRecensioni } from '@/lib/sanity-queries'

export const dynamic = 'force-dynamic'

export async function GET() {
  try {
    const recensioni = await getRecensioni()
    return NextResponse.json(recensioni)
  } catch (error) {
    console.error('Errore fetch recensioni:', error)
    return NextResponse.json([], { status: 500 })
  }
}
