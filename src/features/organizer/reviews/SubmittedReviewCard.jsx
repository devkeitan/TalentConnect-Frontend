import { Star } from "lucide-react"

export function SubmittedReviewCard({ review }) {
  return (
    <div className="bg-white rounded-xl border border-border shadow-sm p-5">
      <div className="flex items-start justify-between gap-3 mb-3">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-muted overflow-hidden shrink-0">
            <img
              src={review.talentAvatar}
              alt={review.talent_name}
              className="w-full h-full object-cover"
              onError={(e) => { e.target.style.display = "none" }}
            />
          </div>
          <div>
            <div className="font-medium text-sm">{review.talent_name}</div>
            <div className="text-xs text-muted-foreground">{review.event_name}</div>
          </div>
        </div>
        <span className="text-xs text-muted-foreground shrink-0">{review.event_date}</span>
      </div>

      {/* Stars */}
      <div className="flex gap-0.5 mb-2">
        {Array.from({ length: 5 }).map((_, i) => (
          <Star key={i} className={`w-4 h-4 ${
            i < review.rating
              ? "fill-amber-400 text-amber-400"
              : "text-muted-foreground/30"
          }`} />
        ))}
      </div>

      <p className="text-sm text-muted-foreground leading-relaxed">{review.comment}</p>
    </div>
  )
}
