(() => {
  // Reveal optional article blocks — BLUF box, nurture-trap CTA, momentum footer.
  // Each container starts hidden; we un-hide it only if the build system injected a
  // non-empty value into its data attribute (token substitution happens at build time).
  document.addEventListener('DOMContentLoaded', () => {
    const reveal = (selector, attr) => {
      const el = document.querySelector(selector);
      if (!el) return;
      const v = el.dataset[attr] || '';
      if (v.trim() && !v.includes('}}')) el.classList.remove('hidden');
    };

    reveal('.bluf-container', 'bluf');
    reveal('.nurture-trap', 'cta');
    reveal('.momentum-footer', 'next');
  });
})();
