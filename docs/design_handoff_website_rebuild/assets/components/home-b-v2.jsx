// home-b-v2.jsx — Rebuilt homepage for Direction B.
// New structure: hero · trust · problem · DOTS · two-doors · journey · why-us · events · proof · insights · apply.

function HomeBv2() {
  return (
    <Board dir="b" scroll>
      <PageBNav active="" />

      {/* 01 · HERO */}
      <section style={{ padding: '72px 32px 56px' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto', display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: 56, alignItems: 'center' }}>
          <div>
            <Chip dot>Now booking · Q3 2026 · 2–3 new engagements per quarter</Chip>
            <h1 className="h-display" style={{ fontSize: 84, margin: '24px 0 0', lineHeight: 0.95 }}>
              Stop buying tools.<br />Start building <span style={{ color: 'var(--c-accent)' }}>capability.</span>
            </h1>
            <p style={{ fontSize: 19, lineHeight: 1.5, color: 'var(--c-fg-muted)', margin: '24px 0 0', maxWidth: 560 }}>
              We build AI capability that compounds — owned by your people, embedded in your workflows.
            </p>
            <div style={{ marginTop: 32, display: 'flex', gap: 10, alignItems: 'center', flexWrap: 'wrap' }}>
              <span className="btn btn-primary">Start with Phase 0 →</span>
              <span className="btn btn-outline">For individual leaders →</span>
            </div>
            <div style={{ marginTop: 22, fontSize: 12.5, color: 'var(--c-fg-muted)' }}>
              <strong style={{ color: 'var(--c-fg)' }}>Phase 0 from £5,000 · 2 weeks.</strong> Risk-free start: if it isn't valuable, you don't pay.
            </div>
          </div>
          <div>
            <ImgPh tag="Workshop · founders + leadership team" ratio="4/5" style={{ borderRadius: 18 }} />
          </div>
        </div>
      </section>

      {/* 02 · TRUST */}
      <section style={{ padding: '20px 32px 0' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto', background: 'var(--c-bg-alt)', borderRadius: 14, padding: '22px 28px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 24, flexWrap: 'wrap' }}>
          <span className="eyebrow">Operators from</span>
          <div style={{ display: 'flex', gap: 28, flexWrap: 'wrap' }}>
            {COPY.trust.map((t) => <span key={t} style={{ fontSize: 13.5, fontWeight: 500, color: 'var(--c-fg-muted)' }}>{t}</span>)}
          </div>
        </div>
      </section>

      {/* 03 · PROBLEM */}
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

      {/* 04 · WE START WITH DOTS */}
      <section style={{ padding: '24px 32px 64px' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: 28 }}>
            <div>
              <Chip>Our method</Chip>
              <h2 className="h-display" style={{ fontSize: 56, margin: '20px 0 14px', lineHeight: 0.98 }}>We start with DOTS.</h2>
              <p style={{ fontSize: 16, color: 'var(--c-fg-muted)', lineHeight: 1.55, margin: 0, maxWidth: 720 }}>
                Every engagement opens with a DOTS session — <strong style={{ color: 'var(--c-fg)', fontWeight: 600 }}>Dream, Obstacles, Triage, Sequence</strong>. It's the fastest way we know to move a team from overwhelmed to aligned.
              </p>
            </div>
            <span style={{ fontSize: 13, color: 'var(--c-accent)', fontWeight: 500 }}>Read the DOTS method →</span>
          </div>
          <DotsBlock />
        </div>
      </section>

      {/* 05 · WHAT WE DO — TWO DOORS IN */}
      <section style={{ padding: '24px 32px 64px', background: 'var(--c-bg-alt)' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto', paddingTop: 40 }}>
          <Chip>What we do · Two doors in</Chip>
          <h2 className="h-display" style={{ fontSize: 56, margin: '20px 0 36px', lineHeight: 0.98 }}>Pick your starting point.</h2>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
            {/* LEFT — FOR YOUR BUSINESS */}
            <div className="panel" style={{ padding: 36, background: 'var(--c-bg)', display: 'flex', flexDirection: 'column', gap: 18 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', paddingBottom: 16, borderBottom: '1px solid var(--c-line)' }}>
                <div style={{ fontSize: 10.5, letterSpacing: '0.14em', textTransform: 'uppercase', color: 'var(--c-accent)', fontWeight: 600 }}>For your business</div>
                <div style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: 11, color: 'var(--c-fg-muted)' }}>01 / 02</div>
              </div>
              <h3 className="h-display" style={{ fontSize: 40, margin: 0, lineHeight: 1 }}>Company AI Enablement</h3>
              <div style={{ display: 'flex', gap: 14, fontSize: 12.5, color: 'var(--c-fg-muted)' }}>
                <span><strong style={{ color: 'var(--c-fg)', fontWeight: 600 }}>Phase Zero - 2 weeks</strong></span>
                <span>·</span>
                <span><strong style={{ color: 'var(--c-fg)', fontWeight: 600 }}>From £5,000</strong></span>
              </div>
              <p style={{ fontSize: 14.5, lineHeight: 1.6, color: 'var(--c-fg-muted)', margin: 0 }}>
                Three workshops plus an AI strategy playback. Aligns leadership, activates the team, and leaves you with a costed 90-day plan — whether you continue with us or not.
              </p>
              <div style={{ paddingTop: 16, borderTop: '1px solid var(--c-line)', marginTop: 'auto' }}>
                <div style={{ fontSize: 11, color: 'var(--c-fg-muted)', marginBottom: 10 }}>Then, when you're ready:</div>
                <div style={{ fontSize: 13.5, fontWeight: 500 }}>Phase 1+ Transformation Cycles <span style={{ color: 'var(--c-fg-muted)', fontWeight: 400 }}>· from £20k / 8 weeks</span></div>
              </div>
              <span className="btn btn-primary" style={{ alignSelf: 'flex-start', marginTop: 8 }}>See Company Enablement →</span>
            </div>

            {/* RIGHT — FOR YOURSELF */}
            <div className="panel" style={{ padding: 36, background: 'var(--c-bg)', display: 'flex', flexDirection: 'column', gap: 18 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', paddingBottom: 16, borderBottom: '1px solid var(--c-line)' }}>
                <div style={{ fontSize: 10.5, letterSpacing: '0.14em', textTransform: 'uppercase', color: 'var(--c-accent-2)', fontWeight: 600 }}>For yourself or your leadership team</div>
                <div style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: 11, color: 'var(--c-fg-muted)' }}>02 / 02</div>
              </div>
              <h3 className="h-display" style={{ fontSize: 40, margin: 0, lineHeight: 1 }}>Leadership AI Coaching</h3>
              <div style={{ display: 'flex', gap: 14, fontSize: 12.5, color: 'var(--c-fg-muted)' }}>
                <span><strong style={{ color: 'var(--c-fg)', fontWeight: 600 }}>8 weeks</strong></span>
                <span>·</span>
                <span><strong style={{ color: 'var(--c-fg)', fontWeight: 600 }}>From £3,500</strong></span>
              </div>
              <p style={{ fontSize: 14.5, lineHeight: 1.6, color: 'var(--c-fg-muted)', margin: 0 }}>1:1 or small cohorts of non-competing senior leaders. Workshops, peer accountability, and DOTS applied to your own context. The fastest way to build personal AI capability.

              </p>
              <div style={{ paddingTop: 16, borderTop: '1px solid var(--c-line)', marginTop: 'auto' }}>
                <div style={{ fontSize: 11, color: 'var(--c-fg-muted)', marginBottom: 10 }}>Available as:</div>
                <div style={{ fontSize: 13.5 }}>
                  <span style={{ fontWeight: 500 }}>1:1 or small group bootcamps</span> <span style={{ color: 'var(--c-fg-muted)' }}>· from £10k</span> · <span style={{ fontWeight: 500 }}>Executive Coaching</span> <span style={{ color: 'var(--c-fg-muted)' }}></span>
                </div>
              </div>
              <span className="btn btn-outline" style={{ alignSelf: 'flex-start', marginTop: 8 }}>See Coaching & Cohorts →</span>
            </div>
          </div>

          {/* Advisory strip */}
          <div className="panel" style={{ marginTop: 14, padding: '18px 26px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 18, background: 'var(--c-bg)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
              <div style={{ width: 36, height: 36, borderRadius: 8, background: 'rgba(254,167,0,0.14)', color: '#fea700', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'JetBrains Mono, monospace', fontWeight: 600, fontSize: 13 }}>03</div>
              <div>
                <div style={{ fontSize: 10.5, letterSpacing: '0.12em', textTransform: 'uppercase', color: '#a36e00', fontWeight: 600 }}>Already running AI internally?</div>
                <div style={{ fontSize: 14, fontWeight: 500, marginTop: 3 }}>We also offer Fractional AI Advisory — senior judgement in the room, monthly.</div>
              </div>
            </div>
            <span style={{ fontSize: 12.5, color: 'var(--c-accent)', fontWeight: 500 }}>See all services →</span>
          </div>
        </div>
      </section>

      {/* 06 · HOW IT WORKS — CORPORATE TIMELINE */}
      <section style={{ padding: '80px 32px' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
          <Chip>How it works · For businesses</Chip>
          <h2 className="h-display" style={{ fontSize: 48, margin: '20px 0 36px', lineHeight: 1, maxWidth: 720 }}>
            Phase 0 hands you a roadmap. Phase 1+ ships it.
          </h2>
          <div style={{
            display: 'grid',
            gridTemplateColumns: '0.85fr 0.08fr 1fr 0.08fr 1fr 0.08fr 0.5fr',
            gap: 8, alignItems: 'stretch'
          }}>
            <div className="panel" style={{ padding: 20, background: 'var(--c-bg-alt)', borderColor: 'var(--c-accent)' }}>
              <div style={{ fontSize: 10, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--c-accent)', fontWeight: 600 }}>Phase 0</div>
              <div style={{ fontFamily: 'var(--f-display)', fontSize: 22, fontWeight: 600, letterSpacing: '-0.02em', marginTop: 8 }}>2 weeks · from £5k</div>
              <div style={{ fontSize: 12, color: 'var(--c-fg-muted)', marginTop: 6, lineHeight: 1.45 }}>Two DOTS sessions + team activation + AI strategy playback</div>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 18, color: 'var(--c-fg-muted)' }}>→</div>
            <div className="panel" style={{ padding: 20 }}>
              <div style={{ fontSize: 10, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--c-fg)', fontWeight: 600 }}>Phase 1</div>
              <div style={{ fontFamily: 'var(--f-display)', fontSize: 22, fontWeight: 600, letterSpacing: '-0.02em', marginTop: 8 }}>8-week cycle · from £20k</div>
              <div style={{ fontSize: 12, color: 'var(--c-fg-muted)', marginTop: 6, lineHeight: 1.45 }}>Ship first AI capability with your team. Train internal operators.</div>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 18, color: 'var(--c-fg-muted)' }}>→</div>
            <div className="panel" style={{ padding: 20 }}>
              <div style={{ fontSize: 10, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--c-fg)', fontWeight: 600 }}>Phase 2…n</div>
              <div style={{ fontFamily: 'var(--f-display)', fontSize: 22, fontWeight: 600, letterSpacing: '-0.02em', marginTop: 8 }}>Sequential cycles</div>
              <div style={{ fontSize: 12, color: 'var(--c-fg-muted)', marginTop: 6, lineHeight: 1.45 }}>Each builds on the last. Run as many as the roadmap calls for.</div>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 18, color: 'var(--c-fg-muted)' }}>→</div>
            <div className="panel" style={{ padding: 20, background: 'rgba(254,167,0,0.08)', borderColor: '#fea700' }}>
              <div style={{ fontSize: 10, letterSpacing: '0.12em', textTransform: 'uppercase', color: '#a36e00', fontWeight: 600 }}>Advisory</div>
              <div style={{ fontFamily: 'var(--f-display)', fontSize: 22, fontWeight: 600, letterSpacing: '-0.02em', marginTop: 8 }}>Ongoing</div>
              <div style={{ fontSize: 12, color: 'var(--c-fg-muted)', marginTop: 6, lineHeight: 1.45 }}>When you're self-sufficient.</div>
            </div>
          </div>
          <div style={{ marginTop: 18, fontSize: 12.5, color: 'var(--c-fg-muted)' }}>
            For individual leaders and cohorts, the path is simpler — <span style={{ color: 'var(--c-accent)', fontWeight: 500 }}>see Coaching & Cohorts →</span>
          </div>
        </div>
      </section>

      {/* 07 · WHY US */}
      <section style={{ padding: '64px 32px', background: 'var(--c-bg-alt)' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
          <Chip>Why us</Chip>
          <h2 className="h-display" style={{ fontSize: 56, margin: '20px 0 36px', maxWidth: 760, lineHeight: 1 }}>
            Not an agency. Not a consultancy. <span style={{ color: 'var(--c-accent)' }}>Your partner.</span>
          </h2>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 14 }}>
            {[
            { kicker: 'Founder-led', title: 'Founder-led, always.', body: 'Toby and Andy in every session. No associates, no juniors running ghost-projects. The people you meet are the people who deliver.', accent: 'var(--c-accent)' },
            { kicker: 'People · Process · Product', title: 'We do all three.', body: 'We build the systems. We change the behaviour. We architect the strategy and stay until it ships. Most firms do one. We do all three — and the seams are where the value lives.', accent: '#fea700' },
            { kicker: 'Capability over dependency', title: 'The best outcome is you outgrow us.', body: 'We train your people, install systems that work without us, and step out when you\u2019re ready. We\u2019re not trying to lock you in — we\u2019re trying to get you self-sufficient.', accent: 'var(--c-accent-2)' }].
            map((d, i) =>
            <div key={d.title} className="panel" style={{ padding: 28, display: 'flex', flexDirection: 'column', gap: 14, background: 'var(--c-bg)' }}>
                <div style={{
                width: 44, height: 44, borderRadius: 10,
                background: `${d.accent}14`, color: d.accent,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontFamily: 'JetBrains Mono, monospace', fontWeight: 600, fontSize: 14
              }}>{String(i + 1).padStart(2, '0')}</div>
                <Chip>{d.kicker}</Chip>
                <h3 className="h-display" style={{ fontSize: 24, margin: 0, lineHeight: 1.1 }}>{d.title}</h3>
                <p style={{ fontSize: 14, lineHeight: 1.6, color: 'var(--c-fg-muted)', margin: 0 }}>{d.body}</p>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* 08 · TALKS & EVENTS RIBBON */}
      <section style={{ padding: '64px 32px', background: 'var(--c-fg)', color: 'var(--c-bg)' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto', display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: 48, alignItems: 'center' }}>
          <div>
            <Chip style={{ background: 'rgba(255,255,255,0.08)', borderColor: 'rgba(255,255,255,0.15)', color: 'var(--c-bg)' }}>Talks · Keynotes · AI Hackathons</Chip>
            <h2 className="h-display" style={{ fontSize: 56, margin: '20px 0 16px', color: 'var(--c-bg)', lineHeight: 1, maxWidth: 540 }}>
              Move a whole room <span style={{ color: 'var(--c-accent-2)' }}>in an afternoon.</span>
            </h2>
            <p style={{ fontSize: 15.5, lineHeight: 1.55, color: 'rgba(255,255,255,0.7)', margin: '0 0 28px', maxWidth: 520 }}>
              From conference keynotes to bespoke AI hackathons for senior partner groups. Live this week in Paris.
            </p>

            <div style={{ display: 'flex', gap: 0, marginBottom: 28 }}>
              {[['85', 'Partners in the room'], ['12', 'Working prototypes by 6pm'], ['2', 'Cities so far']].map(([n, l], i) =>
              <div key={l} style={{ padding: '0 24px', borderLeft: i > 0 ? '1px solid rgba(255,255,255,0.15)' : 'none', paddingLeft: i === 0 ? 0 : 24 }}>
                  <div style={{ fontFamily: 'var(--f-display)', fontSize: 36, fontWeight: 600, letterSpacing: '-0.03em', lineHeight: 1 }}>{n}</div>
                  <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.6)', marginTop: 6, letterSpacing: '0.04em' }}>{l}</div>
                </div>
              )}
            </div>

            <span className="btn btn-accent">Explore Talks & Events →</span>
          </div>
          <ImgPh tag="Claude Hackathon · London · May 2026" ratio="4/3" style={{ borderRadius: 14 }} />
        </div>
      </section>

      {/* 09 · PROOF — TESTIMONIALS + STATS */}
      <section style={{ padding: '64px 32px' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
          <Chip>Proof</Chip>
          <h2 className="h-display" style={{ fontSize: 48, margin: '20px 0 36px', lineHeight: 1 }}>What our clients say.</h2>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 14, marginBottom: 24 }}>
            {[
            { quote: 'More done in two weeks of Phase 0 than the previous twelve months of internal AI conversations.', who: 'CEO, £60M healthcare group', role: 'Phase 0, Q1 2026' },
            { quote: 'They walked in and asked sharper questions than my CTO. By Friday we had a roadmap that survived contact with reality.', who: 'COO, £45M retail group', role: '8-Week Cycle, Q1 2026' },
            { quote: 'We\u2019ve worked with two of the big four. Accelerator X delivered more in a single workshop than either did in eight weeks.', who: 'COO, financial services', role: 'Phase 0, Q4 2025' }].
            map((t, i) =>
            <div key={i} className="panel" style={{ padding: 24, display: 'flex', flexDirection: 'column', gap: 14 }}>
                <div style={{ fontSize: 13, color: 'var(--c-accent)' }}>★★★★★</div>
                <p style={{ fontSize: 14.5, lineHeight: 1.55, margin: 0, color: 'var(--c-fg)' }}>"{t.quote}"</p>
                <div style={{ marginTop: 'auto', paddingTop: 14, borderTop: '1px solid var(--c-line)', display: 'flex', alignItems: 'center', gap: 10 }}>
                  <AvatarPh size={32} />
                  <div>
                    <div style={{ fontSize: 12.5, fontWeight: 600 }}>{t.who}</div>
                    <div style={{ fontSize: 11, color: 'var(--c-fg-muted)' }}>{t.role}</div>
                  </div>
                </div>
                <span style={{ fontSize: 11.5, color: 'var(--c-accent)', fontWeight: 500 }}>Read the case →</span>
              </div>
            )}
          </div>

          {/* Stat ribbon */}
          <div className="panel" style={{ padding: '22px 28px', display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 24, background: 'var(--c-bg-alt)' }}>
            {[
            ['24', 'Engagements completed'],
            ['10×+', 'Average cycle ROI'],
            ['£4.2M', 'Client value delivered'],
            ['100%', 'Cycles shipped on time']].
            map(([n, l]) =>
            <div key={l}>
                <div style={{ fontFamily: 'var(--f-display)', fontSize: 32, fontWeight: 600, letterSpacing: '-0.03em', lineHeight: 1 }}>{n}</div>
                <div style={{ fontSize: 11.5, color: 'var(--c-fg-muted)', marginTop: 6, letterSpacing: '0.04em' }}>{l}</div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* 10 · INSIGHTS TEASER */}
      <section style={{ padding: '64px 32px', background: 'var(--c-bg-alt)' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: 28 }}>
            <div>
              <Chip>From the dispatch</Chip>
              <h2 className="h-display" style={{ fontSize: 36, margin: '18px 0 0' }}>Field notes from the work.</h2>
            </div>
            <span style={{ fontSize: 12.5, color: 'var(--c-accent)', fontWeight: 500 }}>Browse all →</span>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 14 }}>
            {COPY.insights.slice(0, 3).map((a) =>
            <article key={a.title} className="panel" style={{ padding: 0, overflow: 'hidden', display: 'flex', flexDirection: 'column', background: 'var(--c-bg)' }}>
                <ImgPh tag="Cover" ratio="16/9" />
                <div style={{ padding: 18, display: 'flex', flexDirection: 'column', gap: 8 }}>
                  <Chip style={{ fontSize: 10, alignSelf: 'flex-start' }}>{a.kicker}</Chip>
                  <h3 className="h-display" style={{ fontSize: 18, margin: 0, lineHeight: 1.2 }}>{a.title}</h3>
                  <p style={{ fontSize: 12.5, color: 'var(--c-fg-muted)', lineHeight: 1.5, margin: 0 }}>{a.sub}</p>
                </div>
              </article>
            )}
          </div>
        </div>
      </section>

      {/* 11 · APPLY */}
      <section style={{ padding: '64px 32px 96px' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
          <div className="panel-tint" style={{ padding: 56, textAlign: 'center', background: 'var(--c-fg)', color: 'var(--c-bg)' }}>
            <Chip style={{ background: 'rgba(255,255,255,0.08)', borderColor: 'rgba(255,255,255,0.15)', color: 'var(--c-bg)' }}>Apply</Chip>
            <h2 className="h-display" style={{ fontSize: 64, margin: '20px auto 12px', color: 'var(--c-bg)', maxWidth: 700, lineHeight: 1 }}>
              If you're done waiting, <span style={{ color: 'var(--c-accent)' }}>let's build.</span>
            </h2>
            <p style={{ fontSize: 14.5, color: 'rgba(255,255,255,0.65)', maxWidth: 500, margin: '0 auto 24px' }}>
              Most engagements start with Phase 0. Tell us where you are — we'll come back within a week.
            </p>
            <div style={{ display: 'flex', gap: 10, justifyContent: 'center', flexWrap: 'wrap' }}>
              <span className="btn btn-accent">Apply to work with us</span>
              <span style={{
                background: 'transparent', color: 'var(--c-bg)',
                border: '1px solid rgba(255,255,255,0.25)', padding: '10px 18px', borderRadius: 999, fontSize: 12, fontWeight: 500
              }}>Or talk it through (20 min)</span>
            </div>
          </div>
        </div>
      </section>

      <FooterB />
    </Board>);

}

Object.assign(window, { HomeBv2 });