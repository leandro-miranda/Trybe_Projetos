const express = require('express');
const validationAge = require('../middlewares/validationAge');
const validationAuthorization = require('../middlewares/validationAuthorization');
const validationName = require('../middlewares/validationName');
const validationRate = require('../middlewares/validationRate');
const validationTalk = require('../middlewares/validationTalk');
const validationWatchedAt = require('../middlewares/validationWatchedAt');
const readFiles = require('../utils/readFiles');
const writeFiles = require('../utils/writeFiles');

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

router.post('/', 
  validationAuthorization, 
  validationName, 
  validationAge, 
  validationTalk, 
  validationWatchedAt, 
  validationRate, async (req, res) => {
  const result = await readFiles();
    result.push({ id: result.length + 1, ...req.body });
    writeFiles(result);
  return res.status(201).json({ id: result.length, ...req.body });
});

module.exports = router;