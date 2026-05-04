"use client"

import { useRef, useState, useEffect } from "react"
import { motion, useInView } from "framer-motion"
import { Star, ChevronLeft, ChevronRight } from "lucide-react"

const testimonials = [
  {
    name: "Carmelo Ragusa",
    rating: 5,
    text: "Volevo ringraziare Gaetano la parte commerciale che mi ha fatto conoscere ed acquistare il prodotto. Professionalita e competenza al top. Consiglio vivamente Solair Group.",
  },
  {
    name: "Ma Lav",
    rating: 5,
    text: "Ho scelto Solair Group per l installazione del mio impianto fotovoltaico e sono rimasto molto soddisfatto. Dall inizio alla fine, il team e stato professionale e competente.",
  },
  {
    name: "Tommaso Nano",
    rating: 5,
    text: "Ho scelto Solair Group per l installazione del mio impianto fotovoltaico e sono rimasto davvero soddisfatto. Servizio eccellente e personale qualificato.",
  },
  {
    name: "Giuseppe Ferrara",
    rating: 5,
    text: "Esperienza fantastica con Solair Group. Impianto installato in tempi record e gia vedo i risparmi in bolletta. Team cortese e sempre disponibile per ogni domanda.",
  },
  {
    name: "Maria Rossi",
    rating: 5,
    text: "Finalmente indipendenza energetica! Grazie a Solair Group ho un impianto efficiente e un servizio di monitoraggio eccezionale. Lo consiglio a tutti.",
  },
]

export function TestimonialsSection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })
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

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev >= maxIndex ? 0 : prev + 1))
    }, 5000)
    return () => clearInterval(interval)
  }, [maxIndex])

  return (
    <section id="testimonianze" className="min-h-[90vh] py-32 bg-white" ref={ref}>
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          <p className="text-[10px] tracking-[0.4em] uppercase text-[#0A0A0A]/50 mb-6 font-light">
            Recensioni verificate
          </p>
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-[var(--font-display)] font-light text-[#0A0A0A] leading-[1.15] mb-8">
            Le esperienze
            <br />
            <span className="font-normal">dei nostri clienti</span>
          </h2>
          <div className="flex items-center justify-center gap-4">
            <span className="text-sm tracking-[0.1em] uppercase text-[#0A0A0A]/60 font-light">Eccellente</span>
            <div className="flex gap-1">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="h-4 w-4 fill-[#0A0A0A] text-[#0A0A0A]" />
              ))}
            </div>
            <span className="text-sm text-[#0A0A0A]/40 font-light">99 recensioni Google</span>
          </div>
        </motion.div>

        {/* Carousel */}
        <div className="relative">
          <div className="overflow-hidden">
            <motion.div
              className="flex gap-6"
              animate={{ x: `-${currentIndex * (100 / visibleCount + 1.5)}%` }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
            >
              {testimonials.map((testimonial, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 40 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className={`flex-shrink-0 ${isMobile ? "w-full" : "w-[calc(33.333%-1rem)]"}`}
                >
                  <div className="bg-[#F9F9F7] border border-[#0A0A0A]/5 p-8 h-full">
                    <div className="flex gap-1 mb-6">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <Star key={i} className="h-3 w-3 fill-[#0A0A0A] text-[#0A0A0A]" />
                      ))}
                    </div>
                    <p className="text-[#0A0A0A]/70 text-sm leading-relaxed mb-6 font-light">
                      &quot;{testimonial.text}&quot;
                    </p>
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-px bg-[#0A0A0A]" />
                      <p className="text-sm text-[#0A0A0A] tracking-wide">{testimonial.name}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>

          {/* Navigation Arrows */}
          <button
            onClick={prev}
            disabled={currentIndex === 0}
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 w-12 h-12 border border-[#0A0A0A]/20 flex items-center justify-center disabled:opacity-30 disabled:cursor-not-allowed hover:bg-[#0A0A0A] hover:text-white transition-all duration-300 text-[#0A0A0A]/60 bg-white"
            aria-label="Recensione precedente"
          >
            <ChevronLeft className="h-5 w-5" />
          </button>
          <button
            onClick={next}
            disabled={currentIndex >= maxIndex}
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 w-12 h-12 border border-[#0A0A0A]/20 flex items-center justify-center disabled:opacity-30 disabled:cursor-not-allowed hover:bg-[#0A0A0A] hover:text-white transition-all duration-300 text-[#0A0A0A]/60 bg-white"
            aria-label="Recensione successiva"
          >
            <ChevronRight className="h-5 w-5" />
          </button>
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="text-center mt-20"
        >
          <a href="#contatti" className="btn-tesla">
            Scopri come possiamo aiutarti
          </a>
        </motion.div>
      </div>
    </section>
  )
}
