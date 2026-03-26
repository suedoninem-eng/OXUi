import React from 'react'

const CTA = () => {
  return (
    <section className="section cta" style={{ alignItems: 'center', textAlign: 'center' }}>
      <h2 style={{ fontSize: 'clamp(2rem, 8vw, 5rem)', fontWeight: 900, marginBottom: '20px' }}>PRONTO PARA EVOLUIR?</h2>
      <div style={{ display: 'flex', gap: '20px', flexWrap: 'wrap', justifyContent: 'center' }}>
        <button style={{ padding: '20px 40px', borderRadius: '100px', border: 'none', background: '#fff', color: '#000', fontWeight: 700, cursor: 'pointer' }}>
          INICIAR PROJETO
        </button>
        <button style={{ padding: '20px 40px', borderRadius: '100px', border: '1px solid #333', background: 'transparent', color: '#fff', fontWeight: 700, cursor: 'pointer' }}>
          ENTRAR NA PLATAFORMA
        </button>
      </div>
      <div style={{ marginTop: '120px', fontSize: '0.8rem', opacity: 0.3 }}>
        © 2026 OXUI DESIGN. BY SUED ONINEM.
      </div>
    </section>
  )
}

export default CTA
