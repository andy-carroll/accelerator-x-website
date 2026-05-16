// methodology.jsx — How we work (Direction B)

function MethodologyB() {
  return (
    <Board dir="b">
      <PageBNav active="How we work" />
      <PageHero
        breadcrumb={['Home', 'How we work']}
        kicker="Method · Built in the room"
        title="Capability, not consultancy."
        sub="We don't ship slides. We ship working systems, and we train the team that owns them. Here's the operating model behind every engagement."
      />

      {/* Operating principles — the conviction layer */}
      <section style={{ padding: '64px 32px' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: 60 }}>
            <div>
              <Chip>Operating principles</Chip>
              <h2 className="h-display" style={{ fontSize: 40, margin: '20px 0 16px', lineHeight: 1 }}>
                Six rules we run every engagement by.
              </h2>
              <p style={{ fontSize: 14, color: 'var(--c-fg-muted)', lineHeight: 1.55 }}>
                These aren't slogans. They're what we say no to.
              </p>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 }}>
              {[
                ['Capability over dependency', 'If you still need us in year two, we failed.'],
                ['Outcomes over outputs', 'A deck is not progress. A working tool is.'],
                ['In-the-room over remote', 'The work happens with your team, not behind a curtain.'],
                ['Time-boxed over open-ended', 'Eight-week cycles. Then a clean decision to continue.'],
                ['Few, deep over many, shallow', '2–3 new clients a quarter. By choice.'],
                ['Founder-led, always', 'Toby and Andy in every session. Not associates.'],
              ].map(([t, b], i) => (
                <div key={i} className="panel" style={{ padding: 22 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: 10 }}>
                    <span style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: 10.5, color: 'var(--c-fg-muted)', letterSpacing: '0.08em' }}>PRINCIPLE {String(i+1).padStart(2,'0')}</span>
                    <span style={{ width: 6, height: 6, borderRadius: 999, background: 'var(--c-accent)' }} />
                  </div>
                  <h3 style={{ fontSize: 16, fontWeight: 600, margin: '0 0 6px' }}>{t}</h3>
                  <p style={{ fontSize: 12.5, color: 'var(--c-fg-muted)', lineHeight: 1.55, margin: 0 }}>{b}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* The 5-stage build sequence */}
      <section style={{ padding: '80px 32px', background: 'var(--c-bg-alt)' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
          <Chip>The 5-Stage Build Sequence</Chip>
          <h2 className="h-display" style={{ fontSize: 56, margin: '20px 0 8px', lineHeight: 0.98, maxWidth: 760 }}>
            Discover. Prioritise. Prototype. Ship. Embed.
          </h2>
          <p style={{ fontSize: 15, color: 'var(--c-fg-muted)', maxWidth: 640, margin: '0 0 48px' }}>
            The spine of every cycle. Doctrinal, not dogmatic — we adapt the moves, never the order.
          </p>

          {/* Horizontal stages */}
          <div style={{
            display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)',
            gap: 12, position: 'relative',
          }}>
            {[
              { n: '01', t: 'Discover', accent: 'var(--c-accent)', body: 'Live discovery with the leadership team. Map the real opportunities and the real constraints.', outputs: ['Opportunity map', 'Constraint inventory'] },
              { n: '02', t: 'Prioritise', accent: 'var(--c-accent)', body: 'Score every move by impact, effort, and reversibility. Pick one. Defend the choice.', outputs: ['Decision memo', 'Success metrics'] },
              { n: '03', t: 'Prototype', accent: 'var(--c-fg)', body: 'Build the smallest thing that proves the move. With your team, in the room.', outputs: ['Working prototype', 'Learning log'] },
              { n: '04', t: 'Ship', accent: 'var(--c-fg)', body: 'Production-ready. Embedded in the workflow it has to live in. Reviewed by the operators.', outputs: ['Live system', 'Run-book'] },
              { n: '05', t: 'Embed', accent: 'var(--c-accent-2)', body: 'Train, hand over, measure adoption. We watch for two weeks, then we leave.', outputs: ['Training kit', 'ROI review'] },
            ].map((s, i) => (
              <div key={s.n} className="panel" style={{ padding: 20, display: 'flex', flexDirection: 'column', gap: 12, background: 'var(--c-bg)' }}>
                <div style={{
                  display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                  paddingBottom: 12, borderBottom: `1px solid var(--c-line)`,
                }}>
                  <span style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: 11, color: s.accent, fontWeight: 600 }}>STAGE {s.n}</span>
                  <span style={{ width: 8, height: 8, borderRadius: 999, background: s.accent }} />
                </div>
                <h3 className="h-display" style={{ fontSize: 22, margin: 0, letterSpacing: '-0.02em' }}>{s.t}</h3>
                <p style={{ fontSize: 12.5, color: 'var(--c-fg-muted)', lineHeight: 1.5, margin: 0, flex: 1 }}>{s.body}</p>
                <div style={{ marginTop: 'auto', paddingTop: 12, borderTop: `1px solid var(--c-line)` }}>
                  <div style={{ fontSize: 9.5, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--c-fg-muted)', fontWeight: 600, marginBottom: 6 }}>Outputs</div>
                  {s.outputs.map(o => (
                    <div key={o} style={{ fontSize: 11.5, color: 'var(--c-fg)', padding: '2px 0' }}>— {o}</div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* What we don't do — anti-list */}
      <section style={{ padding: '80px 32px' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 60, alignItems: 'center' }}>
            <div>
              <Chip>What we don't do</Chip>
              <h2 className="h-display" style={{ fontSize: 48, margin: '20px 0 20px', lineHeight: 1 }}>
                Defined as much by what we say no to.
              </h2>
              <p style={{ fontSize: 14.5, color: 'var(--c-fg-muted)', lineHeight: 1.6 }}>
                We turn down work that doesn't fit. It's the only way to keep the standard high — and the only honest thing to do when the work won't deliver.
              </p>
            </div>
            <div className="panel" style={{ padding: 28, background: 'var(--c-bg-alt)' }}>
              {[
                ['Strategy decks without delivery.', 'We don\u2019t ship recommendations and walk away.'],
                ['Managed-service lock-in.', 'We don\u2019t run your AI for you forever. You should own it.'],
                ['Tool resale.', 'We don\u2019t take vendor commissions. The advice has to be clean.'],
                ['Headcount-as-a-service.', 'We\u2019re senior judgement, not contracted bodies.'],
                ['Full-blast platform rebuilds.', 'We pick the move that moves the needle, not the most ambitious one.'],
              ].map(([t, b], i) => (
                <div key={i} style={{
                  display: 'grid', gridTemplateColumns: '24px 1fr', gap: 14,
                  padding: '14px 0', borderBottom: i < 4 ? '1px solid var(--c-line)' : 'none',
                  alignItems: 'baseline',
                }}>
                  <span style={{ color: 'var(--c-accent-2)', fontFamily: 'JetBrains Mono, monospace', fontSize: 14, fontWeight: 600 }}>×</span>
                  <div>
                    <div style={{ fontSize: 14, fontWeight: 600 }}>{t}</div>
                    <div style={{ fontSize: 12.5, color: 'var(--c-fg-muted)', marginTop: 2 }}>{b}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Comparison: us vs the alternatives */}
      <section style={{ padding: '64px 32px', background: 'var(--c-fg)', color: 'var(--c-bg)' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
          <Chip style={{ background: 'rgba(255,255,255,0.08)', borderColor: 'rgba(255,255,255,0.15)', color: 'var(--c-bg)' }}>How we compare</Chip>
          <h2 className="h-display" style={{ fontSize: 48, margin: '20px 0 40px', color: 'var(--c-bg)' }}>Three options. One actually delivers.</h2>

          <div style={{ background: 'rgba(255,255,255,0.04)', borderRadius: 14, overflow: 'hidden', border: '1px solid rgba(255,255,255,0.1)' }}>
            {/* Header */}
            <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr 1fr 1fr', gap: 0, padding: '16px 24px', background: 'rgba(255,255,255,0.06)', fontSize: 11, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.55)', fontWeight: 600 }}>
              <span></span>
              <span>Tier-1 Consultancy</span>
              <span>Digital Agency</span>
              <span style={{ color: 'var(--c-bg)' }}>Accelerator X</span>
            </div>
            {[
              ['Deliverable', 'Strategy deck', 'Built-then-vanished tool', 'Working system you own'],
              ['Who delivers', 'Partner-led, junior-built', 'Account manager + team', 'Toby + Andy, every session'],
              ['Engagement length', '3–9 months', 'Project-based', '8-week cycles, time-boxed'],
              ['Cost shape', '£200k+, slow', 'Variable, ongoing fees', 'Fixed-scope, from £12k'],
              ['Capability left behind', 'Recommendations to follow', 'A tool, no ownership', 'Trained team that owns it'],
              ['Risk', 'You absorb it all', 'You absorb it all', 'No-value, no-pay start'],
            ].map(([row, c1, c2, c3], i) => (
              <div key={i} style={{
                display: 'grid', gridTemplateColumns: '1.2fr 1fr 1fr 1fr', gap: 0,
                padding: '16px 24px', borderTop: '1px solid rgba(255,255,255,0.08)',
                fontSize: 13, alignItems: 'center',
              }}>
                <span style={{ color: 'rgba(255,255,255,0.55)', fontSize: 11.5, letterSpacing: '0.08em', textTransform: 'uppercase', fontWeight: 600 }}>{row}</span>
                <span style={{ color: 'rgba(255,255,255,0.65)' }}>{c1}</span>
                <span style={{ color: 'rgba(255,255,255,0.65)' }}>{c2}</span>
                <span style={{ color: 'var(--c-bg)', fontWeight: 500 }}>{c3}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured case ribbon */}
      <section style={{ padding: '64px 32px' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
          <div className="panel-tint" style={{ padding: 40, display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 60, alignItems: 'center' }}>
            <div>
              <Chip>Method in practice</Chip>
              <h2 className="h-display" style={{ fontSize: 36, margin: '18px 0 14px', lineHeight: 1.05 }}>
                See how the 5-stage sequence ran for a £45M retail group.
              </h2>
              <p style={{ fontSize: 14, color: 'var(--c-fg-muted)', lineHeight: 1.55, margin: '0 0 20px' }}>
                Backlog cut 60% in one cycle. Eight weeks, three operators, one production system the ops team now runs without us.
              </p>
              <div style={{ display: 'flex', gap: 10 }}>
                <span className="btn btn-primary">Read the case study</span>
              </div>
            </div>
            <ImgPh tag="Case spread · 8-week cycle" ratio="4/3" style={{ borderRadius: 12 }} />
          </div>
        </div>
      </section>

      <FooterB />
    </Board>
  );
}

function MethodologyA() { return <ComingSoon dir="a" title="How we work · A" />; }
function MethodologyC() { return <ComingSoon dir="c" title="How we work · C" />; }
function MethodologyD() { return <ComingSoon dir="d" title="How we work · D" />; }

Object.assign(window, { MethodologyA, MethodologyB, MethodologyC, MethodologyD });
