const express = require('express');

const router = express.Router();

const sellers = require('../controllers/seller.controller');

router.get('/sellers', sellers);

module.exports = router;