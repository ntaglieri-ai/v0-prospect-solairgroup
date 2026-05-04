"use client"

import Image from "next/image"

const services = [
  {
    overline: "Installazione",
    title: "Servizio Completo",
    description: "Dalla consulenza iniziale all'allaccio in rete: gestiamo ogni fase dell'installazione, incluse le pratiche burocratiche e gli incentivi fiscali.",
    image: "https://images.unsplash.com/photo-1509391366360-2e959784a276?w=1400&q=90",
    alt: "Impianto fotovoltaico installato su tetto residenziale",
  },
  {
    overline: "Team",
    title: "Installatori Certificati",
    description: "Il nostro team è composto da tecnici qualificati e certificati GSE, con anni di esperienza su impianti residenziali e industriali.",
    image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1400&q=90",
    alt: "Tecnici certificati installano pannelli fotovoltaici",
  },
  {
    overline: "Tecnologia",
    title: "Monitoraggio Remoto",
    description: "Ogni impianto include un sistema di monitoraggio in tempo reale. Controlli la produzione e i consumi direttamente dal tuo smartphone.",
    image: "https://images.unsplash.com/photo-1504711434969-e33886168f5c?w=1400&q=90",
    alt: "Monitoraggio remoto impianto fotovoltaico",
  },
  {
    overline: "Comunità",
    title: "Solair CER",
    description: "Entra nella nostra Comunità Energetica Rinnovabile e condividi l'energia prodotta con altri membri, ottenendo incentivi aggiuntivi fino al 40%.",
    image: "https://images.unsplash.com/photo-1466611653911-95081537e5b7?w=1400&q=90",
    alt: "Pannelli solari comunità energetica rinnovabile",
  },
  {
    overline: "Sicurezza",
    title: "Sistema Anti-Blackout",
    description: "Il nostro sistema EPS garantisce continuità energetica anche in caso di interruzione della rete. Zero dipendenza dal fornitore esterno.",
    image: "https://images.unsplash.com/photo-1508514177221-188b1cf16e9d?w=1400&q=90",
    alt: "Casa con pannelli solari e sistema di accumulo energia",
  },
  {
    overline: "Qualità",
    title: "Tecnologia di Qualità",
    description: "Utilizziamo esclusivamente pannelli e inverter dei migliori brand mondiali, con garanzia fino a 25 anni sulla produzione.",
    image: "https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?w=1400&q=90",
    alt: "Pannelli fotovoltaici alta qualità energia rinnovabile",
  },
]

export function WhyChooseUsSection() {
  return (
    <section id="servizi">
      {services.map((service, index) => {
        const isOdd = index % 2 === 0

        if (isOdd) {
          return (
            <div
              key={service.title}
              className="relative min-h-[80vh] flex items-center"
            >
              <Image
                src={service.image}
                alt={service.alt}
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-black/25" />
              <div className="relative z-10 w-full px-8 lg:px-24 py-20">
                <div className="max-w-xl">
                  <p className="text-[11px] uppercase tracking-[0.2em] text-white/60 mb-5 font-medium">
                    {service.overline}
                  </p>
                  <h3 className="text-3xl md:text-4xl lg:text-5xl font-light text-white mb-6 leading-tight">
                    {service.title}
                  </h3>
                  <p className="text-base text-white/75 font-light leading-relaxed max-w-md">
                    {service.description}
                  </p>
                </div>
              </div>
            </div>
          )
        } else {
          return (
            <div
              key={service.title}
              className="min-h-[80vh] bg-[#F7F7F5] flex items-center"
            >
              <div className="w-full grid lg:grid-cols-2">
                <div className="flex items-center px-8 lg:px-24 py-16 lg:py-0 order-2 lg:order-1">
                  <div className="max-w-md">
                    <p className="text-[11px] uppercase tracking-[0.2em] text-[#6B6B6B] mb-5 font-medium">
                      {service.overline}
                    </p>
                    <h3 className="text-3xl md:text-4xl lg:text-5xl font-light text-[#0A0A0A] mb-6 leading-tight">
                      {service.title}
                    </h3>
                    <p className="text-base text-[#6B6B6B] font-light leading-relaxed">
                      {service.description}
                    </p>
                  </div>
                </div>
                <div className="relative h-[400px] lg:h-auto lg:min-h-[80vh] order-1 lg:order-2">
                  <Image
                    src={service.image}
                    alt={service.alt}
                    fill
                    className="object-cover"
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
