/**
 * Cross-Framework Mobile Responsiveness Tests
 * Tests responsive design across all frameworks on various viewports
 */

import { test, expect } from '@playwright/test';
import { navigateToFramework, waitForPageLoad } from '../../utils/test-helpers';
import { frameworks, testConfig } from '../../config/test-config';

const viewports = testConfig.viewports;

for (const [frameworkKey, frameworkConfig] of Object.entries(frameworks)) {
  test.describe(`Mobile Responsiveness - ${frameworkConfig.name}`, () => {
    
    test.describe('Mobile viewport (375x667)', () => {
      test.use({ viewport: viewports.mobile });

      test('should render correctly on mobile', async ({ page }) => {
        await navigateToFramework(page, frameworkKey as any);
        await waitForPageLoad(page);

        // Verify page loads
        await expect(page.locator('h2, .title')).toBeVisible();
        
        // Check viewport
        const viewport = page.viewportSize();
        expect(viewport?.width).toBe(375);
        expect(viewport?.height).toBe(667);
      });

      test('should have accessible navigation on mobile', async ({ page }) => {
        await navigateToFramework(page, frameworkKey as any);
        await waitForPageLoad(page);

        // Look for navigation elements
        const hasButtons = await page.locator('button, .button').count();
        expect(hasButtons).toBeGreaterThan(0);
      });

      test('should navigate to products on mobile', async ({ page }) => {
        await navigateToFramework(page, frameworkKey as any);
        
        // Click on products/my list link
        await page.locator('text=/My List|Products/i').first().click();
        await waitForPageLoad(page);
        
        expect(page.url()).toContain('/products');
      });

      test('should navigate to discounts on mobile', async ({ page }) => {
        await navigateToFramework(page, frameworkKey as any);
        
        // Click on discounts link
        await page.locator('text=/My Discounts|Discounts/i').first().click();
        await waitForPageLoad(page);
        
        expect(page.url()).toContain('/discounts');
      });

      test('should not have horizontal scroll on mobile', async ({ page }) => {
        await navigateToFramework(page, frameworkKey as any);
        await waitForPageLoad(page);

        // Check for horizontal overflow
        const scrollWidth = await page.evaluate(() => document.documentElement.scrollWidth);
        const clientWidth = await page.evaluate(() => document.documentElement.clientWidth);
        
        // Allow small differences
        expect(scrollWidth).toBeLessThanOrEqual(clientWidth + 5);
      });
    });

    test.describe('Tablet viewport (768x1024)', () => {
      test.use({ viewport: viewports.tablet });

      test('should render correctly on tablet', async ({ page }) => {
        await navigateToFramework(page, frameworkKey as any);
        await waitForPageLoad(page);

        // Verify page loads
        await expect(page.locator('h2, .title')).toBeVisible();
        
        // Check viewport
        const viewport = page.viewportSize();
        expect(viewport?.width).toBe(768);
        expect(viewport?.height).toBe(1024);
      });

      test('should have proper layout on tablet', async ({ page }) => {
        await navigateToFramework(page, frameworkKey as any);
        await waitForPageLoad(page);

        // Content should be visible
        const content = await page.locator('.content-container, .container, main').isVisible();
        expect(content).toBeTruthy();
      });

      test('should navigate properly on tablet', async ({ page }) => {
        await navigateToFramework(page, frameworkKey as any);
        
        // Navigate to products
        await page.locator('text=/My List|Products/i').first().click();
        await waitForPageLoad(page);
        expect(page.url()).toContain('/products');
        
        // Navigate back home
        await page.goBack();
        await waitForPageLoad(page);
        
        // Navigate to discounts
        await page.locator('text=/My Discounts|Discounts/i').first().click();
        await waitForPageLoad(page);
        expect(page.url()).toContain('/discounts');
      });
    });

    test.describe('Desktop viewport (1920x1080)', () => {
      test.use({ viewport: viewports.desktop });

      test('should render correctly on desktop', async ({ page }) => {
        await navigateToFramework(page, frameworkKey as any);
        await waitForPageLoad(page);

        // Verify page loads
        await expect(page.locator('h2, .title')).toBeVisible();
        
        // Check viewport
        const viewport = page.viewportSize();
        expect(viewport?.width).toBe(1920);
        expect(viewport?.height).toBe(1080);
      });

      test('should have full layout on desktop', async ({ page }) => {
        await navigateToFramework(page, frameworkKey as any);
        await waitForPageLoad(page);

        // All navigation elements should be visible
        const buttons = await page.locator('button, .button').count();
        expect(buttons).toBeGreaterThanOrEqual(2);
      });

      test('should have proper content width on desktop', async ({ page }) => {
        await navigateToFramework(page, frameworkKey as any);
        await waitForPageLoad(page);

        // Content should not be full width (should have margins)
        const containerWidth = await page.locator('.content-container, .container, main').first().evaluate(
          el => el.getBoundingClientRect().width
        );
        
        // Content should be less than viewport width
        expect(containerWidth).toBeLessThan(1920);
      });
    });

    test('should be responsive across all viewports', async ({ page }) => {
      const testViewports = [
        { name: 'mobile', ...viewports.mobile },
        { name: 'tablet', ...viewports.tablet },
        { name: 'desktop', ...viewports.desktop },
      ];

      for (const viewport of testViewports) {
        await page.setViewportSize({ width: viewport.width, height: viewport.height });
        await navigateToFramework(page, frameworkKey as any);
        await waitForPageLoad(page);

        // Verify content is visible
        const isVisible = await page.locator('h2, .title').isVisible();
        expect(isVisible).toBeTruthy();

        // Take screenshot for visual verification
        await page.screenshot({
          path: `test-results/${frameworkConfig.name}-${viewport.name}.png`,
          fullPage: false,
        });
      }
    });
  });
}

// Cross-framework responsive consistency
test.describe('Cross-Framework Responsive Consistency', () => {
  test('all frameworks should be mobile-friendly', async ({ browser }) => {
    const results: Array<{ framework: string; isMobileFriendly: boolean }> = [];

    for (const [frameworkKey, frameworkConfig] of Object.entries(frameworks)) {
      const context = await browser.newContext({ viewport: viewports.mobile });
      const page = await context.newPage();
      
      try {
        await navigateToFramework(page, frameworkKey as any);
        await waitForPageLoad(page);

        const scrollWidth = await page.evaluate(() => document.documentElement.scrollWidth);
        const clientWidth = await page.evaluate(() => document.documentElement.clientWidth);
        const hasHorizontalScroll = scrollWidth > clientWidth + 5;

        const hasContent = await page.locator('h2, .title').isVisible();

        results.push({
          framework: frameworkConfig.name,
          isMobileFriendly: !hasHorizontalScroll && hasContent,
        });
      } finally {
        await context.close();
      }
    }

    // All frameworks should be mobile-friendly
    const allMobileFriendly = results.every(r => r.isMobileFriendly);
    expect(allMobileFriendly).toBeTruthy();
    
    console.log('Mobile responsiveness check:', results);
  });
});
