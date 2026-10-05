import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import tailwindcss from '@tailwindcss/vite';
const site = process.env.SITE_URL;
if (site && !/^https:\/\/[^/]+\/?$/.test(site)) throw new Error('SITE_URL debe ser un origen HTTPS, sin ruta.');
export default defineConfig({ site, output: 'static', trailingSlash: 'always', integrations: [sitemap()], vite: { plugins: [tailwindcss()] } });
