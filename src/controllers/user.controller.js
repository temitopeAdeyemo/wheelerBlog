const ApiError = require("../utils/error/api.error");
const {
  hash,
  OTPExpiresAt,
  createHashedOTP,
  signJWT,
} = require("../utils/helpers/auth");
const {
  errorResponse,
  successResponse,
  asyncWrapper,
} = require("../utils/helpers/generic");
const {
  deleteVerificationOTP,
  createUser,
  createOTP,
  updateUserVerifiaction,
} = require("../service/user.service");

class userController {
  static userRegistration = async (req, res, next) => {
    try {
      const hashPassword = await hash(req.body.password);
      const newUser = await createUser({ ...req.body, hashPassword });
      const otp = await createHashedOTP();
      await createOTP({
        userId: newUser.user_id,
        hashedOTP: otp,
        OTPExpiresAt: OTPExpiresAt(),
      });
      return successResponse(res, 201, {
        message: `Hi ${req.body.firstName.toUpperCase()}, Please check your email for verification.`,
        email: req.body.email,
      });
    } catch (e) {
      next(e);
    }
  };

  static verifyEmailOTP = async (req, res, next) => {
    try {
      await deleteVerificationOTP(req.user.id);
      await createOTP({
        userId: req.user.id,
        hashedOTP: req.user.hashedOTP,
        OTPExpiresAt: OTPExpiresAt(),
      });
      return successResponse(res, 201, {
        message: `Hi, Please check your email for verification.`,
      });
    } catch (e) {
      next(e);
    }
  };

  static verifyEmail = async (req, res, next) => {
    try {
      await updateUserVerifiaction(req.user.id);
      await deleteVerificationOTP(req.user.id);
      return successResponse(res, 200, {
        message: `Hi, Your account has been verified sucessfully.`,
      });
    } catch (e) {
      next(e);
    }
  };

  static userLogin = async (req, res, next) => {
    try {
      const data = {
        id: req.user.id,
      };
      const token = await signJWT(data);
      return successResponse(res, 200, {
        message: `Hi ${req.user.firstName.toUpperCase()}, Welcome back.`,
        token,
      });
    } catch (e) {
      next(e);
    }
  };
}

module.exports = userController;
