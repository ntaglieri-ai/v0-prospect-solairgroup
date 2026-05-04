"use client"

const locations = [
  { city: "Catania", region: "Sicilia", contact: "Marco Rossi", phone: "+39 095 290 0278" },
  { city: "Giarre (CT)", region: "Sicilia", contact: "Luca Ferrara", phone: "+39 095 290 0278" },
  { city: "Treviso (TV)", region: "Veneto", contact: "Anna Bianchi", phone: "+39 095 290 0278" },
  { city: "Torino (TO)", region: "Piemonte", contact: "Giuseppe Verdi", phone: "+39 095 290 0278" },
]

export function MapSection() {
  return (
    <section className="py-24 bg-white">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <p className="text-xs uppercase tracking-widest text-gray-500 mb-4">Sedi</p>
          <h2 className="text-3xl md:text-4xl font-light text-gray-900">
            Le nostre sedi in Italia
          </h2>
        </div>

        {/* 4 Columns */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
          {locations.map((location, index) => (
            <div 
              key={location.city}
              className={`py-6 text-center ${
                index > 0 ? "lg:border-l lg:border-gray-200" : ""
              }`}
            >
              <p className="text-xs uppercase tracking-wider text-gray-500 mb-2">{location.region}</p>
              <h3 className="text-lg font-light text-gray-900 mb-3">{location.city}</h3>
              <p className="text-sm text-gray-500 font-light mb-1">{location.contact}</p>
              <p className="text-sm text-gray-500 font-light">{location.phone}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
