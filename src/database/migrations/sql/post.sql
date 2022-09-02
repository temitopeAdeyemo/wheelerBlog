CREATE TABLE Post(post_id SERIAL PRIMARY KEY NOT NULL,
				   title varchar(40) NOT NULL,
                    body varchar(2000) NOT NULL,
  					reply_count int NOT NULL,
				   like_count int NOT NULL,
				  );