export function StatCard({ title, value, icon, trend, trendUp }) {
  return (
    <div className="bg-white rounded-xl border border-border shadow-sm p-5">
      <div className="flex items-center justify-between mb-3">
        <span className="text-sm text-muted-foreground">{title}</span>
        <div className="w-9 h-9 bg-accent rounded-lg flex items-center justify-center text-primary">
          {icon}
        </div>
      </div>
      <div className="text-2xl font-bold text-foreground">{value}</div>
      {trend && (
        <div className={`text-xs mt-1 ${trendUp ? "text-green-500" : "text-red-500"}`}>
          {trendUp ? "↑" : "↓"} {trend}
        </div>
      )}
    </div>
  )
}
