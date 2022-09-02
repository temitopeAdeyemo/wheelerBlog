const { validateData } = require("../utils/helpers/auth");
const ApiError = require("../utils/error/api.error");
const { errorResponse } = require("../utils/helpers/generic");
const { validatePost } = require("../validation/post.validation");

class Validators {
  static async validatePostInfo(req, res, next) {
    try {
      await validateData(validatePost, req.body);
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

module.exports = Validators;
