const saleService = require('../services/sale.service');
const { response } = require('../middlewares/dry');

const createSale = async (req, res) => {
  const { message } = await saleService.createSale(req.body);

  res.status(201).json({ saleId: message });
};

const getSales = async (_req, res) => {
  const { message } = await saleService.getSales();

  res.status(200).json(message);
};

const getById = async (req, res) => {
  const sale = await saleService.getById(req.params.id);
  response(res, sale);
};

const updateSaleStatus = async (req, res) => {
  await saleService.updateSaleStatus(req.params.id, req.body.status);
  res.status(200).json({ message: 'Updated' });
};

module.exports = {
  createSale,
  getSales,
  getById,
  updateSaleStatus,
};
