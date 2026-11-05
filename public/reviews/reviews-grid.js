/* Student stories: Google reviews section (Card grid design).
 *
 * Mount point:  <section class="proof" id="reviews" data-reviews></section>
 * Load:         google-reviews.css in <head>, this file before </body>.
 *
 * PLACEHOLDER DATA below: replace with the program's real Google reviews.
 * Add photo: 'images/...' to a review to show a picture instead of the initial.
 * The first 6 reviews are shown; long ones get a "Read more" toggle.
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
  function text(t, lines) {
    var long = lines && t.length > lines * 42;
    return '<p class="gr-text' + (long ? ' clamped' : '') + '"' + (lines ? ' style="--lines:' + lines + '"' : '') + '>' + esc(t) + '</p>' +
      (long ? '<button type="button" class="gr-more" aria-expanded="false">Read more</button>' : '');
  }
  function card(r, lines) {
    return '<article class="gr-card">' +
      '<header class="gr-card-head">' + avatar(r) +
        '<div class="gr-who"><strong>' + esc(r.name) + '</strong>' + (r.detail ? '<span>' + esc(r.detail) + '</span>' : '') + '</div>' + G +
      '</header>' +
      '<div class="gr-rate-row">' + stars(r.rating) + '<span class="gr-time">' + esc(r.time) + '</span></div>' +
      text(r.text, lines) +
    '</article>';
  }

  function grid(s, list) {
    return head() +
      '<div class="gr-bar">' +
        '<div class="gr-bar-brand">' + G + '<div><strong>Excellent</strong><span>Google Reviews</span></div></div>' +
        '<div class="gr-bar-score"><strong>' + score(s) + '</strong><div>' + stars(s.rating) + '<span>Based on ' + s.count + ' reviews</span></div></div>' +
        seeAll(s, 'gr-btn') +
      '</div>' +
      '<div class="gr-grid">' + list.slice(0, 6).map(function (r) { return card(r, 4); }).join('') + '</div>';
  }

  var root = document.querySelector('[data-reviews-grid]');
  if (!root) return;
  var block = document.createElement('div');
  block.className = 'gr gr-v-grid';
  block.innerHTML = '<div class="wrap">' + grid(CDA_REVIEWS.summary, CDA_REVIEWS.reviews) + '</div>';
  root.textContent = '';
  root.appendChild(block);

  root.addEventListener('click', function (e) {
    var btn = e.target.closest('.gr-more');
    if (!btn) return;
    var open = btn.getAttribute('aria-expanded') !== 'true';
    btn.previousElementSibling.classList.toggle('clamped', !open);
    btn.setAttribute('aria-expanded', open);
    btn.textContent = open ? 'Less' : 'Read more';
  });
})();
