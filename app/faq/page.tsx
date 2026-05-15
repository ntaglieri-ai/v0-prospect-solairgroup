import { sanityFetch } from "@/lib/sanity"
import { faqQuery, type FAQ } from "@/lib/sanity/queries"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { FAQAccordion } from "./faq-accordion"

export const metadata = {
  title: "FAQ - Domande Frequenti | Solair Group",
  description: "Trova risposte alle domande più frequenti su impianti fotovoltaici, installazione, garanzie e incentivi.",
  alternates: {
    canonical: "https://solairgroup.it/faq",
  },
  openGraph: {
    title: "FAQ - Domande Frequenti | Solair Group",
    description: "Trova risposte alle domande più frequenti su impianti fotovoltaici, installazione, garanzie e incentivi.",
    url: "https://solairgroup.it/faq",
  },
}

export default async function FAQPage() {
  let faqs: FAQ[] = []
  
  try {
    faqs = await sanityFetch<FAQ[]>({
      query: faqQuery,
      tags: ["faq"],
    })
  } catch (error) {
    console.error("Error fetching FAQs:", error)
  }

  // Group FAQs by category
  const groupedFaqs = faqs.reduce((acc, faq) => {
    const category = faq.categoria || "Generale"
    if (!acc[category]) acc[category] = []
    acc[category].push(faq)
    return acc
  }, {} as Record<string, FAQ[]>)

  return (
    <>
      <Navbar forceDark />
      <main className="min-h-screen bg-[#f4f6f7]">
        {/* Header */}
        <section className="pt-32 pb-16 px-6 md:px-12 lg:px-20">
          <div className="max-w-4xl mx-auto text-center">
            <p className="overline text-[#8a9aaa] mb-4">Supporto</p>
            <h1 className="font-heading text-[#1e3a5f] mb-6" style={{ fontSize: "clamp(2.5rem, 5vw, 4rem)" }}>
              Domande Frequenti
            </h1>
            <p className="body-text text-[#4a6080] max-w-2xl mx-auto">
              Trova risposte alle domande piu comuni su impianti fotovoltaici, installazione, garanzie e incentivi statali.
            </p>
          </div>
        </section>

        {/* FAQ Accordion */}
        <section className="pb-24 px-6 md:px-12 lg:px-20">
          <div className="max-w-3xl mx-auto">
            {Object.keys(groupedFaqs).length > 0 ? (
              Object.entries(groupedFaqs).map(([category, categoryFaqs]) => (
                <div key={category} className="mb-12">
                  {Object.keys(groupedFaqs).length > 1 && (
                    <h2 className="overline text-[#2e8b72] mb-6">{category}</h2>
                  )}
                  <FAQAccordion faqs={categoryFaqs} />
                </div>
              ))
            ) : (
              <p className="text-center text-[#4a6080]">
                Nessuna FAQ disponibile al momento.
              </p>
            )}
          </div>
        </section>

        {/* CTA Section */}
        <section className="pb-24 px-6 md:px-12 lg:px-20">
          <div className="max-w-3xl mx-auto text-center bg-white p-12 border border-[#d0d6da]">
            <h3 className="font-heading text-[#1e3a5f] mb-4" style={{ fontSize: "1.5rem" }}>
              Non hai trovato la risposta?
            </h3>
            <p className="body-text text-[#4a6080] mb-8">
              Contattaci direttamente, saremo felici di aiutarti.
            </p>
            <a href="/#contatti" className="btn-outline text-[#1e3a5f]">
              Contattaci
            </a>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
