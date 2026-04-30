const { app } = require('@azure/functions');
const data = require('../../shared/discount-data');

app.http('discounts-get', {
  methods: ['GET'],
  authLevel: 'anonymous',
  route: 'discounts',
  handler: async (request, context) => {
    try {
      const discounts = data.getDiscounts();
      return { status: 200, jsonBody: discounts };
    } catch (error) {
      return { status: 500, jsonBody: error };
    }
  },
});
