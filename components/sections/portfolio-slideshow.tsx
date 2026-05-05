"use client"

import { useState, useEffect, useCallback } from "react"
import Image from "next/image"

const portfolioSlides = [
  {
    image: "https://images.unsplash.com/photo-1509391366360-2e959784a276?w=1400&q=90",
    alt: "Impianto fotovoltaico residenziale su villa moderna",
  },
  {
    image: "https://images.unsplash.com/photo-1508514177221-188b1cf16e9d?w=1400&q=90",
    alt: "Pannelli solari su tetti di quartiere residenziale",
  },
  {
    image: "https://images.unsplash.com/photo-1559302504-64aae6ca6b6d?w=1400&q=90",
    alt: "Impianto fotovoltaico industriale su capannone",
  },
  {
    image: "https://images.unsplash.com/photo-1566093097221-ac2335b09e70?w=1400&q=90",
    alt: "Dettaglio installazione pannelli solari",
  },
  {
    image: "https://images.unsplash.com/photo-1497440001374-f26997328c1b?w=1400&q=90",
    alt: "Campo fotovoltaico con pannelli in serie",
  },
  {
    image: "https://images.unsplash.com/photo-1592833159155-c62df1b65634?w=1400&q=90",
    alt: "Pannelli solari su tetto con cielo azzurro",
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
