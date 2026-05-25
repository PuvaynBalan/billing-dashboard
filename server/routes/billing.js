const express = require("express")
const { client, campaigns, callAttempts } = require("../data")

const router = express.Router()

router.get("/summary", (_req, res) => {
  const totalSpent = callAttempts.reduce((sum, c) => sum + c.costRm, 0)
  const totalCalls = callAttempts.length
  const totalTalkTimeSeconds = callAttempts.reduce((sum, c) => sum + c.durationSeconds, 0)
  const ptpCount = callAttempts.filter((c) => c.expectedPaymentDate != null).length

  const campaignSummaries = campaigns.map((campaign) => {
    const calls = callAttempts.filter((c) => c.campaignId === campaign.id)
    const totalCost = calls.reduce((sum, c) => sum + c.costRm, 0)
    return {
      name: campaign.name,
      status: campaign.status,
      calls: calls.length,
      talkTimeSeconds: calls.reduce((sum, c) => sum + c.durationSeconds, 0),
      totalCost: parseFloat(totalCost.toFixed(2)),
      ptpCount: calls.filter((c) => c.expectedPaymentDate != null).length
    }
  })

  campaignSummaries.sort((a, b) => b.totalCost - a.totalCost)

  res.json({
    client: { name: client.name },
    balance: {
      remaining: Number(client.balanceRm.toFixed(2)),
      starting: Number(client.startingBalanceRm.toFixed(2))
    },
    summary: {
      totalSpent: parseFloat(totalSpent.toFixed(2)),
      totalCalls,
      totalTalkTimeSeconds,
      ptpCount
    },
    campaigns: campaignSummaries
  })
})

module.exports = router
