import { useState, useEffect } from "react"
import { Star, Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import {
  Dialog, DialogContent, DialogHeader,
  DialogTitle, DialogFooter
} from "@/components/ui/dialog"

export function ReviewFormDialog({ open, onClose, onSave, booking, saving }) {
  const [rating, setRating]   = useState(0)
  const [hovered, setHovered] = useState(0)
  const [comment, setComment] = useState("")

  useEffect(() => {
    if (open) { setRating(0); setComment("") }
  }, [open])

  const handleSubmit = (e) => {
    e.preventDefault()
    if (rating === 0) return
    onSave({ bookingId: booking?.id, talentId: booking?.talentId, talentName: booking?.talentName, talentAvatar: booking?.talentAvatar, eventName: booking?.eventName, rating, comment })
  }

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Review {booking?.talentName}</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-5 py-2">
          {/* Event Info */}
          <div className="flex items-center gap-3 bg-muted/50 rounded-lg p-3">
            <div className="w-9 h-9 rounded-full bg-muted overflow-hidden shrink-0">
              <img
                src={booking?.talentAvatar}
                alt={booking?.talentName}
                className="w-full h-full object-cover"
                onError={(e) => { e.target.style.display = "none" }}
              />
            </div>
            <div>
              <div className="text-sm font-medium">{booking?.talentName}</div>
              <div className="text-xs text-muted-foreground">{booking?.eventName}</div>
            </div>
          </div>

          {/* Star Rating */}
          <div className="space-y-2">
            <Label>Rating <span className="text-red-500">*</span></Label>
            <div className="flex gap-1">
              {Array.from({ length: 5 }).map((_, i) => (
                <button
                  key={i}
                  type="button"
                  onMouseEnter={() => setHovered(i + 1)}
                  onMouseLeave={() => setHovered(0)}
                  onClick={() => setRating(i + 1)}
                >
                  <Star className={`w-8 h-8 transition-colors ${
                    i < (hovered || rating)
                      ? "fill-amber-400 text-amber-400"
                      : "text-muted-foreground/30"
                  }`} />
                </button>
              ))}
            </div>
            {rating > 0 && (
              <p className="text-xs text-muted-foreground">
                {["", "Poor", "Fair", "Good", "Very Good", "Excellent"][rating]}
              </p>
            )}
          </div>

          {/* Comment */}
          <div className="space-y-1">
            <Label>Your Review</Label>
            <Textarea
              placeholder="Share your experience with this talent — their performance, professionalism, punctuality..."
              rows={4}
              className="resize-none"
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              required
            />
          </div>

          <DialogFooter>
            <Button type="button" variant="outline" onClick={onClose}>Cancel</Button>
            <Button type="submit" disabled={rating === 0 || saving}>
  {saving ? <Loader2 className="w-4 h-4 animate-spin mr-1" /> : null}
  Submit Review
</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
