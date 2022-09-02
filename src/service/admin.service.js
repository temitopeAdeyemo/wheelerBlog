const {
  findOneByUsername,
  findOneByEmail,
  updateVerificationStatus,
  findAdmins,
} = require("../database/queries/admin.query");
const pool = require("../database/pgsql");
const {
  DeleteVerificationOTP,
  findVerificationOTP,
} = require("../database/queries/otp.query");
const Admin = require("../models/admin.model");
const UserVerificationOTP = require("../models/user_otp.model");

class AdminService {
  static async createAdmin(instanceObject) {
    const admin = new Admin(instanceObject);
    const newAdmin = await admin.save();
    return newAdmin || null;
  }

  static async createOTP(instanceObject) {
    const OTP = new UserVerificationOTP(instanceObject);
    const newOTP = await OTP.save();
    return newOTP || null;
  }

  static async getAdminByEmail(email) {
    const emailExists = await pool.query(findOneByEmail, [email]);
    return emailExists.rows[0] ? emailExists.rows[0] : null;
  }

  static async getAdmins() {
    const emailExists = await pool.query(findAdmins);
    return emailExists.rows[0] ? emailExists.rows[0] : null;
  }

  static async getAdminByUsername(username) {
    const usernameExists = await pool.query(findOneByUsername, [username]);
    return usernameExists.rows[0] ? usernameExists.rows[0] : null;
  }

  static async updateAdminVerifiaction(ownerId) {
    const adminVerifiaction = await pool.query(updateVerificationStatus, [
      true,
      ownerId,
    ]);
    return adminVerifiaction ? adminVerifiaction.rows[0] : null;
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

module.exports = AdminService;