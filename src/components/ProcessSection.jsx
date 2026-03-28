import React, { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

const ProcessSection = () => {
  const sectionRef = useRef(null)
  const leftColRef = useRef(null)
  const rightColRef = useRef(null)

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger)

    const ctx = gsap.context(() => {
      // Animate left column items
      gsap.from('.process-item', {
        opacity: 0,
        y: 20,
        stagger: 0.2,
        duration: 1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: leftColRef.current,
          start: 'top 80%',
        }
      })

      // Animate right column large text
      const headings = rightColRef.current.querySelectorAll('h2')
      headings.forEach((heading) => {
        gsap.from(heading, {
          opacity: 0,
          x: 50,
          duration: 1.5,
          ease: 'power4.out',
          scrollTrigger: {
            trigger: heading,
            start: 'top 90%',
            toggleActions: 'play none none reverse'
          }
        })
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  const steps = [
    { id: '01', title: 'DESCOBERTA', date: 'FASE UM' },
    { id: '02', title: 'DESIGN', date: 'FASE DOIS' },
    { id: '03', title: 'DESENVOLVIMENTO', date: 'FASE TRÊS' },
    { id: '04', title: 'LANÇAMENTO', date: 'FASE FINAL' },
  ]

  return (
    <section 
      ref={sectionRef} 
      className="section process-section" 
      style={{ 
        minHeight: '120vh', 
        padding: '120px 5%',
        background: 'transparent', // Explicitly transparent
        position: 'relative',
        zIndex: 2 // Above the fixed background
      }}
    >
      <div className="process-grid" style={{ display: 'grid', gridTemplateColumns: 'minmax(250px, 1fr) 2fr', gap: '100px' }}>
        
        {/* Left Column: Metadata */}
        <div ref={leftColRef} className="process-left" style={{ alignSelf: 'start' }}>
          <div style={{ marginBottom: '60px' }}>
            <span style={{ fontSize: '0.8rem', letterSpacing: '0.2rem', color: 'var(--secondary-color)' }}>NOSSA ABORDAGEM</span>
            <h3 style={{ fontSize: '1.2rem', marginTop: '10px', fontWeight: 700 }}>METODOLOGIA</h3>
          </div>
          
          <div className="process-list">
            {steps.map((step) => (
              <div key={step.id} className="process-item" style={{ marginBottom: '40px', borderTop: '1px solid rgba(255,255,255,0.1)', paddingTop: '20px' }}>
                <span style={{ fontSize: '0.7rem', color: 'var(--secondary-color)' }}>{step.id} — {step.date}</span>
                <p style={{ fontSize: '1rem', fontWeight: 600, marginTop: '5px' }}>{step.title}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Right Column: Large Bold Text */}
        <div ref={rightColRef} className="process-right">
          <h2 style={{ fontSize: 'clamp(3rem, 10vw, 8rem)', fontWeight: 900, lineHeight: 0.9, marginBottom: '0.5em', textShadow: '0 0 30px rgba(0,0,0,0.5)' }}>
            CRIANDO<br/>RESSONÂNCIA<br/>DIGITAL
          </h2>
          <h2 style={{ fontSize: 'clamp(3rem, 10vw, 8rem)', fontWeight: 900, lineHeight: 0.9, marginBottom: '0.5em', color: 'rgba(255,255,255,0.1)', textShadow: '0 0 30px rgba(0,0,0,0.5)' }}>
            MINIMALISTA<br/>POR DESIGN
          </h2>
          <h2 style={{ fontSize: 'clamp(3rem, 10vw, 8rem)', fontWeight: 900, lineHeight: 0.9, marginBottom: '0.5em', textShadow: '0 0 30px rgba(0,0,0,0.5)' }}>
            IMERSIVO<br/>POR NATUREZA
          </h2>
          
          <div style={{ marginTop: '100px', maxWidth: '600px' }}>
            <p style={{ fontSize: '1.5rem', lineHeight: 1.4, color: '#888', fontWeight: 300 }}>
              Não apenas construímos sites. Criamos ecossistemas que respiram, reagem e evoluem com a narrativa da sua marca.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}

export default ProcessSection
