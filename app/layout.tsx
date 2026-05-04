import type { Metadata } from "next"
import { Cormorant_Garamond, DM_Sans, Outfit } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import "./globals.css"

const cormorantGaramond = Cormorant_Garamond({
  subsets: ["latin"],
  variable: "--font-display",
  weight: ["400", "500", "600", "700"],
})

const dmSans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-body",
  weight: ["300", "400", "500", "600"],
})

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-outfit",
  weight: ["400", "500", "600", "700"],
})

export const metadata: Metadata = {
  title: "Solair Group | Impianti Fotovoltaici Chiavi in Mano – Risparmia con il Solare",
  description:
    "Solair Group installa impianti fotovoltaici per privati e aziende in tutta Italia. Detrazione 50%, incentivi CER, monitoraggio remoto e installatori certificati. Richiedi un preventivo gratuito.",
  keywords:
    "impianto fotovoltaico, pannelli solari, incentivi fotovoltaico, comunità energetica, detrazione fiscale solare, pompa di calore, installazione fotovoltaico Italia",
  generator: "v0.app",
  icons: {
    icon: [
      {
        url: "/icon-light-32x32.png",
        media: "(prefers-color-scheme: light)",
      },
      {
        url: "/icon-dark-32x32.png",
        media: "(prefers-color-scheme: dark)",
      },
      {
        url: "/icon.svg",
        type: "image/svg+xml",
      },
    ],
    apple: "/apple-icon.png",
  },
  openGraph: {
    title: "Solair Group | Impianti Fotovoltaici Chiavi in Mano – Risparmia con il Solare",
    description:
      "Solair Group installa impianti fotovoltaici per privati e aziende in tutta Italia. Detrazione 50%, incentivi CER, monitoraggio remoto e installatori certificati.",
    type: "website",
    locale: "it_IT",
    url: "https://solairgroup.it",
  },
  twitter: {
    card: "summary_large_image",
    title: "Solair Group | Impianti Fotovoltaici Chiavi in Mano",
    description:
      "Solair Group installa impianti fotovoltaici per privati e aziende in tutta Italia. Richiedi un preventivo gratuito.",
  },
  robots: {
    index: true,
    follow: true,
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
    <html lang="it" className={`${cormorantGaramond.variable} ${dmSans.variable} ${outfit.variable}`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              name: "Solair Group",
              url: "https://solairgroup.it",
              logo: "https://solairgroup.it/logo.png",
              contactPoint: [
                {
                  "@type": "ContactPoint",
                  telephone: "+39-095-290-0278",
                  contactType: "customer service",
                  areaServed: "IT",
                  availableLanguage: "Italian",
                },
              ],
              address: [
                {
                  "@type": "PostalAddress",
                  addressLocality: "Catania",
                  addressRegion: "Sicilia",
                  addressCountry: "IT",
                },
                {
                  "@type": "PostalAddress",
                  addressLocality: "Torino",
                  addressRegion: "Piemonte",
                  addressCountry: "IT",
                },
                {
                  "@type": "PostalAddress",
                  addressLocality: "Treviso",
                  addressRegion: "Veneto",
                  addressCountry: "IT",
                },
              ],
            }),
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "FAQPage",
              mainEntity: [
                {
                  "@type": "Question",
                  name: "Quanto costa un impianto fotovoltaico?",
                  acceptedAnswer: {
                    "@type": "Answer",
                    text: "Il costo varia da 5.000€ a 15.000€ a seconda della potenza, del tipo di pannelli e della complessità dell'installazione.",
                  },
                },
                {
                  "@type": "Question",
                  name: "Quali incentivi esistono per il fotovoltaico nel 2024?",
                  acceptedAnswer: {
                    "@type": "Answer",
                    text: "Detrazione fiscale 50% per privati e fondo perduto PNRR 40% per le imprese.",
                  },
                },
                {
                  "@type": "Question",
                  name: "Cos'è una Comunità Energetica Rinnovabile (CER)?",
                  acceptedAnswer: {
                    "@type": "Answer",
                    text: "Una CER permette a più utenti di condividere energia prodotta da fonti rinnovabili, ottenendo incentivi e risparmi in bolletta.",
                  },
                },
                {
                  "@type": "Question",
                  name: "In quanto tempo si installa un impianto fotovoltaico?",
                  acceptedAnswer: {
                    "@type": "Answer",
                    text: "Mediamente in 1-3 giorni lavorativi, a seconda della complessità del progetto.",
                  },
                },
                {
                  "@type": "Question",
                  name: "Solair Group opera in tutta Italia?",
                  acceptedAnswer: {
                    "@type": "Answer",
                    text: "Sì, operiamo con filiali a Catania, Torino, Treviso e Giarre, coprendo tutto il territorio nazionale.",
                  },
                },
              ],
            }),
          }}
        />
      </head>
      <body className="font-[var(--font-body)] antialiased bg-[#0A0A08] text-[#F2EDE4]">
        {children}
        {process.env.NODE_ENV === "production" && <Analytics />}
      </body>
    </html>
  )
}
