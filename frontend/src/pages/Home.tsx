import Hero from '../components/Hero'
import ChatFeature from '../components/ChatFeature'
import Approach from '../components/Approach'
import MissionBanner from '../components/MissionBanner'
import Services from '../components/Services'
import CTASection from '../components/CTASection'
import Clients from '../components/Clients'
import CaseStudy from '../components/CaseStudy'
import ContactForm from '../components/ContactForm'

export default function Home() {
  return (
    <main id="main">
      <Hero />
      <ChatFeature />
      <Approach />
      <MissionBanner />
      <Services />
      <CTASection />
      <Clients />
      <CaseStudy />
      <ContactForm />
    </main>
  )
}
