"use client"

import { useState, useEffect, useCallback } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { motion, AnimatePresence } from "framer-motion"
import { Eye, EyeOff, ChevronRight, ChevronLeft, Check, AlertCircle, LogOut, Home } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"

// Hardcoded password for now
const VENDOR_PASSWORD = "solair2024"

type FormData = {
  // Customer data
  nome: string
  cognome: string
  codiceFiscale: string
  dataNascita: string
  indirizzoResidenza: string
  cittaResidenza: string
  capResidenza: string
  provinciaResidenza: string
  telefono: string
  email: string
  // Installation address
  stessoIndirizzo: boolean
  indirizzoInstallazione: string
  cittaInstallazione: string
  capInstallazione: string
  provinciaInstallazione: string
  // Contract details
  dataContratto: string
  numeroContratto: string
  lineaCommerciale: string
  configurazioneKwp: string
  configurazioneKwh: string
  prezzoTotale: string
  modalitaPagamento: string
  noteAggiuntive: string
}

const initialFormData: FormData = {
  nome: "",
  cognome: "",
  codiceFiscale: "",
  dataNascita: "",
  indirizzoResidenza: "",
  cittaResidenza: "",
  capResidenza: "",
  provinciaResidenza: "",
  telefono: "",
  email: "",
  stessoIndirizzo: false,
  indirizzoInstallazione: "",
  cittaInstallazione: "",
  capInstallazione: "",
  provinciaInstallazione: "",
  dataContratto: new Date().toISOString().split("T")[0],
  numeroContratto: "",
  lineaCommerciale: "",
  configurazioneKwp: "",
  configurazioneKwh: "",
  prezzoTotale: "",
  modalitaPagamento: "",
  noteAggiuntive: "",
}

const steps = [
  { id: 1, name: "Dati Cliente", description: "Informazioni anagrafiche" },
  { id: 2, name: "Indirizzo", description: "Luogo di installazione" },
  { id: 3, name: "Contratto", description: "Dettagli commerciali" },
]

function generateContractNumber(): string {
  const date = new Date()
  const year = date.getFullYear()
  const month = String(date.getMonth() + 1).padStart(2, "0")
  const random = Math.floor(Math.random() * 10000).toString().padStart(4, "0")
  return `SLR-${year}${month}-${random}`
}

export default function AreaVenditoriPage() {
  const router = useRouter()
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [password, setPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [loginError, setLoginError] = useState("")
  const [currentStep, setCurrentStep] = useState(1)
  const [formData, setFormData] = useState<FormData>(initialFormData)
  const [errors, setErrors] = useState<Partial<FormData>>({})
  const [showSuccess, setShowSuccess] = useState(false)

  // Logout and go home
  const logoutAndGoHome = useCallback(() => {
    setIsAuthenticated(false)
    setPassword("")
    setCurrentStep(1)
    setFormData({
      ...initialFormData,
      numeroContratto: generateContractNumber(),
    })
    setShowSuccess(false)
    router.push("/")
  }, [router])

  useEffect(() => {
    // Generate contract number on mount
    setFormData((prev) => ({
      ...prev,
      numeroContratto: generateContractNumber(),
    }))
  }, [])

  // Handle browser back button - logout and go home
  useEffect(() => {
    const handlePopState = () => {
      if (isAuthenticated) {
        logoutAndGoHome()
      }
    }

    // Push a state so we can detect back navigation
    if (isAuthenticated) {
      window.history.pushState({ vendorArea: true }, "")
    }

    window.addEventListener("popstate", handlePopState)
    return () => {
      window.removeEventListener("popstate", handlePopState)
    }
  }, [isAuthenticated, logoutAndGoHome])

  // Handle same address checkbox
  useEffect(() => {
    if (formData.stessoIndirizzo) {
      setFormData((prev) => ({
        ...prev,
        indirizzoInstallazione: prev.indirizzoResidenza,
        cittaInstallazione: prev.cittaResidenza,
        capInstallazione: prev.capResidenza,
        provinciaInstallazione: prev.provinciaResidenza,
      }))
    }
  }, [formData.stessoIndirizzo, formData.indirizzoResidenza, formData.cittaResidenza, formData.capResidenza, formData.provinciaResidenza])

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault()
    if (password === VENDOR_PASSWORD) {
      setIsAuthenticated(true)
      setLoginError("")
    } else {
      setLoginError("Password non valida. Riprova.")
    }
  }

  const handleLogout = () => {
    setIsAuthenticated(false)
    setPassword("")
    setCurrentStep(1)
    setFormData({
      ...initialFormData,
      numeroContratto: generateContractNumber(),
    })
    setShowSuccess(false)
  }

  const updateFormData = (field: keyof FormData, value: string | boolean) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
    // Clear error when user types
    if (errors[field as keyof FormData]) {
      setErrors((prev) => ({ ...prev, [field]: "" }))
    }
  }

  const validateStep = (step: number): boolean => {
    const newErrors: Partial<FormData> = {}

    if (step === 1) {
      if (!formData.nome.trim()) newErrors.nome = "Campo obbligatorio"
      if (!formData.cognome.trim()) newErrors.cognome = "Campo obbligatorio"
      if (!formData.codiceFiscale.trim()) newErrors.codiceFiscale = "Campo obbligatorio"
      if (!formData.dataNascita) newErrors.dataNascita = "Campo obbligatorio"
      if (!formData.indirizzoResidenza.trim()) newErrors.indirizzoResidenza = "Campo obbligatorio"
      if (!formData.cittaResidenza.trim()) newErrors.cittaResidenza = "Campo obbligatorio"
      if (!formData.capResidenza.trim()) newErrors.capResidenza = "Campo obbligatorio"
      if (!formData.provinciaResidenza.trim()) newErrors.provinciaResidenza = "Campo obbligatorio"
      if (!formData.telefono.trim()) newErrors.telefono = "Campo obbligatorio"
      if (!formData.email.trim()) newErrors.email = "Campo obbligatorio"
      else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
        newErrors.email = "Email non valida"
      }
    }

    if (step === 2) {
      if (!formData.indirizzoInstallazione.trim()) newErrors.indirizzoInstallazione = "Campo obbligatorio"
      if (!formData.cittaInstallazione.trim()) newErrors.cittaInstallazione = "Campo obbligatorio"
      if (!formData.capInstallazione.trim()) newErrors.capInstallazione = "Campo obbligatorio"
      if (!formData.provinciaInstallazione.trim()) newErrors.provinciaInstallazione = "Campo obbligatorio"
    }

    if (step === 3) {
      if (!formData.lineaCommerciale) newErrors.lineaCommerciale = "Campo obbligatorio"
      if (!formData.configurazioneKwp.trim()) newErrors.configurazioneKwp = "Campo obbligatorio"
      if (!formData.configurazioneKwh.trim()) newErrors.configurazioneKwh = "Campo obbligatorio"
      if (!formData.prezzoTotale.trim()) newErrors.prezzoTotale = "Campo obbligatorio"
      if (!formData.modalitaPagamento) newErrors.modalitaPagamento = "Campo obbligatorio"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleNext = () => {
    if (validateStep(currentStep)) {
      setCurrentStep((prev) => Math.min(prev + 1, 4)) // 4 = summary
    }
  }

  const handleBack = () => {
    setCurrentStep((prev) => Math.max(prev - 1, 1))
  }

  const handleSubmit = () => {
    // For now just show success message
    // Webhook integration with Make to be added later
    setShowSuccess(true)
  }

  const handleNewContract = () => {
    setFormData({
      ...initialFormData,
      numeroContratto: generateContractNumber(),
      dataContratto: new Date().toISOString().split("T")[0],
    })
    setCurrentStep(1)
    setShowSuccess(false)
  }

  // Login Screen
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-[#0D1F3C] flex items-center justify-center p-4 font-[family-name:var(--font-outfit)]">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="w-full max-w-md"
        >
          <div className="bg-[#1a2d4d] rounded-2xl p-8 shadow-2xl border border-[#2a3d5d]">
            {/* Logo */}
            <div className="text-center mb-8">
              <div className="flex items-center justify-center gap-1 mb-2">
                <span className="text-2xl font-extrabold text-white">SOLAIR</span>
                <span className="text-[#F5A623] text-2xl">&#9889;</span>
                <span className="text-sm font-medium text-white">GROUP</span>
              </div>
              <h1 className="text-xl font-semibold text-white mt-4">Area Venditori</h1>
              <p className="text-gray-400 text-sm mt-1">Accedi per creare un nuovo contratto</p>
            </div>

            {/* Login Form */}
            <form onSubmit={handleLogin} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="password" className="text-gray-300">
                  Password
                </Label>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => {
                      setPassword(e.target.value)
                      setLoginError("")
                    }}
                    placeholder="Inserisci la password"
                    className="bg-[#0D1F3C] border-[#2a3d5d] text-white placeholder:text-gray-500 pr-10 focus:border-[#F5A623] focus:ring-[#F5A623]"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white transition-colors"
                    aria-label={showPassword ? "Nascondi password" : "Mostra password"}
                  >
                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>
              </div>

              {loginError && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex items-center gap-2 text-red-400 text-sm bg-red-400/10 p-3 rounded-lg"
                >
                  <AlertCircle className="h-4 w-4 flex-shrink-0" />
                  {loginError}
                </motion.div>
              )}

              <Button
                type="submit"
                className="w-full bg-[#F5A623] hover:bg-[#e09620] text-[#0D1F3C] font-semibold py-3"
              >
                Accedi
              </Button>

              <Link
                href="/"
                className="flex items-center justify-center gap-2 w-full text-gray-400 hover:text-white transition-colors mt-4 text-sm"
              >
                <Home className="h-4 w-4" />
                Torna alla Home
              </Link>
            </form>
          </div>
        </motion.div>
      </div>
    )
  }

  // Success Screen
  if (showSuccess) {
    return (
      <div className="min-h-screen bg-[#0D1F3C] flex items-center justify-center p-4 font-[family-name:var(--font-outfit)]">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="w-full max-w-md text-center"
        >
          <div className="bg-[#1a2d4d] rounded-2xl p-8 shadow-2xl border border-[#2a3d5d]">
            <div className="w-16 h-16 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
              <Check className="h-8 w-8 text-green-500" />
            </div>
            <h2 className="text-2xl font-bold text-white mb-2">Contratto Creato!</h2>
            <p className="text-gray-400 mb-6">
              Il contratto <span className="text-[#F5A623] font-medium">{formData.numeroContratto}</span> è stato generato con successo.
            </p>
            <div className="flex flex-col gap-3">
              <Button
                onClick={handleNewContract}
                className="w-full bg-[#F5A623] hover:bg-[#e09620] text-[#0D1F3C] font-semibold"
              >
                Crea Nuovo Contratto
              </Button>
              <Button
                onClick={handleLogout}
                variant="outline"
                className="w-full border-[#2a3d5d] text-gray-300 hover:bg-[#2a3d5d] hover:text-white"
              >
                <LogOut className="h-4 w-4 mr-2" />
                Esci
              </Button>
            </div>
          </div>
        </motion.div>
      </div>
    )
  }

  // Contract Form
  return (
    <div className="min-h-screen bg-[#0D1F3C] p-4 md:p-8 font-[family-name:var(--font-outfit)]">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-2">
            <span className="text-xl font-extrabold text-white">SOLAIR</span>
            <span className="text-[#F5A623] text-xl">&#9889;</span>
            <span className="text-sm font-medium text-white">GROUP</span>
          </div>
          <Button
            onClick={handleLogout}
            variant="ghost"
            className="text-gray-400 hover:text-white hover:bg-[#1a2d4d]"
          >
            <LogOut className="h-4 w-4 mr-2" />
            Esci
          </Button>
        </div>

        {/* Progress Indicator */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            {steps.map((step, index) => (
              <div key={step.id} className="flex-1 flex items-center">
                <div className="flex flex-col items-center">
                  <div
                    className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold transition-colors ${
                      currentStep > step.id
                        ? "bg-green-500 text-white"
                        : currentStep === step.id
                        ? "bg-[#F5A623] text-[#0D1F3C]"
                        : "bg-[#1a2d4d] text-gray-400 border border-[#2a3d5d]"
                    }`}
                  >
                    {currentStep > step.id ? <Check className="h-5 w-5" /> : step.id}
                  </div>
                  <span
                    className={`mt-2 text-sm font-medium hidden sm:block ${
                      currentStep >= step.id ? "text-white" : "text-gray-500"
                    }`}
                  >
                    {step.name}
                  </span>
                </div>
                {index < steps.length - 1 && (
                  <div
                    className={`flex-1 h-1 mx-2 rounded ${
                      currentStep > step.id ? "bg-green-500" : "bg-[#1a2d4d]"
                    }`}
                  />
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Form Card */}
        <div className="bg-[#1a2d4d] rounded-2xl p-6 md:p-8 shadow-2xl border border-[#2a3d5d]">
          <AnimatePresence mode="wait">
            {/* Step 1: Customer Data */}
            {currentStep === 1 && (
              <motion.div
                key="step1"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-6"
              >
                <div>
                  <h2 className="text-xl font-bold text-white mb-1">Dati Cliente</h2>
                  <p className="text-gray-400 text-sm">Inserisci le informazioni anagrafiche del cliente</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <FormField
                    label="Nome"
                    id="nome"
                    value={formData.nome}
                    onChange={(v) => updateFormData("nome", v)}
                    error={errors.nome}
                    placeholder="Mario"
                  />
                  <FormField
                    label="Cognome"
                    id="cognome"
                    value={formData.cognome}
                    onChange={(v) => updateFormData("cognome", v)}
                    error={errors.cognome}
                    placeholder="Rossi"
                  />
                  <FormField
                    label="Codice Fiscale"
                    id="codiceFiscale"
                    value={formData.codiceFiscale}
                    onChange={(v) => updateFormData("codiceFiscale", v.toUpperCase())}
                    error={errors.codiceFiscale}
                    placeholder="RSSMRA80A01H501Z"
                  />
                  <FormField
                    label="Data di Nascita"
                    id="dataNascita"
                    type="date"
                    value={formData.dataNascita}
                    onChange={(v) => updateFormData("dataNascita", v)}
                    error={errors.dataNascita}
                  />
                  <div className="md:col-span-2">
                    <FormField
                      label="Indirizzo di Residenza"
                      id="indirizzoResidenza"
                      value={formData.indirizzoResidenza}
                      onChange={(v) => updateFormData("indirizzoResidenza", v)}
                      error={errors.indirizzoResidenza}
                      placeholder="Via Roma 123"
                    />
                  </div>
                  <FormField
                    label="Città"
                    id="cittaResidenza"
                    value={formData.cittaResidenza}
                    onChange={(v) => updateFormData("cittaResidenza", v)}
                    error={errors.cittaResidenza}
                    placeholder="Milano"
                  />
                  <div className="grid grid-cols-2 gap-4">
                    <FormField
                      label="CAP"
                      id="capResidenza"
                      value={formData.capResidenza}
                      onChange={(v) => updateFormData("capResidenza", v)}
                      error={errors.capResidenza}
                      placeholder="20100"
                    />
                    <FormField
                      label="Provincia"
                      id="provinciaResidenza"
                      value={formData.provinciaResidenza}
                      onChange={(v) => updateFormData("provinciaResidenza", v.toUpperCase())}
                      error={errors.provinciaResidenza}
                      placeholder="MI"
                      maxLength={2}
                    />
                  </div>
                  <FormField
                    label="Telefono"
                    id="telefono"
                    type="tel"
                    value={formData.telefono}
                    onChange={(v) => updateFormData("telefono", v)}
                    error={errors.telefono}
                    placeholder="+39 333 1234567"
                  />
                  <FormField
                    label="Email"
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={(v) => updateFormData("email", v)}
                    error={errors.email}
                    placeholder="mario.rossi@email.com"
                  />
                </div>
              </motion.div>
            )}

            {/* Step 2: Installation Address */}
            {currentStep === 2 && (
              <motion.div
                key="step2"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-6"
              >
                <div>
                  <h2 className="text-xl font-bold text-white mb-1">Indirizzo Installazione</h2>
                  <p className="text-gray-400 text-sm">Dove verrà installato l&apos;impianto?</p>
                </div>

                <div className="flex items-center space-x-2 p-4 bg-[#0D1F3C] rounded-lg border border-[#2a3d5d]">
                  <Checkbox
                    id="stessoIndirizzo"
                    checked={formData.stessoIndirizzo}
                    onCheckedChange={(checked) => updateFormData("stessoIndirizzo", checked === true)}
                    className="border-[#F5A623] data-[state=checked]:bg-[#F5A623] data-[state=checked]:border-[#F5A623]"
                  />
                  <Label htmlFor="stessoIndirizzo" className="text-gray-300 cursor-pointer">
                    Stesso indirizzo di residenza
                  </Label>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="md:col-span-2">
                    <FormField
                      label="Indirizzo Installazione"
                      id="indirizzoInstallazione"
                      value={formData.indirizzoInstallazione}
                      onChange={(v) => updateFormData("indirizzoInstallazione", v)}
                      error={errors.indirizzoInstallazione}
                      placeholder="Via Roma 123"
                      disabled={formData.stessoIndirizzo}
                    />
                  </div>
                  <FormField
                    label="Città"
                    id="cittaInstallazione"
                    value={formData.cittaInstallazione}
                    onChange={(v) => updateFormData("cittaInstallazione", v)}
                    error={errors.cittaInstallazione}
                    placeholder="Milano"
                    disabled={formData.stessoIndirizzo}
                  />
                  <div className="grid grid-cols-2 gap-4">
                    <FormField
                      label="CAP"
                      id="capInstallazione"
                      value={formData.capInstallazione}
                      onChange={(v) => updateFormData("capInstallazione", v)}
                      error={errors.capInstallazione}
                      placeholder="20100"
                      disabled={formData.stessoIndirizzo}
                    />
                    <FormField
                      label="Provincia"
                      id="provinciaInstallazione"
                      value={formData.provinciaInstallazione}
                      onChange={(v) => updateFormData("provinciaInstallazione", v.toUpperCase())}
                      error={errors.provinciaInstallazione}
                      placeholder="MI"
                      maxLength={2}
                      disabled={formData.stessoIndirizzo}
                    />
                  </div>
                </div>
              </motion.div>
            )}

            {/* Step 3: Contract Details */}
            {currentStep === 3 && (
              <motion.div
                key="step3"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-6"
              >
                <div>
                  <h2 className="text-xl font-bold text-white mb-1">Dettagli Contratto</h2>
                  <p className="text-gray-400 text-sm">Configura i dettagli commerciali</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <FormField
                    label="Data Contratto"
                    id="dataContratto"
                    type="date"
                    value={formData.dataContratto}
                    onChange={(v) => updateFormData("dataContratto", v)}
                  />
                  <FormField
                    label="Numero Contratto"
                    id="numeroContratto"
                    value={formData.numeroContratto}
                    onChange={(v) => updateFormData("numeroContratto", v)}
                    disabled
                  />

                  <div className="space-y-2">
                    <Label htmlFor="lineaCommerciale" className="text-gray-300">
                      Linea Commerciale *
                    </Label>
                    <Select
                      value={formData.lineaCommerciale}
                      onValueChange={(v) => updateFormData("lineaCommerciale", v)}
                    >
                      <SelectTrigger
                        className={`bg-[#0D1F3C] border-[#2a3d5d] text-white focus:border-[#F5A623] focus:ring-[#F5A623] ${
                          errors.lineaCommerciale ? "border-red-500" : ""
                        }`}
                      >
                        <SelectValue placeholder="Seleziona linea" />
                      </SelectTrigger>
                      <SelectContent className="bg-[#1a2d4d] border-[#2a3d5d]">
                        <SelectItem value="smart" className="text-white hover:bg-[#2a3d5d]">
                          Smart
                        </SelectItem>
                        <SelectItem value="power" className="text-white hover:bg-[#2a3d5d]">
                          Power
                        </SelectItem>
                        <SelectItem value="premium" className="text-white hover:bg-[#2a3d5d]">
                          Premium
                        </SelectItem>
                      </SelectContent>
                    </Select>
                    {errors.lineaCommerciale && (
                      <p className="text-red-400 text-xs">{errors.lineaCommerciale}</p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label className="text-gray-300">Configurazione Impianto *</Label>
                    <div className="grid grid-cols-2 gap-2">
                      <div className="relative">
                        <Input
                          value={formData.configurazioneKwp}
                          onChange={(e) => updateFormData("configurazioneKwp", e.target.value)}
                          placeholder="6.0"
                          className={`bg-[#0D1F3C] border-[#2a3d5d] text-white pr-12 focus:border-[#F5A623] focus:ring-[#F5A623] ${
                            errors.configurazioneKwp ? "border-red-500" : ""
                          }`}
                        />
                        <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 text-sm">
                          kWp
                        </span>
                      </div>
                      <div className="relative">
                        <Input
                          value={formData.configurazioneKwh}
                          onChange={(e) => updateFormData("configurazioneKwh", e.target.value)}
                          placeholder="10.0"
                          className={`bg-[#0D1F3C] border-[#2a3d5d] text-white pr-12 focus:border-[#F5A623] focus:ring-[#F5A623] ${
                            errors.configurazioneKwh ? "border-red-500" : ""
                          }`}
                        />
                        <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 text-sm">
                          kWh
                        </span>
                      </div>
                    </div>
                    {(errors.configurazioneKwp || errors.configurazioneKwh) && (
                      <p className="text-red-400 text-xs">Configurazione obbligatoria</p>
                    )}
                  </div>

                  <div className="relative space-y-2">
                    <Label htmlFor="prezzoTotale" className="text-gray-300">
                      Prezzo Totale *
                    </Label>
                    <div className="relative">
                      <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">
                        &euro;
                      </span>
                      <Input
                        id="prezzoTotale"
                        value={formData.prezzoTotale}
                        onChange={(e) => updateFormData("prezzoTotale", e.target.value)}
                        placeholder="12.500"
                        className={`bg-[#0D1F3C] border-[#2a3d5d] text-white pl-8 focus:border-[#F5A623] focus:ring-[#F5A623] ${
                          errors.prezzoTotale ? "border-red-500" : ""
                        }`}
                      />
                    </div>
                    {errors.prezzoTotale && (
                      <p className="text-red-400 text-xs">{errors.prezzoTotale}</p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="modalitaPagamento" className="text-gray-300">
                      Modalità di Pagamento *
                    </Label>
                    <Select
                      value={formData.modalitaPagamento}
                      onValueChange={(v) => updateFormData("modalitaPagamento", v)}
                    >
                      <SelectTrigger
                        className={`bg-[#0D1F3C] border-[#2a3d5d] text-white focus:border-[#F5A623] focus:ring-[#F5A623] ${
                          errors.modalitaPagamento ? "border-red-500" : ""
                        }`}
                      >
                        <SelectValue placeholder="Seleziona modalità" />
                      </SelectTrigger>
                      <SelectContent className="bg-[#1a2d4d] border-[#2a3d5d]">
                        <SelectItem value="contanti" className="text-white hover:bg-[#2a3d5d]">
                          Contanti
                        </SelectItem>
                        <SelectItem value="bonifico" className="text-white hover:bg-[#2a3d5d]">
                          Bonifico
                        </SelectItem>
                        <SelectItem value="finanziamento" className="text-white hover:bg-[#2a3d5d]">
                          Finanziamento
                        </SelectItem>
                      </SelectContent>
                    </Select>
                    {errors.modalitaPagamento && (
                      <p className="text-red-400 text-xs">{errors.modalitaPagamento}</p>
                    )}
                  </div>

                  <div className="md:col-span-2 space-y-2">
                    <Label htmlFor="noteAggiuntive" className="text-gray-300">
                      Note Aggiuntive
                    </Label>
                    <Textarea
                      id="noteAggiuntive"
                      value={formData.noteAggiuntive}
                      onChange={(e) => updateFormData("noteAggiuntive", e.target.value)}
                      placeholder="Eventuali note o richieste speciali..."
                      className="bg-[#0D1F3C] border-[#2a3d5d] text-white min-h-[100px] focus:border-[#F5A623] focus:ring-[#F5A623]"
                    />
                  </div>
                </div>
              </motion.div>
            )}

            {/* Step 4: Summary */}
            {currentStep === 4 && (
              <motion.div
                key="step4"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-6"
              >
                <div>
                  <h2 className="text-xl font-bold text-white mb-1">Riepilogo Contratto</h2>
                  <p className="text-gray-400 text-sm">Verifica i dati prima di confermare</p>
                </div>

                <div className="space-y-6">
                  {/* Customer Data Summary */}
                  <div className="bg-[#0D1F3C] rounded-lg p-4 border border-[#2a3d5d]">
                    <h3 className="text-[#F5A623] font-semibold mb-3 flex items-center gap-2">
                      <span className="w-6 h-6 bg-[#F5A623]/20 rounded-full flex items-center justify-center text-sm">1</span>
                      Dati Cliente
                    </h3>
                    <div className="grid grid-cols-2 gap-x-4 gap-y-2 text-sm">
                      <SummaryItem label="Nome" value={`${formData.nome} ${formData.cognome}`} />
                      <SummaryItem label="Codice Fiscale" value={formData.codiceFiscale} />
                      <SummaryItem label="Data di Nascita" value={formatDate(formData.dataNascita)} />
                      <SummaryItem label="Telefono" value={formData.telefono} />
                      <SummaryItem label="Email" value={formData.email} />
                      <SummaryItem
                        label="Residenza"
                        value={`${formData.indirizzoResidenza}, ${formData.capResidenza} ${formData.cittaResidenza} (${formData.provinciaResidenza})`}
                      />
                    </div>
                  </div>

                  {/* Installation Address Summary */}
                  <div className="bg-[#0D1F3C] rounded-lg p-4 border border-[#2a3d5d]">
                    <h3 className="text-[#F5A623] font-semibold mb-3 flex items-center gap-2">
                      <span className="w-6 h-6 bg-[#F5A623]/20 rounded-full flex items-center justify-center text-sm">2</span>
                      Indirizzo Installazione
                    </h3>
                    <div className="text-sm">
                      <SummaryItem
                        label="Indirizzo"
                        value={`${formData.indirizzoInstallazione}, ${formData.capInstallazione} ${formData.cittaInstallazione} (${formData.provinciaInstallazione})`}
                      />
                    </div>
                  </div>

                  {/* Contract Details Summary */}
                  <div className="bg-[#0D1F3C] rounded-lg p-4 border border-[#2a3d5d]">
                    <h3 className="text-[#F5A623] font-semibold mb-3 flex items-center gap-2">
                      <span className="w-6 h-6 bg-[#F5A623]/20 rounded-full flex items-center justify-center text-sm">3</span>
                      Dettagli Contratto
                    </h3>
                    <div className="grid grid-cols-2 gap-x-4 gap-y-2 text-sm">
                      <SummaryItem label="Numero Contratto" value={formData.numeroContratto} />
                      <SummaryItem label="Data" value={formatDate(formData.dataContratto)} />
                      <SummaryItem label="Linea Commerciale" value={formData.lineaCommerciale.charAt(0).toUpperCase() + formData.lineaCommerciale.slice(1)} />
                      <SummaryItem label="Configurazione" value={`${formData.configurazioneKwp} kWp + ${formData.configurazioneKwh} kWh`} />
                      <SummaryItem label="Prezzo Totale" value={`€ ${formData.prezzoTotale}`} highlight />
                      <SummaryItem
                        label="Pagamento"
                        value={formData.modalitaPagamento.charAt(0).toUpperCase() + formData.modalitaPagamento.slice(1)}
                      />
                      {formData.noteAggiuntive && (
                        <div className="col-span-2">
                          <SummaryItem label="Note" value={formData.noteAggiuntive} />
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Navigation Buttons */}
          <div className="flex justify-between mt-8 pt-6 border-t border-[#2a3d5d]">
            <Button
              onClick={handleBack}
              variant="outline"
              className={`border-[#2a3d5d] text-gray-300 hover:bg-[#2a3d5d] hover:text-white ${
                currentStep === 1 ? "invisible" : ""
              }`}
            >
              <ChevronLeft className="h-4 w-4 mr-2" />
              Indietro
            </Button>

            {currentStep < 4 ? (
              <Button
                onClick={handleNext}
                className="bg-[#F5A623] hover:bg-[#e09620] text-[#0D1F3C] font-semibold"
              >
                Avanti
                <ChevronRight className="h-4 w-4 ml-2" />
              </Button>
            ) : (
              <Button
                onClick={handleSubmit}
                className="bg-green-500 hover:bg-green-600 text-white font-semibold"
              >
                <Check className="h-4 w-4 mr-2" />
                Genera Contratto
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

// Helper Components
function FormField({
  label,
  id,
  type = "text",
  value,
  onChange,
  error,
  placeholder,
  disabled,
  maxLength,
}: {
  label: string
  id: string
  type?: string
  value: string
  onChange: (value: string) => void
  error?: string
  placeholder?: string
  disabled?: boolean
  maxLength?: number
}) {
  return (
    <div className="space-y-2">
      <Label htmlFor={id} className="text-gray-300">
        {label} *
      </Label>
      <Input
        id={id}
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        disabled={disabled}
        maxLength={maxLength}
        className={`bg-[#0D1F3C] border-[#2a3d5d] text-white placeholder:text-gray-500 focus:border-[#F5A623] focus:ring-[#F5A623] disabled:opacity-50 disabled:cursor-not-allowed ${
          error ? "border-red-500" : ""
        }`}
      />
      {error && <p className="text-red-400 text-xs">{error}</p>}
    </div>
  )
}

function SummaryItem({
  label,
  value,
  highlight,
}: {
  label: string
  value: string
  highlight?: boolean
}) {
  return (
    <div>
      <span className="text-gray-500">{label}:</span>{" "}
      <span className={highlight ? "text-[#F5A623] font-semibold" : "text-white"}>
        {value}
      </span>
    </div>
  )
}

function formatDate(dateString: string): string {
  if (!dateString) return ""
  const date = new Date(dateString)
  return date.toLocaleDateString("it-IT", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  })
}
