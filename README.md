# CDA Program Virtual Preview

Landing page for the California Dental Assistant Program's free Virtual Preview of the Dental Assistant Program. Visitors watch the recorded preview, then book their Initial Student Admissions Appointment (main goal). The Student Application is offered as a secondary option. Built with Astro and set up to deploy on Webflow Cloud.

## Edit common things

| What | Where |
|---|---|
| Virtual Preview video link | `PREVIEW_VIDEO_URL` in `src/config.ts` |
| Admissions appointment calendar (GoHighLevel) | `BOOKING_URL` in `src/config.ts` |
| Student Application (GoHighLevel) | `APPLICATION_URL` in `src/config.ts` |
| Phone, email, address, main site link | `src/config.ts` |
| Headlines, testimonials, FAQ, "Inside the preview" | top of `src/pages/index.astro` |
| Colors and fonts | `:root` block in `src/layouts/Layout.astro` |
| Photos, logos, video | `public/images`, `public/videos` |

## Run it on your computer

Requires Node.js 22.12 or later.

```bash
npm install
npm run dev
```

Then open http://localhost:4321.

## Deploy to Webflow Cloud

1. Push this folder to a GitHub repository.
2. In Webflow, open your Workspace and click **New Project > App**, then authorize GitHub.
3. Under **Import a GitHub repository**, pick this repo and click **Import**.
4. Name the app, choose the `main` branch, and click **Deploy**.

Every push to `main` redeploys the site automatically (about 2 minutes). Webflow Cloud sets the mount path, so leave `base` unset in `astro.config.mjs`.
