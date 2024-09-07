// @ts-check
import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';
import netlify from '@astrojs/netlify';

// https://astro.build/config
export default defineConfig({
    output: 'server',
    adapter: netlify(),
    integrations: [
        starlight({
            title: 'My Docs',
            prerender: false,
            social: {
                github: 'https://github.com/Fryuni/starlight-of-babel',
            },
            sidebar: [],
        }),
    ],
});
