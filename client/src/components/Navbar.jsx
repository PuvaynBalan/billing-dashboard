import xanderiaLogo from "../assets/xanderia-logo.png"

export default function Navbar({ clientName }) {
  return (
    <nav className="border-b border-slate-800 bg-slate-900/80 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-3">
        <div className="flex items-center gap-3">
          <img
            src={xanderiaLogo}
            alt="Xanderia"
            className="h-10 w-auto object-contain"
          />
          <h1 className="text-lg font-bold text-white">{clientName}</h1>
        </div>
        <span className="rounded-full bg-slate-800 px-3 py-1 text-sm text-slate-400 ring-1 ring-slate-700">
          {clientName}
        </span>
      </div>
    </nav>
  )
}
