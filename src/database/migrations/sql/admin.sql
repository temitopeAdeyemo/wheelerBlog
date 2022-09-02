  CREATE TYPE USER_ROLE AS ENUM ('Admin', 'User');
  CREATE TABLE USERS (
	                user_id uuid PRIMARY KEY DEFAULT uuid_generate_v1(),
                    first_name varchar(30) NOT null,
                    last_name varchar(30) NOT NULL,
  					username varchar(30) UNIQUE NOT NULL ,
  				  	age int NOT NULL,
   				  	email varchar(30) UNIQUE NOT NULL,j
  					password varchar(200) NOT NULL,
  				 	is_verified boolean DEFAULT FALSE,
  					role USER_ROLE DEFAULT 'Admin',
  				  	gender varchar(30) NOT NULL,
					display_picture varchar(100) NOT NULL
                    );
