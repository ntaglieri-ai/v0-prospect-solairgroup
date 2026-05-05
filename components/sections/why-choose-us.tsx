"use client"

import Image from "next/image"

const cerBenefits = [
  "Autoconsumo diffuso dell'energia prodotta",
  "Risparmio fino al 40% in bolletta",
  "Incentivi statali dedicati",
  "Energia 100% rinnovabile",
  "Nessun vincolo contrattuale minimo",
]

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
    overline: "Solair CER",
    title: "Comunita Energetiche Rinnovabili",
    description: "Le Comunita Energetiche Rinnovabili permettono a privati, condomini e aziende di produrre e condividere energia pulita, riducendo la bolletta fino al 40% e accedendo a incentivi statali dedicati.",
    image: "https://images.unsplash.com/photo-1508514177221-188b1cf16e9d?w=1400&q=90",
    alt: "Quartiere con pannelli solari sui tetti luce calda tramonto",
    isCER: true,
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
    <section id="servizi" className="mb-[50px]">
      {services.map((service, index) => {
        const isOdd = index % 2 === 0

        if (isOdd) {
          // Full-bleed background image with overlay - text centered vertically at exact center
          return (
            <div
              key={service.title}
              className="relative h-screen flex items-center justify-center mb-[50px]"
            >
              <Image
                src={service.image}
                alt={service.alt}
                fill
                className="object-cover"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-black/35" />
              
              {/* Content centered at exact vertical center */}
              <div className="relative z-10 w-full flex items-center justify-start px-8 lg:px-[10vw]">
                <div className="max-w-xl">
                  <p className="overline text-white/60 mb-5">
                    {service.overline}
                  </p>
                  <h3 className="font-heading text-white mb-6" style={{ fontSize: "clamp(2.5rem, 4vw, 3.5rem)" }}>
                    {service.title}
                  </h3>
                  <p className="body-text text-white/75">
                    {service.description}
                  </p>
                </div>
              </div>
            </div>
          )
        } else {
          // Split layout: text left, image right 55% - 100vh height
          const isCER = 'isCER' in service && service.isCER
          
          return (
            <div
              key={service.title}
              className="grid lg:grid-cols-[45%_55%] min-h-screen mb-[50px]"
              id={isCER ? "cer" : undefined}
            >
              {/* Text - centered vertically */}
              <div className="flex items-center justify-center bg-[#E8E8E8] px-8 lg:px-20 py-20 lg:py-0 order-2 lg:order-1">
                <div className={isCER ? "max-w-lg" : "max-w-md"}>
                  <p className="overline text-[#6B6B6B] mb-5">
                    {service.overline}
                  </p>
                  <h3 className="font-heading text-[#0A0A0A] mb-6" style={{ fontSize: "clamp(2.2rem, 3.5vw, 3rem)" }}>
                    {service.title}
                  </h3>
                  <p className={`body-text ${isCER ? 'mb-10' : ''}`}>
                    {service.description}
                  </p>
                  
                  {/* CER Benefits list */}
                  {isCER && (
                    <>
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
                    </>
                  )}
                </div>
              </div>
              {/* Image - full height stretches to match text column */}
              <div className="relative min-h-[60vh] lg:min-h-0 order-1 lg:order-2">
                <Image
                  src={service.image}
                  alt={service.alt}
                  fill
                  className="object-cover"
                  loading="lazy"
                />
              </div>
            </div>
          )
        }
      })}
    </section>
  )
}
