import { useEffect, useState } from "react"
import {
  Clock,
  DollarSign,
  Handshake,
  Loader2,
  Phone
} from "lucide-react"
import { formatTime } from "./utils/formatTime"
import Navbar from "./components/Navbar"

const API_URL = "http://localhost:3000/api/billing/summary"

function formatRm(amount) {
  return `RM ${amount.toFixed(2)}`
}

function getBalanceBarColor(percent) {
  if (percent > 40) return "bg-emerald-500"
  if (percent >= 20) return "bg-amber-500"
  return "bg-red-500"
}

function StatusBadge({ status }) {
  const isRunning = status === "running"
  return (
    <span className="inline-flex items-center gap-2 text-sm text-slate-300">
      <span
        className={`h-2 w-2 rounded-full ${isRunning ? "bg-emerald-400" : "bg-slate-500"}`}
      />
      {isRunning ? "Running" : "Completed"}
    </span>
  )
}

function SummaryCard({ icon: Icon, label, value }) {
  return (
    <div className="rounded-xl bg-slate-800 p-5 shadow-sm ring-1 ring-slate-700/50">
      <div className="mb-3 flex items-center gap-2">
        <Icon className="h-4 w-4 text-slate-400" strokeWidth={1.75} />
        <span className="text-xs font-medium uppercase tracking-wide text-slate-400">
          {label}
        </span>
      </div>
      <p className="text-xl font-semibold text-white">{value}</p>
    </div>
  )
}

export default function App() {
  const [data, setData] = useState(null)
  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch(API_URL)
      .then((res) => {
        if (!res.ok) throw new Error("Failed to load billing data")
        return res.json()
      })
      .then(setData)
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false))
  }, [])

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-slate-900">
        <Loader2 className="h-8 w-8 animate-spin text-slate-400" />
      </div>
    )
  }

  if (error || !data) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-slate-900 px-4">
        <p className="text-center text-red-400">
          {error ?? "Unable to load billing data. Is the server running?"}
        </p>
      </div>
    )
  }

  const { client, balance, summary, campaigns } = data
  const remainingPercent = Math.round(
    (balance.remaining / balance.starting) * 100
  )
  const barColor = getBalanceBarColor(remainingPercent)

  return (
    <div className="min-h-screen bg-slate-900">
      <Navbar clientName={client.name} />

      <main className="mx-auto max-w-6xl space-y-8 px-6 py-8">
        {/* Balance card */}
        <section className="rounded-xl bg-slate-800 p-6 shadow-sm ring-1 ring-slate-700/50">
          <p className="text-xs font-semibold uppercase tracking-widest text-slate-400">
            Available Balance
          </p>
          <p className="mt-2 text-5xl font-bold text-white">
            {formatRm(balance.remaining)}
          </p>
          <p className="mt-2 text-sm text-slate-400">
            of {formatRm(balance.starting)} starting balance
          </p>
          <div className="mt-6 flex items-center gap-4">
            <div className="h-2 flex-1 overflow-hidden rounded-full bg-slate-700">
              <div
                className={`h-full rounded-full transition-all ${barColor}`}
                style={{ width: `${remainingPercent}%` }}
              />
            </div>
            <span className="min-w-[3rem] text-right text-sm font-medium text-slate-300">
              {remainingPercent}%
            </span>
          </div>
        </section>

        {/* Summary strip */}
        <section className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <SummaryCard
            icon={DollarSign}
            label="Total Spent"
            value={formatRm(summary.totalSpent)}
          />
          <SummaryCard
            icon={Phone}
            label="Total Calls"
            value={`${summary.totalCalls} calls`}
          />
          <SummaryCard
            icon={Clock}
            label="Talk Time"
            value={formatTime(summary.totalTalkTimeSeconds)}
          />
          <SummaryCard
            icon={Handshake}
            label="PTP Count"
            value={`${summary.ptpCount} promises`}
          />
        </section>

        {/* Campaign table */}
        <section className="rounded-xl bg-slate-800 shadow-sm ring-1 ring-slate-700/50">
          <div className="border-b border-slate-700/60 px-6 py-4">
            <h2 className="text-lg font-semibold text-white">
              Campaign Breakdown
            </h2>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead>
                <tr className="border-b border-slate-700/60 text-xs uppercase tracking-wide text-slate-400">
                  <th className="px-6 py-3 font-medium">Campaign</th>
                  <th className="px-6 py-3 font-medium">Status</th>
                  <th className="px-6 py-3 font-medium">Calls</th>
                  <th className="px-6 py-3 font-medium">Talk Time</th>
                  <th className="px-6 py-3 text-right font-medium">Cost (RM)</th>
                  <th className="px-6 py-3 font-medium">PTPs</th>
                </tr>
              </thead>
              <tbody>
                {campaigns.map((campaign, index) => (
                  <tr
                    key={campaign.name}
                    className={`border-b border-slate-700/40 transition-colors hover:bg-slate-700/30 ${
                      index % 2 === 0 ? "bg-slate-800" : "bg-slate-800/60"
                    }`}
                  >
                    <td className="px-6 py-4 font-medium text-white">
                      {campaign.name}
                    </td>
                    <td className="px-6 py-4">
                      <StatusBadge status={campaign.status} />
                    </td>
                    <td className="px-6 py-4 text-slate-300">
                      {campaign.calls}
                    </td>
                    <td className="px-6 py-4 text-slate-300">
                      {formatTime(campaign.talkTimeSeconds)}
                    </td>
                    <td className="px-6 py-4 text-right font-medium text-white">
                      {campaign.totalCost.toFixed(2)}
                    </td>
                    <td className="px-6 py-4 text-slate-300">
                      {campaign.ptpCount}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      </main>

      <footer className="border-t border-slate-800 py-6 text-center text-xs text-slate-500">
        Data refreshed on load • BK COLLECTIONS Billing Portal
      </footer>
    </div>
  )
}
