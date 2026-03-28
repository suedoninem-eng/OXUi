import React from 'react'

const CTA = () => {
  const glassStyle = {
    padding: '20px 40px',
    borderRadius: '100px',
    textDecoration: 'none',
    fontWeight: 700,
    fontSize: '0.9rem',
    letterSpacing: '0.1em',
    transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
    cursor: 'pointer',
    display: 'inline-block',
    backdropFilter: 'blur(15px)',
    WebkitBackdropFilter: 'blur(15px)',
  }

  const primaryGlass = {
    ...glassStyle,
    background: 'rgba(255, 255, 255, 0.1)',
    border: '1px solid rgba(255, 255, 255, 0.2)',
    color: '#fff',
    boxShadow: '0 8px 32px 0 rgba(0, 0, 0, 0.3)',
  }

  const secondaryGlass = {
    ...glassStyle,
    background: 'rgba(255, 255, 255, 0.05)',
    border: '1px solid rgba(255, 255, 255, 0.1)',
    color: 'rgba(255, 255, 255, 0.7)',
  }

  return (
    <section className="section cta" style={{ alignItems: 'center', textAlign: 'center', position: 'relative', zIndex: 10 }}>
      <h2 style={{ fontSize: 'clamp(2.5rem, 8vw, 5rem)', fontWeight: 900, marginBottom: '40px', letterSpacing: '-0.02em', color: '#fff' }}>PRONTO PARA EVOLUIR?</h2>
      <div style={{ display: 'flex', gap: '20px', flexWrap: 'wrap', justifyContent: 'center' }}>
        <a 
          href="https://wa.me/5545998522258" 
          target="_blank" 
          rel="noopener noreferrer"
          style={primaryGlass}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = 'rgba(255, 255, 255, 0.2)'
            e.currentTarget.style.transform = 'translateY(-5px) scale(1.05)'
            e.currentTarget.style.boxShadow = '0 12px 40px 0 rgba(255, 255, 255, 0.1)'
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = 'rgba(255, 255, 255, 0.1)'
            e.currentTarget.style.transform = 'translateY(0) scale(1)'
            e.currentTarget.style.boxShadow = '0 8px 32px 0 rgba(0, 0, 0, 0.3)'
          }}
        >
          INICIAR PROJETO
        </a>
        <a 
          href="https://behance.net/suedoninem1" 
          target="_blank" 
          rel="noopener noreferrer"
          style={secondaryGlass}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = 'rgba(255, 255, 255, 0.15)'
            e.currentTarget.style.color = '#fff'
            e.currentTarget.style.transform = 'translateY(-5px)'
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = 'rgba(255, 255, 255, 0.05)'
            e.currentTarget.style.color = 'rgba(255, 255, 255, 0.7)'
            e.currentTarget.style.transform = 'translateY(0)'
          }}
        >
          PORTFÓLIO
        </a>
      </div>
      <div style={{ marginTop: '120px', fontSize: '0.8rem', opacity: 0.3, letterSpacing: '0.2em' }}>
        © 2026 OXUI DESIGN. BY SUED ONINEM.
      </div>
    </section>
  )
}

export default CTA

