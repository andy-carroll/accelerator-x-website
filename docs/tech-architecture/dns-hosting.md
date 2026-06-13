# DNS & Hosting Reference

> Single source of truth for how accelerator-x.ai is registered, hosted, and routed.
> If something is down or needs changing, start here.

---

## Quick reference

| What | Who manages it | Where to go |
|------|---------------|-------------|
| Domain registration | Hostinger (Toby's account) | hostinger.com → Domains |
| DNS zone | **Netlify DNS** | app.netlify.com → accelerator-x → Domains → DNS panel |
| Web hosting | Netlify | app.netlify.com → accelerator-x |
| SSL certificate | Netlify (Let's Encrypt, auto) | app.netlify.com → accelerator-x → Domain management → HTTPS |
| Business email | Google Workspace | Google Admin |
| Newsletter sending | Brevo | brevo.com — sender domain `mail.accelerator-x.ai` |
| Quiz subdomain | Vercel (separate app) | Vercel dashboard |

---

## Domain registration

- **Registrar:** Hostinger
- **Registrant account:** `tobiashenry1986@gmail.com` (Toby's)
- **Expiry:** 2028-01-26
- **Auto-renewal:** was OFF as of 2026-06-13 — **turn this on**
- The domain registration at Hostinger is now purely administrative (billing/ownership). **Do not touch DNS settings in Hostinger** — DNS is managed entirely by Netlify.

---

## DNS

**Nameservers (Netlify DNS — set 2026-06-13):**
```
dns1.p03.nsone.net
dns2.p03.nsone.net
dns3.p03.nsone.net
dns4.p03.nsone.net
```

**To make any DNS change:** go to **Netlify → accelerator-x → Domains → DNS panel**. Do not use Hostinger's DNS zone editor — it is no longer active.

### Full DNS zone (as of 2026-06-13)

| Name | Type | Value | Purpose |
|------|------|-------|---------|
| `accelerator-x.ai` | NETLIFY | `accelerator-x.netlify.app` | Apex → Netlify (auto-managed) |
| `www.accelerator-x.ai` | NETLIFY | `accelerator-x.netlify.app` | www → Netlify (auto-managed) |
| `quiz.accelerator-x.ai` | CNAME | `12e065e68de4a0b8.vercel-dns-017.com` | Quiz app on Vercel |
| `accelerator-x.ai` | MX (pri 1) | `SMTP.GOOGLE.COM` | Business email (Google Workspace) |
| `accelerator-x.ai` | TXT | `google-site-verification=jDfN4lyvfgQF-IBjYpFMx0qpYVNKCFVVfBSHfqunPA8` | Google verification |
| `accelerator-x.ai` | TXT | `brevo-code:49172414b1f1759991fa8d8074d7665a` | Brevo domain verification |
| `accelerator-x.ai` | TXT | `anthropic-domain-verification-p5gp9k=Sgaz8oIgfDPEy7KNuXbpsEAdL` | Anthropic verification |
| `_dmarc.accelerator-x.ai` | TXT | `v=DMARC1; p=none; rua=mailto:rua@dmarc.brevo.com` | DMARC for apex |
| `brevo1._domainkey.accelerator-x.ai` | CNAME | `b1.accelerator-x-ai.dkim.brevo.com` | Brevo DKIM signing key 1 |
| `brevo2._domainkey.accelerator-x.ai` | CNAME | `b2.accelerator-x-ai.dkim.brevo.com` | Brevo DKIM signing key 2 |
| `mail.accelerator-x.ai` | TXT | `brevo-code:49172414b1f1759991fa8d8074d7665a` | Brevo sending subdomain verification |
| `_dmarc.mail.accelerator-x.ai` | TXT | `v=DMARC1; p=none; rua=mailto:rua@dmarc.brevo.com` | DMARC for sending subdomain |
| `brevo1._domainkey.mail.accelerator-x.ai` | CNAME | `b1.mail-accelerator-x-ai.dkim.brevo.com` | Brevo mail DKIM key 1 |
| `brevo2._domainkey.mail.accelerator-x.ai` | CNAME | `b2.mail-accelerator-x-ai.dkim.brevo.com` | Brevo mail DKIM key 2 |

---

## Web hosting

- **Platform:** Netlify, free tier
- **Site name:** `accelerator-x` → permanent URL `accelerator-x.netlify.app`
- **Deploy model:** pre-built artefacts committed to repo; Netlify serves the repo root as-is (no build command on Netlify). Push to `main` → auto-deploy.
- **Branch preview:** `rebuild/v2` → https://rebuild-v2--accelerator-x.netlify.app

### SSL

Netlify provisions and auto-renews a Let's Encrypt certificate covering `accelerator-x.ai` and `www.accelerator-x.ai`. With Netlify DNS, this is fully automatic — no manual renewal ever needed.

If HTTPS stops working: go to Netlify → Domain management → HTTPS → **"Renew certificate"**. With Netlify DNS managing the zone, this will always succeed.

---

## Email

- **Provider:** Google Workspace
- **MX record:** `SMTP.GOOGLE.COM` (priority 1)
- **Accounts in use:** `andy@accelerator-x.ai`, `toby@accelerator-x.ai`, `hello@accelerator-x.ai`
- Inbound email routes directly to Google — independent of the website or Netlify.

---

## Newsletter (Brevo)

- **Platform:** Brevo, list #9 (Main AX Newsletter)
- **Sending domain:** `mail.accelerator-x.ai`
- **Sender address:** `newsletter@mail.accelerator-x.ai`
- Authentication: SPF via Brevo, DKIM via `brevo1/2._domainkey.mail` CNAMEs, DMARC at `_dmarc.mail`
- Signup flow: form → `/.netlify/functions/newsletter-subscribe` → Brevo API direct (bypasses Netlify Forms)

---

## Quiz app

- **URL:** `quiz.accelerator-x.ai`
- **Platform:** Vercel (separate Next.js app — not in this repo)
- **DNS:** CNAME → `12e065e68de4a0b8.vercel-dns-017.com`
- If the quiz stops loading: check Vercel dashboard first, then verify the CNAME in Netlify DNS panel.

---

## Incident log

### 2026-06-13 — ~2-day HTTPS outage

**What happened:** `accelerator-x.ai` went down on HTTPS around 2026-06-11. Root cause: the domain's nameservers had silently reverted to Hostinger's parking nameservers (`ns1/ns2.dns-parking.com`), which served a dead parking IP (`90.207.238.183`) for all web records. Email was unaffected (MX records were intact in the Hostinger zone). The web A records in Hostinger's zone were correct (`75.2.60.5`) but unreachable because the parking NS ignored the zone.

**Why it happened:** unknown — the domain was active and not expired. Possibly a Hostinger account/plan state change caused the NS to revert.

**How it was fixed:** migrated to Netlify-managed DNS. Netlify DNS owns the zone; there is no Hostinger zone to revert to. This class of outage cannot recur.

**Lesson:** with Netlify DNS, the nameservers are authoritative for everything. The Hostinger panel is registration-only. Do not make DNS changes in Hostinger.
