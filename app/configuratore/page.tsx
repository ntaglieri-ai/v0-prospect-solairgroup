import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Configuratore Fotovoltaico | Solair Group",
  description:
    "Configura il tuo impianto fotovoltaico personalizzato. Scegli la soluzione giusta e ricevi la tua offerta in pochi minuti.",
}

export default function ConfiguratorePage() {
  return (
    <main className="w-full h-screen">
      <iframe
        src="/configuratore.html"
        title="Configuratore Fotovoltaico Solair Group"
        className="w-full h-full border-0"
        allow="fullscreen"
      />
    </main>
  )
}
