# BK Collections — Client Billing Dashboard

A full-stack client billing dashboard built for Xanderia.
Shows a logged-in client their spend, broken down by campaign,
with a running balance.

---

## Tech Stack

- **Frontend:** React, Vite, Tailwind CSS, Lucide React
- **Backend:** Node.js, Express
- **Database:** Not required — data is seeded in server/data.js

---

## Project Structure

```
billing-dashboard/
  client/               ← FRONTEND
    src/
      assets/           ← images and logos
      components/       ← UI building blocks
      utils/            ← helper functions
      App.jsx           ← main React file
  server/               ← BACKEND
    routes/
      billing.js        ← where all the calculations happen
    data.js             ← seeded mock data
    index.js            ← Express server
  package.json          ← runs both concurrently
  README.md
```

## Calculation Structure

```
callAttempts (10 rows of data)
        │
        ├── .length         → totalCalls = 10
        │
        ├── .reduce(costRm) → totalSpent = RM 6.51
        │
        ├── .reduce(seconds)→ talkTime = 1056s = 0h 17m 36s
        │
        ├── .filter(date)   → ptpCount = 4
        │    .length
        │
        └── .map(campaigns) → per campaign stats
              │
              ├── Campaign 1: 5 calls, RM 2.80, 2 PTPs
              ├── Campaign 2: 3 calls, RM 2.91, 2 PTPs
              └── Campaign 3: 2 calls, RM 0.80, 0 PTPs
                    │
                    └── .sort() → highest cost first

---

## Data Journey

```

YOU TYPE: npm run dev
↓
concurrently starts TWO things:
node server/index.js → backend on port 3000
vite → frontend on port 5173
↓
YOU OPEN: localhost:5173 in browser
↓
React app loads in browser
↓
App.jsx runs
↓
useState(null) creates empty data box
↓
useEffect fires automatically
↓
fetch() sends request to localhost:3000/api/billing/summary
↓
Express receives the request
↓
Routes to billing.js
↓
billing.js reads data from data.js
↓
Runs 5 calculations:

1. totalCalls = 10
2. totalSpent = 6.51
3. talkTimeSeconds = 1056
4. ptpCount = 4
5. campaignData = [3 campaigns sorted by cost]
   ↓
   res.json() sends clean JSON back to React
   ↓
   React receives JSON
   ↓
   setData(json) fills the data box
   ↓
   React automatically refreshes the screen
   ↓
   BK COLLECTIONS sees their dashboard

## Getting Started

### 1. Clone the repository

```cmd
git clone https://github.com/PuvaynBalan/billing-dashboard.git
cd billing-dashboard
```

### 2. Install dependencies

```cmd
npm install
npm install --prefix client
```

### 3. Start the app

```cmd
npm run dev
```

### 4. Open in your browser

- **Frontend:** http://localhost:5173
- **Backend API:** http://localhost:3000/api/billing/summary

---

## Making Changes

After modifying any file, push your changes to GitHub:

```cmd
git add .
git commit -m "describe what you changed"
git push
```
