"use client"

import { useRef, useState } from "react"
import { motion, useInView } from "framer-motion"
import { Check, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
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
    // Simulate form submission
    await new Promise((resolve) => setTimeout(resolve, 1000))
    setIsSubmitting(false)
    alert("Grazie! Ti contatteremo presto.")
  }

  return (
    <section
      id="contatti"
      className="relative py-20 lg:py-32 bg-cover bg-center"
      style={{
        backgroundImage: `linear-gradient(to right, rgba(13, 31, 60, 0.95), rgba(26, 74, 74, 0.9)), url('https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1400&q=80')`,
      }}
      ref={ref}
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Left - Text */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-[var(--font-heading)] font-bold text-white mb-8 text-balance">
              Scopri gli incentivi vigenti per il fotovoltaico
            </h2>

            <div className="space-y-4 mb-8">
              {incentives.map((incentive) => (
                <div key={incentive} className="flex items-center gap-4">
                  <div className="w-8 h-8 rounded-full bg-[#F5C842] flex items-center justify-center">
                    <Check className="h-4 w-4 text-[#0D1F3C]" />
                  </div>
                  <span className="text-white text-lg">{incentive}</span>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Right - Form */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="bg-white rounded-3xl p-8 shadow-2xl"
          >
            <div className="mb-6">
              <h3 className="text-2xl font-[var(--font-heading)] font-bold text-[#0D1F3C] mb-2">
                Modulo di idoneità
              </h3>
              <div className="w-20 h-1 bg-[#1A4A4A] rounded-full" />
            </div>

            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <Input
                  type="text"
                  placeholder="Nome e Cognome"
                  required
                  className="w-full rounded-xl border-[#EEF4FA] bg-[#EEF4FA] py-6 px-4 text-[#0D1F3C] placeholder:text-[#0D1F3C]/50 focus:border-[#1A4A4A] focus:ring-[#1A4A4A]"
                  aria-label="Nome e Cognome"
                />
              </div>

              <div>
                <Input
                  type="tel"
                  placeholder="Numero di telefono"
                  required
                  className="w-full rounded-xl border-[#EEF4FA] bg-[#EEF4FA] py-6 px-4 text-[#0D1F3C] placeholder:text-[#0D1F3C]/50 focus:border-[#1A4A4A] focus:ring-[#1A4A4A]"
                  aria-label="Numero di telefono"
                />
              </div>

              <div>
                <Select>
                  <SelectTrigger
                    className="w-full rounded-xl border-[#EEF4FA] bg-[#EEF4FA] py-6 px-4 text-[#0D1F3C] focus:border-[#1A4A4A] focus:ring-[#1A4A4A]"
                    aria-label="Tipo di tetto"
                  >
                    <SelectValue placeholder="Tipo di tetto" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="falda">Tetto a Falda</SelectItem>
                    <SelectItem value="piano">Tetto Piano</SelectItem>
                    <SelectItem value="altro">Altro</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Input
                  type="text"
                  placeholder="Luogo dove si desidera installare"
                  required
                  className="w-full rounded-xl border-[#EEF4FA] bg-[#EEF4FA] py-6 px-4 text-[#0D1F3C] placeholder:text-[#0D1F3C]/50 focus:border-[#1A4A4A] focus:ring-[#1A4A4A]"
                  aria-label="Luogo di installazione"
                />
              </div>

              <Button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-[#1A4A4A] hover:bg-[#1B6B6B] text-white rounded-full py-6 text-lg font-semibold"
              >
                {isSubmitting ? (
                  "Invio in corso..."
                ) : (
                  <>
                    Richiedi l&apos;Incentivo o Prenota una Consulenza
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </>
                )}
              </Button>
            </form>

            <p className="text-center text-sm text-[#0D1F3C]/60 mt-6">
              Contattaci per un Risultato personalizzato
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
