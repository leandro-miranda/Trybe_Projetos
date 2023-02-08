const express = require('express');

const router = express.Router();

const register = require('../controllers/register.controller');

router.post('/register', register.create);

module.exports = router;