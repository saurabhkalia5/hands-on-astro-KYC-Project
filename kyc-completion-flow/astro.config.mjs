// @ts-check
import { defineConfig } from 'astro/config';

import react from '@astrojs/react';

import node from '@astrojs/node';

import icon from 'astro-icon';


import netlify from '@astrojs/netlify';


// https://astro.build/config
export default defineConfig({
  integrations: [react(), icon()],
  output: 'server',
  adapter: netlify({
    edgeMiddleware: true
  }),
});