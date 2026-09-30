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
    coverage: {
      provider: 'v8',
      include: ['packages/*/src/**/*.ts'],
      exclude: ['**/*.d.ts'],
      reportsDirectory: './coverage',
      reporter: ['text', 'html', 'json-summary'],
    },
  },
});
