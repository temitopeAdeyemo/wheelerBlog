const {
  createPost,
  getPosts,
  getPostById,
  updatePostById,
  deletePost,
} = require("../service/post.service");

class PostController {
  static async createPost(req, res, next) {
    const { body, title } = req.body;
    const { username: poster_username } = req.user;
    const newPost = await createPost({ poster_username, body, title });
    return res.status(201).json({
      message: `Hi ${poster_username}, Your post has been posted`,
    });
  }

  static async getPosts(req, res, next) {
    try {
      const posts = await getPosts();
      return res.status(201).json({
        message: `Hi, Your post has been fetched successfully`,
        posts,
      });
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  static async fetchSinglePost(req, res, next) {
    try {
      const post = await getPostById(req.params.id);
      post
        ? res.status(200).json({
            message: `Hi, Your post has been fetched successfully`,
            post,
          })
        : res.status(404).json({
            message: `Post not found`,
          });
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  static async updatePost(req, res, next) {
    await updatePostById(req.params.id, req.body.title, req.body.body);
    return res.status(200).json({
      message: `Hi, Your post has been updated successfully`,
    });
  }

  static async deletePost(req, res, next) {
    deletePost(req.params.id);
    return res.status(200).json({
      message: `Hi, Your post has been deleted successfully`,
    });
  }

  static async likeUnlikePost(req, res, next) {
    const { username } = req.user;
    const post = await getPostById(req.params.id);

    post
      ? res.status(200).json({
          message: `Hi, Your post has been fetched successfully`,
          post,
        })
      : res.status(404).json({
          message: `Post not found`,
        });

    let postLikes = post.likedBy;

    if (postLikes.includes(req.user.username)) {
      postLikes.splice(postLikes.indexOf(username), 1);
      await pool.query("UPDATE POST SET likedBy = $1 WHERE post_id = $2", [
        postLikes,
        req.params.id,
      ]);
    } else {
      postLikes.push(username);
      await pool.query("UPDATE POST SET likedBy = $1 WHERE post_id = $2", [
        postLikes,
        req.params.id,
      ]);
    }
    return res.status(200).json({
      message: `Hi, You just liked this post.`,
    });
  }
}

module.exports = PostController;
