const { validateData } = require("../utils/helpers/auth");
const ApiError = require("../utils/error/api.error");
const { errorResponse } = require("../utils/helpers/generic");
const {
  validateReg,
  validateEmail,
  validateLogin,
} = require("../validation/admin.validation");

class Validator {
  static async validateRegInfo(req, res, next) {
    try {
      await validateData(validateReg, req.body);
      next();
    } catch (error) {
      return errorResponse(
        res,
        new ApiError({
          status: 400,
          message: error.details[0].message,
        })
      );
    }
  }

  static async validateLoginInfo(req, res, next) {
    try {
      await validateData(validateLogin, req.body);
      next();
    } catch (error) {
      return errorResponse(
        res,
        new ApiError({
          status: 400,
          message: error.details[0].message,
        })
      );
    }
  }

  static async validateEmail(req, res, next) {
    try {
      await validateData(validateEmail, req.body);
      next();
    } catch (error) {
      return errorResponse(
        res,
        new ApiError({
          status: 400,
          message: error.details[0].message,
        })
      );
    }
  }
}

module.exports = Validator;
