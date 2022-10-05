const express = require('express');
const validationToken = require('../middlewares/validationToken');

const router = express.Router();

router.post('/', (req, res) => {
  const token = validationToken();
  res.status(200).json({ token });
});

module.exports = router;