const {
  createUser,
} = require("../database/queries/user.query");
const pool = require("../database/pgsql");
class User {
  constructor(instanceObject) {
    this.firstName = instanceObject.firstName;
    this.lastName = instanceObject.lastName;
    this.username = instanceObject.username;
    this.hashPassword = instanceObject.hashPassword;
    this.email = instanceObject.email;
    this.age = instanceObject.age;
    this.gender = instanceObject.gender;
  }

  async save() {
    try {
      const user = await pool.query(createUser, [
        this.firstName,
        this.lastName,
        this.username,
        this.hashPassword,
        this.email,
        this.age,
        this.gender,
        "display_picture",
      ]);
        console.log("user.rows[0]", user.rows[0])
      return user.rows[0];
    } catch (error) {
      throw error;
    }
  }
}

module.exports = User;


















// --   CREATE TYPE USER_ROLE AS ENUM ('Admin', 'User');
// --   CREATE TABLE USERS (
// -- 	  user_id uuid PRIMARY KEY DEFAULT uuid_generate_v1(),
// --                     first_name varchar(30) NOT null,
// --                     last_name varchar(30) NOT NULL,
// --   					username varchar(30) UNIQUE NOT NULL ,
// --   				  	age int NOT NULL,
// --    				  	email varchar(30) UNIQUE NOT NULL,j
// --   					password varchar(200) NOT NULL,
// --   				 	is_verified boolean DEFAULT FALSE,
// --   					role USER_ROLE DEFAULT 'User',
// --   				  	gender varchar(30) NOT NULL,
// -- 					display_picture varchar(100) NOT NULL
// --                     );

// --   CREATE TABLE ADMINS (
// -- 	  user_id uuid PRIMARY KEY DEFAULT uuid_generate_v1(),
// --                     first_name varchar(30) NOT null,
// --                     last_name varchar(30) NOT NULL,
// --   					username varchar(30) UNIQUE NOT NULL ,
// --   				  	age int NOT NULL,
// --    				  	email varchar(30) UNIQUE NOT NULL,
// --   					password varchar(200) NOT NULL,
// --   				 	is_verified boolean DEFAULT FALSE,
// --   					role USER_ROLE DEFAULT 'Admin',
// --   				  	gender varchar(30) NOT NULL,
// -- 					display_picture varchar(100) NOT NULL
// --                     );

// --  CREATE TABLE Post(post_id SERIAL PRIMARY KEY NOT NULL,
// -- 				   poster_username varchar(30) NOT NULL,
// -- 				   CONSTRAINT fk_poster
// -- 				   FOREIGN KEY(poster_username)
// -- 				   REFERENCES admins(username),
// -- 				   title varchar(40) NOT NULL,
// --                     body varchar(2000) NOT NULL,
// --   					comment_count int DEFAULT 0,
// -- 				   like_count int DEFAULT 0,
// -- 				   datePosted Date not null,
// -- 					created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
// --     				updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
// -- 				  );

// --  CREATE TABLE Comment(comment_id SERIAL PRIMARY KEY NOT NULL,
// -- 				   post_id int NOT NULL,
// -- 				   CONSTRAINT fk_post
// -- 				   FOREIGN KEY(post_id)
// -- 				   REFERENCES post(post_id),
// --                     body varchar(2000) NOT NULL,
// -- 				   like_count int DEFAULT 0,
// -- 				   datePosted Date not null,
// -- 					created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
// --     				updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
// -- 				  );

// -- CREATE TABLE OTP(
// -- 	id INT PRIMARY KEY NOT NULL,
// -- 	OwnerId UUID NOT NULL,
// -- 	forgot_pass_otp INT,
// -- 	verify_email_otp INT,
// -- 	CONSTRAINT FK_USER
// -- 	FOREIGN KEY(OwnerId)
// -- 	REFERENCES Users(user_id)
// -- 	forgot_pass_expires_at Date NOT NULL,
// -- )

// --  CREATE TABLE Reply(reply_id SERIAL PRIMARY KEY NOT NULL,
// -- 				   comment_id UUID NOT NULL,
// -- 				   CONSTRAINT fk_comment
// -- 				   FOREIGN KEY(comment_id)
// -- 				   REFERENCES comment(comment_id),
// --                     body varchar(2000) NOT NULL,
// -- 				   like_count int NOT NULL
// -- 				  );

// -- CREATE TABLE Post(post_id SERIAL PRIMARY KEY NOT NULL,
// -- 				   title varchar(40) NOT NULL,
// --                     body varchar(2000) NOT NULL,
// --   					reply_count int NOT NULL,
// -- 				   like_count int NOT NULL,
// -- 				  );

// --  CREATE TABLE Post(post_id SERIAL PRIMARY KEY NOT NULL,
// --  				   Post_id UUID NOT NULL,
// -- 				   CONSTRAINT fk_post
// -- 				   FOREIGN KEY(post_id)
// -- 				   REFERENCES post(post_id),

// -- 				   commenter_id UUID NOT NULL,
// -- 				   CONSTRAINT fk_commenter
// -- 				   FOREIGN KEY(commenter_id)
// -- 				   REFERENCES users(user_id)
// -- 				  );
