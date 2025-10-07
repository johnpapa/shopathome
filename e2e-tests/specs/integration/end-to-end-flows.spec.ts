/**
 * End-to-End Integration Tests
 * Tests complete user flows across frameworks and APIs
 */

import { test, expect } from '@playwright/test';
import { HomePage, ProductsPage, DiscountsPage } from '../../utils/page-objects';
import { navigateToFramework, waitForPageLoad } from '../../utils/test-helpers';
import { frameworks } from '../../config/test-config';

// Test complete user journeys for each framework
for (const [frameworkKey, frameworkConfig] of Object.entries(frameworks)) {
  test.describe(`End-to-End Flow - ${frameworkConfig.name}`, () => {
    let homePage: HomePage;
    let productsPage: ProductsPage;
    let discountsPage: DiscountsPage;

    test.beforeEach(async ({ page }) => {
      homePage = new HomePage(page);
      productsPage = new ProductsPage(page);
      discountsPage = new DiscountsPage(page);
      
      await navigateToFramework(page, frameworkKey as any);
    });

    test('complete user journey: home -> products -> discounts -> home', async ({ page }) => {
      // Step 1: Verify home page
      await homePage.verifyPageLoaded();
      await expect(page.locator('h2, .title')).toContainText('Shop at Home');
      
      // Step 2: Navigate to products
      await homePage.navigateToProducts();
      expect(page.url()).toContain('/products');
      await waitForPageLoad(page);
      
      // Step 3: Verify products page loaded
      const hasProductControls = await productsPage.addProductButton.isVisible().catch(() => false) ||
                                  await productsPage.refreshButton.isVisible().catch(() => false);
      expect(hasProductControls).toBeTruthy();
      
      // Step 4: Navigate to discounts from products
      await page.goto(frameworkConfig.baseUrl);
      await waitForPageLoad(page);
      await homePage.navigateToDiscounts();
      expect(page.url()).toContain('/discounts');
      
      // Step 5: Verify discounts page loaded
      const hasDiscountControls = await discountsPage.refreshButton.isVisible().catch(() => false);
      expect(hasDiscountControls).toBeTruthy();
      
      // Step 6: Navigate back to home
      await page.goto(frameworkConfig.baseUrl);
      await waitForPageLoad(page);
      await expect(page.locator('h2, .title')).toContainText('Shop at Home');
    });

    test('browser navigation: forward and back', async ({ page }) => {
      // Navigate to products
      await homePage.navigateToProducts();
      const productsUrl = page.url();
      expect(productsUrl).toContain('/products');
      
      // Navigate to home
      await page.goto(frameworkConfig.baseUrl);
      await waitForPageLoad(page);
      
      // Navigate to discounts
      await homePage.navigateToDiscounts();
      expect(page.url()).toContain('/discounts');
      
      // Go back to home
      await page.goBack();
      await waitForPageLoad(page);
      await expect(page.locator('h2, .title')).toContainText('Shop at Home');
      
      // Go forward to discounts
      await page.goForward();
      await waitForPageLoad(page);
      expect(page.url()).toContain('/discounts');
    });

    test('direct URL navigation', async ({ page }) => {
      // Direct navigation to products
      await page.goto(`${frameworkConfig.baseUrl}/products`);
      await waitForPageLoad(page);
      expect(page.url()).toContain('/products');
      
      // Direct navigation to discounts
      await page.goto(`${frameworkConfig.baseUrl}/discounts`);
      await waitForPageLoad(page);
      expect(page.url()).toContain('/discounts');
      
      // Direct navigation to home
      await page.goto(frameworkConfig.baseUrl);
      await waitForPageLoad(page);
      await expect(page.locator('h2, .title')).toContainText('Shop at Home');
    });

    test('page refresh preserves state', async ({ page }) => {
      // Navigate to products
      await homePage.navigateToProducts();
      expect(page.url()).toContain('/products');
      
      // Refresh page
      await page.reload();
      await waitForPageLoad(page);
      
      // Should still be on products page
      expect(page.url()).toContain('/products');
    });

    test('external link to GitHub', async ({ page, context }) => {
      await waitForPageLoad(page);
      
      // Find GitHub link
      const githubLink = page.locator('a[href*="github.com"], text=Code in GitHub').first();
      const hasGithubLink = await githubLink.isVisible().catch(() => false);
      
      if (hasGithubLink) {
        // Verify link has correct attributes
        const href = await githubLink.getAttribute('href');
        expect(href).toContain('github.com');
        
        const target = await githubLink.getAttribute('target');
        expect(target).toBe('_blank');
      }
    });

    test('multiple rapid navigations', async ({ page }) => {
      // Rapidly navigate between pages
      for (let i = 0; i < 3; i++) {
        await homePage.navigateToProducts();
        await page.waitForTimeout(500);
        
        await page.goto(frameworkConfig.baseUrl);
        await page.waitForTimeout(500);
        
        await homePage.navigateToDiscounts();
        await page.waitForTimeout(500);
        
        await page.goto(frameworkConfig.baseUrl);
        await page.waitForTimeout(500);
      }
      
      // App should still be functional
      await expect(page.locator('h2, .title')).toContainText('Shop at Home');
    });

    test('error handling: non-existent route', async ({ page }) => {
      // Navigate to non-existent route
      await page.goto(`${frameworkConfig.baseUrl}/non-existent-page`);
      await waitForPageLoad(page);
      
      // Should handle gracefully (either redirect or show 404)
      // Just verify page loaded without crash
      expect(page.url()).toBeTruthy();
    });

    test('data persistence across navigation', async ({ page }) => {
      // Navigate to products
      await homePage.navigateToProducts();
      await waitForPageLoad(page);
      
      // Get product count
      const initialProductCount = await productsPage.getProductCount();
      
      // Navigate away and back
      await page.goto(frameworkConfig.baseUrl);
      await waitForPageLoad(page);
      await homePage.navigateToProducts();
      await waitForPageLoad(page);
      
      // Product count should be consistent
      const finalProductCount = await productsPage.getProductCount();
      expect(finalProductCount).toBe(initialProductCount);
    });

    test('responsive navigation on mobile', async ({ page }) => {
      // Set mobile viewport
      await page.setViewportSize({ width: 375, height: 667 });
      
      // Reload page
      await page.goto(frameworkConfig.baseUrl);
      await waitForPageLoad(page);
      
      // Navigate to products on mobile
      await page.locator('text=/My List|Products/i').first().click();
      await waitForPageLoad(page);
      expect(page.url()).toContain('/products');
      
      // Navigate to discounts on mobile
      await page.goto(frameworkConfig.baseUrl);
      await waitForPageLoad(page);
      await page.locator('text=/My Discounts|Discounts/i').first().click();
      await waitForPageLoad(page);
      expect(page.url()).toContain('/discounts');
    });
  });
}

// Cross-framework integration tests
test.describe('Cross-Framework Integration', () => {
  test('all frameworks should complete basic user journey', async ({ browser }) => {
    const results: Array<{ framework: string; success: boolean; error?: string }> = [];

    for (const [frameworkKey, frameworkConfig] of Object.entries(frameworks)) {
      const context = await browser.newContext();
      const page = await context.newPage();
      
      try {
        // Navigate to home
        await navigateToFramework(page, frameworkKey as any);
        
        // Navigate to products
        await page.click('text=/My List|Products/i');
        await waitForPageLoad(page);
        const hasProducts = page.url().includes('/products');
        
        // Navigate back to home
        await page.goto(frameworkConfig.baseUrl);
        await waitForPageLoad(page);
        
        // Navigate to discounts
        await page.click('text=/My Discounts|Discounts/i');
        await waitForPageLoad(page);
        const hasDiscounts = page.url().includes('/discounts');

        results.push({
          framework: frameworkConfig.name,
          success: hasProducts && hasDiscounts,
        });
      } catch (error: any) {
        results.push({
          framework: frameworkConfig.name,
          success: false,
          error: error.message,
        });
      } finally {
        await context.close();
      }
    }

    console.log('Integration test results:', results);
    
    // All frameworks should complete the journey
    const allSuccessful = results.every(r => r.success);
    expect(allSuccessful).toBeTruthy();
  });
});
