const validationLogin = (req, res, next) => {
  const { email, password } = req.body;

  if (!email) return res.status(400).json({ message: 'O campo "email" é obrigatório' });

  if (!password) return res.status(400).json({ message: 'O campo "password" é obrigatório' });

  const regexEmail = /\S+@\S+\.\S+/;
  const emailValidation = regexEmail.test(email);
  if (!emailValidation) {
    return res.status(400).json({ message: 'O "email" deve ter o formato "email@email.com"' });
  }

  const passwordMinCaracteres = 6;
  if (password.length < passwordMinCaracteres) {
    return res.status(400).json({ message: 'O "password" deve ter pelo menos 6 caracteres' });
  }

  next();
};

module.exports = validationLogin;
