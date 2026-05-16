// offerings-v2.jsx — Rebuilt offerings overview around 3 categories,
// plus Phase 0 detail page, Phase 1+ detail page, and the Talks & Events page.

const CATEGORY_DATA = [
{
  id: 'coaching',
  num: '01',
  kicker: 'Rapid Acceleration Coaching',
  accent: 'var(--c-accent)',
  intro: 'For leaders building AI capability — alongside peers or one-to-one. The fastest way to upskill the people who set the direction.',
  services: [
  {
    title: 'Leadership Cohort',
    sub: 'Quarterly cohort of 8–12 non-competing senior leaders. Workshops, peer accountability, a shared roadmap.',
    duration: '8 weeks',
    format: 'Group · in-person + remote',
    from: 'From £8,000',
    for: 'Senior leaders who learn fastest alongside peers.',
    outputs: ['Personal AI roadmap', 'Peer group for life', 'Live working sessions']
  },
  {
    title: 'Senior Leader Acceleration',
    sub: 'High-touch eight-week sprint for 1–4 leaders from the same team. Bespoke, intensive, results-led.',
    duration: '8 weeks',
    format: '1–4 leaders · 1 team',
    from: 'From £10,000',
    priceNote: '+ £3k per additional leader (max 4)',
    for: 'Exec teams who need their AI capability accelerated together.',
    outputs: ['Custom curriculum', 'Live coaching', 'Applied AI capability']
  },
  {
    title: 'Executive Coaching',
    sub: 'One-to-one or very small group, ongoing. Senior partner-led, working at the rhythm of your business.',
    duration: 'Monthly · ongoing',
    format: '1:1 or 2:1',
    from: 'From £4,000/mo',
    for: 'Founders and execs who want a senior thinking partner.',
    outputs: ['Monthly working sessions', 'Async judgement', 'Long-term thinking partner']
  }]

},
{
  id: 'company',
  num: '02',
  kicker: 'Company Enablement & Activation',
  accent: 'var(--c-fg)',
  featured: true,
  intro: 'For businesses ready to move as an organisation. Always starts with Phase 0 — an extremely low-friction commitment that aligns leadership and activates the team in two weeks.',
  services: [
  {
    title: 'Phase 0',
    sub: 'Two weeks. Three workshops + a roadmap playback. Built around our proprietary DOTS framework. Clients tell us they get more done in two weeks of Phase 0 than in the previous twelve months of internal AI conversations.',
    duration: '2 weeks',
    format: '3 workshops + 1 playback',
    from: 'From £5,000',
    for: 'Businesses serious about AI but unclear where to start.',
    outputs: ['Leadership alignment', 'Team activation', 'Defensible 90-day AI roadmap'],
    highlight: 'Start here',
    featured: true
  },
  {
    title: 'Phase 1+ Transformation Cycles',
    sub: 'Once Phase 0 has produced a roadmap, sequential 8-week cycles deliver against it. Each cycle ships a real capability your team owns. Run as many as the roadmap calls for.',
    duration: '8 weeks · per cycle',
    format: 'Embedded with your team',
    from: 'From £20,000 / cycle',
    for: 'Businesses that have completed Phase 0 and committed to the roadmap.',
    outputs: ['Production-ready AI capability', 'Trained internal operators', 'ROI evidence for the next cycle']
  }]

},
{
  id: 'ongoing',
  num: '03',
  kicker: 'Ongoing Partnership',
  accent: '#fea700',
  intro: 'Senior judgement in the room for as long as you need it. Often sits alongside a transformation programme — or replaces the need for a full-time hire.',
  services: [
  {
    title: 'Fractional AI Advisory',
    sub: "When you don't need a Chief AI Officer but do need senior judgement in the room. We sit on your leadership team a few days a month. Unblock decisions, review work, hire when you're ready.",
    duration: '~2 days/month',
    format: 'Embedded leadership',
    from: 'From £6,000/mo',
    for: 'Founders building capability who need senior cover, not headcount.',
    outputs: ['Monthly leadership session', 'Async review on demand', 'Full-time hire when right']
  }]

}];


const EVENTS_KICKER = {
  id: 'events',
  num: '04',
  kicker: 'Talks, Keynotes & AI Events',
  accent: 'var(--c-accent-2)',
  intro: 'High-impact one-offs for conferences, leadership offsites, and senior partnerships. We design, facilitate, and lead AI experiences that can shift how an entire room thinks about AI in a few hours.'
};

/* ─────────────────────────────────────────────────────────────────────
   DOTS FRAMEWORK BLOCK — reusable across offerings, methodology, home
   ───────────────────────────────────────────────────────────────────── */
/* DOTS FRAMEWORK BLOCK is defined in assets/components/dots-cube.jsx
   and exposed on window.DotsBlock. */

/* ─────────────────────────────────────────────────────────────────────
   NEW OFFERINGS OVERVIEW — three categories + events ribbon
   ───────────────────────────────────────────────────────────────────── */
function OfferingsBv2() {
  return (
    <Board dir="b">
      <PageBNav active="What we do" />
      <PageHero
        breadcrumb={['Home', 'What we do']}
        kicker="One front door · Three lanes of work"
        title="Tools are easy. Skills and systems are where capability lives."
        sub="Most businesses start with Phase 0 — two weeks, from £5,000. Individuals and leadership teams often start with a cohort. From there, the work compounds." />
      

      {/* DOTS framework — the method underneath everything */}
      <section style={{ padding: '48px 32px 24px' }}>
        <div style={{ maxWidth: 1280, margin: '0 auto' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: 20 }}>
            <div>
              <Chip>The method underneath everything</Chip>
              <h2 className="h-display" style={{ fontSize: 36, margin: '14px 0 6px', lineHeight: 1.05 }}>The DOTS framework.</h2>
              <p style={{ fontSize: 14, color: 'var(--c-fg-muted)', margin: 0, maxWidth: 620 }}>
                Every engagement, no matter the format, runs through the same four moves. It's how we move clients from overwhelmed to operational — fast.
              </p>
            </div>
            <span style={{ fontSize: 12.5, color: 'var(--c-accent)', fontWeight: 500 }}>Read the DOTS guide →</span>
          </div>
          <DotsBlock />
        </div>
      </section>

      {/* CATEGORIES */}
      <section style={{ padding: '48px 32px 64px' }}>
        <div style={{ maxWidth: 1280, margin: '0 auto', display: 'flex', flexDirection: 'column', gap: 24 }}>
          {CATEGORY_DATA.map((cat, ci) =>
          <CategoryBlock key={cat.id} cat={cat} />
          )}

          {/* Talks & Events ribbon — links out to dedicated page */}
          <div className="panel" style={{
            padding: 36, background: 'var(--c-fg)', color: 'var(--c-bg)',
            display: 'grid', gridTemplateColumns: '60px 1fr auto', gap: 28, alignItems: 'center'
          }}>
            <div style={{
              width: 56, height: 56, borderRadius: 12,
              background: `${EVENTS_KICKER.accent}30`, color: EVENTS_KICKER.accent,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontFamily: 'JetBrains Mono, monospace', fontSize: 16, fontWeight: 600
            }}>{EVENTS_KICKER.num}</div>
            <div>
              <div style={{ fontSize: 10.5, letterSpacing: '0.14em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.55)', fontWeight: 600, marginBottom: 6 }}>{EVENTS_KICKER.kicker}</div>
              <h3 className="h-display" style={{ fontSize: 28, margin: 0, color: 'var(--c-bg)', lineHeight: 1.1 }}>
                We design and lead AI events that shift a whole room — keynotes, offsites, hackathons.
              </h3>
            </div>
            <span className="btn btn-accent">Explore Talks & Events →</span>
          </div>
        </div>
      </section>

      {/* Decision aid */}
      <section style={{ padding: '64px 32px', background: 'var(--c-bg-alt)' }}>
        <div style={{ maxWidth: 1280, margin: '0 auto', display: 'grid', gridTemplateColumns: '1fr 1.4fr', gap: 60, alignItems: 'center' }}>
          <div>
            <Chip>Help me choose</Chip>
            <h2 className="h-display" style={{ fontSize: 40, margin: '18px 0 14px', lineHeight: 1 }}>
              Not sure where to start?
            </h2>
            <p style={{ fontSize: 14.5, lineHeight: 1.6, color: 'var(--c-fg-muted)', margin: '0 0 20px' }}>
              Most businesses start with Phase 0. Most individual leaders start with a cohort. But the right answer depends on whether you're trying to move yourself, your leadership team, or your whole business.
            </p>
            <div style={{ display: 'flex', gap: 10 }}>
              <span className="btn btn-primary">Take the assessment</span>
              <span className="btn btn-outline">Talk it through (20 min)</span>
            </div>
          </div>
          <div className="panel" style={{ padding: 28, background: 'var(--c-bg)' }}>
            <div className="eyebrow" style={{ marginBottom: 14 }}>Where you are · where to start</div>
            {[
            ['I want to upskill myself', 'Executive Coaching', 'var(--c-accent)'],
            ['I want my leadership team to align on AI', 'Senior Leader Acceleration', 'var(--c-accent)'],
            ['I want to learn alongside peers', 'Leadership Cohort', 'var(--c-accent)'],
            ['My whole business needs to move', 'Phase 0 (then Phase 1+)', 'var(--c-fg)'],
            ['I need senior judgement on tap', 'Fractional AI Advisory', '#fea700'],
            ['I need someone to lead a big AI moment', 'Talks & Events', 'var(--c-accent-2)']].
            map(([q, a, c], i) =>
            <div key={i} style={{
              display: 'grid', gridTemplateColumns: '1fr 24px 1fr', gap: 14,
              padding: '14px 0',
              borderTop: i === 0 ? 'none' : '1px solid var(--c-line)',
              alignItems: 'center'
            }}>
                <span style={{ fontSize: 13, color: 'var(--c-fg-muted)' }}>{q}</span>
                <span style={{ color: c, fontFamily: 'JetBrains Mono, monospace', fontSize: 14, textAlign: 'center' }}>→</span>
                <span style={{ fontSize: 13, fontWeight: 500, color: c }}>{a}</span>
              </div>
            )}
          </div>
        </div>
      </section>

      <FooterB />
    </Board>);

}

function CategoryBlock({ cat }) {
  return (
    <div className="panel" style={{
      padding: 36,
      background: cat.featured ? 'var(--c-bg-alt)' : 'var(--c-bg)',
      border: cat.featured ? `1px solid ${cat.accent}` : '1px solid var(--c-line)'
    }}>
      {/* Header */}
      <div style={{ display: 'grid', gridTemplateColumns: '60px 1fr auto', gap: 24, alignItems: 'flex-start', marginBottom: 24, paddingBottom: 24, borderBottom: '1px solid var(--c-line)' }}>
        <div style={{
          width: 56, height: 56, borderRadius: 12,
          background: `${cat.accent}18`, color: cat.accent,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontFamily: 'JetBrains Mono, monospace', fontSize: 16, fontWeight: 600
        }}>{cat.num}</div>
        <div>
          <div style={{ fontSize: 10.5, letterSpacing: '0.14em', textTransform: 'uppercase', color: 'var(--c-fg-muted)', fontWeight: 600, marginBottom: 8 }}>{cat.kicker}</div>
          <p style={{ fontSize: 16.5, lineHeight: 1.5, color: 'var(--c-fg)', margin: 0, maxWidth: 760, fontWeight: 500 }}>{cat.intro}</p>
        </div>
        <span className="btn btn-outline" style={{ fontSize: 12, padding: '8px 14px', whiteSpace: 'nowrap' }}>See all →</span>
      </div>

      {/* Services */}
      <div style={{ display: 'grid', gridTemplateColumns: cat.services.length === 1 ? '1fr' : `repeat(${cat.services.length}, 1fr)`, gap: 14 }}>
        {cat.services.map((s, i) =>
        <div key={s.title} className="panel" style={{
          padding: 22,
          background: s.featured ? 'var(--c-fg)' : 'var(--c-bg)',
          color: s.featured ? 'var(--c-bg)' : 'var(--c-fg)',
          border: s.featured ? 'none' : '1px solid var(--c-line)',
          display: 'flex', flexDirection: 'column', gap: 12,
          position: 'relative'
        }}>
            {s.highlight &&
          <span style={{
            position: 'absolute', top: -10, right: 18,
            fontSize: 10, fontWeight: 600, letterSpacing: '0.08em',
            padding: '4px 10px', borderRadius: 999, background: cat.accent, color: '#fff',
            textTransform: 'uppercase'
          }}>{s.highlight}</span>
          }
            <div style={{
            display: 'flex', justifyContent: 'space-between', alignItems: 'baseline',
            paddingBottom: 8, borderBottom: `1px solid ${s.featured ? 'rgba(255,255,255,0.12)' : 'var(--c-line)'}`
          }}>
              <h3 className="h-display" style={{ fontSize: 22, margin: 0, color: s.featured ? 'var(--c-bg)' : 'var(--c-fg)', letterSpacing: '-0.02em' }}>{s.title}</h3>
              <span style={{ fontSize: 13, fontWeight: 600 }}>{s.from}</span>
            </div>
            <p style={{ fontSize: 13, lineHeight: 1.55, color: s.featured ? 'rgba(255,255,255,0.78)' : 'var(--c-fg-muted)', margin: 0 }}>{s.sub}</p>
            <div style={{ display: 'flex', gap: 14, fontSize: 11.5, color: s.featured ? 'rgba(255,255,255,0.55)' : 'var(--c-fg-muted)', marginTop: 4 }}>
              <span><strong style={{ color: s.featured ? 'var(--c-bg)' : 'var(--c-fg)', fontWeight: 600 }}>{s.duration}</strong></span>
              <span>·</span>
              <span>{s.format}</span>
            </div>
            <div style={{ marginTop: 'auto', paddingTop: 12, borderTop: `1px solid ${s.featured ? 'rgba(255,255,255,0.12)' : 'var(--c-line)'}` }}>
              <div style={{ fontSize: 10, letterSpacing: '0.12em', textTransform: 'uppercase', color: s.featured ? 'rgba(255,255,255,0.55)' : 'var(--c-fg-muted)', fontWeight: 600, marginBottom: 8 }}>Outputs</div>
              {s.outputs.map((o) =>
            <div key={o} style={{ display: 'flex', gap: 8, padding: '3px 0', fontSize: 12, lineHeight: 1.4 }}>
                  <span style={{ color: cat.accent, fontFamily: 'JetBrains Mono, monospace', fontSize: 11 }}>—</span>
                  <span>{o}</span>
                </div>
            )}
            </div>
            <div style={{ marginTop: 6, fontSize: 11.5, color: s.featured ? 'rgba(255,255,255,0.55)' : 'var(--c-fg-muted)', fontStyle: 'italic' }}>
              Right for: {s.for}
            </div>
            <div style={{ marginTop: 4 }}>
              <span className={`btn ${s.featured ? 'btn-accent' : 'btn-outline'}`} style={{ fontSize: 11.5, padding: '7px 14px' }}>Learn more →</span>
            </div>
          </div>
        )}
      </div>
    </div>);

}

/* ─────────────────────────────────────────────────────────────────────
   PHASE 0 DETAIL — 2-week visualisation
   ───────────────────────────────────────────────────────────────────── */
function Phase0DetailB() {
  return (
    <Board dir="b">
      <PageBNav active="What we do" />

      {/* Hero */}
      <section style={{ padding: '40px 32px 32px', borderBottom: '1px solid var(--c-line)' }}>
        <div style={{ maxWidth: 1280, margin: '0 auto' }}>
          <div style={{ fontSize: 11.5, color: 'var(--c-fg-muted)', marginBottom: 18, display: 'flex', gap: 8 }}>
            <span style={{ opacity: 0.65 }}>What we do</span><span style={{ opacity: 0.4 }}>/</span>
            <span style={{ opacity: 0.65 }}>Company Enablement</span><span style={{ opacity: 0.4 }}>/</span>
            <span>Phase 0</span>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1.4fr 1fr', gap: 60, alignItems: 'start' }}>
            <div>
              <div style={{ display: 'flex', gap: 8, marginBottom: 18 }}>
                <Chip>Company entry point</Chip>
                <Chip dot>Built around DOTS</Chip>
              </div>
              <h1 className="h-display" style={{ fontSize: 72, margin: '0 0 20px', lineHeight: 0.95 }}>
                Phase 0.<br />
                <span style={{ color: 'var(--c-accent)' }}>Two weeks to clarity.</span>
              </h1>
              <p style={{ fontSize: 19, lineHeight: 1.45, color: 'var(--c-fg)', margin: '0 0 16px', fontWeight: 500 }}>
                Three workshops. One roadmap playback. Leadership aligned, team activated, and a defensible 90-day plan — sign-off in an afternoon.
              </p>
              <p style={{ fontSize: 14.5, lineHeight: 1.6, color: 'var(--c-fg-muted)', margin: 0, maxWidth: 620 }}>
                Phase 0 is the most leveraged two weeks we run. Clients tell us they get more done in this fortnight than in the previous twelve months of internal AI conversations, pilots, and slide decks. It's how every company engagement starts — by design.
              </p>
            </div>
            <div className="panel" style={{ padding: 24, background: 'var(--c-bg-alt)' }}>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 18 }}>
                <div>
                  <div className="eyebrow" style={{ fontSize: 9.5, marginBottom: 6 }}>Investment</div>
                  <div style={{ fontSize: 26, fontWeight: 600 }}>£5,000+</div>
                  <div style={{ fontSize: 11, color: 'var(--c-fg-muted)' }}>varies by team size, travel, scope</div>
                </div>
                <div>
                  <div className="eyebrow" style={{ fontSize: 9.5, marginBottom: 6 }}>Duration</div>
                  <div style={{ fontSize: 26, fontWeight: 600 }}>2 weeks</div>
                  <div style={{ fontSize: 11, color: 'var(--c-fg-muted)' }}>typically</div>
                </div>
              </div>
              <div className="btn btn-primary" style={{ width: '100%', justifyContent: 'center', marginBottom: 8 }}>Book a Phase 0 →</div>
              <div className="btn btn-outline" style={{ width: '100%', justifyContent: 'center' }}>Talk it through (20 min)</div>
              <div style={{ marginTop: 14, padding: '10px 12px', background: 'var(--c-bg)', borderRadius: 6, fontSize: 11.5, color: 'var(--c-fg-muted)', lineHeight: 1.5 }}>
                <strong style={{ color: 'var(--c-fg)' }}>Low-risk commitment:</strong> sign-off in an afternoon, delivered inside a fortnight, leaves with a costed roadmap whether you continue with us or not.
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* THE 2-WEEK VISUALISATION */}
      <section style={{ padding: '64px 32px' }}>
        <div style={{ maxWidth: 1280, margin: '0 auto' }}>
          <Chip>The plan</Chip>
          <h2 className="h-display" style={{ fontSize: 48, margin: '20px 0 8px' }}>Two weeks. Four moves.</h2>
          <p style={{ fontSize: 15, color: 'var(--c-fg-muted)', maxWidth: 700, margin: '0 0 40px' }}>
            Each session compounds on the one before. By the end of week 2, leadership is aligned, the team has hands-on AI capability, and you have a roadmap your CFO can defend.
          </p>

          <div style={{
            display: 'grid', gridTemplateColumns: '1fr 1fr 1fr 1fr', gap: 12,
            position: 'relative'
          }}>
            {/* Phase bars above */}
            <div style={{ gridColumn: 'span 2', background: 'rgba(8,138,191,0.12)', color: 'var(--c-accent)', borderRadius: 6, padding: '6px 14px', fontSize: 11, fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: 12, display: 'flex', justifyContent: 'space-between' }}>
              <span>Week 1 · Align</span>
              <span style={{ opacity: 0.7 }}>PURPOSE & FOUNDATIONS</span>
            </div>
            <div style={{ gridColumn: 'span 2', background: 'rgba(233,63,142,0.12)', color: 'var(--c-accent-2)', borderRadius: 6, padding: '6px 14px', fontSize: 11, fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: 12, display: 'flex', justifyContent: 'space-between' }}>
              <span>Week 2 · Activate</span>
              <span style={{ opacity: 0.7 }}>CLARITY & MOMENTUM</span>
            </div>

            {[
            {
              w: '01', dur: '2.5 hrs',
              accent: 'var(--c-accent)',
              title: 'Exec team DOTS',
              body: 'Leadership team in the room. Run the full DOTS sequence on the highest-leverage opportunities. Leave with shared language and a shortlist.',
              outputs: ['Dream-state defined', 'Top 5 obstacles named', 'Initial triage']
            },
            {
              w: '02', dur: '2.5 hrs',
              accent: 'var(--c-accent)',
              title: 'Full team activation',
              body: "The wider team gets hands-on with Claude's core capabilities. Practical exercises tied to real workflows. Builds momentum and confidence in days, not quarters.",
              outputs: ['Team upskilled on Claude', 'Real-work prompts created', 'AI champions identified']
            },
            {
              w: '03', dur: '2.5 hrs',
              accent: 'var(--c-accent-2)',
              title: 'Function-specific DOTS',
              body: 'Deeper DOTS session with the functions or teams that will lead Phase 1. Analyse specific use cases, define success metrics, build the case for the first build cycle.',
              outputs: ['Use cases evaluated', 'Success metrics agreed', 'Phase 1 candidates selected']
            },
            {
              w: '04', dur: '1 hr',
              accent: 'var(--c-accent-2)',
              title: 'AI strategy playback',
              body: 'Co-created session with the leadership team. We present the integrated DOTS output as a business-outcomes-led AI roadmap. Sign-off on Phase 1.',
              outputs: ['90-day roadmap', 'Phase 1 scope agreed', 'Costed plan you can defend']
            }].
            map((s) =>
            <div key={s.w} className="panel" style={{ padding: 20, display: 'flex', flexDirection: 'column', gap: 12, background: 'var(--c-bg)' }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', paddingBottom: 12, borderBottom: `1px solid var(--c-line)` }}>
                  <span style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: 11, color: s.accent, fontWeight: 600 }}>SESSION {s.w}</span>
                  <span style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: 10.5, color: 'var(--c-fg-muted)' }}>{s.dur}</span>
                </div>
                <h3 className="h-display" style={{ fontSize: 22, margin: 0, letterSpacing: '-0.02em', lineHeight: 1.1 }}>{s.title}</h3>
                <p style={{ fontSize: 12.5, color: 'var(--c-fg-muted)', lineHeight: 1.55, margin: 0, flex: 1 }}>{s.body}</p>
                <div style={{ marginTop: 'auto', paddingTop: 12, borderTop: `1px solid var(--c-line)` }}>
                  <div style={{ fontSize: 9.5, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--c-fg-muted)', fontWeight: 600, marginBottom: 6 }}>Outputs</div>
                  {s.outputs.map((o) =>
                <div key={o} style={{ display: 'flex', gap: 6, padding: '2px 0', fontSize: 11.5 }}>
                      <span style={{ color: s.accent, fontFamily: 'JetBrains Mono, monospace' }}>—</span>
                      <span>{o}</span>
                    </div>
                )}
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Phase 0 → Phase 1+ transition */}
      <section style={{ padding: '40px 32px 64px', background: 'var(--c-bg-alt)' }}>
        <div style={{ maxWidth: 1280, margin: '0 auto' }}>
          <Chip>What comes next</Chip>
          <h2 className="h-display" style={{ fontSize: 40, margin: '18px 0 28px', lineHeight: 1, maxWidth: 720 }}>Phase 0 hands you a costed roadmap. Phase 1+ ships it.</h2>

          {/* Horizontal phase journey */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: '0.7fr 0.1fr 1fr 0.1fr 1fr 0.1fr 0.4fr',
            gap: 10, alignItems: 'stretch'
          }}>
            <div className="panel" style={{ padding: 18, background: 'var(--c-bg)' }}>
              <div style={{ fontSize: 10, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--c-accent)', fontWeight: 600 }}>Phase 0</div>
              <div style={{ fontSize: 14, fontWeight: 600, marginTop: 6 }}>2 weeks · from £5k</div>
              <div style={{ fontSize: 11.5, color: 'var(--c-fg-muted)', marginTop: 4 }}>Align + activate + roadmap</div>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 18, color: 'var(--c-fg-muted)' }}>→</div>
            <div className="panel" style={{ padding: 18, background: 'var(--c-bg)' }}>
              <div style={{ fontSize: 10, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--c-fg)', fontWeight: 600 }}>Phase 1</div>
              <div style={{ fontSize: 14, fontWeight: 600, marginTop: 6 }}>8-week cycle · from £30k</div>
              <div style={{ fontSize: 11.5, color: 'var(--c-fg-muted)', marginTop: 4 }}>Ship first capability + train team</div>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 18, color: 'var(--c-fg-muted)' }}>→</div>
            <div className="panel" style={{ padding: 18, background: 'var(--c-bg)' }}>
              <div style={{ fontSize: 10, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--c-fg)', fontWeight: 600 }}>Phase 2…n</div>
              <div style={{ fontSize: 14, fontWeight: 600, marginTop: 6 }}>Sequential 8-week cycles</div>
              <div style={{ fontSize: 11.5, color: 'var(--c-fg-muted)', marginTop: 4 }}>Each builds on the last</div>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 18, color: 'var(--c-fg-muted)' }}>→</div>
            <div className="panel" style={{ padding: 18, background: 'rgba(254,167,0,0.10)', border: '1px solid #fea700' }}>
              <div style={{ fontSize: 10, letterSpacing: '0.12em', textTransform: 'uppercase', color: '#a36e00', fontWeight: 600 }}>Advisory</div>
              <div style={{ fontSize: 14, fontWeight: 600, marginTop: 6 }}>Ongoing</div>
              <div style={{ fontSize: 11.5, color: 'var(--c-fg-muted)', marginTop: 4 }}>When you're self-sufficient</div>
            </div>
          </div>
        </div>
      </section>

      {/* DOTS in detail */}
      <section style={{ padding: '64px 32px' }}>
        <div style={{ maxWidth: 1280, margin: '0 auto' }}>
          <Chip>The method underneath every session</Chip>
          <h2 className="h-display" style={{ fontSize: 40, margin: '18px 0 28px', lineHeight: 1 }}>DOTS — Dream · Obstacles · Triage · Sequence.</h2>
          <DotsBlock />
        </div>
      </section>

      {/* Outcome / proof */}
      <section style={{ padding: '64px 32px', background: 'var(--c-fg)', color: 'var(--c-bg)' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto', textAlign: 'center' }}>
          <Chip style={{ background: 'rgba(255,255,255,0.08)', borderColor: 'rgba(255,255,255,0.15)', color: 'var(--c-bg)' }}>Why this works</Chip>
          <h2 className="h-display" style={{
            fontSize: 56, margin: '20px auto 14px', color: 'var(--c-bg)', maxWidth: 820, lineHeight: 1
          }}>
            "More done in two weeks than the previous <span style={{ color: 'var(--c-accent)' }}>twelve months</span> of internal AI conversations."
          </h2>
          <p style={{ fontSize: 14.5, color: 'rgba(255,255,255,0.65)', maxWidth: 540, margin: '0 auto' }}>
            Direct feedback from a £45M client at the end of week 2. We hear variants of this from almost every Phase 0 we run.
          </p>
        </div>
      </section>

      {/* FAQ */}
      <section style={{ padding: '64px 32px' }}>
        <div style={{ maxWidth: 900, margin: '0 auto' }}>
          <Chip>Common questions</Chip>
          <h2 className="h-display" style={{ fontSize: 36, margin: '18px 0 28px' }}>The questions Phase 0 clients ask first.</h2>
          {[
          ['Do we have to commit to Phase 1 before Phase 0?', 'No. Phase 0 is designed as a standalone commitment. You leave with a roadmap you own — whether you continue with us, run Phase 1 internally, or hire someone else to.'],
          ['How firm is the £5,000 price?', 'It\u2019s the floor. Final price varies by company size, travel costs, session duration, and how much pre-work we do. Most Phase 0s land between £5k and £9k.'],
          ['Who needs to be in the room?', 'Exec DOTS: your leadership team (5–10 people). Team activation: the wider function or department that will run with the work (10–40 people). Function-specific DOTS: 4–8 from one function. Playback: leadership team only.'],
          ['Can we run this remotely?', 'Yes — but we strongly recommend Session 1 in person. The rest can be hybrid. Pure remote works if geography demands it.'],
          ['What if Phase 0 doesn\u2019t feel right?', 'Then you don\u2019t pay for the rest. We mean it. We\u2019ve refunded once in 18 months.']].
          map(([q, a], i) =>
          <div key={i} style={{ padding: '18px 0', borderBottom: '1px solid var(--c-line)' }}>
              <div style={{ display: 'flex', gap: 14, alignItems: 'baseline' }}>
                <span style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: 11, color: 'var(--c-fg-muted)' }}>Q{String(i + 1).padStart(2, '0')}</span>
                <div style={{ flex: 1 }}>
                  <h3 style={{ fontSize: 16, fontWeight: 600, margin: '0 0 8px' }}>{q}</h3>
                  <p style={{ fontSize: 13.5, color: 'var(--c-fg-muted)', lineHeight: 1.6, margin: 0 }}>{a}</p>
                </div>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* CTA */}
      <section style={{ padding: '64px 32px 80px' }}>
        <div style={{ maxWidth: 1280, margin: '0 auto' }}>
          <div className="panel" style={{ padding: 56, textAlign: 'center', background: 'var(--c-fg)', color: 'var(--c-bg)' }}>
            <Chip style={{ background: 'rgba(255,255,255,0.08)', borderColor: 'rgba(255,255,255,0.15)', color: 'var(--c-bg)' }}>Apply</Chip>
            <h2 className="h-display" style={{ fontSize: 56, margin: '20px auto 14px', color: 'var(--c-bg)', maxWidth: 700, lineHeight: 1 }}>
              Sign off in an afternoon. Start in a week.
            </h2>
            <p style={{ fontSize: 14.5, color: 'rgba(255,255,255,0.65)', maxWidth: 480, margin: '0 auto 24px' }}>
              Tell us where you are. We'll come back within a week with a proposed Phase 0 scope.
            </p>
            <div style={{ display: 'flex', gap: 10, justifyContent: 'center' }}>
              <span className="btn btn-accent">Book a Phase 0</span>
              <span style={{
                background: 'transparent', color: 'var(--c-bg)',
                border: '1px solid rgba(255,255,255,0.25)', padding: '10px 18px', borderRadius: 999, fontSize: 12, fontWeight: 500
              }}>Talk it through (20 min)</span>
            </div>
          </div>
        </div>
      </section>

      <FooterB />
    </Board>);

}

Object.assign(window, { OfferingsBv2, Phase0DetailB });