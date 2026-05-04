"use client"

import { motion } from "framer-motion"
import { ChevronDown } from "lucide-react"

export function HeroSection() {
  return (
    <section id="home" className="relative h-screen overflow-hidden">
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
        {/* Light overlay - subtle for readability */}
        <div className="absolute inset-0 bg-gradient-to-t from-white via-white/40 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-transparent" />
      </div>

      {/* Content */}
      <div className="relative z-10 h-full flex flex-col items-center justify-center px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="text-center max-w-4xl"
        >
          {/* Subtle label */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="text-[10px] tracking-[0.4em] uppercase text-[#0A0A0A]/60 mb-8 font-light"
          >
            Energia rinnovabile dal 2018
          </motion.p>

          {/* Main title */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.8 }}
            className="text-5xl sm:text-6xl lg:text-7xl xl:text-8xl font-[var(--font-display)] font-light text-[#0A0A0A] leading-[1.1] mb-8 tracking-tight"
          >
            Il futuro dell&apos;energia
            <br />
            <span className="font-normal">inizia qui</span>
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.7, duration: 0.8 }}
            className="text-base sm:text-lg text-[#0A0A0A]/60 max-w-xl mx-auto mb-12 font-light leading-relaxed"
          >
            Soluzioni fotovoltaiche su misura per la tua indipendenza energetica
          </motion.p>

          {/* CTA */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9, duration: 0.8 }}
          >
            <a
              href="#contatti"
              className="btn-tesla"
              aria-label="Richiedi un preventivo gratuito"
            >
              Richiedi preventivo
            </a>
          </motion.div>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2, duration: 0.8 }}
          className="absolute bottom-12 left-1/2 -translate-x-1/2"
        >
          <a href="#chi-siamo" className="flex flex-col items-center gap-2 text-[#0A0A0A]/40 hover:text-[#0A0A0A]/60 transition-colors">
            <span className="text-[9px] tracking-[0.3em] uppercase font-light">Scorri</span>
            <ChevronDown className="h-5 w-5 animate-scroll" />
          </a>
        </motion.div>
      </div>
    </section>
  )
}
