"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Menu, X } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"

const navLinks = [
  { href: "#home", label: "Home" },
  { href: "#soluzioni", label: "Soluzioni" },
  { href: "#testimonianze", label: "Testimonianze" },
  { href: "#lavora", label: "Collabora" },
  { href: "#cer", label: "CER" },
]

const configuratoreLink = { href: "/configuratore", label: "Configuratore" }

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled 
          ? "glass py-4" 
          : "bg-transparent py-6"
      }`}
    >
      <nav className="mx-auto max-w-7xl px-6 lg:px-8" aria-label="Navigazione principale">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link href="#home" className="flex items-center gap-2" aria-label="Solair Group - Torna alla home">
            <span className={`text-xl font-[var(--font-display)] font-medium tracking-wide transition-colors duration-300 ${isScrolled ? "text-[#0A0A0A]" : "text-white"}`}>
              SOLAIR
            </span>
            <span className={`text-xs font-[var(--font-body)] font-light tracking-[0.3em] uppercase transition-colors duration-300 ${isScrolled ? "text-[#0A0A0A]/60" : "text-white/60"}`}>
              Group
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-12">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`text-[11px] font-light tracking-[0.25em] uppercase transition-colors duration-300 ${isScrolled ? "text-[#0A0A0A]/70 hover:text-[#0A0A0A]" : "text-white/70 hover:text-white"}`}
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* CTA Buttons */}
          <div className="hidden lg:flex items-center gap-4">
            <Link
              href={configuratoreLink.href}
              className={`text-[11px] font-light tracking-[0.2em] uppercase px-5 py-2.5 transition-all duration-300 border ${isScrolled ? "text-[#0A0A0A] border-[#0A0A0A]/20 hover:bg-[#0A0A0A] hover:text-white" : "text-white border-white/30 hover:bg-white hover:text-[#0A0A0A]"}`}
            >
              {configuratoreLink.label}
            </Link>
          </div>

          {/* Mobile: Configuratore button + Menu Button */}
          <div className="lg:hidden flex items-center gap-3">
            <Link
              href={configuratoreLink.href}
              className={`text-[10px] font-light tracking-[0.15em] uppercase px-4 py-2 transition-all duration-300 border ${isScrolled ? "text-[#0A0A0A] border-[#0A0A0A]/20 hover:bg-[#0A0A0A] hover:text-white" : "text-white border-white/30 hover:bg-white hover:text-[#0A0A0A]"}`}
            >
              Configura
            </Link>
            <button
              className={`p-2 transition-colors ${isScrolled ? "text-[#0A0A0A]/70 hover:text-[#0A0A0A]" : "text-white/70 hover:text-white"}`}
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-label={isMobileMenuOpen ? "Chiudi menu" : "Apri menu"}
              aria-expanded={isMobileMenuOpen}
            >
              {isMobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="lg:hidden mt-6 overflow-hidden"
            >
              <div className={`flex flex-col gap-1 py-6 border-t ${isScrolled ? "border-[#0A0A0A]/10" : "border-white/10"}`}>
                {navLinks.map((link, index) => (
                  <motion.div
                    key={link.href}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.05 }}
                  >
                    <Link
                      href={link.href}
                      className={`block py-3 text-[11px] font-light tracking-[0.25em] uppercase transition-colors ${isScrolled ? "text-[#0A0A0A]/70 hover:text-[#0A0A0A]" : "text-white/70 hover:text-white"}`}
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      {link.label}
                    </Link>
                  </motion.div>
                ))}
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: navLinks.length * 0.05 }}
                  className={`pt-4 mt-4 border-t ${isScrolled ? "border-[#0A0A0A]/10" : "border-white/10"}`}
                >
                  <a
                    href="https://wa.me/390952900278"
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`block py-3 text-[11px] font-light tracking-[0.25em] uppercase transition-colors ${isScrolled ? "text-[#0A0A0A] hover:text-[#0A0A0A]/70" : "text-white hover:text-white/70"}`}
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    Contattaci su WhatsApp
                  </a>
                </motion.div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    </header>
  )
}
