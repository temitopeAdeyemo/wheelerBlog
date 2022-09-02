const {
  getAdminByEmail,
  getAdminByUsername,
  getAdmins,
} = require("../service/admin.service");
const ApiError = require("../utils/error/api.error");
const { errorResponse } = require("../utils/helpers/generic");
const {
  emailConflict,
  inValidLogin,
  serverError,
} = require("../utils/error/generic");
const { hash, createHashedOTP, compare } = require("../utils/helpers/auth");

class adminMiddleware {
  static async checkIfAdminExist(req, res, next) {
    try {
      const { email } = req.body;
      const emailExists = await getAdmins(email);
      return emailExists
        ? errorResponse(
            res,
            new ApiError({
              status: 401,
              message: "AN_ADMIN_ALREADY_EXIST",
            })
          )
        : next();
    } catch (error) {
      return errorResponse(res, serverError);
    }
  }

  static async fetchEmail(req, res, next) {
    try {
      const { email } = req.body;
      const emailExists = await getAdminByEmail(email);

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
      const emailExists = await getAdminByEmail(req.body.email);

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

  static async validateUsername(req, res, next) {
    try {
      const usernameExists = await getAdminByUsername(req.body.username);
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
}

module.exports = adminMiddleware;
