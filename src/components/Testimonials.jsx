import React from 'react'

const Testimonials = () => {
  return (
    <section className="section testimonials" style={{ textAlign: 'center' }}>
      <h2 style={{ fontSize: 'clamp(2rem, 8vw, 3rem)', fontWeight: 900, marginBottom: '40px' }}>TRUSTED BY</h2>
      <div className="glass" style={{ maxWidth: '800px', margin: '0 auto', padding: 'clamp(40px, 10vw, 80px) 20px', borderRadius: '40px' }}>
        <p style={{ fontSize: 'clamp(1.1rem, 4vw, 1.5rem)', fontStyle: 'italic', color: '#ccc', marginBottom: '30px', lineHeight: 1.4 }}>
          "A OXUI redefiniu o padrão digital para 2026. Nossa missão é construir cenários sofisticados e imersivos, pois entendemos que uma marca só é verdadeiramente completa quando sua experiência é incomparável."
        </p>
        <span style={{ fontWeight: 700, opacity: 0.8, fontSize: '0.9rem', letterSpacing: '0.1em' }}>SUED ONINEM, CEO @ DESIGN LAB</span>
      </div>
    </section>
  )
}

export default Testimonials
