"use client"

import Image from "next/image"

export function AboutSection() {
  return (
    <section id="chi-siamo" className="min-h-screen bg-white flex items-center py-20">
      <div className="w-full grid lg:grid-cols-2 gap-0">
        {/* Left - Image */}
        <div className="relative h-[400px] lg:h-auto lg:min-h-[600px]">
          <Image
            src="https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?w=1400&q=90"
            alt="Installazione impianto fotovoltaico su tetto residenziale"
            fill
            className="object-cover"
          />
        </div>

        {/* Right - Text */}
        <div className="flex items-center py-12 lg:py-0 px-8 lg:px-16">
          <div className="max-w-lg">
            <p className="text-xs uppercase tracking-widest text-gray-500 mb-4">
              Chi Siamo
            </p>

            <h2 className="text-3xl md:text-4xl lg:text-5xl font-light text-gray-900 mb-6 leading-tight">
              L&apos;energia pulita, finalmente accessibile
            </h2>

            <p className="text-base text-gray-600 mb-8 leading-relaxed">
              Solair Group e il partner di fiducia per il fotovoltaico in Italia. 
              Installiamo impianti chiavi in mano con assistenza completa: dalla progettazione 
              alle pratiche GSE, dal monitoraggio remoto alla manutenzione.
            </p>

            {/* Stats */}
            <div className="flex items-center gap-8 pt-8 border-t border-gray-200">
              <div>
                <p className="text-3xl font-light text-gray-900">500+</p>
                <p className="text-xs uppercase tracking-wider text-gray-500 mt-1">Impianti</p>
              </div>
              <div className="border-l border-gray-200 pl-8">
                <p className="text-3xl font-light text-gray-900">4</p>
                <p className="text-xs uppercase tracking-wider text-gray-500 mt-1">Sedi</p>
              </div>
              <div className="border-l border-gray-200 pl-8">
                <p className="text-3xl font-light text-gray-900">98%</p>
                <p className="text-xs uppercase tracking-wider text-gray-500 mt-1">Soddisfatti</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
