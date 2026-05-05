"use client"

import { useState, useEffect, useCallback } from "react"
import Image from "next/image"

const portfolioSlides = [
  {
    image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/WhatsApp%20Image%202026-05-05%20at%2012.47.34%20%282%29-Xqge444QaRZ9vSZXk0pECwAqTJrw91.jpeg",
    alt: "Pannelli solari su tetto piano con vista su paese siciliano e montagne",
  },
  {
    image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/WhatsApp%20Image%202026-05-05%20at%2012.47.33-B07J5R5jJuzKTIi4ACCR6KncWOuS1w.jpeg",
    alt: "Impianto fotovoltaico a terra su struttura metallica in campagna con colline",
  },
  {
    image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/WhatsApp%20Image%202026-05-05%20at%2012.47.34-rbliXLBYWrDvmtNOoTfn4aFo4DhGnw.jpeg",
    alt: "Pannelli solari su tetto con vista su porto turistico e citta costiera",
  },
  {
    image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/WhatsApp%20Image%202026-05-05%20at%2012.47.34%20%283%29-naERKcsKNPKnIVC9zlQGrn45dnn2Mh.jpeg",
    alt: "Pannelli solari su tetto in tegole rosse con vista su colline verdi e montagne",
  },
  {
    image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/WhatsApp%20Image%202026-05-05%20at%2012.47.34%20%281%29-rFf14zFe1V2g4i9JIi83zH8OfnMaAH.jpeg",
    alt: "Villa moderna con piscina infinity di notte con pannelli solari sul tetto",
  },
  {
    image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/WhatsApp%20Image%202026-05-05%20at%2012.47.34%20%284%29-QknYucyOPuBdn0IcHB14cGgfTATtld.jpeg",
    alt: "Pannelli solari su tetto in tegole con vista su quartiere residenziale e montagna",
  },
]

export function PortfolioSlideshow() {
  const [currentSlide, setCurrentSlide] = useState(0)

  const nextSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev + 1) % portfolioSlides.length)
  }, [])

  useEffect(() => {
    const interval = setInterval(nextSlide, 2000)
    return () => clearInterval(interval)
  }, [nextSlide])

  const goToSlide = (index: number) => {
    setCurrentSlide(index)
  }

  return (
    <section id="portfolio" className="relative h-screen mb-[50px] overflow-hidden">
      {/* Slides */}
      {portfolioSlides.map((slide, index) => (
        <div
          key={index}
          className={`absolute inset-0 transition-opacity duration-700 ${
            index === currentSlide ? "opacity-100" : "opacity-0"
          }`}
        >
          <Image
            src={slide.image}
            alt={slide.alt}
            fill
            className="object-cover"
            loading={index === 0 ? "eager" : "lazy"}
            priority={index === 0}
          />
          {/* Overlay for consistency */}
          <div className="absolute inset-0 bg-black/25" />
        </div>
      ))}

      {/* Content overlay */}
      <div className="absolute inset-0 flex flex-col items-center justify-center z-10">
        <p className="overline text-white/60 mb-4">Portfolio</p>
        <h2 className="font-heading text-white text-center mb-8" style={{ fontSize: "clamp(2.5rem, 5vw, 4rem)" }}>
          I Nostri Progetti
        </h2>
      </div>

      {/* Dots navigation */}
      <div className="absolute bottom-12 left-1/2 -translate-x-1/2 flex gap-3 z-20">
        {portfolioSlides.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${
              index === currentSlide 
                ? "bg-white scale-110" 
                : "bg-white/40 hover:bg-white/60"
            }`}
            aria-label={`Vai alla slide ${index + 1}`}
          />
        ))}
      </div>
    </section>
  )
}
