// nav.jsx — Navigation system, 4 directions × (desktop mega menu + mobile)

const NAV_ITEMS = [
  { label: 'What we do', mega: 'offerings', cta: false },
  { label: 'How we work', mega: false },
  { label: 'Insights', mega: 'insights' },
  { label: 'Resources', mega: false },
  { label: 'About', mega: false },
  { label: 'Contact', mega: false },
];

const OFFERINGS_MENU = [
  { kicker: 'Foundation', title: 'Leadership Activation', sub: 'Half-day workshop. Find the moves that matter.', tag: 'From £2k' },
  { kicker: 'Core', title: '8-Week Transformation Cycle', sub: 'Focused sprint with measurable outcomes.', tag: 'From £12k' },
  { kicker: 'Cohort', title: 'Leadership Cohort', sub: 'Quarterly cohort of non-competing leaders.', tag: 'From £8k' },
  { kicker: 'Ongoing', title: 'Fractional AI Advisory', sub: 'Senior operator inside your business.', tag: 'From £6k/mo' },
];

const INSIGHTS_MENU = [
  { kicker: 'Featured', title: 'The Implementation Gap', sub: 'Why most AI initiatives stall — and what to do.', date: 'Mar 2026' },
  { kicker: 'Series', title: 'The 5-Stage Build Sequence', sub: 'A framework for shipping AI capability.', date: 'Apr 2026' },
  { kicker: 'Podcast', title: 'Built in the Room — Episode 7', sub: 'Leadership alignment under uncertainty.', date: 'May 2026' },
  { kicker: 'Dispatch', title: 'Weekly briefing', sub: 'One useful note each week. No hype.', date: 'Subscribe' },
];

/* ─────────────────────────────────────────────────────────────────────
   DIRECTION A — QUIET AUTHORITY
   Editorial mega menu, navy ink on ivory. Restrained, FT-like.
   ───────────────────────────────────────────────────────────────────── */
function NavA() {
  return (
    <Board dir="a" style={{ padding: 0 }}>
      {/* Top bar */}
      <div style={{
        borderBottom: '1px solid var(--c-line)',
        background: 'var(--c-bg)',
      }}>
        <div style={{
          maxWidth: 1200, margin: '0 auto',
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          padding: '20px 40px',
        }}>
          <AXMark />
          <nav style={{ display: 'flex', gap: 28 }}>
            {NAV_ITEMS.map((n, i) => (
              <span key={n.label} style={{
                fontSize: 13, fontWeight: 500, letterSpacing: '-0.005em',
                color: n.mega === 'offerings' ? 'var(--c-fg)' : 'var(--c-fg-muted)',
                borderBottom: n.mega === 'offerings' ? '1px solid var(--c-fg)' : '1px solid transparent',
                paddingBottom: 2,
              }}>{n.label}</span>
            ))}
          </nav>
          <div className="btn btn-primary" style={{ fontSize: 11 }}>Start with a workshop →</div>
        </div>
      </div>

      {/* Mega menu — editorial layout */}
      <div style={{
        background: 'var(--c-bg)',
        borderBottom: '1px solid var(--c-line)',
        padding: '40px 40px 48px',
      }}>
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '220px 1fr', gap: 60 }}>
            <div>
              <div className="eyebrow" style={{ marginBottom: 16 }}>What we do</div>
              <h3 className="h-display" style={{ fontSize: 28, margin: '0 0 12px' }}>
                Four ways to <em style={{ fontStyle: 'italic', color: 'var(--c-accent)' }}>work with us.</em>
              </h3>
              <p style={{ fontSize: 12, color: 'var(--c-fg-muted)', lineHeight: 1.55, margin: 0 }}>
                Each engagement starts the same way: a leadership session that earns the next step.
              </p>
              <div style={{ marginTop: 18 }}>
                <span style={{ fontFamily: 'var(--f-mono)', fontSize: 11, color: 'var(--c-accent)' }}>
                  See all offerings →
                </span>
              </div>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px 40px' }}>
              {OFFERINGS_MENU.map((o, i) => (
                <div key={o.title} style={{
                  paddingTop: 16,
                  borderTop: '1px solid var(--c-line)',
                  display: 'grid', gridTemplateColumns: '24px 1fr 60px', gap: 14,
                }}>
                  <span style={{ fontFamily: 'var(--f-mono)', fontSize: 11, color: 'var(--c-fg-muted)' }}>
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <div>
                    <div style={{ fontFamily: 'var(--f-mono)', fontSize: 10, letterSpacing: '0.16em', textTransform: 'uppercase', color: 'var(--c-fg-muted)', marginBottom: 4 }}>
                      {o.kicker}
                    </div>
                    <h4 className="h-display" style={{ fontSize: 19, margin: '0 0 4px' }}>{o.title}</h4>
                    <p style={{ fontSize: 12.5, color: 'var(--c-fg-muted)', lineHeight: 1.5, margin: 0 }}>{o.sub}</p>
                  </div>
                  <div style={{ fontSize: 11, color: 'var(--c-fg)', fontWeight: 500, textAlign: 'right' }}>{o.tag}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Faded page underneath, just to show the menu is overlayed */}
      <div style={{ padding: '40px', opacity: 0.35 }}>
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
          <div className="eyebrow" style={{ marginBottom: 14 }}>The Brief · 2026</div>
          <h1 className="h-display" style={{ fontSize: 64, margin: 0, lineHeight: 0.98 }}>
            AI transformation,<br/>built in the room.
          </h1>
        </div>
      </div>
    </Board>
  );
}

/* ─────────────────────────────────────────────────────────────────────
   DIRECTION B — STUDIO SYSTEM
   Panel-based mega menu with visual previews. Bento-style.
   ───────────────────────────────────────────────────────────────────── */
function NavB() {
  return (
    <Board dir="b" style={{ padding: 0 }}>
      {/* Top bar */}
      <div style={{
        background: 'rgba(255,255,255,0.92)',
        backdropFilter: 'blur(20px)',
        borderBottom: '1px solid var(--c-line)',
      }}>
        <div style={{
          maxWidth: 1200, margin: '0 auto',
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          padding: '16px 32px',
        }}>
          <AXMark />
          <nav style={{
            display: 'flex', gap: 6,
            background: 'var(--c-bg-alt)', padding: 4, borderRadius: 999,
          }}>
            {NAV_ITEMS.map((n, i) => (
              <span key={n.label} style={{
                fontSize: 12.5, fontWeight: 500,
                padding: '6px 12px',
                borderRadius: 999,
                background: n.mega === 'offerings' ? 'var(--c-bg)' : 'transparent',
                color: 'var(--c-fg)',
                boxShadow: n.mega === 'offerings' ? '0 1px 3px rgba(0,0,0,0.05)' : 'none',
              }}>{n.label}</span>
            ))}
          </nav>
          <div className="btn btn-primary" style={{ fontSize: 12, padding: '8px 16px' }}>Apply →</div>
        </div>
      </div>

      {/* Mega menu — bento panels */}
      <div style={{
        background: 'var(--c-bg-alt)',
        padding: '24px 32px 40px',
        borderBottom: '1px solid var(--c-line)',
      }}>
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
          <div className="eyebrow" style={{ marginBottom: 18 }}>What we do · 4 services</div>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(4, 1fr)',
            gap: 12,
          }}>
            {OFFERINGS_MENU.map((o, i) => (
              <div key={o.title} className="panel" style={{
                padding: 18,
                display: 'flex', flexDirection: 'column', gap: 10,
                minHeight: 200,
                background: i === 0 ? 'var(--c-bg)' : 'var(--c-bg)',
              }}>
                <div style={{
                  width: 36, height: 36, borderRadius: 8,
                  background: i === 0 ? 'rgba(8,138,191,0.12)' :
                             i === 1 ? 'rgba(27,42,74,0.10)' :
                             i === 2 ? 'rgba(233,63,142,0.12)' :
                                       'rgba(254,167,0,0.16)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontFamily: 'JetBrains Mono, monospace', fontSize: 11, fontWeight: 600,
                  color: i === 0 ? 'var(--c-accent)' : i === 1 ? 'var(--c-fg)' : i === 2 ? 'var(--c-accent-2)' : '#8a5c00',
                }}>{String(i + 1).padStart(2, '0')}</div>
                <div style={{ fontSize: 10, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--c-fg-muted)', fontWeight: 600 }}>{o.kicker}</div>
                <h4 className="h-display" style={{ fontSize: 15, margin: 0, letterSpacing: '-0.02em', lineHeight: 1.15 }}>{o.title}</h4>
                <p style={{ fontSize: 11.5, color: 'var(--c-fg-muted)', lineHeight: 1.45, margin: 0 }}>{o.sub}</p>
                <div style={{ marginTop: 'auto', fontSize: 11, color: 'var(--c-fg)', fontWeight: 500 }}>{o.tag} →</div>
              </div>
            ))}
          </div>

          <div style={{ marginTop: 16, display: 'grid', gridTemplateColumns: '2fr 1fr', gap: 12 }}>
            <div className="panel" style={{ padding: 16, display: 'flex', gap: 14, alignItems: 'center', background: 'var(--c-bg)' }}>
              <div style={{ width: 64, height: 48, background: 'rgba(27,42,74,0.08)', borderRadius: 6 }} />
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 10, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--c-accent-2)', fontWeight: 600 }}>Featured case</div>
                <div style={{ fontSize: 13, fontWeight: 500, marginTop: 4 }}>How a £45M retailer cut backlog 60% in one cycle.</div>
              </div>
              <span style={{ fontSize: 11, color: 'var(--c-fg-muted)' }}>Read →</span>
            </div>
            <div className="panel" style={{ padding: 16, background: 'var(--c-bg)' }}>
              <div style={{ fontSize: 10, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--c-fg-muted)', fontWeight: 600 }}>Unsure where to start?</div>
              <div style={{ fontSize: 13, fontWeight: 500, marginTop: 4 }}>Take the 4-min AI Readiness Quiz →</div>
            </div>
          </div>
        </div>
      </div>

      {/* Faded page underneath */}
      <div style={{ padding: 40, opacity: 0.3 }}>
        <h1 className="h-display" style={{ fontSize: 72, margin: 0, lineHeight: 0.95 }}>
          Stop buying tools.<br/>Start building capability.
        </h1>
      </div>
    </Board>
  );
}

/* ─────────────────────────────────────────────────────────────────────
   DIRECTION C — LIVING MANUSCRIPT
   Magazine-style mega menu with featured editorial moment.
   ───────────────────────────────────────────────────────────────────── */
function NavC() {
  return (
    <Board dir="c" style={{ padding: 0 }}>
      {/* Top bar */}
      <div style={{
        background: 'var(--c-bg)',
        borderBottom: '2px solid var(--c-fg)',
      }}>
        <div style={{
          maxWidth: 1200, margin: '0 auto',
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          padding: '24px 40px',
        }}>
          <div style={{ display: 'flex', alignItems: 'baseline', gap: 16 }}>
            <span style={{
              fontFamily: 'var(--f-display)', fontSize: 26, fontStyle: 'italic',
              letterSpacing: '-0.01em',
            }}>Accelerator X</span>
            <span style={{ fontSize: 10, letterSpacing: '0.16em', textTransform: 'uppercase', color: 'var(--c-fg-muted)' }}>
              Issue 04 · May 2026
            </span>
          </div>
          <nav style={{ display: 'flex', gap: 26 }}>
            {NAV_ITEMS.map((n) => (
              <span key={n.label} style={{
                fontSize: 13,
                fontWeight: n.mega === 'offerings' ? 500 : 400,
                color: 'var(--c-fg)',
                fontStyle: n.mega === 'offerings' ? 'italic' : 'normal',
                fontFamily: n.mega === 'offerings' ? 'var(--f-display)' : 'var(--f-body)',
              }}>{n.label}</span>
            ))}
          </nav>
          <div className="btn btn-pink" style={{ fontSize: 11 }}>Apply →</div>
        </div>
      </div>

      {/* Mega menu — magazine spread */}
      <div style={{
        background: 'var(--c-bg)',
        borderBottom: '1px solid var(--c-line)',
        padding: '36px 40px 48px',
      }}>
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: 60 }}>
            {/* Featured offering */}
            <div>
              <div className="eyebrow" style={{ marginBottom: 18 }}>The Offerings · A primer</div>
              <h2 className="h-display" style={{ fontSize: 56, margin: 0, lineHeight: 0.92 }}>
                We work with you in <em style={{ color: 'var(--c-accent)' }}>four ways.</em>
              </h2>
              <p style={{
                fontFamily: 'var(--f-display)', fontStyle: 'italic',
                fontSize: 18, lineHeight: 1.4, color: 'var(--c-fg-muted)',
                margin: '20px 0 0', maxWidth: 420,
              }}>
                Each is a different commitment. None is a deck-and-run.
              </p>
            </div>

            {/* Offering list */}
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              {OFFERINGS_MENU.map((o, i) => (
                <div key={o.title} style={{
                  display: 'grid', gridTemplateColumns: '40px 1fr auto', gap: 16,
                  padding: '14px 0',
                  borderTop: i === 0 ? '1px solid var(--c-line)' : 'none',
                  borderBottom: '1px solid var(--c-line)',
                  alignItems: 'baseline',
                }}>
                  <span className="folio" style={{ fontSize: 22 }}>{String(i + 1).padStart(2, '0')}</span>
                  <div>
                    <h4 className="h-display" style={{ fontSize: 22, margin: 0, fontWeight: 400 }}>{o.title}</h4>
                    <p style={{ fontSize: 12.5, color: 'var(--c-fg-muted)', margin: '4px 0 0' }}>{o.sub}</p>
                  </div>
                  <span style={{ fontSize: 11, color: 'var(--c-fg-muted)', fontFamily: 'var(--f-mono)' }}>{o.tag}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div style={{ padding: 40, opacity: 0.3 }}>
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
          <h1 className="h-display" style={{ fontSize: 96, margin: 0, lineHeight: 0.9, maxWidth: 900 }}>
            For leaders who are <em>done waiting.</em>
          </h1>
        </div>
      </div>
    </Board>
  );
}

/* ─────────────────────────────────────────────────────────────────────
   DIRECTION D — INDEX
   Reference-manual mega menu. Numbered, monospaced, table-of-contents.
   ───────────────────────────────────────────────────────────────────── */
function NavD() {
  return (
    <Board dir="d" style={{ padding: 0 }}>
      {/* Top bar */}
      <div style={{
        background: 'var(--c-bg)',
        borderBottom: '1px solid var(--c-rule)',
      }}>
        <div style={{
          maxWidth: 1200, margin: '0 auto',
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          padding: '16px 36px',
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
            <span style={{
              fontFamily: 'var(--f-mono)', fontSize: 13, fontWeight: 600,
              letterSpacing: '0.04em',
            }}>AX</span>
            <span style={{ fontFamily: 'var(--f-mono)', fontSize: 10, color: 'var(--c-fg-muted)', letterSpacing: '0.06em' }}>
              ACCELERATOR-X.AI / INDEX
            </span>
          </div>
          <nav style={{ display: 'flex', gap: 4 }}>
            {NAV_ITEMS.map((n, i) => (
              <span key={n.label} style={{
                fontFamily: 'var(--f-mono)', fontSize: 11,
                padding: '6px 10px',
                color: n.mega === 'offerings' ? 'var(--c-bg)' : 'var(--c-fg)',
                background: n.mega === 'offerings' ? 'var(--c-fg)' : 'transparent',
                letterSpacing: '0.04em',
              }}>
                <span style={{ opacity: 0.55, marginRight: 6 }}>§{String(i + 1).padStart(2, '0')}</span>
                {n.label}
              </span>
            ))}
          </nav>
          <div className="btn btn-primary">Apply →</div>
        </div>
      </div>

      {/* Mega menu — TOC */}
      <div style={{
        background: 'var(--c-bg)',
        borderBottom: '1px solid var(--c-rule)',
        padding: '28px 36px 36px',
      }}>
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
          <div style={{
            display: 'grid', gridTemplateColumns: '180px 1fr 240px', gap: 36,
          }}>
            <div>
              <div className="eyebrow">§ 01</div>
              <h3 className="h-display" style={{ fontSize: 22, margin: '6px 0 0', letterSpacing: '-0.02em' }}>
                What we do
              </h3>
              <div style={{ fontFamily: 'var(--f-mono)', fontSize: 10, color: 'var(--c-fg-muted)', marginTop: 6 }}>
                4 SERVICES · 1 INDEX
              </div>
            </div>

            <div>
              {OFFERINGS_MENU.map((o, i) => (
                <div key={o.title} style={{
                  display: 'grid', gridTemplateColumns: '32px 80px 1fr 80px', gap: 16,
                  padding: '12px 0',
                  borderTop: '1px solid var(--c-line)',
                  alignItems: 'baseline',
                }}>
                  <span style={{ fontFamily: 'var(--f-mono)', fontSize: 11, color: 'var(--c-fg-muted)', letterSpacing: '0.04em' }}>
                    01.{String(i + 1).padStart(2, '0')}
                  </span>
                  <span style={{ fontFamily: 'var(--f-mono)', fontSize: 10, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--c-fg-muted)' }}>
                    {o.kicker}
                  </span>
                  <div>
                    <div style={{ fontSize: 13.5, fontWeight: 500 }}>{o.title}</div>
                    <div style={{ fontSize: 11.5, color: 'var(--c-fg-muted)', marginTop: 2 }}>{o.sub}</div>
                  </div>
                  <span style={{ fontFamily: 'var(--f-mono)', fontSize: 10.5, color: 'var(--c-fg)', textAlign: 'right' }}>{o.tag}</span>
                </div>
              ))}
            </div>

            <div style={{
              background: 'var(--c-bg-alt)',
              padding: 18,
              borderRadius: 4,
              border: '1px solid var(--c-line)',
            }}>
              <div style={{ fontFamily: 'var(--f-mono)', fontSize: 10, letterSpacing: '0.1em', color: 'var(--c-fg-muted)', marginBottom: 8 }}>
                CROSS-REFERENCE
              </div>
              <div style={{ fontSize: 12, fontWeight: 500, marginBottom: 14 }}>
                Not sure where you fit?
              </div>
              <div style={{ fontFamily: 'var(--f-mono)', fontSize: 11, color: 'var(--c-accent)', marginBottom: 6 }}>
                → AI Readiness Quiz
              </div>
              <div style={{ fontFamily: 'var(--f-mono)', fontSize: 11, color: 'var(--c-accent)' }}>
                → Book a 20-min call
              </div>
            </div>
          </div>
        </div>
      </div>

      <div style={{ padding: 36, opacity: 0.3 }}>
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
          <div className="eyebrow">§ 00 · COVER</div>
          <h1 className="h-display" style={{ fontSize: 80, margin: '10px 0 0', lineHeight: 0.96 }}>
            An operating manual<br/>for AI transformation.
          </h1>
        </div>
      </div>
    </Board>
  );
}

/* ─────────────────────────────────────────────────────────────────────
   MOBILE NAV — one variant per direction, narrower artboard.
   ───────────────────────────────────────────────────────────────────── */
function MobileNavA() {
  return (
    <Board dir="a" style={{ padding: 0 }}>
      <div style={{ borderBottom: '1px solid var(--c-line)', padding: '18px 20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <AXMark label="" />
        <span style={{ fontFamily: 'var(--f-mono)', fontSize: 11, letterSpacing: '0.12em' }}>CLOSE</span>
      </div>
      <div style={{ padding: '24px 20px' }}>
        <div className="eyebrow" style={{ marginBottom: 14 }}>Menu</div>
        {NAV_ITEMS.map((n, i) => (
          <div key={n.label} style={{
            display: 'flex', justifyContent: 'space-between', alignItems: 'baseline',
            padding: '18px 0', borderBottom: '1px solid var(--c-line)',
          }}>
            <span className="h-display" style={{ fontSize: 24 }}>{n.label}</span>
            <span style={{ fontFamily: 'var(--f-mono)', fontSize: 10, color: 'var(--c-fg-muted)' }}>
              {String(i + 1).padStart(2, '0')}{n.mega ? ' →' : ''}
            </span>
          </div>
        ))}
        <div style={{ marginTop: 28 }}>
          <div className="btn btn-primary" style={{ width: '100%', justifyContent: 'center', padding: '14px' }}>
            Start with a workshop
          </div>
        </div>
        <div style={{ marginTop: 24, fontSize: 12, color: 'var(--c-fg-muted)', lineHeight: 1.5 }}>
          From £2,000 + VAT. If it isn't valuable, you don't pay.
        </div>
      </div>
    </Board>
  );
}

function MobileNavB() {
  // Mirrors the new mega menu — 3 categories, Talks & Events surfaced,
  // Phase 0 hero'd at the top, Let's talk CTA fixed at the bottom.
  return (
    <Board dir="b" style={{ padding: 0, display: 'flex', flexDirection: 'column', height: '100%' }}>
      {/* Top bar */}
      <div style={{
        flex: '0 0 auto',
        borderBottom: '1px solid var(--c-line)',
        padding: '14px 18px',
        display: 'flex', justifyContent: 'space-between', alignItems: 'center',
        background: 'var(--c-bg)',
      }}>
        <AXMark label="" />
        <div style={{
          width: 32, height: 32, borderRadius: 8, background: 'var(--c-bg-alt)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontSize: 18, fontWeight: 400, color: 'var(--c-fg)',
        }}>×</div>
      </div>

      {/* Scrollable body */}
      <div style={{ flex: 1, overflowY: 'auto', padding: '18px 18px 24px' }}>
        {/* Phase 0 promo */}
        <div style={{
          padding: 18, borderRadius: 14,
          background: 'var(--c-fg)', color: 'var(--c-bg)',
          marginBottom: 22,
        }}>
          <div style={{ fontSize: 9, letterSpacing: '0.14em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.55)', fontWeight: 600, marginBottom: 8 }}>
            Most businesses start here
          </div>
          <div style={{ fontFamily: 'var(--f-display)', fontSize: 24, fontWeight: 500, letterSpacing: '-0.02em', lineHeight: 1.05, marginBottom: 6 }}>
            Phase 0 — Strategy & Activation
          </div>
          <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.65)', lineHeight: 1.5, marginBottom: 14 }}>
            2 weeks · from £5k. Align leaders, activate teams, leave with an AI roadmap.
          </div>
          <div className="btn btn-accent" style={{ fontSize: 12, padding: '8px 14px' }}>Explore Phase 0 →</div>
        </div>

        {/* What we do — expanded by default */}
        <div style={{ marginBottom: 18 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '8px 0', borderBottom: '1px solid var(--c-line)' }}>
            <span style={{ fontSize: 11, letterSpacing: '0.14em', textTransform: 'uppercase', color: 'var(--c-fg-muted)', fontWeight: 600 }}>What we do</span>
            <span style={{ fontSize: 14, color: 'var(--c-fg-muted)' }}>−</span>
          </div>

          {/* 3 categories with sub-items */}
          {[
            {
              cat: 'Coaching & Cohorts',
              accent: 'var(--c-accent)',
              items: [
                { name: 'Leadership Cohort', meta: '8 weeks · from £8k' },
                { name: 'Senior Leader Acceleration', meta: '8 weeks · from £10k' },
                { name: 'Executive Coaching', meta: 'Ongoing · from £4k/mo' },
              ],
            },
            {
              cat: 'Company Enablement',
              accent: 'var(--c-fg)',
              items: [
                { name: 'Phase 0 — Strategy & Activation', meta: '2 weeks · from £5k', highlight: true },
                { name: 'Phase 1+ Transformation Cycles', meta: '8 weeks · from £20k' },
              ],
            },
            {
              cat: 'Ongoing Partnership',
              accent: '#fea700',
              items: [
                { name: 'Fractional AI Advisory', meta: 'Monthly · from £6k/mo' },
              ],
            },
          ].map(group => (
            <div key={group.cat} style={{ marginTop: 14 }}>
              <div style={{
                fontSize: 11, letterSpacing: '0.08em', textTransform: 'uppercase',
                color: group.accent, fontWeight: 600, marginBottom: 8, padding: '0 4px',
              }}>{group.cat}</div>
              {group.items.map(it => (
                <div key={it.name} style={{
                  display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: 12,
                  padding: '12px 8px', borderRadius: 8,
                  background: it.highlight ? 'var(--c-bg-alt)' : 'transparent',
                  border: it.highlight ? `1px solid ${group.accent}40` : 'none',
                  marginBottom: 4,
                }}>
                  <div style={{ minWidth: 0, flex: 1 }}>
                    <div style={{ fontSize: 14, fontWeight: 600, marginBottom: 2 }}>
                      {it.name}
                      {it.highlight && (
                        <span style={{
                          marginLeft: 8, fontSize: 9, fontWeight: 600, letterSpacing: '0.08em',
                          padding: '2px 6px', borderRadius: 4, background: group.accent, color: '#fff',
                          textTransform: 'uppercase',
                        }}>Start here</span>
                      )}
                    </div>
                    <div style={{ fontSize: 12, color: 'var(--c-fg-muted)' }}>{it.meta}</div>
                  </div>
                  <span style={{ color: 'var(--c-fg-muted)', fontSize: 14, marginTop: 2 }}>→</span>
                </div>
              ))}
            </div>
          ))}
        </div>

        {/* Other top-level items (flat tap targets) */}
        <div>
          {[
            ['Talks & Events', '→', { kicker: 'New · Paris next week' }],
            ['How we work', '→'],
            ['Insights', '→'],
            ['About', '→'],
            ['Contact', '→'],
          ].map(([label, arrow, extra]) => (
            <div key={label} style={{
              display: 'flex', justifyContent: 'space-between', alignItems: 'center',
              padding: '16px 4px', borderBottom: '1px solid var(--c-line)',
            }}>
              <div>
                <div style={{ fontSize: 16, fontWeight: 500 }}>{label}</div>
                {extra && extra.kicker && (
                  <div style={{ fontSize: 11, color: 'var(--c-accent)', fontWeight: 500, marginTop: 2 }}>{extra.kicker}</div>
                )}
              </div>
              <span style={{ color: 'var(--c-fg-muted)', fontSize: 16 }}>{arrow}</span>
            </div>
          ))}
        </div>

        {/* Method reference */}
        <div style={{
          marginTop: 22, padding: 14, background: 'var(--c-bg-alt)', borderRadius: 10,
          fontSize: 12, color: 'var(--c-fg-muted)', lineHeight: 1.5,
        }}>
          Every engagement starts with our DOTS framework — <span style={{ color: 'var(--c-fg)', fontWeight: 500 }}>Dream, Obstacles, Triage, Sequence</span>. <span style={{ color: 'var(--c-accent)' }}>Read the method →</span>
        </div>
      </div>

      {/* Fixed bottom CTA */}
      <div style={{
        flex: '0 0 auto',
        padding: '14px 18px',
        borderTop: '1px solid var(--c-line)',
        background: 'var(--c-bg)',
      }}>
        <div className="btn btn-primary" style={{ width: '100%', justifyContent: 'center', padding: '12px' }}>Let's talk →</div>
      </div>
    </Board>
  );
}


function MobileNavC() {
  return (
    <Board dir="c" style={{ padding: 0 }}>
      <div style={{
        borderBottom: '2px solid var(--c-fg)',
        padding: '20px 22px', display: 'flex', justifyContent: 'space-between', alignItems: 'baseline',
      }}>
        <span style={{ fontFamily: 'var(--f-display)', fontStyle: 'italic', fontSize: 22 }}>Accelerator X</span>
        <span style={{ fontFamily: 'var(--f-mono)', fontSize: 10, letterSpacing: '0.16em' }}>CLOSE</span>
      </div>
      <div style={{ padding: '24px 22px' }}>
        <div className="eyebrow" style={{ marginBottom: 18 }}>Contents · Issue 04</div>
        {NAV_ITEMS.map((n, i) => (
          <div key={n.label} style={{
            padding: '14px 0', borderBottom: '1px solid var(--c-line)',
            display: 'grid', gridTemplateColumns: '32px 1fr 16px', gap: 14, alignItems: 'baseline',
          }}>
            <span className="folio" style={{ fontSize: 18 }}>{String(i + 1).padStart(2, '0')}</span>
            <span className="h-display" style={{ fontSize: 26 }}>
              {n.mega === 'offerings' ? <em>{n.label}</em> : n.label}
            </span>
            <span style={{ color: 'var(--c-fg-muted)', fontSize: 14 }}>{n.mega ? '›' : '→'}</span>
          </div>
        ))}
        <div style={{ marginTop: 28 }}>
          <div className="btn btn-pink" style={{ width: '100%', justifyContent: 'center', padding: '14px' }}>
            Apply to work with us →
          </div>
        </div>
      </div>
    </Board>
  );
}

function MobileNavD() {
  return (
    <Board dir="d" style={{ padding: 0 }}>
      <div style={{
        borderBottom: '1px solid var(--c-rule)',
        padding: '14px 18px', display: 'flex', justifyContent: 'space-between', alignItems: 'center',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <span style={{ fontFamily: 'var(--f-mono)', fontSize: 12, fontWeight: 600 }}>AX</span>
          <span style={{ fontFamily: 'var(--f-mono)', fontSize: 9, color: 'var(--c-fg-muted)', letterSpacing: '0.08em' }}>INDEX</span>
        </div>
        <span style={{ fontFamily: 'var(--f-mono)', fontSize: 11, letterSpacing: '0.06em' }}>[ × ]</span>
      </div>
      <div style={{ padding: '16px 18px' }}>
        <div style={{ fontFamily: 'var(--f-mono)', fontSize: 10, letterSpacing: '0.12em', color: 'var(--c-fg-muted)', marginBottom: 14 }}>
          TABLE OF CONTENTS
        </div>
        {NAV_ITEMS.map((n, i) => (
          <div key={n.label} style={{
            padding: '13px 0',
            borderTop: '1px solid var(--c-line)',
            display: 'grid', gridTemplateColumns: '52px 1fr 16px', gap: 10, alignItems: 'center',
          }}>
            <span style={{ fontFamily: 'var(--f-mono)', fontSize: 11, color: 'var(--c-fg-muted)', letterSpacing: '0.04em' }}>
              §{String(i + 1).padStart(2, '0')}
            </span>
            <span style={{ fontSize: 14.5, fontWeight: 500 }}>{n.label}</span>
            <span style={{ fontFamily: 'var(--f-mono)', fontSize: 12, color: 'var(--c-fg-muted)' }}>›</span>
          </div>
        ))}
        <div style={{ marginTop: 22, padding: 14, background: 'var(--c-bg-alt)', border: '1px solid var(--c-line)', borderRadius: 4 }}>
          <div style={{ fontFamily: 'var(--f-mono)', fontSize: 10, letterSpacing: '0.1em', color: 'var(--c-fg-muted)', marginBottom: 6 }}>
            QUICK ACTIONS
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            <div style={{ fontFamily: 'var(--f-mono)', fontSize: 11, color: 'var(--c-accent)' }}>→ Apply to work with us</div>
            <div style={{ fontFamily: 'var(--f-mono)', fontSize: 11, color: 'var(--c-accent)' }}>→ AI Readiness Quiz</div>
            <div style={{ fontFamily: 'var(--f-mono)', fontSize: 11, color: 'var(--c-accent)' }}>→ Subscribe (weekly)</div>
          </div>
        </div>
      </div>
    </Board>
  );
}

Object.assign(window, {
  NavA, NavB, NavC, NavD,
  MobileNavA, MobileNavB, MobileNavC, MobileNavD,
});
