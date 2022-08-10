// require dependencies
// const User = require("../models/user.model");
const ApiError = require("../utils/error/api.error");
const pool = require("../database/pgsql");
const jwt = require("jsonwebtoken");
const {
  authRequired,
  unAuthorized,
  notAuthorized,
} = require("../utils/error/generic");
const { errorResponse } = require("../utils/helpers/generic");
require("dotenv").config();

//  authenticating  users
const authenticate = async (req, res, next) => {
  try {
    let authorization = req.headers.authorization;
    if (!authorization) {
      return errorResponse(res, authRequired);
    }
    const authenticationArr = authorization.split(" ");
    if (authenticationArr[0] !== "Bearer") {
      return errorResponse(
        res,
        new ApiError({ status: 401, message: "Token is required" })
      );
    }
    let token = authenticationArr[1];
    if (!token) {
      return errorResponse(
        res,
        new ApiError({ status: 401, message: "Token is required" })
      );
    }
    const { JWT_SECRET } = process.env;
    const decryptToken = await jwt.verify(token, JWT_SECRET);
    const validUser = await pool.query(
      "SELECT * FROM Users WHERE user_id = $1",
      [decryptToken.id]
    );
    // console.log(validUser);
    if (!validUser.rows[0]) {
      return errorResponse(res, notAuthorized);
    }
    decryptToken["role"] = validUser.rows[0].role;
    req.user = decryptToken;
    console.log(req.user);
    next();
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};
//  authorizing
const authorize = async (req, res, next) => {
  try {
    console.log(req.user);
    if (req.user.role == "Admin") {
      next();
    } else {
      return errorResponse(res, unAuthorized);
    }
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};

//    exporting modules
module.exports = { authenticate, authorize };
