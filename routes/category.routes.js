const express = require("express");
const mongoose = require("mongoose");
const Category = require("../models/Category.model");

const router = express.Router();

// Create a category
router.post("/create", async (req, res) => {
  const { name } = req.body;
  const category = await Category.create({
    name,
    user: req.jwtPayload.user._id,
  });
  res.status(200).json(category);
});

module.exports = router;
