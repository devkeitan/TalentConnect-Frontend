import { useState, useEffect } from "react"
import { Star, Loader2 } from "lucide-react"
import { getTalentReviews } from "@/api/organizer/reviews"

export function TalentReviewsPreview({ talentId }) {
  const [reviews, setReviews] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!talentId) return
    getTalentReviews(talentId)
      .then(setReviews)
      .catch(console.error)
      .finally(() => setLoading(false))
  }, [talentId])

  const avg = reviews.length
    ? (reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length).toFixed(1)
    : null

  return (
    <div className="bg-white rounded-xl border border-border shadow-sm p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-semibold">Reviews</h3>
        {avg && (
          <div className="flex items-center gap-1.5 text-sm">
            <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
            <span className="font-semibold">{avg}</span>
            <span className="text-muted-foreground">({reviews.length})</span>
          </div>
        )}
      </div>

      {loading ? (
        <div className="flex items-center justify-center py-8">
          <Loader2 className="w-5 h-5 animate-spin text-muted-foreground" />
        </div>
      ) : reviews.length === 0 ? (
        <p className="text-sm text-muted-foreground text-center py-8">
          No reviews yet.
        </p>
      ) : (
        <div className="space-y-4">
          {reviews.slice(0, 3).map((review) => (
            <div key={review.id} className="border-b border-border last:border-0 pb-4 last:pb-0">
              <div className="flex items-center justify-between mb-1">
                <span className="text-sm font-medium">
                  {review.organizer_company ?? "Organizer"}
                </span>
                <span className="text-xs text-muted-foreground">
                  {new Date(review.created_at).toLocaleDateString("en-US", {
                    month: "short", day: "numeric", year: "numeric"
                  })}
                </span>
              </div>
              <div className="flex gap-0.5 mb-1.5">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} className={`w-3.5 h-3.5 ${
                    i < review.rating ? "fill-amber-400 text-amber-400" : "text-muted-foreground/30"
                  }`} />
                ))}
              </div>
              <p className="text-sm text-muted-foreground leading-relaxed line-clamp-2">
                {review.comment}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
