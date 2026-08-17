"use client"

import { useEffect } from "react"

// CTA principali da tracciare (match case-insensitive, parziale)
const CTA_LABELS = [
  "configura e ordina",
  "contatta un consulente",
  "richiedi preventivo",
  "contattaci",
]

function gaEvent(name: string, params: Record<string, unknown>) {
  if (typeof window === "undefined") return
  const gtag = (window as unknown as { gtag?: (...args: unknown[]) => void }).gtag
  if (typeof gtag !== "function") return
  gtag("event", name, params)
}

export function GaEventTracker() {
  useEffect(() => {
    function handleClick(e: MouseEvent) {
      const target = e.target as HTMLElement | null
      if (!target) return

      const pageLocation = window.location.href
      const anchor = target.closest("a") as HTMLAnchorElement | null
      const clickable = target.closest("a, button") as HTMLElement | null

      // Eventi basati sul link (href)
      if (anchor) {
        const href = anchor.getAttribute("href") || ""
        const lower = href.toLowerCase()
        const clickText = (anchor.textContent || "").trim().slice(0, 120)

        if (
          lower.includes("wa.me") ||
          lower.includes("api.whatsapp.com") ||
          lower.includes("whatsapp")
        ) {
          gaEvent("click_whatsapp", { link_url: href, page_location: pageLocation, click_text: clickText })
        } else if (lower.startsWith("tel:")) {
          gaEvent("click_phone", { link_url: href, page_location: pageLocation, click_text: clickText })
        } else if (lower.startsWith("mailto:")) {
          gaEvent("click_email", { link_url: href, page_location: pageLocation, click_text: clickText })
        }

        // Ingresso nel configuratore da un link
        if (lower.includes("/configuratore") || lower.includes("configuratore-solair")) {
          gaEvent("start_configurator", { page_location: pageLocation, click_text: clickText })
        }
      }

      // CTA principali (anche su <button> senza href)
      if (clickable) {
        const text = (clickable.textContent || "").trim()
        const normalized = text.toLowerCase()
        if (text && CTA_LABELS.some((label) => normalized.includes(label))) {
          const ctaHref =
            clickable.tagName === "A" ? (clickable as HTMLAnchorElement).getAttribute("href") || "" : ""
          gaEvent("cta_click", {
            cta_text: text.slice(0, 120),
            cta_href: ctaHref,
            page_location: pageLocation,
          })
        }
      }
    }

    document.addEventListener("click", handleClick, true)
    return () => document.removeEventListener("click", handleClick, true)
  }, [])

  return null
}
