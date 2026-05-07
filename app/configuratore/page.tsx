"use client"

import { useState, useRef } from "react"
import Image from "next/image"

// Webhook URL Make
const MAKE_WEBHOOK_URL = "https://hook.eu1.make.com/2clnfl0s9958wkei5uq8vp26wbmyfqf6"

// Listino prezzi Maggio 2026
const PREZZI: Record<string, Record<number, Record<number, number>>> = {
  smart: {
    6: { 10: 8800, 16: 9400, 20: 10700, 32: 11900 },
    7: { 10: 9300, 16: 10000, 20: 11200, 32: 12400 },
    8: { 10: 10300, 16: 10900, 20: 12200, 32: 13400 },
    9: { 10: 11100, 16: 11800, 20: 13000, 32: 14300 },
  },
  power: {
    6: { 10.6: 9800, 15.9: 10800, 21.2: 11800 },
    7: { 10.6: 10300, 15.9: 11300, 21.2: 12300 },
    8: { 10.6: 11300, 15.9: 12300, 21.2: 13300 },
    9: { 10.6: 12300, 15.9: 13300, 21.2: 14300 },
  },
  premium: {
    6: { 12.9: 12700, 17.2: 14300, 21.4: 15200 },
    7: { 12.9: 13200, 17.2: 14800, 21.4: 15700 },
    8: { 12.9: 13800, 17.2: 15400, 21.4: 16300 },
    9: { 12.9: 14600, 17.2: 16200, 21.4: 17200 },
  },
}

// Opzioni kWh per linea
const KWH_OPTIONS: Record<string, number[]> = {
  smart: [10, 16, 20, 32],
  power: [10.6, 15.9, 21.2],
  premium: [12.9, 17.2, 21.4],
}

// Costo zavorre
const ZAVORRE_COSTO: Record<string, number> = {
  piano: 0,
  falde: 100,
  vento: 150,
}
const ZAVORRE_LABEL: Record<string, string> = {
  piano: "Tetto piano",
  falde: "Tetto a falde",
  vento: "Falde con vento forte",
}

// Tabella finanziamento Deutsche Bank Easy
const DB_TABLE: [number, number, number, number][] = [
  [1000,12,87,19.55],[1000,24,45,15.38],[1000,36,31,14.90],[1000,48,24,14.53],[1000,60,20,14.65],
  [2000,12,174,13.82],[2000,24,90,11.69],[2000,36,62,11.30],[2000,48,48,11.02],[2000,60,40,11.24],
  [3000,12,260,11.18],[3000,24,135,10.47],[3000,36,93,10.10],[3000,48,72,9.85],[3000,60,60,10.10],
  [4000,12,347,10.46],[4000,24,180,9.86],[4000,36,124,9.50],[4000,48,96,9.26],[4000,60,80,9.53],
  [5000,12,433,9.56],[5000,24,224,9.02],[5000,36,155,9.14],[5000,48,120,8.91],[5000,60,99,8.73],
  [6000,12,520,9.35],[6000,24,269,8.85],[6000,36,186,8.90],[6000,48,144,8.67],[6000,60,119,8.58],
  [6000,72,103,8.72],[6000,84,91,8.59],[6000,96,82,8.47],[6000,108,76,8.71],[6000,120,70,8.46],
  [7000,12,606,8.87],[7000,24,314,8.73],[7000,36,217,8.73],[7000,48,168,8.51],[7000,60,139,8.46],
  [7000,72,120,8.51],[7000,84,106,8.38],[7000,96,96,8.42],[7000,108,88,8.36],[7000,120,82,8.41],
  [8000,12,693,8.80],[8000,24,359,8.64],[8000,36,247,8.31],[8000,48,192,8.38],[8000,60,159,8.38],
  [8000,72,137,8.35],[8000,84,121,8.22],[8000,96,110,8.37],[8000,108,101,8.35],[8000,120,93,8.11],
  [9000,12,779,8.49],[9000,24,403,8.28],[9000,36,278,8.23],[9000,48,216,8.28],[9000,60,179,8.32],
  [9000,72,154,8.22],[9000,84,136,8.10],[9000,96,123,8.11],[9000,108,113,8.12],[9000,120,105,8.11],
  [10000,12,866,8.48],[10000,24,448,8.23],[10000,36,309,8.16],[10000,48,240,8.19],[10000,60,198,8.04],
  [10000,72,171,8.12],[10000,84,151,8.00],[10000,96,137,8.11],[10000,108,126,8.14],[10000,120,117,8.11],
  [11000,12,952,8.25],[11000,24,493,8.19],[11000,36,340,8.10],[11000,48,264,8.11],[11000,60,218,8.00],
  [11000,72,188,8.04],[11000,84,166,7.92],[11000,96,150,7.91],[11000,108,138,7.97],[11000,120,128,7.92],
  [12000,12,1039,8.26],[12000,24,538,8.15],[12000,36,371,8.05],[12000,48,288,8.05],[12000,60,238,7.97],
  [12000,72,205,7.96],[12000,84,182,8.03],[12000,96,164,7.93],[12000,108,151,8.00],[12000,120,140,7.94],
  [13000,12,1125,8.08],[13000,24,582,7.94],[13000,36,402,8.01],[13000,48,312,8.00],[13000,60,258,7.95],
  [13000,72,222,7.89],[13000,84,197,7.95],[13000,96,178,7.93],[13000,108,163,7.86],[13000,120,151,7.79],
  [14000,12,1212,8.10],[14000,24,627,7.93],[14000,36,433,7.98],[14000,48,336,7.95],[14000,60,278,7.93],
  [14000,72,239,7.84],[14000,84,212,7.88],[14000,96,191,7.78],[14000,108,176,7.89],[14000,120,163,7.81],
  [15000,12,1298,7.96],[15000,24,672,7.92],[15000,36,464,7.95],[15000,48,360,7.91],[15000,60,297,7.77],
  [15000,72,256,7.79],[15000,84,227,7.83],[15000,96,205,7.80],[15000,108,188,7.77],[15000,120,175,7.82],
  [16000,12,1385,7.99],[16000,24,717,7.91],[16000,36,494,7.77],[16000,48,384,7.88],[16000,60,317,7.76],
  [17000,12,1471,7.87],[17000,24,762,7.90],[17000,36,525,7.76],[17000,48,408,7.85],[17000,60,337,7.76],
  [18000,12,1558,7.89],[18000,24,806,7.76],[18000,36,556,7.74],[18000,48,431,7.69],[18000,60,357,7.75],
  [20000,12,1731,7.82],[20000,24,896,7.76],[20000,36,618,7.72],[20000,48,479,7.66],[20000,60,396,7.63],
  [25000,12,2164,7.74],[25000,24,1120,7.67],[25000,36,772,7.59],[25000,48,599,7.60],[25000,60,495,7.55],
  [30000,12,2596,7.60],[30000,24,1344,7.61],[30000,36,927,7.58],[30000,48,719,7.56],[30000,60,594,7.50],
  [35000,12,3029,7.58],[35000,24,1567,7.50],[35000,36,1081,7.50],[35000,48,838,7.46],[35000,60,693,7.46],
  [40000,12,3461,7.50],[40000,24,1791,7.47],[40000,36,1235,7.45],[40000,48,958,7.45],[40000,60,792,7.43],
  [50000,12,4327,7.48],[50000,24,2239,7.44],[50000,36,1544,7.41],[50000,48,1198,7.43],[50000,60,990,7.39],
  [55000,12,4759,7.43],[55000,24,2463,7.42],[55000,36,1698,7.38],[55000,48,1317,7.38],[55000,60,1089,7.38],
]

function lookupRataDB(importo: number, nRate: number): { rata: number; taeg: number } | null {
  const righe = DB_TABLE.filter(r => r[1] === nRate)
  if (righe.length === 0) return null
  righe.sort((a, b) => a[0] - b[0])
  const esatta = righe.find(r => r[0] === importo)
  if (esatta) return { rata: esatta[2], taeg: esatta[3] }
  const sotto = [...righe].reverse().find(r => r[0] <= importo)
  const sopra = righe.find(r => r[0] >= importo)
  if (!sotto && sopra) return { rata: sopra[2], taeg: sopra[3] }
  if (!sopra && sotto) return { rata: sotto[2], taeg: sotto[3] }
  if (sotto && sopra) {
    const t = (importo - sotto[0]) / (sopra[0] - sotto[0])
    const rata = Math.ceil(sotto[2] + t * (sopra[2] - sotto[2]))
    const taeg = +(sotto[3] + t * (sopra[3] - sotto[3])).toFixed(2)
    return { rata, taeg }
  }
  return null
}

const LINEE_LABEL: Record<string, string> = { smart: "Smart One", power: "Power Plus", premium: "Premium Top" }

function normalizzaTelefono(tel: string): string {
  let t = tel.replace(/\s/g, "").replace(/-/g, "")
  if (t.startsWith("00")) t = "+" + t.slice(2)
  if (!t.startsWith("+") && t.startsWith("3")) t = "+39" + t
  if (!t.startsWith("+")) t = "+39" + t
  return t
}

export default function ConfiguratorePage() {
  const [step, setStep] = useState(0)
  
  // State
  const [linea, setLinea] = useState<string | null>(null)
  const [kwp, setKwp] = useState<number | null>(null)
  const [kwh, setKwh] = useState<number | null>(null)
  const [prezzoBase, setPrezzoBase] = useState(0)
  const [tetto, setTetto] = useState<string | null>(null)
  const [extraZavorre, setExtraZavorre] = useState(0)
  const [prezzoTotale, setPrezzoTotale] = useState(0)
  const [pannello, setPannello] = useState<string | null>(null)
  
  // Form
  const [formData, setFormData] = useState({
    nome: "", cognome: "", email: "", telefono: "", cf: "", indirizzo: "", tipo: "", incentivo: "", note: ""
  })
  
  // Files
  const [files, setFiles] = useState<File[]>([])
  const [docRiconoscimento, setDocRiconoscimento] = useState<File[]>([])
  const fileInputRef = useRef<HTMLInputElement>(null)
  const docInputRef = useRef<HTMLInputElement>(null)
  const docAreaRef = useRef<HTMLDivElement>(null)
  const [docError, setDocError] = useState(false)
  
  // Pagamento
  const [pagamentoModalita, setPagamentoModalita] = useState<"bonifico" | "finanziamento" | null>(null)
  const [showFinPopup, setShowFinPopup] = useState(false)
  const [finAnticipo, setFinAnticipo] = useState(0)
  const [finNumRate, setFinNumRate] = useState(60)
  const [finRata, setFinRata] = useState(0)
  const [finTaeg, setFinTaeg] = useState(0)
  const [finConfermato, setFinConfermato] = useState(false)
  
  // Consensi
  const [cb1, setCb1] = useState(false)
  const [cb2, setCb2] = useState(false)
  const [cb3, setCb3] = useState(false)
  const [cb4, setCb4] = useState(false)
  
  // Submit
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [showConfirmation, setShowConfirmation] = useState(false)

  const goTo = (n: number) => {
    setStep(n)
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  // Step 1: Linea
  const scegliLinea = (l: string) => {
    setLinea(l)
    setKwp(null)
    setKwh(null)
    setPrezzoBase(0)
  }

  // Step 2: Taglia
  const kwpOptions = linea ? Object.keys(PREZZI[linea]).map(Number).sort((a, b) => a - b) : []
  const kwhOptions = linea ? KWH_OPTIONS[linea] : []

  const selectKwp = (k: number) => {
    setKwp(k)
    if (kwh && linea) {
      const prezzo = PREZZI[linea][k]?.[kwh]
      if (prezzo) {
        setPrezzoBase(prezzo)
        setPrezzoTotale(prezzo + extraZavorre)
      }
    }
  }

  const selectKwh = (k: number) => {
    setKwh(k)
    if (kwp && linea) {
      const prezzo = PREZZI[linea][kwp]?.[k]
      if (prezzo) {
        setPrezzoBase(prezzo)
        setPrezzoTotale(prezzo + extraZavorre)
      }
    }
  }

  // Step 3: Tetto
  const scegliTetto = (t: string) => {
    setTetto(t)
    const extra = ZAVORRE_COSTO[t] * (kwp || 0)
    setExtraZavorre(extra)
    setPrezzoTotale(prezzoBase + extra)
  }

  // Step 4: Pannelli
  const selectPannello = (p: string) => {
    setPannello(p)
  }

  // Files
  const handleFiles = (fileList: FileList | null) => {
    if (!fileList) return
    const newFiles = Array.from(fileList).filter(f => !files.find(x => x.name === f.name))
    setFiles(prev => [...prev, ...newFiles])
  }

  const handleDocRiconoscimento = (fileList: FileList | null) => {
    if (!fileList) return
    const newFiles = Array.from(fileList).filter(f => !docRiconoscimento.find(x => x.name === f.name))
    setDocRiconoscimento(prev => [...prev, ...newFiles])
    setDocError(false)
  }

  // Pagamento
  const scegliPagamento = (tipo: "bonifico" | "finanziamento") => {
    setPagamentoModalita(tipo)
    if (tipo === "finanziamento") {
      setShowFinPopup(true)
    }
  }

  const calcolaRataDB = () => {
    const capitale = Math.round(prezzoTotale - finAnticipo)
    if (capitale <= 0) return
    let importoLookup = capitale
    if (capitale <= 5000) importoLookup = Math.round(capitale / 100) * 100
    else if (capitale <= 10000) importoLookup = Math.round(capitale / 250) * 250
    else importoLookup = Math.round(capitale / 500) * 500
    const result = lookupRataDB(importoLookup, finNumRate) || lookupRataDB(importoLookup, 60)
    if (result) {
      setFinRata(result.rata)
      setFinTaeg(result.taeg)
    }
  }

  const confermaFinanziamento = () => {
    calcolaRataDB()
    setFinConfermato(true)
    setShowFinPopup(false)
  }

  // Riepilogo
  const goToRiepilogo = () => {
    if (docRiconoscimento.length === 0) {
      setDocError(true)
      docAreaRef.current?.scrollIntoView({ behavior: "smooth", block: "center" })
      return
    }
    goTo(5)
  }

  const allConsents = cb1 && cb2 && cb3 && cb4 && pagamentoModalita !== null
  
  // Submit
  const inviaRichiesta = async () => {
    setIsSubmitting(true)
    const now = new Date()
    const dataFormattata = now.toLocaleDateString("it-IT", { day: "2-digit", month: "2-digit", year: "numeric" })
    const numeroContratto = "SG-" + now.getFullYear() + "-" + String(now.getMonth() + 1).padStart(2, "0") + String(now.getDate()).padStart(2, "0") + "-" + String(now.getHours()).padStart(2, "0") + String(now.getMinutes()).padStart(2, "0")

    const payload = {
      numero_contratto: numeroContratto,
      data_contratto: dataFormattata,
      linea: LINEE_LABEL[linea || "smart"] || linea,
      potenza: kwp,
      accumulo_kwh: kwh,
      pannello,
      tipo_tetto: tetto ? ZAVORRE_LABEL[tetto] : "",
      extra_zavorre: extraZavorre,
      prezzo_base: prezzoBase,
      prezzo_totale: prezzoTotale,
      nome: formData.nome,
      cognome: formData.cognome,
      email: formData.email,
      telefono: normalizzaTelefono(formData.telefono),
      codice_fiscale: formData.cf,
      indirizzo: formData.indirizzo,
      tipo_immobile: formData.tipo,
      incentivo: formData.incentivo,
      note: formData.note,
      modalita_pagamento: pagamentoModalita === "finanziamento" ? "Finanziamento Deutsche Bank" : "Bonifico bancario",
      anticipo: pagamentoModalita === "finanziamento" ? finAnticipo : "",
      num_rate: pagamentoModalita === "finanziamento" ? finNumRate : "",
      rata_mensile: pagamentoModalita === "finanziamento" ? finRata : "",
      tan: pagamentoModalita === "finanziamento" ? 6.90 : "",
      taeg: pagamentoModalita === "finanziamento" ? finTaeg : "",
      num_documenti: files.length + docRiconoscimento.length,
      data_invio: now.toISOString(),
    }

    try {
      const res = await fetch(MAKE_WEBHOOK_URL, {
        method: "POST",
        body: JSON.stringify(payload),
      })
      if (res.ok || res.status === 200) {
        setShowConfirmation(true)
      }
    } catch {
      // Error handling
    } finally {
      setIsSubmitting(false)
    }
  }

  // Confirmation
  if (showConfirmation) {
    return (
      <div style={{ fontFamily: "'Outfit', sans-serif", background: "#f4f6f7", minHeight: "100vh" }}>
        <div style={{ maxWidth: 720, margin: "0 auto", padding: "32px 20px 80px" }}>
          <div style={{ background: "#fff", border: "1px solid #d0d6da", borderRadius: 14, padding: 32, textAlign: "center" }}>
            <div style={{ fontSize: 48, marginBottom: 16 }}>✅</div>
            <div style={{ fontSize: 22, fontWeight: 800, marginBottom: 8, color: "#1e3a5f" }}>Richiesta inviata!</div>
            <div style={{ color: "#4a6080", fontSize: 14, marginBottom: 24 }}>Abbiamo ricevuto la tua configurazione. Ecco cosa succede ora:</div>
            <div style={{ display: "flex", flexDirection: "column", gap: 8, marginBottom: 24 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 12, padding: "12px 16px", background: "#eaecee", borderRadius: 10, fontSize: 13, color: "#4a6080" }}>
                <span>📄</span> Stiamo generando la tua offerta in PDF
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: 12, padding: "12px 16px", background: "#eaecee", borderRadius: 10, fontSize: 13, color: "#4a6080" }}>
                <span>✍️</span> Riceverai un&apos;email con il link per la firma digitale
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: 12, padding: "12px 16px", background: "#eaecee", borderRadius: 10, fontSize: 13, color: "#4a6080" }}>
                <span>📞</span> Un consulente Solair ti contatterà entro 24 ore
              </div>
            </div>
            <a href="https://wa.me/393497988101" target="_blank" rel="noopener noreferrer" style={{ display: "inline-flex", alignItems: "center", gap: 8, background: "#2e8b72", color: "#fff", border: "none", padding: "13px 26px", borderRadius: 10, fontSize: 14, fontWeight: 700, textDecoration: "none" }}>
              💬 Contattaci su WhatsApp
            </a>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div style={{ fontFamily: "'Outfit', sans-serif", background: "#f4f6f7", minHeight: "100vh", color: "#1e3a5f" }}>
      {/* WhatsApp sticky */}
      <a href="https://wa.me/393497988101?text=Ciao%2C%20ho%20bisogno%20di%20aiuto%20con%20il%20configuratore" target="_blank" rel="noopener noreferrer" style={{ position: "fixed", bottom: 24, right: 20, zIndex: 200, background: "#25D366", color: "white", border: "none", borderRadius: 50, padding: "12px 18px", fontSize: 13, fontWeight: 700, display: "flex", alignItems: "center", gap: 8, boxShadow: "0 4px 20px rgba(37,211,102,0.4)", textDecoration: "none" }}>
        <svg width="18" height="18" viewBox="0 0 24 24" fill="white"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
        Parla con noi
      </a>

      {/* Hero */}
      <div style={{ padding: "40px 24px 48px", textAlign: "center", borderBottom: "1px solid #d0d6da", background: "#f4f6f7" }}>
        <div style={{ position: "relative", width: 180, height: 60, margin: "0 auto 16px" }}>
          <Image
            src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/WhatsApp_Image_2026-05-05_at_18.34.28-removebg-preview-rlWc3q38NGodyFUqcCA2TsRp7eyfiY.png"
            alt="Solair Group"
            fill
            style={{ objectFit: "contain" }}
            priority
          />
        </div>
        <h1 style={{ fontSize: "clamp(22px, 4vw, 36px)", fontWeight: 800, marginBottom: 8, color: "#1e3a5f" }}>
          Configura il tuo<br /><span style={{ color: "#2e8b72" }}>impianto fotovoltaico</span>
        </h1>
        <p style={{ color: "#4a6080", fontSize: 14 }}>Scegli la soluzione giusta e ricevi la tua offerta in pochi minuti</p>
      </div>

      {/* Trust bar */}
      <div style={{ display: "flex", justifyContent: "center", gap: 20, flexWrap: "wrap", padding: "12px 20px", background: "#fff", borderTop: "1px solid #d0d6da", borderBottom: "1px solid #d0d6da", marginBottom: 28 }}>
        <div style={{ fontSize: 12, color: "#4a6080", display: "flex", alignItems: "center", gap: 5, fontWeight: 600 }}>⭐ 99 recensioni Google</div>
        <div style={{ fontSize: 12, color: "#4a6080", display: "flex", alignItems: "center", gap: 5, fontWeight: 600 }}>✅ 98% clienti soddisfatti</div>
        <div style={{ fontSize: 12, color: "#4a6080", display: "flex", alignItems: "center", gap: 5, fontWeight: 600 }}>🔒 Garanzia fino a 25 anni</div>
      </div>

      {/* Progress bar */}
      <div style={{ background: "#eaecee", borderTop: "1px solid #d0d6da", borderBottom: "1px solid #d0d6da", position: "sticky", top: 0, zIndex: 100 }}>
        <div style={{ display: "flex", maxWidth: 720, margin: "0 auto", overflowX: "auto" }}>
          {["Linea", "Taglia", "Tetto", "Pannelli", "Dati", "Riepilogo"].map((label, i) => (
            <button
              key={i}
              onClick={() => i <= step && goTo(i)}
              style={{
                flex: 1,
                padding: "14px 8px",
                fontSize: 12,
                fontWeight: 600,
                color: i === step ? "#1e3a5f" : i < step ? "#2e8b72" : "#8a9aaa",
                cursor: i <= step ? "pointer" : "default",
                borderBottom: i === step ? "2px solid #1e3a5f" : "2px solid transparent",
                background: "none",
                border: "none",
                borderTop: "none",
                borderLeft: "none",
                borderRight: "none",
                fontFamily: "'Outfit', sans-serif",
                minWidth: 80,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: 6,
                whiteSpace: "nowrap",
              }}
            >
              <span style={{
                width: 20,
                height: 20,
                borderRadius: "50%",
                background: i === step ? "#1e3a5f" : i < step ? "rgba(46,139,114,0.1)" : "#eef1f4",
                border: i === step ? "1px solid #1e3a5f" : i < step ? "1px solid rgba(46,139,114,0.3)" : "1px solid #d0d6da",
                color: i === step ? "#fff" : i < step ? "#2e8b72" : "#8a9aaa",
                fontSize: 10,
                fontWeight: 700,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}>
                {i + 1}
              </span>
              {label}
            </button>
          ))}
        </div>
      </div>

      <div style={{ maxWidth: 720, margin: "0 auto", padding: "32px 20px 80px" }}>
        
        {/* Step 0: Linea */}
        {step === 0 && (
          <div>
            <h2 style={{ fontSize: 22, fontWeight: 700, marginBottom: 4, color: "#1e3a5f" }}>Scegli la tua linea</h2>
            <p style={{ color: "#4a6080", fontSize: 13, marginBottom: 24 }}>Tre linee con tecnologie diverse. La linea determina batteria e inverter inclusi nel prezzo.</p>

            <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 10, marginBottom: 24 }}>
              {/* Smart */}
              <div
                onClick={() => scegliLinea("smart")}
                style={{
                  border: linea === "smart" ? "2px solid #1e3a5f" : "2px solid #d0d6da",
                  borderRadius: 14,
                  padding: "20px 16px",
                  cursor: "pointer",
                  background: linea === "smart" ? "rgba(30,58,95,0.08)" : "#fff",
                  position: "relative",
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", color: "#8a9aaa", marginBottom: 6 }}>Linea Base</div>
                <div style={{ fontSize: 18, fontWeight: 800, color: "#1e3a5f", marginBottom: 4 }}>Smart One</div>
                <div style={{ fontSize: 11, color: "#4a6080", marginBottom: 12 }}>Solis + V-TAC LiFePo</div>
                <ul style={{ listStyle: "none", padding: 0, margin: 0, flex: 1 }}>
                  {["Inverter Solis monofase", "Batteria bassa tensione", "10 anni di garanzia", "Monitoraggio remoto", "Ingresso CER Solair"].map((f, i) => (
                    <li key={i} style={{ fontSize: 11, color: "#4a6080", padding: "4px 0", borderBottom: i < 4 ? "1px solid #d0d6da" : "none", display: "flex", alignItems: "center", gap: 6 }}>
                      <span style={{ color: "#2e8b72", fontWeight: 700 }}>✓</span> {f}
                    </li>
                  ))}
                </ul>
                <div style={{ display: "flex", flexWrap: "wrap", gap: 4, marginTop: 10 }}>
                  <span style={{ fontSize: 10, padding: "2px 8px", borderRadius: 6, background: "#eef1f4", color: "#4a6080", fontWeight: 600 }}>IP20</span>
                  <span style={{ fontSize: 10, padding: "2px 8px", borderRadius: 6, background: "#eef1f4", color: "#4a6080", fontWeight: 600 }}>10 anni</span>
                  <span style={{ fontSize: 10, padding: "2px 8px", borderRadius: 6, background: "rgba(239,68,68,0.1)", color: "#ef4444", fontWeight: 600 }}>EPS escluso</span>
                </div>
              </div>

              {/* Power */}
              <div
                onClick={() => scegliLinea("power")}
                style={{
                  border: linea === "power" ? "2px solid #1e3a5f" : "2px solid #2e8b72",
                  borderRadius: 14,
                  padding: "20px 16px",
                  cursor: "pointer",
                  background: linea === "power" ? "rgba(46,139,114,0.1)" : "#fff",
                  position: "relative",
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                <div style={{ position: "absolute", top: -10, left: "50%", transform: "translateX(-50%)", background: "#2e8b72", color: "white", fontSize: 9, fontWeight: 800, letterSpacing: "0.1em", textTransform: "uppercase", padding: "3px 10px", borderRadius: 10, whiteSpace: "nowrap" }}>Più scelto</div>
                <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", color: "#8a9aaa", marginBottom: 6 }}>Linea Intermedia</div>
                <div style={{ fontSize: 18, fontWeight: 800, color: "#1e3a5f", marginBottom: 4 }}>Power Plus</div>
                <div style={{ fontSize: 11, color: "#4a6080", marginBottom: 12 }}>Sineng + Sineng HV</div>
                <ul style={{ listStyle: "none", padding: 0, margin: 0, flex: 1 }}>
                  {["Inverter Sineng ibrido", "Batteria alta tensione", "12 anni di garanzia", "EPS anti-blackout incluso", "Ingresso CER Solair"].map((f, i) => (
                    <li key={i} style={{ fontSize: 11, color: "#4a6080", padding: "4px 0", borderBottom: i < 4 ? "1px solid #d0d6da" : "none", display: "flex", alignItems: "center", gap: 6 }}>
                      <span style={{ color: "#2e8b72", fontWeight: 700 }}>✓</span> {f}
                    </li>
                  ))}
                </ul>
                <div style={{ display: "flex", flexWrap: "wrap", gap: 4, marginTop: 10 }}>
                  <span style={{ fontSize: 10, padding: "2px 8px", borderRadius: 6, background: "#eef1f4", color: "#4a6080", fontWeight: 600 }}>IP65</span>
                  <span style={{ fontSize: 10, padding: "2px 8px", borderRadius: 6, background: "#eef1f4", color: "#4a6080", fontWeight: 600 }}>12 anni</span>
                  <span style={{ fontSize: 10, padding: "2px 8px", borderRadius: 6, background: "rgba(46,139,114,0.1)", color: "#2e8b72", fontWeight: 600 }}>EPS incluso</span>
                </div>
              </div>

              {/* Premium */}
              <div
                onClick={() => scegliLinea("premium")}
                style={{
                  border: linea === "premium" ? "2px solid #1e3a5f" : "2px solid #d0d6da",
                  borderRadius: 14,
                  padding: "20px 16px",
                  cursor: "pointer",
                  background: linea === "premium" ? "rgba(30,58,95,0.08)" : "#fff",
                  position: "relative",
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", color: "#8a9aaa", marginBottom: 6 }}>Linea Premium</div>
                <div style={{ fontSize: 18, fontWeight: 800, color: "#1e3a5f", marginBottom: 4 }}>Premium Top</div>
                <div style={{ fontSize: 11, color: "#4a6080", marginBottom: 12 }}>BYD Power-Box HVE</div>
                <ul style={{ listStyle: "none", padding: 0, margin: 0, flex: 1 }}>
                  {["Inverter BYD ibrido", "BYD Battery-Box HVE", "15 anni di garanzia", "80% capacità al 10° anno", "EPS anti-blackout incluso", "Ingresso CER Solair"].map((f, i) => (
                    <li key={i} style={{ fontSize: 11, color: "#4a6080", padding: "4px 0", borderBottom: i < 5 ? "1px solid #d0d6da" : "none", display: "flex", alignItems: "center", gap: 6 }}>
                      <span style={{ color: "#2e8b72", fontWeight: 700 }}>✓</span> {f}
                    </li>
                  ))}
                </ul>
                <div style={{ display: "flex", flexWrap: "wrap", gap: 4, marginTop: 10 }}>
                  <span style={{ fontSize: 10, padding: "2px 8px", borderRadius: 6, background: "#eef1f4", color: "#4a6080", fontWeight: 600 }}>IP65</span>
                  <span style={{ fontSize: 10, padding: "2px 8px", borderRadius: 6, background: "#eef1f4", color: "#4a6080", fontWeight: 600 }}>15 anni</span>
                  <span style={{ fontSize: 10, padding: "2px 8px", borderRadius: 6, background: "rgba(46,139,114,0.1)", color: "#2e8b72", fontWeight: 600 }}>EPS incluso</span>
                </div>
              </div>
            </div>

            <div style={{ display: "flex", gap: 12, marginTop: 28 }}>
              <button onClick={() => goTo(1)} disabled={!linea} style={{ display: "inline-flex", alignItems: "center", gap: 8, background: linea ? "#1e3a5f" : "rgba(30,58,95,0.4)", color: "#fff", border: "none", padding: "13px 26px", borderRadius: 10, fontSize: 14, fontWeight: 700, cursor: linea ? "pointer" : "not-allowed", fontFamily: "'Outfit', sans-serif" }}>
                Avanti → Taglia
              </button>
            </div>
          </div>
        )}

        {/* Step 1: Taglia */}
        {step === 1 && (
          <div>
            <h2 style={{ fontSize: 22, fontWeight: 700, marginBottom: 4, color: "#1e3a5f" }}>Scegli la taglia</h2>
            <p style={{ color: "#4a6080", fontSize: 13, marginBottom: 24 }}>Seleziona potenza e capacità batteria disponibili per la tua linea.</p>

            <div style={{ marginBottom: 28 }}>
              <div style={{ fontSize: 13, fontWeight: 700, color: "#1e3a5f", marginBottom: 10 }}>Potenza pannelli (kWp)</div>
              <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
                {kwpOptions.map(k => (
                  <button key={k} onClick={() => selectKwp(k)} style={{ padding: "10px 18px", border: kwp === k ? "2px solid #1e3a5f" : "2px solid #d0d6da", borderRadius: 10, background: kwp === k ? "rgba(30,58,95,0.08)" : "#fff", fontSize: 14, fontWeight: 700, color: kwp === k ? "#1e3a5f" : "#8a9aaa", cursor: "pointer", fontFamily: "'Outfit', sans-serif" }}>
                    {k} kWp
                  </button>
                ))}
              </div>
            </div>

            <div style={{ marginBottom: 28 }}>
              <div style={{ fontSize: 13, fontWeight: 700, color: "#1e3a5f", marginBottom: 10 }}>Capacità batteria (kWh)</div>
              <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
                {kwhOptions.map(k => (
                  <button key={k} onClick={() => selectKwh(k)} style={{ padding: "10px 18px", border: kwh === k ? "2px solid #1e3a5f" : "2px solid #d0d6da", borderRadius: 10, background: kwh === k ? "rgba(30,58,95,0.08)" : "#fff", fontSize: 14, fontWeight: 700, color: kwh === k ? "#1e3a5f" : "#8a9aaa", cursor: "pointer", fontFamily: "'Outfit', sans-serif" }}>
                    {k} kWh
                  </button>
                ))}
              </div>
            </div>

            {kwp && kwh && prezzoBase > 0 && (
              <div style={{ background: "rgba(30,58,95,0.08)", border: "2px solid rgba(30,58,95,0.25)", borderRadius: 14, padding: "20px 24px", marginBottom: 20, display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: 12 }}>
                <div>
                  <div style={{ fontSize: 13, color: "#4a6080" }}>Prezzo base impianto</div>
                  <div style={{ fontSize: 30, fontWeight: 800, color: "#1e3a5f" }}>€ {prezzoBase.toLocaleString("it-IT")}</div>
                  <div style={{ fontSize: 12, color: "#4a6080", marginTop: 2 }}>IVA inclusa · chiavi in mano</div>
                </div>
                <div style={{ textAlign: "right" }}>
                  <div style={{ fontSize: 11, color: "#8a9aaa", fontStyle: "italic" }}>* Zavorre non incluse.<br />Configurabili nel passo successivo.</div>
                </div>
              </div>
            )}

            <div style={{ display: "flex", gap: 12, marginTop: 28 }}>
              <button onClick={() => goTo(0)} style={{ display: "inline-flex", alignItems: "center", gap: 8, background: "transparent", color: "#1e3a5f", border: "1px solid rgba(30,58,95,0.25)", padding: "12px 22px", borderRadius: 10, fontSize: 14, fontWeight: 600, cursor: "pointer", fontFamily: "'Outfit', sans-serif" }}>
                ← Indietro
              </button>
              <button onClick={() => goTo(2)} disabled={!kwp || !kwh || prezzoBase === 0} style={{ display: "inline-flex", alignItems: "center", gap: 8, background: kwp && kwh && prezzoBase > 0 ? "#1e3a5f" : "rgba(30,58,95,0.4)", color: "#fff", border: "none", padding: "13px 26px", borderRadius: 10, fontSize: 14, fontWeight: 700, cursor: kwp && kwh && prezzoBase > 0 ? "pointer" : "not-allowed", fontFamily: "'Outfit', sans-serif" }}>
                Avanti → Tipo tetto
              </button>
            </div>
          </div>
        )}

        {/* Step 2: Tetto */}
        {step === 2 && (
          <div>
            <h2 style={{ fontSize: 22, fontWeight: 700, marginBottom: 4, color: "#1e3a5f" }}>Tipo di tetto</h2>
            <p style={{ color: "#4a6080", fontSize: 13, marginBottom: 24 }}>Il tipo di copertura determina il sistema di ancoraggio necessario.</p>

            <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 10, marginBottom: 24 }}>
              {[
                { id: "piano", icon: "🏠", label: "Tetto piano", sub: "Nessun extra" },
                { id: "falde", icon: "🏡", label: "Tetto a falde", sub: "+€100/kWp zavorre" },
                { id: "vento", icon: "💨", label: "Falde + vento forte", sub: "+€150/kWp zavorre vela" },
              ].map(t => (
                <div key={t.id} onClick={() => scegliTetto(t.id)} style={{ border: tetto === t.id ? "2px solid #1e3a5f" : "2px solid #d0d6da", borderRadius: 12, padding: "18px 14px", cursor: "pointer", background: tetto === t.id ? "rgba(30,58,95,0.08)" : "#fff", textAlign: "center" }}>
                  <div style={{ fontSize: 28, marginBottom: 8 }}>{t.icon}</div>
                  <div style={{ fontSize: 14, fontWeight: 700, color: "#1e3a5f", marginBottom: 3 }}>{t.label}</div>
                  <div style={{ fontSize: 11, color: "#4a6080" }}>{t.sub}</div>
                </div>
              ))}
            </div>

            {tetto && (
              <div style={{ background: "#fff", border: "1px solid #d0d6da", borderRadius: 14, overflow: "hidden", marginBottom: 20 }}>
                <div style={{ padding: "12px 18px", background: "#eef1f4", fontSize: 11, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.08em", color: "#4a6080" }}>Riepilogo prezzo con zavorre</div>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "12px 18px", borderBottom: "1px solid #d0d6da", fontSize: 13 }}>
                  <span style={{ color: "#4a6080" }}>Prezzo impianto</span>
                  <span style={{ fontWeight: 700, color: "#1e3a5f" }}>€ {prezzoBase.toLocaleString("it-IT")}</span>
                </div>
                {extraZavorre > 0 && (
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "12px 18px", borderBottom: "1px solid #d0d6da", fontSize: 13 }}>
                    <span style={{ color: "#4a6080" }}>Zavorre ({kwp} kWp × {ZAVORRE_COSTO[tetto]} €)</span>
                    <span style={{ fontWeight: 700, color: "#1e3a5f" }}>+ € {extraZavorre.toLocaleString("it-IT")}</span>
                  </div>
                )}
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "12px 18px", background: "rgba(30,58,95,0.08)", fontSize: 13 }}>
                  <span style={{ fontWeight: 700, color: "#1e3a5f" }}>Totale</span>
                  <span style={{ color: "#1e3a5f", fontSize: 16, fontWeight: 800 }}>€ {prezzoTotale.toLocaleString("it-IT")}</span>
                </div>
              </div>
            )}

            <div style={{ display: "flex", gap: 12, marginTop: 28 }}>
              <button onClick={() => goTo(1)} style={{ display: "inline-flex", alignItems: "center", gap: 8, background: "transparent", color: "#1e3a5f", border: "1px solid rgba(30,58,95,0.25)", padding: "12px 22px", borderRadius: 10, fontSize: 14, fontWeight: 600, cursor: "pointer", fontFamily: "'Outfit', sans-serif" }}>
                ← Indietro
              </button>
              <button onClick={() => goTo(3)} disabled={!tetto} style={{ display: "inline-flex", alignItems: "center", gap: 8, background: tetto ? "#1e3a5f" : "rgba(30,58,95,0.4)", color: "#fff", border: "none", padding: "13px 26px", borderRadius: 10, fontSize: 14, fontWeight: 700, cursor: tetto ? "pointer" : "not-allowed", fontFamily: "'Outfit', sans-serif" }}>
                Avanti → Pannelli
              </button>
            </div>
          </div>
        )}

        {/* Step 3: Pannelli */}
        {step === 3 && (
          <div>
            <h2 style={{ fontSize: 22, fontWeight: 700, marginBottom: 4, color: "#1e3a5f" }}>Scegli i pannelli</h2>
            <p style={{ color: "#4a6080", fontSize: 13, marginBottom: 24 }}>La scelta del pannello non modifica il prezzo. Tutti sono top brand Tier 1.</p>

            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(155px, 1fr))", gap: 10, marginBottom: 24 }}>
              {[
                { id: "longi", brand: "LONGi Solar", model: "Hi-MO X10 Explorer", eff: "23,9% efficienza · BC-Cell", tag: "30 anni garanzia" },
                { id: "trina", brand: "Trina Solar", model: "Vertex S+ N-type TOPCon", eff: "22,7% efficienza", tag: "25 anni garanzia" },
                { id: "qcells", brand: "Qcells", model: "Q.TRON Classic G3R", eff: "22,5% efficienza · N-type", tag: "30 anni garanzia" },
                { id: "astronergy", brand: "Astronergy", model: "ASTRO N7s Bifacciale", eff: "23,2% efficienza · TOPCon", tag: "30 anni garanzia" },
              ].map(p => (
                <div key={p.id} onClick={() => selectPannello(`${p.brand} ${p.model}`)} style={{ border: pannello === `${p.brand} ${p.model}` ? "2px solid #1e3a5f" : "2px solid #d0d6da", borderRadius: 12, padding: 16, cursor: "pointer", background: pannello === `${p.brand} ${p.model}` ? "rgba(30,58,95,0.08)" : "#fff" }}>
                  <div style={{ fontSize: 13, fontWeight: 700, marginBottom: 4, color: "#1e3a5f" }}>{p.brand}</div>
                  <div style={{ fontSize: 11, color: "#4a6080", marginBottom: 4 }}>{p.model}</div>
                  <div style={{ fontSize: 11, color: "#2e8b72", fontWeight: 600, marginBottom: 6 }}>{p.eff}</div>
                  <span style={{ display: "inline-block", fontSize: 10, fontWeight: 600, padding: "2px 8px", borderRadius: 6, background: "#eef1f4", color: "#4a6080" }}>{p.tag}</span>
                </div>
              ))}
            </div>

            <div style={{ background: "rgba(30,58,95,0.08)", border: "1px solid rgba(30,58,95,0.25)", borderRadius: 10, padding: "12px 16px", fontSize: 13, color: "#4a6080", marginBottom: 20, display: "flex", gap: 10 }}>
              💡 Modello a scelta senza variazione di prezzo. In caso di indisponibilità, forniamo il modello equivalente della stessa categoria.
            </div>

            <div style={{ display: "flex", gap: 12, marginTop: 28 }}>
              <button onClick={() => goTo(2)} style={{ display: "inline-flex", alignItems: "center", gap: 8, background: "transparent", color: "#1e3a5f", border: "1px solid rgba(30,58,95,0.25)", padding: "12px 22px", borderRadius: 10, fontSize: 14, fontWeight: 600, cursor: "pointer", fontFamily: "'Outfit', sans-serif" }}>
                ← Indietro
              </button>
              <button onClick={() => goTo(4)} disabled={!pannello} style={{ display: "inline-flex", alignItems: "center", gap: 8, background: pannello ? "#1e3a5f" : "rgba(30,58,95,0.4)", color: "#fff", border: "none", padding: "13px 26px", borderRadius: 10, fontSize: 14, fontWeight: 700, cursor: pannello ? "pointer" : "not-allowed", fontFamily: "'Outfit', sans-serif" }}>
                Avanti → I tuoi dati
              </button>
            </div>
          </div>
        )}

        {/* Step 4: Dati cliente */}
        {step === 4 && (
          <div>
            <h2 style={{ fontSize: 22, fontWeight: 700, marginBottom: 4, color: "#1e3a5f" }}>I tuoi dati</h2>
            <p style={{ color: "#4a6080", fontSize: 13, marginBottom: 24 }}>Compila il modulo per ricevere la tua offerta personalizzata.</p>

            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, marginBottom: 20 }}>
              <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
                <label style={{ fontSize: 12, fontWeight: 600, color: "#4a6080" }}>Nome *</label>
                <input type="text" value={formData.nome} onChange={e => setFormData({ ...formData, nome: e.target.value })} placeholder="Mario" style={{ background: "#fff", border: "1px solid #d0d6da", borderRadius: 10, padding: "11px 14px", fontSize: 14, fontFamily: "'Outfit', sans-serif", color: "#1e3a5f", outline: "none" }} />
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
                <label style={{ fontSize: 12, fontWeight: 600, color: "#4a6080" }}>Cognome *</label>
                <input type="text" value={formData.cognome} onChange={e => setFormData({ ...formData, cognome: e.target.value })} placeholder="Rossi" style={{ background: "#fff", border: "1px solid #d0d6da", borderRadius: 10, padding: "11px 14px", fontSize: 14, fontFamily: "'Outfit', sans-serif", color: "#1e3a5f", outline: "none" }} />
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: 6, gridColumn: "1 / -1" }}>
                <label style={{ fontSize: 12, fontWeight: 600, color: "#4a6080" }}>Email *</label>
                <input type="email" value={formData.email} onChange={e => setFormData({ ...formData, email: e.target.value })} placeholder="mario.rossi@email.it" style={{ background: "#fff", border: "1px solid #d0d6da", borderRadius: 10, padding: "11px 14px", fontSize: 14, fontFamily: "'Outfit', sans-serif", color: "#1e3a5f", outline: "none" }} />
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
                <label style={{ fontSize: 12, fontWeight: 600, color: "#4a6080" }}>Telefono *</label>
                <input type="tel" value={formData.telefono} onChange={e => setFormData({ ...formData, telefono: e.target.value })} placeholder="+39 333 000 0000" style={{ background: "#fff", border: "1px solid #d0d6da", borderRadius: 10, padding: "11px 14px", fontSize: 14, fontFamily: "'Outfit', sans-serif", color: "#1e3a5f", outline: "none" }} />
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
                <label style={{ fontSize: 12, fontWeight: 600, color: "#4a6080" }}>Codice Fiscale</label>
                <input type="text" value={formData.cf} onChange={e => setFormData({ ...formData, cf: e.target.value })} placeholder="RSSMRA80A01H501Z" style={{ background: "#fff", border: "1px solid #d0d6da", borderRadius: 10, padding: "11px 14px", fontSize: 14, fontFamily: "'Outfit', sans-serif", color: "#1e3a5f", outline: "none" }} />
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: 6, gridColumn: "1 / -1" }}>
                <label style={{ fontSize: 12, fontWeight: 600, color: "#4a6080" }}>Indirizzo installazione *</label>
                <input type="text" value={formData.indirizzo} onChange={e => setFormData({ ...formData, indirizzo: e.target.value })} placeholder="Via Roma 1, 00100 Roma (RM)" style={{ background: "#fff", border: "1px solid #d0d6da", borderRadius: 10, padding: "11px 14px", fontSize: 14, fontFamily: "'Outfit', sans-serif", color: "#1e3a5f", outline: "none" }} />
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
                <label style={{ fontSize: 12, fontWeight: 600, color: "#4a6080" }}>Tipo immobile</label>
                <select value={formData.tipo} onChange={e => setFormData({ ...formData, tipo: e.target.value })} style={{ background: "#fff", border: "1px solid #d0d6da", borderRadius: 10, padding: "11px 14px", fontSize: 14, fontFamily: "'Outfit', sans-serif", color: "#1e3a5f", outline: "none" }}>
                  <option value="">Seleziona...</option>
                  <option>Villetta</option>
                  <option>Appartamento</option>
                  <option>Bifamiliare</option>
                  <option>Capannone</option>
                  <option>Altro</option>
                </select>
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
                <label style={{ fontSize: 12, fontWeight: 600, color: "#4a6080" }}>Incentivo richiesto</label>
                <select value={formData.incentivo} onChange={e => setFormData({ ...formData, incentivo: e.target.value })} style={{ background: "#fff", border: "1px solid #d0d6da", borderRadius: 10, padding: "11px 14px", fontSize: 14, fontFamily: "'Outfit', sans-serif", color: "#1e3a5f", outline: "none" }}>
                  <option value="">Seleziona...</option>
                  <option>Detrazione 50%</option>
                  <option>PNRR 40%</option>
                  <option>Nessuno</option>
                </select>
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: 6, gridColumn: "1 / -1" }}>
                <label style={{ fontSize: 12, fontWeight: 600, color: "#4a6080" }}>Note aggiuntive</label>
                <textarea value={formData.note} onChange={e => setFormData({ ...formData, note: e.target.value })} rows={3} placeholder="Informazioni aggiuntive..." style={{ background: "#fff", border: "1px solid #d0d6da", borderRadius: 10, padding: "11px 14px", fontSize: 14, fontFamily: "'Outfit', sans-serif", color: "#1e3a5f", outline: "none", resize: "vertical" }} />
              </div>
            </div>

            <hr style={{ border: "none", borderTop: "1px solid #d0d6da", margin: "20px 0" }} />
            <div style={{ fontSize: 13, fontWeight: 600, marginBottom: 6 }}>🪪 Documento di riconoscimento *</div>
            <div style={{ background: "rgba(239,68,68,0.05)", border: "1px solid rgba(239,68,68,0.3)", borderRadius: 10, padding: "12px 16px", fontSize: 13, color: "#4a6080", marginBottom: 16, display: "flex", gap: 10 }}>
              ⚠️ Obbligatorio. Carica fronte e retro della carta d&apos;identità o passaporto.
            </div>
            <div ref={docAreaRef} onClick={() => docInputRef.current?.click()} style={{ border: docError ? "2px dashed rgba(239,68,68,0.6)" : docRiconoscimento.length > 0 ? "2px dashed #1e3a5f" : "2px dashed #d0d6da", borderRadius: 12, padding: 24, textAlign: "center", cursor: "pointer", marginBottom: 16, background: docError ? "rgba(239,68,68,0.05)" : docRiconoscimento.length > 0 ? "rgba(30,58,95,0.08)" : "#fff" }}>
              <div style={{ fontSize: 28, marginBottom: 6 }}>🪪</div>
              <div style={{ fontSize: 14, fontWeight: 600, marginBottom: 3 }}>Carica documento di riconoscimento</div>
              <div style={{ fontSize: 12, color: "#4a6080" }}>JPG, PNG, PDF — fronte e retro</div>
              <input ref={docInputRef} type="file" multiple accept=".pdf,.jpg,.jpeg,.png" onChange={e => handleDocRiconoscimento(e.target.files)} style={{ display: "none" }} />
            </div>
            {docRiconoscimento.length > 0 && (
              <div style={{ display: "flex", flexDirection: "column", gap: 8, marginBottom: 16 }}>
                {docRiconoscimento.map((f, i) => (
                  <div key={i} style={{ display: "flex", alignItems: "center", gap: 10, padding: "10px 14px", background: "#fff", border: "1px solid #d0d6da", borderRadius: 8, fontSize: 13 }}>
                    <span>🪪</span>
                    <span style={{ flex: 1, color: "#4a6080" }}>{f.name}</span>
                    <span onClick={() => setDocRiconoscimento(prev => prev.filter((_, idx) => idx !== i))} style={{ color: "#8a9aaa", cursor: "pointer", fontSize: 16 }}>✕</span>
                  </div>
                ))}
              </div>
            )}

            <hr style={{ border: "none", borderTop: "1px solid #d0d6da", margin: "20px 0" }} />
            <div style={{ fontSize: 13, fontWeight: 600, marginBottom: 12 }}>📎 Documenti aggiuntivi (opzionale)</div>
            <div style={{ background: "rgba(30,58,95,0.08)", border: "1px solid rgba(30,58,95,0.25)", borderRadius: 10, padding: "12px 16px", fontSize: 13, color: "#4a6080", marginBottom: 16, display: "flex", gap: 10 }}>
              💡 Puoi allegare planimetria, visura catastale o copia bolletta.
            </div>
            <div onClick={() => fileInputRef.current?.click()} style={{ border: "2px dashed #d0d6da", borderRadius: 12, padding: 24, textAlign: "center", cursor: "pointer", marginBottom: 16, background: "#fff" }}>
              <div style={{ fontSize: 28, marginBottom: 6 }}>📁</div>
              <div style={{ fontSize: 14, fontWeight: 600, marginBottom: 3 }}>Carica documenti</div>
              <div style={{ fontSize: 12, color: "#4a6080" }}>PDF, JPG, PNG — max 10MB per file</div>
              <input ref={fileInputRef} type="file" multiple accept=".pdf,.jpg,.jpeg,.png" onChange={e => handleFiles(e.target.files)} style={{ display: "none" }} />
            </div>
            {files.length > 0 && (
              <div style={{ display: "flex", flexDirection: "column", gap: 8, marginBottom: 16 }}>
                {files.map((f, i) => (
                  <div key={i} style={{ display: "flex", alignItems: "center", gap: 10, padding: "10px 14px", background: "#fff", border: "1px solid #d0d6da", borderRadius: 8, fontSize: 13 }}>
                    <span>📄</span>
                    <span style={{ flex: 1, color: "#4a6080" }}>{f.name}</span>
                    <span onClick={() => setFiles(prev => prev.filter((_, idx) => idx !== i))} style={{ color: "#8a9aaa", cursor: "pointer", fontSize: 16 }}>✕</span>
                  </div>
                ))}
              </div>
            )}

            <div style={{ display: "flex", gap: 12, marginTop: 28 }}>
              <button onClick={() => goTo(3)} style={{ display: "inline-flex", alignItems: "center", gap: 8, background: "transparent", color: "#1e3a5f", border: "1px solid rgba(30,58,95,0.25)", padding: "12px 22px", borderRadius: 10, fontSize: 14, fontWeight: 600, cursor: "pointer", fontFamily: "'Outfit', sans-serif" }}>
                ← Indietro
              </button>
              <button onClick={goToRiepilogo} style={{ display: "inline-flex", alignItems: "center", gap: 8, background: "#1e3a5f", color: "#fff", border: "none", padding: "13px 26px", borderRadius: 10, fontSize: 14, fontWeight: 700, cursor: "pointer", fontFamily: "'Outfit', sans-serif" }}>
                Vedi riepilogo →
              </button>
            </div>
          </div>
        )}

        {/* Step 5: Riepilogo */}
        {step === 5 && (
          <div>
            <h2 style={{ fontSize: 22, fontWeight: 700, marginBottom: 4, color: "#1e3a5f" }}>Riepilogo offerta</h2>
            <p style={{ color: "#4a6080", fontSize: 13, marginBottom: 24 }}>Verifica i dati prima di inviare la richiesta.</p>

            <div style={{ background: "#fff", border: "1px solid #d0d6da", borderRadius: 14, overflow: "hidden", marginBottom: 16 }}>
              <div style={{ padding: "12px 18px", background: "#eef1f4", fontSize: 11, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.08em", color: "#4a6080" }}>Configurazione</div>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "12px 18px", borderBottom: "1px solid #d0d6da", fontSize: 13 }}>
                <span style={{ color: "#4a6080" }}>Linea commerciale</span>
                <span style={{ fontWeight: 700, color: "#1e3a5f" }}>{linea ? LINEE_LABEL[linea] : "–"}</span>
              </div>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "12px 18px", borderBottom: "1px solid #d0d6da", fontSize: 13 }}>
                <span style={{ color: "#4a6080" }}>Potenza</span>
                <span style={{ fontWeight: 700, color: "#1e3a5f" }}>{kwp} kWp</span>
              </div>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "12px 18px", borderBottom: "1px solid #d0d6da", fontSize: 13 }}>
                <span style={{ color: "#4a6080" }}>Accumulo</span>
                <span style={{ fontWeight: 700, color: "#1e3a5f" }}>{kwh} kWh</span>
              </div>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "12px 18px", borderBottom: "1px solid #d0d6da", fontSize: 13 }}>
                <span style={{ color: "#4a6080" }}>Pannelli</span>
                <span style={{ fontWeight: 700, color: "#1e3a5f" }}>{pannello || "–"}</span>
              </div>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "12px 18px", borderBottom: "1px solid #d0d6da", fontSize: 13 }}>
                <span style={{ color: "#4a6080" }}>Tipo tetto</span>
                <span style={{ fontWeight: 700, color: "#1e3a5f" }}>{tetto ? ZAVORRE_LABEL[tetto] : "–"}</span>
              </div>
              {extraZavorre > 0 && (
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "12px 18px", borderBottom: "1px solid #d0d6da", fontSize: 13 }}>
                  <span style={{ color: "#4a6080" }}>Extra zavorre</span>
                  <span style={{ fontWeight: 700, color: "#1e3a5f" }}>+ € {extraZavorre.toLocaleString("it-IT")}</span>
                </div>
              )}
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "12px 18px", background: "rgba(30,58,95,0.08)", fontSize: 13 }}>
                <span style={{ fontWeight: 700, fontSize: 14, color: "#1e3a5f" }}>Prezzo totale</span>
                <span style={{ color: "#1e3a5f", fontSize: 18, fontWeight: 800 }}>€ {prezzoTotale.toLocaleString("it-IT")}</span>
              </div>
            </div>

            <div style={{ background: "#fff", border: "1px solid #d0d6da", borderRadius: 14, overflow: "hidden", marginBottom: 16 }}>
              <div style={{ padding: "12px 18px", background: "#eef1f4", fontSize: 11, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.08em", color: "#4a6080" }}>Dati cliente</div>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "12px 18px", borderBottom: "1px solid #d0d6da", fontSize: 13 }}>
                <span style={{ color: "#4a6080" }}>Nome</span>
                <span style={{ fontWeight: 700, color: "#1e3a5f" }}>{formData.nome} {formData.cognome}</span>
              </div>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "12px 18px", borderBottom: "1px solid #d0d6da", fontSize: 13 }}>
                <span style={{ color: "#4a6080" }}>Email</span>
                <span style={{ fontWeight: 700, color: "#1e3a5f" }}>{formData.email}</span>
              </div>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "12px 18px", borderBottom: "1px solid #d0d6da", fontSize: 13 }}>
                <span style={{ color: "#4a6080" }}>Telefono</span>
                <span style={{ fontWeight: 700, color: "#1e3a5f" }}>{formData.telefono}</span>
              </div>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "12px 18px", fontSize: 13 }}>
                <span style={{ color: "#4a6080" }}>Indirizzo</span>
                <span style={{ fontWeight: 700, color: "#1e3a5f" }}>{formData.indirizzo}</span>
              </div>
            </div>

            {/* Pagamento */}
            <div style={{ fontSize: 14, fontWeight: 700, marginBottom: 12 }}>💳 Modalità di pagamento</div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, marginBottom: 16 }}>
              <div onClick={() => scegliPagamento("bonifico")} style={{ border: pagamentoModalita === "bonifico" ? "2px solid #1e3a5f" : "2px solid #d0d6da", borderRadius: 12, padding: "18px 16px", cursor: "pointer", background: pagamentoModalita === "bonifico" ? "rgba(30,58,95,0.08)" : "#fff", textAlign: "center" }}>
                <div style={{ fontSize: 24, marginBottom: 8 }}>🏦</div>
                <div style={{ fontSize: 14, fontWeight: 700, color: "#1e3a5f", marginBottom: 4 }}>Bonifico</div>
                <div style={{ fontSize: 11, color: "#4a6080" }}>30% · 50% · 20%<br />a stato avanzamento</div>
              </div>
              <div onClick={() => scegliPagamento("finanziamento")} style={{ border: pagamentoModalita === "finanziamento" ? "2px solid #1e3a5f" : "2px solid #d0d6da", borderRadius: 12, padding: "18px 16px", cursor: "pointer", background: pagamentoModalita === "finanziamento" ? "rgba(30,58,95,0.08)" : "#fff", textAlign: "center" }}>
                <div style={{ fontSize: 24, marginBottom: 8 }}>📅</div>
                <div style={{ fontSize: 14, fontWeight: 700, color: "#1e3a5f", marginBottom: 4 }}>Finanziamento</div>
                <div style={{ fontSize: 11, color: "#4a6080" }}>Rate mensili<br />Deutsche Bank Easy</div>
              </div>
            </div>

            {pagamentoModalita && (
              <div style={{ background: "#eef1f4", border: "1px solid #d0d6da", borderRadius: 10, padding: "12px 16px", marginBottom: 12, fontSize: 13 }}>
                <div style={{ color: "#4a6080", fontSize: 11, marginBottom: 2 }}>Modalità scelta</div>
                <div style={{ fontWeight: 700, color: "#1e3a5f" }}>{pagamentoModalita === "finanziamento" && finConfermato ? `Finanziamento Deutsche Bank` : pagamentoModalita === "bonifico" ? "Bonifico bancario (30% · 50% · 20%)" : "Finanziamento"}</div>
              </div>
            )}

            {pagamentoModalita === "finanziamento" && finConfermato && (
              <>
                <div style={{ background: "#eef1f4", border: "1px solid #d0d6da", borderRadius: 10, padding: "12px 16px", marginBottom: 12, fontSize: 13 }}>
                  <div style={{ color: "#4a6080", fontSize: 11, marginBottom: 2 }}>Anticipo</div>
                  <div style={{ fontWeight: 700, color: "#1e3a5f" }}>€ {finAnticipo.toLocaleString("it-IT")}</div>
                </div>
                <div style={{ background: "#eef1f4", border: "1px solid #d0d6da", borderRadius: 10, padding: "12px 16px", marginBottom: 12, fontSize: 13 }}>
                  <div style={{ color: "#4a6080", fontSize: 11, marginBottom: 2 }}>Numero rate · Rata mensile</div>
                  <div style={{ fontWeight: 700, color: "#1e3a5f" }}>{finNumRate} rate · € {finRata.toLocaleString("it-IT")}/mese</div>
                </div>
                <div style={{ background: "#eef1f4", border: "1px solid #d0d6da", borderRadius: 10, padding: "12px 16px", marginBottom: 12, fontSize: 13 }}>
                  <div style={{ color: "#4a6080", fontSize: 11, marginBottom: 2 }}>TAN · TAEG</div>
                  <div style={{ fontWeight: 700, color: "#1e3a5f" }}>6,90% · {finTaeg.toFixed(2)}%</div>
                </div>
              </>
            )}

            {/* Consensi */}
            <div style={{ background: "#fffbf0", border: "1px solid rgba(245,158,11,0.4)", borderLeft: "3px solid #f59e0b", borderRadius: 12, padding: "16px 18px", marginBottom: 16 }}>
              <div style={{ fontSize: 12, fontWeight: 700, color: "#1e3a5f", marginBottom: 12, textTransform: "uppercase", letterSpacing: "0.05em" }}>Dichiarazioni obbligatorie</div>
              <label style={{ display: "flex", alignItems: "flex-start", gap: 10, marginBottom: 10, cursor: "pointer" }}>
                <input type="checkbox" checked={cb1} onChange={e => setCb1(e.target.checked)} style={{ marginTop: 2, flexShrink: 0, width: 16, height: 16, accentColor: "#1e3a5f" }} />
                <span style={{ fontSize: 12, color: "#333", lineHeight: 1.5 }}>Dichiaro di aver letto e accettato le condizioni generali di vendita e i termini e condizioni di Solair Group.</span>
              </label>
              <label style={{ display: "flex", alignItems: "flex-start", gap: 10, marginBottom: 10, cursor: "pointer" }}>
                <input type="checkbox" checked={cb2} onChange={e => setCb2(e.target.checked)} style={{ marginTop: 2, flexShrink: 0, width: 16, height: 16, accentColor: "#1e3a5f" }} />
                <span style={{ fontSize: 12, color: "#333", lineHeight: 1.5 }}>Acconsento al trattamento dei dati personali ai sensi del GDPR 679/2016 (Art. 10).</span>
              </label>
              <label style={{ display: "flex", alignItems: "flex-start", gap: 10, marginBottom: 10, cursor: "pointer" }}>
                <input type="checkbox" checked={cb3} onChange={e => setCb3(e.target.checked)} style={{ marginTop: 2, flexShrink: 0, width: 16, height: 16, accentColor: "#1e3a5f" }} />
                <span style={{ fontSize: 12, color: "#333", lineHeight: 1.5 }}>Dichiaro di essere proprietario/avente diritto dell&apos;immobile o di avere le necessarie autorizzazioni per l&apos;installazione.</span>
              </label>
              <label style={{ display: "flex", alignItems: "flex-start", gap: 10, cursor: "pointer" }}>
                <input type="checkbox" checked={cb4} onChange={e => setCb4(e.target.checked)} style={{ marginTop: 2, flexShrink: 0, width: 16, height: 16, accentColor: "#1e3a5f" }} />
                <span style={{ fontSize: 12, color: "#333", lineHeight: 1.5 }}>Approvo specificamente le clausole onerose: Art. 3 (tempi), Art. 4 (responsabilità), Art. 8 (recesso e penale), Art. 9 (clausola risolutiva), Art. 11 (foro competente) — ai sensi degli artt. 1341 e 1342 c.c.</span>
              </label>
            </div>

            <div style={{ background: "#fff", border: "1px solid #d0d6da", borderRadius: 12, padding: "16px 18px", marginBottom: 20, fontSize: 12, color: "#4a6080", lineHeight: 1.6 }}>
              ✅ Cliccando su <strong style={{ color: "#1e3a5f" }}>Accetta e firma</strong> confermo di aver letto e accettato la configurazione sopra indicata e autorizzo l&apos;avvio della procedura di sottoscrizione del contratto. Riceverò via email il documento da firmare digitalmente tramite OTP.
            </div>

            <div style={{ display: "flex", gap: 12, marginTop: 28, justifyContent: "center" }}>
              <button onClick={() => goTo(4)} style={{ display: "inline-flex", alignItems: "center", gap: 8, background: "transparent", color: "#1e3a5f", border: "1px solid rgba(30,58,95,0.25)", padding: "12px 22px", borderRadius: 10, fontSize: 14, fontWeight: 600, cursor: "pointer", fontFamily: "'Outfit', sans-serif" }}>
                ← Modifica
              </button>
              <button onClick={inviaRichiesta} disabled={!allConsents || isSubmitting} style={{ display: "inline-flex", alignItems: "center", gap: 8, background: allConsents && !isSubmitting ? "#1e3a5f" : "rgba(30,58,95,0.4)", color: "#fff", border: "none", padding: "15px 32px", borderRadius: 10, fontSize: 15, fontWeight: 700, cursor: allConsents && !isSubmitting ? "pointer" : "not-allowed", fontFamily: "'Outfit', sans-serif" }}>
                {isSubmitting ? "⏳ Invio in corso..." : "✍️ Accetta e firma"}
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Popup Finanziamento */}
      {showFinPopup && (
        <div style={{ display: "flex", position: "fixed", top: 0, left: 0, right: 0, bottom: 0, background: "rgba(30,58,95,0.55)", zIndex: 1000, alignItems: "center", justifyContent: "center", padding: 20 }}>
          <div style={{ background: "#fff", borderRadius: 18, padding: "28px 24px", maxWidth: 440, width: "100%", position: "relative", boxShadow: "0 20px 60px rgba(30,58,95,0.25)" }}>
            <button onClick={() => { setShowFinPopup(false); if (!finConfermato) setPagamentoModalita(null) }} style={{ position: "absolute", top: 16, right: 18, background: "none", border: "none", fontSize: 20, cursor: "pointer", color: "#4a6080", fontFamily: "'Outfit', sans-serif" }}>✕</button>
            <div style={{ fontSize: 18, fontWeight: 800, marginBottom: 4, color: "#1e3a5f" }}>💳 Configura il finanziamento</div>
            <div style={{ fontSize: 13, color: "#4a6080", marginBottom: 24 }}>Calcoliamo la rata esatta dalla tabella Deutsche Bank Easy</div>

            <div style={{ display: "flex", gap: 10, marginBottom: 16 }}>
              <div style={{ flex: 1, background: "#eef1f4", border: "1px solid #d0d6da", borderRadius: 10, padding: "10px 14px", textAlign: "center" }}>
                <div style={{ fontSize: 10, color: "#4a6080", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.06em", marginBottom: 2 }}>TAN fisso</div>
                <div style={{ fontSize: 16, fontWeight: 800, color: "#1e3a5f" }}>6,90%</div>
              </div>
              <div style={{ flex: 1, background: "#eef1f4", border: "1px solid #d0d6da", borderRadius: 10, padding: "10px 14px", textAlign: "center" }}>
                <div style={{ fontSize: 10, color: "#4a6080", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.06em", marginBottom: 2 }}>TAEG indicativo</div>
                <div style={{ fontSize: 16, fontWeight: 800, color: "#1e3a5f" }}>{finTaeg ? `${finTaeg.toFixed(2)}%` : "–"}</div>
              </div>
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: 6, marginBottom: 16 }}>
              <label style={{ fontSize: 12, fontWeight: 600, color: "#4a6080" }}>Anticipo (€) — lascia 0 per finanziamento totale</label>
              <input type="number" value={finAnticipo} onChange={e => { setFinAnticipo(parseFloat(e.target.value) || 0); setTimeout(calcolaRataDB, 0) }} placeholder="0" min="0" style={{ background: "#fff", border: "1px solid #d0d6da", borderRadius: 10, padding: "11px 14px", fontSize: 14, fontFamily: "'Outfit', sans-serif", color: "#1e3a5f", outline: "none" }} />
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: 6, marginBottom: 8 }}>
              <label style={{ fontSize: 12, fontWeight: 600, color: "#4a6080" }}>Numero rate: <strong>{finNumRate}</strong></label>
              <input type="range" min="12" max="120" step="12" value={finNumRate} onChange={e => { setFinNumRate(parseInt(e.target.value)); setTimeout(calcolaRataDB, 0) }} style={{ width: "100%", height: 6, appearance: "none", background: "rgba(30,58,95,0.2)", borderRadius: 3, outline: "none", cursor: "pointer" }} />
              <div style={{ display: "flex", justifyContent: "space-between", fontSize: 11, color: "#8a9aaa", marginTop: 4 }}>
                <span>12 mesi</span><span>60 mesi</span><span>120 mesi</span>
              </div>
            </div>

            {finRata > 0 && (
              <div style={{ background: "rgba(30,58,95,0.08)", border: "1px solid rgba(30,58,95,0.25)", borderRadius: 12, padding: 16, textAlign: "center", margin: "20px 0 16px" }}>
                <div style={{ fontSize: 11, color: "#4a6080", textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: 4 }}>Rata mensile (da tabella DB Easy)</div>
                <div style={{ fontSize: 32, fontWeight: 800, color: "#1e3a5f" }}>€ {finRata.toLocaleString("it-IT")}</div>
                <div style={{ fontSize: 13, color: "#4a6080", marginTop: 2 }}>€/mese · IVA inclusa</div>
              </div>
            )}

            <div style={{ fontSize: 10, color: "#8a9aaa", marginBottom: 20, lineHeight: 1.5 }}>
              * Rata da tabella Deutsche Bank Easy Prod.31. L&apos;importo definitivo è soggetto ad approvazione dell&apos;istituto di credito. In caso di esito negativo il contratto si intende risolto.
            </div>

            <button onClick={confermaFinanziamento} style={{ width: "100%", display: "inline-flex", alignItems: "center", justifyContent: "center", gap: 8, background: "#1e3a5f", color: "#fff", border: "none", padding: "13px 26px", borderRadius: 10, fontSize: 14, fontWeight: 700, cursor: "pointer", fontFamily: "'Outfit', sans-serif" }}>
              Conferma finanziamento →
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
