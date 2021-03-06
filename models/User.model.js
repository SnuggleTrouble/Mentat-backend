const mongoose = require("mongoose");
const { Schema, model } = mongoose;

// Create a Schema for the user
const userSchema = new Schema({
  userName: {
    type: String,
    required: true,
    unique: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
    immutable: true,
  },
}, { timestamps: true });

// Create a model
const User = model("User", userSchema);

// Export the model so that it can be used in other files.
module.exports = User;
