"use client"

import Image from "next/image"

const projects = [
  {
    image: "https://images.unsplash.com/photo-1509391366360-2e959784a276?w=800&q=90",
    date: "Marzo 2024",
    alt: "Impianto fotovoltaico su tetto residenziale",
  },
  {
    image: "https://images.unsplash.com/photo-1466611653911-95081537e5b7?w=800&q=90",
    date: "Febbraio 2024",
    alt: "Vista drone di impianto solare su casa moderna",
  },
  {
    image: "https://images.unsplash.com/photo-1508514177221-188b1cf16e9d?w=800&q=90",
    date: "Gennaio 2024",
    alt: "Pannelli solari su tetto con cielo azzurro",
  },
  {
    image: "https://images.unsplash.com/photo-1509391366360-2e959784a276?w=800&q=90",
    date: "Dicembre 2023",
    alt: "Dettaglio installazione pannelli fotovoltaici",
  },
]

export function ProjectsSection() {
  return (
    <section id="portfolio" className="min-h-screen py-[100px] bg-[#F7F7F5] border-t border-[#E8E8E8]">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <p className="overline text-[#6B6B6B] mb-4">Portfolio</p>
          <h2 className="font-heading text-[#0A0A0A]">
            I nostri progetti realizzati
          </h2>
        </div>

        {/* Grid 2 columns with large square images */}
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
                className="object-cover transition-transform duration-[400ms] group-hover:scale-[1.02]"
                loading="lazy"
              />
              {/* Caption below image */}
              <div className="absolute bottom-0 left-0 right-0 bg-white py-4 px-4">
                <p className="overline text-[#6B6B6B]">
                  {project.date} - Solair Group
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
