module.exports = {
  createUser:
    "INSERT INTO USERS (first_name, last_name, username, password, email,age, gender, display_picture) VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *",
  findUsers: "SELECT * FROM Users",
  findOneByUsername: "SELECT * FROM Users WHERE username = $1",
  findOneByEmail: "SELECT * FROM Users WHERE EMAIL = $1",
  CreateEmailVerificationOtp:
    "INSERT INTO USER_OTP (OwnerId, verify_email_otp, verify_email_expires_at) VALUES ($1, $2, $3) RETURNING *",
  DeleteUserOTP: "DELETE FROM User_otp WHERE ownerId = $1",
  findUserOtp:
    "SELECT users.email, users.user_id, verify_email_otp, verify_email_expires_at FROM User_otp INNER JOIN Users ON  User_otp.OwnerId = Users.user_id WHERE OwnerId::text = $1",
  updateVerificationStatus:
    "UPDATE Users SET is_verified = $1 WHERE user_id::text = $2",
};
