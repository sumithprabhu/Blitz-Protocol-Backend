const mongoose = require('mongoose');

const blitzSchema = new mongoose.Schema({
  protocolName: { type: String, required: true },
  contractAddress: { type: String, required: true, unique: true },
  imageUrl: { type: String },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Blitz', blitzSchema);
