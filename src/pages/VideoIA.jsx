import React, { useEffect, useRef, useState, Suspense, lazy } from 'react'
import './VideoIA.css'
import VideoCard from '../components/VideoCard'
import { gsap } from 'gsap'

const EcosystemSection = lazy(() => import('../components/EcosystemSection'))
const BudgetCalculator = lazy(() => import('../components/BudgetCalculator'))

// Importação dinâmica: o Three.js só será baixado se o componente for montado
const FloatingGLB = lazy(() => import('../components/FloatingGLB'))
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { IconGemini, IconClaude, IconSpark, IconCheck, IconArrow } from '../components/Icons'

gsap.registerPlugin(ScrollTrigger)

/* ── Componente Principal ──────────────────────────────────────────── */
export default function VideoIA() {
  const [isVisible, setIsVisible] = useState({})
  const sectionRefs = useRef({})
  
  const [isPlaying, setIsPlaying] = useState(false)
  const [isMuted, setIsMuted] = useState(true)
  const videoRef = useRef(null)
  
  // Refs da seção Design-Driven
  const mosaicSectionRef = useRef(null)
  const trackRef = useRef(null)
  const [visibleSections, setVisibleSections] = useState(new Set())

  // Controla se é mobile (para não carregar recursos pesados)
  const [isMobile, setIsMobile] = useState(false)
  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 1024)
    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  // Controla visibilidade do mascote 3D (só na seção Design-Driven)
  const [mascoteVisible, setMascoteVisible] = useState(false)
  const [load3D, setLoad3D] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => setLoad3D(true), 3000)
    return () => clearTimeout(timer)
  }, [])

  // Intersection Observer original
  useEffect(() => {
    document.title = 'Vídeos com IA · Sued Oninem'
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setVisibleSections(prev => new Set(prev).add(entry.target.dataset.name))
          }
        })
      },
      { threshold: 0.1 }
    )
    Object.values(sectionRefs.current).forEach(r => {
      if (r) observer.observe(r)
    })
    return () => observer.disconnect()
  }, [])

  // GSAP ScrollTrigger para o Trilho Horizontal (COM PROTEÇÃO CONTRA NULO)
  useEffect(() => {
    let ctx = gsap.context(() => {
      if (!trackRef.current || !mosaicSectionRef.current) return;

      // Cria a rolagem horizontal prendendo a seção (pin)
      gsap.to(trackRef.current, {
        x: () => trackRef.current ? -(trackRef.current.scrollWidth - window.innerWidth) : 0,
        ease: "none",
        scrollTrigger: {
          trigger: mosaicSectionRef.current,
          pin: true,
          scrub: 1,
          start: "top top",
          end: () => trackRef.current ? "+=" + (trackRef.current.scrollWidth - window.innerWidth) : "+=1000"
        }
      });
      
      // Anima a transição de fundos
      gsap.to('.via-mosaic-bg', {
        opacity: 0,
        ease: "none",
        scrollTrigger: {
          trigger: mosaicSectionRef.current,
          start: "top top",
          end: "center top",
          scrub: true
        }
      });
      gsap.to('.via-energetic-bg', {
        opacity: 1,
        ease: "none",
        scrollTrigger: {
          trigger: mosaicSectionRef.current,
          start: "top top",
          end: "center top",
          scrub: true
        }
      });
    }, mosaicSectionRef);

    return () => ctx.revert();
  }, []);

  // Observer dedicado: mascote aparece SÓ na seção Design-Driven
  useEffect(() => {
    if (!mosaicSectionRef.current) return;
    const observer = new IntersectionObserver(
      ([entry]) => setMascoteVisible(entry.isIntersecting),
      { threshold: 0.1 }
    );
    observer.observe(mosaicSectionRef.current);
    return () => observer.disconnect();
  }, []);

  const ref = (key) => (el) => {
    sectionRefs.current[key] = el
    if (el) el.dataset.section = key
  }

  const visible = (key) => isVisible[key] ? 'via-visible' : ''

  const togglePlay = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause()
      } else {
        videoRef.current.play()
      }
      setIsPlaying(!isPlaying)
    }
  }

  const toggleMute = (e) => {
    e.stopPropagation();
    if (videoRef.current) {
      videoRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  }

  return (
    <div className="via-page">
      {/* ── Mascote 3D flutuante (Apenas no Desktop via Lazy Load) ── */}
      {(!isMobile && load3D) && (
        <Suspense fallback={null}>
          <FloatingGLB visible={mascoteVisible} />
        </Suspense>
      )}

      {/* ── Grain overlay ────────────────────────────────────── */}
      <div className="via-grain" aria-hidden="true"/>

      {/* ══════════════════════════════════════════════════════════════
          HERO — Vídeo de IA
      ══════════════════════════════════════════════════════════════ */}
      <section className="via-hero">
        <div className="via-hero__bg">
          <video 
            src="/conteudospaginaia/0701_superopt.mp4" 
            poster="/via-hero-poster.webp"
            autoPlay 
            loop 
            muted 
            playsInline
            preload="metadata"
            className="via-hero__bg-video" 
            aria-hidden="true"
          />
          <div className="via-hero__overlay"/>
        </div>

        <div className="via-hero__content">


          {/* Título */}
          <h1 className="via-hero__title">
            <span className="via-hero__title-line">VÍDEO</span>
            <span className="via-hero__title-line via-hero__title-accent">DE IA</span>
          </h1>

          {/* Autor */}
          <div className="via-hero__author">
            <img 
              src="/fotoiconsued.avif" 
              alt="Sued Oninem" 
              className="via-hero__author-avatar" 
              width="48"
              height="48"
            />
            <div className="via-hero__author-info">
              <strong>Sued Oninem</strong>
              <span>Motion Designer · IA Artist</span>
            </div>
          </div>

        </div>


      </section>

      {/* ══════════════════════════════════════════════════════════════
          SOBRE O TRABALHO (TRILHO HORIZONTAL GSAP)
      ══════════════════════════════════════════════════════════════ */}
      <section
        className={`via-section via-mosaic-section`}
        ref={mosaicSectionRef}
      >
        {/* Fundo Original Mosaico (Fade Out) */}
        <div className="via-mosaic-bg">
          {[
            "magnific_a-familia-esta-indo-para-_rlM03f4xtc.webp",
            "magnific_a-familia-esta-indo-para-_ubAR9U9QLD.webp",
            "magnific_a-mulher-e-o-homem-da-fam_kLTzfp016B.webp",
            "magnific_agora-esse-menino-esta-de_CHZNFU7EEy.webp",
            "magnific_crie-um-angulo-diferente-_J9m8ZPKOq4.webp",
            "magnific_crie-um-foto-macro-de-um-_y6vIpkaPW9.webp",
            "magnific_macro-na-menina-rindo_DBSj2vTpcl.webp",
            "magnific_mude-o-angulo-que-esta-se_y6vtOoFPW9.webp",
            "magnific_o-homem-da-familia-esta-i_xgDcT0djfW.webp",
            "magnific_o-homem-da-familia-img1-e_vui3djia47.webp",
            "magnific_refaca-essa-cena-sendo-fi_NZEaOtS6D9.webp",
            "magnific_a-familia-esta-indo-para-_ubAR9U9QLD.webp",
            "magnific_crie-um-angulo-diferente-_J9m8ZPKOq4.webp",
            "magnific_macro-na-menina-rindo_DBSj2vTpcl.webp",
            "magnific_mude-o-angulo-que-esta-se_y6vtOoFPW9.webp",
            "magnific_o-homem-da-familia-esta-i_xgDcT0djfW.webp"
          ].map((img, i) => (
            <div key={i} className="via-mosaic-tile">
              <img src={`/moodboard/${img}`} alt="" loading="lazy" width="280" height="280" />
            </div>
          ))}
        </div>

        {/* Novo Fundo Energético (Fade In) */}
        <div className="via-energetic-bg" />

        {/* Trilho Horizontal (Animado via GSAP) */}
        <div className="via-horizontal-track" ref={trackRef}>
          
          {/* Slide 1: Bloco de Texto */}
          <div className="via-track-item via-text-slide">
            <div className="via-mosaic-text-wrapper">
              <h2 className="via-mosaic-title">Design-Driven</h2>
              <p className="via-mosaic-desc">
                O trabalho consiste na criação de <span className="via-mosaic-highlight">frames de alta qualidade</span>,<br/>
                priorizando a fidelidade de cada detalhe real da <span className="via-mosaic-highlight">campanha</span>.
              </p>
              <h3 className="via-mosaic-subtitle">Ambientes Brandificados</h3>
            </div>
          </div>

          {/* Slides 2 a 10: Vídeos da Campanha e Carrossel */}
          {[
            "/conteudospaginaia/BRANDINGAURORA.webm",
            "/conteudospaginaia/vdcarrossel/0613-_2_.webm",
            "/conteudospaginaia/vdcarrossel/AMITTI-COM-AUDIO.webm",
            "/conteudospaginaia/vdcarrossel/BORBELTINHA-COM-AMOR.webm",
            "/conteudospaginaia/vdcarrossel/JANEIRO-GRATIDÃO.webm",
            "/conteudospaginaia/vdcarrossel/VT-DE-NTAL.webm",
            "/conteudospaginaia/vdcarrossel/envato_video_gen_Jan_16_2026_11_23_07.webm",
            "/conteudospaginaia/vdcarrossel/envato_video_gen_Jan_16_2026_20_16_24.webm",
            "/conteudospaginaia/vdcarrossel/interpreise.webm"
          ].map((videoSrc, index) => (
            <div className="via-track-item via-video-slide" key={index}>
              <VideoCard src={videoSrc} />
            </div>
          ))}

        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════
          ECOSSISTEMA DIGITAL (Cards 3D e Glassmorphism)
      ══════════════════════════════════════════════════════════════ */}
      <Suspense fallback={<div style={{height: '100vh'}} />}>
        <EcosystemSection isMobile={isMobile} />
      </Suspense>

      {/* ══════════════════════════════════════════════════════════════
          CALCULADORA DE ORÇAMENTO
      ══════════════════════════════════════════════════════════════ */}
      <Suspense fallback={<div style={{height: '100vh'}} />}>
        <BudgetCalculator />
      </Suspense>

      {/* ══════════════════════════════════════════════════════════════
          CALL TO ACTION FINAL
      ══════════════════════════════════════════════════════════════ */}
      <section className="via-cta-final">
        {/* Fundo com gradiente e partículas */}
        <div className="via-cta-final__bg" aria-hidden="true">
          <div className="via-cta-final__glow via-cta-final__glow--1" />
          <div className="via-cta-final__glow via-cta-final__glow--2" />
          <div className="via-cta-final__grid" />
        </div>

        <div className="via-cta-final__inner">
          {/* Badge */}
          <div className="via-cta-final__badge">
            <span className="via-cta-final__badge-dot" />
            DISPONÍVEL PARA NOVOS PROJETOS
          </div>

          {/* Título */}
          <h2 className="via-cta-final__title">
            Vamos criar algo<br/>
            <span className="via-cta-final__title-accent">extraordinário</span>
            <span className="via-cta-final__title-suffix"> juntos?</span>
          </h2>

          {/* Subtítulo */}
          <p className="via-cta-final__sub">
            Do conceito à entrega final, vídeos com IA que convertem, encantam e posicionam sua marca no topo.
          </p>

          {/* Stats rápidos */}
          <div className="via-cta-final__stats">
            <div className="via-cta-final__stat">
              <strong>+50</strong>
              <span>Projetos entregues</span>
            </div>
            <div className="via-cta-final__stat-divider" />
            <div className="via-cta-final__stat">
              <strong>2–3 dias</strong>
              <span>Prazo de entrega</span>
            </div>
            <div className="via-cta-final__stat-divider" />
            <div className="via-cta-final__stat">
              <strong>50%</strong>
              <span>Na entrada</span>
            </div>
          </div>

          {/* CTAs */}
          <div className="via-cta-final__actions">
            <a
              href="https://wa.me/5545998522258?text=Ol%C3%A1%20Sued%2C%20quero%20criar%20um%20v%C3%ADdeo%20com%20IA!"
              target="_blank"
              rel="noreferrer"
              className="via-cta-final__btn via-cta-final__btn--primary"
            >
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" fill="currentColor"/>
                <path d="M10 0C4.477 0 0 4.477 0 10c0 1.845.5 3.57 1.37 5.05L0 20l5.09-1.34A9.954 9.954 0 0010 20c5.523 0 10-4.477 10-10S15.523 0 10 0zm0 18.182a8.182 8.182 0 01-4.17-1.14l-.299-.177-3.02.795.808-2.949-.194-.303A8.182 8.182 0 0110 1.818c4.512 0 8.182 3.67 8.182 8.182s-3.67 8.182-8.182 8.182z" fill="currentColor"/>
              </svg>
              Iniciar projeto agora
            </a>
            <a
              href="https://suedoninem.pro"
              target="_blank"
              rel="noreferrer"
              className="via-cta-final__btn via-cta-final__btn--ghost"
            >
              Ver portfólio completo
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path d="M3 8H13M13 8L9 4M13 8L9 12" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </a>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════
          FOOTER
      ══════════════════════════════════════════════════════════════ */}
      <footer className="via-footer-new">
        <div className="via-footer-new__line" />
        <div className="via-footer-new__inner">
          <img
            src="/LOGO/LOGO.svg"
            alt="Sued Oninem"
            className="via-footer-new__logo"
            onError={e => e.target.style.display = 'none'}
          />
          <span className="via-footer-new__copy">
            © 2025 Sued Oninem · Motion Designer & IA Artist
          </span>
          <div className="via-footer-new__links">
            <a href="https://suedoninem.pro" target="_blank" rel="noreferrer">suedoninem.pro</a>
            <a href="https://wa.me/5545998522258" target="_blank" rel="noreferrer">WhatsApp</a>
          </div>
        </div>
      </footer>

    </div>
  )
}
