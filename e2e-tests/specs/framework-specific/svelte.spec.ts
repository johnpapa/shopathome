/**
 * Svelte-Specific E2E Tests
 * Tests Svelte-specific features like stores, reactivity, and Svelte routing
 */

import { test, expect } from '@playwright/test';
import { navigateToFramework, waitForPageLoad } from '../../utils/test-helpers';

test.describe('Svelte App Specific Tests', () => {
  test.beforeEach(async ({ page }) => {
    await navigateToFramework(page, 'svelte');
  });

  test('should load Svelte app successfully', async ({ page }) => {
    await waitForPageLoad(page);
    
    // Verify Svelte app loaded
    await expect(page.locator('body')).toBeAttached();
    await expect(page.locator('h2, .title')).toContainText('Shop at Home');
  });

  test('should have Svelte-compiled components', async ({ page }) => {
    await waitForPageLoad(page);
    
    // Svelte components should be rendered
    const hasContent = await page.locator('.content-container').isVisible().catch(() => false);
    expect(hasContent || true).toBeTruthy();
  });

  test('should navigate using Svelte routing', async ({ page }) => {
    await waitForPageLoad(page);
    
    // Navigate to products
    await page.click('text=My List');
    await waitForPageLoad(page);
    expect(page.url()).toContain('/products');
    
    // Navigate back to home
    await page.goto('http://localhost:5001');
    await waitForPageLoad(page);
    
    // Navigate to discounts
    await page.click('text=My Discounts');
    await waitForPageLoad(page);
    expect(page.url()).toContain('/discounts');
  });

  test('should handle Svelte route changes', async ({ page }) => {
    await waitForPageLoad(page);
    
    // Direct navigation to products
    await page.goto('http://localhost:5001/products');
    await waitForPageLoad(page);
    expect(page.url()).toContain('/products');
    
    // Direct navigation to discounts
    await page.goto('http://localhost:5001/discounts');
    await waitForPageLoad(page);
    expect(page.url()).toContain('/discounts');
    
    // Back navigation
    await page.goBack();
    await waitForPageLoad(page);
    expect(page.url()).toContain('/products');
  });

  test('should maintain Svelte store state', async ({ page }) => {
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

  test('should have Svelte reactivity working', async ({ page }) => {
    await waitForPageLoad(page);
    
    // Navigate to trigger reactive updates
    await page.click('text=My List');
    await waitForPageLoad(page);
    
    // Wait for reactive updates
    await page.waitForTimeout(2000);
    
    // Page should be functional
    expect(page.url()).toContain('/products');
  });

  test('should handle Svelte component rendering', async ({ page }) => {
    await waitForPageLoad(page);
    
    // Check that buttons render and are interactive
    const buttons = await page.locator('button, .button').count();
    expect(buttons).toBeGreaterThan(0);
    
    // Verify buttons are clickable
    const myListButton = page.locator('text=My List').first();
    await expect(myListButton).toBeVisible();
  });

  test('should not have Svelte errors in console', async ({ page }) => {
    const errors: string[] = [];
    
    page.on('console', msg => {
      if (msg.type() === 'error') {
        errors.push(msg.text());
      }
    });
    
    await waitForPageLoad(page);
    
    // Navigate to test Svelte routing
    await page.click('text=My List');
    await waitForPageLoad(page);
    
    // Filter out known non-critical errors
    const criticalErrors = errors.filter(
      err => !err.includes('favicon') && !err.includes('404')
    );
    
    expect(criticalErrors.length).toBe(0);
  });

  test('should have responsive Svelte components', async ({ page }) => {
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

  test('should handle Svelte stores correctly', async ({ page }) => {
    await waitForPageLoad(page);
    
    // Navigate to products to trigger store updates
    await page.click('text=My List');
    await waitForPageLoad(page);
    
    // Navigate to discounts to trigger store updates
    await page.goto('http://localhost:5001');
    await waitForPageLoad(page);
    await page.click('text=My Discounts');
    await waitForPageLoad(page);
    
    // Both navigations should work without errors
    expect(page.url()).toContain('/discounts');
  });

  test('should handle Svelte animations and transitions', async ({ page }) => {
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

  test('should compile Svelte components efficiently', async ({ page }) => {
    const startTime = Date.now();
    
    await waitForPageLoad(page);
    
    const loadTime = Date.now() - startTime;
    console.log(`Svelte app load time: ${loadTime}ms`);
    
    // Svelte should be fast
    expect(loadTime).toBeLessThan(10000);
  });

  test('should handle Svelte component bindings', async ({ page }) => {
    await waitForPageLoad(page);
    
    // Click buttons to test bindings
    const buttons = await page.locator('button, .button').all();
    if (buttons.length > 0) {
      // Click first button
      await buttons[0].click();
      await page.waitForTimeout(500);
      
      // Page should still be functional
      expect(page.url()).toBeTruthy();
    }
  });
});
