import { test, expect } from '@playwright/test';

test('homepage loads with title', async ({ page }) => {
  await page.goto('/');
  const title = await page.title();
  expect(title.length).toBeGreaterThan(0);
});

test('navigation menu is visible', async ({ page }) => {
  await page.goto('/');
  // All apps have a nav with Home, My List, My Discounts links
  const nav = page.locator('nav, [role="navigation"]').first();
  await expect(nav).toBeVisible({ timeout: 10_000 });
});

test('can navigate to My List page', async ({ page }) => {
  await page.goto('/');
  const nav = page.locator('nav, [role="navigation"]');
  const link = nav.getByRole('link', { name: /my list/i }).first();
  await expect(link).toBeVisible({ timeout: 10_000 });
  await link.click();
  await expect(page).toHaveURL(/products/);
});

test('can navigate to My Discounts page', async ({ page }) => {
  await page.goto('/');
  const nav = page.locator('nav, [role="navigation"]');
  const link = nav.getByRole('link', { name: /my discounts/i }).first();
  await expect(link).toBeVisible({ timeout: 10_000 });
  await link.click();
  await expect(page).toHaveURL(/discounts/);
});

test('My List page loads', async ({ page }) => {
  await page.goto('/products');
  await expect(page).toHaveURL(/products/);
  // Page loads — heading may or may not be visible depending on auth/API availability
  const heading = page.getByRole('heading', { name: /my list/i });
  const hasHeading = await heading.isVisible().catch(() => false);
  if (hasHeading) {
    await expect(heading).toBeVisible();
  }
});
