const md5 = require('md5');
const repositoryAdmin = require('../repositories/admin.repository');

const getAdminUsers = async () => {
  const users = await repositoryAdmin.getAdminUsers();
  return users;
};

const postAdminUser = async (body) => {
  const { name, email, password, role } = body;
  const passwordHashed = md5(password);

  const user = await repositoryAdmin.getAdminUser({ name, email });

  if (user) {
    return { code: 409, message: 'User already exists' };
  }

  await repositoryAdmin.postAdminUser(
    {
      name,
      email,
      password: passwordHashed,
      role,
    },
  );

  return { code: 201, message: 'New user added successfully' };
};

const deleteAdminUser = async (email) => {
  await repositoryAdmin.deleteAdminUser(email);
  return { message: 'user deleted successfully' };
};

module.exports = {
  getAdminUsers,
  postAdminUser,
  deleteAdminUser,
};