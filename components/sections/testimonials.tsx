'use client'

import { useEffect, useState, useRef } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'

interface Recensione {
  _id: string
  nome: string
  testo: string
  stelle: number
}

function StarRating({ stelle }: { stelle: number }) {
  return (
    <div className="flex gap-0.5">
      {[1, 2, 3, 4, 5].map((i) => (
        <svg
          key={i}
          className={`h-4 w-4 ${i <= stelle ? 'text-[#2e8b72]' : 'text-gray-300'}`}
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
    </div>
  )
}

function GoogleBadge() {
  return (
    <div className="flex items-center gap-1.5 text-xs text-gray-500">
      <svg className="h-4 w-4" viewBox="0 0 24 24">
        <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
        <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
        <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
        <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
      </svg>
      <span>Google</span>
    </div>
  )
}

function ReviewCard({ recensione }: { recensione: Recensione }) {
  const [expanded, setExpanded] = useState(false)
  const [needsExpand, setNeedsExpand] = useState(false)
  const textRef = useRef<HTMLParagraphElement>(null)

  useEffect(() => {
    if (textRef.current) {
      const lineHeight = parseInt(getComputedStyle(textRef.current).lineHeight)
      const maxHeight = lineHeight * 3
      setNeedsExpand(textRef.current.scrollHeight > maxHeight + 5)
    }
  }, [recensione.testo])

  return (
    <div className="bg-white rounded-xl shadow-md p-6 flex flex-col h-full border border-gray-100">
      <div className="flex items-start justify-between mb-3">
        <StarRating stelle={recensione.stelle} />
        <GoogleBadge />
      </div>
      <p className="font-bold text-[#1e3a5f] mb-2">{recensione.nome}</p>
      <div className="flex-1">
        <p
          ref={textRef}
          className={`text-sm text-gray-600 leading-relaxed ${!expanded ? 'line-clamp-3' : ''}`}
        >
          {recensione.testo}
        </p>
        {needsExpand && (
          <button
            onClick={() => setExpanded(!expanded)}
            className="text-xs text-[#2e8b72] font-medium mt-2 hover:underline"
          >
            {expanded ? 'Mostra meno' : 'Leggi tutto'}
          </button>
        )}
      </div>
    </div>
  )
}

export function TestimonialsSection() {
  const [recensioni, setRecensioni] = useState<Recensione[]>([])
  const [loading, setLoading] = useState(true)
  const [currentPage, setCurrentPage] = useState(0)
  const scrollRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    async function fetchRecensioni() {
      try {
        const res = await fetch('/api/recensioni')
        if (res.ok) {
          const data = await res.json()
          setRecensioni(data)
        }
      } catch (e) {
        console.error('Errore caricamento recensioni:', e)
      } finally {
        setLoading(false)
      }
    }
    fetchRecensioni()
  }, [])

  const totalPages = Math.ceil(recensioni.length / 3)
  const visibleReviews = recensioni.slice(currentPage * 3, currentPage * 3 + 3)

  const goToPage = (page: number) => {
    setCurrentPage(page)
  }

  const scroll = (direction: 'left' | 'right') => {
    if (direction === 'left' && currentPage > 0) {
      setCurrentPage(currentPage - 1)
    } else if (direction === 'right' && currentPage < totalPages - 1) {
      setCurrentPage(currentPage + 1)
    }
  }

  return (
    <section id="recensioni" className="relative py-16 sm:py-24 bg-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 w-full">
        {/* Header */}
        <div className="text-center mb-10 sm:mb-16">
          <div className="inline-flex items-center gap-2 bg-gray-100 rounded-full px-4 py-2 mb-6">
            <span className="text-[#2e8b72] font-bold text-lg">4.8</span>
            <svg className="h-5 w-5 text-[#2e8b72]" fill="currentColor" viewBox="0 0 20 20">
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
            <span className="text-gray-600 text-sm">basato su 105 recensioni Google</span>
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-[#1e3a5f] tracking-tight px-2">
            Cosa dicono i nostri clienti
          </h2>
        </div>

        {loading ? (
          <div className="flex justify-center items-center py-20">
            <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-[#2e8b72]"></div>
          </div>
        ) : recensioni.length === 0 ? (
          <p className="text-center text-gray-500">Nessuna recensione disponibile</p>
        ) : (
          <div className="relative">
            {/* Navigation buttons */}
            <button
              onClick={() => scroll('left')}
              disabled={currentPage === 0}
              className="hidden lg:flex absolute -left-4 top-1/2 -translate-y-1/2 z-10 bg-white shadow-lg rounded-full p-2 hover:bg-gray-50 transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
              aria-label="Precedente"
            >
              <ChevronLeft className="h-6 w-6 text-[#1e3a5f]" />
            </button>
            <button
              onClick={() => scroll('right')}
              disabled={currentPage >= totalPages - 1}
              className="hidden lg:flex absolute -right-4 top-1/2 -translate-y-1/2 z-10 bg-white shadow-lg rounded-full p-2 hover:bg-gray-50 transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
              aria-label="Successiva"
            >
              <ChevronRight className="h-6 w-6 text-[#1e3a5f]" />
            </button>

            {/* Mobile: horizontal scroll carousel */}
            <div
              ref={scrollRef}
              className="flex gap-4 overflow-x-auto snap-x snap-mandatory scrollbar-hide pb-4 lg:hidden"
              style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
            >
              {recensioni.map((recensione) => (
                <div key={recensione._id} className="snap-start flex-shrink-0 w-[85vw] sm:w-[320px]">
                  <ReviewCard recensione={recensione} />
                </div>
              ))}
            </div>

            {/* Desktop: 3-column grid with pagination */}
            <div className="hidden lg:grid lg:grid-cols-3 gap-6">
              {visibleReviews.map((recensione) => (
                <div key={recensione._id}>
                  <ReviewCard recensione={recensione} />
                </div>
              ))}
            </div>

            {/* Dot navigation */}
            {totalPages > 1 && (
              <div className="flex justify-center gap-2 mt-8">
                {Array.from({ length: totalPages }).map((_, index) => (
                  <button
                    key={index}
                    onClick={() => goToPage(index)}
                    className={`w-2.5 h-2.5 rounded-full transition-colors ${
                      index === currentPage ? 'bg-[#2e8b72]' : 'bg-[#c5cdd5] hover:bg-[#9aa5b0]'
                    }`}
                    aria-label={`Pagina ${index + 1}`}
                  />
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </section>
  )
}
