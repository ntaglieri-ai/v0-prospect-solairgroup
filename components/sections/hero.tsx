"use client"

import Image from "next/image"
import { ChevronDown } from "lucide-react"

export function HeroSection() {
  return (
    <section id="home" className="relative h-screen overflow-hidden mb-0 md:mb-[80px]">
      {/* Video Background */}
      <div className="absolute inset-0 w-full h-full">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 w-full h-full object-cover"
          // @ts-expect-error fetchpriority is valid but not typed
          fetchpriority="high"
        >
          <source
            src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/video-montagna-P49xRXx2saAsU8zfcKTsA2hDEf9STU.mp4"
            type="video/mp4"
          />
        </video>
        {/* Gradient overlay that fades to background */}
        <div 
          className="absolute inset-0" 
          style={{
            background: "linear-gradient(to bottom, rgba(0,0,0,0.25) 0%, rgba(0,0,0,0.55) 60%, rgba(244,246,247,1) 100%)"
          }}
        />
      </div>

      {/* Content - centered vertically with breathing room */}
      <div className="relative z-10 h-full flex flex-col items-center justify-center px-6">
        <div className="text-center max-w-4xl">
          {/* Logo */}
          <div className="relative w-[720px] h-60 mx-auto mb-0">
            <Image
              src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/WhatsApp_Image_2026-05-05_at_18.34.28-removebg-preview-1BVOsiAd1yhDgv9eOJpKcg5rntHuff.png"
              alt="Solair Group"
              fill
              className="object-contain brightness-0 invert"
              priority
            />
          </div>

          {/* Overline - DM Sans */}
          <p className="overline text-white/60 mb-6 -mt-4">
            Energia Rinnovabile · Italia
          </p>

          {/* H1 Title - Cormorant Garamond */}
          <h1 className="font-heading text-white mb-6">
            Indipendenza energetica per ogni abitazione
          </h1>

          {/* Subtitle - DM Sans */}
          <p className="text-base font-light text-white/75 max-w-xl mx-auto mb-10" style={{ fontFamily: "var(--font-dm-sans)" }}>
            Impianti fotovoltaici chiavi in mano per privati e aziende in tutta Italia
          </p>

          {/* CTA */}
          <a
            href="#contatti"
            className="btn-outline-white"
          >
            Richiedi preventivo gratuito
          </a>

          {/* Micro-copy */}
          <p className="mt-6 text-[11px] text-white/50" style={{ fontFamily: "var(--font-dm-sans)" }}>
            Nessun impegno · Risposta entro 24 ore
          </p>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-24 left-1/2 -translate-x-1/2">
          <a href="#chi-siamo" className="flex flex-col items-center gap-2 text-white/50 hover:text-white/80 transition-colors">
            <ChevronDown className="h-5 w-5 animate-scroll" />
          </a>
        </div>
      </div>
    </section>
  )
}
