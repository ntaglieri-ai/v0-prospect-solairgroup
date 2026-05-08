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

// Dati Aziendali query
export const datiAziendaliQuery = groq`
  *[_type == "datiAziendali"][0] {
    whatsapp,
    telefono,
    email,
    emailPec,
    facebook,
    instagram,
    linkedin,
    youtube,
    impiantiInstallati,
    kWInstallati,
    clientiSoddisfatti,
    anniEsperienza,
    recensioniGoogle,
    mediaRecensioni,
    ragioneSociale,
    partitaIva,
    codiceFiscale,
    rea,
    capitaleSociale,
    sedeLegale,
    copyright
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

export interface DatiAziendali {
  whatsapp?: string
  telefono?: string
  email?: string
  emailPec?: string
  facebook?: string
  instagram?: string
  linkedin?: string
  youtube?: string
  impiantiInstallati?: number
  kWInstallati?: number
  clientiSoddisfatti?: number
  anniEsperienza?: number
  recensioniGoogle?: number
  mediaRecensioni?: number
  ragioneSociale?: string
  partitaIva?: string
  codiceFiscale?: string
  rea?: string
  capitaleSociale?: string
  sedeLegale?: string
  copyright?: string
}
