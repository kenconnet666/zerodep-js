import { defineConfig } from 'vitest/config';

// 独立验证编译器与其 Vite 集成，不加载浏览器测试环境。
export default defineConfig({
  test: {
    server: { deps: { inline: ['zerodep-js-css'] } },
    environment: 'node',
    include: ['packages/compiler/test/**/*.test.ts'],
    maxWorkers: 2,
    testTimeout: 30000,
  },
});
