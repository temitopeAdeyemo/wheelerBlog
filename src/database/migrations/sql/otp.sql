CREATE TABLE OTP(
	id INT PRIMARY KEY NOT NULL,
	OwnerId UUID NOT NULL,
	forgot_pass_otp INT,
	verify_email_otp INT,
	CONSTRAINT FK_USER
	FOREIGN KEY(OwnerId)
	REFERENCES Users(user_id)
	forgot_pass_expires_at Date NOT NULL,
)
