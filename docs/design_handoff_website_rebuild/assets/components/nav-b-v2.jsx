// nav-b-v2.jsx — Direction B mega menu, rebuilt to the new 3-category structure.
// (Replaces the NavB export from nav.jsx for the canvas.)

const SERVICE_CATEGORIES = [
  {
    id: 'coaching',
    kicker: 'Rapid Acceleration Coaching',
    sub: 'For leaders building AI capability — with peers or one-to-one.',
    accent: 'var(--c-accent)',
    items: [
      { title: 'Leadership Cohort', meta: '8 weeks · mixed group of non-competing leaders', tag: 'From £8k' },
      { title: 'Senior Leader Acceleration', meta: '8 weeks · 1–4 leaders · +£3k pp', tag: 'From £10k' },
      { title: 'Executive Coaching', meta: '1:1 ongoing · senior partner-led', tag: 'From £4k/mo' },
    ],
  },
  {
    id: 'company',
    kicker: 'Company Enablement & Activation',
    sub: 'For businesses ready to move as an organisation, not just upskill leaders.',
    accent: 'var(--c-fg)',
    featured: true,
    items: [
      { title: 'Phase 0 — Strategy & Activation', meta: '2 weeks. Align leaders, activate teams, leave with an AI roadmap.', tag: 'From £5k', highlight: true, note: 'Start here' },
      { title: 'Phase 1+ Transformation Cycles', meta: '8-week sequential cycles · capability + systems', tag: 'From £20k' },
    ],
  },
  {
    id: 'ongoing',
    kicker: 'Ongoing partnership',
    sub: 'Senior judgement in the room for as long as you need it.',
    accent: '#fea700',
    items: [
      { title: 'Fractional AI Advisory', meta: 'Monthly · senior operator inside your business', tag: 'From £6k/mo' },
    ],
  },
];

function NavBv2() {
  return (
    <Board dir="b" style={{ padding: 0 }}>
      {/* Top bar */}
      <div style={{
        background: 'rgba(255,255,255,0.92)',
        backdropFilter: 'blur(20px)',
        borderBottom: '1px solid var(--c-line)',
      }}>
        <div style={{
          maxWidth: 1280, margin: '0 auto',
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          padding: '16px 32px',
        }}>
          <AXMark />
          <nav style={{
            display: 'flex', gap: 4,
            background: 'var(--c-bg-alt)', padding: 4, borderRadius: 999, fontSize: 12.5, fontWeight: 500,
          }}>
            {['What we do', 'Talks & Events', 'How we work', 'Insights', 'About'].map((l, i) => (
              <span key={l} style={{
                padding: '6px 12px', borderRadius: 999,
                background: l === 'What we do' ? 'var(--c-bg)' : 'transparent',
                color: 'var(--c-fg)',
                boxShadow: l === 'What we do' ? '0 1px 3px rgba(0,0,0,0.05)' : 'none',
              }}>{l}</span>
            ))}
          </nav>
          <div className="btn btn-primary" style={{ fontSize: 12, padding: '8px 16px' }}>Let's talk →</div>
        </div>
      </div>

      {/* Mega menu */}
      <div style={{
        background: 'var(--c-bg-alt)',
        padding: '28px 32px 28px',
        borderBottom: '1px solid var(--c-line)',
      }}>
        <div style={{ maxWidth: 1280, margin: '0 auto' }}>
          {/* Header row */}
          <div style={{ marginBottom: 20 }}>
            <Chip>What we do</Chip>
          </div>

          {/* Three columns */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.3fr 1fr', gap: 12 }}>
            {SERVICE_CATEGORIES.map((cat, ci) => (
              <div key={cat.id} className="panel" style={{
                padding: 22,
                background: cat.featured ? 'var(--c-bg)' : 'var(--c-bg)',
                border: cat.featured ? `1px solid ${cat.accent}` : '1px solid var(--c-line)',
                display: 'flex', flexDirection: 'column', gap: 12,
              }}>
                {/* Column header */}
                <div style={{ display: 'flex', gap: 12, alignItems: 'flex-start' }}>
                  <div style={{
                    width: 36, height: 36, borderRadius: 8,
                    background: `${cat.accent}18`, color: cat.accent,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontFamily: 'JetBrains Mono, monospace', fontSize: 12, fontWeight: 600,
                    flexShrink: 0,
                  }}>{String(ci+1).padStart(2,'0')}</div>
                  <div style={{ minWidth: 0 }}>
                    <div style={{ fontSize: 13.5, fontWeight: 600, letterSpacing: '-0.005em' }}>{cat.kicker}</div>
                    <div style={{ fontSize: 11.5, color: 'var(--c-fg-muted)', lineHeight: 1.4, marginTop: 3 }}>{cat.sub}</div>
                  </div>
                </div>

                {/* Items */}
                <div style={{ paddingTop: 6, display: 'flex', flexDirection: 'column', gap: 0 }}>
                  {cat.items.map((it, i) => (
                    <div key={it.title} style={{
                      borderTop: '1px solid var(--c-line)',
                      padding: '12px 0',
                      display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: 12,
                      position: 'relative',
                    }}>
                      <div style={{ minWidth: 0, flex: 1 }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 3 }}>
                          <span style={{ fontSize: 13.5, fontWeight: 600 }}>{it.title}</span>
                          {it.note && (
                            <span style={{
                              fontSize: 9, fontWeight: 600, letterSpacing: '0.06em',
                              padding: '2px 6px', borderRadius: 4, background: cat.accent, color: '#fff',
                              textTransform: 'uppercase',
                            }}>{it.note}</span>
                          )}
                        </div>
                        <div style={{ fontSize: 11.5, color: 'var(--c-fg-muted)', lineHeight: 1.4 }}>{it.meta}</div>
                      </div>
                      <div style={{ fontSize: 11.5, color: 'var(--c-fg)', fontWeight: 500, flexShrink: 0, marginTop: 2 }}>{it.tag}</div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* Bottom row — method + readiness */}
          <div style={{ marginTop: 14, display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
            <div className="panel" style={{ padding: '14px 18px', background: 'var(--c-bg)' }}>
              <div className="eyebrow" style={{ fontSize: 9, marginBottom: 4 }}>Method</div>
              <div style={{ fontSize: 13, fontWeight: 500 }}>The DOTS framework — Dream · Obstacles · Triage · Sequence →</div>
            </div>
            <div className="panel" style={{ padding: '14px 18px', background: 'var(--c-bg)' }}>
              <div className="eyebrow" style={{ fontSize: 9, marginBottom: 4 }}>Not sure where to start?</div>
              <div style={{ fontSize: 13, fontWeight: 500 }}>Take the 4-min readiness quiz →</div>
            </div>
          </div>
        </div>
      </div>

      {/* Faded preview underneath */}
      <div style={{ padding: 40, opacity: 0.3 }}>
        <h1 className="h-display" style={{ fontSize: 72, margin: 0, lineHeight: 0.95 }}>
          AI capability that <span style={{ color: 'var(--c-accent)' }}>compounds.</span>
        </h1>
      </div>
    </Board>
  );
}

Object.assign(window, { NavBv2 });
