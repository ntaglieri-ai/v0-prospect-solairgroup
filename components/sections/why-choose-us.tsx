"use client"

import { useRef } from "react"
import { motion, useInView } from "framer-motion"
import Image from "next/image"

const features = [
  {
    title: "Servizio a 360°",
    description: "Consulenza, progettazione, pratiche, installazione e assistenza",
    image: "https://images.unsplash.com/photo-1504711434969-e33886168f5c?w=600&q=80",
  },
  {
    title: "Installatori qualificati",
    description: "Personale certificato con massima professionalità",
    image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&q=80",
  },
  {
    title: "Monitoraggio Remoto",
    description: "Controllo in tempo reale del tuo impianto",
    image: "https://images.unsplash.com/photo-1504711434969-e33886168f5c?w=600&q=80",
  },
  {
    title: "Solair CER",
    description: "Comunità energetiche con incentivi dedicati",
    image: "https://images.unsplash.com/photo-1521737852567-6949f3f9f2b5?w=600&q=80",
  },
  {
    title: "EPS Anti BlackOut",
    description: "Indipendenza energetica anche senza rete",
    image: "https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?w=600&q=80",
  },
  {
    title: "Top Quality",
    description: "Brand certificati e standard elevati",
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600&q=80",
  },
]

export function WhyChooseUsSection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  return (
    <section id="soluzioni" className="min-h-[90vh] py-32 bg-[#1A1A18]" ref={ref}>
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          <p className="text-[10px] tracking-[0.4em] uppercase text-[#C8A96E] mb-6 font-light">
            I nostri servizi
          </p>
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-[var(--font-display)] font-normal text-[#F2EDE4] leading-[1.15]">
            Perché scegliere
            <br />
            <span className="italic">Solair Group</span>
          </h2>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-1">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 40 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="group relative aspect-square overflow-hidden cursor-pointer"
            >
              {/* Background Image */}
              <Image
                src={feature.image}
                alt={feature.title}
                fill
                className="object-cover grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700"
                loading="lazy"
              />
              {/* Overlay */}
              <div className="absolute inset-0 bg-[#0A0A08]/70 group-hover:bg-[#0A0A08]/50 transition-all duration-500" />
              
              {/* Content */}
              <div className="absolute inset-0 p-8 flex flex-col justify-end">
                <div className="transform group-hover:-translate-y-2 transition-transform duration-500">
                  <h3 className="text-lg font-[var(--font-display)] text-[#F2EDE4] mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-sm text-[#F2EDE4]/60 font-light opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                    {feature.description}
                  </p>
                </div>
                <div className="absolute bottom-8 left-8 w-8 h-px bg-[#C8A96E] transform origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-500" />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
