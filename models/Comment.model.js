const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const commentSchema = new Schema(
  {
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
  },
  { timestamps: true }
);

// Create a model
const Comment = model("Comment", commentSchema);

// Export the model so that it can be used in other files.
module.exports = Comment;
