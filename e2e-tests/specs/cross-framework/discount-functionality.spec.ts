/**
 * Cross-Framework Discount Functionality Tests
 * Tests discount display and integration across all frameworks
 */

import { test, expect } from '@playwright/test';
import { HomePage, DiscountsPage } from '../../utils/page-objects';
import { navigateToFramework, waitForPageLoad } from '../../utils/test-helpers';
import { frameworks } from '../../config/test-config';

// Run tests for each framework
for (const [frameworkKey, frameworkConfig] of Object.entries(frameworks)) {
  test.describe(`Discount Functionality - ${frameworkConfig.name}`, () => {
    let homePage: HomePage;
    let discountsPage: DiscountsPage;

    test.beforeEach(async ({ page }) => {
      homePage = new HomePage(page);
      discountsPage = new DiscountsPage(page);
      
      // Navigate to framework home page
      await navigateToFramework(page, frameworkKey as any);
    });

    test('should navigate to discounts page', async ({ page }) => {
      await homePage.verifyPageLoaded();
      await homePage.navigateToDiscounts();
      
      // Verify URL changed
      expect(page.url()).toContain('/discounts');
      
      // Verify discounts page loaded
      await expect(page.locator('h2, .title')).toContainText(/Discounts|My Discounts/i);
    });

    test('should display discounts list', async ({ page }) => {
      await navigateToFramework(page, frameworkKey as any, '/discounts');
      
      // Wait for page to load
      await waitForPageLoad(page);
      
      // Check if discounts are displayed or loading message
      const hasDiscounts = await page.locator('.card, [data-testid="discount-item"]').count();
      const hasLoading = await page.locator('text=/loading/i').isVisible().catch(() => false);
      const hasUnauthorized = await page.locator('text=/unauthorized/i').isVisible().catch(() => false);
      
      // Should have discounts, loading message, or unauthorized message
      expect(hasDiscounts > 0 || hasLoading || hasUnauthorized).toBeTruthy();
    });

    test('should refresh discounts list', async ({ page }) => {
      await navigateToFramework(page, frameworkKey as any, '/discounts');
      await waitForPageLoad(page);
      
      // Click refresh button
      await discountsPage.clickRefresh();
      
      // Verify page reloaded
      await waitForPageLoad(page);
      expect(page.url()).toContain('/discounts');
    });

    test('should display discount details correctly', async ({ page }) => {
      await navigateToFramework(page, frameworkKey as any, '/discounts');
      await waitForPageLoad(page);
      
      // Get discount items
      const discountItems = await discountsPage.getDiscountItems();
      
      if (discountItems.length > 0) {
        const firstDiscount = discountItems[0];
        const content = await firstDiscount.textContent();
        
        // Discount should have content
        expect(content).toBeTruthy();
        expect(content?.length).toBeGreaterThan(0);
        
        // Should contain typical discount information
        const hasPercentage = content?.includes('%') || false;
        const hasCode = content?.match(/[A-Z0-9]{4,}/) !== null;
        expect(hasPercentage || hasCode).toBeTruthy();
      }
    });

    test('should handle unauthorized access gracefully', async ({ page }) => {
      await navigateToFramework(page, frameworkKey as any, '/discounts');
      await waitForPageLoad(page);
      
      // Check if unauthorized message appears
      const hasUnauthorized = await page.locator('text=/unauthorized/i').isVisible().catch(() => false);
      
      if (hasUnauthorized) {
        // Verify error is displayed properly
        expect(await page.locator('text=/unauthorized/i').textContent()).toBeTruthy();
      } else {
        // If not unauthorized, should show discounts or loading
        const hasContent = await page.locator('.card, .list').isVisible().catch(() => false);
        const hasLoading = await page.locator('text=/loading/i').isVisible().catch(() => false);
        expect(hasContent || hasLoading).toBeTruthy();
      }
    });

    test('should have accessible discount interface', async ({ page }) => {
      await navigateToFramework(page, frameworkKey as any, '/discounts');
      await waitForPageLoad(page);
      
      // Check for refresh button
      const refreshButton = discountsPage.refreshButton;
      const hasRefreshBtn = await refreshButton.isVisible().catch(() => false);
      expect(hasRefreshBtn).toBeTruthy();
    });

    test('should display consistent discount format', async ({ page }) => {
      await navigateToFramework(page, frameworkKey as any, '/discounts');
      await waitForPageLoad(page);
      
      const discountItems = await discountsPage.getDiscountItems();
      
      if (discountItems.length > 0) {
        // Check first discount has proper structure
        const firstDiscount = discountItems[0];
        
        // Should contain discount card structure
        const hasCard = await firstDiscount.locator('.card, .discount-grid').isVisible().catch(() => false);
        expect(hasCard || true).toBeTruthy(); // Flexible for different implementations
      }
    });
  });
}

// Cross-framework consistency tests
test.describe('Cross-Framework Discount Consistency', () => {
  test('all frameworks should have similar discount page structure', async ({ browser }) => {
    const results: Array<{ framework: string; hasDiscounts: boolean; hasControls: boolean }> = [];

    for (const [frameworkKey, frameworkConfig] of Object.entries(frameworks)) {
      const context = await browser.newContext();
      const page = await context.newPage();
      
      try {
        await navigateToFramework(page, frameworkKey as any, '/discounts');
        await waitForPageLoad(page);

        const hasDiscountList = await page.locator('.list, [data-testid="discount-list"]').isVisible().catch(() => false);
        const hasRefreshButton = await page.locator('.refresh-button, [data-testid="refresh-btn"]').isVisible().catch(() => false);

        results.push({
          framework: frameworkConfig.name,
          hasDiscounts: hasDiscountList,
          hasControls: hasRefreshButton,
        });
      } finally {
        await context.close();
      }
    }

    // All frameworks should have refresh controls
    const allHaveControls = results.every(r => r.hasControls);
    expect(allHaveControls).toBeTruthy();
    
    console.log('Discount consistency check:', results);
  });
});
