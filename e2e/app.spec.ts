import { test, expect } from '@playwright/test';

test('homepage loads', async ({ page }) => {
  await page.goto('/');
  // All apps have a title containing the framework name; just verify it isn't blank
  const title = await page.title();
  expect(title.length).toBeGreaterThan(0);
});

test('products page shows product list', async ({ page }) => {
  await page.goto('/products');
  // All apps render products inside <ul class="list"> with card items
  const list = page.locator('ul.list');
  await expect(list).toBeVisible({ timeout: 10_000 });
  // Verify at least one product card is rendered
  const cards = list.locator('.card');
  await expect(cards.first()).toBeVisible({ timeout: 10_000 });
});

test('can navigate to products', async ({ page }) => {
  await page.goto('/');
  // All apps have a nav link to /products
  const navLink = page.getByRole('link', { name: /products/i });
  await navLink.first().click();
  await expect(page).toHaveURL(/products/);
});
