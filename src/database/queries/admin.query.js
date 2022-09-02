module.exports = {
  createAdmin:
    "INSERT INTO ADMINS (first_name, last_name, username, password, email,age, gender, display_picture) VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *",
  findAdmins: "SELECT * FROM Admins",
  findOneByUsername: "SELECT * FROM Admins WHERE username = $1",
  findOneByEmail: "SELECT * FROM Admins WHERE EMAIL = $1",
  CreateEmailVerificationOtp:
    "INSERT INTO USER_OTP (OwnerId, verify_email_otp, verify_email_expires_at) VALUES ($1, $2, $3) RETURNING *",
  DeleteAdminOTP: "DELETE FROM User_otp WHERE ownerId = $1",
  findAdminOtp:
    "SELECT admins.email, admins.user_id, verify_email_otp, verify_email_expires_at FROM User_otp INNER JOIN Admins ON  Admin_otp.OwnerId = admins.user_id WHERE OwnerId::text = $1",
  updateVerificationStatus:
    "UPDATE Admins SET is_verified = $1 WHERE user_id::text = $2",
};