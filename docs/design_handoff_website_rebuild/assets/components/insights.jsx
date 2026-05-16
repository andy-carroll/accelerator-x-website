// insights.jsx — Insights hub + article detail (Direction B)

const ARTICLES = [
  { id: 1, kicker: 'Featured', type: 'Dispatch', cat: 'AI Strategy', title: 'The Implementation Gap', sub: 'Why most AI initiatives stall in week six — and the three questions that surface it before you start.', author: 'Andy Carroll', date: 'Mar 14, 2026', read: '6 min', featured: true },
  { id: 2, kicker: 'Framework', type: 'Dispatch', cat: 'Capability Building', title: 'The 5-Stage Build Sequence', sub: 'A defensible structure for shipping AI capability — what to do at each stage, what to delete.', author: 'Toby Henry', date: 'Apr 02, 2026', read: '9 min' },
  { id: 3, kicker: 'Dispatch', type: 'Dispatch', cat: 'AI Strategy', title: 'The end of prompt engineering', sub: 'Why prompt-craft was always a transitional skill — and what the durable replacement looks like.', author: 'Andy Carroll', date: 'May 05, 2026', read: '5 min' },
  { id: 4, kicker: 'Podcast · Ep 07', type: 'Podcast', cat: 'The Implementation Gap', title: 'Leadership alignment under uncertainty', sub: 'A conversation with the CFO of a £200M services firm on getting the C-suite to actually decide.', author: 'Toby & Andy', date: 'May 10, 2026', read: '34 min' },
  { id: 5, kicker: 'Dispatch', type: 'Dispatch', cat: 'Capability Building', title: 'Building the AI-native team', sub: 'How to structure a team that adopts new tools without losing institutional memory.', author: 'Toby Henry', date: 'Feb 28, 2026', read: '7 min' },
  { id: 6, kicker: 'Case', type: 'Case Study', cat: 'AI Strategy', title: 'How a £45M retailer cut backlog 60% in one cycle', sub: 'Eight weeks. Three operators. One production system the ops team now runs without us.', author: 'Andy Carroll', date: 'Mar 22, 2026', read: '12 min' },
  { id: 7, kicker: 'Dispatch', type: 'Dispatch', cat: 'The Implementation Gap', title: 'The hard truth about AI in the workplace', sub: 'What changes when 30% of work is augmented. And what doesn\u2019t.', author: 'Andy Carroll', date: 'Apr 18, 2026', read: '11 min' },
];

function InsightsHubB() {
  const [type, _] = [null];
  return (
    <Board dir="b">
      <PageBNav active="Insights" />
      <PageHero
        breadcrumb={['Home', 'Insights']}
        kicker="Field notes · Built in the work"
        title="From the dispatch."
        sub="Articles, podcasts, case studies and frameworks — written for the leaders we work with. No SEO filler."
      />

      {/* Subscribe ribbon */}
      <section style={{ padding: '24px 32px 0' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
          <div className="panel-tint" style={{
            padding: '18px 22px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 24,
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
              <div style={{ width: 36, height: 36, borderRadius: 8, background: 'var(--c-accent)', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'JetBrains Mono, monospace', fontWeight: 600 }}>↗</div>
              <div>
                <div style={{ fontSize: 13.5, fontWeight: 600 }}>The weekly dispatch</div>
                <div style={{ fontSize: 12, color: 'var(--c-fg-muted)' }}>One useful note each week. 2,400 readers.</div>
              </div>
            </div>
            <div style={{ display: 'flex', gap: 8 }}>
              <div style={{ background: 'var(--c-bg)', border: '1px solid var(--c-line)', borderRadius: 8, padding: '8px 12px', fontSize: 12, color: 'var(--c-fg-muted)', minWidth: 220 }}>
                you@company.com
              </div>
              <span className="btn btn-primary" style={{ fontSize: 12, padding: '8px 16px' }}>Subscribe</span>
            </div>
          </div>
        </div>
      </section>

      {/* Filter chips */}
      <section style={{ padding: '32px 32px 12px' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 24, flexWrap: 'wrap' }}>
          <div style={{ display: 'flex', gap: 6, fontSize: 12.5 }}>
            {['All', 'Dispatch', 'Podcast', 'Case study', 'Framework'].map((f, i) => (
              <span key={f} style={{
                padding: '6px 14px',
                borderRadius: 999,
                background: i === 0 ? 'var(--c-fg)' : 'transparent',
                color: i === 0 ? 'var(--c-bg)' : 'var(--c-fg)',
                border: i === 0 ? 'none' : '1px solid var(--c-line)',
                fontWeight: 500,
              }}>{f}</span>
            ))}
          </div>
          <div style={{ display: 'flex', gap: 14, fontSize: 12, color: 'var(--c-fg-muted)', alignItems: 'center' }}>
            <span>Category:</span>
            {['All', 'AI Strategy', 'The Implementation Gap', 'Capability Building'].map((c, i) => (
              <span key={c} style={{ color: i === 0 ? 'var(--c-fg)' : 'var(--c-fg-muted)', fontWeight: i === 0 ? 500 : 400, cursor: 'default' }}>{c}</span>
            ))}
          </div>
        </div>
      </section>

      {/* Featured article — full-bleed within max-width */}
      <section style={{ padding: '32px 32px 24px' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
          <div className="panel" style={{ padding: 0, overflow: 'hidden', display: 'grid', gridTemplateColumns: '1.1fr 1fr', minHeight: 360 }}>
            <ImgPh tag="Featured · The Implementation Gap" ratio="auto" style={{ height: '100%', minHeight: 360 }} />
            <div style={{ padding: 40, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
              <div>
                <Chip dot>Featured · Mar 14, 2026</Chip>
                <h2 className="h-display" style={{ fontSize: 40, margin: '20px 0 14px', lineHeight: 1.02 }}>{ARTICLES[0].title}</h2>
                <p style={{ fontSize: 14.5, color: 'var(--c-fg-muted)', lineHeight: 1.6, margin: 0 }}>{ARTICLES[0].sub}</p>
              </div>
              <div style={{ marginTop: 28, display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingTop: 20, borderTop: '1px solid var(--c-line)' }}>
                <div style={{ display: 'flex', gap: 10, alignItems: 'center' }}>
                  <AvatarPh size={28} initials="AC" />
                  <span style={{ fontSize: 12.5, color: 'var(--c-fg-muted)' }}>{ARTICLES[0].author} · {ARTICLES[0].read}</span>
                </div>
                <span className="btn btn-outline" style={{ fontSize: 12, padding: '8px 14px' }}>Read article →</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Article grid */}
      <section style={{ padding: '32px 32px 64px' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 16 }}>
            {ARTICLES.slice(1).map((a, i) => {
              const typeColor = a.type === 'Podcast' ? 'var(--c-accent-2)' : a.type === 'Case Study' ? '#fea700' : 'var(--c-accent)';
              return (
                <article key={a.id} className="panel" style={{ display: 'flex', flexDirection: 'column', gap: 0, overflow: 'hidden' }}>
                  <ImgPh tag={`${a.type} cover`} ratio="3/2" />
                  <div style={{ padding: 22, display: 'flex', flexDirection: 'column', gap: 10, flex: 1 }}>
                    <div style={{ display: 'flex', gap: 6, alignItems: 'center' }}>
                      <span style={{
                        fontSize: 10.5, fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase',
                        color: typeColor, padding: '3px 8px', borderRadius: 4,
                        background: `${typeColor}14`,
                      }}>{a.type}</span>
                      <span style={{ fontSize: 11.5, color: 'var(--c-fg-muted)' }}>· {a.cat}</span>
                    </div>
                    <h3 className="h-display" style={{ fontSize: 20, margin: 0, lineHeight: 1.15 }}>{a.title}</h3>
                    <p style={{ fontSize: 13, color: 'var(--c-fg-muted)', lineHeight: 1.55, margin: 0, flex: 1 }}>{a.sub}</p>
                    <div style={{ paddingTop: 14, marginTop: 4, borderTop: '1px solid var(--c-line)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <span style={{ fontSize: 11.5, color: 'var(--c-fg-muted)' }}>{a.author} · {a.date}</span>
                      <span style={{ fontSize: 11.5, color: 'var(--c-fg)', fontFamily: 'JetBrains Mono, monospace' }}>{a.read}</span>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>

          <div style={{ marginTop: 36, textAlign: 'center' }}>
            <span className="btn btn-outline">Load more →</span>
          </div>
        </div>
      </section>

      <FooterB />
    </Board>
  );
}

/* ─────────────────────────────────────────────────────────────────────
   ARTICLE DETAIL — long-form layout (Direction B)
   ───────────────────────────────────────────────────────────────────── */
function ArticleB() {
  return (
    <Board dir="b">
      <PageBNav active="Insights" />

      {/* Article hero */}
      <section style={{ padding: '48px 32px 32px', borderBottom: '1px solid var(--c-line)' }}>
        <div style={{ maxWidth: 760, margin: '0 auto' }}>
          <div style={{ fontSize: 11.5, color: 'var(--c-fg-muted)', marginBottom: 18, display: 'flex', gap: 8 }}>
            <span style={{ opacity: 0.65 }}>Insights</span><span style={{ opacity: 0.4 }}>/</span>
            <span style={{ opacity: 0.65 }}>Dispatch</span><span style={{ opacity: 0.4 }}>/</span>
            <span>The Implementation Gap</span>
          </div>
          <div style={{ display: 'flex', gap: 8, marginBottom: 20 }}>
            <Chip>Dispatch</Chip>
            <Chip>AI Strategy</Chip>
          </div>
          <h1 className="h-display" style={{ fontSize: 56, margin: '0 0 24px', lineHeight: 1 }}>
            The Implementation Gap.
          </h1>
          <p style={{ fontSize: 19, lineHeight: 1.5, color: 'var(--c-fg-muted)', margin: '0 0 32px' }}>
            Why most AI initiatives stall in week six — and the three questions that surface it before you start.
          </p>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingTop: 20, borderTop: '1px solid var(--c-line)' }}>
            <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
              <AvatarPh size={40} initials="AC" />
              <div>
                <div style={{ fontSize: 13, fontWeight: 600 }}>Andy Carroll</div>
                <div style={{ fontSize: 11.5, color: 'var(--c-fg-muted)' }}>Co-founder · Mar 14, 2026 · 6 min read</div>
              </div>
            </div>
            <div style={{ display: 'flex', gap: 6 }}>
              {['Tw', 'Li', '↗'].map((s, i) => (
                <span key={i} style={{ width: 32, height: 32, borderRadius: 999, border: '1px solid var(--c-line)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 11, fontFamily: 'JetBrains Mono, monospace' }}>{s}</span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Hero image */}
      <section style={{ padding: '32px 32px' }}>
        <div style={{ maxWidth: 1000, margin: '0 auto' }}>
          <ImgPh tag="Article hero · The Implementation Gap" ratio="16/9" style={{ borderRadius: 14 }} />
        </div>
      </section>

      {/* BLUF + article body */}
      <section style={{ padding: '24px 32px 64px' }}>
        <div style={{ maxWidth: 760, margin: '0 auto' }}>
          {/* BLUF callout */}
          <div className="panel-tint" style={{ padding: 24, marginBottom: 36 }}>
            <div style={{ fontSize: 10.5, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--c-fg-muted)', fontWeight: 600, marginBottom: 8 }}>Bottom line, up front</div>
            <p style={{ fontSize: 17, lineHeight: 1.45, margin: 0, fontWeight: 500 }}>
              Most AI initiatives don't fail at the model. They fail at the moment a working prototype meets a real workflow — and nobody owns the gap.
            </p>
          </div>

          {/* Prose body */}
          <div style={{ fontSize: 16, lineHeight: 1.75, color: 'var(--c-fg)' }}>
            <p style={{ margin: '0 0 24px' }}>I've sat in the room for thirty-odd AI pilot reviews in the last year. The pattern is consistent enough to be diagnostic.</p>
            <p style={{ margin: '0 0 24px' }}>Weeks one to four go well. The model works. The demo lands. Leadership nods. By week six, the project is "going through change management" — which is a polite way of saying nobody knows whose job it is to make it actually used.</p>
            <h2 className="h-display" style={{ fontSize: 28, margin: '40px 0 18px', lineHeight: 1.1 }}>What the gap actually looks like</h2>
            <p style={{ margin: '0 0 24px' }}>The implementation gap isn't a technology gap. It's an authority gap. The three questions:</p>
            <ol style={{ paddingLeft: 22, margin: '0 0 24px' }}>
              <li style={{ marginBottom: 12 }}>Who has the seniority to change the workflow this lives in?</li>
              <li style={{ marginBottom: 12 }}>Who has the budget to absorb the productivity dip in the first month?</li>
              <li style={{ marginBottom: 12 }}>Who picks up the pager when it produces a wrong answer at 2am?</li>
            </ol>
            <p style={{ margin: '0 0 24px' }}>If you can't name the person for all three before you start, the build will stall. Not because the work is hard — because the decision has nowhere to land.</p>
            <blockquote style={{
              borderLeft: '3px solid var(--c-accent)',
              paddingLeft: 24, margin: '32px 0',
              fontFamily: 'var(--f-display)', fontSize: 24, fontStyle: 'normal', fontWeight: 500, lineHeight: 1.3,
              color: 'var(--c-fg)',
            }}>
              You don't have an AI problem. You have an org-design problem the AI made visible.
            </blockquote>
            <p style={{ margin: '0 0 24px' }}>This is what eight weeks of disciplined work fixes, and what eight months of strategy decks never will.</p>
            <p style={{ margin: '0 0 24px', color: 'var(--c-fg-muted)' }}><em>Andy Carroll is the co-founder of Accelerator X. He writes weekly in the dispatch.</em></p>
          </div>

          {/* CTA inside article */}
          <div className="panel" style={{ marginTop: 48, padding: 28, background: 'var(--c-fg)', color: 'var(--c-bg)', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 24 }}>
            <div>
              <div style={{ fontSize: 11, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.6)', fontWeight: 600, marginBottom: 8 }}>Read this every week</div>
              <div style={{ fontSize: 16, fontWeight: 600 }}>Subscribe to the weekly dispatch.</div>
              <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.6)', marginTop: 4 }}>2,400 leaders. No hype.</div>
            </div>
            <div style={{ display: 'flex', gap: 8 }}>
              <div style={{ background: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.15)', borderRadius: 8, padding: '8px 12px', fontSize: 12, color: 'rgba(255,255,255,0.5)', minWidth: 200 }}>
                you@company.com
              </div>
              <span className="btn btn-accent" style={{ fontSize: 12, padding: '8px 16px' }}>Subscribe</span>
            </div>
          </div>
        </div>
      </section>

      {/* Next + related */}
      <section style={{ padding: '64px 32px', background: 'var(--c-bg-alt)' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: 48, alignItems: 'start' }}>
            <div>
              <Chip>Next in series</Chip>
              <h3 className="h-display" style={{ fontSize: 28, margin: '14px 0 12px' }}>The 5-Stage Build Sequence</h3>
              <p style={{ fontSize: 13.5, color: 'var(--c-fg-muted)', lineHeight: 1.55 }}>The structural answer to the gap. Read next →</p>
            </div>
            <div>
              <div className="eyebrow" style={{ marginBottom: 14 }}>Related dispatches</div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 }}>
                {ARTICLES.slice(1, 5).map(a => (
                  <div key={a.id} className="panel" style={{ padding: 16, display: 'flex', flexDirection: 'column', gap: 6, background: 'var(--c-bg)' }}>
                    <span style={{ fontSize: 10.5, color: 'var(--c-fg-muted)', letterSpacing: '0.08em', textTransform: 'uppercase' }}>{a.type}</span>
                    <span style={{ fontSize: 14, fontWeight: 600, lineHeight: 1.3 }}>{a.title}</span>
                    <span style={{ fontSize: 11.5, color: 'var(--c-fg-muted)' }}>{a.date} · {a.read}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <FooterB />
    </Board>
  );
}

function InsightsHubA() { return <ComingSoon dir="a" title="Insights hub · A" />; }
function InsightsHubC() { return <ComingSoon dir="c" title="Insights hub · C" />; }
function InsightsHubD() { return <ComingSoon dir="d" title="Insights hub · D" />; }
function ArticleA() { return <ComingSoon dir="a" title="Article · A" />; }
function ArticleC() { return <ComingSoon dir="c" title="Article · C" />; }
function ArticleD() { return <ComingSoon dir="d" title="Article · D" />; }

Object.assign(window, {
  InsightsHubA, InsightsHubB, InsightsHubC, InsightsHubD,
  ArticleA, ArticleB, ArticleC, ArticleD,
});
