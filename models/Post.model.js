const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const postSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    content: {
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
      type: mongoose.SchemaTypes.ObjectId,
      ref: "User",
      required: true,
    },
    // Refers to the Comment Model
    comments: {
      type: [mongoose.SchemaTypes.ObjectId],
      default: [],
      ref: "Comment",
    },
    category: {
      type: String,
    },
    support: {
      type: Array,
      default: [],
    },
  },
  { timestamps: true }
);

// Create a model
const Post = model("Post", postSchema);

// Export the model so that it can be used in other files.
module.exports = Post;
