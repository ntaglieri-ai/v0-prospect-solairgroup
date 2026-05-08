"use client"

import { useState } from "react"
import { ChevronDown } from "lucide-react"
import type { FAQ } from "@/lib/sanity/queries"

interface FAQAccordionProps {
  faqs: FAQ[]
}

export function FAQAccordion({ faqs }: FAQAccordionProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  const toggleAccordion = (index: number) => {
    setOpenIndex(openIndex === index ? null : index)
  }

  return (
    <div className="space-y-0">
      {faqs.map((faq, index) => (
        <div
          key={index}
          className="border-b border-[#d0d6da] last:border-b-0"
        >
          <button
            onClick={() => toggleAccordion(index)}
            className="w-full py-6 flex items-center justify-between text-left group"
            aria-expanded={openIndex === index}
          >
            <span 
              className="text-[#1e3a5f] font-medium pr-8 group-hover:text-[#2e8b72] transition-colors"
              style={{ fontFamily: "var(--font-dm-sans)", fontSize: "1.1rem" }}
            >
              {faq.domanda}
            </span>
            <ChevronDown 
              className={`w-5 h-5 text-[#8a9aaa] flex-shrink-0 transition-transform duration-300 ${
                openIndex === index ? "rotate-180" : ""
              }`}
            />
          </button>
          <div
            className={`overflow-hidden transition-all duration-300 ease-out ${
              openIndex === index ? "max-h-96 pb-6" : "max-h-0"
            }`}
          >
            <p 
              className="text-[#4a6080] leading-relaxed pr-12"
              style={{ fontFamily: "var(--font-dm-sans)", fontSize: "0.95rem" }}
            >
              {faq.risposta}
            </p>
          </div>
        </div>
      ))}
    </div>
  )
}
