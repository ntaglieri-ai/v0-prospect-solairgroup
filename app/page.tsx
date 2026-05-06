import { Navbar } from "@/components/navbar"
import { HeroSection } from "@/components/sections/hero"
import { AboutSection } from "@/components/sections/about"
import { WhyChooseUsSection } from "@/components/sections/why-choose-us"
import { PortfolioSlideshow } from "@/components/sections/portfolio-slideshow"
import { SolairCERSection } from "@/components/sections/solair-cer"
import { TestimonialsSection } from "@/components/sections/testimonials"
import { SoluzioniIncentiviSection } from "@/components/sections/soluzioni-incentivi"
import { MapSection } from "@/components/sections/map-wrapper"
import { Footer } from "@/components/footer"

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <HeroSection />
        <AboutSection />
        <WhyChooseUsSection />
        <PortfolioSlideshow />
        <SolairCERSection />
        <TestimonialsSection />
        <SoluzioniIncentiviSection />
        <MapSection />
      </main>
      <Footer />
    </>
  )
}
