"use client"

import { useRef, useEffect } from "react"

const locations = [
  { city: "Catania", region: "Sicilia", contact: "Marco Rossi", phone: "+39 095 290 0278", email: "catania@solairgroup.it" },
  { city: "Giarre (CT)", region: "Sicilia", contact: "Luca Ferrara", phone: "+39 095 290 0278", email: "giarre@solairgroup.it" },
  { city: "Treviso (TV)", region: "Veneto", contact: "Anna Bianchi", phone: "+39 095 290 0278", email: "treviso@solairgroup.it" },
  { city: "Torino (TO)", region: "Piemonte", contact: "Giuseppe Verdi", phone: "+39 095 290 0278", email: "torino@solairgroup.it" },
]

export function MapSection() {
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
    <section ref={sectionRef} className="py-32 bg-white">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        {/* Header */}
        <div data-animate className="opacity-0 text-center mb-16">
          <p className="overline text-[#6B6B6B] mb-4">Sedi</p>
          <h2 
            className="font-light text-[#0A0A0A]"
            style={{ fontSize: "clamp(2rem, 4vw, 3rem)" }}
          >
            Le nostre sedi in Italia
          </h2>
        </div>

        {/* 4 Columns with vertical separators */}
        <div data-animate className="opacity-0 animate-delay-150 grid grid-cols-2 lg:grid-cols-4">
          {locations.map((location, index) => (
            <div 
              key={location.city}
              className={`py-8 px-6 text-center ${
                index > 0 ? "border-l border-[#E8E8E8]" : ""
              }`}
            >
              <p className="overline text-[#6B6B6B] mb-2">{location.region}</p>
              <h3 className="text-xl font-light text-[#0A0A0A] mb-4">{location.city}</h3>
              <p className="text-sm text-[#6B6B6B] font-light mb-1">{location.contact}</p>
              <p className="text-sm text-[#6B6B6B] font-light">{location.phone}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
