const data = require('../shared/discount-data');

module.exports = async function (context, req) {
    try {
        const discounts = data.getDiscounts();
        context.res.status(200).json(discounts);
    } catch (error) {
        context.res.status(500).send(error);
    }
};
