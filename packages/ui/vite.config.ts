import { defineConfig } from 'vite';
import { zerodep } from 'zerodep-js-compiler';

export default defineConfig({
  plugins: [zerodep()],
  build: {
    lib: { entry: 'src/index.ts', formats: ['es'], fileName: () => 'index.js' },
    sourcemap: true,
    minify: false,
    rolldownOptions: {
      // 宿主应用提供同一份运行时和样式引擎，避免组件库打入重复实例。
      external: (id) =>
        /^(zerodep-js|zerodep-js-css|date-fns|@date-fns\/tz|@lucide\/icons)(\/|$)/.test(id),
    },
  },
});
