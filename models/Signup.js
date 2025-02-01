const mongoose = require("mongoose");

const signupSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Signup", signupSchema);
