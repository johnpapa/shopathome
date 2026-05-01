import { test as base } from '@playwright/test';
import { HomePage } from '../pages/HomePage';

type TestFixtures = {
  homePage: HomePage;
};

export const test = base.extend<TestFixtures>({
  homePage: async ({ page }, use) => {
    const homePage = new HomePage(page);
    await homePage.navigate('/');
    await use(homePage);
  },
});

export { expect } from '@playwright/test';
