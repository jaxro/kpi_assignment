const { MongoClient, ObjectId } = require("mongodb");

const uri = "mongodb://localhost:27017"; // Update if needed
const dbName = "test"; // Replace with your database name

const client = new MongoClient(uri, { useNewUrlParser: true });

async function insertData() {
  try {
    await client.connect();
    console.log("Connected to MongoDB");

    const db = client.db(dbName);

    // Insert Visitors
    await db.collection("visitors").insertMany([
      { createdAt: new Date("2025-01-30T10:15:00.000Z") },
      { createdAt: new Date("2025-01-30T11:30:00.000Z") },
      { createdAt: new Date("2025-01-30T12:45:00.000Z") },
      { createdAt: new Date("2025-01-30T14:00:00.000Z") },
      { createdAt: new Date("2025-01-30T15:20:00.000Z") },
    ]);

    // Insert Signups (Fixed ObjectIds)
    await db.collection("signups").insertMany([
      { _id: new ObjectId("65a123456789abcd00000123"), createdAt: new Date("2025-01-30T10:20:00.000Z") },
      { _id: new ObjectId("65a123456789abcd00000456"), createdAt: new Date("2025-01-30T11:40:00.000Z") },
      { _id: new ObjectId("65a123456789abcd00000789"), createdAt: new Date("2025-01-30T13:15:00.000Z") },
      { _id: new ObjectId("65a123456789abcd00000999"), createdAt: new Date("2025-01-30T14:30:00.000Z") },
      { _id: new ObjectId("65a123456789abcd00000888"), createdAt: new Date("2025-01-30T16:10:00.000Z") },
    ]);

    // Insert Calls (Fixed ObjectIds)
    await db.collection("calls").insertMany([
      { userId: new ObjectId("65a123456789abcd00000123"), campaignId: "demo", createdAt: new Date("2025-01-30T11:00:00.000Z"), callStatus: "connected", callDuration: 35 },
      { userId: new ObjectId("65a123456789abcd00000456"), campaignId: "demo", createdAt: new Date("2025-01-30T12:10:00.000Z"), callStatus: "connected", callDuration: 20 },
      { userId: new ObjectId("65a123456789abcd00000789"), campaignId: "marketing", createdAt: new Date("2025-01-30T13:50:00.000Z"), callStatus: "failed", callDuration: 0, error: "Network issue" },
      { userId: new ObjectId("65a123456789abcd00000999"), campaignId: "demo", createdAt: new Date("2025-01-30T15:25:00.000Z"), callStatus: "connected", callDuration: 50 },
      { userId: new ObjectId("65a123456789abcd00000888"), campaignId: "sales", createdAt: new Date("2025-01-30T17:30:00.000Z"), callStatus: "connected", callDuration: 45 },
    ]);

    // Insert Subscriptions (Fixed ObjectIds)
    await db.collection("subscriptions").insertMany([
      { userId: new ObjectId("65a123456789abcd00000123"), createdAt: new Date("2025-01-30T10:25:00.000Z"), status: "Trial Monthly", canceledAt: null },
      { userId: new ObjectId("65a123456789abcd00000456"), createdAt: new Date("2025-01-30T11:50:00.000Z"), status: "Starter Yearly", canceledAt: new Date("2025-01-30T18:00:00.000Z") },
      { userId: new ObjectId("65a123456789abcd00000789"), createdAt: new Date("2025-01-30T12:35:00.000Z"), status: "Growth Monthly", canceledAt: null },
      { userId: new ObjectId("65a123456789abcd00000999"), createdAt: new Date("2025-01-30T14:45:00.000Z"), status: "Elite Monthly", canceledAt: null },
      { userId: new ObjectId("65a123456789abcd00000888"), createdAt: new Date("2025-01-30T16:20:00.000Z"), status: "Growth Yearly", canceledAt: null },
    ]);

    console.log("✅ Sample data inserted successfully!");
  } catch (error) {
    console.error("❌ Error inserting data:", error);
  } finally {
    await client.close();
  }
}

insertData();
