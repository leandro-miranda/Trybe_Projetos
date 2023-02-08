const express = require('express');
const loginController = require('../controllers/login.controller');
const loginMiddleware = require('../middlewares/login');

const router = express.Router();

router.post('/login', loginMiddleware, loginController);

module.exports = router;