const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
class AuthHelper {
  static async validateData(validator, reqBody) {
    try {
      const validated = await validator.validateAsync(reqBody);
      return validated;
    } catch (error) {
      throw error;
    }
  }

  static async hash(data) {
    try {
      const hashedValue = await bcrypt.hash(data, 10);
      return hashedValue;
    } catch (error) {
      throw error;
    }
  }

  static async compare(data, hashedData) {
    try {
      const decodedStatus = await bcrypt.compare(data, hashedData);
      return decodedStatus;
    } catch (error) {
      throw error;
    }
  }

  static OTPExpiresAt() {
    const OTPExpiresAt = `${new Date(Date.now() + 15 * 60 * 1000)}`;
    return OTPExpiresAt;
  }

  static async createHashedOTP() {
    const OTP = `${Math.floor(100000 + Math.random() * 900000)}`;
    const hashedOTP = await AuthHelper.hash(OTP);
    console.log(OTP);
    console.log("hashedOTP", hashedOTP);
    return hashedOTP;
  }

  static async signJWT(payload) {
    const { JWT_SECRET, JWT_EXPIRES_IN } = process.env;
    const token = await jwt.sign(payload, JWT_SECRET, {
      expiresIn: JWT_EXPIRES_IN,
    });
    return token;
  }

  static async verifyJWT(token) {
    const { JWT_SECRET } = process.env;
    const decodedToken = await jwt.verify(token, JWT_SECRET);
    return decodedToken;
  }
}

module.exports = AuthHelper;
