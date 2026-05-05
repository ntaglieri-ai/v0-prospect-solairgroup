"use client"

import { useEffect, useRef, useState } from "react"

const sedi = [
  {
    id: 1,
    regione: "Sicilia",
    citta: "Catania",
    referente: "Marco Rossi",
    telefono: "+39 095 290 0278",
    lat: 37.5079,
    lng: 15.083,
  },
  {
    id: 2,
    regione: "Sicilia",
    citta: "Giarre (CT)",
    referente: "Luca Ferrara",
    telefono: "+39 095 290 0278",
    lat: 37.727,
    lng: 15.1842,
  },
  {
    id: 3,
    regione: "Veneto",
    citta: "Treviso (TV)",
    referente: "Anna Bianchi",
    telefono: "+39 095 290 0278",
    lat: 45.6669,
    lng: 12.243,
  },
  {
    id: 4,
    regione: "Piemonte",
    citta: "Torino (TO)",
    referente: "Giuseppe Verdi",
    telefono: "+39 095 290 0278",
    lat: 45.0703,
    lng: 7.6869,
  },
]

export function MapSection() {
  const mapRef = useRef<HTMLDivElement>(null)
  const mapInstanceRef = useRef<any>(null)
  const markersRef = useRef<any[]>([])
  const [activeId, setActiveId] = useState<number | null>(null)

  useEffect(() => {
    if (typeof window === "undefined") return

    import("leaflet").then((L) => {
      if (!mapRef.current || mapInstanceRef.current) return

      delete (L.Icon.Default.prototype as any)._getIconUrl
      L.Icon.Default.mergeOptions({
        iconRetinaUrl:
          "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
        iconUrl:
          "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
        shadowUrl:
          "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
      })

      const map = L.map(mapRef.current!, {
        center: [42.5, 12.5],
        zoom: 5,
        zoomControl: true,
        scrollWheelZoom: false,
      })

      L.tileLayer(
        "https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png",
        {
          attribution:
            '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/">CARTO</a>',
          maxZoom: 19,
        }
      ).addTo(map)

      const createIcon = (active: boolean) =>
        L.divIcon({
          className: "",
          html: `<div style="
            width: 14px;
            height: 14px;
            background: ${active ? "#e65c00" : "#f5881f"};
            border: 2.5px solid white;
            border-radius: 50%;
            box-shadow: 0 2px 6px rgba(0,0,0,0.35);
            transition: transform 0.2s;
            transform: ${active ? "scale(1.4)" : "scale(1)"};
          "></div>`,
          iconSize: [14, 14],
          iconAnchor: [7, 7],
        })

      sedi.forEach((sede) => {
        const marker = L.marker([sede.lat, sede.lng], {
          icon: createIcon(false),
        }).addTo(map)

        marker.on("click", () => {
          setActiveId(sede.id)
        })

        markersRef.current.push({ id: sede.id, marker })
      })

      mapInstanceRef.current = map
    })

    return () => {
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove()
        mapInstanceRef.current = null
      }
    }
  }, [])

  useEffect(() => {
    if (!mapInstanceRef.current || activeId === null) return

    import("leaflet").then((L) => {
      const sede = sedi.find((s) => s.id === activeId)
      if (!sede) return

      mapInstanceRef.current.flyTo([sede.lat, sede.lng], 10, {
        duration: 1.2,
      })

      markersRef.current.forEach(({ id, marker }) => {
        const isActive = id === activeId
        marker.setIcon(
          L.divIcon({
            className: "",
            html: `<div style="
              width: 14px;
              height: 14px;
              background: ${isActive ? "#e65c00" : "#f5881f"};
              border: 2.5px solid white;
              border-radius: 50%;
              box-shadow: 0 2px 6px rgba(0,0,0,0.35);
              transform: ${isActive ? "scale(1.5)" : "scale(1)"};
            "></div>`,
            iconSize: [14, 14],
            iconAnchor: [7, 7],
          })
        )
      })
    })
  }, [activeId])

  // Group sedi by region
  const grouped = sedi.reduce((acc, sede) => {
    if (!acc[sede.regione]) acc[sede.regione] = []
    acc[sede.regione].push(sede)
    return acc
  }, {} as Record<string, typeof sedi>)

  return (
    <>
      <link
        rel="stylesheet"
        href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css"
      />

      <section className="bg-[#E8E8E8] mb-[25px]">
        <div className="grid lg:grid-cols-[55%_45%] min-h-[500px]">
          {/* Leaflet Map - Left 55% */}
          <div 
            ref={mapRef} 
            className="h-[400px] lg:h-auto lg:min-h-[500px] w-full"
          />

          {/* Sidebar - Right 45% */}
          <div className="flex flex-col justify-center px-8 lg:px-10 py-12 border-l border-[#D8D8D8]">
            <p className="overline text-[#6B6B6B] mb-3">Sedi</p>
            <h2 className="font-heading text-[#0A0A0A] mb-10" style={{ fontSize: "clamp(1.75rem, 3vw, 2.5rem)", lineHeight: 1.2 }}>
              Le nostre sedi<br />in Italia
            </h2>

            {Object.entries(grouped).map(([regione, items]) => (
              <div key={regione} className="mb-8">
                <p className="text-[10px] tracking-[0.14em] uppercase text-[#999] mb-4 pt-4 border-t border-[#D8D8D8]">
                  {regione}
                </p>

                {items.map((sede) => (
                  <div
                    key={sede.id}
                    onClick={() => setActiveId(sede.id)}
                    className={`cursor-pointer mb-5 pl-3 border-l-2 transition-colors ${
                      activeId === sede.id ? "border-[#f5881f]" : "border-transparent"
                    }`}
                  >
                    <p className={`text-xl mb-1 transition-all ${
                      activeId === sede.id ? "font-medium text-[#0A0A0A]" : "font-normal text-[#333]"
                    }`}>
                      {sede.citta}
                    </p>
                    <p className="text-[13px] text-[#888] mb-0.5">{sede.referente}</p>
                    <p className="text-[13px] text-[#888]">{sede.telefono}</p>
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
