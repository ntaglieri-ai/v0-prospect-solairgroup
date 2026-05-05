"use client"

import Image from "next/image"

const projects = [
  {
    image: "https://images.unsplash.com/photo-1509391366360-2e959784a276?w=800&q=90",
    alt: "Impianto fotovoltaico su tetto residenziale moderno",
    date: "Marzo 2024",
  },
  {
    image: "https://images.unsplash.com/photo-1508514177221-188b1cf16e9d?w=800&q=90",
    alt: "Pannelli solari su casa con vista drone",
    date: "Febbraio 2024",
  },
  {
    image: "https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?w=800&q=90",
    alt: "Dettaglio pannelli fotovoltaici alta qualita",
    date: "Gennaio 2024",
  },
  {
    image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=90",
    alt: "Installazione pannelli solari su tetto",
    date: "Dicembre 2023",
  },
  {
    image: "https://images.unsplash.com/photo-1513828583688-c52646db42da?w=800&q=90",
    alt: "Casa moderna con impianto fotovoltaico completo",
    date: "Novembre 2023",
  },
  {
    image: "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=800&q=90",
    alt: "Sistema fotovoltaico residenziale",
    date: "Ottobre 2023",
  },
]

export function ProjectsSection() {
  return (
    <section id="portfolio" className="min-h-[80vh] py-[100px] bg-[#E8E8E8] mb-[50px]">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <p className="overline text-[#6B6B6B] mb-4">Portfolio</p>
          <h2 className="font-heading text-[#0A0A0A]">
            I nostri progetti realizzati
          </h2>
        </div>

        {/* Grid 2 columns */}
        <div className="grid md:grid-cols-2 gap-6">
          {projects.map((project, index) => (
            <div
              key={index}
              className="group relative aspect-square overflow-hidden cursor-pointer"
            >
              <Image
                src={project.image}
                alt={project.alt}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-[1.02]"
                loading="lazy"
              />
              {/* Caption */}
              <div className="absolute bottom-0 left-0 right-0 bg-white py-4 px-6">
                <p className="overline text-[#6B6B6B]">
                  {project.date} · Solair Group
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
