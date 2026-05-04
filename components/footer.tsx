"use client"

import Link from "next/link"

const navLinks = [
  { href: "#impianti-fotovoltaici", label: "Impianti" },
  { href: "#perche-solair", label: "Servizi" },
  { href: "#recensioni", label: "Recensioni" },
  { href: "#soluzioni", label: "Soluzioni" },
  { href: "#cer", label: "CER" },
  { href: "#contatti", label: "Contatti" },
]

export function Footer() {
  return (
    <footer className="bg-[#0A0A0A] text-white">
      <div className="mx-auto max-w-7xl px-6 lg:px-8 py-20">
        {/* Logo centered */}
        <div className="text-center mb-12">
          <Link href="/" className="text-sm font-medium tracking-[0.2em]">
            SOLAIR GROUP
          </Link>
        </div>

        {/* Navigation links centered */}
        <div className="flex flex-wrap justify-center gap-8 mb-12">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-[11px] uppercase tracking-[0.12em] text-white/60 hover:text-white transition-colors duration-300"
            >
              {link.label}
            </Link>
          ))}
        </div>

        {/* Description */}
        <p className="text-center text-sm text-white/50 font-light max-w-xl mx-auto mb-12">
          Solair Group opera in tutta Italia con sedi a Catania, Giarre (CT), Treviso (TV) e Torino (TO)
        </p>

        {/* Bottom bar */}
        <div className="border-t border-white/10 pt-8">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-[11px] text-white/30 tracking-wide">
              2024 Solair Group. All rights reserved.
            </p>
            <div className="flex items-center gap-6">
              <Link
                href="/privacy"
                className="text-[11px] text-white/30 hover:text-white/60 transition-colors tracking-wide"
              >
                Privacy
              </Link>
              <Link
                href="/terms"
                className="text-[11px] text-white/30 hover:text-white/60 transition-colors tracking-wide"
              >
                Terms
              </Link>
              <Link
                href="/support"
                className="text-[11px] text-white/30 hover:text-white/60 transition-colors tracking-wide"
              >
                Support
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* WhatsApp floating button */}
      <a
        href="https://wa.me/390952900278"
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-6 right-6 z-50 w-14 h-14 bg-[#25D366] rounded-full flex items-center justify-center shadow-lg hover:scale-[1.08] transition-transform duration-300"
        aria-label="Contattaci su WhatsApp"
      >
        <svg className="w-7 h-7 text-white" fill="currentColor" viewBox="0 0 24 24">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
        </svg>
      </a>
    </footer>
  )
}
