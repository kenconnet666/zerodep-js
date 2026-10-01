import { defineConfig } from 'vite';
import { resolve } from 'node:path';
import react from '@vitejs/plugin-react';
import vue from '@vitejs/plugin-vue';
import { svelte } from '@sveltejs/vite-plugin-svelte';
import { zerodep } from 'zerodep-js-vite';

export default defineConfig(({ isSsrBuild }) => ({
  appType: 'custom',
  plugins: [
    zerodep({ include: 'src/page/**' }),
    react({ include: /\/src\/react\/.*\.[jt]sx?$/, jsxImportSource: 'react' }),
    vue(),
    svelte({ compilerOptions: { runes: true } }),
  ],
  server: { watch: { awaitWriteFinish: { stabilityThreshold: 100, pollInterval: 20 } } },
  ssr: { noExternal: ['zerodep-js', 'zerodep-js-react', 'zerodep-js-vue', 'zerodep-js-svelte'] },
  build: isSsrBuild
    ? {}
    : {
        rolldownOptions: {
          input: {
            vue: resolve(import.meta.dirname, 'vue.html'),
            react: resolve(import.meta.dirname, 'react.html'),
            svelte: resolve(import.meta.dirname, 'svelte.html'),
          },
        },
      },
}));
