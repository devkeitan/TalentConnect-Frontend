import { useState, useEffect } from "react"
import { Loader2 } from "lucide-react"
import { ReviewSummary, ReviewList } from "@/features/talent/reviews"
import { getTalentPortfolio } from "@/api/talent/talent"
import { getTalentReviews } from "@/api/organizer/reviews"

export default function ReviewsPage() {
  const [reviews, setReviews] = useState([])
  const [talentId, setTalentId] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    getTalentPortfolio()
      .then((portfolio) => {
        setTalentId(portfolio.id)
        return getTalentReviews(portfolio.id)
      })
      .then(setReviews)
      .catch(console.error)
      .finally(() => setLoading(false))
  }, [])

  if (loading) return (
    <div className="flex items-center justify-center py-24">
      <Loader2 className="w-6 h-6 animate-spin text-muted-foreground" />
    </div>
  )

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div>
        <h2 className="text-xl font-semibold">Reviews</h2>
        <p className="text-sm text-muted-foreground mt-1">
          See what organizers are saying about your performances.
        </p>
      </div>
      <ReviewSummary reviews={reviews} />
      <ReviewList talentId={talentId} />
    </div>
  )
}
