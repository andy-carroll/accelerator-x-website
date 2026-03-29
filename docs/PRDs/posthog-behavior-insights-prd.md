# PostHog Behavior Insights PRD (Marketing Website)

_Status: Planning + phased rollout_
_Last updated: 2026-03-06_

---

## 1) Objective

Implement a production-safe behavior analytics layer on the Accelerator X marketing website that answers:

- Where visitors move on the page
- Where they linger
- Where they abandon
- Which sections and form steps create friction

Primary goal: improve conversion decisions with real behavior data, while preserving strong page performance.

---

## 2) Context and constraints

- Site type: no-auth public marketing website (landing + insights)
- Analytics platform: PostHog
- Current strategic need: early-stage learning velocity (new site)
- Non-negotiable: avoid avoidable page-speed regressions while instrumentation scales

Implication: replay and autocapture are valuable, but should be introduced with staged loading and sampling guardrails.

---

## 3) Outcomes and success metrics

### Product outcomes

- Identify top 3 conversion blockers on landing flow (first 30 days)
- Establish repeatable funnel diagnostics from visit to form submission
- Create weekly behavioral insights cadence to guide UX changes

### KPI targets

- Clear funnel visibility from page view -> key section engagement -> CTA click -> form start -> form submit
- Section-level dwell distribution across major landing sections
- Form abandonment visibility by field/step pattern
- Stable web performance during rollout (see guardrails)

---

## 4) Event and analysis model

### Core funnel model

1. Landing page view
2. Scroll/engagement with key sections (`#problem`, `#different`, `#process`, `#apply`)
3. Primary CTA click (`Apply to work with us`)
4. Lead form start
5. Lead form submit success

### Behavior diagnostics model

- Section dwell time (time-in-section buckets)
- Scroll depth by session and source
- Click maps / rage clicks / dead clicks
- Form drop-off patterns (field-level and step-level behavior)
- Time-to-first-interaction

---

## 5) Recommended PostHog capability profile

### Phase 1 (immediate)

- Core analytics: ON
- Autocapture: ON
- Session recording: ON (sampled)
- Surveys: OFF

### Phase 2 (after baseline)

- Increase recording sample rate only if performance and cost stay within guardrails
- Introduce targeted surveys only when a specific research question exists

---

## 6) Performance-safe loading strategy

Use a two-phase analytics model:

- Phase A (critical path): keep first render focused on HTML + CSS + key media
- Phase B (post-render): initialize heavier analytics features after interaction and/or idle window

### Trigger strategy

- Initialize replay after first meaningful interaction or delayed idle fallback
- Avoid heavy analytics work before core rendering milestones

### Sampling strategy

- Start session recording at 10-20%
- Increase gradually (e.g., 30-50%) only after performance validation
- Use short 100% windows only for incident/debug sessions

### Current loader configuration (v1 implementation)

Reference implementation: `assets/js/analytics.js`

- **API host:** `https://eu.i.posthog.com`
- **Project key:** browser key stored inline (public)
- **Triggers:**
  - Lazy init on first user interaction (`pointerdown`, `keydown`, `touchstart`, `scroll`)
  - Fallback init after 15 seconds if no interaction occurs
- **Features:**
  - `autocapture: false`
  - `disable_session_recording: true`
  - `disable_surveys: true`
- **Defaults:** `defaults: "2026-01-30"` ensures consistent property metadata

Verification steps before launch:

1. Load the site locally or via Netlify preview.
2. Open browser console and run `posthog.capture('test_event')` after interacting with the page.
3. Confirm event arrives in the PostHog project (Events stream) with correct host.
4. Ensure `posthog.__loaded` is `true` after interaction or 15s timeout.

Next upgrade:

- Wire environment variables so preview/prod can use different PostHog projects without code edits.
- Decide when to enable autocapture or session recording per sampling rules above.

---

## 7) Guardrails and operating thresholds

Monitor weekly and after major site changes:

- LCP
- TBT / INP
- Conversion rate and bounce rate shifts
- PostHog event and replay volume

Operational rule:

- If performance regresses beyond acceptable bounds, reduce recording sample first before disabling analytics entirely.

---

## 8) Rollout plan (first 2 weeks)

### Week 1: Baseline instrumentation

- Enable selected capabilities per Phase 1 profile
- Stand up dashboards:
  - Funnel conversion
  - Section engagement and dwell
  - Form abandonment

### Week 2: Insight-driven iteration

- Review representative session recordings for failed journeys
- Cluster issues by failure mode (trust gaps, CTA confusion, form friction)
- Ship 1-2 focused UX changes
- Re-evaluate funnel and performance deltas

---

## 9) Reporting cadence

Weekly behavior review (30-45 mins):

- What users did (quant)
- Why they likely did it (replay patterns)
- What we changed
- What improved / worsened after changes

Output artifact: short weekly "Behavior Insights" summary in project notes.

---

## 10) Risks and mitigations

### Risk: Performance regression from analytics payloads
Mitigation:

- Post-render loading
- Sampling controls
- Ongoing perf budgets

### Risk: Data overload with no action
Mitigation:

- Keep a strict decision loop (insight -> hypothesis -> change -> measurement)
- Prioritize only highest-friction paths in each sprint

### Risk: Privacy/compliance issues
Mitigation:

- Ensure replay masking/sanitization and policy alignment before scale-up

---

## 11) References

- `assets/js/analytics.js` (PostHog loader implementation)
- `README.md` (project-level analytics overview)
- `ROADMAP.md` (active execution priorities)
