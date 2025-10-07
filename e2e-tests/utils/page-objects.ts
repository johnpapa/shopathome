/**
 * Page Object Models for E2E tests
 * Provides reusable methods for interacting with pages
 */

import { Page, Locator, expect } from '@playwright/test';
import { Product } from '../fixtures/test-data';
import { waitForPageLoad } from './test-helpers';

/**
 * Base Page Object with common functionality
 */
export class BasePage {
  constructor(protected page: Page) {}

  async navigate(path: string) {
    await this.page.goto(path);
    await waitForPageLoad(this.page);
  }

  async clickButton(selector: string) {
    await this.page.click(selector);
  }

  async fillInput(selector: string, value: string) {
    await this.page.fill(selector, value);
  }

  async getText(selector: string): Promise<string> {
    return await this.page.locator(selector).textContent() || '';
  }
}

/**
 * Home Page Object
 */
export class HomePage extends BasePage {
  readonly myListButton: Locator;
  readonly myDiscountsButton: Locator;
  readonly githubButton: Locator;

  constructor(page: Page) {
    super(page);
    this.myListButton = page.locator('text=My List');
    this.myDiscountsButton = page.locator('text=My Discounts');
    this.githubButton = page.locator('text=Code in GitHub');
  }

  async navigateToProducts() {
    await this.myListButton.click();
    await waitForPageLoad(this.page);
  }

  async navigateToDiscounts() {
    await this.myDiscountsButton.click();
    await waitForPageLoad(this.page);
  }

  async verifyPageLoaded() {
    await expect(this.page.locator('h2.title')).toContainText('Shop at Home');
  }
}

/**
 * Products Page Object
 */
export class ProductsPage extends BasePage {
  readonly productList: Locator;
  readonly addProductButton: Locator;
  readonly refreshButton: Locator;

  constructor(page: Page) {
    super(page);
    this.productList = page.locator('[data-testid="product-list"], .list');
    this.addProductButton = page.locator('[data-testid="add-product-btn"], .add-button');
    this.refreshButton = page.locator('[data-testid="refresh-btn"], .refresh-button');
  }

  async navigateToProducts() {
    await this.navigate('/products');
  }

  async getProductItems() {
    return await this.page.locator('[data-testid="product-item"], .card').all();
  }

  async getProductCount(): Promise<number> {
    const items = await this.getProductItems();
    return items.length;
  }

  async clickAddProduct() {
    await this.addProductButton.click();
    await this.page.waitForTimeout(500);
  }

  async clickRefresh() {
    await this.refreshButton.click();
    await waitForPageLoad(this.page);
  }

  async fillProductForm(product: Partial<Product>) {
    if (product.name) {
      await this.page.fill('[data-testid="product-name-input"], input[placeholder*="name"], input[name="name"]', product.name);
    }
    if (product.price !== undefined) {
      await this.page.fill('[data-testid="product-price-input"], input[placeholder*="price"], input[name="price"]', product.price.toString());
    }
    if (product.category) {
      await this.page.fill('[data-testid="product-category-input"], input[placeholder*="category"], input[name="category"]', product.category);
    }
    if (product.description) {
      await this.page.fill('[data-testid="product-description-input"], textarea[placeholder*="description"], textarea[name="description"]', product.description);
    }
  }

  async saveProduct() {
    await this.page.click('[data-testid="save-product-btn"], button:has-text("Save")');
    await waitForPageLoad(this.page);
  }

  async deleteProduct(productName: string) {
    const productCard = this.page.locator('.card').filter({ hasText: productName });
    await productCard.locator('[data-testid="delete-product-btn"], button:has-text("Delete"), .delete-button').click();
    // Confirm deletion if modal appears
    const confirmButton = this.page.locator('button:has-text("OK"), button:has-text("Confirm"), button:has-text("Yes")');
    if (await confirmButton.isVisible({ timeout: 2000 }).catch(() => false)) {
      await confirmButton.click();
    }
    await waitForPageLoad(this.page);
  }

  async editProduct(productName: string) {
    const productCard = this.page.locator('.card').filter({ hasText: productName });
    await productCard.locator('[data-testid="edit-product-btn"], button:has-text("Edit"), .edit-button').click();
    await this.page.waitForTimeout(500);
  }

  async verifyProductExists(productName: string): Promise<boolean> {
    try {
      await this.page.locator('.card').filter({ hasText: productName }).waitFor({ timeout: 5000 });
      return true;
    } catch {
      return false;
    }
  }

  async verifyProductNotExists(productName: string): Promise<boolean> {
    const exists = await this.verifyProductExists(productName);
    return !exists;
  }
}

/**
 * Discounts Page Object
 */
export class DiscountsPage extends BasePage {
  readonly discountList: Locator;
  readonly refreshButton: Locator;

  constructor(page: Page) {
    super(page);
    this.discountList = page.locator('[data-testid="discount-list"], .list');
    this.refreshButton = page.locator('[data-testid="refresh-btn"], .refresh-button');
  }

  async navigateToDiscounts() {
    await this.navigate('/discounts');
  }

  async getDiscountItems() {
    return await this.page.locator('[data-testid="discount-item"], .card').all();
  }

  async getDiscountCount(): Promise<number> {
    const items = await this.getDiscountItems();
    return items.length;
  }

  async verifyDiscountExists(code: string): Promise<boolean> {
    try {
      await this.page.locator('.card').filter({ hasText: code }).waitFor({ timeout: 5000 });
      return true;
    } catch {
      return false;
    }
  }

  async clickRefresh() {
    await this.refreshButton.click();
    await waitForPageLoad(this.page);
  }

  async getDiscountDetails(code: string) {
    const discountCard = this.page.locator('.card').filter({ hasText: code });
    const text = await discountCard.textContent();
    return text;
  }
}

/**
 * API Helper for direct API testing
 */
export class ApiHelper {
  constructor(private baseUrl: string) {}

  async getProducts() {
    const response = await fetch(`${this.baseUrl}/api/products`);
    return response;
  }

  async createProduct(product: Product) {
    const response = await fetch(`${this.baseUrl}/api/products`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(product),
    });
    return response;
  }

  async updateProduct(id: number, product: Partial<Product>) {
    const response = await fetch(`${this.baseUrl}/api/products/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(product),
    });
    return response;
  }

  async deleteProduct(id: number) {
    const response = await fetch(`${this.baseUrl}/api/products/${id}`, {
      method: 'DELETE',
    });
    return response;
  }

  async getDiscounts() {
    const response = await fetch(`${this.baseUrl}/api/discounts`);
    return response;
  }
}
