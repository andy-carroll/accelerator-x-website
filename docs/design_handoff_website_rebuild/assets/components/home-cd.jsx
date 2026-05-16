// home-cd.jsx — HomeC (Living Manuscript) + HomeD (Index)

/* ═════════════════════════════════════════════════════════════════════
   DIRECTION C — LIVING MANUSCRIPT
   Magazine-editorial. Asymmetric, italics, color as compositional element.
   ═════════════════════════════════════════════════════════════════════ */
function HomeC() {
  return (
    <Board dir="c" scroll>
      {/* Masthead */}
      <div style={{
        borderBottom: '2px solid var(--c-fg)', padding: '22px 40px',
        display: 'flex', justifyContent: 'space-between', alignItems: 'baseline',
        background: 'var(--c-bg)',
      }}>
        <div style={{ display: 'flex', alignItems: 'baseline', gap: 16 }}>
          <span style={{ fontFamily: 'var(--f-display)', fontSize: 26, fontStyle: 'italic' }}>Accelerator X</span>
          <span style={{ fontSize: 10, letterSpacing: '0.16em', textTransform: 'uppercase', color: 'var(--c-fg-muted)' }}>
            Issue 04 · May 2026
          </span>
        </div>
        <nav style={{ display: 'flex', gap: 24, fontSize: 13 }}>
          {['What we do', 'How we work', 'Insights', 'Resources', 'About', 'Contact'].map(l => (
            <span key={l}>{l}</span>
          ))}
        </nav>
        <span className="btn btn-pink" style={{ fontSize: 11 }}>Apply</span>
      </div>

      {/* HERO — asymmetric editorial */}
      <section style={{ padding: '80px 40px 64px', position: 'relative' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto', display: 'grid', gridTemplateColumns: '64px 1fr 320px', gap: 40, alignItems: 'start' }}>
          {/* Vertical date stamp */}
          <div style={{
            writingMode: 'vertical-rl', transform: 'rotate(180deg)',
            fontFamily: 'var(--f-mono)', fontSize: 10, letterSpacing: '0.2em', textTransform: 'uppercase',
            color: 'var(--c-fg-muted)',
            display: 'flex', justifyContent: 'flex-end', alignSelf: 'stretch', height: 360,
          }}>
            <span>For the leaders · 2026 — Cover Feature</span>
          </div>

          <div style={{ minWidth: 0 }}>
            <div className="eyebrow">No. 01 — Cover feature</div>
            <h1 className="h-display" style={{ fontSize: 132, margin: '12px 0 0', lineHeight: 0.88 }}>
              For leaders<br/>who are <em style={{ color: 'var(--c-accent)' }}>done<br/>waiting.</em>
            </h1>
          </div>

          {/* Right column — lede + meta */}
          <div style={{ paddingTop: 60 }}>
            <p style={{
              fontFamily: 'var(--f-display)', fontStyle: 'italic',
              fontSize: 22, lineHeight: 1.35, color: 'var(--c-fg)', margin: 0,
            }}>
              The hype is over. The work is now.
            </p>
            <p style={{ fontSize: 13.5, lineHeight: 1.6, color: 'var(--c-fg-muted)', margin: '22px 0 0' }}>
              {COPY.heroSub}
            </p>
            <div style={{ marginTop: 28, display: 'flex', flexDirection: 'column', gap: 10 }}>
              <span className="btn btn-pink" style={{ alignSelf: 'flex-start' }}>Apply to work with us</span>
              <span style={{ fontSize: 12, color: 'var(--c-fg-muted)' }}>From £2,000 + VAT. <em>Risk-free start.</em></span>
            </div>
          </div>
        </div>

        {/* Spread image */}
        <div style={{ maxWidth: 1200, margin: '64px auto 0', position: 'relative' }}>
          <ImgPh tag="Plate I · Workshop, Q1 2026" ratio="16/8" style={{ borderRadius: 0 }} />
          <div style={{
            position: 'absolute', left: 28, top: 24,
            background: 'var(--c-accent)', color: '#fff', padding: '4px 10px',
            fontFamily: 'var(--f-mono)', fontSize: 10, letterSpacing: '0.12em', textTransform: 'uppercase',
          }}>Plate I</div>
        </div>
      </section>

      {/* Section divider — colour bar */}
      <div style={{ height: 12, background: 'var(--c-fg)' }} />

      {/* PROBLEM — letter-style */}
      <section style={{ padding: '96px 40px', background: 'var(--c-bg-alt)' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto', display: 'grid', gridTemplateColumns: '320px 1fr', gap: 80, alignItems: 'start' }}>
          <div>
            <div className="eyebrow">No. 02 — A letter</div>
            <h2 className="h-display" style={{ fontSize: 64, margin: '16px 0 0', lineHeight: 0.95 }}>
              You've <em style={{ color: 'var(--c-accent)' }}>tried.</em><br/>It hasn't worked.
            </h2>
          </div>
          <div>
            <p style={{
              fontFamily: 'var(--f-display)', fontStyle: 'italic',
              fontSize: 28, lineHeight: 1.3, color: 'var(--c-fg)', margin: 0,
            }}>
              Dear reader,
            </p>
            {COPY.problemBody.map((p, i) => (
              <p key={i} style={{
                fontSize: 16, lineHeight: 1.65, color: 'var(--c-fg)', margin: '18px 0 0',
                fontWeight: i === 2 ? 500 : 400,
                fontStyle: i === 2 ? 'italic' : 'normal',
                fontFamily: i === 2 ? 'var(--f-display)' : 'var(--f-body)',
                fontSize: i === 2 ? 22 : 16,
              }}>{p}</p>
            ))}
            <div style={{ marginTop: 28, fontFamily: 'var(--f-display)', fontStyle: 'italic', fontSize: 17, color: 'var(--c-fg-muted)' }}>
              — Toby & Andy, co-founders
            </div>
          </div>
        </div>
      </section>

      {/* DIFFERENTIATORS — three editorial spreads */}
      <section style={{ padding: '96px 40px' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
          <div className="eyebrow">No. 03 — Three principles</div>
          <h2 className="h-display" style={{ fontSize: 72, margin: '16px 0 60px', lineHeight: 0.95 }}>
            We're <em>not</em> an agency.<br/>We're <em>not</em> a consultancy.<br/>We're <em style={{ color: 'var(--c-accent)' }}>your partner.</em>
          </h2>

          {COPY.differentiators.map((d, i) => (
            <div key={d.title} style={{
              display: 'grid', gridTemplateColumns: '80px 1fr 1fr', gap: 40,
              padding: '36px 0', borderTop: '1px solid var(--c-fg)',
              borderBottom: i === COPY.differentiators.length - 1 ? '1px solid var(--c-fg)' : 'none',
              alignItems: 'baseline',
            }}>
              <div className="folio" style={{ fontSize: 48 }}>{String(i + 1).padStart(2, '0')}</div>
              <div>
                <div className="eyebrow" style={{ marginBottom: 10 }}>{d.kicker}</div>
                <h3 className="h-display" style={{ fontSize: 38, margin: 0, lineHeight: 1 }}>
                  {d.title.split(',').map((part, idx, arr) => (
                    <span key={idx}>{idx === 1 ? <em style={{ color: i === 0 ? 'var(--c-accent-2)' : i === 1 ? 'var(--c-accent)' : 'var(--c-accent-3)' }}>,{part}</em> : part}</span>
                  ))}
                </h3>
              </div>
              <p style={{ fontSize: 15, lineHeight: 1.6, color: 'var(--c-fg-muted)', margin: 0 }}>{d.body}</p>
            </div>
          ))}
        </div>
      </section>

      {/* OFFERINGS — Contents page */}
      <section style={{ padding: '96px 40px', background: 'var(--c-bg-deep)', color: 'var(--c-bg)' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
          <div style={{ fontFamily: 'var(--f-mono)', fontSize: 10, letterSpacing: '0.2em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.5)' }}>
            No. 04 — Contents
          </div>
          <h2 className="h-display" style={{ fontSize: 88, margin: '16px 0 48px', color: 'var(--c-bg)', lineHeight: 0.95 }}>
            Four <em style={{ color: 'var(--c-accent)' }}>ways</em><br/>to work with us.
          </h2>
          <div>
            {OFFERINGS_MENU.map((o, i) => (
              <div key={o.title} style={{
                display: 'grid', gridTemplateColumns: '80px 200px 1fr 160px',
                gap: 24, padding: '24px 0',
                borderTop: '1px solid rgba(255,255,255,0.15)',
                borderBottom: i === OFFERINGS_MENU.length - 1 ? '1px solid rgba(255,255,255,0.15)' : 'none',
                alignItems: 'baseline',
              }}>
                <span style={{
                  fontFamily: 'var(--f-display)', fontStyle: 'italic', fontSize: 36,
                  color: 'rgba(255,255,255,0.45)',
                }}>{String(i + 1).padStart(2, '0')}</span>
                <span style={{ fontFamily: 'var(--f-mono)', fontSize: 11, letterSpacing: '0.16em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.6)' }}>
                  {o.kicker}
                </span>
                <div>
                  <h3 className="h-display" style={{ fontSize: 32, margin: 0, color: 'var(--c-bg)', lineHeight: 1.05 }}>{o.title}</h3>
                  <p style={{ fontSize: 13.5, color: 'rgba(255,255,255,0.6)', margin: '6px 0 0' }}>{o.sub}</p>
                </div>
                <div style={{ textAlign: 'right' }}>
                  <div style={{ fontFamily: 'var(--f-mono)', fontSize: 13, color: 'var(--c-bg)' }}>{o.tag}</div>
                  <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.5)', marginTop: 4 }}>Read more →</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PROCESS — annotated diagram */}
      <section style={{ padding: '96px 40px' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
          <div className="eyebrow">No. 05 — A method</div>
          <h2 className="h-display" style={{ fontSize: 72, margin: '16px 0 60px', lineHeight: 0.95, maxWidth: 900 }}>
            From overwhelmed,<br/>to <em style={{ color: 'var(--c-accent)' }}>operational.</em>
          </h2>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 32 }}>
            {COPY.process.map((p, i) => (
              <div key={p.num} style={{ position: 'relative' }}>
                <div style={{
                  fontFamily: 'var(--f-display)', fontStyle: 'italic',
                  fontSize: 140, lineHeight: 0.85,
                  color: i === 0 ? 'var(--c-accent-2)' : i === 1 ? 'var(--c-accent)' : 'var(--c-accent-3)',
                  opacity: 0.95,
                }}>{p.num}</div>
                <h3 className="h-display" style={{ fontSize: 28, margin: '8px 0 14px', lineHeight: 1.05 }}>{p.title}</h3>
                <p style={{ fontSize: 14, lineHeight: 1.6, color: 'var(--c-fg-muted)', margin: 0 }}>{p.body}</p>
                <div style={{
                  marginTop: 18, paddingTop: 14, borderTop: '1px solid var(--c-line)',
                  fontFamily: 'var(--f-mono)', fontSize: 11, color: 'var(--c-fg)',
                }}>{p.price}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* TESTIMONIAL — feature spread */}
      <section style={{ padding: '120px 40px', background: 'var(--c-accent)', color: '#fff' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto' }}>
          <div style={{ fontFamily: 'var(--f-mono)', fontSize: 10, letterSpacing: '0.2em', textTransform: 'uppercase' }}>
            No. 06 — In their words
          </div>
          <blockquote style={{
            margin: '24px 0 0',
            fontFamily: 'var(--f-display)',
            fontSize: 56, lineHeight: 1.1, letterSpacing: '-0.015em',
            fontWeight: 400, fontStyle: 'italic',
          }}>
            "{COPY.testimonials[0].quote}"
          </blockquote>
          <div style={{ marginTop: 36, display: 'flex', gap: 14, alignItems: 'center' }}>
            <AvatarPh size={48} style={{ background: 'rgba(255,255,255,0.25)' }} />
            <div>
              <div style={{ fontSize: 14, fontWeight: 500 }}>{COPY.testimonials[0].who}</div>
              <div style={{ fontSize: 12, opacity: 0.75 }}>{COPY.testimonials[0].role}</div>
            </div>
          </div>
        </div>
      </section>

      {/* INSIGHTS — magazine grid */}
      <section style={{ padding: '96px 40px' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: 40 }}>
            <div>
              <div className="eyebrow">No. 07 — Dispatch</div>
              <h2 className="h-display" style={{ fontSize: 64, margin: '16px 0 0', lineHeight: 0.95 }}>
                From the <em style={{ color: 'var(--c-accent)' }}>dispatch.</em>
              </h2>
            </div>
            <span style={{ fontFamily: 'var(--f-display)', fontStyle: 'italic', fontSize: 18, color: 'var(--c-fg)' }}>
              See the archive →
            </span>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1.5fr 1fr', gap: 48 }}>
            {/* Feature */}
            <div>
              <ImgPh tag="Feature cover" ratio="3/2" style={{ borderRadius: 0 }} />
              <div className="eyebrow" style={{ marginTop: 20 }}>{COPY.insights[0].kicker}</div>
              <h3 className="h-display" style={{ fontSize: 48, margin: '14px 0 14px', lineHeight: 0.98 }}>
                {COPY.insights[0].title}
              </h3>
              <p style={{ fontSize: 15, color: 'var(--c-fg-muted)', lineHeight: 1.55, margin: 0 }}>
                {COPY.insights[0].sub}
              </p>
            </div>
            <div>
              {COPY.insights.slice(1).map((a, i) => (
                <div key={a.title} style={{ borderTop: i === 0 ? '1px solid var(--c-fg)' : '1px solid var(--c-line)', padding: '20px 0' }}>
                  <div className="eyebrow" style={{ fontSize: 9 }}>{a.kicker}</div>
                  <h4 className="h-display" style={{ fontSize: 26, margin: '8px 0 6px', lineHeight: 1.05 }}>{a.title}</h4>
                  <p style={{ fontSize: 13, color: 'var(--c-fg-muted)', margin: 0 }}>{a.sub}</p>
                </div>
              ))}
              <div style={{ borderTop: '1px solid var(--c-line)' }} />
            </div>
          </div>
        </div>
      </section>

      {/* CTA — closing column */}
      <section style={{ padding: '120px 40px', textAlign: 'center', background: 'var(--c-bg-alt)' }}>
        <div style={{ maxWidth: 720, margin: '0 auto' }}>
          <div className="eyebrow" style={{ justifyContent: 'center' }}>Colophon</div>
          <h2 className="h-display" style={{ fontSize: 80, margin: '24px 0', lineHeight: 0.95 }}>
            If you're <em style={{ color: 'var(--c-accent)' }}>done<br/>waiting</em> — let's begin.
          </h2>
          <p style={{ fontSize: 15, color: 'var(--c-fg-muted)', margin: '0 auto 32px', maxWidth: 460, fontFamily: 'var(--f-display)', fontStyle: 'italic', fontSize: 20, lineHeight: 1.4 }}>
            Two or three new engagements per quarter. Most start with a half-day Activation.
          </p>
          <div style={{ display: 'flex', gap: 12, justifyContent: 'center' }}>
            <span className="btn btn-pink">Apply to work with us</span>
            <span className="btn btn-outline">Take the readiness quiz</span>
          </div>
        </div>
      </section>

      <FooterC />
    </Board>
  );
}

/* ═════════════════════════════════════════════════════════════════════
   DIRECTION D — INDEX
   Reference manual. Numbered, monospaced, library-card hierarchy.
   ═════════════════════════════════════════════════════════════════════ */
function HomeD() {
  const Rule = ({ strong, dark }) => (
    <div style={{ height: 1, background: strong ? 'var(--c-fg)' : 'var(--c-line)', opacity: dark ? 0.3 : 1 }} />
  );
  return (
    <Board dir="d" scroll>
      {/* Top bar */}
      <div style={{ borderBottom: '1px solid var(--c-rule)', padding: '14px 36px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: 'var(--c-bg)' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
          <span style={{ fontFamily: 'var(--f-mono)', fontSize: 13, fontWeight: 600 }}>AX</span>
          <span style={{ fontFamily: 'var(--f-mono)', fontSize: 10, color: 'var(--c-fg-muted)', letterSpacing: '0.08em' }}>
            ACCELERATOR-X.AI / INDEX / 2026
          </span>
        </div>
        <nav style={{ display: 'flex', gap: 18, fontFamily: 'var(--f-mono)', fontSize: 11 }}>
          {[['§01', 'What we do'], ['§02', 'How we work'], ['§03', 'Insights'], ['§04', 'Resources'], ['§05', 'About'], ['§06', 'Contact']].map(([num, label]) => (
            <span key={label}><span style={{ opacity: 0.55, marginRight: 4 }}>{num}</span>{label}</span>
          ))}
        </nav>
        <span className="btn btn-primary">Apply →</span>
      </div>

      {/* HERO — split: prose + data sidebar */}
      <section style={{ padding: '64px 36px' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto', display: 'grid', gridTemplateColumns: '1fr 280px', gap: 40, alignItems: 'start' }}>
          <div>
            <div className="eyebrow">§00 · COVER · 2026.05</div>
            <h1 className="h-display" style={{ fontSize: 84, margin: '20px 0 0', lineHeight: 0.98, maxWidth: 980 }}>
              An operating manual<br/>for AI transformation.
            </h1>
            <p style={{ fontSize: 17, lineHeight: 1.55, color: 'var(--c-fg-muted)', margin: '32px 0 0', maxWidth: 640 }}>
              AI transformation for leaders who are done waiting. Tools, skills, and systems that make AI work in the real world. We work alongside you until it's actually working.
            </p>
            <div style={{ marginTop: 32, display: 'flex', gap: 10 }}>
              <span className="btn btn-primary">Apply to work with us</span>
              <span className="btn btn-outline">See offerings →</span>
            </div>
          </div>

          {/* Data sidebar */}
          <div style={{ border: '1px solid var(--c-rule)', padding: 18, background: 'var(--c-bg-alt)' }}>
            <div style={{ fontFamily: 'var(--f-mono)', fontSize: 10, letterSpacing: '0.12em', color: 'var(--c-fg-muted)', marginBottom: 14 }}>
              DOSSIER
            </div>
            {[
              ['Founded', '2025'],
              ['Founders', '2 (Toby, Andy)'],
              ['Engagements / qtr', '2–3 new'],
              ['Avg cycle ROI', '10× invested'],
              ['Sectors', '£10–100M mid-market'],
              ['Pricing from', '£2,000 + VAT'],
              ['Risk', 'No-value, no-pay'],
            ].map(([k, v]) => (
              <div key={k} style={{
                display: 'flex', justifyContent: 'space-between', padding: '8px 0',
                borderBottom: '1px solid var(--c-line)',
                fontFamily: 'var(--f-mono)', fontSize: 11,
              }}>
                <span style={{ color: 'var(--c-fg-muted)' }}>{k}</span>
                <span>{v}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Trust bar */}
        <div style={{ maxWidth: 1200, margin: '64px auto 0', borderTop: '1px solid var(--c-rule)', borderBottom: '1px solid var(--c-rule)', padding: '20px 0', display: 'flex', alignItems: 'center', gap: 32, flexWrap: 'wrap' }}>
          <span style={{ fontFamily: 'var(--f-mono)', fontSize: 10, letterSpacing: '0.14em', color: 'var(--c-fg-muted)' }}>
            FORMER OPERATORS FROM
          </span>
          {COPY.trust.map(t => (
            <span key={t} style={{ fontFamily: 'var(--f-mono)', fontSize: 12 }}>{t}</span>
          ))}
        </div>
      </section>

      {/* §01 PROBLEM */}
      <section style={{ padding: '80px 36px', background: 'var(--c-bg-alt)' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '200px 1fr', gap: 60, alignItems: 'start' }}>
            <div>
              <div className="eyebrow">§01 · THE PROBLEM</div>
              <div style={{ marginTop: 18, fontFamily: 'var(--f-mono)', fontSize: 10, color: 'var(--c-fg-muted)' }}>
                pp. 04–05
              </div>
            </div>
            <div>
              <h2 className="h-display" style={{ fontSize: 56, margin: 0, lineHeight: 0.98 }}>
                You've tried. It hasn't worked.
              </h2>
              <div style={{ marginTop: 28, display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 28 }}>
                {COPY.problemBody.map((p, i) => (
                  <p key={i} style={{
                    fontSize: 14, lineHeight: 1.6, color: 'var(--c-fg)',
                    gridColumn: i === 2 ? 'span 2' : 'auto',
                    fontWeight: i === 2 ? 500 : 400,
                    margin: 0,
                    borderTop: '1px solid var(--c-line)', paddingTop: 14,
                  }}>{p}</p>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* §02 DIFFERENTIATORS — table */}
      <section style={{ padding: '80px 36px' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '200px 1fr', gap: 60, alignItems: 'start' }}>
            <div>
              <div className="eyebrow">§02 · PRINCIPLES</div>
              <div style={{ marginTop: 18, fontFamily: 'var(--f-mono)', fontSize: 10, color: 'var(--c-fg-muted)' }}>
                pp. 06–07
              </div>
            </div>
            <div>
              <h2 className="h-display" style={{ fontSize: 56, margin: 0, lineHeight: 0.98 }}>
                Not an agency. Not a consultancy. Your partner.
              </h2>
              <div style={{ marginTop: 36 }}>
                {COPY.differentiators.map((d, i) => (
                  <div key={d.title} style={{
                    display: 'grid', gridTemplateColumns: '60px 200px 1fr', gap: 24,
                    padding: '22px 0', borderTop: '1px solid var(--c-line)',
                    borderBottom: i === COPY.differentiators.length - 1 ? '1px solid var(--c-line)' : 'none',
                    alignItems: 'baseline',
                  }}>
                    <span style={{ fontFamily: 'var(--f-mono)', fontSize: 11, color: 'var(--c-fg-muted)' }}>
                      02.{String(i + 1).padStart(2, '0')}
                    </span>
                    <h3 className="h-display" style={{ fontSize: 22, margin: 0, letterSpacing: '-0.02em' }}>
                      {d.title}
                    </h3>
                    <p style={{ fontSize: 14, lineHeight: 1.6, color: 'var(--c-fg-muted)', margin: 0 }}>
                      {d.body}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* §03 OFFERINGS — pricing table */}
      <section style={{ padding: '80px 36px', background: 'var(--c-bg-alt)' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '200px 1fr', gap: 60, alignItems: 'start' }}>
            <div>
              <div className="eyebrow">§03 · WHAT WE DO</div>
              <div style={{ marginTop: 18, fontFamily: 'var(--f-mono)', fontSize: 10, color: 'var(--c-fg-muted)' }}>pp. 08–11</div>
            </div>
            <div>
              <h2 className="h-display" style={{ fontSize: 56, margin: 0, lineHeight: 0.98 }}>
                Four offerings.
              </h2>
              <p style={{ fontSize: 14, color: 'var(--c-fg-muted)', margin: '18px 0 0', maxWidth: 540 }}>
                Pick the depth of commitment. Each starts with the same half-day Activation session.
              </p>

              {/* Pricing table header */}
              <div style={{
                marginTop: 32,
                display: 'grid',
                gridTemplateColumns: '40px 110px 1fr 100px 100px 24px',
                gap: 16,
                fontFamily: 'var(--f-mono)', fontSize: 10, letterSpacing: '0.1em', color: 'var(--c-fg-muted)',
                padding: '0 0 10px',
                borderBottom: '1px solid var(--c-fg)',
              }}>
                <span>NO.</span>
                <span>CATEGORY</span>
                <span>OFFERING</span>
                <span style={{ textAlign: 'right' }}>FROM</span>
                <span style={{ textAlign: 'right' }}>DURATION</span>
                <span />
              </div>
              {OFFERINGS_MENU.map((o, i) => {
                const dur = ['Half-day', '8 weeks', '12 weeks', 'Monthly'];
                return (
                  <div key={o.title} style={{
                    display: 'grid',
                    gridTemplateColumns: '40px 110px 1fr 100px 100px 24px',
                    gap: 16, alignItems: 'baseline',
                    padding: '20px 0', borderBottom: '1px solid var(--c-line)',
                  }}>
                    <span style={{ fontFamily: 'var(--f-mono)', fontSize: 11, color: 'var(--c-fg-muted)' }}>
                      03.{String(i + 1).padStart(2, '0')}
                    </span>
                    <span style={{ fontFamily: 'var(--f-mono)', fontSize: 11, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--c-fg-muted)' }}>
                      {o.kicker}
                    </span>
                    <div>
                      <div style={{ fontSize: 16, fontWeight: 500 }}>{o.title}</div>
                      <div style={{ fontSize: 12.5, color: 'var(--c-fg-muted)', marginTop: 3 }}>{o.sub}</div>
                    </div>
                    <span style={{ fontFamily: 'var(--f-mono)', fontSize: 13, textAlign: 'right', fontWeight: 500 }}>{o.tag}</span>
                    <span style={{ fontFamily: 'var(--f-mono)', fontSize: 11, textAlign: 'right', color: 'var(--c-fg-muted)' }}>{dur[i]}</span>
                    <span style={{ fontSize: 14, color: 'var(--c-fg-muted)' }}>→</span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* §04 PROCESS */}
      <section style={{ padding: '80px 36px' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '200px 1fr', gap: 60, alignItems: 'start' }}>
            <div>
              <div className="eyebrow">§04 · HOW IT WORKS</div>
              <div style={{ marginTop: 18, fontFamily: 'var(--f-mono)', fontSize: 10, color: 'var(--c-fg-muted)' }}>pp. 12–13</div>
            </div>
            <div>
              <h2 className="h-display" style={{ fontSize: 56, margin: 0, lineHeight: 0.98 }}>
                From overwhelmed to operational.
              </h2>
              <div style={{ marginTop: 36, display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 28 }}>
                {COPY.process.map((p, i) => (
                  <div key={p.num} style={{ borderTop: '2px solid var(--c-fg)', paddingTop: 16 }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: 12 }}>
                      <span style={{ fontFamily: 'var(--f-mono)', fontSize: 11, letterSpacing: '0.1em', color: 'var(--c-fg-muted)' }}>STEP 04.{p.num}</span>
                      <span style={{ fontFamily: 'var(--f-mono)', fontSize: 11, color: 'var(--c-accent)' }}>{p.price}</span>
                    </div>
                    <h3 className="h-display" style={{ fontSize: 21, margin: '0 0 10px', lineHeight: 1.15 }}>{p.title}</h3>
                    <p style={{ fontSize: 13.5, lineHeight: 1.55, color: 'var(--c-fg-muted)', margin: 0 }}>{p.body}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* §05 TESTIMONIALS — indexed entries */}
      <section style={{ padding: '80px 36px', background: 'var(--c-bg-alt)' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '200px 1fr', gap: 60, alignItems: 'start' }}>
            <div>
              <div className="eyebrow">§05 · CITATIONS</div>
              <div style={{ marginTop: 18, fontFamily: 'var(--f-mono)', fontSize: 10, color: 'var(--c-fg-muted)' }}>pp. 14–15</div>
            </div>
            <div>
              <h2 className="h-display" style={{ fontSize: 56, margin: 0, lineHeight: 0.98 }}>
                What our clients say.
              </h2>
              <div style={{ marginTop: 32 }}>
                {COPY.testimonials.map((t, i) => (
                  <div key={t.who} style={{
                    padding: '24px 0', borderTop: '1px solid var(--c-line)',
                    borderBottom: i === COPY.testimonials.length - 1 ? '1px solid var(--c-line)' : 'none',
                    display: 'grid', gridTemplateColumns: '40px 1fr 220px', gap: 24,
                    alignItems: 'baseline',
                  }}>
                    <span style={{ fontFamily: 'var(--f-mono)', fontSize: 11, color: 'var(--c-fg-muted)' }}>
                      05.{String(i + 1).padStart(2, '0')}
                    </span>
                    <p style={{ fontSize: 17, lineHeight: 1.45, margin: 0, color: 'var(--c-fg)' }}>"{t.quote}"</p>
                    <div style={{ fontFamily: 'var(--f-mono)', fontSize: 11, color: 'var(--c-fg-muted)' }}>
                      <div style={{ color: 'var(--c-fg)' }}>{t.who}</div>
                      <div>{t.role}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* §06 INSIGHTS — indexed */}
      <section style={{ padding: '80px 36px' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '200px 1fr', gap: 60, alignItems: 'start' }}>
            <div>
              <div className="eyebrow">§06 · INSIGHTS</div>
              <div style={{ marginTop: 18, fontFamily: 'var(--f-mono)', fontSize: 10, color: 'var(--c-fg-muted)' }}>pp. 16–17</div>
            </div>
            <div>
              <h2 className="h-display" style={{ fontSize: 56, margin: 0, lineHeight: 0.98 }}>
                Field notes from the work.
              </h2>
              {/* Table header */}
              <div style={{
                marginTop: 32,
                display: 'grid', gridTemplateColumns: '40px 100px 1fr 120px 24px',
                gap: 16, padding: '0 0 10px',
                borderBottom: '1px solid var(--c-fg)',
                fontFamily: 'var(--f-mono)', fontSize: 10, letterSpacing: '0.1em', color: 'var(--c-fg-muted)',
              }}>
                <span>NO.</span>
                <span>TYPE</span>
                <span>TITLE</span>
                <span style={{ textAlign: 'right' }}>DATE</span>
                <span />
              </div>
              {COPY.insights.map((art, i) => (
                <div key={art.title} style={{
                  display: 'grid', gridTemplateColumns: '40px 100px 1fr 120px 24px',
                  gap: 16, padding: '18px 0', borderBottom: '1px solid var(--c-line)',
                  alignItems: 'baseline',
                }}>
                  <span style={{ fontFamily: 'var(--f-mono)', fontSize: 11, color: 'var(--c-fg-muted)' }}>06.{String(i+1).padStart(2,'0')}</span>
                  <span style={{ fontFamily: 'var(--f-mono)', fontSize: 10.5, letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--c-fg-muted)' }}>
                    {art.kicker.split('·')[0].trim()}
                  </span>
                  <div>
                    <div style={{ fontSize: 15, fontWeight: 500 }}>{art.title}</div>
                    <div style={{ fontSize: 12.5, color: 'var(--c-fg-muted)', marginTop: 3 }}>{art.sub}</div>
                  </div>
                  <span style={{ fontFamily: 'var(--f-mono)', fontSize: 11, textAlign: 'right', color: 'var(--c-fg-muted)' }}>
                    {art.kicker.split('·')[1]?.trim()}
                  </span>
                  <span style={{ fontSize: 14, color: 'var(--c-fg-muted)' }}>→</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* §07 APPLY */}
      <section style={{ padding: '96px 36px', background: 'var(--c-fg)', color: 'var(--c-bg)' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: 64, alignItems: 'start' }}>
            <div>
              <div style={{ fontFamily: 'var(--f-mono)', fontSize: 10, letterSpacing: '0.14em', color: 'rgba(255,255,255,0.55)' }}>
                §07 · APPLY · NOW BOOKING Q3
              </div>
              <h2 className="h-display" style={{ fontSize: 72, margin: '20px 0 0', color: 'var(--c-bg)', lineHeight: 0.96 }}>
                Ready when you are.
              </h2>
              <p style={{ fontSize: 15, lineHeight: 1.55, color: 'rgba(255,255,255,0.7)', margin: '24px 0 0', maxWidth: 460 }}>
                Two or three new engagements per quarter. Tell us where you are. We'll tell you whether we can help.
              </p>
            </div>
            <div style={{ background: 'var(--c-bg-alt)', color: 'var(--c-fg)', padding: 28, borderRadius: 6 }}>
              <div className="eyebrow" style={{ marginBottom: 16 }}>FORM 07.A · Application</div>
              {['Name', 'Work email', 'Company', 'Where are you stuck?'].map((label, i) => (
                <div key={label} style={{ marginBottom: 14 }}>
                  <div style={{ fontFamily: 'var(--f-mono)', fontSize: 10, color: 'var(--c-fg-muted)', marginBottom: 6, letterSpacing: '0.06em' }}>
                    {String(i+1).padStart(2,'0')} · {label.toUpperCase()}
                  </div>
                  <div style={{ height: i === 3 ? 64 : 36, background: 'var(--c-bg)', border: '1px solid var(--c-line)', borderRadius: 2 }} />
                </div>
              ))}
              <div className="btn btn-primary" style={{ width: '100%', justifyContent: 'center', marginTop: 8 }}>Submit application →</div>
            </div>
          </div>
        </div>
      </section>

      <FooterD />
    </Board>
  );
}

Object.assign(window, { HomeC, HomeD });
