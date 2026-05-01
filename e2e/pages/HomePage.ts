import { Page } from '@playwright/test';
import { BasePage } from './BasePage';

export class HomePage extends BasePage {
  constructor(page: Page) {
    super(page);
  }

  async goToMyList() {
    await this.page.getByRole('link', { name: /my list/i }).first().click();
  }

  async goToMyDiscounts() {
    await this.page.getByRole('link', { name: /my discounts/i }).first().click();
  }
}
