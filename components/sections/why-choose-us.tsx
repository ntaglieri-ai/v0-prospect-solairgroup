"use client"

import Image from "next/image"

const services = [
  {
    overline: "Installazione",
    title: "Servizio Completo",
    description: "Dalla consulenza iniziale all'allaccio in rete: gestiamo ogni fase dell'installazione, incluse le pratiche burocratiche e gli incentivi fiscali.",
    image: "https://images.unsplash.com/photo-1509391366360-2e959784a276?w=1400&q=90",
  },
  {
    overline: "Team",
    title: "Installatori Certificati",
    description: "Il nostro team e composto da tecnici qualificati e certificati GSE, con anni di esperienza su impianti residenziali e industriali.",
    image: "https://images.unsplash.com/photo-1521618755572-156ae0cdd74d?w=1400&q=90",
  },
  {
    overline: "Tecnologia",
    title: "Monitoraggio Remoto",
    description: "Ogni impianto include un sistema di monitoraggio in tempo reale. Controlli la produzione e i consumi direttamente dal tuo smartphone.",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1400&q=90",
  },
  {
    overline: "Comunita",
    title: "Solair CER",
    description: "Entra nella nostra Comunita Energetica Rinnovabile e condividi l'energia prodotta con altri membri, ottenendo incentivi aggiuntivi fino al 40%.",
    image: "https://images.unsplash.com/photo-1466611653911-95081537e5b7?w=1400&q=90",
  },
  {
    overline: "Sicurezza",
    title: "Sistema Anti-Blackout",
    description: "Il nostro sistema EPS garantisce continuita energetica anche in caso di interruzione della rete. Zero dipendenza dal fornitore esterno.",
    image: "https://images.unsplash.com/photo-1508514177221-188b1cf16e9d?w=1400&q=90",
  },
  {
    overline: "Qualita",
    title: "Tecnologia di Qualita",
    description: "Utilizziamo esclusivamente pannelli e inverter dei migliori brand mondiali, con garanzia fino a 25 anni sulla produzione.",
    image: "https://images.unsplash.com/photo-1545209463-4ef10d1a1ace?w=1400&q=90",
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
              className="relative min-h-[70vh] flex items-center"
            >
              <Image
                src={service.image}
                alt={service.title}
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-black/40" />
              <div className="relative z-10 w-full px-8 lg:px-20 py-20">
                <div className="max-w-xl">
                  <p className="text-xs uppercase tracking-widest text-white/70 mb-4">{service.overline}</p>
                  <h3 className="text-3xl md:text-4xl font-light text-white mb-6 leading-tight">
                    {service.title}
                  </h3>
                  <p className="text-base text-white/80 font-light leading-relaxed">
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
              className="min-h-[70vh] bg-gray-50 flex items-center"
            >
              <div className="w-full grid lg:grid-cols-2">
                <div className="flex items-center px-8 lg:px-20 py-16 lg:py-0 order-2 lg:order-1">
                  <div className="max-w-md">
                    <p className="text-xs uppercase tracking-widest text-gray-500 mb-4">{service.overline}</p>
                    <h3 className="text-3xl md:text-4xl font-light text-gray-900 mb-6 leading-tight">
                      {service.title}
                    </h3>
                    <p className="text-base text-gray-600 font-light leading-relaxed">
                      {service.description}
                    </p>
                  </div>
                </div>
                <div className="relative h-[400px] lg:h-auto lg:min-h-[70vh] order-1 lg:order-2">
                  <Image
                    src={service.image}
                    alt={service.title}
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
