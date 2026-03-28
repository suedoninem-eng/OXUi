import React, { useEffect, useRef } from 'react'

const KineticGrid = () => {
  const canvasRef = useRef(null)
  const containerRef = useRef(null)
  const mouseRef = useRef({ x: -1000, y: -1000, active: false })

  useEffect(() => {
    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d', { alpha: false })
    let animationFrameId
    let points = []

    const settings = {
      gap: 50,
      radius: 250,
      stiffness: 0.05,
      friction: 0.85,
      repulsion: 8,
      pointColor: 'rgba(255, 255, 255, 0.15)',
      activePointColor: 'rgba(255, 255, 255, 0.8)',
      glowColor: 'rgba(0, 112, 243, 0.2)'
    }

    const initPoints = () => {
      const rect = containerRef.current.getBoundingClientRect()
      canvas.width = rect.width
      canvas.height = rect.height
      points = []

      for (let x = settings.gap / 2; x < canvas.width; x += settings.gap) {
        for (let y = settings.gap / 2; y < canvas.height; y += settings.gap) {
          points.push({
            x: x,
            y: y,
            targetX: x,
            targetY: y,
            vx: 0,
            vy: 0,
            opacity: 0.15
          })
        }
      }
    }

    const update = () => {
      const mouse = mouseRef.current
      
      points.forEach(p => {
        const dx = p.x - mouse.x
        const dy = p.y - mouse.y
        const dist = Math.sqrt(dx * dx + dy * dy)

        if (dist < settings.radius) {
          const force = (settings.radius - dist) / settings.radius
          const angle = Math.atan2(dy, dx)
          // Repulsion force
          p.vx += Math.cos(angle) * force * settings.repulsion
          p.vy += Math.sin(angle) * force * settings.repulsion
          p.opacity = 0.15 + (force * 0.65)
        } else {
          p.opacity = 0.15
        }

        // Spring back force
        const dxS = p.targetX - p.x
        const dyS = p.targetY - p.y
        p.vx += dxS * settings.stiffness
        p.vy += dyS * settings.stiffness

        // Application of physics
        p.vx *= settings.friction
        p.vy *= settings.friction
        p.x += p.vx
        p.y += p.vy
      })
    }

    const draw = () => {
      // Clear with black background (alpha false performance optimization)
      ctx.fillStyle = '#000000'
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      // Draw mouse glow
      if (mouseRef.current.active) {
        const gradient = ctx.createRadialGradient(
          mouseRef.current.x, mouseRef.current.y, 0,
          mouseRef.current.x, mouseRef.current.y, settings.radius
        )
        gradient.addColorStop(0, settings.glowColor)
        gradient.addColorStop(1, 'rgba(0, 0, 0, 0)')
        ctx.fillStyle = gradient
        ctx.fillRect(0, 0, canvas.width, canvas.height)
      }

      // Draw points
      points.forEach(p => {
        ctx.fillStyle = `rgba(255, 255, 255, ${p.opacity})`
        ctx.beginPath()
        ctx.arc(p.x, p.y, 1.2, 0, Math.PI * 2)
        ctx.fill()
      })
    }

    const loop = () => {
      update()
      draw()
      animationFrameId = requestAnimationFrame(loop)
    }

    const handleMouseMove = (e) => {
      const rect = canvas.getBoundingClientRect()
      mouseRef.current = {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
        active: true
      }
    }

    const handleMouseLeave = () => {
      mouseRef.current.active = false
      mouseRef.current.x = -1000
      mouseRef.current.y = -1000
    }

    const handleResize = () => {
      initPoints()
    }

    window.addEventListener('resize', handleResize)
    canvas.addEventListener('mousemove', handleMouseMove)
    canvas.addEventListener('mouseleave', handleMouseLeave)

    initPoints()
    loop()

    return () => {
      window.removeEventListener('resize', handleResize)
      canvas.removeEventListener('mousemove', handleMouseMove)
      canvas.removeEventListener('mouseleave', handleMouseLeave)
      cancelAnimationFrame(animationFrameId)
    }
  }, [])

  return (
    <section 
      ref={containerRef}
      className="kinetic-grid-section" 
      style={{ 
        position: 'relative', 
        height: '80vh', 
        minHeight: '600px',
        background: '#000000', 
        overflow: 'hidden',
        borderTop: '1px solid rgba(255,255,255,0.05)',
        borderBottom: '1px solid rgba(255,255,255,0.05)'
      }}
    >
      <canvas 
        ref={canvasRef} 
        style={{ 
          display: 'block', 
          width: '100%', 
          height: '100%',
          cursor: 'none'
        }} 
      />
      
      {/* TEXT OVERLAY */}
      <div style={{
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        textAlign: 'center',
        pointerEvents: 'none',
        userSelect: 'none',
        width: '90%',               // Increased width for sentence
        maxWidth: '1200px'
      }}>
        <h2 style={{
          fontSize: 'clamp(1.5rem, 5vw, 4rem)',
          fontWeight: 300,           // More elegant for a long phrase
          color: '#fff',
          letterSpacing: '-0.02em',
          margin: 0,
          lineHeight: 1.2,
          textTransform: 'none'      // Use natural case
        }}>
          Transforme o toque em descoberta: <br />
          <span style={{ 
            fontWeight: 600, 
            color: 'rgba(255,255,255,0.9)',
            display: 'inline-block',
            marginTop: '10px'
          }}>
            um universo inteiro cabe no seu clique.
          </span>
        </h2>
      </div>

      {/* SYMBOLIC "+" DECORATION */}
      <div style={{ position: 'absolute', left: '5%', top: '15%', fontSize: '1.5rem', color: '#fff', opacity: 0.1 }}>+</div>
      <div style={{ position: 'absolute', right: '5%', top: '15%', fontSize: '1.5rem', color: '#fff', opacity: 0.1 }}>+</div>
      <div style={{ position: 'absolute', left: '5%', bottom: '15%', fontSize: '1.5rem', color: '#fff', opacity: 0.1 }}>+</div>
      <div style={{ position: 'absolute', right: '5%', bottom: '15%', fontSize: '1.5rem', color: '#fff', opacity: 0.1 }}>+</div>
    </section>
  )
}

export default KineticGrid
