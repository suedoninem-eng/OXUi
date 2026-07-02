import React, { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Lenis from 'lenis'
import logoSrc from '../../LOGO/LOGO.svg'
import '../styles/acquisitionhub.css'

gsap.registerPlugin(ScrollTrigger)

/* ═══════════════════════════════════════════════════════════
   KINETIC CANVAS GLOBAL — efeito de pontos interativos
   (réplica fiel do KineticGrid, mas fixo e global na página)
═══════════════════════════════════════════════════════════ */
const KineticBackground = () => {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d', { alpha: true })
    let animId
    let points = []
    const mouse = { x: -2000, y: -2000, active: false }

    const settings = {
      gap: 44,
      radius: 220,
      stiffness: 0.05,
      friction: 0.86,
      repulsion: 7,
    }

    const init = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
      points = []
      for (let x = settings.gap / 2; x < canvas.width; x += settings.gap) {
        for (let y = settings.gap / 2; y < canvas.height; y += settings.gap) {
          points.push({ x, y, tx: x, ty: y, vx: 0, vy: 0, op: 0.12 })
        }
      }
    }

    const update = () => {
      points.forEach(p => {
        const dx = p.x - mouse.x
        const dy = p.y - mouse.y
        const dist = Math.sqrt(dx * dx + dy * dy)
        if (dist < settings.radius) {
          const force = (settings.radius - dist) / settings.radius
          const angle = Math.atan2(dy, dx)
          p.vx += Math.cos(angle) * force * settings.repulsion
          p.vy += Math.sin(angle) * force * settings.repulsion
          p.op = 0.12 + force * 0.55
        } else {
          p.op = 0.12
        }
        p.vx += (p.tx - p.x) * settings.stiffness
        p.vy += (p.ty - p.y) * settings.stiffness
        p.vx *= settings.friction
        p.vy *= settings.friction
        p.x += p.vx
        p.y += p.vy
      })
    }

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      // Glow do mouse — laranja cinematográfico
      if (mouse.active) {
        const grad = ctx.createRadialGradient(mouse.x, mouse.y, 0, mouse.x, mouse.y, settings.radius)
        grad.addColorStop(0, 'rgba(230, 95, 43, 0.15)')
        grad.addColorStop(1, 'rgba(0, 0, 0, 0)')
        ctx.fillStyle = grad
        ctx.fillRect(0, 0, canvas.width, canvas.height)
      }

      points.forEach(p => {
        ctx.beginPath()
        ctx.arc(p.x, p.y, 1.1, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(255, 210, 190, ${p.op})`
        ctx.fill()
      })
    }

    const loop = () => {
      update()
      draw()
      animId = requestAnimationFrame(loop)
    }

    const onMove = (e) => {
      mouse.x = e.clientX
      mouse.y = e.clientY
      mouse.active = true
    }
    const onLeave = () => { mouse.active = false; mouse.x = -2000; mouse.y = -2000 }
    const onResize = () => init()

    init()
    loop()
    window.addEventListener('mousemove', onMove)
    window.addEventListener('mouseleave', onLeave)
    window.addEventListener('resize', onResize)

    return () => {
      cancelAnimationFrame(animId)
      window.removeEventListener('mousemove', onMove)
      window.removeEventListener('mouseleave', onLeave)
      window.removeEventListener('resize', onResize)
    }
  }, [])

  return <canvas ref={canvasRef} className="ah-kinetic-canvas" />
}

/* ═══════════════════════════════════════════════════════════
   HERO PARTICLES (partículas leves sobre o kinetic)
═══════════════════════════════════════════════════════════ */
const HeroParticles = () => {
  const ref = useRef(null)
  useEffect(() => {
    const canvas = ref.current
    const ctx = canvas.getContext('2d')
    let id, pts = []
    const sz = () => { canvas.width = canvas.offsetWidth; canvas.height = canvas.offsetHeight }
    class P {
      constructor() { this.r(true) }
      r(i) {
        this.x = Math.random() * canvas.width
        this.y = i ? Math.random() * canvas.height : canvas.height + 5
        this.s = Math.random() * 1.2 + 0.3
        this.vx = (Math.random() - 0.5) * 0.25
        this.vy = -(Math.random() * 0.4 + 0.1)
        this.a = Math.random() * 0.3 + 0.06
        this.l = 0; this.ml = Math.random() * 500 + 200
      }
      step() {
        this.x += this.vx; this.y += this.vy; this.l++
        const t = this.l / this.ml
        this.ca = t < 0.1 ? (t / 0.1) * this.a : t > 0.8 ? ((1 - t) / 0.2) * this.a : this.a
        if (this.l >= this.ml) this.r()
      }
      draw() {
        ctx.beginPath(); ctx.arc(this.x, this.y, this.s, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(255, 200, 180, ${this.ca})`
        ctx.fill()
      }
    }
    const go = () => { sz(); pts = Array.from({ length: 70 }, () => new P()) }
    const loop = () => { ctx.clearRect(0, 0, canvas.width, canvas.height); pts.forEach(p => { p.step(); p.draw() }); id = requestAnimationFrame(loop) }
    go(); loop()
    window.addEventListener('resize', go)
    return () => { cancelAnimationFrame(id); window.removeEventListener('resize', go) }
  }, [])
  return <canvas ref={ref} className="ah-hero__canvas" />
}

/* ═══════════════════════════════════════════════════════════
   NAV
═══════════════════════════════════════════════════════════ */
const AHNav = () => {
  const [sc, setSc] = useState(false)
  useEffect(() => {
    const fn = () => setSc(window.scrollY > 50)
    window.addEventListener('scroll', fn, { passive: true })
    return () => window.removeEventListener('scroll', fn)
  }, [])
  return (
    <nav className={`ah-nav${sc ? ' ah-nav--scrolled' : ''}`}>
      <Link to="/"><img src={logoSrc} alt="OXUI" className="ah-nav__logo" /></Link>
      <span className="ah-nav__badge">Acquisition HUB</span>
      <a href="https://wa.me/5545998522258?text=Ol%C3%A1%2C%20quero%20saber%20mais%20sobre%20o%20Acquisition%20HUB"
        target="_blank" rel="noopener noreferrer" className="ah-nav__cta">
        Solicitar Proposta
      </a>
    </nav>
  )
}

/* ═══════════════════════════════════════════════════════════
   HERO
═══════════════════════════════════════════════════════════ */
const AHHero = () => {
  const wrapRef = useRef(null)
  useEffect(() => {
    gsap.fromTo(wrapRef.current.querySelectorAll('.ha'),
      { y: 48, opacity: 0 },
      { y: 0, opacity: 1, duration: 1.1, stagger: 0.13, ease: 'power4.out' }
    )
  }, [])
  return (
    <section className="ah-hero">
      <HeroParticles />
      <div className="ah-hero__glow" />
      <div ref={wrapRef} style={{ position: 'relative', zIndex: 2, display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', width: '100%' }}>
        <div className="ah-hero__badge ha" style={{ opacity: 0 }}>
          <span className="ah-hero__badge-dot" />
          Motor de Aquisição B2B · OXUI
        </div>
        <h1 className="ah-hero__title ha" style={{ opacity: 0 }}>
          <span className="ah-hero__title-line">O MOTOR QUE</span>
          <span className="ah-hero__title-line ah-hero__title-line--blue">COLOCA DECISORES</span>
          <span className="ah-hero__title-line">B2B NA SUA MESA.</span>
        </h1>
        <p className="ah-hero__subtitle ha" style={{ opacity: 0, marginTop: 32 }}>
          Ecossistema completo de aquisição B2B — estratégia, criativo, tráfego pago e dados
          em <strong>6 meses estruturados</strong> com <strong>8 checkpoints de performance</strong>.<br />
          Você investe. Nós entregamos pipeline qualificado.
        </p>
        <div className="ah-hero__cta-group ha" style={{ opacity: 0, marginTop: 48 }}>
          <a href="https://wa.me/5545998522258?text=Ol%C3%A1%2C%20quero%20saber%20mais%20sobre%20o%20Acquisition%20HUB"
            target="_blank" rel="noopener noreferrer" className="ah-btn ah-btn--primary">
            Solicitar Proposta
          </a>
          <a href="#processo" className="ah-btn ah-btn--ghost">Ver o Processo abaixo</a>
        </div>
      </div>
      <div className="ah-hero__scroll">SCROLL TO EXPLORE</div>
    </section>
  )
}

/* ═══════════════════════════════════════════════════════════
   PHASE ARC — visão executiva das 4 fases
═══════════════════════════════════════════════════════════ */
const AHArc = () => (
  <div className="ah-arc">
    <div className="ah-arc__track">
      <div className="ah-arc__phase">
        <div className="ah-arc__phase-num">01</div>
        <div className="ah-arc__phase-label">Mês 1</div>
        <div className="ah-arc__phase-name">Sprint de Setup</div>
        <div className="ah-arc__phase-desc">Estratégia, criativo e ecossistema construídos antes do primeiro real investido em mídia.</div>
        <div className="ah-arc__phase-calls">
          <span className="ah-arc__call-pill">Call 01 · 45min</span>
          <span className="ah-arc__call-pill">Call 02 · 30min</span>
          <span className="ah-arc__call-pill">Call 03 · 45min</span>
        </div>
      </div>
      <div className="ah-arc__connector"><span className="ah-arc__arrow">→</span></div>

      <div className="ah-arc__phase">
        <div className="ah-arc__phase-num">02</div>
        <div className="ah-arc__phase-label">Mês 2</div>
        <div className="ah-arc__phase-name">Ativação e Tração</div>
        <div className="ah-arc__phase-desc">Campanhas ativas, dashboard ao vivo e primeiro relatório com validação de perfil de compra.</div>
        <div className="ah-arc__phase-calls">
          <span className="ah-arc__call-pill">Go-live</span>
          <span className="ah-arc__call-pill">Call 04 · 30min</span>
        </div>
      </div>
      <div className="ah-arc__connector"><span className="ah-arc__arrow">→</span></div>

      <div className="ah-arc__phase">
        <div className="ah-arc__phase-num">03</div>
        <div className="ah-arc__phase-label">Meses 3, 4 e 5</div>
        <div className="ah-arc__phase-name">Otimização e Escala</div>
        <div className="ah-arc__phase-desc">Comitê mensal de performance com nova safra de criativos baseada nos dados reais.</div>
        <div className="ah-arc__phase-calls">
          <span className="ah-arc__call-pill">Call 05 · 45min</span>
          <span className="ah-arc__call-pill">Call 06 · 45min</span>
          <span className="ah-arc__call-pill">Call 07 · 45min</span>
        </div>
      </div>
      <div className="ah-arc__connector"><span className="ah-arc__arrow">→</span></div>

      <div className="ah-arc__phase">
        <div className="ah-arc__phase-num">04</div>
        <div className="ah-arc__phase-label">Mês 6</div>
        <div className="ah-arc__phase-name">Auditoria e ROI</div>
        <div className="ah-arc__phase-desc">ROI demonstrado. Biblioteca entregue. Mesa de renovação e proposta de expansão.</div>
        <div className="ah-arc__phase-calls">
          <span className="ah-arc__call-pill">Call 08 · 60min</span>
        </div>
      </div>
    </div>
  </div>
)

/* ═══════════════════════════════════════════════════════════
   PROBLEMA
═══════════════════════════════════════════════════════════ */
const AHProblema = () => (
  <section className="ah-section">
    <div className="ah-problem__header-wrap">
      <div className="ah-problem__header-text">
        <div className="ah-label">O Diagnóstico</div>
        <h2 className="ah-title">
          O QUE ESTÁ<br />
          <span className="ah-title--ghost">TRAVANDO</span><br />
          SUA AQUISIÇÃO.
        </h2>
        <p className="ah-problem__subtitle-desc">
          Três bloqueios que impedem empresas B2B de transformar investimento em receita previsível.
        </p>
      </div>
      <div className="ah-problem__header-media">
        <div className="ah-video-container">
          <video 
            src="/VIDEO/0518xx.mp4" 
            controls 
            playsInline
            preload="metadata"
            className="ah-video-player"
          />
        </div>
      </div>
    </div>
    <div className="ah-problem__grid">
      {[
        { num: '01', heading: 'Tráfego sem ICP definido', text: 'Você gasta em mídia, mas os leads que chegam não têm perfil de compra. O time comercial perde horas com contatos frios que nunca fecham. Custo sobe. Conversão cai.' },
        { num: '02', heading: 'Criativo genérico em mercado exigente', text: 'Decisores B2B ignoram anúncios comuns. Sem storytelling calibrado ao seu segmento, você paga mais por lead e entrega menos percepção de valor.' },
        { num: '03', heading: 'Sem dados, sem escala', text: 'Sem dashboard em tempo real e ciclos de otimização, todo mês é recomeço. Sem aprendizado acumulado, sem alavancagem, sem previsibilidade.' },
      ].map(p => (
        <div key={p.num} className="ah-problem__card">
          <div className="ah-problem__number">{p.num}</div>
          <h3 className="ah-problem__heading">{p.heading}</h3>
          <p className="ah-problem__text">{p.text}</p>
        </div>
      ))}
    </div>
  </section>
)

/* ═══════════════════════════════════════════════════════════
   DEFINIÇÃO
═══════════════════════════════════════════════════════════ */
const AHDefinition = () => {
  const wRef = useRef(null)
  useEffect(() => {
    ScrollTrigger.create({
      trigger: wRef.current, start: 'top 72%',
      onEnter: () => wRef.current.classList.add('is-revealed'),
    })
  }, [])
  return (
    <section className="ah-section ah-definition">
      <div className="ah-definition__inner">
        <div ref={wRef}>
          <div className="ah-definition__word">ECOSSISTEMA</div>
        </div>
        <div className="ah-definition__content">
          <div className="ah-label">O que é o Acquisition HUB</div>
          <p className="ah-definition__desc">
            O Acquisition HUB é um <strong>motor de aquisição B2B completo</strong> — não um serviço pontual.
            É a integração entre estratégia de ICP, criativo de alto padrão, tráfego pago e inteligência de dados
            operando em <strong>sinergia total</strong>.
          </p>
          <p className="ah-definition__desc" style={{ color: 'rgba(255,255,255,.3)', fontSize: '.95rem' }}>
            Em 6 meses e 8 checkpoints, construímos a máquina que coloca os decisores certos na sua pipeline com previsibilidade real.
          </p>
          <div className="ah-definition__pillars">
            {[{ icon: '🎯', label: 'Estratégia' }, { icon: '🎬', label: 'Criativo' }, { icon: '📊', label: 'Performance' }].map(p => (
              <div key={p.label} className="ah-pillar">
                <span className="ah-pillar__icon">{p.icon}</span>
                <span className="ah-pillar__label">{p.label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

/* ═══════════════════════════════════════════════════════════
   ROI STATS
═══════════════════════════════════════════════════════════ */
const AHRoi = () => (
  <div className="ah-roi">
    <div className="ah-roi__inner">
      {[
        { n: '6', label: 'Meses de Operação Estruturada' },
        { n: '8', label: 'Checkpoints de Performance' },
        { n: '100%', label: 'Ativos Proprietários Entregues' },
      ].map(s => (
        <div key={s.n} className="ah-roi__stat">
          <span className="ah-roi__number">{s.n}</span>
          <div className="ah-roi__label">{s.label}</div>
        </div>
      ))}
    </div>
  </div>
)

/* ═══════════════════════════════════════════════════════════
   FUNNEL
═══════════════════════════════════════════════════════════ */
const AHFunnel = () => (
  <div className="ah-funnel">
    <div className="ah-funnel__inner">
      <div className="ah-funnel__text">
        <div className="ah-label">Como funciona a máquina</div>
        <h2 className="ah-title">
          DO ANÚNCIO<br />
          <span className="ah-title--blue">AO FECHAMENTO</span><br />
          <span className="ah-title--ghost">RASTREADO.</span>
        </h2>
        <p>
          Todo o funil de aquisição é <strong>construído, operado e otimizado</strong> pela OXUI.
          Você recebe o resultado: decisores qualificados na mesa do seu time comercial,
          com custo por oportunidade decrescente ao longo dos meses.
        </p>
        <p>
          Cada etapa é rastreada. Cada número é auditável.
          Você acompanha em tempo real — sem depender de relatório semanal.
        </p>
      </div>
      <div className="ah-funnel__visual">
        <div className="ah-funnel__steps">
          {[
            { icon: '🎯', name: 'ICP Definido', desc: 'Cargo, setor, tamanho de empresa, dor principal', badge: 'Estratégia' },
            { icon: '🎬', name: 'Criativo de Alto Padrão', desc: 'Vídeo + imagem + copy calibrados para o decisor B2B', badge: 'Produção' },
            { icon: '💸', name: 'Tráfego Pago Ativo', desc: 'Meta Ads + LinkedIn Ads com pixels validados', badge: 'Mídia Paga' },
            { icon: '🏗️', name: 'Landing Page de Conversão', desc: 'Alta fidelidade, otimizada para lead B2B qualificado', badge: 'Conversão' },
            { icon: '📊', name: 'Dashboard em Tempo Real', desc: 'CPL, volume, funil — visível 24/7', badge: 'Inteligência' },
            { icon: '🤝', name: 'Lead Qualificado no CRM', desc: 'Perfil de compra validado com o time comercial', badge: 'Pipeline' },
          ].map((s, i, arr) => (
            <React.Fragment key={s.name}>
              <div className="ah-funnel__step">
                <div className="ah-funnel__step-icon">{s.icon}</div>
                <div className="ah-funnel__step-body">
                  <div className="ah-funnel__step-name">{s.name}</div>
                  <div className="ah-funnel__step-desc">{s.desc}</div>
                </div>
                <span className="ah-funnel__step-badge">{s.badge}</span>
              </div>
              {i < arr.length - 1 && <div className="ah-funnel__connector">↓</div>}
            </React.Fragment>
          ))}
        </div>
      </div>
    </div>
  </div>
)

/* ═══════════════════════════════════════════════════════════
   WEEK GRID
═══════════════════════════════════════════════════════════ */
const WeekGrid = ({ weeks }) => (
  <div className="ah-week-grid">
    {weeks.map((w, i) => (
      <div key={i} className={`ah-week${w.active ? ' ah-week--active' : ''}`}>
        <div className="ah-week__label">Semana {i + 1}</div>
        <div className="ah-week__content">{w.label}</div>
        {w.call && <span className="ah-week__pill">{w.call}</span>}
      </div>
    ))}
  </div>
)

/* ═══════════════════════════════════════════════════════════
   CALL CARD
═══════════════════════════════════════════════════════════ */
const CallCard = ({ num, icon, name, duration, agenda, youValidate, weDeliver, featured }) => (
  <div className={`ah-call${featured ? ' ah-call--featured' : ''}`}>
    <div className="ah-call__left">
      <div className="ah-call__num">{num}</div>
      <div className="ah-call__icon">{icon}</div>
    </div>
    <div className="ah-call__body">
      <div className="ah-call__header">
        <div className="ah-call__name">{name}</div>
        <div className="ah-call__duration">{duration}</div>
      </div>
      <div className="ah-call__agenda">{agenda}</div>
      {(youValidate || weDeliver) && (
        <div className="ah-call__split">
          {youValidate && (
            <div className="ah-call__split-col">
              <span className="ah-call__split-label ah-call__split-label--muted">Você valida</span>
              <p className="ah-call__split-text">{youValidate}</p>
            </div>
          )}
          {weDeliver && (
            <div className="ah-call__split-col ah-call__split-col--blue">
              <span className="ah-call__split-label">Entregamos</span>
              <p className="ah-call__split-text">{weDeliver}</p>
            </div>
          )}
        </div>
      )}
    </div>
  </div>
)

/* ═══════════════════════════════════════════════════════════
   TIMELINE
═══════════════════════════════════════════════════════════ */
const AHTimeline = () => {
  const trackRef = useRef(null)
  const bodyRef = useRef(null)
  useEffect(() => {
    if (!trackRef.current || !bodyRef.current) return
    gsap.fromTo(trackRef.current,
      { scaleY: 0, transformOrigin: 'top center' },
      { scaleY: 1, ease: 'none', scrollTrigger: { trigger: bodyRef.current, start: 'top 65%', end: 'bottom 90%', scrub: 1 } }
    )
  }, [])

  return (
    <section id="processo" className="ah-section ah-timeline">
      <div className="ah-timeline__header">
        <div className="ah-label">Processo Semana a Semana</div>
        <h2 className="ah-title">
          6 MESES.<br />
          <span className="ah-title--blue">8 REUNIÕES.</span><br />
          <span className="ah-title--ghost">ZERO IMPROVISO.</span>
        </h2>
        <p>
          Você sabe exatamente o que acontece em cada semana, o que será apresentado em cada reunião
          e qual resultado esperar ao final de cada ciclo. Sem surpresas. Sem achismos.
        </p>
      </div>

      <div ref={bodyRef} className="ah-timeline__body">
        <div ref={trackRef} className="ah-timeline__track" />

        {/* MÊS 1 */}
        <div className="ah-month">
          <div className="ah-month__dot" />
          <span className="ah-month__tag">MÊS 1 · Sprint de Setup</span>
          <h3 className="ah-month__title">Estratégia, Copy e Design</h3>
          <p className="ah-month__subtitle">
            O mês de maior intensidade. Construímos toda a infraestrutura de conversão
            <strong style={{ color: '#fff' }}> antes de ligar qualquer anúncio</strong>. Sem queimar budget antes do sistema estar pronto.
          </p>
          <WeekGrid weeks={[
            { active: true, label: 'Kick-off Estratégico', call: 'CALL 01' },
            { active: true, label: 'Roteiros e Storytelling', call: 'CALL 02' },
            { active: false, label: 'Produção dos Criativos', call: null },
            { active: true, label: 'Entrega do Ecossistema', call: 'CALL 03' },
          ]} />
          <div className="ah-calls">
            <CallCard num="CALL 01" icon="🎯" featured
              name="Kick-off Estratégico"
              duration="45 min · Semana 1"
              agenda="Definição completa do ICP B2B: setor, cargo, tamanho de empresa e dor principal. Alinhamento do tom de voz institucional."
              youValidate="O perfil exato de quem você quer na sua pipeline."
              weDeliver="Briefing estratégico documentado que guia todos os criativos." />
            <CallCard num="CALL 02" icon="🎬"
              name="Validação de Roteiros e Storytelling"
              duration="30 min · Semana 2"
              agenda="Apresentamos os roteiros dos vídeos e os conceitos visuais das imagens de alto padrão."
              youValidate="A linha narrativa e a abordagem criativa antes de qualquer gravação."
              weDeliver="Roteiros finalizados e conceitos aprovados. Zero retrabalho." />
            <CallCard num="CALL 03" icon="🚀" featured
              name="Entrega do Ecossistema · Go-To-Market"
              duration="45 min · Semana 4"
              agenda="Apresentação da Landing Page em alta fidelidade (Figma/Framer) e validação técnica do setup de pixels."
              youValidate="Landing Page, criativos finais e setup de rastreamento completo."
              weDeliver="Sinal verde para o Go-To-Market. Tudo testado e aprovado." />
          </div>
          <div className="ah-month__result">
            <span className="ah-month__result-label">Resultado ao fim do Mês 1</span>
            <span className="ah-month__result-text">Ecossistema completo aprovado: landing page, criativos e rastreamento prontos. Tudo validado por você antes do primeiro real investido em mídia.</span>
          </div>
        </div>

        {/* MÊS 2 */}
        <div className="ah-month">
          <div className="ah-month__dot ah-month__dot--sm" />
          <span className="ah-month__tag">MÊS 2 · Ativação e Tração</span>
          <h3 className="ah-month__title">Campanhas no Ar. Dados Fluindo.</h3>
          <p className="ah-month__subtitle">
            As campanhas entram no ar na primeira semana. Você acompanha tudo em tempo real pelo dashboard
            <strong style={{ color: '#fff' }}> sem precisar perguntar o que está acontecendo</strong>.
          </p>
          <WeekGrid weeks={[
            { active: true, label: 'Campanhas Ativas + Dashboard', call: 'Go-Live' },
            { active: false, label: 'Otimização inicial', call: null },
            { active: false, label: 'Coleta de dados', call: null },
            { active: true, label: 'Relatório de Tração', call: 'CALL 04' },
          ]} />
          <div className="ah-calls">
            <div className="ah-notice">
              <strong>Semana 1 · Ativação (sem reunião necessária)</strong><br />
              Você recebe via WhatsApp/E-mail: links de todos os anúncios ativos e acesso ao dashboard de métricas em tempo real. CPL, volume de leads e taxa de conversão visíveis a qualquer momento.
            </div>
            <CallCard num="CALL 04" icon="📊" featured
              name="Relatório de Tração · Validação de Leads"
              duration="30 min · Fim do Mês 2"
              agenda="Métricas iniciais: Custo por Lead (CPL) e taxa de conversão da página. Calibração do perfil de compra com o time comercial."
              youValidate="Se os leads que estão chegando têm perfil de fechamento real."
              weDeliver="Ajuste de segmentação e criativo baseado nos primeiros dados. Rota calibrada." />
          </div>
          <div className="ah-month__result">
            <span className="ah-month__result-label">Resultado ao fim do Mês 2</span>
            <span className="ah-month__result-text">Primeiros leads qualificados na pipeline. CPL inicial mapeado. Perfil de compra validado com o time comercial. Motor ligado e calibrado.</span>
          </div>
        </div>

        {/* MESES 3–5 */}
        <div className="ah-month">
          <div className="ah-month__dot ah-month__dot--sm" />
          <span className="ah-month__tag">MESES 3, 4 e 5 · Ciclo de Otimização</span>
          <h3 className="ah-month__title">Inteligência Que se Acumula.</h3>
          <p className="ah-month__subtitle">
            Uma reunião mensal. Dois blocos objetivos.
            Você nunca perde tempo com status — só com <strong style={{ color: '#fff' }}>decisões e aprovações</strong>.
          </p>
          <WeekGrid weeks={[
            { active: true, label: 'Comitê de Performance + Aprovação de Conteúdo', call: 'CALL 05/06/07' },
            { active: false, label: 'Implementação dos ajustes', call: null },
            { active: false, label: 'Veiculação dos novos criativos', call: null },
            { active: false, label: 'Coleta e análise contínua', call: null },
          ]} />
          <div className="ah-dual-block">
            <div className="ah-dual-block__item">
              <span className="ah-dual-block__label">Bloco 1 · Performance</span>
              <p className="ah-dual-block__text">
                Análise do mês anterior: volume de oportunidades geradas, CPL consolidado e leitura dos mapas de calor da Landing Page. Você sabe exatamente o que funcionou e o que será ajustado.
              </p>
              <div className="ah-dual-block__metric">
                <span className="ah-dual-block__metric-num">CPL</span>
                <span className="ah-dual-block__metric-label">otimizado mês a mês</span>
              </div>
            </div>
            <div className="ah-dual-block__divider" />
            <div className="ah-dual-block__item">
              <span className="ah-dual-block__label">Bloco 2 · Conteúdo</span>
              <p className="ah-dual-block__text">
                Apresentamos a nova safra de criativos baseada nos dados que mais converteram. Você aprova o conteúdo do próximo ciclo dentro da própria reunião.
              </p>
              <div className="ah-dual-block__metric">
                <span className="ah-dual-block__metric-num">100%</span>
                <span className="ah-dual-block__metric-label">aprovado por você antes de ir ao ar</span>
              </div>
            </div>
          </div>
          <div className="ah-calls">
            {[{ n: 'CALL 05', m: 'Mês 3' }, { n: 'CALL 06', m: 'Mês 4' }, { n: 'CALL 07', m: 'Mês 5' }].map(c => (
              <CallCard key={c.n} num={c.n} icon="⚡"
                name={`Comitê de Performance · ${c.m}`}
                duration={`45 min · 1ª semana do ${c.m}`}
                agenda="Performance consolidada do mês + nova safra de criativos aprovada + próximo ciclo definido na mesma reunião."
                youValidate="Os dados do mês e os criativos do próximo ciclo."
                weDeliver="Ajustes implementados e novo conteúdo pronto para veicular." />
            ))}
          </div>
          <div className="ah-month__result">
            <span className="ah-month__result-label">Resultado ao fim dos Meses 3 a 5</span>
            <span className="ah-month__result-text">Pipeline crescendo com CPL decrescente. Criativos novos todo mês baseados em dados reais. Inteligência acumulando — cada mês é mais eficiente que o anterior.</span>
          </div>
        </div>

        {/* MÊS 6 */}
        <div className="ah-month" style={{ paddingBottom: 0 }}>
          <div className="ah-month__dot" />
          <span className="ah-month__tag">MÊS 6 · Auditoria Final</span>
          <h3 className="ah-month__title">ROI na Mesa. Próximo Capítulo.</h3>
          <p className="ah-month__subtitle">
            O fechamento dos 6 meses. Todos os números consolidados.
            <strong style={{ color: '#fff' }}> ROI demonstrado, biblioteca entregue, proposta de escala apresentada</strong>.
          </p>
          <WeekGrid weeks={[
            { active: false, label: 'Última semana de campanhas', call: null },
            { active: false, label: 'Consolidação dos dados', call: null },
            { active: false, label: 'Preparação do relatório', call: null },
            { active: true, label: 'Auditoria Final + ROI + Proposta de Escala', call: 'CALL 08' },
          ]} />
          <div className="ah-calls">
            <CallCard num="CALL 08" icon="🏆" featured
              name="Resultados Consolidados · ROI e Proposta de Escala"
              duration="60 min · Fim do Mês 6"
              agenda="Fechamento dos 5 meses de campanhas ativas. ROI demonstrado (custo vs receita gerada). Entrega da biblioteca de ativos. Proposta de expansão."
              youValidate="O ROI real dos 6 meses e a proposta de expansão para o próximo ciclo."
              weDeliver="Relatório consolidado + biblioteca proprietária de todos os ativos criados. Tudo é seu." />
          </div>
          <div className="ah-month__result">
            <span className="ah-month__result-label">Resultado ao fim do Mês 6</span>
            <span className="ah-month__result-text">ROI comprovado dos 6 meses. Biblioteca proprietária de ativos entregue. Clareza total sobre o próximo patamar de escala e expansão.</span>
          </div>
        </div>
      </div>
    </section>
  )
}

/* ═══════════════════════════════════════════════════════════
   DELIVERABLES
═══════════════════════════════════════════════════════════ */
const AHDeliverables = () => (
  <section className="ah-section">
    <div className="ah-label">Incluso no Contrato</div>
    <h2 className="ah-title">
      TUDO QUE VOCÊ<br />
      <span className="ah-title--blue">RECEBE</span>
      <span className="ah-title--ghost"> NO HUB.</span>
    </h2>
    <div className="ah-deliverables__grid">
      {[
        { name: 'Landing Page B2B', desc: 'Alta fidelidade em Framer ou Figma, construída para converter decisores.' },
        { name: 'Criativos em Vídeo', desc: 'Roteiros de storytelling B2B e produção de vídeos para tráfego pago.' },
        { name: 'Imagens de Alto Padrão', desc: 'Peças visuais premium para Meta Ads e LinkedIn Ads.' },
        { name: 'Setup de Pixels e Rastreamento', desc: 'Meta Pixel, Google Tag Manager e CAPI validados antes do Go-To-Market.' },
        { name: 'Dashboard em Tempo Real', desc: 'Painel ao vivo: CPL, volume de leads, taxa de conversão e funil.' },
        { name: 'Gestão de Tráfego Pago', desc: 'Operação mensal das campanhas com otimização contínua por dados.' },
        { name: 'Ciclos de Renovação de Criativo', desc: 'Nova safra de criativos todo mês baseada nos dados de conversão reais.' },
        { name: 'Biblioteca Proprietária de Ativos', desc: 'Todo o acervo criado é entregue a você ao final. É seu, para sempre.' },
      ].map((d, i) => (
        <div key={i} className="ah-deliverable">
          <div className="ah-deliverable__num">{String(i + 1).padStart(2, '0')}</div>
          <div className="ah-deliverable__name">{d.name}</div>
          <div className="ah-deliverable__desc">{d.desc}</div>
        </div>
      ))}
    </div>
  </section>
)

/* ═══════════════════════════════════════════════════════════
   ICP
═══════════════════════════════════════════════════════════ */
const AHICP = () => (
  <section className="ah-section" style={{ borderTop: '1px solid rgba(255,255,255,.05)' }}>
    <div className="ah-label">Para Quem</div>
    <h2 className="ah-title">
      VOCÊ VAI SE<br />
      <span className="ah-title--blue">RECONHECER</span><br />
      <span className="ah-title--ghost">AQUI.</span>
    </h2>
    <div className="ah-icp__grid">
      {[
        { badge: 'CEO · Founder B2B', role: 'O gargalo não é o produto. É o pipeline.', desc: 'Você tem produto validado e time comercial capaz. O problema é a previsibilidade: não há volume suficiente de oportunidades qualificadas chegando todo mês. O Acquisition HUB constrói essa máquina para você.' },
        { badge: 'Head de Marketing', role: 'Budget aprovado. Parceiro errado.', desc: 'Você sabe o que precisa ser feito, mas o parceiro atual não entende B2B. Você precisa de estratégia de ICP real, criativo de alto padrão e relatórios que pode apresentar ao board.' },
        { badge: 'Diretor · Head Comercial', role: 'Volume não resolve. Qualidade, sim.', desc: 'Seu time fecha bem quando o lead é certo. O problema é o que chega no topo do funil. Você precisa de uma operação que calibra constantemente o perfil de quem entra no CRM.' },
      ].map((p, i) => (
        <div key={i} className="ah-icp__card">
          <span className="ah-icp__badge">{p.badge}</span>
          <h3 className="ah-icp__role">{p.role}</h3>
          <p className="ah-icp__desc">{p.desc}</p>
        </div>
      ))}
    </div>
  </section>
)

/* ═══════════════════════════════════════════════════════════
   CTA
═══════════════════════════════════════════════════════════ */
const AHCTA = () => (
  <section className="ah-cta-section">
    <div className="ah-cta-section__glow" />
    <div className="ah-cta-section__eyebrow">Próximo Passo</div>
    <h2 className="ah-cta-section__title">
      PRONTO PARA<br /><span>ESCALAR</span><br />SUA AQUISIÇÃO?
    </h2>
    <p className="ah-cta-section__sub">
      Agende uma conversa de 20 minutos. Analisamos seu cenário atual e mostramos
      exatamente como o Acquisition HUB se encaixa na sua operação.
    </p>
    <div style={{ display: 'flex', gap: 16, justifyContent: 'center', flexWrap: 'wrap' }}>
      <a href="https://wa.me/5545998522258?text=Ol%C3%A1%2C%20quero%20agendar%20uma%20conversa%20sobre%20o%20Acquisition%20HUB"
        target="_blank" rel="noopener noreferrer" className="ah-btn ah-btn--primary">
        Solicitar Proposta via WhatsApp
      </a>
      <Link to="/" className="ah-btn ah-btn--ghost">Voltar ao Site</Link>
    </div>
    <div className="ah-line" style={{ marginTop: 80 }} />
    <div className="ah-cta-section__footer">© 2026 OXUI Design · Acquisition HUB · by Sued Oninem</div>
  </section>
)

/* ═══════════════════════════════════════════════════════════
   PAGE ROOT
═══════════════════════════════════════════════════════════ */
const AcquisitionHub = () => {
  useEffect(() => {
    window.scrollTo(0, 0)
    ScrollTrigger.config({ ignoreMobileResize: true })
    const lenis = new Lenis({ lerp: 0.08, wheelMultiplier: 1, touchMultiplier: 2, smoothWheel: true })
    lenis.on('scroll', ScrollTrigger.update)
    const tick = t => lenis.raf(t * 1000)
    gsap.ticker.add(tick)
    gsap.ticker.lagSmoothing(0)
    const timer = setTimeout(() => ScrollTrigger.refresh(), 500)
    return () => {
      gsap.ticker.remove(tick)
      lenis.destroy()
      clearTimeout(timer)
      ScrollTrigger.getAll().forEach(t => t.kill())
    }
  }, [])

  return (
    <div className="ah-page">
      {/* Canvas kinetic global — acompanha o scroll */}
      <KineticBackground />

      <AHNav />
      <AHHero />
      <AHArc />
      <AHProblema />
      <AHDefinition />
      <AHFunnel />
      <AHRoi />
      <AHTimeline />
      <AHDeliverables />
      <AHICP />
      <AHCTA />
    </div>
  )
}

export default AcquisitionHub
