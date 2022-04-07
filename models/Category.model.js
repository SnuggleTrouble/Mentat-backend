const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const categorySchema = new Schema({
  name: {
    type: String,
    required: true,
  },
});

// Create a model
const Category = model("Category", categorySchema);

// Export the model so that it can be used in other files.
module.exports = Category;
