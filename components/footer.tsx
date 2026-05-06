"use client"

import Link from "next/link"

const navLinks = [
  { href: "#chi-siamo", label: "Impianti" },
  { href: "#servizi", label: "Servizi" },
  { href: "#recensioni", label: "Recensioni" },
  { href: "#soluzioni", label: "Soluzioni" },
  { href: "#cer", label: "CER" },
  { href: "#contatti", label: "Contatti" },
]

export function Footer() {
  return (
    <footer className="bg-[#0F1117] text-white">
      <div className="mx-auto max-w-7xl px-6 lg:px-8 py-16">
        {/* Logo centered - DM Sans */}
        <div className="text-center mb-10">
          <Link 
            href="/" 
            className="text-sm font-medium tracking-[0.2em]"
            style={{ fontFamily: "var(--font-dm-sans)" }}
          >
            SOLAIR GROUP
          </Link>
        </div>

        {/* Navigation links centered - DM Sans */}
        <div className="flex flex-wrap justify-center gap-8 mb-10">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="overline text-white/60 hover:text-white transition-colors"
            >
              {link.label}
            </Link>
          ))}
        </div>

        {/* Description */}
        <p className="text-center text-sm text-white/50 font-light max-w-xl mx-auto mb-10" style={{ fontFamily: "var(--font-dm-sans)" }}>
          Solair Group opera in tutta Italia con sedi a Catania, Giarre (CT), Treviso (TV) e Torino (TO)
        </p>

        {/* Divider */}
        <div className="border-t border-white/10 pt-8">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-xs text-white/30" style={{ fontFamily: "var(--font-dm-sans)" }}>
              © 2024 Solair Group. All rights reserved.
            </p>
            <div className="flex items-center gap-6">
              <Link href="/privacy" className="text-xs text-white/30 hover:text-white/60 transition-colors" style={{ fontFamily: "var(--font-dm-sans)" }}>
                Privacy
              </Link>
              <Link href="/terms" className="text-xs text-white/30 hover:text-white/60 transition-colors" style={{ fontFamily: "var(--font-dm-sans)" }}>
                Terms
              </Link>
              <a 
                href="https://solairgroup.sanity.studio" 
                target="_blank" 
                rel="noopener noreferrer"
                className="hidden sm:inline text-xs text-white/30 hover:text-white/60 transition-colors" 
                style={{ fontFamily: "var(--font-dm-sans)" }}
              >
                Area Riservata
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
