import React, { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

const Showcase = () => {
  const sectionRef = useRef(null)
  const scrollRef = useRef(null)

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger)
    
    let ctx = gsap.context(() => {
      const wrapper = scrollRef.current
      if (!wrapper || !sectionRef.current) return
      
      gsap.to(wrapper, {
        x: () => -(wrapper.scrollWidth - window.innerWidth),
        ease: 'none',
        scrollTrigger: {
          trigger: sectionRef.current,
          pin: true,
          scrub: 1,
          invalidateOnRefresh: true,
          end: () => `+=${wrapper.scrollWidth}`
        }
      })
    }, sectionRef)

    return () => {
      if (ctx) ctx.revert()
    }
  }, [])

  const cases = [
    { title: 'Project Alpha', category: 'Branding', color: '#111' },
    { title: 'Digital Nexus', category: 'UI/UX Design', color: '#1a1a1a' },
    { title: 'Social Velocity', category: 'Social Media', color: '#111' },
    { title: 'Future Pulse', category: 'Platform', color: '#1a1a1a' },
  ]

  return (
    <div ref={sectionRef} className="horizontal-scroll-container" style={{
      background: 'transparent',
      position: 'relative'
    }}>
      <div ref={scrollRef} className="horizontal-scroll-wrapper" style={{ padding: '0 10vw', alignItems: 'center', height: '100vh' }}>
        <div style={{ width: '40vw', flexShrink: 0 }}>
          <h2 style={{ fontSize: 'clamp(3rem, 8vw, 6rem)', fontWeight: 900 }}>SELECTED<br/>CASES</h2>
        </div>
        
        {cases.map((item, index) => (
          <div key={index} className="scroll-item glass" style={{ 
            display: 'flex', flexDirection: 'column', justifyContent: 'flex-end', 
            padding: '40px', borderRadius: '20px', backgroundColor: item.color,
            backgroundImage: `linear-gradient(45deg, ${item.color} 0%, rgba(255,255,255,0.05) 100%)`
          }}>
            <span style={{ fontSize: '0.9rem', color: 'var(--secondary-color)', marginBottom: '10px' }}>{item.category}</span>
            <h3 style={{ fontSize: '2rem', fontWeight: 700 }}>{item.title}</h3>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Showcase
