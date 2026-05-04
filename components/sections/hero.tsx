"use client"

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
        {/* Dark overlay */}
        <div className="absolute inset-0 bg-black/40" />
      </div>

      {/* Content */}
      <div className="relative z-10 h-full flex flex-col items-center justify-center px-6">
        <div className="text-center max-w-4xl">
          {/* Overline */}
          <p className="text-xs tracking-widest uppercase font-medium mb-6 text-white/60">
            Energia Rinnovabile - Italia
          </p>

          {/* H1 Title */}
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-light text-white leading-tight mb-6">
            Indipendenza energetica per ogni abitazione
          </h1>

          {/* Subtitle */}
          <p className="text-base md:text-lg font-light text-white/70 max-w-xl mx-auto mb-10">
            Impianti fotovoltaici chiavi in mano per privati e aziende in tutta Italia
          </p>

          {/* CTA */}
          <a
            href="#contatti"
            className="inline-block border border-white text-white px-8 py-3 text-sm uppercase tracking-wider font-medium hover:bg-white hover:text-black transition-all duration-300"
          >
            Richiedi preventivo gratuito
          </a>

          {/* Micro-copy */}
          <p className="mt-6 text-xs text-white/50">
            Nessun impegno - Risposta entro 24 ore
          </p>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-24 left-1/2 -translate-x-1/2">
          <a href="#chi-siamo" className="flex flex-col items-center gap-2 text-white/50 hover:text-white/80 transition-colors">
            <ChevronDown className="h-5 w-5 animate-bounce" />
          </a>
        </div>
      </div>

      {/* Gradient fade to white */}
      <div className="absolute bottom-0 left-0 right-0 h-[120px] bg-gradient-to-b from-transparent to-white z-20 pointer-events-none" />
    </section>
  )
}
