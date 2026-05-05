"use client"

import Link from "next/link"
import { Check } from "lucide-react"

const packages = [
  {
    name: "Residenziale Base",
    description: "Ideale per abitazioni fino a 100mq",
    features: ["3.0 kWp di potenza", "Pannelli monocristallini", "Inverter di qualita", "Monitoraggio base"],
    savings: "Risparmio stimato: fino a 500 euro/anno",
  },
  {
    name: "Residenziale Plus",
    description: "Per chi vuole massimizzare l'autoconsumo",
    features: ["6.0 kWp di potenza", "Accumulo 5kWh", "Monitoraggio avanzato", "Ottimizzatori"],
    savings: "Risparmio stimato: fino a 800 euro/anno",
    featured: true,
  },
  {
    name: "Business Premium",
    description: "Soluzioni per aziende",
    features: ["Da 10 a 100+ kWp", "Progettazione custom", "Monitoraggio enterprise", "Manutenzione dedicata"],
    savings: "Risparmio stimato: calcolato su misura",
  },
]

export function PackagesSection() {
  return (
    <section id="soluzioni" className="min-h-[76vh] py-[100px] bg-[#E8E8E8] flex items-center mb-[50px]">
      <div className="mx-auto max-w-6xl px-6 lg:px-8 w-full">
        {/* Header */}
        <div className="text-center mb-16">
          <p className="overline text-[#6B6B6B] mb-4">Soluzioni</p>
          <h2 className="font-heading text-[#0A0A0A] mb-6">
            I nostri pacchetti
          </h2>
          <p className="body-text max-w-xl mx-auto mb-8">
            Non sai quale soluzione fa per te? Usa il nostro configuratore.
          </p>
          <Link 
            href="/configuratore" 
            className="btn-outline text-[#0A0A0A]"
          >
            Configura il tuo impianto
          </Link>
        </div>

        {/* Cards */}
        <div className="grid md:grid-cols-3 gap-6">
          {packages.map((pkg) => (
            <div
              key={pkg.name}
              className={`p-12 transition-all duration-300 ${
                pkg.featured
                  ? "border-2 border-[#0A0A0A]"
                  : "border border-[#E8E8E8]"
              }`}
            >
              <h3 className="text-xl font-light text-[#0A0A0A] mb-2" style={{ fontFamily: "var(--font-dm-sans)" }}>
                {pkg.name}
              </h3>
              <p className="text-sm text-[#6B6B6B] mb-8 font-light">
                {pkg.description}
              </p>

              <ul className="space-y-4 mb-8">
                {pkg.features.map((feature) => (
                  <li key={feature} className="flex items-center gap-3">
                    <Check className="h-4 w-4 flex-shrink-0 text-[#0A0A0A]" />
                    <span className="text-sm text-[#0A0A0A] font-light">
                      {feature}
                    </span>
                  </li>
                ))}
              </ul>

              <p className="text-xs text-[#6B6B6B] mb-8 font-light italic border-t border-[#E8E8E8] pt-6">
                {pkg.savings}
              </p>

              <a
                href="#contatti"
                className="btn-outline text-[#0A0A0A] w-full justify-center"
              >
                Richiedi info
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
