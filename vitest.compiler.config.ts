import { defineConfig } from 'vitest/config';

// 迁移阶段直接验证官方 TS 与 Babel，不加载旧原生编译器的测试初始化。
export default defineConfig({
  test: {
    server: { deps: { inline: ['zerodep-js-css'] } },
    environment: 'node',
    include: ['packages/compiler/test/**/*.test.ts', 'packages/vite/test/**/*.test.ts'],
    maxWorkers: 2,
    testTimeout: 30000,
  },
});
