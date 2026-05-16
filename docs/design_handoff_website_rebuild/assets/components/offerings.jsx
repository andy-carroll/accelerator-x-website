// offerings.jsx — Direction B: Offerings overview + 8-Week detail.
// Other directions kept as ComingSoon placeholders for completeness.

const OFFERINGS_FULL = [
{
  id: 'activation', kicker: 'Foundation', accent: 'var(--c-accent)',
  title: 'Leadership Activation',
  pitch: 'Half-day workshop. Find the moves that matter.',
  duration: 'Half-day', size: '5–12 leaders', from: '£2,000', cadence: 'One-off',
  body: "We sit with your leadership team for half a day. No slides-and-leave. Real discovery, real prioritisation, real first move. You leave with clarity on where to focus and what to do this quarter.",
  deliverables: ['Live discovery session', 'Prioritised opportunity map', '30-day next-move plan', 'Risk-free: if not valuable, you don\u2019t pay'],
  for: 'Leadership teams that need to stop debating and start moving.'
},
{
  id: 'cycle', kicker: 'Core', accent: '#0e1726', featured: true,
  title: '8-Week Transformation Cycle',
  pitch: 'Focused sprint with measurable outcomes.',
  duration: '8 weeks', size: 'Cross-functional team', from: '£12,000', cadence: 'Sequential',
  body: "An eight-week sprint with clear scope and measurable outcomes. We embed alongside your team, build capability while we ship, and deliver at least 10\u00d7 the value of what you invest \u2014 cost savings, efficiency, revenue, or capability you didn't have before.",
  deliverables: ['Weekly working sessions, in-person + remote', 'Shippable AI capability by week 8', 'Trained internal team (no dependency)', 'Roadmap for what comes next'],
  for: 'Teams ready to ship something real, not produce another report.'
},
{
  id: 'cohort', kicker: 'Cohort', accent: 'var(--c-accent-2)',
  title: 'Leadership Cohort',
  pitch: 'Quarterly cohort of non-competing leaders.',
  duration: '12 weeks', size: '8\u201312 leaders', from: '£8,000', cadence: 'Quarterly',
  body: "A small, hand-picked group of non-competing leaders meeting over twelve weeks. Hands-on workshops, peer accountability, and a shared roadmap. The most cost-effective way to upskill your top team alongside peers.",
  deliverables: ['Six in-person sessions', 'Curated peer group', 'Personal AI roadmap', 'Continued alumni access'],
  for: 'CEOs, COOs and CTOs who learn fastest with peers.'
},
{
  id: 'fractional', kicker: 'Ongoing', accent: '#fea700',
  title: 'Fractional AI Advisory',
  pitch: 'Senior operator inside your business.',
  duration: 'Monthly', size: '\u20132 days/mo', from: '£6,000/mo', cadence: 'Rolling',
  body: "When you don't need a Chief AI Officer but do need senior judgement in the room \u2014 we sit on your leadership team a few days a month. We unblock decisions, review work, hire when you're ready.",
  deliverables: ['Monthly leadership session', 'Async review of work in flight', 'On-demand judgement (Slack/email)', 'Hire & onboard your full-time lead'],
  for: 'Founders building capability who need senior cover, not headcount.'
}];


function OfferingsB() {
  return (
    <Board dir="b">
      <PageBNav active="What we do" />
      <PageHero
        breadcrumb={['Home', 'What we do']}
        kicker="Four offerings · One way to start"
        title="Pick the depth of commitment."
        sub="Every engagement starts with a half-day Leadership Activation. From there, we shape the work around what you actually need — not a fixed product." />
      

      {/* Comparison table — fast scannable */}
      <section style={{ padding: '40px 32px 24px' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
          <div style={{
            display: 'grid', gridTemplateColumns: '1.8fr repeat(4, 1fr) 80px',
            background: 'var(--c-bg-alt)', borderRadius: 14, overflow: 'hidden',
            border: '1px solid var(--c-line)'
          }}>
            {/* Header row */}
            <div style={{ padding: '14px 18px', borderBottom: '1px solid var(--c-line)', fontSize: 11, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--c-fg-muted)', fontWeight: 600 }}>Offering</div>
            {['Duration', 'Format', 'From', 'Cadence', ''].map((h) =>
            <div key={h} style={{ padding: '14px 14px', borderBottom: '1px solid var(--c-line)', fontSize: 11, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--c-fg-muted)', fontWeight: 600, textAlign: h === '' ? 'right' : 'left' }}>{h}</div>
            )}
            {OFFERINGS_FULL.map((o, i) =>
            <React.Fragment key={o.id}>
                <div style={{ padding: '18px', borderBottom: i < OFFERINGS_FULL.length - 1 ? '1px solid var(--c-line)' : 'none', background: o.featured ? 'var(--c-bg)' : 'transparent', display: 'flex', alignItems: 'center', gap: 12 }}>
                  <div style={{
                  width: 30, height: 30, borderRadius: 7, background: `${o.accent}18`,
                  color: o.accent, display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontFamily: 'JetBrains Mono, monospace', fontSize: 11, fontWeight: 600, flexShrink: 0
                }}>{String(i + 1).padStart(2, '0')}</div>
                  <div>
                    <div style={{ fontSize: 14, fontWeight: 500 }}>{o.title}{o.featured && <span style={{ marginLeft: 8, fontSize: 10, padding: '2px 6px', background: 'var(--c-fg)', color: 'var(--c-bg)', borderRadius: 4, letterSpacing: '0.04em' }}>POPULAR</span>}</div>
                    <div style={{ fontSize: 11.5, color: 'var(--c-fg-muted)', marginTop: 2 }}>{o.kicker}</div>
                  </div>
                </div>
                {[o.duration, o.size, o.from, o.cadence].map((v, j) =>
              <div key={j} style={{ padding: '18px 14px', borderBottom: i < OFFERINGS_FULL.length - 1 ? '1px solid var(--c-line)' : 'none', fontSize: 13, color: 'var(--c-fg)', display: 'flex', alignItems: 'center', background: o.featured ? 'var(--c-bg)' : 'transparent' }}>{v}</div>
              )}
                <div style={{ padding: '18px 18px 18px 14px', borderBottom: i < OFFERINGS_FULL.length - 1 ? '1px solid var(--c-line)' : 'none', textAlign: 'right', fontSize: 12, color: 'var(--c-accent)', display: 'flex', alignItems: 'center', justifyContent: 'flex-end', background: o.featured ? 'var(--c-bg)' : 'transparent' }}>Details →</div>
              </React.Fragment>
            )}
          </div>
        </div>
      </section>

      {/* Individual offering cards — full detail */}
      <section style={{ padding: '40px 32px 64px' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto', display: 'flex', flexDirection: 'column', gap: 14 }}>
          {OFFERINGS_FULL.map((o, i) =>
          <div key={o.id} className="panel" style={{
            padding: 36,
            background: o.featured ? 'var(--c-fg)' : 'var(--c-bg)',
            color: o.featured ? 'var(--c-bg)' : 'var(--c-fg)',
            border: o.featured ? 'none' : '1px solid var(--c-line)',
            display: 'grid', gridTemplateColumns: '1.4fr 1fr', gap: 48, alignItems: 'start'
          }}>
              <div>
                <div style={{ display: 'flex', gap: 14, alignItems: 'center', marginBottom: 16 }}>
                  <div style={{
                  width: 44, height: 44, borderRadius: 10,
                  background: o.featured ? 'rgba(255,255,255,0.1)' : `${o.accent}18`,
                  color: o.featured ? 'var(--c-bg)' : o.accent,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontFamily: 'JetBrains Mono, monospace', fontSize: 13, fontWeight: 600
                }}>{String(i + 1).padStart(2, '0')}</div>
                  <div>
                    <div style={{ fontSize: 10.5, letterSpacing: '0.14em', textTransform: 'uppercase', color: o.featured ? 'rgba(255,255,255,0.55)' : 'var(--c-fg-muted)', fontWeight: 600 }}>{o.kicker}{o.featured && ' · Most popular'}</div>
                  </div>
                </div>
                <h2 className="h-display" style={{ fontSize: 40, margin: '0 0 8px', color: o.featured ? 'var(--c-bg)' : 'var(--c-fg)', lineHeight: 1 }}>{o.title}</h2>
                <p style={{ fontSize: 16, margin: '0 0 20px', color: o.featured ? 'rgba(255,255,255,0.85)' : 'var(--c-fg)', fontWeight: 500 }}>{o.pitch}</p>
                <p style={{ fontSize: 14.5, lineHeight: 1.6, color: o.featured ? 'rgba(255,255,255,0.7)' : 'var(--c-fg-muted)', margin: '0 0 24px' }}>{o.body}</p>
                <div style={{
                display: 'flex', gap: 16, alignItems: 'center',
                paddingTop: 20, borderTop: `1px solid ${o.featured ? 'rgba(255,255,255,0.15)' : 'var(--c-line)'}`
              }}>
                  <span className={`btn ${o.featured ? 'btn-accent' : 'btn-primary'}`}>
                    {o.id === 'activation' ? 'Book a session' : 'Apply →'}
                  </span>
                  <span style={{ fontSize: 12, color: o.featured ? 'rgba(255,255,255,0.6)' : 'var(--c-fg-muted)' }}>or see how it fits the 8-week cycle →</span>
                </div>
              </div>

              <div>
                {/* Investment block */}
                <div style={{
                background: o.featured ? 'rgba(255,255,255,0.06)' : 'var(--c-bg-alt)',
                borderRadius: 10, padding: 18, marginBottom: 20,
                display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14
              }}>
                  <div>
                    <div style={{ fontSize: 10, letterSpacing: '0.12em', textTransform: 'uppercase', color: o.featured ? 'rgba(255,255,255,0.5)' : 'var(--c-fg-muted)', fontWeight: 600, marginBottom: 6 }}>Investment</div>
                    <div style={{ fontSize: 22, fontWeight: 600 }}>{o.from}</div>
                    <div style={{ fontSize: 11, color: o.featured ? 'rgba(255,255,255,0.5)' : 'var(--c-fg-muted)', marginTop: 2 }}>from · + VAT</div>
                  </div>
                  <div>
                    <div style={{ fontSize: 10, letterSpacing: '0.12em', textTransform: 'uppercase', color: o.featured ? 'rgba(255,255,255,0.5)' : 'var(--c-fg-muted)', fontWeight: 600, marginBottom: 6 }}>Duration</div>
                    <div style={{ fontSize: 22, fontWeight: 600 }}>{o.duration}</div>
                    <div style={{ fontSize: 11, color: o.featured ? 'rgba(255,255,255,0.5)' : 'var(--c-fg-muted)', marginTop: 2 }}>{o.cadence}</div>
                  </div>
                </div>

                {/* Deliverables */}
                <div style={{ fontSize: 10, letterSpacing: '0.12em', textTransform: 'uppercase', color: o.featured ? 'rgba(255,255,255,0.55)' : 'var(--c-fg-muted)', fontWeight: 600, marginBottom: 10 }}>
                  What's included
                </div>
                {o.deliverables.map((d, j) =>
              <div key={j} style={{
                display: 'flex', gap: 10, padding: '8px 0',
                borderBottom: j < o.deliverables.length - 1 ? `1px solid ${o.featured ? 'rgba(255,255,255,0.08)' : 'var(--c-line)'}` : 'none',
                fontSize: 13, lineHeight: 1.45
              }}>
                    <span style={{ color: o.accent, fontFamily: 'JetBrains Mono, monospace', fontSize: 11, flexShrink: 0, marginTop: 2 }}>—</span>
                    <span>{d}</span>
                  </div>
              )}

                <div style={{
                marginTop: 16, padding: '12px 14px',
                background: o.featured ? 'rgba(255,255,255,0.05)' : 'var(--c-bg-alt)',
                borderRadius: 8, fontSize: 12.5, lineHeight: 1.5,
                color: o.featured ? 'rgba(255,255,255,0.7)' : 'var(--c-fg-muted)'
              }}>
                  <strong style={{ color: o.featured ? 'var(--c-bg)' : 'var(--c-fg)', fontWeight: 600 }}>Right for: </strong>{o.for}
                </div>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Decision aid */}
      <section style={{ padding: '64px 32px', background: 'var(--c-bg-alt)' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto', display: 'grid', gridTemplateColumns: '1fr 1.4fr', gap: 60, alignItems: 'center' }}>
          <div>
            <Chip>Help me choose</Chip>
            <h2 className="h-display" style={{ fontSize: 48, margin: '20px 0 16px', lineHeight: 1 }}>
              Not sure which fits?
            </h2>
            <p style={{ fontSize: 15, lineHeight: 1.55, color: 'var(--c-fg-muted)', margin: '0 0 24px' }}>
              Take the 4-minute AI Readiness assessment. We'll tell you where you are, what's blocking you, and which offering matches — including "none of the above."
            </p>
            <div style={{ display: 'flex', gap: 10 }}>
              <span className="btn btn-primary">Take the assessment</span>
              <span className="btn btn-outline">Book a 20-min call</span>
            </div>
          </div>
          <div className="panel" style={{ padding: 28, background: 'var(--c-bg)' }}>
            <div className="eyebrow" style={{ marginBottom: 14 }}>Decision tree</div>
            {[
            ['Need clarity on where to start?', 'Leadership Activation', 'var(--c-accent)'],
            ['Have a specific outcome to ship?', '8-Week Transformation Cycle', 'var(--c-fg)'],
            ['Want to build alongside peers?', 'Leadership Cohort', 'var(--c-accent-2)'],
            ['Need senior judgement in the room?', 'Fractional AI Advisory', '#fea700']].
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

/* ─────────────────────────────────────────────────────────────────────
   OFFERING DETAIL — 8-Week Transformation Cycle (the hero offering)
   ───────────────────────────────────────────────────────────────────── */
function OfferingDetailB() {
  return (
    <Board dir="b">
      <PageBNav active="What we do" />

      {/* Detail hero */}
      <section style={{ padding: '40px 32px 48px', borderBottom: '1px solid var(--c-line)' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
          <div style={{ fontSize: 11.5, color: 'var(--c-fg-muted)', marginBottom: 18, display: 'flex', gap: 8 }}>
            <span style={{ opacity: 0.65 }}>Home</span><span style={{ opacity: 0.4 }}>/</span>
            <span style={{ opacity: 0.65 }}>What we do</span><span style={{ opacity: 0.4 }}>/</span>
            <span>8-Week Transformation Cycle</span>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1.4fr 1fr', gap: 60, alignItems: 'start' }}>
            <div>
              <div style={{ display: 'flex', gap: 10, marginBottom: 18 }}>
                <Chip>Core offering</Chip>
                <Chip dot>2–3 cohorts per quarter</Chip>
              </div>
              <h1 className="h-display" style={{ fontSize: 72, margin: '0 0 20px', lineHeight: 0.95 }}>
                The 8-Week Transformation Cycle.
              </h1>
              <p style={{ fontSize: 19, lineHeight: 1.45, color: 'var(--c-fg)', margin: '0 0 16px', fontWeight: 500 }}>
                Eight weeks. Clear scope. Measurable outcomes. At least 10× the value of what you invest.
              </p>
              <p style={{ fontSize: 14.5, lineHeight: 1.6, color: 'var(--c-fg-muted)', margin: 0, maxWidth: 600 }}>
                We embed alongside your team for eight weeks. We don't write a strategy and walk away — we ship working AI capability with you, and train your people while we do it.
              </p>
            </div>
            <div className="panel" style={{ padding: 24, background: 'var(--c-bg-alt)' }}>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 18 }}>
                <div>
                  <div className="eyebrow" style={{ fontSize: 9.5, marginBottom: 6 }}>Investment</div>
                  <div style={{ fontSize: 26, fontWeight: 600 }}>£12,000+</div>
                  <div style={{ fontSize: 11, color: 'var(--c-fg-muted)' }}>from · + VAT</div>
                </div>
                <div>
                  <div className="eyebrow" style={{ fontSize: 9.5, marginBottom: 6 }}>Next start</div>
                  <div style={{ fontSize: 26, fontWeight: 600 }}>Jun 9</div>
                  <div style={{ fontSize: 11, color: 'var(--c-fg-muted)' }}>2 of 3 places left</div>
                </div>
              </div>
              <div className="btn btn-primary" style={{ width: '100%', justifyContent: 'center', marginBottom: 8 }}>Apply for Q2 cohort →</div>
              <div className="btn btn-outline" style={{ width: '100%', justifyContent: 'center' }}>Book a 20-min discovery</div>
              <div style={{ marginTop: 14, padding: '10px 12px', background: 'var(--c-bg)', borderRadius: 6, fontSize: 11.5, color: 'var(--c-fg-muted)', lineHeight: 1.5 }}>
                <strong style={{ color: 'var(--c-fg)' }}>Risk-free start:</strong> The first half-day workshop is conditional. If you don't find it valuable, you don't pay.
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* The plan — Option 2: conceptual stack, three layers, no week-by-week timeline */}
      <section style={{ padding: '64px 32px' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
          <Chip>The plan</Chip>
          <h2 className="h-display" style={{ fontSize: 48, margin: '20px 0 8px' }}>Eight weeks. Three things running in parallel.</h2>
          <p style={{ fontSize: 15, color: 'var(--c-fg-muted)', maxWidth: 720, margin: '0 0 40px' }}>
            A Phase 1 cycle isn't a linear build. It's three layers running side-by-side for eight weeks — shaped per client, never one-size-fits-all.
          </p>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
            {[
              {
                num: '01',
                label: 'Strategic streams',
                accent: 'var(--c-accent)',
                lead: 'We tackle 2–3 high-leverage moves from your Phase 0 roadmap — in parallel.',
                body: 'Phase 0 produces a prioritised list. Phase 1 picks the top two or three and runs them as concurrent streams — could be a workflow change, a custom AI tool, a process redesign, or a behaviour shift. We work on what moves the needle, not what fits a template.',
                tags: ['Process change', 'Custom AI tools', 'Workflow redesign', 'Behaviour shift'],
              },
              {
                num: '02',
                label: 'Working sessions',
                accent: 'var(--c-fg)',
                lead: 'Founder-led, weekly, in-person + remote.',
                body: 'Toby and Andy in the room with your team on a weekly cadence — never associates. Sessions are working sessions, not status updates: we make decisions, ship moves, and unblock what\'s in flight.',
                tags: ['Weekly cadence', 'In-person + remote', 'Founder-led'],
              },
              {
                num: '03',
                label: 'Capability & enablement',
                accent: 'var(--c-accent-2)',
                lead: 'Continuous training that takes your people up the curve as the cycle runs.',
                body: 'Underneath the streams: workshops, learning materials, tools, and embedded coaching. This is the layer most consultancies miss. By the end of week 8 your team doesn\'t just have the outputs — they own the capability to extend them.',
                tags: ['Workshops', 'Learning materials', 'Embedded coaching', 'Internal champions'],
              },
            ].map((layer, i) => (
              <div key={layer.num} className="panel" style={{
                padding: 32,
                display: 'grid', gridTemplateColumns: '60px 1fr 1.2fr', gap: 32, alignItems: 'start',
                borderLeft: `3px solid ${layer.accent}`,
              }}>
                <div style={{
                  width: 48, height: 48, borderRadius: 10,
                  background: `${layer.accent}14`, color: layer.accent,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontFamily: 'JetBrains Mono, monospace', fontWeight: 600, fontSize: 15,
                }}>{layer.num}</div>
                <div>
                  <div style={{ fontSize: 10.5, letterSpacing: '0.14em', textTransform: 'uppercase', color: 'var(--c-fg-muted)', fontWeight: 600, marginBottom: 8 }}>Layer {layer.num}</div>
                  <h3 className="h-display" style={{ fontSize: 28, margin: 0, lineHeight: 1.05, letterSpacing: '-0.02em' }}>{layer.label}</h3>
                  <p style={{ fontSize: 15.5, lineHeight: 1.5, color: 'var(--c-fg)', margin: '10px 0 0', fontWeight: 500 }}>{layer.lead}</p>
                </div>
                <div>
                  <p style={{ fontSize: 13.5, lineHeight: 1.6, color: 'var(--c-fg-muted)', margin: 0 }}>{layer.body}</p>
                  <div style={{ marginTop: 14, display: 'flex', flexWrap: 'wrap', gap: 6 }}>
                    {layer.tags.map(t => (
                      <span key={t} style={{
                        fontSize: 11, padding: '4px 10px', borderRadius: 999,
                        background: `${layer.accent}10`, color: layer.accent,
                        fontFamily: 'JetBrains Mono, monospace', letterSpacing: '0.02em',
                      }}>{t}</span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Footnote — what gets shaped */}
          <div style={{ marginTop: 24, padding: '16px 22px', background: 'var(--c-bg-alt)', borderRadius: 12, fontSize: 12.5, color: 'var(--c-fg-muted)', lineHeight: 1.55 }}>
            <strong style={{ color: 'var(--c-fg)', fontWeight: 600 }}>Per-client shaping:</strong> The streams in Layer 01 are chosen from your Phase 0 outputs. Working session cadence, training depth, and stakeholder mix flex with what the cycle actually needs.
          </div>
        </div>
      </section>

      {/* What you get */}
      <section style={{ padding: '64px 32px', background: 'var(--c-bg-alt)' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: 60 }}>
            <div>
              <Chip>Deliverables</Chip>
              <h2 className="h-display" style={{ fontSize: 40, margin: '20px 0 16px', lineHeight: 1 }}>What leaves the room with you.</h2>
              <p style={{ fontSize: 14, color: 'var(--c-fg-muted)', lineHeight: 1.55 }}>
                Tangible, owned by you, runs without us. That's the brief.
              </p>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 }}>
              {[
              ['Shipped capability', 'A working AI tool, agent, or workflow embedded in your business — not a prototype on a slide.'],
              ['Trained team', 'Your operators know how it works, how to extend it, and how to spot when it\u2019s drifting.'],
              ['Decision artefacts', 'Lightweight docs that capture what we tried, what worked, and why \u2014 so a new hire can catch up in an hour.'],
              ['Roadmap & ROI', 'A defensible plan for the next 90 days, with the value already delivered counted.']].
              map(([title, body], i) =>
              <div key={i} className="panel" style={{ padding: 22, background: 'var(--c-bg)' }}>
                  <div style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: 10.5, color: 'var(--c-fg-muted)', letterSpacing: '0.08em', marginBottom: 8 }}>0{i + 1} / 04</div>
                  <h3 style={{ fontSize: 16, fontWeight: 600, margin: '0 0 8px' }}>{title}</h3>
                  <p style={{ fontSize: 13, color: 'var(--c-fg-muted)', lineHeight: 1.55, margin: 0 }}>{body}</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Who it's right for / not for */}
      <section style={{ padding: '64px 32px' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
          <Chip>Fit check</Chip>
          <h2 className="h-display" style={{ fontSize: 48, margin: '20px 0 32px' }}>Honest about who this is for.</h2>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 }}>
            <div className="panel" style={{ padding: 28, borderLeft: '3px solid var(--c-accent)' }}>
              <div style={{ fontSize: 11, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--c-accent)', fontWeight: 600, marginBottom: 14 }}>Right fit if</div>
              {[
              'You\u2019re a mid-market business (£10–100M) with an actual P&L to defend.',
              'Your leadership team is bought in but stuck on what to do first.',
              'You want to build a capability your team owns — not buy another subscription.',
              'You\u2019re willing to be in the room with us for the work.'].
              map((t, i) =>
              <div key={i} style={{ display: 'flex', gap: 10, padding: '10px 0', borderBottom: i < 3 ? '1px solid var(--c-line)' : 'none', fontSize: 13.5, lineHeight: 1.5 }}>
                  <span style={{ color: 'var(--c-accent)', flexShrink: 0 }}>✓</span>
                  <span>{t}</span>
                </div>
              )}
            </div>
            <div className="panel" style={{ padding: 28, borderLeft: '3px solid var(--c-fg-muted)', background: 'var(--c-bg-alt)' }}>
              <div style={{ fontSize: 11, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--c-fg-muted)', fontWeight: 600, marginBottom: 14 }}>Probably not for you if</div>
              {[
              'You want a strategy deck and a vendor to outsource it to.',
              'You haven\u2019t decided whether AI is worth investing in yet.',
              'You need a managed service forever, not capability you own.',
              'You\u2019re looking for headcount, not judgement.'].
              map((t, i) =>
              <div key={i} style={{ display: 'flex', gap: 10, padding: '10px 0', borderBottom: i < 3 ? '1px solid var(--c-line)' : 'none', fontSize: 13.5, lineHeight: 1.5, color: 'var(--c-fg-muted)' }}>
                  <span style={{ color: 'var(--c-fg-muted)', flexShrink: 0 }}>—</span>
                  <span>{t}</span>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section style={{ padding: '64px 32px', background: 'var(--c-bg-alt)' }}>
        <div style={{ maxWidth: 900, margin: '0 auto' }}>
          <Chip>Common questions</Chip>
          <h2 className="h-display" style={{ fontSize: 40, margin: '20px 0 32px' }}>The questions people actually ask.</h2>
          {[
          ['Can we run this remotely?', 'Yes — but we recommend at least the Activation day in person. The rest is hybrid. We\u2019ve run cycles fully remote when geography demands.'],
          ['How is this priced?', 'From £20,000 per cycle. Final figure depends on team size, scope, and any specialist work. There\u2019s no per-seat license — one fee, fixed scope.'],
          ['What if our scope is much bigger?', 'Then we run sequential cycles. Most clients run 2–3 cycles in their first year. Each one is a fresh contract.'],
          ['Who actually delivers the work?', 'Toby and Andy lead every engagement. No associates, no juniors running ghost-projects. That\u2019s the deal.'],
          ['What\u2019s the no-value-no-pay clause?', 'The first half-day Activation is conditional. If by 5pm that day you don\u2019t think it was worth your time, you don\u2019t pay for it. No questions, no fight.']].
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

      {/* Final CTA */}
      <section style={{ padding: '80px 32px' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
          <div className="panel" style={{ padding: 56, textAlign: 'center', background: 'var(--c-fg)', color: 'var(--c-bg)' }}>
            <Chip style={{ background: 'rgba(255,255,255,0.08)', borderColor: 'rgba(255,255,255,0.15)', color: 'var(--c-bg)' }}>Apply</Chip>
            <h2 className="h-display" style={{ fontSize: 56, margin: '20px auto 14px', color: 'var(--c-bg)', maxWidth: 680, lineHeight: 1 }}>
              Q2 cohort closing soon. <span style={{ color: 'var(--c-accent)' }}>2 places left.</span>
            </h2>
            <p style={{ fontSize: 14.5, color: 'rgba(255,255,255,0.65)', maxWidth: 460, margin: '0 auto 24px' }}>Tell us where you are. We'll tell you whether we can help — within a week.

            </p>
            <div style={{ display: 'flex', gap: 10, justifyContent: 'center' }}>
              <span className="btn btn-accent">Apply for Q2 cohort</span>
              <span style={{
                background: 'transparent', color: 'var(--c-bg)',
                border: '1px solid rgba(255,255,255,0.25)', padding: '10px 18px', borderRadius: 999, fontSize: 12, fontWeight: 500
              }}>Book a 20-min call</span>
            </div>
          </div>
        </div>
      </section>

      <FooterB />
    </Board>);

}

function OfferingsA() {return <ComingSoon dir="a" title="Offerings · A" />;}
function OfferingsC() {return <ComingSoon dir="c" title="Offerings · C" />;}
function OfferingsD() {return <ComingSoon dir="d" title="Offerings · D" />;}
function OfferingDetailA() {return <ComingSoon dir="a" title="Offering Detail · A" />;}
function OfferingDetailC() {return <ComingSoon dir="c" title="Offering Detail · C" />;}
function OfferingDetailD() {return <ComingSoon dir="d" title="Offering Detail · D" />;}

function ComingSoon({ dir, title }) {
  return (
    <Board dir={dir}>
      <div style={{ padding: 40, display: 'flex', flexDirection: 'column', justifyContent: 'center', height: '100%', gap: 20 }}>
        <div className="eyebrow">Not for this direction</div>
        <h2 className="h-display" style={{ fontSize: 56, margin: 0, lineHeight: 1 }}>{title}</h2>
        <p style={{ fontSize: 14, color: 'var(--c-fg-muted)', maxWidth: 420, lineHeight: 1.55 }}>
          Direction B is the focus this round. Toggle the direction filter in the Tweaks panel if you want to revisit the others.
        </p>
      </div>
    </Board>);

}

Object.assign(window, {
  OfferingsA, OfferingsB, OfferingsC, OfferingsD,
  OfferingDetailA, OfferingDetailB, OfferingDetailC, OfferingDetailD,
  ComingSoon
});