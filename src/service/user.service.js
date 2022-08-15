const {
  createUser,
  findUsers,
  findOneByUsername,
  findOneByEmail,
  CreateEmailVerificationOtp,
  DeleteUserOTP,
  findUserOtp,
  updateVerificationStatus,
} = require("../database/queries/user.query");
const pool = require("../database/pgsql");
const {
  createVerificationOTP,
  DeleteVerificationOTP,
  findVerificationOTP
} = require("../database/queries/otp.query");
const User = require("../models/user.model");
const UserVerificationOTP = require("../models/user_otp.model");
class UserService {
  static async createUser(instanceObject) {
    const user = new User(instanceObject);
    const newUser = await user.save();
    return newUser || null;
  }

  static async createOTP(instanceObject) {
    const OTP = new UserVerificationOTP(instanceObject);
    const newOTP = await OTP.save();
    return newOTP || null;
  }

  static async getUserByEmail(email) {
    const emailExists = await pool.query(findOneByEmail, [email]);
    return emailExists.rows[0] ? emailExists.rows[0] : null;
  }

  static async getUserByUsername(username) {
    const usernameExists = await pool.query(findOneByUsername, [username]);
    return usernameExists.rows[0] ? usernameExists.rows[0] : null;
  }

  static async updateUserVerifiaction(ownerId) {
    const userVerifiaction = await pool.query(updateVerificationStatus, [
      true,
      ownerId,
    ]);
    return userVerifiaction ? userVerifiaction.rows[0] : null;
  }

  static async findVerificationOTP(ownerId) {
    const OTP = await pool.query(findVerificationOTP, [ownerId]);
    return OTP ? OTP.rows[0] : null;
  }

  static async deleteVerificationOTP(ownerId) {
    const deleteOTP = await pool.query(DeleteVerificationOTP, [ownerId]);
    return deleteOTP ? deleteOTP.rows[0] : null;
  }
}

module.exports = UserService