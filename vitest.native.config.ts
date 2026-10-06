import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    environment: 'node',
    include: ['packages/native/test/**/*.test.ts'],
    setupFiles: ['./tests/native/compiler.setup.ts'],
    maxWorkers: 2,
    clearMocks: true,
    restoreMocks: true,
  },
});
