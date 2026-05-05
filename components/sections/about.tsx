"use client"

import Image from "next/image"

export function AboutSection() {
  return (
    <section id="chi-siamo" className="relative min-h-screen bg-[#E8E8E8] flex items-center mb-[50px] md:mb-[50px] mb-0">
      {/* Mobile: Full background image with overlay */}
      <div className="absolute inset-0 md:hidden">
        <Image
          src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/WhatsApp%20Image%202026-05-05%20at%2009.56.49-h8SJNVgUOLg7xWL6OiumcFkE6pdbzB.jpeg"
          alt="Pannelli solari su tetto residenziale con cielo azzurro"
          fill
          className="object-cover"
          loading="lazy"
        />
        {/* Dark gradient overlay bottom to top for mobile */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-black/30" />
      </div>

      <div className="w-full grid lg:grid-cols-2 relative z-10">
        {/* Left - Image 50% full height - Hidden on mobile */}
        <div className="relative h-[500px] lg:h-auto lg:min-h-screen hidden md:block">
          <Image
            src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/WhatsApp%20Image%202026-05-05%20at%2009.56.49-h8SJNVgUOLg7xWL6OiumcFkE6pdbzB.jpeg"
            alt="Pannelli solari su tetto residenziale con cielo azzurro"
            fill
            className="object-cover"
            loading="lazy"
          />
          {/* Light overlay for visual harmony */}
          <div className="absolute inset-0 bg-black/10" />
        </div>

        {/* Right - Text with padding 80px, centered vertically */}
        <div className="flex items-center py-[100px] px-8 lg:px-20 md:bg-[#E8E8E8]">
          <div className="max-w-lg">
            <p className="overline text-white/60 md:text-[#6B6B6B] mb-4">
              Chi Siamo
            </p>

            <h2 className="font-heading text-white md:text-[#0A0A0A] mb-6">
              L&apos;energia pulita, finalmente accessibile
            </h2>

            <p className="body-text text-white/80 md:text-[#6B6B6B] mb-10">
              Solair Group e il partner di fiducia per il fotovoltaico in Italia. 
              Installiamo impianti chiavi in mano con assistenza completa: dalla progettazione 
              alle pratiche GSE, dal monitoraggio remoto alla manutenzione.
            </p>

            {/* Stats with vertical dividers */}
            <div className="flex items-center gap-0 pt-8 border-t border-white/20 md:border-[#E8E8E8]">
              <div className="pr-8">
                <p className="font-heading text-[2.5rem] text-white md:text-[#0A0A0A]">500+</p>
                <p className="overline text-white/60 md:text-[#6B6B6B] mt-1">Impianti</p>
              </div>
              <div className="border-l border-white/20 md:border-[#E8E8E8] px-8">
                <p className="font-heading text-[2.5rem] text-white md:text-[#0A0A0A]">4</p>
                <p className="overline text-white/60 md:text-[#6B6B6B] mt-1">Sedi</p>
              </div>
              <div className="border-l border-white/20 md:border-[#E8E8E8] pl-8">
                <p className="font-heading text-[2.5rem] text-white md:text-[#0A0A0A]">98%</p>
                <p className="overline text-white/60 md:text-[#6B6B6B] mt-1">Soddisfatti</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
