const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const commentSchema = new Schema({
  commentContent: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
    immutable: true,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
    immutable: false,
  },
  // Refers to the User Model
  user: {
    type: String,
    required: true,
  },
});

// Exports the model and creates the "Comment" collection in the database.
module.exports = mongoose.model("Comment", commentSchema);