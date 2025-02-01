const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  email: { type: String, unique: true },
  createdAt: { type: Date, default: Date.now },
  firstDemoCallAt: { type: Date, default: null }
});

module.exports = mongoose.model("User", UserSchema);
