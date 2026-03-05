const fs = require('fs');
const path = require('path');

const ROOT = path.resolve(__dirname, '..');
const START_MARKER = '<!-- FOOTER_COMPONENT_START -->';
const END_MARKER = '<!-- FOOTER_COMPONENT_END -->';

const targets = [
  { file: 'index.html', variant: 'subscribe' },
  { file: 'newsletter-thanks.html', variant: 'subscribed' },
];

const socialSlots = [
  {
    label: 'LinkedIn',
    href: 'https://www.linkedin.com/company/accelerator-x/',
    icon: '<svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>',
  },
  // {
  //   label: 'X',
  //   href: '',
  //   icon: '<span aria-hidden="true">X</span>',
  // },
  // {
  //   label: 'YouTube',
  //   href: '',
  //   icon: '<span aria-hidden="true">YT</span>',
  // },
];

function renderSocialSlots() {
  return socialSlots
    .map((slot) => {
      if (slot.href) {
        return `<a href="${slot.href}" target="_blank" rel="noopener noreferrer" class="social-slot" aria-label="${slot.label}">${slot.icon}</a>`;
      }

      return `<span class="social-slot social-slot-placeholder" aria-label="${slot.label} coming soon" title="${slot.label} coming soon">${slot.icon}</span>`;
    })
    .join('');
}

function renderCard(variant) {
  if (variant === 'subscribed') {
    return `
          <div class="footer-card">
            <h3 class="font-display text-xl font-bold text-navy">Weekly dispatch</h3>
            <p class="mt-2 text-sm text-muted">You’re subscribed. While you wait for the next issue, dive into the latest practical frameworks.</p>
            <div class="mt-5 flex flex-col gap-3 sm:flex-row">
              <a href="/insights/" class="btn btn-primary">Read Insights</a>
              <a href="/#apply" class="btn btn-secondary">Apply to work with us</a>
            </div>
          </div>`;
  }

  return `
          <div class="footer-card" id="newsletter">
            <h3 class="font-display text-xl font-bold text-navy">Get the weekly dispatch</h3>
            <p class="mt-2 text-sm text-muted">High-signal notes for leaders building real AI capability. No hype.</p>

            <form name="newsletter-signup" method="POST" action="/newsletter-thanks.html" netlify class="mt-5" id="newsletter-form">
              <input type="hidden" name="form-name" value="newsletter-signup" />
              <label for="footer-newsletter-email" class="sr-only">Work email</label>
              <div class="footer-subscribe-row">
                <input
                  id="footer-newsletter-email"
                  type="email"
                  name="email"
                  required
                  class="w-full rounded-md border border-strong px-4 py-3 text-navy focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/20"
                  placeholder="you@company.com"
                />
                <button type="submit" class="btn btn-primary">Subscribe</button>
              </div>
              <p class="mt-3 text-xs text-muted">One useful note each week. Unsubscribe anytime.</p>
            </form>

            <div id="newsletter-success" class="hidden mt-4 rounded-lg bg-surface p-4" role="status" aria-live="polite">
              <p class="font-medium text-navy">Thanks — you’re subscribed.</p>
              <p class="mt-1 text-sm text-muted">Check your inbox for a confirmation email.</p>
            </div>
          </div>`;
}

function renderFooter(variant) {
  return `${START_MARKER}
    <footer class="site-footer border-t border-surface bg-background py-12 lg:py-14">
      <div class="mx-auto max-w-6xl px-4">
        <div class="footer-grid">
          <div>
            <a href="/" class="inline-flex items-center" aria-label="Accelerator X home">
              <img
                src="/assets/icons/AX-wordmark-and-logo.png"
                alt="Accelerator X"
                class="h-5 w-auto sm:h-6"
                width="1125"
                height="195"
                loading="lazy"
                decoding="async"
              />
            </a>
            <p class="mt-4 max-w-xs text-sm text-muted">
              Practical frameworks for leaders building real AI capability.
            </p>
          </div>

          <div>
            <h3 class="footer-heading">Explore</h3>
            <div class="mt-4 flex flex-col gap-2 text-sm">
              <a href="/insights/" class="footer-link">Insights</a>
              <a href="/#apply" class="footer-link">Apply to work with us</a>
            </div>

            <h3 class="footer-heading mt-8">Connect</h3>
            <div class="mt-4">
              <div class="footer-social-slots" aria-label="Social links">
                ${renderSocialSlots()}
              </div>
            </div>
            <p class="mt-3 text-xs text-muted">More channels coming soon.</p>
          </div>

${renderCard(variant)}
        </div>

        <div class="footer-bottom mt-10 border-t border-surface pt-5">
          <div class="flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-muted">
            <a href="/privacy.html" class="footer-link">Privacy</a>
            <a href="/terms.html" class="footer-link">Terms</a>
          </div>
          <p class="text-sm text-muted">© 2026 Accelerator X. All rights reserved.</p>
        </div>
      </div>
    </footer>
${END_MARKER}`;
}

function replaceFooter(content, variant) {
  const generated = renderFooter(variant);
  const markerRegex = /<!-- FOOTER_COMPONENT_START -->[\s\S]*?<!-- FOOTER_COMPONENT_END -->/;
  if (markerRegex.test(content)) {
    return content.replace(markerRegex, generated);
  }

  const footerRegex = /<footer class="site-footer[\s\S]*?<\/footer>/;
  if (footerRegex.test(content)) {
    return content.replace(footerRegex, generated);
  }

  throw new Error(`Could not find footer block to replace for variant: ${variant}`);
}

for (const target of targets) {
  const filePath = path.join(ROOT, target.file);
  const existing = fs.readFileSync(filePath, 'utf8');
  const updated = replaceFooter(existing, target.variant);

  if (updated !== existing) {
    fs.writeFileSync(filePath, updated, 'utf8');
    console.log(`✅ Footer component synced: ${target.file} (${target.variant})`);
  } else {
    console.log(`ℹ️ Footer unchanged: ${target.file}`);
  }
}
