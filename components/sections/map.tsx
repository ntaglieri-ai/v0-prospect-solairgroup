"use client"

import { useRef } from "react"
import { motion, useInView } from "framer-motion"
import Image from "next/image"
import { MapPin, ArrowUpRight, Briefcase, Users } from "lucide-react"
import { Button } from "@/components/ui/button"

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
    <section id="lavora" className="py-20 lg:py-32 bg-white" ref={ref}>
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Map Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-[var(--font-heading)] font-bold text-[#0D1F3C] mb-6 text-balance">
            Operiamo in tutta Italia
          </h2>
          
          {/* Map Placeholder with Locations */}
          <div className="relative bg-gradient-to-br from-[#EEF4FA] to-[#DDE9F5] rounded-3xl p-8 lg:p-12 mb-8">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {locations.map((location, index) => (
                <motion.div
                  key={location.city}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={isInView ? { opacity: 1, scale: 1 } : {}}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                  className="bg-white rounded-2xl p-6 shadow-sm"
                >
                  <MapPin className="h-8 w-8 text-[#1A4A4A] mb-3 mx-auto" />
                  <p className="font-[var(--font-heading)] font-bold text-[#0D1F3C]">{location.city}</p>
                  <p className="text-sm text-[#0D1F3C]/60">{location.region}</p>
                </motion.div>
              ))}
            </div>
          </div>

          <Button
            asChild
            className="bg-[#1A4A4A] hover:bg-[#1B6B6B] text-white rounded-full px-8 py-6 text-lg font-semibold"
          >
            <a href="#contatti" aria-label="Passa anche tu al rinnovabile">
              Passa anche tu al rinnovabile
              <ArrowUpRight className="ml-2 h-5 w-5" />
            </a>
          </Button>
        </motion.div>

        {/* About & Careers */}
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center mt-20">
          {/* Left - Image */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="rounded-3xl overflow-hidden shadow-xl"
          >
            <Image
              src="https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=800&q=80"
              alt="Tecnico installatore Solair Group al lavoro su pannelli solari"
              width={600}
              height={500}
              className="w-full h-[400px] object-cover"
              loading="lazy"
            />
          </motion.div>

          {/* Right - Text & Careers */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <h3 className="text-2xl sm:text-3xl font-[var(--font-heading)] font-bold text-[#0D1F3C] mb-4">
              Esperienza, innovazione e affidabilità
            </h3>
            <p className="text-lg text-[#0D1F3C]/70 mb-8 leading-relaxed">
              Solair Group nasce con l&apos;obiettivo di rendere accessibile a tutti l&apos;energia rinnovabile. 
              Da anni forniamo impianti fotovoltaici, pompe di calore e soluzioni su misura per privati e aziende.
            </p>

            {/* Careers Card */}
            <div className="bg-gradient-to-br from-[#0D1F3C] to-[#1A4A4A] rounded-2xl p-6 text-white">
              <div className="flex items-center gap-3 mb-4">
                <Briefcase className="h-6 w-6 text-[#F5C842]" />
                <h4 className="text-xl font-[var(--font-heading)] font-bold">Lavora con noi</h4>
              </div>
              <p className="text-white/80 mb-4">Siamo alla ricerca di:</p>
              <ul className="space-y-2 mb-6">
                <li className="flex items-center gap-3">
                  <Users className="h-4 w-4 text-[#F5C842]" />
                  <span>Installatori</span>
                </li>
                <li className="flex items-center gap-3">
                  <Users className="h-4 w-4 text-[#F5C842]" />
                  <span>Commerciali</span>
                </li>
              </ul>
              <Button
                asChild
                className="bg-white text-[#0D1F3C] hover:bg-[#EEF4FA] rounded-full px-6 py-5 font-semibold w-full"
              >
                <a href="mailto:info@solairgroup.it" aria-label="Candidati ora">
                  Candidati ora
                  <ArrowUpRight className="ml-2 h-5 w-5" />
                </a>
              </Button>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
