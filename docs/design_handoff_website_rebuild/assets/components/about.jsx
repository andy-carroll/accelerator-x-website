// about.jsx — About / Founders (Direction B)

function AboutB() {
  return (
    <Board dir="b">
      <PageBNav active="About" />
      <PageHero
        breadcrumb={['Home', 'About']}
        kicker="Two founders · One method"
        title="We started Accelerator X because the alternatives weren't working."
        sub="A consultancy that delivers, not deflects. An agency that builds capability, not lock-in. Founder-led, by design."
      />

      {/* Founders */}
      <section style={{ padding: '64px 32px' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24 }}>
          {[
            { name: 'Toby Henry', role: 'Co-founder · Strategy & Transformation', initials: 'TH', accent: 'var(--c-accent)',
              bio: 'Twenty years in tier-one management consulting and large-scale transformation programmes. Spent fifteen of them telling clients to build capability instead of buying it. Started Accelerator X to actually do that.',
              cv: ['Capgemini · Senior Director', 'WPP · Group Director', 'NHS · Transformation Advisor', 'Cambridge MBA'] },
            { name: 'Andy Carroll', role: 'Co-founder · Product & AI', initials: 'AC', accent: 'var(--c-accent-2)',
              bio: 'Seventeen years in product and AI across startups and banks. Shipped real systems at Capital One and three Series B companies. Writes the weekly dispatch.',
              cv: ['Capital One · Head of AI Product', 'Pegasus Group · Product Lead', 'Two startup exits', 'B.Eng Computer Science'] },
          ].map((p, i) => (
            <div key={p.name} className="panel" style={{ padding: 32 }}>
              <div style={{ display: 'flex', gap: 20, alignItems: 'flex-start', marginBottom: 24 }}>
                <ImgPh tag={p.initials} ratio="1/1" style={{ width: 96, height: 96, flexShrink: 0, borderRadius: 14 }} />
                <div>
                  <h2 className="h-display" style={{ fontSize: 28, margin: '0 0 6px', lineHeight: 1.1 }}>{p.name}</h2>
                  <div style={{ fontSize: 12.5, color: 'var(--c-fg-muted)', marginBottom: 0 }}>{p.role}</div>
                  <div style={{ marginTop: 10, display: 'flex', gap: 6 }}>
                    <span style={{ width: 28, height: 28, borderRadius: 999, border: '1px solid var(--c-line)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 10, fontFamily: 'JetBrains Mono, monospace' }}>Li</span>
                    <span style={{ width: 28, height: 28, borderRadius: 999, border: '1px solid var(--c-line)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 10, fontFamily: 'JetBrains Mono, monospace' }}>↗</span>
                  </div>
                </div>
              </div>
              <p style={{ fontSize: 14.5, lineHeight: 1.6, color: 'var(--c-fg)', margin: '0 0 24px' }}>{p.bio}</p>
              <div style={{ paddingTop: 18, borderTop: '1px solid var(--c-line)' }}>
                <div className="eyebrow" style={{ marginBottom: 10 }}>Track record</div>
                {p.cv.map(c => (
                  <div key={c} style={{ fontSize: 12.5, color: 'var(--c-fg-muted)', padding: '4px 0', display: 'flex', gap: 10 }}>
                    <span style={{ color: p.accent, fontFamily: 'JetBrains Mono, monospace' }}>—</span>
                    <span>{c}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Story */}
      <section style={{ padding: '64px 32px', background: 'var(--c-bg-alt)' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: 60 }}>
            <div>
              <Chip>Origin story</Chip>
              <h2 className="h-display" style={{ fontSize: 40, margin: '20px 0 0', lineHeight: 1, position: 'sticky', top: 100 }}>
                Why we exist.
              </h2>
            </div>
            <div style={{ fontSize: 15.5, lineHeight: 1.7, color: 'var(--c-fg)' }}>
              <p style={{ margin: '0 0 22px' }}>Toby and Andy met in 2023 on a transformation engagement. Toby was the consultant the board had hired. Andy was the product lead the client had pulled in. They disagreed about almost everything for the first month.</p>
              <p style={{ margin: '0 0 22px' }}>What they agreed on: the engagement was going to fail, predictably, on the same gap they'd seen on a dozen projects each. Strategy was good. Tech was good. The handoff between them was where the value was leaking.</p>
              <p style={{ margin: '0 0 22px', fontWeight: 500 }}>They built Accelerator X to close that gap — by refusing the format that creates it.</p>
              <p style={{ margin: 0, color: 'var(--c-fg-muted)' }}>That means: no strategy-deck-and-leave. No build-it-yourself platform sale. No managed-service lock-in. Just senior operators in the room, eight weeks at a time, until the capability is yours.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Beliefs grid */}
      <section style={{ padding: '64px 32px' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
          <Chip>What we believe</Chip>
          <h2 className="h-display" style={{ fontSize: 48, margin: '20px 0 32px', maxWidth: 700, lineHeight: 1 }}>The convictions underneath the work.</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 14 }}>
            {[
              ['AI is an operating problem.', 'The models are commodity. The capability to use them well is not — and that\u2019s a leadership problem, not a tech one.'],
              ['Capability beats software.', 'Tools change every six months. A team that learns to evaluate, commission, and govern AI is durable.'],
              ['Speed is a feature.', 'A year-long programme isn\u2019t serious. Eight weeks forces real choices and real outcomes.'],
              ['Honest scoping over upsell.', 'If we don\u2019t think we can deliver 10× the fee, we say so. We\u2019ve turned down £450k of work in the last year.'],
              ['Few clients, deeper.', 'Two or three new engagements a quarter. By design. It\u2019s the only way to keep founder-led real.'],
              ['Write it down.', 'Every engagement leaves documentation a new hire can read in an hour. No tribal knowledge by design.'],
            ].map(([t, b], i) => (
              <div key={i} className="panel" style={{ padding: 22 }}>
                <div style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: 10.5, color: 'var(--c-fg-muted)', letterSpacing: '0.08em', marginBottom: 10 }}>BELIEF {String(i+1).padStart(2,'0')}</div>
                <h3 style={{ fontSize: 17, fontWeight: 600, margin: '0 0 10px', lineHeight: 1.2 }}>{t}</h3>
                <p style={{ fontSize: 13, color: 'var(--c-fg-muted)', lineHeight: 1.55, margin: 0 }}>{b}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Press / appearances */}
      <section style={{ padding: '64px 32px', background: 'var(--c-bg-alt)' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
          <Chip>Speaking & press</Chip>
          <h2 className="h-display" style={{ fontSize: 36, margin: '18px 0 28px' }}>Where Toby and Andy show up.</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 14 }}>
            {[
              ['TechCrunch Disrupt', 'Panel · Sep 2025'],
              ['Web Summit Lisbon', 'Keynote · Nov 2025'],
              ['London Tech Week', 'Workshop · Jun 2025'],
              ['Sifted EU 100', 'Featured · Q1 2026'],
              ['HBR Online', 'Bylined · Mar 2026'],
              ['Master of Scale', 'Podcast · Apr 2026'],
              ['BBC Tech Tent', 'Interview · May 2026'],
              ['FT Future of AI', 'Speaker · Sep 2026'],
            ].map(([name, when]) => (
              <div key={name} className="panel" style={{ padding: 16, background: 'var(--c-bg)' }}>
                <div style={{ fontSize: 13.5, fontWeight: 600 }}>{name}</div>
                <div style={{ fontSize: 11.5, color: 'var(--c-fg-muted)', marginTop: 4 }}>{when}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section style={{ padding: '80px 32px' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
          <div className="panel" style={{ padding: 56, background: 'var(--c-fg)', color: 'var(--c-bg)', display: 'grid', gridTemplateColumns: '1.4fr 1fr', gap: 60, alignItems: 'center' }}>
            <div>
              <Chip style={{ background: 'rgba(255,255,255,0.08)', borderColor: 'rgba(255,255,255,0.15)', color: 'var(--c-bg)' }}>Work with us</Chip>
              <h2 className="h-display" style={{ fontSize: 48, margin: '20px 0 14px', color: 'var(--c-bg)', lineHeight: 1 }}>If the principles fit, the work will.</h2>
              <p style={{ fontSize: 14.5, color: 'rgba(255,255,255,0.65)', maxWidth: 480, margin: 0 }}>
                Tell us where you are. We'll tell you whether we can help — within a week.
              </p>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              <span className="btn btn-accent" style={{ justifyContent: 'center' }}>Apply to work with us</span>
              <span style={{
                background: 'transparent', color: 'var(--c-bg)',
                border: '1px solid rgba(255,255,255,0.25)', padding: '10px 18px', borderRadius: 999, fontSize: 12, fontWeight: 500,
                textAlign: 'center',
              }}>Book a 20-min call</span>
            </div>
          </div>
        </div>
      </section>

      <FooterB />
    </Board>
  );
}

function AboutA() { return <ComingSoon dir="a" title="About · A" />; }
function AboutC() { return <ComingSoon dir="c" title="About · C" />; }
function AboutD() { return <ComingSoon dir="d" title="About · D" />; }

Object.assign(window, { AboutA, AboutB, AboutC, AboutD });
