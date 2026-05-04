"use client"

import Image from "next/image"

export function AboutSection() {
  return (
    <section id="chi-siamo" className="relative min-h-screen bg-[#EFEFED] flex items-center mb-[50px]">
      {/* Gradient transition from previous full-bleed */}
      <div className="absolute top-0 left-0 right-0 h-[80px] bg-gradient-to-b from-[rgba(0,0,0,0.05)] to-transparent pointer-events-none" />
      <div className="w-full grid lg:grid-cols-2">
        {/* Left - Image 50% full height */}
        <div className="relative h-[500px] lg:h-auto lg:min-h-screen">
          <Image
            src="https://images.unsplash.com/photo-1509391366360-2e959784a276?w=1400&q=90"
            alt="Pannelli solari su tetto residenziale con cielo azzurro"
            fill
            className="object-cover"
            loading="lazy"
          />
        </div>

        {/* Right - Text with padding 80px, centered vertically */}
        <div className="flex items-center py-[100px] px-8 lg:px-20">
          <div className="max-w-lg">
            <p className="overline text-[#6B6B6B] mb-4">
              Chi Siamo
            </p>

            <h2 className="font-heading text-[#0A0A0A] mb-6">
              L&apos;energia pulita, finalmente accessibile
            </h2>

            <p className="body-text mb-10">
              Solair Group e il partner di fiducia per il fotovoltaico in Italia. 
              Installiamo impianti chiavi in mano con assistenza completa: dalla progettazione 
              alle pratiche GSE, dal monitoraggio remoto alla manutenzione.
            </p>

            {/* Stats with vertical dividers */}
            <div className="flex items-center gap-0 pt-8 border-t border-[#E8E8E8]">
              <div className="pr-8">
                <p className="font-heading text-[2.5rem] text-[#0A0A0A]">500+</p>
                <p className="overline text-[#6B6B6B] mt-1">Impianti</p>
              </div>
              <div className="border-l border-[#E8E8E8] px-8">
                <p className="font-heading text-[2.5rem] text-[#0A0A0A]">4</p>
                <p className="overline text-[#6B6B6B] mt-1">Sedi</p>
              </div>
              <div className="border-l border-[#E8E8E8] pl-8">
                <p className="font-heading text-[2.5rem] text-[#0A0A0A]">98%</p>
                <p className="overline text-[#6B6B6B] mt-1">Soddisfatti</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
