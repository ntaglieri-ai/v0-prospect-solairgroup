"use client"

import Image from "next/image"

export function AboutSection() {
  return (
    <section id="chi-siamo" className="relative min-h-screen bg-white flex items-center mb-0 md:mb-[50px]">
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
        <div className="absolute inset-0" style={{ background: "linear-gradient(to top, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.2) 50%, transparent 100%)" }} />
      </div>

      <div className="w-full grid lg:grid-cols-2 relative z-10">
        {/* Left - Image 50% full height - Hidden on mobile */}
        <div className="relative h-[500px] lg:h-auto lg:min-h-screen hidden md:block shadow-md rounded-xl overflow-hidden">
          <Image
            src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/WhatsApp%20Image%202026-05-05%20at%2009.56.49-h8SJNVgUOLg7xWL6OiumcFkE6pdbzB.jpeg"
            alt="Pannelli solari su tetto residenziale con cielo azzurro"
            fill
            className="object-cover"
            loading="lazy"
          />
          {/* Soft overlay for visual harmony */}
          <div className="absolute inset-0 bg-[#1e3a5f]/10" />
        </div>

        {/* Right - Text with padding 80px, centered vertically */}
        <div className="flex items-center py-[100px] px-8 lg:px-20 md:bg-white">
          <div className="max-w-lg">
            <p className="text-sm font-semibold uppercase tracking-widest text-[#2e8b72] mb-4 mobile-text-pearl-70">
              Chi Siamo
            </p>

            <h2 className="text-3xl md:text-4xl font-extrabold text-[#1e3a5f] tracking-tight mb-6 mobile-text-pearl">
              L&apos;energia pulita, finalmente accessibile
            </h2>

            <p className="text-gray-800 leading-relaxed text-base mb-10 mobile-text-pearl-85">
              Solair Group e il partner di fiducia per il fotovoltaico in Italia. 
              Installiamo impianti chiavi in mano con assistenza completa: dalla progettazione 
              alle pratiche GSE, dal monitoraggio remoto alla manutenzione.
            </p>

            {/* Stats with vertical dividers and hover effect */}
            <div className="flex items-center gap-0 pt-8 border-t border-[#d0d6da] mobile-border-pearl-20">
              <div className="pr-8 hover:scale-105 transition-transform duration-300 cursor-default">
                <p className="font-heading text-[2.5rem] text-[#1e3a5f] mobile-text-pearl">500+</p>
                <p className="overline mt-1 text-[#8a9aaa] mobile-text-pearl-70">Impianti</p>
              </div>
              <div className="border-l border-[#d0d6da] mobile-border-pearl-20 px-8 hover:scale-105 transition-transform duration-300 cursor-default">
                <p className="font-heading text-[2.5rem] text-[#1e3a5f] mobile-text-pearl">4</p>
                <p className="overline mt-1 text-[#8a9aaa] mobile-text-pearl-70">Sedi</p>
              </div>
              <div className="border-l border-[#d0d6da] mobile-border-pearl-20 pl-8 hover:scale-105 transition-transform duration-300 cursor-default">
                <p className="font-heading text-[2.5rem] text-[#1e3a5f] mobile-text-pearl">98%</p>
                <p className="overline mt-1 text-[#8a9aaa] mobile-text-pearl-70">Soddisfatti</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
