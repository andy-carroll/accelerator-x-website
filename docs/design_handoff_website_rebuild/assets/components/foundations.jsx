// foundations.jsx
// Project intro + direction system explainer.
// First section in the canvas — sets up the "system" the user is reviewing.

function FoundationsIntro() {
  return (
    <div style={{
      width: '100%',
      height: '100%',
      background: '#faf8f3',
      padding: 40,
      fontFamily: 'Geist, system-ui, sans-serif',
      color: '#0e1726',
      overflow: 'hidden',
      display: 'flex',
      flexDirection: 'column',
    }}>
      <div style={{
        fontFamily: 'JetBrains Mono, monospace',
        fontSize: 10,
        letterSpacing: '0.18em',
        textTransform: 'uppercase',
        color: '#585243',
        marginBottom: 20,
      }}>
        Accelerator X · Website Redesign · Round 01 · Wireframes
      </div>

      <h1 style={{
        fontFamily: 'Newsreader, serif',
        fontWeight: 400,
        fontSize: 56,
        lineHeight: 1.0,
        letterSpacing: '-0.022em',
        margin: '0 0 24px',
      }}>
        Four design directions <em style={{ fontStyle: 'italic', color: '#5b6173' }}>for a confident,</em><br/>
        premium consultancy site.
      </h1>

      <p style={{
        fontSize: 15,
        lineHeight: 1.55,
        color: '#585243',
        margin: '0 0 28px',
        maxWidth: 640,
      }}>
        These are wireframes — structure, hierarchy, and visual posture, not pixel-final.
        Each direction is a coherent design philosophy applied to the full IA: nav,
        home, offerings, methodology, insights, case studies, about, contact.
        Pick the direction that feels like Accelerator X. We sharpen it next round.
      </p>

      <div style={{
        flex: 1,
        minHeight: 0,
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        gap: 24,
      }}>
        <DirCard
          letter="A"
          name="Quiet Authority"
          color="#0e1726"
          bg="#faf8f3"
          accent="#088abf"
          summary="Editorial restraint. Serif headlines, generous whitespace, navy as workhorse."
          tone="FT meets Stripe Press."
          uses={['Newsreader serif display', 'Geist sans body', 'Mono eyebrows', 'One accent per page']}
        />
        <DirCard
          letter="B"
          name="Studio System"
          color="#0e1726"
          bg="#ffffff"
          accent="#088abf"
          summary="Modular, panel-based. Sans throughout. Color as a semantic system."
          tone="Anthropic precision, Pentagram polish."
          uses={['Geist sans display + body', 'Soft panels', 'Color tokens per section', 'Cards & grids']}
        />
        <DirCard
          letter="C"
          name="Living Manuscript"
          color="#1b2a4a"
          bg="#f0ebde"
          accent="#e93f8e"
          summary="Magazine editorial. Asymmetric grids, dramatic typography, color as composition."
          tone="A boutique design quarterly."
          uses={['Instrument Serif display', 'Geist sans body', 'Color blocks as structure', 'Italic emphasis']}
        />
        <DirCard
          letter="D"
          name="Index"
          color="#0e1726"
          bg="#f6f3ec"
          accent="#088abf"
          summary="Reference-manual precision. Monospace accents, numbered systems, library-card hierarchy."
          tone="Operating manual for the C-suite."
          uses={['Geist sans display', 'Mono labels & numerals', 'Numbered indexing', 'Rules over containers']}
        />
      </div>
    </div>
  );
}

function DirCard({ letter, name, color, bg, accent, summary, tone, uses }) {
  return (
    <div style={{
      background: bg,
      border: '1px solid rgba(14,23,38,0.10)',
      borderRadius: 14,
      padding: 24,
      display: 'flex',
      flexDirection: 'column',
      gap: 14,
      color,
    }}>
      <div style={{ display: 'flex', alignItems: 'flex-start', gap: 14 }}>
        <div style={{
          width: 56, height: 56, borderRadius: 8,
          background: color, color: bg,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontFamily: name === 'Living Manuscript' ? 'Instrument Serif, serif' :
                       name === 'Quiet Authority' ? 'Newsreader, serif' : 'Geist, sans-serif',
          fontSize: 28, fontWeight: name === 'Quiet Authority' || name === 'Living Manuscript' ? 400 : 600,
          letterSpacing: '-0.02em',
          flex: '0 0 auto',
        }}>{letter}</div>
        <div style={{ flex: 1 }}>
          <div style={{
            fontFamily: 'JetBrains Mono, monospace',
            fontSize: 10,
            letterSpacing: '0.16em',
            textTransform: 'uppercase',
            color: '#585243',
            marginBottom: 4,
          }}>Direction {letter}</div>
          <h2 style={{
            margin: 0,
            fontFamily: name === 'Living Manuscript' ? 'Instrument Serif, serif' :
                         name === 'Quiet Authority' ? 'Newsreader, serif' : 'Geist, sans-serif',
            fontWeight: name === 'Quiet Authority' || name === 'Living Manuscript' ? 400 : 600,
            fontSize: 22,
            letterSpacing: '-0.018em',
          }}>{name}</h2>
        </div>
        <div style={{
          width: 8, height: 36, background: accent, borderRadius: 999,
          flex: '0 0 auto',
        }} />
      </div>

      <p style={{ margin: 0, fontSize: 13.5, lineHeight: 1.55, color: '#585243' }}>
        {summary}
      </p>
      <p style={{
        margin: 0,
        fontFamily: name === 'Living Manuscript' || name === 'Quiet Authority' ? 'Newsreader, serif' : 'Geist, sans-serif',
        fontStyle: name === 'Living Manuscript' ? 'italic' : 'normal',
        fontSize: 14,
        lineHeight: 1.4,
        color: '#0e1726',
      }}>
        {tone}
      </p>

      <div style={{
        marginTop: 'auto',
        paddingTop: 14,
        borderTop: '1px solid rgba(14,23,38,0.08)',
        display: 'flex',
        flexWrap: 'wrap',
        gap: 6,
      }}>
        {uses.map((u, i) => (
          <span key={i} style={{
            fontFamily: 'JetBrains Mono, monospace',
            fontSize: 10,
            letterSpacing: '0.04em',
            padding: '3px 8px',
            background: 'rgba(14,23,38,0.05)',
            borderRadius: 999,
            color: '#0e1726',
          }}>{u}</span>
        ))}
      </div>
    </div>
  );
}

function PaletteBoard() {
  const swatches = [
    { name: 'Navy', hex: '#1b2a4a', fg: '#fff' },
    { name: 'Ink', hex: '#0e1726', fg: '#fff' },
    { name: 'Ivory', hex: '#f6f3ec', fg: '#1b2a4a' },
    { name: 'Paper', hex: '#faf8f3', fg: '#1b2a4a' },
    { name: 'Teal', hex: '#088abf', fg: '#fff' },
    { name: 'Pink', hex: '#e93f8e', fg: '#fff' },
    { name: 'Amber', hex: '#fea700', fg: '#1b2a4a' },
    { name: 'Purple', hex: '#882de7', fg: '#fff' },
  ];
  return (
    <div style={{
      width: '100%', height: '100%',
      background: '#faf8f3',
      padding: 36,
      fontFamily: 'Geist, sans-serif',
      color: '#0e1726',
      display: 'flex',
      flexDirection: 'column',
      gap: 20,
    }}>
      <div>
        <div style={{
          fontFamily: 'JetBrains Mono, monospace',
          fontSize: 10, letterSpacing: '0.18em', textTransform: 'uppercase', color: '#585243',
        }}>Foundations · 02</div>
        <h2 style={{
          fontFamily: 'Newsreader, serif', fontWeight: 400, fontSize: 32, letterSpacing: '-0.02em',
          margin: '6px 0 0', lineHeight: 1.05,
        }}>Palette inherits from the existing brand.</h2>
        <p style={{ margin: '10px 0 0', fontSize: 13, lineHeight: 1.55, color: '#585243', maxWidth: 520 }}>
          Same tokens as <code style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: 12 }}>styles.css</code> —
          how we use them is the change. Color becomes punctuation, not decoration.
        </p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 10, flex: 1 }}>
        {swatches.map(s => (
          <div key={s.hex} style={{
            background: s.hex, color: s.fg, padding: 14,
            borderRadius: 8, display: 'flex', flexDirection: 'column', justifyContent: 'space-between',
            minHeight: 120,
          }}>
            <div style={{ fontWeight: 600, fontSize: 14 }}>{s.name}</div>
            <div style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: 10, opacity: 0.8 }}>{s.hex}</div>
          </div>
        ))}
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 }}>
        <UsageNote
          title="Per-direction accent assignment"
          body="A uses teal sparingly. B treats teal as 'process' and pink as 'outcome'. C uses pink as primary structural color. D keeps the chrome neutral and lets teal anchor primary links."
        />
        <UsageNote
          title="No pastels in surfaces"
          body="Current pastel washes (teal-100, pink-100, purple-100) are reserved for editorial chart blocks, not full sections. The site reads as ivory/navy with color highlights."
        />
      </div>
    </div>
  );
}

function UsageNote({ title, body }) {
  return (
    <div style={{
      background: '#fff',
      border: '1px solid rgba(14,23,38,0.08)',
      borderRadius: 10,
      padding: 16,
    }}>
      <h3 style={{ margin: '0 0 8px', fontSize: 13, fontWeight: 600, color: '#0e1726' }}>{title}</h3>
      <p style={{ margin: 0, fontSize: 12, lineHeight: 1.5, color: '#585243' }}>{body}</p>
    </div>
  );
}

function TypographyBoard() {
  const samples = [
    { dir: 'A', label: 'Quiet Authority', font: 'Newsreader, serif', weight: 400, italic: false, sample: 'Built in the room.' },
    { dir: 'B', label: 'Studio System', font: 'Geist, sans-serif', weight: 500, italic: false, sample: 'Built in the room.' },
    { dir: 'C', label: 'Living Manuscript', font: 'Instrument Serif, serif', weight: 400, italic: true, sample: 'Built in the room.' },
    { dir: 'D', label: 'Index', font: 'Geist, sans-serif', weight: 500, italic: false, sample: 'Built in the room.' },
  ];
  return (
    <div style={{
      width: '100%', height: '100%',
      background: '#faf8f3',
      padding: 36,
      fontFamily: 'Geist, sans-serif',
      color: '#0e1726',
      display: 'flex',
      flexDirection: 'column',
      gap: 18,
    }}>
      <div>
        <div style={{
          fontFamily: 'JetBrains Mono, monospace',
          fontSize: 10, letterSpacing: '0.18em', textTransform: 'uppercase', color: '#585243',
        }}>Foundations · 03</div>
        <h2 style={{
          fontFamily: 'Newsreader, serif', fontWeight: 400, fontSize: 32, letterSpacing: '-0.02em',
          margin: '6px 0 0', lineHeight: 1.05,
        }}>Type carries the direction.</h2>
      </div>

      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 0 }}>
        {samples.map((s, i) => (
          <div key={s.dir} style={{
            padding: '20px 0',
            borderTop: '1px solid rgba(14,23,38,0.08)',
            display: 'grid',
            gridTemplateColumns: '80px 1fr',
            alignItems: 'baseline',
            gap: 24,
          }}>
            <div>
              <div style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: 10, color: '#585243', letterSpacing: '0.1em' }}>DIR {s.dir}</div>
              <div style={{ fontSize: 12, fontWeight: 500, marginTop: 4 }}>{s.label}</div>
            </div>
            <div style={{
              fontFamily: s.font,
              fontWeight: s.weight,
              fontStyle: s.italic ? 'italic' : 'normal',
              fontSize: 46,
              letterSpacing: s.font.includes('Newsreader') || s.font.includes('Instrument') ? '-0.02em' : '-0.035em',
              lineHeight: 1,
            }}>{s.sample}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

Object.assign(window, { FoundationsIntro, PaletteBoard, TypographyBoard });
