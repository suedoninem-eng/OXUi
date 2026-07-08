import React, { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const cards = [
  {
    id: 'videos-ia',
    title: 'Vídeos\ncom IA',
    subtitle: 'Vídeos produzidos 100% utilizando inteligência artificial de última geração',
    cta: 'SAIBA MAIS',
    ctaStyle: 'pill',       // botão pill branco (card 1 no print)
    ctaHref: '/video-ia',
    mediaType: 'video',
    mediaSrc: '/carrosselfront/videocomia.mp4',
    icon: '/carrosselfront/iconvideosia.avif',
    accentColor: 'rgba(197,255,0,0.14)',
    borderColor: 'rgba(197,255,0,0.28)',
  },
  {
    id: 'landpages',
    title: 'Landpages\nde alta\nconversão',
    subtitle: 'Aumente a Lucratividade do seu Negócio com a Força de uma Página de Vendas.',
    cta: 'SAIBA MAIS',
    ctaStyle: 'link',       // texto link simples (card 2 no print)
    ctaHref: '#',
    mediaType: 'image',
    mediaSrc: '/carrosselfront/landpagedeal.png',
    icon: '/carrosselfront/iconsit.avif',
    accentColor: 'rgba(100,140,255,0.12)',
    borderColor: 'rgba(120,160,255,0.26)',
  },
  {
    id: 'videos-instagram',
    title: 'Vídeos para\nInstagram',
    subtitle: 'Produza vídeos para aumentar a performance da sua comunicação.',
    cta: 'SAIBA MAIS',
    ctaStyle: 'link',       // texto link simples (card 3 no print)
    ctaHref: '#',
    mediaType: 'video',
    mediaSrc: '/carrosselfront/videopinsta.mp4',
    icon: '/carrosselfront/iconints.avif',
    accentColor: 'rgba(100,140,255,0.12)',
    borderColor: 'rgba(120,160,255,0.26)',
  },
]

const ServiceCard = ({ card, index }) => {
  const cardRef = useRef(null)

  useEffect(() => {
    const el = cardRef.current
    if (!el) return
    gsap.fromTo(
      el,
      { opacity: 0, y: 44, scale: 0.97 },
      {
        opacity: 1, y: 0, scale: 1,
        duration: 0.9,
        delay: index * 0.13,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: el,
          start: 'top 88%',
          toggleActions: 'play none none none',
        },
      }
    )
  }, [index])

  return (
    <div
      ref={cardRef}
      id={`service-card-${card.id}`}
      style={{
        position: 'relative',
        borderRadius: '18px',
        overflow: 'hidden',
        border: `1px solid ${card.borderColor}`,
        boxShadow: `0 0 28px ${card.accentColor}, inset 0 1px 0 rgba(255,255,255,0.07)`,
        aspectRatio: '1 / 1',
        maxWidth: '465px',
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-end',
        transition: 'transform 0.4s ease, box-shadow 0.4s ease',
        cursor: 'pointer',
        opacity: 0,
      }}
      onMouseEnter={e => {
        e.currentTarget.style.transform = 'translateY(-5px) scale(1.015)'
        e.currentTarget.style.boxShadow = `0 0 55px ${card.accentColor}, 0 18px 40px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.10)`
      }}
      onMouseLeave={e => {
        e.currentTarget.style.transform = 'translateY(0) scale(1)'
        e.currentTarget.style.boxShadow = `0 0 28px ${card.accentColor}, inset 0 1px 0 rgba(255,255,255,0.07)`
      }}
    >

      {/* ── MÍDIA DE FUNDO ── */}
      {card.mediaType === 'video' ? (
        <video
          autoPlay muted loop playsInline
          style={{
            position: 'absolute',
            inset: 0,
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            objectPosition: 'center center',
            zIndex: 0,
          }}
        >
          <source src={card.mediaSrc} type="video/mp4" />
        </video>
      ) : (
        <img
          src={card.mediaSrc}
          alt={card.title}
          style={{
            position: 'absolute',
            inset: 0,
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            objectPosition: 'center center',
            zIndex: 0,
          }}
        />
      )}

      {/* ── OVERLAY: horizontal, escuro na esquerda, aberto na direita ── */}
      <div style={{
        position: 'absolute',
        inset: 0,
        background: 'linear-gradient(105deg, rgba(0,0,0,0.78) 0%, rgba(0,0,0,0.50) 42%, rgba(0,0,0,0.12) 72%, rgba(0,0,0,0.0) 100%)',
        zIndex: 1,
      }} />

      {/* ── ÍCONE 3D — inferior esquerdo, GRANDE, cortado no rodapé ── */}
      <img
        src={card.icon}
        alt=""
        aria-hidden="true"
        style={{
          position: 'absolute',
          left: '-10px',       /* ligeiramente pra fora da borda esq */
          bottom: '-38px',     /* cortado ~38px pela borda inferior */
          width: '172px',      /* grande como no print */
          zIndex: 5,           /* acima do painel glass */
          filter: 'drop-shadow(0 14px 30px rgba(0,0,0,0.80))',
          animation: `floatIcon 4.5s ease-in-out ${index * 0.9}s infinite alternate`,
          pointerEvents: 'none',
        }}
      />

      {/* ── PAINEL GLASS — rodapé do card, texto à esquerda ── */}
      <div style={{
        position: 'relative',
        zIndex: 4,
        /* painel cobre o rodapé, não usa flex para não empurrar tudo */
        backdropFilter: 'blur(16px)',
        WebkitBackdropFilter: 'blur(16px)',
        background: 'rgba(0,0,0,0.28)',
        borderTop: '1px solid rgba(255,255,255,0.07)',
        /* padding: esquerda generosa para o texto, direita livre pro ícone */
        padding: '14px 20px 18px 24px',
        display: 'flex',
        flexDirection: 'column',
        gap: '5px',
        /* texto só na metade esquerda — ícone ocupa a esquerda embaixo mas sobe acima do painel */
        minHeight: '128px',
      }}>

        {/* ── TÍTULO ── */}
        <h3 style={{
          fontFamily: "'Syncopate', 'Outfit', sans-serif",
          fontSize: 'clamp(1.05rem, 1.9vw, 1.3rem)',
          fontWeight: 700,
          color: '#fff',
          lineHeight: 1.15,
          textTransform: 'uppercase',
          fontStyle: 'italic',
          letterSpacing: '-0.01em',
          whiteSpace: 'pre-line',
          margin: 0,
          /* afasta o texto da área do ícone (esquerda) */
          paddingLeft: '140px',
        }}>
          {card.title}
        </h3>

        {/* ── SUBTÍTULO ── */}
        <p style={{
          fontFamily: "'Outfit', sans-serif",
          fontSize: 'clamp(0.62rem, 0.95vw, 0.73rem)',
          fontWeight: 300,
          color: 'rgba(255,255,255,0.58)',
          lineHeight: 1.5,
          margin: 0,
          paddingLeft: '140px',
          maxWidth: '100%',
        }}>
          {card.subtitle}
        </p>

        {/* ── CTA ── */}
        {card.ctaStyle === 'pill' ? (
          <a
            href={card.ctaHref}
            style={{
              display: 'inline-block',
              marginTop: '6px',
              marginLeft: '140px',
              padding: '7px 22px',
              background: 'rgba(255,255,255,0.95)',
              border: '1px solid rgba(255,255,255,0.9)',
              borderRadius: '100px',
              fontFamily: "'Outfit', sans-serif",
              fontSize: '0.60rem',
              fontWeight: 700,
              letterSpacing: '0.18em',
              color: '#000',
              textDecoration: 'none',
              textTransform: 'uppercase',
              width: 'fit-content',
              transition: 'background 0.22s, transform 0.18s',
            }}
            onMouseEnter={e => {
              e.currentTarget.style.background = 'rgba(255,255,255,0.80)'
              e.currentTarget.style.transform = 'scale(1.04)'
            }}
            onMouseLeave={e => {
              e.currentTarget.style.background = 'rgba(255,255,255,0.95)'
              e.currentTarget.style.transform = 'scale(1)'
            }}
          >
            {card.cta}
          </a>
        ) : (
          <a
            href={card.ctaHref}
            style={{
              display: 'inline-block',
              marginTop: '4px',
              marginLeft: '140px',
              fontFamily: "'Outfit', sans-serif",
              fontSize: '0.68rem',
              fontWeight: 700,
              letterSpacing: '0.15em',
              color: 'rgba(255,255,255,0.75)',
              textDecoration: 'none',
              textTransform: 'uppercase',
              width: 'fit-content',
              transition: 'color 0.22s',
            }}
            onMouseEnter={e => { e.currentTarget.style.color = '#fff' }}
            onMouseLeave={e => { e.currentTarget.style.color = 'rgba(255,255,255,0.75)' }}
          >
            {card.cta}
          </a>
        )}
      </div>

    </div>
  )
}

const Services = () => {
  return (
    <section
      id="servicos"
      style={{
        padding: '0 5%',
        background: 'transparent',
        position: 'relative',
        zIndex: 20,
        marginTop: '-80px',
        paddingBottom: '60px',
      }}
    >
      <div
        className="services-grid"
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(3, minmax(0, 465px))',
          gap: '16px',
          justifyContent: 'center',
        }}
      >
        {cards.map((card, i) => (
          <ServiceCard key={card.id} card={card} index={i} />
        ))}
      </div>

      <style>{`
        @keyframes floatIcon {
          from { transform: translateY(0px) rotate(-2deg); }
          to   { transform: translateY(-10px) rotate(2.5deg); }
        }
        @media (max-width: 900px) {
          .services-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </section>
  )
}

export default Services
