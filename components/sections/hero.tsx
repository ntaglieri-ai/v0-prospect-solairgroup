"use client"

import { motion } from "framer-motion"
import { ArrowUpRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import Image from "next/image"

export function HeroSection() {
  return (
    <section id="home" className="relative min-h-screen bg-gradient-to-br from-[#EEF4FA] via-[#E8F0F8] to-[#DDE9F5] pt-24 pb-0 overflow-hidden">
      {/* Subtle radial glow */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[800px] h-[800px] bg-[#1A4A4A]/5 rounded-full blur-3xl" />
      </div>

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-16 pb-24">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-4xl mx-auto"
        >
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.1, duration: 0.4 }}
            className="inline-flex items-center gap-2 bg-white/80 backdrop-blur-sm rounded-full px-4 py-2 shadow-sm mb-8"
          >
            <span className="text-[#F5C842]">⚡</span>
            <span className="text-sm font-medium text-[#0D1F3C]">
              Affidati ai professionisti dell&apos;energia rinnovabile
            </span>
          </motion.div>

          {/* H1 */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="text-4xl sm:text-5xl lg:text-6xl font-[var(--font-heading)] font-extrabold text-[#0D1F3C] leading-tight mb-6 text-balance"
          >
            Il futuro dell&apos;energia è adesso: risparmia con il fotovoltaico!
          </motion.h1>

          {/* Subtext */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="text-lg sm:text-xl text-[#0D1F3C]/70 max-w-2xl mx-auto mb-10 text-pretty"
          >
            Soluzioni su misura per la tua casa o azienda: indipendenza energetica, sostenibilità e incentivi dedicati
          </motion.p>

          {/* CTA Button */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.6 }}
          >
            <Button
              asChild
              size="lg"
              className="bg-[#1A4A4A] hover:bg-[#1B6B6B] text-white rounded-full px-8 py-6 text-lg font-semibold shadow-lg shadow-[#1A4A4A]/20"
            >
              <a href="#contatti" aria-label="Richiedi un preventivo gratuito">
                Richiedi un preventivo gratuito
                <ArrowUpRight className="ml-2 h-5 w-5" />
              </a>
            </Button>
          </motion.div>
        </motion.div>
      </div>

      {/* Hero Image */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5, duration: 0.8 }}
        className="relative w-full"
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="relative rounded-t-3xl overflow-hidden shadow-2xl">
            <Image
              src="https://images.unsplash.com/photo-1509391366360-2e959784a276?w=1400&q=80"
              alt="Installazione pannelli solari su tetto italiano - Impianto fotovoltaico Solair Group"
              width={1400}
              height={600}
              className="w-full h-[300px] sm:h-[400px] lg:h-[500px] object-cover"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0D1F3C]/20 to-transparent" />
          </div>
        </div>
      </motion.div>
    </section>
  )
}
