// @ts-check
import { defineConfig } from 'astro/config';

import react from '@astrojs/react';


import icon from 'astro-icon';


import netlify from '@astrojs/netlify';


// https://astro.build/config
export default defineConfig({
  integrations: [react(), icon()],
  output: 'server', // default ssr type setting :- build all at once     //change to hybrid for ssg
  adapter: netlify(),
});