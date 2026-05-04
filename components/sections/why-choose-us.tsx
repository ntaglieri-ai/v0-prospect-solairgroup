"use client"

import { useRef } from "react"
import { motion, useInView } from "framer-motion"
import Image from "next/image"

const features = [
  {
    title: "Servizio a 360",
    description: "Consulenza, progettazione, pratiche, installazione e assistenza",
    image: "https://images.unsplash.com/photo-1497440001374-f26997328c1b?w=600&q=80",
  },
  {
    title: "Installatori qualificati",
    description: "Personale certificato con massima professionalita",
    image: "https://images.unsplash.com/photo-1521737852567-6949f3f9f2b5?w=600&q=80",
  },
  {
    title: "Monitoraggio Remoto",
    description: "Controllo in tempo reale del tuo impianto",
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600&q=80",
  },
  {
    title: "Solair CER",
    description: "Comunita energetiche con incentivi dedicati",
    image: "https://images.unsplash.com/photo-1508514177221-188b1cf16e9d?w=600&q=80",
  },
  {
    title: "EPS Anti BlackOut",
    description: "Indipendenza energetica anche senza rete",
    image: "https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?w=600&q=80",
  },
  {
    title: "Top Quality",
    description: "Brand certificati e standard elevati",
    image: "https://images.unsplash.com/photo-1509391366360-2e959784a276?w=600&q=80",
  },
]

export function WhyChooseUsSection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  return (
    <section id="soluzioni" className="min-h-[90vh] py-32 bg-white" ref={ref}>
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          <p className="text-[10px] tracking-[0.4em] uppercase text-[#0A0A0A]/50 mb-6 font-light">
            I nostri servizi
          </p>
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-[var(--font-display)] font-light text-[#0A0A0A] leading-[1.15]">
            Perche scegliere
            <br />
            <span className="font-normal">Solair Group</span>
          </h2>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-px bg-[#0A0A0A]/10">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 40 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="group relative aspect-square overflow-hidden cursor-pointer bg-white"
            >
              {/* Background Image */}
              <Image
                src={feature.image}
                alt={feature.title}
                fill
                className="object-cover opacity-90 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700"
                loading="lazy"
              />
              {/* Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-white via-white/60 to-transparent group-hover:from-white/90 transition-all duration-500" />
              
              {/* Content */}
              <div className="absolute inset-0 p-8 flex flex-col justify-end">
                <div className="transform group-hover:-translate-y-2 transition-transform duration-500">
                  <h3 className="text-lg font-[var(--font-display)] text-[#0A0A0A] mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-sm text-[#0A0A0A]/60 font-light opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                    {feature.description}
                  </p>
                </div>
                <div className="absolute bottom-8 left-8 w-8 h-px bg-[#0A0A0A] transform origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-500" />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
