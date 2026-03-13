# Accelerator X Go-Live Checklist

_Use this checklist to get the marketing site production-ready. Each section must be green-lit before launch._

## 1. Project hygiene

- [ ] `main` branch matches the launch candidate (no unmerged feature work)
- [ ] `npm install` succeeds without warnings
- [ ] `npm run build` completes locally with no errors
- [ ] `scripts/test-site.js` passes (hero media + CTAs render)
- [ ] `scripts/img-audit.sh` passes (responsive images + attributes)
- [ ] Netlify build command = `npm run build`, publish dir = repo root
- [ ] Rollback plan captured (latest stable deploy bookmarked in Netlify)

## 2. Content & visual polish

- [ ] Homepage hero imagery replaced with final production stills (alt text updated in hero media config/library)
- [ ] Final copy review (UK English) across hero, differentiators, testimonials, footer/legal
- [ ] CTA destinations verified (`#apply` anchor + Brevo form link when ready)
- [ ] Privacy + terms copy updated for Accelerator X Ltd (company no. 16974247)

## 3. Performance & Lighthouse budgets

- [ ] Mobile Lighthouse ≥ 95 (Performance)
- [ ] Desktop Lighthouse ≥ 98 (Performance)
- [ ] Total network payload ≤ 1.2 MB / ≤ 20 requests (current baseline 19 / 1,116 KiB)
- [ ] Hero media lazy-load verified (only first slide eager)
- [ ] Reduced-motion pref tested (rotation pauses)
- [ ] Tailwind CDN script either cached or self-hosted to remove unused JS warning (optional)
- [ ] Latest Lighthouse HTML reports stored in `docs/analytics/` (mobile + desktop)

## 4. SEO / AEO

- [ ] `<title>` + `<meta description>` finalised with launch messaging
- [ ] Canonical URL points to production domain before DNS cutover
- [ ] Open Graph + Twitter cards tested (Meta debugger / Card validator)
- [ ] JSON-LD validated via Rich Results Test (Organization, ProfessionalService, WebPage)
- [ ] `sitemap.xml` + `robots.txt` generated and deployed (Netlify static files)
- [ ] Google Search Console property prepared for `accelerator-x.ai`

## 5. Analytics & instrumentation (PostHog)

- [ ] `assets/js/analytics.js` API key + host confirmed for production workspace
- [ ] Lazy-init behaviour documented (`docs/posthog-behavior-insights-prd.md`) with verification steps (`posthog.capture('test')`)
- [ ] Decide on session recording + autocapture settings for launch (currently disabled)
- [ ] Privacy notice updated to mention PostHog usage and opt-out path
- [ ] QA in browser devtools: confirm `posthog.__loaded` becomes `true` after interaction or 15 s

## 6. Marketing Ops (Brevo launch stack)

- [ ] Newsletter form connected to Brevo list (production API key / form action)
- [ ] Double opt-in confirmation email designed and tested (copy + branding)
- [ ] Newsletter broadcast template designed in Brevo (logo, typography, CTA block)
- [ ] Base automation sequence drafted (welcome email → value drip → CTA for call)
- [ ] Automation tested end-to-end (sign-up → confirmation → drip schedule)
- [ ] Brevo credentials stored securely (not in repo)

## 7. Legal & compliance

- [ ] Cookie policy updated (PostHog + Brevo references)
- [ ] Accessibility spot-check (keyboard navigation, focus states, alt text)
- [ ] Contact details (registered address, company number) correct in footer/legal pages

## 8. Deployment & monitoring

- [ ] DNS plan ready (CNAME `accelerator-x.ai` → Netlify, HTTPS cert validation window scheduled)
- [ ] Netlify post-deploy Slack notification verified in staging (n8n workflow)
- [ ] Uptime monitoring configured (optional: Netlify notifications + Statuspage)
- [ ] Launch-day runbook created (build number, DNS steps, rollback instructions)
- [ ] Post-launch checklist scheduled (24h + 7d performance + analytics review)
