const client = { id: 1, name: "BK COLLECTIONS", balanceRm: 450, startingBalanceRm: 600 }

const campaigns = [
  { id: 1, name: "May Overdue Batch", status: "completed", createdAt: "2026-05-10" },
  { id: 2, name: "April Follow-Up", status: "completed", createdAt: "2026-04-22" },
  { id: 3, name: "New Leads June", status: "running", createdAt: "2026-05-18" }
]

const callAttempts = [
  { id: 1, campaignId: 1, durationSeconds: 142, costRm: 0.82, endedReason: "customer-ended-call", expectedPaymentDate: "2026-05-30" },
  { id: 2, campaignId: 1, durationSeconds: 0, costRm: 0.10, endedReason: "customer-did-not-answer", expectedPaymentDate: null },
  { id: 3, campaignId: 1, durationSeconds: 98, costRm: 0.55, endedReason: "assistant-ended-call", expectedPaymentDate: null },
  { id: 4, campaignId: 1, durationSeconds: 210, costRm: 1.23, endedReason: "customer-ended-call", expectedPaymentDate: "2026-06-05" },
  { id: 5, campaignId: 1, durationSeconds: 0, costRm: 0.10, endedReason: "customer-busy", expectedPaymentDate: null },
  { id: 6, campaignId: 2, durationSeconds: 185, costRm: 1.07, endedReason: "assistant-ended-call", expectedPaymentDate: "2026-05-20" },
  { id: 7, campaignId: 2, durationSeconds: 0, costRm: 0.10, endedReason: "customer-did-not-answer", expectedPaymentDate: null },
  { id: 8, campaignId: 2, durationSeconds: 301, costRm: 1.74, endedReason: "customer-ended-call", expectedPaymentDate: "2026-05-28" },
  { id: 9, campaignId: 3, durationSeconds: 120, costRm: 0.70, endedReason: "assistant-ended-call", expectedPaymentDate: null },
  { id: 10, campaignId: 3, durationSeconds: 0, costRm: 0.10, endedReason: "customer-busy", expectedPaymentDate: null }
]

module.exports = { client, campaigns, callAttempts }
