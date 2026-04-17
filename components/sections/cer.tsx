"use client"

import { useRef } from "react"
import { motion, useInView } from "framer-motion"
import Image from "next/image"
import { Zap, Search, Users, ArrowUpRight } from "lucide-react"
import { Button } from "@/components/ui/button"

const features = [
  { icon: Zap, text: "Autoconsumo diffuso" },
  { icon: Search, text: "Risparmio fino al 40% in bolletta" },
  { icon: Users, text: "Energia 100% rinnovabile" },
]

export function CERSection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  return (
    <section id="cer" className="py-20 lg:py-32 bg-white" ref={ref}>
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Left - Text */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6 }}
          >
            <div className="inline-flex items-center gap-2 bg-[#EEF4FA] rounded-full px-4 py-2 mb-6">
              <span className="text-[#F5C842]">⚡</span>
              <span className="text-sm font-semibold text-[#0D1F3C]">SOLAIR CER</span>
            </div>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-[var(--font-heading)] font-bold text-[#0D1F3C] mb-6 text-balance">
              Unisciti alla rivoluzione dell&apos;energia condivisa
            </h2>

            <p className="text-lg text-[#0D1F3C]/70 mb-8 leading-relaxed">
              Le Comunità Energetiche Rinnovabili (CER) permettono a cittadini, imprese e enti di produrre, 
              condividere e consumare energia pulita insieme, ottenendo vantaggi economici e ambientali.
            </p>

            <div className="space-y-4 mb-8">
              {features.map((feature) => (
                <div key={feature.text} className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-full bg-[#1A4A4A]/10 flex items-center justify-center">
                    <feature.icon className="h-5 w-5 text-[#1A4A4A]" />
                  </div>
                  <span className="text-[#0D1F3C] font-medium">{feature.text}</span>
                </div>
              ))}
            </div>

            <Button
              asChild
              className="bg-[#1A4A4A] hover:bg-[#1B6B6B] text-white rounded-full px-8 py-6 text-lg font-semibold"
            >
              <a href="#contatti" aria-label="Contattaci ora per un preventivo">
                Contattaci ora per un preventivo
                <ArrowUpRight className="ml-2 h-5 w-5" />
              </a>
            </Button>
          </motion.div>

          {/* Right - Images */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="relative"
          >
            <div className="relative">
              <div className="rounded-3xl overflow-hidden shadow-2xl">
                <Image
                  src="https://images.unsplash.com/photo-1521737852567-6949f3f9f2b5?w=800&q=80"
                  alt="Team di professionisti collaborano per le comunità energetiche rinnovabili"
                  width={600}
                  height={400}
                  className="w-full h-[350px] object-cover"
                  loading="lazy"
                />
              </div>
              
              {/* Badge Overlay */}
              <div className="absolute -bottom-6 -left-6 bg-[#1A4A4A] text-white rounded-2xl p-6 shadow-xl">
                <p className="text-3xl font-[var(--font-heading)] font-bold">20+</p>
                <p className="text-sm text-white/80">CONFIGURAZIONI ATTIVE</p>
              </div>
            </div>

            <div className="absolute -top-8 -right-4 w-32 h-32 rounded-2xl overflow-hidden shadow-lg hidden lg:block">
              <Image
                src="https://images.unsplash.com/photo-1509391366360-2e959784a276?w=300&q=80"
                alt="Pannelli solari fotovoltaici per comunità energetiche"
                fill
                className="object-cover"
                loading="lazy"
              />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
