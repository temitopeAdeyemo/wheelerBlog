const { createPost } = require("../database/queries/post.query");
const pool = require("../database/pgsql");

class Post {
  constructor(instanceObject) {
    this.poster_username = instanceObject.poster_username;
    this.title = instanceObject.title;
    this.body = instanceObject.body;
    this.comment_count = 0;
    this.likedBy = [];
  }

  async save() {
    try {
      const post = await pool.query(createPost, [
        this.poster_username,
        this.title,
        this.body,
        this.comment_count,
        this.likedBy,
      ]);
      return post.rows[0];
    } catch (error) {
      throw error;
    }
  }
}

module.exports = Post;