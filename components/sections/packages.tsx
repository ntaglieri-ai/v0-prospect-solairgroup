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
    <section id="soluzioni" className="relative min-h-screen py-24 bg-white flex items-center">
      <div className="mx-auto max-w-6xl px-6 lg:px-8 w-full">
        {/* Header */}
        <div className="text-center mb-16">
          <p className="text-xs uppercase tracking-widest text-gray-500 mb-4">Soluzioni</p>
          <h2 className="text-3xl md:text-4xl font-light text-gray-900 mb-6">
            I nostri pacchetti
          </h2>
          <p className="text-base text-gray-600 max-w-xl mx-auto mb-8 font-light">
            Non sai quale soluzione fa per te? Usa il nostro configuratore.
          </p>
          <Link 
            href="/configuratore" 
            className="inline-block border border-gray-900 text-gray-900 px-6 py-3 text-sm uppercase tracking-wider font-medium hover:bg-gray-900 hover:text-white transition-all duration-300"
          >
            Configura il tuo impianto
          </Link>
        </div>

        {/* Cards */}
        <div className="grid md:grid-cols-3 gap-6">
          {packages.map((pkg) => (
            <div
              key={pkg.name}
              className={`p-10 transition-all duration-300 ${
                pkg.featured
                  ? "border-2 border-gray-900"
                  : "border border-gray-200"
              }`}
            >
              <h3 className="text-xl font-light text-gray-900 mb-2">
                {pkg.name}
              </h3>
              <p className="text-sm text-gray-500 mb-8 font-light">
                {pkg.description}
              </p>

              <ul className="space-y-4 mb-8">
                {pkg.features.map((feature) => (
                  <li key={feature} className="flex items-center gap-3">
                    <Check className="h-4 w-4 flex-shrink-0 text-gray-900" />
                    <span className="text-sm text-gray-700 font-light">
                      {feature}
                    </span>
                  </li>
                ))}
              </ul>

              <p className="text-xs text-gray-500 mb-8 font-light border-t border-gray-200 pt-6">
                {pkg.savings}
              </p>

              <a
                href="#contatti"
                className="block text-center border border-gray-900 text-gray-900 px-6 py-3 text-sm uppercase tracking-wider font-medium hover:bg-gray-900 hover:text-white transition-all duration-300"
              >
                Richiedi info
              </a>
            </div>
          ))}
        </div>
      </div>

      {/* Gradient fade to gray-50 */}
      <div className="absolute bottom-0 left-0 right-0 h-[80px] bg-gradient-to-b from-transparent to-gray-100 pointer-events-none" />
    </section>
  )
}
