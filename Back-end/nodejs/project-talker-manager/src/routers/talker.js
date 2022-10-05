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

router.get('/:id', async (req, res) => {
  const { id } = req.params;
  const result = await readFiles();
  const person = result.findIndex((index) => index.id === +(id));
  
  if (person < 0) {
    res.status(404).json({ message: 'Pessoa palestrante não encontrada' });
  } else {
    res.status(200).json(result[person]);
  }
});

module.exports = router;