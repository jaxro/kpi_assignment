# Daily KPI Automation

## Description

This project automates the process of generating and presenting daily Key Performance Indicators (KPIs) for a product. The script extracts data from a database, processes it into a structured format, and sends it to a Slack channel for easy monitoring.

## Features

* **Automated KPI Reporting** : Generates and delivers daily KPI reports.
* **Database Integration** : Fetches relevant data from MongoDB.
* **Slack Integration** : Sends KPI reports to a Slack channel.
* **JSON Output** : Provides structured KPI data for further analysis.

## Folder Structure

```
.
├── models/                 # Database schemas
│   ├── Call.js             # Schema for call data
│   ├── DailyMetrics.js     # Schema for daily KPIs
│   ├── Signup.js           # Schema for user signups
│   ├── Subscription.js     # Schema for subscriptions
│   ├── User.js             # Schema for user data
│   ├── Visitor.js          # Schema for visitor tracking
│   ├── insertSampleData.js # Script to populate sample data
│
├── routes/                 # API route handlers
│   ├── callRoutes.js
│   ├── metricsRoutes.js
│   ├── subscriptionRoutes.js
│   ├── userRoutes.js
│
├── services/               # Business logic and external integrations
│   ├── bot.js              # Handles Slack integration
│   ├── kpiService.js       # Fetches and processes KPI data
│
├── daily_kpi.json          # Sample daily KPI output
├── README.md               # Project documentation
├── CHANGELOG.md            # Record of changes
└── package.json            # Project dependencies and scripts
```

## Setup Instructions

### Prerequisites

* **Node.js** (>= 16.x)
* **MongoDB**
* **Slack Webhook URL**

### Installation

1. **Clone the repository:**
   ```sh
   git clone https://github.com/yourusername/daily-kpi-automation.git
   cd daily-kpi-automation
   ```
2. **Install dependencies:**
   ```sh
   npm install
   ```
3. **Set up environment variables:**
   Create a `.env` file and configure the following:
   ```env
   MONGO_URI=mongodb://localhost:27017/kpiDB
   SLACK_WEBHOOK_URL=https://hooks.slack.com/services/your/webhook/url
   ```
4. **Start the application:**
   ```sh
   node kpiService.js
   ```

## Usage

* **Data Extraction** : The script fetches KPI data from MongoDB using `kpiService.js`.
* **Data Processing** : The collected data is structured into JSON format.
* **Data Transmission** : The processed KPI report is sent to Slack via `bot.js`.
* **API Access** : API endpoints are available via `routes/` for further integrations.

## Sample KPI Output (`daily_kpi.json`)

```json
[
  {
    "date": "2025-02-01",
    "newVisitors": "5 (100% more/less than previous visitors)",
    "newSignups": "5 (100.00% of visitors) (100% more/less than previous signups)",
    "firstTimeDemoCalls": "3 (60.00% of signups) (100% more/less than previous demo calls)",
    "totalDemoCalls": "3 (100% more/less than previous total demo calls)",
    "subscriptionsCancelled": "0",
    "newSubscriptions": "0 (0.00% of signups) (0.00% of signups that placed demo calls)",
    "totalActiveSubscriptions": "3 (100% more/less than previous subscriptions)",
    "totalCampaignCalls": "5 (100% more/less than previous campaign calls)",
    "callsWithoutErrors": "4 (80.00% of campaign calls)",
    "callsConnected": "4 (100.00% of calls placed without errors)",
    "longDurationCalls": "3 (75.00% of calls connected)",
    "avgAssistantResponseTime": "null"
  }
]
```

## Assumptions

* The database follows the schema defined in `models/`.
* KPI data is updated daily and stored uniquely for each date.
* Slack webhook URL is correctly configured for message delivery.
* Metrics calculations (e.g., percentages) are handled within `kpiService.js`.

## Future Enhancements

* **Dashboard Development** : Implement a web-based dashboard for KPI visualization.
* **Authentication** : Secure API routes with authentication.
* **Enhanced Logging** : Improve error handling and logging mechanisms.

