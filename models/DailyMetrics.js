const mongoose = require("mongoose");

const DailyMetricsSchema = new mongoose.Schema({
  date: { type: Date, unique: true },
  newVisitors: { type: Number, default: 0 },
  newSignups: { type: Number, default: 0 },
  signupsWithDemoCall: { type: Number, default: 0 },
  totalDemoCalls: { type: Number, default: 0 },
  subscriptionsCanceled: { type: Number, default: 0 },
  newSubscriptions: { type: Number, default: 0 },
  activeSubscriptions: { type: Number, default: 0 },
  totalCampaignCalls: { type: Number, default: 0 },
  callsWithoutErrors: { type: Number, default: 0 },
  callsConnected: { type: Number, default: 0 },
  callsLongerThan29Sec: { type: Number, default: 0 },
  avgAssistantResponseTime: { type: Number, default: null }
});

module.exports = mongoose.model("DailyMetrics", DailyMetricsSchema);
