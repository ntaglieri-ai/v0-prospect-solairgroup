"use client"

const locations = [
  { city: "Catania", region: "Sicilia", contact: "Marco Rossi", phone: "+39 095 290 0278" },
  { city: "Giarre (CT)", region: "Sicilia", contact: "Luca Ferrara", phone: "+39 095 290 0278" },
  { city: "Treviso (TV)", region: "Veneto", contact: "Anna Bianchi", phone: "+39 095 290 0278" },
  { city: "Torino (TO)", region: "Piemonte", contact: "Giuseppe Verdi", phone: "+39 095 290 0278" },
]

export function MapSection() {
  return (
    <section className="bg-[#E8E8E8] mb-[50px]">
      <div className="grid lg:grid-cols-[55%_45%] min-h-[500px]">
        {/* Google Maps - Left 55% */}
        <div className="relative h-[400px] lg:h-auto lg:min-h-[500px]">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2897447!2d12.5!3d42.5!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNDLCsDMwJzAwLjAiTiAxMsKwMzAnMDAuMCJF!5e0!3m2!1sit!2sit!4v1234567890"
            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title="Mappa delle sedi Solair Group in Italia"
            className="absolute inset-0 w-full h-full"
          />
        </div>

        {/* Content - Right 45% */}
        <div className="flex flex-col justify-center px-8 lg:px-16 py-16 lg:py-20">
          {/* Header */}
          <div className="mb-12">
            <p className="overline text-[#6B6B6B] mb-4">Sedi</p>
            <h2 className="font-heading text-[#0A0A0A]">
              Le nostre sedi in Italia
            </h2>
          </div>

          {/* Locations - Vertical list */}
          <div className="space-y-0">
            {locations.map((location, index) => (
              <div 
                key={location.city}
                className={`py-6 ${
                  index > 0 ? "border-t border-[#D8D8D8]" : ""
                }`}
              >
                <p className="overline text-[#6B6B6B] mb-2">{location.region}</p>
                <h3 className="text-lg font-light text-[#0A0A0A] mb-3" style={{ fontFamily: "var(--font-dm-sans)" }}>
                  {location.city}
                </h3>
                <p className="text-sm text-[#6B6B6B] font-light mb-1">{location.contact}</p>
                <p className="text-sm text-[#6B6B6B] font-light">{location.phone}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
