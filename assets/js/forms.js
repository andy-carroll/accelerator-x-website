(() => {
  // ============================================================
  // FORM HANDLERS — accelerator-x.ai
  // ============================================================
  // All form submissions on the site go through this file.
  // No inline scripts. No exceptions.
  //
  // Lead capture  (#lead-form)         → POST /  (Netlify Forms)
  //                                    → submission-created.js
  //                                    → Airtable + Slack #website-leads
  //
  // Newsletter    (#newsletter-form)   → POST /.netlify/functions/newsletter-subscribe
  //                                    → Brevo list #9 + Slack #website-leads
  //
  // Both handlers are independent — either can exist on a page without the other.
  // ============================================================

  const isSubmitting = new WeakMap();

  const setSubmitState = (btn, { disabled, label }) => {
    if (!btn) return;
    btn.disabled = disabled;
    btn.classList.toggle('opacity-70', disabled);
    if (label) btn.textContent = label;
  };

  const showError = (el, message) => {
    if (!el) return;
    if (message) el.textContent = message;
    el.classList.remove('hidden');
  };

  const clearError = (el) => {
    if (!el) return;
    el.textContent = '';
    el.classList.add('hidden');
  };

  // ── Lead capture ─────────────────────────────────────────────────────────

  const leadForm       = document.getElementById('lead-form');
  const leadSuccess    = document.getElementById('form-success');
  const leadError      = document.getElementById('form-error');

  if (leadForm) {
    const normaliseWebsite = () => {
      const f = document.getElementById('website');
      if (f && f.value.trim() && !f.value.trim().match(/^https?:\/\//)) {
        f.value = `https://${f.value.trim()}`;
      }
    };

    const showLeadSuccess = () => {
      leadForm.classList.add('hidden');
      if (!leadSuccess) return;
      leadSuccess.classList.remove('hidden');
      leadSuccess.classList.add('is-visible');
      const icon = leadSuccess.querySelector('.material-symbols-outlined');
      if (icon) {
        icon.animate(
          [
            { transform: 'scale(0.9)', opacity: 0.2 },
            { transform: 'scale(1.05)', opacity: 1 },
            { transform: 'scale(1)',    opacity: 1 },
          ],
          { duration: 300, easing: 'cubic-bezier(0.25, 0.1, 0.25, 1)' }
        );
      }
    };

    leadForm.addEventListener('submit', (e) => {
      e.preventDefault();
      if (isSubmitting.get(leadForm)) return;
      isSubmitting.set(leadForm, true);

      normaliseWebsite();
      clearError(leadError);

      const btn          = leadForm.querySelector('button[type="submit"]');
      const originalLabel = btn ? btn.textContent : '';
      setSubmitState(btn, { disabled: true, label: 'Submitting...' });

      fetch('/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: new URLSearchParams(new FormData(leadForm)).toString(),
      })
        .then((res) => {
          if (!res.ok) throw new Error(`Status ${res.status}`);
          showLeadSuccess();
        })
        .catch((err) => {
          console.error('Lead form error:', err);
          showError(leadError, 'There was an error submitting your application. Please try again or email us at hello@accelerator-x.ai');
          setSubmitState(btn, { disabled: false, label: originalLabel });
        })
        .finally(() => {
          isSubmitting.set(leadForm, false);
        });
    });
  }

  // ── Newsletter signup ─────────────────────────────────────────────────────
  // Covers: homepage footer, insights hub index, article nurture-trap.
  // All instances use the same IDs: #newsletter-form, #newsletter-success, #newsletter-error.

  const newsletterForm    = document.getElementById('newsletter-form');
  const newsletterSuccess = document.getElementById('newsletter-success');
  const newsletterError   = document.getElementById('newsletter-error');

  if (newsletterForm) {
    newsletterForm.addEventListener('submit', (e) => {
      e.preventDefault();
      if (isSubmitting.get(newsletterForm)) return;
      isSubmitting.set(newsletterForm, true);

      const emailInput    = newsletterForm.querySelector('input[type="email"]');
      const email         = emailInput ? emailInput.value.trim() : '';
      const btn           = newsletterForm.querySelector('button[type="submit"]');
      const originalLabel = btn ? btn.textContent : '';

      if (!email) {
        isSubmitting.set(newsletterForm, false);
        return;
      }

      clearError(newsletterError);
      setSubmitState(btn, { disabled: true, label: 'Subscribing…' });

      fetch('/.netlify/functions/newsletter-subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, source: 'newsletter_form' }),
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.success) {
            newsletterForm.classList.add('hidden');
            if (newsletterSuccess) newsletterSuccess.classList.remove('hidden');
          } else {
            throw new Error(data.error || 'Unknown error');
          }
        })
        .catch((err) => {
          console.error('Newsletter form error:', err);
          setSubmitState(btn, { disabled: false, label: originalLabel });
          showError(newsletterError, 'Something went wrong — please try again.');
        })
        .finally(() => {
          isSubmitting.set(newsletterForm, false);
        });
    });
  }
})();
