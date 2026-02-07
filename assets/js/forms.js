(() => {
  // ========================================
  // NETLIFY FORMS (LEAD CAPTURE)
  // ========================================
  // Purpose:
  // - Submit the form via fetch (no redirect) and swap to an inline success state.
  // - Keep index.html declarative by avoiding inline scripts.
  //
  // Conventions:
  // - `#lead-form` is the source of truth for field names used by Netlify.
  // - `#form-success` stays in the DOM (a11y-friendly) and is toggled via `hidden`.
  // - Website field is normalised to include a scheme (https://) to prevent partial URLs.

  const form = document.getElementById('lead-form');
  if (!form) return;

  const successDiv = document.getElementById('form-success');

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

  const showSuccessState = () => {
    if (!successDiv) return;

    form.classList.add('hidden');
    successDiv.classList.remove('hidden');
    successDiv.classList.add('is-visible');

    const icon = successDiv.querySelector('.material-symbols-outlined');
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

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    normaliseWebsiteField();

    const submitBtn = form.querySelector('button[type="submit"]');
    setSubmitState(submitBtn, {
      disabled: true,
      label: 'Submitting your application...',
    });

    fetch('/', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: new URLSearchParams(new FormData(form)).toString(),
    })
      .then(() => {
        showSuccessState();
      })
      .catch((error) => {
        console.error('Form submission error:', error);
        alert(
          "There was an error submitting your application. Please try again or email us directly at hello@accelerator-x.ai"
        );

        setSubmitState(submitBtn, {
          disabled: false,
          label: 'Apply to work with us',
        });
      });
  });
})();
