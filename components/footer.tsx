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
    <footer className="bg-gray-900 text-white">
      <div className="mx-auto max-w-7xl px-6 lg:px-8 py-16">
        {/* Logo centered */}
        <div className="text-center mb-10">
          <Link href="/" className="text-sm font-medium tracking-widest">
            SOLAIR GROUP
          </Link>
        </div>

        {/* Navigation links centered */}
        <div className="flex flex-wrap justify-center gap-8 mb-10">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-xs uppercase tracking-wider text-white/60 hover:text-white transition-colors"
            >
              {link.label}
            </Link>
          ))}
        </div>

        {/* Description */}
        <p className="text-center text-sm text-white/50 font-light max-w-xl mx-auto mb-10">
          Solair Group opera in tutta Italia con sedi a Catania, Giarre (CT), Treviso (TV) e Torino (TO)
        </p>

        {/* Bottom bar */}
        <div className="border-t border-white/10 pt-8">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-xs text-white/30">
              2024 Solair Group. All rights reserved.
            </p>
            <div className="flex items-center gap-6">
              <Link href="/privacy" className="text-xs text-white/30 hover:text-white/60 transition-colors">
                Privacy
              </Link>
              <Link href="/terms" className="text-xs text-white/30 hover:text-white/60 transition-colors">
                Terms
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
