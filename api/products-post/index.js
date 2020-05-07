const data = require('../shared/product-data');

module.exports = async function (context, req) {
  const product = {
    id: undefined,
    name: req.body.name,
    description: req.body.description,
  };

  try {
    const newProduct = data.addProduct(product);
    context.res.status(201).json(newProduct);
  } catch (error) {
    context.res.status(500).send(error);
  }
};
