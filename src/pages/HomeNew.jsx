import React, { useEffect, useRef, useState } from 'react'
import Lenis from 'lenis'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import '../styles/home-new.css'

gsap.registerPlugin(ScrollTrigger)

/* ──────────────────────────────────────────────────────
   SEÇÃO 1 — HERO
   Paradigma: Capa de anuário de banco suíço.
   Nenhum efeito decorativo. A hierarquia tipográfica governa.
   ────────────────────────────────────────────────────── */
function Hero() {
  const ref = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } })

      tl.from('.nh-hero-nav',       { opacity: 0, y: -16, duration: 0.8, delay: 0.15 })
        .from('.nh-hero-kicker',    { opacity: 0, y: 20, duration: 0.9 }, '-=0.3')
        .from('.nh-hero-h1',        { opacity: 0, y: 50, duration: 1.2 }, '-=0.6')
        .from('.nh-hero-divider',   { opacity: 0, y: 30, duration: 0.9 }, '-=0.7')
        .from('.nh-hero-cta-row',   { opacity: 0, y: 20, duration: 0.8 }, '-=0.6')
        .from('.nh-hero-stat',      { opacity: 0, y: 10, stagger: 0.1, duration: 0.6 }, '-=0.4')
    }, ref)

    return () => ctx.revert()
  }, [])

  return (
    <section className="nh-hero" ref={ref} aria-labelledby="hero-heading">

      {/* Grid Editorial Minimalista de Fundo */}
      <div className="nh-hero-grid" aria-hidden="true">
        <div className="nh-grid-col" />
        <div className="nh-grid-col" />
        <div className="nh-grid-col" />
        <div className="nh-grid-col" />
        <div className="nh-grid-col" />
      </div>

      {/* Navegação institucional */}
      <nav className="nh-hero-nav" aria-label="Navegação principal">
        <a href="/" className="nh-hero-nav-brand" aria-label="OXUI — início">OXUI</a>
        <span className="nh-hero-nav-meta">Ecossistema de Conversão Premium — Oeste do Paraná</span>
      </nav>

      {/* Corpo do Hero */}
      <div className="nh-hero-body">

        <div className="nh-hero-kicker" aria-hidden="true">
          <span className="nh-hero-kicker-line" />
          <span className="nh-hero-kicker-text">
            Agronegócio · Construção Civil · Saúde Avançada
          </span>
        </div>

        <h1 className="nh-hero-h1" id="hero-heading">
          A Primeira Linha<br />
          de <em>Defesa</em> do Seu<br />
          Negócio.
        </h1>

        {/* Divider editorial com sub-headline e trust signal */}
        <div className="nh-hero-divider">
          <p className="nh-hero-sub">
            Arquitetura digital e design de alta conversão para líderes do
            Agronegócio, Construção Civil e Saúde Avançada no Oeste do Paraná.
          </p>
          <div className="nh-hero-trust-block">
            <p>
              Não vendemos estética. Implementamos máquinas invisíveis de persuasão
              lógica e emocional que blindam a sua autoridade corporativa e preveem
              a sua conversão.
            </p>
          </div>
        </div>

        <div className="nh-hero-cta-row">
          <a
            href="#qualificacao"
            className="nh-btn-primary"
            id="hero-cta-primary"
            aria-label="Agendar diagnóstico estratégico"
          >
            Agendar Diagnóstico Estratégico
            <svg
              className="nh-btn-arrow"
              viewBox="0 0 14 14"
              fill="none"
              aria-hidden="true"
            >
              <path
                d="M2 7h10M7 2l5 5-5 5"
                stroke="currentColor"
                strokeWidth="1.2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </a>

          <div className="nh-hero-scroll-signal" aria-hidden="true">
            scroll
          </div>
        </div>
      </div>

      {/* Rodapé com métricas institucionais */}
      <footer className="nh-hero-foot">
        <div className="nh-hero-foot-inner">
          <div className="nh-hero-stats" role="list" aria-label="Métricas do ecossistema">
            {[
              { value: '3',       label: 'Nichos de Dominação' },
              { value: 'R$5K',    label: 'Ticket de Ecossistema' },
              { value: '6 meses', label: 'Parceria de Resultado' },
            ].map((s) => (
              <div className="nh-hero-stat" role="listitem" key={s.label}>
                <span className="nh-hero-stat-value">{s.value}</span>
                <span className="nh-hero-stat-label">{s.label}</span>
              </div>
            ))}
          </div>
          <span className="nh-hero-foot-notice">
            Portfólio restrito · Vagas limitadas
          </span>
        </div>
      </footer>
    </section>
  )
}

/* ──────────────────────────────────────────────────────
   SEÇÃO 2 — DOR SILENCIOSA
   ────────────────────────────────────────────────────── */
function Pain() {
  const ref = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.nh-pain-h2', {
        opacity: 0, y: 40, duration: 1.2, ease: 'power3.out',
        scrollTrigger: { trigger: '.nh-pain-top', start: 'top 82%' },
      })
      gsap.from('.nh-pain-copy', {
        opacity: 0, x: -30, duration: 1, ease: 'power3.out',
        scrollTrigger: { trigger: '.nh-pain-body', start: 'top 82%' },
      })
      gsap.from('.nh-pain-bullet', {
        opacity: 0, y: 20, stagger: 0.15, duration: 0.7, ease: 'power3.out',
        scrollTrigger: { trigger: '.nh-pain-bullets', start: 'top 85%' },
      })
    }, ref)
    return () => ctx.revert()
  }, [])

  return (
    <section
      className="nh-pain"
      ref={ref}
      id="problema"
      aria-labelledby="pain-heading"
    >
      <div className="nh-container">

        <div className="nh-pain-top">
          <span className="nh-label">A Dissonância de Autoridade</span>
          <h2 className="nh-pain-h2" id="pain-heading">
            O seu negócio físico<br />
            transaciona <em>milhões.</em><br />
            O seu posicionamento digital<br />
            reflete isso ou afasta o dinheiro grande?
          </h2>
        </div>

        <div className="nh-pain-body">
          <p className="nh-pain-copy">
            Executivos C-Level, investidores imobiliários e pacientes de alta renda
            possuem um filtro cognitivo severo. Eles rejeitam o amadorismo
            instantaneamente. Quando a sua marca transmite uma "dissonância de
            autoridade" na internet, o seu cliente de alto padrão fecha a aba e
            leva o capital para o concorrente que comunica mais solidez.
          </p>

          <div className="nh-pain-bullets" role="list">
            {[
              'Leads qualificados que desaparecem sem deixar rastros.',
              'Dificuldade de justificar preços High-Ticket devido à percepção de baixo valor da marca.',
              'Campanhas de marketing vazias que não conversam com o mercado conservador.',
            ].map((text, i) => (
              <div className="nh-pain-bullet" role="listitem" key={i}>
                <span className="nh-pain-bullet-num" aria-hidden="true">
                  0{i + 1}
                </span>
                <span className="nh-pain-bullet-text">{text}</span>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  )
}

/* ──────────────────────────────────────────────────────
   SEÇÃO 3 — SERVIÇOS (STICKY STACKING — CSS NATIVO)
   Cada card ocupa 100vh e fica sticky no topo.
   O próximo card sobe por cima criando o efeito de empilhamento.
   ────────────────────────────────────────────────────── */
function Services() {
  const ref = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.nh-services-header', {
        opacity: 0, y: 40, duration: 1.1, ease: 'power3.out',
        scrollTrigger: { trigger: '.nh-services-header', start: 'top 82%' },
      })
      // Anima o conteúdo interno de cada card ao entrar na tela
      gsap.utils.toArray('.nh-svc-card').forEach((card) => {
        const els = card.querySelectorAll('.nh-svc-meta-row, .nh-svc-name, .nh-svc-copy, .nh-svc-cta, .nh-svc-right')
        gsap.from(els, {
          opacity: 0,
          y: 50,
          duration: 1.0,
          stagger: 0.09,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: card,
            start: 'top 72%',
          },
        })
      })
    }, ref)
    return () => ctx.revert()
  }, [])

  const items = [
    {
      index: '01',
      name: 'Produção Audiovisual Corporativa',
      price: 'A partir de R$ 1.200',
      copy: 'Vídeos cirúrgicos desenhados para capturar a atenção imediata. Demonstramos o peso institucional do seu maquinário, da sua obra ou da sua infraestrutura clínica com qualidade de cinema. Sua marca deixa de ser amadora e passa a intimidar.',
      tags: ['Direção de Arte', 'Edição Profissional', 'Color Grading', 'Motion Graphics'],
      bg: '#F2EFE8',
      numColor: 'rgba(10,9,8,0.055)',
    },
    {
      index: '02',
      name: 'Landing Pages de Alta Performance',
      price: 'A partir de R$ 1.800',
      copy: 'Construímos páginas de aterrissagem focadas obsessivamente em tempo de carregamento e redução de incertezas. A infraestrutura perfeita para transformar tráfego pago em reuniões fechadas com tomadores de decisão corporativos.',
      tags: ['React / Vite', 'SEO Técnico', 'Copywriting', 'GSAP Animations', 'CRO'],
      bg: '#EAE7DF',
      numColor: 'rgba(10,9,8,0.065)',
    },
    {
      index: '03',
      name: 'Ecossistema de Conversão Premium',
      price: 'Contrato 6 meses — R$ 5.000/mês',
      copy: 'A curadoria editorial definitiva para a sua corporação. Assumimos a arquitetura visual completa e o mapeamento estratégico das suas mídias sociais. Desenhado para atrair, isolar e converter o público de altíssima renda de forma recorrente e previsível.',
      tags: ['Full Branding', 'Landing Page Principal', 'Mídias Sociais', 'CRM Integration', 'Analytics', 'Suporte Dedicado'],
      bg: '#E2DED6',
      numColor: 'rgba(10,9,8,0.07)',
    },
  ]

  return (
    <section
      className="nh-services"
      ref={ref}
      id="servicos"
      aria-labelledby="services-heading"
    >
      {/* Cabeçalho fixo da seção */}
      <div className="nh-container">
        <header className="nh-services-header">
          <span className="nh-label">Engenharia de Conversão</span>
          <h2 className="nh-services-h2" id="services-heading">
            Nossos Ativos de<br />
            <em>Dominação</em> de Mercado.
          </h2>
        </header>
      </div>

      {/* Stack: cada card é sticky e cobre o anterior */}
      <div className="nh-services-stack">
        {items.map((s, i) => (
          <div
            className="nh-svc-card"
            key={s.index}
            style={{ backgroundColor: s.bg, zIndex: 10 + i }}
          >
            {/* Número gigante de fundo — elemento decorativo */}
            <span className="nh-svc-num" aria-hidden="true" style={{ color: s.numColor }}>
              {s.index}
            </span>

            <div className="nh-container">
              <div className="nh-svc-card-inner">

                {/* Coluna esquerda */}
                <div className="nh-svc-left">
                  <div className="nh-svc-meta-row">
                    <span className="nh-svc-index-label">{s.index} / 03</span>
                    <span className="nh-svc-price">{s.price}</span>
                  </div>
                  <h3 className="nh-svc-name">{s.name}</h3>
                  <p className="nh-svc-copy">{s.copy}</p>
                  <a
                    href="#qualificacao"
                    className="nh-svc-cta"
                    id={`svc-cta-${s.index}`}
                    aria-label={`Solicitar proposta para ${s.name}`}
                  >
                    Solicitar Proposta
                    <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden="true">
                      <path d="M2 6h8M6 2l4 4-4 4" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </a>
                </div>

                {/* Lado direito — badges */}
                <div className="nh-svc-right">
                  <span className="nh-svc-badge-label">Escopo incluso</span>
                  <div className="nh-svc-badges">
                    {s.tags.map((tag) => (
                      <span className="nh-svc-badge" key={tag}>{tag}</span>
                    ))}
                  </div>
                </div>

              </div>
            </div>
          </div>
        ))}
      </div>

    </section>
  )
}

/* ──────────────────────────────────────────────────────
   SEÇÃO 4 — PORTFÓLIO BLINDADO (CATÁLOGO INTERATIVO)
   Estilo Academy Pass com aba de navegação e modal descritivo.
   ────────────────────────────────────────────────────── */
function Portfolio() {
  const ref = useRef(null)
  const imgRef = useRef(null)
  const [activeIdx, setActiveIdx] = useState(0)
  const [modalOpen, setModalOpen] = useState(false)

  const projects = [
    {
      title: "Argho Agrosciences",
      nicho: "Agronegócio",
      client: "Grupo Argho S.A.",
      type: "Landing Page & Conversão",
      image: "/portfolio/argho-landing.webp",
      url: "arghoagrosciences.com.br",
      desc: "Ecossistema completo de marca e conversão. Arquitetura digital projetada para comunicar solidez técnica e autoridade científica a produtores rurais de grande porte e distribuidores agroindustriais.",
      tags: ["Agronegócio", "Identidade Visual", "Performance", "React/Vite"],
      meta: {
        prazo: "45 dias",
        investimento: "Premium B2B",
        tecnologias: "React / GSAP / SEO",
        conversao: "Alta"
      },
      details: {
        problem: "O Grupo Argho transacionava milhões no offline, mas seu posicionamento digital parecia amador e falhava em convencer os grandes produtores rurais a entrarem em contato para a compra de bioestimulantes de alta tecnologia.",
        solution: "Construção de uma máquina de persuasão voltada ao produtor rural de Toledo/Cascavel e Paraguai, com foco em prova técnica, validação científica e navegação direta. Design editorial sóbrio que exala autoridade institucional.",
        features: [
          "Mapeamento de Persona Agrícola de Grande Porte",
          "Copywriting Técnico de Conversão (sem clichês de IA)",
          "Design de Interfaces de Alta Performance no Figma",
          "Animações GSAP de Scroll suave para narrativa visual",
          "Otimização extrema de carregamento mobile em conexões rurais 3G/4G",
          "Integração direta com CRM Hubspot e WhatsApp Business"
        ],
        results: "Aumento de 240% no envio de formulários qualificados de distribuidores e aumento da autoridade institucional do grupo."
      }
    },
    {
      title: "Viterbo Medicina Preventiva",
      nicho: "Saúde Avançada",
      client: "Clinica Viterbo",
      type: "Plataforma de Conversão Médica",
      image: "/portfolio/viterbo-landing.png",
      url: "viterbomedicina.com.br",
      desc: "Interface digital ultra-exclusiva focada em medicina integrativa e longevidade. Uma experiência pensada para pacientes de alto poder aquisitivo que buscam atendimento médico humanizado e personalizado.",
      tags: ["Saúde de Elite", "Longevidade", "UX Editorial", "Agendamento VIP"],
      meta: {
        prazo: "35 dias",
        investimento: "Premium VIP",
        tecnologias: "Next.js / CSS Modules",
        conversao: "Qualificada"
      },
      details: {
        problem: "A clínica possui um dos maiores tickets médicos do Paraná, mas sua antiga página de agendamentos parecia um sistema genérico de plano de saúde, desalinhando o valor percebido do serviço premium.",
        solution: "Desenhamos uma experiência web que evoca o silêncio e o acolhimento de uma recepção VIP. Tipografia refinada, uso expressivo de espaços brancos e um fluxo de qualificação em duas etapas antes do contato humano.",
        features: [
          "Estudo de Psicologia do Consumidor de Luxo",
          "Design minimalista com HSL sob medida",
          "Sistema de qualificação de leads integrado no fluxo",
          "Infraestrutura Server-Side Rendering (SSR) rápida",
          "Painel de Analytics para rastreamento de ROI de anúncios"
        ],
        results: "Erradicação imediata de leads desqualificados e aumento de 85% no agendamento de consultas particulares de alto valor."
      }
    },
    {
      title: "Aristo Incorporadora",
      nicho: "Construção Civil",
      client: "Aristo Empreendimentos",
      type: "Landing Pages de Lançamento de Luxo",
      image: "/portfolio/aristo-landing.png",
      url: "aristoempreendimentos.com",
      desc: "Páginas promocionais de alta conversão para empreendimentos verticais de alto padrão. Foco na sofisticação arquitetônica e captação qualificada de investidores imobiliários do Oeste paranaense.",
      tags: ["Real Estate Luxo", "Arquitetura", "Filtro de Investidor", "GSAP"],
      meta: {
        prazo: "40 dias",
        investimento: "Enterprise",
        tecnologias: "React / Tailwind / Node",
        conversao: "VPL Alto"
      },
      details: {
        problem: "Lançamentos imobiliários de R$ 3M+ sofriam com leads curiosos vindos de formulários simples de redes sociais, gerando desperdício no time comercial focado em investidores qualificados.",
        solution: "Criamos uma landing page brutalista e elegante que serve como filtro. Através de uma narrativa focada em rendimento de VPL, exclusividade arquitetônica e escassez, qualificamos o lead antes de disponibilizar o book de vendas.",
        features: [
          "Direção de Arte alinhada à sofisticação da marca",
          "Renderização ultra-rápida de imagens e plantas arquitetônicas",
          "Formulários inteligentes com validação de perfil de renda",
          "Dashboard exclusivo para corretores VIP",
          "Scroll animado e tours virtuais leves integrados"
        ],
        results: "Captação de leads qualificados com ticket de investimento médio de R$ 2.5M, com taxa de conversão comercial de 12%."
      }
    }
  ]

  const activeProject = projects[activeIdx]

  // Controla o scroll do body quando o modal abre/fecha
  useEffect(() => {
    if (modalOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => {
      document.body.style.overflow = ''
    }
  }, [modalOpen])

  // GSAP reveal anims
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.nh-portfolio-header', {
        opacity: 0, y: 40, duration: 1.1, ease: 'power3.out',
        scrollTrigger: { trigger: '.nh-portfolio-header', start: 'top 82%' },
      })
      gsap.from('.nh-prod-card', {
        opacity: 0, y: 50, duration: 1.2, ease: 'power3.out',
        scrollTrigger: { trigger: '.nh-prod-card', start: 'top 85%' },
      })
    }, ref)
    return () => ctx.revert()
  }, [])

  // Auto-scroll da imagem no hover
  const handleMouseEnter = () => {
    if (!imgRef.current) return
    const viewportEl = imgRef.current.closest('.nh-mockup-viewport')
    if (!viewportEl) return
    const scrollDist = imgRef.current.scrollHeight - viewportEl.clientHeight
    if (scrollDist > 0) {
      gsap.to(imgRef.current, {
        y: -scrollDist,
        duration: Math.max(3, scrollDist / 130), // velocidade controlada
        ease: 'power1.inOut',
        overwrite: 'auto'
      })
    }
  }

  const handleMouseLeave = () => {
    if (!imgRef.current) return
    gsap.to(imgRef.current, {
      y: 0,
      duration: 1.8,
      ease: 'power2.out',
      overwrite: 'auto'
    })
  }

  // Reseta a posição do scroll ao mudar de projeto ativo
  useEffect(() => {
    if (imgRef.current) {
      gsap.set(imgRef.current, { y: 0 })
    }
  }, [activeIdx])

  return (
    <section
      className="nh-portfolio"
      ref={ref}
      id="portfolio"
      aria-labelledby="portfolio-heading"
    >
      <div className="nh-container">

        <header className="nh-portfolio-header">
          <div>
            <span className="nh-label">Curadoria Rigorosa</span>
            <h2 className="nh-portfolio-h2" id="portfolio-heading">
              Execução<br />
              <em>Implacável.</em>
            </h2>
          </div>
          <p className="nh-portfolio-tagline">
            Uma curadoria rigorosa de interfaces e identidades desenhadas para
            suportar o escrutínio de conselhos administrativos e investidores
            de alto risco no Oeste do Paraná.
          </p>
        </header>

        {/* Card do Produto/Projeto Estilo Academy Pass */}
        <div className="nh-prod-card">
          
          {/* Lado Esquerdo - Visual Mockup */}
          <div 
            className="nh-prod-card-media"
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
          >
            <div className="nh-mockup-chrome">
              <div className="nh-mockup-chrome-dots" aria-hidden="true">
                <span className="nh-mockup-chrome-dot" />
                <span className="nh-mockup-chrome-dot" />
                <span className="nh-mockup-chrome-dot" />
              </div>
              <div className="nh-mockup-chrome-url">
                <span>{activeProject.url}</span>
              </div>
            </div>

            <div className="nh-mockup-viewport">
              <img
                ref={imgRef}
                src={activeProject.image}
                alt={`Screenshot de ${activeProject.title}`}
                className="nh-mockup-screenshot"
                loading="eager"
                draggable="false"
              />
            </div>
            
            {/* Tags flutuantes sobre a mídia */}
            <div className="nh-prod-media-overlay-top">
              <span className="nh-prod-media-status-tag">PROJETO ONLINE</span>
              <span className="nh-prod-media-nicho-tag">{activeProject.nicho}</span>
            </div>
          </div>

          {/* Lado Direito - Detalhes e Conversão */}
          <div className="nh-prod-card-info">
            <div className="nh-prod-info-header">
              <span className="nh-prod-kicker">Estudo de Caso · {activeProject.nicho}</span>
              <h3 className="nh-prod-title">{activeProject.title}</h3>
              <p className="nh-prod-subtitle">{activeProject.type}</p>
            </div>

            <p className="nh-prod-desc">
              {activeProject.desc}
            </p>

            {/* Tabela de metadados horizontal */}
            <div className="nh-prod-meta-table">
              <div className="nh-prod-meta-col">
                <span className="nh-prod-meta-label">Prazo</span>
                <span className="nh-prod-meta-value">{activeProject.meta.prazo}</span>
              </div>
              <div className="nh-prod-meta-col">
                <span className="nh-prod-meta-label">Foco</span>
                <span className="nh-prod-meta-value">{activeProject.meta.investimento}</span>
              </div>
              <div className="nh-prod-meta-col">
                <span className="nh-prod-meta-label">Stack</span>
                <span className="nh-prod-meta-value">{activeProject.meta.tecnologias}</span>
              </div>
              <div className="nh-prod-meta-col">
                <span className="nh-prod-meta-label">Conversão</span>
                <span className="nh-prod-meta-value">{activeProject.meta.conversao}</span>
              </div>
            </div>

            <div className="nh-prod-actions">
              <button 
                className="nh-btn-primary"
                onClick={() => setModalOpen(true)}
                aria-label={`Ver detalhes técnicos de ${activeProject.title}`}
              >
                Ver Detalhes do Projeto
                <svg className="nh-btn-arrow" viewBox="0 0 14 14" fill="none" aria-hidden="true">
                  <path d="M2 7h10M7 2l5 5-5 5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>
              <a 
                href={`https://${activeProject.url}`} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="nh-prod-link"
              >
                Acessar site online ↗
              </a>
            </div>
          </div>

        </div>

        {/* Fila de Navegação do Catálogo */}
        <div className="nh-prod-catalog-nav" role="tablist" aria-label="Projetos do Portfólio">
          {projects.map((p, idx) => (
            <button
              key={p.title}
              role="tab"
              aria-selected={idx === activeIdx}
              className={`nh-prod-nav-btn ${idx === activeIdx ? 'active' : ''}`}
              onClick={() => setActiveIdx(idx)}
            >
              <span className="nh-prod-nav-idx">0{idx + 1}</span>
              <div className="nh-prod-nav-details">
                <span className="nh-prod-nav-nicho">{p.nicho}</span>
                <span className="nh-prod-nav-title">{p.title}</span>
              </div>
            </button>
          ))}
        </div>

      </div>

      {/* Modal Overlay com Detalhamento de Caso (Estilo Academy Pass) */}
      {modalOpen && (
        <div 
          className="nh-modal-overlay" 
          role="dialog" 
          aria-modal="true"
          onClick={() => setModalOpen(false)}
        >
          <div 
            className="nh-modal-window"
            onClick={(e) => e.stopPropagation()} // Impede fechar ao clicar dentro
          >
            {/* Header fixo do Modal */}
            <header className="nh-modal-header">
              <span className="nh-modal-brand">OXUI · Memorial Descritivo de Projeto</span>
              <button 
                className="nh-modal-close" 
                onClick={() => setModalOpen(false)}
                aria-label="Fechar modal"
              >
                ✕ Fechar
              </button>
            </header>

            {/* Conteúdo rolável */}
            <div className="nh-modal-content">
              
              {/* Banner do Projeto */}
              <div className="nh-modal-banner">
                <img src={activeProject.image} alt={activeProject.title} className="nh-modal-banner-img" />
                <div className="nh-modal-banner-overlay">
                  <span className="nh-modal-banner-tag">{activeProject.nicho}</span>
                  <h3 className="nh-modal-banner-title">{activeProject.title}</h3>
                  <p className="nh-modal-banner-subtitle">{activeProject.type} · {activeProject.client}</p>
                </div>
              </div>

              {/* Informações detalhadas */}
              <div className="nh-modal-body">
                
                <div className="nh-modal-grid">
                  <div className="nh-modal-main">
                    <section className="nh-modal-section">
                      <h4 className="nh-modal-sec-title">O Diagnóstico e a Dor Silenciosa</h4>
                      <p className="nh-modal-text">{activeProject.details.problem}</p>
                    </section>

                    <section className="nh-modal-section">
                      <h4 className="nh-modal-sec-title">A Arquitetura de Conversão (Solução)</h4>
                      <p className="nh-modal-text">{activeProject.details.solution}</p>
                    </section>

                    <section className="nh-modal-section">
                      <h4 className="nh-modal-sec-title">Escopo e Engenharia de Software</h4>
                      <ul className="nh-modal-list">
                        {activeProject.details.features.map((feature, i) => (
                          <li key={i} className="nh-modal-list-item">
                            <span className="nh-modal-list-bullet">■</span>
                            <span>{feature}</span>
                          </li>
                        ))}
                      </ul>
                    </section>
                  </div>

                  <aside className="nh-modal-sidebar">
                    <div className="nh-modal-stat-card">
                      <span className="nh-modal-stat-label">Conversão Comercial</span>
                      <p className="nh-modal-stat-val">{activeProject.details.results.split(' ')[1] || 'Elevada'}</p>
                      <p className="nh-modal-stat-desc">{activeProject.details.results}</p>
                    </div>

                    <div className="nh-modal-summary-box">
                      <h5 className="nh-modal-sum-title">Metadados de Entrega</h5>
                      <div className="nh-modal-sum-row">
                        <span>Cliente:</span>
                        <strong>{activeProject.client}</strong>
                      </div>
                      <div className="nh-modal-sum-row">
                        <span>Lançamento:</span>
                        <strong>{activeProject.meta.prazo}</strong>
                      </div>
                      <div className="nh-modal-sum-row">
                        <span>Investimento:</span>
                        <strong>{activeProject.meta.investimento}</strong>
                      </div>
                      <div className="nh-modal-sum-row">
                        <span>Stack:</span>
                        <strong>{activeProject.meta.tecnologias}</strong>
                      </div>
                    </div>
                  </aside>
                </div>

                <div className="nh-modal-cta-box">
                  <h4 className="nh-modal-cta-title">Sua empresa também fatura milhões offline, mas parece amadora online?</h4>
                  <p className="nh-modal-cta-text">
                    Podemos desenhar e programar uma máquina de vendas exclusiva para o seu posicionamento corporativo. Vamos alinhar suas metas em um Diagnóstico Estratégico.
                  </p>
                  <a 
                    href="#qualificacao" 
                    className="nh-btn-primary"
                    onClick={() => setModalOpen(false)}
                  >
                    Agendar Diagnóstico Estratégico
                    <svg className="nh-btn-arrow" viewBox="0 0 14 14" fill="none" aria-hidden="true">
                      <path d="M2 7h10M7 2l5 5-5 5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </a>
                </div>

              </div>

            </div>
          </div>
        </div>
      )}
    </section>
  )
}

/* ──────────────────────────────────────────────────────
   SEÇÃO 5 — METODOLOGIA / TRUST SIGNALS
   ────────────────────────────────────────────────────── */
function TrustSignals() {
  const ref = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.nh-trust-left', {
        opacity: 0, x: -36, duration: 1.1, ease: 'power3.out',
        scrollTrigger: { trigger: '.nh-trust-inner', start: 'top 80%' },
      })
      gsap.from('.nh-trust-right', {
        opacity: 0, x: 36, duration: 1.1, ease: 'power3.out',
        scrollTrigger: { trigger: '.nh-trust-inner', start: 'top 80%' },
      })
    }, ref)
    return () => ctx.revert()
  }, [])

  return (
    <section
      className="nh-trust"
      ref={ref}
      id="metodologia"
      aria-labelledby="trust-heading"
    >
      <div className="nh-container">
        <div className="nh-trust-inner">

          <div className="nh-trust-left">
            <span className="nh-label">Metodologia</span>
            <h2 className="nh-trust-h2" id="trust-heading">
              O Foco é o<br />
              <em>Retorno Sobre</em><br />
              o Investimento.
            </h2>
          </div>

          <div className="nh-trust-right">
            <p className="nh-trust-copy">
              A neurociência do consumo de luxo prova: clientes B2B compram
              redução de risco. Nossa metodologia de usabilidade de alta
              performance é balizada em dados empíricos e escadas lógicas de
              micro-compromissos, garantindo que o seu prospecto encontre o
              caminho mais curto entre o clique e o contrato assinado.
            </p>

            <span className="nh-trust-logos-label">
              Parceiros de Elite — Em Formação
            </span>
            <div
              className="nh-trust-logos"
              role="list"
              aria-label="Espaços reservados para logotipos de parceiros"
            >
              {['Agronegócio', 'Saúde', 'Construção Civil'].map((label) => (
                <div
                  className="nh-trust-logo-slot"
                  role="listitem"
                  key={label}
                  aria-label={`Parceiro do segmento ${label} — em breve`}
                >
                  <span className="nh-trust-logo-slot-label">{label}</span>
                  <span className="nh-trust-logo-slot-soon">Em breve</span>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </section>
  )
}

/* ──────────────────────────────────────────────────────
   SEÇÃO 6 — FECHAMENTO / FORMULÁRIO DE QUALIFICAÇÃO
   ────────────────────────────────────────────────────── */
function Closing() {
  const ref = useRef(null)
  const [status, setStatus] = useState('idle') // idle | sending | sent

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.nh-closing-left', {
        opacity: 0, x: -40, duration: 1.1, ease: 'power3.out',
        scrollTrigger: { trigger: '.nh-closing-inner', start: 'top 80%' },
      })
      gsap.from('.nh-closing-right', {
        opacity: 0, x: 40, duration: 1.1, ease: 'power3.out',
        scrollTrigger: { trigger: '.nh-closing-inner', start: 'top 80%' },
      })
    }, ref)
    return () => ctx.revert()
  }, [])

  function handleSubmit(e) {
    e.preventDefault()
    setStatus('sending')
    // Integração de envio real pode ser adicionada aqui
    setTimeout(() => setStatus('sent'), 1800)
  }

  return (
    <section
      className="nh-closing"
      ref={ref}
      id="qualificacao"
      aria-labelledby="closing-heading"
    >
      <div className="nh-container">
        <div className="nh-closing-inner">

          <div className="nh-closing-left">
            <span className="nh-label">Boutique de Alta Performance</span>
            <h2 className="nh-closing-h2" id="closing-heading">
              Pronto para alinhar<br />
              o seu visual ao tamanho<br />
              da sua <em>ambição?</em>
            </h2>
            <p className="nh-closing-copy">
              Para manter o rigor técnico, a inteligência estratégica e o
              atendimento professoral que o mercado corporativo exige, limitamos
              a nossa carteira simultânea a um número restrito de parceiros de elite.
            </p>
            <div className="nh-closing-scarcity">
              <span className="nh-closing-scarcity-head">
                Vagas Limitadas
              </span>
              <p>
                Aceitamos apenas parceiros alinhados com a nossa metodologia de
                alta conversão. O formulário ao lado é o primeiro filtro de
                qualificação.
              </p>
            </div>
          </div>

          <div className="nh-closing-right">
            {status === 'sent' ? (
              <div style={{ paddingTop: '40px' }}>
                <span className="nh-label">Formulário Enviado</span>
                <p style={{
                  fontFamily: 'var(--nh-serif)',
                  fontSize: 'clamp(2rem, 3.5vw, 3rem)',
                  fontWeight: 300,
                  color: 'var(--nh-ink)',
                  lineHeight: 1.1,
                  letterSpacing: '-0.02em',
                  marginBottom: '24px',
                }}>
                  Sua solicitação foi<br />
                  <em style={{ fontStyle: 'italic', color: 'var(--nh-ink-secondary)' }}>recebida.</em>
                </p>
                <p style={{ fontSize: '0.88rem', lineHeight: 1.75, color: 'var(--nh-ink-muted)' }}>
                  Analisaremos o seu perfil e entraremos em contato em até
                  48 horas úteis. Somente os parceiros que atendem aos nossos
                  critérios avançam para o diagnóstico estratégico.
                </p>
              </div>
            ) : (
              <form
                className="nh-form"
                onSubmit={handleSubmit}
                aria-label="Formulário de qualificação de parceiros"
                noValidate
              >
                <span className="nh-form-title">Formulário de Qualificação</span>

                <div className="nh-field">
                  <label htmlFor="f-nome">Nome Completo</label>
                  <input
                    id="f-nome"
                    type="text"
                    placeholder="Seu nome e sobrenome"
                    required
                    autoComplete="name"
                  />
                </div>

                <div className="nh-field">
                  <label htmlFor="f-empresa">Empresa</label>
                  <input
                    id="f-empresa"
                    type="text"
                    placeholder="Razão social ou nome da empresa"
                    required
                    autoComplete="organization"
                  />
                </div>

                <div className="nh-field">
                  <label htmlFor="f-segmento">Segmento da Empresa</label>
                  <select id="f-segmento" required defaultValue="">
                    <option value="" disabled>Selecione o segmento</option>
                    <option value="agronegocio">Agronegócio</option>
                    <option value="construcao">Construção Civil</option>
                    <option value="saude">Saúde Avançada / Medicina</option>
                    <option value="outro">Outro segmento Premium</option>
                  </select>
                </div>

                <div className="nh-field">
                  <label htmlFor="f-faturamento">Faturamento Médio Mensal</label>
                  <select id="f-faturamento" required defaultValue="">
                    <option value="" disabled>Selecione a faixa</option>
                    <option value="100-500k">R$ 100 mil – R$ 500 mil</option>
                    <option value="500k-2m">R$ 500 mil – R$ 2 milhões</option>
                    <option value="2m+">Acima de R$ 2 milhões</option>
                  </select>
                </div>

                <div className="nh-field">
                  <label htmlFor="f-meta">Meta de Crescimento com este Projeto</label>
                  <textarea
                    id="f-meta"
                    rows={2}
                    placeholder="Descreva o resultado que você quer atingir..."
                    required
                  />
                </div>

                <div className="nh-field">
                  <label htmlFor="f-whatsapp">WhatsApp (com DDD)</label>
                  <input
                    id="f-whatsapp"
                    type="tel"
                    placeholder="(45) 9 9999-9999"
                    required
                    autoComplete="tel"
                  />
                </div>

                <div className="nh-form-footer">
                  <p className="nh-form-disclaimer">
                    Somente parceiros qualificados avançam para o diagnóstico estratégico.
                  </p>
                  <button
                    type="submit"
                    className="nh-btn-submit"
                    id="form-submit-btn"
                    disabled={status === 'sending'}
                    aria-label="Enviar formulário de qualificação"
                  >
                    <span>
                      {status === 'sending' ? 'Enviando...' : 'Enviar Qualificação'}
                    </span>
                    {status !== 'sending' && (
                      <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden="true">
                        <path d="M2 6h8M6 2l4 4-4 4" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    )}
                  </button>
                </div>
              </form>
            )}
          </div>

        </div>
      </div>
    </section>
  )
}

/* ──────────────────────────────────────────────────────
   FOOTER MONUMENTAL
   Tipografia da marca ocupando toda a largura da tela.
   ────────────────────────────────────────────────────── */
function Footer() {
  const ref = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.nh-footer-wordmark', {
        opacity: 0,
        y: 80,
        duration: 1.4,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: '.nh-footer-wordmark',
          start: 'top 90%',
        },
      })
    }, ref)
    return () => ctx.revert()
  }, [])

  return (
    <footer className="nh-footer" ref={ref}>

      {/* Barra de links institucionais */}
      <div className="nh-footer-topbar">
        <div className="nh-footer-topbar-inner">
          <span className="nh-footer-tagline">
            Ecossistema Premium de Conversão — Oeste do Paraná
          </span>
          <nav className="nh-footer-nav" aria-label="Rodapé">
            <a href="#servicos" className="nh-footer-navlink">Serviços</a>
            <a href="#portfolio" className="nh-footer-navlink">Portfólio</a>
            <a href="#metodologia" className="nh-footer-navlink">Metodologia</a>
            <a href="#qualificacao" className="nh-footer-navlink">Contato</a>
          </nav>
        </div>
      </div>

      {/* Wordmark monumental */}
      <div className="nh-footer-wordmark-wrap" aria-hidden="true">
        <span className="nh-footer-wordmark">OXUI</span>
      </div>

      {/* Rodapé legal */}
      <div className="nh-footer-bottom">
        <div className="nh-footer-bottom-inner">
          <span className="nh-footer-copy">© {new Date().getFullYear()} OXUI Studio. Todos os direitos reservados.</span>
          <span className="nh-footer-copy">Toledo · Cascavel · Oeste do Paraná</span>
        </div>
      </div>

    </footer>
  )
}

/* ──────────────────────────────────────────────────────
   ROOT — HomeNew
   ────────────────────────────────────────────────────── */
export default function HomeNew() {
  useEffect(() => {
    ScrollTrigger.config({ ignoreMobileResize: true })

    const lenis = new Lenis({
      lerp: 0.1,
      wheelMultiplier: 1,
      touchMultiplier: 2,
      smoothWheel: true,
    })

    lenis.on('scroll', ScrollTrigger.update)
    const tick = (t) => lenis.raf(t * 1000)
    gsap.ticker.add(tick)
    gsap.ticker.lagSmoothing(0)

    const timer = setTimeout(() => ScrollTrigger.refresh(), 800)

    return () => {
      gsap.ticker.remove(tick)
      lenis.destroy()
      clearTimeout(timer)
      ScrollTrigger.getAll().forEach((st) => st.kill())
    }
  }, [])

  return (
    <div className="nh-root">
      <Hero />
      <Pain />
      <Services />
      <Portfolio />
      <TrustSignals />
      <Closing />
      <Footer />
    </div>
  )
}
