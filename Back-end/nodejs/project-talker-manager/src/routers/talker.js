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

router.get('/search', validationAuthorization, async (req, res) => {
  const { q } = req.query;
  const result = await readFiles();
  const filterPerson = result.filter((person) => person.name.includes(q));

  if (!q) {
    return res.status(404).json({ message: 'Pessoa palestrante não encontrada' });
  }
  res.status(200).json(filterPerson);
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

router.put('/:id', 
  validationAuthorization, 
  validationName, 
  validationAge, 
  validationTalk, 
  validationWatchedAt, 
  validationRate, async (req, res) => {
    const { id } = req.params;
    const result = await readFiles();
    const person = result.findIndex((i) => i.id === +(id));
      result[person] = { ...result[person], ...req.body };
      writeFiles(result);
    return res.status(200).json(result[person]);
});

router.delete('/:id', validationAuthorization, async (req, res) => {
  const { id } = req.params;
  const result = await readFiles();
  const deletePerson = result.find((person) => person.id !== +(id));
    writeFiles(deletePerson);
  return res.status(204).json(deletePerson);
});

module.exports = router;