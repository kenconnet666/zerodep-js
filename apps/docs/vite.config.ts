import { defineConfig } from 'vite';
import { zerodep } from 'zerodep-js-compiler/vite';

export default defineConfig({
  plugins: [zerodep()],
  ssr: { noExternal: ['zerodep-js', 'zerodep-js-ssr', 'zerodep-js-css'] },
  server: { port: 5174, strictPort: true },
  preview: { port: 4174, strictPort: true },
});
