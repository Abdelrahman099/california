/* The smaller header: dropdowns (hover with a mouse, click or keyboard otherwise), search box, phone menu. */
(function () {
  var head = document.querySelector('[data-sh]');
  if (!head) return;
  var nav = head.querySelector('.sh-nav');
  var burger = head.querySelector('[data-sh-burger]');
  var searchBtn = head.querySelector('[data-sh-search]');
  var search = head.querySelector('.sh-search');
  var drops = [].slice.call(head.querySelectorAll('[data-drop]'));
  var phone = window.matchMedia('(max-width: 991px)');

  function setDrop(drop, open) {
    drop.classList.toggle('is-open', open);
    drop.querySelector('button').setAttribute('aria-expanded', open ? 'true' : 'false');
  }
  function closeDrops(except) {
    drops.forEach(function (d) { if (d !== except) setDrop(d, false); });
  }
  function setMenu(open) {
    nav.classList.toggle('is-open', open);
    burger.setAttribute('aria-expanded', open ? 'true' : 'false');
    burger.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
    if (!open) closeDrops();
  }

  drops.forEach(function (drop) {
    var btn = drop.querySelector('button');
    var timer;
    var hoverOpened = false;
    drop.addEventListener('pointerenter', function (e) {
      if (e.pointerType !== 'mouse' || phone.matches) return;
      clearTimeout(timer);
      closeDrops(drop);
      if (!drop.classList.contains('is-open')) hoverOpened = true;
      setDrop(drop, true);
    });
    drop.addEventListener('pointerleave', function (e) {
      if (e.pointerType !== 'mouse' || phone.matches) return;
      timer = setTimeout(function () { setDrop(drop, false); hoverOpened = false; }, 250);
    });
    btn.addEventListener('click', function () {
      // A mouse click right after hover has opened it should not close it again.
      if (hoverOpened) { hoverOpened = false; return; }
      var open = !drop.classList.contains('is-open');
      closeDrops(drop);
      setDrop(drop, open);
    });
  });

  burger.addEventListener('click', function () { setMenu(!nav.classList.contains('is-open')); });
  nav.addEventListener('click', function (e) { if (e.target.closest('a')) setMenu(false); });
  phone.addEventListener('change', function () { setMenu(false); });

  if (searchBtn && search) {
    searchBtn.addEventListener('click', function () {
      var open = search.hidden;
      search.hidden = !open;
      searchBtn.setAttribute('aria-expanded', open ? 'true' : 'false');
      if (open) search.querySelector('input').focus();
    });
  }

  document.addEventListener('keydown', function (e) {
    if (e.key !== 'Escape') return;
    closeDrops();
    setMenu(false);
    if (search) search.hidden = true;
  });
  document.addEventListener('click', function (e) {
    if (!head.contains(e.target)) { closeDrops(); setMenu(false); }
  });

  // Promise figures count up once as they scroll into view. The real number is in the page without this.
  var counts = document.querySelectorAll('[data-count]');
  if (counts.length && 'IntersectionObserver' in window && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    var seen = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        seen.unobserve(entry.target);
        var el = entry.target, to = +el.getAttribute('data-count'), t0 = performance.now();
        (function tick(now) {
          var p = Math.min(1, (now - t0) / 1100);
          el.textContent = Math.round(to * (1 - Math.pow(1 - p, 3))) + '%';
          if (p < 1) requestAnimationFrame(tick);
        })(t0);
      });
    }, { threshold: 0.5 });
    counts.forEach(function (c) { seen.observe(c); });
  }

  function stuck() { head.classList.toggle('is-stuck', window.scrollY > 40); }
  window.addEventListener('scroll', stuck, { passive: true });
  stuck();
})();
