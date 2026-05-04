"use client"

import { useRef, useEffect } from "react"
import Link from "next/link"
import { Check } from "lucide-react"

const packages = [
  {
    name: "Residenziale Base",
    description: "Ideale per abitazioni fino a 100mq",
    features: ["3.0 kWp di potenza", "Pannelli monocristallini", "Inverter di qualita", "Monitoraggio base"],
    savings: "Risparmio stimato: fino a 500/anno in bolletta",
  },
  {
    name: "Residenziale Plus",
    description: "Per chi vuole massimizzare l'autoconsumo",
    features: ["6.0 kWp di potenza", "Accumulo 5kWh", "Monitoraggio avanzato", "Ottimizzatori"],
    savings: "Risparmio stimato: fino a 800/anno in bolletta",
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
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("animate-fade-in-up")
          }
        })
      },
      { threshold: 0.1 }
    )

    if (sectionRef.current) {
      const elements = sectionRef.current.querySelectorAll("[data-animate]")
      elements.forEach((el) => observer.observe(el))
    }

    return () => observer.disconnect()
  }, [])

  return (
    <section id="soluzioni" ref={sectionRef} className="min-h-[80vh] py-32 bg-white flex items-center">
      <div className="mx-auto max-w-6xl px-6 lg:px-8 w-full">
        {/* Header */}
        <div data-animate className="opacity-0 text-center mb-16">
          <p className="overline text-[#6B6B6B] mb-4">Soluzioni</p>
          <h2 
            className="font-light text-[#0A0A0A] mb-6"
            style={{ fontSize: "clamp(2rem, 4vw, 3rem)" }}
          >
            I nostri pacchetti
          </h2>
          <p className="text-base text-[#6B6B6B] max-w-xl mx-auto mb-10 font-light">
            Non sai quale soluzione fa per te? Usa il nostro configuratore.
          </p>
          <Link href="/configuratore" className="btn-outline">
            Configura il tuo impianto
          </Link>
        </div>

        {/* Cards */}
        <div data-animate className="opacity-0 animate-delay-150 grid md:grid-cols-3 gap-6">
          {packages.map((pkg) => (
            <div
              key={pkg.name}
              className={`p-12 transition-all duration-300 ${
                pkg.featured
                  ? "border-2 border-[#0A0A0A]"
                  : "border border-[#E8E8E8]"
              }`}
              style={{ borderRadius: "2px" }}
            >
              <h3 className="text-xl font-light text-[#0A0A0A] mb-2">
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

              <p className="text-xs text-[#6B6B6B] mb-8 font-light border-t border-[#E8E8E8] pt-6">
                {pkg.savings}
              </p>

              <a
                href="#contatti"
                className="btn-outline w-full justify-center"
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
