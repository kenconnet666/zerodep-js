import { defineConfig } from 'vite';
import { zerodep } from 'zerodep-js-compiler/vite';
import { fileURLToPath } from 'node:url';

export default defineConfig(({ command }) => ({
  plugins: [zerodep()],
  // 文档开发直接转换组件源码，生产构建继续验收 UI 包的真实产物。
  resolve: {
    alias:
      command === 'serve'
        ? [
            {
              find: /^zerodep-js-ui$/,
              replacement: fileURLToPath(
                new URL('../../packages/ui/src/index.ts', import.meta.url),
              ),
            },
          ]
        : [],
  },
  optimizeDeps: { exclude: ['zerodep-js-ui'] },
  ssr: { noExternal: ['zerodep-js', 'zerodep-js-css'] },
  server: { port: 5174, strictPort: true },
  preview: { port: 4174, strictPort: true },
}));
