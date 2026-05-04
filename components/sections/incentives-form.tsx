"use client"

import { useRef, useState } from "react"
import { motion, useInView } from "framer-motion"
import { Check, ArrowRight } from "lucide-react"
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

const incentives = [
  "Detrazione Fiscale 50% per privati",
  "Fondo perduto del 40% PNRR",
]

export function IncentivesFormSection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsSubmitting(true)
    await new Promise((resolve) => setTimeout(resolve, 1000))
    setIsSubmitting(false)
    alert("Grazie! Ti contatteremo presto.")
  }

  return (
    <section
      id="contatti"
      className="min-h-[90vh] py-32 bg-[#F9F9F7] relative overflow-hidden"
      ref={ref}
    >
      {/* Background image with overlay */}
      <div 
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: `url('https://images.unsplash.com/photo-1509391366360-2e959784a276?w=1400&q=80')`,
        }}
      />
      <div className="absolute inset-0 bg-gradient-to-r from-white via-white/95 to-white/80" />

      <div className="relative z-10 mx-auto max-w-7xl px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-center">
          {/* Left - Text */}
          <motion.div
            initial={{ opacity: 0, x: -60 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8 }}
          >
            <p className="text-[10px] tracking-[0.4em] uppercase text-[#0A0A0A]/50 mb-6 font-light">
              Contattaci
            </p>

            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-[var(--font-display)] font-light text-[#0A0A0A] mb-8 leading-[1.15]">
              Scopri gli incentivi
              <br />
              <span className="font-normal">per il fotovoltaico</span>
            </h2>

            <div className="space-y-4 mb-8">
              {incentives.map((incentive, index) => (
                <motion.div
                  key={incentive}
                  initial={{ opacity: 0, x: -20 }}
                  animate={isInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.5, delay: 0.2 + index * 0.1 }}
                  className="flex items-center gap-4"
                >
                  <div className="w-8 h-8 border border-[#0A0A0A]/20 flex items-center justify-center">
                    <Check className="h-4 w-4 text-[#0A0A0A]" />
                  </div>
                  <span className="text-[#0A0A0A]/80 font-light">{incentive}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Right - Form */}
          <motion.div
            initial={{ opacity: 0, x: 60 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="bg-white border border-[#0A0A0A]/10 p-10 shadow-sm"
          >
            <div className="mb-8">
              <h3 className="text-xl font-[var(--font-display)] text-[#0A0A0A] mb-2">
                Modulo di idoneita
              </h3>
              <div className="w-12 h-px bg-[#0A0A0A]" />
            </div>

            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <Input
                  type="text"
                  placeholder="Nome e Cognome"
                  required
                  className="w-full bg-[#F9F9F7] border-[#0A0A0A]/10 py-6 px-4 text-[#0A0A0A] placeholder:text-[#0A0A0A]/40 focus:border-[#0A0A0A] focus:ring-[#0A0A0A] rounded-none"
                  aria-label="Nome e Cognome"
                />
              </div>

              <div>
                <Input
                  type="tel"
                  placeholder="Numero di telefono"
                  required
                  className="w-full bg-[#F9F9F7] border-[#0A0A0A]/10 py-6 px-4 text-[#0A0A0A] placeholder:text-[#0A0A0A]/40 focus:border-[#0A0A0A] focus:ring-[#0A0A0A] rounded-none"
                  aria-label="Numero di telefono"
                />
              </div>

              <div>
                <Select>
                  <SelectTrigger
                    className="w-full bg-[#F9F9F7] border-[#0A0A0A]/10 py-6 px-4 text-[#0A0A0A] focus:border-[#0A0A0A] focus:ring-[#0A0A0A] rounded-none [&>span]:text-[#0A0A0A]/40"
                    aria-label="Tipo di tetto"
                  >
                    <SelectValue placeholder="Tipo di tetto" />
                  </SelectTrigger>
                  <SelectContent className="bg-white border-[#0A0A0A]/10">
                    <SelectItem value="falda" className="text-[#0A0A0A]">Tetto a Falda</SelectItem>
                    <SelectItem value="piano" className="text-[#0A0A0A]">Tetto Piano</SelectItem>
                    <SelectItem value="altro" className="text-[#0A0A0A]">Altro</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Input
                  type="text"
                  placeholder="Luogo di installazione"
                  required
                  className="w-full bg-[#F9F9F7] border-[#0A0A0A]/10 py-6 px-4 text-[#0A0A0A] placeholder:text-[#0A0A0A]/40 focus:border-[#0A0A0A] focus:ring-[#0A0A0A] rounded-none"
                  aria-label="Luogo di installazione"
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-[#0A0A0A] text-white py-4 text-[10px] tracking-[0.2em] uppercase font-medium hover:bg-[#333] transition-all duration-300 disabled:opacity-50 flex items-center justify-center gap-2"
              >
                {isSubmitting ? (
                  "Invio in corso..."
                ) : (
                  <>
                    Richiedi preventivo
                    <ArrowRight className="h-4 w-4" />
                  </>
                )}
              </button>
            </form>

            <p className="text-center text-xs text-[#0A0A0A]/40 mt-6 font-light">
              Ti contatteremo entro 24 ore
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
