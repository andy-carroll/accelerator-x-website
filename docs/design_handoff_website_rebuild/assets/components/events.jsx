// events.jsx — Talks, Keynotes & AI Events page (Direction B).
// Heroes the high-impact one-off work: keynotes, offsites, AI hackathons.

function EventsB() {
  return (
    <Board dir="b">
      <PageBNav active="Talks & Events" />

      {/* Hero — full-bleed with marquee */}
      <section style={{
        padding: '72px 32px 0',
        background: 'linear-gradient(180deg, var(--c-bg) 0%, var(--c-bg-alt) 100%)',
        borderBottom: '1px solid var(--c-line)',
      }}>
        <div style={{ maxWidth: 1280, margin: '0 auto' }}>
          <div style={{ fontSize: 11.5, color: 'var(--c-fg-muted)', marginBottom: 24, display: 'flex', gap: 8 }}>
            <span style={{ opacity: 0.65 }}>Home</span><span style={{ opacity: 0.4 }}>/</span>
            <span>Talks & Events</span>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1.4fr 1fr', gap: 60, alignItems: 'center' }}>
            <div>
              <div style={{ display: 'flex', gap: 8, marginBottom: 18 }}>
                <Chip dot>Booking · Q3 & Q4 2026</Chip>
                <Chip>Keynotes · Workshops · Hackathons</Chip>
              </div>
              <h1 className="h-display" style={{ fontSize: 88, margin: '0 0 20px', lineHeight: 0.92 }}>
                Move a room.<br/>
                <span style={{ color: 'var(--c-accent-2)' }}>In an afternoon.</span>
              </h1>
              <p style={{ fontSize: 19, lineHeight: 1.45, color: 'var(--c-fg)', margin: '0 0 16px', fontWeight: 500, maxWidth: 600 }}>
                High-impact AI events for conferences, leadership offsites, and senior partnerships. We design, facilitate and lead experiences that can shift how an entire organisation thinks about AI in a few hours.
              </p>
              <p style={{ fontSize: 14.5, lineHeight: 1.6, color: 'var(--c-fg-muted)', margin: '0 0 28px', maxWidth: 560 }}>
                We've designed and led these for FTSE-listed consultancies, regulators, tech conferences and partner offsites. They're not talks — they're hands-on activation moments.
              </p>
              <div style={{ display: 'flex', gap: 10 }}>
                <span className="btn btn-pink">Enquire about an event →</span>
                <span className="btn btn-outline">See past events</span>
              </div>
            </div>

            {/* Marquee — flagship recent event */}
            <div className="panel" style={{ padding: 0, overflow: 'hidden' }}>
              <ImgPh tag="London · 85 partners · Claude hackathon" ratio="4/3" />
              <div style={{ padding: 22 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: 8 }}>
                  <Chip>Flagship · May 2026</Chip>
                  <span style={{ fontSize: 11, color: 'var(--c-accent-2)', fontWeight: 600 }}>● Live this week in Paris</span>
                </div>
                <h3 className="h-display" style={{ fontSize: 22, margin: '8px 0 8px', lineHeight: 1.15 }}>
                  Claude Hackathon — 85 senior partners, one room.
                </h3>
                <p style={{ fontSize: 13, color: 'var(--c-fg-muted)', lineHeight: 1.55, margin: 0 }}>
                  Designed and facilitated for a 1,500-person consultancy. Repeated for them in Paris next week.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Marquee scroller of partners */}
        <div style={{
          marginTop: 56, padding: '20px 0',
          borderTop: '1px solid var(--c-line)', borderBottom: '1px solid var(--c-line)',
          background: 'var(--c-bg)',
        }}>
          <div style={{ maxWidth: 1280, margin: '0 auto', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 32, flexWrap: 'wrap' }}>
            <span style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: 10.5, color: 'var(--c-fg-muted)', letterSpacing: '0.14em' }}>
              SELECTED VENUES & PARTNERS
            </span>
            {['London Tech Week', 'Web Summit', 'TechCrunch', 'FT Future of AI', 'Sifted', 'HBR'].map(t => (
              <span key={t} style={{ fontSize: 14, fontWeight: 500, color: 'var(--c-fg-muted)' }}>{t}</span>
            ))}
          </div>
        </div>
      </section>

      {/* Three event formats */}
      <section style={{ padding: '80px 32px' }}>
        <div style={{ maxWidth: 1280, margin: '0 auto' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: 40 }}>
            <div>
              <Chip>Three event formats</Chip>
              <h2 className="h-display" style={{ fontSize: 48, margin: '20px 0 0' }}>Designed for the moment you've got.</h2>
            </div>
            <span style={{ fontSize: 13, color: 'var(--c-fg-muted)', maxWidth: 360, textAlign: 'right' }}>
              Each runs 2–6 hours and is built from the same activation playbook. We tailor scope, content, and intensity to your audience.
            </span>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 16 }}>
            {[
              {
                kicker: '01 · Format A',
                title: 'AI Keynote',
                duration: '45–90 min',
                size: 'Up to 2,000',
                pitch: 'A high-signal, low-fluff main-stage talk. Built for conferences, partner days, sales kickoffs. No hype. No slides full of trends. A clear take on what matters and what to do on Monday.',
                outputs: ['Custom keynote (45–90 min)', 'Audience Q&A', 'Optional follow-up dispatch'],
                accent: 'var(--c-accent)',
              },
              {
                kicker: '02 · Format B',
                title: 'Leadership Offsite',
                duration: 'Half-day / full-day',
                size: '10–40 leaders',
                pitch: 'A working session for a senior leadership team during their offsite. We facilitate the DOTS process live — leaders leave with shared language, a shortlist of moves, and a 90-day plan they actually own.',
                outputs: ['Live DOTS facilitation', '90-day plan + named owners', 'Optional Phase 0 handoff'],
                accent: 'var(--c-fg)',
                featured: true,
              },
              {
                kicker: '03 · Format C',
                title: 'AI Hackathon',
                duration: '4–8 hours',
                size: '40–200 participants',
                pitch: 'A hands-on Claude hackathon for senior teams. We design challenges around your real work, lead the room, and surface the prompts and patterns that change how your firm uses AI from the next day on.',
                outputs: ['Bespoke challenge design', 'Hands-on Claude coaching', 'Shareable winning patterns'],
                accent: 'var(--c-accent-2)',
              },
            ].map((f, i) => (
              <div key={f.title} className="panel" style={{
                padding: 28,
                background: f.featured ? 'var(--c-fg)' : 'var(--c-bg)',
                color: f.featured ? 'var(--c-bg)' : 'var(--c-fg)',
                border: f.featured ? 'none' : '1px solid var(--c-line)',
                display: 'flex', flexDirection: 'column', gap: 14,
              }}>
                <div style={{
                  display: 'flex', justifyContent: 'space-between', alignItems: 'baseline',
                  paddingBottom: 14, borderBottom: `1px solid ${f.featured ? 'rgba(255,255,255,0.12)' : 'var(--c-line)'}`,
                }}>
                  <span style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: 11, color: f.accent, fontWeight: 600 }}>{f.kicker}</span>
                  <span style={{ width: 8, height: 8, borderRadius: 999, background: f.accent }} />
                </div>
                <h3 className="h-display" style={{ fontSize: 28, margin: 0, color: f.featured ? 'var(--c-bg)' : 'var(--c-fg)', lineHeight: 1.05 }}>{f.title}</h3>
                <div style={{ display: 'flex', gap: 12, fontSize: 11.5, color: f.featured ? 'rgba(255,255,255,0.55)' : 'var(--c-fg-muted)' }}>
                  <span><strong style={{ color: f.featured ? 'var(--c-bg)' : 'var(--c-fg)', fontWeight: 600 }}>{f.duration}</strong></span>
                  <span>·</span>
                  <span>{f.size}</span>
                </div>
                <p style={{ fontSize: 13.5, color: f.featured ? 'rgba(255,255,255,0.78)' : 'var(--c-fg-muted)', lineHeight: 1.6, margin: 0, flex: 1 }}>{f.pitch}</p>
                <div style={{ paddingTop: 12, borderTop: `1px solid ${f.featured ? 'rgba(255,255,255,0.12)' : 'var(--c-line)'}` }}>
                  <div style={{ fontSize: 9.5, letterSpacing: '0.12em', textTransform: 'uppercase', color: f.featured ? 'rgba(255,255,255,0.55)' : 'var(--c-fg-muted)', fontWeight: 600, marginBottom: 8 }}>What's included</div>
                  {f.outputs.map(o => (
                    <div key={o} style={{ display: 'flex', gap: 8, padding: '3px 0', fontSize: 12 }}>
                      <span style={{ color: f.accent, fontFamily: 'JetBrains Mono, monospace' }}>—</span>
                      <span>{o}</span>
                    </div>
                  ))}
                </div>
                <span className={`btn ${f.featured ? 'btn-accent' : 'btn-outline'}`} style={{ fontSize: 11.5, padding: '8px 14px', marginTop: 4 }}>Enquire →</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Spotlight: Claude Hackathon case */}
      <section style={{ padding: '64px 32px', background: 'var(--c-bg-alt)' }}>
        <div style={{ maxWidth: 1280, margin: '0 auto' }}>
          <Chip>Case in focus</Chip>
          <h2 className="h-display" style={{ fontSize: 48, margin: '18px 0 32px', lineHeight: 1, maxWidth: 800 }}>
            85 senior partners. One day. <span style={{ color: 'var(--c-accent-2)' }}>A working AI capability by 6pm.</span>
          </h2>

          <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: 32, alignItems: 'start' }}>
            <ImgPh tag="Hackathon · London · May 2026" ratio="16/9" style={{ borderRadius: 14 }} />

            <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
              <p style={{ fontSize: 14.5, lineHeight: 1.65, color: 'var(--c-fg)', margin: 0 }}>
                A 1,500-person consultancy needed to move their senior partner group from sceptical to fluent in a single day. We designed bespoke challenges around their actual client work, taught them Claude's core capabilities, and ran an in-room hackathon for 85 partners.
              </p>
              <p style={{ fontSize: 14, lineHeight: 1.65, color: 'var(--c-fg-muted)', margin: 0 }}>
                The winning team built a working client-research tool by mid-afternoon. The patterns shared at the end of day are now in use across the firm. We're being flown to Paris next week to run it again.
              </p>

              <div className="panel" style={{ padding: 20, background: 'var(--c-bg)', marginTop: 14 }}>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 0 }}>
                  {[['85', 'Senior partners in the room'], ['12', 'Working prototypes by 6pm'], ['2', 'Cities (so far)']].map(([n, l], i) => (
                    <div key={l} style={{ padding: '0 18px', borderLeft: i > 0 ? '1px solid var(--c-line)' : 'none' }}>
                      <div style={{ fontFamily: 'var(--f-display)', fontSize: 32, fontWeight: 600, letterSpacing: '-0.02em', lineHeight: 1 }}>{n}</div>
                      <div style={{ fontSize: 10.5, color: 'var(--c-fg-muted)', marginTop: 6, letterSpacing: '0.04em' }}>{l}</div>
                    </div>
                  ))}
                </div>
              </div>

              <div style={{ display: 'flex', gap: 10, marginTop: 6 }}>
                <span className="btn btn-outline" style={{ fontSize: 12, padding: '8px 14px' }}>Read the case →</span>
                <span style={{ fontSize: 12, color: 'var(--c-fg-muted)', alignSelf: 'center' }}>Or commission your own →</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Upcoming + recent events list */}
      <section style={{ padding: '64px 32px' }}>
        <div style={{ maxWidth: 1280, margin: '0 auto' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: 28 }}>
            <div>
              <Chip>The diary</Chip>
              <h2 className="h-display" style={{ fontSize: 40, margin: '18px 0 0' }}>Where we've been. Where we're heading next.</h2>
            </div>
            <span style={{ fontSize: 12.5, color: 'var(--c-fg-muted)' }}>Updated weekly</span>
          </div>

          {/* Events table */}
          <div className="panel" style={{ padding: 0, overflow: 'hidden' }}>
            {/* header */}
            <div style={{
              display: 'grid',
              gridTemplateColumns: '110px 1.4fr 1fr 0.8fr 0.6fr 36px',
              gap: 0,
              padding: '12px 24px',
              background: 'var(--c-bg-alt)',
              borderBottom: '1px solid var(--c-line)',
              fontSize: 10, letterSpacing: '0.12em', textTransform: 'uppercase',
              color: 'var(--c-fg-muted)', fontWeight: 600,
            }}>
              <span>Date</span>
              <span>Event</span>
              <span>Format</span>
              <span>Audience</span>
              <span>Status</span>
              <span />
            </div>
            {[
              { date: 'May 22', when: '2026', event: 'Claude Hackathon · Paris', sub: '85 senior partners · consultancy offsite', format: 'Hackathon', audience: '85 partners', status: 'Upcoming', color: 'var(--c-accent)' },
              { date: 'Sep 14', when: '2026', event: 'FT Future of AI Summit', sub: 'Main-stage keynote', format: 'Keynote', audience: '~1,800', status: 'Confirmed', color: 'var(--c-accent)' },
              { date: 'Oct 02', when: '2026', event: 'Private leadership offsite · pharma', sub: 'C-suite DOTS facilitation', format: 'Offsite', audience: '14 execs', status: 'Confirmed', color: 'var(--c-accent)' },
              { date: 'May 14', when: '2026', event: 'Claude Hackathon · London', sub: '85 senior partners · same consultancy', format: 'Hackathon', audience: '85 partners', status: 'Delivered', color: 'var(--c-fg-muted)' },
              { date: 'Apr 23', when: '2026', event: 'HBR Online webinar', sub: 'The Implementation Gap', format: 'Keynote', audience: '~900', status: 'Delivered', color: 'var(--c-fg-muted)' },
              { date: 'Mar 09', when: '2026', event: 'London Tech Week panel', sub: 'AI for mid-market leaders', format: 'Panel', audience: '~300', status: 'Delivered', color: 'var(--c-fg-muted)' },
              { date: 'Feb 18', when: '2026', event: 'Regulator workshop · financial services', sub: 'Internal DOTS facilitation', format: 'Offsite', audience: '22 leaders', status: 'Delivered', color: 'var(--c-fg-muted)' },
            ].map((e, i) => (
              <div key={i} style={{
                display: 'grid',
                gridTemplateColumns: '110px 1.4fr 1fr 0.8fr 0.6fr 36px',
                gap: 0, padding: '16px 24px',
                borderBottom: i < 6 ? '1px solid var(--c-line)' : 'none',
                alignItems: 'center',
                fontSize: 13,
                background: i === 0 ? 'rgba(8,138,191,0.04)' : 'transparent',
              }}>
                <div>
                  <div style={{ fontFamily: 'var(--f-display)', fontSize: 17, fontWeight: 600, letterSpacing: '-0.02em', lineHeight: 1 }}>{e.date}</div>
                  <div style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: 10, color: 'var(--c-fg-muted)', marginTop: 2 }}>{e.when}</div>
                </div>
                <div>
                  <div style={{ fontSize: 14, fontWeight: 500 }}>{e.event}</div>
                  <div style={{ fontSize: 11.5, color: 'var(--c-fg-muted)', marginTop: 2 }}>{e.sub}</div>
                </div>
                <span style={{ fontSize: 12, color: 'var(--c-fg-muted)' }}>{e.format}</span>
                <span style={{ fontSize: 12, color: 'var(--c-fg-muted)' }}>{e.audience}</span>
                <span style={{
                  fontSize: 10.5, fontWeight: 600, letterSpacing: '0.06em', textTransform: 'uppercase',
                  padding: '3px 8px', borderRadius: 4,
                  background: e.status === 'Upcoming' ? 'rgba(233,63,142,0.14)' : e.status === 'Confirmed' ? 'rgba(8,138,191,0.14)' : 'var(--c-bg-alt)',
                  color: e.status === 'Upcoming' ? 'var(--c-accent-2)' : e.status === 'Confirmed' ? 'var(--c-accent)' : 'var(--c-fg-muted)',
                  alignSelf: 'start',
                  display: 'inline-block',
                  width: 'fit-content',
                }}>{e.status}</span>
                <span style={{ fontSize: 14, color: 'var(--c-fg-muted)' }}>→</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Speakers */}
      <section style={{ padding: '64px 32px', background: 'var(--c-bg-alt)' }}>
        <div style={{ maxWidth: 1280, margin: '0 auto' }}>
          <Chip>The people in the room</Chip>
          <h2 className="h-display" style={{ fontSize: 40, margin: '18px 0 28px' }}>Two founders. No associates. Every event.</h2>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
            {[
              { name: 'Toby Henry', role: 'Co-founder · Strategy & Transformation', signature: 'Keynotes · Leadership offsites · Strategy facilitation', initials: 'TH' },
              { name: 'Andy Carroll', role: 'Co-founder · Product & AI', signature: 'Hackathons · Hands-on AI sessions · Technical keynotes', initials: 'AC' },
            ].map((p) => (
              <div key={p.name} className="panel" style={{ padding: 24, display: 'flex', gap: 18, alignItems: 'flex-start', background: 'var(--c-bg)' }}>
                <ImgPh tag={p.initials} ratio="1/1" style={{ width: 80, height: 80, flexShrink: 0, borderRadius: 12 }} />
                <div>
                  <h3 className="h-display" style={{ fontSize: 22, margin: '0 0 4px' }}>{p.name}</h3>
                  <div style={{ fontSize: 12, color: 'var(--c-fg-muted)', marginBottom: 12 }}>{p.role}</div>
                  <div style={{ fontSize: 10.5, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--c-fg-muted)', fontWeight: 600, marginBottom: 6 }}>Signature formats</div>
                  <div style={{ fontSize: 12.5, color: 'var(--c-fg)' }}>{p.signature}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section style={{ padding: '64px 32px 80px' }}>
        <div style={{ maxWidth: 1280, margin: '0 auto' }}>
          <div className="panel" style={{ padding: 56, background: 'var(--c-fg)', color: 'var(--c-bg)', display: 'grid', gridTemplateColumns: '1.4fr 1fr', gap: 48, alignItems: 'center' }}>
            <div>
              <Chip style={{ background: 'rgba(255,255,255,0.08)', borderColor: 'rgba(255,255,255,0.15)', color: 'var(--c-bg)' }}>Enquire</Chip>
              <h2 className="h-display" style={{ fontSize: 56, margin: '20px 0 14px', color: 'var(--c-bg)', lineHeight: 1 }}>
                Got a stage. <span style={{ color: 'var(--c-accent-2)' }}>Or a room.</span>
              </h2>
              <p style={{ fontSize: 14.5, color: 'rgba(255,255,255,0.65)', maxWidth: 480, margin: 0 }}>
                Tell us about the event. We'll come back within 48 hours with a fit-check and an indicative scope.
              </p>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              <span className="btn btn-accent" style={{ justifyContent: 'center' }}>Enquire about an event →</span>
              <span style={{
                background: 'transparent', color: 'var(--c-bg)',
                border: '1px solid rgba(255,255,255,0.25)', padding: '10px 18px', borderRadius: 999, fontSize: 12, fontWeight: 500, textAlign: 'center',
              }}>Download our speaker pack</span>
            </div>
          </div>
        </div>
      </section>

      <FooterB />
    </Board>
  );
}

Object.assign(window, { EventsB });
