"use client"

import { useState, useRef } from "react"

// Webhook URL Make
const MAKE_WEBHOOK_URL = "https://hook.eu1.make.com/v5v6hauvnfpn56py93n4fjcjribjjjha"

// Linee commerciali
const LINEE = {
  smart: {
    nome: "Smart",
    desc: "La soluzione di ingresso, ideale per piccole abitazioni e consumi ridotti.",
    prezzoBase: 6500,
    classe: "smart",
  },
  power: {
    nome: "Power",
    desc: "Il giusto equilibrio tra potenza e prezzo per la famiglia media.",
    prezzoBase: 11500,
    classe: "power",
  },
  premium: {
    nome: "Premium",
    desc: "Massime prestazioni con tecnologia top e accumulo incluso.",
    prezzoBase: 19000,
    classe: "premium",
  },
}

type LineaKey = keyof typeof LINEE

// Pannelli disponibili
const PANNELLI = [
  { id: "jinko", brand: "Jinko Solar", model: "Tiger Neo N-Type", tag: "Top seller" },
  { id: "longi", brand: "LONGi Solar", model: "Hi-MO 6", tag: "Bifacciale" },
  { id: "canadian", brand: "Canadian Solar", model: "HiKu7", tag: "Affidabile" },
  { id: "sunpower", brand: "SunPower", model: "Maxeon 6", tag: "Premium" },
]

// Tipi immobile
const TIPI_IMMOBILE = [
  { id: "villetta", icon: "🏡", nome: "Villetta", desc: "Casa indipendente" },
  { id: "appartamento", icon: "🏢", nome: "Appartamento", desc: "Condominio" },
  { id: "bifamiliare", icon: "🏘️", nome: "Bifamiliare", desc: "Semi-indipendente" },
  { id: "azienda", icon: "🏭", nome: "Azienda", desc: "Capannone" },
]

// Zone geografiche
const ZONE = [
  { id: "nord", icon: "❄️", nome: "Nord Italia", irr: "~1.100 kWh/kWp/anno", value: 1100 },
  { id: "centro", icon: "🌤️", nome: "Centro Italia", irr: "~1.300 kWh/kWp/anno", value: 1300 },
  { id: "sud", icon: "☀️", nome: "Sud / Isole", irr: "~1.500 kWh/kWp/anno", value: 1500 },
]

// Obiettivi
const OBIETTIVI = [
  { id: "risparmio", icon: "💰", nome: "Risparmio in bolletta", desc: "Ridurre i costi energetici mensili" },
  { id: "indipendenza", icon: "⚡", nome: "Indipendenza energetica", desc: "Autoprodurre la maggior parte dell'energia" },
  { id: "investimento", icon: "📈", nome: "Investimento", desc: "Massimizzare il ritorno nel lungo periodo" },
]

export default function ConfiguratorePage() {
  // View state: 'intro' | 'suggerimento' | 'configuratore'
  const [view, setView] = useState<"intro" | "suggerimento" | "configuratore">("intro")

  // Suggerimento wizard state
  const [sgStep, setSgStep] = useState(0)
  const [sgState, setSgState] = useState({
    tipo: null as string | null,
    mq: 100,
    zona: null as string | null,
    consumo: 3500,
    obiettivo: null as string | null,
    potenzaSuggerita: 0,
    accumuloConsigliato: false,
    accumuloKwh: 0,
    linea: "smart" as LineaKey,
  })

  // Configuratore manuale state
  const [step, setStep] = useState(0)
  const [potenza, setPotenza] = useState(4)
  const [pannello, setPannello] = useState<string | null>(null)
  const [accumulo, setAccumulo] = useState(false)
  const [accumuloKwh, setAccumuloKwh] = useState(5)
  const [linea, setLinea] = useState<LineaKey | null>(null)

  // Form dati cliente
  const [formData, setFormData] = useState({
    nome: "",
    cognome: "",
    email: "",
    telefono: "",
    cf: "",
    indirizzo: "",
    tipo: "",
    incentivo: "",
    note: "",
  })

  // File upload
  const [files, setFiles] = useState<File[]>([])
  const fileInputRef = useRef<HTMLInputElement>(null)
  
  // Mandatory ID document upload
  const [idDocuments, setIdDocuments] = useState<File[]>([])
  const idDocInputRef = useRef<HTMLInputElement>(null)
  const idUploadAreaRef = useRef<HTMLDivElement>(null)
  const [idDocError, setIdDocError] = useState(false)

  // Submit state
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [showConfirmation, setShowConfirmation] = useState(false)
  const [showError, setShowError] = useState(false)

  // === SUGGERIMENTO WIZARD ===
  const goToSgStep = (i: number) => {
    setSgStep(i)
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  const calcolaSuggerimento = () => {
    const irrMap: Record<string, number> = { nord: 1100, centro: 1300, sud: 1500 }
    const irr = irrMap[sgState.zona || "centro"] || 1300

    let potenzaSuggerita = Math.ceil((sgState.consumo / irr) * 10) / 10
    if (sgState.obiettivo === "indipendenza") potenzaSuggerita *= 1.3
    if (sgState.obiettivo === "investimento") potenzaSuggerita *= 1.2
    potenzaSuggerita = Math.min(20, Math.max(1, Math.round(potenzaSuggerita * 2) / 2))

    const accumuloConsigliato = sgState.obiettivo !== "risparmio"
    const accumuloKwhCalc = accumuloConsigliato ? Math.round(potenzaSuggerita * 0.8) : 0

    let lineaCalc: LineaKey = "smart"
    if (potenzaSuggerita >= 10 || accumuloKwhCalc >= 10) lineaCalc = "premium"
    else if (potenzaSuggerita >= 6 || accumuloKwhCalc >= 6) lineaCalc = "power"

    setSgState((prev) => ({
      ...prev,
      potenzaSuggerita,
      accumuloConsigliato,
      accumuloKwh: accumuloKwhCalc,
      linea: lineaCalc,
    }))

    goToSgStep(4)
  }

  const accettaSuggerimento = () => {
    setPotenza(sgState.potenzaSuggerita)
    setAccumulo(sgState.accumuloConsigliato)
    setAccumuloKwh(sgState.accumuloKwh)
    setView("configuratore")
    setStep(1)
  }

  // === CONFIGURATORE MANUALE ===
  const goToStep = (i: number) => {
    setStep(i)
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  const calcolaLinea = () => {
    let lineaCalc: LineaKey = "smart"
    const accKwh = accumulo ? accumuloKwh : 0
    if (potenza >= 10 || accKwh >= 10) lineaCalc = "premium"
    else if (potenza >= 6 || accKwh >= 6) lineaCalc = "power"
    setLinea(lineaCalc)
  }

  const goToRiepilogo = () => {
    calcolaLinea()
    goToStep(5)
  }

  const handleFiles = (fileList: FileList | null) => {
    if (!fileList) return
    const newFiles = Array.from(fileList).filter((f) => !files.find((x) => x.name === f.name))
    setFiles((prev) => [...prev, ...newFiles])
  }

  const removeFile = (index: number) => {
    setFiles((prev) => prev.filter((_, i) => i !== index))
  }

  // ID document handlers
  const handleIdDocuments = (fileList: FileList | null) => {
    if (!fileList) return
    const newFiles = Array.from(fileList).filter((f) => !idDocuments.find((x) => x.name === f.name))
    setIdDocuments((prev) => [...prev, ...newFiles])
    setIdDocError(false)
  }

  const removeIdDocument = (index: number) => {
    setIdDocuments((prev) => prev.filter((_, i) => i !== index))
  }

  // Go to riepilogo with validation
  const goToRiepilogoWithValidation = () => {
    if (idDocuments.length === 0) {
      setIdDocError(true)
      idUploadAreaRef.current?.scrollIntoView({ behavior: "smooth", block: "center" })
      return
    }
    calcolaLinea()
    goToStep(5)
  }

  // Return to intro from configuratore (reset step)
  const tornaIntroFromConfigurator = () => {
    setStep(0)
    setView("intro")
  }

  const inviaRichiesta = async () => {
    setIsSubmitting(true)
    setShowError(false)

    const payload = {
      linea: linea,
      potenza: potenza,
      pannello: pannello,
      accumulo: accumulo,
      accumuloKwh: accumulo ? accumuloKwh : 0,
      nome: formData.nome,
      cognome: formData.cognome,
      email: formData.email,
      telefono: formData.telefono,
      codice_fiscale: formData.cf,
      indirizzo: formData.indirizzo,
      tipo_immobile: formData.tipo,
      incentivo: formData.incentivo,
      note: formData.note,
      data_invio: new Date().toISOString(),
      num_documenti: files.length,
    }

    try {
      const res = await fetch(MAKE_WEBHOOK_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      })
      if (res.ok || res.status === 200) {
        setShowConfirmation(true)
      } else {
        throw new Error()
      }
    } catch {
      setShowError(true)
    } finally {
      setIsSubmitting(false)
    }
  }

  // === RENDER ===

  // Intro Page
  if (view === "intro") {
    return (
      <div className="min-h-screen font-[Outfit]" style={{ background: "linear-gradient(180deg, #E6EEF5 0%, #DCE7F2 100%)" }}>
        {/* Header with back button */}
        <div className="flex items-center justify-between px-6 py-4" style={{ borderBottom: "1px solid rgba(13,35,64,0.15)" }}>
          <a href="/" className="inline-flex items-center gap-2 text-sm font-medium transition-colors" style={{ color: "#1A6EBD" }}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 12H5M12 19l-7-7 7-7"/></svg>
            Torna alla Home
          </a>
          <div className="flex items-center gap-1">
            <span className="text-sm font-extrabold" style={{ color: "#0D2340" }}>SOLAIR</span>
            <span style={{ color: "#F5A623" }}>&#9889;</span>
            <span className="text-xs font-medium" style={{ color: "#0D2340" }}>GROUP</span>
          </div>
        </div>
        <div className="px-6 py-10 text-center" style={{ borderBottom: "1px solid rgba(13,35,64,0.25)" }}>
          <div className="inline-flex items-center gap-1.5 text-[11px] font-bold tracking-wider uppercase px-3.5 py-1.5 rounded-full mb-4" style={{ background: "rgba(26,110,189,0.08)", border: "1px solid rgba(26,110,189,0.3)", color: "#1A6EBD" }}>
            ☀️ Solair Group
          </div>
          <h1 className="font-extrabold mb-2" style={{ fontSize: "clamp(22px, 4vw, 36px)", color: "#0D2340" }}>
            Configura il tuo<br /><span style={{ color: "#1A6EBD" }}>impianto fotovoltaico</span>
          </h1>
          <p className="text-sm" style={{ color: "#7A8FA6" }}>Scegli il modo in cui vuoi procedere</p>
        </div>

        <div className="max-w-[600px] mx-auto px-5 pt-10 pb-20">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <button
              onClick={() => setView("configuratore")}
              className="rounded-[14px] p-7 text-center cursor-pointer transition-all hover:border-[#1A6EBD]"
              style={{ background: "#FFFFFF", border: "2px solid rgba(26,110,189,0.12)" }}
              onMouseEnter={(e) => { e.currentTarget.style.borderColor = "#1A6EBD"; e.currentTarget.style.background = "rgba(26,110,189,0.08)" }}
              onMouseLeave={(e) => { e.currentTarget.style.borderColor = "rgba(26,110,189,0.12)"; e.currentTarget.style.background = "#FFFFFF" }}
            >
              <div className="text-4xl mb-3">🔧</div>
              <div className="text-base font-extrabold mb-2" style={{ color: "#0D2340" }}>Configurazione manuale</div>
              <div className="text-[13px] leading-relaxed" style={{ color: "#7A8FA6" }}>
                Scelgo io potenza, pannelli e accumulo in base a quello che so già
              </div>
            </button>

            <button
              onClick={() => setView("suggerimento")}
              className="rounded-[14px] p-7 text-center cursor-pointer transition-all"
              style={{ background: "#FFFFFF", border: "2px solid rgba(26,110,189,0.12)" }}
              onMouseEnter={(e) => { e.currentTarget.style.borderColor = "#1A6EBD"; e.currentTarget.style.background = "rgba(26,110,189,0.08)" }}
              onMouseLeave={(e) => { e.currentTarget.style.borderColor = "rgba(26,110,189,0.12)"; e.currentTarget.style.background = "#FFFFFF" }}
            >
              <div className="text-4xl mb-3">💡</div>
              <div className="text-base font-extrabold mb-2" style={{ color: "#0D2340" }}>Suggerimento Solair</div>
              <div className="text-[13px] leading-relaxed" style={{ color: "#7A8FA6" }}>
                Rispondo a qualche domanda e Solair Group mi suggerisce la soluzione ottimale
              </div>
            </button>
          </div>
        </div>
      </div>
    )
  }

  // Suggerimento Wizard
  if (view === "suggerimento") {
    const sgSteps = ["Immobile", "Zona", "Consumi", "Obiettivo", "Risultato"]
    const zonaLabel: Record<string, string> = { nord: "Nord Italia", centro: "Centro Italia", sud: "Sud / Isole" }

    return (
      <div className="min-h-screen font-[Outfit]" style={{ background: "linear-gradient(180deg, #E6EEF5 0%, #DCE7F2 100%)" }}>
        {/* Header with back button */}
        <div className="flex items-center justify-between px-6 py-4" style={{ borderBottom: "1px solid rgba(13,35,64,0.15)" }}>
          <a href="/" className="inline-flex items-center gap-2 text-sm font-medium transition-colors" style={{ color: "#1A6EBD" }}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 12H5M12 19l-7-7 7-7"/></svg>
            Torna alla Home
          </a>
          <div className="flex items-center gap-1">
            <span className="text-sm font-extrabold" style={{ color: "#0D2340" }}>SOLAIR</span>
            <span style={{ color: "#F5A623" }}>&#9889;</span>
            <span className="text-xs font-medium" style={{ color: "#0D2340" }}>GROUP</span>
          </div>
        </div>
        <div className="px-6 py-10 text-center" style={{ borderBottom: "1px solid rgba(13,35,64,0.25)" }}>
          <div className="inline-flex items-center gap-1.5 text-[11px] font-bold tracking-wider uppercase px-3.5 py-1.5 rounded-full mb-4" style={{ background: "rgba(26,110,189,0.08)", border: "1px solid rgba(26,110,189,0.3)", color: "#1A6EBD" }}>
            💡 Solair Group
          </div>
          <h1 className="font-extrabold mb-2" style={{ fontSize: "clamp(22px, 4vw, 36px)", color: "#0D2340" }}>
            Troviamo la soluzione<br /><span style={{ color: "#1A6EBD" }}>giusta per te</span>
          </h1>
          <p className="text-sm" style={{ color: "#7A8FA6" }}>Rispondi a qualche domanda, ci pensiamo noi</p>
        </div>

        {/* Progress Bar */}
        <div className="sticky top-0 z-50" style={{ background: "linear-gradient(180deg, #E6EEF5 0%, #DCE7F2 100%)", borderTop: "2px solid rgba(13,35,64,0.25)", borderBottom: "2px solid rgba(13,35,64,0.25)" }}>
          <div className="flex max-w-[700px] mx-auto overflow-x-auto">
            {sgSteps.map((label, i) => (
              <button
                key={i}
                onClick={() => i <= sgStep && goToSgStep(i)}
                className="flex-1 py-3.5 px-2 text-xs font-semibold transition-all whitespace-nowrap flex items-center justify-center gap-1.5 min-w-[80px] bg-transparent"
                style={{
                  color: i === sgStep ? "#1A6EBD" : i < sgStep ? "rgba(26,110,189,0.6)" : "#7A8FA6",
                  borderBottom: i === sgStep ? "2px solid #1A6EBD" : "2px solid transparent",
                }}
              >
                <span
                  className="w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold flex-shrink-0"
                  style={{
                    background: i === sgStep ? "#1A6EBD" : i < sgStep ? "rgba(26,110,189,0.08)" : "#EEF3FA",
                    color: i === sgStep ? "#fff" : i < sgStep ? "#1A6EBD" : "#7A8FA6",
                    border: i === sgStep ? "none" : i < sgStep ? "1px solid rgba(26,110,189,0.3)" : "1px solid rgba(26,110,189,0.12)",
                  }}
                >
                  {i + 1}
                </span>
                <span className="hidden sm:inline">{label}</span>
              </button>
            ))}
          </div>
        </div>

        <div className="max-w-[700px] mx-auto px-5 py-8 pb-20">
          {/* Cambia modalità link */}
          <div className="mb-2 -mt-2">
            <button
              onClick={() => setView("intro")}
              className="text-xs font-semibold flex items-center gap-1 p-0 bg-transparent border-none cursor-pointer"
              style={{ color: "#7A8FA6" }}
            >
              ← Cambia modalità
            </button>
          </div>
          
          {/* Step 0: Tipo e Dimensione */}
          {sgStep === 0 && (
            <div className="animate-[fadeIn_0.3s_ease]">
              <h2 className="text-[22px] font-bold mb-1" style={{ color: "#0D2340" }}>Il tuo immobile</h2>
              <p className="text-[13px] mb-6" style={{ color: "#7A8FA6" }}>Seleziona il tipo e la dimensione dell&apos;immobile</p>

              <div className="text-[13px] font-bold mb-2.5" style={{ color: "#0D2340" }}>Tipo di immobile</div>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 mb-6">
                {TIPI_IMMOBILE.map((tipo) => (
                  <button
                    key={tipo.id}
                    onClick={() => setSgState((prev) => ({ ...prev, tipo: tipo.id }))}
                    className="rounded-xl p-4 cursor-pointer transition-all text-left"
                    style={{
                      border: sgState.tipo === tipo.id ? "1px solid #1A6EBD" : "1px solid rgba(26,110,189,0.12)",
                      background: sgState.tipo === tipo.id ? "rgba(26,110,189,0.08)" : "#FFFFFF",
                    }}
                  >
                    <div className="text-2xl mb-1.5">{tipo.icon}</div>
                    <div className="text-[13px] font-bold" style={{ color: "#0D2340" }}>{tipo.nome}</div>
                    <div className="text-[11px]" style={{ color: "#7A8FA6" }}>{tipo.desc}</div>
                  </button>
                ))}
              </div>

              <div className="mb-7">
                <div className="flex justify-between items-center text-[13px] font-bold mb-3" style={{ color: "#0D2340" }}>
                  <span>Dimensione immobile</span>
                  <span>
                    <span className="text-[26px] font-extrabold" style={{ color: "#1A6EBD" }}>{sgState.mq}</span>
                    <span className="text-[13px] font-normal" style={{ color: "#7A8FA6" }}> m²</span>
                  </span>
                </div>
                <input
                  type="range"
                  min="30"
                  max="500"
                  step="10"
                  value={sgState.mq}
                  onChange={(e) => setSgState((prev) => ({ ...prev, mq: parseInt(e.target.value) }))}
                  className="w-full h-1.5 rounded-sm outline-none cursor-pointer appearance-none [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-[22px] [&::-webkit-slider-thumb]:h-[22px] [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-[#1A6EBD] [&::-webkit-slider-thumb]:border-[3px] [&::-webkit-slider-thumb]:border-white [&::-webkit-slider-thumb]:shadow-[0_0_0_2px_#1A6EBD] [&::-webkit-slider-thumb]:cursor-pointer"
                  style={{ background: "rgba(26,110,189,0.25)", border: "1px solid rgba(26,110,189,0.3)" }}
                />
              </div>

              <div className="flex gap-3 mt-7 flex-wrap">
                <button
                  onClick={() => setView("intro")}
                  className="inline-flex items-center gap-2 px-5 py-3 rounded-[10px] text-sm font-semibold cursor-pointer transition-all"
                  style={{ background: "transparent", color: "#1A6EBD", border: "1px solid rgba(26,110,189,0.3)" }}
                >
                  ← Indietro
                </button>
                <button
                  onClick={() => goToSgStep(1)}
                  disabled={!sgState.tipo}
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-[10px] text-sm font-bold cursor-pointer transition-all disabled:opacity-40 disabled:cursor-not-allowed"
                  style={{ background: "#1A6EBD", color: "#fff", border: "none" }}
                >
                  Avanti → Zona
                </button>
              </div>
            </div>
          )}

          {/* Step 1: Zona */}
          {sgStep === 1 && (
            <div className="animate-[fadeIn_0.3s_ease]">
              <h2 className="text-[22px] font-bold mb-1" style={{ color: "#0D2340" }}>Zona geografica</h2>
              <p className="text-[13px] mb-6" style={{ color: "#7A8FA6" }}>L&apos;irraggiamento solare varia significativamente in Italia</p>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 mb-6">
                {ZONE.map((zona) => (
                  <button
                    key={zona.id}
                    onClick={() => setSgState((prev) => ({ ...prev, zona: zona.id }))}
                    className="rounded-xl p-4 cursor-pointer transition-all text-left"
                    style={{
                      border: sgState.zona === zona.id ? "1px solid #1A6EBD" : "1px solid rgba(26,110,189,0.12)",
                      background: sgState.zona === zona.id ? "rgba(26,110,189,0.08)" : "#FFFFFF",
                    }}
                  >
                    <div className="text-2xl mb-1.5">{zona.icon}</div>
                    <div className="text-[13px] font-bold" style={{ color: "#0D2340" }}>{zona.nome}</div>
                    <div className="text-[11px]" style={{ color: "#7A8FA6" }}>{zona.irr}</div>
                  </button>
                ))}
              </div>

              <div className="flex gap-3 mt-7 flex-wrap">
                <button onClick={() => goToSgStep(0)} className="inline-flex items-center gap-2 px-5 py-3 rounded-[10px] text-sm font-semibold cursor-pointer transition-all" style={{ background: "transparent", color: "#1A6EBD", border: "1px solid rgba(26,110,189,0.3)" }}>← Indietro</button>
                <button onClick={() => goToSgStep(2)} disabled={!sgState.zona} className="inline-flex items-center gap-2 px-6 py-3 rounded-[10px] text-sm font-bold cursor-pointer transition-all disabled:opacity-40 disabled:cursor-not-allowed" style={{ background: "#1A6EBD", color: "#fff", border: "none" }}>Avanti → Consumi</button>
              </div>
            </div>
          )}

          {/* Step 2: Consumi */}
          {sgStep === 2 && (
            <div className="animate-[fadeIn_0.3s_ease]">
              <h2 className="text-[22px] font-bold mb-1" style={{ color: "#0D2340" }}>I tuoi consumi</h2>
              <p className="text-[13px] mb-6" style={{ color: "#7A8FA6" }}>Indicaci quanto consumi mediamente all&apos;anno</p>

              <div className="mb-7">
                <div className="flex justify-between items-center text-[13px] font-bold mb-3" style={{ color: "#0D2340" }}>
                  <span>Consumo annuo elettrico</span>
                  <span>
                    <span className="text-[26px] font-extrabold" style={{ color: "#1A6EBD" }}>{sgState.consumo.toLocaleString("it-IT")}</span>
                    <span className="text-[13px] font-normal" style={{ color: "#7A8FA6" }}> kWh/anno</span>
                  </span>
                </div>
                <input type="range" min="500" max="15000" step="100" value={sgState.consumo} onChange={(e) => setSgState((prev) => ({ ...prev, consumo: parseInt(e.target.value) }))} className="w-full h-1.5 rounded-sm outline-none cursor-pointer appearance-none [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-[22px] [&::-webkit-slider-thumb]:h-[22px] [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-[#1A6EBD] [&::-webkit-slider-thumb]:border-[3px] [&::-webkit-slider-thumb]:border-white [&::-webkit-slider-thumb]:shadow-[0_0_0_2px_#1A6EBD] [&::-webkit-slider-thumb]:cursor-pointer" style={{ background: "rgba(26,110,189,0.25)", border: "1px solid rgba(26,110,189,0.3)" }} />
              </div>

              <div className="rounded-[10px] px-4 py-3 text-[13px] mb-5 flex gap-2.5" style={{ background: "rgba(26,110,189,0.08)", border: "1px solid rgba(26,110,189,0.3)", color: "#4A6380" }}>
                💡 Puoi trovare il consumo annuo sulla tua bolletta elettrica.
              </div>

              <div className="flex gap-3 mt-7 flex-wrap">
                <button onClick={() => goToSgStep(1)} className="inline-flex items-center gap-2 px-5 py-3 rounded-[10px] text-sm font-semibold cursor-pointer transition-all" style={{ background: "transparent", color: "#1A6EBD", border: "1px solid rgba(26,110,189,0.3)" }}>← Indietro</button>
                <button onClick={() => goToSgStep(3)} className="inline-flex items-center gap-2 px-6 py-3 rounded-[10px] text-sm font-bold cursor-pointer transition-all" style={{ background: "#1A6EBD", color: "#fff", border: "none" }}>Avanti → Obiettivo</button>
              </div>
            </div>
          )}

          {/* Step 3: Obiettivo */}
          {sgStep === 3 && (
            <div className="animate-[fadeIn_0.3s_ease]">
              <h2 className="text-[22px] font-bold mb-1" style={{ color: "#0D2340" }}>Il tuo obiettivo</h2>
              <p className="text-[13px] mb-6" style={{ color: "#7A8FA6" }}>Cosa vuoi ottenere principalmente dall&apos;impianto?</p>

              <div className="flex flex-col gap-2.5 mb-6">
                {OBIETTIVI.map((obj) => (
                  <button
                    key={obj.id}
                    onClick={() => setSgState((prev) => ({ ...prev, obiettivo: obj.id }))}
                    className="flex items-center gap-3.5 rounded-xl p-4 cursor-pointer transition-all text-left"
                    style={{
                      border: sgState.obiettivo === obj.id ? "1px solid #1A6EBD" : "1px solid rgba(26,110,189,0.12)",
                      background: sgState.obiettivo === obj.id ? "rgba(26,110,189,0.08)" : "#FFFFFF",
                    }}
                  >
                    <span className="text-2xl">{obj.icon}</span>
                    <div>
                      <div className="text-[13px] font-bold" style={{ color: "#0D2340" }}>{obj.nome}</div>
                      <div className="text-[11px]" style={{ color: "#7A8FA6" }}>{obj.desc}</div>
                    </div>
                  </button>
                ))}
              </div>

              <div className="flex gap-3 mt-7 flex-wrap">
                <button onClick={() => goToSgStep(2)} className="inline-flex items-center gap-2 px-5 py-3 rounded-[10px] text-sm font-semibold cursor-pointer transition-all" style={{ background: "transparent", color: "#1A6EBD", border: "1px solid rgba(26,110,189,0.3)" }}>← Indietro</button>
                <button onClick={calcolaSuggerimento} disabled={!sgState.obiettivo} className="inline-flex items-center gap-2 px-6 py-3 rounded-[10px] text-sm font-bold cursor-pointer transition-all disabled:opacity-40 disabled:cursor-not-allowed" style={{ background: "#1A6EBD", color: "#fff", border: "none" }}>Vedi la mia soluzione →</button>
              </div>
            </div>
          )}

          {/* Step 4: Risultato */}
          {sgStep === 4 && (
            <div className="animate-[fadeIn_0.3s_ease]">
              <h2 className="text-[22px] font-bold mb-1" style={{ color: "#0D2340" }}>La tua soluzione consigliata</h2>
              <p className="text-[13px] mb-6" style={{ color: "#7A8FA6" }}>In base alle tue risposte, ecco cosa ti consigliamo</p>

              <div className="rounded-[14px] p-6 mb-5 text-center" style={{
                background: sgState.linea === "smart" ? "rgba(34,197,94,0.1)" : sgState.linea === "power" ? "rgba(245,166,35,0.1)" : "rgba(168,85,247,0.1)",
                border: `2px solid ${sgState.linea === "smart" ? "#22c55e" : sgState.linea === "power" ? "#F5A623" : "#a855f7"}`,
              }}>
                <span className="inline-block text-[11px] font-bold tracking-wider uppercase px-3 py-1 rounded-xl mb-2.5" style={{
                  background: sgState.linea === "smart" ? "rgba(34,197,94,0.1)" : sgState.linea === "power" ? "rgba(245,166,35,0.1)" : "rgba(168,85,247,0.1)",
                  color: sgState.linea === "smart" ? "#22c55e" : sgState.linea === "power" ? "#F5A623" : "#a855f7",
                  border: `1px solid ${sgState.linea === "smart" ? "#22c55e" : sgState.linea === "power" ? "#F5A623" : "#a855f7"}`,
                }}>{LINEE[sgState.linea].nome}</span>
                <div className="text-[28px] font-extrabold mb-1.5" style={{ color: "#0D2340" }}>{LINEE[sgState.linea].nome}</div>
                <div className="text-[13px] mb-3" style={{ color: "#4A6380" }}>{LINEE[sgState.linea].desc}</div>
                <div className="text-[22px] font-extrabold" style={{ color: "#1A6EBD" }}>da €{LINEE[sgState.linea].prezzoBase.toLocaleString("it-IT")}</div>
              </div>

              <div className="rounded-[14px] overflow-hidden mb-5" style={{ background: "#FFFFFF", border: "1px solid rgba(26,110,189,0.12)" }}>
                <div className="px-[18px] py-3 text-[11px] font-bold uppercase tracking-wider" style={{ background: "#EEF3FA", color: "#7A8FA6" }}>Configurazione suggerita</div>
                <div className="flex justify-between items-center px-[18px] py-3 text-[13px]" style={{ borderBottom: "1px solid rgba(26,110,189,0.12)" }}><span style={{ color: "#4A6380" }}>Potenza consigliata</span><span className="font-bold" style={{ color: "#0D2340" }}>{sgState.potenzaSuggerita} kWp</span></div>
                <div className="flex justify-between items-center px-[18px] py-3 text-[13px]" style={{ borderBottom: "1px solid rgba(26,110,189,0.12)" }}><span style={{ color: "#4A6380" }}>Accumulo</span><span className="font-bold" style={{ color: "#0D2340" }}>{sgState.accumuloConsigliato ? `${sgState.accumuloKwh} kWh` : "Non necessario"}</span></div>
                <div className="flex justify-between items-center px-[18px] py-3 text-[13px]" style={{ borderBottom: "1px solid rgba(26,110,189,0.12)" }}><span style={{ color: "#4A6380" }}>Zona</span><span className="font-bold" style={{ color: "#0D2340" }}>{zonaLabel[sgState.zona || "centro"]}</span></div>
                <div className="flex justify-between items-center px-[18px] py-3 text-[13px]"><span style={{ color: "#4A6380" }}>Consumo stimato</span><span className="font-bold" style={{ color: "#0D2340" }}>{sgState.consumo.toLocaleString("it-IT")} kWh/anno</span></div>
              </div>

              <div className="flex gap-3 mt-7 flex-wrap">
                <button onClick={() => goToSgStep(3)} className="inline-flex items-center gap-2 px-5 py-3 rounded-[10px] text-sm font-semibold cursor-pointer transition-all" style={{ background: "transparent", color: "#1A6EBD", border: "1px solid rgba(26,110,189,0.3)" }}>← Modifica</button>
                <button onClick={accettaSuggerimento} className="inline-flex items-center gap-2 px-6 py-3 rounded-[10px] text-sm font-bold cursor-pointer transition-all" style={{ background: "#1A6EBD", color: "#fff", border: "none" }}>Procedi con questa configurazione →</button>
              </div>
            </div>
          )}
        </div>

        <style jsx>{`
          @keyframes fadeIn { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }
        `}</style>
      </div>
    )
  }

// Configuratore Manuale
  const steps = ["Potenza", "Pannelli", "Accumulo", "Linea", "Dati", "Riepilogo"]
  const currentLinea = linea ? LINEE[linea] : null

  return (
  <div className="min-h-screen font-[Outfit]" style={{ background: "linear-gradient(180deg, #E6EEF5 0%, #DCE7F2 100%)" }}>
    {/* Header with back button */}
    <div className="flex items-center justify-between px-6 py-4" style={{ borderBottom: "1px solid rgba(13,35,64,0.15)" }}>
      <a href="/" className="inline-flex items-center gap-2 text-sm font-medium transition-colors" style={{ color: "#1A6EBD" }}>
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 12H5M12 19l-7-7 7-7"/></svg>
        Torna alla Home
      </a>
      <div className="flex items-center gap-1">
        <span className="text-sm font-extrabold" style={{ color: "#0D2340" }}>SOLAIR</span>
        <span style={{ color: "#F5A623" }}>&#9889;</span>
        <span className="text-xs font-medium" style={{ color: "#0D2340" }}>GROUP</span>
      </div>
    </div>
      <div className="px-6 py-10 text-center" style={{ borderBottom: "1px solid rgba(13,35,64,0.25)" }}>
        <div className="inline-flex items-center gap-1.5 text-[11px] font-bold tracking-wider uppercase px-3.5 py-1.5 rounded-full mb-4" style={{ background: "rgba(26,110,189,0.08)", border: "1px solid rgba(26,110,189,0.3)", color: "#1A6EBD" }}>☀️ Solair Group</div>
        <h1 className="font-extrabold mb-2" style={{ fontSize: "clamp(22px, 4vw, 36px)", color: "#0D2340" }}>Configura il tuo<br /><span style={{ color: "#1A6EBD" }}>impianto fotovoltaico</span></h1>
        <p className="text-sm" style={{ color: "#7A8FA6" }}>Scegli la soluzione giusta e ricevi la tua offerta in pochi minuti</p>
      </div>

      <div className="sticky top-0 z-50" style={{ background: "linear-gradient(180deg, #E6EEF5 0%, #DCE7F2 100%)", borderTop: "2px solid rgba(13,35,64,0.25)", borderBottom: "2px solid rgba(13,35,64,0.25)" }}>
        <div className="flex max-w-[700px] mx-auto overflow-x-auto">
          {steps.map((label, i) => (
            <button key={i} onClick={() => i <= step && goToStep(i)} className="flex-1 py-3.5 px-2 text-xs font-semibold transition-all whitespace-nowrap flex items-center justify-center gap-1.5 min-w-[70px] bg-transparent" style={{ color: i === step ? "#1A6EBD" : i < step ? "rgba(26,110,189,0.6)" : "#7A8FA6", borderBottom: i === step ? "2px solid #1A6EBD" : "2px solid transparent" }}>
              <span className="w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold flex-shrink-0" style={{ background: i === step ? "#1A6EBD" : i < step ? "rgba(26,110,189,0.08)" : "#EEF3FA", color: i === step ? "#fff" : i < step ? "#1A6EBD" : "#7A8FA6", border: i === step ? "none" : i < step ? "1px solid rgba(26,110,189,0.3)" : "1px solid rgba(26,110,189,0.12)" }}>{i + 1}</span>
              <span className="hidden sm:inline">{label}</span>
            </button>
          ))}
        </div>
      </div>

      <div className="max-w-[700px] mx-auto px-5 py-8 pb-20">
        {/* Cambia modalità link */}
        <div className="mb-2 -mt-2">
          <button
            onClick={tornaIntroFromConfigurator}
            className="text-xs font-semibold flex items-center gap-1 p-0 bg-transparent border-none cursor-pointer"
            style={{ color: "#7A8FA6" }}
          >
            ← Cambia modalità
          </button>
        </div>
        
        {/* Step 0: Potenza */}
        {step === 0 && (
          <div className="animate-[fadeIn_0.3s_ease]">
            <h2 className="text-[22px] font-bold mb-1" style={{ color: "#0D2340" }}>Scegli la potenza</h2>
            <p className="text-[13px] mb-6" style={{ color: "#7A8FA6" }}>Indica la potenza dell&apos;impianto che desideri installare</p>
            <div className="mb-7">
              <div className="flex justify-between items-center text-[13px] font-bold mb-3" style={{ color: "#0D2340" }}>
                <span>Potenza impianto</span>
                <span><span className="text-[26px] font-extrabold" style={{ color: "#1A6EBD" }}>{potenza.toFixed(1)}</span><span className="text-[13px] font-normal" style={{ color: "#7A8FA6" }}> kWp</span></span>
              </div>
              <input type="range" min="1" max="20" step="0.5" value={potenza} onChange={(e) => setPotenza(parseFloat(e.target.value))} className="w-full h-1.5 rounded-sm outline-none cursor-pointer appearance-none [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-[22px] [&::-webkit-slider-thumb]:h-[22px] [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-[#1A6EBD] [&::-webkit-slider-thumb]:border-[3px] [&::-webkit-slider-thumb]:border-white [&::-webkit-slider-thumb]:shadow-[0_0_0_2px_#1A6EBD] [&::-webkit-slider-thumb]:cursor-pointer" style={{ background: "rgba(26,110,189,0.25)", border: "1px solid rgba(26,110,189,0.3)" }} />
            </div>
            <div className="rounded-[10px] px-4 py-3 text-[13px] mb-5 flex gap-2.5" style={{ background: "rgba(26,110,189,0.08)", border: "1px solid rgba(26,110,189,0.3)", color: "#4A6380" }}>💡 Non sai quanta potenza ti serve? Un consumo medio familiare di 3.500 kWh/anno corrisponde circa a 3-4 kWp.</div>
            <div className="flex gap-3 mt-7 flex-wrap">
              <button onClick={() => goToStep(1)} className="inline-flex items-center gap-2 px-6 py-3 rounded-[10px] text-sm font-bold cursor-pointer transition-all" style={{ background: "#1A6EBD", color: "#fff", border: "none" }}>Avanti → Pannelli</button>
            </div>
          </div>
        )}

        {/* Step 1: Pannelli */}
        {step === 1 && (
          <div className="animate-[fadeIn_0.3s_ease]">
            <h2 className="text-[22px] font-bold mb-1" style={{ color: "#0D2340" }}>Scegli i pannelli</h2>
            <p className="text-[13px] mb-6" style={{ color: "#7A8FA6" }}>La scelta del pannello non modifica il prezzo dell&apos;offerta</p>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 mb-6">
              {PANNELLI.map((p) => (
                <button key={p.id} onClick={() => setPannello(`${p.brand} ${p.model}`)} className="rounded-xl p-4 cursor-pointer transition-all text-left" style={{ border: pannello === `${p.brand} ${p.model}` ? "1px solid #1A6EBD" : "1px solid rgba(26,110,189,0.12)", background: pannello === `${p.brand} ${p.model}` ? "rgba(26,110,189,0.08)" : "#FFFFFF" }}>
                  <div className="text-[13px] font-bold mb-1" style={{ color: "#0D2340" }}>{p.brand}</div>
                  <div className="text-[11px] mb-2" style={{ color: "#7A8FA6" }}>{p.model}</div>
                  <span className="inline-block text-[10px] font-semibold px-2 py-0.5 rounded-md" style={{ background: "#EEF3FA", color: "#4A6380" }}>{p.tag}</span>
                </button>
              ))}
            </div>
            <div className="flex gap-3 mt-7 flex-wrap">
              <button onClick={() => goToStep(0)} className="inline-flex items-center gap-2 px-5 py-3 rounded-[10px] text-sm font-semibold cursor-pointer transition-all" style={{ background: "transparent", color: "#1A6EBD", border: "1px solid rgba(26,110,189,0.3)" }}>← Indietro</button>
              <button onClick={() => goToStep(2)} disabled={!pannello} className="inline-flex items-center gap-2 px-6 py-3 rounded-[10px] text-sm font-bold cursor-pointer transition-all disabled:opacity-40 disabled:cursor-not-allowed" style={{ background: "#1A6EBD", color: "#fff", border: "none" }}>Avanti → Accumulo</button>
            </div>
          </div>
        )}

        {/* Step 2: Accumulo */}
        {step === 2 && (
          <div className="animate-[fadeIn_0.3s_ease]">
            <h2 className="text-[22px] font-bold mb-1" style={{ color: "#0D2340" }}>Sistema di accumulo</h2>
            <p className="text-[13px] mb-6" style={{ color: "#7A8FA6" }}>Aggiungi una batteria per massimizzare l&apos;autoconsumo</p>
            <div className="rounded-[14px] p-[18px] mb-5" style={{ background: "#FFFFFF", border: "1px solid rgba(26,110,189,0.12)" }}>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <span className="text-2xl">🔋</span>
                  <div>
                    <div className="text-sm font-bold" style={{ color: "#0D2340" }}>Aggiungi accumulo</div>
                    <div className="text-xs" style={{ color: "#7A8FA6" }}>Batteria per stoccare l&apos;energia prodotta</div>
                  </div>
                </div>
                <label className="relative w-11 h-6 flex-shrink-0 cursor-pointer">
                  <input type="checkbox" checked={accumulo} onChange={(e) => setAccumulo(e.target.checked)} className="opacity-0 w-0 h-0" />
                  <span className="absolute top-0 left-0 right-0 bottom-0 rounded-xl cursor-pointer transition-all" style={{ background: accumulo ? "#1A6EBD" : "#E4ECF7", border: accumulo ? "none" : "1px solid rgba(26,110,189,0.12)" }}>
                    <span className="absolute w-[18px] h-[18px] left-[2px] bottom-[2px] rounded-full transition-all" style={{ background: accumulo ? "#fff" : "#7A8FA6", transform: accumulo ? "translateX(20px)" : "translateX(0)" }} />
                  </span>
                </label>
              </div>
              {accumulo && (
                <div className="mt-5 pt-4" style={{ borderTop: "1px solid rgba(26,110,189,0.12)" }}>
                  <div className="flex justify-between items-center text-[13px] font-bold mb-3" style={{ color: "#0D2340" }}>
                    <span>Capacità batteria</span>
                    <span><span className="text-[26px] font-extrabold" style={{ color: "#1A6EBD" }}>{accumuloKwh}</span><span className="text-[13px] font-normal" style={{ color: "#7A8FA6" }}> kWh</span></span>
                  </div>
                  <input type="range" min="2" max="20" step="1" value={accumuloKwh} onChange={(e) => setAccumuloKwh(parseInt(e.target.value))} className="w-full h-1.5 rounded-sm outline-none cursor-pointer appearance-none [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-[22px] [&::-webkit-slider-thumb]:h-[22px] [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-[#1A6EBD] [&::-webkit-slider-thumb]:border-[3px] [&::-webkit-slider-thumb]:border-white [&::-webkit-slider-thumb]:shadow-[0_0_0_2px_#1A6EBD] [&::-webkit-slider-thumb]:cursor-pointer" style={{ background: "rgba(26,110,189,0.25)", border: "1px solid rgba(26,110,189,0.3)" }} />
                </div>
              )}
            </div>
            <div className="flex gap-3 mt-7 flex-wrap">
              <button onClick={() => goToStep(1)} className="inline-flex items-center gap-2 px-5 py-3 rounded-[10px] text-sm font-semibold cursor-pointer transition-all" style={{ background: "transparent", color: "#1A6EBD", border: "1px solid rgba(26,110,189,0.3)" }}>← Indietro</button>
              <button onClick={() => { calcolaLinea(); goToStep(3) }} className="inline-flex items-center gap-2 px-6 py-3 rounded-[10px] text-sm font-bold cursor-pointer transition-all" style={{ background: "#1A6EBD", color: "#fff", border: "none" }}>Vedi la tua linea →</button>
            </div>
          </div>
        )}

        {/* Step 3: Linea */}
        {step === 3 && currentLinea && (
          <div className="animate-[fadeIn_0.3s_ease]">
            <h2 className="text-[22px] font-bold mb-1" style={{ color: "#0D2340" }}>La tua linea consigliata</h2>
            <p className="text-[13px] mb-6" style={{ color: "#7A8FA6" }}>In base alla tua configurazione, questa è la soluzione più adatta</p>
            <div className="rounded-[14px] p-6 mb-5 text-center" style={{ background: linea === "smart" ? "rgba(34,197,94,0.1)" : linea === "power" ? "rgba(245,166,35,0.1)" : "rgba(168,85,247,0.1)", border: `2px solid ${linea === "smart" ? "#22c55e" : linea === "power" ? "#F5A623" : "#a855f7"}` }}>
              <span className="inline-block text-[11px] font-bold tracking-wider uppercase px-3 py-1 rounded-xl mb-2.5" style={{ background: linea === "smart" ? "rgba(34,197,94,0.1)" : linea === "power" ? "rgba(245,166,35,0.1)" : "rgba(168,85,247,0.1)", color: linea === "smart" ? "#22c55e" : linea === "power" ? "#F5A623" : "#a855f7", border: `1px solid ${linea === "smart" ? "#22c55e" : linea === "power" ? "#F5A623" : "#a855f7"}` }}>{currentLinea.nome}</span>
              <div className="text-[28px] font-extrabold mb-1.5" style={{ color: "#0D2340" }}>{currentLinea.nome}</div>
              <div className="text-[13px] mb-3" style={{ color: "#4A6380" }}>{currentLinea.desc}</div>
              <div className="text-[22px] font-extrabold" style={{ color: "#1A6EBD" }}>da €{currentLinea.prezzoBase.toLocaleString("it-IT")}</div>
            </div>
            <div className="rounded-[14px] overflow-hidden mb-5" style={{ background: "#FFFFFF", border: "1px solid rgba(26,110,189,0.12)" }}>
              <div className="px-[18px] py-3 text-[11px] font-bold uppercase tracking-wider" style={{ background: "#EEF3FA", color: "#7A8FA6" }}>Riepilogo configurazione</div>
              <div className="flex justify-between items-center px-[18px] py-3 text-[13px]" style={{ borderBottom: "1px solid rgba(26,110,189,0.12)" }}><span style={{ color: "#4A6380" }}>Potenza impianto</span><span className="font-bold" style={{ color: "#0D2340" }}>{potenza} kWp</span></div>
              <div className="flex justify-between items-center px-[18px] py-3 text-[13px]" style={{ borderBottom: "1px solid rgba(26,110,189,0.12)" }}><span style={{ color: "#4A6380" }}>Pannelli</span><span className="font-bold" style={{ color: "#0D2340" }}>{pannello || "-"}</span></div>
              <div className="flex justify-between items-center px-[18px] py-3 text-[13px]"><span style={{ color: "#4A6380" }}>Accumulo</span><span className="font-bold" style={{ color: "#0D2340" }}>{accumulo ? `${accumuloKwh} kWh` : "Non incluso"}</span></div>
            </div>
            <div className="flex gap-3 mt-7 flex-wrap">
              <button onClick={() => goToStep(2)} className="inline-flex items-center gap-2 px-5 py-3 rounded-[10px] text-sm font-semibold cursor-pointer transition-all" style={{ background: "transparent", color: "#1A6EBD", border: "1px solid rgba(26,110,189,0.3)" }}>← Modifica</button>
              <button onClick={() => goToStep(4)} className="inline-flex items-center gap-2 px-6 py-3 rounded-[10px] text-sm font-bold cursor-pointer transition-all" style={{ background: "#1A6EBD", color: "#fff", border: "none" }}>Avanti → Dati</button>
            </div>
          </div>
        )}

        {/* Step 4: Dati Cliente */}
        {step === 4 && (
          <div className="animate-[fadeIn_0.3s_ease]">
            <h2 className="text-[22px] font-bold mb-1" style={{ color: "#0D2340" }}>I tuoi dati</h2>
            <p className="text-[13px] mb-6" style={{ color: "#7A8FA6" }}>Compila il modulo per ricevere la tua offerta personalizzata</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-5">
              <div className="flex flex-col gap-1.5"><label className="text-xs font-semibold" style={{ color: "#4A6380" }}>Nome *</label><input type="text" value={formData.nome} onChange={(e) => setFormData((prev) => ({ ...prev, nome: e.target.value }))} placeholder="Mario" className="rounded-[10px] px-3.5 py-2.5 text-sm outline-none transition-colors focus:border-[#1A6EBD]" style={{ background: "#FFFFFF", border: "1px solid rgba(26,110,189,0.12)", color: "#0D2340" }} /></div>
              <div className="flex flex-col gap-1.5"><label className="text-xs font-semibold" style={{ color: "#4A6380" }}>Cognome *</label><input type="text" value={formData.cognome} onChange={(e) => setFormData((prev) => ({ ...prev, cognome: e.target.value }))} placeholder="Rossi" className="rounded-[10px] px-3.5 py-2.5 text-sm outline-none transition-colors focus:border-[#1A6EBD]" style={{ background: "#FFFFFF", border: "1px solid rgba(26,110,189,0.12)", color: "#0D2340" }} /></div>
              <div className="flex flex-col gap-1.5 sm:col-span-2"><label className="text-xs font-semibold" style={{ color: "#4A6380" }}>Email *</label><input type="email" value={formData.email} onChange={(e) => setFormData((prev) => ({ ...prev, email: e.target.value }))} placeholder="mario.rossi@email.it" className="rounded-[10px] px-3.5 py-2.5 text-sm outline-none transition-colors focus:border-[#1A6EBD]" style={{ background: "#FFFFFF", border: "1px solid rgba(26,110,189,0.12)", color: "#0D2340" }} /></div>
              <div className="flex flex-col gap-1.5"><label className="text-xs font-semibold" style={{ color: "#4A6380" }}>Telefono *</label><input type="tel" value={formData.telefono} onChange={(e) => setFormData((prev) => ({ ...prev, telefono: e.target.value }))} placeholder="+39 333 000 0000" className="rounded-[10px] px-3.5 py-2.5 text-sm outline-none transition-colors focus:border-[#1A6EBD]" style={{ background: "#FFFFFF", border: "1px solid rgba(26,110,189,0.12)", color: "#0D2340" }} /></div>
              <div className="flex flex-col gap-1.5"><label className="text-xs font-semibold" style={{ color: "#4A6380" }}>Codice Fiscale</label><input type="text" value={formData.cf} onChange={(e) => setFormData((prev) => ({ ...prev, cf: e.target.value }))} placeholder="RSSMRA80A01H501Z" className="rounded-[10px] px-3.5 py-2.5 text-sm outline-none transition-colors focus:border-[#1A6EBD]" style={{ background: "#FFFFFF", border: "1px solid rgba(26,110,189,0.12)", color: "#0D2340" }} /></div>
              <div className="flex flex-col gap-1.5 sm:col-span-2"><label className="text-xs font-semibold" style={{ color: "#4A6380" }}>Indirizzo installazione *</label><input type="text" value={formData.indirizzo} onChange={(e) => setFormData((prev) => ({ ...prev, indirizzo: e.target.value }))} placeholder="Via Roma 1, 00100 Roma (RM)" className="rounded-[10px] px-3.5 py-2.5 text-sm outline-none transition-colors focus:border-[#1A6EBD]" style={{ background: "#FFFFFF", border: "1px solid rgba(26,110,189,0.12)", color: "#0D2340" }} /></div>
              <div className="flex flex-col gap-1.5"><label className="text-xs font-semibold" style={{ color: "#4A6380" }}>Tipo immobile</label><select value={formData.tipo} onChange={(e) => setFormData((prev) => ({ ...prev, tipo: e.target.value }))} className="rounded-[10px] px-3.5 py-2.5 text-sm outline-none transition-colors focus:border-[#1A6EBD]" style={{ background: "#FFFFFF", border: "1px solid rgba(26,110,189,0.12)", color: "#0D2340" }}><option value="">Seleziona...</option><option>Villetta</option><option>Appartamento</option><option>Bifamiliare</option><option>Capannone</option><option>Altro</option></select></div>
              <div className="flex flex-col gap-1.5"><label className="text-xs font-semibold" style={{ color: "#4A6380" }}>Incentivo richiesto</label><select value={formData.incentivo} onChange={(e) => setFormData((prev) => ({ ...prev, incentivo: e.target.value }))} className="rounded-[10px] px-3.5 py-2.5 text-sm outline-none transition-colors focus:border-[#1A6EBD]" style={{ background: "#FFFFFF", border: "1px solid rgba(26,110,189,0.12)", color: "#0D2340" }}><option value="">Seleziona...</option><option>Detrazione 50%</option><option>PNRR 40%</option><option>Nessuno</option></select></div>
              <div className="flex flex-col gap-1.5 sm:col-span-2"><label className="text-xs font-semibold" style={{ color: "#4A6380" }}>Note aggiuntive</label><textarea value={formData.note} onChange={(e) => setFormData((prev) => ({ ...prev, note: e.target.value }))} rows={3} placeholder="Informazioni aggiuntive..." className="rounded-[10px] px-3.5 py-2.5 text-sm outline-none transition-colors resize-none focus:border-[#1A6EBD]" style={{ background: "#FFFFFF", border: "1px solid rgba(26,110,189,0.12)", color: "#0D2340" }} /></div>
            </div>
            <hr className="my-5" style={{ border: "none", borderTop: "1px solid rgba(26,110,189,0.12)" }} />
            
            {/* Mandatory ID Document Upload */}
            <div className="text-[13px] font-semibold mb-1.5" style={{ color: "#0D2340" }}>🪪 Documento di riconoscimento *</div>
            <div className="rounded-[10px] px-4 py-3 text-[13px] mb-4 flex gap-2.5" style={{ background: "rgba(239,68,68,0.05)", border: "1px solid rgba(239,68,68,0.3)", color: "#4A6380" }}>
              ⚠️ Obbligatorio. Carica fronte e retro della carta d&apos;identità o passaporto.
            </div>
            <div 
              ref={idUploadAreaRef}
              onClick={() => idDocInputRef.current?.click()} 
              className="border-2 border-dashed rounded-xl p-6 text-center cursor-pointer transition-all mb-4" 
              style={{ 
                borderColor: idDocError ? "#ef4444" : idDocuments.length > 0 ? "#1A6EBD" : "rgba(26,110,189,0.12)", 
                background: idDocError ? "rgba(239,68,68,0.05)" : idDocuments.length > 0 ? "rgba(26,110,189,0.08)" : "#FFFFFF" 
              }}
            >
              <div className="text-[28px] mb-1.5">🪪</div>
              <div className="text-sm font-semibold mb-1" style={{ color: "#0D2340" }}>Carica documento di riconoscimento</div>
              <div className="text-xs" style={{ color: "#7A8FA6" }}>JPG, PNG, PDF — fronte e retro</div>
              <input ref={idDocInputRef} type="file" multiple accept=".pdf,.jpg,.jpeg,.png" onChange={(e) => handleIdDocuments(e.target.files)} className="hidden" />
            </div>
            {idDocuments.length > 0 && (
              <div className="flex flex-col gap-2 mb-4">
                {idDocuments.map((f, i) => (
                  <div key={i} className="flex items-center gap-2.5 px-3.5 py-2.5 rounded-lg text-[13px]" style={{ background: "#FFFFFF", border: "1px solid #1A6EBD" }}>
                    <span>🪪</span>
                    <span className="flex-1" style={{ color: "#4A6380" }}>{f.name}</span>
                    <button onClick={() => removeIdDocument(i)} className="cursor-pointer text-base hover:text-[#ef4444]" style={{ color: "#7A8FA6" }}>✕</button>
                  </div>
                ))}
              </div>
            )}
            
            <hr className="my-5" style={{ border: "none", borderTop: "1px solid rgba(26,110,189,0.12)" }} />
            
            {/* Optional Documents */}
            <div className="text-[13px] font-semibold mb-3" style={{ color: "#0D2340" }}>📎 Documenti aggiuntivi (opzionale)</div>
            <div className="rounded-[10px] px-4 py-3 text-[13px] mb-5 flex gap-2.5" style={{ background: "rgba(26,110,189,0.08)", border: "1px solid rgba(26,110,189,0.3)", color: "#4A6380" }}>💡 Puoi allegare planimetria, visura catastale o copia bolletta.</div>
            <div onClick={() => fileInputRef.current?.click()} className="border-2 border-dashed rounded-xl p-6 text-center cursor-pointer transition-all mb-4" style={{ borderColor: "rgba(26,110,189,0.12)", background: "#FFFFFF" }}>
              <div className="text-[28px] mb-1.5">📁</div>
              <div className="text-sm font-semibold mb-1" style={{ color: "#0D2340" }}>Carica documenti</div>
              <div className="text-xs" style={{ color: "#7A8FA6" }}>PDF, JPG, PNG - max 10MB per file</div>
              <input ref={fileInputRef} type="file" multiple accept=".pdf,.jpg,.jpeg,.png" onChange={(e) => handleFiles(e.target.files)} className="hidden" />
            </div>
            {files.length > 0 && (
              <div className="flex flex-col gap-2 mb-4">
                {files.map((f, i) => (
                  <div key={i} className="flex items-center gap-2.5 px-3.5 py-2.5 rounded-lg text-[13px]" style={{ background: "#FFFFFF", border: "1px solid rgba(26,110,189,0.12)" }}>
                    <span>📄</span>
                    <span className="flex-1" style={{ color: "#4A6380" }}>{f.name}</span>
                    <button onClick={() => removeFile(i)} className="cursor-pointer text-base hover:text-[#ef4444]" style={{ color: "#7A8FA6" }}>✕</button>
                  </div>
                ))}
              </div>
            )}
            <div className="flex gap-3 mt-7 flex-wrap">
              <button onClick={() => goToStep(3)} className="inline-flex items-center gap-2 px-5 py-3 rounded-[10px] text-sm font-semibold cursor-pointer transition-all" style={{ background: "transparent", color: "#1A6EBD", border: "1px solid rgba(26,110,189,0.3)" }}>← Indietro</button>
              <button onClick={goToRiepilogoWithValidation} className="inline-flex items-center gap-2 px-6 py-3 rounded-[10px] text-sm font-bold cursor-pointer transition-all" style={{ background: "#1A6EBD", color: "#fff", border: "none" }}>Vedi riepilogo →</button>
            </div>
          </div>
        )}

        {/* Step 5: Riepilogo */}
        {step === 5 && !showConfirmation && (
          <div className="animate-[fadeIn_0.3s_ease]">
            <h2 className="text-[22px] font-bold mb-1" style={{ color: "#0D2340" }}>Riepilogo offerta</h2>
            <p className="text-[13px] mb-6" style={{ color: "#7A8FA6" }}>Verifica i dati prima di inviare la richiesta</p>
            {showError && <div className="rounded-[10px] px-4 py-3 text-[13px] mb-5 flex gap-2.5" style={{ background: "rgba(239,68,68,0.08)", border: "1px solid rgba(239,68,68,0.4)", color: "#4A6380" }}>❌ Si è verificato un errore. Riprova o contattaci su WhatsApp.</div>}
            <div className="rounded-[14px] overflow-hidden mb-4" style={{ background: "#FFFFFF", border: "1px solid rgba(26,110,189,0.12)" }}>
              <div className="px-[18px] py-3 text-[11px] font-bold uppercase tracking-wider" style={{ background: "#EEF3FA", color: "#7A8FA6" }}>Configurazione</div>
              <div className="flex justify-between items-center px-[18px] py-3 text-[13px]" style={{ borderBottom: "1px solid rgba(26,110,189,0.12)" }}><span style={{ color: "#4A6380" }}>Linea commerciale</span><span className="font-bold" style={{ color: "#0D2340" }}>{linea ? LINEE[linea].nome : "-"}</span></div>
              <div className="flex justify-between items-center px-[18px] py-3 text-[13px]" style={{ borderBottom: "1px solid rgba(26,110,189,0.12)" }}><span style={{ color: "#4A6380" }}>Potenza</span><span className="font-bold" style={{ color: "#0D2340" }}>{potenza} kWp</span></div>
              <div className="flex justify-between items-center px-[18px] py-3 text-[13px]" style={{ borderBottom: "1px solid rgba(26,110,189,0.12)" }}><span style={{ color: "#4A6380" }}>Pannelli</span><span className="font-bold" style={{ color: "#0D2340" }}>{pannello || "-"}</span></div>
              <div className="flex justify-between items-center px-[18px] py-3 text-[13px]" style={{ borderBottom: "1px solid rgba(26,110,189,0.12)" }}><span style={{ color: "#4A6380" }}>Accumulo</span><span className="font-bold" style={{ color: "#0D2340" }}>{accumulo ? `${accumuloKwh} kWh` : "Non incluso"}</span></div>
              <div className="flex justify-between items-center px-[18px] py-3 text-[13px]" style={{ background: "rgba(26,110,189,0.08)" }}><span className="font-bold text-sm" style={{ color: "#4A6380" }}>Prezzo indicativo</span><span className="font-extrabold text-lg" style={{ color: "#1A6EBD" }}>{linea ? `da €${LINEE[linea].prezzoBase.toLocaleString("it-IT")}` : "-"}</span></div>
            </div>
            <div className="rounded-[14px] overflow-hidden mb-4" style={{ background: "#FFFFFF", border: "1px solid rgba(26,110,189,0.12)" }}>
              <div className="px-[18px] py-3 text-[11px] font-bold uppercase tracking-wider" style={{ background: "#EEF3FA", color: "#7A8FA6" }}>Dati cliente</div>
              <div className="flex justify-between items-center px-[18px] py-3 text-[13px]" style={{ borderBottom: "1px solid rgba(26,110,189,0.12)" }}><span style={{ color: "#4A6380" }}>Nome</span><span className="font-bold" style={{ color: "#0D2340" }}>{formData.nome || formData.cognome ? `${formData.nome} ${formData.cognome}`.trim() : "-"}</span></div>
              <div className="flex justify-between items-center px-[18px] py-3 text-[13px]" style={{ borderBottom: "1px solid rgba(26,110,189,0.12)" }}><span style={{ color: "#4A6380" }}>Email</span><span className="font-bold" style={{ color: "#0D2340" }}>{formData.email || "-"}</span></div>
              <div className="flex justify-between items-center px-[18px] py-3 text-[13px]" style={{ borderBottom: "1px solid rgba(26,110,189,0.12)" }}><span style={{ color: "#4A6380" }}>Telefono</span><span className="font-bold" style={{ color: "#0D2340" }}>{formData.telefono || "-"}</span></div>
              <div className="flex justify-between items-center px-[18px] py-3 text-[13px]"><span style={{ color: "#4A6380" }}>Indirizzo</span><span className="font-bold" style={{ color: "#0D2340" }}>{formData.indirizzo || "-"}</span></div>
            </div>
            {/* Legal disclaimer box */}
            <div className="rounded-xl px-[18px] py-4 mb-5 text-xs leading-relaxed" style={{ background: "#FFFFFF", border: "1px solid rgba(26,110,189,0.12)", color: "#7A8FA6" }}>
              ✅ Cliccando su <strong style={{ color: "#0D2340" }}>Accetta e firma</strong> confermo di aver letto e accettato la configurazione sopra indicata e autorizzo l&apos;avvio della procedura di sottoscrizione del contratto. Riceverò via email il documento da firmare digitalmente tramite OTP.
            </div>
            
            <div className="flex gap-3 mt-7 flex-wrap justify-center">
              <button onClick={() => goToStep(4)} className="inline-flex items-center gap-2 px-5 py-3 rounded-[10px] text-sm font-semibold cursor-pointer transition-all" style={{ background: "transparent", color: "#1A6EBD", border: "1px solid rgba(26,110,189,0.3)" }}>← Modifica</button>
              <button onClick={inviaRichiesta} disabled={isSubmitting} className="inline-flex items-center gap-2 px-8 py-4 rounded-[10px] text-[15px] font-bold cursor-pointer transition-all disabled:opacity-40 disabled:cursor-not-allowed" style={{ background: "#0D5C9E", color: "#fff", border: "none" }}>{isSubmitting ? "⏳ Invio in corso..." : "✍️ Accetta e firma"}</button>
            </div>
          </div>
        )}

        {/* Confirmation */}
        {showConfirmation && (
          <div className="animate-[fadeIn_0.3s_ease]">
            <div className="rounded-[14px] p-8 text-center" style={{ background: "#FFFFFF", border: "1px solid rgba(26,110,189,0.12)" }}>
              <div className="text-5xl mb-4">✅</div>
              <div className="text-[22px] font-extrabold mb-2" style={{ color: "#0D2340" }}>Richiesta inviata!</div>
              <div className="text-sm mb-6" style={{ color: "#7A8FA6" }}>Abbiamo ricevuto la tua richiesta. Ecco cosa succede ora:</div>
              <div className="flex flex-col gap-2 text-left mb-6">
                <div className="flex items-center gap-3 px-4 py-3 rounded-[10px] text-[13px]" style={{ background: "#EEF3FA", color: "#4A6380" }}><span>📄</span> Stiamo generando la tua offerta in PDF</div>
                <div className="flex items-center gap-3 px-4 py-3 rounded-[10px] text-[13px]" style={{ background: "#EEF3FA", color: "#4A6380" }}><span>✍️</span> Riceverai un&apos;email con il link per firmare digitalmente</div>
                <div className="flex items-center gap-3 px-4 py-3 rounded-[10px] text-[13px]" style={{ background: "#EEF3FA", color: "#4A6380" }}><span>📞</span> Un nostro consulente ti contatterà entro 24 ore</div>
              </div>
              <a href="https://wa.me/390952900278" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 px-6 py-3 rounded-[10px] text-sm font-bold cursor-pointer transition-all" style={{ background: "#1A6EBD", color: "#fff", border: "none" }}>💬 Contattaci su WhatsApp</a>
            </div>
          </div>
        )}
      </div>

      <style jsx>{`
        @keyframes fadeIn { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }
      `}</style>
    </div>
  )
}
