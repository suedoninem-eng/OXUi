import React, { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

const projects = [
  { id: 1, title: 'Project Alpha', category: 'Creative Direction', image: '/public/bg-cases.png' },
  { id: 2, title: 'Digital Nexus', category: 'UI/UX Design', image: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=2564&auto=format&fit=crop' },
  { id: 3, title: 'Social Velocity', category: 'Brand Identity', image: 'https://images.unsplash.com/photo-1633167606207-d840b5070fc2?q=80&w=2545&auto=format&fit=crop' },
  { id: 4, title: 'Future Pulse', category: 'Product Design', image: 'https://images.unsplash.com/photo-1614850523296-d8c1af93d400?q=80&w=2670&auto=format&fit=crop' },
  { id: 5, title: 'Eco Sync', category: 'Sustainability', image: 'https://images.unsplash.com/photo-1550684848-fac1c5b4e853?q=80&w=2670&auto=format&fit=crop' },
  { id: 6, title: 'Hyper Flow', category: 'Motion Graphics', image: 'https://images.unsplash.com/photo-1618556450991-2f1af64e8191?q=80&w=2564&auto=format&fit=crop' },
  { id: 7, title: 'Meta Verse', category: 'Web3 / VR', image: 'https://images.unsplash.com/photo-1614850523459-c2f4c699c52e?q=80&w=2670&auto=format&fit=crop' },
  { id: 8, title: 'Nova Core', category: 'Design System', image: 'https://images.unsplash.com/photo-1620641788421-7a1c342ea42e?q=80&w=2574&auto=format&fit=crop' },
]

const WorkGallery = () => {
  const sectionRef = useRef(null)
  const containerRef = useRef(null)
  const [activeIndex, setActiveIndex] = useState(1)

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger)

    const ctx = gsap.context(() => {
      const items = gsap.utils.toArray('.gallery-item')
      
      // Horizontal piling effect
      gsap.to(items, {
        xPercent: -100 * (items.length - 1),
        ease: 'none',
        scrollTrigger: {
          trigger: sectionRef.current,
          pin: true,
          scrub: 1,
          snap: 1 / (items.length - 1),
          end: () => `+=${sectionRef.current.offsetWidth * items.length}`,
          onUpdate: (self) => {
            const index = Math.round(self.progress * (items.length - 1)) + 1
            setActiveIndex(index)
          }
        }
      })

      // Parallax effect on images within items
      items.forEach((item, i) => {
        const bg = item.querySelector('.gallery-bg')
        gsap.to(bg, {
          xPercent: 20,
          ease: 'none',
          scrollTrigger: {
            trigger: item,
            containerAnimation: gsap.to(items, { xPercent: -100 * (items.length - 1), ease: 'none' }),
            start: 'left right',
            end: 'right left',
            scrub: true
          }
        })
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
      <div ref={containerRef} className="gallery-container" style={{ display: 'flex', height: '100%' }}>
        {projects.map((project) => (
          <div key={project.id} className="gallery-item" style={{ 
            minWidth: '100vw', height: '100vh', position: 'relative', 
            display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden' 
          }}>
            {/* BACKGROUND MEDIA */}
            <div className="gallery-bg" style={{ 
              position: 'absolute', top: 0, left: '-10%', width: '120%', height: '100%', 
              backgroundImage: `url(${project.image})`, backgroundSize: 'cover', backgroundPosition: 'center',
              filter: 'brightness(0.6)'
            }} />
            
            {/* PROJECT INFO CARD */}
            <div className="project-info" style={{ zIndex: 10, textAlign: 'center' }}>
              <span className="project-category" style={{ fontSize: '0.9rem', color: '#fff', opacity: 0.6, letterSpacing: '0.2rem', textTransform: 'uppercase' }}>
                {project.category}
              </span>
              <h2 className="project-title" style={{ fontSize: 'clamp(3rem, 10vw, 8rem)', fontWeight: 900, color: '#fff', margin: '10px 0' }}>
                {project.title.toUpperCase()}
              </h2>
            </div>

            {/* SYMBOLIC "+" DECORATION */}
            <div className="decor-plus" style={{ position: 'absolute', left: '10%', fontSize: '2rem', opacity: 0.2 }}>+</div>
            <div className="decor-plus" style={{ position: 'absolute', right: '10%', fontSize: '2rem', opacity: 0.2 }}>+</div>
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
              width: '40px', height: '24px', backgroundImage: `url(${p.image})`, 
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
