"use client"

import { useRef } from "react"
import { motion, useInView } from "framer-motion"
import { ArrowRight, ArrowUpRight, Sun, Banknote, Users } from "lucide-react"
import { Button } from "@/components/ui/button"

const flowSteps = [
  {
    icon: Sun,
    title: "Impianto Fotovoltaico",
    value: "10.000 kWh/anno",
    label: "PRODUZIONE",
    color: "bg-[#F5C842]",
  },
  {
    icon: Banknote,
    title: "Vendita di Energia",
    value: "€1.400,00/anno",
    label: "RID",
    color: "bg-[#1A4A4A]",
  },
  {
    icon: Users,
    title: "Unisciti alla nostra Comunità",
    value: "+€500/anno",
    label: "TIP",
    color: "bg-[#1B6B6B]",
  },
]

export function CERIncentiveSection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  return (
    <section className="py-20 lg:py-32 bg-[#EEF4FA]" ref={ref}>
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-[var(--font-heading)] font-bold text-[#0D1F3C] mb-4 text-balance">
            Ottieni il massimo dal tuo impianto con il nuovo incentivo CER
          </h2>
          <p className="text-lg text-[#0D1F3C]/70 max-w-2xl mx-auto">
            Scopri come massimizzare i tuoi guadagni con le comunità energetiche rinnovabili
          </p>
        </motion.div>

        {/* Flow Diagram */}
        <div className="flex flex-col lg:flex-row items-center justify-center gap-4 lg:gap-0 mb-12">
          {flowSteps.map((step, index) => (
            <motion.div
              key={step.title}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: index * 0.15 }}
              className="flex items-center"
            >
              <div className="bg-white rounded-2xl p-6 shadow-lg text-center min-w-[250px]">
                <div
                  className={`w-14 h-14 rounded-full ${step.color} flex items-center justify-center mx-auto mb-4`}
                >
                  <step.icon className="h-7 w-7 text-white" />
                </div>
                <h3 className="font-[var(--font-heading)] font-bold text-[#0D1F3C] mb-2">{step.title}</h3>
                <p className="text-2xl font-bold text-[#1A4A4A] mb-1">{step.value}</p>
                <span className="text-xs font-medium text-[#0D1F3C]/60 bg-[#EEF4FA] px-3 py-1 rounded-full">
                  {step.label}
                </span>
              </div>
              
              {index < flowSteps.length - 1 && (
                <ArrowRight className="h-8 w-8 text-[#1A4A4A] mx-4 hidden lg:block" />
              )}
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-center"
        >
          <Button
            asChild
            className="bg-[#1A4A4A] hover:bg-[#1B6B6B] text-white rounded-full px-8 py-6 text-lg font-semibold shadow-lg"
          >
            <a href="#contatti" aria-label="Ottieni un preventivo gratuito">
              Ottieni un preventivo gratuito
              <ArrowUpRight className="ml-2 h-5 w-5" />
            </a>
          </Button>
        </motion.div>
      </div>
    </section>
  )
}
