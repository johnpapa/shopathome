import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';

test.describe('Accessibility Tests', () => {

  test('homepage has no critical accessibility violations', async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('networkidle');

    const results = await new AxeBuilder({ page })
      .withTags(['wcag2a', 'wcag2aa'])
      .analyze();

    if (results.violations.length > 0) {
      console.warn(
        'Accessibility violations found on homepage:',
        results.violations.map(v => ({
          id: v.id,
          impact: v.impact,
          description: v.description,
        }))
      );
    }

    const criticalViolations = results.violations.filter(
      v => v.impact === 'critical'
    );
    expect(criticalViolations).toEqual([]);
  });

  test('navigation is keyboard accessible', async ({ page }) => {
    await page.goto('/');
    await page.keyboard.press('Tab');
    const focusedElement = page.locator(':focus');
    await expect(focusedElement).toBeVisible();
  });

  test('My List page has no critical accessibility violations', async ({ page }) => {
    await page.goto('/products');
    await page.waitForLoadState('networkidle');

    const results = await new AxeBuilder({ page })
      .withTags(['wcag2a', 'wcag2aa'])
      .analyze();

    if (results.violations.length > 0) {
      console.warn(
        'Accessibility violations found on My List page:',
        results.violations.map(v => ({
          id: v.id,
          impact: v.impact,
          description: v.description,
        }))
      );
    }

    const criticalViolations = results.violations.filter(
      v => v.impact === 'critical'
    );
    expect(criticalViolations).toEqual([]);
  });

  test('My Discounts page has no critical accessibility violations', async ({ page }) => {
    await page.goto('/discounts');
    await page.waitForLoadState('networkidle');

    const results = await new AxeBuilder({ page })
      .withTags(['wcag2a', 'wcag2aa'])
      .analyze();

    if (results.violations.length > 0) {
      console.warn(
        'Accessibility violations found on My Discounts page:',
        results.violations.map(v => ({
          id: v.id,
          impact: v.impact,
          description: v.description,
        }))
      );
    }

    const criticalViolations = results.violations.filter(
      v => v.impact === 'critical'
    );
    expect(criticalViolations).toEqual([]);
  });

});