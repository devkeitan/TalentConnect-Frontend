import { Star } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

export function PendingReviewCard({ booking, onReview }) {
  return (
    <div className="bg-white rounded-xl border border-border shadow-sm p-5 flex items-center gap-4">
      {/* Avatar */}
      <div className="w-12 h-12 rounded-full bg-muted overflow-hidden shrink-0">
        <img
          src={booking.talentAvatar}
          alt={booking.talentName}
          className="w-full h-full object-cover"
          onError={(e) => { e.target.style.display = "none" }}
        />
      </div>

      {/* Info */}
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 mb-0.5">
          <span className="font-medium text-sm">{booking.talentName}</span>
          <Badge variant="secondary" className="text-xs">{booking.talentType}</Badge>
        </div>
        <p className="text-xs text-muted-foreground truncate">{booking.eventName}</p>
        <p className="text-xs text-muted-foreground">{booking.date}</p>
      </div>

      {/* Action */}
      <Button size="sm" className="gap-1.5 shrink-0" onClick={() => onReview(booking)}>
        <Star className="w-3.5 h-3.5" /> Write Review
      </Button>
    </div>
  )
}
