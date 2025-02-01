const express = require("express");
const router = express.Router();
const User = require("../models/User");
const Call = require("../models/Call");
const Subscription = require("../models/Subscription");

// Get KPI metrics for a given date
router.get("/:date", async (req, res) => {
  try {
    const date = new Date(req.params.date);
    const startOfDay = new Date(date.setUTCHours(0, 0, 0, 0));
    const endOfDay = new Date(date.setUTCHours(23, 59, 59, 999));

    // Calculate KPIs
    const newVisitors = await User.countDocuments({ createdAt: { $gte: startOfDay, $lte: endOfDay } });
    const newSignups = newVisitors; // Assuming all visitors signed up
    const signupsWithDemoCall = await Call.distinct("userId", { campaignId: "demo", createdAt: { $gte: startOfDay, $lte: endOfDay } }).length;
    const totalDemoCalls = await Call.countDocuments({ campaignId: "demo", createdAt: { $gte: startOfDay, $lte: endOfDay } });
    const subscriptionsCanceled = await Subscription.countDocuments({ status: "canceled", canceledAt: { $gte: startOfDay, $lte: endOfDay } });
    const newSubscriptions = await Subscription.countDocuments({ createdAt: { $gte: startOfDay, $lte: endOfDay }, status: "active" });
    const activeSubscriptions = await Subscription.countDocuments({ status: "active" });
    const totalCampaignCalls = await Call.countDocuments({ createdAt: { $gte: startOfDay, $lte: endOfDay } });
    const callsWithoutErrors = await Call.countDocuments({ createdAt: { $gte: startOfDay, $lte: endOfDay }, error: { $exists: false } });
    const callsConnected = await Call.countDocuments({ createdAt: { $gte: startOfDay, $lte: endOfDay }, callStatus: "connected" });
    const callsLongerThan29Sec = await Call.countDocuments({ createdAt: { $gte: startOfDay, $lte: endOfDay }, callDuration: { $gt: 29 } });

    // Calculate Average Assistant Response Time
    const responseTimes = await Call.find({ createdAt: { $gte: startOfDay, $lte: endOfDay } }).select("assistantResponseTime");
    const avgAssistantResponseTime =
      responseTimes.length > 0 ? responseTimes.reduce((sum, call) => sum + call.assistantResponseTime, 0) / responseTimes.length : null;

    // Return response
    res.json({
      date: startOfDay,
      newVisitors,
      newSignups,
      signupsWithDemoCall,
      totalDemoCalls,
      subscriptionsCanceled,
      newSubscriptions,
      activeSubscriptions,
      totalCampaignCalls,
      callsWithoutErrors,
      callsConnected,
      callsLongerThan29Sec,
      avgAssistantResponseTime,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
