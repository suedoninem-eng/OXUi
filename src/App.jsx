import React, { useEffect } from 'react'
import Lenis from 'lenis'
import CustomHeroBanner from './components/CustomHeroBanner'
import Manifesto from './components/Manifesto'
import ProcessSection from './components/ProcessSection'
import WorkGallery from './components/WorkGallery'
import Services from './components/Services'
import Testimonials from './components/Testimonials'
import CTA from './components/CTA'

function App() {
  useEffect(() => {
    // Smooth Scroll Initialization
    const lenis = new Lenis()
    function raf(time) {
      lenis.raf(time)
      requestAnimationFrame(raf)
    }
    requestAnimationFrame(raf)

    return () => {
      lenis.destroy()
    }
  }, [])

  return (
    <div className="app-container">
      <CustomHeroBanner />
      <Manifesto />
      <ProcessSection />
      <WorkGallery />
      <Services />
      <Testimonials />
      <CTA />
    </div>
  )
}

export default App
