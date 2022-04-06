const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const postSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
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
  // Refers to the Category Model
  category: {
    type: [mongoose.SchemaTypes.ObjectId],
    default: [],
    ref: "Category",
    required: true,
  },
});

// Exports the model and creates the "Post" collection in the database.
module.exports = mongoose.model("Post", postSchema);