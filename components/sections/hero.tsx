"use client"

import { useState } from "react"
import Image from "next/image"
import { ChevronDown, Phone, Mail, X } from "lucide-react"
import { useHomepage, useDatiAziendali } from "@/lib/context/dati-aziendali-context"

export function HeroSection() {
  const [isContactOpen, setIsContactOpen] = useState(false)
  const homepage = useHomepage()
  const dati = useDatiAziendali()

  return (
    <section id="home" className="relative overflow-hidden mb-0 md:mb-[80px]" style={{ minHeight: '100svh' }}>
      {/* Video Background with poster fallback for LCP */}
      <div className="absolute inset-0 w-full h-full">
        {/* Poster image shown immediately while video loads */}
        <Image
          src="/images/hero-poster.jpg"
          alt=""
          fill
          priority
          className="object-cover"
        />
        <video
          autoPlay
          loop
          muted
          playsInline
          preload="metadata"
          className="absolute inset-0 w-full h-full object-cover"
        >
          <source
            src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/video-montagna-P49xRXx2saAsU8zfcKTsA2hDEf9STU.mp4"
            type="video/mp4"
          />
        </video>
        {/* Gradient overlay - cinematographic */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/30 to-black/50" />
      </div>

      {/* Content - centered vertically with equal padding */}
      <div className="relative z-10 flex flex-col items-center justify-center px-4 sm:px-6 py-20 sm:py-24 md:py-32 lg:py-40" style={{ minHeight: '100svh' }}>
        <div className="text-center max-w-5xl w-full">
          {/* Overline - DM Sans */}
          <p className="overline text-white/90 mb-4 sm:mb-6 text-[10px] sm:text-[11px]">
            Energia Rinnovabile · Italia
          </p>

          {/* H1 Title - Barlow Condensed - Premium */}
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold leading-tight text-white mb-6 sm:mb-10 px-2" style={{ fontFamily: "var(--font-barlow-condensed)", textShadow: "0 2px 12px rgba(0,0,0,0.6)" }}>
            Impianti fotovoltaici chiavi in mano per privati e aziende in tutta Italia
          </h1>

          {/* Subtitle - DM Sans */}
          <p className="text-base sm:text-lg md:text-xl font-medium text-white/90 max-w-xl mx-auto mb-8 sm:mb-10 px-2" style={{ fontFamily: "var(--font-dm-sans)", textShadow: "0 2px 8px rgba(0,0,0,0.5)" }}>
            Soluzioni su misura per la tua casa o azienda: indipendenza energetica, sostenibilità e incentivi dedicati
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col gap-3 sm:gap-4 sm:flex-row justify-center px-6 sm:px-0">
            <a
              href="/configuratore"
              className="w-full sm:w-auto text-center bg-[#2e8b72] text-white font-semibold px-5 sm:px-8 py-3 sm:py-4 rounded-full sm:rounded-lg shadow-lg hover:brightness-110 transition-all duration-300 text-xs sm:text-base tracking-wide"
            >
              {homepage?.heroCtaPrimario || "Calcola il tuo risparmio"}
            </a>
            <button
              onClick={() => setIsContactOpen(true)}
              className="w-full sm:w-auto border border-white/80 text-white font-semibold px-5 sm:px-8 py-3 sm:py-4 rounded-full sm:rounded-lg hover:bg-white/10 transition-all duration-300 text-xs sm:text-base tracking-wide"
            >
              {homepage?.heroCtaSecondario || "Parla con un consulente"}
            </button>
          </div>
        </div>

        {/* Contact Popup */}
        {isContactOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60" onClick={() => setIsContactOpen(false)}>
            <div 
              className="bg-white p-8 max-w-sm w-full mx-4 relative"
              onClick={(e) => e.stopPropagation()}
            >
              <button 
                onClick={() => setIsContactOpen(false)}
                className="absolute top-4 right-4 text-[#1e3a5f] hover:text-[#2e8b72] transition-colors"
              >
                <X className="h-5 w-5" />
              </button>
              
              <h3 className="font-heading text-[#1e3a5f] text-2xl mb-6">Contattaci</h3>
              
              <div className="space-y-4">
                <a 
                  href={`tel:${dati?.telefono}`} 
                  className="flex items-center gap-4 p-4 border border-[#d0d6da] hover:border-[#1e3a5f] transition-colors"
                >
                  <Phone className="h-5 w-5 text-[#2e8b72]" />
                  <span className="text-[#1e3a5f]">{dati?.telefono}</span>
                </a>
                
                <a 
                  href={`mailto:${dati?.email}`} 
                  className="flex items-center gap-4 p-4 border border-[#d0d6da] hover:border-[#1e3a5f] transition-colors"
                >
                  <Mail className="h-5 w-5 text-[#2e8b72]" />
                  <span className="text-[#1e3a5f]">{dati?.email}</span>
                </a>
                
                <a 
                  href={dati?.whatsapp} 
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-4 p-4 border border-[#d0d6da] hover:border-[#1e3a5f] transition-colors"
                >
                  <svg className="h-5 w-5 text-[#2e8b72]" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                  </svg>
                  <span className="text-[#1e3a5f]">{dati?.telefono}</span>
                </a>
              </div>
            </div>
          </div>
        )}

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
