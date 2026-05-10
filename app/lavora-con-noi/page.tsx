import { sanityFetch } from "@/lib/sanity"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { PortableText } from "@portabletext/react"

// Types for Sanity data
interface Posizione {
  titolo: string
  descrizione: any[] // Portable Text
}

interface LavoraConNoiData {
  titoloPagina: string
  introduzione: any[] // Portable Text
  posizioni: Posizione[]
}

// GROQ query for the page
const lavoraConNoiQuery = `*[_type == "lavoraConNoi"][0]{
  titoloPagina,
  introduzione,
  "posizioni": posizioni[attivo == true]{
    titolo,
    descrizione
  }
}`

// Query for datiAziendali to get email
const datiAziendaliQuery = `*[_type == "datiAziendali"][0]{ email }`

export const metadata = {
  title: "Lavora con Noi | Solair Group",
  description: "Scopri le posizioni aperte in Solair Group. Unisciti al nostro team e contribuisci alla transizione energetica.",
}

// Portable Text components for styling
const portableTextComponents = {
  block: {
    normal: ({ children }: { children: React.ReactNode }) => (
      <p className="body-text text-[#4a6080] mb-4 last:mb-0">{children}</p>
    ),
    h2: ({ children }: { children: React.ReactNode }) => (
      <h2 className="font-heading text-[#1e3a5f] text-2xl mb-4">{children}</h2>
    ),
    h3: ({ children }: { children: React.ReactNode }) => (
      <h3 className="font-heading text-[#1e3a5f] text-xl mb-3">{children}</h3>
    ),
  },
  list: {
    bullet: ({ children }: { children: React.ReactNode }) => (
      <ul className="list-disc list-inside text-[#4a6080] mb-4 space-y-2">{children}</ul>
    ),
    number: ({ children }: { children: React.ReactNode }) => (
      <ol className="list-decimal list-inside text-[#4a6080] mb-4 space-y-2">{children}</ol>
    ),
  },
  listItem: {
    bullet: ({ children }: { children: React.ReactNode }) => (
      <li className="body-text">{children}</li>
    ),
    number: ({ children }: { children: React.ReactNode }) => (
      <li className="body-text">{children}</li>
    ),
  },
  marks: {
    strong: ({ children }: { children: React.ReactNode }) => (
      <strong className="font-semibold text-[#1e3a5f]">{children}</strong>
    ),
    em: ({ children }: { children: React.ReactNode }) => (
      <em>{children}</em>
    ),
    link: ({ value, children }: { value?: { href?: string }; children: React.ReactNode }) => (
      <a href={value?.href} className="text-[#2e8b72] underline hover:text-[#1e3a5f] transition-colors" target="_blank" rel="noopener noreferrer">
        {children}
      </a>
    ),
  },
}

export default async function LavoraConNoiPage() {
  let data: LavoraConNoiData | null = null
  let email: string = "info@solairgroup.it"
  
  try {
    data = await sanityFetch<LavoraConNoiData>({
      query: lavoraConNoiQuery,
      tags: ["lavoraConNoi"],
    })
    
    const datiAziendali = await sanityFetch<{ email: string }>({
      query: datiAziendaliQuery,
      tags: ["datiAziendali"],
    })
    if (datiAziendali?.email) {
      email = datiAziendali.email
    }
  } catch (error) {
    console.error("Error fetching Lavora con Noi data:", error)
  }

  const posizioni = data?.posizioni || []
  const hasPositions = posizioni.length > 0

  return (
    <>
      <Navbar forceDark />
      <main className="min-h-screen bg-[#f4f6f7]">
        {/* Hero Section */}
        <section className="pt-32 pb-16 px-6 md:px-12 lg:px-20">
          <div className="max-w-4xl mx-auto text-center">
            <p className="overline text-[#8a9aaa] mb-4">Carriere</p>
            <h1 className="font-heading text-[#1e3a5f] mb-6" style={{ fontSize: "clamp(2.5rem, 5vw, 4rem)" }}>
              {data?.titoloPagina || "Lavora con Noi"}
            </h1>
            {data?.introduzione && (
              <div className="max-w-2xl mx-auto">
                <PortableText value={data.introduzione} components={portableTextComponents} />
              </div>
            )}
          </div>
        </section>

        {/* Posizioni Aperte Section */}
        <section className="pb-24 px-6 md:px-12 lg:px-20">
          <div className="max-w-4xl mx-auto">
            {hasPositions ? (
              <>
                <h2 className="overline text-[#2e8b72] mb-8 text-center">Posizioni Aperte</h2>
                <div className="grid gap-6">
                  {posizioni.map((posizione, index) => (
                    <div 
                      key={index} 
                      className="bg-white border border-[#d0d6da] p-8"
                      style={{ borderTop: "3px solid #2e8b72" }}
                    >
                      <h3 className="font-heading text-[#1e3a5f] text-xl mb-4">
                        {posizione.titolo}
                      </h3>
                      {posizione.descrizione && (
                        <div className="prose-sm">
                          <PortableText value={posizione.descrizione} components={portableTextComponents} />
                        </div>
                      )}
                      <div className="mt-6 pt-6 border-t border-[#d0d6da]">
                        <a 
                          href={`mailto:${email}?subject=Candidatura: ${posizione.titolo}`}
                          className="inline-flex items-center gap-2 text-[#2e8b72] font-medium hover:text-[#1e3a5f] transition-colors"
                          style={{ fontFamily: "var(--font-dm-sans)", fontSize: "14px", letterSpacing: "0.05em" }}
                        >
                          Candidati per questa posizione
                          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M5 12h14M12 5l7 7-7 7"/>
                          </svg>
                        </a>
                      </div>
                    </div>
                  ))}
                </div>
              </>
            ) : (
              <div className="bg-white border border-[#d0d6da] p-12 text-center">
                <h3 className="font-heading text-[#1e3a5f] text-xl mb-4">
                  Nessuna posizione aperta al momento
                </h3>
                <p className="body-text text-[#4a6080] mb-6">
                  Al momento non ci sono posizioni aperte. Inviaci la tua candidatura spontanea a{" "}
                  <a 
                    href={`mailto:${email}?subject=Candidatura Spontanea`}
                    className="text-[#2e8b72] underline hover:text-[#1e3a5f] transition-colors"
                  >
                    {email}
                  </a>
                </p>
              </div>
            )}
          </div>
        </section>

        {/* CTA Section */}
        <section className="pb-24 px-6 md:px-12 lg:px-20">
          <div className="max-w-3xl mx-auto text-center bg-[#1e3a5f] p-12">
            <h3 className="font-heading text-white mb-4" style={{ fontSize: "1.5rem" }}>
              Perche lavorare con Solair Group?
            </h3>
            <p className="body-text text-white/80 mb-8">
              Unisciti a un team dinamico impegnato nella transizione energetica. 
              Offriamo opportunita di crescita, formazione continua e un ambiente di lavoro stimolante.
            </p>
            <a 
              href={`mailto:${email}?subject=Candidatura Spontanea`}
              className="btn-outline-white"
            >
              Invia Candidatura
            </a>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
