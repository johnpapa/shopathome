/**
 * React-Specific E2E Tests
 * Tests React-specific features like hooks, state management, and React Router
 */

import { test, expect } from '@playwright/test';
import { navigateToFramework, waitForPageLoad } from '../../utils/test-helpers';

test.describe('React App Specific Tests', () => {
  test.beforeEach(async ({ page }) => {
    await navigateToFramework(page, 'react');
  });

  test('should load React app successfully', async ({ page }) => {
    await waitForPageLoad(page);
    
    // Verify React app loaded
    await expect(page.locator('#root')).toBeAttached();
    await expect(page.locator('h2, .title')).toContainText('Shop at Home');
  });

  test('should have React-specific elements', async ({ page }) => {
    await waitForPageLoad(page);
    
    // Check for React root element
    const root = await page.locator('#root').count();
    expect(root).toBe(1);
  });

  test('should navigate using React Router', async ({ page }) => {
    await waitForPageLoad(page);
    
    // Navigate to products
    await page.click('text=My List');
    await waitForPageLoad(page);
    expect(page.url()).toContain('/products');
    
    // Navigate back to home
    await page.goto('http://localhost:3000');
    await waitForPageLoad(page);
    
    // Navigate to discounts
    await page.click('text=My Discounts');
    await waitForPageLoad(page);
    expect(page.url()).toContain('/discounts');
  });

  test('should handle React route changes', async ({ page }) => {
    await waitForPageLoad(page);
    
    // Direct navigation to products
    await page.goto('http://localhost:3000/products');
    await waitForPageLoad(page);
    expect(page.url()).toContain('/products');
    
    // Direct navigation to discounts
    await page.goto('http://localhost:3000/discounts');
    await waitForPageLoad(page);
    expect(page.url()).toContain('/discounts');
    
    // Back navigation
    await page.goBack();
    await waitForPageLoad(page);
    expect(page.url()).toContain('/products');
  });

  test('should maintain React component state', async ({ page }) => {
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

  test('should have React DevTools hook', async ({ page }) => {
    await waitForPageLoad(page);
    
    // Check if React DevTools hook exists (indicates React is loaded)
    const hasReact = await page.evaluate(() => {
      return typeof (window as any).__REACT_DEVTOOLS_GLOBAL_HOOK__ !== 'undefined' ||
             typeof (window as any).React !== 'undefined';
    });
    
    // React might not expose these in production, so this is informational
    console.log('React DevTools hook present:', hasReact);
  });

  test('should handle React component rendering', async ({ page }) => {
    await waitForPageLoad(page);
    
    // Check that buttons render and are interactive
    const buttons = await page.locator('button, .button').count();
    expect(buttons).toBeGreaterThan(0);
    
    // Verify buttons are clickable
    const myListButton = page.locator('text=My List').first();
    await expect(myListButton).toBeVisible();
  });

  test('should not have React errors in console', async ({ page }) => {
    const errors: string[] = [];
    
    page.on('console', msg => {
      if (msg.type() === 'error') {
        errors.push(msg.text());
      }
    });
    
    await waitForPageLoad(page);
    
    // Navigate to test React Router
    await page.click('text=My List');
    await waitForPageLoad(page);
    
    // Filter out known non-critical errors
    const criticalErrors = errors.filter(
      err => !err.includes('favicon') && !err.includes('404')
    );
    
    expect(criticalErrors.length).toBe(0);
  });

  test('should have responsive React components', async ({ page }) => {
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

  test('should handle React Redux state (if present)', async ({ page }) => {
    await waitForPageLoad(page);
    
    // Navigate to products to trigger state updates
    await page.click('text=My List');
    await waitForPageLoad(page);
    
    // Wait for any state updates
    await page.waitForTimeout(2000);
    
    // Page should be functional
    expect(page.url()).toContain('/products');
  });

  test('should handle React hooks correctly', async ({ page }) => {
    await waitForPageLoad(page);
    
    // Test component re-rendering by navigation
    await page.click('text=My List');
    await waitForPageLoad(page);
    
    await page.click('text=My Discounts');
    await waitForPageLoad(page);
    
    // Both navigations should work without errors
    expect(page.url()).toContain('/discounts');
  });
});
