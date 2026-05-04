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
    features: ["3.0 kWp di potenza", "Pannelli monocristallini", "Inverter di qualita", "Monitoraggio base"],
  },
  {
    name: "Residenziale Plus",
    icon: Battery,
    description: "Per chi vuole massimizzare l autoconsumo",
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
    <section className="min-h-[90vh] py-32 bg-[#F9F9F7]" ref={ref}>
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          <p className="text-[10px] tracking-[0.4em] uppercase text-[#0A0A0A]/50 mb-6 font-light">
            Le nostre soluzioni
          </p>
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-[var(--font-display)] font-light text-[#0A0A0A] leading-[1.15] mb-6">
            Scegli il pacchetto
            <br />
            <span className="font-normal">giusto per te</span>
          </h2>
          <p className="text-base text-[#0A0A0A]/50 max-w-xl mx-auto mb-10 font-light">
            Non sai quale soluzione fa per te? Usa il nostro configuratore.
          </p>
          <Link
            href="/configuratore"
            className="btn-tesla"
          >
            Configura il tuo impianto
          </Link>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-px bg-[#0A0A0A]/10">
          {packages.map((pkg, index) => (
            <motion.div
              key={pkg.name}
              initial={{ opacity: 0, y: 40 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className={`relative p-10 transition-all duration-500 group ${
                pkg.featured
                  ? "bg-white border-t-2 border-t-[#0A0A0A]"
                  : "bg-white hover:bg-[#F9F9F7]"
              }`}
            >
              {pkg.featured && (
                <div className="absolute -top-3 left-10 text-[9px] tracking-[0.3em] uppercase text-white bg-[#0A0A0A] px-4 py-1 font-medium">
                  Consigliato
                </div>
              )}

              <div className={`w-12 h-12 flex items-center justify-center mb-8 ${
                pkg.featured ? "text-[#0A0A0A]" : "text-[#0A0A0A]/40"
              }`}>
                <pkg.icon className="h-6 w-6" />
              </div>

              <h3 className="text-xl font-[var(--font-display)] text-[#0A0A0A] mb-2">
                {pkg.name}
              </h3>
              <p className="text-sm text-[#0A0A0A]/50 mb-8 font-light">
                {pkg.description}
              </p>

              <ul className="space-y-4 mb-10">
                {pkg.features.map((feature) => (
                  <li key={feature} className="flex items-center gap-3">
                    <Check className={`h-4 w-4 flex-shrink-0 ${pkg.featured ? "text-[#0A0A0A]" : "text-[#0A0A0A]/30"}`} />
                    <span className="text-sm text-[#0A0A0A]/70 font-light">
                      {feature}
                    </span>
                  </li>
                ))}
              </ul>

              <a
                href="#contatti"
                className={`block w-full text-center py-4 text-[10px] tracking-[0.2em] uppercase font-medium transition-all duration-300 ${
                  pkg.featured
                    ? "bg-[#0A0A0A] text-white hover:bg-transparent hover:text-[#0A0A0A] border border-[#0A0A0A]"
                    : "border border-[#0A0A0A]/20 text-[#0A0A0A]/70 hover:bg-[#0A0A0A] hover:text-white hover:border-[#0A0A0A]"
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
