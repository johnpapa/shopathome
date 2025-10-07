/**
 * Test data fixtures for E2E tests
 * Provides consistent test data across all test suites
 */

export interface Product {
  id?: number;
  name: string;
  price: number;
  category: string;
  description?: string;
}

export interface Discount {
  id?: number;
  store: string;
  percentage: number;
  code: string;
  description?: string;
}

export const testProducts: Product[] = [
  {
    id: 1,
    name: 'Test Laptop',
    price: 999.99,
    category: 'Electronics',
    description: 'High-performance laptop for testing',
  },
  {
    id: 2,
    name: 'Test Book',
    price: 29.99,
    category: 'Education',
    description: 'Educational book for testing',
  },
  {
    id: 3,
    name: 'Test Coffee Maker',
    price: 79.99,
    category: 'Home',
    description: 'Coffee maker for testing',
  },
];

export const testDiscounts: Discount[] = [
  {
    id: 1,
    store: 'Test Store',
    percentage: 10,
    code: 'TEST10',
    description: 'Test 10% off',
  },
  {
    id: 2,
    store: 'Test Market',
    percentage: 20,
    code: 'SAVE20',
    description: 'Test 20% off',
  },
  {
    id: 3,
    store: 'Test Shop',
    percentage: 15,
    code: 'DISCOUNT15',
    description: 'Test 15% off',
  },
];

export const newTestProduct: Product = {
  name: 'New Test Product',
  price: 49.99,
  category: 'Testing',
  description: 'Product created during test',
};

export const updatedTestProduct: Partial<Product> = {
  name: 'Updated Test Product',
  price: 59.99,
};

// Mobile viewport configurations
export const mobileViewports = {
  mobile: { width: 375, height: 667 }, // iPhone SE
  tablet: { width: 768, height: 1024 }, // iPad
  desktop: { width: 1920, height: 1080 }, // Desktop
};
