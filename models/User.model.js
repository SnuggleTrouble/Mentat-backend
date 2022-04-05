const mongoose = require("mongoose");
const { Schema, model } = mongoose;

// Create a Schema for the user
const userSchema = new Schema({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
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
});

// Create a model
const User = model("User", userSchema);

// Export the model so that it can be used in other files.
module.exports = User;
