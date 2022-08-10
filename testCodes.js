// const time = new Date(Date.now() + 15 * 60 * 1000)
// console.log(time)
// const timee = "2022-08-05T03:20:02.007Z"
// const times = new Date(timee)
// console.log(time>timee)
// console.log(times);
// console.log(timee);
// console.log(typeof time)




// const getUser = (a) => {
//     let worked = a * a
//   return worked ? "FIGURE IS TRUE" : null;
// };

// console.log(getUser(0));

// CREATE TABLE USER_OTP(
// 	id SERIAL PRIMARY KEY NOT NULL,
// 	OwnerId UUID NOT NULL,
// 	forgot_pass_otp varchar(100),
// 	verify_email_otp varchar(100),
// 	CONSTRAINT FK_USER
// 	FOREIGN KEY(OwnerId)
// 	REFERENCES Users(user_id),
// 	forgot_pass_expires_at varchar,
// 	verify_email_expires_at varchar
// )

    // const OTPExpiresAt = `${new Date(Date.now() + 15 * 60 * 1000)}`;
    // console.log(OTPExpiresAt);

    class added{
      static add(a = 2,b = 4){
        const result = a * b
        return result
      }
    }

console.log(added.add())

// CREATE TABLE ADMIN_OTP(
// 	id SERIAL PRIMARY KEY NOT NULL,
// 	OwnerId UUID NOT NULL,
// 	forgot_pass_otp varchar(100),
// 	verify_email_otp varchar(100),
// 	CONSTRAINT FK_ADMIN
// 	FOREIGN KEY(OwnerId)
// 	REFERENCES admins(user_id),
// 	forgot_pass_expires_at varchar,
// 	verify_email_expires_at varchar
// )