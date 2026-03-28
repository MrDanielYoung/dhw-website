import Hero from '../components/Hero'
import Approach from '../components/Approach'
import MissionBanner from '../components/MissionBanner'
import Services from '../components/Services'
import CTASection from '../components/CTASection'
import Clients from '../components/Clients'
import CaseStudy from '../components/CaseStudy'
import DistributionCTA from '../components/DistributionCTA'
import ContactForm from '../components/ContactForm'

export default function Home() {
  return (
    <main id="main">
      <Hero />
      <Approach />
      <MissionBanner />
      <Services />
      <CTASection />
      <Clients />
      <CaseStudy />
      <DistributionCTA />
      <ContactForm />
    </main>
  )
}
