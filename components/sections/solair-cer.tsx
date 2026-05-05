"use client"

import Image from "next/image"

const cerBenefits = [
  "Autoconsumo diffuso dell'energia prodotta",
  "Risparmio fino al 40% in bolletta",
  "Incentivi statali dedicati",
  "Energia 100% rinnovabile",
  "Nessun vincolo contrattuale minimo",
]

export function SolairCERSection() {
  return (
    <section
      id="cer"
      className="relative min-h-screen mb-0 md:mb-[50px]"
    >
      {/* Mobile: Full background image */}
      <div className="absolute inset-0 md:hidden">
        <Image
          src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/pexels-marianne-rixhon-10955129-6233727-3kdk6ZmZA8eJXzi2V7BvxzAq23spiO.jpg"
          alt="Quartiere residenziale europeo con pannelli solari sui tetti al tramonto"
          fill
          className="object-cover"
          loading="lazy"
        />
        {/* Dark gradient overlay bottom to top for mobile */}
        <div className="absolute inset-0" style={{ background: "linear-gradient(to top, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.2) 50%, transparent 100%)" }} />
      </div>

      {/* Desktop: Grid layout */}
      <div className="hidden md:grid lg:grid-cols-[45%_55%] min-h-screen">
        {/* Text - centered vertically */}
        <div className="flex items-center justify-center bg-[#E8E8E8] px-8 lg:px-20 py-20 lg:py-0">
          <div className="max-w-lg">
            <p className="overline text-[#6B6B6B] mb-5">
              Solair CER
            </p>
            <h3 className="font-heading text-[#0A0A0A] mb-6" style={{ fontSize: "clamp(2.2rem, 3.5vw, 3rem)" }}>
              Comunita Energetiche Rinnovabili
            </h3>
            <p className="body-text mb-10">
              Le Comunita Energetiche Rinnovabili permettono a privati, condomini e aziende di produrre e condividere energia pulita, riducendo la bolletta fino al 40% e accedendo a incentivi statali dedicati.
            </p>
            
            {/* CER Benefits list */}
            <div className="space-y-0 mb-10">
              {cerBenefits.map((benefit, idx) => (
                <div 
                  key={idx} 
                  className="flex items-center gap-4 py-4 border-b border-[#D8D8D8] last:border-0"
                >
                  <span className="text-[#6B6B6B]">—</span>
                  <span className="text-sm text-[#0A0A0A] font-light">{benefit}</span>
                </div>
              ))}
            </div>
            
            {/* Stat */}
            <div className="mb-10 pt-6 border-t border-[#D8D8D8]">
              <p className="font-heading text-[3rem] text-[#0A0A0A]">20+</p>
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
        {/* Image - full height */}
        <div className="relative min-h-[60vh] lg:min-h-0">
          <Image
            src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/pexels-marianne-rixhon-10955129-6233727-3kdk6ZmZA8eJXzi2V7BvxzAq23spiO.jpg"
            alt="Quartiere residenziale europeo con pannelli solari sui tetti al tramonto"
            fill
            className="object-cover"
            loading="lazy"
          />
        </div>
      </div>

      {/* Mobile: Text overlay */}
      <div className="relative z-10 flex items-center justify-center min-h-screen px-8 py-20 md:hidden">
        <div className="max-w-lg">
          <p className="overline text-[#F5F5F0]/70 mb-5">
            Solair CER
          </p>
          <h3 className="font-heading text-[#F5F5F0] mb-6" style={{ fontSize: "clamp(2.2rem, 3.5vw, 3rem)" }}>
            Comunita Energetiche Rinnovabili
          </h3>
          <p className="body-text text-[#F5F5F0]/85 mb-10">
            Le Comunita Energetiche Rinnovabili permettono a privati, condomini e aziende di produrre e condividere energia pulita, riducendo la bolletta fino al 40% e accedendo a incentivi statali dedicati.
          </p>
          
          {/* CER Benefits list */}
          <div className="space-y-0 mb-10">
            {cerBenefits.map((benefit, idx) => (
              <div 
                key={idx} 
                className="flex items-center gap-4 py-4 border-b border-[#F5F5F0]/20 last:border-0"
              >
                <span className="text-[#F5F5F0]/70">—</span>
                <span className="text-sm text-[#F5F5F0] font-light">{benefit}</span>
              </div>
            ))}
          </div>
          
          {/* Stat */}
          <div className="mb-10 pt-6 border-t border-[#F5F5F0]/20">
            <p className="font-heading text-[3rem] text-[#F5F5F0]">20+</p>
            <p className="overline text-[#F5F5F0]/70 mt-1">
              CER attive in Italia
            </p>
          </div>

          <a 
            href="#contatti" 
            className="btn-outline text-[#F5F5F0] border-[#F5F5F0]/40 hover:border-[#F5F5F0]"
          >
            Scopri di piu
          </a>
        </div>
      </div>
    </section>
  )
}
