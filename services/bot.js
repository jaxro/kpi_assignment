const axios = require('axios');
const fs = require('fs');

const WEBHOOK_URL = 'https://hooks.slack.com/services/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';  // Replace with your Webhook URL

const sendJsonToSlack = async () => {
  try {
    // Read the JSON file
    const data = fs.readFileSync('daily_kpi.json', 'utf8');
    const jsonData = JSON.parse(data);

    // Prepare the message text
    let messageText = "*📊 Daily KPI Report 📊*\n";

    // Loop through jsonData and format it
    for (const entry of jsonData) {
      if (entry && typeof entry === 'object') {
        // Loop through each key-value pair of the object
        for (const key in entry) {
          if (entry.hasOwnProperty(key)) {
            messageText += `• *${key}:* ${entry[key]}\n`;
          }
        }
      }
    }

    // Send the message to Slack via the Webhook
    await axios.post(WEBHOOK_URL, {
      text: messageText,
    });

    console.log("✅ Data sent to Slack via Webhook!");
  } catch (error) {
    console.error("❌ Error sending data to Slack:", error.message);
  }
};

sendJsonToSlack();
