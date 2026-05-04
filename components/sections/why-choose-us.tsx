"use client"

import Image from "next/image"

const services = [
  {
    overline: "Installazione",
    title: "Servizio Completo",
    description: "Dalla consulenza iniziale all'allaccio in rete: gestiamo ogni fase dell'installazione, incluse le pratiche burocratiche e gli incentivi fiscali.",
    image: "https://images.unsplash.com/photo-1509391366360-2e959784a276?w=1400&q=90",
    alt: "Installatori professionisti al lavoro su tetto con pannelli solari",
  },
  {
    overline: "Team",
    title: "Installatori Certificati",
    description: "Il nostro team e composto da tecnici qualificati e certificati GSE, con anni di esperienza su impianti residenziali e industriali.",
    image: "https://images.unsplash.com/photo-1521618755572-156ae0cdd74d?w=1400&q=90",
    alt: "Tecnico che installa pannello solare su tetto residenziale",
  },
  {
    overline: "Tecnologia",
    title: "Monitoraggio Remoto",
    description: "Ogni impianto include un sistema di monitoraggio in tempo reale. Controlli la produzione e i consumi direttamente dal tuo smartphone.",
    image: "https://images.unsplash.com/photo-1611532736597-de2d4265fba3?w=1400&q=90",
    alt: "Persona che controlla app solare su smartphone moderno",
  },
  {
    overline: "Comunita",
    title: "Solair CER",
    description: "Entra nella nostra Comunita Energetica Rinnovabile e condividi l'energia prodotta con altri membri, ottenendo incentivi aggiuntivi fino al 40%.",
    image: "https://images.unsplash.com/photo-1466611653911-95081537e5b7?w=1400&q=90",
    alt: "Quartiere residenziale con pannelli solari sui tetti visto dall'alto",
  },
  {
    overline: "Sicurezza",
    title: "Sistema Anti-Blackout",
    description: "Il nostro sistema EPS garantisce continuita energetica anche in caso di interruzione della rete. Zero dipendenza dal fornitore esterno.",
    image: "https://images.unsplash.com/photo-1508514177221-188b1cf16e9d?w=1400&q=90",
    alt: "Casa moderna con pannelli solari e batteria di accumulo",
  },
  {
    overline: "Qualita",
    title: "Tecnologia di Qualita",
    description: "Utilizziamo esclusivamente pannelli e inverter dei migliori brand mondiali, con garanzia fino a 25 anni sulla produzione.",
    image: "https://images.unsplash.com/photo-1509391366360-2e959784a276?w=1400&q=90",
    alt: "Dettaglio ravvicinato di pannello fotovoltaico premium con texture celle",
  },
]

export function WhyChooseUsSection() {
  return (
    <section id="servizi">
      {services.map((service, index) => {
        const isOdd = index % 2 === 0
        
        if (isOdd) {
          // Full-bleed background image with overlay and white text
          return (
            <div 
              key={service.title}
              className="relative min-h-[80vh] flex items-center py-[120px]"
            >
              <Image
                src={service.image}
                alt={service.alt}
                fill
                className="object-cover"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-black/35" />
              <div className="relative z-10 w-full h-full flex items-center px-8 lg:px-[10vw]">
                <div className="max-w-xl mx-auto lg:mx-0">
                  <p className="overline text-white/70 mb-4">{service.overline}</p>
                  <h3 className="font-heading text-white mb-6">
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
          // Split layout: text left, image right 55%
          return (
            <div 
              key={service.title}
              className="min-h-[80vh] bg-[#F7F7F5] flex items-center py-[100px] border-t border-[#E8E8E8]"
            >
              <div className="w-full grid lg:grid-cols-[45%_55%] gap-8">
                <div className="flex items-center px-8 lg:px-20 py-12 lg:py-20 order-2 lg:order-1">
                  <div className="max-w-md">
                    <p className="overline text-[#6B6B6B] mb-4">{service.overline}</p>
                    <h3 className="font-heading text-[#0A0A0A] mb-6">
                      {service.title}
                    </h3>
                    <p className="body-text">
                      {service.description}
                    </p>
                  </div>
                </div>
                <div className="relative h-[450px] lg:h-auto lg:min-h-[60vh] order-1 lg:order-2">
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
