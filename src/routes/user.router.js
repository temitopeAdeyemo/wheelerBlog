const express = require("express");
const {
  userRegistration,
  userLogin,
  verifyEmailOTP,
  verifyEmail,
} = require("../controllers/user.controller");
const {
  validateRegInfo,
  validateVerificationInfo,
  validateEmail,
  validateLoginInfo,
} = require("../middlewares/validate.middleware");
const {
  validateUserEmail,
  validateUsername,
  fetchEmail,
  fetchLoginEmail,
  checkVerificationStatus,
  createOTP,
  handleOTP,
  validatePassword,
  validateLoginAccess,
} = require("../middlewares/user.middlewares");

const router = express.Router();
router.post(
  "/user/signup",
  validateRegInfo,
  validateUserEmail,
  validateUsername,
  userRegistration
);

router.post(
  "/user/login",
  validateLoginInfo,
  fetchLoginEmail,
  validatePassword,
  validateLoginAccess,
  userLogin
);

router.post(
  "/user/verifyemail/otp",
  validateEmail,
  fetchEmail,
  checkVerificationStatus,
  createOTP,
  verifyEmailOTP
);

router.patch(
  "/user/verifyemail/verify",
  validateVerificationInfo,
  fetchEmail,
  checkVerificationStatus,
  handleOTP,
  verifyEmail
);

module.exports = router;
