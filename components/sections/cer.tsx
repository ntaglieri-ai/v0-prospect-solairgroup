"use client"

import { useRef, useEffect } from "react"
import Image from "next/image"

const benefits = [
  "Autoconsumo diffuso dell'energia prodotta",
  "Risparmio fino al 40% in bolletta",
  "Incentivi statali dedicati",
  "Energia 100% rinnovabile",
  "Nessun vincolo contrattuale minimo",
]

export function CERSection() {
  const sectionRef = useRef<HTMLElement>(null)

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

    if (sectionRef.current) {
      const elements = sectionRef.current.querySelectorAll("[data-animate]")
      elements.forEach((el) => observer.observe(el))
    }

    return () => observer.disconnect()
  }, [])

  return (
    <section id="cer" ref={sectionRef} className="min-h-[90vh] bg-white flex items-center">
      <div className="w-full grid lg:grid-cols-[45%_55%]">
        {/* Text Left */}
        <div className="flex items-center py-16 lg:py-0 px-8 lg:px-20 order-2 lg:order-1">
          <div className="max-w-lg">
            <p 
              data-animate 
              className="opacity-0 overline text-[#6B6B6B] mb-6"
            >
              Solair CER
            </p>

            <h2 
              data-animate 
              className="opacity-0 animate-delay-150 font-light text-[#0A0A0A] mb-8 leading-[1.15]"
              style={{ fontSize: "clamp(2.2rem, 4vw, 3.2rem)" }}
            >
              Comunita Energetiche Rinnovabili
            </h2>

            <p 
              data-animate 
              className="opacity-0 animate-delay-300 text-base text-[#6B6B6B] mb-10 leading-relaxed font-light"
            >
              Le Comunita Energetiche Rinnovabili permettono a privati, condomini e aziende 
              di produrre e condividere energia pulita, riducendo la bolletta fino al 40% 
              e accedendo a incentivi statali dedicati.
            </p>

            {/* Benefits list */}
            <div 
              data-animate 
              className="opacity-0 animate-delay-300 space-y-0 mb-10"
            >
              {benefits.map((benefit, index) => (
                <div 
                  key={index} 
                  className="flex items-center gap-4 py-4 border-b border-[#E8E8E8] last:border-0"
                >
                  <span className="text-[#6B6B6B]">&bull;</span>
                  <span className="text-sm text-[#0A0A0A] font-light">{benefit}</span>
                </div>
              ))}
            </div>

            {/* Stat */}
            <div 
              data-animate 
              className="opacity-0 animate-delay-300 mb-10 pt-6 border-t border-[#E8E8E8]"
            >
              <p className="text-4xl font-light text-[#0A0A0A]">20+</p>
              <p className="text-[11px] uppercase tracking-[0.15em] text-[#6B6B6B] mt-2 font-medium">
                Configurazioni CER attive in Italia
              </p>
            </div>

            <a href="#contatti" className="btn-outline">
              Scopri di piu
            </a>
          </div>
        </div>

        {/* Image Right 55% */}
        <div 
          data-animate 
          className="opacity-0 relative h-[50vh] lg:h-auto lg:min-h-[90vh] order-1 lg:order-2"
        >
          <Image
            src="https://images.unsplash.com/photo-1466611653911-95081537e5b7?w=1400&q=90"
            alt="Comunita energetica rinnovabile - pannelli solari condivisi"
            fill
            className="object-cover"
            loading="lazy"
          />
        </div>
      </div>
    </section>
  )
}
