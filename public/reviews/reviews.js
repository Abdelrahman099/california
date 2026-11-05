/* Student stories: combined Google reviews section.
 * Top: "Excellent · 5.0" Google rating bar. Below: Google Maps-style view on a map of California,
 * with the CDA seal pinned in Sacramento, reviewer pins around the state, and a place panel that
 * cycles through every review (pauses on hover; click a pin to jump; no auto-play with reduced motion).
 * Picking a student or review zooms in gently and draws the county borders in gold, spreading out
 * from that student's county, which stays highlighted. The map can be dragged.
 * Mount: <section class="proof" data-reviews data-photo="..." data-logo="..."></section>
 * Data: window.CDA_REVIEW_DATA from reviews-data.js. State outline: US Census via us-atlas.
 * Counties: window.CDA_CA_COUNTIES from ca-counties.js (load it before this file).
 */
var CDA_REVIEWS = window.CDA_REVIEW_DATA;
var CDA_COUNTIES = window.CDA_CA_COUNTIES || { counties: [], lines: [] };

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
  function head(eyebrow, title) {
    return '<div class="section-head gr-head"><span class="eyebrow">' + esc(eyebrow || 'Student stories') + '</span><h2>' + esc(title || 'What people are saying') + '</h2></div>';
  }


  var CA_PATH = 'M274.8,505.9L277.7,506.1L282.7,508.7L286.4,509.7L286.6,511.0L289.5,514.0L288.6,516.2L286.3,515.0L281.7,514.7L280.6,513.0L280.5,509.2L277.0,508.5ZM275.0,532.3L276.6,532.1L280.6,537.9L287.9,544.4L286.1,544.2L284.1,545.4L281.1,543.2L278.7,539.6L276.1,533.6ZM252.4,505.4L253.8,505.0L254.0,507.1L252.0,506.8ZM233.8,473.8L235.2,474.6L237.2,473.9L237.2,475.4L234.2,475.7L232.6,474.6ZM226.8,518.1L229.3,517.7L232.9,519.5L234.3,521.0L232.0,521.8L228.4,520.8ZM210,471.0L213.1,471.4L215.4,472.5L218.0,472.2L221.4,474.4L224.7,474.6L225.9,472.6L229.4,473.6L227.5,475.8L222.6,476.4L219.6,478.0L212.2,476.8L212.1,473.7ZM194.0,475.5L197.8,475.1L199.4,474.0L201.7,474.4L204.0,473.5L204.0,475.9L207.1,476.6L207.3,479.0L200.1,481.7L197.3,479.8ZM184.2,473.3L187.0,472.5L188.0,471.1L189.1,472.8L191.4,474.2L187.7,474.4ZM21.1,0L45.5,1.2L46.9,0.9L59.0,1.4L67.9,1.1L72.3,1.7L90.4,2.1L96.2,2.0L111.2,2.4L118.3,2.8L142.6,3.7L160.5,4.1L191.6,4.3L206.1,4.3L206.1,4.3L206.1,77.8L206.2,79.5L206.3,117.8L206.1,137.7L205.9,138.4L205.9,161.5L205.8,167.7L206.1,181.0L210.4,184.9L229.4,201.5L248.4,218.4L258.9,227.5L275.6,242.4L296.8,261.0L307.4,270.2L329.3,289.6L384.0,337.8L425.7,374.5L438.3,385.7L465.0,409.2L465.3,416.6L468.2,419.4L469.6,422.8L473.8,425.7L479.1,437.5L478.9,440.5L481.2,440.7L486.9,445.4L489.4,446.3L491.5,448.9L491.8,451.3L487.6,454.9L487.5,455.9L484.6,457.1L483.0,459.2L479.0,460.9L477.7,462.4L477.9,465.9L473.4,472.1L474.6,473.0L475.2,475.8L474.1,476.2L474.1,478.7L475.5,481.9L476.1,485.6L474.7,486.3L474.3,491.9L475.2,494.2L473.7,495.5L469.1,502.8L465.8,503.4L467.3,505.9L465.9,509.3L468.7,511.3L468.8,518.5L467.7,521.9L470.4,525.2L470.9,524.3L473.2,525.5L474.4,524.7L477.3,525.0L480.4,531.7L480.4,535.7L477.4,539.1L477.9,541.1L473.5,542.7L469.2,542.3L468.4,543.9L394.5,553.8L349.3,560L348.6,555.0L346.9,551.9L345.5,550.9L343.0,552.2L342.4,548.8L342.4,545.2L341.0,543.2L342.5,540.0L340.6,531.9L338.1,525.6L336.5,522.9L329.1,513.3L324.6,510.3L322.8,507.7L320.1,505.9L318.5,506.1L315.0,501.3L310.4,498.5L307.9,497.8L304.3,494.9L299.8,490.6L295.5,488.7L295.2,491.1L291.5,492.3L288.4,491.6L286.6,490.4L283.9,490.2L283.2,488.2L284.8,486.5L284.9,484.3L282.3,478.5L280.3,475.3L277.3,472.8L271.2,472.8L267.3,473.3L264.5,475.1L262.1,473.2L257.1,472.5L250.6,469.6L248.5,469.5L244.3,466.8L241.3,459.7L239.5,459.2L236.5,456.5L235.8,456.7L232.3,453.4L228.6,452.2L227.6,451.2L222.0,451.0L219.2,452.2L216.0,451.0L212.2,451.5L205.7,448.4L201.7,448.4L199.1,447.7L191.4,448.0L183.1,449.1L182.9,447.5L180.6,444.2L177.9,442.6L175.8,442.8L174.7,441.2L177.0,434.0L175.1,430.9L176.6,424.9L173.6,422.1L175.2,416.3L175.5,409.2L172.4,406.4L170.0,406.0L169.4,407.1L164.8,404.2L162.9,401.8L164.7,395.2L164.4,392.6L162.5,389.9L157.9,389.2L153.3,384.0L150.2,378.8L146.1,377.5L143.2,374.1L142.4,370.0L139.7,367.6L138.6,365.7L136.2,363.9L135.2,358.9L134.4,357.1L131.0,355.6L128.5,350.3L124.4,345.4L118.8,342.1L117.0,339.8L115.7,335.7L115.9,333.6L114.1,328.4L114.6,323.8L112.7,322.9L114.5,319.2L117.5,321.2L119.1,319.7L120.3,316.7L121.8,309.6L118.4,301.9L116.4,299.7L114.7,299.1L113.2,300.5L106.9,300.3L102.3,296.7L98.7,291.5L96.4,290.5L96.1,289L93.3,285.8L92.7,282.7L93.7,276.2L91.8,271.6L91.5,269.0L89.5,268.2L88.6,266.5L88.5,263.3L89.4,262.0L89.8,258.1L89.0,251.3L91.3,249.9L94.0,249.6L95.0,250.8L96.1,255.3L94.5,255.7L96.2,261.2L95.9,262.5L100.4,263.8L104.8,268.0L106.2,267.7L108.4,271.0L110.4,270.9L109.5,268.8L107.5,267.8L105.9,263.4L104.9,257.8L101.4,255.0L101.1,252.7L97.5,251.3L99.1,247.6L98.0,244.1L95.5,244.1L93.3,240.6L94.6,241.1L96.1,239.8L96.2,237.8L99.3,238.0L101.0,236.0L99.5,232.4L95.2,230.1L93.0,231.5L90.7,231.8L90.9,234.2L90.0,236.5L92.5,239.1L90.4,240.3L89.7,242.5L92.8,245.4L91.6,246.1L89.8,244.6L90.9,248.2L88.4,249.0L86.9,247.0L82.7,243.8L80.5,244.3L76.7,240.8L75.2,238.1L72.4,236.4L69.7,235.9L66.3,237.4L68.9,231.1L69.5,228.7L67.6,224.0L68.8,223.0L66.3,219.4L64.4,219.8L64.4,216.4L61.7,211.0L58.5,208.3L56.2,207.2L52.7,203.9L46.9,194.7L44.6,193.2L43.4,191.1L38.5,186.3L34.8,180.3L37.2,176.5L37.1,174.3L35.1,167.9L32.7,161.5L31.8,156.2L32.5,151.2L34.9,144.6L34.2,141.9L34.3,138.6L32.2,133.9L31.8,128.4L29.2,126.5L28.4,123.6L23.0,116.7L21.9,116.3L22.0,114.1L20.8,111.9L17.3,110.1L9.7,102.1L10.5,99.0L10.0,95.4L8.1,91.6L9.8,86.7L12.3,81.3L19.6,68.1L21.6,63.4L23.0,57.4L21.2,55.5L21.2,50.5L21.8,50.5L23.8,45.5L26.3,33.2L25.7,26.8L23.7,20.2L22.6,15.3L21.2,15.5L18.6,12.6L20.4,8.9L21.4,3.4Z';
  var NEIGHBORS = 'M468.4,543.9L469.2,542.3L473.5,542.7L477.9,541.1L477.4,539.1L480.4,535.7L480.4,531.7L477.3,525.0L474.4,524.7L473.2,525.5L470.9,524.3L470.4,525.2L467.7,521.9L468.8,518.5L468.7,511.3L465.9,509.3L467.3,505.9L465.8,503.4L469.1,502.8L473.7,495.5L475.2,494.2L474.3,491.9L474.7,486.3L476.1,485.6L475.5,481.9L474.1,478.7L474.1,476.2L475.2,475.8L474.6,473.0L473.4,472.1L477.9,465.9L477.7,462.4L479.0,460.9L483.0,459.2L484.6,457.1L487.5,455.9L487.6,454.9L491.8,451.3L491.5,448.9L489.4,446.3L486.9,445.4L481.2,440.7L478.9,440.5L479.1,437.5L473.8,425.7L469.6,422.8L468.2,419.4L465.3,416.6L465.0,409.2L465.8,404.3L464.0,403.3L467.5,400.9L467.3,397.3L465.2,388.4L464.0,385.2L462.0,382.9L461.1,380.0L462.1,378.1L461.8,372.9L460.1,371.1L460.5,369.1L459.2,367.6L459.6,365.0L458.6,362.0L459.1,359.2L460.6,357.9L458.8,356.4L456.5,351.6L457.0,349.4L455.6,345.4L459.8,343.6L461.2,342.1L462.1,342.7L464.1,341.4L467.0,341.2L467.4,342.5L471.4,341.3L473.7,341.3L477.0,344.7L476.7,346.1L480.4,348.5L484.5,347.7L488.0,338.2L488.8,337.4L488.3,325.8L487.1,312.0L485.7,290.0L519.4,287.7L556.7,284.9L609.4,280.4L625.7,278.8L652.6,276.1L653.6,276.4L693.1,272.2L720.2,269.1L730.1,354.1L731.3,366.0L731.7,367.5L737.1,414.0L740.5,444.6L741.5,451.9L742.0,457.6L758.7,601.2L747.1,602.4L710.9,606.5L687.8,608.9L656.7,611.9L589.8,593.5L550.7,582.8L531.9,577.2L464.5,557.4L465.2,554.0L464.3,553.2L464.3,550.2L465.7,549.3ZM59.7,-251.5L62.8,-251.9L64.7,-249.5L64.4,-246.7L66.8,-244.4L70.6,-244.3L75.4,-246.7L77.5,-246.4L86.0,-240.1L86.9,-236.9L89.5,-232.7L89.6,-229.8L90.5,-227.1L90.0,-223.6L91.3,-219.1L90.7,-217.0L91.0,-214.5L95.9,-211.6L102.7,-209.6L104.3,-208.6L106.9,-209.2L108.8,-207.5L111.5,-207.2L115.0,-209.1L118.4,-209.4L126.6,-213.5L128.4,-215.7L130.7,-216.5L133.8,-215.7L138.2,-216.2L142.4,-217.5L145.2,-215.9L147.7,-215.4L150.4,-216.1L155.4,-214.0L156.7,-210.1L158.8,-210.3L161.7,-212.8L166.8,-213.0L168.7,-212.1L170.4,-213.9L177.4,-216.4L179.7,-218.2L182.8,-217.7L185.9,-215.1L189.2,-215.4L194.3,-216.7L197.3,-216.9L198.9,-219.1L203.1,-220.5L207.4,-222.8L214.3,-224.2L219.8,-224.7L221.7,-227.6L223.8,-228.8L227.4,-227.7L236.9,-229.8L239.4,-229.1L242.2,-229.4L246.4,-231.6L248.0,-233.5L272.2,-233.9L309.4,-234.5L333.8,-235.1L336.3,-229.7L338.0,-228.4L340.5,-224.6L343.2,-224.9L344.8,-222.6L347.6,-222.6L350.1,-220.2L350.2,-217.5L352.2,-215.1L353.4,-212.4L350.0,-206.7L349.9,-203.9L348.5,-202.7L345.1,-194.9L345.4,-193.0L344.1,-190.4L343.2,-184.4L341.4,-182.3L340.5,-179.6L338.5,-177.3L338.1,-174.6L339.3,-171.7L338.1,-168.2L335.5,-164.2L335.5,-163.2L330.7,-160.5L328.8,-155.7L327.7,-150.7L326.3,-147.3L323.6,-144.8L324.2,-141.4L323.0,-139.5L325.4,-136.1L324.3,-133.2L326.3,-131.5L329.2,-132.8L331.7,-129.9L334.7,-130.6L335.1,-127.9L337.9,-127.1L338.1,-125.6L336.7,-122.4L334.9,-121.4L335.1,-119.3L336.8,-117.7L336.7,-115.5L335.0,-111.3L335.1,-108.6L333.5,-108.0L333.2,-105.0L336.6,1.9L310.4,2.8L267.4,3.9L263.3,4.1L240.8,4.2L206.1,4.3L206.1,4.3L206.1,4.3L191.6,4.3L160.5,4.1L142.6,3.7L118.3,2.8L111.2,2.4L96.2,2.0L90.4,2.1L72.3,1.7L67.9,1.1L59.0,1.4L46.9,0.9L45.5,1.2L21.1,0L17.9,-2.9L15.7,-5.8L14.7,-9.3L15.1,-11.0L13.1,-15.2L13.5,-16.8L12.5,-20.1L12.5,-26.5L14.9,-33.8L14.1,-39.3L11.6,-43.9L9.9,-44.0L8.5,-50.4L11.1,-54.8L13.1,-59.6L14.3,-63.8L14.4,-66.4L16.0,-70.4L17.1,-75.4L16.3,-77.6L19.1,-80.2L20.4,-82.3L23.2,-88.9L25.9,-98.6L28.9,-112.9L30.4,-124.3L31.5,-133.9L31.2,-134.3L33.1,-144.3L33.1,-147.8L34.6,-157.1L34.8,-161.8L34.1,-163.8L35.5,-168.4L37.8,-179.9L39.3,-185.9L40.2,-193.8L39.9,-197.2L40.6,-202.8L40.2,-206.3L41.0,-207.5L42.1,-216.5L42.1,-220.4L40.5,-222.6L41.6,-227.0L41.5,-231.2L40.6,-233.6L43.0,-235.3L43.4,-240.9L41.0,-250.9L44.8,-246.7L46.9,-245.9L46.5,-247.8L49.9,-248.2L51.0,-249.0L52.6,-247.5L54.4,-249.1L56.6,-249.0ZM467.6,-3.8L477.3,-4.1L518.4,-7.6L548.6,-10.1L549.4,-9.9L580.2,-12.8L598.7,-14.6L601.3,10.9L602.2,22.0L604.3,44.3L619.1,43.0L640.2,40.9L648.5,39.9L671.2,37.4L692.8,34.8L696.0,61.8L696.1,64.1L706.9,157.6L707.9,168.5L710.9,194.5L712.5,200.8L716.8,237.9L716.8,239.8L720.2,269.1L693.1,272.2L653.6,276.4L652.6,276.1L625.7,278.8L609.4,280.4L556.7,284.9L519.4,287.7L485.7,290.0L482.9,245.5L483.0,245.0L482.0,231.2L481.6,222.5L480.5,207.5L479.6,191.4L474.3,107.4L474.0,99.9L472.0,68.1L471.3,54.7ZM333.8,-235.1L332.0,-239.8L330.9,-240.3L333.3,-245.2L331.4,-247.1L331.3,-250.4L330.1,-253.1L327.0,-256.9L327.9,-259.4L325.9,-323.4L325.7,-326.1L324.6,-362.2L324.4,-377.0L323.7,-399.8L323.4,-414.7L347.6,-415.6L362.2,-416.3L363.9,-374.8L364.0,-369.1L364.8,-354.8L370.7,-347.2L372.9,-346.2L374.3,-341.7L375.4,-342.1L376.5,-339.7L378.5,-338.6L378.3,-335.3L380.2,-332.6L378.4,-330.8L378.2,-329.1L379.8,-328.9L380.7,-326.0L383.0,-325.7L382.6,-324.6L379.4,-324.0L377.8,-322.1L379.4,-322.3L386.4,-318.1L387.6,-315.4L392.3,-313.3L395.8,-313.0L397.3,-310.9L397.1,-309L398.7,-308.7L399.5,-306.8L401.3,-306.2L403.9,-303.6L406.9,-299.5L407.9,-296.5L409.8,-296.6L412.9,-293.7L412.5,-290.0L415.0,-287.1L420.2,-284.4L419.5,-281.6L420.4,-280.8L422.5,-282.0L423.0,-283.5L425.1,-283.2L426.2,-281.7L425.5,-279.7L426.8,-277.7L429.5,-278.1L432.8,-277.6L433.3,-278.7L437.1,-280.1L438.3,-279.6L438.9,-276.7L437.8,-270.3L436.1,-270.0L437.3,-266.6L435.6,-263.1L435.8,-257.2L433.9,-255.8L434.9,-254.4L435.3,-250.3L432.5,-249.8L432.4,-247.3L435.0,-245.7L433.8,-242.7L434.6,-240.0L437.5,-238.8L436.7,-236.2L438.8,-233.6L437.9,-231.2L434.2,-231.0L431.8,-226.3L434.8,-222.7L434.8,-220.2L432.3,-218.1L433.6,-216.4L433.1,-213.6L436.8,-213.9L439.0,-210.9L441.1,-209.9L442.0,-208.1L445.4,-210.5L445.7,-213.5L447.7,-213.0L450.5,-214.5L453.0,-218.8L455.2,-220.8L454.7,-222.8L456.0,-223.6L458.3,-222.4L460.0,-220.2L459.8,-218.9L461.5,-219.1L463.9,-218.0L463.1,-213.1L466.0,-213.3L466.3,-210.9L465.5,-209.3L466.6,-206.5L467.8,-205.6L467.8,-202.0L470.1,-199.4L470.3,-197.6L474.2,-194.1L475.5,-190.5L478.1,-189.9L477.9,-188.5L480.9,-186.8L481.7,-183.7L481.6,-180.9L479.5,-180.1L481.5,-175.2L485.9,-172.8L486.7,-170.8L490.4,-173.4L495.5,-170.7L498.6,-165.4L499.6,-162.9L498.4,-160.4L501.9,-156.5L501.2,-154.7L502.3,-152.1L504.8,-150.2L507.6,-149.2L509.4,-147.1L510.7,-148.3L509.6,-150.9L511.6,-154.8L514.1,-156.1L516.7,-155.2L521.8,-155.5L523.5,-154.4L524.7,-155.5L528.4,-153.9L529.5,-156.3L529.5,-159.4L530.9,-159.5L532.1,-161.4L534.6,-161.2L536.5,-159.6L538.6,-160.2L539.9,-159.2L543.0,-161.0L544.5,-160.4L546.4,-161.9L549.7,-162.6L551.9,-159.5L556.3,-162.0L556.7,-163.0L560.4,-162.6L561.6,-163.6L566.6,-162.7L564.0,-165.7L566.0,-170.9L565.1,-172.5L568.1,-173.0L569.1,-175.7L571.8,-174.1L576.6,-168.6L576.5,-166.3L580.4,-163.7L581.5,-161.3L584.8,-160.4L585.4,-153.3L586.8,-139.8L589.3,-113.6L589.6,-112.3L594.8,-57.1L595.4,-48.8L598.7,-14.6L580.2,-12.8L549.4,-9.9L548.6,-10.1L518.4,-7.6L477.3,-4.1L467.6,-3.8L448.9,-2.8L443.2,-2.4L434.1,-2.3L424.2,-1.4L411.7,-0.8L365.6,1.2L336.6,1.9L333.2,-105.0L333.5,-108.0L335.1,-108.6L335.0,-111.3L336.7,-115.5L336.8,-117.7L335.1,-119.3L334.9,-121.4L336.7,-122.4L338.1,-125.6L337.9,-127.1L335.1,-127.9L334.7,-130.6L331.7,-129.9L329.2,-132.8L326.3,-131.5L324.3,-133.2L325.4,-136.1L323.0,-139.5L324.2,-141.4L323.6,-144.8L326.3,-147.3L327.7,-150.7L328.8,-155.7L330.7,-160.5L335.5,-163.2L335.5,-164.2L338.1,-168.2L339.3,-171.7L338.1,-174.6L338.5,-177.3L340.5,-179.6L341.4,-182.3L343.2,-184.4L344.1,-190.4L345.4,-193.0L345.1,-194.9L348.5,-202.7L349.9,-203.9L350.0,-206.7L353.4,-212.4L352.2,-215.1L350.2,-217.5L350.1,-220.2L347.6,-222.6L344.8,-222.6L343.2,-224.9L340.5,-224.6L338.0,-228.4L336.3,-229.7ZM206.1,4.3L206.1,4.3L240.8,4.2L263.3,4.1L267.4,3.9L310.4,2.8L336.6,1.9L365.6,1.2L411.7,-0.8L424.2,-1.4L434.1,-2.3L443.2,-2.4L448.9,-2.8L467.6,-3.8L471.3,54.7L472.0,68.1L474.0,99.9L474.3,107.4L479.6,191.4L480.5,207.5L481.6,222.5L482.0,231.2L483.0,245.0L482.9,245.5L485.7,290.0L487.1,312.0L488.3,325.8L488.8,337.4L488.0,338.2L484.5,347.7L480.4,348.5L476.7,346.1L477.0,344.7L473.7,341.3L471.4,341.3L467.4,342.5L467.0,341.2L464.1,341.4L462.1,342.7L461.2,342.1L459.8,343.6L455.6,345.4L457.0,349.4L456.5,351.6L458.8,356.4L460.6,357.9L459.1,359.2L458.6,362.0L459.6,365.0L459.2,367.6L460.5,369.1L460.1,371.1L461.8,372.9L462.1,378.1L461.1,380.0L462.0,382.9L464.0,385.2L465.2,388.4L467.3,397.3L467.5,400.9L464.0,403.3L465.8,404.3L465.0,409.2L438.3,385.7L425.7,374.5L384.0,337.8L329.3,289.6L307.4,270.2L296.8,261.0L275.6,242.4L258.9,227.5L248.4,218.4L229.4,201.5L210.4,184.9L206.1,181.0L205.8,167.7L205.9,161.5L205.9,138.4L206.1,137.7L206.3,117.8L206.2,79.5L206.1,77.8Z';

  var HQ = [27.5, 36.6]; // Sacramento

  function bar(s) {
    return '<div class="gr-bar">' +
      '<div class="gr-bar-brand">' + G + '<div><strong>Excellent</strong><span>Google Reviews</span></div></div>' +
      '<div class="gr-bar-score"><strong data-to="' + s.rating + '" data-dec="1">' + score(s) + '</strong><div>' + stars(s.rating) + '<span>Based on <b data-to="' + s.count + '">' + s.count + '</b> reviews</span></div></div>' +
      seeAll(s, 'gr-btn') +
    '</div>';
  }

  function stateMap() {
    return '<svg class="gr-ca-svg" viewBox="0 0 500 560" aria-hidden="true">' +
      '<path class="gr-ca-near" vector-effect="non-scaling-stroke" d="' + NEIGHBORS + '"/>' +
      '<path class="gr-ca-land" pathLength="1" vector-effect="non-scaling-stroke" d="' + CA_PATH + '"/>' +
      '<g class="gr-ca-div">' + CDA_COUNTIES.lines.map(function (l) {
        return '<path class="gr-ca-line" pathLength="1" d="' + l.d + '"/>';
      }).join('') + '</g>' +
      '<path class="gr-ca-area"/>' +
      '<text class="gr-ca-near-word" x="372" y="190">NEVADA</text>' +
      '<text class="gr-ca-near-word" x="545" y="470">ARIZONA</text>' +
      '<text class="gr-ca-sea" transform="translate(70 470) rotate(-62)">PACIFIC OCEAN</text>' +
    '</svg>';
  }

  function coverage() {
    var c = CDA_REVIEWS.coverage;
    return '<div class="gr-cover">' + PIN + '<div><strong>' + esc(c.title) + '</strong><span>' + esc(c.detail) + '</span></div></div>';
  }

  function maps(s, list) {
    var p = CDA_REVIEWS.place;
    return '<div class="gr-map">' +
        '<div class="gr-map-touch"></div><span class="gr-drag-hint" aria-hidden="true">Drag to move the map</span>' +
        '<button type="button" class="gr-map-all">See all of California</button>' +
        '<div class="gr-ca"><div class="gr-ca-stage">' + stateMap() +
          '<div class="gr-mp-pin" style="left:' + HQ[0] + '%;top:' + HQ[1] + '%"><span class="gr-mp-pulse"></span><span class="gr-mp-drop"><img src="' + esc(p.logo) + '" alt=""></span>' +
            '</div>' +
          CDA_REVIEWS.locations.map(function (l, k) {
            return '<button type="button" class="gr-loc" data-k="' + k + '" style="left:' + l.x + '%;top:' + l.y + '%;--d:' + Math.round(900 + l.y * 9) + 'ms" aria-label="' + esc(l.name) + ' location, ' + esc(l.region) + '"><span></span><em>' + esc(l.name) + '</em></button>';
          }).join('') + '</div>' +
          '<div class="gr-mp-bubble" aria-hidden="true"><span class="gr-mp-card"></span></div>' +
        '</div>' +
        coverage() +
        '<div class="gr-mp-panel">' +
          '<div class="gr-mp-photo" style="background-image:url(&quot;' + esc(p.photo) + '&quot;)"><span class="gr-mp-badge">' + G + 'Google Maps</span></div>' +
          '<div class="gr-mp-body">' +
            '<h3>' + esc(p.name) + '</h3>' +
            '<div class="gr-mp-rating"><strong>' + score(s) + '</strong>' + stars(s.rating) + '<span>(' + s.count + ')</span></div>' +
            '<span class="gr-mp-cat">' + esc(p.category) + ' · ' + esc(CDA_REVIEWS.coverage.locations) + ' locations</span>' +
            '<div class="gr-mp-tabs" aria-hidden="true"><span>Overview</span><span class="on">Reviews</span><span>About</span></div>' +
            '<button type="button" class="gr-mp-where"></button>' +
            '<div class="gr-mp-review" aria-live="polite"></div>' +
            '<div class="gr-mp-nav"><button type="button" class="gr-mp-arrow" data-step="-1" aria-label="Previous review">&larr;</button>' +
              '<span class="gr-mp-count"></span><span class="gr-mp-progress"><i></i></span>' +
              '<button type="button" class="gr-mp-arrow" data-step="1" aria-label="Next review">&rarr;</button></div>' +
          '</div>' +
        '</div>' +
      '</div>';
  }

  function mapReview(r) {
    return '<div class="gr-card-head">' + avatar(r) +
        '<div class="gr-who"><strong>' + esc(r.name) + '</strong>' + (r.detail ? '<span>' + esc(r.detail) + '</span>' : '') + '</div></div>' +
      '<div class="gr-rate-row">' + stars(r.rating) + '<span class="gr-time">' + esc(r.time) + '</span></div>' +
      '<p class="gr-text clamped" style="--lines:3">' + esc(r.text) + '</p>';
  }

  var PIN = '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 2a7 7 0 0 0-7 7c0 5.2 7 13 7 13s7-7.8 7-13a7 7 0 0 0-7-7zm0 9.5A2.5 2.5 0 1 1 12 6.5a2.5 2.5 0 0 1 0 5z"/></svg>';

  function wire(el) {
    var map = el.querySelector('.gr-map');
    var ca = map.querySelector('.gr-ca');
    var stage = map.querySelector('.gr-ca-stage');
    var locs = CDA_REVIEWS.locations;
    var dots = map.querySelectorAll('.gr-loc');
    var bubble = map.querySelector('.gr-mp-bubble');
    var card = bubble.querySelector('.gr-mp-card');
    var out = map.querySelector('.gr-mp-review');
    var where = map.querySelector('.gr-mp-where');
    var area = map.querySelector('.gr-ca-area');
    var borders = map.querySelectorAll('.gr-ca-line');
    var count = map.querySelector('.gr-mp-count');
    var prog = map.querySelector('.gr-mp-progress');
    var total = CDA_REVIEWS.reviews.length;
    var still = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    var CYCLE = 6000, ZOOM_MS = 1100;
    var active = 0, timer = null, curK = null, cam = { s: 1, x: 0, y: 0 }, pending = [];

    function later(fn, ms) { pending.push(setTimeout(fn, ms)); }
    function clearPending() { pending.forEach(clearTimeout); pending = []; }
    function zoomLevel() { return window.innerWidth <= 1180 ? 1.4 : 1.55; }

    // County each location sits in, from its map position (nearest county if it falls just off the coast).
    var probe = document.createElement('canvas').getContext('2d');
    function countyAt(l) {
      var x = l.x * 5, y = l.y * 5.6, near = null, nearest = Infinity;
      for (var j = 0; j < CDA_COUNTIES.counties.length; j++) {
        var c = CDA_COUNTIES.counties[j];
        if (probe.isPointInPath(new Path2D(c.d), x, y)) return c;
        var d = Math.hypot(c.c[0] - x, c.c[1] - y);
        if (d < nearest) { nearest = d; near = c; }
      }
      return near;
    }
    var counties = locs.map(countyAt);

    // Gold county borders: drawn outward from the picked student's county, which stays highlighted.
    function divide(k) {
      var c = counties[k];
      if (!c) return;
      if (!map.classList.contains('is-divided')) {
        for (var j = 0; j < borders.length; j++) {
          var m = CDA_COUNTIES.lines[j].m;
          borders[j].style.setProperty('--r', (Math.hypot(m[0] - c.c[0], m[1] - c.c[1]) / 560 * 1.1).toFixed(2) + 's');
        }
      }
      area.setAttribute('d', c.d);
      area.classList.remove('swap'); void area.getBoundingClientRect(); area.classList.add('swap');
      map.classList.add('is-divided');
    }

    // Move the camera: scale s, keeping the city at (cx, cy) inside the map box.
    function setCam(s, k) {
      var W = ca.clientWidth, H = ca.clientHeight;
      if (k == null) cam = { s: 1, x: 0, y: 0 };
      else {
        var l = locs[k], px = l.x / 100 * W, py = l.y / 100 * H;
        var cx = W / 2, cy = window.innerWidth <= 1180 ? H / 2 : H * 0.62;
        cam = { s: s, x: cx - px * s, y: cy - py * s };
      }
      stage.style.setProperty('--cam-s', cam.s);
      stage.style.setProperty('--cam-x', cam.x + 'px');
      stage.style.setProperty('--cam-y', cam.y + 'px');
    }
    function placeBubble(k) {
      var W = ca.clientWidth, H = ca.clientHeight, l = locs[k];
      bubble.style.left = (l.x / 100 * W * cam.s + cam.x) + 'px';
      bubble.style.top = (l.y / 100 * H * cam.s + cam.y) + 'px';
    }

    function land() {
      placeBubble(curK);
      card.classList.remove('swap'); void card.offsetWidth; card.classList.add('swap');
      bubble.classList.add('is-shown');
    }
    // The whole state until someone picks a student; picking zooms in on that city.
    function frame(zoom) {
      var was = [cam.s, cam.x, cam.y].join();
      clearPending();
      setCam(zoom ? zoomLevel() : 1, zoom ? curK : null);
      map.classList.toggle('is-zoomed', zoom);
      var moved = was !== [cam.s, cam.x, cam.y].join();
      if (moved) bubble.classList.remove('is-shown');
      if (bubble.classList.contains('is-shown')) return;
      if (moved && !still && map.classList.contains('is-live')) later(land, ZOOM_MS);
      else land();
    }

    function show(i, zoom) {
      active = (i + total) % total;
      var r = CDA_REVIEWS.reviews[active];
      var k = active % locs.length, l = locs[k];
      curK = k;
      for (var j = 0; j < dots.length; j++) dots[j].classList.toggle('on', j === k);
      card.innerHTML = avatar(r) +
        '<span class="gr-mp-meta"><strong>' + esc(r.name) + '</strong>' + stars(r.rating) + '</span>' +
        '<span class="gr-mp-snip">' + esc(snippet(r.text, 52)) + '</span>' +
        '<span class="gr-mp-city">' + PIN + esc(l.name) + '</span>';
      where.innerHTML = PIN + '<span><strong>' + esc(l.name) + '</strong> · ' + esc(counties[k] ? counties[k].name + ' County' : l.region) + '</span><em>See on map</em>';
      out.innerHTML = mapReview(r);
      count.textContent = (active + 1) + ' of ' + total;
      [out, prog].forEach(function (n) { n.classList.remove('swap'); void n.offsetWidth; n.classList.add('swap'); });

      bubble.classList.remove('is-shown');
      frame(!!zoom);
    }
    function stop() { clearInterval(timer); timer = null; map.classList.add('is-paused'); }
    function start() {
      if (still || timer || !map.classList.contains('is-live')) return;
      map.classList.remove('is-paused');
      prog.classList.remove('swap'); void prog.offsetWidth; prog.classList.add('swap');
      timer = setInterval(function () { map.classList.remove('is-divided'); show(active + 1); }, CYCLE);
    }
    function pick(i) { stop(); show(i, true); divide(curK); }
    function pickCurrent() { stop(); frame(true); divide(curK); }
    // Some pins sit almost on top of each other: a tap picks the nearest, tapping again moves to the next one there.
    function pinAt(x, y, fallback) {
      var near = [];
      for (var j = 0; j < dots.length; j++) {
        var r = dots[j].getBoundingClientRect();
        var d = Math.hypot(r.left + r.width / 2 - x, r.top + r.height / 2 - y);
        if (d <= 16) near.push({ k: j, d: d });
      }
      if (!near.length) return fallback;
      near.sort(function (a, b) { return a.d - b.d; });
      var list = near.map(function (n) { return n.k; });
      return list[(list.indexOf(curK) + 1) % list.length];
    }
    for (var i = 0; i < dots.length; i++) dots[i].addEventListener('click', function (e) {
      var k = +this.getAttribute('data-k');
      pick(e.detail ? pinAt(e.clientX, e.clientY, k) : k);
    });
    map.querySelectorAll('.gr-mp-arrow').forEach(function (b) { b.addEventListener('click', function () { pick(active + +b.getAttribute('data-step')); }); });
    [out, where, card].forEach(function (n) { n.addEventListener('click', pickCurrent); });
    map.querySelector('.gr-map-all').addEventListener('click', function () {
      map.classList.remove('is-divided');
      frame(false);
      // With a mouse the tour resumes when the pointer leaves the map.
      if (!window.matchMedia('(hover: hover)').matches) start();
    });

    // While zoomed, drag to move the map, keeping California in view beside the panel. On touch, once
    // the map reaches its limit the same swipe carries on scrolling the page, so nobody gets stuck on it.
    var panel = map.querySelector('.gr-mp-panel'), cover = map.querySelector('.gr-cover'), drag = null;
    function moveCam(dx, dy, touch) {
      var m = map.getBoundingClientRect(), c = ca.getBoundingClientRect();
      var wide = window.innerWidth > 1180;
      var midX = ((wide ? panel.getBoundingClientRect().right : m.left) + m.right) / 2 - c.left;
      var midY = (m.top + (wide ? m.bottom : cover.getBoundingClientRect().top)) / 2 - c.top;
      var y = cam.y + dy;
      cam.x = Math.min(midX, Math.max(midX - ca.clientWidth * cam.s, cam.x + dx));
      cam.y = Math.min(midY, Math.max(midY - ca.clientHeight * cam.s, y));
      stage.style.setProperty('--cam-x', cam.x + 'px');
      stage.style.setProperty('--cam-y', cam.y + 'px');
      if (curK != null) placeBubble(curK);
      if (touch && y !== cam.y) window.scrollBy({ top: cam.y - y, behavior: 'instant' });
    }
    function endDrag() { drag = null; map.classList.remove('is-dragging'); }
    map.addEventListener('pointerdown', function (e) {
      if (e.button || cam.s === 1 || e.target.closest('.gr-mp-panel, .gr-cover, .gr-map-all')) return;
      drag = { id: e.pointerId, x: e.clientX, y: e.clientY, on: false };
    });
    map.addEventListener('pointermove', function (e) {
      if (!drag || e.pointerId !== drag.id) return;
      var dx = e.clientX - drag.x, dy = e.clientY - drag.y;
      if (!drag.on) {
        // A small wobble is still a tap on a pin; past that it is a drag.
        if (Math.hypot(dx, dy) < 6) return;
        drag.on = true;
        map.setPointerCapture(e.pointerId);
        map.classList.add('is-dragging', 'was-dragged');
        stop();
      }
      drag.x = e.clientX; drag.y = e.clientY;
      moveCam(dx, dy, e.pointerType === 'touch');
    });
    map.addEventListener('pointerup', endDrag);
    map.addEventListener('pointercancel', endDrag);
    map.addEventListener('mouseenter', stop);
    map.addEventListener('mouseleave', start);
    map.addEventListener('focusin', stop);
    window.addEventListener('resize', function () {
      if (curK == null) return;
      if (cam.s > 1) setCam(zoomLevel(), curK);
      placeBubble(curK);
    });
    show(0);
    // Entrance: outline draws, cities pop in north to south, seal drops, then the camera tour starts.
    function enter() {
      if (map.classList.contains('is-in')) { start(); return; }
      map.classList.add('is-in');
      setTimeout(function () {
        map.classList.add('is-live');
        // Someone may already have picked a student during the entrance.
        if (!map.classList.contains('is-zoomed')) { show(active); start(); }
      }, still ? 0 : 2300);
    }
    if (!('IntersectionObserver' in window)) { enter(); return; }
    new IntersectionObserver(function (entries) {
      if (entries[0].isIntersecting) enter(); else stop();
    }, { threshold: 0.3 }).observe(map);
  }

  // Rating bar: count 0.0 to 5.0 and 0 to 127, stars fill in, when it scrolls into view.
  function countUp(el) {
    var bar = el.querySelector('.gr-bar');
    if (!bar) return;
    var still = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (still || !('IntersectionObserver' in window)) { bar.classList.add('is-in'); return; }
    var nums = bar.querySelectorAll('[data-to]');
    nums.forEach(function (n) { n.textContent = n.getAttribute('data-dec') ? '0.0' : '0'; });
    var io = new IntersectionObserver(function (entries) {
      if (!entries[0].isIntersecting) return;
      io.disconnect();
      bar.classList.add('is-in');
      var t0 = performance.now(), dur = 1400;
      (function tick(now) {
        var p = Math.min(1, (now - t0) / dur), e = 1 - Math.pow(1 - p, 3);
        nums.forEach(function (n) {
          var to = +n.getAttribute('data-to');
          n.textContent = n.getAttribute('data-dec') ? (to * e).toFixed(1) : Math.round(to * e);
        });
        if (p < 1) requestAnimationFrame(tick);
      })(t0);
    }, { threshold: 0.6 });
    io.observe(bar);
  }

  var root = document.querySelector('[data-reviews]');
  if (!root) return;
  CDA_REVIEWS.place.photo = root.getAttribute('data-photo') || 'images/clinic-group.jpg';
  CDA_REVIEWS.place.logo = root.getAttribute('data-logo') || 'images/logo-seal.png';
  var block = document.createElement('div');
  block.className = 'gr gr-v-maps';
  var top = root.hasAttribute('data-bare') ? '' : head(root.getAttribute('data-eyebrow'), root.getAttribute('data-title')) + bar(CDA_REVIEWS.summary);
  block.innerHTML = '<div class="wrap">' + top + maps(CDA_REVIEWS.summary, CDA_REVIEWS.reviews) + '</div>';
  root.textContent = '';
  root.appendChild(block);
  wire(block);
  countUp(block);
})();
