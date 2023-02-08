const toController = (object, element) => {
  if (!object) return { error: { code: 404, message: `${element} not found` } };
  return object;
};
  
const response = (res, object, method) => {
  if (object.error) {
    return res.status(object.error.code).json({ message: object.error.message });
  }
  // if (method === 'delete') return res.status(204).json(object);
  if (method === 'insert') return res.status(201).json(object);
  return res.status(200).json(object);
};
  
module.exports = { toController, response };