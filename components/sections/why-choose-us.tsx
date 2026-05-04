"use client"

import Image from "next/image"

const services = [
  {
    overline: "Installazione",
    title: "Installazione Fotovoltaico Chiavi in Mano",
    description: "Dalla consulenza iniziale all'allaccio in rete: gestiamo ogni fase dell'installazione, incluse le pratiche burocratiche e gli incentivi fiscali.",
    image: "https://images.unsplash.com/photo-1509391366360-2e959784a276?w=1400&q=90",
    alt: "Installatori professionisti montano pannelli fotovoltaici su tetto residenziale",
  },
  {
    overline: "Team",
    title: "Tecnici Certificati GSE",
    description: "Il nostro team e composto da tecnici qualificati e certificati GSE, con anni di esperienza su impianti residenziali e industriali.",
    image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1400&q=90",
    alt: "Tecnico certificato installa pannello solare su tetto",
  },
  {
    overline: "Tecnologia",
    title: "Monitoraggio Impianto Fotovoltaico",
    description: "Ogni impianto include un sistema di monitoraggio in tempo reale. Controlli la produzione e i consumi direttamente dal tuo smartphone.",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1400&q=90",
    alt: "Persona controlla grafici energetici su smartphone per monitoraggio impianto fotovoltaico",
  },
  {
    overline: "Comunita",
    title: "Comunita Energetica Rinnovabile",
    description: "Entra nella nostra Comunita Energetica Rinnovabile e condividi l'energia prodotta con altri membri, ottenendo incentivi aggiuntivi fino al 40%.",
    image: "https://images.unsplash.com/photo-1508514177221-188b1cf16e9d?w=1400&q=90",
    alt: "Quartiere residenziale con pannelli solari sui tetti visto dall'alto",
  },
  {
    overline: "Sicurezza",
    title: "Sistema Anti-Blackout EPS",
    description: "Il nostro sistema EPS garantisce continuita energetica anche in caso di interruzione della rete. Zero dipendenza dal fornitore esterno.",
    image: "https://images.unsplash.com/photo-1513828583688-c52646db42da?w=1400&q=90",
    alt: "Casa moderna con pannelli solari e sistema di accumulo energia",
  },
  {
    overline: "Qualita",
    title: "Pannelli Solari di Qualita Premium",
    description: "Utilizziamo esclusivamente pannelli e inverter dei migliori brand mondiali, con garanzia fino a 25 anni sulla produzione.",
    image: "https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?w=1400&q=90",
    alt: "Dettaglio ravvicinato di pannello fotovoltaico premium celle solari",
  },
]

export function WhyChooseUsSection() {
  return (
    <section id="servizi">
      {services.map((service, index) => {
        const isOdd = index % 2 === 0

        if (isOdd) {
          // Full-bleed background image with overlay - text centered vertically
          return (
            <div
              key={service.title}
              className="relative min-h-[80vh] flex items-center justify-center"
            >
              <Image
                src={service.image}
                alt={service.alt}
                fill
                className="object-cover"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-black/30" />
              
              {/* Content centered both horizontally and vertically */}
              <div className="relative z-10 w-full flex items-center justify-start px-8 lg:px-[10vw] py-[100px]">
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
          // Split layout: text left, image right 55%
          return (
            <div
              key={service.title}
              className="min-h-[80vh] bg-[#F7F7F5] flex items-center"
            >
              <div className="w-full grid lg:grid-cols-[45%_55%]">
                {/* Text - centered vertically with padding */}
                <div className="flex items-center px-8 lg:px-20 py-[100px] order-2 lg:order-1">
                  <div className="max-w-md">
                    <p className="overline text-[#6B6B6B] mb-5">
                      {service.overline}
                    </p>
                    <h3 className="font-heading text-[#0A0A0A] mb-6" style={{ fontSize: "clamp(2.2rem, 3.5vw, 3rem)" }}>
                      {service.title}
                    </h3>
                    <p className="body-text">
                      {service.description}
                    </p>
                  </div>
                </div>
                {/* Image - full height */}
                <div className="relative h-[500px] lg:h-auto lg:min-h-[80vh] order-1 lg:order-2">
                  <Image
                    src={service.image}
                    alt={service.alt}
                    fill
                    className="object-cover"
                    loading="lazy"
                  />
                </div>
              </div>
            </div>
          )
        }
      })}
    </section>
  )
}
