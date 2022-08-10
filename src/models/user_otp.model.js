const {
  createVerificationOTP,
  findUsers,
  findOneByUsername,
  findOneByEmail,
  CreateEmailVerificationOtp,
  DeleteUserOTP,
  findUserOtp,
  updateVerificationStatus,
} = require("../database/queries/otp.query");
const pool = require("../database/pgsql");

class UserVerificationOTP {
  constructor(instanceObject) {
    this.userId = instanceObject.userId;
    this.hashedOTP = instanceObject.hashedOTP;
    this.OTPExpiresAt = instanceObject.OTPExpiresAt;
  }

  async save() {
    try {
      const OTP = await pool.query(createVerificationOTP, [
        this.userId,
        this.hashedOTP,
        this.OTPExpiresAt,
      ]);
      return OTP.rows[0];
    } catch (error) {
      throw error;
    }
  }
}

module.exports = UserVerificationOTP;
