import { useState, useEffect } from "react"
import { Loader2 } from "lucide-react"
import { PendingReviewCard } from "./PendingReviewCard"
import { SubmittedReviewCard } from "./SubmittedReviewCard"
import { ReviewFormDialog } from "./ReviewFormDialog"
import { getMyBookings } from "@/api/organizer/organizer"
import { getMyReviews, submitReview } from "@/api/organizer/reviews"

const TABS = ["pending", "submitted"]

export function ReviewsContent() {
  const [submitted, setSubmitted]   = useState([])
  const [pending, setPending]       = useState([])
  const [loading, setLoading]       = useState(true)
  const [activeTab, setActiveTab]   = useState("pending")
  const [dialogOpen, setDialogOpen] = useState(false)
  const [selected, setSelected]     = useState(null)
  const [saving, setSaving]         = useState(false)

  useEffect(() => {
    Promise.all([getMyBookings(), getMyReviews()])
      .then(([bookings, reviews]) => {
        setSubmitted(reviews)

        // pending = accepted bookings with no review yet
        const reviewedBookingIds = new Set(reviews.map((r) => r.booking))
        const pendingList = bookings
          .filter((b) => b.status === "accepted" && !reviewedBookingIds.has(b.id))
          .map((b) => ({
            id: b.id,
            talentId: b.talent,
            talentName: b.talent_name,
            talentAvatar: "",
            eventName: b.event_name,
            date: b.event_date,
          }))
        setPending(pendingList)
      })
      .catch(console.error)
      .finally(() => setLoading(false))
  }, [])

  const handleReview = (booking) => {
    setSelected(booking)
    setDialogOpen(true)
  }

  const handleSave = async (review) => {
    setSaving(true)
    try {
      const payload = {
        booking: review.bookingId,
        talent: review.talentId,
        rating: review.rating,
        comment: review.comment,
      }
      const saved = await submitReview(payload)
      setSubmitted((prev) => [saved, ...prev])
      setPending((prev) => prev.filter((b) => b.id !== review.bookingId))
      setDialogOpen(false)
      setActiveTab("submitted")
    } catch (err) {
      alert("Failed to submit review")
      console.error(err)
    } finally {
      setSaving(false)
    }
  }

  if (loading) return (
    <div className="flex items-center justify-center py-20">
      <Loader2 className="w-6 h-6 animate-spin text-muted-foreground" />
    </div>
  )

  return (
    <div className="space-y-5">
      {/* Tabs */}
      <div className="flex border-b border-border">
        {TABS.map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-5 py-3 text-sm capitalize transition-colors border-b-2 ${
              activeTab === tab
                ? "border-primary text-primary font-medium"
                : "border-transparent text-muted-foreground hover:text-foreground"
            }`}
          >
            {tab === "pending"
              ? `Awaiting Review (${pending.length})`
              : `Submitted (${submitted.length})`}
          </button>
        ))}
      </div>

      {/* Pending Tab */}
      {activeTab === "pending" && (
        <div className="space-y-3">
          {pending.length === 0 ? (
            <div className="text-center py-20 text-sm text-muted-foreground">
              You're all caught up! No pending reviews.
            </div>
          ) : (
            pending.map((booking) => (
              <PendingReviewCard key={booking.id} booking={booking} onReview={handleReview} />
            ))
          )}
        </div>
      )}

      {/* Submitted Tab */}
      {activeTab === "submitted" && (
        <div className="grid sm:grid-cols-2 gap-4">
          {submitted.length === 0 ? (
            <div className="text-center py-20 text-sm text-muted-foreground col-span-2">
              You haven't submitted any reviews yet.
            </div>
          ) : (
            submitted.map((review) => (
              <SubmittedReviewCard key={review.id} review={review} />
            ))
          )}
        </div>
      )}

      <ReviewFormDialog
        open={dialogOpen}
        onClose={() => setDialogOpen(false)}
        onSave={handleSave}
        booking={selected}
        saving={saving}
      />
    </div>
  )
}
