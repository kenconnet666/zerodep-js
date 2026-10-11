import { defineConfig } from 'vite';
import { workspacePlugins } from '../../scripts/vite-workspace.js';

export default defineConfig({
  plugins: workspacePlugins(),
  server: { port: 5174, strictPort: true },
  preview: { port: 4174, strictPort: true },
});
