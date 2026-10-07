import { build } from 'vite';
import { zerodep } from 'zerodep-js-vite';

// 组件库使用同一 Vite 插件；运行时保留为 peer，避免打入第二份响应式实例。
await build({
  root: import.meta.dirname,
  configFile: false,
  plugins: [zerodep()],
  build: {
    lib: { entry: 'library/Counter.tsx', formats: ['es'], fileName: () => 'Counter.js' },
    outDir: 'library/dist',
    sourcemap: true,
    minify: false,
    rolldownOptions: { external: (id) => id === 'zerodep-js' || id.startsWith('zerodep-js/') },
  },
});
