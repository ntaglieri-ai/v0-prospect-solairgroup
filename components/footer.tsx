"use client"

import Link from "next/link"
import Image from "next/image"
import { useDatiAziendali } from "@/lib/context/dati-aziendali-context"
import { Phone, Mail, MessageCircle } from "lucide-react"

const navLinks = [
  { href: "/#chi-siamo", label: "Impianti" },
  { href: "/#servizi", label: "Servizi" },
  { href: "/#recensioni", label: "Recensioni" },
  { href: "/#soluzioni", label: "Soluzioni" },
  { href: "/#cer", label: "CER" },
  { href: "/#contatti", label: "Contatti" },
  { href: "/faq", label: "FAQ" },
]

export function Footer() {
  const datiAziendali = useDatiAziendali()
  
  const telefono = datiAziendali?.telefono || "+39 095 290 0278"
  const whatsappRaw = datiAziendali?.whatsapp || "+39 095 290 0278"
  const email = datiAziendali?.email || "info@solairgroup.it"
  const facebook = datiAziendali?.facebook
  const instagram = datiAziendali?.instagram
  const linkedin = datiAziendali?.linkedin

  // Extract phone number from WhatsApp field (handles both URL and plain number)
  const whatsappNumber = whatsappRaw.includes("wa.me/") 
    ? whatsappRaw.replace(/.*wa\.me\//, "").replace(/[^0-9]/g, "")
    : whatsappRaw.replace(/[^0-9]/g, "")
  
  // Format display number with +39 prefix
  const whatsappDisplay = whatsappNumber.startsWith("39") 
    ? `+${whatsappNumber.slice(0, 2)} ${whatsappNumber.slice(2, 5)} ${whatsappNumber.slice(5, 8)} ${whatsappNumber.slice(8)}`
    : `+39 ${whatsappNumber}`
  
  // WhatsApp link
  const whatsappLink = `https://wa.me/${whatsappNumber}`
  
  return (
    <footer className="relative bg-gradient-to-b from-[#1e3a5f] to-[#0f2240] text-white border-t border-white/10">
      {/* Top gradient border */}
      <div 
        className="absolute top-0 left-0 right-0 h-1"
        style={{ 
          background: "linear-gradient(90deg, #2e8b72 0%, #1e3a5f 50%, #e07a3a 100%)" 
        }}
      />
      
      <div className="mx-auto max-w-7xl px-6 lg:px-8 py-20">
        
        {/* ===== MOBILE LAYOUT ===== */}
        <div className="md:hidden flex flex-col items-center text-center">
          {/* Logo */}
          <Link href="/" className="relative inline-block h-12 w-32 mb-8">
            <Image
              src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/WhatsApp_Image_2026-05-05_at_18.34.28-removebg-preview-rlWc3q38NGodyFUqcCA2TsRp7eyfiY.png"
              alt="Solair Group"
              fill
              className="object-contain brightness-0 invert"
            />
          </Link>
          
          {/* Navigazione */}
          <h4 className="text-xs font-medium tracking-[0.2em] uppercase text-white/90 mb-4" style={{ fontFamily: "var(--font-dm-sans)" }}>
            Navigazione
          </h4>
          <div className="flex flex-wrap justify-center gap-x-5 gap-y-3 mb-10">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-sm text-gray-300 hover:text-white transition-colors duration-200"
                style={{ fontFamily: "var(--font-dm-sans)" }}
              >
                {link.label}
              </Link>
            ))}
          </div>
          
          {/* Contatti */}
          <h4 className="text-xs font-medium tracking-[0.2em] uppercase text-white/90 mb-4" style={{ fontFamily: "var(--font-dm-sans)" }}>
            Contatti
          </h4>
          <div className="space-y-3 mb-8">
            <a 
              href={`tel:${telefono}`}
              className="flex items-center justify-center gap-3 text-sm text-white/70 hover:text-white transition-colors duration-200"
              style={{ fontFamily: "var(--font-dm-sans)" }}
            >
              <Phone size={18} className="text-white/50" />
              {telefono}
            </a>
            <a 
              href={whatsappLink}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-3 text-sm text-white/70 hover:text-white transition-colors duration-200"
              style={{ fontFamily: "var(--font-dm-sans)" }}
            >
              <MessageCircle size={18} className="text-white/50" />
              {whatsappDisplay}
            </a>
            <a 
              href={`mailto:${email}`}
              className="flex items-center justify-center gap-3 text-sm text-white/70 hover:text-white transition-colors duration-200"
              style={{ fontFamily: "var(--font-dm-sans)" }}
            >
              <Mail size={18} className="text-white/50" />
              {email}
            </a>
          </div>
          
          {/* Social Links */}
          {(facebook || instagram || linkedin) && (
            <div className="flex items-center justify-center gap-6 mb-10">
              {facebook && (
                <a 
                  href={facebook}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white/50 hover:text-[#e07a3a] transition-all duration-300 hover:scale-110"
                  aria-label="Facebook"
                >
                  <svg className="w-7 h-7" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                  </svg>
                </a>
              )}
              {instagram && (
                <a 
                  href={instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white/50 hover:text-[#e07a3a] transition-all duration-300 hover:scale-110"
                  aria-label="Instagram"
                >
                  <svg className="w-7 h-7" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                  </svg>
                </a>
              )}
              {linkedin && (
                <a 
                  href={linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white/50 hover:text-[#2e8b72] transition-all duration-300 hover:scale-110"
                  aria-label="LinkedIn"
                >
                  <svg className="w-7 h-7" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                  </svg>
                </a>
              )}
            </div>
          )}
          
          {/* Description */}
          <p className="text-xs text-white/50 font-light mb-2" style={{ fontFamily: "var(--font-dm-sans)" }}>
            Solair Group S.r.l. — P.IVA 06056640870
          </p>
          <p className="text-xs text-white/40 font-light" style={{ fontFamily: "var(--font-dm-sans)" }}>
            Sedi a Catania, Giarre (CT), Treviso (TV) e Torino (TO)
          </p>
        </div>

        {/* ===== DESKTOP LAYOUT ===== */}
        <div className="hidden md:block">
          {/* Header Row: Logo + Navigazione + Contatti titles aligned */}
          <div className="grid grid-cols-3 gap-8 mb-3">
            {/* Logo - Left */}
            <div>
              <Link href="/" className="relative inline-block h-10 w-28">
                <Image
                  src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/WhatsApp_Image_2026-05-05_at_18.34.28-removebg-preview-rlWc3q38NGodyFUqcCA2TsRp7eyfiY.png"
                  alt="Solair Group"
                  fill
                  className="object-contain object-left brightness-0 invert"
                />
              </Link>
            </div>
            
            {/* Navigazione Title - Center */}
            <div className="text-center">
              <h4 className="text-xs font-medium tracking-[0.2em] uppercase text-white/90" style={{ fontFamily: "var(--font-dm-sans)" }}>
                Navigazione
              </h4>
            </div>
            
            {/* Contatti Title - Right */}
            <div className="text-right">
              <h4 className="text-xs font-medium tracking-[0.2em] uppercase text-white/90" style={{ fontFamily: "var(--font-dm-sans)" }}>
                Contatti
              </h4>
            </div>
          </div>
          
          {/* Content Row: Description + Nav Links + Contact Info */}
          <div className="grid grid-cols-3 gap-8 mb-16">
            {/* Description - Left */}
            <div>
              <p className="text-sm text-white/70 font-light leading-relaxed mb-4" style={{ fontFamily: "var(--font-dm-sans)" }}>
                Solair Group opera in tutta Italia con sedi a Catania, Giarre (CT), Treviso (TV) e Torino (TO)
              </p>
              <p className="text-xs text-white/50 font-light" style={{ fontFamily: "var(--font-dm-sans)" }}>
                Solair Group S.r.l. — P.IVA 06056640870
              </p>
            </div>

            {/* Navigation Links - Center */}
            <div className="text-center">
              <div className="flex flex-wrap justify-center gap-x-6 gap-y-3">
                {navLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className="text-sm text-gray-300 hover:text-white transition-colors duration-200"
                    style={{ fontFamily: "var(--font-dm-sans)" }}
                  >
                    {link.label}
                  </Link>
                ))}
              </div>
            </div>

            {/* Contact Info - Right */}
            <div className="text-right">
              <div className="space-y-4">
                <a 
                  href={`tel:${telefono}`}
                  className="flex items-center justify-end gap-3 text-sm text-white/70 hover:text-white transition-colors duration-200"
                  style={{ fontFamily: "var(--font-dm-sans)" }}
                >
                  <Phone size={18} className="text-white/50" />
                  {telefono}
                </a>
                <a 
                  href={whatsappLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-end gap-3 text-sm text-white/70 hover:text-white transition-colors duration-200"
                  style={{ fontFamily: "var(--font-dm-sans)" }}
                >
                  <MessageCircle size={18} className="text-white/50" />
                  {whatsappDisplay}
                </a>
                <a 
                  href={`mailto:${email}`}
                  className="flex items-center justify-end gap-3 text-sm text-white/70 hover:text-white transition-colors duration-200"
                  style={{ fontFamily: "var(--font-dm-sans)" }}
                >
                  <Mail size={18} className="text-white/50" />
                  {email}
                </a>
              </div>

              {/* Social Links */}
              {(facebook || instagram || linkedin) && (
                <div className="flex items-center justify-end gap-5 mt-8">
                  {facebook && (
                    <a 
                      href={facebook}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-white/50 hover:text-[#e07a3a] transition-all duration-300 hover:scale-110"
                      aria-label="Facebook"
                    >
                      <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                      </svg>
                    </a>
                  )}
                  {instagram && (
                    <a 
                      href={instagram}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-white/50 hover:text-[#e07a3a] transition-all duration-300 hover:scale-110"
                      aria-label="Instagram"
                    >
                      <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                      </svg>
                    </a>
                  )}
                  {linkedin && (
                    <a 
                      href={linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-white/50 hover:text-[#2e8b72] transition-all duration-300 hover:scale-110"
                      aria-label="LinkedIn"
                    >
                      <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                      </svg>
                    </a>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-white/10 pt-8">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-xs text-white/40 text-center sm:text-left" style={{ fontFamily: "var(--font-dm-sans)" }}>
              © {new Date().getFullYear()} Solair Group S.r.l. — P.IVA 06056640870. Tutti i diritti riservati.
            </p>
            <div className="flex items-center gap-6">
              <Link href="/faq" className="text-xs text-white/40 hover:text-white/70 transition-colors duration-200" style={{ fontFamily: "var(--font-dm-sans)" }}>
                FAQ
              </Link>
              <a 
                href="https://www.iubenda.com/privacy-policy/56116406" 
                className="iubenda-white iubenda-noiframe iubenda-embed text-xs text-white/40 hover:text-white/70 transition-colors duration-200" 
                title="Privacy Policy"
                style={{ fontFamily: "var(--font-dm-sans)" }}
              >
                Privacy Policy
              </a>
              <a 
                href="https://www.iubenda.com/privacy-policy/56116406/cookie-policy" 
                className="iubenda-white iubenda-noiframe iubenda-embed text-xs text-white/40 hover:text-white/70 transition-colors duration-200" 
                title="Cookie Policy"
                style={{ fontFamily: "var(--font-dm-sans)" }}
              >
                Cookie Policy
              </a>
              <a 
                href="/condizioni-generali-solair.pdf" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-xs text-white/40 hover:text-white/70 transition-colors duration-200" 
                style={{ fontFamily: "var(--font-dm-sans)" }}
              >
                Termini e Condizioni
              </a>
              <a 
                href="https://solairgroup.sanity.studio" 
                target="_blank" 
                rel="noopener noreferrer"
                className="hidden sm:inline text-xs text-white/40 hover:text-white/70 transition-colors duration-200" 
                style={{ fontFamily: "var(--font-dm-sans)" }}
              >
                Area Riservata
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
