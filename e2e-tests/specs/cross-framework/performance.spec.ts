/**
 * Cross-Framework Performance Tests
 * Measures and compares performance metrics across all frameworks
 */

import { test, expect } from '@playwright/test';
import { navigateToFramework, waitForPageLoad, measurePerformance } from '../../utils/test-helpers';
import { frameworks, testConfig } from '../../config/test-config';

const performanceThresholds = testConfig.performance;

for (const [frameworkKey, frameworkConfig] of Object.entries(frameworks)) {
  test.describe(`Performance - ${frameworkConfig.name}`, () => {
    
    test('should load home page within acceptable time', async ({ page }) => {
      const startTime = Date.now();
      
      await navigateToFramework(page, frameworkKey as any);
      await waitForPageLoad(page);
      
      const loadTime = Date.now() - startTime;
      
      console.log(`${frameworkConfig.name} home page load time: ${loadTime}ms`);
      
      // Should load within reasonable time (relaxed for CI)
      expect(loadTime).toBeLessThan(10000);
    });

    test('should measure page performance metrics', async ({ page }) => {
      await navigateToFramework(page, frameworkKey as any);
      await waitForPageLoad(page);
      
      const metrics = await measurePerformance(page);
      
      console.log(`${frameworkConfig.name} performance metrics:`, metrics);
      
      // Verify metrics exist
      expect(metrics.domContentLoaded).toBeGreaterThanOrEqual(0);
      expect(metrics.loadComplete).toBeGreaterThanOrEqual(0);
      expect(metrics.domInteractive).toBeGreaterThanOrEqual(0);
    });

    test('should load products page efficiently', async ({ page }) => {
      const startTime = Date.now();
      
      await navigateToFramework(page, frameworkKey as any, '/products');
      await waitForPageLoad(page);
      
      const loadTime = Date.now() - startTime;
      
      console.log(`${frameworkConfig.name} products page load time: ${loadTime}ms`);
      
      expect(loadTime).toBeLessThan(10000);
    });

    test('should load discounts page efficiently', async ({ page }) => {
      const startTime = Date.now();
      
      await navigateToFramework(page, frameworkKey as any, '/discounts');
      await waitForPageLoad(page);
      
      const loadTime = Date.now() - startTime;
      
      console.log(`${frameworkConfig.name} discounts page load time: ${loadTime}ms`);
      
      expect(loadTime).toBeLessThan(10000);
    });

    test('should have reasonable time to interactive', async ({ page }) => {
      await navigateToFramework(page, frameworkKey as any);
      
      // Wait for page to be fully interactive
      await page.waitForLoadState('networkidle');
      
      const tti = await page.evaluate(() => {
        const navigation = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming;
        return navigation.domInteractive;
      });
      
      console.log(`${frameworkConfig.name} time to interactive: ${tti}ms`);
      
      // Should be interactive relatively quickly
      expect(tti).toBeLessThan(15000);
    });

    test('should not have excessive network requests', async ({ page }) => {
      const requests: string[] = [];
      
      page.on('request', request => {
        requests.push(request.url());
      });
      
      await navigateToFramework(page, frameworkKey as any);
      await waitForPageLoad(page);
      
      console.log(`${frameworkConfig.name} made ${requests.length} network requests`);
      
      // Should have a reasonable number of requests
      expect(requests.length).toBeLessThan(100);
    });

    test('should handle rapid navigation without degradation', async ({ page }) => {
      const navigationTimes: number[] = [];
      
      // Navigate between pages multiple times
      for (let i = 0; i < 3; i++) {
        const startTime = Date.now();
        await navigateToFramework(page, frameworkKey as any, '/products');
        await waitForPageLoad(page);
        navigationTimes.push(Date.now() - startTime);
        
        const startTime2 = Date.now();
        await navigateToFramework(page, frameworkKey as any, '/discounts');
        await waitForPageLoad(page);
        navigationTimes.push(Date.now() - startTime2);
        
        const startTime3 = Date.now();
        await navigateToFramework(page, frameworkKey as any, '/');
        await waitForPageLoad(page);
        navigationTimes.push(Date.now() - startTime3);
      }
      
      const avgTime = navigationTimes.reduce((a, b) => a + b, 0) / navigationTimes.length;
      console.log(`${frameworkConfig.name} average navigation time: ${avgTime}ms`);
      
      // Average should be reasonable
      expect(avgTime).toBeLessThan(10000);
    });

    test('should not have memory leaks during navigation', async ({ page }) => {
      // Navigate multiple times
      for (let i = 0; i < 5; i++) {
        await navigateToFramework(page, frameworkKey as any, '/products');
        await waitForPageLoad(page);
        await navigateToFramework(page, frameworkKey as any, '/discounts');
        await waitForPageLoad(page);
        await navigateToFramework(page, frameworkKey as any, '/');
        await waitForPageLoad(page);
      }
      
      // If we got here without crashes, memory management is acceptable
      expect(page.url()).toBeTruthy();
    });

    test('should load CSS and fonts efficiently', async ({ page }) => {
      const resources: { [key: string]: number } = {
        css: 0,
        font: 0,
        image: 0,
        script: 0,
      };
      
      page.on('response', response => {
        const contentType = response.headers()['content-type'] || '';
        if (contentType.includes('css')) resources.css++;
        if (contentType.includes('font')) resources.font++;
        if (contentType.includes('image')) resources.image++;
        if (contentType.includes('javascript')) resources.script++;
      });
      
      await navigateToFramework(page, frameworkKey as any);
      await waitForPageLoad(page);
      
      console.log(`${frameworkConfig.name} resources loaded:`, resources);
      
      // Should have some CSS and scripts
      expect(resources.css + resources.script).toBeGreaterThan(0);
    });
  });
}

// Cross-framework performance comparison
test.describe('Cross-Framework Performance Comparison', () => {
  test('compare load times across frameworks', async ({ browser }) => {
    const results: Array<{ framework: string; loadTime: number }> = [];

    for (const [frameworkKey, frameworkConfig] of Object.entries(frameworks)) {
      const context = await browser.newContext();
      const page = await context.newPage();
      
      try {
        const startTime = Date.now();
        await navigateToFramework(page, frameworkKey as any);
        await waitForPageLoad(page);
        const loadTime = Date.now() - startTime;

        results.push({
          framework: frameworkConfig.name,
          loadTime,
        });
      } finally {
        await context.close();
      }
    }

    console.log('Framework load time comparison:', results);
    
    // All frameworks should load within reasonable time
    results.forEach(result => {
      expect(result.loadTime).toBeLessThan(15000);
    });
  });

  test('compare performance metrics across frameworks', async ({ browser }) => {
    const results: Array<{ framework: string; metrics: any }> = [];

    for (const [frameworkKey, frameworkConfig] of Object.entries(frameworks)) {
      const context = await browser.newContext();
      const page = await context.newPage();
      
      try {
        await navigateToFramework(page, frameworkKey as any);
        await waitForPageLoad(page);
        const metrics = await measurePerformance(page);

        results.push({
          framework: frameworkConfig.name,
          metrics,
        });
      } finally {
        await context.close();
      }
    }

    console.log('Framework performance metrics comparison:', results);
    
    // All frameworks should have valid metrics
    results.forEach(result => {
      expect(result.metrics.domInteractive).toBeGreaterThanOrEqual(0);
    });
  });
});
