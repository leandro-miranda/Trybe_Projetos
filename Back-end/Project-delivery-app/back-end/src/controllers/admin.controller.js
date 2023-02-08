const adminService = require('../services/admin.service');

const getAdminUsers = async (req, res) => {
  const token = req.headers.authorization;
  if (token) {
    const users = await adminService.getAdminUsers();
    return res.status(200).json(users);
  }
  return res.status(401).json({ message: 'Token not found' });
};

const postAdminUser = async (req, res) => {
  const token = req.headers.authorization;
  if (token) {
    const { code, message } = await adminService.postAdminUser(req.body);
    return res.status(code).json(message);
  }
  return res.status(401).json({ message: 'Token not found' });
};

const deleteAdminUser = async (req, res) => {
  await adminService.deleteAdminUser(req.params.email);
  return res.status(204).json('User removed');
};

module.exports = {
  getAdminUsers,
  postAdminUser,
  deleteAdminUser,
};