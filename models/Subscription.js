const mongoose = require("mongoose");

const subscriptionSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "Signup", required: true },
  plan: { type: String, required: true, enum: ["Trial Monthly", "Trial Yearly", "Starter Monthly", "Starter Yearly", "Growth Monthly", "Growth Yearly", "Elite Monthly", "Elite Yearly"] },
  status: { type: String, required: true, enum: ["active", "canceled", "expired"] },
  createdAt: { type: Date, default: Date.now },
  canceledAt: { type: Date, default: null },
});

module.exports = mongoose.model("Subscription", subscriptionSchema);
