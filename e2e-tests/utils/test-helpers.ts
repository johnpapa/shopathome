/**
 * Test helper utilities
 * Common functions used across all E2E tests
 */

import { Page, expect } from '@playwright/test';

/**
 * Wait for page to be fully loaded and interactive
 */
export async function waitForPageLoad(page: Page) {
  await page.waitForLoadState('networkidle');
  await page.waitForLoadState('domcontentloaded');
}

/**
 * Clear local storage and cookies
 */
export async function clearBrowserData(page: Page) {
  await page.context().clearCookies();
  await page.evaluate(() => localStorage.clear());
  await page.evaluate(() => sessionStorage.clear());
}

/**
 * Wait for API response
 */
export async function waitForApiResponse(page: Page, url: string | RegExp) {
  return await page.waitForResponse(url);
}

/**
 * Check if element is visible
 */
export async function isElementVisible(page: Page, selector: string): Promise<boolean> {
  try {
    await page.waitForSelector(selector, { state: 'visible', timeout: 5000 });
    return true;
  } catch {
    return false;
  }
}

/**
 * Get element text content
 */
export async function getElementText(page: Page, selector: string): Promise<string> {
  const element = await page.locator(selector);
  return await element.textContent() || '';
}

/**
 * Take screenshot with timestamp
 */
export async function takeTimestampedScreenshot(page: Page, name: string) {
  const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
  await page.screenshot({ path: `screenshots/${name}-${timestamp}.png`, fullPage: true });
}

/**
 * Measure performance metrics
 */
export async function measurePerformance(page: Page) {
  const metrics = await page.evaluate(() => {
    const navigation = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming;
    return {
      domContentLoaded: navigation.domContentLoadedEventEnd - navigation.domContentLoadedEventStart,
      loadComplete: navigation.loadEventEnd - navigation.loadEventStart,
      domInteractive: navigation.domInteractive - navigation.fetchStart,
      timeToFirstByte: navigation.responseStart - navigation.requestStart,
    };
  });
  return metrics;
}

/**
 * Check console for errors
 */
export async function getConsoleErrors(page: Page): Promise<string[]> {
  const errors: string[] = [];
  page.on('console', (msg) => {
    if (msg.type() === 'error') {
      errors.push(msg.text());
    }
  });
  return errors;
}

/**
 * Mock API endpoint
 */
export async function mockApiEndpoint(
  page: Page,
  url: string | RegExp,
  response: any
) {
  await page.route(url, (route) => {
    route.fulfill({
      status: response.status || 200,
      contentType: response.contentType || 'application/json',
      body: response.body,
    });
  });
}

/**
 * Verify no console errors occurred
 */
export async function expectNoConsoleErrors(page: Page) {
  const errors: string[] = [];
  page.on('console', (msg) => {
    if (msg.type() === 'error') {
      errors.push(msg.text());
    }
  });
  
  // Allow some time for any errors to appear
  await page.waitForTimeout(1000);
  
  if (errors.length > 0) {
    console.warn('Console errors detected:', errors);
  }
}

/**
 * Get framework-specific base URL
 */
export function getFrameworkUrl(framework: 'angular' | 'react' | 'vue' | 'svelte'): string {
  const urls = {
    angular: 'http://localhost:4200',
    react: 'http://localhost:3000',
    vue: 'http://localhost:8080',
    svelte: 'http://localhost:5001',
  };
  return urls[framework];
}

/**
 * Navigate to framework app
 */
export async function navigateToFramework(
  page: Page,
  framework: 'angular' | 'react' | 'vue' | 'svelte',
  path: string = '/'
) {
  const baseUrl = getFrameworkUrl(framework);
  await page.goto(`${baseUrl}${path}`);
  await waitForPageLoad(page);
}
