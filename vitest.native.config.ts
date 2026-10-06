import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    environment: 'node',
    include: ['packages/compiler/test/**/*.test.ts', 'packages/native/test/**/*.test.ts'],
    exclude: ['packages/compiler/test/cli.test.ts'],
    setupFiles: ['./tests/native/compiler.setup.ts'],
    maxWorkers: 2,
    clearMocks: true,
    restoreMocks: true,
  },
});
