const data = require('../shared/product-data');

module.exports = async function (context, req) {
  const id = parseInt(req.params.id, 10);

  try {
    data.deleteProduct(id);
    context.res.status(200).json({});
  } catch (error) {
    context.res.status(500).send(error);
  }
};
