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
        {/* Overlay gradient that fades to white at bottom */}
        <div 
          className="absolute inset-0" 
          style={{ 
            background: "linear-gradient(to bottom, rgba(0,0,0,0.15) 0%, rgba(0,0,0,0.45) 60%, rgba(255,255,255,1) 100%)" 
          }} 
        />
      </div>

      {/* Content */}
      <div className="relative z-10 h-full flex flex-col items-center justify-center px-6">
        <div className="text-center max-w-4xl">
          {/* Overline - DM Sans 11px uppercase */}
          <p className="text-[11px] tracking-[0.2em] uppercase font-normal mb-6 text-white/60">
            Energia Rinnovabile - Italia
          </p>

          {/* H1 Title - Cormorant Garamond weight 300 */}
          <h1 className="font-heading text-white leading-[1.05] mb-6">
            Indipendenza energetica per ogni abitazione
          </h1>

          {/* Subtitle - DM Sans weight 300 */}
          <p className="text-base font-light text-white/75 max-w-xl mx-auto mb-10">
            Impianti fotovoltaici chiavi in mano per privati e aziende in tutta Italia
          </p>

          {/* CTA - btn-outline-white style */}
          <a
            href="#contatti"
            className="btn-outline-white"
          >
            Richiedi preventivo gratuito
          </a>

          {/* Micro-copy - DM Sans 11px */}
          <p className="mt-6 text-[11px] text-white/50 font-light">
            Nessun impegno - Risposta entro 24 ore
          </p>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-32 left-1/2 -translate-x-1/2">
          <a href="#chi-siamo" className="flex flex-col items-center gap-2 text-white/50 hover:text-white/80 transition-colors">
            <ChevronDown className="h-5 w-5 animate-scroll" />
          </a>
        </div>
      </div>
    </section>
  )
}
