"use client"

import { createContext, useContext, type ReactNode } from "react"
import type { DatiAziendali } from "@/lib/sanity/queries"

const DatiAziendaliContext = createContext<DatiAziendali | null>(null)

export function DatiAziendaliProvider({
  children,
  datiAziendali,
}: {
  children: ReactNode
  datiAziendali: DatiAziendali | null
}) {
  return (
    <DatiAziendaliContext.Provider value={datiAziendali}>
      {children}
    </DatiAziendaliContext.Provider>
  )
}

export function useDatiAziendali() {
  return useContext(DatiAziendaliContext)
}
