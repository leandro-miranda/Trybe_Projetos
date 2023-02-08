const { Sale, SaleProduct } = require('../database/models');
const { toController } = require('../middlewares/dry');

const createSale = async (newSale) => {
  const sale = await Sale.create({ ...newSale.sale, status: 'Pendente' });

  const products = newSale.products.map((product) => ({ saleId: sale.id, ...product }));

  await SaleProduct.bulkCreate(products);

  return { message: sale.id };
};

const getSales = async () => {
  const sales = await Sale.findAll();

  return { message: sales };
};

const getById = async (id) => {
  const sale = await Sale.findOne({
    where: { id },
    include: {
      all: true,
      attributes: {
        exclude: ['id', 'password'],
      },
    },
  });
  return toController(sale, 'Sale');
};

const updateSaleStatus = async (id, status) => {
  await Sale.update({ status }, { where: { id } });
};

module.exports = {
  createSale,
  getSales,
  getById,
  updateSaleStatus,
};