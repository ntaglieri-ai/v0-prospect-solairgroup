"use client"

import { useRef } from "react"
import { motion, useInView } from "framer-motion"
import Image from "next/image"
import { Zap, Search, Users } from "lucide-react"

const features = [
  { icon: Zap, text: "Autoconsumo diffuso" },
  { icon: Search, text: "Risparmio fino al 40% in bolletta" },
  { icon: Users, text: "Energia 100% rinnovabile" },
]

export function CERSection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  return (
    <section id="cer" className="min-h-[90vh] py-32 bg-[#0A0A08] relative overflow-hidden" ref={ref}>
      {/* Full bleed background image */}
      <div className="absolute inset-0">
        <Image
          src="https://images.unsplash.com/photo-1521737852567-6949f3f9f2b5?w=1600&q=80"
          alt="Team di professionisti collaborano per le comunità energetiche rinnovabili"
          fill
          className="object-cover grayscale"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#0A0A08] via-[#0A0A08]/90 to-[#0A0A08]/60" />
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-6 lg:px-8">
        <div className="max-w-2xl">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
          >
            <p className="text-[10px] tracking-[0.4em] uppercase text-[#C8A96E] mb-6 font-light">
              Solair CER
            </p>

            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-[var(--font-display)] font-normal text-[#F2EDE4] mb-8 leading-[1.15]">
              Unisciti alla
              <br />
              <span className="italic">rivoluzione energetica</span>
            </h2>

            <p className="text-base text-[#F2EDE4]/60 mb-12 leading-relaxed font-light max-w-lg">
              Le Comunità Energetiche Rinnovabili (CER) permettono a cittadini, imprese e enti di produrre, 
              condividere e consumare energia pulita insieme, ottenendo vantaggi economici e ambientali.
            </p>

            <div className="space-y-6 mb-12">
              {features.map((feature, index) => (
                <motion.div
                  key={feature.text}
                  initial={{ opacity: 0, x: -20 }}
                  animate={isInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.5, delay: 0.2 + index * 0.1 }}
                  className="flex items-center gap-4"
                >
                  <div className="w-10 h-10 border border-[#C8A96E]/30 flex items-center justify-center">
                    <feature.icon className="h-4 w-4 text-[#C8A96E]" />
                  </div>
                  <span className="text-[#F2EDE4]/80 font-light">{feature.text}</span>
                </motion.div>
              ))}
            </div>

            <a href="#contatti" className="btn-premium">
              Contattaci ora
            </a>
          </motion.div>

          {/* Stats badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="mt-20 inline-block border border-[#F2EDE4]/10 p-8"
          >
            <p className="text-4xl font-[var(--font-display)] text-[#C8A96E]">20+</p>
            <p className="text-[10px] tracking-[0.2em] uppercase text-[#F2EDE4]/40 mt-2">Configurazioni attive</p>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
