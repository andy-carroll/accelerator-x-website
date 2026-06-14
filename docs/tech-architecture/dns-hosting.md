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

### 2026-06-13 (part 2) — CORRECTION: the "outage" was an ISP filter, not DNS

**The site was never actually down.** A full diagnostic on 2026-06-13 proved `accelerator-x.ai` was serving `HTTP 200` from Netlify globally the whole time, with a valid SSL cert and correct DNS. The perceived outage was **Sky Broadband Shield** (Sky's content filter) DNS-blocking the domain *on Andy's home connection only*.

**Evidence:**
- Global DNS (Cloudflare DoH) + direct HTTPS to the Netlify IPs (`63.176.8.218`, `35.157.26.135`) → `HTTP 200, server: Netlify`, cert valid. Those AWS-Frankfurt IPs **are** Netlify (current infra, not legacy `75.2.60.5`).
- From the Sky connection: `http://` redirected to `block.isp.sky.com`; `https://` silently timed out (Sky can't MITM TLS, so it drops the connection → white screen). Confirmed working instantly on mobile data.
- Reputation sweep all clean: Google Safe Browsing, Spamhaus DBL, SURBL, Spamhaus ZEN (IPs). Not on any industry blocklist — this was Sky's own proprietary heuristic (likely `.ai` TLD + recent NS change reading as "new/suspicious").

**This also corrects the 2026-06-11 entry below.** The IP `90.207.238.183` cited there as a "Hostinger parking IP" is in fact **`SKY-BROADBAND / Sky UK Limited`** (confirmed by whois — `netname: SKY-BROADBAND`). It is Sky's block-page server. So the original outage was very likely the *same* Sky filter, misdiagnosed as a nameserver reversion. The Netlify DNS migration was not wrong (it's a better setup and worth keeping), but it did not fix the outage — the filter lifting intermittently created the illusion that it had.

**Resolution / actions:**
- Cleared on Andy's account via Sky Broadband Shield settings (allow-list / protection level).
- TODO: submit `accelerator-x.ai` to Sky as **miscategorised** from the block page → clears it at Sky's network level for all Sky customers, not just one account.
- Site reputation confirmed healthy; email deliverability unaffected.

**Lesson:** if the site is unreachable from one connection but resolves/serves fine globally (test with `dig @1.1.1.1` + `curl --resolve <domain>:443:<ip>`), suspect an **ISP/content filter before DNS**. A `.ai` domain on a consumer ISP with parental/security filtering is a known false-positive pattern.

### 2026-06-11 — ~2-day HTTPS "outage" *(see correction above — root cause was the Sky filter, not this)*

**What was believed at the time:** `accelerator-x.ai` went down on HTTPS around 2026-06-11. The theory was that the domain's nameservers had reverted to Hostinger's parking nameservers (`ns1/ns2.dns-parking.com`) serving a dead parking IP (`90.207.238.183`). **This IP was later confirmed to be Sky's block-page server, not Hostinger's** — so this diagnosis was wrong. Email was unaffected throughout.

**How it was "fixed":** migrated to Netlify-managed DNS. This is a genuinely better setup (Netlify DNS owns the zone, nothing to revert to) and worth keeping — but it was not the actual fix for the outage.

**Lesson:** with Netlify DNS, the nameservers are authoritative for everything. The Hostinger panel is registration-only. Do not make DNS changes in Hostinger.
