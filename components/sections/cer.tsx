"use client"

import Image from "next/image"

const benefits = [
  "Autoconsumo diffuso dell'energia prodotta",
  "Risparmio fino al 40% in bolletta",
  "Incentivi statali dedicati",
  "Energia 100% rinnovabile",
  "Nessun vincolo contrattuale minimo",
]

export function CERSection() {
  return (
    <section id="cer" className="min-h-screen bg-white flex items-center py-[100px] border-t border-[#E8E8E8]">
      <div className="w-full grid lg:grid-cols-[45%_55%] gap-8">
        {/* Text Left */}
        <div className="flex items-center py-12 lg:py-20 px-8 lg:px-20 order-2 lg:order-1">
          <div className="max-w-lg">
            <p className="overline text-[#6B6B6B] mb-4">
              Solair CER
            </p>

            <h2 className="font-heading text-[#0A0A0A] mb-6">
              Comunita Energetiche Rinnovabili
            </h2>

            <p className="body-text mb-8">
              Le Comunita Energetiche Rinnovabili permettono a privati, condomini e aziende 
              di produrre e condividere energia pulita, riducendo la bolletta fino al 40% 
              e accedendo a incentivi statali dedicati.
            </p>

            {/* Benefits list with thin separator lines, no icons */}
            <div className="space-y-0 mb-8">
              {benefits.map((benefit, index) => (
                <div 
                  key={index} 
                  className="flex items-center gap-4 py-3 border-b border-[#E8E8E8] last:border-0"
                >
                  <span className="text-[#6B6B6B]">-</span>
                  <span className="text-sm text-[#0A0A0A] font-light">{benefit}</span>
                </div>
              ))}
            </div>

            {/* Stat grande */}
            <div className="mb-8 pt-6 border-t border-[#E8E8E8]">
              <p className="font-heading text-[3rem] font-light text-[#0A0A0A]">20+</p>
              <p className="overline text-[#6B6B6B] mt-1">
                CER attive in Italia
              </p>
            </div>

            <a 
              href="#contatti" 
              className="btn-outline text-[#0A0A0A]"
            >
              Scopri di piu
            </a>
          </div>
        </div>

        {/* Image Right 55% - warm sunset light */}
        <div className="relative h-[450px] lg:h-auto lg:min-h-[60vh] order-1 lg:order-2">
          <Image
            src="https://images.unsplash.com/photo-1466611653911-95081537e5b7?w=1400&q=90"
            alt="Quartiere con pannelli solari al tramonto, luce calda"
            fill
            className="object-cover"
            loading="lazy"
          />
        </div>
      </div>
    </section>
  )
}
