const mongoose = require("mongoose");
const { schema } = require("./User.model");
const { Shcema, model } = mongoose;

const commentSchema = new schema({
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
  author: {
    type: mongoose.SchemaTypes.ObjectId,
    ref: "User",
    required: true,
  },
});

// Exports the model and creates the "Comment" collection in the database.
module.exports = mongoose.model("Comment", commentSchema);