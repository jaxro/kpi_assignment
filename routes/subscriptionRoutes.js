const express = require("express");
const router = express.Router();
const Subscription = require("../models/Subscription");

// Create a new subscription
router.post("/", async (req, res) => {
  try {
    const subscription = new Subscription(req.body);
    await subscription.save();
    res.status(201).json(subscription);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Cancel a subscription
router.put("/cancel/:id", async (req, res) => {
  try {
    const { id } = req.params;
    await Subscription.findByIdAndUpdate(id, { status: "canceled", canceledAt: new Date() });
    res.json({ message: "Subscription canceled successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get all subscriptions
router.get("/", async (req, res) => {
  try {
    const subscriptions = await Subscription.find();
    res.json(subscriptions);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
