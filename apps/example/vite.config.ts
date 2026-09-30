import { defineConfig } from 'vite';

export default defineConfig({
  appType: 'custom',
  ssr: { noExternal: ['@zerodep-js/core', '@zerodep-js/ssr'] },
});
