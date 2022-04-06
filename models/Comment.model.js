const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const commentSchema = new Schema({
  content: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
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
});

// Exports the model and creates the "Comment" collection in the database.
module.exports = mongoose.model("Comment", commentSchema);