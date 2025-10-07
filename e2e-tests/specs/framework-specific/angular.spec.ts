/**
 * Angular-Specific E2E Tests
 * Tests Angular-specific features like routing, lazy loading, and services
 */

import { test, expect } from '@playwright/test';
import { navigateToFramework, waitForPageLoad } from '../../utils/test-helpers';

test.describe('Angular App Specific Tests', () => {
  test.beforeEach(async ({ page }) => {
    await navigateToFramework(page, 'angular');
  });

  test('should load Angular app successfully', async ({ page }) => {
    await waitForPageLoad(page);
    
    // Verify Angular app loaded
    await expect(page.locator('app-root')).toBeAttached();
    await expect(page.locator('h2.title')).toContainText('Shop at Home');
  });

  test('should have Angular-specific elements', async ({ page }) => {
    await waitForPageLoad(page);
    
    // Check for Angular root element
    const appRoot = await page.locator('app-root').count();
    expect(appRoot).toBe(1);
  });

  test('should navigate using Angular router', async ({ page }) => {
    await waitForPageLoad(page);
    
    // Navigate to products
    await page.click('text=My List');
    await waitForPageLoad(page);
    expect(page.url()).toContain('/products');
    
    // Navigate to discounts
    await page.goto('http://localhost:4200');
    await waitForPageLoad(page);
    await page.click('text=My Discounts');
    await waitForPageLoad(page);
    expect(page.url()).toContain('/discounts');
  });

  test('should handle Angular route changes', async ({ page }) => {
    await waitForPageLoad(page);
    
    // Direct navigation to products
    await page.goto('http://localhost:4200/products');
    await waitForPageLoad(page);
    expect(page.url()).toContain('/products');
    
    // Direct navigation to discounts
    await page.goto('http://localhost:4200/discounts');
    await waitForPageLoad(page);
    expect(page.url()).toContain('/discounts');
    
    // Back navigation
    await page.goBack();
    await waitForPageLoad(page);
    expect(page.url()).toContain('/products');
  });

  test('should maintain state during navigation', async ({ page }) => {
    await waitForPageLoad(page);
    
    // Navigate to products
    await page.click('text=My List');
    await waitForPageLoad(page);
    
    // Navigate back
    await page.goBack();
    await waitForPageLoad(page);
    
    // Verify we're back on home page
    await expect(page.locator('h2.title')).toContainText('Shop at Home');
  });

  test('should load Angular with proper zone.js', async ({ page }) => {
    await waitForPageLoad(page);
    
    // Check if Zone.js is loaded (Angular's change detection)
    const hasZone = await page.evaluate(() => {
      return typeof (window as any).Zone !== 'undefined';
    });
    
    expect(hasZone).toBeTruthy();
  });

  test('should not have Angular errors in console', async ({ page }) => {
    const errors: string[] = [];
    
    page.on('console', msg => {
      if (msg.type() === 'error') {
        errors.push(msg.text());
      }
    });
    
    await waitForPageLoad(page);
    
    // Navigate to test Angular routing
    await page.click('text=My List');
    await waitForPageLoad(page);
    
    // Filter out known non-critical errors
    const criticalErrors = errors.filter(
      err => !err.includes('favicon') && !err.includes('404')
    );
    
    expect(criticalErrors.length).toBe(0);
  });

  test('should have responsive Angular components', async ({ page }) => {
    await waitForPageLoad(page);
    
    // Test mobile viewport
    await page.setViewportSize({ width: 375, height: 667 });
    await page.reload();
    await waitForPageLoad(page);
    
    // Verify content is still visible
    await expect(page.locator('h2.title')).toBeVisible();
    
    // Test desktop viewport
    await page.setViewportSize({ width: 1920, height: 1080 });
    await page.reload();
    await waitForPageLoad(page);
    
    await expect(page.locator('h2.title')).toBeVisible();
  });

  test('should have proper Angular meta tags', async ({ page }) => {
    await waitForPageLoad(page);
    
    // Check for viewport meta tag
    const viewport = await page.locator('meta[name="viewport"]').getAttribute('content');
    expect(viewport).toContain('width=device-width');
  });

  test('should handle Angular services properly', async ({ page }) => {
    await waitForPageLoad(page);
    
    // Navigate to products to trigger service calls
    await page.click('text=My List');
    await waitForPageLoad(page);
    
    // Wait for any API calls
    await page.waitForTimeout(2000);
    
    // Page should be functional
    expect(page.url()).toContain('/products');
  });
});
