import { Navbar } from "@/components/navbar"
import { HeroSection } from "@/components/sections/hero"
import { AboutSection } from "@/components/sections/about"
import { WhyChooseUsSection } from "@/components/sections/why-choose-us"
import { TestimonialsSection } from "@/components/sections/testimonials"
import { PackagesSection } from "@/components/sections/packages"
import { ProjectsSection } from "@/components/sections/projects"

import { IncentivesFormSection } from "@/components/sections/incentives-form"
import { MapSection } from "@/components/sections/map"
import { Footer } from "@/components/footer"

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <HeroSection />
        <AboutSection />
        <WhyChooseUsSection />
        <TestimonialsSection />
        <PackagesSection />
        <ProjectsSection />
        
        <IncentivesFormSection />
        <MapSection />
      </main>
      <Footer />
    </>
  )
}
