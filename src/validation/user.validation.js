const Joi = require("joi");

const validateReg = Joi.object({
  firstName: Joi.string().min(3).max(20).required(),
  lastName: Joi.string().min(3).max(20).required(),
  username: Joi.string().required(),
  age: Joi.string().required(),
  email: Joi.string().email({
    minDomainSegments: 2,
    tlds: { allow: ["com", "net"] },
  }),
  password: Joi.string().min(8).required(),
  gender: Joi.string().required(),
});

const validateEmail = Joi.object({
  email: Joi.string().email({
    minDomainSegments: 2,
    tlds: { allow: ["com", "net"] },
  }),
});

const validateLogin = Joi.object({
  email: Joi.string().email({
    minDomainSegments: 2,
    tlds: { allow: ["com", "net"] },
  }),
  password: Joi.string().min(8).required(),
});
const validateEmailVerificationOTP = Joi.object({
  email: Joi.string().email({
    minDomainSegments: 2,
    tlds: { allow: ["com", "net"] },
  }),
  OTP: Joi.string().min(6).max(6).required(),
});

module.exports = {
  validateReg,
  validateEmail,
  validateLogin,
  validateEmailVerificationOTP,
};