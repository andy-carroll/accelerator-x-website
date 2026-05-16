// contact.jsx — Contact / Apply (Direction B)

function ContactB() {
  return (
    <Board dir="b">
      <PageBNav active="" />
      <PageHero
        breadcrumb={['Home', 'Contact']}
        kicker="Q2 closing · 2 places left"
        title="Tell us where you are. We'll tell you whether we can help."
        sub="Two or three new engagements per quarter. We'll respond within a week — including if we think you're better off elsewhere."
      />

      {/* Form + sidebar */}
      <section style={{ padding: '48px 32px 64px' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto', display: 'grid', gridTemplateColumns: '1.5fr 1fr', gap: 32 }}>
          {/* FORM */}
          <div className="panel" style={{ padding: 36 }}>
            <div className="eyebrow" style={{ marginBottom: 24 }}>Application form · ~3 minutes</div>

            <FormBlock num="01" label="Who you are">
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
                <FormInput placeholder="Your name" />
                <FormInput placeholder="Role at your company" />
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, marginTop: 12 }}>
                <FormInput placeholder="Work email" />
                <FormInput placeholder="Company" />
              </div>
            </FormBlock>

            <FormBlock num="02" label="The business">
              <FormSelect label="Sector" options={['Retail / e-commerce', 'Financial services', 'Healthcare', 'B2B SaaS / Tech', 'Professional services', 'Industrial / Manufacturing', 'Other']} />
              <FormRadio label="Revenue band" options={['<£10M', '£10–30M', '£30–100M', '£100M+']} selected={2} />
              <FormRadio label="Where are you on AI?" options={['Exploring', 'Piloting', 'Some live use', 'Scaling']} selected={1} />
            </FormBlock>

            <FormBlock num="03" label="The work">
              <FormSelect label="Which offering interests you most?" options={['Leadership Activation (half-day)', '8-Week Transformation Cycle', 'Leadership Cohort (quarterly)', 'Fractional AI Advisory', 'Not sure yet']} />
              <FormTextarea label="Where are you stuck? (1–3 sentences is fine)" placeholder="The honest version is the useful one." />
              <FormRadio label="When are you looking to start?" options={['Within 4 weeks', 'This quarter', 'Next quarter', 'Just exploring']} selected={1} />
            </FormBlock>

            <div style={{
              marginTop: 28, padding: '14px 18px', background: 'var(--c-bg-alt)', borderRadius: 10,
              display: 'flex', gap: 12, alignItems: 'flex-start',
            }}>
              <div style={{ width: 18, height: 18, border: '1px solid var(--c-line)', borderRadius: 4, flexShrink: 0, background: 'var(--c-bg)' }} />
              <div style={{ fontSize: 12.5, color: 'var(--c-fg-muted)', lineHeight: 1.55 }}>
                I'm happy to receive a one-off response from Toby or Andy. No marketing follow-up.
              </div>
            </div>

            <div style={{ marginTop: 24, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div style={{ fontSize: 11.5, color: 'var(--c-fg-muted)' }}>Average response time: 2 business days</div>
              <span className="btn btn-primary" style={{ fontSize: 13, padding: '12px 22px' }}>Submit application →</span>
            </div>
          </div>

          {/* SIDEBAR */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            {/* Direct contact */}
            <div className="panel" style={{ padding: 24, background: 'var(--c-bg-alt)' }}>
              <div className="eyebrow" style={{ marginBottom: 14 }}>Prefer to skip the form?</div>
              <div style={{ fontSize: 13.5, color: 'var(--c-fg)', lineHeight: 1.55, marginBottom: 14 }}>
                Both founders read every inbound. Email directly:
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                {[
                  ['Toby Henry', 'toby@accelerator-x.ai', 'Strategy & transformation'],
                  ['Andy Carroll', 'andy@accelerator-x.ai', 'Product & AI'],
                ].map(([name, email, role]) => (
                  <div key={name} style={{ padding: 12, background: 'var(--c-bg)', borderRadius: 8, border: '1px solid var(--c-line)' }}>
                    <div style={{ fontSize: 13, fontWeight: 600 }}>{name}</div>
                    <div style={{ fontSize: 11.5, color: 'var(--c-fg-muted)' }}>{role}</div>
                    <div style={{ fontSize: 12, color: 'var(--c-accent)', marginTop: 6, fontFamily: 'JetBrains Mono, monospace' }}>{email}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Book a call */}
            <div className="panel" style={{ padding: 24 }}>
              <div className="eyebrow" style={{ marginBottom: 14 }}>Or just talk</div>
              <div style={{ fontSize: 13.5, lineHeight: 1.55, marginBottom: 14 }}>
                20 minutes, free, no slides. We'll tell you honestly whether you should hire us.
              </div>
              <span className="btn btn-outline" style={{ width: '100%', justifyContent: 'center' }}>Book a 20-min call →</span>
            </div>

            {/* Quiz */}
            <div className="panel" style={{ padding: 24, background: 'var(--c-fg)', color: 'var(--c-bg)' }}>
              <div style={{ fontSize: 10, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.55)', fontWeight: 600, marginBottom: 12 }}>Not ready yet?</div>
              <div style={{ fontSize: 14, fontWeight: 600, marginBottom: 8 }}>Take the AI Readiness assessment.</div>
              <div style={{ fontSize: 12.5, color: 'rgba(255,255,255,0.65)', lineHeight: 1.55, marginBottom: 14 }}>
                4 minutes. Honest result — including "you don't need us yet."
              </div>
              <span className="btn btn-accent" style={{ width: '100%', justifyContent: 'center' }}>Start assessment →</span>
            </div>

            {/* Logistics */}
            <div style={{ padding: '18px 4px', fontSize: 11.5, color: 'var(--c-fg-muted)', lineHeight: 1.7 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid var(--c-line)', padding: '8px 0' }}>
                <span>Based in</span><strong style={{ color: 'var(--c-fg)' }}>London, UK</strong>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid var(--c-line)', padding: '8px 0' }}>
                <span>Works with</span><strong style={{ color: 'var(--c-fg)' }}>UK + EU + US</strong>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', padding: '8px 0' }}>
                <span>Hours</span><strong style={{ color: 'var(--c-fg)' }}>GMT business hours</strong>
              </div>
            </div>
          </div>
        </div>
      </section>

      <FooterB />
    </Board>
  );
}

function FormBlock({ num, label, children }) {
  return (
    <div style={{ marginBottom: 28, paddingBottom: 28, borderBottom: '1px solid var(--c-line)' }}>
      <div style={{ display: 'flex', alignItems: 'baseline', gap: 10, marginBottom: 16 }}>
        <span style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: 11, color: 'var(--c-fg-muted)', letterSpacing: '0.08em' }}>{num}</span>
        <span style={{ fontSize: 13, fontWeight: 600, letterSpacing: '-0.005em' }}>{label}</span>
      </div>
      {children}
    </div>
  );
}

function FormInput({ placeholder }) {
  return (
    <div style={{
      border: '1px solid var(--c-line)',
      borderRadius: 8,
      padding: '11px 14px',
      fontSize: 13,
      color: 'var(--c-fg-muted)',
      background: 'var(--c-bg)',
    }}>{placeholder}</div>
  );
}

function FormTextarea({ label, placeholder }) {
  return (
    <div style={{ marginTop: 14 }}>
      <div style={{ fontSize: 11.5, color: 'var(--c-fg-muted)', marginBottom: 6 }}>{label}</div>
      <div style={{
        border: '1px solid var(--c-line)',
        borderRadius: 8,
        padding: '11px 14px',
        fontSize: 13,
        color: 'var(--c-fg-muted)',
        background: 'var(--c-bg)',
        minHeight: 84,
      }}>{placeholder}</div>
    </div>
  );
}

function FormSelect({ label, options }) {
  return (
    <div style={{ marginTop: 14 }}>
      <div style={{ fontSize: 11.5, color: 'var(--c-fg-muted)', marginBottom: 6 }}>{label}</div>
      <div style={{
        border: '1px solid var(--c-line)',
        borderRadius: 8,
        padding: '11px 14px',
        fontSize: 13,
        color: 'var(--c-fg)',
        background: 'var(--c-bg)',
        display: 'flex', justifyContent: 'space-between', alignItems: 'center',
      }}>
        <span>{options[0]}</span>
        <span style={{ color: 'var(--c-fg-muted)' }}>▾</span>
      </div>
    </div>
  );
}

function FormRadio({ label, options, selected = 0 }) {
  return (
    <div style={{ marginTop: 14 }}>
      <div style={{ fontSize: 11.5, color: 'var(--c-fg-muted)', marginBottom: 8 }}>{label}</div>
      <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
        {options.map((o, i) => (
          <span key={o} style={{
            padding: '7px 12px',
            border: '1px solid var(--c-line)',
            borderRadius: 999,
            fontSize: 12,
            background: i === selected ? 'var(--c-fg)' : 'var(--c-bg)',
            color: i === selected ? 'var(--c-bg)' : 'var(--c-fg)',
            fontWeight: i === selected ? 500 : 400,
          }}>{o}</span>
        ))}
      </div>
    </div>
  );
}

function ContactA() { return <ComingSoon dir="a" title="Contact · A" />; }
function ContactC() { return <ComingSoon dir="c" title="Contact · C" />; }
function ContactD() { return <ComingSoon dir="d" title="Contact · D" />; }

Object.assign(window, { ContactA, ContactB, ContactC, ContactD });
