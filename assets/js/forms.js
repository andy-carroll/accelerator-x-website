(() => {
  // ========================================
  // NETLIFY FORMS (LEAD CAPTURE ONLY)
  // ========================================
  // Purpose:
  // - Submit the lead capture form via fetch (no redirect) and swap to an inline success state.
  // - Keep index.html declarative by avoiding inline scripts.
  //
  // Newsletter signup is handled separately by inline scripts on each page
  // that post directly to /.netlify/functions/newsletter-subscribe.
  //
  // Conventions:
  // - `#lead-form` is the source of truth for field names used by Netlify.
  // - `#form-success` stays in the DOM (a11y-friendly) and is toggled via `hidden`.
  // - Website field is normalised to include a scheme (https://) to prevent partial URLs.

  const leadForm = document.getElementById('lead-form');
  const leadSuccessDiv = document.getElementById('form-success');
  const leadErrorDiv = document.getElementById('form-error');

  if (!leadForm) return;

  const isSubmittingByForm = new WeakMap();

  const normaliseWebsiteField = () => {
    const websiteField = document.getElementById('website');
    if (!websiteField) return;

    const websiteValue = websiteField.value.trim();
    if (websiteValue && !websiteValue.match(/^https?:\/\//)) {
      websiteField.value = `https://${websiteValue}`;
    }
  };

  const setSubmitState = (submitBtn, { disabled, label }) => {
    if (!submitBtn) return;

    submitBtn.disabled = disabled;
    submitBtn.classList.toggle('opacity-70', disabled);
    if (label) submitBtn.textContent = label;
  };

  const showErrorState = (targetErrorDiv, message) => {
    if (!targetErrorDiv) return;

    targetErrorDiv.textContent =
      message ||
      "There was an error submitting your application. Please try again or email us directly at hello@accelerator-x.ai";
    targetErrorDiv.classList.remove('hidden');
  };

  const clearErrorState = (targetErrorDiv) => {
    if (!targetErrorDiv) return;

    targetErrorDiv.textContent = '';
    targetErrorDiv.classList.add('hidden');
  };

  const showLeadSuccessState = () => {
    if (!leadForm || !leadSuccessDiv) return;

    leadForm.classList.add('hidden');
    leadSuccessDiv.classList.remove('hidden');
    leadSuccessDiv.classList.add('is-visible');

    const icon = leadSuccessDiv.querySelector('.material-symbols-outlined');
    if (!icon) return;

    icon.animate(
      [
        { transform: 'scale(0.9)', opacity: 0.2 },
        { transform: 'scale(1.05)', opacity: 1 },
        { transform: 'scale(1)', opacity: 1 },
      ],
      { duration: 300, easing: 'cubic-bezier(0.25, 0.1, 0.25, 1)' }
    );
  };

  const handleSubmit = ({ form, onBeforeSubmit, onSuccess, onErrorDiv }) => (e) => {
    e.preventDefault();

    if (isSubmittingByForm.get(form)) return;
    isSubmittingByForm.set(form, true);

    if (onBeforeSubmit) onBeforeSubmit();

    clearErrorState(onErrorDiv);

    const submitBtn = form.querySelector('button[type="submit"]');
    const originalLabel = submitBtn ? submitBtn.textContent : '';

    setSubmitState(submitBtn, {
      disabled: true,
      label: 'Submitting...',
    });

    fetch('/', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: new URLSearchParams(new FormData(form)).toString(),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(`Unexpected response status: ${response.status}`);
        }

        if (onSuccess) onSuccess();
      })
      .catch((error) => {
        console.error('Form submission error:', error);

        if (onErrorDiv) {
          showErrorState(onErrorDiv);
        }

        setSubmitState(submitBtn, {
          disabled: false,
          label: originalLabel,
        });
      })
      .finally(() => {
        isSubmittingByForm.set(form, false);
      });
  };

  leadForm.addEventListener(
    'submit',
    handleSubmit({
      form: leadForm,
      onBeforeSubmit: normaliseWebsiteField,
      onSuccess: showLeadSuccessState,
      onErrorDiv: leadErrorDiv,
    })
  );
})();
