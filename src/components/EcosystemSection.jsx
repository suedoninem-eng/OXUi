import React, { useRef, useState } from 'react';
import './EcosystemSection.css';

const TiltCard = ({ title, highlight, logos, description }) => {
  const cardRef = useRef(null);
  const [style, setStyle] = useState({});

  const handleMouseMove = (e) => {
    if (!cardRef.current) return;
    const { left, top, width, height } = cardRef.current.getBoundingClientRect();
    const x = e.clientX - left;
    const y = e.clientY - top;
    
    const rotateX = ((y / height) - 0.5) * -12;
    const rotateY = ((x / width) - 0.5) * 12;
    
    setStyle({
      transform: `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`,
      '--mouse-x': `${x}px`,
      '--mouse-y': `${y}px`,
      transition: 'transform 0.1s ease-out'
    });
  };

  const handleMouseLeave = () => {
    setStyle({
      transform: `perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)`,
      '--mouse-x': `50%`,
      '--mouse-y': `50%`,
      transition: 'transform 0.5s ease-out'
    });
  };

  return (
    <div 
      className="via-eco-card" 
      ref={cardRef} 
      onMouseMove={handleMouseMove} 
      onMouseLeave={handleMouseLeave}
      style={style}
    >
      <div className="via-eco-glow-border" style={{ left: style['--mouse-x'] || '50%', top: style['--mouse-y'] || '50%' }}></div>
      <div className="via-eco-card-inner">
        <h3 className="via-eco-title">
          {title} <br/>
          <span className="via-eco-highlight">{highlight}</span>
        </h3>
        
        <div className="via-eco-logos">
          {logos.map((src, i) => (
            <img key={i} src={`/conteudospaginaia/logoss2/${src}`} alt="Logo" className="via-eco-logo" />
          ))}
        </div>
        
        <p className="via-eco-desc">
          {description}
        </p>
      </div>
    </div>
  );
};

export default function EcosystemSection({ isMobile }) {
  return (
    <section className="via-eco-section">

      {/* ── Vídeo de Fundo (omitido no celular para performance) ─────────────────────────────── */}
      <div className="via-eco-video-bg">
        {!isMobile && (
          <video
            src="/conteudospaginaia/videofundo2/videocoluna2.mp4"
            autoPlay
            loop
            muted
            playsInline
            className="via-eco-video-el"
            aria-hidden="true"
          />
        )}
        <div className="via-eco-video-overlay" />
      </div>

      {/* ── Malha Cibernética ───────────────────────────── */}
      <div className="via-eco-bg-network">
        <div className="via-eco-lines"></div>
        <div className="via-eco-nodes"></div>
      </div>

      <div className="via-eco-container">
        <TiltCard 
          title="REFINAMENTO"
          highlight="DE FRAME A FRAME"
          logos={["logopsd.avif"]}
          description="Refinamento de frames com IA generativa de última geração à pós-produção avançada no Photoshop. Otimizo a consistência visual, tratando artefatos, iluminação e texturas pixel a pixel. Da concepção sintética ao acabamento profissional, transformo prompts em ativos de alto valor."
        />
        <TiltCard 
          title="IA MOTION E GENERATIVA"
          highlight="DE ULTIMA GERAÇÃO"
          logos={["higgsfield.avif"]}
          description="O futuro da produção audiovisual está aqui, audiovisual está aqui. Combinamos a potência da Inteligência Artificial Generativa e Motion de última geração estético do design profissional. Do frame à edição final, criamos narrativas visuais de alto impacto que destacam sua marca no mercado."
        />
        <TiltCard 
          title="ACABAMENTO"
          highlight="E EDIÇÃO PRO"
          logos={["premiere.avif", "davinci.avif", "capcut.avif"]}
          description="Finalização e montagem audiovisual avançada com foco em narrativa e ritmo. Utilizo softwares líderes de mercado para pós-produção, color grading e sound design de alta precisão. Traduzo cortes e composições híbridas em ecossistemas visuais magnéticos de alto valor comercial."
        />
      </div>
    </section>
  );
}
