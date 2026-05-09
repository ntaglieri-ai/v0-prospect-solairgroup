import type { Metadata } from "next"
import { DM_Sans, Outfit } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import { sanityFetch } from "@/lib/sanity"
import { datiAziendaliQuery, homepageQuery, type DatiAziendali, type Homepage } from "@/lib/sanity/queries"
import { DatiAziendaliProvider } from "@/lib/context/dati-aziendali-context"
import "./globals.css"

const dmSans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-dm-sans",
  weight: ["300", "400", "500"],
  display: "swap",
})

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-outfit",
  weight: ["200", "300", "400"],
  display: "swap",
})

export const metadata: Metadata = {
  title: "Solair Group | Impianti Fotovoltaici Chiavi in Mano – Risparmia con il Solare",
  description: "Solair Group installa impianti fotovoltaici su misura per privati e aziende in tutta Italia. Chiavi in mano, incentivi fiscali, monitoraggio remoto e garanzia totale. Richiedi un preventivo gratuito.",
  keywords: "impianto fotovoltaico, pannelli solari, incentivi fotovoltaico, comunita energetica, detrazione fiscale solare, energia rinnovabile Italia",
  robots: "index, follow",
  icons: {
    icon: '/favicon.ico',
    shortcut: '/favicon-32.png',
  },
  openGraph: {
    title: "Solair Group | Impianti Fotovoltaici Chiavi in Mano",
    description: "Solair Group installa impianti fotovoltaici su misura per privati e aziende in tutta Italia. Chiavi in mano, incentivi fiscali, monitoraggio remoto e garanzia totale.",
    type: "website",
    locale: "it_IT",
    url: "https://solairgroup.it",
    images: ['/solair-icon-512.png'],
  },
  alternates: {
    canonical: "https://solairgroup.it",
  },
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  // Fetch dati aziendali and homepage once at the root level
  let datiAziendali: DatiAziendali | null = null
  let homepage: Homepage | null = null
  
  try {
    [datiAziendali, homepage] = await Promise.all([
      sanityFetch<DatiAziendali>({
        query: datiAziendaliQuery,
        tags: ["datiAziendali"],
      }),
      sanityFetch<Homepage>({
        query: homepageQuery,
        tags: ["homepage"],
      }),
    ])
  } catch (error) {
    console.error("Error fetching Sanity data:", error)
  }

  return (
    <html lang="it" className={`${dmSans.variable} ${outfit.variable}`}>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="preconnect" href="https://images.unsplash.com" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "LocalBusiness",
              name: "Solair Group",
              telephone: "+390952900278",
              email: "info@solairgroup.it",
              url: "https://solairgroup.it",
              areaServed: "Italia",
              address: [
                { "@type": "PostalAddress", addressLocality: "Catania", addressRegion: "Sicilia", addressCountry: "IT" },
                { "@type": "PostalAddress", addressLocality: "Giarre", addressRegion: "Sicilia", addressCountry: "IT" },
                { "@type": "PostalAddress", addressLocality: "Treviso", addressRegion: "Veneto", addressCountry: "IT" },
                { "@type": "PostalAddress", addressLocality: "Torino", addressRegion: "Piemonte", addressCountry: "IT" },
              ],
            }),
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "AggregateRating",
              itemReviewed: { "@type": "Organization", name: "Solair Group" },
              ratingValue: "5",
              bestRating: "5",
              reviewCount: "99",
            }),
          }}
        />
        {/* Sitemap: /, /configuratore, /#chi-siamo, /#servizi, /#recensioni, /#soluzioni, /#cer, /#contatti */}
      </head>
      <body className="font-sans font-light antialiased bg-[#f4f6f7] text-[#1e3a5f]">
        <DatiAziendaliProvider datiAziendali={datiAziendali} homepage={homepage}>
          {children}
        </DatiAziendaliProvider>
        {process.env.NODE_ENV === "production" && <Analytics />}
        <script
          type="text/javascript"
          dangerouslySetInnerHTML={{
            __html: `window.GPTTConfig = { uuid: 'b7e5639e1cb444cd98c37342a90053f9', domain: 'app.gptchatbot.it' }`,
          }}
        />
        <script src="https://app.gptchatbot.it/widget-asset.min.js" defer />
      </body>
    </html>
  )
}
