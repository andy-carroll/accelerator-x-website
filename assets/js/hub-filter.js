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
        card.style.display = visible ? '' : 'none';
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
