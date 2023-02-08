const express = require('express');

const router = express.Router();

const { products } = require('../controllers/product.controller');

router.get('/products', products);

module.exports = router;