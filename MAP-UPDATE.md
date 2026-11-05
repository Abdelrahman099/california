# Map and mobile header update

## What changed
- California map (Student stories section): shows the whole state until someone picks a student or
  review. A pick zooms in gently, draws gold county borders outward, and highlights the picked county.
  "See all of California" goes back to the whole state, and so does the review tour when it resumes.
  A coverage badge is always shown.
- While zoomed, the map can be dragged with a mouse or a finger. On touch, a swipe that reaches the
  map's limit carries on scrolling the page. Over the whole-state view a swipe just scrolls the page.
  A tap picks the nearest pin; tapping again moves through close pins.
- Mobile header (520px and narrower): larger logo, smaller Book Appointment button, same tap area.
- Mobile bottom booking bar: one line and 44px tall instead of two lines.
- Hands-on class locations section: rebuilt with two React Bits components, Accordion Gallery (class
  photos) and Flowing Menu (region rows with a white hover band). All 17 cities are in the page HTML.

## Files
| File | Change |
|---|---|
| `public/reviews/ca-counties.js` | New. The 58 county shapes (US Census via us-atlas). Generated, do not edit. |
| `public/reviews/reviews.js` | Map behaviour |
| `public/reviews/reviews.css` | Map styles |
| `public/reviews/reviews-data.js` | Coverage wording |
| `src/pages/index.astro` | Loads `ca-counties.js`; mobile header and bottom bar sizes; new locations section |
| `astro.config.mjs` | Turns on the React integration the two new components need |
| `src/components/LocationPanels.jsx`, `LocationRows.jsx`, `locations.css` | New. The section's two components and their brand styling |
| `src/components/reactbits/` | New. React Bits source, lightly edited, with its license. Keep `LICENSE.md` with the code |

## Going live
Not deployed yet. Run `Deploy to Webflow.command` to publish to californiadentalassistant.com/preview.
Astro 7.4.2 needs Node 22.23.4 or later (the README says 22.12).

## Still to fill in
- Locations: the badge says 25+ (from the main site), but the map has 17 named pins. Add the rest to
  `locations` in `reviews-data.js`. Each one's county is worked out from its x/y position.
- Reviews are matched to cities by list order, not by where the student is from. If real cities are
  available, this should be linked properly, because the map now highlights that county.
- The locations section says 17 and the map badge says 25+. Add the missing locations to
  `handsOnRegions` in `src/pages/index.astro` as well, and the count there updates itself.
- The region photos are general class photos, not taken in those regions. Swap them there if needed.

## Tested
Production build served at /preview in Chrome, with mouse input and emulated touch at phone widths.
Not yet tested on a physical phone or on the live site.
