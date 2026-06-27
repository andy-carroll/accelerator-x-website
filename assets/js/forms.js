(() => {
  // ============================================================
  // FORM HANDLERS — accelerator-x.ai
  // ============================================================
  // All form submissions on the site go through this file.
  // No inline scripts. No exceptions.
  //
  // Lead capture  (#lead-form)         → POST /.netlify/functions/submission-created
  //                                    → Airtable + Slack #website-leads
  //
  // Newsletter    (#newsletter-form)   → POST /.netlify/functions/newsletter-subscribe
  //                                    → Brevo list #9 + Slack #website-leads
  //
  // Both handlers are independent — either can exist on a page without the other.
  // ============================================================

  const isSubmitting = new WeakMap();

  // Analytics — fire-and-forget. PostHog is init-deferred (see analytics.js) and its
  // snippet queues capture() calls before init, so guarding on existence is enough.
  // Never pass PII (name/email/company) in properties — only non-identifying context.
  const track = (event, props = {}) => {
    try {
      if (window.posthog && typeof window.posthog.capture === 'function') {
        window.posthog.capture(event, props);
      }
    } catch (_) { /* analytics must never break a form */ }
  };

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

  const leadForms = Array.from(document.querySelectorAll('[data-lead-form], #lead-form'));

  leadForms.forEach((leadForm) => {
    const leadSuccess = document.getElementById(leadForm.dataset.successId || 'form-success');
    const leadError = document.getElementById(leadForm.dataset.errorId || 'form-error');
    const leadSource = leadForm.dataset.source || 'apply_form';

    // Funnel step: apply_form_start — fires once when the user first engages the form.
    let started = false;
    leadForm.addEventListener('focusin', () => {
      if (started) return;
      started = true;
      track('apply_form_start', { location: leadSource });
    }, { once: false });

    const normaliseWebsite = () => {
      const f = leadForm.querySelector('input[name="website"]');
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
            { transform: 'scale(1)', opacity: 1 },
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

      const formData = new FormData(leadForm);
      const payload = {
        'form-name': formData.get('form-name') || 'lead-capture-form',
        name: formData.get('name'),
        email: formData.get('email'),
        company: formData.get('company'),
        website: formData.get('website'),
        role: formData.get('role'),
        timeline: formData.get('timeline'),
        message: formData.get('message') || '',
        interest: formData.get('interest') || leadForm.dataset.interest || '',
        source: formData.get('source') || leadForm.dataset.source || '',
        _honeypot: formData.get('_honeypot') || '',
        consent_given: formData.get('consent_given') === 'true',
        consent_timestamp: new Date().toISOString()
      };

      fetch('/.netlify/functions/lead-capture', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.error) throw new Error(data.error);
          // Conversion event — non-PII context only (timeline/interest/source).
          // NB: timeline + interest are select-dropdown values, so safe to send. If either
          // ever becomes a free-text field, drop it here — never send free-text (PII risk).
          track('apply_form_submit', {
            timeline: payload.timeline || '',
            interest: payload.interest || '',
            location: leadSource
          });
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
  });

  // ── Newsletter signup ─────────────────────────────────────────────────────
  // One handler for every NewsletterSignup instance (the footer band on all pages,
  // plus an in-page band on content pages). Binds by class and resolves status nodes
  // relative to each form, so a page can carry more than one with no duplicate IDs.
  // The component uses the native `hidden` attribute for form/status visibility.

  const setHidden = (el, hidden) => {
    if (!el) return;
    if (hidden) el.setAttribute('hidden', '');
    else el.removeAttribute('hidden');
  };

  const newsletterForms = Array.from(document.querySelectorAll('form.js-newsletter-form'));

  newsletterForms.forEach((form) => {
    const scope   = form.closest('.ax-newsletter') || form.parentElement;
    const success = scope ? scope.querySelector('.ax-newsletter__status--success') : null;
    const error   = scope ? scope.querySelector('.ax-newsletter__status--error') : null;

    form.addEventListener('submit', (e) => {
      e.preventDefault();
      if (isSubmitting.get(form)) return;

      const emailInput    = form.querySelector('input[type="email"]');
      const email         = emailInput ? emailInput.value.trim() : '';
      const btn           = form.querySelector('button[type="submit"]');
      const originalLabel = btn ? btn.textContent : '';

      if (!email) return; // let native required validation handle the empty case

      isSubmitting.set(form, true);
      setHidden(error, true);
      setSubmitState(btn, { disabled: true, label: 'Subscribing…' });

      fetch('/.netlify/functions/newsletter-subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, source: form.dataset.newsletterSource || 'newsletter_form' }),
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.success) {
            track('newsletter_subscribe', { location: form.dataset.newsletterSource || 'newsletter_form' });
            setHidden(form, true);
            setHidden(success, false);
          } else {
            throw new Error(data.error || 'Unknown error');
          }
        })
        .catch((err) => {
          console.error('Newsletter form error:', err);
          setSubmitState(btn, { disabled: false, label: originalLabel });
          setHidden(error, false);
        })
        .finally(() => {
          isSubmitting.set(form, false);
        });
    });
  });
})();
