const validationRate = (req, res, next) => {
  const { talk: { rate } } = req.body;

  if (rate < 1 || rate > 5) {
    return res.status(400).json({ message: 'O campo "rate" deve ser um inteiro de 1 à 5' });
  }
  
  if (!rate || rate === '') {
    return res.status(400).json({ message: 'O campo "rate" é obrigatório' });
  }

  next();
};

module.exports = validationRate;