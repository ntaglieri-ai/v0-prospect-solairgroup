"use client"

import { useRef } from "react"
import { motion, useInView } from "framer-motion"
import { ArrowRight, Sun, Banknote, Users } from "lucide-react"

const flowSteps = [
  {
    icon: Sun,
    title: "Impianto Fotovoltaico",
    value: "10.000 kWh/anno",
    label: "Produzione",
  },
  {
    icon: Banknote,
    title: "Vendita di Energia",
    value: "€1.400/anno",
    label: "RID",
  },
  {
    icon: Users,
    title: "Comunità Energetica",
    value: "+€500/anno",
    label: "TIP",
  },
]

export function CERIncentiveSection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  return (
    <section className="min-h-[90vh] py-32 bg-[#1A1A18]" ref={ref}>
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          <p className="text-[10px] tracking-[0.4em] uppercase text-[#C8A96E] mb-6 font-light">
            Incentivi CER
          </p>
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-[var(--font-display)] font-normal text-[#F2EDE4] leading-[1.15] mb-6">
            Massimizza i tuoi
            <br />
            <span className="italic">guadagni</span>
          </h2>
          <p className="text-base text-[#F2EDE4]/50 max-w-xl mx-auto font-light">
            Scopri come ottenere il massimo dal tuo impianto con le comunità energetiche
          </p>
        </motion.div>

        {/* Flow Diagram */}
        <div className="flex flex-col lg:flex-row items-center justify-center gap-8 lg:gap-4 mb-16">
          {flowSteps.map((step, index) => (
            <motion.div
              key={step.title}
              initial={{ opacity: 0, y: 40 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.15 }}
              className="flex items-center"
            >
              <div className="bg-[#0A0A08] border border-[#F2EDE4]/10 p-10 text-center min-w-[280px] group hover:border-[#C8A96E]/30 transition-all duration-500">
                <div className="w-12 h-12 border border-[#C8A96E]/30 flex items-center justify-center mx-auto mb-6 group-hover:bg-[#C8A96E] group-hover:border-[#C8A96E] transition-all duration-500">
                  <step.icon className="h-5 w-5 text-[#C8A96E] group-hover:text-[#0A0A08] transition-all duration-500" />
                </div>
                <h3 className="font-[var(--font-display)] text-[#F2EDE4] mb-3">{step.title}</h3>
                <p className="text-2xl font-[var(--font-display)] text-[#C8A96E] mb-2">{step.value}</p>
                <span className="text-[9px] tracking-[0.2em] uppercase text-[#F2EDE4]/40 font-light">
                  {step.label}
                </span>
              </div>
              
              {index < flowSteps.length - 1 && (
                <ArrowRight className="h-6 w-6 text-[#F2EDE4]/20 mx-4 hidden lg:block" />
              )}
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="text-center"
        >
          <a href="#contatti" className="btn-premium-gold">
            Ottieni un preventivo gratuito
          </a>
        </motion.div>
      </div>
    </section>
  )
}
