"use client"

import { useRef } from "react"
import { motion, useInView } from "framer-motion"
import Image from "next/image"

export function AboutSection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  return (
    <section id="chi-siamo" className="min-h-[90vh] py-32 bg-[#F9F9F7]" ref={ref}>
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-center">
          {/* Left - Images */}
          <motion.div
            initial={{ opacity: 0, x: -60 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="relative"
          >
            <div className="relative aspect-[4/5] overflow-hidden">
              <Image
                src="https://images.unsplash.com/photo-1509391366360-2e959784a276?w=800&q=80"
                alt="Pannelli solari illuminati dal sole all alba"
                fill
                className="object-cover"
                loading="lazy"
              />
            </div>
            {/* Floating quote card */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="absolute -bottom-8 -right-8 lg:right-8 max-w-xs p-8 bg-white shadow-sm border border-[#0A0A0A]/5"
            >
              <p className="text-sm text-[#0A0A0A]/70 font-light leading-relaxed">
                &quot;Ridurre i costi energetici, aumentare il comfort e contribuire a un futuro piu sostenibile.&quot;
              </p>
              <div className="mt-4 w-12 h-px bg-[#0A0A0A]" />
            </motion.div>
          </motion.div>

          {/* Right - Text */}
          <motion.div
            initial={{ opacity: 0, x: 60 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="lg:pl-8"
          >
            <p className="text-[10px] tracking-[0.4em] uppercase text-[#0A0A0A]/50 mb-6 font-light">
              Chi siamo
            </p>

            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-[var(--font-display)] font-light text-[#0A0A0A] mb-8 leading-[1.15]">
              L&apos;energia pulita
              <br />
              <span className="font-normal">alla portata di tutti</span>
            </h2>

            <p className="text-base text-[#0A0A0A]/60 mb-8 leading-relaxed font-light max-w-lg">
              Solair Group e il tuo partner di fiducia per il fotovoltaico e l&apos;efficienza energetica. 
              Offriamo soluzioni su misura per privati e aziende, con impianti chiavi in mano, 
              assistenza continua e massima qualita.
            </p>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-8 pt-8 border-t border-[#0A0A0A]/10">
              <div>
                <p className="text-3xl font-[var(--font-display)] font-light text-[#0A0A0A]">500+</p>
                <p className="text-[10px] tracking-[0.2em] uppercase text-[#0A0A0A]/40 mt-2">Impianti</p>
              </div>
              <div>
                <p className="text-3xl font-[var(--font-display)] font-light text-[#0A0A0A]">4</p>
                <p className="text-[10px] tracking-[0.2em] uppercase text-[#0A0A0A]/40 mt-2">Sedi Italia</p>
              </div>
              <div>
                <p className="text-3xl font-[var(--font-display)] font-light text-[#0A0A0A]">98%</p>
                <p className="text-[10px] tracking-[0.2em] uppercase text-[#0A0A0A]/40 mt-2">Soddisfatti</p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
