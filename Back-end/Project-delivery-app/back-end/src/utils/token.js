const jwt = require('jsonwebtoken');
const jwtKey = require('fs')
  .readFileSync('./jwt.evaluation.key', { encoding: 'utf8' });

require('dotenv').config();

// const JWT_SECRET = process.env.JWT_SECRET || 'secret_key';

function generateToken(userId, role) {
  const token = jwt.sign(
    { userId, role },
    jwtKey,
    { expiresIn: '3d' },
  );

  return token;
}

function decodeToken(token) {
  const data = jwt.verify(token, jwtKey);

  return data;
}

module.exports = {
  generateToken,
  decodeToken,
};