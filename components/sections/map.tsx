"use client"

const locations = [
  { city: "Catania", region: "Sicilia", contact: "Marco Rossi", phone: "+39 095 290 0278" },
  { city: "Giarre (CT)", region: "Sicilia", contact: "Luca Ferrara", phone: "+39 095 290 0278" },
  { city: "Treviso (TV)", region: "Veneto", contact: "Anna Bianchi", phone: "+39 095 290 0278" },
  { city: "Torino (TO)", region: "Piemonte", contact: "Giuseppe Verdi", phone: "+39 095 290 0278" },
]

export function MapSection() {
  return (
    <section className="py-[100px] bg-[#FAFAF8]">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="font-heading text-[#0A0A0A]">
            Le nostre sedi in Italia
          </h2>
        </div>

        {/* 4 Columns with vertical separators */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-0">
          {locations.map((location, index) => (
            <div 
              key={location.city}
              className={`py-8 text-center ${
                index > 0 ? "lg:border-l lg:border-[#E8E8E8]" : ""
              }`}
            >
              <p className="overline text-[#6B6B6B] mb-2">{location.region}</p>
              <h3 className="text-lg font-normal text-[#0A0A0A] mb-3">{location.city}</h3>
              <p className="text-sm text-[#6B6B6B] font-light mb-1">{location.contact}</p>
              <p className="text-sm text-[#6B6B6B] font-light">{location.phone}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
