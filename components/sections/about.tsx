"use client"

import Image from "next/image"

export function AboutSection() {
  return (
    <section id="chi-siamo" className="min-h-screen bg-[#FAFAF8] flex items-center py-[100px]">
      <div className="w-full grid lg:grid-cols-2 gap-0">
        {/* Left - Image 50% height full */}
        <div className="relative h-[500px] lg:h-auto lg:min-h-[70vh]">
          <Image
            src="https://images.unsplash.com/photo-1508514177221-188b1cf16e9d?w=1400&q=95"
            alt="Casa moderna con pannelli solari sul tetto vista drone con cielo azzurro"
            fill
            className="object-cover"
            loading="lazy"
          />
        </div>

        {/* Right - Text with padding */}
        <div className="flex items-center py-16 lg:py-20 px-8 lg:px-20">
          <div className="max-w-lg">
            {/* Overline */}
            <p className="overline text-[#6B6B6B] mb-4">
              Chi Siamo
            </p>

            {/* H2 */}
            <h2 className="font-heading text-[#0A0A0A] mb-6">
              L&apos;energia pulita, finalmente accessibile
            </h2>

            {/* Body text */}
            <p className="body-text mb-8">
              Solair Group e il partner di fiducia per il fotovoltaico in Italia. 
              Installiamo impianti chiavi in mano con assistenza completa: dalla progettazione 
              alle pratiche GSE, dal monitoraggio remoto alla manutenzione.
            </p>

            {/* Stats with vertical separators */}
            <div className="flex items-center gap-0 pt-8 border-t border-[#E8E8E8]">
              <div className="pr-8">
                <p className="font-heading text-[2.5rem] font-light text-[#0A0A0A]">500+</p>
                <p className="overline text-[#6B6B6B] mt-1">Impianti</p>
              </div>
              <div className="border-l border-[#E8E8E8] px-8">
                <p className="font-heading text-[2.5rem] font-light text-[#0A0A0A]">4</p>
                <p className="overline text-[#6B6B6B] mt-1">Sedi</p>
              </div>
              <div className="border-l border-[#E8E8E8] pl-8">
                <p className="font-heading text-[2.5rem] font-light text-[#0A0A0A]">98%</p>
                <p className="overline text-[#6B6B6B] mt-1">Soddisfatti</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
