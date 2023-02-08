const md5 = require('md5');
const { User } = require('../database/models');
const { generateToken } = require('../utils/token');

const create = async (body) => {
  const user = await User.findOne({ where: { email: body.email } });
  if (user) return { message: { error: { code: 409, message: 'User already registered' } } };
  const registered = await User.create({ ...body, password: md5(body.password), role: 'customer' });

  const token = generateToken(registered.id, registered.role);

  return {
    message: {
      token,
      name: registered.name,
      email: registered.email,
      role: registered.role,
    },
  };
};

module.exports = { create };
