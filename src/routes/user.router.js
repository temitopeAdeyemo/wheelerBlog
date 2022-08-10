const express = require("express");
const {
  userRegistration,
  userLogin,
  verifyEmailOTP,
  verifyEmail,
} = require("../controllers/user.controller");

// const { validateReg } = require("../validation/user.validation");
const {
  validateRegInfo,
  validateVerificationInfo,
  validateEmail,
} = require("../middlewares/validate.middleware");
const {
  validateUserEmail,
  validateUsername,
  validateVerificationEmail,
  checkVerificationStatus,
  createOTP,
  handleOTP,
} = require("../middlewares/user.middlewares");

const router = express.Router();

router.post(
  "/user/signup",
  validateRegInfo,
  validateUserEmail,
  validateUsername,
  userRegistration
);
// router.post("/user/signup", validate(validateReg), validateEmail, userRegistration);
router.post("/user/login", userLogin);
router.post(
  "/user/verifyemail/otp",
  validateEmail,
  validateVerificationEmail,
  checkVerificationStatus,
  createOTP,
  verifyEmailOTP
);

router.patch(
  "/user/verifyemail/verify",
  validateVerificationInfo,
  validateVerificationEmail,
  checkVerificationStatus,
  handleOTP,
verifyEmail);

module.exports = router;
