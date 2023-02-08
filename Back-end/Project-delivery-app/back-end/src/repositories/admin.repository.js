const { Op } = require('sequelize');
const { User } = require('../database/models');

const getAdminUsers = async () => {
  const user = await User.findAll();

  return user;
};

const getAdminUser = async ({ name, email }) => {
  const users = await User.findOne({
    where: {
      [Op.or]: [{ name }, { email }],
    },
  });
  return users;
};

const postAdminUser = async ({ name, email, password, role }) => {
  const user = await User.create({ name, email, password, role });

  return user;
};

const deleteAdminUser = async (email) => { await User.destroy({ where: { email } }); };

module.exports = {
  getAdminUsers,
  getAdminUser,
  postAdminUser,
  deleteAdminUser,
};