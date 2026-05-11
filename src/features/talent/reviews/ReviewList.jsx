import { useState, useEffect } from "react"
import { Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { ReviewCard } from "./ReviewCard"
import { getTalentReviews } from "@/api/organizer/reviews"

const ITEMS_PER_PAGE = 4

export function ReviewList({ talentId }) {
  const [reviews, setReviews] = useState([])
  const [loading, setLoading] = useState(true)
  const [filter, setFilter]   = useState("all")
  const [visible, setVisible] = useState(ITEMS_PER_PAGE)

  useEffect(() => {
    if (!talentId) return
    getTalentReviews(talentId)
      .then(setReviews)
      .catch(console.error)
      .finally(() => setLoading(false))
  }, [talentId])

  const filtered = filter === "all"
    ? reviews
    : reviews.filter((r) => r.rating === Number(filter))

  const shown  = filtered.slice(0, visible)
  const hasMore = visible < filtered.length

  if (loading) return (
    <div className="flex items-center justify-center py-16">
      <Loader2 className="w-5 h-5 animate-spin text-muted-foreground" />
    </div>
  )

  return (
    <div className="bg-white rounded-xl border border-border shadow-sm overflow-hidden">
      <div className="p-5 border-b border-border flex flex-wrap items-center justify-between gap-3">
        <h3 className="font-semibold">All Reviews</h3>
        <div className="flex gap-1.5 flex-wrap">
          {["all", "5", "4", "3", "2", "1"].map((f) => (
            <Button
              key={f}
              size="sm"
              variant={filter === f ? "default" : "outline"}
              className="h-7 px-2.5 text-xs"
              onClick={() => { setFilter(f); setVisible(ITEMS_PER_PAGE) }}
            >
              {f === "all" ? "All" : `${f} ★`}
            </Button>
          ))}
        </div>
      </div>

      {shown.length === 0 ? (
        <div className="py-16 text-center text-sm text-muted-foreground">
          No reviews yet.
        </div>
      ) : (
        <div>
          {shown.map((review) => (
            <ReviewCard key={review.id} review={review} />
          ))}
        </div>
      )}

      {hasMore && (
        <div className="p-4 border-t border-border text-center">
          <Button variant="outline" size="sm" onClick={() => setVisible((v) => v + ITEMS_PER_PAGE)}>
            Load More
          </Button>
        </div>
      )}
    </div>
  )
}
