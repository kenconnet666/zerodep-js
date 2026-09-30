import { defineConfig } from 'vite';
import { zerodep } from '@zerodep-js/vite';

export default defineConfig({
  plugins: [zerodep()],
  appType: 'custom',
  ssr: { noExternal: ['@zerodep-js/core', '@zerodep-js/ssr'] },
});
