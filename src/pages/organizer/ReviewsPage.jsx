import { ReviewsContent } from "@/features/organizer/reviews"

export default function OrganizerReviewsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-semibold">Reviews</h2>
        <p className="text-sm text-muted-foreground mt-1">
          Share your experience with talents you've worked with.
        </p>
      </div>
      <ReviewsContent />
    </div>
  )
}
