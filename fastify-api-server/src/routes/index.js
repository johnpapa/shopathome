const discountsRoute = require('./discounts');
const productsRoute = require('./products');
async function routes(fastify, options) {
  fastify.get('/', async (request, reply) => {
    return { message: 'hello world' };
  });

  fastify.register(discountsRoute);
  fastify.register(productsRoute);
}

module.exports = routes;
