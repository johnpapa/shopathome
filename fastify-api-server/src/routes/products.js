const data = require('../shared/product-data');

async function routes(fastify, options) {
  // Get all products
  fastify.get('/products', async (request, reply) => {
    const products = data.getProducts();
    return products;
  });

  // Get a single product
  fastify.get('/products/:id', async (request, reply) => {
    const product = data.getProduct(request.params.id);
    return product;
  });

  // Add a new product
  fastify.post('/products', async (request, reply) => {
    const product = {
      id: undefined,
      name: request.body.name,
      description: request.body.description,
      quantity: parseInt(request.body.quantity, 10),
    };

    const newProduct = data.addProduct(product);
    return newProduct;
  });

  // Update an existing product
  fastify.put('/products/:id', async (request, reply) => {
    const product = {
      id: parseInt(request.params.id, 10),
      name: request.body.name,
      description: request.body.description,
      quantity: parseInt(request.body.quantity, 10),
    };
    const updatedProduct = data.updateProduct(product);
    return updatedProduct;
  });

  // Delete a product
  fastify.delete('/products/:id', async (request, reply) => {
    const id = parseInt(request.params.id, 10);

    const deletedProduct = data.deleteProduct(id);
    return deletedProduct;
  });
}

module.exports = routes;
