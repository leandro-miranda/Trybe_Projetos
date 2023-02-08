require('dotenv').config();
const loginService = require('../services/login.service');

module.exports = async (req, res) => {
  const { email, password } = req.body;

  const { message, error, code } = await loginService.login({ email, password });

  if (error) return res.status(code).json({ message });

  res.status(200).json(message);
};
