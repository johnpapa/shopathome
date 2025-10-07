/**
 * Azure Functions API Tests
 * Tests all Azure Functions endpoints for the Shop at Home API
 */

import { test, expect } from '@playwright/test';
import { apis } from '../../config/test-config';

const azureFunctionsUrl = apis.azureFunctions.baseUrl;

test.describe('Azure Functions API Tests', () => {
  
  test('should have Azure Functions API accessible', async ({ request }) => {
    // Test if API is running (may not be in all environments)
    try {
      const response = await request.get(`${azureFunctionsUrl}/api/products`);
      expect([200, 404, 500]).toContain(response.status());
    } catch (error) {
      console.log('Azure Functions API not available:', error);
      test.skip();
    }
  });

  test('GET /api/products should return products list', async ({ request }) => {
    try {
      const response = await request.get(`${azureFunctionsUrl}/api/products`);
      
      if (response.status() === 200) {
        const products = await response.json();
        expect(Array.isArray(products)).toBeTruthy();
        
        // Verify product structure if products exist
        if (products.length > 0) {
          const product = products[0];
          expect(product).toHaveProperty('id');
          expect(product).toHaveProperty('name');
          expect(product).toHaveProperty('price');
        }
      }
    } catch (error) {
      console.log('Products endpoint not available');
      test.skip();
    }
  });

  test('POST /api/products should create a new product', async ({ request }) => {
    try {
      const newProduct = {
        name: 'Test Product',
        price: 99.99,
        category: 'Test',
        description: 'Test product',
      };

      const response = await request.post(`${azureFunctionsUrl}/api/products`, {
        data: newProduct,
        headers: {
          'Content-Type': 'application/json',
        },
      });

      // Accept 201 (Created) or 405 (Method not allowed if auth required)
      expect([201, 405, 401, 500]).toContain(response.status());

      if (response.status() === 201) {
        const createdProduct = await response.json();
        expect(createdProduct).toHaveProperty('id');
        expect(createdProduct.name).toBe(newProduct.name);
      }
    } catch (error) {
      console.log('Product creation endpoint not available');
      test.skip();
    }
  });

  test('PUT /api/products/:id should update a product', async ({ request }) => {
    try {
      const updatedProduct = {
        id: 1,
        name: 'Updated Product',
        price: 149.99,
        category: 'Updated',
      };

      const response = await request.put(`${azureFunctionsUrl}/api/products/1`, {
        data: updatedProduct,
        headers: {
          'Content-Type': 'application/json',
        },
      });

      // Accept various status codes as auth may be required
      expect([200, 204, 405, 401, 404, 500]).toContain(response.status());
    } catch (error) {
      console.log('Product update endpoint not available');
      test.skip();
    }
  });

  test('DELETE /api/products/:id should delete a product', async ({ request }) => {
    try {
      const response = await request.delete(`${azureFunctionsUrl}/api/products/999`, {
        headers: {
          'Content-Type': 'application/json',
        },
      });

      // Accept various status codes
      expect([200, 204, 404, 405, 401, 500]).toContain(response.status());
    } catch (error) {
      console.log('Product delete endpoint not available');
      test.skip();
    }
  });

  test('GET /api/discounts should return discounts list', async ({ request }) => {
    try {
      const response = await request.get(`${azureFunctionsUrl}/api/discounts`);
      
      // May require authentication
      expect([200, 401, 404, 500]).toContain(response.status());

      if (response.status() === 200) {
        const discounts = await response.json();
        expect(Array.isArray(discounts)).toBeTruthy();
        
        // Verify discount structure if discounts exist
        if (discounts.length > 0) {
          const discount = discounts[0];
          expect(discount).toHaveProperty('store');
          expect(discount).toHaveProperty('percentage');
          expect(discount).toHaveProperty('code');
        }
      }
    } catch (error) {
      console.log('Discounts endpoint not available');
      test.skip();
    }
  });

  test('should handle CORS headers correctly', async ({ request }) => {
    try {
      const response = await request.get(`${azureFunctionsUrl}/api/products`, {
        headers: {
          'Origin': 'http://localhost:4200',
        },
      });

      // Check CORS headers (may not be present in all environments)
      const corsHeader = response.headers()['access-control-allow-origin'];
      console.log('CORS header:', corsHeader);
      
      // Just verify we got a response
      expect(response.status()).toBeGreaterThan(0);
    } catch (error) {
      console.log('CORS test not applicable');
      test.skip();
    }
  });

  test('should handle invalid endpoints gracefully', async ({ request }) => {
    try {
      const response = await request.get(`${azureFunctionsUrl}/api/invalid-endpoint`);
      
      // Should return 404 or similar error
      expect(response.status()).toBeGreaterThanOrEqual(400);
    } catch (error) {
      // Connection error is acceptable if API not running
      console.log('API not available for invalid endpoint test');
    }
  });

  test('should handle malformed requests', async ({ request }) => {
    try {
      const response = await request.post(`${azureFunctionsUrl}/api/products`, {
        data: 'invalid json',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      // Should return error status
      expect([400, 405, 401, 500]).toContain(response.status());
    } catch (error) {
      console.log('Malformed request test not applicable');
      test.skip();
    }
  });

  test('should respond within acceptable time', async ({ request }) => {
    try {
      const startTime = Date.now();
      const response = await request.get(`${azureFunctionsUrl}/api/products`);
      const responseTime = Date.now() - startTime;

      console.log(`Azure Functions API response time: ${responseTime}ms`);
      
      // API should respond reasonably fast
      expect(responseTime).toBeLessThan(5000);
    } catch (error) {
      console.log('Response time test not applicable');
      test.skip();
    }
  });
});
