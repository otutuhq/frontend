import { mockNuxtImport } from '@nuxt/test-utils/runtime';
import { afterAll, afterEach, beforeAll } from 'vitest';
import { server } from '~~/tests/mocks/server';

mockNuxtImport('useRuntimeConfig', () => () => {
  const { BACKEND_URL } = import.meta.env;
  return {
    app: {
      baseURL: '/',
      buildId: 'test',
    },
    public: {
      backendUrl: BACKEND_URL,
      baseUrl: BACKEND_URL,
      contact: {
        discord: 'https://discord.otutu.co',
        email: 'info@otutu.co',
        emailMailto: 'mailto:info@otutu.co',
        github: 'https://github.com/rotki',
        twitter: 'https://twitter.com/otutuhq',
      },
      i18n: {
        defaultLocale: 'en',
        detectBrowserLanguage: false,
      },
    },
  };
});

beforeAll(() => server.listen({ onUnhandledRequest: `error` }));

afterAll(() => server.close());

afterEach(() => server.resetHandlers());
