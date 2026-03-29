import React, { useEffect } from 'react'
import Lenis from 'lenis'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)
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
    // ScrollTrigger Config for global mobile stability
    ScrollTrigger.config({
      ignoreMobileResize: true // Previne saltos quando a barra do navegador mobile sobe/desce
    })

    // Smooth Scroll Initialization
    const lenis = new Lenis({
      lerp: 0.1,
      wheelMultiplier: 1,
      touchMultiplier: 2,
      smoothWheel: true
    })
    
    // Sync ScrollTrigger with Lenis
    lenis.on('scroll', ScrollTrigger.update)
    
    const ticker = (time) => {
      lenis.raf(time * 1000)
    }
    
    gsap.ticker.add(ticker)
    gsap.ticker.lagSmoothing(0)

    // Force a full refresh after a small delay to catch all late-loading components
    const timer = setTimeout(() => {
      ScrollTrigger.refresh()
    }, 1000)

    return () => {
      gsap.ticker.remove(ticker)
      lenis.destroy()
      clearTimeout(timer)
      ScrollTrigger.refresh()
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
