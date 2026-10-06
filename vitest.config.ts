import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    environment: 'node',
    globals: false,
    include: [
      'tests/tooling/**/*.test.ts',
      'packages/*/test/**/*.test.ts',
      'apps/*/test/**/*.test.ts',
    ],
    clearMocks: true,
    restoreMocks: true,
    setupFiles: ['./tests/native/compiler.setup.ts'],
    maxWorkers: 2,
  },
});
