"use client"

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
]

export function ProjectsSection() {
  return (
    <section id="portfolio" className="relative min-h-screen py-8 bg-gray-50">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-6">
          <p className="text-xs uppercase tracking-widest text-gray-500 mb-4">Portfolio</p>
          <h2 className="text-3xl md:text-4xl font-light text-gray-900">
            I nostri progetti realizzati
          </h2>
        </div>

        {/* Grid 2 columns */}
        <div className="grid md:grid-cols-2 gap-6">
          {projects.map((project, index) => (
            <div
              key={index}
              className="group relative aspect-[4/3] overflow-hidden cursor-pointer"
            >
              <Image
                src={project.image}
                alt={`Impianto fotovoltaico - ${project.date}`}
                fill
                className="object-cover transition-transform duration-300 group-hover:scale-105"
              />
              {/* Caption */}
              <div className="absolute bottom-0 left-0 right-0 bg-white py-4 px-4">
                <p className="text-xs uppercase tracking-wider text-gray-500">
                  {project.date} - Solair Group
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Gradient fade to white */}
      <div className="absolute bottom-0 left-0 right-0 h-[80px] bg-gradient-to-b from-transparent to-white pointer-events-none" />
    </section>
  )
}
