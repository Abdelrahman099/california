/* Main page behaviour: the nav (Webflow's own script isn't loaded here), the hero entrance, scroll reveals, the program videos. */
(function () {
  var motion = !window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ---------- Nav ---------- */
  var nav = document.getElementById('navbar');
  if (nav) {
    var menu = nav.querySelector('.w-nav-menu');
    var overlay = nav.querySelector('.w-nav-overlay');
    var burger = nav.querySelector('.w-nav-button');
    var menuHome = menu.parentNode;
    var menuNext = menu.nextSibling;
    var collapsed = window.matchMedia('(max-width: 991px)');
    var drops = [].slice.call(nav.querySelectorAll('.w-dropdown'));
    var pointer = '';

    function setDrop(drop, open) {
      var toggle = drop.querySelector('.w-dropdown-toggle');
      var list = drop.querySelector('.w-dropdown-list');
      drop.classList.toggle('w--open', open);
      toggle.classList.toggle('w--open', open);
      list.classList.toggle('w--open', open);
      toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
    }
    function closeDrops(except) {
      drops.forEach(function (d) { if (d !== except) setDrop(d, false); });
    }
    function setMenu(open) {
      burger.classList.toggle('w--open', open);
      burger.setAttribute('aria-expanded', open ? 'true' : 'false');
      if (open) {
        var room = window.innerHeight - nav.getBoundingClientRect().bottom;
        overlay.appendChild(menu);
        menu.setAttribute('data-nav-menu-open', '');
        menu.style.maxHeight = room + 'px';
        overlay.style.height = room + 'px';
        overlay.style.display = 'block';
      } else {
        menuHome.insertBefore(menu, menuNext);
        menu.removeAttribute('data-nav-menu-open');
        menu.style.maxHeight = '';
        overlay.style.height = '';
        overlay.style.display = '';
        closeDrops();
      }
    }

    drops.forEach(function (drop) {
      var toggle = drop.querySelector('.w-dropdown-toggle');
      var timer;
      drop.addEventListener('pointerenter', function (e) {
        if (e.pointerType !== 'mouse' || collapsed.matches) return;
        clearTimeout(timer);
        closeDrops(drop);
        setDrop(drop, true);
      });
      drop.addEventListener('pointerleave', function (e) {
        if (e.pointerType !== 'mouse' || collapsed.matches) return;
        timer = setTimeout(function () { setDrop(drop, false); }, 300);
      });
      toggle.addEventListener('pointerdown', function (e) { pointer = e.pointerType; });
      toggle.addEventListener('click', function () {
        // With a mouse the menu follows hover, so a click on the toggle changes nothing.
        if (pointer === 'mouse' && !collapsed.matches) return;
        var open = !drop.classList.contains('w--open');
        closeDrops(drop);
        setDrop(drop, open);
      });
      toggle.addEventListener('keydown', function (e) {
        if (e.key !== 'Enter' && e.key !== ' ') return;
        e.preventDefault();
        var open = !drop.classList.contains('w--open');
        closeDrops(drop);
        setDrop(drop, open);
      });
    });

    function toggleBurger() { setMenu(!burger.classList.contains('w--open')); }
    burger.addEventListener('click', toggleBurger);
    burger.addEventListener('keydown', function (e) {
      if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); toggleBurger(); }
    });
    collapsed.addEventListener('change', function () { setMenu(false); });

    var searchIcon = nav.querySelector('.global-search-icon-wrapper');
    var searchBar = nav.querySelector('.popup-search-bar');
    if (searchIcon && searchBar) {
      var magnifier = searchIcon.querySelector('._16px-image-search');
      var closeIcon = searchIcon.querySelector('.search-close-icon');
      searchIcon.setAttribute('role', 'button');
      searchIcon.setAttribute('tabindex', '0');
      searchIcon.setAttribute('aria-label', 'Search');
      var toggleSearch = function () {
        var open = !searchBar.classList.contains('is-open');
        searchBar.classList.toggle('is-open', open);
        magnifier.style.display = open ? 'none' : '';
        closeIcon.style.display = open ? 'block' : 'none';
        if (open) searchBar.querySelector('input[type=search]').focus();
      };
      searchIcon.addEventListener('click', toggleSearch);
      searchIcon.addEventListener('keydown', function (e) {
        if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); toggleSearch(); }
      });
    }

    document.addEventListener('keydown', function (e) {
      if (e.key !== 'Escape') return;
      closeDrops();
      if (burger.classList.contains('w--open')) setMenu(false);
    });
  }

  /* ---------- Hero entrance, after the preloader ---------- */
  var main = document.querySelector('.hm');
  function enter() { if (main) main.classList.add('hm-in'); }
  if (document.getElementById('preloader')) {
    window.addEventListener('cda:ready', enter, { once: true });
    setTimeout(enter, 9000);
  } else {
    enter();
  }

  /* ---------- Hero rating, from the same data as the reviews section ---------- */
  var rating = document.querySelector('[data-hero-rating]');
  var summary = window.CDA_REVIEW_DATA && window.CDA_REVIEW_DATA.summary;
  if (rating && summary) {
    rating.textContent = summary.rating.toFixed(1) + ' from ' + summary.count + ' Google reviews';
  }

  /* ---------- Scroll reveals ---------- */
  var rises = document.querySelectorAll('.hm-rise');
  if ('IntersectionObserver' in window && motion) {
    var riseIo = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (!e.isIntersecting) return;
        e.target.classList.add('is-in');
        riseIo.unobserve(e.target);
      });
    }, { rootMargin: '0px 0px -8% 0px' });
    rises.forEach(function (el) { riseIo.observe(el); });
  } else {
    rises.forEach(function (el) { el.classList.add('is-in'); });
  }

  /* ---------- Program videos: load and play only while on screen ---------- */
  var exp = document.querySelector('[data-exp]');
  if (exp) {
    var video = exp.querySelector('video');
    var toggle = exp.querySelector('[data-exp-toggle]');
    var reels = [].slice.call(exp.querySelectorAll('[data-reel]'));
    var paused = !motion;
    var visible = false;
    var loaded = false;

    function load(reel) {
      video.textContent = '';
      [['webm', 'video/webm'], ['mp4', 'video/mp4']].forEach(function (t) {
        var s = document.createElement('source');
        s.src = reel.getAttribute('data-' + t[0]);
        s.type = t[1];
        video.appendChild(s);
      });
      video.poster = reel.getAttribute('data-poster');
      video.load();
      loaded = true;
    }
    function sync() {
      toggle.classList.toggle('is-paused', paused);
      toggle.setAttribute('aria-label', paused ? 'Play video' : 'Pause video');
      if (!visible || paused) { video.pause(); return; }
      if (!loaded) load(reels[0]);
      var p = video.play();
      if (p && p.catch) p.catch(function () {});
    }
    toggle.addEventListener('click', function () { paused = !paused; sync(); });
    reels.forEach(function (reel) {
      reel.addEventListener('click', function () {
        reels.forEach(function (r) { r.setAttribute('aria-pressed', r === reel ? 'true' : 'false'); });
        load(reel);
        paused = false;
        sync();
      });
    });
    if ('IntersectionObserver' in window) {
      new IntersectionObserver(function (entries) {
        visible = entries[0].isIntersecting;
        sync();
      }, { threshold: 0.25 }).observe(exp);
    }
    toggle.classList.toggle('is-paused', paused);
    toggle.setAttribute('aria-label', paused ? 'Play video' : 'Pause video');
  }
})();
