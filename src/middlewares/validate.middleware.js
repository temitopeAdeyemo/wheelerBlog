const { validateData } = require("../utils/helpers/auth");
const ApiError = require("../utils/error/api.error");
const { errorResponse } = require("../utils/helpers/generic");
const {
  validateReg,
  validateEmail,
  validateEmailVerificationOTP,
} = require("../validation/user.validation");
// class Validator {
//   static validate(validator) {
//     return async (req, res, next) => {
//       try {
//         await validateData(validator, req.body);
//         next();
//       } catch (error) {
//         console.log(error);
//         return errorResponse(
//           res,
//           new ApiError({
//             status: 400,
//             message: error.details[0].message,
//           })
//         );
//       }
//     };
//   }
// }

class Validator {
  static async validateRegInfo(req, res, next) {
    try {
      // console.log("hereeeeee")
      await validateData(validateReg, req.body);
      next();
    } catch (error) {
      console.log(error);
      return errorResponse(
        res,
        new ApiError({
          status: 400,
          message: error.details[0].message,
        })
      );
    }
  }

  static async validateVerificationInfo(req, res, next) {
    try {
      await validateData(validateEmailVerificationOTP, req.body);
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
