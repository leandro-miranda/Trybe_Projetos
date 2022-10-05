const express = require('express');
const readFiles = require('../utils/readFiles');

const router = express.Router();

router.get('/', async (req, res) => {
  const result = await readFiles();
  if (result.length > 0) {
    res.status(200).json(result);
  } else {
    res.status(200).json([]);
  }
});

module.exports = router;