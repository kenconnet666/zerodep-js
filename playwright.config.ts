import { defineConfig, devices } from '@playwright/test';

const baseURL = 'http://127.0.0.1:4175';

export default defineConfig({
  testDir: './tests/e2e',
  fullyParallel: true,
  forbidOnly: Boolean(process.env.CI),
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : 2,
  reporter: 'list',
  outputDir: './test-results',
  use: {
    baseURL,
    trace: 'retain-on-failure',
    screenshot: 'only-on-failure',
  },
  projects: [
    { name: 'chromium', use: { ...devices['Desktop Chrome'] } },
    {
      name: 'firefox',
      testIgnore: '**/native-input.spec.ts',
      use: { ...devices['Desktop Firefox'] },
    },
    {
      name: 'webkit',
      testIgnore: '**/native-input.spec.ts',
      use: { ...devices['Desktop Safari'] },
    },
  ],
  webServer: [
    {
      command: 'pnpm --filter @zerodep-js/example preview --port 4175 --tasks-file :memory:',
      url: baseURL,
      reuseExistingServer: false,
      timeout: 30_000,
    },
    {
      command: 'pnpm --filter @zerodep-js/hosts preview --port 4177',
      url: 'http://127.0.0.1:4177/vue',
      reuseExistingServer: false,
      timeout: 30_000,
    },
  ],
});
