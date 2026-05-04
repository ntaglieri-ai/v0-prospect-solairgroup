"use client"

import { useRef } from "react"
import { motion, useInView } from "framer-motion"
import Image from "next/image"

const projects = [
  {
    image: "https://images.unsplash.com/photo-1509391366360-2e959784a276?w=600&q=80",
    date: "Marzo 2024",
  },
  {
    image: "https://images.unsplash.com/photo-1466611653911-95081537e5b7?w=600&q=80",
    date: "Febbraio 2024",
  },
  {
    image: "https://images.unsplash.com/photo-1508514177221-188b1cf16e9d?w=600&q=80",
    date: "Gennaio 2024",
  },
  {
    image: "https://images.unsplash.com/photo-1497440001374-f26997328c1b?w=600&q=80",
    date: "Dicembre 2023",
  },
  {
    image: "https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?w=600&q=80",
    date: "Novembre 2023",
  },
  {
    image: "https://images.unsplash.com/photo-1509391366360-2e959784a276?w=600&q=80",
    date: "Ottobre 2023",
  },
  {
    image: "https://images.unsplash.com/photo-1466611653911-95081537e5b7?w=600&q=80",
    date: "Settembre 2023",
  },
  {
    image: "https://images.unsplash.com/photo-1508514177221-188b1cf16e9d?w=600&q=80",
    date: "Agosto 2023",
  },
]

export function ProjectsSection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  return (
    <section className="min-h-[90vh] py-32 bg-white" ref={ref}>
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-8 mb-16"
        >
          <div>
            <p className="text-[10px] tracking-[0.4em] uppercase text-[#0A0A0A]/50 mb-6 font-light">
              Portfolio
            </p>
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-[var(--font-display)] font-light text-[#0A0A0A] leading-[1.15]">
              I nostri progetti
              <br />
              <span className="font-normal">realizzati</span>
            </h2>
          </div>
          <a href="#contatti" className="btn-tesla">
            Passa al rinnovabile
          </a>
        </motion.div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-px bg-[#0A0A0A]/10">
          {projects.map((project, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 40 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.05 }}
              className="relative group aspect-square overflow-hidden bg-white"
            >
              <Image
                src={project.image}
                alt={`Progetto fotovoltaico ${project.date}`}
                fill
                className="object-cover group-hover:scale-105 transition-all duration-700"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-white via-transparent to-transparent group-hover:from-white/90 transition-all duration-500" />
              <div className="absolute bottom-0 left-0 right-0 p-6 transform translate-y-full group-hover:translate-y-0 transition-transform duration-500">
                <p className="text-[10px] tracking-[0.2em] uppercase text-[#0A0A0A]/60 mb-1">{project.date}</p>
                <p className="text-sm text-[#0A0A0A] font-light">Solair Group</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
