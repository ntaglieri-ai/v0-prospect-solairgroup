"use client"

import { useRef, useState, useEffect } from "react"
import { Star, ChevronLeft, ChevronRight } from "lucide-react"

const testimonials = [
  {
    name: "Carmelo Ragusa",
    text: "Volevo ringraziare Gaetano la parte commerciale che mi ha fatto conoscere ed acquistare il prodotto. Professionalita e competenza al top. Consiglio vivamente Solair Group.",
  },
  {
    name: "Ma Lav",
    text: "Ho scelto Solair Group per l'installazione del mio impianto fotovoltaico e sono rimasto molto soddisfatto. Dall'inizio alla fine, il team e stato professionale e competente.",
  },
  {
    name: "Tommaso Nano",
    text: "Ho scelto Solair Group per l'installazione del mio impianto fotovoltaico e sono rimasto davvero soddisfatto. Servizio eccellente e personale qualificato.",
  },
  {
    name: "Giuseppe Ferrara",
    text: "Esperienza fantastica con Solair Group. Impianto installato in tempi record e gia vedo i risparmi in bolletta. Team cortese e sempre disponibile per ogni domanda.",
  },
  {
    name: "Maria Rossi",
    text: "Finalmente indipendenza energetica! Grazie a Solair Group ho un impianto efficiente e un servizio di monitoraggio eccezionale. Lo consiglio a tutti.",
  },
]

export function TestimonialsSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768)
    checkMobile()
    window.addEventListener("resize", checkMobile)
    return () => window.removeEventListener("resize", checkMobile)
  }, [])

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

  const visibleCount = isMobile ? 1 : 3
  const maxIndex = testimonials.length - visibleCount

  const next = () => setCurrentIndex((prev) => Math.min(prev + 1, maxIndex))
  const prev = () => setCurrentIndex((prev) => Math.max(prev - 1, 0))

  return (
    <section id="recensioni" ref={sectionRef} className="min-h-[70vh] py-32 bg-[#F7F7F5] flex items-center">
      <div className="mx-auto max-w-7xl px-6 lg:px-8 w-full">
        {/* Header */}
        <div data-animate className="opacity-0 text-center mb-16">
          <p className="overline text-[#6B6B6B] mb-4">Testimonianze</p>
          <h2 
            className="font-light text-[#0A0A0A] mb-8"
            style={{ fontSize: "clamp(2rem, 4vw, 3rem)" }}
          >
            Cosa dicono i nostri clienti
          </h2>
          
          {/* Badge */}
          <div className="inline-flex items-center gap-3 px-6 py-3 border border-[#E8E8E8] bg-white">
            <span className="text-[11px] uppercase tracking-[0.1em] text-[#6B6B6B] font-medium">Eccellente</span>
            <span className="text-[#6B6B6B]">&middot;</span>
            <span className="text-[11px] text-[#6B6B6B]">99 recensioni Google</span>
            <div className="flex gap-0.5">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="h-3 w-3 fill-[#0A0A0A] text-[#0A0A0A]" />
              ))}
            </div>
          </div>
        </div>

        {/* Carousel */}
        <div data-animate className="opacity-0 animate-delay-150 relative">
          <div className="overflow-hidden">
            <div
              className="flex gap-6 transition-transform duration-500 ease-out"
              style={{ transform: `translateX(-${currentIndex * (100 / visibleCount)}%)` }}
            >
              {testimonials.map((testimonial, index) => (
                <div
                  key={index}
                  className={`flex-shrink-0 ${isMobile ? "w-full" : "w-[calc(33.333%-1rem)]"}`}
                >
                  <div className="bg-white border border-[#E8E8E8] p-10 h-full" style={{ borderRadius: "2px" }}>
                    <div className="flex gap-0.5 mb-6">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="h-4 w-4 fill-[#0A0A0A] text-[#0A0A0A]" />
                      ))}
                    </div>
                    <p className="text-[#0A0A0A] text-sm leading-relaxed mb-8 font-light">
                      &quot;{testimonial.text}&quot;
                    </p>
                    <p className="text-[11px] uppercase tracking-[0.12em] text-[#6B6B6B]">
                      {testimonial.name}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Navigation Arrows */}
          <button
            onClick={prev}
            disabled={currentIndex === 0}
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 w-10 h-10 border border-[#E8E8E8] flex items-center justify-center disabled:opacity-30 disabled:cursor-not-allowed hover:bg-[#0A0A0A] hover:text-white hover:border-[#0A0A0A] transition-all duration-300 text-[#0A0A0A] bg-white"
            aria-label="Recensione precedente"
          >
            <ChevronLeft className="h-4 w-4" />
          </button>
          <button
            onClick={next}
            disabled={currentIndex >= maxIndex}
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 w-10 h-10 border border-[#E8E8E8] flex items-center justify-center disabled:opacity-30 disabled:cursor-not-allowed hover:bg-[#0A0A0A] hover:text-white hover:border-[#0A0A0A] transition-all duration-300 text-[#0A0A0A] bg-white"
            aria-label="Recensione successiva"
          >
            <ChevronRight className="h-4 w-4" />
          </button>
        </div>
      </div>
    </section>
  )
}
