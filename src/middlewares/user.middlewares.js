const {
  getUserByEmail,
  findOneByEmail,
  getUserByUsername,
  findVerificationOTP,
} = require("../service/user.service");
const ApiError = require("../utils/error/api.error");
const { errorResponse } = require("../utils/helpers/generic");
const {
  emailConflict,
  usernameConflict,
  inValidPassword,
  notFoundApi,
  inValidLogin,
  notAuthorized,
  serverError,
} = require("../utils/error/generic");
const {
  hash,
  OTPExpiresAt,
  createOTP,
  compare,
} = require("../utils/helpers/auth");

class userMiddleware {
  static async validateUserEmail(req, res, next) {
    try {
      const { email } = req.body;
      const emailExists = await getUserByEmail(email);
      console.log(emailExists);
      return emailExists ? errorResponse(res, emailConflict) : next();
    } catch (error) {
      return errorResponse(res, serverError);
    }
  }

  static async validateVerificationEmail(req, res, next) {
    try {
      const { email } = req.body;
      const emailExists = await getUserByEmail(email);
      emailExists ? (req.user = { id: emailExists.user_id }) : null;
      return emailExists
        ? next()
        : errorResponse(
            res,
            new ApiError({
              status: 401,
              message: "ACCOUNT_DOES_NOT_EXIST",
            })
          );
    } catch (error) {
      return errorResponse(res, serverError);
    }
  }

  static async checkVerificationStatus(req, res, next) {
    try {
      const { email } = req.body;
      const emailExists = await getUserByEmail(email);
      // if(emailExists.is_verified)
      console.log(emailExists);
      return emailExists.is_verified
        ? errorResponse(
            res,
            new ApiError({
              status: 401,
              message: "ACCOUNT_VERIFIED_ALREADY",
            })
          )
        : next();
    } catch (error) {
      return errorResponse(res, serverError);
    }
  }

  static async validateUsername(req, res, next) {
    try {
      console.log("hereeeeeeeeeeeeeeeeee!!!");
      const { username } = req.body;
      const usernameExists = await getUserByUsername(username);
      console.log("usernameExists", usernameExists);
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
      const otp = createOTP();
      console.log(otp);
      const hashedOTP = await hash(otp);
      req.user = { ...req.user, hashedOTP };
      next();
    } catch (error) {
      console.log(error.message);
      return errorResponse(
        res,
        new ApiError({
          status: 500,
          message: error.message,
        })
      );
    }
  }

  static async handleOTP(req, res, next) {
    // const userOTP = await pool.query(
    //   "SELECT users.email, users.user_id, verify_email_otp, verify_email_expires_at FROM User_otp INNER JOIN Users ON  User_otp.OwnerId = Users.user_id WHERE OwnerId::text = $1",
    //   [emailExists.rows[0].user_id]
    // );
    try {
      const userOTP = await findVerificationOTP(req.user.id);
      console.log(userOTP);
      console.log("userOTP.rows[0].ownerId", userOTP.user_id);
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
      console.log("hashedOTP + decodedOtp", decodedOtp);
      if (!decodedOtp) {
        return errorResponse(
          res,
          new ApiError({
            status: 400,
            message: "OTP_INVALID",
          })
        );
      }
      // console.log(userOTP.verify_email_expires_at);
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
      // verify_email_otp;
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
