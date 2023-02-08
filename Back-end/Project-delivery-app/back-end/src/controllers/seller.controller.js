const sellerService = require('../services/seller.service');

module.exports = async (_req, res) => {
  const sellers = await sellerService.getSellers();

  res.status(200).json(sellers);
};
