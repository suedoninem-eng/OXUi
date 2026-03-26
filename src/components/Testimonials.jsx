import React from 'react'

const Testimonials = () => {
  return (
    <section className="section testimonials" style={{ textAlign: 'center' }}>
      <h2 style={{ fontSize: '3rem', fontWeight: 900, marginBottom: '80px' }}>TRUSTED BY</h2>
      <div className="glass" style={{ maxWidth: '800px', margin: '0 auto', padding: '80px 40px', borderRadius: '40px' }}>
        <p style={{ fontSize: '1.5rem', fontStyle: 'italic', color: '#ccc', marginBottom: '30px' }}>
          "A OXUI transformou completamente nossa visão digital. A atenção aos detalhes e a sofisticação do design são incomparáveis."
        </p>
        <span style={{ fontWeight: 700, opacity: 0.8 }}>SUED ONINEM, CEO @ DESIGN LAB</span>
      </div>
    </section>
  )
}

export default Testimonials
