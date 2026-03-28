import React, { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const ScrollBackgroundAnimation = () => {
  const canvasRef = useRef(null)
  const frameCount = 41
  const images = useRef([])
  const animationState = useRef({ frame: 0 })

  const getFrameUrl = index => {
    const frameNumber = (index + 1).toString().padStart(3, '0')
    return `/background2/ezgif-frame-${frameNumber}.jpg`
  }

  useEffect(() => {
    const canvas = canvasRef.current
    const context = canvas.getContext('2d')

    const updateCanvasSize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
      render()
    }

    const preloadImages = () => {
      for (let i = 0; i < frameCount; i++) {
        const img = new Image()
        img.src = getFrameUrl(i)
        // Store the promise to know when it's ready, though we check .complete in render
        images.current[i] = img
      }
    }

    const render = () => {
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

    preloadImages()
    updateCanvasSize()
    window.addEventListener('resize', updateCanvasSize)

    // Animation: sync frames from the end of the gallery to the end of page
    const st = ScrollTrigger.create({
      trigger: '.work-gallery-section',
      start: 'bottom bottom', // Start exactly when the gallery vertical pin finishes
      endTrigger: 'html',
      end: 'bottom bottom',
      scrub: 1,
      onUpdate: (self) => {
        const frameIndex = Math.floor(self.progress * (frameCount - 1))
        if (animationState.current.frame !== frameIndex) {
          animationState.current.frame = frameIndex
          render()
        }
      }
    })

    // Fade in effect starting when gallery is finishing
    gsap.set(canvas, { opacity: 0 })
    gsap.to(canvas, {
      opacity: 1,
      scrollTrigger: {
        trigger: '.work-gallery-section',
        start: 'bottom 80%', // Start fade in as the bottom of the gallery approach
        end: 'bottom 20%',
        scrub: true
      }
    })

    // Make sure we render the first frame once loaded
    if (images.current[0]) {
      images.current[0].onload = render
    }

    return () => {
      window.removeEventListener('resize', updateCanvasSize)
      st.kill()
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        zIndex: 0, // Above normal background elements, below content
        pointerEvents: 'none',
        background: 'transparent'
      }}
    />
  )
}

export default ScrollBackgroundAnimation
