"use client"

import { useRef, useEffect } from "react"
import Image from "next/image"

const projects = [
  {
    image: "https://images.unsplash.com/photo-1509391366360-2e959784a276?w=800&q=90",
    date: "Marzo 2024",
  },
  {
    image: "https://images.unsplash.com/photo-1466611653911-95081537e5b7?w=800&q=90",
    date: "Febbraio 2024",
  },
  {
    image: "https://images.unsplash.com/photo-1508514177221-188b1cf16e9d?w=800&q=90",
    date: "Gennaio 2024",
  },
  {
    image: "https://images.unsplash.com/photo-1497440001374-f26997328c1b?w=800&q=90",
    date: "Dicembre 2023",
  },
  {
    image: "https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?w=800&q=90",
    date: "Novembre 2023",
  },
  {
    image: "https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?w=800&q=90",
    date: "Ottobre 2023",
  },
  {
    image: "https://images.unsplash.com/photo-1545209463-4ef10d1a1ace?w=800&q=90",
    date: "Settembre 2023",
  },
  {
    image: "https://images.unsplash.com/photo-1521618755572-156ae0cdd74d?w=800&q=90",
    date: "Agosto 2023",
  },
]

export function ProjectsSection() {
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
    <section id="portfolio" ref={sectionRef} className="min-h-[80vh] py-32 bg-[#F7F7F5]">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        {/* Header */}
        <div data-animate className="opacity-0 text-center mb-16">
          <p className="overline text-[#6B6B6B] mb-4">Portfolio</p>
          <h2 
            className="font-light text-[#0A0A0A]"
            style={{ fontSize: "clamp(2rem, 4vw, 3rem)" }}
          >
            I nostri progetti realizzati
          </h2>
        </div>

        {/* Grid 2 columns */}
        <div data-animate className="opacity-0 animate-delay-150 grid grid-cols-2 gap-6">
          {projects.map((project, index) => (
            <div
              key={index}
              className="group relative aspect-[4/3] overflow-hidden cursor-pointer"
            >
              <Image
                src={project.image}
                alt={`Impianto fotovoltaico installato da Solair Group - ${project.date}`}
                fill
                className="object-cover transition-transform duration-[400ms] ease-out group-hover:scale-[1.02]"
                loading="lazy"
              />
              {/* Caption below image */}
              <div className="absolute bottom-0 left-0 right-0 bg-white py-4 px-4">
                <p className="text-[11px] uppercase tracking-[0.12em] text-[#6B6B6B]">
                  {project.date} &middot; Solair Group
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
