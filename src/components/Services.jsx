import React from 'react'
import { Layout, Palette, Share2 } from 'lucide-react'

const Services = () => {
  const services = [
    { title: 'BRANDING', desc: 'Criamos identidades que contam histórias.', icon: <Palette size={32} /> },
    { title: 'UI/UX DESIGN', desc: 'Interfaces intuitivas e experiências memoráveis.', icon: <Layout size={32} /> },
    { title: 'SOCIAL MEDIA', desc: 'Gestão estratégica para marcas de impacto.', icon: <Share2 size={32} /> }
  ]

  return (
    <section className="section services">
      <h2 style={{ fontSize: 'clamp(2.5rem, 8vw, 3rem)', fontWeight: 900, marginBottom: '60px', textAlign: 'center' }}>A SOLUÇÃO</h2>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '20px' }}>
        {services.map((s, i) => (
          <div key={i} className="glass" style={{ padding: 'clamp(30px, 5vw, 60px) 30px', borderRadius: '24px', textAlign: 'center' }}>
            <div style={{ marginBottom: '20px', color: '#fff' }}>{s.icon}</div>
            <h3 style={{ fontSize: '1.5rem', fontWeight: 700, marginBottom: '15px' }}>{s.title}</h3>
            <p style={{ color: 'var(--secondary-color)', lineHeight: 1.5, fontSize: '0.95rem' }}>{s.desc}</p>
          </div>
        ))}
      </div>
    </section>
  )
}

export default Services
