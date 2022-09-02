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

    const validAdmin = await pool.query(
      "SELECT * FROM Admins WHERE user_id = $1",
      [decryptToken.id]
    );
    if (!validUser.rows[0] && !validAdmin.rows[0]) {
      return errorResponse(res, notAuthorized);
    }
    if (validAdmin.rows[0]) {
      decryptToken["role"] = validAdmin.rows[0].role;
      decryptToken["username"] = validAdmin.rows[0].username;
    } else {
      decryptToken["role"] = validUser.rows[0].role;
      decryptToken["username"] = validUser.rows[0].username;
    }
    req.user = decryptToken;
    next();
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: error.message,
    });
  }
};
//  authorizing
const authorize = async (req, res, next) => {
  try {
    if (req.user.role == "Admin") {
      next();
    } else {
      return errorResponse(res, unAuthorized);
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: error.message,
    });
  }
};

//    exporting modules
module.exports = { authenticate, authorize };
