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
        center: [41.5, 13.5],
        zoom: 5.5,
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

  const C = {
    bg: "#E8E8E8",
    border: "#c4c8cc",
    text: "#1c1f22",
    textMid: "#4a5058",
    btn: "#1c1f22",
    btnText: "#ffffff",
  }

  const WHATSAPP_URL =
    "https://wa.me/393497988101?text=Ciao%2C%20vorrei%20informazioni%20sui%20pannelli%20solari%20Solair"
  const CONFIGURATORE_URL = "/configuratore"

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

        {/* Separator */}
        <div style={{ maxWidth: "1120px", margin: "0 auto", padding: "0 24px" }}>
          <div style={{ height: "1px", background: C.border }} />
        </div>

        {/* CTA */}
        <div
          style={{
            background: C.bg,
            padding: "64px 24px",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: "32px",
          }}
        >
          <p
            style={{
              fontSize: "14px",
              color: C.textMid,
              textAlign: "center",
              maxWidth: "440px",
              lineHeight: 1.75,
              margin: 0,
            }}
          >
            Non sai quale linea fa per te? Usa il configuratore per trovare
            la soluzione giusta, oppure parla direttamente con un nostro consulente.
          </p>

          <div
            style={{
              display: "flex",
              gap: "12px",
              flexWrap: "wrap",
              justifyContent: "center",
            }}
          >
            <a
              href={CONFIGURATORE_URL}
              style={{
                display: "inline-block",
                padding: "15px 36px",
                background: C.btn,
                color: C.btnText,
                fontSize: "11px",
                letterSpacing: "0.12em",
                textTransform: "uppercase",
                textDecoration: "none",
                borderRadius: "2px",
                transition: "opacity 0.2s",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.opacity = "0.75")}
              onMouseLeave={(e) => (e.currentTarget.style.opacity = "1")}
            >
              Configura il tuo impianto
            </a>

            <a
              href={WHATSAPP_URL}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "9px",
                padding: "15px 36px",
                background: "transparent",
                color: C.text,
                fontSize: "11px",
                letterSpacing: "0.12em",
                textTransform: "uppercase",
                textDecoration: "none",
                border: `1px solid ${C.border}`,
                borderRadius: "2px",
                transition: "border-color 0.2s",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.borderColor = C.text)}
              onMouseLeave={(e) => (e.currentTarget.style.borderColor = C.border)}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill={C.textMid}>
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
              </svg>
              Contatta Solair su WhatsApp
            </a>
          </div>
        </div>
      </section>
    </>
  )
}
