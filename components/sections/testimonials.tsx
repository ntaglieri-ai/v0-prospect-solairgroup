"use client"

import { useRef, useState, useEffect } from "react"
import { motion, useInView } from "framer-motion"
import { Star, ChevronLeft, ChevronRight, ArrowUpRight } from "lucide-react"
import { Button } from "@/components/ui/button"

const testimonials = [
  {
    name: "Carmelo Ragusa",
    rating: 5,
    text: "Volevo ringraziare Gaetano la parte commerciale che mi ha fatto conoscere ed acquistare il prodotto. Professionalità e competenza al top. Consiglio vivamente Solair Group.",
  },
  {
    name: "Ma Lav",
    rating: 5,
    text: "Ho scelto Solair Group per l'installazione del mio impianto fotovoltaico e sono rimasto molto soddisfatto. Dall'inizio alla fine, il team è stato professionale e competente.",
  },
  {
    name: "Tommaso Nano",
    rating: 5,
    text: "Ho scelto Solair Group per l'installazione del mio impianto fotovoltaico e sono rimasto davvero soddisfatto. Servizio eccellente e personale qualificato.",
  },
  {
    name: "Giuseppe Ferrara",
    rating: 5,
    text: "Esperienza fantastica con Solair Group. Impianto installato in tempi record e già vedo i risparmi in bolletta. Team cortese e sempre disponibile per ogni domanda.",
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
    <section id="testimonianze" className="py-20 lg:py-32 bg-gradient-to-br from-[#0D1F3C] to-[#1A4A4A]" ref={ref}>
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-[var(--font-heading)] font-bold text-white mb-6 text-balance">
            Le esperienze dei nostri clienti
          </h2>
          <div className="flex items-center justify-center gap-3 text-white">
            <span className="text-lg font-semibold">ECCELLENTE</span>
            <div className="flex gap-1">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="h-5 w-5 fill-[#F5C842] text-[#F5C842]" />
              ))}
            </div>
            <span className="text-white/70">In base a 99 recensioni — Google</span>
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
                  initial={{ opacity: 0, y: 30 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className={`flex-shrink-0 ${isMobile ? "w-full" : "w-[calc(33.333%-1rem)]"}`}
                >
                  <div className="bg-white rounded-2xl p-6 h-full shadow-lg">
                    <div className="flex gap-1 mb-4">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <Star key={i} className="h-4 w-4 fill-[#F5C842] text-[#F5C842]" />
                      ))}
                    </div>
                    <p className="text-[#0D1F3C]/80 text-sm leading-relaxed mb-4">
                      &quot;{testimonial.text}&quot;
                    </p>
                    <p className="font-semibold text-[#0D1F3C]">{testimonial.name}</p>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>

          {/* Navigation Arrows */}
          <button
            onClick={prev}
            disabled={currentIndex === 0}
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 w-10 h-10 rounded-full bg-white shadow-lg flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed hover:bg-[#EEF4FA] transition-colors"
            aria-label="Recensione precedente"
          >
            <ChevronLeft className="h-5 w-5 text-[#0D1F3C]" />
          </button>
          <button
            onClick={next}
            disabled={currentIndex >= maxIndex}
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 w-10 h-10 rounded-full bg-white shadow-lg flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed hover:bg-[#EEF4FA] transition-colors"
            aria-label="Recensione successiva"
          >
            <ChevronRight className="h-5 w-5 text-[#0D1F3C]" />
          </button>
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-center mt-12"
        >
          <Button
            asChild
            variant="outline"
            className="bg-transparent border-white text-white hover:bg-white hover:text-[#0D1F3C] rounded-full px-8 py-6 text-lg font-semibold"
          >
            <a href="#contatti" aria-label="Scopri come possiamo aiutarti">
              Scopri come possiamo aiutarti
              <ArrowUpRight className="ml-2 h-5 w-5" />
            </a>
          </Button>
        </motion.div>
      </div>
    </section>
  )
}
