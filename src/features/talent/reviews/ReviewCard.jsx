import { Star } from "lucide-react"

export function ReviewCard({ review }) {
  const date = new Date(review.created_at).toLocaleDateString("en-US", {
    month: "short", day: "numeric", year: "numeric"
  })

  return (
    <div className="p-5 border-b border-border last:border-0">
      <div className="flex items-start justify-between gap-4 mb-2">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-full bg-muted flex items-center justify-center shrink-0">
            <span className="text-sm font-semibold text-muted-foreground">
              {review.organizer_company?.[0] ?? "O"}
            </span>
          </div>
          <div>
            <div className="text-sm font-medium">{review.organizer_company ?? "Organizer"}</div>
          </div>
        </div>
        <span className="text-xs text-muted-foreground shrink-0">{date}</span>
      </div>

      <div className="flex items-center gap-0.5 mb-2">
        {Array.from({ length: 5 }).map((_, i) => (
          <Star key={i} className={`w-3.5 h-3.5 ${
            i < review.rating ? "fill-amber-400 text-amber-400" : "text-muted-foreground/30"
          }`} />
        ))}
      </div>

      <p className="text-sm text-muted-foreground leading-relaxed">{review.comment}</p>
    </div>
  )
}
