// dots-method.jsx — Standalone "Method · DOTS" page (Direction B).
// Lives under "How we work" in the nav.
// Uses DotsBlock (cube chain) + DotsDetailGrid from dots-cube.jsx.

function DotsMethodB() {
  return (
    <Board dir="b">
      <PageBNav active="How we work" />

      {/* Hero — DOTS as cube chain */}
      <section style={{
        padding: '64px 32px 56px',
        borderBottom: '1px solid var(--c-line)',
        background: 'linear-gradient(180deg, var(--c-bg) 0%, var(--c-bg-alt) 100%)',
      }}>
        <div style={{ maxWidth: 1280, margin: '0 auto' }}>
          <div style={{ fontSize: 11.5, color: 'var(--c-fg-muted)', marginBottom: 18, display: 'flex', gap: 8 }}>
            <span style={{ opacity: 0.65 }}>How we work</span><span style={{ opacity: 0.4 }}>/</span>
            <span>Method · DOTS</span>
          </div>
          <div style={{ maxWidth: 920 }}>
            <div style={{ display: 'flex', gap: 8, marginBottom: 18 }}>
              <Chip>Our proprietary method</Chip>
              <Chip dot>Used in every engagement</Chip>
            </div>
            <h1 className="h-display" style={{ fontSize: 88, margin: '0 0 20px', lineHeight: 0.95 }}>
              The DOTS framework.
            </h1>
            <p style={{ fontSize: 20, lineHeight: 1.45, color: 'var(--c-fg)', margin: '0 0 16px', fontWeight: 500 }}>
              Four moves — connected — that take a leadership team from <em>overwhelmed and confused</em> to <em>clear and aligned</em>. Fast.
            </p>
            <p style={{ fontSize: 14, lineHeight: 1.6, color: 'var(--c-fg-muted)', margin: 0, maxWidth: 700 }}>
              Clients tell us a 3-hour DOTS session delivers more than the previous twelve months of internal AI conversations. It's the spine of every engagement we run — workshops, cohorts, Phase 0, transformation cycles, even keynotes.
            </p>
          </div>

          {/* DOTS cube chain — hero */}
          <div style={{ marginTop: 48 }}>
            <DotsBlock />
          </div>
        </div>
      </section>

      {/* Where DOTS shows up */}
      <section style={{ padding: '64px 32px', background: 'var(--c-bg-alt)' }}>
        <div style={{ maxWidth: 1280, margin: '0 auto' }}>
          <Chip>Where DOTS shows up</Chip>
          <h2 className="h-display" style={{ fontSize: 40, margin: '18px 0 28px' }}>One framework. Every format.</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 12 }}>
            {[
              { where: 'Phase 0 · Session 1', who: 'Exec team', dur: '2.5 hrs', body: 'The first DOTS session in any corporate engagement.' },
              { where: 'Phase 0 · Session 3', who: 'Function leads', dur: '2.5 hrs', body: 'A second DOTS, deeper, focused on the function delivering Phase 1.' },
              { where: 'Leadership Cohort', who: '8–12 peers', dur: 'Repeating', body: "DOTS run iteratively on each cohort member's context." },
              { where: 'Talks & Events', who: 'Offsite groups', dur: 'Live', body: 'Live DOTS facilitation as the centrepiece of a leadership offsite.' },
            ].map(s => (
              <div key={s.where} className="panel" style={{ padding: 18, background: 'var(--c-bg)' }}>
                <div style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: 10, color: 'var(--c-accent)', letterSpacing: '0.1em', fontWeight: 600, marginBottom: 10, textTransform: 'uppercase' }}>{s.where}</div>
                <div style={{ fontSize: 14, fontWeight: 600 }}>{s.who}</div>
                <div style={{ fontSize: 11, color: 'var(--c-fg-muted)', marginTop: 2 }}>{s.dur}</div>
                <p style={{ fontSize: 12.5, color: 'var(--c-fg-muted)', lineHeight: 1.5, margin: '10px 0 0' }}>{s.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* The four moves in detail — DotsDetailGrid */}
      <section style={{ padding: '80px 32px 64px' }}>
        <div style={{ maxWidth: 1280, margin: '0 auto' }}>
          <Chip>The four moves in detail</Chip>
          <h2 className="h-display" style={{ fontSize: 56, margin: '20px 0 14px', lineHeight: 0.98 }}>Dream · Obstacles · Triage · Sequence.</h2>
          <p style={{ fontSize: 14.5, color: 'var(--c-fg-muted)', margin: '0 0 36px', maxWidth: 680, lineHeight: 1.55 }}>
            Read across the columns to compare moves. DOTS is one connected system — not four separate steps.
          </p>
          <DotsDetailGrid />
        </div>
      </section>

      {/* Why DOTS works */}
      <section style={{ padding: '64px 32px', background: 'var(--c-fg)', color: 'var(--c-bg)' }}>
        <div style={{ maxWidth: 1280, margin: '0 auto' }}>
          <Chip style={{ background: 'rgba(255,255,255,0.08)', borderColor: 'rgba(255,255,255,0.15)', color: 'var(--c-bg)' }}>Why this works</Chip>
          <h2 className="h-display" style={{ fontSize: 48, margin: '20px 0 32px', color: 'var(--c-bg)', maxWidth: 760, lineHeight: 1 }}>
            DOTS works because it forces four decisions most teams skip.
          </h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 14 }}>
            {[
              ['Ambition before friction', 'Most teams jump straight to obstacles. Naming the destination first changes which obstacles even matter.'],
              ['Honest filtering', 'The middle two moves (O + T) are where the wasted year hides. We force the team through them, not around them.'],
              ['Sequence over strategy', 'A 90-day plan that survives contact with reality is worth more than a 30-page strategy nobody acts on.'],
            ].map(([t, b]) => (
              <div key={t} style={{ padding: 24, background: 'rgba(255,255,255,0.04)', borderRadius: 12, border: '1px solid rgba(255,255,255,0.08)' }}>
                <h3 style={{ fontSize: 17, fontWeight: 600, margin: '0 0 10px', color: 'var(--c-bg)' }}>{t}</h3>
                <p style={{ fontSize: 13.5, lineHeight: 1.6, color: 'rgba(255,255,255,0.7)', margin: 0 }}>{b}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Quote / proof */}
      <section style={{ padding: '80px 32px' }}>
        <div style={{ maxWidth: 880, margin: '0 auto', textAlign: 'center' }}>
          <Chip style={{ marginBottom: 24 }}>From a client, week 1</Chip>
          <blockquote style={{
            margin: 0,
            fontFamily: 'var(--f-display)',
            fontSize: 36, lineHeight: 1.2, letterSpacing: '-0.02em',
            color: 'var(--c-fg)', fontWeight: 500,
          }}>
            "We've been talking about this for a year. DOTS got us to a clear answer in three hours."
          </blockquote>
          <div style={{ marginTop: 24, display: 'inline-flex', gap: 12, alignItems: 'center' }}>
            <AvatarPh size={36} initials="MV" />
            <div style={{ textAlign: 'left' }}>
              <div style={{ fontSize: 13, fontWeight: 600 }}>M.V.</div>
              <div style={{ fontSize: 11.5, color: 'var(--c-fg-muted)' }}>CEO · £60M healthcare group</div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section style={{ padding: '32px 32px 80px' }}>
        <div style={{ maxWidth: 1280, margin: '0 auto' }}>
          <div className="panel" style={{ padding: 48, background: 'var(--c-bg-alt)', display: 'grid', gridTemplateColumns: '1.4fr 1fr', gap: 48, alignItems: 'center' }}>
            <div>
              <h2 className="h-display" style={{ fontSize: 40, margin: '0 0 12px', lineHeight: 1, maxWidth: 520 }}>
                The fastest way to experience DOTS is to run one.
              </h2>
              <p style={{ fontSize: 14, color: 'var(--c-fg-muted)', lineHeight: 1.55, maxWidth: 480, margin: 0 }}>
                Phase 0 opens with a full DOTS session for your exec team. Two weeks later, you have a costed 90-day roadmap.
              </p>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              <span className="btn btn-primary" style={{ justifyContent: 'center' }}>Book a Phase 0 →</span>
              <span className="btn btn-outline" style={{ justifyContent: 'center' }}>Talk it through (20 min)</span>
            </div>
          </div>
        </div>
      </section>

      <FooterB />
    </Board>
  );
}

Object.assign(window, { DotsMethodB });
