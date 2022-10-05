const crypto = require('crypto');

const validationToken = () => crypto.randomBytes(8).join('').substring(0, 16);

module.exports = validationToken;