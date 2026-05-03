"use client"

import { useRef } from "react"
import Link from "next/link"
import { motion, useInView } from "framer-motion"
import { Sun, Battery, Wifi, Building2, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"

const packages = [
  {
    name: "Residenziale Base",
    icon: Sun,
    description: "Ideale per abitazioni fino a 100mq",
    features: ["3.0 kWp di potenza", "Pannelli monocristallini", "Inverter di qualità", "Monitoraggio base incluso"],
  },
  {
    name: "Residenziale Plus",
    icon: Battery,
    description: "Per chi vuole massimizzare l'autoconsumo",
    features: ["6.0 kWp di potenza", "Sistema di accumulo 5kWh", "Monitoraggio avanzato", "Ottimizzatori di potenza"],
    featured: true,
  },
  {
    name: "Business Premium",
    icon: Building2,
    description: "Soluzioni per aziende e attività commerciali",
    features: ["Da 10 a 100+ kWp", "Progettazione personalizzata", "Monitoraggio enterprise", "Manutenzione dedicata"],
  },
]

export function PackagesSection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  return (
    <section className="py-20 lg:py-32 bg-white" ref={ref}>
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-[var(--font-heading)] font-bold text-[#0D1F3C] mb-4 text-balance">
            Scegli il pacchetto giusto per le tue esigenze
          </h2>
          <p className="text-[#0D1F3C]/60 text-lg max-w-2xl mx-auto mb-6">
            Non sai quale soluzione fa per te? Usa il nostro configuratore per trovare l&apos;impianto perfetto.
          </p>
          <Button
            asChild
            className="bg-[#1A6EBD] hover:bg-[#155a9a] text-white rounded-full px-6 py-3 font-semibold"
          >
            <Link href="/configuratore" className="inline-flex items-center gap-2">
              Configura il tuo impianto
              <ArrowRight className="h-4 w-4" />
            </Link>
          </Button>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8">
          {packages.map((pkg, index) => (
            <motion.div
              key={pkg.name}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className={`relative rounded-3xl p-8 ${
                pkg.featured
                  ? "bg-gradient-to-br from-[#0D1F3C] to-[#1A4A4A] text-white shadow-xl scale-105"
                  : "bg-[#EEF4FA] text-[#0D1F3C]"
              }`}
            >
              {pkg.featured && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-[#F5C842] text-[#0D1F3C] text-sm font-semibold px-4 py-1 rounded-full">
                  Più Popolare
                </div>
              )}

              <div
                className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-6 ${
                  pkg.featured ? "bg-white/10" : "bg-[#1A4A4A]/10"
                }`}
              >
                <pkg.icon className={`h-7 w-7 ${pkg.featured ? "text-[#F5C842]" : "text-[#1A4A4A]"}`} />
              </div>

              <h3 className="text-2xl font-[var(--font-heading)] font-bold mb-2">{pkg.name}</h3>
              <p className={`text-sm mb-6 ${pkg.featured ? "text-white/70" : "text-[#0D1F3C]/60"}`}>
                {pkg.description}
              </p>

              <ul className="space-y-3 mb-8">
                {pkg.features.map((feature) => (
                  <li key={feature} className="flex items-center gap-3">
                    <Wifi className={`h-4 w-4 ${pkg.featured ? "text-[#F5C842]" : "text-[#1A4A4A]"}`} />
                    <span className={`text-sm ${pkg.featured ? "text-white/90" : "text-[#0D1F3C]/80"}`}>
                      {feature}
                    </span>
                  </li>
                ))}
              </ul>

              <Button
                asChild
                className={`w-full rounded-full py-6 font-semibold ${
                  pkg.featured
                    ? "bg-white text-[#0D1F3C] hover:bg-[#EEF4FA]"
                    : "bg-[#1A4A4A] text-white hover:bg-[#1B6B6B]"
                }`}
              >
                <a href="#contatti" aria-label={`Richiedi informazioni per ${pkg.name}`}>
                  Richiedi info
                </a>
              </Button>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
