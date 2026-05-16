// wireframes/primitives.jsx
// ────────────────────────────────────────────────────────────────────
// Sketch primitives shared across all four direction wireframes.
// The look: confident pen-on-paper, not childlike doodles.
// Every component is small, composable, and accepts standard props.
// All copy is pulled from a 'COPY' map keyed by tone, so the Tweaks
// panel can swap voice without us rewriting the page.
// ────────────────────────────────────────────────────────────────────

const { createContext, useContext } = React;

/* ──────────────────────────────────────────────────────────
   TWEAKS CONTEXT
   Each wireframe page reads tweaks from this context. App.jsx
   sets the value from <TweaksPanel> state.
   ────────────────────────────────────────────────────────── */
const TweaksCtx = createContext({
  direction: 'all',     // 'all' | 'a' | 'b' | 'c' | 'd'
  navStyle: 'classic',  // 'classic' | 'visual' | 'editorial' | 'minimal'
  tone: 'confident',    // 'confident' | 'restrained'
  headline: 0,          // 0 | 1 | 2
  dark: false,
  heroLayout: 'split',  // 'textLed' | 'split' | 'fullBleed'
});

function useTw() { return useContext(TweaksCtx); }

/* ──────────────────────────────────────────────────────────
   COPY — versioned by tone, plus headline variants.
   Real strings, drawn directly from the existing site where
   they already work, and rewritten where they don't.
   ────────────────────────────────────────────────────────── */

const COPY = {
  // Headline variants (used by HOME hero on every direction)
  headlines: {
    confident: [
      ['AI transformation', 'for leaders', 'who are done waiting.'],
      ['Stop buying tools.', 'Start building', 'capability.'],
      ['Eight weeks from', 'overwhelmed', 'to operational.'],
    ],
    restrained: [
      ['AI transformation', 'built in the room', 'with your team.'],
      ['Capability, not', 'dependency. Outcomes,', 'not recommendations.'],
      ['A clear path from', 'AI ambition', 'to operational reality.'],
    ],
  },

  // Hero subhead (lead paragraph)
  lead: {
    confident: 'You know AI matters. You\'re tired of the hype. You want a partner who\'ll actually get it done — not an agency that disappears, or a consultancy that leaves you with slides.',
    restrained: 'A founder-led practice that helps leadership teams move from AI experimentation to measurable outcomes. We work in the room with your team for eight weeks, not on slides for six months.',
  },

  // Section eyebrows and titles
  problem: {
    eyebrow: 'The Problem',
    confident: { h: 'You\'ve tried. It hasn\'t worked.', body: 'Pilots that go nowhere. Consultancies that disappear. Tools nobody uses. Meanwhile your competitors are moving and your team is overwhelmed.' },
    restrained: { h: 'The implementation gap.', body: 'Most AI investments stall between strategy and execution. The capability to bridge that gap rarely exists inside the business — and rarely sticks when it\'s rented from outside.' },
  },

  diff: {
    eyebrow: 'How we\'re different',
    points: [
      ['Founder-led', 'Andy and Toby personally lead every engagement. No associates, no handovers.'],
      ['Capability, not dependency', 'We install the muscle, not the reliance. When we leave, your team is stronger than when we arrived.'],
      ['Eight weeks, fixed scope', 'Real outcomes on a real timeline. Money back if you don\'t find it valuable after week one.'],
      ['Built in the room', 'We work with your team, not for them. No deliverables you can\'t maintain.'],
    ],
  },

  process: {
    eyebrow: 'How we work',
    steps: [
      ['One-day workshop', 'We sit down with your leadership team for a full day. No slides and no fluff. Real discovery, real prioritisation, real readiness.', 'From £5,000 + VAT'],
      ['Eight-week sprint', 'Eight focused weeks with a clear scope and measurable outcomes. Each week we work on the value of what you invest — cost savings, efficiency gains, revenue growth, or capability you didn\'t have before.', 'From £45,000 + VAT'],
      ['Ongoing partnership', 'Some clients run on cycles and they\'re off. Others keep us as a long-term sounding board. We\'re flexible because every business is different — but we\'re always focused on getting you to the point where you don\'t need us anymore.', 'On request'],
    ],
  },

  offerings: {
    eyebrow: 'What we do',
    items: [
      ['Transformation Programme', 'Eight-week founder-led sprint to install AI capability across leadership, ops and a chosen value stream.', 'from £45,000'],
      ['Leadership Cohort', 'Six-week peer cohort for CEO/CXO groups: build a shared playbook for governing AI in the boardroom.', 'from £12,000 / seat'],
      ['Fractional AI Partner', 'Embedded senior partner two days a week. Strategy, governance, hands-on build. Usually 3–6 months.', 'from £18,000 / month'],
      ['Diagnostic Workshop', 'One-day, on-site. Map your AI surface, prioritise the bets that matter, leave with a 90-day plan.', 'from £5,000'],
    ],
  },

  insights: {
    eyebrow: 'Insights',
    tags: ['AI Strategy', 'The Implementation Gap', 'Capability Building'],
    titles: [
      'The implementation gap is not a technology problem.',
      'Why most AI pilots never reach production — and the three pre-conditions that change that.',
      'Capability vs. dependency: how to commission a partner who leaves you stronger.',
      'Eight weeks: what actually fits inside a focused AI sprint.',
      'The board-level questions a CEO should be able to answer about AI by Q3.',
    ],
  },

  trust: ['Accelerator', 'Conductor', 'Mercury', 'Premium Car Parks', 'Northstar', 'Vellum'],

  cta: {
    confident: 'Apply to work with us',
    restrained: 'Start a conversation',
  },
};

/* ──────────────────────────────────────────────────────────
   PAGE FRAME — every wireframe page sits inside this.
   - Optional browser bar (with url)
   - Left rail (page number + label, like architectural drafting)
   - Direction tint (.dir-a/.dir-b/.dir-c/.dir-d) for annotations
   ────────────────────────────────────────────────────────── */

function Page({ dir, no, label, url, dark, children, noRail, noBar }) {
  const tw = useTw();
  const isDark = dark ?? tw.dark;
  return (
    <div className={`wf dir-${dir} ${isDark ? 'dark' : ''}`}>
      {!noRail && (
        <div className="wf-page-rail">
          <div className="num">{no}</div>
          <div className="label">{label}</div>
        </div>
      )}
      <div className="wf-body" style={noRail ? { left: 0 } : null}>
        {!noBar && (
          <div className="wf-browser-bar">
            <span className="dot"></span>
            <span className="dot"></span>
            <span className="dot"></span>
            <span className="url">accelerator-x.ai<b>{url || '/'}</b></span>
          </div>
        )}
        {children}
      </div>
    </div>
  );
}

/* ──────────────────────────────────────────────────────────
   NAV — four personalities. Used at top of every page.
   - classic: text links with description-style chevrons
   - visual: cards with thumbnails on hover (here just stronger styling)
   - editorial: links with a featured item indicator
   - minimal: pure text, generous spacing
   ────────────────────────────────────────────────────────── */

function Nav({ dir, variant, active }) {
  const tw = useTw();
  const v = variant ?? tw.navStyle;
  const items = ['What we do', 'How we work', 'Insights', 'Resources', 'About'];
  return (
    <div className="wf-nav" style={v === 'minimal' ? { padding: '20px 36px' } : null}>
      <div className="left">
        <div className="logo">Accelerator<span className="x">X</span></div>
      </div>
      <div className="left" style={{ gap: v === 'minimal' ? 28 : 18 }}>
        {items.map((it, i) => (
          <span key={i} className="link" style={{
            color: active === it ? 'var(--ink)' : undefined,
            fontWeight: active === it ? 600 : 400,
            ...(v === 'editorial' && it === 'Insights' ? { color: 'var(--acc)' } : null),
          }}>
            {it}
            {(v === 'classic' || v === 'visual') && (it === 'What we do' || it === 'How we work' || it === 'Insights') && (
              <span className="chev"></span>
            )}
          </span>
        ))}
      </div>
      <div className="right">
        <span className="link">Contact</span>
        <span className="sk-btn sm acc-fill">{COPY.cta[tw.tone]}</span>
      </div>
    </div>
  );
}

/* ──────────────────────────────────────────────────────────
   MEGA MENU PANEL — drawn open below the nav, by variant
   ────────────────────────────────────────────────────────── */

function MegaMenu({ variant, dir }) {
  if (variant === 'classic') return <MegaClassic />;
  if (variant === 'visual') return <MegaVisual />;
  if (variant === 'editorial') return <MegaEditorial />;
  return <MegaMinimal />;
}

function MegaClassic() {
  return (
    <div className="sk-box" style={{ position: 'absolute', left: 28, right: 28, top: 56, padding: 24, background: 'var(--paper)', zIndex: 4 }}>
      <div className="row gap-32">
        {COPY.offerings.items.map((o, i) => (
          <div key={i} className="col gap-6 f1">
            <div className="sk-eyebrow">0{i+1}</div>
            <div style={{ fontWeight: 600, fontSize: 13 }}>{o[0]}</div>
            <div className="muted small" style={{ lineHeight: 1.45 }}>{o[1]}</div>
            <span className="link mono tiny" style={{ marginTop: 4, color: 'var(--acc)' }}>→ Learn more</span>
          </div>
        ))}
      </div>
    </div>
  );
}

function MegaVisual() {
  return (
    <div className="sk-box" style={{ position: 'absolute', left: 28, right: 28, top: 56, padding: 22, background: 'var(--paper)', zIndex: 4 }}>
      <div className="row gap-16">
        {COPY.offerings.items.map((o, i) => (
          <div key={i} className="col gap-8 f1">
            <div className="sk-img" style={{ aspectRatio: '4/3' }}><span>img · 0{i+1}</span></div>
            <div style={{ fontWeight: 600, fontSize: 12 }}>{o[0]}</div>
            <div className="muted tiny">{o[2]}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

function MegaEditorial() {
  return (
    <div className="sk-box" style={{ position: 'absolute', left: 28, right: 28, top: 56, padding: 22, background: 'var(--paper)', zIndex: 4 }}>
      <div className="row gap-32">
        <div className="col gap-6" style={{ flex: '1.4 1 0' }}>
          <div className="sk-eyebrow">Featured insight</div>
          <div className="sk-img" style={{ height: 120, marginTop: 6 }}><span>essay hero</span></div>
          <div className="serif" style={{ fontWeight: 600, fontSize: 14, lineHeight: 1.2, marginTop: 10 }}>
            {COPY.insights.titles[0]}
          </div>
          <div className="muted tiny" style={{ marginTop: 4 }}>10 min read · The Implementation Gap</div>
        </div>
        <div className="col gap-12 f1">
          <div className="sk-eyebrow">What we do</div>
          {COPY.offerings.items.map((o, i) => (
            <div key={i} className="row between" style={{ borderBottom: '1px solid var(--rule-faint)', paddingBottom: 6 }}>
              <span style={{ fontSize: 12, fontWeight: 500 }}>{o[0]}</span>
              <span className="mono tiny muted">{o[2]}</span>
            </div>
          ))}
        </div>
        <div className="col gap-12 f1">
          <div className="sk-eyebrow">How we work</div>
          {['One-day workshop', 'Eight-week sprint', 'Ongoing partnership', 'Money-back week one'].map((s, i) => (
            <span key={i} className="link small">→ {s}</span>
          ))}
        </div>
      </div>
    </div>
  );
}

function MegaMinimal() {
  return (
    <div style={{ position: 'absolute', left: 38, right: 38, top: 60, padding: '20px 12px', background: 'var(--paper)', borderTop: '1px solid var(--rule)', zIndex: 4 }}>
      <div className="row gap-64">
        {COPY.offerings.items.map((o, i) => (
          <div key={i} className="col gap-2">
            <span className="serif" style={{ fontSize: 16 }}>{o[0]}</span>
            <span className="muted tiny mono">{o[2]}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ──────────────────────────────────────────────────────────
   ANNOTATIONS — handwritten margin notes with leader lines
   pos: { top, left | right } and an optional leader length.
   ────────────────────────────────────────────────────────── */

function Note({ top, left, right, bottom, width = 140, leader, children, align = 'left' }) {
  const style = { top, left, right, bottom, width, textAlign: align };
  return (
    <div className="an-note" style={style}>
      {leader === 'top' && <div className="leader" style={{ width: '70%', marginLeft: align === 'right' ? 'auto' : 0 }}></div>}
      <div>{children}</div>
      {leader === 'bottom' && <div className="leader" style={{ width: '70%', marginLeft: align === 'right' ? 'auto' : 0 }}></div>}
    </div>
  );
}

function Pin({ n, fill, style }) {
  return <span className={`an-pin ${fill ? 'fill' : ''}`} style={style}>{n}</span>;
}

/* ──────────────────────────────────────────────────────────
   SECONDARY PRIMITIVES — buttons, image placeholders, lines
   ────────────────────────────────────────────────────────── */

function Btn({ children, fill, lg, sm, sq, acc, style }) {
  const cls = `sk-btn ${fill ? 'fill' : ''} ${lg ? 'lg' : ''} ${sm ? 'sm' : ''} ${sq ? 'sq' : ''} ${acc ? 'acc-fill' : ''}`;
  return <span className={cls} style={style}>{children}</span>;
}

function Pill({ children, style }) {
  return <span className="sk-pill" style={style}>{children}</span>;
}

function Img({ label, h, w, ratio, dense, heavy, style, children }) {
  return (
    <div className={`sk-img ${dense ? 'dense' : ''} ${heavy ? 'heavy' : ''}`} style={{ height: h, width: w, aspectRatio: ratio, ...style }}>
      {children || (label ? <span>{label}</span> : null)}
    </div>
  );
}

function Lines({ count = 4, widths, dark, style }) {
  const ws = widths || Array.from({ length: count }, (_, i) => ['xl','l','xl','m','l','xl','s'][i % 7]);
  return (
    <div className={`sk-lines ${dark ? 'dark' : ''}`} style={style}>
      {ws.map((w, i) => <i key={i} className={w}></i>)}
    </div>
  );
}

function Eyebrow({ children, style }) {
  return <div className="sk-eyebrow" style={style}>{children}</div>;
}

function SectionLabel({ children, style }) {
  return <div className="wf-section-label" style={style}>{children}</div>;
}

function Head({ children, size = 32, serif, mono, weight, style }) {
  const cls = `sk-head ${serif ? 'serif' : ''} ${mono ? 'mono' : ''}`;
  return <div className={cls} style={{ fontSize: size, fontWeight: weight, ...style }}>{children}</div>;
}

function Rule({ style }) { return <div className="wf-rule" style={style}></div>; }

/* ──────────────────────────────────────────────────────────
   TRUST BAR — used on home pages
   ────────────────────────────────────────────────────────── */
function TrustBar({ style }) {
  return (
    <div className="row between middle" style={{ ...style, opacity: 0.7 }}>
      {COPY.trust.map((t, i) => (
        <span key={i} style={{ fontFamily: 'var(--serif)', fontSize: 13, fontWeight: 500, letterSpacing: '0.02em', color: 'var(--ink-soft)' }}>{t}</span>
      ))}
    </div>
  );
}

/* ──────────────────────────────────────────────────────────
   FOOTER — same skeleton on every page
   ────────────────────────────────────────────────────────── */
function Foot() {
  return (
    <div className="wf-foot">
      <div>
        <div style={{ fontFamily: 'var(--sans)', fontWeight: 700, fontSize: 13 }}>Accelerator<span style={{ color: 'var(--acc)' }}>X</span></div>
        <div className="muted small" style={{ marginTop: 6, maxWidth: 220, lineHeight: 1.5 }}>
          Founder-led AI transformation for leaders who are done waiting.
        </div>
        <div className="row gap-6" style={{ marginTop: 10 }}>
          <Pill>LinkedIn</Pill><Pill>YouTube</Pill><Pill>RSS</Pill>
        </div>
      </div>
      <div>
        <h5>Explore</h5>
        <ul>
          <li>What we do</li><li>How we work</li><li>Pricing</li><li>About</li>
        </ul>
      </div>
      <div>
        <h5>Insights</h5>
        <ul>
          <li>Articles</li><li>Podcast</li><li>Case studies</li><li>Resources</li>
        </ul>
      </div>
      <div>
        <h5>Get the weekly dispatch</h5>
        <div className="row gap-6" style={{ marginTop: 6 }}>
          <span className="sk-box" style={{ flex: 1, padding: '8px 10px', fontSize: 11, color: 'var(--ink-faint)' }}>you@company.com</span>
          <Btn acc fill>Subscribe</Btn>
        </div>
        <div className="muted tiny" style={{ marginTop: 10 }}>© 2026 Accelerator X. All rights reserved.</div>
      </div>
    </div>
  );
}

/* ──────────────────────────────────────────────────────────
   PARALLAX MARKER — rectangle annotation showing motion zone
   ────────────────────────────────────────────────────────── */
function MotionZone({ children, label = 'parallax · slow' }) {
  return (
    <div className="wf-motion-zone" style={{ position: 'relative' }}>
      {children}
      <div style={{
        position: 'absolute', top: 10, right: 12,
        fontFamily: 'var(--mono)', fontSize: 8.5, letterSpacing: '0.1em',
        color: 'var(--acc)', textTransform: 'uppercase', opacity: 0.85,
      }}>↕ {label}</div>
    </div>
  );
}

/* Export to globals so other Babel scripts can use them */
Object.assign(window, {
  TweaksCtx, useTw, COPY,
  Page, Nav, MegaMenu, MegaClassic, MegaVisual, MegaEditorial, MegaMinimal,
  Note, Pin, Btn, Pill, Img, Lines, Eyebrow, SectionLabel, Head, Rule,
  TrustBar, Foot, MotionZone,
});
