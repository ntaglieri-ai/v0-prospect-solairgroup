import { NextResponse } from "next/server"

export const dynamic = "force-dynamic"

type ChatMessage = {
  role: "user" | "assistant"
  content: string
}

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const messages: ChatMessage[] = Array.isArray(body?.messages) ? body.messages : []

    // STUB: la vera logica con Claude verrà aggiunta in un secondo momento.
    // Per ora rispondiamo con un messaggio fisso.
    const reply: ChatMessage = {
      role: "assistant",
      content: "Ciao! Sono in fase di test, presto sarò operativa.",
    }

    // Riferimento a messages per evitare warning di variabile inutilizzata
    void messages.length

    return NextResponse.json({ message: reply })
  } catch (e) {
    return NextResponse.json(
      { error: "Richiesta non valida" },
      { status: 400 },
    )
  }
}
