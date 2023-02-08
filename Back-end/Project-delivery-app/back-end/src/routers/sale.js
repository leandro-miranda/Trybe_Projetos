const express = require('express');

const router = express.Router();

const sale = require('../controllers/sale.controller');
const auth = require('../middlewares/auth');

router.get('/sales', sale.getSales);
router.get('/sales/:id', sale.getById);
router.post('/sales', auth, sale.createSale);
router.put('/sales/:id', sale.updateSaleStatus);

module.exports = router;