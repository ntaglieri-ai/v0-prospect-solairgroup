"use client"

import { useState, useEffect } from "react"
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
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768)
    checkMobile()
    window.addEventListener("resize", checkMobile)
    return () => window.removeEventListener("resize", checkMobile)
  }, [])

  const visibleCount = isMobile ? 1 : 3
  const maxIndex = testimonials.length - visibleCount

  const next = () => setCurrentIndex((prev) => Math.min(prev + 1, maxIndex))
  const prev = () => setCurrentIndex((prev) => Math.max(prev - 1, 0))

  return (
    <section id="recensioni" className="relative min-h-[60vh] py-[100px] bg-gray-50 flex items-center mb-0">
      <div className="mx-auto max-w-7xl px-6 lg:px-8 w-full">
        {/* Header */}
        <div className="text-center mb-16">
          <p className="text-sm font-semibold uppercase tracking-widest text-[#2e8b72] mb-4">Testimonianze</p>
          <h2 className="text-3xl md:text-4xl font-extrabold text-[#1e3a5f] tracking-tight mb-8">
            Cosa dicono i nostri clienti
          </h2>
          
          {/* Badge */}
          <div className="inline-flex items-center gap-3 px-6 py-3 border border-[#d0d6da] bg-white">
            <span className="overline text-[#8a9aaa]">Eccellente</span>
            <span className="text-[#d0d6da]">·</span>
            <span className="text-[11px] text-[#8a9aaa]">99 recensioni Google</span>
            <div className="flex gap-0.5">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="h-3 w-3 fill-[#2e8b72] text-[#2e8b72]" />
              ))}
            </div>
          </div>
        </div>

        {/* Carousel */}
        <div className="relative">
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
                  <div className="bg-white rounded-2xl shadow-md hover:-translate-y-2 hover:shadow-xl transition-all duration-300 p-10 h-full">
                    {/* Quote icon */}
                    <span className="text-6xl text-[#2e8b72] font-serif leading-none block mb-4">&ldquo;</span>
                    <div className="flex gap-0.5 mb-6">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="h-5 w-5 fill-amber-400 text-amber-400" />
                      ))}
                    </div>
                    <p className="text-gray-700 leading-relaxed text-base mb-8 font-light">
                      {testimonial.text}
                    </p>
                    <p className="font-semibold text-[#1e3a5f]">
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
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 w-10 h-10 border border-[#d0d6da] flex items-center justify-center disabled:opacity-30 disabled:cursor-not-allowed hover:bg-[#1e3a5f] hover:text-white hover:border-[#1e3a5f] transition-all duration-300 text-[#1e3a5f] bg-white"
            aria-label="Recensione precedente"
          >
            <ChevronLeft className="h-4 w-4" />
          </button>
          <button
            onClick={next}
            disabled={currentIndex >= maxIndex}
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 w-10 h-10 border border-[#d0d6da] flex items-center justify-center disabled:opacity-30 disabled:cursor-not-allowed hover:bg-[#1e3a5f] hover:text-white hover:border-[#1e3a5f] transition-all duration-300 text-[#1e3a5f] bg-white"
            aria-label="Recensione successiva"
          >
            <ChevronRight className="h-4 w-4" />
          </button>
        </div>
      </div>
    </section>
  )
}
