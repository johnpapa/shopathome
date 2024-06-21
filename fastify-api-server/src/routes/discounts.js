const data = require('../shared/discount-data');

async function routes(fastify, options) {
  // add route to get all discounts using the data module
  fastify.get('/discounts', async (request, reply) => {
    const discounts = data.getDiscounts();
    return discounts;
  });
}

module.exports = routes;
