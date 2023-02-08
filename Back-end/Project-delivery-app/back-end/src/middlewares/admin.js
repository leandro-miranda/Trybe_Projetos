const Joi = require('joi');
// const ErrorCustom = require('../Error/ErrorCustom');

const validateAdmin = (req, res, next) => {
  const schema = Joi.object({
    name: Joi.string().min(12).required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(6).required(),
    role: Joi.string().required(),
  });

  const { error } = schema.validate(req.body);

  if (error) return res.status(400).json({ message: error.message });
  // if (error) ErrorCustom(400, error.message);

  next();
};

module.exports = validateAdmin;