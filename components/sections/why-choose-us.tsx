"use client"

import Image from "next/image"

const services = [
  {
    overline: "Installazione",
    title: "Installazione Fotovoltaico Chiavi in Mano",
    description: "Dalla consulenza iniziale all'allaccio in rete: gestiamo ogni fase dell'installazione, incluse le pratiche burocratiche e gli incentivi fiscali.",
    image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/WhatsApp%20Image%202026-05-05%20at%2010.06.47-UX922PTtbvn2fUcjSvYp3QCeC8GZ3E.jpeg",
    alt: "Villa moderna con pannelli solari sul tetto affacciata sul mare",
  },
  {
    overline: "Team",
    title: "Tecnici Certificati GSE",
    description: "Il nostro team e composto da tecnici qualificati e certificati GSE, con anni di esperienza su impianti residenziali e industriali.",
    image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/WhatsApp%20Image%202026-05-05%20at%2010.14.55-aCiyOxrNPdUQe1uf2iuWnqepMqFnHj.jpeg",
    alt: "Due tecnici con giubbotti arancioni e caschi ispezionano impianto fotovoltaico su tetto industriale",
  },
  {
    overline: "Tecnologia",
    title: "Monitoraggio Impianto Fotovoltaico",
    description: "Ogni impianto include un sistema di monitoraggio in tempo reale. Controlli la produzione e i consumi direttamente dal tuo smartphone.",
    image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Remote-solar-monitoring-5IjV5qO369r2OV5oiyjHSN9cDfzCGW.png",
    alt: "Mani che tengono smartphone con app di monitoraggio solare davanti a pannelli fotovoltaici",
  },
  {
    overline: "Qualita",
    title: "Pannelli Solari di Qualita Premium",
    description: "Utilizziamo esclusivamente pannelli e inverter dei migliori brand mondiali, con garanzia fino a 25 anni sulla produzione.",
    image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/solar-panels-on-roof-DQKbI8vUnnBfcopYGHEKjvfmPpOjS2.jpg",
    alt: "Pannelli solari premium installati su tetto con tegole grigie con luce solare calda",
  },
]

export function WhyChooseUsSection() {
  return (
    <section id="servizi" className="mb-0 md:mb-[50px]">
      {services.map((service, index) => {
        const isOdd = index % 2 === 0

        if (isOdd) {
          // Full-bleed background image with overlay - text centered vertically at exact center
          return (
            <div
              key={service.title}
              className="relative h-screen flex items-center justify-center mb-0 md:mb-[50px]"
            >
              <Image
                src={service.image}
                alt={service.alt}
                fill
                className="object-cover"
                loading="lazy"
              />
              {/* Mobile: gradient overlay bottom to top, Desktop: uniform overlay */}
              <div className="absolute inset-0 md:hidden" style={{ background: "linear-gradient(to top, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.2) 50%, transparent 100%)" }} />
              <div className="absolute inset-0 hidden md:block bg-black/35" />
              
              {/* Content centered at exact vertical center */}
              <div className="relative z-10 w-full flex items-center justify-center md:justify-start px-4 sm:px-8 lg:px-[10vw]">
                <div className="max-w-xl text-center md:text-left">
                  <p className="overline mobile-text-pearl-70 md:text-white/90 mb-3 sm:mb-5 text-[10px] sm:text-[11px]">
                    {service.overline}
                  </p>
                  <h3 className="font-heading mobile-text-pearl md:text-white mb-4 sm:mb-6 text-2xl sm:text-3xl md:text-4xl lg:text-5xl">
                    {service.title}
                  </h3>
                  <p className="body-text mobile-text-pearl-85 md:text-white/95 text-sm sm:text-base">
                    {service.description}
                  </p>
                </div>
              </div>
            </div>
          )
        } else {
          // Split layout: on mobile becomes full-bleed with text overlay
          return (
            <div
              key={service.title}
              className="relative min-h-screen mb-0 md:mb-[50px]"
            >
              {/* Mobile: Full background image */}
              <div className="absolute inset-0 md:hidden">
                <Image
                  src={service.image}
                  alt={service.alt}
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
                  <div className="max-w-md">
                    <p className="overline text-[#8a9aaa] mb-5">
                      {service.overline}
                    </p>
                    <h3 className="font-heading text-[#1e3a5f] mb-6" style={{ fontSize: "clamp(2.2rem, 3.5vw, 3rem)" }}>
                      {service.title}
                    </h3>
                    <p className="body-text text-gray-800">
                      {service.description}
                    </p>
                  </div>
                </div>
                {/* Image - full height */}
                <div className="relative min-h-[60vh] lg:min-h-0">
                  <Image
                    src={service.image}
                    alt={service.alt}
                    fill
                    className="object-cover"
                    loading="lazy"
                  />
                </div>
              </div>

              {/* Mobile: Text overlay */}
              <div className="relative z-10 flex items-center justify-center min-h-screen px-4 sm:px-8 py-16 sm:py-20 md:hidden">
                <div className="max-w-md text-center">
                  <p className="overline mobile-text-pearl-70 mb-3 sm:mb-5 text-[10px] sm:text-[11px]">
                    {service.overline}
                  </p>
                  <h3 className="font-heading mobile-text-pearl mb-4 sm:mb-6 text-2xl sm:text-3xl">
                    {service.title}
                  </h3>
                  <p className="body-text mobile-text-pearl-85 text-sm sm:text-base">
                    {service.description}
                  </p>
                </div>
              </div>
            </div>
          )
        }
      })}
    </section>
  )
}
