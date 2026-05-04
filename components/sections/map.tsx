"use client"

const locations = [
  { city: "Catania", region: "Sicilia", contact: "Marco Rossi", phone: "+39 095 290 0278" },
  { city: "Giarre (CT)", region: "Sicilia", contact: "Luca Ferrara", phone: "+39 095 290 0278" },
  { city: "Treviso (TV)", region: "Veneto", contact: "Anna Bianchi", phone: "+39 095 290 0278" },
  { city: "Torino (TO)", region: "Piemonte", contact: "Giuseppe Verdi", phone: "+39 095 290 0278" },
]

export function MapSection() {
  return (
    <section className="py-[100px] bg-white section-divider">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <p className="overline text-[#6B6B6B] mb-4">Sedi</p>
          <h2 className="font-heading text-[#0A0A0A]">
            Le nostre sedi in Italia
          </h2>
        </div>

        {/* 4 Columns with vertical dividers */}
        <div className="grid grid-cols-2 lg:grid-cols-4">
          {locations.map((location, index) => (
            <div 
              key={location.city}
              className={`py-8 text-center ${
                index > 0 ? "lg:border-l border-[#E8E8E8]" : ""
              }`}
            >
              <p className="overline text-[#6B6B6B] mb-3">{location.region}</p>
              <h3 className="text-lg font-light text-[#0A0A0A] mb-4" style={{ fontFamily: "var(--font-dm-sans)" }}>
                {location.city}
              </h3>
              <p className="text-sm text-[#6B6B6B] font-light mb-1">{location.contact}</p>
              <p className="text-sm text-[#6B6B6B] font-light">{location.phone}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
