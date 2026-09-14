(function() {
  var toggle = document.getElementById('mob-toggle');
  var drawer = document.getElementById('mob-drawer');
  var overlay = document.getElementById('mob-overlay');
  var closeBtn = document.getElementById('drawer-close');
  if (!toggle || !drawer) return;

  function openDrawer() {
    drawer.removeAttribute('hidden');
    requestAnimationFrame(function() {
      drawer.classList.add('is-open');
    });
    overlay.classList.add('visible');
    toggle.setAttribute('aria-expanded', 'true');
    document.documentElement.style.overflow = 'hidden';
  }
  function closeDrawer() {
    drawer.classList.remove('is-open');
    overlay.classList.remove('visible');
    toggle.setAttribute('aria-expanded', 'false');
    document.documentElement.style.overflow = '';
    setTimeout(function() {
      drawer.setAttribute('hidden', '');
    }, 300);
  }

  toggle.addEventListener('click', function() {
    toggle.getAttribute('aria-expanded') === 'true' ? closeDrawer() : openDrawer();
  });
  if (closeBtn) closeBtn.addEventListener('click', closeDrawer);
  if (overlay) overlay.addEventListener('click', closeDrawer);

  drawer.querySelectorAll('a').forEach(function(a) {
    a.addEventListener('click', closeDrawer);
  });

  document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') closeDrawer();
  });

  // Mobile accordion toggles (mega-menu sub-lists inside the drawer)
  document.querySelectorAll('.mob-accordion-toggle').forEach(function(btn) {
    btn.addEventListener('click', function(e) {
      e.preventDefault();
      var expanded = btn.getAttribute('aria-expanded') === 'true';
      var sublist = document.getElementById(btn.getAttribute('aria-controls'));
      btn.setAttribute('aria-expanded', String(!expanded));
      if (sublist) sublist.hidden = expanded;
    });
  });

  // Desktop mega menu: Escape blurs focus out of the item, closing the panel via :focus-within
  document.querySelectorAll('.nav-item').forEach(function(item) {
    item.addEventListener('keydown', function(e) {
      if (e.key === 'Escape' && document.activeElement && item.contains(document.activeElement)) {
        document.activeElement.blur();
      }
    });
  });
})();
