/* Open all FAQ items at desktop widths on load. Safe to include on any page. */
(function () {
  if (!document.querySelector('.ax-faq-item')) return;
  document.querySelectorAll('.ax-faq-item details').forEach(function (d) {
    if (window.innerWidth >= 1024) { d.open = true; }
  });
})();
