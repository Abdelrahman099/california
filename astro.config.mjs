// @ts-check
import { defineConfig } from 'astro/config';

// Leave `base` and `build.assetsPrefix` unset: Webflow Cloud sets them
// from the environment's mount path at build time.
export default defineConfig({
  build: {
    inlineStylesheets: 'always',
  },
});
