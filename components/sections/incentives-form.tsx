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
      className="min-h-[90vh] py-32 bg-[#0A0A08] relative overflow-hidden"
      ref={ref}
    >
      {/* Background image with overlay */}
      <div 
        className="absolute inset-0 bg-cover bg-center grayscale"
        style={{
          backgroundImage: `url('https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1400&q=80')`,
        }}
      />
      <div className="absolute inset-0 bg-gradient-to-r from-[#0A0A08] via-[#0A0A08]/95 to-[#0A0A08]/80" />

      <div className="relative z-10 mx-auto max-w-7xl px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-center">
          {/* Left - Text */}
          <motion.div
            initial={{ opacity: 0, x: -60 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8 }}
          >
            <p className="text-[10px] tracking-[0.4em] uppercase text-[#C8A96E] mb-6 font-light">
              Contattaci
            </p>

            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-[var(--font-display)] font-normal text-[#F2EDE4] mb-8 leading-[1.15]">
              Scopri gli incentivi
              <br />
              <span className="italic">per il fotovoltaico</span>
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
                  <div className="w-8 h-8 border border-[#C8A96E]/30 flex items-center justify-center">
                    <Check className="h-4 w-4 text-[#C8A96E]" />
                  </div>
                  <span className="text-[#F2EDE4]/80 font-light">{incentive}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Right - Form */}
          <motion.div
            initial={{ opacity: 0, x: 60 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="bg-[#1A1A18] border border-[#F2EDE4]/10 p-10"
          >
            <div className="mb-8">
              <h3 className="text-xl font-[var(--font-display)] text-[#F2EDE4] mb-2">
                Modulo di idoneita
              </h3>
              <div className="w-12 h-px bg-[#C8A96E]" />
            </div>

            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <Input
                  type="text"
                  placeholder="Nome e Cognome"
                  required
                  className="w-full bg-[#0A0A08] border-[#F2EDE4]/10 py-6 px-4 text-[#F2EDE4] placeholder:text-[#F2EDE4]/30 focus:border-[#C8A96E] focus:ring-[#C8A96E] rounded-none"
                  aria-label="Nome e Cognome"
                />
              </div>

              <div>
                <Input
                  type="tel"
                  placeholder="Numero di telefono"
                  required
                  className="w-full bg-[#0A0A08] border-[#F2EDE4]/10 py-6 px-4 text-[#F2EDE4] placeholder:text-[#F2EDE4]/30 focus:border-[#C8A96E] focus:ring-[#C8A96E] rounded-none"
                  aria-label="Numero di telefono"
                />
              </div>

              <div>
                <Select>
                  <SelectTrigger
                    className="w-full bg-[#0A0A08] border-[#F2EDE4]/10 py-6 px-4 text-[#F2EDE4] focus:border-[#C8A96E] focus:ring-[#C8A96E] rounded-none [&>span]:text-[#F2EDE4]/30"
                    aria-label="Tipo di tetto"
                  >
                    <SelectValue placeholder="Tipo di tetto" />
                  </SelectTrigger>
                  <SelectContent className="bg-[#1A1A18] border-[#F2EDE4]/10">
                    <SelectItem value="falda" className="text-[#F2EDE4]">Tetto a Falda</SelectItem>
                    <SelectItem value="piano" className="text-[#F2EDE4]">Tetto Piano</SelectItem>
                    <SelectItem value="altro" className="text-[#F2EDE4]">Altro</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Input
                  type="text"
                  placeholder="Luogo di installazione"
                  required
                  className="w-full bg-[#0A0A08] border-[#F2EDE4]/10 py-6 px-4 text-[#F2EDE4] placeholder:text-[#F2EDE4]/30 focus:border-[#C8A96E] focus:ring-[#C8A96E] rounded-none"
                  aria-label="Luogo di installazione"
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-[#C8A96E] text-[#0A0A08] py-4 text-[10px] tracking-[0.2em] uppercase font-medium hover:bg-[#B8995E] transition-all duration-300 disabled:opacity-50 flex items-center justify-center gap-2"
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

            <p className="text-center text-xs text-[#F2EDE4]/30 mt-6 font-light">
              Ti contatteremo entro 24 ore
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
