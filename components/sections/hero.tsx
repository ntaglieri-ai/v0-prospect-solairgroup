"use client"

import { motion } from "framer-motion"
import { ArrowUpRight } from "lucide-react"
import { Button } from "@/components/ui/button"

export function HeroSection() {
  return (
    <section id="home" className="relative min-h-screen overflow-hidden">
      {/* Video Background */}
      <div className="absolute inset-0 w-full h-full">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 w-full h-full object-cover"
        >
          <source
            src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/video-montagna-P49xRXx2saAsU8zfcKTsA2hDEf9STU.mp4"
            type="video/mp4"
          />
        </video>
        {/* Dark overlay for text visibility */}
        <div className="absolute inset-0 bg-[#0D1F3C]/60" />
        {/* Gradient overlay from bottom */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#0D1F3C]/80 via-transparent to-[#0D1F3C]/40" />
      </div>

      {/* Content */}
      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-32 pb-24 min-h-screen flex flex-col justify-center">
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
            className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-md rounded-full px-4 py-2 shadow-lg border border-white/20 mb-8"
          >
            <span className="text-[#F5C842]">⚡</span>
            <span className="text-sm font-medium text-white">
              Affidati ai professionisti dell&apos;energia rinnovabile
            </span>
          </motion.div>

          {/* H1 */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="text-4xl sm:text-5xl lg:text-6xl font-[var(--font-heading)] font-extrabold text-white leading-tight mb-6 text-balance drop-shadow-lg"
          >
            Il futuro dell&apos;energia è adesso: risparmia con il fotovoltaico!
          </motion.h1>

          {/* Subtext */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="text-lg sm:text-xl text-white/90 max-w-2xl mx-auto mb-10 text-pretty drop-shadow-md"
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
              className="bg-[#F5C842] hover:bg-[#e0b63a] text-[#0D1F3C] rounded-full px-8 py-6 text-lg font-semibold shadow-xl shadow-[#F5C842]/30"
            >
              <a href="#contatti" aria-label="Richiedi un preventivo gratuito">
                Richiedi un preventivo gratuito
                <ArrowUpRight className="ml-2 h-5 w-5" />
              </a>
            </Button>
          </motion.div>
        </motion.div>
      </div>

      {/* Bottom fade to next section */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[#EEF4FA] to-transparent z-10" />
    </section>
  )
}
