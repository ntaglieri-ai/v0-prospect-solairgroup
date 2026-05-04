"use client"

import { useEffect, useRef } from "react"
import Image from "next/image"

const services = [
  {
    overline: "Installazione",
    title: "Servizio Completo",
    description: "Dalla consulenza iniziale all'allaccio in rete: gestiamo ogni fase dell'installazione, incluse le pratiche burocratiche e gli incentivi fiscali.",
    image: "https://images.unsplash.com/photo-1504711434969-e33886168f5c?w=1400&q=90",
  },
  {
    overline: "Team",
    title: "Installatori Certificati",
    description: "Il nostro team e composto da tecnici qualificati e certificati GSE, con anni di esperienza su impianti residenziali e industriali.",
    image: "https://images.unsplash.com/photo-1521618755572-156ae0cdd74d?w=1400&q=90",
  },
  {
    overline: "Tecnologia",
    title: "Monitoraggio Remoto",
    description: "Ogni impianto include un sistema di monitoraggio in tempo reale. Controlli la produzione e i consumi direttamente dal tuo smartphone.",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1400&q=90",
  },
  {
    overline: "Comunita",
    title: "Solair CER",
    description: "Entra nella nostra Comunita Energetica Rinnovabile e condividi l'energia prodotta con altri membri, ottenendo incentivi aggiuntivi fino al 40%.",
    image: "https://images.unsplash.com/photo-1466611653911-95081537e5b7?w=1400&q=90",
  },
  {
    overline: "Sicurezza",
    title: "Sistema Anti-Blackout",
    description: "Il nostro sistema EPS garantisce continuita energetica anche in caso di interruzione della rete. Zero dipendenza dal fornitore esterno.",
    image: "https://images.unsplash.com/photo-1508514177221-188b1cf16e9d?w=1400&q=90",
  },
  {
    overline: "Qualita",
    title: "Tecnologia di Qualita",
    description: "Utilizziamo esclusivamente pannelli e inverter dei migliori brand mondiali, con garanzia fino a 25 anni sulla produzione.",
    image: "https://images.unsplash.com/photo-1545209463-4ef10d1a1ace?w=1400&q=90",
  },
]

export function WhyChooseUsSection() {
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
      { threshold: 0.15 }
    )

    if (sectionRef.current) {
      const elements = sectionRef.current.querySelectorAll("[data-animate]")
      elements.forEach((el) => observer.observe(el))
    }

    return () => observer.disconnect()
  }, [])

  return (
    <section id="perche-solair" ref={sectionRef}>
      {services.map((service, index) => {
        const isOdd = index % 2 === 0 // 0,2,4 = odd layout (1,3,5)
        
        if (isOdd) {
          // Full-bleed background image + overlay + white text left
          return (
            <div 
              key={service.title}
              className="relative min-h-[80vh] flex items-center"
            >
              <Image
                src={service.image}
                alt={`${service.title} - Solair Group servizio fotovoltaico`}
                fill
                className="object-cover"
                loading="lazy"
              />
              <div className="absolute inset-0" style={{ background: "rgba(0,0,0,0.28)" }} />
              <div 
                data-animate 
                className="opacity-0 relative z-10 w-full px-[10vw] py-20"
              >
                <div className="max-w-xl">
                  <p className="overline text-white/70 mb-4">{service.overline}</p>
                  <h3 
                    className="font-light text-white mb-6 leading-[1.15]"
                    style={{ fontSize: "clamp(2rem, 4vw, 3rem)" }}
                  >
                    {service.title}
                  </h3>
                  <p className="text-base text-white/80 font-light leading-relaxed">
                    {service.description}
                  </p>
                </div>
              </div>
            </div>
          )
        } else {
          // #F7F7F5 background + image right 55% + text left
          return (
            <div 
              key={service.title}
              className="min-h-[80vh] bg-[#F7F7F5] flex items-center"
            >
              <div className="w-full grid lg:grid-cols-[45%_55%]">
                {/* Text Left */}
                <div className="flex items-center px-8 lg:px-20 py-16 lg:py-0 order-2 lg:order-1">
                  <div 
                    data-animate 
                    className="opacity-0 max-w-md"
                  >
                    <p className="overline text-[#6B6B6B] mb-4">{service.overline}</p>
                    <h3 
                      className="font-light text-[#0A0A0A] mb-6 leading-[1.15]"
                      style={{ fontSize: "clamp(2rem, 4vw, 3rem)" }}
                    >
                      {service.title}
                    </h3>
                    <p className="text-base text-[#6B6B6B] font-light leading-relaxed">
                      {service.description}
                    </p>
                  </div>
                </div>
                {/* Image Right */}
                <div 
                  data-animate 
                  className="opacity-0 relative h-[50vh] lg:h-auto lg:min-h-[80vh] order-1 lg:order-2"
                >
                  <Image
                    src={service.image}
                    alt={`${service.title} - Solair Group servizio fotovoltaico`}
                    fill
                    className="object-cover"
                    loading="lazy"
                  />
                </div>
              </div>
            </div>
          )
        }
      })}
    </section>
  )
}
