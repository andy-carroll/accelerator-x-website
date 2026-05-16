// home.jsx — Homepage wireframes, all 4 directions.
// Each Home is a tall scrollable artboard (~1280 wide × ~3200 tall).

/* ─────────────────────────────────────────────────────────────────────
   SHARED CONTENT (single source of truth for headlines)
   ───────────────────────────────────────────────────────────────────── */
const COPY = {
  kicker: 'Founder-led · Built in the room',
  hero: 'AI transformation for leaders who are done waiting.',
  heroSub: "You know AI matters. You're tired of the hype. You want a partner who'll actually get it done — not an agency that disappears, or a consultancy that leaves you with slides.",
  priceAnchor: 'Most engagements start with a half-day Leadership Activation. From £2,000 + VAT.',
  problemTitle: "You've tried. It hasn't worked.",
  problemBody: [
  "You've heard the pitches. You've probably paid for AI subscriptions your team barely uses. Maybe you hired an agency that built something and vanished. Or a consultancy that left you with a hundred pages of recommendations and no idea where to start.",
  "Meanwhile, your competitors are moving. Your team is overwhelmed. And every month that passes is a month you could have been building real capability.",
  "You don't need another tool. You don't need another deck. You need someone who'll work alongside you until it's actually working."],

  differentiators: [
  { kicker: 'Capability', title: 'We build capability, not dependency.', body: "Train your team. Install systems that work without us. The best outcome is that you outgrow us." },
  { kicker: 'Outcomes', title: 'We deliver results, not recommendations.', body: "No strategy deck and walkaway. We do the work alongside you and don't disappear when the deck is done." },
  { kicker: 'Commitment', title: 'We stay until the job is done.', body: "Some clients run one cycle. Others work with us for a year. We're not trying to lock you in — we're trying to get you where you need to be." }],

  process: [
  { num: '01', title: 'Start with a half-day workshop.', body: "Real discovery, real prioritisation, real roadmap. If it isn't valuable, you don't pay.", price: 'From £2,000' },
  { num: '02', title: 'Move into focused 8-week cycles.', body: "Clear scope, measurable outcomes. Each cycle delivers at least 10× the value of what you invest.", price: 'From £12,000' },
  { num: '03', title: 'We stay as long as it takes.', body: "Some need one cycle. Some need five. We're flexible — but always focused on making you self-sufficient.", price: 'Ongoing advisory available' }],

  testimonials: [
  { quote: "They walked into the room and asked sharper questions than my CTO. By Friday we had a roadmap that survived contact with reality.", who: 'CEO, £45M retail group', role: '8-Week Cycle, Q1 2026' },
  { quote: "We've worked with two of the big four. Accelerator X delivered more in a half-day workshop than either did in eight weeks.", who: 'COO, financial services', role: 'Leadership Activation, Q4 2025' },
  { quote: "What I valued most: they trained my people. I don't need them in the room anymore. That's the point.", who: 'MD, professional services', role: 'Cohort 02' }],

  insights: [
  { kicker: 'Featured · Mar 2026', title: 'The Implementation Gap', sub: 'Why most AI initiatives stall — and what to do about it.' },
  { kicker: 'Framework · Apr 2026', title: 'The 5-Stage Build Sequence', sub: 'How we structure every cycle: discover, prioritise, prototype, ship, embed.' },
  { kicker: 'Dispatch · May 2026', title: 'The end of prompt engineering', sub: "Why prompt-craft was always a transitional skill — and what comes next." },
  { kicker: 'Podcast · Ep 07', title: 'Leadership alignment under uncertainty', sub: 'A conversation with the CFO of a £200M services firm.' }],

  trust: ['Capgemini', 'Premium Car Parks', 'Pegasus Group', 'Capital One', 'WPP', 'NHS']
};

/* ═════════════════════════════════════════════════════════════════════
   DIRECTION A — QUIET AUTHORITY
   Editorial restraint. Serif display, generous whitespace, color as punctuation.
   ═════════════════════════════════════════════════════════════════════ */
function HomeA() {
  return (
    <Board dir="a" scroll>
      {/* Sticky nav */}
      <div style={{ borderBottom: '1px solid var(--c-line)', padding: '18px 40px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: 'var(--c-bg)' }}>
        <AXMark />
        <nav style={{ display: 'flex', gap: 28, fontSize: 13 }}>
          <span style={{ color: 'var(--c-fg-muted)' }}>What we do</span>
          <span style={{ color: 'var(--c-fg-muted)' }}>How we work</span>
          <span style={{ color: 'var(--c-fg-muted)' }}>Insights</span>
          <span style={{ color: 'var(--c-fg-muted)' }}>About</span>
          <span style={{ color: 'var(--c-fg-muted)' }}>Contact</span>
        </nav>
        <span className="btn btn-primary" style={{ fontSize: 11 }}>Start with a workshop →</span>
      </div>

      {/* HERO */}
      <section style={{ padding: '88px 40px 96px' }}>
        <div style={{ maxWidth: 1080, margin: '0 auto' }}>
          <div className="eyebrow">{COPY.kicker}</div>
          <h1 className="h-display" style={{ fontSize: 88, margin: '24px 0 0', maxWidth: 980 }}>
            AI transformation for leaders who are <em style={{ fontStyle: 'italic', color: 'var(--c-accent)' }}>done waiting.</em>
          </h1>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 60, marginTop: 48 }}>
            <p style={{ fontSize: 17, lineHeight: 1.55, color: 'var(--c-fg)', margin: 0 }}>
              {COPY.heroSub}
            </p>
            <div>
              <p style={{ fontSize: 13, lineHeight: 1.6, color: 'var(--c-fg-muted)', margin: 0 }}>
                {COPY.priceAnchor}
              </p>
              <div style={{ marginTop: 24, display: 'flex', gap: 10 }}>
                <span className="btn btn-primary">Apply to work with us</span>
                <span className="btn btn-outline">See what we do</span>
              </div>
            </div>
          </div>

          {/* Hero image — restrained editorial frame */}
          <div style={{ marginTop: 80, position: 'relative' }}>
            <ImgPh tag="Workshop · founders + leadership team" ratio="16/7" style={{ borderRadius: 0 }} />
            <div style={{
              position: 'absolute', left: 20, bottom: 20, background: 'var(--c-bg)',
              padding: '10px 14px', maxWidth: 320
            }}>
              <div className="eyebrow" style={{ marginBottom: 6 }}>Plate 01</div>
              <div style={{ fontFamily: 'var(--f-display)', fontSize: 14, fontStyle: 'italic', color: 'var(--c-fg)' }}>
                A leadership session, not a pitch.
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Trust bar — credential names, not logos */}
      <section style={{ padding: '40px 40px', borderTop: '1px solid var(--c-line)', borderBottom: '1px solid var(--c-line)' }}>
        <div style={{ maxWidth: 1080, margin: '0 auto', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 24 }}>
          <span className="eyebrow">Operators who built at</span>
          <div style={{ display: 'flex', gap: 32, flexWrap: 'wrap', fontFamily: 'var(--f-display)', fontSize: 18, color: 'var(--c-fg)' }}>
            {COPY.trust.map((t) => <span key={t}>{t}</span>)}
          </div>
        </div>
      </section>

      {/* PROBLEM */}
      <section style={{ padding: '120px 40px' }}>
        <div style={{ maxWidth: 1080, margin: '0 auto', display: 'grid', gridTemplateColumns: '1fr 1.4fr', gap: 80 }}>
          <div>
            <div className="eyebrow">§ 01 — The problem</div>
            <h2 className="h-display" style={{ fontSize: 56, margin: '20px 0 0' }}>
              You've tried.<br /><em style={{ color: 'var(--c-accent-2)' }}>It hasn't worked.</em>
            </h2>
          </div>
          <div>
            {COPY.problemBody.map((p, i) =>
            <p key={i} style={{
              fontSize: 16, lineHeight: 1.6, color: 'var(--c-fg)',
              marginTop: i === 0 ? 0 : 18,
              fontWeight: i === 2 ? 500 : 400,
              fontFamily: i === 2 ? 'var(--f-display)' : 'var(--f-body)',
              fontStyle: i === 2 ? 'italic' : 'normal',
              fontSize: i === 2 ? 22 : 16
            }}>{p}</p>
            )}
          </div>
        </div>
      </section>

      {/* DIFFERENTIATORS — three columns separated by hairlines */}
      <section style={{ background: 'var(--c-bg-alt)', padding: '100px 40px' }}>
        <div style={{ maxWidth: 1080, margin: '0 auto' }}>
          <div className="eyebrow">§ 02 — Why us</div>
          <h2 className="h-display" style={{ fontSize: 56, margin: '20px 0 0', maxWidth: 720 }}>
            Not an agency. Not a consultancy. <em style={{ color: 'var(--c-accent)' }}>Your partner.</em>
          </h2>
          <div style={{ marginTop: 60, display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 40 }}>
            {COPY.differentiators.map((d, i) =>
            <div key={d.title} style={{ borderTop: '1px solid var(--c-line-strong, rgba(14,23,38,0.2))', paddingTop: 18 }}>
                <div className="eyebrow" style={{ marginBottom: 14 }}>{String(i + 1).padStart(2, '0')} · {d.kicker}</div>
                <h3 className="h-display" style={{ fontSize: 26, margin: '0 0 14px' }}>{d.title}</h3>
                <p style={{ fontSize: 14, lineHeight: 1.6, color: 'var(--c-fg-muted)', margin: 0 }}>{d.body}</p>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* OFFERINGS preview — index-style list */}
      <section style={{ padding: '100px 40px' }}>
        <div style={{ maxWidth: 1080, margin: '0 auto' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: 60, alignItems: 'start' }}>
            <div>
              <div className="eyebrow">§ 03 — What we do</div>
              <h2 className="h-display" style={{ fontSize: 48, margin: '20px 0 16px' }}>Four ways to work with us.</h2>
              <p style={{ fontSize: 14, color: 'var(--c-fg-muted)', lineHeight: 1.55 }}>
                Pick the depth of commitment. Each engagement starts with the same Activation session.
              </p>
              <div style={{ marginTop: 22 }}>
                <span style={{ fontFamily: 'var(--f-mono)', fontSize: 11, color: 'var(--c-accent)' }}>See offerings in detail →</span>
              </div>
            </div>
            <div>
              {OFFERINGS_MENU.map((o, i) =>
              <div key={o.title} style={{ borderTop: '1px solid var(--c-line)', padding: '22px 0', display: 'grid', gridTemplateColumns: '40px 1fr 120px 24px', gap: 16, alignItems: 'baseline' }}>
                  <span style={{ fontFamily: 'var(--f-mono)', fontSize: 11, color: 'var(--c-fg-muted)' }}>{String(i + 1).padStart(2, '0')}</span>
                  <div>
                    <h3 className="h-display" style={{ fontSize: 22, margin: 0 }}>{o.title}</h3>
                    <p style={{ fontSize: 13, color: 'var(--c-fg-muted)', margin: '4px 0 0' }}>{o.sub}</p>
                  </div>
                  <span style={{ fontFamily: 'var(--f-mono)', fontSize: 11, color: 'var(--c-fg)' }}>{o.tag}</span>
                  <span style={{ color: 'var(--c-fg-muted)', fontSize: 18 }}>→</span>
                </div>
              )}
              <div style={{ borderTop: '1px solid var(--c-line)', height: 1 }} />
            </div>
          </div>
        </div>
      </section>

      {/* PROCESS */}
      <section style={{ background: 'var(--c-fg)', color: 'var(--c-bg)', padding: '120px 40px' }}>
        <div style={{ maxWidth: 1080, margin: '0 auto' }}>
          <div className="eyebrow" style={{ color: 'rgba(255,255,255,0.55)' }}>§ 04 — How it works</div>
          <h2 className="h-display" style={{ fontSize: 64, margin: '20px 0 0', maxWidth: 800 }}>
            From overwhelmed<br />to operational <em style={{ color: 'var(--c-accent)' }}>— in weeks, not quarters.</em>
          </h2>
          <div style={{ marginTop: 80, display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 40 }}>
            {COPY.process.map((p, i) =>
            <div key={p.num} style={{ borderTop: '1px solid rgba(255,255,255,0.25)', paddingTop: 18 }}>
                <div style={{ fontFamily: 'var(--f-mono)', fontSize: 12, letterSpacing: '0.16em', color: 'var(--c-accent)', marginBottom: 14 }}>
                  STEP {p.num}
                </div>
                <h3 className="h-display" style={{ fontSize: 26, margin: '0 0 14px', color: 'var(--c-bg)' }}>{p.title}</h3>
                <p style={{ fontSize: 14, lineHeight: 1.6, color: 'rgba(255,255,255,0.7)', margin: 0 }}>{p.body}</p>
                <div style={{ marginTop: 16, fontSize: 13, fontFamily: 'var(--f-mono)', color: 'rgba(255,255,255,0.85)' }}>{p.price}</div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* TESTIMONIAL — single pull quote */}
      <section style={{ padding: '120px 40px' }}>
        <div style={{ maxWidth: 880, margin: '0 auto', textAlign: 'left' }}>
          <div className="eyebrow">§ 05 — In their own words</div>
          <blockquote style={{
            margin: '32px 0 0',
            fontFamily: 'var(--f-display)',
            fontSize: 44, lineHeight: 1.15, letterSpacing: '-0.02em',
            color: 'var(--c-fg)',
            fontStyle: 'normal'
          }}>
            "{COPY.testimonials[0].quote}"
          </blockquote>
          <div style={{ marginTop: 28, fontSize: 13, color: 'var(--c-fg-muted)', display: 'flex', gap: 16 }}>
            <AvatarPh size={36} />
            <div>
              <div style={{ color: 'var(--c-fg)', fontWeight: 500 }}>{COPY.testimonials[0].who}</div>
              <div style={{ fontSize: 11.5 }}>{COPY.testimonials[0].role}</div>
            </div>
          </div>
        </div>
      </section>

      {/* INSIGHTS */}
      <section style={{ background: 'var(--c-bg-alt)', padding: '100px 40px', borderTop: '1px solid var(--c-line)' }}>
        <div style={{ maxWidth: 1080, margin: '0 auto' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: 40 }}>
            <div>
              <div className="eyebrow">§ 06 — Insights</div>
              <h2 className="h-display" style={{ fontSize: 48, margin: '20px 0 0' }}>From the dispatch.</h2>
            </div>
            <span style={{ fontFamily: 'var(--f-mono)', fontSize: 11, color: 'var(--c-accent)' }}>View archive →</span>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1.4fr 1fr', gap: 40 }}>
            <div>
              <ImgPh tag="Featured article cover" ratio="4/3" />
              <div className="eyebrow" style={{ marginTop: 20 }}>{COPY.insights[0].kicker}</div>
              <h3 className="h-display" style={{ fontSize: 36, margin: '12px 0 10px' }}>{COPY.insights[0].title}</h3>
              <p style={{ fontSize: 14, color: 'var(--c-fg-muted)', lineHeight: 1.55, margin: 0 }}>{COPY.insights[0].sub}</p>
            </div>
            <div>
              {COPY.insights.slice(1).map((art, i) =>
              <div key={art.title} style={{ borderTop: '1px solid var(--c-line)', padding: '20px 0' }}>
                  <div className="eyebrow">{art.kicker}</div>
                  <h4 className="h-display" style={{ fontSize: 22, margin: '8px 0 6px' }}>{art.title}</h4>
                  <p style={{ fontSize: 13, color: 'var(--c-fg-muted)', lineHeight: 1.5, margin: 0 }}>{art.sub}</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* FINAL CTA */}
      <section style={{ padding: '140px 40px', textAlign: 'center' }}>
        <div style={{ maxWidth: 800, margin: '0 auto' }}>
          <div className="eyebrow" style={{ justifyContent: 'center' }}>§ 07 — Apply</div>
          <h2 className="h-display" style={{ fontSize: 72, margin: '24px 0', lineHeight: 0.98 }}>
            If you're done waiting,<br />let's <em style={{ color: 'var(--c-accent)' }}>build.</em>
          </h2>
          <p style={{ fontSize: 15, color: 'var(--c-fg-muted)', lineHeight: 1.55, maxWidth: 540, margin: '0 auto 36px' }}>
            We take 2–3 new engagements per quarter. Most start with a half-day Activation session.
          </p>
          <div style={{ display: 'flex', gap: 12, justifyContent: 'center' }}>
            <span className="btn btn-primary">Apply to work with us</span>
            <span className="btn btn-outline">Take the readiness quiz</span>
          </div>
        </div>
      </section>

      {/* Footer (compact) */}
      <FooterA />
    </Board>);

}

/* ═════════════════════════════════════════════════════════════════════
   DIRECTION B — STUDIO SYSTEM
   Modular panels, sans throughout, color as semantic system, bento grids.
   ═════════════════════════════════════════════════════════════════════ */
function HomeB() {
  return (
    <Board dir="b" scroll>
      {/* Top bar */}
      <div style={{ background: 'rgba(255,255,255,0.92)', borderBottom: '1px solid var(--c-line)', padding: '14px 32px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <AXMark />
        <nav style={{ display: 'flex', gap: 6, background: 'var(--c-bg-alt)', padding: 4, borderRadius: 999, fontSize: 12 }}>
          {['What we do', 'How we work', 'Insights', 'Resources', 'About'].map((l) =>
          <span key={l} style={{ padding: '6px 12px', borderRadius: 999, color: 'var(--c-fg)' }}>{l}</span>
          )}
        </nav>
        <span className="btn btn-primary" style={{ fontSize: 12, padding: '8px 16px' }}>Apply →</span>
      </div>

      {/* HERO */}
      <section style={{ padding: '64px 32px 48px' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto', display: 'grid', gridTemplateColumns: '1.1fr 1fr', gap: 48, alignItems: 'center' }}>
          <div>
            <Chip dot>Now booking · Q3 2026</Chip>
            <h1 className="h-display" style={{ fontSize: 76, margin: '24px 0 0', lineHeight: 0.96 }}>
              Stop buying tools.<br />Start building <span style={{ color: 'var(--c-accent)' }}>capability.</span>
            </h1>
            <p style={{ fontSize: 18, lineHeight: 1.5, color: 'var(--c-fg-muted)', margin: '24px 0 0', maxWidth: 520 }}>We build AI capability that compounds — owned by your people, embedded in your workflows.

            </p>
            <div style={{ marginTop: 32, display: 'flex', gap: 10, alignItems: 'center' }}>
              <span className="btn btn-primary">Apply to work with us</span>
              <span className="btn btn-outline">See offerings</span>
            </div>
            <div style={{ marginTop: 28, display: 'flex', gap: 24, fontSize: 12, color: 'var(--c-fg-muted)' }}>
              <span><strong style={{ color: 'var(--c-fg)' }}>From £2k</strong> · Half-day Activation</span>
              <span><strong style={{ color: 'var(--c-fg)' }}>From £12k</strong> · 8-week cycle</span>
            </div>
          </div>
          <div>
            <ImgPh tag="Hero · workshop scene" ratio="4/5" style={{ borderRadius: 18 }} />
          </div>
        </div>
      </section>

      {/* TRUST BAR */}
      <section style={{ padding: '20px 32px' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto', background: 'var(--c-bg-alt)', borderRadius: 14, padding: '20px 28px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 24 }}>
          <span className="eyebrow">Operators from</span>
          <div style={{ display: 'flex', gap: 28, flexWrap: 'wrap' }}>
            {COPY.trust.map((t) => <span key={t} style={{ fontSize: 13, fontWeight: 500, color: 'var(--c-fg-muted)' }}>{t}</span>)}
          </div>
        </div>
      </section>

      {/* PROBLEM — panel */}
      <section style={{ padding: '64px 32px' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
          <div className="panel-tint" style={{ padding: 48, display: 'grid', gridTemplateColumns: '1fr 1.4fr', gap: 48, alignItems: 'start' }}>
            <div>
              <Chip>The problem</Chip>
              <h2 className="h-display" style={{ fontSize: 48, margin: '20px 0 0', lineHeight: 1 }}>
                You've tried.<br /><span style={{ color: 'var(--c-accent-2)' }}>It hasn't worked.</span>
              </h2>
            </div>
            <div>
              {COPY.problemBody.map((p, i) =>
              <p key={i} style={{
                fontSize: 15, lineHeight: 1.55, margin: i === 0 ? '0 0 14px' : '0 0 14px',
                fontWeight: i === 2 ? 500 : 400,
                color: i === 2 ? 'var(--c-fg)' : 'var(--c-fg-muted)'
              }}>{p}</p>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* DIFFERENTIATORS — 3 panels */}
      <section style={{ padding: '64px 32px' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
          <Chip>Why us</Chip>
          <h2 className="h-display" style={{ fontSize: 56, margin: '20px 0 40px', maxWidth: 720, lineHeight: 1 }}>
            Not an agency. Not a consultancy. <span style={{ color: 'var(--c-accent)' }}>Your partner.</span>
          </h2>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 16 }}>
            {COPY.differentiators.map((d, i) => {
              const accents = ['var(--c-accent)', '#fea700', 'var(--c-accent-2)'];
              return (
                <div key={d.title} className="panel" style={{ padding: 28, display: 'flex', flexDirection: 'column', gap: 14 }}>
                  <div style={{
                    width: 48, height: 48, borderRadius: 10,
                    background: `${accents[i]}14`, color: accents[i],
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontFamily: 'JetBrains Mono, monospace', fontWeight: 600, fontSize: 14
                  }}>{String(i + 1).padStart(2, '0')}</div>
                  <Chip>{d.kicker}</Chip>
                  <h3 className="h-display" style={{ fontSize: 24, margin: 0, lineHeight: 1.1 }}>{d.title}</h3>
                  <p style={{ fontSize: 14, lineHeight: 1.55, color: 'var(--c-fg-muted)', margin: 0 }}>{d.body}</p>
                </div>);

            })}
          </div>
        </div>
      </section>

      {/* OFFERINGS BENTO */}
      <section style={{ padding: '64px 32px', background: 'var(--c-bg-alt)' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: 32 }}>
            <div>
              <Chip>What we do</Chip>
              <h2 className="h-display" style={{ fontSize: 48, margin: '20px 0 0' }}>Four ways to work together.</h2>
            </div>
            <span style={{ fontSize: 13, color: 'var(--c-accent)', fontWeight: 500 }}>See offerings →</span>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1.4fr 1fr 1fr', gap: 14, gridAutoRows: 'auto' }}>
            {/* Featured offering — spans two rows */}
            <div className="panel" style={{ padding: 32, gridRow: 'span 2', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', minHeight: 380 }}>
              <div>
                <Chip dot>{OFFERINGS_MENU[1].kicker} · Most popular</Chip>
                <h3 className="h-display" style={{ fontSize: 36, margin: '20px 0 12px', lineHeight: 1.05 }}>{OFFERINGS_MENU[1].title}</h3>
                <p style={{ fontSize: 14.5, color: 'var(--c-fg-muted)', lineHeight: 1.55, margin: 0 }}>{OFFERINGS_MENU[1].sub}</p>
              </div>
              <div>
                <ImgPh tag="Cycle artefact · roadmap" ratio="16/9" style={{ borderRadius: 10, marginBottom: 16 }} />
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
                  <span style={{ fontSize: 13, color: 'var(--c-fg-muted)' }}>Investment</span>
                  <span style={{ fontSize: 22, fontWeight: 600 }}>{OFFERINGS_MENU[1].tag}</span>
                </div>
              </div>
            </div>
            {OFFERINGS_MENU.filter((_, i) => i !== 1).map((o, idx) =>
            <div key={o.title} className="panel" style={{ padding: 22, display: 'flex', flexDirection: 'column', gap: 10, minHeight: 180 }}>
                <Chip>{o.kicker}</Chip>
                <h3 className="h-display" style={{ fontSize: 22, margin: '6px 0 0', lineHeight: 1.1 }}>{o.title}</h3>
                <p style={{ fontSize: 13, color: 'var(--c-fg-muted)', lineHeight: 1.5, margin: 0, flex: 1 }}>{o.sub}</p>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 6 }}>
                  <span style={{ fontSize: 14, fontWeight: 600 }}>{o.tag}</span>
                  <span style={{ fontSize: 11, color: 'var(--c-fg-muted)' }}>Learn more →</span>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* PROCESS */}
      <section style={{ padding: '80px 32px' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
          <Chip>How it works</Chip>
          <h2 className="h-display" style={{ fontSize: 48, margin: '20px 0 40px' }}>From overwhelmed to operational.</h2>
          <div style={{ position: 'relative', display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 14 }}>
            {COPY.process.map((p, i) =>
            <div key={p.num} className="panel" style={{ padding: 24, position: 'relative' }}>
                <div style={{
                position: 'absolute', top: -16, left: 24,
                width: 32, height: 32, borderRadius: '50%',
                background: 'var(--c-fg)', color: 'var(--c-bg)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontFamily: 'JetBrains Mono, monospace', fontSize: 13, fontWeight: 600
              }}>{p.num}</div>
                <h3 className="h-display" style={{ fontSize: 22, margin: '20px 0 12px', lineHeight: 1.15 }}>{p.title}</h3>
                <p style={{ fontSize: 13.5, lineHeight: 1.55, color: 'var(--c-fg-muted)', margin: '0 0 16px' }}>{p.body}</p>
                <div style={{
                borderTop: '1px solid var(--c-line)', paddingTop: 12,
                display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                fontSize: 12, color: 'var(--c-fg-muted)'
              }}>
                  <span>Investment</span>
                  <strong style={{ color: 'var(--c-fg)' }}>{p.price}</strong>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section style={{ padding: '64px 32px', background: 'var(--c-fg)', color: 'var(--c-bg)' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
          <Chip>Testimonials</Chip>
          <h2 className="h-display" style={{ fontSize: 48, margin: '20px 0 40px', color: 'var(--c-bg)' }}>What our clients say.</h2>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 14 }}>
            {COPY.testimonials.map((t, i) =>
            <div key={t.who} style={{
              background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)',
              padding: 24, borderRadius: 14
            }}>
                <div style={{ fontSize: 13, color: 'var(--c-accent)' }}>★★★★★</div>
                <p style={{ fontSize: 15, lineHeight: 1.55, margin: '16px 0 20px', color: 'rgba(255,255,255,0.92)' }}>"{t.quote}"</p>
                <div style={{ display: 'flex', alignItems: 'center', gap: 12, paddingTop: 16, borderTop: '1px solid rgba(255,255,255,0.08)' }}>
                  <AvatarPh size={32} style={{ background: 'rgba(255,255,255,0.12)' }} />
                  <div>
                    <div style={{ fontSize: 13, fontWeight: 500 }}>{t.who}</div>
                    <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.55)' }}>{t.role}</div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* INSIGHTS */}
      <section style={{ padding: '80px 32px' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: 32 }}>
            <div>
              <Chip>Insights</Chip>
              <h2 className="h-display" style={{ fontSize: 48, margin: '20px 0 0' }}>Field notes from the work.</h2>
            </div>
            <span style={{ fontSize: 13, color: 'var(--c-accent)', fontWeight: 500 }}>Browse all →</span>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 14 }}>
            {COPY.insights.map((art, i) =>
            <div key={art.title} className="panel" style={{ padding: 18, display: 'flex', flexDirection: 'column', gap: 12 }}>
                <ImgPh tag="Cover" ratio="4/3" style={{ borderRadius: 8 }} />
                <Chip style={{ fontSize: 10 }}>{art.kicker}</Chip>
                <h3 className="h-display" style={{ fontSize: 17, margin: 0, lineHeight: 1.2 }}>{art.title}</h3>
                <p style={{ fontSize: 12.5, lineHeight: 1.5, color: 'var(--c-fg-muted)', margin: 0 }}>{art.sub}</p>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* CTA panel */}
      <section style={{ padding: '64px 32px 96px' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
          <div className="panel-tint" style={{ padding: 56, textAlign: 'center', background: 'var(--c-fg)', color: 'var(--c-bg)' }}>
            <Chip style={{ background: 'rgba(255,255,255,0.08)', borderColor: 'rgba(255,255,255,0.15)', color: 'var(--c-bg)' }}>Apply</Chip>
            <h2 className="h-display" style={{ fontSize: 64, margin: '20px auto 12px', color: 'var(--c-bg)', maxWidth: 700, lineHeight: 1 }}>
              If you're done waiting, let's <span style={{ color: 'var(--c-accent)' }}>build.</span>
            </h2>
            <p style={{ fontSize: 14.5, color: 'rgba(255,255,255,0.65)', maxWidth: 480, margin: '0 auto 24px' }}>
              2–3 new engagements per quarter. Most start with a half-day Activation.
            </p>
            <div style={{ display: 'flex', gap: 10, justifyContent: 'center' }}>
              <span className="btn btn-accent">Apply to work with us</span>
              <span style={{
                background: 'transparent', color: 'var(--c-bg)',
                border: '1px solid rgba(255,255,255,0.25)', padding: '10px 18px', borderRadius: 999, fontSize: 12, fontWeight: 500
              }}>Take the readiness quiz</span>
            </div>
          </div>
        </div>
      </section>

      <FooterB />
    </Board>);

}

Object.assign(window, { HomeA, HomeB });