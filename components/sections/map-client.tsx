"use client"

import { useEffect, useRef, useState } from "react"
import type { Sede } from "@/lib/sanity/queries"

interface MapSectionClientProps {
  sedi: Sede[]
}

export function MapSectionClient({ sedi }: MapSectionClientProps) {
  const mapContainerRef = useRef<HTMLDivElement>(null)
  const mapInstanceRef = useRef<any>(null)
  const markersRef = useRef<any[]>([])
  const [activeId, setActiveId] = useState<string | null>(null)
  const [isClient, setIsClient] = useState(false)

  // Only render on client
  useEffect(() => {
    setIsClient(true)
  }, [])

  // Initialize map and markers
  useEffect(() => {
    if (!isClient) return
    if (!mapContainerRef.current) return
    if (mapInstanceRef.current) return
    if (!sedi || sedi.length === 0) return

    let map: any = null

    const initMap = async () => {
      const L = await import("leaflet")

      // Fix Leaflet default icon issue
      delete (L.Icon.Default.prototype as any)._getIconUrl
      L.Icon.Default.mergeOptions({
        iconRetinaUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
        iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
        shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
      })

      if (!mapContainerRef.current) return

      map = L.map(mapContainerRef.current, {
        center: [42.5, 12.5],
        zoom: 6,
        zoomControl: true,
        scrollWheelZoom: false,
      })

      mapInstanceRef.current = map

      L.tileLayer("https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png", {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
        maxZoom: 19,
      }).addTo(map)

      // Custom icon - teal colored circle
      const createMarkerIcon = () => L.divIcon({
        className: "custom-marker",
        html: `<div style="
          width: 20px;
          height: 20px;
          background: #2e8b72;
          border: 3px solid white;
          border-radius: 50%;
          box-shadow: 0 3px 8px rgba(0,0,0,0.4);
        "></div>`,
        iconSize: [20, 20],
        iconAnchor: [10, 10],
      })

      // Filter valid sedi
      const validSedi = sedi.filter(
        (sede) => sede.lat != null && sede.lng != null && !isNaN(sede.lat) && !isNaN(sede.lng)
      )

      // Add markers
      validSedi.forEach((sede) => {
        const marker = L.marker([sede.lat, sede.lng], {
          icon: createMarkerIcon(),
        }).addTo(map)

        marker.on("click", () => {
          setActiveId(sede._id)
        })

        markersRef.current.push({ id: sede._id, marker })
      })

      // Fit bounds to show all markers with good zoom
      if (validSedi.length > 0) {
        const bounds = L.latLngBounds(validSedi.map((s) => [s.lat, s.lng]))
        map.fitBounds(bounds, { padding: [50, 50], maxZoom: 7 })
      }
    }

    initMap()

    return () => {
      if (map) {
        map.remove()
        mapInstanceRef.current = null
        markersRef.current = []
      }
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isClient])

  // Handle active marker change
  useEffect(() => {
    if (!mapInstanceRef.current || activeId === null) return

    import("leaflet").then((L) => {
      const sede = sedi.find((s) => s._id === activeId)
      if (!sede) return

      mapInstanceRef.current.flyTo([sede.lat, sede.lng], 10, {
        duration: 1.2,
      })

      markersRef.current.forEach(({ id, marker }) => {
        const isActive = id === activeId
        marker.setIcon(
          L.divIcon({
            className: "custom-marker",
            html: `<div style="
              width: ${isActive ? "24px" : "20px"};
              height: ${isActive ? "24px" : "20px"};
              background: ${isActive ? "#1e3a5f" : "#2e8b72"};
              border: 3px solid white;
              border-radius: 50%;
              box-shadow: 0 3px 8px rgba(0,0,0,0.4);
            "></div>`,
            iconSize: [isActive ? 24 : 20, isActive ? 24 : 20],
            iconAnchor: [isActive ? 12 : 10, isActive ? 12 : 10],
          })
        )
      })
    })
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeId])

  // Group sedi by region
  const grouped = sedi.reduce((acc, sede) => {
    const regione = sede.regione || "Altro"
    if (!acc[regione]) acc[regione] = []
    acc[regione].push(sede)
    return acc
  }, {} as Record<string, Sede[]>)

  return (
    <>
      <link
        rel="stylesheet"
        href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css"
      />

      <section className="bg-[#1e3a5f] mt-8 sm:mt-[50px] mb-0 md:mb-[25px] relative z-[1]">
        <div className="grid lg:grid-cols-[55%_45%] min-h-[400px] sm:min-h-[500px]">
          {/* Leaflet Map */}
          <div 
            ref={mapContainerRef} 
            className="h-[280px] sm:h-[400px] lg:h-auto lg:min-h-[500px] w-full"
          />

          {/* Sidebar */}
          <div className="flex flex-col justify-center px-4 sm:px-8 lg:px-10 py-8 sm:py-12 border-l border-white/10">
            <p className="text-xs sm:text-sm font-semibold uppercase tracking-widest text-[#2e8b72] mb-2 sm:mb-3">Sedi</p>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-white tracking-tight mb-6 sm:mb-10">
              Le nostre sedi<br />in Italia
            </h2>

            {Object.entries(grouped).map(([regione, items]) => (
              <div key={regione} className="mb-6 sm:mb-8">
                <p className="text-[9px] sm:text-[10px] tracking-[0.14em] uppercase text-gray-300 mb-3 sm:mb-4 pt-3 sm:pt-4 border-t border-white/20">
                  {regione}
                </p>

                {items.map((sede) => (
                  <div
                    key={sede._id}
                    onClick={() => setActiveId(sede._id)}
                    className={`cursor-pointer mb-3 sm:mb-5 pl-3 border-l-2 transition-colors bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl sm:rounded-2xl p-3 sm:p-4 hover:bg-white/20 ${
                      activeId === sede._id ? "border-l-[#2e8b72]" : "border-l-transparent"
                    }`}
                  >
                    <p className={`text-base sm:text-lg mb-1 font-bold text-white transition-all`}>
                      {sede.citta}
                    </p>
                    <p className="text-xs sm:text-sm text-gray-300 mb-0.5">{sede.referente}</p>
                    <p className="text-xs sm:text-sm text-gray-300 mb-0.5 flex items-center gap-2">
                      <span className="text-[#2e8b72]">Tel:</span> {sede.telefono}
                    </p>
                    {sede.email && <p className="text-xs sm:text-sm text-gray-300 flex items-center gap-2">
                      <span className="text-[#2e8b72]">Email:</span> {sede.email}
                    </p>}
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
