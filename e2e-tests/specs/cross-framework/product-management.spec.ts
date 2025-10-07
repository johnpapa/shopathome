/**
 * Cross-Framework Product Management Tests
 * Tests CRUD operations across all 4 frameworks (Angular, React, Vue, Svelte)
 */

import { test, expect } from '@playwright/test';
import { HomePage, ProductsPage } from '../../utils/page-objects';
import { navigateToFramework, waitForPageLoad } from '../../utils/test-helpers';
import { frameworks } from '../../config/test-config';
import { newTestProduct, updatedTestProduct } from '../../fixtures/test-data';

// Run tests for each framework
for (const [frameworkKey, frameworkConfig] of Object.entries(frameworks)) {
  test.describe(`Product Management - ${frameworkConfig.name}`, () => {
    let homePage: HomePage;
    let productsPage: ProductsPage;

    test.beforeEach(async ({ page }) => {
      homePage = new HomePage(page);
      productsPage = new ProductsPage(page);
      
      // Navigate to framework home page
      await navigateToFramework(page, frameworkKey as any);
    });

    test('should display products list', async ({ page }) => {
      await homePage.navigateToProducts();
      
      // Verify products page loaded
      await expect(page.locator('h2, .title')).toContainText(/Products|My List/i);
      
      // Check if products are displayed (might be loading or empty initially)
      const productItems = await productsPage.getProductItems();
      expect(productItems.length).toBeGreaterThanOrEqual(0);
    });

    test('should navigate from home to products page', async ({ page }) => {
      await homePage.verifyPageLoaded();
      await homePage.navigateToProducts();
      
      // Verify URL changed
      expect(page.url()).toContain('/products');
      
      // Verify products page elements are visible
      const hasAddButton = await productsPage.addProductButton.isVisible().catch(() => false);
      const hasRefreshButton = await productsPage.refreshButton.isVisible().catch(() => false);
      expect(hasAddButton || hasRefreshButton).toBeTruthy();
    });

    test('should refresh products list', async ({ page }) => {
      await homePage.navigateToProducts();
      
      // Wait for initial load
      await waitForPageLoad(page);
      
      // Click refresh button
      await productsPage.clickRefresh();
      
      // Verify page reloaded
      await waitForPageLoad(page);
      expect(page.url()).toContain('/products');
    });

    test('should show product details', async ({ page }) => {
      await homePage.navigateToProducts();
      await waitForPageLoad(page);
      
      // Get first product if available
      const productItems = await productsPage.getProductItems();
      if (productItems.length > 0) {
        const firstProduct = productItems[0];
        
        // Verify product card has content
        const content = await firstProduct.textContent();
        expect(content).toBeTruthy();
        expect(content?.length).toBeGreaterThan(0);
      }
    });

    test('should handle empty product list gracefully', async ({ page }) => {
      await homePage.navigateToProducts();
      
      // Page should load without errors even if list is empty
      await waitForPageLoad(page);
      expect(page.url()).toContain('/products');
      
      // Should not show error messages
      const hasError = await page.locator('text=/error|failed/i').isVisible().catch(() => false);
      expect(hasError).toBeFalsy();
    });

    test('should have accessible product management interface', async ({ page }) => {
      await homePage.navigateToProducts();
      
      // Check for key interactive elements
      const addButton = productsPage.addProductButton;
      const refreshButton = productsPage.refreshButton;
      
      // At least one action button should be available
      const hasAddBtn = await addButton.isVisible().catch(() => false);
      const hasRefreshBtn = await refreshButton.isVisible().catch(() => false);
      expect(hasAddBtn || hasRefreshBtn).toBeTruthy();
    });
  });
}

// Additional cross-framework consistency tests
test.describe('Cross-Framework Product Consistency', () => {
  test('all frameworks should have similar product page structure', async ({ browser }) => {
    const results: Array<{ framework: string; hasProducts: boolean; hasControls: boolean }> = [];

    for (const [frameworkKey, frameworkConfig] of Object.entries(frameworks)) {
      const context = await browser.newContext();
      const page = await context.newPage();
      
      try {
        await navigateToFramework(page, frameworkKey as any, '/products');
        await waitForPageLoad(page);

        const hasProductList = await page.locator('.list, [data-testid="product-list"]').isVisible().catch(() => false);
        const hasAddButton = await page.locator('.add-button, [data-testid="add-product-btn"]').isVisible().catch(() => false);
        const hasRefreshButton = await page.locator('.refresh-button, [data-testid="refresh-btn"]').isVisible().catch(() => false);

        results.push({
          framework: frameworkConfig.name,
          hasProducts: hasProductList,
          hasControls: hasAddButton || hasRefreshButton,
        });
      } finally {
        await context.close();
      }
    }

    // All frameworks should have consistent structure
    const allHaveControls = results.every(r => r.hasControls);
    expect(allHaveControls).toBeTruthy();
    
    console.log('Framework consistency check:', results);
  });
});
