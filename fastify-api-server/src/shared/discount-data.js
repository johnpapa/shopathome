const data = {
  discounts: [
    {
      id: 10,
      store: 'Contoso Market',
      percentage: 30,
      code: 'contoso30',
    },
    {
      id: 20,
      store: 'Tailwind Trader',
      percentage: 20,
      code: 'tailwind20',
    },
    {
      id: 30,
      store: 'Northwind-Mart',
      percentage: 10,
      code: 'northwind10',
    },
  ],
};

const getDiscounts = () => {
  return data.discounts;
};

module.exports = { getDiscounts };
