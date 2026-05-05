"use client";

import { useState } from "react";

const pacchetti = [
  {
    id: "base",
    nome: "Residenziale Base",
    sottotitolo: "Ideale per abitazioni fino a 100mq",
    features: [
      "3.0 kWp di potenza",
      "Pannelli monocristallini",
      "Inverter di qualità",
      "Monitoraggio base",
    ],
    risparmio: "fino a 500 €/anno",
    highlight: false,
  },
  {
    id: "plus",
    nome: "Residenziale Plus",
    sottotitolo: "Per chi vuole massimizzare l'autoconsumo",
    features: [
      "6.0 kWp di potenza",
      "Accumulo 5kWh",
      "Monitoraggio avanzato",
      "Ottimizzatori",
    ],
    risparmio: "fino a 800 €/anno",
    highlight: true,
  },
  {
    id: "business",
    nome: "Business Premium",
    sottotitolo: "Soluzioni per aziende",
    features: [
      "Da 10 a 100+ kWp",
      "Progettazione custom",
      "Monitoraggio enterprise",
      "Manutenzione dedicata",
    ],
    risparmio: "calcolato su misura",
    highlight: false,
  },
];

const incentivi = [
  {
    codice: "50%",
    titolo: "Detrazione IRPEF",
    descrizione: "Recupera metà del costo in 10 anni sulla dichiarazione dei redditi.",
  },
  {
    codice: "GSE",
    titolo: "Conto Energia",
    descrizione: "Incentivo statale per l'energia immessa in rete dal tuo impianto.",
  },
  {
    codice: "40%",
    titolo: "PNRR Fondo perduto",
    descrizione: "Contributo a fondo perduto per imprese e pubblica amministrazione.",
  },
];

const WHATSAPP_URL =
  "https://wa.me/393497988101?text=Ciao%2C%20vorrei%20informazioni%20sui%20pannelli%20solari";
const CONFIGURATORE_URL = "/configuratore";

export function SoluzioniIncentiviSection() {
  const [hoverCard, setHoverCard] = useState<string | null>(null);

  return (
    <section
      id="soluzioni"
      style={{
        background: "#f0ede8",
        padding: "100px 0 0",
        fontFamily: "'Helvetica Neue', Helvetica, Arial, sans-serif",
      }}
    >
      {/* Header */}
      <div style={{ textAlign: "center", padding: "0 24px 64px" }}>
        <p
          style={{
            fontSize: "11px",
            letterSpacing: "0.14em",
            textTransform: "uppercase",
            color: "#999",
            marginBottom: "16px",
          }}
        >
          Soluzioni
        </p>
        <h2
          style={{
            fontSize: "clamp(36px, 5vw, 64px)",
            fontWeight: 300,
            color: "#1a1a1a",
            lineHeight: 1.1,
            marginBottom: "20px",
          }}
        >
          I nostri pacchetti
        </h2>
        <p style={{ fontSize: "16px", color: "#777", maxWidth: "480px", margin: "0 auto" }}>
          Non sai quale soluzione fa per te? Usa il nostro configuratore.
        </p>
      </div>

      {/* Cards */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(3, 1fr)",
          gap: "0",
          maxWidth: "1100px",
          margin: "0 auto",
          padding: "0 24px",
          alignItems: "end",
        }}
        className="cards-grid"
      >
        {pacchetti.map((p) => (
          <div
            key={p.id}
            onMouseEnter={() => setHoverCard(p.id)}
            onMouseLeave={() => setHoverCard(null)}
            style={{
              background: p.highlight ? "#1a1a1a" : "white",
              color: p.highlight ? "white" : "#1a1a1a",
              padding: p.highlight ? "48px 36px 40px" : "36px 36px 32px",
              borderRadius: "4px 4px 0 0",
              transition: "transform 0.25s ease",
              transform: hoverCard === p.id && !p.highlight ? "translateY(-4px)" : "none",
              position: "relative",
              marginTop: p.highlight ? "0" : "24px",
            }}
          >
            {p.highlight && (
              <div
                style={{
                  position: "absolute",
                  top: "16px",
                  right: "20px",
                  fontSize: "10px",
                  letterSpacing: "0.12em",
                  textTransform: "uppercase",
                  color: "#f5881f",
                }}
              >
                Piu scelto
              </div>
            )}

            <p
              style={{
                fontSize: "11px",
                letterSpacing: "0.12em",
                textTransform: "uppercase",
                color: p.highlight ? "#888" : "#bbb",
                marginBottom: "12px",
              }}
            >
              {p.id === "business" ? "Business" : "Residenziale"}
            </p>

            <h3
              style={{
                fontSize: "24px",
                fontWeight: 400,
                marginBottom: "8px",
              }}
            >
              {p.nome.replace("Residenziale ", "").replace("Business ", "")}
            </h3>

            <p
              style={{
                fontSize: "13px",
                color: p.highlight ? "#aaa" : "#888",
                marginBottom: "28px",
                minHeight: "36px",
              }}
            >
              {p.sottotitolo}
            </p>

            <ul style={{ listStyle: "none", padding: 0, margin: "0 0 28px" }}>
              {p.features.map((f) => (
                <li
                  key={f}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "10px",
                    fontSize: "14px",
                    color: p.highlight ? "#ddd" : "#444",
                    marginBottom: "10px",
                  }}
                >
                  <span
                    style={{
                      width: "16px",
                      height: "16px",
                      borderRadius: "50%",
                      background: p.highlight ? "#f5881f" : "#1a1a1a",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      flexShrink: 0,
                    }}
                  >
                    <svg width="8" height="6" viewBox="0 0 8 6" fill="none">
                      <path
                        d="M1 3L3 5L7 1"
                        stroke="white"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </span>
                  {f}
                </li>
              ))}
            </ul>

            <p
              style={{
                fontSize: "12px",
                color: p.highlight ? "#f5881f" : "#999",
                marginBottom: "20px",
                fontStyle: "italic",
              }}
            >
              Risparmio stimato: {p.risparmio}
            </p>
          </div>
        ))}
      </div>

      {/* Incentivi strip */}
      <div
        id="incentivi"
        style={{
          background: "#1a1a1a",
          padding: "56px 40px",
        }}
      >
        <div
          style={{
            maxWidth: "1100px",
            margin: "0 auto",
            display: "grid",
            gridTemplateColumns: "1fr 2fr",
            gap: "60px",
            alignItems: "center",
          }}
          className="incentivi-grid"
        >
          <div>
            <p
              style={{
                fontSize: "11px",
                letterSpacing: "0.14em",
                textTransform: "uppercase",
                color: "#666",
                marginBottom: "16px",
              }}
            >
              Incentivi
            </p>
            <h3
              style={{
                fontSize: "clamp(28px, 3vw, 40px)",
                fontWeight: 300,
                color: "white",
                lineHeight: 1.2,
              }}
            >
              Riduci il costo
              <br />
              del tuo impianto
            </h3>
          </div>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(3, 1fr)",
              gap: "32px",
            }}
            className="incentivi-items"
          >
            {incentivi.map((inc) => (
              <div key={inc.codice}>
                <p
                  style={{
                    fontSize: "32px",
                    fontWeight: 300,
                    color: "#f5881f",
                    marginBottom: "6px",
                    lineHeight: 1,
                  }}
                >
                  {inc.codice}
                </p>
                <p
                  style={{
                    fontSize: "14px",
                    fontWeight: 500,
                    color: "white",
                    marginBottom: "8px",
                  }}
                >
                  {inc.titolo}
                </p>
                <p style={{ fontSize: "13px", color: "#777", lineHeight: 1.5 }}>
                  {inc.descrizione}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* CTA strip */}
      <div
        id="contatti"
        style={{
          background: "#f0ede8",
          padding: "64px 40px",
          textAlign: "center",
        }}
      >
        <p
          style={{
            fontSize: "15px",
            color: "#777",
            marginBottom: "32px",
            maxWidth: "480px",
            margin: "0 auto 32px",
          }}
        >
          Scopri quanto puoi risparmiare con il configuratore oppure parla subito
          con un nostro consulente.
        </p>

        <div
          style={{
            display: "flex",
            gap: "16px",
            justifyContent: "center",
            flexWrap: "wrap",
          }}
        >
          <a
            href={CONFIGURATORE_URL}
            style={{
              display: "inline-block",
              padding: "16px 36px",
              background: "#1a1a1a",
              color: "white",
              fontSize: "12px",
              letterSpacing: "0.12em",
              textTransform: "uppercase",
              textDecoration: "none",
              borderRadius: "2px",
              transition: "opacity 0.2s",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.opacity = "0.8")}
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
              gap: "10px",
              padding: "16px 36px",
              background: "white",
              color: "#1a1a1a",
              fontSize: "12px",
              letterSpacing: "0.12em",
              textTransform: "uppercase",
              textDecoration: "none",
              borderRadius: "2px",
              border: "1px solid #ddd",
              transition: "border-color 0.2s",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.borderColor = "#1a1a1a")}
            onMouseLeave={(e) => (e.currentTarget.style.borderColor = "#ddd")}
          >
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="#25D366"
            >
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
            </svg>
            Contatta Solair su WhatsApp
          </a>
        </div>
      </div>

      <style jsx>{`
        @media (max-width: 900px) {
          .cards-grid {
            grid-template-columns: 1fr !important;
            gap: 16px !important;
          }
          .incentivi-grid {
            grid-template-columns: 1fr !important;
            gap: 32px !important;
          }
          .incentivi-items {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </section>
  );
}
