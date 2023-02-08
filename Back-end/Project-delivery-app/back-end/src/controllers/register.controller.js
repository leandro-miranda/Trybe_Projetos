const service = require('../services/register.service');
const { response } = require('../middlewares/dry');

const create = async (req, res) => {
    const { message } = await service.create(req.body);
    return response(res, message, 'insert');
};

module.exports = { create };
