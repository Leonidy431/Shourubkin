import { defineConfig } from 'astro/config';

export default defineConfig({
  site: 'https://leonidy431.github.io',
  base: '/shourubkin',
  trailingSlash: 'ignore',
  i18n: {
    defaultLocale: 'ru',
    locales: ['ru', 'en'],
    routing: {
      prefixDefaultLocale: false,
    },
  },
});
