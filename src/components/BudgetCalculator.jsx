import React, { useState, useMemo } from 'react';
import './BudgetCalculator.css';

/* ── Lógica de Preços ──────────────────────────────────────────────── */
function formatDuration(seconds) {
  if (seconds < 60) return `${seconds}s`;
  const m = Math.floor(seconds / 60);
  const s = seconds % 60;
  return s === 0 ? `${m}min` : `${m}min ${s}s`;
}

function getTimeLabel(seconds) {
  if (seconds <= 30) return 'até 30s';
  if (seconds <= 60) return 'até 1min';
  if (seconds <= 120) return 'até 2min';
  if (seconds <= 180) return 'até 3min';
  if (seconds <= 300) return 'até 5min';
  return `${Math.floor(seconds / 60)}min`;
}

function calculateBudget(seconds, is4K, hasSecondFormat) {
  // Preço base por faixa de duração
  let basePrice = 0;
  if (seconds <= 30) basePrice = 500;
  else if (seconds <= 60) basePrice = 700;
  else if (seconds <= 120) basePrice = 1050;
  else if (seconds <= 180) basePrice = 1500;
  else if (seconds <= 300) basePrice = 2500;
  else {
    const extraMinutes = Math.ceil((seconds - 300) / 60);
    basePrice = 2500 + extraMinutes * 350;
  }

  // Adicional 4K: R$250 a cada 3 minutos (faixas de 180s)
  let additionalK4 = 0;
  if (is4K) {
    const blocks = Math.ceil(seconds / 180);
    additionalK4 = blocks * 250;
  }

  // Adicional 2º formato
  const additionalFormat = hasSecondFormat ? (is4K ? 500 : 250) : 0;

  const formatTotal = basePrice + additionalK4;
  const total = formatTotal + additionalFormat;

  return { basePrice, additionalK4, additionalFormat, formatTotal, total };
}

function formatCurrency(value) {
  return value.toLocaleString('pt-BR', { minimumFractionDigits: 2 });
}

/* ── Componente Principal ──────────────────────────────────────────── */
export default function BudgetCalculator() {
  const [company, setCompany] = useState('');
  const [seconds, setSeconds] = useState(30);
  const [is4K, setIs4K] = useState(false);
  const [hasSecondFormat, setHasSecondFormat] = useState(false);

  const budget = useMemo(
    () => calculateBudget(seconds, is4K, hasSecondFormat),
    [seconds, is4K, hasSecondFormat]
  );

  // Porcentagem do slider para preencher o track
  const sliderPercent = ((seconds - 15) / (600 - 15)) * 100;

  // Monta mensagem do WhatsApp
  const handleWhatsApp = () => {
    const empresa = company.trim() || 'não informado';
    const msg = encodeURIComponent(
      `Olá Sued! Gostaria de solicitar um orçamento:\n\n` +
      `🏢 Empresa: ${empresa}\n` +
      `⏱ Duração: ${formatDuration(seconds)}\n` +
      `🎬 Formato: ${is4K ? '4K' : '1080 HD'}\n` +
      `📐 2º Formato: ${hasSecondFormat ? 'Sim' : 'Não'}\n\n` +
      `💰 Valor estimado: R$ ${formatCurrency(budget.total)}`
    );
    window.open(`https://wa.me/5500000000000?text=${msg}`, '_blank');
  };

  return (
    <section className="calc-section" id="orcamento">
      {/* Grade de fundo */}
      <div className="calc-grid-bg" aria-hidden="true" />

      <div className="calc-wrapper">

        {/* Header: Título + Card de Contato */}
        <div className="calc-header-row">
          <div className="calc-title-pill">
            <span>CALCULADORA DE ORÇAMENTO</span>
            <span className="calc-title-accent">VÍDEO COM IA</span>
          </div>

          {/* Card de contato rápido */}
          <div className="calc-contact-card">
            <div className="calc-contact-card__top">
              <span className="calc-contact-card__badge">
                <span className="calc-contact-card__badge-dot" />
                ATENDIMENTO DIRETO
              </span>
              <h3 className="calc-contact-card__title">
                Tire suas dúvidas &amp; receba um
                <span className="calc-contact-card__accent"> orçamento personalizado</span>
              </h3>
              <p className="calc-contact-card__desc">
                Fale comigo no WhatsApp agora. Resposta rápida, sem enrolação.
              </p>
            </div>
            <a
              href="https://wa.me/5545998522258?text=Ol%C3%A1%20Sued%2C%20tenho%20algumas%20d%C3%BAvidas%20e%20gostaria%20de%20um%20or%C3%A7amento%20personalizado!"
              target="_blank"
              rel="noreferrer"
              className="calc-contact-card__btn"
            >
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" fill="currentColor"/>
                <path d="M10 0C4.477 0 0 4.477 0 10c0 1.845.5 3.57 1.37 5.05L0 20l5.09-1.34A9.954 9.954 0 0010 20c5.523 0 10-4.477 10-10S15.523 0 10 0zm0 18.182a8.182 8.182 0 01-4.17-1.14l-.299-.177-3.02.795.808-2.949-.194-.303A8.182 8.182 0 0110 1.818c4.512 0 8.182 3.67 8.182 8.182s-3.67 8.182-8.182 8.182z" fill="currentColor"/>
              </svg>
              Falar no WhatsApp agora
              <svg className="calc-contact-card__arrow" width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path d="M3 8H13M13 8L9 4M13 8L9 12" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </a>
          </div>
        </div>

        <div className="calc-body">

          {/* Coluna esquerda — inputs */}
          <div className="calc-inputs">

            {/* Nome da Empresa */}
            <div className="calc-field">
              <label className="calc-label" htmlFor="company-input">
                Nome da Empresa
              </label>
              <input
                id="company-input"
                className="calc-input"
                type="text"
                placeholder="Ex: Studio Aurora"
                value={company}
                onChange={e => setCompany(e.target.value)}
              />
            </div>

            {/* Duração — slider */}
            <div className="calc-field">
              <label className="calc-label">
                Duração do Vídeo
                <span className="calc-duration-badge">{formatDuration(seconds)}</span>
              </label>

              <div className="calc-slider-wrap">
                <input
                  className="calc-slider"
                  type="range"
                  min={15}
                  max={600}
                  step={15}
                  value={seconds}
                  onChange={e => setSeconds(Number(e.target.value))}
                  style={{ '--fill': `${sliderPercent}%` }}
                  aria-label="Duração do vídeo"
                />
                <div className="calc-slider-ticks">
                  {[
                    { label: '15s',  val: 15  },
                    { label: '30s',  val: 30  },
                    { label: '1min', val: 60  },
                    { label: '2min', val: 120 },
                    { label: '3min', val: 180 },
                    { label: '5min', val: 300 },
                    { label: '10min',val: 600 },
                  ].map(({ label, val }) => (
                    <span
                      key={val}
                      style={{ left: `${((val - 15) / (600 - 15)) * 100}%` }}
                    >
                      {label}
                    </span>
                  ))}
                </div>
              </div>

              {/* Faixas de preço */}
              <div className="calc-price-bands">
                {[
                  { label: '≤30s', price: 'R$500', active: seconds <= 30 },
                  { label: '≤1min', price: 'R$700', active: seconds > 30 && seconds <= 60 },
                  { label: '≤2min', price: 'R$1.050', active: seconds > 60 && seconds <= 120 },
                  { label: '≤3min', price: 'R$1.500', active: seconds > 120 && seconds <= 180 },
                  { label: '≤5min', price: 'R$2.500', active: seconds > 180 && seconds <= 300 },
                  { label: '+5min', price: '+R$350/min', active: seconds > 300 },
                ].map((band) => (
                  <div key={band.label} className={`calc-band ${band.active ? 'active' : ''}`}>
                    <span className="calc-band-label">{band.label}</span>
                    <span className="calc-band-price">{band.price}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Formato */}
            <div className="calc-field">
              <label className="calc-label">Formato de Entrega</label>
              <div className="calc-toggle-group">
                <button
                  className={`calc-toggle ${!is4K ? 'active' : ''}`}
                  onClick={() => setIs4K(false)}
                >
                  <span className="calc-toggle-icon">🎬</span>
                  1080 HD
                </button>
                <button
                  className={`calc-toggle ${is4K ? 'active' : ''}`}
                  onClick={() => setIs4K(true)}
                >
                  <span className="calc-toggle-icon">✦</span>
                  4K Ultra HD
                  <span className="calc-toggle-tag">+R$250/3min</span>
                </button>
              </div>
            </div>

            {/* 2º Formato */}
            <div className="calc-field">
              <label className="calc-label">
                2º Formato do mesmo vídeo
                <span className="calc-label-hint">
                  (ex: 9:16 + 16:9)
                </span>
              </label>
              <div className="calc-toggle-group">
                <button
                  className={`calc-toggle ${!hasSecondFormat ? 'active' : ''}`}
                  onClick={() => setHasSecondFormat(false)}
                >
                  Não
                </button>
                <button
                  className={`calc-toggle ${hasSecondFormat ? 'active' : ''}`}
                  onClick={() => setHasSecondFormat(true)}
                >
                  Sim — {is4K ? '+R$500' : '+R$250'}
                </button>
              </div>
            </div>

          </div>

          {/* Coluna direita — resultado */}
          <div className="calc-result">

            <div className="calc-specs">
              <div className="calc-spec-item">
                <span className="calc-spec-key">TIME</span>
                <span className="calc-spec-val">{formatDuration(seconds)}</span>
              </div>
              <div className="calc-spec-item">
                <span className="calc-spec-key">FORMATO</span>
                <span className="calc-spec-val">{is4K ? '4K Ultra HD' : '1080 HD'}</span>
              </div>
              <div className="calc-spec-item">
                <span className="calc-spec-key">CODEC</span>
                <span className="calc-spec-val">{is4K ? 'H.265 / HEVC' : 'H.264'}</span>
              </div>
              <div className="calc-spec-item">
                <span className="calc-spec-key">FPS</span>
                <span className="calc-spec-val">{is4K ? '24–60 FPS' : '30 FPS'}</span>
              </div>
              {company && (
                <div className="calc-spec-item">
                  <span className="calc-spec-key">EMPRESA</span>
                  <span className="calc-spec-val">{company}</span>
                </div>
              )}
            </div>

            <div className="calc-breakdown">

              <div className="calc-row">
                <div className="calc-row-label">
                  VALOR BASE
                  <span className="calc-row-sub">{getTimeLabel(seconds)} · {is4K ? '4K' : '1080 HD'}</span>
                </div>
                <div className="calc-row-value">
                  R$ <strong>{formatCurrency(budget.basePrice)}</strong>
                </div>
              </div>

              {is4K && (
                <div className="calc-row">
                  <div className="calc-row-label">
                    ADICIONAL 4K
                    <span className="calc-row-sub">R$250 × {Math.ceil(seconds / 180)} bloco(s) de 3min</span>
                  </div>
                  <div className="calc-row-value">
                    R$ <strong>{formatCurrency(budget.additionalK4)}</strong>
                  </div>
                </div>
              )}

              {hasSecondFormat && (
                <div className="calc-row">
                  <div className="calc-row-label">
                    ADICIONAL 2º FORMATO
                    <span className="calc-row-sub">{is4K ? '4K' : '1080 HD'}</span>
                  </div>
                  <div className="calc-row-value">
                    R$ <strong>{formatCurrency(budget.additionalFormat)}</strong>
                  </div>
                </div>
              )}

              <div className="calc-row calc-row--total">
                <div className="calc-row-label">VALOR TOTAL</div>
                <div className="calc-row-value calc-row-value--highlight">
                  R$ <strong>{formatCurrency(budget.total)}</strong>
                </div>
              </div>

            </div>

            <button className="calc-cta" onClick={handleWhatsApp}>
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" fill="currentColor"/>
                <path d="M10 0C4.477 0 0 4.477 0 10c0 1.845.5 3.57 1.37 5.05L0 20l5.09-1.34A9.954 9.954 0 0010 20c5.523 0 10-4.477 10-10S15.523 0 10 0zm0 18.182a8.182 8.182 0 01-4.17-1.14l-.299-.177-3.02.795.808-2.949-.194-.303A8.182 8.182 0 0110 1.818c4.512 0 8.182 3.67 8.182 8.182s-3.67 8.182-8.182 8.182z" fill="currentColor"/>
              </svg>
              Solicitar Orçamento via WhatsApp
            </button>

          </div>
        </div>
      </div>
    </section>
  );
}
