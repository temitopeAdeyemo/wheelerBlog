const ApiError = require("../utils/error/api.error");
const {
  hash,
  OTPExpiresAt,
  createHashedOTP,
  signJWT,
} = require("../utils/helpers/auth");
const { errorResponse, asyncWrapper } = require("../utils/helpers/generic");
const {} = require("../utils/error/generic");
const {
  deleteVerificationOTP,
  createUser,
  createOTP,
  updateUserVerifiaction,
} = require("../service/user.service");

const userRegistration = async (req, res, next) => {
  try {
    const hashPassword = await hash(req.body.password);
    const newUser = await createUser({ ...req.body, hashPassword });
    const otp = await createHashedOTP();
    await createOTP({
      userId: newUser.user_id,
      hashedOTP: otp,
      OTPExpiresAt: OTPExpiresAt(),
    });
    return res.status(201).json({
      message: `Hi ${req.body.firstName.toUpperCase()}, Please check your email for verification.`,
      email: req.body.email,
    });
  } catch (error) {
    return res.status(500).json({
      message: `${error.message}, Try again later.`,
    });
  }
};

const verifyEmailOTP = async (req, res, next) => {
  try {
    await deleteVerificationOTP(req.user.id);
    await createOTP({
      userId: req.user.id,
      hashedOTP: req.user.hashedOTP,
      OTPExpiresAt: OTPExpiresAt(),
    });
    return res.status(200).json({
      message: `Hi, Please check your email for verification.`,
    });
  } catch (error) {
    return res.status(500).json({
      message: `${error.message}, Try again later.`,
    });
  }
};

const verifyEmail = async (req, res, next) => {
  try {
    await updateUserVerifiaction(req.user.id);
    await deleteVerificationOTP(req.user.id);
    return res.status(200).json({
      message: `Hi, Your account has been verified sucessfully.`,
    });
  } catch (error) {
    return res.status(500).json({
      message: `${error.message}, Try again later.`,
    });
  }
};

const userLogin = async (req, res, next) => {
  try {
    const data = {
      id: req.user.id,
    };
    const token  = await signJWT(data);
    return res.status(200).json({
      message: `Hi ${req.user.firstName.toUpperCase()}, Welcome back.`,
      token,
    });
  } catch (error) {
    return res.status(500).json({
      message: `${error.message}, Try again later.`,
    });
  }
};
module.exports = { userRegistration, userLogin, verifyEmailOTP, verifyEmail };
