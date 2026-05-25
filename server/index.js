const express = require("express")
const cors = require("cors")
const billingRoutes = require("./routes/billing")

const app = express()
const PORT = 3000

app.use(cors({
  origin: /^http:\/\/localhost:\d+$/
}))

app.use("/api/billing", billingRoutes)

app.listen(PORT, () => {
  console.log(`Billing API running at http://localhost:${PORT}`)
})
