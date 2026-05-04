"use client"

import { useEffect, useRef } from "react"
import { ChevronDown } from "lucide-react"

export function HeroSection() {
  const contentRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("animate-fade-in-up")
          }
        })
      },
      { threshold: 0.1 }
    )

    if (contentRef.current) {
      const elements = contentRef.current.querySelectorAll("[data-animate]")
      elements.forEach((el) => observer.observe(el))
    }

    return () => observer.disconnect()
  }, [])

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
          // @ts-expect-error - fetchPriority is valid but not in types yet
          fetchpriority="high"
        >
          <source
            src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/video-montagna-P49xRXx2saAsU8zfcKTsA2hDEf9STU.mp4"
            type="video/mp4"
          />
        </video>
        {/* Overlay gradient as specified */}
        <div 
          className="absolute inset-0" 
          style={{ background: "linear-gradient(to bottom, rgba(0,0,0,0.1) 0%, rgba(0,0,0,0.4) 100%)" }} 
        />
      </div>

      {/* Content */}
      <div ref={contentRef} className="relative z-10 h-full flex flex-col items-center justify-center px-6">
        <div className="text-center max-w-4xl">
          {/* Overline */}
          <p 
            data-animate
            className="opacity-0 text-[11px] tracking-[0.2em] uppercase font-medium mb-8"
            style={{ color: "rgba(255,255,255,0.65)" }}
          >
            Energia Rinnovabile &middot; Italia
          </p>

          {/* H1 Title */}
          <h1 
            data-animate
            className="opacity-0 animate-delay-150 font-light text-white leading-[1.1] mb-6"
            style={{ fontSize: "clamp(3rem, 6vw, 5rem)" }}
          >
            Indipendenza energetica per ogni abitazione
          </h1>

          {/* Subtitle */}
          <p 
            data-animate
            className="opacity-0 animate-delay-300 text-base font-light max-w-xl mx-auto mb-10"
            style={{ color: "rgba(255,255,255,0.7)", marginTop: "1.5rem" }}
          >
            Impianti fotovoltaici chiavi in mano per privati e aziende in tutta Italia
          </p>

          {/* CTA */}
          <div data-animate className="opacity-0 animate-delay-300">
            <a
              href="#contatti"
              className="btn-outline-white"
              style={{ padding: "14px 40px" }}
            >
              Richiedi preventivo gratuito
            </a>
          </div>

          {/* Micro-copy */}
          <p 
            data-animate
            className="opacity-0 animate-delay-300 mt-6 text-[11px]"
            style={{ color: "rgba(255,255,255,0.5)" }}
          >
            Nessun impegno &middot; Risposta entro 24 ore
          </p>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-12 left-1/2 -translate-x-1/2">
          <a href="#impianti-fotovoltaici" className="flex flex-col items-center gap-2 text-white/50 hover:text-white/80 transition-colors">
            <ChevronDown className="h-5 w-5 animate-scroll" />
          </a>
        </div>
      </div>
    </section>
  )
}
