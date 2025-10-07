import { defineConfig, devices } from '@playwright/test';

/**
 * Playwright configuration for multi-framework E2E testing
 * Tests Angular, React, Vue, Svelte apps and their API integrations
 */
export default defineConfig({
  testDir: './e2e-tests',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: 'html',
  
  use: {
    baseURL: 'http://localhost:4200',
    trace: 'on-first-retry',
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
  },

  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
    {
      name: 'firefox',
      use: { ...devices['Desktop Firefox'] },
    },
    {
      name: 'webkit',
      use: { ...devices['Desktop Safari'] },
    },
    {
      name: 'mobile-chrome',
      use: { ...devices['Pixel 5'] },
    },
    {
      name: 'mobile-safari',
      use: { ...devices['iPhone 12'] },
    },
  ],

  // Start all web servers and APIs before running tests
  webServer: [
    {
      command: 'cd angular-app && npm start',
      port: 4200,
      reuseExistingServer: !process.env.CI,
      timeout: 120000,
    },
    {
      command: 'cd react-app && npm start',
      port: 3000,
      reuseExistingServer: !process.env.CI,
      timeout: 120000,
    },
    {
      command: 'cd vue-app && npm run serve',
      port: 8080,
      reuseExistingServer: !process.env.CI,
      timeout: 120000,
    },
    {
      command: 'cd svelte-app && npm run dev',
      port: 5001,
      reuseExistingServer: !process.env.CI,
      timeout: 120000,
    },
    {
      command: 'cd fastify-api-server && npm start',
      port: 3001,
      reuseExistingServer: !process.env.CI,
      timeout: 60000,
    },
    {
      command: 'cd api && func start',
      port: 7071,
      reuseExistingServer: !process.env.CI,
      timeout: 60000,
    },
  ],
});
