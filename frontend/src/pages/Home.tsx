import Hero from '../components/Hero'
import Services from '../components/Services'
import Approach from '../components/Approach'
import Clients from '../components/Clients'
import CaseStudy from '../components/CaseStudy'
import DistributionCTA from '../components/DistributionCTA'
import CTASection from '../components/CTASection'
import ContactForm from '../components/ContactForm'

export default function Home() {
  return (
    <main id="main">
      <Hero />
      <Services />
      <Approach />
      <Clients />
      <CaseStudy />
      <DistributionCTA />
      <CTASection />
      <ContactForm />
    </main>
  )
}
