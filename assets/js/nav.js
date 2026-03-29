(() => {
  const toggles = Array.from(document.querySelectorAll('[data-mobile-nav-toggle]'));

  toggles.forEach((toggle) => {
    const menuId = toggle.getAttribute('aria-controls');
    if (!menuId) return;

    const menu = document.getElementById(menuId);
    if (!menu) return;

    const closeMenu = () => {
      menu.classList.add('hidden');
      toggle.setAttribute('aria-expanded', 'false');
    };

    const openMenu = () => {
      menu.classList.remove('hidden');
      toggle.setAttribute('aria-expanded', 'true');
    };

    toggle.addEventListener('click', () => {
      const isOpen = toggle.getAttribute('aria-expanded') === 'true';
      if (isOpen) {
        closeMenu();
      } else {
        openMenu();
      }
    });

    menu.querySelectorAll('a').forEach((link) => {
      link.addEventListener('click', closeMenu);
    });

    window.addEventListener('keydown', (event) => {
      if (event.key === 'Escape') {
        closeMenu();
      }
    });
  });
})();
