import React, { useEffect } from 'react'
import Lenis from 'lenis'
import CustomHeroBanner from '../components/CustomHeroBanner'
import Manifesto from '../components/Manifesto'
import ProcessSection from '../components/ProcessSection'
import WorkGallery from '../components/WorkGallery'
import Services from '../components/Services'
import ScrollBackgroundAnimation from '../components/ScrollBackgroundAnimation'
import KineticGrid from '../components/KineticGrid'
import Testimonials from '../components/Testimonials'
import CTA from '../components/CTA'

function Landing() {
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
    <div className="landing-container">
      <CustomHeroBanner />
      <Manifesto />
      <ProcessSection />
      <WorkGallery />
      <KineticGrid />
      <Services />
      <ScrollBackgroundAnimation />
      <Testimonials />
      <CTA />
    </div>
  )
}

export default Landing
