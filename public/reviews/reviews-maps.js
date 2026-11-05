/* Student stories: Google reviews section (Google Maps view design).
 *
 * Mount point:  <section class="proof" id="reviews" data-reviews></section>
 * Load:         google-reviews-maps.css in <head>, this file before </body>.
 *
 * A stylized map with the program's seal as the pin, the first 5 reviewers as pins
 * around it, and a Google Maps-style place panel that cycles through their reviews
 * every 4.5s (pauses on hover; click a pin to jump to it; no auto-play with reduced motion).
 *
 * PLACEHOLDER DATA below: replace with the program's real Google reviews.
 * Add photo: 'images/...' to a review to show a picture instead of the initial.
 */
var CDA_REVIEWS = window.CDA_REVIEW_DATA;

(function () {
  var TONES = [['#0b345b', '#fff'], ['#fdbf60', '#082743'], ['#3e5b74', '#fff'], ['#dbe6f1', '#0b345b'], ['#082743', '#fdbf60']];
  var STAR = '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 2.5l2.94 6.1 6.56.9-4.78 4.6 1.17 6.6L12 17.6l-5.89 3.1 1.17-6.6L2.5 9.5l6.56-.9z"/></svg>';
  var G = '<svg class="gr-g" viewBox="0 0 48 48" role="img" aria-label="Google">' +
    '<path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"/>' +
    '<path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"/>' +
    '<path fill="#FBBC05" d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"/>' +
    '<path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"/></svg>';

  function esc(s) {
    return String(s).replace(/[&<>"']/g, function (c) {
      return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c];
    });
  }
  function repeat(s, n) { return new Array(n + 1).join(s); }
  function snippet(t, n) { return t.length > n ? t.slice(0, t.lastIndexOf(' ', n - 2)) + '…' : t; }

  function stars(value) {
    var v = Math.max(0, Math.min(5, value));
    return '<span class="gr-stars" role="img" aria-label="Rated ' + v + ' out of 5">' +
      '<span class="gr-stars-empty">' + repeat(STAR, 5) + '</span>' +
      '<span class="gr-stars-fill" style="width:' + (v / 5) * 100 + '%">' + repeat(STAR, 5) + '</span></span>';
  }
  function avatar(r) {
    if (r.photo) return '<img class="gr-avatar" src="' + esc(r.photo) + '" alt="">';
    var t = TONES[CDA_REVIEWS.reviews.indexOf(r) % TONES.length] || TONES[0];
    return '<span class="gr-avatar" style="background:' + t[0] + ';color:' + t[1] + '" aria-hidden="true">' + esc(r.name.charAt(0)) + '</span>';
  }
  function score(s) { return s.rating.toFixed(1); }
  function seeAll(s, cls) {
    return '<a class="' + (cls || 'gr-link') + '" href="' + esc(s.url) + '" target="_blank" rel="noopener noreferrer">See all reviews on Google Maps <span aria-hidden="true">&rarr;</span></a>';
  }
  function head() {
    return '<div class="section-head gr-head"><span class="eyebrow">Student stories</span><h2>What people are saying</h2></div>';
  }

  function maps(s, list) {
    var p = CDA_REVIEWS.place;
    // Bubble anchors in % of the map: desktop x, y, then phone x, y.
    var spots = [[46, 27, 18, 28], [72, 18, 78, 16], [90, 46, 88, 56], [52, 84, 26, 80], [83, 86, 72, 88]];
    return head() +
      '<div class="gr-map">' + MAP +
        '<div class="gr-mp-pin"><span class="gr-mp-pulse"></span><span class="gr-mp-drop"><img src="' + esc(p.logo) + '" alt=""></span>' +
          '<span class="gr-mp-name">' + esc(p.name) + '</span></div>' +
        list.slice(0, spots.length).map(function (r, i) {
          var sp = spots[i];
          return '<button type="button" class="gr-mp-bubble" data-i="' + i + '" aria-label="Show review by ' + esc(r.name) + '" ' +
            'style="--x:' + sp[0] + ';--y:' + sp[1] + ';--mx:' + sp[2] + ';--my:' + sp[3] + ';--d:' + (300 + i * 140) + 'ms">' +
            '<span class="gr-mp-card">' + avatar(r) +
              '<span class="gr-mp-meta"><strong>' + esc(r.name) + '</strong>' + stars(r.rating) + '</span>' +
              '<span class="gr-mp-snip">' + esc(snippet(r.text, 52)) + '</span>' +
            '</span><span class="gr-mp-dot"></span></button>';
        }).join('') +
        '<div class="gr-mp-panel">' +
          '<div class="gr-mp-photo" style="background-image:url(&quot;' + esc(p.photo) + '&quot;)"><span class="gr-mp-badge">' + G + 'Google Maps</span></div>' +
          '<div class="gr-mp-body">' +
            '<h3>' + esc(p.name) + '</h3>' +
            '<div class="gr-mp-rating"><strong>' + score(s) + '</strong>' + stars(s.rating) + '<span>(' + s.count + ')</span></div>' +
            '<span class="gr-mp-cat">' + esc(p.category) + '</span>' +
            '<div class="gr-mp-tabs" aria-hidden="true"><span>Overview</span><span class="on">Reviews</span><span>About</span></div>' +
            '<div class="gr-mp-review" aria-live="polite"></div>' +
            seeAll(s, 'gr-btn') +
          '</div>' +
        '</div>' +
      '</div>';
  }

  // Stylized street map in brand tints, drawn behind the "maps" design.
  var MAP = '<svg class="gr-map-svg" viewBox="0 0 1200 620" preserveAspectRatio="xMidYMid slice" aria-hidden="true">' +
    '<defs><pattern id="gr-blocks" width="96" height="72" patternUnits="userSpaceOnUse"><rect x="6" y="6" width="84" height="60" rx="6" fill="#e7eef5"/></pattern></defs>' +
    '<rect width="1200" height="620" fill="#fbfcfe"/><rect width="1200" height="620" fill="url(#gr-blocks)"/>' +
    '<path d="M640 70h190a24 24 0 0 1 24 24v110a24 24 0 0 1-24 24H640a24 24 0 0 1-24-24V94a24 24 0 0 1 24-24z" fill="#dae6ef"/>' +
    '<path d="M150 40c70-20 160 10 170 70s-60 110-140 100S60 150 80 100s30-50 70-60z" fill="#dae6ef"/>' +
    '<path d="M-30 480C170 420 300 570 520 525s330-150 710-95" fill="none" stroke="#cadcee" stroke-width="44"/>' +
    '<g fill="none" stroke-linecap="round">' +
      '<path d="M-20 300H1220M480-20v660M940-20v660M-20 150L1220 70" stroke="#d7e0e9" stroke-width="20"/>' +
      '<path d="M-20 300H1220M480-20v660M940-20v660M-20 150L1220 70" stroke="#fff" stroke-width="13"/>' +
      '<path d="M-20 640C300 400 700 330 1220 210" stroke="#f2cd8c" stroke-width="22"/>' +
      '<path d="M-20 640C300 400 700 330 1220 210" stroke="#fde4b6" stroke-width="15"/>' +
    '</g></svg>';

  function mapReview(r) {
    return '<div class="gr-card-head">' + avatar(r) +
        '<div class="gr-who"><strong>' + esc(r.name) + '</strong>' + (r.detail ? '<span>' + esc(r.detail) + '</span>' : '') + '</div></div>' +
      '<div class="gr-rate-row">' + stars(r.rating) + '<span class="gr-time">' + esc(r.time) + '</span></div>' +
      '<p class="gr-text clamped" style="--lines:3">' + esc(r.text) + '</p>';
  }

  function wireMaps(el) {
    var map = el.querySelector('.gr-map');
    if (!map) return;
    var bubbles = map.querySelectorAll('.gr-mp-bubble');
    var out = map.querySelector('.gr-mp-review');
    var still = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    var active = 0;
    var timer = null;
    function show(i) {
      active = i;
      for (var j = 0; j < bubbles.length; j++) bubbles[j].classList.toggle('on', j === i);
      out.innerHTML = mapReview(CDA_REVIEWS.reviews[i]);
      out.classList.remove('swap');
      void out.offsetWidth;
      out.classList.add('swap');
    }
    function stop() { clearInterval(timer); timer = null; }
    function start() {
      if (still || timer) return;
      timer = setInterval(function () { show((active + 1) % bubbles.length); }, 4500);
    }
    for (var i = 0; i < bubbles.length; i++) {
      bubbles[i].addEventListener('click', function () { show(+this.getAttribute('data-i')); });
    }
    map.addEventListener('mouseenter', stop);
    map.addEventListener('mouseleave', start);
    map.addEventListener('focusin', stop);
    show(0);
    if (!('IntersectionObserver' in window)) { map.classList.add('is-in'); start(); return; }
    new IntersectionObserver(function (entries) {
      if (entries[0].isIntersecting) { map.classList.add('is-in'); start(); } else stop();
    }, { threshold: 0.35 }).observe(map);
  }

  var root = document.querySelector('[data-reviews-maps]');
  if (!root) return;
  CDA_REVIEWS.place.photo = root.getAttribute('data-photo') || 'images/clinic-group.jpg';
  CDA_REVIEWS.place.logo = root.getAttribute('data-logo') || 'images/logo-seal.png';
  var block = document.createElement('div');
  block.className = 'gr gr-v-maps';
  block.innerHTML = '<div class="wrap">' + maps(CDA_REVIEWS.summary, CDA_REVIEWS.reviews) + '</div>';
  root.textContent = '';
  root.appendChild(block);
  wireMaps(block);
})();
