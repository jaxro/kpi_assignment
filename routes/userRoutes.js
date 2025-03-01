const express = require("express");
const router = express.Router();
const User = require("../models/User");

// Create a new user (new visitor)
router.post("/", async (req, res) => {
  try {
    const { email } = req.body;
    const user = new User({ email });
    await user.save();
    res.status(201).json(user);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get all users
router.get("/", async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
