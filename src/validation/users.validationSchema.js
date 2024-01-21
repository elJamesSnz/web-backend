const Joi = require("joi");

const userSchema = Joi.object({
  name: Joi.string().required(),
  surname: Joi.string().required(),
  age: Joi.number().integer().min(0).max(150).required(),
  username: Joi.string().required(),
  skills: Joi.array().items(Joi.string()).optional(),
});

module.exports = userSchema;
