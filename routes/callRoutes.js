const express = require("express");
const router = express.Router();
const Call = require("../models/Call");

// Create a new call
router.post("/", async (req, res) => {
  try {
    const call = new Call(req.body);
    await call.save();
    res.status(201).json(call);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get all calls
router.get("/", async (req, res) => {
  try {
    const calls = await Call.find();
    res.json(calls);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.post("/visitor", async (req, res) => {
  try {
    const call = new Call(req.body);
    await call.save();
    res.status(201).json(call);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});
router.post("/visitor", async (req, res) => {
  try {
    const call = new Call(req.body);
    await call.save();
    res.status(201).json(call);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
