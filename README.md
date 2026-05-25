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

---

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
