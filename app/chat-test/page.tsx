import type { Metadata } from "next"
import ChatTestClient from "./chat-test-client"

export const metadata: Metadata = {
  robots: "noindex, nofollow",
  title: "Sofia — Test",
}

export default function ChatTestPage() {
  return <ChatTestClient />
}
