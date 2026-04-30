const { app } = require('@azure/functions');
const data = require('../../shared/product-data');

app.http('products-get', {
  methods: ['GET'],
  authLevel: 'anonymous',
  route: 'products',
  handler: async (request, context) => {
    try {
      const products = data.getProducts();
      return { status: 200, jsonBody: products };
    } catch (error) {
      return { status: 500, jsonBody: error };
    }
  },
});

app.http('products-post', {
  methods: ['POST'],
  authLevel: 'anonymous',
  route: 'products',
  handler: async (request, context) => {
    try {
      const body = await request.json();
      const product = {
        id: undefined,
        name: body.name,
        description: body.description,
        quantity: parseInt(body.quantity, 10),
      };
      const newProduct = data.addProduct(product);
      return { status: 201, jsonBody: newProduct };
    } catch (error) {
      return { status: 500, jsonBody: error };
    }
  },
});

app.http('products-put', {
  methods: ['PUT'],
  authLevel: 'anonymous',
  route: 'products/{id}',
  handler: async (request, context) => {
    try {
      const body = await request.json();
      const product = {
        id: parseInt(request.params.id, 10),
        name: body.name,
        description: body.description,
        quantity: parseInt(body.quantity, 10),
      };
      const updatedProduct = data.updateProduct(product);
      return { status: 200, jsonBody: updatedProduct };
    } catch (error) {
      return { status: 500, jsonBody: error };
    }
  },
});

app.http('products-delete', {
  methods: ['DELETE'],
  authLevel: 'anonymous',
  route: 'products/{id}',
  handler: async (request, context) => {
    try {
      const id = parseInt(request.params.id, 10);
      data.deleteProduct(id);
      return { status: 200, jsonBody: {} };
    } catch (error) {
      return { status: 500, jsonBody: error };
    }
  },
});
