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
class UserService {
    static async getUserByEmail(email){
    const emailExists = await pool.query(
      findOneByEmail,
      [email]
    );
    return emailExists.rows[0]? emailExists.rows[0] : null
    }

    static async getUserByUsername(username){
    const usernameExists = await pool.query(
      findOneByUsername,
      [username]
    );
    console.log("..........................", usernameExists.rows[0]);
    return usernameExists.rows[0]? usernameExists.rows[0] : null        
    }

    static async  updateUserVerifiaction(ownerId){
    const userVerifiaction = await pool.query(updateVerificationStatus, [true, ownerId])
    return userVerifiaction? userVerifiaction.rows[0] : null        
    }

    static async findVerificationOTP(ownerId){
    const OTP = await pool.query(findVerificationOTP, [ownerId])
    return OTP? OTP.rows[0] : null        
    }

    static async deleteVerificationOTP(ownerId){
    const deleteOTP = await pool.query(DeleteVerificationOTP, [ownerId])
    return deleteOTP? deleteOTP.rows[0] : null        
    }
}

module.exports = UserService