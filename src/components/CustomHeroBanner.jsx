import React, { useEffect, useRef } from 'react'
import gsap from 'gsap'
import logoSrc from '../../LOGO/LOGO.svg'
import RevealBackground from './RevealBackground'

const CustomHeroBanner = () => {
  const heroRef = useRef(null)
  const title1Ref = useRef(null)
  const title2Ref = useRef(null)

  useEffect(() => {
    // GSAP Animations
    const tl = gsap.timeline({ defaults: { ease: 'power4.out' } })
    tl.fromTo(title1Ref.current, { y: 100, opacity: 0 }, { y: 0, opacity: 1, duration: 1.5 })
      .fromTo(title2Ref.current, { y: 100, opacity: 0 }, { y: 0, opacity: 1, duration: 1.5 }, '-=1.2')
  }, [])

  return (
    <section 
      className="section hero" 
      ref={heroRef} 
      style={{ 
        justifyContent: 'center', 
        alignItems: 'center', 
        overflow: 'hidden', 
        position: 'relative', 
        background: 'transparent'
      }}
    >
      {/* REVEAL BACKGROUND LAYER */}
      <div 
        id="reveal-hero-wrap"
        style={{ 
          position: 'absolute', 
          top: 0, 
          left: 0, 
          width: '100%', 
          height: '100%', 
          zIndex: 0, 
          display: 'flex', 
          justifyContent: 'center', 
          alignItems: 'center' 
        }}
      >
        <RevealBackground 
          bgImage="/imgh/imagem_1.webp"
          topImage="/imgh/imagem_2.webp"
          radius={120}
          hardness={5}
          chromaticAberration={25}
          tail={70}
          dissipation={0}
        />
      </div>

      {/* CONTENT LAYER */}
      <div style={{ position: 'relative', zIndex: 10, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', width: '100%' }}>
        <div style={{ marginBottom: '40px', position: 'relative', zIndex: 1, transition: 'transform 0.3s ease' }} 
             onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.1)'}
             onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <img src={logoSrc} alt="OXUI Logo" style={{ height: '40px', width: 'auto', filter: 'drop-shadow(0 0 10px rgba(255,255,255,0.3))' }} />
          </div>
        </div>
        
        <div style={{ textAlign: 'center', maxWidth: '800px', padding: '0 20px', position: 'relative', zIndex: 1 }}>
          <h1 ref={title1Ref} style={{ fontSize: 'clamp(2.5rem, 8vw, 6rem)', fontWeight: 700, lineHeight: 0.9, fontFamily: "'Syncopate', sans-serif", letterSpacing: '-0.05em' }}>
            EXPERIENCE
          </h1>
          <h1 ref={title2Ref} style={{ fontSize: 'clamp(2.5rem, 8vw, 6rem)', fontWeight: 400, color: 'rgba(255,255,255,0.4)', lineHeight: 0.9, fontFamily: "'Syncopate', sans-serif", letterSpacing: '-0.05em', marginBottom: '30px' }}>
            THE FUTURE
          </h1>
          
          <p style={{ 
            fontFamily: "'Outfit', sans-serif", 
            fontSize: 'clamp(1rem, 2vw, 1.2rem)', 
            fontWeight: 300, 
            color: 'rgba(255,255,255,0.8)', 
            lineHeight: 1.6, 
            maxWidth: '600px', 
            margin: '0 auto',
            letterSpacing: '0.05em'
          }}>
            NA OXUI, A SOFISTICAÇÃO ENCONTRA A TÉCNICA PARA ELEVAR CADA PIXEL AO EXTRAORDINÁRIO. 
            CRIAMOS ECOSSISTEMAS DIGITAIS QUE TRANSCENDEM O DESIGN.
          </p>
        </div>
      </div>
      
      <div style={{ position: 'absolute', bottom: '40px', fontSize: '0.7rem', letterSpacing: '0.4em', opacity: 0.5, fontFamily: "'Outfit', sans-serif", zIndex: 1 }}>
        SCROLL TO EXPLORE
      </div>
    </section>
  )
}

export default CustomHeroBanner
