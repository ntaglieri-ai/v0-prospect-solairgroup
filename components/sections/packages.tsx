"use client"

import { useRef } from "react"
import Link from "next/link"
import { motion, useInView } from "framer-motion"
import { Sun, Battery, Building2, Check } from "lucide-react"

const packages = [
  {
    name: "Residenziale Base",
    icon: Sun,
    description: "Ideale per abitazioni fino a 100mq",
    features: ["3.0 kWp di potenza", "Pannelli monocristallini", "Inverter di qualità", "Monitoraggio base"],
  },
  {
    name: "Residenziale Plus",
    icon: Battery,
    description: "Per chi vuole massimizzare l'autoconsumo",
    features: ["6.0 kWp di potenza", "Accumulo 5kWh", "Monitoraggio avanzato", "Ottimizzatori"],
    featured: true,
  },
  {
    name: "Business Premium",
    icon: Building2,
    description: "Soluzioni per aziende",
    features: ["Da 10 a 100+ kWp", "Progettazione custom", "Monitoraggio enterprise", "Manutenzione dedicata"],
  },
]

export function PackagesSection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  return (
    <section className="min-h-[90vh] py-32 bg-[#0A0A08]" ref={ref}>
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          <p className="text-[10px] tracking-[0.4em] uppercase text-[#C8A96E] mb-6 font-light">
            Le nostre soluzioni
          </p>
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-[var(--font-display)] font-normal text-[#F2EDE4] leading-[1.15] mb-6">
            Scegli il pacchetto
            <br />
            <span className="italic">giusto per te</span>
          </h2>
          <p className="text-base text-[#F2EDE4]/50 max-w-xl mx-auto mb-10 font-light">
            Non sai quale soluzione fa per te? Usa il nostro configuratore.
          </p>
          <Link
            href="/configuratore"
            className="btn-premium-gold"
          >
            Configura il tuo impianto
          </Link>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-1">
          {packages.map((pkg, index) => (
            <motion.div
              key={pkg.name}
              initial={{ opacity: 0, y: 40 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className={`relative p-10 transition-all duration-500 group ${
                pkg.featured
                  ? "bg-[#1A1A18] border border-[#C8A96E]/30"
                  : "bg-[#1A1A18]/50 border border-[#F2EDE4]/5 hover:border-[#F2EDE4]/10"
              }`}
            >
              {pkg.featured && (
                <div className="absolute -top-3 left-10 text-[9px] tracking-[0.3em] uppercase text-[#0A0A08] bg-[#C8A96E] px-4 py-1 font-medium">
                  Consigliato
                </div>
              )}

              <div className={`w-12 h-12 flex items-center justify-center mb-8 ${
                pkg.featured ? "text-[#C8A96E]" : "text-[#F2EDE4]/40"
              }`}>
                <pkg.icon className="h-6 w-6" />
              </div>

              <h3 className="text-xl font-[var(--font-display)] text-[#F2EDE4] mb-2">
                {pkg.name}
              </h3>
              <p className="text-sm text-[#F2EDE4]/40 mb-8 font-light">
                {pkg.description}
              </p>

              <ul className="space-y-4 mb-10">
                {pkg.features.map((feature) => (
                  <li key={feature} className="flex items-center gap-3">
                    <Check className={`h-4 w-4 flex-shrink-0 ${pkg.featured ? "text-[#C8A96E]" : "text-[#F2EDE4]/30"}`} />
                    <span className="text-sm text-[#F2EDE4]/70 font-light">
                      {feature}
                    </span>
                  </li>
                ))}
              </ul>

              <a
                href="#contatti"
                className={`block w-full text-center py-4 text-[10px] tracking-[0.2em] uppercase font-medium transition-all duration-300 ${
                  pkg.featured
                    ? "bg-[#C8A96E] text-[#0A0A08] hover:bg-[#B8995E]"
                    : "border border-[#F2EDE4]/20 text-[#F2EDE4]/70 hover:bg-[#F2EDE4] hover:text-[#0A0A08]"
                }`}
              >
                Richiedi info
              </a>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
