"use client"

import { useRef } from "react"
import { motion, useInView } from "framer-motion"
import Image from "next/image"
import { MapPin, Briefcase, Users } from "lucide-react"

const locations = [
  { city: "Treviso", region: "Veneto" },
  { city: "Torino", region: "Piemonte" },
  { city: "Catania", region: "Sicilia" },
  { city: "Giarre", region: "Sicilia" },
]

export function MapSection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  return (
    <section id="lavora" className="min-h-[90vh] py-32 bg-[#0A0A08]" ref={ref}>
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        {/* Map Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          <p className="text-[10px] tracking-[0.4em] uppercase text-[#C8A96E] mb-6 font-light">
            Le nostre sedi
          </p>
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-[var(--font-display)] font-normal text-[#F2EDE4] leading-[1.15] mb-16">
            Operiamo in
            <br />
            <span className="italic">tutta Italia</span>
          </h2>
          
          {/* Locations Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-1">
            {locations.map((location, index) => (
              <motion.div
                key={location.city}
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-[#1A1A18] border border-[#F2EDE4]/5 p-8 group hover:border-[#C8A96E]/30 transition-all duration-500"
              >
                <MapPin className="h-5 w-5 text-[#C8A96E] mb-4 mx-auto" />
                <p className="font-[var(--font-display)] text-[#F2EDE4] mb-1">{location.city}</p>
                <p className="text-xs text-[#F2EDE4]/40 font-light">{location.region}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* About & Careers */}
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-center pt-16 border-t border-[#F2EDE4]/10">
          {/* Left - Image */}
          <motion.div
            initial={{ opacity: 0, x: -60 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative aspect-[4/3] overflow-hidden"
          >
            <Image
              src="https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=800&q=80"
              alt="Tecnico installatore Solair Group al lavoro"
              fill
              className="object-cover grayscale hover:grayscale-0 transition-all duration-700"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A08] via-transparent to-transparent opacity-60" />
          </motion.div>

          {/* Right - Text & Careers */}
          <motion.div
            initial={{ opacity: 0, x: 60 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            <p className="text-[10px] tracking-[0.4em] uppercase text-[#C8A96E] mb-6 font-light">
              Chi siamo
            </p>
            <h3 className="text-3xl sm:text-4xl font-[var(--font-display)] font-normal text-[#F2EDE4] mb-6 leading-[1.15]">
              Esperienza e <span className="italic">innovazione</span>
            </h3>
            <p className="text-base text-[#F2EDE4]/60 mb-12 leading-relaxed font-light">
              Solair Group nasce con l&apos;obiettivo di rendere accessibile a tutti l&apos;energia rinnovabile. 
              Da anni forniamo impianti fotovoltaici, pompe di calore e soluzioni su misura per privati e aziende.
            </p>

            {/* Careers Card */}
            <div className="border border-[#F2EDE4]/10 p-8">
              <div className="flex items-center gap-3 mb-6">
                <Briefcase className="h-5 w-5 text-[#C8A96E]" />
                <h4 className="text-lg font-[var(--font-display)] text-[#F2EDE4]">Lavora con noi</h4>
              </div>
              <p className="text-sm text-[#F2EDE4]/50 mb-6 font-light">Siamo alla ricerca di:</p>
              <ul className="space-y-3 mb-8">
                <li className="flex items-center gap-3">
                  <Users className="h-4 w-4 text-[#C8A96E]" />
                  <span className="text-[#F2EDE4]/80 font-light">Installatori</span>
                </li>
                <li className="flex items-center gap-3">
                  <Users className="h-4 w-4 text-[#C8A96E]" />
                  <span className="text-[#F2EDE4]/80 font-light">Commerciali</span>
                </li>
              </ul>
              <a
                href="mailto:info@solairgroup.it"
                className="block w-full text-center py-4 text-[10px] tracking-[0.2em] uppercase font-medium bg-[#C8A96E] text-[#0A0A08] hover:bg-[#B8995E] transition-all duration-300"
              >
                Candidati ora
              </a>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
