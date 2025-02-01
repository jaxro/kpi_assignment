const mongoose = require("mongoose");

const callSchema = new mongoose.Schema({
  callId: { type: mongoose.Schema.Types.ObjectId, required: true, unique: true },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "Signup", required: true },
  campaignId: { type: String, required: true },
  callDuration: { type: Number, required: true },
  callStatus: { type: String, enum: ["connected", "failed", "missed"], required: true },
  assistantResponseTime: { type: Number, default: null },
  error: { type: String, default: null },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Call", callSchema);
