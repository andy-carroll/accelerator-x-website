(() => {
  // Hub feed filter — driven by the guided pathway tiles at the top of /insights/.
  // Clicking a tile filters the article grid to that category and smooth-scrolls
  // to the feed. "Show All" resets the filter.
  // Categories map to data-category attributes on .article-card elements,
  // which are set by scripts/build-hub.js at build time.

  document.addEventListener('DOMContentLoaded', () => {
    const tiles      = document.querySelectorAll('.pathway-tile');
    const cards      = document.querySelectorAll('.article-card');
    const showAllBtn = document.getElementById('show-all');
    const feedTitle  = document.getElementById('feed-title');

    if (!tiles.length || !feedTitle) return; // not on the hub page

    function filterContent(categoryId) {
      // Update active tile states
      tiles.forEach(tile => {
        const isActive = tile.getAttribute('href') === `#${categoryId}`;
        tile.classList.toggle('opacity-60',                !isActive);
        tile.classList.toggle('ring-2',                    !isActive ? false : true);
        tile.classList.toggle('ring-primary',              !isActive ? false : true);
        tile.classList.toggle('ring-offset-4',             !isActive ? false : true);
      });

      // Show/hide cards
      cards.forEach(card => {
        const visible = categoryId === 'all' || card.getAttribute('data-category') === categoryId;
        card.style.display = visible ? 'block' : 'none';
      });

      // Update feed heading and show-all button
      if (categoryId === 'all') {
        showAllBtn.classList.add('hidden');
        feedTitle.textContent = 'Latest Frameworks & Dispatches';
        tiles.forEach(tile => tile.classList.remove('opacity-60', 'ring-2', 'ring-primary', 'ring-offset-4'));
      } else {
        showAllBtn.classList.remove('hidden');
        const activeLabel = document.querySelector(`[href="#${categoryId}"] .pathway-label`);
        feedTitle.textContent = activeLabel ? `${activeLabel.textContent} Frameworks` : 'Frameworks';
      }

      // Smooth-scroll to the feed
      feedTitle.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }

    tiles.forEach(tile => {
      tile.addEventListener('click', (e) => {
        e.preventDefault();
        filterContent(tile.getAttribute('href').replace('#', ''));
      });
    });

    if (showAllBtn) {
      showAllBtn.addEventListener('click', () => filterContent('all'));
    }
  });
})();
