"use client"

import { useRef } from "react"
import { motion, useInView } from "framer-motion"
import Image from "next/image"
import { ArrowUpRight } from "lucide-react"
import { Button } from "@/components/ui/button"

const projects = [
  {
    image: "https://images.unsplash.com/photo-1509391366360-2e959784a276?w=600&q=80",
    date: "Marzo 2024",
    alt: "Impianto fotovoltaico residenziale installato su tetto a falda",
  },
  {
    image: "https://images.unsplash.com/photo-1466611653911-95081537e5b7?w=600&q=80",
    date: "Febbraio 2024",
    alt: "Pannelli solari su tetto in terracotta italiano",
  },
  {
    image: "https://images.unsplash.com/photo-1508514177221-188b1cf16e9d?w=600&q=80",
    date: "Gennaio 2024",
    alt: "Casa moderna con impianto fotovoltaico integrato",
  },
  {
    image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&q=80",
    date: "Dicembre 2023",
    alt: "Installazione pannelli solari in corso",
  },
  {
    image: "https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?w=600&q=80",
    date: "Novembre 2023",
    alt: "Impianto fotovoltaico industriale su capannone",
  },
  {
    image: "https://images.unsplash.com/photo-1509391366360-2e959784a276?w=600&q=80",
    date: "Ottobre 2023",
    alt: "Sistema fotovoltaico con accumulo installato",
  },
  {
    image: "https://images.unsplash.com/photo-1466611653911-95081537e5b7?w=600&q=80",
    date: "Settembre 2023",
    alt: "Progetto solare completato in Sicilia",
  },
  {
    image: "https://images.unsplash.com/photo-1508514177221-188b1cf16e9d?w=600&q=80",
    date: "Agosto 2023",
    alt: "Impianto fotovoltaico villa con giardino",
  },
]

export function ProjectsSection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  return (
    <section className="py-20 lg:py-32 bg-[#EEF4FA]" ref={ref}>
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 mb-12"
        >
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-[var(--font-heading)] font-bold text-[#0D1F3C] text-balance">
            I nostri progetti realizzati
          </h2>
          <Button
            asChild
            className="bg-[#1A4A4A] hover:bg-[#1B6B6B] text-white rounded-full px-6 py-5 font-semibold"
          >
            <a href="#contatti" aria-label="Passa anche tu al rinnovabile">
              Passa anche tu al rinnovabile
              <ArrowUpRight className="ml-2 h-5 w-5" />
            </a>
          </Button>
        </motion.div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {projects.map((project, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: index * 0.05 }}
              className="relative group rounded-2xl overflow-hidden aspect-square"
            >
              <Image
                src={project.image}
                alt={project.alt}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-500"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0D1F3C]/70 via-transparent to-transparent" />
              <div className="absolute bottom-4 left-4 right-4">
                <p className="text-white/80 text-xs mb-1">{project.date}</p>
                <p className="text-white text-sm font-semibold">SolairGroup</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
