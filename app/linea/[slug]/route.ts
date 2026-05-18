import { NextResponse } from 'next/server'

const PROJECT_ID = '88az0w6y'
const DATASET = 'production'
const API_VERSION = '2024-01-01'

export async function GET(
  _request: Request,
  { params }: { params: { slug: string } }
) {
  const { slug } = params

  const query = encodeURIComponent(
    `*[_type == "linea" && slug.current == "${slug}"][0]{ "pdfUrl": offertaPdf.asset->url }`
  )

  const res = await fetch(
    `https://${PROJECT_ID}.api.sanity.io/v${API_VERSION}/data/query/${DATASET}?query=${query}`,
    { next: { revalidate: 60 } }
  )

  const data = await res.json()
  const pdfUrl = data?.result?.pdfUrl

  if (!pdfUrl) {
    return new NextResponse('PDF non trovato', { status: 404 })
  }

  return NextResponse.redirect(pdfUrl, { status: 302 })
}
