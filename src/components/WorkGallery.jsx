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
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    // Preload images to ensure correct width calculations
    const loadImages = async () => {
      const promises = projects.map(p => {
        return new Promise((resolve, reject) => {
          const img = new Image()
          img.src = p.image
          img.onload = resolve
          img.onerror = resolve // Resolve anyway to not block
        })
      })
      await Promise.all(promises)
      setIsLoaded(true)
    }
    loadImages()
  }, [])

  useEffect(() => {
    if (!isLoaded) return

    gsap.registerPlugin(ScrollTrigger)

    const ctx = gsap.context(() => {
      const container = containerRef.current
      if (!container) return
      
      const updateScrollDistance = () => {
        const totalWidth = container.scrollWidth
        const scrollDistance = totalWidth - window.innerWidth
        return scrollDistance > 0 ? scrollDistance : 0
      }

      gsap.to(container, {
        x: () => -updateScrollDistance(),
        ease: 'none',
        scrollTrigger: {
          trigger: sectionRef.current,
          pin: true,
          scrub: 1,
          invalidateOnRefresh: true, // Crucial for mobile rotation/address bar
          anticipatePin: 1,
          end: () => `+=${container.scrollWidth}`,
          onUpdate: (self) => {
            const index = Math.round(self.progress * (projects.length - 1)) + 1
            setActiveIndex(index)
          }
        }
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [isLoaded])

  return (
    <section 
      ref={sectionRef} 
      className="work-gallery-section" 
      style={{ 
        overflow: 'hidden', 
        height: '100dvh', // Use dvh for mobile address bar stability
        background: '#000',
        visibility: isLoaded ? 'visible' : 'hidden' // Avoid layout jump
      }}
    >
      
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
        width: 'max-content',
        willChange: 'transform'
      }}>
        {projects.map((project) => (
          <div key={project.id} className="gallery-item" style={{ 
            height: '100dvh', 
            position: 'relative',
            display: 'flex', 
            alignItems: 'center', 
            justifyContent: 'center', 
            overflow: 'hidden',
            flexShrink: 0
          }}>
            <img 
              src={project.image} 
              alt="" 
              style={{ 
                height: '100dvh', 
                width: 'auto', 
                display: 'block',
                objectFit: 'contain',
                maxWidth: 'none' // Ensure images don't shrink on mobile
              }} 
            />
          </div>
        ))}
      </div>

    </section>
  )
}

export default WorkGallery
