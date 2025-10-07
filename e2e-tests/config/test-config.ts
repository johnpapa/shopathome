/**
 * Test configuration
 * Central configuration for E2E tests
 */

export interface FrameworkConfig {
  name: string;
  baseUrl: string;
  defaultTimeout: number;
}

export const frameworks = {
  angular: {
    name: 'Angular',
    baseUrl: 'http://localhost:4200',
    defaultTimeout: 30000,
  },
  react: {
    name: 'React',
    baseUrl: 'http://localhost:3000',
    defaultTimeout: 30000,
  },
  vue: {
    name: 'Vue',
    baseUrl: 'http://localhost:8080',
    defaultTimeout: 30000,
  },
  svelte: {
    name: 'Svelte',
    baseUrl: 'http://localhost:5001',
    defaultTimeout: 30000,
  },
};

export const apis = {
  azureFunctions: {
    name: 'Azure Functions',
    baseUrl: 'http://localhost:7071',
    timeout: 10000,
  },
  fastify: {
    name: 'Fastify',
    baseUrl: 'http://localhost:3001',
    timeout: 10000,
  },
};

export const testConfig = {
  // Performance thresholds (in milliseconds)
  performance: {
    maxPageLoadTime: 3000,
    maxApiResponseTime: 1000,
    maxTimeToInteractive: 5000,
  },

  // Mobile viewport sizes
  viewports: {
    mobile: { width: 375, height: 667 },
    tablet: { width: 768, height: 1024 },
    desktop: { width: 1920, height: 1080 },
  },

  // Test timeouts
  timeouts: {
    short: 5000,
    medium: 10000,
    long: 30000,
  },

  // Retry configuration
  retries: {
    flaky: 3,
    stable: 1,
  },
};

export default testConfig;
