import { sanityFetch } from "@/lib/sanity"
import { cerQuery, type CER } from "@/lib/sanity/queries"
import { SolairCERClient } from "./solair-cer-client"

// Fallback data if Sanity returns empty
const fallbackCER: CER = {
  titolo: "Comunità Energetiche Rinnovabili",
  descrizione: "Le Comunità Energetiche Rinnovabili permettono a privati, condomini e aziende di produrre e condividere energia pulita, riducendo la bolletta fino al 40% e accedendo a incentivi statali dedicati.",
  vantaggi: [
    "Autoconsumo diffuso dell'energia prodotta",
    "Risparmio fino al 40% in bolletta",
    "Incentivi statali dedicati",
    "Energia 100% rinnovabile",
    "Nessun vincolo contrattuale minimo",
  ],
  incentivo: 20,
  ctaTesto: "Scopri di più",
  ctaLink: "#contatti",
}

export async function SolairCERSection() {
  let cer: CER | null = null

  try {
    cer = await sanityFetch<CER>({
      query: cerQuery,
      tags: ["cer"],
    })
  } catch (error) {
    console.error("[v0] Error fetching CER from Sanity:", error)
  }

  // Use fallback if no data from Sanity
  const data = cer && cer.titolo ? cer : fallbackCER

  return <SolairCERClient cer={data} />
}
