/**
 * Mock API responses for testing
 * Used for intercepting and mocking API calls
 */

import { testProducts, testDiscounts } from './test-data';

export const mockProductsResponse = {
  status: 200,
  contentType: 'application/json',
  body: JSON.stringify(testProducts),
};

export const mockDiscountsResponse = {
  status: 200,
  contentType: 'application/json',
  body: JSON.stringify(testDiscounts),
};

export const mockProductCreateResponse = (product: any) => ({
  status: 201,
  contentType: 'application/json',
  body: JSON.stringify({ ...product, id: Date.now() }),
});

export const mockProductUpdateResponse = (product: any) => ({
  status: 200,
  contentType: 'application/json',
  body: JSON.stringify(product),
});

export const mockProductDeleteResponse = {
  status: 204,
  contentType: 'application/json',
  body: '',
};

export const mockErrorResponses = {
  notFound: {
    status: 404,
    contentType: 'application/json',
    body: JSON.stringify({ error: 'Not Found' }),
  },
  serverError: {
    status: 500,
    contentType: 'application/json',
    body: JSON.stringify({ error: 'Internal Server Error' }),
  },
  unauthorized: {
    status: 401,
    contentType: 'application/json',
    body: JSON.stringify({ error: 'Unauthorized' }),
  },
  badRequest: {
    status: 400,
    contentType: 'application/json',
    body: JSON.stringify({ error: 'Bad Request' }),
  },
};
