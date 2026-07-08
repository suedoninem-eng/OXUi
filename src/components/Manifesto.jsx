import React, { useEffect, useRef, useState, Suspense, lazy } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

// GLB carregado de forma lazy — Three.js só baixa quando necessário
const FloatingGLB = lazy(() => import('./FloatingGLB'))

const Manifesto = () => {
  const canvasRef = useRef(null)
  const sectionRef = useRef(null)
  const exitRef   = useRef(null)   // ref para o parágrafo onde o GLB deve sumir
  const frameCount = 16
  const images = useRef([])
  const airpods = useRef({ frame: 0 })

  const [isMobile, setIsMobile]       = useState(false)
  const [glbVisible, setGlbVisible]   = useState(false)

  const currentFrame = index => (
    `/assets/NOVAANIMACAO/FRAME ${index + 1}.webp`
  )

  // Mobile check — não carrega Three.js no mobile
  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 1024)
    check()
    window.addEventListener('resize', check)
    return () => window.removeEventListener('resize', check)
  }, [])

  // GLB: aparece quando o Manifesto entra, some quando o parágrafo final do Process aparece
  useEffect(() => {
    const observers = []

    if (sectionRef.current) {
      const obs = new IntersectionObserver(
        ([entry]) => { if (entry.isIntersecting) setGlbVisible(true) },
        { threshold: 0.15 }
      )
      obs.observe(sectionRef.current)
      observers.push(obs)
    }

    // O parágrafo de saída fica no ProcessSection — buscamos pelo ID que vamos adicionar
    const checkExit = () => {
      const exitEl = document.getElementById('process-exit-para')
      if (exitEl) {
        const obs2 = new IntersectionObserver(
          ([entry]) => { if (entry.isIntersecting) setGlbVisible(false) },
          { threshold: 0.3 }
        )
        obs2.observe(exitEl)
        observers.push(obs2)
      }
    }
    // Aguarda o DOM estar pronto
    const t = setTimeout(checkExit, 500)

    return () => {
      clearTimeout(t)
      observers.forEach(o => o.disconnect())
    }
  }, [])

  useEffect(() => {
    const canvas = canvasRef.current
    const context = canvas.getContext('2d')

    // Set canvas dimensions
    const updateCanvasSize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
      render() // Re-render on resize
    }

    // Preload images
    const preloadImages = () => {
      for (let i = 0; i < frameCount; i++) {
        const img = new Image()
        img.src = currentFrame(i)
        images.current[i] = img
      }
    }

    const render = () => {
      const img = images.current[airpods.current.frame]
      if (img && img.complete) {
        context.clearRect(0, 0, canvas.width, canvas.height)
        
        // Draw image cover style
        const canvasAspect = canvas.width / canvas.height
        const imageAspect = img.width / img.height
        let drawWidth, drawHeight, offsetX, offsetY

        if (canvasAspect > imageAspect) {
          drawWidth = canvas.width
          drawHeight = canvas.width / imageAspect
          offsetX = 0
          offsetY = (canvas.height - drawHeight) / 2
        } else {
          drawWidth = canvas.height * imageAspect
          drawHeight = canvas.height
          offsetX = (canvas.width - drawWidth) / 2
          offsetY = 0
        }

        context.drawImage(img, offsetX, offsetY, drawWidth, drawHeight)
      }
    }

    preloadImages()
    updateCanvasSize()
    window.addEventListener('resize', updateCanvasSize)

    // GSAP Scroll Animation — começa nos cards, termina ao fim do Process
    const st = ScrollTrigger.create({
      trigger: '#servicos',         // inicia ao entrar nos cards
      start: 'top 85%',
      endTrigger: '.process-section',
      end: 'bottom bottom',
      scrub: 1,
      onUpdate: (self) => {
        const frameIndex = Math.floor(self.progress * (frameCount - 1))
        if (airpods.current.frame !== frameIndex) {
          airpods.current.frame = frameIndex
          render()
        }
      }
    })

    // Opacity control — aparece desde os cards (acima do manifesto)
    gsap.set(canvas, { opacity: 0 })
    gsap.to(canvas, {
      opacity: 1,
      scrollTrigger: {
        trigger: '#servicos',     // começa a aparecer nos cards
        start: 'top 85%',
        end: 'top 30%',
        scrub: true
      }
    })
    
    gsap.to(canvas, {
      opacity: 0,
      scrollTrigger: {
        trigger: '.process-section',
        start: 'bottom 20%',
        end: 'bottom top',
        scrub: true
      }
    })

    // Initial render when first image loads
    if (images.current[0]) {
      images.current[0].onload = render
    }

    return () => {
      window.removeEventListener('resize', updateCanvasSize)
      st.kill()  // mata APENAS o trigger do Manifesto, não todos
    }
  }, [])

  return (
    <section 
      ref={sectionRef}
      className="section manifesto manifesto-section" 
      style={{ 
        position: 'relative',
        padding: '0',
        background: 'transparent',
        minHeight: '100vh',
        width: '100%',
        display: 'flex',
        alignItems: 'center',
        zIndex: 10,
      }}
    >
      {/* Fixed Background Canvas - shared across Manifesto and ProcessSection */}
      <canvas
        ref={canvasRef}
        style={{
          position: 'fixed',
          top: '0',
          left: '0',
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          zIndex: 0, // Above base background, below content
          pointerEvents: 'none'
        }}
      />

      {/* Sidebar Content */}
      <div className="manifesto-content" style={{ 
        width: 'clamp(300px, 40%, 600px)', 
        padding: 'clamp(40px, 10vw, 80px) var(--section-padding-x)',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        position: 'relative',
        zIndex: 2 // Above canvas
      }}>
        <div style={{ maxWidth: '600px' }}>
          <h2 style={{ 
            fontSize: 'clamp(2rem, 5vw, 4rem)', 
            fontWeight: 900, 
            marginBottom: '30px',
            lineHeight: 1.1,
            letterSpacing: '-0.02em',
            textShadow: '0 0 40px rgba(0,0,0,0.8)'
          }}>
            OXUI MANIFESTO
          </h2>
          <p style={{ 
            fontSize: 'clamp(1rem, 2vw, 1.5rem)', 
            lineHeight: 1.4, 
            color: '#eee', 
            fontWeight: 300,
            textShadow: '0 0 40px rgba(0,0,0,0.8)'
          }}>
            DESIGN NÃO É APENAS ESTÉTICA, É <span style={{ color: '#fff', fontWeight: 700 }}>ECOSSISTEMA</span>. 
            NA OXUI, UNIMOS A PRECISAO DO UX COM A ALMA DO DESIGN PARA CRIAR 
            EXPERIÊNCIAS QUE RESSOAM E TRANSFORMAM.
          </p>
        </div>
      </div>

      {/* ── GLB Mascote flutuante — desktop only ── */}
      {!isMobile && (
        <Suspense fallback={null}>
          <FloatingGLB visible={glbVisible} />
        </Suspense>
      )}

      <style>{`
        @media (max-width: 1024px) {
          .manifesto {
            flex-direction: column !important;
            justify-content: flex-start !important;
            padding-top: 80px !important;
            min-height: 100vh !important;
          }
          .manifesto-content {
            width: 100% !important;
            padding: 20px !important;
            text-align: center;
            background: transparent !important;
          }
        }
      `}</style>
    </section>
  )
}

export default Manifesto
