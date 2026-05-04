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
    <section id="cer" className="min-h-screen bg-white flex items-center py-20">
      <div className="w-full grid lg:grid-cols-2 gap-0">
        {/* Text Left */}
        <div className="flex items-center py-12 lg:py-0 px-8 lg:px-16 order-2 lg:order-1">
          <div className="max-w-lg">
            <p className="text-xs uppercase tracking-widest text-gray-500 mb-4">
              Solair CER
            </p>

            <h2 className="text-3xl md:text-4xl lg:text-5xl font-light text-gray-900 mb-6 leading-tight">
              Comunita Energetiche Rinnovabili
            </h2>

            <p className="text-base text-gray-600 mb-8 leading-relaxed">
              Le Comunita Energetiche Rinnovabili permettono a privati, condomini e aziende 
              di produrre e condividere energia pulita, riducendo la bolletta fino al 40% 
              e accedendo a incentivi statali dedicati.
            </p>

            {/* Benefits list */}
            <div className="space-y-0 mb-8">
              {benefits.map((benefit, index) => (
                <div 
                  key={index} 
                  className="flex items-center gap-4 py-3 border-b border-gray-200 last:border-0"
                >
                  <span className="text-gray-400">-</span>
                  <span className="text-sm text-gray-700 font-light">{benefit}</span>
                </div>
              ))}
            </div>

            {/* Stat */}
            <div className="mb-8 pt-6 border-t border-gray-200">
              <p className="text-3xl font-light text-gray-900">20+</p>
              <p className="text-xs uppercase tracking-wider text-gray-500 mt-1">
                Configurazioni CER attive in Italia
              </p>
            </div>

            <a 
              href="#contatti" 
              className="inline-block border border-gray-900 text-gray-900 px-6 py-3 text-sm uppercase tracking-wider font-medium hover:bg-gray-900 hover:text-white transition-all duration-300"
            >
              Scopri di piu
            </a>
          </div>
        </div>

        {/* Image Right */}
        <div className="relative h-[400px] lg:h-auto lg:min-h-[600px] order-1 lg:order-2">
          <Image
            src="https://images.unsplash.com/photo-1466611653911-95081537e5b7?w=1400&q=90"
            alt="Comunita energetica rinnovabile"
            fill
            className="object-cover"
          />
        </div>
      </div>
    </section>
  )
}
