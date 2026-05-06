import { groq } from "next-sanity"

// Sede queries
export const sediQuery = groq`
  *[_type == "sede"] | order(citta asc) {
    _id,
    citta,
    regione,
    referente,
    telefono,
    lat,
    lng
  }
`

// Types
export interface Sede {
  _id: string
  citta: string
  regione?: string
  referente: string
  telefono: string
  lat: number
  lng: number
}
