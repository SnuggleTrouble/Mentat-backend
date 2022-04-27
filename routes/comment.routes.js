const express = require("express");
const Comment = require("../models/Comment.model");
const Post = require("../models/Post.model");

const router = express.Router();

// The Comment Route
router.post("/:id", async (req, res) => {
  const { commentContent } = req.body;
  // Acquire the post
  const post = await Post.findById(req.params.id);
  // Create the comment
  const comment = await Comment.create({
    commentContent,
    user: req.jwtPayload.user.userName,
  });
  await comment.save();
  // Append the comment to the post
  post.comments.push(comment.id);
  await post.save();
  res.status(200).json(comment);
});

// Edit a comment by id
router.put("/:id", async (req, res) => {
  const { id } = req.params;
  const { commentContent } = req.body;
  console.log(commentContent);
  let comment = await Comment.findById(id);
  if (comment.user.toString() === req.jwtPayload.user._id) {
    comment.commentContent = commentContent;
    comment = await comment.save();
    res.status(200).json(comment);
  } else {
    res.status(400).json("You're not authorized to do that");
  }
});

// Delete a comment by id
router.delete("/:id", async (req, res) => {
  const { id } = req.params;
  const comment = await Comment.findById(id);
  console.log(comment, req.jwtPayload.user);
  if (comment.user == req.jwtPayload.user.userName) {
    await Comment.findByIdAndDelete(id);
    res.status(200).json("Deleted successful");
  } else {
    res.status(400).json("You're not authorized to do that");
  }
});

module.exports = router;
