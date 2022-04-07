const express = require("express");
const Comment = require("../models/Comment.model");
const Post = require("../models/Post.model");

const router = express.Router();

// This function needs testing 
router.post("/create/:id", async (req, res) => {
  const { content } = req.body;
  // Acquire the post
  const post = await Post.findById(req.params.id);
  // Create the comment
  const comment = await Comment.create({
    content,
    user: req.jwtPayload.user._id,
  });
  await comment.save();
  // Appent the comment to the post
  post.comments.push(comment.id);
  await post.save();
  res.status(200).json(comment);
});

module.exports = router;
