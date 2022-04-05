const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const categorySchema = new Schema({
  name: {
    type: String,
    required: true,
  },
});

// Exports the model and creates the "Category" collection in the database.
module.exports = mongoose.model("Category", categorySchema);