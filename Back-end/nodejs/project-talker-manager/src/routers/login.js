const express = require('express');
const validationLogin = require('../middlewares/validationLogin');
const validationToken = require('../middlewares/validationToken');

const router = express.Router();

router.post('/', validationLogin, (req, res) => {
  const token = validationToken();
  res.status(200).json({ token });
});

module.exports = router;