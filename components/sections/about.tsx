"use client"

import { useRef } from "react"
import { motion, useInView } from "framer-motion"
import Image from "next/image"
import { Play } from "lucide-react"

export function AboutSection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  return (
    <section id="chi-siamo" className="py-20 lg:py-32 bg-white" ref={ref}>
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Left - Images */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="relative"
          >
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-4">
                <div className="rounded-2xl overflow-hidden shadow-lg">
                  <Image
                    src="https://images.unsplash.com/photo-1508514177221-188b1cf16e9d?w=600&q=80"
                    alt="Casa moderna con pannelli solari installati sul tetto"
                    width={300}
                    height={400}
                    className="w-full h-[250px] object-cover"
                    loading="lazy"
                  />
                </div>
                <div className="rounded-2xl overflow-hidden shadow-lg bg-[#0D1F3C] p-6">
                  <p className="text-white/90 text-sm font-medium leading-relaxed">
                    &quot;Ridurre i costi energetici, aumentare il comfort e contribuire a un futuro più sostenibile.&quot;
                  </p>
                </div>
              </div>
              <div className="pt-8">
                <div className="relative rounded-2xl overflow-hidden shadow-lg group cursor-pointer">
                  <Image
                    src="https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&q=80"
                    alt="Tecnici installatori al lavoro su pannelli fotovoltaici"
                    width={300}
                    height={350}
                    className="w-full h-[300px] object-cover"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-[#0D1F3C]/40 flex items-center justify-center group-hover:bg-[#0D1F3C]/50 transition-colors">
                    <div className="w-16 h-16 rounded-full bg-white/90 flex items-center justify-center shadow-lg">
                      <Play className="h-6 w-6 text-[#1A4A4A] ml-1" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Right - Text */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            {/* Badge */}
            <div className="inline-flex items-center gap-2 bg-[#EEF4FA] rounded-full px-4 py-2 mb-6">
              <span className="text-[#F5C842]">⚡</span>
              <span className="text-sm font-semibold text-[#0D1F3C]">SOLAIR GROUP</span>
            </div>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-[var(--font-heading)] font-bold text-[#0D1F3C] mb-6 text-balance">
              L&apos;energia pulita alla portata di tutti
            </h2>

            <p className="text-lg text-[#0D1F3C]/70 mb-8 leading-relaxed">
              Solair Group è il tuo partner di fiducia per il fotovoltaico e l&apos;efficienza energetica. 
              Offriamo soluzioni su misura per privati e aziende, con impianti chiavi in mano, 
              assistenza continua e massima qualità.
            </p>

            {/* Blockquote */}
            <blockquote className="border-l-4 border-[#1A4A4A] pl-6 py-2">
              <p className="text-lg font-medium text-[#0D1F3C] italic">
                &quot;Ridurre i costi energetici, aumentare il comfort e contribuire a un futuro più sostenibile.&quot;
              </p>
            </blockquote>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
