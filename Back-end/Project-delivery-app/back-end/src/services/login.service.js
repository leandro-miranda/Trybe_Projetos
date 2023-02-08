const md5 = require('md5');
const { User } = require('../database/models');
const { generateToken } = require('../utils/token');

const login = async (data) => {
  const user = await User.findOne({ where: { email: data.email } });
  
  if (!user) return { error: true, message: 'Not found', code: 404 };

  if (user.password !== md5(data.password)) {
    return {
      error: true,
      message: 'Uncorrect Password',
      code: 422,
    };
  }
  const token = generateToken(user.id, user.role);

  return { message: { token, name: user.name, email: user.email, role: user.role } };
};

module.exports = {
  login,
};