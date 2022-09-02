const express = require("express");
const {
  createPost,
  getPosts,
  fetchSinglePost,
  updatePost,
  deletePost,
} = require("../controllers/post.controller");

const { authenticate, authorize } = require("../middlewares/auth.middleware");

const {
  validatePostInfo,
} = require("../middlewares/postValidation.middleware");
const {} = require("../middlewares/user.middlewares");

const router = express.Router();

router.post(
  "/post/create",
  validatePostInfo,
  authenticate,
  authorize,
  createPost
);

router.get("/post/all", getPosts);

router.get("/post/:id", fetchSinglePost);

router.patch("/post/:id", authenticate, authorize, updatePost);

router.delete("/post/:id", authenticate, authorize, deletePost);

module.exports = router;
