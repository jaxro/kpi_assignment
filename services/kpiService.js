const fs = require("fs");
const path = require("path");
const mongoose = require("mongoose");
const Visitor = require("../models/Visitor");
const Signup = require("../models/Signup");
const Call = require("../models/Call");
const Subscription = require("../models/Subscription");

const KPI_FILE = path.join(__dirname, "daily_kpi.json");

const getPreviousKPI = () => {
  if (fs.existsSync(KPI_FILE)) {
    try {
      const data = fs.readFileSync(KPI_FILE, "utf8");
      return data ? JSON.parse(data) : [];  
    } catch (err) {
      console.error("Error parsing the KPI file:", err);
      return []; 
    }
  }
  return [];  
};

const saveKPI = (kpi) => {
  let kpiData = [];
  if (fs.existsSync(KPI_FILE)) {
    try {
      const data = fs.readFileSync(KPI_FILE, "utf8");
      kpiData = data ? JSON.parse(data) : []; 
    } catch (err) {
      console.error("Error parsing the KPI file:", err);
      kpiData = []; 
    }
  }

  kpiData.push(kpi);
  try {
    fs.writeFileSync(KPI_FILE, JSON.stringify(kpiData, null, 2));
    console.log("KPI data saved successfully.");
  } catch (err) {
    console.error("Error saving KPI data:", err);
  }
};


const calculatePercentageChange = (current, previous) => {
  if (previous === 0) return current > 0 ? 100 : 0;
  return ((current - previous) / previous) * 100 
};

const generateKPI = async () => {
  await mongoose.connect("mongodb+srv://abhay21:21Blc1377@cluster0.1aa1o.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

  const today = new Date();
  today.setUTCHours(0, 0, 0, 0);
  const yesterday = new Date(today);
  yesterday.setUTCDate(yesterday.getUTCDate() - 1);

  // Fetch current KPI metrics
  const newVisitors = await Visitor.countDocuments({ createdAt: { $gte: today } });
  const newSignups = await Signup.countDocuments({ createdAt: { $gte: today } });

  const firstTimeDemoCalls = await Signup.aggregate([
    { $match: { createdAt: { $gte: today } } },
    {
      $lookup: {
        from: "calls",
        localField: "_id",
        foreignField: "userId",
        as: "calls",
      },
    },
    { $match: { "calls.campaignId": "demo" } },
    { $count: "count" },
  ]);
  const firstTimeDemoCallsCount = firstTimeDemoCalls[0]?.count || 0;

  const totalDemoCalls = await Call.countDocuments({ campaignId: "demo", createdAt: { $gte: today } });
  const subscriptionsCancelled = await Subscription.countDocuments({ status: "canceled", canceledAt: { $gte: today } });
  const newSubscriptions = await Subscription.countDocuments({ createdAt: { $gte: today }, status: "active" });
  const totalActiveSubscriptions = await Subscription.countDocuments({ status: "active" });

  const totalCampaignCalls = await Call.countDocuments({ createdAt: { $gte: today } });
  const callsWithoutErrors = await Call.countDocuments({ createdAt: { $gte: today }, error: null });
  const callsConnected = await Call.countDocuments({ createdAt: { $gte: today }, callStatus: "connected" });
  const longDurationCalls = await Call.countDocuments({ createdAt: { $gte: today }, callDuration: { $gt: 29 } });

  const avgAssistantResponseTimeData = await Call.aggregate([
    { $match: { createdAt: { $gte: today }, assistantResponseTime: { $ne: null } } },
    { $group: { _id: null, avgResponseTime: { $avg: "$assistantResponseTime" } } },
  ]);
  const avgAssistantResponseTime = avgAssistantResponseTimeData[0]?.avgResponseTime?.toFixed(2) || null;

  // Get previous KPI for comparisons
  const previousKPI = getPreviousKPI();

  const kpi = {
    date: today.toISOString().split("T")[0],
    newVisitors: `${newVisitors} (${calculatePercentageChange(newVisitors, previousKPI?.newVisitors || 0)}% more/less than previous visitors)`,
    newSignups: `${newSignups} (${((newSignups / newVisitors) * 100 || 0).toFixed(2)}% of visitors) (${calculatePercentageChange(newSignups, previousKPI?.newSignups || 0)}% more/less than previous signups)`,
    firstTimeDemoCalls: `${firstTimeDemoCallsCount} (${((firstTimeDemoCallsCount / newSignups) * 100 || 0).toFixed(2)}% of signups) (${calculatePercentageChange(firstTimeDemoCallsCount, previousKPI?.firstTimeDemoCalls || 0)}% more/less than previous demo calls)`,
    totalDemoCalls: `${totalDemoCalls} (${calculatePercentageChange(totalDemoCalls, previousKPI?.totalDemoCalls || 0)}% more/less than previous total demo calls)`,
    subscriptionsCancelled: `${subscriptionsCancelled}`,
    newSubscriptions: `${newSubscriptions} (${((newSubscriptions / newSignups) * 100 || 0).toFixed(2)}% of signups) (${((newSubscriptions / firstTimeDemoCallsCount) * 100 || 0).toFixed(2)}% of signups that placed demo calls)`,
    totalActiveSubscriptions: `${totalActiveSubscriptions} (${totalActiveSubscriptions === (previousKPI?.totalActiveSubscriptions || 0) ? "No change from previous subscriptions" : `${calculatePercentageChange(totalActiveSubscriptions, previousKPI?.totalActiveSubscriptions || 0)}% more/less than previous subscriptions`})`,
    totalCampaignCalls: `${totalCampaignCalls} (${calculatePercentageChange(totalCampaignCalls, previousKPI?.totalCampaignCalls || 0)}% more/less than previous campaign calls)`,
    callsWithoutErrors: `${callsWithoutErrors} (${((callsWithoutErrors / totalCampaignCalls) * 100 || 0).toFixed(2)}% of campaign calls)`,
    callsConnected: `${callsConnected} (${((callsConnected / callsWithoutErrors) * 100 || 0).toFixed(2)}% of calls placed without errors)`,
    longDurationCalls: `${longDurationCalls} (${((longDurationCalls / callsConnected) * 100 || 0).toFixed(2)}% of calls connected)`,
    avgAssistantResponseTime: avgAssistantResponseTime ? `${avgAssistantResponseTime} (${calculatePercentageChange(avgAssistantResponseTime, previousKPI?.avgAssistantResponseTime || 0)}% more/less than previous average)` : "null",
  };

  saveKPI(kpi);
  console.log("KPI for today saved:", kpi);

  mongoose.connection.close();
};

generateKPI();
