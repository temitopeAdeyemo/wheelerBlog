const { hash, signJWT } = require("../utils/helpers/auth");
const { successResponse, asyncWrapper } = require("../utils/helpers/generic");
const { createAdmin } = require("../service/admin.service");

class adminController {
  static adminRegistration = async (req, res, next) => {
    try {
      const hashPassword = await hash(req.body.password);
      await createAdmin({ ...req.body, hashPassword });
      return successResponse(res, 201, {
        message: `Hi ${req.body.firstName.toUpperCase()}, Please check your email for verification.`,
        email: req.body.email,
      });
    } catch (e) {
      next(e);
    }
  };

  static adminLogin = async (req, res, next) => {
    try {
      const data = {
        id: req.user.id,
      };
      console.log(req.user.id, "req.admin.id");
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

module.exports = adminController;
