# E2E Testing Suite Documentation

## Overview

This directory contains comprehensive end-to-end (E2E) tests for the Shop at Home multi-framework monorepo using Playwright. The test suite validates functionality across all four frontend frameworks (Angular, React, Vue, Svelte) and their API integrations (Azure Functions and Fastify).

## Directory Structure

```
e2e-tests/
├── specs/
│   ├── cross-framework/          # Tests that run across all frameworks
│   │   ├── product-management.spec.ts
│   │   ├── discount-functionality.spec.ts
│   │   ├── mobile-responsiveness.spec.ts
│   │   └── performance.spec.ts
│   ├── framework-specific/       # Framework-specific feature tests
│   │   ├── angular.spec.ts
│   │   ├── react.spec.ts
│   │   ├── vue.spec.ts
│   │   └── svelte.spec.ts
│   ├── api/                      # API endpoint tests
│   │   ├── azure-functions.spec.ts
│   │   └── fastify-api.spec.ts
│   └── integration/              # End-to-end flow tests
│       └── end-to-end-flows.spec.ts
├── fixtures/                     # Test data and mocks
│   ├── test-data.ts
│   └── mock-responses.ts
├── utils/                        # Helper utilities
│   ├── test-helpers.ts
│   └── page-objects.ts
├── config/                       # Test configuration
│   └── test-config.ts
└── README.md                     # This file
```

## Prerequisites

Before running tests, ensure you have:

1. **Node.js** version 20.0.0 or higher
2. **All dependencies installed** in each app directory:
   ```bash
   cd angular-app && npm install
   cd ../react-app && npm install
   cd ../vue-app && npm install
   cd ../svelte-app && npm install
   cd ../fastify-api-server && npm install
   cd ../api && npm install
   ```
3. **Playwright browsers installed**:
   ```bash
   npm run test:setup
   ```

## Installation

1. Install root dependencies:
   ```bash
   npm install
   ```

2. Install Playwright browsers:
   ```bash
   npm run test:setup
   ```

3. (Optional) Install system dependencies for Playwright:
   ```bash
   npm run test:setup:deps
   ```

## Running Tests

### Run All Tests
```bash
npm run test:e2e
```

### Run Tests in Headed Mode (Watch Browser)
```bash
npm run test:e2e:headed
```

### Run Tests in Debug Mode
```bash
npm run test:e2e:debug
```

### View Test Report
```bash
npm run test:e2e:report
```

### Run Specific Test File
```bash
npx playwright test e2e-tests/specs/cross-framework/product-management.spec.ts
```

### Run Tests for Specific Browser
```bash
npx playwright test --project=chromium
npx playwright test --project=firefox
npx playwright test --project=webkit
npx playwright test --project=mobile-chrome
```

### Run Tests with UI Mode (Interactive)
```bash
npx playwright test --ui
```

## Test Categories

### Cross-Framework Tests
Tests that validate consistent behavior across all four frameworks:

- **Product Management**: CRUD operations, listing, form validation
- **Discount Functionality**: Display, refresh, error handling
- **Mobile Responsiveness**: Various viewports (375px, 768px, 1920px)
- **Performance**: Load times, metrics, optimization

### Framework-Specific Tests
Tests that validate framework-specific features:

- **Angular**: Routing, lazy loading, services, Zone.js
- **React**: Hooks, state management, React Router
- **Vue**: Vue Router, Composition API, Vuex/stores
- **Svelte**: Stores, reactivity, Svelte routing

### API Tests
Tests that validate API endpoints:

- **Azure Functions**: All CRUD endpoints, error handling, CORS
- **Fastify API**: All CRUD endpoints, error handling, CORS

### Integration Tests
Tests that validate complete user journeys:

- Full navigation flows
- Browser navigation (back/forward)
- Direct URL navigation
- State persistence
- Error handling

## Configuration

### Playwright Configuration
Main configuration is in `playwright.config.ts` at the root level.

Key settings:
- **Test directory**: `./e2e-tests`
- **Parallel execution**: Enabled
- **Retries**: 2 in CI, 0 locally
- **Browsers**: Chrome, Firefox, Safari, Mobile Chrome, Mobile Safari
- **Screenshots**: On failure only
- **Video**: Retained on failure

### Test Configuration
Additional test settings in `e2e-tests/config/test-config.ts`:

- Framework URLs and timeouts
- API URLs and timeouts
- Performance thresholds
- Viewport configurations

## Writing New Tests

### Basic Test Structure
```typescript
import { test, expect } from '@playwright/test';
import { navigateToFramework, waitForPageLoad } from '../../utils/test-helpers';

test.describe('My Test Suite', () => {
  test.beforeEach(async ({ page }) => {
    await navigateToFramework(page, 'angular');
  });

  test('should do something', async ({ page }) => {
    // Your test code here
    await expect(page.locator('h1')).toBeVisible();
  });
});
```

### Using Page Objects
```typescript
import { HomePage, ProductsPage } from '../../utils/page-objects';

test('should navigate to products', async ({ page }) => {
  const homePage = new HomePage(page);
  await homePage.navigateToProducts();
  expect(page.url()).toContain('/products');
});
```

### Using Test Helpers
```typescript
import { waitForPageLoad, measurePerformance } from '../../utils/test-helpers';

test('should measure performance', async ({ page }) => {
  await page.goto('http://localhost:4200');
  await waitForPageLoad(page);
  
  const metrics = await measurePerformance(page);
  console.log('Performance metrics:', metrics);
});
```

## Troubleshooting

### Tests Failing to Start

**Problem**: Tests fail with "connection refused" errors

**Solution**: Ensure all apps are running:
```bash
# In separate terminals or use concurrently
cd angular-app && npm start
cd react-app && npm start
cd vue-app && npm run serve
cd svelte-app && npm run dev
cd fastify-api-server && npm start
cd api && func start
```

### Timeout Errors

**Problem**: Tests timeout waiting for elements

**Solution**: 
- Increase timeout in test: `{ timeout: 60000 }`
- Check if app is actually running on expected port
- Verify network connectivity

### Browser Not Found

**Problem**: "Executable doesn't exist" error

**Solution**: Install Playwright browsers:
```bash
npm run test:setup
```

### Port Conflicts

**Problem**: Apps won't start due to port conflicts

**Solution**: Check and kill processes on ports:
```bash
# Check what's using a port
lsof -i :4200
lsof -i :3000

# Kill process
kill -9 <PID>
```

### Flaky Tests

**Problem**: Tests pass sometimes but fail other times

**Solution**:
- Add proper waits: `await page.waitForLoadState('networkidle')`
- Use `waitForPageLoad()` helper
- Increase retries in CI
- Use `test.describe.serial()` for dependent tests

## CI/CD Integration

### GitHub Actions Example
```yaml
name: E2E Tests

on: [push, pull_request]

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: '20'
      
      - name: Install dependencies
        run: |
          npm install
          npm run test:setup:deps
      
      - name: Install app dependencies
        run: |
          cd angular-app && npm ci
          cd ../react-app && npm ci
          cd ../vue-app && npm ci
          cd ../svelte-app && npm ci
          cd ../fastify-api-server && npm ci
      
      - name: Run E2E tests
        run: npm run test:e2e
      
      - name: Upload test results
        if: always()
        uses: actions/upload-artifact@v3
        with:
          name: playwright-report
          path: playwright-report/
```

## Best Practices

1. **Use Page Objects**: Encapsulate page interactions in reusable classes
2. **Use Test Helpers**: Common operations should be in helper functions
3. **Proper Waits**: Always wait for page load and network idle
4. **Meaningful Assertions**: Assert on visible behavior, not implementation details
5. **Clean Test Data**: Reset state between tests if needed
6. **Descriptive Names**: Test names should clearly describe what they test
7. **Independent Tests**: Tests should not depend on each other
8. **Screenshot on Failure**: Playwright does this automatically
9. **Console Error Checking**: Monitor console for errors during tests
10. **Performance Testing**: Track metrics over time

## Debugging Tests

### Debug Single Test
```bash
npx playwright test path/to/test.spec.ts --debug
```

### Open Playwright Inspector
```bash
PWDEBUG=1 npx playwright test
```

### View Trace
```bash
npx playwright show-trace trace.zip
```

### Use VS Code Extension
Install the Playwright Test for VSCode extension for debugging support.

## Performance Metrics

Tests track these metrics:
- **DOM Content Loaded**: Time until DOM is parsed
- **Load Complete**: Time until page fully loaded
- **Time to Interactive**: Time until page is interactive
- **Time to First Byte**: Server response time

Thresholds (configurable in `test-config.ts`):
- Page load: < 3000ms
- API response: < 1000ms
- Time to interactive: < 5000ms

## Support

For issues or questions:
1. Check this README
2. Review test output and error messages
3. Check Playwright documentation: https://playwright.dev
4. Open an issue: https://github.com/johnpapa/shopathome/issues

## Contributing

When adding new tests:
1. Follow existing patterns and structure
2. Add tests to appropriate directory
3. Update this README if adding new categories
4. Ensure tests pass locally before committing
5. Write clear test descriptions
6. Add comments for complex test logic

## License

This test suite is part of the Shop at Home project and follows the same license.
