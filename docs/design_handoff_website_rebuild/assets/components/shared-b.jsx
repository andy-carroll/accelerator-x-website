// shared-b.jsx — Shared chrome (nav + footer) used by every B page.
// Lets each inner page focus on its own content.

function PageBNav({ active }) {
  const items = ['What we do', 'Talks & Events', 'How we work', 'Insights', 'About'];
  return (
    <div style={{
      background: 'rgba(255,255,255,0.92)',
      backdropFilter: 'blur(20px)',
      borderBottom: '1px solid var(--c-line)',
      padding: '14px 32px',
      display: 'flex', justifyContent: 'space-between', alignItems: 'center',
      position: 'sticky', top: 0, zIndex: 10,
    }}>
      <AXMark />
      <nav style={{
        display: 'flex', gap: 4,
        background: 'var(--c-bg-alt)', padding: 4, borderRadius: 999, fontSize: 12.5, fontWeight: 500,
      }}>
        {items.map(l => (
          <span key={l} style={{
            padding: '6px 12px',
            borderRadius: 999,
            background: l === active ? 'var(--c-bg)' : 'transparent',
            color: 'var(--c-fg)',
            boxShadow: l === active ? '0 1px 3px rgba(0,0,0,0.05)' : 'none',
          }}>{l}</span>
        ))}
      </nav>
      <span className="btn btn-primary" style={{ fontSize: 12, padding: '8px 16px' }}>Let's talk →</span>
    </div>
  );
}

function PageHero({ kicker, title, sub, accent, breadcrumb }) {
  return (
    <section style={{ padding: '56px 32px 36px', borderBottom: '1px solid var(--c-line)' }}>
      <div style={{ maxWidth: 1200, margin: '0 auto' }}>
        {breadcrumb && (
          <div style={{ fontSize: 11.5, color: 'var(--c-fg-muted)', marginBottom: 20, display: 'flex', alignItems: 'center', gap: 8 }}>
            {breadcrumb.map((b, i) => (
              <React.Fragment key={i}>
                <span style={{ opacity: i === breadcrumb.length - 1 ? 1 : 0.65 }}>{b}</span>
                {i < breadcrumb.length - 1 && <span style={{ opacity: 0.4 }}>/</span>}
              </React.Fragment>
            ))}
          </div>
        )}
        <Chip dot>{kicker}</Chip>
        <h1 className="h-display" style={{ fontSize: 72, margin: '20px 0 0', lineHeight: 0.95, maxWidth: 920 }}>
          {title}
        </h1>
        {sub && (
          <p style={{ fontSize: 18, lineHeight: 1.5, color: 'var(--c-fg-muted)', margin: '24px 0 0', maxWidth: 640 }}>
            {sub}
          </p>
        )}
      </div>
    </section>
  );
}

Object.assign(window, { PageBNav, PageHero });
