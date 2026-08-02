import type { Metadata } from "next"
import ChatTestClient from "./chat-test-client"

export const metadata: Metadata = {
  robots: "noindex, nofollow",
  title: "Roberta — Test",
}

export default function ChatTestPage() {
  return <ChatTestClient />
}
