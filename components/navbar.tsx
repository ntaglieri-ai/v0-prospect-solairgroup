"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Menu, X, MessageCircle } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"

const navLinks = [
  { href: "#home", label: "Home" },
  { href: "#soluzioni", label: "Le Nostre Soluzioni" },
  { href: "#testimonianze", label: "Dicono di Noi" },
  { href: "#lavora", label: "Collabora con Noi" },
  { href: "#cer", label: "Solair CER" },
]

const configuratoreLink = { href: "/configuratore", label: "Configuratore" }
const vendorLink = { href: "/area-venditori", label: "Area Venditori" }

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
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? "bg-white/95 backdrop-blur-md shadow-sm" : "bg-transparent"
      }`}
    >
      <nav className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8" aria-label="Navigazione principale">
        <div className="flex h-20 items-center justify-between">
          {/* Logo */}
          <Link href="#home" className="flex items-center gap-1" aria-label="Solair Group - Torna alla home">
            <span className="text-xl font-[var(--font-heading)] font-extrabold text-[#0D1F3C]">SOLAIR</span>
            <span className="text-[#F5C842] text-xl">⚡</span>
            <span className="text-sm font-[var(--font-heading)] font-medium text-[#0D1F3C]">GROUP</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-sm font-medium text-[#0D1F3C] hover:text-[#1A4A4A] transition-colors"
              >
                {link.label}
              </Link>
            ))}
            <div className="flex items-center gap-2">
              <Link
                href={configuratoreLink.href}
                className="text-sm font-medium text-[#4A9ECA] border border-[#4A9ECA] rounded-full px-4 py-1.5 hover:bg-[#4A9ECA] hover:text-white transition-all"
              >
                {configuratoreLink.label}
              </Link>
              <Link
                href={vendorLink.href}
                className="text-sm font-medium text-[#F5A623] border border-[#F5A623] rounded-full px-4 py-1.5 hover:bg-[#F5A623] hover:text-white transition-all"
              >
                {vendorLink.label}
              </Link>
            </div>
          </div>

          {/* CTA Button */}
          <div className="hidden lg:block">
            <Button
              asChild
              className="bg-[#1A4A4A] hover:bg-[#1B6B6B] text-white rounded-full px-6 py-2 font-medium"
            >
              <a
                href="https://wa.me/390952900278"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Contattaci su WhatsApp"
              >
                <MessageCircle className="mr-2 h-4 w-4" />
                WhatsApp
              </a>
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="lg:hidden p-2 text-[#0D1F3C]"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label={isMobileMenuOpen ? "Chiudi menu" : "Apri menu"}
            aria-expanded={isMobileMenuOpen}
          >
            {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="lg:hidden bg-white rounded-2xl mt-2 shadow-lg overflow-hidden"
            >
              <div className="flex flex-col gap-4 p-6">
                {navLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className="text-base font-medium text-[#0D1F3C] hover:text-[#1A4A4A] transition-colors"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    {link.label}
                  </Link>
                ))}
                <Link
                  href={configuratoreLink.href}
                  className="text-base font-medium text-[#4A9ECA] hover:text-[#3a8ab8] transition-colors"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {configuratoreLink.label}
                </Link>
                <Link
                  href={vendorLink.href}
                  className="text-base font-medium text-[#F5A623] hover:text-[#e09620] transition-colors"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {vendorLink.label}
                </Link>
                <Button
                  asChild
                  className="bg-[#1A4A4A] hover:bg-[#1B6B6B] text-white rounded-full px-6 py-2 font-medium w-full mt-2"
                >
                  <a
                    href="https://wa.me/390952900278"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Contattaci su WhatsApp"
                  >
                    <MessageCircle className="mr-2 h-4 w-4" />
                    WhatsApp
                  </a>
                </Button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    </header>
  )
}
