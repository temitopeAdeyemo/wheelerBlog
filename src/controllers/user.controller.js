const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const pool = require("../database/pgsql");
const ApiError = require("../utils/error/api.error");
const { hash, OTPExpiresAt, createOTP } = require("../utils/helpers/auth");
const { errorResponse } = require("../utils/helpers/generic");
const {
  validateReg,
  validateEmail,
  validateLogin,
  validateEmailVerificationOTP,
} = require("../validation/user.validation");
const {} = require("../utils/helpers/generic");
const User = require("../models/user.model");
const UserVerificationOTP = require("../models/user_otp.model");
const {
  emailConflict,
  usernameConflict,
  inValidPassword,
  notFoundApi,
  inValidLogin,
  notAuthorized,
} = require("../utils/error/generic");
const { deleteVerificationOTP } = require("../service/user.service");

const userRegistration = async (req, res, next) => {
  try {
    // const reqBody = req.body;
    const hashPassword = await hash(req.body.password);
    const user = new User({ ...req.body, hashPassword });
    const newUser = await user.save();
    const otp = createOTP();
    const hashedOTP = await hash(otp);
    const OTP = new UserVerificationOTP({
      userId: newUser.user_id,
      hashedOTP: hashedOTP,
      OTPExpiresAt: OTPExpiresAt(),
    });
    await OTP.save();

    return res.status(201).json({
      message: `Hi ${req.body.firstName.toUpperCase()}, Please check your email for verification.`,
      email: req.body.email,
      otp,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: `${error.message}, Try again later.`,
    });
  }
};

const verifyEmailOTP = async (req, res, next) => {
  try {
    // delete existing otp
    await deleteVerificationOTP(req.user.id);
    const newOTP = new UserVerificationOTP({
      userId: req.user.id,
      hashedOTP: req.user.hashedOTP,
      OTPExpiresAt: OTPExpiresAt(),
    });
    await newOTP.save();

    return res.status(200).json({
      message: `Hi, Please check your email for verification.`,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: `${error.message}, Try again later.`,
    });
  }
};

const verifyEmail = async (req, res, next) => {
  try {
    await pool.query(
      "UPDATE Users SET is_verified = $1 WHERE user_id::text = $2",
      [true, req.user.id]
    );
    await pool.query("DELETE FROM User_otp WHERE verify_email_otp::text = $1", [
      req.user.hashedOTP,
    ]);
    
    return res.status(200).json({
      message: `Hi, Your account has been verified sucessfully.`,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: `${error.message}, Try again later.`,
    });
  }
};

const userLogin = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    await validateLogin.validateAsync(req.body);
    const emailExists = await pool.query(
      "SELECT * FROM Users WHERE EMAIL = $1",
      [email]
    );
    console.log(emailExists.rows[0]);
    if (!emailExists.rows[0]) {
      return errorResponse(res, inValidLogin);
    }
    const validPassword = await bcrypt.compare(
      password,
      emailExists.rows[0].password
    );
    if (!validPassword) {
      return errorResponse(res, inValidLogin);
    }
    if (!emailExists.rows[0].is_verified) {
      return errorResponse(res, notAuthorized);
    }
    const data = {
      id: emailExists.rows[0],
    };
    // const  = process.env.JWT_EXPIRES_IN;
    const { JWT_SECRET, JWT_EXPIRES_IN } = process.env;
    const token = await jwt.sign(data, JWT_SECRET, {
      expiresIn: JWT_EXPIRES_IN,
    });
    return res.status(200).json({
      message: `Hi ${emailExists.rows[0].first_name.toUpperCase()}, Welcome back.`,
      token,
      //   email: newUser.email,
      //   otp: otp,
      // _id: newUser._id,
      // user_id: newUser.uuid,
      // newOTPVerification,
      // newUser,
      // newWallet,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: `${error.message}, Try again later.`,
    });
  }
};
module.exports = { userRegistration, userLogin, verifyEmailOTP, verifyEmail };
