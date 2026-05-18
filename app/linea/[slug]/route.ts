import { NextResponse } from 'next/server'

const PROJECT_ID = '88az0w6y'
const DATASET = 'production'
const API_VERSION = '2024-01-01'

export async function GET(
  _request: Request,
  context: { params: Promise<{ slug: string }> }
) {
  const { slug } = await context.params

  const query = `*[_type == "linea" && slug.current == $slug][0]{ "pdfUrl": offertaPdf.asset->url }`
  const url = `https://${PROJECT_ID}.api.sanity.io/v${API_VERSION}/data/query/${DATASET}?query=${encodeURIComponent(query)}&$slug=${encodeURIComponent(JSON.stringify(slug))}`

  const res = await fetch(url, { next: { revalidate: 60 } })
  const data = await res.json()
  const pdfUrl = data?.result?.pdfUrl

  if (!pdfUrl) {
    return new NextResponse('PDF non trovato', { status: 404 })
  }

  return NextResponse.redirect(pdfUrl, { status: 302 })
}
