# Main page update: design 13 (Real Graduates)

## What it is
A simpler main page, approved as design 13, at `/preview/designs/13/`. It runs alongside the current
`/preview` page and does not replace it.

Sections, top to bottom:
1. Hero: "Your dental career is 8-15 weeks away." with one button, the phone number, the Google rating
   and two scrolling columns of real named graduates from the live site.
2. Hiring partners' logos.
3. "Learning with the California Dental Assistant Program / You do these three things." Three cards
   (01 Learn online, 02 Train hands-on, 03 Launch your career) in navy, gold and Work Sans.
4. Find your closest location: region buttons that zoom the interactive reviews map.
5. The live site's three promises (Easy Tuition Financing, 99% Program Success Rate, 99% Job
   Placement) in the same cards.
6. Student video and three Google review quotes.
7. Why pick the program, with the details folded until opened.
8. Start Your Admission: one form beside a graduate holding his certificate.
9. Questions, then a new compact footer.

The header is one row (about 80px instead of 215px) with a bigger seal; every live link is kept.
No price appears anywhere on the page.

## Files
| File | Change |
|---|---|
| `src/pages/designs/13.astro` | New. The page. |
| `src/designs/Shell.astro` | New. Page frame: header, footer, form script. |
| `src/designs/SiteHeader.astro`, `public/home/site-header.js` | New. Smaller header, its menus, search and phone menu. |
| `src/designs/SiteFooter.astro` | New. Compact footer. |
| `src/designs/ApplyForm.astro` | New. The GoHighLevel form, or a preview that sends nothing until it is set up. |
| `src/designs/data.ts` | New. Text and links taken from the live homepage. |
| `src/home/header.html`, `src/home/footer.html`, `public/home/chrome.css`, `public/home/home.js` | New. The live site's header and footer styles, used by the frame. |
| `GOHIGHLEVEL-FORM-SETUP.md` | New. How to connect the form. |
| `public/reviews/reviews.js` | The map can take its own heading or none (`data-eyebrow`, `data-title`, `data-bare`). Existing pages unchanged. |
| `src/layouts/Layout.astro` | The seal preloader can be switched off per page (it is off on design 13). |
| `src/pages/index.astro` | The $4,500 price is removed from the text. The tuition card and FAQ now point to the free appointment. |
| `src/config.ts` | Adds `HERO_FORM_ID` (empty until the form is set up). |
| `astro.config.mjs`, `package-lock.json` | The unused React integration is removed. |
| `src/components/*` | Removed. The old React location components were no longer used. |

## Before going live
- **Form:** still a preview that sends nothing. Follow `GOHIGHLEVEL-FORM-SETUP.md`, paste the form ID
  in `src/config.ts`, then rebuild.
- **Video price:** the `/preview` page's Virtual Preview video still says the price out loud at about
  7:10, and in its captions (`public/videos/virtual-preview.vtt`). It needs a re-edit.
- **Graduates' photos and names** are now on the first screen. Check that each person agreed.
- **Student video** has a TikTok watermark. Swap in a clean copy if there is one.
- **99% figures** come from the live site with no source shown.

## Going live
Not deployed. Run `Deploy to Webflow.command` (Mac) to publish to californiadentalassistant.com/preview.
Astro 7.4.2 needs Node 22.23.4 or later.

## Tested
This zip, unpacked and built on its own, served at /preview in Chrome at 6 widths from 1920 to 320px:
both pages build, no sideways scroll, no broken images or missing files, no script errors, no price on
either page. Map zoom and region buttons were checked earlier on the same code. Not tested on a
physical phone or on the live site.
