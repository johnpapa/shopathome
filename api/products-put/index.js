const data = require('../shared/product-data');

module.exports = async function (context, req) {
  const product = {
    id: parseInt(req.params.id, 10),
    name: req.body.name,
    description: req.body.description,
    quantity: req.body.quantity,
  };

  try {
    const updatedProduct = data.updateProduct(product);
    context.res.status(200).json(updatedProduct);
  } catch (error) {
    context.res.status(500).send(error);
  }
};
