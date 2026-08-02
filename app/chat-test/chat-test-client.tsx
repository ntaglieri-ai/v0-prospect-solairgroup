"use client"

import { useEffect, useRef, useState, type FormEvent } from "react"

const CORRECT_PIN = "482913" // valore di test, sostituibile in futuro
const SESSION_KEY = "chat-test-authenticated"

type ChatMessage = {
  role: "user" | "assistant"
  content: string
}

const NAVY = "#1e3a5f"
const TEAL = "#2e8b72"

export default function ChatTestClient() {
  const [authenticated, setAuthenticated] = useState(false)
  const [checkedSession, setCheckedSession] = useState(false)

  useEffect(() => {
    if (typeof window !== "undefined" && sessionStorage.getItem(SESSION_KEY) === "true") {
      setAuthenticated(true)
    }
    setCheckedSession(true)
  }, [])

  const handleUnlock = () => {
    sessionStorage.setItem(SESSION_KEY, "true")
    setAuthenticated(true)
  }

  // Evita flash del gate prima di leggere sessionStorage
  if (!checkedSession) {
    return <div className="min-h-screen" style={{ backgroundColor: "#f4f6f8" }} />
  }

  return authenticated ? <Chat /> : <PinGate onUnlock={handleUnlock} />
}

function PinGate({ onUnlock }: { onUnlock: () => void }) {
  const [pin, setPin] = useState("")
  const [error, setError] = useState("")

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    if (pin === CORRECT_PIN) {
      setError("")
      onUnlock()
    } else {
      setError("PIN errato. Riprova.")
    }
  }

  return (
    <main
      className="min-h-screen flex items-center justify-center p-4"
      style={{ backgroundColor: "#f4f6f8" }}
    >
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-sm bg-white rounded-2xl shadow-lg p-8 flex flex-col gap-5"
      >
        <div className="text-center">
          <h1 className="text-xl font-bold" style={{ color: NAVY }}>
            Area riservata
          </h1>
          <p className="text-sm text-gray-500 mt-1">Inserisci il PIN per accedere</p>
        </div>
        <input
          type="password"
          inputMode="numeric"
          pattern="[0-9]*"
          maxLength={6}
          value={pin}
          onChange={(e) => setPin(e.target.value.replace(/\D/g, "").slice(0, 6))}
          placeholder="••••••"
          autoFocus
          className="w-full text-center tracking-[0.5em] text-lg py-3 px-4 rounded-lg border border-gray-300 outline-none focus:border-[#2e8b72] transition-colors"
          aria-label="PIN di accesso"
        />
        {error && (
          <p className="text-sm text-red-600 text-center" role="alert">
            {error}
          </p>
        )}
        <button
          type="submit"
          className="w-full py-3 rounded-lg font-semibold text-white transition-opacity hover:opacity-90"
          style={{ backgroundColor: NAVY }}
        >
          Accedi
        </button>
      </form>
    </main>
  )
}

function Chat() {
  const [messages, setMessages] = useState<ChatMessage[]>([])
  const [input, setInput] = useState("")
  const [loading, setLoading] = useState(false)
  const scrollRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" })
  }, [messages, loading])

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    const text = input.trim()
    if (!text || loading) return

    const userMessage: ChatMessage = { role: "user", content: text }
    const nextMessages = [...messages, userMessage]
    setMessages(nextMessages)
    setInput("")
    setLoading(true)

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: nextMessages }),
      })
      const data = await res.json()
      const reply: ChatMessage =
        data?.message && typeof data.message.content === "string"
          ? data.message
          : { role: "assistant", content: "Si è verificato un errore. Riprova." }
      setMessages((prev) => [...prev, reply])
    } catch {
      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: "Si è verificato un errore di connessione. Riprova." },
      ])
    } finally {
      setLoading(false)
    }
  }

  return (
    <main className="min-h-screen flex flex-col" style={{ backgroundColor: "#f4f6f8" }}>
      {/* Header */}
      <header className="px-4 py-4 shadow-sm" style={{ backgroundColor: NAVY }}>
        <div className="max-w-2xl mx-auto flex items-center gap-2">
          <span
            className="inline-flex h-8 w-8 items-center justify-center rounded-full text-white text-sm font-bold"
            style={{ backgroundColor: TEAL }}
            aria-hidden="true"
          >
            R
          </span>
          <h1 className="text-white font-semibold">Roberta — Test</h1>
        </div>
      </header>

      {/* Messaggi */}
      <div ref={scrollRef} className="flex-1 overflow-y-auto px-4 py-6">
        <div className="max-w-2xl mx-auto flex flex-col gap-3">
          {messages.length === 0 && (
            <p className="text-center text-sm text-gray-400 mt-8">
              Inizia la conversazione scrivendo un messaggio qui sotto.
            </p>
          )}
          {messages.map((m, i) => (
            <div
              key={i}
              className={`flex ${m.role === "user" ? "justify-end" : "justify-start"}`}
            >
              <div
                className="max-w-[80%] rounded-2xl px-4 py-2.5 text-sm leading-relaxed whitespace-pre-wrap break-words"
                style={
                  m.role === "user"
                    ? { backgroundColor: NAVY, color: "white", borderBottomRightRadius: 4 }
                    : { backgroundColor: "white", color: "#1f2937", borderBottomLeftRadius: 4, border: "1px solid #e5e7eb" }
                }
              >
                {m.content}
              </div>
            </div>
          ))}
          {loading && (
            <div className="flex justify-start">
              <div
                className="max-w-[80%] rounded-2xl px-4 py-2.5 text-sm text-gray-500 italic"
                style={{ backgroundColor: "white", borderBottomLeftRadius: 4, border: "1px solid #e5e7eb" }}
              >
                sta scrivendo…
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Input */}
      <form onSubmit={handleSubmit} className="px-4 py-4 bg-white border-t border-gray-200">
        <div className="max-w-2xl mx-auto flex items-center gap-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Scrivi un messaggio…"
            className="flex-1 py-3 px-4 rounded-full border border-gray-300 outline-none focus:border-[#2e8b72] transition-colors text-sm"
            aria-label="Messaggio"
          />
          <button
            type="submit"
            disabled={loading || !input.trim()}
            className="shrink-0 h-11 px-5 rounded-full font-semibold text-white transition-opacity disabled:opacity-40"
            style={{ backgroundColor: TEAL }}
          >
            Invia
          </button>
        </div>
      </form>
    </main>
  )
}
