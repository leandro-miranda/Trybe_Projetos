const validationWatchedAt = (req, res, next) => {
  const { talk: { watchedAt } } = req.body;

  if (!watchedAt || watchedAt === '') {
    return res.status(400).json({ message: 'O campo "watchedAt" é obrigatório' });
  }

  const dataRegex = /^([0-2][0-9]|(3)[0-1])(\/)(((0)[0-9])|((1)[0-2]))(\/)\d{4}$/i; // https://stackoverflow.com/questions/62960834/regex-date-dd-mm-yyyy

  if (!dataRegex.test(watchedAt)) {
    return res.status(400).json({ message: 'O campo "watchedAt" deve ter o formato "dd/mm/aaaa"' });
  }

  next();
};

module.exports = validationWatchedAt;