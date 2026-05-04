"use client"

import { useRef } from "react"
import { motion, useInView } from "framer-motion"
import Image from "next/image"

export function AboutSection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  return (
    <section id="chi-siamo" className="min-h-[90vh] py-32 bg-[#0A0A08]" ref={ref}>
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-center">
          {/* Left - Images with parallax effect */}
          <motion.div
            initial={{ opacity: 0, x: -60 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="relative"
          >
            <div className="relative aspect-[4/5] overflow-hidden">
              <Image
                src="https://images.unsplash.com/photo-1508514177221-188b1cf16e9d?w=800&q=80"
                alt="Casa moderna con pannelli solari installati sul tetto"
                fill
                className="object-cover grayscale hover:grayscale-0 transition-all duration-700"
                loading="lazy"
              />
              {/* Overlay gradient */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A08] via-transparent to-transparent opacity-60" />
            </div>
            {/* Floating quote card */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="absolute -bottom-8 -right-8 lg:right-8 max-w-xs p-8 bg-[#1A1A18] border border-[#F2EDE4]/10"
            >
              <p className="text-sm text-[#F2EDE4]/80 font-light leading-relaxed italic">
                &quot;Ridurre i costi energetici, aumentare il comfort e contribuire a un futuro più sostenibile.&quot;
              </p>
              <div className="mt-4 w-12 h-px bg-[#C8A96E]" />
            </motion.div>
          </motion.div>

          {/* Right - Text */}
          <motion.div
            initial={{ opacity: 0, x: 60 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="lg:pl-8"
          >
            {/* Section label */}
            <p className="text-[10px] tracking-[0.4em] uppercase text-[#C8A96E] mb-6 font-light">
              Chi siamo
            </p>

            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-[var(--font-display)] font-normal text-[#F2EDE4] mb-8 leading-[1.15]">
              L&apos;energia pulita
              <br />
              <span className="italic">alla portata di tutti</span>
            </h2>

            <p className="text-base text-[#F2EDE4]/60 mb-8 leading-relaxed font-light max-w-lg">
              Solair Group è il tuo partner di fiducia per il fotovoltaico e l&apos;efficienza energetica. 
              Offriamo soluzioni su misura per privati e aziende, con impianti chiavi in mano, 
              assistenza continua e massima qualità.
            </p>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-8 pt-8 border-t border-[#F2EDE4]/10">
              <div>
                <p className="text-3xl font-[var(--font-display)] text-[#C8A96E]">500+</p>
                <p className="text-[10px] tracking-[0.2em] uppercase text-[#F2EDE4]/40 mt-2">Impianti</p>
              </div>
              <div>
                <p className="text-3xl font-[var(--font-display)] text-[#C8A96E]">4</p>
                <p className="text-[10px] tracking-[0.2em] uppercase text-[#F2EDE4]/40 mt-2">Sedi Italia</p>
              </div>
              <div>
                <p className="text-3xl font-[var(--font-display)] text-[#C8A96E]">98%</p>
                <p className="text-[10px] tracking-[0.2em] uppercase text-[#F2EDE4]/40 mt-2">Soddisfatti</p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
