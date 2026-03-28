import { Routes, Route } from 'react-router-dom'
import { lazy, Suspense } from 'react'
import Home from './pages/Home'
import Header from './components/Header'
import Footer from './components/Footer'
import ScrollToTop from './components/ScrollToTop'
import CookieConsent from './components/CookieConsent'

// Lazy-load pages that aren't needed on first paint
const About = lazy(() => import('./pages/About'))
const Team = lazy(() => import('./pages/Team'))
const Insights = lazy(() => import('./pages/Insights'))
const ArticlePage = lazy(() => import('./pages/ArticlePage'))
const Contact = lazy(() => import('./pages/Contact'))
const Advisor = lazy(() => import('./pages/Advisor'))
const Privacy = lazy(() => import('./pages/Privacy'))
const Imprint = lazy(() => import('./pages/Imprint'))

function App() {
  return (
    <>
      <ScrollToTop />
      <Header />
      <Suspense fallback={null}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/team" element={<Team />} />
          <Route path="/insights" element={<Insights />} />
          <Route path="/insights/:slug" element={<ArticlePage />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/advisor" element={<Advisor />} />
          <Route path="/privacy" element={<Privacy />} />
          <Route path="/imprint" element={<Imprint />} />
        </Routes>
      </Suspense>
      <Footer />
      <CookieConsent />
    </>
  )
}

export default App
