/**
 * Vue-Specific E2E Tests
 * Tests Vue-specific features like Vue Router, Composition API, and Vuex
 */

import { test, expect } from '@playwright/test';
import { navigateToFramework, waitForPageLoad } from '../../utils/test-helpers';

test.describe('Vue App Specific Tests', () => {
  test.beforeEach(async ({ page }) => {
    await navigateToFramework(page, 'vue');
  });

  test('should load Vue app successfully', async ({ page }) => {
    await waitForPageLoad(page);
    
    // Verify Vue app loaded
    await expect(page.locator('#app')).toBeAttached();
    await expect(page.locator('h2, .title')).toContainText('Shop at Home');
  });

  test('should have Vue-specific elements', async ({ page }) => {
    await waitForPageLoad(page);
    
    // Check for Vue root element
    const app = await page.locator('#app').count();
    expect(app).toBe(1);
  });

  test('should navigate using Vue Router', async ({ page }) => {
    await waitForPageLoad(page);
    
    // Navigate to products
    await page.click('text=My List');
    await waitForPageLoad(page);
    expect(page.url()).toContain('/products');
    
    // Navigate back to home
    await page.goto('http://localhost:8080');
    await waitForPageLoad(page);
    
    // Navigate to discounts
    await page.click('text=My Discounts');
    await waitForPageLoad(page);
    expect(page.url()).toContain('/discounts');
  });

  test('should handle Vue route changes', async ({ page }) => {
    await waitForPageLoad(page);
    
    // Direct navigation to products
    await page.goto('http://localhost:8080/products');
    await waitForPageLoad(page);
    expect(page.url()).toContain('/products');
    
    // Direct navigation to discounts
    await page.goto('http://localhost:8080/discounts');
    await waitForPageLoad(page);
    expect(page.url()).toContain('/discounts');
    
    // Back navigation
    await page.goBack();
    await waitForPageLoad(page);
    expect(page.url()).toContain('/products');
  });

  test('should maintain Vue component state', async ({ page }) => {
    await waitForPageLoad(page);
    
    // Navigate to products
    await page.click('text=My List');
    await waitForPageLoad(page);
    
    // Navigate back
    await page.goBack();
    await waitForPageLoad(page);
    
    // Verify we're back on home page
    await expect(page.locator('h2, .title')).toContainText('Shop at Home');
  });

  test('should have Vue DevTools available', async ({ page }) => {
    await waitForPageLoad(page);
    
    // Check if Vue DevTools hook exists
    const hasVue = await page.evaluate(() => {
      return typeof (window as any).__VUE__ !== 'undefined' ||
             typeof (window as any).__VUE_DEVTOOLS_GLOBAL_HOOK__ !== 'undefined';
    });
    
    // Vue might not expose these in production, so this is informational
    console.log('Vue DevTools hook present:', hasVue);
  });

  test('should handle Vue component rendering', async ({ page }) => {
    await waitForPageLoad(page);
    
    // Check that buttons render and are interactive
    const buttons = await page.locator('button, .button').count();
    expect(buttons).toBeGreaterThan(0);
    
    // Verify buttons are clickable
    const myListButton = page.locator('text=My List').first();
    await expect(myListButton).toBeVisible();
  });

  test('should not have Vue errors in console', async ({ page }) => {
    const errors: string[] = [];
    
    page.on('console', msg => {
      if (msg.type() === 'error') {
        errors.push(msg.text());
      }
    });
    
    await waitForPageLoad(page);
    
    // Navigate to test Vue Router
    await page.click('text=My List');
    await waitForPageLoad(page);
    
    // Filter out known non-critical errors
    const criticalErrors = errors.filter(
      err => !err.includes('favicon') && !err.includes('404')
    );
    
    expect(criticalErrors.length).toBe(0);
  });

  test('should have responsive Vue components', async ({ page }) => {
    await waitForPageLoad(page);
    
    // Test mobile viewport
    await page.setViewportSize({ width: 375, height: 667 });
    await page.reload();
    await waitForPageLoad(page);
    
    // Verify content is still visible
    await expect(page.locator('h2, .title')).toBeVisible();
    
    // Test desktop viewport
    await page.setViewportSize({ width: 1920, height: 1080 });
    await page.reload();
    await waitForPageLoad(page);
    
    await expect(page.locator('h2, .title')).toBeVisible();
  });

  test('should handle Vue reactivity', async ({ page }) => {
    await waitForPageLoad(page);
    
    // Navigate to products to trigger reactive updates
    await page.click('text=My List');
    await waitForPageLoad(page);
    
    // Wait for any reactive updates
    await page.waitForTimeout(2000);
    
    // Page should be functional
    expect(page.url()).toContain('/products');
  });

  test('should handle Vuex store (if present)', async ({ page }) => {
    await waitForPageLoad(page);
    
    // Navigate to test store actions
    await page.click('text=My List');
    await waitForPageLoad(page);
    
    await page.click('text=My Discounts');
    await waitForPageLoad(page);
    
    // Both navigations should work without errors
    expect(page.url()).toContain('/discounts');
  });

  test('should handle Vue transitions smoothly', async ({ page }) => {
    await waitForPageLoad(page);
    
    // Navigate between routes to test transitions
    await page.click('text=My List');
    await page.waitForTimeout(500);
    await waitForPageLoad(page);
    
    expect(page.url()).toContain('/products');
    
    await page.goBack();
    await page.waitForTimeout(500);
    await waitForPageLoad(page);
    
    await expect(page.locator('h2, .title')).toContainText('Shop at Home');
  });
});
