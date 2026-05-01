import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './e2e',
  timeout: 30_000,
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 1,
  workers: process.env.CI ? 1 : undefined,

  reporter: [
    ['html', { open: 'never' }],
    ['list'],
  ],

  use: {
    headless: true,
    screenshot: 'only-on-failure',
    trace: 'on-first-retry',
    video: 'on-first-retry',
  },

  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'], baseURL: 'http://localhost:4200' },
    },
    {
      name: 'firefox',
      use: { ...devices['Desktop Firefox'], baseURL: 'http://localhost:4200' },
    },
    {
      name: 'webkit',
      use: { ...devices['Desktop Safari'], baseURL: 'http://localhost:4200' },
    },
    {
      name: 'mobile-chrome',
      use: { ...devices['Pixel 5'], baseURL: 'http://localhost:4200' },
    },
    {
      name: 'mobile-safari',
      use: { ...devices['iPhone 12'], baseURL: 'http://localhost:4200' },
    },
  ],
});