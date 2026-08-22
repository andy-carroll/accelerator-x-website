(() => {
  // Hub feed filter — driven by the guided pathway tiles at the top of /insights/.
  // Clicking a tile filters the article grid to that tag and smooth-scrolls
  // to the feed. "Show All" resets the filter.
  // Tags map to data-tag attributes on .ax-article-tile elements,
  // set by scripts/build-hub.js at build time (resolveFilterTag).

  document.addEventListener('DOMContentLoaded', () => {
    const tiles      = document.querySelectorAll('.pathway-tile');
    const cards      = document.querySelectorAll('.ax-article-tile');
    const showAllBtn = document.getElementById('show-all');
    const feedTitle  = document.getElementById('feed-title');

    if (!tiles.length || !feedTitle) return; // not on the hub page

    // Fade a card out before removing it from layout, instead of snapping it away.
    // Showing it again removes the hidden class immediately (display must be reset
    // first — a display:none element can't transition); hiding it only sets
    // display:none once the opacity fade is done. transitionend is the normal
    // trigger for that, but a fallback timer backs it up — the fade duration is
    // fixed (ArticleTile.css's .ax-article-tile transition uses --dur-base, 200ms
    // in tokens.css), and transitionend has known gaps (e.g. it won't fire if the
    // property never actually changed, such as when a card is hidden while its tab
    // is backgrounded and the browser pauses the transition before it starts).
    // finalizeHide() is idempotent and shared by both paths so a real transitionend
    // and the fallback firing for the same card is harmless.
    const HIDE_FALLBACK_MS = 250;

    function finalizeHide(card) {
      if (card.classList.contains('ax-article-tile--hidden')) {
        card.style.display = 'none';
      }
    }

    function setCardVisible(card, visible) {
      if (visible) {
        card.style.display = '';
        void card.offsetWidth; // force reflow so the removed class transitions
        card.classList.remove('ax-article-tile--hidden');
      } else {
        card.classList.add('ax-article-tile--hidden');
        setTimeout(() => finalizeHide(card), HIDE_FALLBACK_MS);
      }
    }

    cards.forEach(card => {
      card.addEventListener('transitionend', (e) => {
        if (e.propertyName === 'opacity') finalizeHide(card);
      });
    });

    function filterContent(tagId) {
      // Update active tile states
      tiles.forEach(tile => {
        const isActive = tile.getAttribute('href') === `#${tagId}`;
        tile.classList.toggle('opacity-60',   !isActive);
        tile.classList.toggle('ring-2',        isActive);
        tile.classList.toggle('ring-primary',  isActive);
        tile.classList.toggle('ring-offset-4', isActive);
      });

      // Show/hide cards
      cards.forEach(card => {
        const visible = tagId === 'all' || card.getAttribute('data-tag') === tagId;
        setCardVisible(card, visible);
      });

      // Update feed heading and show-all button
      if (tagId === 'all') {
        showAllBtn.classList.add('hidden');
        feedTitle.textContent = 'Latest Frameworks & Dispatches';
        tiles.forEach(tile => tile.classList.remove('opacity-60', 'ring-2', 'ring-primary', 'ring-offset-4'));
      } else {
        showAllBtn.classList.remove('hidden');
        const activeLabel = document.querySelector(`[href="#${tagId}"] .pathway-label`);
        feedTitle.textContent = activeLabel ? `${activeLabel.textContent} Frameworks` : 'Frameworks';
      }

      // Smooth-scroll to the feed
      feedTitle.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }

    tiles.forEach(tile => {
      tile.addEventListener('click', (e) => {
        e.preventDefault();
        filterContent(tile.getAttribute('href').slice(1));
      });
    });

    if (showAllBtn) {
      showAllBtn.addEventListener('click', () => filterContent('all'));
    }
  });
})();
