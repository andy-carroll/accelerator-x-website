// wireframes/direction-a.jsx
// ────────────────────────────────────────────────────────────────────
// DIRECTION A · "The Operating Brief"
// Editorial restraint. Stripe Press / FT Weekend / Browser Co essays.
// Long reading rhythm, serif display, single warm accent (amber),
// minimal colour, prose-driven proof. Parallax = pinned portrait,
// type rolls past. The site reads like a manifesto.
// ────────────────────────────────────────────────────────────────────

const DIR_A = 'a';

/* ============================================================
   A1 · HOME
   ============================================================ */

function A_Home() {
  const tw = useTw();
  const headline = COPY.headlines[tw.tone][tw.headline] || COPY.headlines.confident[0];
  const heroV = tw.heroLayout;

  return (
    <Page dir={DIR_A} no="A.01" label="Home — The Operating Brief" url="/">
      <Nav dir={DIR_A} variant={tw.navStyle === 'classic' ? 'editorial' : tw.navStyle} active="What we do" />

      {/* ── HERO ────────────────────────────────────────────── */}
      <MotionZone label="parallax · portrait pins, type scrolls">
        <div style={{ padding: '64px 56px 48px', position: 'relative' }}>

          {/* Eyebrow + manifesto framing */}
          <div className="row between" style={{ marginBottom: 36 }}>
            <Eyebrow>Founder-led AI transformation · Est. 2025</Eyebrow>
            <Eyebrow>Issue №01 · 2026</Eyebrow>
          </div>

          {heroV === 'fullBleed' ? (
            <div style={{ position: 'relative', height: 360, marginBottom: 28 }}>
              <Img heavy label="full-bleed photo · workshop room" style={{ position: 'absolute', inset: 0 }} />
              <div style={{ position: 'absolute', inset: 0, padding: '40px 32px', display: 'flex', alignItems: 'flex-end' }}>
                <Head serif size={56} weight={500} style={{ color: '#fff', lineHeight: 1.02, maxWidth: 540, textShadow: '0 1px 14px rgba(0,0,0,0.55)' }}>
                  {headline.join(' ')}
                </Head>
              </div>
            </div>
          ) : (
            <div className="row gap-48 start" style={{ marginBottom: 30 }}>
              <div className={heroV === 'textLed' ? 'f1' : ''} style={{ flex: heroV === 'textLed' ? '1 1 0' : '1.4 1 0' }}>
                <Head serif size={62} weight={500} style={{ lineHeight: 0.98, letterSpacing: '-0.025em' }}>
                  {headline[0]}<br />
                  <span style={{ color: 'var(--ink-soft)', fontStyle: 'italic' }}>{headline[1]}</span><br />
                  {headline[2]}
                </Head>
              </div>
              {heroV === 'split' && (
                <div style={{ flex: '0.9 1 0', paddingTop: 8 }}>
                  <Img heavy label="founders portrait · b&w" h={260} style={{ borderRadius: 2 }} />
                  <div className="an-cap" style={{ marginTop: 8 }}>Toby Henry &amp; Andy Carroll · Co-founders</div>
                </div>
              )}
            </div>
          )}

          {/* Lead paragraph + CTAs */}
          <div className="row gap-48 start" style={{ marginTop: 28 }}>
            <div style={{ flex: '1.4 1 0' }}>
              <p className="serif" style={{ fontSize: 19, lineHeight: 1.45, color: 'var(--ink)', maxWidth: 520, margin: 0 }}>
                {COPY.lead[tw.tone]}
              </p>
              <div className="row gap-12" style={{ marginTop: 22 }}>
                <Btn lg acc fill>{COPY.cta[tw.tone]} →</Btn>
                <Btn lg>Read the brief</Btn>
              </div>
              <div className="muted small" style={{ marginTop: 14 }}>
                We start with a one-day workshop. From £5,000 + VAT. No obligation.
              </div>
            </div>
            <div className="f1" style={{ paddingTop: 4 }}>
              <Eyebrow style={{ marginBottom: 10 }}>By the numbers</Eyebrow>
              <div className="col gap-10">
                {[['8 wks', 'fixed sprint duration'], ['100%', 'led by partners, not associates'], ['1 day', 'to know if we\'re a fit']].map((s, i) => (
                  <div key={i} className="row between middle" style={{ borderTop: '1px solid var(--rule-faint)', paddingTop: 8 }}>
                    <span className="serif" style={{ fontSize: 22, fontWeight: 500 }}>{s[0]}</span>
                    <span className="muted small">{s[1]}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Margin annotations */}
          <Note top={68} right={-6} width={130} leader="bottom">
            <span style={{ fontFamily: 'var(--hand)', fontSize: 16 }}>Hero = manifesto.</span><br />
            Serif display, prose lead. No SaaS hero card.
          </Note>
          <Pin n="1" style={{ position: 'absolute', top: 110, left: 28 }} />
        </div>
      </MotionZone>

      <Rule />

      {/* ── TRUST STRIP ─────────────────────────────────────── */}
      <div style={{ padding: '20px 56px', position: 'relative' }}>
        <div className="row between middle">
          <Eyebrow>Trusted by operating leaders</Eyebrow>
          <span className="link tiny muted">5 of 6 clients renew →</span>
        </div>
        <TrustBar style={{ marginTop: 14 }} />
      </div>

      <Rule />

      {/* ── PROBLEM / PULL QUOTE ────────────────────────────── */}
      <div style={{ padding: '72px 56px', background: 'var(--paper-edge)', position: 'relative' }}>
        <SectionLabel>The problem</SectionLabel>
        <div className="row gap-48 start" style={{ marginTop: 18 }}>
          <div style={{ flex: '1.2 1 0' }}>
            <Head serif size={36} weight={500} style={{ lineHeight: 1.1 }}>
              {COPY.problem[tw.tone].h}
            </Head>
          </div>
          <div className="f1" style={{ paddingTop: 8 }}>
            <p className="serif" style={{ fontSize: 16, lineHeight: 1.55, margin: 0 }}>
              {COPY.problem[tw.tone].body}
            </p>
            <p className="serif" style={{ fontSize: 16, lineHeight: 1.55, marginTop: 12, color: 'var(--ink-soft)' }}>
              You don't need another deck. You need someone who'll work in the room until it's actually working.
            </p>
          </div>
        </div>
        <Note top={28} right={20} width={130}>
          <span style={{ fontFamily: 'var(--hand)', fontSize: 16 }}>Pull-quote section.</span><br />
          Pinned bg slows ~30% on scroll.
        </Note>
      </div>

      {/* ── DIFFERENTIATION (numbered manifesto) ────────────── */}
      <div style={{ padding: '80px 56px 56px' }}>
        <SectionLabel>How we're different</SectionLabel>
        <Head serif size={36} weight={500} style={{ marginTop: 12, marginBottom: 28, lineHeight: 1.1, maxWidth: 560 }}>
          We do four things differently — and one of them is the reason you'd hire us.
        </Head>
        <div className="col gap-0" style={{ borderTop: '1px solid var(--rule)' }}>
          {COPY.diff.points.map((p, i) => (
            <div key={i} className="row gap-32 start" style={{ padding: '22px 0', borderBottom: '1px solid var(--rule)' }}>
              <div className="serif mono" style={{ fontFamily: 'var(--mono)', fontSize: 11, color: 'var(--acc)', width: 60, paddingTop: 6 }}>0{i+1}</div>
              <div style={{ flex: '0 0 200px' }}>
                <Head serif size={22} weight={600}>{p[0]}</Head>
                {i === 0 && <div className="an" style={{ marginTop: 4 }}><span className="an-underline">THE</span> headline.</div>}
              </div>
              <div className="f1 serif" style={{ fontSize: 14.5, lineHeight: 1.55, color: 'var(--ink-soft)' }}>{p[1]}</div>
            </div>
          ))}
        </div>
      </div>

      {/* ── HOW WE WORK ─────────────────────────────────────── */}
      <div style={{ padding: '60px 56px', background: 'var(--paper-edge)', position: 'relative' }}>
        <div className="row between middle">
          <SectionLabel>The process</SectionLabel>
          <span className="muted tiny mono">3 phases · 8 weeks · fixed scope</span>
        </div>
        <Head serif size={36} weight={500} style={{ marginTop: 10, marginBottom: 28, maxWidth: 580, lineHeight: 1.1 }}>
          A clear path from overwhelmed to operational.
        </Head>
        <div className="row gap-24 start">
          {COPY.process.steps.map((s, i) => (
            <div key={i} className="f1 col gap-10">
              <div className="row between middle">
                <span className="serif" style={{ fontSize: 32, fontWeight: 500, color: 'var(--acc)' }}>{i+1}</span>
                <span className="mono tiny muted">{s[2]}</span>
              </div>
              <Head serif size={20} weight={600}>{s[0]}</Head>
              <p className="serif" style={{ fontSize: 13.5, lineHeight: 1.55, color: 'var(--ink-soft)', margin: 0 }}>{s[1]}</p>
              <span className="link mono tiny" style={{ color: 'var(--acc)', marginTop: 4 }}>→ Read the detail</span>
            </div>
          ))}
        </div>
      </div>

      {/* ── OFFERINGS ───────────────────────────────────────── */}
      <div style={{ padding: '72px 56px', position: 'relative' }}>
        <div className="row between middle">
          <SectionLabel>What we do</SectionLabel>
          <span className="link tiny mono">All offerings →</span>
        </div>
        <Head serif size={36} weight={500} style={{ marginTop: 10, marginBottom: 26, maxWidth: 560, lineHeight: 1.1 }}>
          Four shapes of partnership.
          <span style={{ color: 'var(--ink-soft)', fontStyle: 'italic' }}> One fits.</span>
        </Head>
        <div className="col gap-0" style={{ borderTop: '1px solid var(--rule)' }}>
          {COPY.offerings.items.map((o, i) => (
            <div key={i} className="row gap-24 start" style={{ padding: '20px 0', borderBottom: '1px solid var(--rule)' }}>
              <div style={{ flex: '0 0 200px' }}>
                <Head serif size={20} weight={600}>{o[0]}</Head>
                <div className="mono tiny" style={{ color: 'var(--acc)', marginTop: 6 }}>{o[2]}</div>
              </div>
              <div className="f1 serif" style={{ fontSize: 14, lineHeight: 1.55, color: 'var(--ink-soft)' }}>{o[1]}</div>
              <div style={{ flex: '0 0 auto', paddingTop: 4 }}>
                <Btn>Learn more →</Btn>
              </div>
            </div>
          ))}
        </div>
        <Note top={86} right={14} width={130}>
          <span className="hand" style={{ fontSize: 16 }}>Pricing anchored.</span><br />
          'from £X' on every offer.
        </Note>
      </div>

      {/* ── FEATURED INSIGHT ────────────────────────────────── */}
      <MotionZone label="parallax · subtle">
        <div style={{ padding: '64px 56px', background: 'var(--ink)', color: 'var(--paper)', position: 'relative' }}>
          <div className="row gap-48 start">
            <div style={{ flex: '0.8 1 0' }}>
              <Eyebrow style={{ color: 'var(--paper)', opacity: 0.6 }}>Featured essay · 10 min read</Eyebrow>
              <Head serif size={36} weight={500} style={{ color: 'var(--paper)', marginTop: 14, lineHeight: 1.1 }}>
                {COPY.insights.titles[0]}
              </Head>
              <p className="serif" style={{ color: 'var(--paper)', opacity: 0.78, fontSize: 14.5, lineHeight: 1.55, marginTop: 14, maxWidth: 380 }}>
                Why the gap between AI ambition and operating reality is wider in 2026 than it was in 2024 — and the three pre-conditions that close it.
              </p>
              <div className="row gap-10" style={{ marginTop: 18 }}>
                <Btn style={{ borderColor: 'var(--paper)', color: 'var(--paper)' }}>Read essay →</Btn>
                <Btn style={{ borderColor: 'var(--paper)', color: 'var(--paper)', opacity: 0.7 }}>All insights</Btn>
              </div>
            </div>
            <div className="f1 col gap-12">
              <Eyebrow style={{ color: 'var(--paper)', opacity: 0.6 }}>Latest dispatches</Eyebrow>
              {COPY.insights.titles.slice(1, 5).map((t, i) => (
                <div key={i} className="row gap-12 start" style={{ borderTop: '1px solid rgba(244,239,228,0.12)', paddingTop: 10 }}>
                  <span className="mono tiny" style={{ color: 'var(--paper)', opacity: 0.45, width: 32 }}>0{i+2}</span>
                  <span className="serif" style={{ color: 'var(--paper)', fontSize: 13.5, lineHeight: 1.3 }}>{t}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </MotionZone>

      {/* ── TESTIMONIAL ─────────────────────────────────────── */}
      <div style={{ padding: '72px 56px' }}>
        <SectionLabel>What our clients say</SectionLabel>
        <div className="row gap-48 start" style={{ marginTop: 16 }}>
          <div style={{ flex: '1.2 1 0' }}>
            <Head serif size={26} weight={500} style={{ lineHeight: 1.25, fontStyle: 'italic' }}>
              &ldquo;They didn't arrive with pre-built automations or a product to sell. They took time to understand the business — gave our leadership team confidence — then got us the result.&rdquo;
            </Head>
            <div className="mono tiny muted" style={{ marginTop: 18 }}>
              <b style={{ color: 'var(--ink)' }}>Mark Bennett</b> &nbsp;·&nbsp; CFO, Wittenrein Hering · former IPO board
            </div>
          </div>
          <div className="f1 col gap-12">
            {[['Alastair C.', 'CCO, Mercury Global'], ['David Carey', 'Fdr, Flexitime Coaching']].map((c, i) => (
              <div key={i} className="col gap-4" style={{ borderTop: '1px solid var(--rule)', paddingTop: 12 }}>
                <Lines count={3} widths={['xl','xl','m']} />
                <div className="mono tiny muted" style={{ marginTop: 6 }}><b style={{ color: 'var(--ink)' }}>{c[0]}</b> · {c[1]}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── ABOUT / FOUNDERS ────────────────────────────────── */}
      <div style={{ padding: '60px 56px', background: 'var(--paper-edge)' }}>
        <SectionLabel>Who we are</SectionLabel>
        <div className="row gap-32 start" style={{ marginTop: 18 }}>
          <div style={{ flex: '0 0 220px' }}>
            <Img label="founders · b&w portrait" h={240} style={{ borderRadius: 2 }} />
          </div>
          <div className="f1 col gap-10">
            <Head serif size={30} weight={500} style={{ lineHeight: 1.1, maxWidth: 460 }}>
              A partnership of two people who've spent their careers at the intersection of strategy and execution.
            </Head>
            <p className="serif" style={{ fontSize: 14.5, lineHeight: 1.55, color: 'var(--ink-soft)', margin: 0, maxWidth: 480 }}>
              Toby brings 20 years of senior management consulting with the UK's largest organisations. Andy is a product and AI specialist with 17+ years across startups, banking and consultancies. We don't subcontract.
            </p>
            <div className="row gap-10" style={{ marginTop: 6 }}>
              <Btn>About the founders →</Btn>
            </div>
          </div>
        </div>
      </div>

      {/* ── APPLY CTA ───────────────────────────────────────── */}
      <div style={{ padding: '80px 56px 96px', position: 'relative' }}>
        <Head serif size={48} weight={500} style={{ lineHeight: 1.05, maxWidth: 540 }}>
          Ready to stop waiting?
        </Head>
        <p className="serif" style={{ fontSize: 16, lineHeight: 1.55, color: 'var(--ink-soft)', maxWidth: 480, marginTop: 14 }}>
          We work with a small number of clients at any time. If you're serious about AI transformation, we'd love to hear from you.
        </p>
        <div className="row gap-12" style={{ marginTop: 22 }}>
          <Btn lg acc fill>{COPY.cta[tw.tone]} →</Btn>
          <Btn lg>Book a diagnostic call</Btn>
        </div>
        <Note top={24} right={18} width={140}>
          <span className="hand" style={{ fontSize: 16 }}>Restrained close.</span><br />
          No form on home. Form lives on /apply.
        </Note>
      </div>

      <Foot />
    </Page>
  );
}

/* ============================================================
   A2 · NAV + MEGA MENU (editorial)
   ============================================================ */

function A_Nav() {
  return (
    <Page dir={DIR_A} no="A.02" label="Navigation system" url="/  · nav open">
      <Nav dir={DIR_A} variant="editorial" active="What we do" />
      <MegaEditorial />
      <div style={{ padding: '320px 56px 40px' }}>
        <Note top={92} left={56} width={180}>
          <span className="hand" style={{ fontSize: 16 }}>Editorial mega-menu.</span><br />
          Featured essay anchors the panel.
          Tagline: <i>read first, click later.</i>
        </Note>

        <SectionLabel>Component spec · nav system</SectionLabel>
        <div className="row gap-32 start" style={{ marginTop: 24 }}>
          <div className="f1">
            <Head serif size={20} weight={600}>Desktop</Head>
            <Lines count={5} widths={['xl','l','xl','xl','m']} style={{ marginTop: 10 }} />
            <ul className="muted small" style={{ paddingLeft: 18, marginTop: 12, lineHeight: 1.6 }}>
              <li>Sticky after 64px scroll, condenses to 48px height</li>
              <li>Mega panel opens on hover &amp; keyboard focus</li>
              <li>Right CTA stays solid through scroll</li>
              <li>Logo wordmark uses brand X in accent only</li>
            </ul>
          </div>
          <div className="f1">
            <Head serif size={20} weight={600}>Mobile</Head>
            <div className="row gap-12" style={{ marginTop: 12 }}>
              <div className="sk-box" style={{ width: 130, height: 240, padding: 10, position: 'relative' }}>
                <div className="row between middle" style={{ fontSize: 9 }}>
                  <span style={{ fontWeight: 700 }}>AccX</span>
                  <span className="mono tiny">≡</span>
                </div>
                <Lines count={6} style={{ marginTop: 10 }} />
                <span className="an-cap" style={{ position: 'absolute', bottom: 6, left: 10 }}>collapsed</span>
              </div>
              <div className="sk-box" style={{ width: 130, height: 240, padding: 10, position: 'relative', background: 'rgba(180,83,9,0.04)' }}>
                <div className="row between middle" style={{ fontSize: 9 }}>
                  <span style={{ fontWeight: 700 }}>AccX</span>
                  <span className="mono tiny">✕</span>
                </div>
                <div className="col gap-6" style={{ marginTop: 10 }}>
                  <div className="serif" style={{ fontSize: 14 }}>What we do</div>
                  <div className="serif" style={{ fontSize: 14 }}>How we work</div>
                  <div className="serif" style={{ fontSize: 14, color: 'var(--acc)' }}>Insights</div>
                  <div className="serif" style={{ fontSize: 14 }}>Resources</div>
                  <div className="serif" style={{ fontSize: 14 }}>About</div>
                  <div className="serif" style={{ fontSize: 14 }}>Contact</div>
                </div>
                <span className="an-cap" style={{ position: 'absolute', bottom: 6, left: 10 }}>tap → drill</span>
              </div>
              <div className="sk-box" style={{ width: 130, height: 240, padding: 10, position: 'relative' }}>
                <div className="row middle gap-4" style={{ fontSize: 9 }}>
                  <span className="mono">←</span><span>What we do</span>
                </div>
                <Lines count={6} style={{ marginTop: 10 }} />
                <span className="an-cap" style={{ position: 'absolute', bottom: 6, left: 10 }}>level 2</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Foot />
    </Page>
  );
}

/* ============================================================
   A3 · OFFERINGS OVERVIEW
   ============================================================ */

function A_Offerings() {
  return (
    <Page dir={DIR_A} no="A.03" label="What we do" url="/what-we-do">
      <Nav dir={DIR_A} variant="editorial" active="What we do" />

      <div style={{ padding: '72px 56px 32px' }}>
        <Eyebrow>What we do</Eyebrow>
        <Head serif size={52} weight={500} style={{ marginTop: 14, lineHeight: 1.02, maxWidth: 600 }}>
          Four shapes of partnership. <span style={{ color: 'var(--ink-soft)', fontStyle: 'italic' }}>One fits.</span>
        </Head>
        <p className="serif" style={{ fontSize: 17, lineHeight: 1.5, color: 'var(--ink-soft)', maxWidth: 540, marginTop: 18 }}>
          Different leadership teams need different things. The work is always founder-led — what changes is the cadence, depth and commercial shape.
        </p>
      </div>

      <Rule />

      {/* List of offerings as long-form entries */}
      <div style={{ padding: '24px 56px' }}>
        {COPY.offerings.items.map((o, i) => (
          <div key={i} className="row gap-32 start" style={{ padding: '36px 0', borderBottom: '1px solid var(--rule)' }}>
            <div style={{ flex: '0 0 60px' }}>
              <span className="mono" style={{ color: 'var(--acc)', fontSize: 11 }}>0{i+1}</span>
            </div>
            <div style={{ flex: '0 0 240px' }}>
              <Head serif size={26} weight={600}>{o[0]}</Head>
              <div className="mono tiny" style={{ marginTop: 8, color: 'var(--acc)' }}>{o[2]}</div>
              <div className="row gap-6" style={{ marginTop: 14 }}>
                <Pill>{['8 weeks', '6 weeks', '3–6 months', '1 day'][i]}</Pill>
                <Pill>{['Cohort of 1', '6–12 leaders', 'Embedded', 'On-site'][i]}</Pill>
              </div>
            </div>
            <div className="f1 col gap-10">
              <p className="serif" style={{ fontSize: 15.5, lineHeight: 1.55, margin: 0 }}>{o[1]}</p>
              <div className="muted small" style={{ marginTop: 6 }}>
                <b style={{ color: 'var(--ink)' }}>Best for:</b> {['mid-market CEOs whose ops team is overwhelmed', 'leadership teams who need a shared vocabulary', 'companies post-pilot, pre-platform', 'leaders deciding whether to invest at all'][i]}.
              </div>
              <Btn style={{ alignSelf: 'flex-start', marginTop: 10 }}>Read the detail →</Btn>
            </div>
          </div>
        ))}
      </div>

      {/* Comparison strip */}
      <div style={{ padding: '40px 56px 60px' }}>
        <SectionLabel>How they compare</SectionLabel>
        <div className="sk-box" style={{ marginTop: 16, padding: 18, background: 'var(--paper-edge)' }}>
          <div className="row" style={{ borderBottom: '1px solid var(--rule)', paddingBottom: 8, fontSize: 10.5, fontFamily: 'var(--mono)', color: 'var(--ink-soft)', textTransform: 'uppercase', letterSpacing: '0.1em' }}>
            <span style={{ flex: '0 0 36%' }}>Offering</span>
            <span className="f1">Duration</span>
            <span className="f1">Cadence</span>
            <span className="f1">From</span>
            <span className="f1">Ideal first move</span>
          </div>
          {['Diagnostic Workshop', 'Transformation Programme', 'Leadership Cohort', 'Fractional AI Partner'].map((row, i) => (
            <div key={i} className="row" style={{ padding: '11px 0', borderBottom: '1px solid var(--rule-faint)', fontSize: 12, alignItems: 'center' }}>
              <span style={{ flex: '0 0 36%', fontWeight: 600 }}>{row}</span>
              <span className="f1 muted">{['1 day','8 weeks','6 weeks','3–6 mo'][i]}</span>
              <span className="f1 muted">{['On-site','Weekly + async','Weekly','2 days / wk'][i]}</span>
              <span className="f1 mono" style={{ color: 'var(--acc)' }}>{['£5k','£45k','£12k/seat','£18k/mo'][i]}</span>
              <span className="f1 muted">{i === 0 ? '✓ recommended' : ''}</span>
            </div>
          ))}
        </div>
        <Note top={16} right={-4} width={150}>
          <span className="hand" style={{ fontSize: 16 }}>Comparison = trust.</span><br />
          CEO can scan-decide in 20s.
        </Note>
      </div>

      <Foot />
    </Page>
  );
}

/* ============================================================
   A4 · OFFERING DETAIL (8-week programme)
   ============================================================ */

function A_OfferingDetail() {
  return (
    <Page dir={DIR_A} no="A.04" label="Offering detail · 8-week programme" url="/what-we-do/transformation-programme">
      <Nav dir={DIR_A} variant="editorial" active="What we do" />

      <div style={{ padding: '56px 56px 36px' }}>
        <span className="link tiny mono muted">← All offerings</span>
        <div className="row gap-48 start" style={{ marginTop: 18 }}>
          <div style={{ flex: '1.2 1 0' }}>
            <Eyebrow>Offering 02 · core programme</Eyebrow>
            <Head serif size={56} weight={500} style={{ marginTop: 12, lineHeight: 1.0, letterSpacing: '-0.02em' }}>
              Transformation Programme
            </Head>
            <p className="serif" style={{ fontSize: 18, lineHeight: 1.5, marginTop: 16, color: 'var(--ink-soft)', maxWidth: 480 }}>
              Eight weeks. Fixed scope. Founder-led. We install AI capability across leadership, operations and one chosen value stream — then we leave.
            </p>
            <div className="row gap-12" style={{ marginTop: 22 }}>
              <Btn lg acc fill>Apply to the next cohort →</Btn>
              <Btn lg>Download the brief</Btn>
            </div>
          </div>
          <div className="f1">
            <div className="sk-box" style={{ padding: 18 }}>
              <Eyebrow>At a glance</Eyebrow>
              <div className="col gap-8" style={{ marginTop: 12 }}>
                {[['Duration', '8 weeks'], ['Cadence', '2 sessions / week + async'], ['Format', 'Hybrid · on-site week 1 &amp; 8'], ['Investment', 'From £45,000 + VAT'], ['Guarantee', 'Money-back after week 1'], ['Next start', 'June 2026']].map((r, i) => (
                  <div key={i} className="row between middle" style={{ borderBottom: '1px solid var(--rule-faint)', paddingBottom: 6 }}>
                    <span className="muted small">{r[0]}</span>
                    <span className="small" style={{ fontWeight: 600 }} dangerouslySetInnerHTML={{ __html: r[1] }}></span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      <Rule />

      {/* Hero photo */}
      <MotionZone label="parallax · slow image">
        <Img heavy label="full-bleed photo · workshop" h={300} style={{ margin: 0, borderRadius: 0, borderLeft: 0, borderRight: 0 }} />
      </MotionZone>

      {/* Weekly schedule */}
      <div style={{ padding: '64px 56px' }}>
        <SectionLabel>Week by week</SectionLabel>
        <Head serif size={32} weight={500} style={{ marginTop: 10, marginBottom: 24, maxWidth: 540, lineHeight: 1.1 }}>
          What actually happens, week by week.
        </Head>
        <div className="col gap-0" style={{ borderTop: '1px solid var(--rule)' }}>
          {[
            ['1', 'Diagnostic', 'On-site. We map your AI surface, prioritise the bets that matter, and align your leadership team on one value stream.'],
            ['2–3', 'Foundations', 'Governance, data readiness, vendor shortlist. By end of week 3 you have a defensible plan.'],
            ['4–6', 'Build', 'We build alongside your team. Two production-ready use-cases in your operating context.'],
            ['7', 'Adoption', 'Trained champions, runbooks, comms plan. Your team owns it, not us.'],
            ['8', 'Handover', 'On-site close. Board-ready deck. 90-day operating plan. We leave.'],
          ].map((r, i) => (
            <div key={i} className="row gap-24 start" style={{ padding: '18px 0', borderBottom: '1px solid var(--rule)' }}>
              <div style={{ flex: '0 0 70px' }}>
                <span className="serif" style={{ fontSize: 26, color: 'var(--acc)', fontWeight: 500 }}>{r[0]}</span>
              </div>
              <div style={{ flex: '0 0 200px' }}>
                <Head serif size={18} weight={600}>{r[1]}</Head>
              </div>
              <div className="f1 serif" style={{ fontSize: 14, lineHeight: 1.55, color: 'var(--ink-soft)' }}>{r[2]}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Apply form summary */}
      <div style={{ padding: '64px 56px', background: 'var(--ink)', color: 'var(--paper)' }}>
        <div className="row gap-32 start">
          <div className="f1">
            <Eyebrow style={{ color: 'var(--paper)', opacity: 0.55 }}>Next cohort · June 2026</Eyebrow>
            <Head serif size={36} weight={500} style={{ color: 'var(--paper)', marginTop: 12, lineHeight: 1.1 }}>
              We work with a small number of clients. Apply.
            </Head>
            <p className="serif" style={{ color: 'var(--paper)', opacity: 0.8, fontSize: 15, lineHeight: 1.55, marginTop: 14, maxWidth: 420 }}>
              No obligation. No sales pitch. If we're not a fit we'll tell you in the first call.
            </p>
          </div>
          <div className="f1">
            <Btn lg style={{ background: 'var(--paper)', color: 'var(--ink)', borderColor: 'var(--paper)' }}>Apply now →</Btn>
          </div>
        </div>
      </div>

      <Foot />
    </Page>
  );
}

/* ============================================================
   A5 · HOW WE WORK
   ============================================================ */

function A_HowWeWork() {
  return (
    <Page dir={DIR_A} no="A.05" label="How we work" url="/how-we-work">
      <Nav dir={DIR_A} variant="editorial" active="How we work" />

      <div style={{ padding: '64px 56px 24px' }}>
        <Eyebrow>How we work</Eyebrow>
        <Head serif size={52} weight={500} style={{ marginTop: 12, lineHeight: 1.0, maxWidth: 640 }}>
          A method that respects your <i>time</i>, your <i>team</i> and your <i>balance sheet</i>.
        </Head>
        <p className="serif" style={{ fontSize: 17, lineHeight: 1.5, color: 'var(--ink-soft)', maxWidth: 540, marginTop: 18 }}>
          Most consultancies optimise for billable days. We optimise for the day you no longer need us. Here's how that shows up.
        </p>
      </div>

      <Rule />

      {/* Four principles */}
      <div style={{ padding: '56px 56px' }}>
        <SectionLabel>Four principles</SectionLabel>
        <div className="row gap-40 start" style={{ marginTop: 22 }}>
          {COPY.diff.points.map((p, i) => (
            <div key={i} className="f1 col gap-8">
              <span className="serif" style={{ fontSize: 40, color: 'var(--acc)', fontWeight: 500, lineHeight: 1 }}>0{i+1}</span>
              <Head serif size={20} weight={600} style={{ marginTop: 4 }}>{p[0]}</Head>
              <p className="serif" style={{ fontSize: 13.5, lineHeight: 1.55, color: 'var(--ink-soft)', margin: 0 }}>{p[1]}</p>
            </div>
          ))}
        </div>
      </div>

      <Rule />

      {/* Process strip */}
      <div style={{ padding: '60px 56px', background: 'var(--paper-edge)' }}>
        <SectionLabel>The three phases</SectionLabel>
        <Head serif size={32} weight={500} style={{ marginTop: 10, marginBottom: 24, maxWidth: 540, lineHeight: 1.1 }}>
          Workshop. Sprint. Partnership.
        </Head>
        <div className="row gap-24">
          {COPY.process.steps.map((s, i) => (
            <div key={i} className="f1 sk-box" style={{ padding: 22, background: 'var(--paper)' }}>
              <div className="row between middle">
                <span className="serif" style={{ fontSize: 28, color: 'var(--acc)' }}>{i+1}</span>
                <Pill style={{ borderColor: 'var(--acc)', color: 'var(--acc)' }}>{s[2]}</Pill>
              </div>
              <Head serif size={20} weight={600} style={{ marginTop: 12 }}>{s[0]}</Head>
              <p className="serif" style={{ fontSize: 13.5, lineHeight: 1.55, color: 'var(--ink-soft)', marginTop: 8 }}>{s[1]}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Operating principles list */}
      <div style={{ padding: '64px 56px' }}>
        <SectionLabel>Operating principles · the small print we live by</SectionLabel>
        <div className="col gap-0" style={{ marginTop: 18, borderTop: '1px solid var(--rule)' }}>
          {[
            'If we don\'t add value in week one, you don\'t pay for it.',
            'No deliverable leaves the room your team can\'t maintain.',
            'We won\'t take a brief we don\'t believe in. We\'ll tell you why.',
            'No subcontracting. The partner who sold the work runs the work.',
            'Every engagement ends with a handover — by design, not accident.',
            'We publish what we learn. The next client benefits from the last.',
          ].map((line, i) => (
            <div key={i} className="row gap-16 start" style={{ padding: '14px 0', borderBottom: '1px solid var(--rule)' }}>
              <span className="mono tiny" style={{ color: 'var(--acc)', width: 28, paddingTop: 4 }}>0{i+1}</span>
              <p className="serif" style={{ fontSize: 15, lineHeight: 1.5, margin: 0, flex: 1 }}>{line}</p>
            </div>
          ))}
        </div>
      </div>

      <Foot />
    </Page>
  );
}

Object.assign(window, { A_Home, A_Nav, A_Offerings, A_OfferingDetail, A_HowWeWork });
