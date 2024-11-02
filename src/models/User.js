const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  _id: { type: String, required: true }, // Use wallet address as _id
  apiKey: { type: String, required: true },
});

module.exports = mongoose.model("User", userSchema);
