import React, { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const ScrollBackgroundAnimation = () => {
  const canvasRef = useRef(null)
  const frameCount = 41
  const images = useRef([])
  const animationState = useRef({ frame: 0 })
  const [isLoaded, setIsLoaded] = useState(false)

  const getFrameUrl = index => {
    const frameNumber = (index + 1).toString().padStart(3, '0')
    return `/background2/ezgif-frame-${frameNumber}.jpg`
  }

  const render = () => {
    const canvas = canvasRef.current
    if (!canvas) return
    const context = canvas.getContext('2d')
    const img = images.current[animationState.current.frame]
    
    if (img && img.complete) {
      context.clearRect(0, 0, canvas.width, canvas.height)
      
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

  useEffect(() => {
    const preloadImages = async () => {
      const promises = []
      for (let i = 0; i < frameCount; i++) {
        const img = new Image()
        img.src = getFrameUrl(i)
        images.current[i] = img
        promises.push(new Promise(resolve => {
          img.onload = resolve
          img.onerror = resolve
        }))
      }
      await Promise.all(promises)
      setIsLoaded(true)
    }

    preloadImages()

    const updateCanvasSize = () => {
      const canvas = canvasRef.current
      if (canvas) {
        canvas.width = window.innerWidth
        canvas.height = window.innerHeight
        render()
      }
    }

    window.addEventListener('resize', updateCanvasSize)
    updateCanvasSize()

    return () => {
      window.removeEventListener('resize', updateCanvasSize)
    }
  }, [])

  useEffect(() => {
    if (!isLoaded) return

    // Initial render
    render()
    
    // Force a refresh to account for pinned sections above
    ScrollTrigger.refresh()

    const ctx = gsap.context(() => {
      // Escondido até chegar na seção TRUSTED BY
      gsap.set(canvasRef.current, { 
        opacity: 0,
        visibility: 'hidden'
      })

      // Frames sincronizados: começa no TRUSTED BY e vai até o fim da página
      ScrollTrigger.create({
        trigger: '.testimonials',
        start: 'top center',        // inicia quando o TRUSTED BY chega ao centro da tela
        endTrigger: 'html',
        end: 'bottom bottom',
        scrub: true,
        invalidateOnRefresh: true,
        onUpdate: (self) => {
          const frameIndex = Math.floor(self.progress * (frameCount - 1))
          if (animationState.current.frame !== frameIndex) {
            animationState.current.frame = frameIndex
            render()
          }
        }
      })

      // Fade in suave ao entrar no TRUSTED BY
      gsap.to(canvasRef.current, {
        opacity: 1,
        visibility: 'visible',
        duration: 0.3,
        scrollTrigger: {
          trigger: '.testimonials',
          start: 'top 80%',         // começa a aparecer antes de chegar
          end: 'top center',
          scrub: true,
          onEnter: () => gsap.set(canvasRef.current, { visibility: 'visible' }),
          onLeaveBack: () => {
            gsap.set(canvasRef.current, { opacity: 0, visibility: 'hidden' })
            // Reseta para frame 0 ao sair
            animationState.current.frame = 0
            render()
          }
        }
      })
    })

    // Final refresh trigger
    const refreshTimer = setTimeout(() => {
      ScrollTrigger.refresh()
    }, 500)

    return () => {
      ctx.revert()
      clearTimeout(refreshTimer)
    }
  }, [isLoaded])

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        zIndex: -1,
        pointerEvents: 'none',
        background: 'transparent'
      }}
    />
  )
}

export default ScrollBackgroundAnimation
