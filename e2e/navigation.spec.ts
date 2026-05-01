import { test, expect } from './fixtures/index';

test.describe('Navigation Tests', () => {

  test('homepage loads with a title', async ({ homePage }) => {
    const title = await homePage.getTitle();
    expect(title.length).toBeGreaterThan(0);
  });

  test('navigation menu is visible', async ({ homePage }) => {
    const nav = homePage.getNav();
    await expect(nav).toBeVisible({ timeout: 10_000 });
  });

  test('can navigate to My List page', async ({ homePage, page }) => {
    await homePage.goToMyList();
    await expect(page).toHaveURL(/products/);
  });

  test('can navigate to My Discounts page', async ({ homePage, page }) => {
    await homePage.goToMyDiscounts();
    await expect(page).toHaveURL(/discounts/);
  });

});
