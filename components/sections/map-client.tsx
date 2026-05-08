"use client"

import { useEffect, useRef, useState } from "react"
import type { Sede } from "@/lib/sanity/queries"

interface MapSectionClientProps {
  sedi: Sede[]
}

export function MapSectionClient({ sedi }: MapSectionClientProps) {
  const mapRef = useRef<HTMLDivElement>(null)
  const mapInstanceRef = useRef<any>(null)
  const markersRef = useRef<any[]>([])
  const [activeId, setActiveId] = useState<string | null>(null)
  const [mapReady, setMapReady] = useState(false)

  // Initialize map once on mount
  useEffect(() => {
    if (typeof window === "undefined" || mapInstanceRef.current) return

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
        zoom: 6,
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

      mapInstanceRef.current = map
      setMapReady(true)
    })

    return () => {
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove()
        mapInstanceRef.current = null
        markersRef.current = []
      }
    }
  }, [])

  // Add markers when map is ready and sedi data is available
  useEffect(() => {
    if (!mapReady || !mapInstanceRef.current || !sedi || sedi.length === 0) return

    import("leaflet").then((L) => {
      const map = mapInstanceRef.current
      if (!map) return

      // Clear existing markers
      markersRef.current.forEach(({ marker }) => {
        map.removeLayer(marker)
      })
      markersRef.current = []

      const createIcon = (active: boolean) =>
        L.divIcon({
          className: "",
          html: `<div style="
            width: ${active ? "24px" : "20px"};
            height: ${active ? "24px" : "20px"};
            background: ${active ? "#1e3a5f" : "#2e8b72"};
            border: 3px solid white;
            border-radius: 50%;
            box-shadow: 0 3px 8px rgba(0,0,0,0.4);
            transition: all 0.2s ease;
          "></div>`,
          iconSize: [active ? 24 : 20, active ? 24 : 20],
          iconAnchor: [active ? 12 : 10, active ? 12 : 10],
        })

      // Filter sedi with valid coordinates
      const validSedi = sedi.filter(sede => 
        sede.lat !== undefined && sede.lng !== undefined && 
        !isNaN(sede.lat) && !isNaN(sede.lng)
      )

      validSedi.forEach((sede) => {
        const marker = L.marker([sede.lat, sede.lng], {
          icon: createIcon(false),
        }).addTo(map)

        marker.on("click", () => {
          setActiveId(sede._id)
        })

        markersRef.current.push({ id: sede._id, marker })
      })

      // Fit map to show all markers with padding
      if (validSedi.length > 0) {
        const bounds = L.latLngBounds(validSedi.map(s => [s.lat, s.lng]))
        map.fitBounds(bounds, { padding: [60, 60], maxZoom: 6 })
      }
    })
  }, [mapReady, sedi])

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
            className: "",
            html: `<div style="
              width: ${isActive ? "24px" : "20px"};
              height: ${isActive ? "24px" : "20px"};
              background: ${isActive ? "#1e3a5f" : "#2e8b72"};
              border: 3px solid white;
              border-radius: 50%;
              box-shadow: 0 3px 8px rgba(0,0,0,0.4);
              transition: all 0.2s ease;
            "></div>`,
            iconSize: [isActive ? 24 : 20, isActive ? 24 : 20],
            iconAnchor: [isActive ? 12 : 10, isActive ? 12 : 10],
          })
        )
      })
    })
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

      <section className="bg-[#f4f6f7] mt-[50px] mb-0 md:mb-[25px] relative" style={{ zIndex: 1, isolation: 'isolate' }}>
        <div className="grid lg:grid-cols-[55%_45%] min-h-[500px]">
          {/* Leaflet Map - Left 55% */}
          <div 
            ref={mapRef} 
            className="h-[400px] lg:h-auto lg:min-h-[500px] w-full relative z-0"
          />

          {/* Sidebar - Right 45% */}
          <div className="flex flex-col justify-center px-8 lg:px-10 py-12 border-l border-[#d0d6da]">
            <p className="overline text-[#8a9aaa] mb-3">Sedi</p>
            <h2 className="font-heading text-[#1e3a5f] mb-10" style={{ fontSize: "clamp(1.75rem, 3vw, 2.5rem)", lineHeight: 1.2 }}>
              Le nostre sedi<br />in Italia
            </h2>

            {Object.entries(grouped).map(([regione, items]) => (
              <div key={regione} className="mb-8">
                <p className="text-[10px] tracking-[0.14em] uppercase text-[#8a9aaa] mb-4 pt-4 border-t border-[#d0d6da]">
                  {regione}
                </p>

                {items.map((sede) => (
                  <div
                    key={sede._id}
                    onClick={() => setActiveId(sede._id)}
                    className={`cursor-pointer mb-5 pl-3 border-l-2 transition-colors ${
                      activeId === sede._id ? "border-[#2e8b72]" : "border-transparent"
                    }`}
                  >
                    <p className={`text-xl mb-1 transition-all ${
                      activeId === sede._id ? "font-medium text-[#1e3a5f]" : "font-normal text-[#4a6080]"
                    }`}>
                      {sede.citta}
                    </p>
                    <p className="text-[13px] text-[#8a9aaa] mb-0.5">{sede.referente}</p>
                    <p className="text-[13px] text-[#8a9aaa] mb-0.5">{sede.telefono}</p>
                    {sede.email && <p className="text-[13px] text-[#8a9aaa]">{sede.email}</p>}
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
