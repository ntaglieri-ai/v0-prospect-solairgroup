"use client"

import { Mail, Phone, MapPin, ArrowUpRight } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"

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
    <footer className="bg-gradient-to-br from-[#0D1F3C] to-[#1A4A4A] text-white">
      {/* Floating CTA */}
      <div className="relative">
        <div className="absolute left-1/2 -translate-x-1/2 -top-7">
          <Button
            asChild
            className="bg-[#F5C842] hover:bg-[#F5C842]/90 text-[#0D1F3C] rounded-full px-8 py-6 text-lg font-semibold shadow-xl"
          >
            <a href="#contatti" aria-label="Scopri se rientri negli incentivi">
              Scopri se rientri negli incentivi
              <ArrowUpRight className="ml-2 h-5 w-5" />
            </a>
          </Button>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-24 pb-12">
        {/* Logo */}
        <div className="text-center mb-12">
          <Link href="#home" className="inline-flex items-center gap-1" aria-label="Solair Group">
            <span className="text-3xl font-[var(--font-heading)] font-extrabold">SOLAIR</span>
            <span className="text-[#F5C842] text-3xl">⚡</span>
            <span className="text-lg font-[var(--font-heading)] font-medium">GROUP</span>
          </Link>
        </div>

        {/* Contact Info */}
        <div className="text-center mb-12">
          <h3 className="text-xl font-[var(--font-heading)] font-semibold mb-4">
            Contatti e Indirizzi delle nostre filiali
          </h3>
          <a
            href="mailto:info@solairgroup.it"
            className="inline-flex items-center gap-2 text-white/80 hover:text-white transition-colors"
          >
            <Mail className="h-4 w-4" />
            info@solairgroup.it
          </a>
        </div>

        {/* Offices Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {offices.map((office) => (
            <div
              key={office.city}
              className="bg-white/10 backdrop-blur-sm rounded-2xl p-6"
            >
              <div className="flex items-center gap-2 mb-3">
                <MapPin className="h-4 w-4 text-[#F5C842]" />
                <span className="text-sm font-semibold text-[#F5C842]">{office.region}</span>
              </div>
              <h4 className="font-[var(--font-heading)] font-bold mb-2">{office.city}</h4>
              <p className="text-sm text-white/70 mb-3">{office.contact}</p>
              <div className="space-y-2">
                <a
                  href={`tel:${office.phone.replace(/\s/g, "")}`}
                  className="flex items-center gap-2 text-sm text-white/80 hover:text-white transition-colors"
                >
                  <Phone className="h-3 w-3" />
                  {office.phone}
                </a>
                <a
                  href={`mailto:${office.email}`}
                  className="flex items-center gap-2 text-sm text-white/80 hover:text-white transition-colors break-all"
                >
                  <Mail className="h-3 w-3 flex-shrink-0" />
                  {office.email}
                </a>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-white/20 pt-8">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-sm text-white/60">
              © 2024 Solair Group. All rights reserved.
            </p>
            <div className="flex items-center gap-6">
              <Link
                href="/privacy"
                className="text-sm text-white/60 hover:text-white transition-colors"
              >
                Privacy Policy
              </Link>
              <Link
                href="/terms"
                className="text-sm text-white/60 hover:text-white transition-colors"
              >
                Term of Services
              </Link>
              <Link
                href="/support"
                className="text-sm text-white/60 hover:text-white transition-colors"
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
