const express = require("express");
const mongoose = require("mongoose");
const Post = require("../models/Post.model");
const { route } = require("./auth.routes");

const router = express.Router();

// Create a post
router.post("/", async (req, res) => {
  const { title, content, category } = req.body;
  const post = await Post.create({
    title,
    content,
    category, 
    user: req.jwtPayload.user._id,
  });
  res.status(200).json(post);
});

// Acquire all posts
router.get("/", async (req, res) => {
  const posts = await Post.find().populate("user");
  res.status(200).json(posts);
});

// Acquire all posts for a user
router.get("/owned", async (req, res) => {
  // Find posts associated with a user
  const posts = await Post.find({
    user: req.jwtPayload.user._id,
  }).populate("user");
  res.status(200).json(posts);
});

// Acquire one post by id
router.get("/:id", async (req, res) => {
  const { id } = req.params;
  const post = await Post.findById(id).populate("comments").populate("user");
  res.status(200).json(post);
});

// Acquire posts by category
router.post ("/categories", async (req, res) => {
  const posts = await Post.find({category: req.body.category}).populate("user");
  res.status(200).json(posts);
});

// Edit a post by id
router.put("/:id", async (req, res) => {
  const { id } = req.params;
  const { title, content, category } = req.body;
  let post = await Post.findById(id);
  if (post.user.toString() === req.jwtPayload.user._id) {
    post.title = title;
    post.content = content;
    post.category = category;
    post = await post.save();
    res.status(200).json(post);
  } else {
    res.status(400).json("You're not authorized to do that");
  }
});

// Delete a post by id
router.delete("/:id", async (req, res) => {
  const { id } = req.params;
  const post = await Post.findById(id);
  if (post.user.toString() === req.jwtPayload.user._id) {
    await Post.findByIdAndDelete(id);
    res.status(200).json(post);
  } else {
    res.status(400).json("You're not authorized to do that");
  }
});

// Support a post by id
router.put("/:id/support", async (req, res) => {
  const { id } = req.params;
  const { support } = req.body;
  try {
    const post = await Post.findByIdAndUpdate(id, { support });
  } catch (error) {
    res.status(400).json("You're not authorized to do that");
  }
});

// Unsupport a post by id
router.put("/:id/unsupport", async (req, res) => {
  const { id } = req.params;
  const { support } = req.body;
  try {
    const post = await Post.findById(id ); 
    const filterId = post.support.filter((cancel) => {
      return cancel !== support 
      }) 
      post.support = filterId
      post.save()
  } catch (error) {
    res.status(400).json("You're not authorized to do that");
  }
});

module.exports = router;
