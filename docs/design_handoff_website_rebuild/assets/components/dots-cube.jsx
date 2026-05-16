// dots-cube.jsx — DOTS visualisation components.
// • DotsBlock — sequence chain of 4 isometric cubes connected by joints.
//               Used at two scales: compact (inline) + large (DOTS page hero).
// • DotsDetailGrid — editorial deep-dive. One full-width spread per letter,
//               with the letter as a load-bearing column, a defining question
//               in display type, two follow-up questions, and an
//               output / anti-pattern pairing. Spreads are visually connected
//               by a single accent-colour thread. Reads as proprietary IP,
//               not a slide deck.

const DOTS_DATA = [
  {
    letter: 'D', name: 'Dream state',
    accent: '#088abf',
    defining: 'What does the best version of this business look like with AI working for it?',
    followups: [
      'What would change for your customers, your team, your P&L?',
      "What's the version that's ambitious — but not insane?",
    ],
    output: 'A concrete, defensible future state — written in language the board would sign off on.',
    anti: "Not a wish list. Not 'innovation' for its own sake. A destination, with edges.",
  },
  {
    letter: 'O', name: 'Obstacles',
    accent: '#fea700',
    defining: "What's between you and that future state — really?",
    followups: [
      'Which obstacles are technical, which are political, which are imagined?',
      'Which would still be there in a year if nothing changed?',
    ],
    output: 'A short, honest list of the real blockers — separated from the ones that just feel scary.',
    anti: "Not a risk register. Not everything that could go wrong. The ones that actually matter.",
  },
  {
    letter: 'T', name: 'Triage',
    accent: '#e93f8e',
    defining: "What's the highest-leverage move with the lowest reversal cost?",
    followups: [
      'Of everything on the table, what do we tackle first?',
      'Where does momentum compound — and where does it stall?',
    ],
    output: 'A scored shortlist. One move (or two) committed to. Everything else parked or killed.',
    anti: 'Not consensus by committee. Triage is a forcing function for clarity — not a vote.',
  },
  {
    letter: 'S', name: 'Sequence',
    accent: '#0e1726',
    defining: 'What needs to happen, in what order, by whom?',
    followups: [
      'What can you do on Monday? What needs a week of prep?',
      'What does Phase 1 look like — costed, owned, dated?',
    ],
    output: 'A 90-day plan with owners, dependencies, and a clear definition of done. Defensible to the CFO.',
    anti: 'Not a Gantt chart. Not a 50-slide roadmap. A one-page sequence that survives reality.',
  },
];

/* DotsBlock — the visual chain. Compact = inline scale; default = large. */
function DotsBlock({ compact, showLabels = true }) {
  return (
    <div className={`dots-chain ${compact ? 'compact' : ''}`}>
      {DOTS_DATA.map((d, i) => (
        <React.Fragment key={d.letter}>
          <div className="dots-cube-wrap">
            <div className="dots-cube" style={{ '--accent': d.accent }}>
              <div className="cube-face cube-front">
                <span className="letter">{d.letter}</span>
              </div>
              <div className="cube-face cube-right">
                <span className="face-content">{d.name}</span>
              </div>
              <div className="cube-face cube-top">
                <span className="face-content">0{i + 1} / 04</span>
              </div>
              <div className="dots-cube-shadow" />
            </div>
            {showLabels && (
              <div className="dots-cube-label">
                <div className="num">Move 0{i + 1} / 04</div>
                <div className="name">{d.name}</div>
              </div>
            )}
          </div>
          {i < DOTS_DATA.length - 1 && <div className="dots-connector" />}
        </React.Fragment>
      ))}
    </div>
  );
}

/* DotsDetailGrid — editorial spread-per-letter.
   Each <section.dots-spread> has:
     • Left column (360px): move number, MASSIVE letter, move name
     • Right column: eyebrow, defining question (display serif),
                     2 follow-up questions, output/anti-pattern pair
   Spreads are connected by a vertical accent thread (CSS pseudo). */
function DotsDetailGrid() {
  return (
    <div className="dots-detail">
      {DOTS_DATA.map((d, i) => (
        <section key={d.letter} className="dots-spread" style={{ '--accent': d.accent }}>
          <div className="dots-spread-letter">
            <div className="dots-spread-num">Move 0{i + 1} / 04</div>
            <div className="dots-spread-letterform">{d.letter}</div>
            <div className="dots-spread-name">{d.name}</div>
          </div>

          <div className="dots-spread-content">
            <div className="dots-defining-block">
              <div className="dots-spread-eyebrow">The defining question</div>
              <p className="dots-defining">{`"${d.defining}"`}</p>
            </div>

            <div className="dots-followups">
              <div className="dots-spread-eyebrow dots-followups-label">And we also ask</div>
              {d.followups.map((q, qi) => (
                <div key={q} className="dots-followup">
                  <span className="dots-followup-num">0{qi + 1}</span>
                  <p className="dots-followup-text">{q}</p>
                </div>
              ))}
            </div>

            <div className="dots-pair">
              <div className="dots-pair-cell is-output">
                <div className="dots-pair-label">What comes out</div>
                <p className="dots-pair-text">{d.output}</p>
              </div>
              <div className="dots-pair-cell is-anti">
                <div className="dots-pair-label">What it isn't</div>
                <p className="dots-pair-text">{d.anti}</p>
              </div>
            </div>
          </div>

          {/* Thread connecting to next spread (last spread hides it via CSS) */}
          <div className="dots-spread-thread" aria-hidden="true" />
        </section>
      ))}
    </div>
  );
}

Object.assign(window, { DOTS_DATA, DotsBlock, DotsDetailGrid });
