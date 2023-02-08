const express = require('express');
const login = require('./login');
const seller = require('./sellers');
const product = require('./products');
const register = require('./register');
const sale = require('./sale');
const admin = require('./admin');

const router = express.Router();

router.use('/', login);
router.use('/', register);
router.use('/customer', product);
router.use('/', seller);
router.use('/', sale);
router.use('/admin', admin);

module.exports = router;