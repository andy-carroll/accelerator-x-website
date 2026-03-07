(() => {
  // ========================================
  // SCROLL REVEAL + MICRO-INTERACTION SYSTEM
  // ========================================
  // Purpose:
  // - Keep index.html declarative (no inline scripts)
  // - Centralise IntersectionObserver behaviour for scroll-triggered reveals
  // - Respect prefers-reduced-motion (no animation, but final visual state)
  //
  // Conventions:
  // - Generic elements use `.reveal` and toggle `is-visible`
  // - Section-specific accents toggle `visible` (headline underlines/circle)
  // - Apply CTA toggles `apply-visible`
  //
  // Timing strategy (staggering is handled in CSS classes on markup):
  // - Hero: headline immediate, subhead/CTA 200ms stagger
  // - Problem: headline → paras (0/100/200/300ms)
  // - Differentiators: cards (0/100/200ms)
  // - How it works: steps (0/150/300ms)
  // - Testimonials: cards (0/100/200ms)
  // - About us: founders (0/150ms)
  // - Final CTA: slower reveal (weight/importance)

  // Check for reduced motion preference - if set, skip animations entirely
  const prefersReducedMotion = window.matchMedia(
    '(prefers-reduced-motion: reduce)'
  ).matches;

  const makeAllRevealsVisible = () => {
    document.querySelectorAll('.reveal').forEach((el) => {
      el.classList.add('is-visible');
    });
  };

  const revealProblemHeadline = () => {
    const problemHeadline = document.querySelector('#problem .problem-headline');
    if (!problemHeadline) return;

    problemHeadline.classList.add('visible');
  };

  const revealDifferentHeadline = () => {
    const differentHeadline = document.querySelector('.different-headline');
    if (!differentHeadline) return;

    differentHeadline.classList.add('visible');
  };

  const revealTestimonialsHeadline = () => {
    const testimonialsHeadline = document.querySelector('.testimonials-headline');
    if (!testimonialsHeadline) return;

    testimonialsHeadline.classList.add('visible');
  };

  const revealProcessSection = () => {
    const processCards = document.querySelectorAll('.process-card');
    const energyLine = document.querySelector('.energy-line');
    const connector = document.querySelector('.step-connector');

    processCards.forEach((card) => card.classList.add('visible'));
    if (energyLine) energyLine.classList.add('visible');
    if (connector) connector.classList.add('visible');
  };

  const revealApplySection = () => {
    const applyShell = document.querySelector('.apply-shell');
    if (!applyShell) return;

    applyShell.classList.add('apply-visible');
  };

  const initialiseHeroLibrary = () => {
    const library = document.querySelector('[data-hero-library]');
    if (!library) return;

    const slides = Array.from(library.querySelectorAll('[data-hero-slide]'));
    if (slides.length < 2) return;

    const hydrateSlide = (slide) => {
      if (!slide || slide.dataset.heroLoaded === 'true') return;

      const pictureSource = slide.querySelector('source[data-srcset]');
      if (pictureSource) {
        pictureSource.setAttribute('srcset', pictureSource.dataset.srcset);
        if (pictureSource.dataset.sizes) {
          pictureSource.setAttribute('sizes', pictureSource.dataset.sizes);
        }
      }

      const image = slide.querySelector('img[data-src]');
      if (image) {
        image.setAttribute('src', image.dataset.src);
        if (image.dataset.srcset) {
          image.setAttribute('srcset', image.dataset.srcset);
        }
        if (image.dataset.sizes) {
          image.setAttribute('sizes', image.dataset.sizes);
        }
      }

      slide.dataset.heroLoaded = 'true';
    };

    let activeIndex = slides.findIndex((slide) => slide.classList.contains('is-active'));
    if (activeIndex === -1) activeIndex = 0;

    hydrateSlide(slides[activeIndex]);
    if (slides.length > 1) {
      hydrateSlide(slides[(activeIndex + 1) % slides.length]);
    }

    const interval = Number.parseInt(library.dataset.heroInterval || '6500', 10);
    if (!Number.isFinite(interval) || interval < 3000) return;

    window.setInterval(() => {
      slides[activeIndex].classList.remove('is-active');
      activeIndex = (activeIndex + 1) % slides.length;
      hydrateSlide(slides[activeIndex]);
      if (slides.length > 2) {
        hydrateSlide(slides[(activeIndex + 1) % slides.length]);
      }
      slides[activeIndex].classList.add('is-active');
    }, interval);
  };

  if (prefersReducedMotion) {
    makeAllRevealsVisible();
    revealProblemHeadline();
    revealDifferentHeadline();
    revealTestimonialsHeadline();
    revealProcessSection();
    revealApplySection();
    return;
  }

  initialiseHeroLibrary();

  // Intersection Observer configuration
  const observerOptions = {
    root: null,
    rootMargin: '0px 0px -50px 0px',
    threshold: 0.1,
  };

  // Generic reveals (fade + translate)
  const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;

      entry.target.classList.add('is-visible');
      observer.unobserve(entry.target);
    });
  }, observerOptions);

  document.querySelectorAll('.reveal').forEach((el) => revealObserver.observe(el));

  // Apply section hand-drawn accents
  const applySection = document.querySelector('#apply');
  const applyShell = document.querySelector('.apply-shell');
  if (applySection && applyShell) {
    const applyObserver = new IntersectionObserver(
      (entries, observer) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;

          applyShell.classList.add('apply-visible');
          observer.unobserve(entry.target);
        });
      },
      { threshold: 0.2 }
    );

    applyObserver.observe(applySection);
  }

  // Problem headline (hero-style quick reveal after small scroll)
  const problemHeadline = document.querySelector('#problem .problem-headline');
  if (problemHeadline) {
    const onScrollTrigger = () => {
      if (window.scrollY > 80) {
        problemHeadline.classList.add('visible');
        window.removeEventListener('scroll', onScrollTrigger);
      }
    };

    if (window.scrollY > 80) {
      problemHeadline.classList.add('visible');
    } else {
      window.addEventListener('scroll', onScrollTrigger, { passive: true });
    }
  }

  // Different section headline underline
  const differentHeadline = document.querySelector('.different-headline');
  if (differentHeadline) {
    const differentObserver = new IntersectionObserver(
      (entries, observer) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;

          differentHeadline.classList.add('visible');
          observer.unobserve(entry.target);
        });
      },
      { threshold: 0.2 }
    );

    differentObserver.observe(differentHeadline);
  }

  // Testimonials section headline circle
  const testimonialsHeadline = document.querySelector('.testimonials-headline');
  if (testimonialsHeadline) {
    const testimonialsObserver = new IntersectionObserver(
      (entries, observer) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;

          testimonialsHeadline.classList.add('visible');
          observer.unobserve(entry.target);
        });
      },
      { threshold: 0.2 }
    );

    testimonialsObserver.observe(testimonialsHeadline);
  }

  // Process section animations: cards + energy line
  const processSection = document.querySelector('#process');
  if (processSection) {
    const processObserver = new IntersectionObserver(
      (entries, observer) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;

          revealProcessSection();
          observer.unobserve(entry.target);
        });
      },
      { threshold: 0.2 }
    );

    processObserver.observe(processSection);
  }
})();
