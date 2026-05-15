import Script from 'next/script'

export function TestimonialsSection() {
  return (
    <section id="recensioni" className="relative min-h-[60vh] py-12 sm:py-[100px] bg-gray-50 flex items-center mb-0">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 w-full">
        {/* Header */}
        <div className="text-center mb-10 sm:mb-16">
          <p className="text-xs sm:text-sm font-semibold uppercase tracking-widest text-[#2e8b72] mb-3 sm:mb-4">Testimonianze</p>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-[#1e3a5f] tracking-tight mb-6 sm:mb-8 px-2">
            Cosa dicono i nostri clienti
          </h2>
        </div>

        {/* Elfsight Google Reviews Widget */}
        <Script src="https://static.elfsight.com/platform/platform.js" strategy="lazyOnload" />
        <div className="elfsight-app-09d2873f-d2ff-4a6c-abd8-db184300f4e0" data-elfsight-app-lazy></div>
      </div>
    </section>
  )
}
