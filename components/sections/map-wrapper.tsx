import { sanityFetch } from "@/lib/sanity"
import { sediQuery, type Sede } from "@/lib/sanity/queries"
import { MapSectionClient } from "./map-client"

// Fallback data in case Sanity is empty or unavailable
const fallbackSedi: Sede[] = [
  {
    _id: "1",
    regione: "Sicilia",
    citta: "Catania",
    referente: "Marco Rossi",
    telefono: "+39 095 290 0278",
    lat: 37.5079,
    lng: 15.083,
  },
  {
    _id: "2",
    regione: "Sicilia",
    citta: "Giarre (CT)",
    referente: "Luca Ferrara",
    telefono: "+39 095 290 0278",
    lat: 37.727,
    lng: 15.1842,
  },
  {
    _id: "3",
    regione: "Veneto",
    citta: "Treviso (TV)",
    referente: "Anna Bianchi",
    telefono: "+39 095 290 0278",
    lat: 45.6669,
    lng: 12.243,
  },
  {
    _id: "4",
    regione: "Piemonte",
    citta: "Torino (TO)",
    referente: "Giuseppe Verdi",
    telefono: "+39 095 290 0278",
    lat: 45.0703,
    lng: 7.6869,
  },
]

export async function MapSection() {
  let sedi: Sede[] = []
  
  console.log("[v0] Starting Sanity fetch for sedi...")
  console.log("[v0] Query:", sediQuery)
  console.log("[v0] SANITY_API_READ_TOKEN exists:", !!process.env.SANITY_API_READ_TOKEN)
  console.log("[v0] NEXT_PUBLIC_SANITY_PROJECT_ID:", process.env.NEXT_PUBLIC_SANITY_PROJECT_ID)
  console.log("[v0] NEXT_PUBLIC_SANITY_DATASET:", process.env.NEXT_PUBLIC_SANITY_DATASET)
  
  try {
    sedi = await sanityFetch<Sede[]>({
      query: sediQuery,
      tags: ["sede"],
    })
    console.log("[v0] Sanity fetch result:", JSON.stringify(sedi, null, 2))
    console.log("[v0] Number of sedi returned:", sedi?.length ?? 0)
  } catch (error) {
    console.error("[v0] Error fetching sedi from Sanity:", error)
  }
  
  // Use fallback if no data from Sanity
  const data = sedi && sedi.length > 0 ? sedi : fallbackSedi
  console.log("[v0] Using fallback:", sedi?.length === 0 || !sedi)
  
  return <MapSectionClient sedi={data} />
}
