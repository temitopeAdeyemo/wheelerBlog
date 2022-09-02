const Joi = require("joi");

const validatePost = Joi.object({
  title: Joi.string().min(2).max(100).required(),
  body: Joi.string().min(1).max(5000).required(),
});

module.exports = {
  validatePost,
};
