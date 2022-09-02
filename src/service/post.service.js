const pool = require("../database/pgsql");
const {
  findPost,
  findPostById,
  deletePostById,
  updatePostById,
} = require("../database/queries/post.query");
const Post = require("../models/post.model");

class PostService {
  static async createPost(instanceObject) {
    const post = new Post(instanceObject);
    const newPost = await post.save();
    return newPost || null;
  }

  static async getPosts() {
    const postExists = await pool.query(findPost);
    // console.log(postExists.rows[0]);
    return postExists.rows[0] ? postExists.rows : "No post found.";
  }

  static async getPostById(post_id) {
    const postExists = await pool.query(findPostById, [post_id]);
    return postExists.rows[0] ? postExists.rows[0] : null;
  }

  static async updatePostById( post_id, title, body) {
    const post = await pool.query(findPostById, [post_id]);
    const updatedPost = await pool.query(updatePostById, [
      title || post.title,
      body || post.body,
      post_id,
    ]);
    return updatedPost.rows ? updatedPost.rows[0] : null;
  }

  static async deletePost(post_id) {
    const deletePost = await pool.query(deletePostById, [post_id]);
    return deletePost.rows[0] ? deletePost.rows[0] : null;
  }
}

module.exports = PostService;
