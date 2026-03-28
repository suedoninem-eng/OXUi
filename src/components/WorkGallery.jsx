import React, { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

const projects = [
  { id: 1, title: '', category: '', image: '/BANNERS/Prancheta 1.jpg' },
  { id: 2, title: '', category: '', image: '/BANNERS/Prancheta 2.png' },
  { id: 3, title: '', category: '', image: '/BANNERS/Prancheta 6.png' },
]

const WorkGallery = () => {
  const sectionRef = useRef(null)
  const containerRef = useRef(null)
  const [activeIndex, setActiveIndex] = useState(1)

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger)

    const ctx = gsap.context(() => {
      const container = containerRef.current
      const sections = gsap.utils.toArray('.gallery-item')
      
      // Calculate total scrollable distance
      // We move the container to the left by (totalWidth - viewportWidth)
      const totalWidth = container.scrollWidth
      const scrollDistance = totalWidth - window.innerWidth

      gsap.to(container, {
        x: -scrollDistance,
        ease: 'none',
        scrollTrigger: {
          trigger: sectionRef.current,
          pin: true,
          scrub: 1,
          end: () => `+=${totalWidth}`, // Smoothness based on content length
          onUpdate: (self) => {
            // Estimate active index based on scroll progress
            const index = Math.round(self.progress * (projects.length - 1)) + 1
            setActiveIndex(index)
          }
        }
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section ref={sectionRef} className="work-gallery-section" style={{ overflow: 'hidden', height: '100vh', background: '#000' }}>
      
      {/* PERSISTENT HEADER NAV */}
      <nav className="gallery-nav" style={{ 
        position: 'absolute', top: '40px', left: '0', right: '0', 
        display: 'flex', justifyContent: 'center', gap: '40px', zIndex: 100 
      }}>
        <a href="#work" style={{ color: '#fff', textDecoration: 'none', fontSize: '0.8rem', fontWeight: 600, opacity: 1, textTransform: 'uppercase' }}>Work</a>
        <a href="#about" style={{ color: '#fff', textDecoration: 'none', fontSize: '0.8rem', fontWeight: 600, opacity: 0.4, textTransform: 'uppercase' }}>About</a>
      </nav>

      {/* GALLERY CONTAINER */}
      <div ref={containerRef} className="gallery-container" style={{ 
        display: 'flex', 
        height: '100%',
        width: 'max-content', // Essential to let items define width
        willChange: 'transform'
      }}>
        {projects.map((project) => (
          <div key={project.id} className="gallery-item" style={{ 
            height: '100vh', 
            position: 'relative',
            display: 'flex', 
            alignItems: 'center', 
            justifyContent: 'center', 
            overflow: 'hidden',
            flexShrink: 0 // Prevent shrinking images
          }}>
            {/* REAL IMAGE TAG FOR DYNAMIC WIDTH */}
            <img 
              src={project.image} 
              alt="" 
              style={{ 
                height: '100vh', 
                width: 'auto', 
                display: 'block',
                objectFit: 'contain' // Ensures the image is not cropped
              }} 
            />
            
            {/* Titles removed as per request */}
          </div>
        ))}
      </div>

      {/* PAGINATION UI */}
      <div className="gallery-footer" style={{ 
        position: 'absolute', bottom: '40px', left: '5%', right: '5%', 
        display: 'flex', justifyContent: 'space-between', alignItems: 'center', zIndex: 100 
      }}>
        <div className="pagination-numbers" style={{ flex: 1, textAlign: 'center', fontSize: '1rem', color: '#fff', fontWeight: 400 }}>
          {activeIndex} — {projects.length}
        </div>
        
        {/* MINI THUMBNAIL NAV */}
        <div className="thumbnail-strip" style={{ display: 'flex', gap: '8px' }}>
          {projects.map((p) => (
            <div key={p.id} className={`thumb-item ${activeIndex === p.id ? 'active' : ''}`} style={{ 
              width: '40px', height: '24px', backgroundImage: `url("${p.image}")`, 
              backgroundSize: 'cover', border: activeIndex === p.id ? '1px solid #fff' : 'none',
              opacity: activeIndex === p.id ? 1 : 0.3, transition: 'all 0.3s ease'
            }} />
          ))}
        </div>
      </div>

    </section>
  )
}

export default WorkGallery
