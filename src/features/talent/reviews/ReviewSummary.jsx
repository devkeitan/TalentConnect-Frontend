import { Star } from "lucide-react"

export function ReviewSummary({ reviews = [] }) {
  const total = reviews.length
  const avg = total
    ? (reviews.reduce((sum, r) => sum + r.rating, 0) / total).toFixed(1)
    : "0.0"

  const breakdown = [5, 4, 3, 2, 1].map((stars) => ({
    stars,
    count: reviews.filter((r) => r.rating === stars).length,
  }))

  return (
    <div className="bg-white rounded-xl border border-border shadow-sm p-6">
      <h3 className="font-semibold mb-4">Overall Rating</h3>
      <div className="flex items-center gap-8">
        <div className="text-center shrink-0">
          <div className="text-5xl font-bold">{avg}</div>
          <div className="flex items-center justify-center gap-0.5 mt-1">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star key={i} className={`w-4 h-4 ${
                i < Math.round(Number(avg)) ? "fill-amber-400 text-amber-400" : "text-muted"
              }`} />
            ))}
          </div>
          <div className="text-xs text-muted-foreground mt-1">{total} review{total !== 1 ? "s" : ""}</div>
        </div>

        <div className="flex-1 space-y-2">
          {breakdown.map((b) => (
            <div key={b.stars} className="flex items-center gap-2">
              <span className="text-xs text-muted-foreground w-4">{b.stars}</span>
              <Star className="w-3 h-3 fill-amber-400 text-amber-400 shrink-0" />
              <div className="flex-1 h-2 bg-muted rounded-full overflow-hidden">
                <div
                  className="h-full bg-amber-400 rounded-full transition-all"
                  style={{ width: `${total ? (b.count / total) * 100 : 0}%` }}
                />
              </div>
              <span className="text-xs text-muted-foreground w-4">{b.count}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
