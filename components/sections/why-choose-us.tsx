"use client"

import { useRef } from "react"
import { motion, useInView } from "framer-motion"
import Image from "next/image"
import { Sparkles } from "lucide-react"

const features = [
  {
    title: "Un servizio a 360 gradi",
    description: "Consulenza, progettazione, pratiche di allaccio, installazione, gestione incentivi e assistenza",
    image: "https://images.unsplash.com/photo-1504711434969-e33886168f5c?w=600&q=80",
    alt: "Servizio completo per impianti fotovoltaici - consulenza e progettazione",
  },
  {
    title: "Installatori qualificati",
    description: "Personale altamente qualificato, massima professionalità e affidabilità",
    image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&q=80",
    alt: "Installatori certificati pannelli solari al lavoro",
  },
  {
    title: "Monitoraggio Remoto",
    description: "Monitoraggio remoto incluso, supporto tecnico ovunque tu sia",
    image: "https://images.unsplash.com/photo-1504711434969-e33886168f5c?w=600&q=80",
    alt: "Dashboard monitoraggio impianto fotovoltaico su tablet",
  },
  {
    title: "Solair CER",
    description: "Comunità energetiche rinnovabili con incentivi dedicati",
    image: "https://images.unsplash.com/photo-1521737852567-6949f3f9f2b5?w=600&q=80",
    alt: "Comunità energetica rinnovabile - condivisione energia sostenibile",
  },
  {
    title: "EPS – Anti BlackOut",
    description: "Sistemi EPS per indipendenza energetica anche in assenza di rete",
    image: "https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?w=600&q=80",
    alt: "Sistema anti blackout per impianti fotovoltaici",
  },
  {
    title: "Top Quality brand",
    description: "Brand altamente riconosciuti ed elevati standard di qualità",
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600&q=80",
    alt: "Pannelli solari di alta qualità e marchi certificati",
  },
]

export function WhyChooseUsSection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  return (
    <section id="soluzioni" className="py-20 lg:py-32 bg-[#EEF4FA]" ref={ref}>
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-[var(--font-heading)] font-bold text-[#0D1F3C] text-balance">
            Perché scegliere Solair Group?
          </h2>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300"
            >
              <div className="relative h-48 overflow-hidden">
                <Image
                  src={feature.image}
                  alt={feature.alt}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0D1F3C]/30 to-transparent" />
              </div>
              <div className="p-6">
                <div className="flex items-start gap-3 mb-3">
                  <Sparkles className="h-5 w-5 text-[#F5C842] flex-shrink-0 mt-1" />
                  <h3 className="text-lg font-[var(--font-heading)] font-bold text-[#0D1F3C]">
                    {feature.title}
                  </h3>
                </div>
                <p className="text-[#0D1F3C]/70 text-sm leading-relaxed pl-8">
                  {feature.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
