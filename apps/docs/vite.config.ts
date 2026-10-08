import { defineConfig } from 'vite';
import { zerodep } from 'zerodep-js-vite';

export default defineConfig({
  plugins: [zerodep()],
  server: { port: 5174, strictPort: true },
  preview: { port: 4174, strictPort: true },
});
