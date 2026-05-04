"use client"

import { useRef, useState, useEffect } from "react"
import { Star } from "lucide-react"

const incentives = [
  "Detrazione IRPEF 50%",
  "Conto Energia GSE",
  "PNRR 40% fondo perduto",
]

export function IncentivesFormSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("animate-fade-in-up")
          }
        })
      },
      { threshold: 0.1 }
    )

    if (sectionRef.current) {
      const elements = sectionRef.current.querySelectorAll("[data-animate]")
      elements.forEach((el) => observer.observe(el))
    }

    return () => observer.disconnect()
  }, [])

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
      ref={sectionRef}
      className="min-h-[90vh] py-32 bg-[#F7F7F5] flex items-center"
    >
      <div className="mx-auto max-w-7xl px-6 lg:px-8 w-full">
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-center">
          {/* Left - Text */}
          <div data-animate className="opacity-0">
            <p className="overline text-[#6B6B6B] mb-6">Incentivi</p>

            <h2 
              className="font-light text-[#0A0A0A] mb-8 leading-[1.15]"
              style={{ fontSize: "clamp(2.2rem, 4vw, 3.2rem)" }}
            >
              Scopri gli incentivi per il tuo impianto
            </h2>

            <ul className="space-y-0 mb-8">
              {incentives.map((incentive) => (
                <li 
                  key={incentive}
                  className="flex items-center gap-4 py-4 border-b border-[#E8E8E8] last:border-0"
                >
                  <span className="text-[#0A0A0A]">&bull;</span>
                  <span className="text-[#0A0A0A] font-light">{incentive}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Right - Form */}
          <div 
            data-animate 
            className="opacity-0 animate-delay-150 bg-white border border-[#E8E8E8] p-12"
            style={{ borderRadius: "2px" }}
          >
            <form onSubmit={handleSubmit} className="space-y-0">
              <input
                type="text"
                placeholder="Nome e Cognome"
                required
                className="input-tesla"
                aria-label="Nome e Cognome"
              />

              <input
                type="tel"
                placeholder="Telefono"
                required
                className="input-tesla"
                aria-label="Telefono"
              />

              <input
                type="email"
                placeholder="Email"
                required
                className="input-tesla"
                aria-label="Email"
              />

              <select
                required
                className="input-tesla appearance-none cursor-pointer"
                aria-label="Tipo immobile"
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
                className="input-tesla"
                aria-label="Provincia"
              />

              <textarea
                placeholder="Messaggio (opzionale)"
                rows={3}
                className="input-tesla resize-none"
                aria-label="Messaggio"
              />

              <div className="pt-6">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="btn-filled"
                >
                  {isSubmitting ? "Invio in corso..." : "Richiedi preventivo gratuito"}
                </button>
              </div>
            </form>

            {/* Trust badge */}
            <div className="mt-8 pt-6 border-t border-[#E8E8E8] text-center">
              <div className="flex items-center justify-center gap-2 text-[11px] text-[#6B6B6B]">
                <div className="flex gap-0.5">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-3 w-3 fill-[#0A0A0A] text-[#0A0A0A]" />
                  ))}
                </div>
                <span>99 recensioni</span>
                <span>&middot;</span>
                <span>Certificati GSE</span>
                <span>&middot;</span>
                <span>Garanzia 25 anni</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
