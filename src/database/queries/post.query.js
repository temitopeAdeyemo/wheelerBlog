module.exports = {
  createPost:
    "INSERT INTO Post (poster_username, title, body, comment_count, likedBy) VALUES ($1, $2, $3, $4, $5) RETURNING *",
  findPost: "SELECT * FROM Post",
  findPostById: "SELECT * FROM Post WHERE post_id = $1",
  deletePostById: "DELETE FROM Post WHERE post_id = $1",
  updatePostById: "UPDATE Post SET title = $1, body = $2 WHERE post_id = $3",
};