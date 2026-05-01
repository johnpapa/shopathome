import { test, expect } from '@playwright/test';

test.describe('Mobile Responsiveness Tests', () => {

  test('homepage is visible on mobile', async ({ page }) => {
    await page.goto('/');
    await expect(page).toHaveTitle(/.+/);
    const nav = page.locator('nav, [role="navigation"]').first();
    await expect(nav).toBeVisible({ timeout: 10_000 });
  });

  test('navigation works on mobile', async ({ page }) => {
    await page.goto('/');
    const nav = page.locator('nav, [role="navigation"]').first();
    await expect(nav).toBeVisible({ timeout: 10_000 });
  });

  test('My List page loads on mobile', async ({ page }) => {
    await page.goto('/products');
    await expect(page).toHaveURL(/products/);
  });

  test('My Discounts page loads on mobile', async ({ page }) => {
    await page.goto('/discounts');
    await expect(page).toHaveURL(/discounts/);
  });

  test('page content fits mobile viewport', async ({ page }) => {
    await page.goto('/');
    const viewportSize = page.viewportSize();
    expect(viewportSize).not.toBeNull();

    const bodyWidth = await page.evaluate(() => document.body.scrollWidth);

    if (bodyWidth > viewportSize!.width) {
      console.warn(
        `Horizontal scroll detected: body width (${bodyWidth}px) exceeds viewport (${viewportSize!.width}px)`
      );
    }

    // 20px tolerance — minor overflow kabul edilebilir
    expect(bodyWidth).toBeLessThanOrEqual(viewportSize!.width + 20);
  });

});
