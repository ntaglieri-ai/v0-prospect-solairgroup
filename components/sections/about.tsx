"use client"

import { useEffect, useRef } from "react"
import Image from "next/image"

export function AboutSection() {
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
    <section 
      id="impianti-fotovoltaici" 
      ref={sectionRef}
      className="min-h-[90vh] bg-white flex items-center"
    >
      <div className="w-full grid lg:grid-cols-2">
        {/* Left - Image 50% */}
        <div data-animate className="opacity-0 relative h-[50vh] lg:h-auto lg:min-h-[90vh]">
          <Image
            src="https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?w=1400&q=90"
            alt="Installazione impianto fotovoltaico su tetto residenziale"
            fill
            className="object-cover"
            loading="lazy"
          />
        </div>

        {/* Right - Text */}
        <div className="flex items-center py-16 lg:py-0 px-8 lg:px-20">
          <div className="max-w-lg">
            <p 
              data-animate 
              className="opacity-0 overline text-[#6B6B6B] mb-6"
            >
              Chi Siamo
            </p>

            <h2 
              data-animate 
              className="opacity-0 animate-delay-150 font-light text-[#0A0A0A] mb-8 leading-[1.15]"
              style={{ fontSize: "clamp(2.2rem, 4vw, 3.2rem)" }}
            >
              L&apos;energia pulita, finalmente accessibile
            </h2>

            <p 
              data-animate 
              className="opacity-0 animate-delay-300 text-base text-[#6B6B6B] mb-10 leading-relaxed font-light"
            >
              Solair Group e il partner di fiducia per il fotovoltaico in Italia. 
              Installiamo impianti chiavi in mano con assistenza completa: dalla progettazione 
              alle pratiche GSE, dal monitoraggio remoto alla manutenzione.
            </p>

            {/* Stats */}
            <div 
              data-animate 
              className="opacity-0 animate-delay-300 flex items-center gap-0 pt-8 border-t border-[#E8E8E8]"
            >
              <div className="pr-8">
                <p className="text-4xl font-light text-[#0A0A0A]">500+</p>
                <p className="text-[11px] uppercase tracking-[0.15em] text-[#6B6B6B] mt-2 font-medium">Impianti</p>
              </div>
              <div className="px-8 border-l border-[#E8E8E8]">
                <p className="text-4xl font-light text-[#0A0A0A]">4</p>
                <p className="text-[11px] uppercase tracking-[0.15em] text-[#6B6B6B] mt-2 font-medium">Sedi</p>
              </div>
              <div className="pl-8 border-l border-[#E8E8E8]">
                <p className="text-4xl font-light text-[#0A0A0A]">98%</p>
                <p className="text-[11px] uppercase tracking-[0.15em] text-[#6B6B6B] mt-2 font-medium">Soddisfatti</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
