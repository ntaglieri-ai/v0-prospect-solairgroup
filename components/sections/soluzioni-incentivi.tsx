"use client";

const pacchetti = [
  {
    id: "smart",
    linea: "Smart One",
    livello: "Linea Base",
    sottotitolo: "La soluzione d'ingresso per chi vuole produrre energia in modo semplice ed efficace.",
    badge: null,
    highlight: false,
    bgColor: "#E2E8F0",
    accentColor: "#475569",
    features: [
      "Pannelli monocristallini ad alta efficienza",
      "Inverter Solis con accumulo bassa tensione",
      "Batterie V-TAC LiFePo",
      "10 anni di garanzia",
      "Monitoraggio remoto incluso",
      "Ingresso Solair CER",
    ],
    tags: ["10 anni", "IP20"],
  },
  {
    id: "plus",
    linea: "Power Plus",
    livello: "Linea Intermedia",
    sottotitolo: "Alta tensione, protezione anti-blackout e brand leader mondiale. Il nostro più venduto.",
    badge: "Più scelto",
    highlight: true,
    bgColor: "#CCFBF1",
    accentColor: "#0F766E",
    features: [
      "Pannelli LONGi / Trina Solar / Qcells",
      "Inverter Sineng ibrido monofase",
      "Batterie Sineng alta tensione IP65",
      "12 anni di garanzia",
      "EPS anti-blackout incluso",
      "Ingresso Solair CER",
    ],
    tags: ["12 anni", "IP65", "Anti-blackout"],
  },
  {
    id: "premium",
    linea: "Premium Top",
    livello: "Linea Premium",
    sottotitolo: "Il massimo dell'accumulo con BYD Battery-Box HVE: la batteria più sottile e affidabile sul mercato.",
    badge: null,
    highlight: false,
    bgColor: "#FEF3C7",
    accentColor: "#D97706",
    features: [
      "Pannelli monocristallini premium",
      "Inverter BYD Power-Box ibrido",
      "BYD Battery-Box HVE alta tensione",
      "15 anni di garanzia",
      "80% capacità garantita al 10° anno",
      "EPS anti-blackout incluso",
      "Ingresso Solair CER",
    ],
    tags: ["15 anni", "IP65", "Anti-blackout"],
  },
];

const incentivi = [
  {
    valore: "50%",
    titolo: "Detrazione IRPEF",
    descrizione:
      "Recupera metà del costo in 10 anni sulla dichiarazione dei redditi per installazioni residenziali.",
  },
  {
    valore: "GSE",
    titolo: "Conto Energia",
    descrizione:
      "Incentivo statale per l'energia immessa in rete: il tuo impianto genera valore anche quando non consumi.",
  },
  {
    valore: "40%",
    titolo: "PNRR Fondo perduto",
    descrizione:
      "Contributo a fondo perduto fino al 40% per imprese e pubblica amministrazione tramite bandi PNRR.",
  },
];

// ── palette Solair Group ──────────────────────────────────
const C = {
  bg:        "#f4f6f7",   // background principale
  bgCard:    "#eaecee",   // cards standard
  bgCardHl:  "#e0e4e7",   // card highlight
  bgCta:     "#f4f6f7",   // stesso sfondo della sezione
  border:    "#d0d6da",   // separatori
  text:      "#1e3a5f",   // testo primario (navy)
  textMid:   "#4a6080",   // testo secondario
  textMuted: "#8a9aaa",   // label, didascalie
  tag:       "#d0d6da",   // pill tag bg
  tagText:   "#4a6080",
  btn:       "#1e3a5f",   // button primario (navy)
  btnText:   "#ffffff",
  accent:    "#2e8b72",   // accento CTA (teal)
  accentHover: "#226b57", // accento hover
};

const WHATSAPP_URL =
  "https://wa.me/393497988101?text=Ciao%2C%20vorrei%20informazioni%20sui%20pannelli%20solari%20Solair";
const CONFIGURATORE_URL = "/configuratore";

// ── sub-components ────────────────────────────────────────
function Separator() {
  return (
    <div
      style={{
        maxWidth: "1120px",
        margin: "0 auto",
        padding: "0 24px",
      }}
    >
      <div style={{ height: "1px", background: C.border }} />
    </div>
  );
}

function CheckIcon({ color = C.textMid }: { color?: string }) {
  return (
    <svg
      width="14"
      height="14"
      viewBox="0 0 14 14"
      fill="none"
      style={{ flexShrink: 0, marginTop: "1px" }}
    >
      <circle cx="7" cy="7" r="6.5" stroke={color} strokeOpacity="0.4" />
      <path
        d="M4.5 7L6.2 8.8L9.5 5.5"
        stroke={color}
        strokeWidth="1.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

// ── main component ────────────────────────────────────────
export function SoluzioniIncentiviSection() {
  return (
    <section
      id="soluzioni"
      style={{
        background: C.bg,
        fontFamily: "'Helvetica Neue', Helvetica, Arial, sans-serif",
        color: C.text,
      }}
    >
      {/* ── HEADER ── */}
      <div style={{ textAlign: "center", padding: "24px 24px 72px" }}>
        <p
          style={{
            fontSize: "11px",
            letterSpacing: "0.14em",
            textTransform: "uppercase",
            color: C.textMuted,
            marginBottom: "16px",
          }}
        >
          Soluzioni
        </p>
        <h2
          style={{
            fontSize: "clamp(38px, 5vw, 62px)",
            fontWeight: 300,
            lineHeight: 1.1,
            marginBottom: "20px",
            letterSpacing: "-0.02em",
            color: C.text,
          }}
        >
          I nostri pacchetti
        </h2>
        <p
          style={{
            fontSize: "15px",
            color: C.textMid,
            maxWidth: "460px",
            margin: "0 auto",
            lineHeight: 1.7,
          }}
        >
          Tre linee di impianto fotovoltaico con accumulo, chiavi in mano.
          Tutte includono progettazione, installazione e pratiche GSE.
        </p>
      </div>

      {/* ── CARDS ── */}
      <div
        style={{
          maxWidth: "1120px",
          margin: "0 auto",
          padding: "0 24px",
          display: "grid",
          gridTemplateColumns: "repeat(3, 1fr)",
          gap: "2px",
        }}
        className="cards-grid"
      >
        {pacchetti.map((p) => (
          <div
            key={p.id}
            style={{
              background: p.bgColor,
              padding: "40px 32px 36px",
              position: "relative",
              borderTop: `3px solid ${p.accentColor}`,
              display: "flex",
              flexDirection: "column",
            }}
          >
            {p.badge && (
              <span
                style={{
                  position: "absolute",
                  top: "20px",
                  right: "20px",
                  fontSize: "10px",
                  letterSpacing: "0.1em",
                  textTransform: "uppercase",
                  color: C.textMid,
                  border: `1px solid ${C.border}`,
                  padding: "3px 9px",
                  borderRadius: "2px",
                  background: C.bg,
                }}
              >
                {p.badge}
              </span>
            )}

            <p
              style={{
                fontSize: "10px",
                letterSpacing: "0.14em",
                textTransform: "uppercase",
                color: C.textMuted,
                marginBottom: "10px",
              }}
            >
              {p.livello}
            </p>

            <h3
              style={{
                fontSize: "26px",
                fontWeight: 400,
                marginBottom: "14px",
                letterSpacing: "-0.01em",
                color: p.accentColor,
              }}
            >
              {p.linea}
            </h3>

            <p
              style={{
                fontSize: "13px",
                color: C.textMid,
                lineHeight: 1.65,
                marginBottom: "28px",
                minHeight: "58px",
              }}
            >
              {p.sottotitolo}
            </p>

            <ul
              style={{ listStyle: "none", padding: 0, margin: "0 0 28px", flex: 1 }}
            >
              {p.features.map((f) => (
                <li
                  key={f}
                  style={{
                    display: "flex",
                    alignItems: "flex-start",
                    gap: "10px",
                    fontSize: "13px",
                    color: C.textMid,
                    marginBottom: "9px",
                    lineHeight: 1.4,
                  }}
                >
                  <CheckIcon color={p.accentColor} />
                  {f}
                </li>
              ))}
            </ul>

            {/* tag pills */}
            <div style={{ display: "flex", gap: "6px", flexWrap: "wrap" }}>
              {p.tags.map((tag) => (
                <span
                  key={tag}
                  style={{
                    fontSize: "11px",
                    padding: "4px 10px",
                    background: C.tag,
                    borderRadius: "2px",
                    color: C.tagText,
                    letterSpacing: "0.04em",
                  }}
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* ── SEPARATOR ── */}
      <div style={{ margin: "60px 0 0" }}>
        <Separator />
      </div>

      {/* ── INCENTIVI ── */}
      <div
        id="incentivi"
        style={{
          maxWidth: "1120px",
          margin: "0 auto",
          padding: "72px 24px",
          display: "grid",
          gridTemplateColumns: "1fr 2fr",
          gap: "80px",
          alignItems: "start",
        }}
        className="incentivi-grid"
      >
        {/* left */}
        <div>
          <p
            style={{
              fontSize: "11px",
              letterSpacing: "0.14em",
              textTransform: "uppercase",
              color: C.textMuted,
              marginBottom: "16px",
            }}
          >
            Incentivi
          </p>
          <h3
            style={{
              fontSize: "clamp(26px, 3vw, 38px)",
              fontWeight: 300,
              lineHeight: 1.2,
              letterSpacing: "-0.02em",
              color: C.text,
            }}
          >
            Riduci il costo
            <br />
            del tuo impianto
          </h3>
          <p
            style={{
              fontSize: "13px",
              color: C.textMid,
              marginTop: "16px",
              lineHeight: 1.7,
            }}
          >
            Gli incentivi statali possono coprire una parte significativa
            dell&apos;investimento. I nostri consulenti ti guidano nell&apos;accesso
            a tutte le agevolazioni disponibili.
          </p>
        </div>

        {/* right */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            gap: "40px",
          }}
          className="incentivi-items"
        >
          {incentivi.map((inc) => (
            <div key={inc.valore}>
              <p
                style={{
                  fontSize: "36px",
                  fontWeight: 300,
                  color: C.text,
                  marginBottom: "10px",
                  lineHeight: 1,
                  letterSpacing: "-0.02em",
                }}
              >
                {inc.valore}
              </p>
              <div
                style={{
                  width: "24px",
                  height: "1px",
                  background: C.border,
                  marginBottom: "12px",
                }}
              />
              <p
                style={{
                  fontSize: "13px",
                  fontWeight: 500,
                  color: C.text,
                  marginBottom: "8px",
                  letterSpacing: "0.01em",
                }}
              >
                {inc.titolo}
              </p>
              <p
                style={{
                  fontSize: "12px",
                  color: C.textMid,
                  lineHeight: 1.65,
                }}
              >
                {inc.descrizione}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* ── SEPARATOR ── */}
      <Separator />

      {/* ── CTA ── */}
      <div
        id="contatti"
        style={{
          background: C.bgCta,
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
            gap: "16px",
            flexWrap: "wrap",
            justifyContent: "center",
          }}
        >
          <a
            href={CONFIGURATORE_URL}
            style={{
              display: "inline-flex",
              alignItems: "center",
              justifyContent: "center",
              width: "256px",
              padding: "15px 36px",
              background: C.btn,
              color: "#F8F9FA",
              fontSize: "11px",
              letterSpacing: "0.12em",
              textTransform: "uppercase",
              textDecoration: "none",
              borderRadius: "0",
              border: `1px solid ${C.btn}`,
              transition: "opacity 0.2s",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.opacity = "0.85")}
            onMouseLeave={(e) => (e.currentTarget.style.opacity = "1")}
          >
            Configura e Ordina
          </a>

          <a
            href={WHATSAPP_URL}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: "inline-flex",
              alignItems: "center",
              justifyContent: "center",
              width: "256px",
              padding: "15px 36px",
              background: C.btn,
              color: "#F8F9FA",
              fontSize: "11px",
              letterSpacing: "0.12em",
              textTransform: "uppercase",
              textDecoration: "none",
              border: `1px solid ${C.btn}`,
              borderRadius: "0",
              transition: "opacity 0.2s",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.opacity = "0.85")}
            onMouseLeave={(e) => (e.currentTarget.style.opacity = "1")}
          >
            Contatta Solair
          </a>
        </div>
      </div>

      {/* ── SEPARATOR (before map) ── */}
      <Separator />

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
