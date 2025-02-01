const { MongoClient, ObjectId } = require("mongodb");

const uri = "mongodb+srv://abhay21:21Blc1377@cluster0.1aa1o.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"; // Update if needed
const dbName = "test"; // Replace with your database name

const client = new MongoClient(uri, { useNewUrlParser: true });

async function insertData() {
  try {
    await client.connect();
    console.log("Connected to MongoDB");

    const db = client.db(dbName);

    // Insert Visitors
    await db.collection("visitors").insertMany([
      { createdAt: new Date("2025-02-01T09:00:00.000Z") },
      { createdAt: new Date("2025-02-01T10:15:00.000Z") },
      { createdAt: new Date("2025-02-01T11:30:00.000Z") },
      { createdAt: new Date("2025-02-01T13:00:00.000Z") },
      { createdAt: new Date("2025-02-01T14:45:00.000Z") },
    ]);

    // Insert Signups (Fixed ObjectIds)
    await db.collection("signups").insertMany([
      { _id: new ObjectId("65a123456789abcd00001011"), createdAt: new Date("2025-02-01T09:15:00.000Z") },
      { _id: new ObjectId("65a123456789abcd00001234"), createdAt: new Date("2025-02-01T10:45:00.000Z") },
      { _id: new ObjectId("65a123456789abcd00001456"), createdAt: new Date("2025-02-01T12:00:00.000Z") },
      { _id: new ObjectId("65a123456789abcd00001678"), createdAt: new Date("2025-02-01T13:30:00.000Z") },
      { _id: new ObjectId("65a123456789abcd00001890"), createdAt: new Date("2025-02-01T15:00:00.000Z") },
    ]);

    // Insert Calls (Fixed ObjectIds)
    await db.collection("calls").insertMany([
      { userId: new ObjectId("65a123456789abcd00001011"), campaignId: "demo", createdAt: new Date("2025-02-01T10:00:00.000Z"), callStatus: "connected", callDuration: 40 },
      { userId: new ObjectId("65a123456789abcd00001234"), campaignId: "demo", createdAt: new Date("2025-02-01T11:15:00.000Z"), callStatus: "connected", callDuration: 25 },
      { userId: new ObjectId("65a123456789abcd00001456"), campaignId: "marketing", createdAt: new Date("2025-02-01T12:30:00.000Z"), callStatus: "failed", callDuration: 0, error: "Timeout" },
      { userId: new ObjectId("65a123456789abcd00001678"), campaignId: "demo", createdAt: new Date("2025-02-01T14:00:00.000Z"), callStatus: "connected", callDuration: 45 },
      { userId: new ObjectId("65a123456789abcd00001890"), campaignId: "sales", createdAt: new Date("2025-02-01T16:15:00.000Z"), callStatus: "connected", callDuration: 50 },
    ]);

    // Insert Subscriptions (Fixed ObjectIds)
    await db.collection("subscriptions").insertMany([
      { userId: new ObjectId("65a123456789abcd00001011"), createdAt: new Date("2025-02-01T09:30:00.000Z"), status: "Trial Monthly", canceledAt: null },
      { userId: new ObjectId("65a123456789abcd00001234"), createdAt: new Date("2025-02-01T10:50:00.000Z"), status: "Starter Yearly", canceledAt: new Date("2025-02-01T17:00:00.000Z") },
      { userId: new ObjectId("65a123456789abcd00001456"), createdAt: new Date("2025-02-01T12:10:00.000Z"), status: "Growth Monthly", canceledAt: null },
      { userId: new ObjectId("65a123456789abcd00001678"), createdAt: new Date("2025-02-01T13:45:00.000Z"), status: "Elite Monthly", canceledAt: null },
      { userId: new ObjectId("65a123456789abcd00001890"), createdAt: new Date("2025-02-01T15:30:00.000Z"), status: "Growth Yearly", canceledAt: null },
    ]);

    console.log("✅ Sample data inserted successfully!");
  } catch (error) {
    console.error("❌ Error inserting data:", error);
  } finally {
    await client.close();
  }
}

insertData();
