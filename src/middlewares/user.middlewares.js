const {
  getUserByEmail,
  getUserByUsername,
  findVerificationOTP,
} = require("../service/user.service");
const ApiError = require("../utils/error/api.error");
const { errorResponse } = require("../utils/helpers/generic");
const {
  emailConflict,
  inValidLogin,
  serverError,
} = require("../utils/error/generic");
const { hash, createHashedOTP, compare } = require("../utils/helpers/auth");

class userMiddleware {
  static async validateUserEmail(req, res, next) {
    try {
      const { email } = req.body;
      const emailExists = await getUserByEmail(email);
      return emailExists ? errorResponse(res, emailConflict) : next();
    } catch (error) {
      return errorResponse(res, serverError);
    }
  }

  static async fetchEmail(req, res, next) {
    try {
      const { email } = req.body;
      const emailExists = await getUserByEmail(email);

      if (!emailExists) {
        return errorResponse(
          res,
          new ApiError({
            status: 401,
            message: "ACCOUNT_DOES_NOT_EXIST",
          })
        );
      }

      req.user = {
        id: emailExists.user_id,
        verified: emailExists.is_verified,
      };
      next();
    } catch (error) {
      return errorResponse(res, serverError);
    }
  }

  static async fetchLoginEmail(req, res, next) {
    try {
      const emailExists = await getUserByEmail(req.body.email);

      if (!emailExists) {
        return errorResponse(res, inValidLogin);
      }

      req.user = {
        id: emailExists.user_id,
        password: emailExists.password,
        verified: emailExists.is_verified,
        firstName: emailExists.first_name,
      };
      next();
    } catch (error) {
      return errorResponse(res, serverError);
    }
  }

  static async checkVerificationStatus(req, res, next) {
    try {
      return req.user.verified
        ? errorResponse(
            res,
            new ApiError({
              status: 401,
              message: "ACCOUNT_VERIFIED_ALREADY",
            })
          )
        : next();
    } catch (error) {
      console.log(error);
      return errorResponse(res, serverError);
    }
  }

  static async validateUsername(req, res, next) {
    try {
      const usernameExists = await getUserByUsername(req.body.username);
      return usernameExists
        ? errorResponse(
            res,
            new ApiError({
              status: 400,
              message: "USERNAME_TAKEN",
            })
          )
        : next();
    } catch (error) {
      return errorResponse(res, serverError);
    }
  }

  static async createOTP(req, res, next) {
    try {
      const hashedOTP = await createHashedOTP();
      req.user = { ...req.user, hashedOTP };
      next();
    } catch (error) {
      return errorResponse(
        res,
        new ApiError({
          status: 500,
          message: error.message,
        })
      );
    }
  }

  static async validatePassword(req, res, next) {
    try {
      const validPassword = await compare(req.body.password, req.user.password);
      return validPassword ? next() : errorResponse(res, inValidLogin);
    } catch (error) {
      return errorResponse(
        res,
        new ApiError({
          status: 500,
          message: error.message,
        })
      );
    }
  }

  static async validateLoginAccess(req, res, next) {
    try {
      return req.user.verified
        ? next()
        : errorResponse(
            res,
            new ApiError({
              status: 401,
              message: "ACCOUNT_NOT_VERIFIED",
            })
          );
    } catch (error) {
      return errorResponse(res, serverError);
    }
  }

  static async handleOTP(req, res, next) {
    try {
      const userOTP = await findVerificationOTP(req.user.id);
      console.log(userOTP);

      if (!userOTP) {
        return errorResponse(
          res,
          new ApiError({
            status: 404,
            message: "OTP_NOT_FOUND",
          })
        );
      }

      let hashedOTP = userOTP.verify_email_otp;
      const decodedOtp = await compare(req.body.OTP, hashedOTP);

      if (!decodedOtp) {
        return errorResponse(
          res,
          new ApiError({
            status: 400,
            message: "OTP_INVALID",
          })
        );
      }

      if (Date.now() > new Date(userOTP.verify_email_expires_at)) {
        return errorResponse(
          res,
          new ApiError({
            status: 400,
            message: "OTP_EXPIRED",
          })
        );
      }

      req.user = { ...req.user, hashedOTP };
      next();
    } catch (error) {
      console.log(error);
      return errorResponse(
        res,
        new ApiError({
          status: 500,
          message: error.message,
        })
      );
    }
  }
}

module.exports = userMiddleware;
