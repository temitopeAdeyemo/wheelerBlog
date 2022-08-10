module.exports = {
  createVerificationOTP:
    "INSERT INTO USER_OTP (OwnerId, verify_email_otp, verify_email_expires_at) VALUES ($1, $2, $3) RETURNING *",
  findVerificationOTP:
    "SELECT users.email, users.user_id, verify_email_otp, verify_email_expires_at FROM User_otp INNER JOIN Users ON  User_otp.OwnerId = Users.user_id WHERE OwnerId::text = $1",
  DeleteVerificationOTP: "DELETE FROM User_otp WHERE ownerId = $1",
};
