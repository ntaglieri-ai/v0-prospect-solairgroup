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
          {/* Logo - Refined without emoji */}
          <Link href="#home" className="flex items-center gap-2" aria-label="Solair Group - Torna alla home">
            <span className="text-xl font-[var(--font-display)] font-semibold tracking-wide text-[#F2EDE4]">
              SOLAIR
            </span>
            <span className="text-xs font-[var(--font-body)] font-light tracking-[0.3em] text-[#F2EDE4]/60 uppercase">
              Group
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-12">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-[11px] font-light tracking-[0.25em] uppercase text-[#F2EDE4]/70 hover:text-[#C8A96E] transition-colors duration-300"
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* CTA Buttons */}
          <div className="hidden lg:flex items-center gap-4">
            <Link
              href={configuratoreLink.href}
              className="text-[11px] font-light tracking-[0.2em] uppercase text-[#F2EDE4]/80 border border-[#F2EDE4]/20 px-5 py-2.5 hover:bg-[#F2EDE4] hover:text-[#0A0A08] transition-all duration-300"
            >
              {configuratoreLink.label}
            </Link>
          </div>

          {/* Mobile: Configuratore button + Menu Button */}
          <div className="lg:hidden flex items-center gap-3">
            <Link
              href={configuratoreLink.href}
              className="text-[10px] font-light tracking-[0.15em] uppercase text-[#F2EDE4]/80 border border-[#F2EDE4]/20 px-4 py-2 hover:bg-[#F2EDE4] hover:text-[#0A0A08] transition-all duration-300"
            >
              Configura
            </Link>
            <button
              className="p-2 text-[#F2EDE4]/70 hover:text-[#F2EDE4] transition-colors"
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
              <div className="flex flex-col gap-1 py-6 border-t border-[#F2EDE4]/10">
                {navLinks.map((link, index) => (
                  <motion.div
                    key={link.href}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.05 }}
                  >
                    <Link
                      href={link.href}
                      className="block py-3 text-[11px] font-light tracking-[0.25em] uppercase text-[#F2EDE4]/70 hover:text-[#C8A96E] transition-colors"
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
                  className="pt-4 mt-4 border-t border-[#F2EDE4]/10"
                >
                  <a
                    href="https://wa.me/390952900278"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block py-3 text-[11px] font-light tracking-[0.25em] uppercase text-[#C8A96E] hover:text-[#F2EDE4] transition-colors"
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
