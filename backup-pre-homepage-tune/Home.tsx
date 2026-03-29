import Hero from '../components/Hero'
import Approach from '../components/Approach'
import MissionBanner from '../components/MissionBanner'
import Services from '../components/Services'
import ChatFeature from '../components/ChatFeature'
import CTASection from '../components/CTASection'
import Clients from '../components/Clients'
import CaseStudy from '../components/CaseStudy'
import ContactForm from '../components/ContactForm'

export default function Home() {
  return (
    <main id="main">
      <Hero />
      <Approach />
      <MissionBanner />
      <Services />
      <ChatFeature />
      <CTASection />
      <Clients />
      <CaseStudy />
      <ContactForm />
    </main>
  )
}
