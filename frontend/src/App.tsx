import { Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import About from './pages/About'
import Team from './pages/Team'
import Insights from './pages/Insights'
import ArticlePage from './pages/ArticlePage'
import Contact from './pages/Contact'
import Advisor from './pages/Advisor'
import Header from './components/Header'
import Footer from './components/Footer'
import ScrollToTop from './components/ScrollToTop'

function App() {
  return (
    <>
      <ScrollToTop />
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/team" element={<Team />} />
        <Route path="/insights" element={<Insights />} />
        <Route path="/insights/:slug" element={<ArticlePage />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/advisor" element={<Advisor />} />
      </Routes>
      <Footer />
    </>
  )
}

export default App
