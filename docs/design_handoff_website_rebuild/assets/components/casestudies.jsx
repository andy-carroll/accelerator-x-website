// casestudies.jsx — Case studies index + detail (Direction B)

const CASES = [
  { id: 1, sector: 'Retail', size: '£45M revenue', logo: 'Anonymised', outcome: '60% backlog reduction', cycle: '8 weeks · Q1 2026', offering: '8-Week Cycle', kicker: 'Operations',
    title: 'How a £45M retail group cut backlog 60% in one cycle.',
    sub: 'Eight weeks. Three operators. One production system the ops team runs without us.',
    metrics: [['60%', 'Backlog reduction'], ['£420k', 'Annualised saving'], ['11x', 'Return on cycle fee']] },
  { id: 2, sector: 'Financial services', size: '£200M revenue', logo: 'Anonymised', outcome: '4 weeks faster reporting', cycle: 'Activation · Q4 2025', offering: 'Leadership Activation', kicker: 'Reporting',
    title: 'A CFO\u2019s month-end, compressed from 9 days to 4.',
    sub: 'A half-day Activation surfaced the move. We ran it in the next cycle. The CFO got her weekends back.',
    metrics: [['9→4', 'Days for close'], ['£180k', 'Recovered FTE capacity'], ['100%', 'Reliability'] ] },
  { id: 3, sector: 'Professional services', size: '£18M revenue', logo: 'Anonymised', outcome: 'New service line in 12 weeks', cycle: '8-Week Cycle · Q1 2026', offering: '8-Week Cycle', kicker: 'Growth',
    title: 'A boutique consultancy launched an AI-powered service line.',
    sub: 'From idea to first paying customer in twelve weeks. Three of their consultants now run it.',
    metrics: [['£240k', 'New ARR in Q1'], ['12 wks', 'Idea to revenue'], ['3', 'Trained operators']] },
  { id: 4, sector: 'B2B SaaS', size: '£32M revenue', logo: 'Anonymised', outcome: '40% support deflection', cycle: '8-Week Cycle · Q2 2026', offering: '8-Week Cycle', kicker: 'Support',
    title: 'A B2B SaaS team deflected 40% of L1 support — without firing anyone.',
    sub: 'Existing team redeployed to higher-margin onboarding work. Net new revenue, no layoffs.',
    metrics: [['40%', 'L1 deflection'], ['£300k', 'Reallocated capacity'], ['NPS +18', 'Customer NPS shift']] },
  { id: 5, sector: 'Healthcare', size: '£60M revenue', logo: 'Anonymised', outcome: 'New clinical-ops capability', cycle: 'Cohort · 2025\u201326', offering: 'Leadership Cohort', kicker: 'Clinical',
    title: 'A healthcare group\u2019s clinical leads built their first AI ops capability.',
    sub: 'Six months. Eight leaders. Three production tools embedded in patient pathways.',
    metrics: [['3', 'Tools in production'], ['8', 'Leaders upskilled'], ['£500k+', 'Projected y/y saving']] },
  { id: 6, sector: 'Industrial', size: '£90M revenue', logo: 'Anonymised', outcome: 'Predictive maintenance live', cycle: '8-Week Cycle · Q4 2025', offering: '8-Week Cycle', kicker: 'Maintenance',
    title: 'A manufacturer shipped predictive maintenance with their existing data team.',
    sub: 'No new hires. No new tooling. We trained the team, scoped the move, then handed it over.',
    metrics: [['2.4x', 'ROI in 90 days'], ['1', 'Production system live'], ['0', 'New hires required']] },
];

function CasesB() {
  return (
    <Board dir="b">
      <PageBNav active="Case studies" />
      <PageHero
        breadcrumb={['Home', 'Case studies']}
        kicker="Six published · Many more under NDA"
        title="Work, with names redacted and outcomes counted."
        sub="We don\u2019t publish without permission. Some clients are public; most aren\u2019t. The shapes are the same."
      />

      {/* Stats ribbon */}
      <section style={{ padding: '32px 32px' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
          <div className="panel" style={{
            padding: '24px 28px', display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 32,
          }}>
            {[
              ['24', 'Engagements completed'],
              ['10×+', 'Average cycle ROI'],
              ['£4.2M', 'Total client value delivered'],
              ['100%', 'Cycles shipped on time'],
            ].map(([n, l]) => (
              <div key={l} style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
                <div style={{ fontFamily: 'var(--f-display)', fontSize: 36, fontWeight: 600, letterSpacing: '-0.03em', lineHeight: 1 }}>{n}</div>
                <div style={{ fontSize: 11.5, color: 'var(--c-fg-muted)', letterSpacing: '0.04em' }}>{l}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Filters */}
      <section style={{ padding: '16px 32px 24px' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 24, flexWrap: 'wrap' }}>
          <div style={{ display: 'flex', gap: 6, fontSize: 12.5 }}>
            {['All sectors', 'Retail', 'Financial services', 'Healthcare', 'B2B SaaS', 'Industrial', 'Professional services'].map((f, i) => (
              <span key={f} style={{
                padding: '6px 12px', borderRadius: 999,
                background: i === 0 ? 'var(--c-fg)' : 'transparent',
                color: i === 0 ? 'var(--c-bg)' : 'var(--c-fg)',
                border: i === 0 ? 'none' : '1px solid var(--c-line)',
                fontWeight: 500,
              }}>{f}</span>
            ))}
          </div>
          <div style={{ display: 'flex', gap: 6, fontSize: 12 }}>
            <span style={{ color: 'var(--c-fg-muted)' }}>Engagement:</span>
            {['All', 'Activation', '8-Week Cycle', 'Cohort', 'Advisory'].map((c, i) => (
              <span key={c} style={{ color: i === 0 ? 'var(--c-fg)' : 'var(--c-fg-muted)', fontWeight: i === 0 ? 500 : 400 }}>{c}</span>
            ))}
          </div>
        </div>
      </section>

      {/* Case grid */}
      <section style={{ padding: '0 32px 64px' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 16 }}>
          {CASES.map((c, i) => (
            <article key={c.id} className="panel" style={{
              padding: 0, overflow: 'hidden',
              gridColumn: i === 0 ? 'span 2' : 'span 1',
              display: 'flex', flexDirection: 'column',
            }}>
              <ImgPh tag={`${c.sector} · case study`} ratio={i === 0 ? '21/9' : '3/2'} />
              <div style={{ padding: 24, display: 'flex', flexDirection: 'column', gap: 12, flex: 1 }}>
                <div style={{ display: 'flex', gap: 6, alignItems: 'center', flexWrap: 'wrap' }}>
                  <span style={{ fontSize: 10.5, fontWeight: 600, padding: '3px 8px', background: 'rgba(8,138,191,0.14)', color: 'var(--c-accent)', borderRadius: 4, letterSpacing: '0.06em', textTransform: 'uppercase' }}>{c.sector}</span>
                  <span style={{ fontSize: 11.5, color: 'var(--c-fg-muted)' }}>· {c.size}</span>
                  <span style={{ fontSize: 11.5, color: 'var(--c-fg-muted)' }}>· {c.offering}</span>
                </div>
                <h3 className="h-display" style={{ fontSize: i === 0 ? 26 : 19, margin: 0, lineHeight: 1.15 }}>{c.title}</h3>
                <p style={{ fontSize: 13, color: 'var(--c-fg-muted)', lineHeight: 1.55, margin: 0, flex: 1 }}>{c.sub}</p>
                <div style={{
                  marginTop: 8, paddingTop: 16, borderTop: '1px solid var(--c-line)',
                  display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 12,
                }}>
                  {c.metrics.map(([n, l]) => (
                    <div key={l}>
                      <div style={{ fontSize: 18, fontWeight: 600, letterSpacing: '-0.02em', lineHeight: 1 }}>{n}</div>
                      <div style={{ fontSize: 10.5, color: 'var(--c-fg-muted)', marginTop: 4, letterSpacing: '0.04em' }}>{l}</div>
                    </div>
                  ))}
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* NDA disclaimer */}
      <section style={{ padding: '0 32px 64px' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
          <div className="panel-tint" style={{
            padding: '20px 24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 24,
          }}>
            <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
              <div style={{ width: 32, height: 32, borderRadius: 8, background: 'var(--c-bg)', border: '1px solid var(--c-line)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'JetBrains Mono, monospace' }}>🔒</div>
              <div>
                <div style={{ fontSize: 13, fontWeight: 600 }}>Under NDA</div>
                <div style={{ fontSize: 12, color: 'var(--c-fg-muted)' }}>Most of our work isn't public. Happy to walk you through specifics under a mutual NDA.</div>
              </div>
            </div>
            <span className="btn btn-outline" style={{ fontSize: 12, padding: '8px 14px' }}>Book a private brief →</span>
          </div>
        </div>
      </section>

      <FooterB />
    </Board>
  );
}

/* ─────────────────────────────────────────────────────────────────────
   CASE DETAIL — long-form (Direction B)
   ───────────────────────────────────────────────────────────────────── */
function CaseDetailB() {
  const c = CASES[0];
  return (
    <Board dir="b">
      <PageBNav active="Case studies" />

      {/* Hero */}
      <section style={{ padding: '40px 32px 32px', borderBottom: '1px solid var(--c-line)' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto' }}>
          <div style={{ fontSize: 11.5, color: 'var(--c-fg-muted)', marginBottom: 18, display: 'flex', gap: 8 }}>
            <span style={{ opacity: 0.65 }}>Case studies</span><span style={{ opacity: 0.4 }}>/</span>
            <span style={{ opacity: 0.65 }}>Retail</span><span style={{ opacity: 0.4 }}>/</span>
            <span>£45M retail group</span>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1.4fr 1fr', gap: 60, alignItems: 'start' }}>
            <div>
              <div style={{ display: 'flex', gap: 8, marginBottom: 18, flexWrap: 'wrap' }}>
                <Chip>{c.sector}</Chip>
                <Chip>{c.offering}</Chip>
                <Chip dot>Published Mar 2026</Chip>
              </div>
              <h1 className="h-display" style={{ fontSize: 60, margin: '0 0 20px', lineHeight: 0.96 }}>{c.title}</h1>
              <p style={{ fontSize: 18, color: 'var(--c-fg-muted)', lineHeight: 1.5, margin: 0, maxWidth: 600 }}>{c.sub}</p>
            </div>
            <div className="panel" style={{ padding: 24, background: 'var(--c-bg-alt)' }}>
              <div className="eyebrow" style={{ marginBottom: 14 }}>At a glance</div>
              {[
                ['Sector', c.sector],
                ['Size', c.size],
                ['Engagement', c.offering],
                ['Duration', c.cycle.split('·')[0].trim()],
                ['Live since', 'Mar 2026'],
                ['Team trained', '4 internal operators'],
              ].map(([k, v]) => (
                <div key={k} style={{ display: 'flex', justifyContent: 'space-between', padding: '7px 0', borderBottom: '1px solid var(--c-line)', fontSize: 12.5 }}>
                  <span style={{ color: 'var(--c-fg-muted)' }}>{k}</span>
                  <span style={{ fontWeight: 500 }}>{v}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Hero metrics */}
      <section style={{ padding: '40px 32px', background: 'var(--c-fg)', color: 'var(--c-bg)' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 0 }}>
            {c.metrics.map(([n, l], i) => (
              <div key={l} style={{
                padding: '0 32px', borderLeft: i > 0 ? '1px solid rgba(255,255,255,0.15)' : 'none',
              }}>
                <div style={{ fontFamily: 'var(--f-display)', fontSize: 56, fontWeight: 600, letterSpacing: '-0.03em', lineHeight: 1 }}>{n}</div>
                <div style={{ fontSize: 12.5, color: 'rgba(255,255,255,0.65)', marginTop: 10, letterSpacing: '0.04em' }}>{l}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Hero image */}
      <section style={{ padding: '40px 32px' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto' }}>
          <ImgPh tag="Workshop · cycle kickoff" ratio="21/9" style={{ borderRadius: 14 }} />
        </div>
      </section>

      {/* Narrative */}
      <section style={{ padding: '40px 32px 64px' }}>
        <div style={{ maxWidth: 760, margin: '0 auto', fontSize: 16, lineHeight: 1.75, color: 'var(--c-fg)' }}>
          <Chip>The brief</Chip>
          <h2 className="h-display" style={{ fontSize: 32, margin: '14px 0 18px', lineHeight: 1.1 }}>A backlog the ops team couldn't beat.</h2>
          <p style={{ margin: '0 0 24px' }}>Six warehouses. Three product categories. A returns-and-exceptions backlog growing 8% a month for two years.</p>
          <p style={{ margin: '0 0 24px' }}>The COO had tried two consultancies and one off-the-shelf platform. Each engagement left a deck and a license fee. The backlog kept growing.</p>

          <h2 className="h-display" style={{ fontSize: 32, margin: '40px 0 18px', lineHeight: 1.1 }}>What we did</h2>
          <p style={{ margin: '0 0 24px' }}>Half-day Activation in week one. Mapped every exception type. Found that 70% of the backlog was four repeated decision patterns.</p>
          <p style={{ margin: '0 0 24px' }}>Weeks 2–6: built an AI-assisted triage system embedded in their existing WMS. Weeks 7–8: trained four operators, handed it over, watched.</p>

          <h2 className="h-display" style={{ fontSize: 32, margin: '40px 0 18px', lineHeight: 1.1 }}>What changed</h2>
          <p style={{ margin: '0 0 16px' }}>By the end of week 12, the backlog was down 60%. The COO got two of her supervisors back to doing the work they'd been hired for. The system has been running for eleven weeks now without our involvement.</p>

          {/* Pull quote */}
          <blockquote style={{
            margin: '40px 0',
            padding: 28,
            background: 'var(--c-bg-alt)',
            borderRadius: 14,
            display: 'grid', gridTemplateColumns: '48px 1fr', gap: 18, alignItems: 'start',
          }}>
            <AvatarPh size={48} initials="KS" />
            <div>
              <p style={{
                fontFamily: 'var(--f-display)', fontSize: 22, fontWeight: 500, lineHeight: 1.3,
                margin: '0 0 14px', color: 'var(--c-fg)',
              }}>"They walked in and asked sharper questions than my CTO. By Friday we had a roadmap that survived contact with reality."</p>
              <div style={{ fontSize: 13, fontWeight: 600 }}>K.S.</div>
              <div style={{ fontSize: 12, color: 'var(--c-fg-muted)' }}>COO · £45M Retail Group</div>
            </div>
          </blockquote>

          <h2 className="h-display" style={{ fontSize: 32, margin: '40px 0 18px', lineHeight: 1.1 }}>What we left behind</h2>
          <ul style={{ paddingLeft: 22, margin: '0 0 24px' }}>
            <li style={{ marginBottom: 8 }}>A production triage system inside their existing WMS</li>
            <li style={{ marginBottom: 8 }}>Four trained internal operators running it day-to-day</li>
            <li style={{ marginBottom: 8 }}>A run-book the new hire could pick up in an hour</li>
            <li style={{ marginBottom: 8 }}>A 90-day roadmap for the next cycle (signed two weeks later)</li>
          </ul>
        </div>
      </section>

      {/* Next case + CTA */}
      <section style={{ padding: '40px 32px 80px', background: 'var(--c-bg-alt)' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
          <div className="panel" style={{ padding: 28, background: 'var(--c-bg)' }}>
            <Chip>Next case</Chip>
            <h3 className="h-display" style={{ fontSize: 24, margin: '14px 0 8px', lineHeight: 1.15 }}>{CASES[1].title}</h3>
            <p style={{ fontSize: 13, color: 'var(--c-fg-muted)', lineHeight: 1.55, margin: 0 }}>{CASES[1].sub}</p>
            <div style={{ marginTop: 16, fontSize: 12, color: 'var(--c-accent)', fontWeight: 500 }}>Read next →</div>
          </div>
          <div className="panel" style={{ padding: 28, background: 'var(--c-fg)', color: 'var(--c-bg)' }}>
            <Chip style={{ background: 'rgba(255,255,255,0.08)', borderColor: 'rgba(255,255,255,0.15)', color: 'var(--c-bg)' }}>Apply</Chip>
            <h3 className="h-display" style={{ fontSize: 24, margin: '14px 0 8px', color: 'var(--c-bg)', lineHeight: 1.15 }}>Your case study, next quarter.</h3>
            <p style={{ fontSize: 13, color: 'rgba(255,255,255,0.65)', lineHeight: 1.55, margin: '0 0 18px' }}>Q2 cohort closing. 2 places left.</p>
            <span className="btn btn-accent" style={{ fontSize: 12, padding: '8px 16px' }}>Apply for Q2 →</span>
          </div>
        </div>
      </section>

      <FooterB />
    </Board>
  );
}

function CasesA() { return <ComingSoon dir="a" title="Case studies · A" />; }
function CasesC() { return <ComingSoon dir="c" title="Case studies · C" />; }
function CasesD() { return <ComingSoon dir="d" title="Case studies · D" />; }
function CaseDetailA() { return <ComingSoon dir="a" title="Case detail · A" />; }
function CaseDetailC() { return <ComingSoon dir="c" title="Case detail · C" />; }
function CaseDetailD() { return <ComingSoon dir="d" title="Case detail · D" />; }

Object.assign(window, { CasesA, CasesB, CasesC, CasesD, CaseDetailA, CaseDetailB, CaseDetailC, CaseDetailD });
