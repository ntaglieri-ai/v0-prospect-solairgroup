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
  title: "Solair Group | Impianti Fotovoltaici Chiavi in Mano - Risparmia con il Solare",
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
      </head>
      <body className="font-sans font-light antialiased bg-[#FAFAF8] text-[#0A0A0A]">
        {children}
        {process.env.NODE_ENV === "production" && <Analytics />}
      </body>
    </html>
  )
}
