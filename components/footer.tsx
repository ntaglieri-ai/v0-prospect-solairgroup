"use client"

import { Mail, Phone, MapPin } from "lucide-react"
import Link from "next/link"

const offices = [
  {
    region: "Veneto",
    city: "Treviso (TV)",
    contact: "Ing Vito Ragaglia",
    phone: "+39 095 290 0278",
    email: "vito.ragaglia@solairgroup.it",
  },
  {
    region: "Piemonte",
    city: "Torino (TO)",
    contact: "Filippo Ferrara",
    phone: "+39 095 290 0278",
    email: "filippo.ferrara@solairgroup.it",
  },
  {
    region: "Sicilia",
    city: "Catania (CT)",
    contact: "Gaetano Grasso",
    phone: "+39 095 290 0278",
    email: "gaetano.grasso@solairgroup.it",
  },
  {
    region: "Sicilia",
    city: "Giarre (CT)",
    contact: "Uffici progettazione",
    phone: "+39 095 290 0278",
    email: "info@solairgroup.it",
  },
]

export function Footer() {
  return (
    <footer className="bg-[#0A0A08] border-t border-[#F2EDE4]/10">
      {/* Floating CTA */}
      <div className="relative">
        <div className="absolute left-1/2 -translate-x-1/2 -top-7">
          <a
            href="#contatti"
            className="inline-flex items-center justify-center text-[10px] tracking-[0.2em] uppercase font-medium bg-[#C8A96E] text-[#0A0A08] px-10 py-4 hover:bg-[#B8995E] transition-all duration-300"
          >
            Scopri se rientri negli incentivi
          </a>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-6 lg:px-8 pt-28 pb-16">
        {/* Logo */}
        <div className="text-center mb-16">
          <Link href="#home" className="inline-flex items-center gap-2" aria-label="Solair Group">
            <span className="text-2xl font-[var(--font-display)] font-semibold tracking-wide text-[#F2EDE4]">
              SOLAIR
            </span>
            <span className="text-xs font-light tracking-[0.3em] text-[#F2EDE4]/60 uppercase">
              Group
            </span>
          </Link>
        </div>

        {/* Contact Info */}
        <div className="text-center mb-16">
          <p className="text-[10px] tracking-[0.4em] uppercase text-[#C8A96E] mb-4 font-light">
            Contatti
          </p>
          <a
            href="mailto:info@solairgroup.it"
            className="inline-flex items-center gap-3 text-[#F2EDE4]/60 hover:text-[#F2EDE4] transition-colors text-sm font-light"
          >
            <Mail className="h-4 w-4" />
            info@solairgroup.it
          </a>
        </div>

        {/* Offices Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-px bg-[#F2EDE4]/10 mb-16">
          {offices.map((office) => (
            <div
              key={office.city}
              className="bg-[#0A0A08] p-8"
            >
              <div className="flex items-center gap-2 mb-4">
                <MapPin className="h-3 w-3 text-[#C8A96E]" />
                <span className="text-[10px] tracking-[0.2em] uppercase text-[#C8A96E] font-light">{office.region}</span>
              </div>
              <h4 className="font-[var(--font-display)] text-[#F2EDE4] mb-2">{office.city}</h4>
              <p className="text-xs text-[#F2EDE4]/40 mb-4 font-light">{office.contact}</p>
              <div className="space-y-2">
                <a
                  href={`tel:${office.phone.replace(/\s/g, "")}`}
                  className="flex items-center gap-2 text-xs text-[#F2EDE4]/50 hover:text-[#F2EDE4] transition-colors font-light"
                >
                  <Phone className="h-3 w-3" />
                  {office.phone}
                </a>
                <a
                  href={`mailto:${office.email}`}
                  className="flex items-center gap-2 text-xs text-[#F2EDE4]/50 hover:text-[#F2EDE4] transition-colors break-all font-light"
                >
                  <Mail className="h-3 w-3 flex-shrink-0" />
                  {office.email}
                </a>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-[#F2EDE4]/10 pt-8">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-xs text-[#F2EDE4]/30 font-light tracking-wide">
              © 2024 Solair Group. All rights reserved.
            </p>
            <div className="flex items-center gap-8">
              <Link
                href="/privacy"
                className="text-xs text-[#F2EDE4]/30 hover:text-[#F2EDE4]/60 transition-colors tracking-wide font-light"
              >
                Privacy
              </Link>
              <Link
                href="/terms"
                className="text-xs text-[#F2EDE4]/30 hover:text-[#F2EDE4]/60 transition-colors tracking-wide font-light"
              >
                Terms
              </Link>
              <Link
                href="/support"
                className="text-xs text-[#F2EDE4]/30 hover:text-[#F2EDE4]/60 transition-colors tracking-wide font-light"
              >
                Support
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
