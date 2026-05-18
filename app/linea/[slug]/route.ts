import { NextResponse } from 'next/server'
import { createClient } from '@sanity/client'

const client = createClient({
  projectId: '88az0w6y',
  dataset: 'production',
  apiVersion: '2024-01-01',
  useCdn: true,
})

export async function GET(
  _request: Request,
  { params }: { params: { slug: string } }
) {
  const { slug } = params

  const linea = await client.fetch(
    `*[_type == "linea" && slug.current == $slug][0]{
      "pdfUrl": offertaPdf.asset->url
    }`,
    { slug }
  )

  if (!linea?.pdfUrl) {
    return new NextResponse('PDF non trovato', { status: 404 })
  }

  return NextResponse.redirect(linea.pdfUrl, { status: 302 })
}
