const mongoose = require("mongoose");

const visitorSchema = new mongoose.Schema({
  ipAddress: { type: String, required: true },
  userAgent: String,
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Visitor", visitorSchema);
