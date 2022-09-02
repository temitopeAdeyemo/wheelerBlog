const express = require("express");
const {
  adminLogin,
  adminRegistration,
} = require("../controllers/admin.controller");
const {
  validateRegInfo,
  validateLoginInfo,
} = require("../middlewares/adminValidation.middleware");
const {
  checkIfAdminExist,
  validateUsername,
  fetchLoginEmail,
  validatePassword,
  validateLoginAccess,
} = require("../middlewares/admin.middlewares");

const router = express.Router();

router.post(
  "/admin/signup",
  validateRegInfo,
  checkIfAdminExist,
  validateUsername,
  adminRegistration
);

router.post(
  "/admin/login",
  validateLoginInfo,
  fetchLoginEmail,
  validatePassword,
  validateLoginAccess,
  adminLogin
);

module.exports = router;
