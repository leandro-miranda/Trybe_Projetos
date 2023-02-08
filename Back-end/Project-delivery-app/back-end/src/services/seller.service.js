const { User } = require('../database/models');

const getSellers = async () => {
  const users = await User.findAll({ where: { role: 'seller' } });
  
  return users;
};

module.exports = {
  getSellers,
};