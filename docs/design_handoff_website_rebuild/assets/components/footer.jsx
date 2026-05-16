// footer.jsx — 4 footer variations.
// Each tightly matches its direction's visual posture.

const FOOTER_LINKS = {
  'What we do': ['Leadership Activation', '8-Week Transformation Cycle', 'Leadership Cohort', 'Fractional AI Advisory'],
  'How we work': ['Methodology', 'The 5-stage build sequence', 'Case studies', 'Our team'],
  'Insights': ['Articles', 'Dispatch (weekly)', 'Podcast', 'AI Readiness Quiz'],
  'Company': ['About', 'Contact', 'Careers', 'Press'],
};

/* DIRECTION A — editorial colophon */
function FooterA() {
  return (
    <footer style={{
      background: 'var(--c-fg)', color: 'var(--c-bg)',
      padding: '80px 40px 36px', fontFamily: 'var(--f-body)',
    }}>
      <div style={{ maxWidth: 1080, margin: '0 auto' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr 1fr 1fr 1fr', gap: 40, alignItems: 'start' }}>
          <div>
            <div style={{
              fontFamily: 'var(--f-display)', fontSize: 28, lineHeight: 1.1, marginBottom: 18,
            }}>
              Practical frameworks for leaders building real AI capability.
            </div>
            <div style={{ display: 'flex', gap: 10, marginTop: 24 }}>
              <span className="btn" style={{ background: 'var(--c-accent)', color: '#fff' }}>Subscribe →</span>
            </div>
            <div style={{ marginTop: 28, fontSize: 12, color: 'rgba(255,255,255,0.5)', fontFamily: 'var(--f-mono)', letterSpacing: '0.08em' }}>
              andy@accelerator-x.ai
            </div>
          </div>
          {Object.entries(FOOTER_LINKS).map(([head, links]) => (
            <div key={head}>
              <div style={{
                fontFamily: 'var(--f-mono)', fontSize: 10, letterSpacing: '0.16em', textTransform: 'uppercase',
                color: 'rgba(255,255,255,0.5)', marginBottom: 16,
              }}>{head}</div>
              {links.map(l => (
                <div key={l} style={{ fontSize: 13, color: 'rgba(255,255,255,0.85)', padding: '5px 0' }}>{l}</div>
              ))}
            </div>
          ))}
        </div>
        <div style={{ borderTop: '1px solid rgba(255,255,255,0.15)', marginTop: 56, paddingTop: 24, display: 'flex', justifyContent: 'space-between', fontSize: 11, color: 'rgba(255,255,255,0.4)' }}>
          <span>© 2026 Accelerator X. All rights reserved.</span>
          <span style={{ fontFamily: 'var(--f-mono)', letterSpacing: '0.06em' }}>Privacy · Terms · LinkedIn</span>
        </div>
      </div>
    </footer>
  );
}

/* DIRECTION B — panel footer */
function FooterB() {
  return (
    <footer style={{ background: 'var(--c-bg-alt)', padding: '64px 32px 28px' }}>
      <div style={{ maxWidth: 1200, margin: '0 auto' }}>
        <div className="panel" style={{ padding: 36, background: 'var(--c-bg)' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1.4fr 1fr 1fr 1fr 1fr', gap: 28 }}>
            <div>
              <AXMark />
              <p style={{ fontSize: 13, color: 'var(--c-fg-muted)', marginTop: 14, maxWidth: 280, lineHeight: 1.55 }}>
                AI transformation, built in the room. Founder-led. Time-boxed. Hands-on.
              </p>
              <div style={{ marginTop: 18, padding: 14, background: 'var(--c-bg-alt)', borderRadius: 10, border: '1px solid var(--c-line)' }}>
                <div className="eyebrow" style={{ fontSize: 9, marginBottom: 6 }}>Weekly dispatch</div>
                <div style={{ display: 'flex', gap: 6 }}>
                  <div style={{ flex: 1, height: 32, background: 'var(--c-bg)', border: '1px solid var(--c-line)', borderRadius: 8, padding: '8px 10px', fontSize: 11, color: 'var(--c-fg-muted)' }}>you@company.com</div>
                  <span className="btn btn-primary" style={{ fontSize: 11, padding: '6px 12px' }}>Subscribe</span>
                </div>
              </div>
            </div>
            {Object.entries(FOOTER_LINKS).map(([head, links]) => (
              <div key={head}>
                <div className="eyebrow" style={{ marginBottom: 14, fontSize: 10 }}>{head}</div>
                {links.map(l => (
                  <div key={l} style={{ fontSize: 12.5, color: 'var(--c-fg-muted)', padding: '4px 0' }}>{l}</div>
                ))}
              </div>
            ))}
          </div>
        </div>
        <div style={{ marginTop: 18, display: 'flex', justifyContent: 'space-between', fontSize: 11, color: 'var(--c-fg-muted)' }}>
          <span>© 2026 Accelerator X. Made in the UK.</span>
          <span style={{ display: 'flex', gap: 14 }}>
            <span>Privacy</span>
            <span>Terms</span>
            <span>LinkedIn</span>
          </span>
        </div>
      </div>
    </footer>
  );
}

/* DIRECTION C — colophon spread */
function FooterC() {
  return (
    <footer style={{
      background: 'var(--c-bg-deep)', color: 'var(--c-bg)',
      padding: '96px 40px 36px',
    }}>
      <div style={{ maxWidth: 1200, margin: '0 auto' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1.4fr 1fr 1fr 1fr 1fr', gap: 40, alignItems: 'start' }}>
          <div>
            <div style={{ fontFamily: 'var(--f-mono)', fontSize: 10, letterSpacing: '0.2em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.55)' }}>
              Colophon
            </div>
            <div style={{
              fontFamily: 'var(--f-display)', fontStyle: 'italic',
              fontSize: 36, lineHeight: 1.05, marginTop: 20, color: 'var(--c-bg)',
            }}>
              Accelerator&nbsp;X — Issue&nbsp;04, May 2026.
            </div>
            <p style={{
              fontSize: 13, lineHeight: 1.6, marginTop: 20, color: 'rgba(255,255,255,0.65)', maxWidth: 320,
            }}>
              Published quarterly from London. Set in Instrument Serif & Geist. Printed on the open web.
            </p>
          </div>
          {Object.entries(FOOTER_LINKS).map(([head, links]) => (
            <div key={head}>
              <div style={{
                fontFamily: 'var(--f-mono)', fontSize: 10, letterSpacing: '0.18em', textTransform: 'uppercase',
                color: 'rgba(255,255,255,0.55)', marginBottom: 16,
              }}>{head}</div>
              {links.map(l => (
                <div key={l} style={{ fontSize: 13, color: 'rgba(255,255,255,0.9)', padding: '5px 0' }}>{l}</div>
              ))}
            </div>
          ))}
        </div>
        <div style={{ marginTop: 64, paddingTop: 24, borderTop: '1px solid rgba(255,255,255,0.18)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <span style={{ fontFamily: 'var(--f-display)', fontStyle: 'italic', fontSize: 14, color: 'rgba(255,255,255,0.6)' }}>
            "For leaders who are done waiting."
          </span>
          <span style={{ fontFamily: 'var(--f-mono)', fontSize: 11, color: 'rgba(255,255,255,0.55)', letterSpacing: '0.06em' }}>
            © 2026 · Privacy · Terms · LinkedIn
          </span>
        </div>
      </div>
    </footer>
  );
}

/* DIRECTION D — manual back-matter */
function FooterD() {
  return (
    <footer style={{ background: 'var(--c-bg-alt)', padding: '64px 36px 24px', borderTop: '1px solid var(--c-rule)' }}>
      <div style={{ maxWidth: 1200, margin: '0 auto' }}>
        {/* Back-matter table */}
        <div style={{ display: 'grid', gridTemplateColumns: '1.5fr 1fr 1fr 1fr 1fr', gap: 28, alignItems: 'start' }}>
          <div>
            <div style={{ fontFamily: 'var(--f-mono)', fontSize: 11, fontWeight: 600 }}>AX · accelerator-x.ai</div>
            <div style={{ fontFamily: 'var(--f-mono)', fontSize: 10, color: 'var(--c-fg-muted)', letterSpacing: '0.08em', marginTop: 6 }}>
              ISSUE 2026.05 · v3.0
            </div>
            <p style={{ fontSize: 13, lineHeight: 1.55, color: 'var(--c-fg-muted)', marginTop: 18, maxWidth: 280 }}>
              An operating manual for AI transformation. Updated continuously. Built in public.
            </p>
            <div style={{ marginTop: 18, padding: 12, background: 'var(--c-bg)', border: '1px solid var(--c-line)', display: 'flex', alignItems: 'center', gap: 8 }}>
              <div style={{ flex: 1, height: 28, border: '1px solid var(--c-line)', padding: '6px 8px', fontFamily: 'var(--f-mono)', fontSize: 10.5, color: 'var(--c-fg-muted)' }}>
                you@company.com
              </div>
              <span className="btn btn-primary" style={{ fontSize: 10, padding: '6px 10px' }}>Subscribe</span>
            </div>
          </div>
          {Object.entries(FOOTER_LINKS).map(([head, links], idx) => (
            <div key={head}>
              <div style={{
                fontFamily: 'var(--f-mono)', fontSize: 10, letterSpacing: '0.1em',
                color: 'var(--c-fg-muted)', marginBottom: 14,
              }}>
                <span style={{ marginRight: 6 }}>§{String(idx + 1).padStart(2, '0')}</span>
                {head.toUpperCase()}
              </div>
              {links.map((l, j) => (
                <div key={l} style={{
                  display: 'flex', gap: 8, padding: '5px 0',
                  fontSize: 12.5,
                  borderTop: j === 0 ? '1px solid var(--c-line)' : 'none',
                  borderBottom: '1px solid var(--c-line)',
                }}>
                  <span style={{ fontFamily: 'var(--f-mono)', fontSize: 10, color: 'var(--c-fg-muted)', width: 28 }}>
                    .{String(j + 1).padStart(2, '0')}
                  </span>
                  <span>{l}</span>
                </div>
              ))}
            </div>
          ))}
        </div>
        <div style={{ marginTop: 56, paddingTop: 16, borderTop: '1px solid var(--c-rule)', display: 'flex', justifyContent: 'space-between', fontFamily: 'var(--f-mono)', fontSize: 10.5, color: 'var(--c-fg-muted)', letterSpacing: '0.06em' }}>
          <span>© 2026 ACCELERATOR X LTD · COMPANY 16234123</span>
          <span>PRIVACY · TERMS · COOKIES · LINKEDIN</span>
        </div>
      </div>
    </footer>
  );
}

Object.assign(window, { FooterA, FooterB, FooterC, FooterD });
