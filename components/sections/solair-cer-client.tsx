"use client"

import Image from "next/image"
import type { CER } from "@/lib/sanity/queries"

interface SolairCERClientProps {
  cer: CER
}

export function SolairCERClient({ cer }: SolairCERClientProps) {
  const cerBenefits = cer.vantaggi || []
  const titolo = cer.titolo || "Comunità Energetiche Rinnovabili"
  const descrizione = cer.descrizione || ""
  const incentivo = cer.incentivo || 20
  const ctaTesto = cer.ctaTesto || "Scopri di più"
  const ctaLink = cer.ctaLink || "#contatti"
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
        <div className="flex items-center justify-center bg-[#f4f6f7] px-8 lg:px-20 py-20 lg:py-0">
          <div className="max-w-lg">
            <p className="overline text-[#8a9aaa] mb-5">
              Solair CER
            </p>
            <h3 className="font-heading text-[#1e3a5f] mb-6" style={{ fontSize: "clamp(2.2rem, 3.5vw, 3rem)" }}>
              {titolo}
            </h3>
            <p className="body-text text-[#4a6080] mb-10">
              {descrizione}
            </p>
            
            {/* CER Benefits list */}
            <div className="space-y-0 mb-10">
              {cerBenefits.map((benefit, idx) => (
                <div 
                  key={idx} 
                  className="flex items-center gap-4 py-4 border-b border-[#d0d6da] last:border-0"
                >
                  <span className="text-[#8a9aaa]">—</span>
                  <span className="text-sm text-[#1e3a5f] font-light">{benefit}</span>
                </div>
              ))}
            </div>
            
            {/* Stat */}
            <div className="mb-10 pt-6 border-t border-[#d0d6da]">
              <p className="font-heading text-[3rem] text-[#1e3a5f]">{incentivo}+</p>
              <p className="overline text-[#8a9aaa] mt-1">
                CER attive in Italia
              </p>
            </div>

            <a 
              href={ctaLink} 
              className="btn-outline text-[#1e3a5f]"
            >
              {ctaTesto}
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
          <p className="overline mb-5 mobile-text-pearl-70">
            Solair CER
          </p>
          <h3 className="font-heading mb-6 mobile-text-pearl" style={{ fontSize: "clamp(2.2rem, 3.5vw, 3rem)" }}>
            {titolo}
          </h3>
          <p className="body-text mb-10 mobile-text-pearl-85">
            {descrizione}
          </p>
          
          {/* CER Benefits list */}
          <div className="space-y-0 mb-10">
            {cerBenefits.map((benefit, idx) => (
              <div 
                key={idx} 
                className="flex items-center gap-4 py-4 last:border-0 mobile-border-pearl-20"
                style={{ borderBottomWidth: "1px", borderBottomStyle: "solid" }}
              >
                <span className="mobile-text-pearl-70">—</span>
                <span className="text-sm font-light mobile-text-pearl">{benefit}</span>
              </div>
            ))}
          </div>
          
          {/* Stat */}
          <div className="mb-10 pt-6 mobile-border-pearl-20" style={{ borderTopWidth: "1px", borderTopStyle: "solid" }}>
            <p className="font-heading mobile-text-pearl" style={{ fontSize: "3rem" }}>{incentivo}+</p>
            <p className="overline mt-1 mobile-text-pearl-70">
              CER attive in Italia
            </p>
          </div>

          <a 
            href={ctaLink} 
            className="btn-outline mobile-text-pearl mobile-border-pearl-20"
          >
            {ctaTesto}
          </a>
        </div>
      </div>
    </section>
  )
}
