import type { Metadata } from "next"
import { DM_Sans, Outfit } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
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
  openGraph: {
    title: "Solair Group | Impianti Fotovoltaici Chiavi in Mano",
    description: "Solair Group installa impianti fotovoltaici su misura per privati e aziende in tutta Italia. Chiavi in mano, incentivi fiscali, monitoraggio remoto e garanzia totale.",
    type: "website",
    locale: "it_IT",
    url: "https://solairgroup.it",
  },
  alternates: {
    canonical: "https://solairgroup.it",
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
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
        {children}
        {process.env.NODE_ENV === "production" && <Analytics />}
      </body>
    </html>
  )
}
