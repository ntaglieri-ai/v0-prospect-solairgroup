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

// Homepage query
export const homepageQuery = groq`
  *[_type == "homepage"][0] {
    heroCtaPrimario,
    heroCtaSecondario,
    soluzioniTitolo,
    incentiviTitolo,
    cerTitolo
  }
`

// CER query
export const cerQuery = groq`
  *[_type == "cer"][0] {
    titolo,
    descrizione,
    vantaggi,
    comePartecipare,
    incentivo,
    ctaTesto,
    ctaLink
  }
`

// FAQ query
export const faqQuery = groq`
  *[_type == "faq" && attiva == true] | order(ordine asc) {
    domanda,
    risposta,
    categoria
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

export interface Homepage {
  heroCtaPrimario?: string
  heroCtaSecondario?: string
  soluzioniTitolo?: string
  incentiviTitolo?: string
  cerTitolo?: string
}

export interface CER {
  titolo?: string
  descrizione?: string
  vantaggi?: (string | { _key: string; titolo: string })[]
  comePartecipare?: (string | { _key: string; titolo: string })[]
  incentivo?: number
  ctaTesto?: string
  ctaLink?: string
}

export interface FAQ {
  domanda: string
  risposta: string
  categoria?: string
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
