"use client"

import { createContext, useContext, type ReactNode } from "react"
import type { DatiAziendali, Homepage } from "@/lib/sanity/queries"

interface SanityData {
  datiAziendali: DatiAziendali | null
  homepage: Homepage | null
}

const SanityDataContext = createContext<SanityData>({
  datiAziendali: null,
  homepage: null,
})

export function DatiAziendaliProvider({
  children,
  datiAziendali,
  homepage,
}: {
  children: ReactNode
  datiAziendali: DatiAziendali | null
  homepage: Homepage | null
}) {
  return (
    <SanityDataContext.Provider value={{ datiAziendali, homepage }}>
      {children}
    </SanityDataContext.Provider>
  )
}

export function useDatiAziendali() {
  return useContext(SanityDataContext).datiAziendali
}

export function useHomepage() {
  return useContext(SanityDataContext).homepage
}
