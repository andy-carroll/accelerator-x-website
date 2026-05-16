// primitives.jsx
// Shared wireframe primitives — Box, ImgPh, TextLines, Pill, etc.
// All used inside .ax-board contexts.

const { useState, useEffect, useRef, useMemo } = React;

// Image placeholder block (diagonal-hatch pattern)
function ImgPh({ tag, ratio, style, ...rest }) {
  const s = {
    width: '100%',
    aspectRatio: ratio || '4/3',
    borderRadius: 0,
    ...style,
  };
  return <div className="img-ph" data-tag={tag || ''} style={s} {...rest} />;
}

// Stack of text lines (placeholder paragraph)
function TextLines({ lines = 3, widths }) {
  const ws = widths || [90, 95, 85, 70, 60, 50, 80];
  return (
    <div>
      {Array.from({ length: lines }).map((_, i) => (
        <div key={i} className="text-line" style={{ width: `${ws[i % ws.length]}%` }} />
      ))}
    </div>
  );
}

// Generic chip / pill — for tags, categories, nav status
function Chip({ children, dot = false, style, ...rest }) {
  return (
    <span className="pill" style={style} {...rest}>
      {dot && <span className="dot" />}
      {children}
    </span>
  );
}

// AX wordmark (text-based, drawn in CSS)
function AXMark({ label = 'Accelerator X' }) {
  return (
    <span className="ax-mark">
      <span className="ax-glyph">AX</span>
      <span>{label}</span>
    </span>
  );
}

// Avatar circle placeholder
function AvatarPh({ size = 32, initials, style }) {
  return (
    <div
      style={{
        width: size,
        height: size,
        borderRadius: '50%',
        background: 'var(--wf-300)',
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: 'var(--wf-600)',
        fontFamily: 'Geist, sans-serif',
        fontSize: size * 0.34,
        fontWeight: 600,
        ...style,
      }}
    >
      {initials || ''}
    </div>
  );
}

// Direction wrapper — applies dir-a/b/c/d class + ax-board base.
// `scroll` is accepted but ignored: artboards are static frames sized to fit
// their content; if you need to ship a tall page, set height on the DCArtboard.
function Board({ dir, children, style, scroll, className = '' }) {
  return (
    <div
      className={`ax-board dir-${dir} ${className}`}
      style={{ minHeight: '100%', ...style }}
    >
      {children}
    </div>
  );
}

// Section header (eyebrow + title pattern, varies by direction)
function SectionHead({ eyebrow, title, dir, kicker, style }) {
  return (
    <div style={style}>
      {eyebrow && <div className="eyebrow" style={{ marginBottom: 14 }}>{eyebrow}</div>}
      {title && (
        <h2 className="h-display" style={{ margin: 0, fontSize: 38 }}>
          {title}
        </h2>
      )}
      {kicker && (
        <p style={{ marginTop: 14, fontSize: 14, lineHeight: 1.55, color: 'var(--c-fg-muted)', maxWidth: 540 }}>
          {kicker}
        </p>
      )}
    </div>
  );
}

// Hand-drawn underline (kept restrained — used sparingly)
function UnderlineSvg({ color = 'currentColor' }) {
  return (
    <svg viewBox="0 0 200 14" preserveAspectRatio="none" style={{ position: 'absolute', left: 0, right: 0, bottom: -8, width: '100%', height: 10, opacity: 0.7 }}>
      <path d="M2 9 C 60 13, 140 4, 198 8" stroke={color} strokeWidth="2" fill="none" strokeLinecap="round" />
    </svg>
  );
}

// Generic flex row helpers
function Row({ children, gap = 12, align = 'center', justify = 'flex-start', wrap = false, style }) {
  return (
    <div style={{
      display: 'flex',
      gap,
      alignItems: align,
      justifyContent: justify,
      flexWrap: wrap ? 'wrap' : 'nowrap',
      ...style,
    }}>
      {children}
    </div>
  );
}

function Col({ children, gap = 12, align = 'stretch', style }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap, alignItems: align, ...style }}>
      {children}
    </div>
  );
}

// Page chrome — fake browser frame around an artboard (for desktop screens)
function PageChrome({ url = 'accelerator-x.ai', children, bg }) {
  return (
    <div style={{
      width: '100%',
      height: '100%',
      background: bg || 'var(--c-bg)',
      display: 'flex',
      flexDirection: 'column',
    }}>
      <div style={{
        height: 28,
        background: 'rgba(14,23,38,0.04)',
        borderBottom: '1px solid var(--c-line-faint, rgba(14,23,38,0.05))',
        display: 'flex',
        alignItems: 'center',
        padding: '0 10px',
        gap: 8,
        flex: '0 0 auto',
      }}>
        <span style={{ width: 8, height: 8, borderRadius: 999, background: 'rgba(14,23,38,0.18)' }} />
        <span style={{ width: 8, height: 8, borderRadius: 999, background: 'rgba(14,23,38,0.12)' }} />
        <span style={{ width: 8, height: 8, borderRadius: 999, background: 'rgba(14,23,38,0.10)' }} />
        <span style={{
          marginLeft: 12,
          flex: 1,
          maxWidth: 220,
          textAlign: 'center',
          background: 'rgba(14,23,38,0.05)',
          borderRadius: 4,
          padding: '2px 8px',
          fontFamily: 'JetBrains Mono, monospace',
          fontSize: 10,
          color: 'rgba(14,23,38,0.55)',
        }}>
          {url}
        </span>
      </div>
      <div style={{ flex: 1, minHeight: 0, overflow: 'hidden' }}>
        {children}
      </div>
    </div>
  );
}

Object.assign(window, {
  ImgPh, TextLines, Chip, AXMark, AvatarPh, Board, SectionHead,
  UnderlineSvg, Row, Col, PageChrome,
});
