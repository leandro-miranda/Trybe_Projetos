const { decodeToken } = require('../utils/token');

require('dotenv').config();

module.exports = async (req, res, next) => {
  try {
    const { authorization: token } = req.headers;

    if (!token) {
      return res.status(401).json({ message: 'Token not found' });
    }

    const data = decodeToken(token);

    req.body.sale.userId = data.userId;

    next();
  } catch (err) {
    return res.status(401).json({ message: 'Expired or invalid token' });
  }
};