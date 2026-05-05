"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { Menu, X } from "lucide-react"

const navLinks = [
  { href: "#chi-siamo", label: "Impianti" },
  { href: "#servizi", label: "Servizi" },
  { href: "#recensioni", label: "Recensioni" },
  { href: "#soluzioni", label: "Soluzioni" },
  { href: "#cer", label: "CER" },
  { href: "#contatti", label: "Contatti" },
]

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }
    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled 
          ? "bg-white border-b border-[#d0d6da]" 
          : "bg-transparent"
      }`}
    >
      <nav className="max-w-[1400px] mx-auto px-6 md:px-12 lg:px-16">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link href="/" className="relative h-16 w-40">
            <Image
              src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/logo_solair-removebg-preview-PfUS5nX8wvG7lum1UFtzJFCVB3CQ7I.png"
              alt="Solair Group"
              fill
              className="object-contain object-left"
              priority
            />
          </Link>

          {/* Desktop Navigation - DM Sans 11px uppercase */}
          <div className="hidden lg:flex items-center gap-10">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`overline transition-colors duration-300 ${
                  isScrolled 
                    ? "text-[#1e3a5f] hover:text-[#2e8b72]" 
                    : "text-white/90 hover:text-white"
                }`}
              >
                {link.label}
              </Link>
            ))}
            <Link
              href="/configuratore"
              className={`overline px-5 py-2 border transition-all duration-300 ${
                isScrolled 
                  ? "border-[#1e3a5f] text-[#1e3a5f] hover:bg-[#1e3a5f] hover:text-white" 
                  : "border-white/85 text-white hover:bg-white hover:text-[#1e3a5f]"
              }`}
            >
              Configuratore
            </Link>
          </div>

          {/* Mobile: CTA + Menu */}
          <div className="lg:hidden flex items-center gap-3">
            <Link
              href="/configuratore"
              className={`overline px-4 py-2 border transition-all duration-300 ${
                isScrolled 
                  ? "border-[#1e3a5f] text-[#1e3a5f]" 
                  : "border-white/85 text-white"
              }`}
            >
              Configura
            </Link>
            <button
              className={`p-2 transition-colors duration-300 ${
                isScrolled ? "text-[#1e3a5f]" : "text-white"
              }`}
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-label={isMobileMenuOpen ? "Chiudi menu" : "Apri menu"}
            >
              {isMobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="lg:hidden absolute top-full left-0 right-0 bg-white border-b border-[#d0d6da]">
            <div className="flex flex-col py-6 px-6">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="overline text-[#1e3a5f] py-3 border-b border-[#d0d6da] last:border-0"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>
        )}
      </nav>
    </header>
  )
}
