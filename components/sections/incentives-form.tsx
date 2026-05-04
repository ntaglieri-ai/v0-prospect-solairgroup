"use client"

import { useState } from "react"
import { Star } from "lucide-react"

const incentives = [
  "Detrazione IRPEF 50%",
  "Conto Energia GSE",
  "PNRR 40% fondo perduto",
]

export function IncentivesFormSection() {
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsSubmitting(true)
    await new Promise((resolve) => setTimeout(resolve, 1000))
    setIsSubmitting(false)
    alert("Grazie! Ti contatteremo presto.")
  }

  return (
    <section id="contatti" className="relative min-h-screen py-8 bg-gray-50 flex items-center">
      <div className="mx-auto max-w-7xl px-6 lg:px-8 w-full">
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-20 items-center">
          {/* Left - Text */}
          <div>
            <p className="text-xs uppercase tracking-widest text-gray-500 mb-4">Incentivi</p>

            <h2 className="text-3xl md:text-4xl lg:text-5xl font-light text-gray-900 mb-6 leading-tight">
              Scopri gli incentivi per il tuo impianto
            </h2>

            <ul className="space-y-0 mb-8">
              {incentives.map((incentive) => (
                <li 
                  key={incentive}
                  className="flex items-center gap-4 py-3 border-b border-gray-200 last:border-0"
                >
                  <span className="text-gray-400">-</span>
                  <span className="text-gray-700 font-light">{incentive}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Right - Form */}
          <div className="bg-white border border-gray-200 p-10">
            <form onSubmit={handleSubmit} className="space-y-4">
              <input
                type="text"
                placeholder="Nome e Cognome"
                required
                className="w-full px-4 py-3 border-b border-gray-200 bg-transparent text-gray-900 placeholder:text-gray-400 focus:outline-none focus:border-gray-900 transition-colors text-sm"
              />

              <input
                type="tel"
                placeholder="Telefono"
                required
                className="w-full px-4 py-3 border-b border-gray-200 bg-transparent text-gray-900 placeholder:text-gray-400 focus:outline-none focus:border-gray-900 transition-colors text-sm"
              />

              <input
                type="email"
                placeholder="Email"
                required
                className="w-full px-4 py-3 border-b border-gray-200 bg-transparent text-gray-900 placeholder:text-gray-400 focus:outline-none focus:border-gray-900 transition-colors text-sm"
              />

              <select
                required
                className="w-full px-4 py-3 border-b border-gray-200 bg-transparent text-gray-900 focus:outline-none focus:border-gray-900 transition-colors text-sm appearance-none cursor-pointer"
                defaultValue=""
              >
                <option value="" disabled>Tipo immobile</option>
                <option value="casa">Casa</option>
                <option value="azienda">Azienda</option>
                <option value="condominio">Condominio</option>
              </select>

              <input
                type="text"
                placeholder="Provincia"
                required
                className="w-full px-4 py-3 border-b border-gray-200 bg-transparent text-gray-900 placeholder:text-gray-400 focus:outline-none focus:border-gray-900 transition-colors text-sm"
              />

              <textarea
                placeholder="Messaggio (opzionale)"
                rows={3}
                className="w-full px-4 py-3 border-b border-gray-200 bg-transparent text-gray-900 placeholder:text-gray-400 focus:outline-none focus:border-gray-900 transition-colors text-sm resize-none"
              />

              <div className="pt-4">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-gray-900 text-white py-4 text-sm uppercase tracking-wider font-medium hover:bg-gray-800 transition-colors disabled:opacity-50"
                >
                  {isSubmitting ? "Invio in corso..." : "Richiedi preventivo gratuito"}
                </button>
              </div>
            </form>

            {/* Trust badge */}
            <div className="mt-8 pt-6 border-t border-gray-200 text-center">
              <div className="flex items-center justify-center gap-2 text-xs text-gray-500">
                <div className="flex gap-0.5">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-3 w-3 fill-gray-900 text-gray-900" />
                  ))}
                </div>
                <span>99 recensioni</span>
                <span>-</span>
                <span>Certificati GSE</span>
                <span>-</span>
                <span>Garanzia 25 anni</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Gradient fade to white */}
      <div className="absolute bottom-0 left-0 right-0 h-[80px] bg-gradient-to-b from-transparent to-white pointer-events-none" />
    </section>
  )
}
