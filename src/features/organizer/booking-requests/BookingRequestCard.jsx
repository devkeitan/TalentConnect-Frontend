import { Calendar, MapPin, Clock, DollarSign } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { useNavigate } from "react-router-dom"

const statusStyles = {
  pending:  "bg-yellow-100 text-yellow-700 hover:bg-yellow-100",
  accepted: "bg-blue-100 text-blue-700 hover:bg-blue-100",
  rejected: "bg-red-100 text-red-700 hover:bg-red-100",
  cancelled: "bg-gray-100 text-gray-500 hover:bg-gray-100",
}

export function BookingRequestCard({ booking, onCancel, onViewTalent }) {
  const isCancellable = booking.status === "pending"
  const navigate = useNavigate()
  return (
    <div className="bg-white rounded-xl border border-border shadow-sm p-5">
      {/* Header */}
      <div className="flex items-start justify-between gap-3 mb-4">
        <div>
          <div className="font-medium text-sm">{booking.talent_name}</div>
          <div className="text-xs text-muted-foreground">{booking.event_type}</div>
        </div>
        <Badge className={statusStyles[booking.status]}>{booking.status}</Badge>
      </div>

      {/* Event Info */}
      <div className="space-y-2 mb-4">
        <h4 className="font-semibold text-sm">{booking.event_name}</h4>
        <div className="flex flex-wrap gap-3 text-xs text-muted-foreground">
          <span className="flex items-center gap-1">
            <Calendar className="w-3.5 h-3.5" />{booking.event_date}
          </span>
          <span className="flex items-center gap-1">
            <Clock className="w-3.5 h-3.5" />{booking.event_time}
          </span>
          <span className="flex items-center gap-1">
            <MapPin className="w-3.5 h-3.5" />{booking.event_location}
          </span>
        </div>
      </div>

      {/* Message */}
      {booking.message && (
        <p className="text-xs text-muted-foreground bg-muted/50 rounded-lg px-3 py-2.5 mb-4 leading-relaxed">
          "{booking.message}"
        </p>
      )}

      {/* Status Timeline */}
      <div className="flex items-center gap-1.5 mb-1">
        {["pending", "accepted"].map((step, i) => {
          const steps = ["pending", "accepted"]
          const currentIndex = steps.indexOf(booking.status)
          const isRejected = booking.status === "rejected"
          const isDone = !isRejected && i <= currentIndex
          const isActive = !isRejected && i === currentIndex

          return (
            <div key={step} className="flex items-center flex-1">
              <div className={`flex-1 h-1 rounded-full ${isDone ? "bg-primary" : "bg-muted"}`} />
              <div className={`w-2.5 h-2.5 rounded-full shrink-0 ${
                isActive ? "bg-primary ring-2 ring-primary/30" :
                isDone   ? "bg-primary" : "bg-muted"
              }`} />
              {i === steps.length - 1 && (
                <div className={`flex-1 h-1 rounded-full ${isDone ? "bg-primary" : "bg-muted"}`} />
              )}
            </div>
          )
        })}
      </div>
      <div className="flex justify-between text-xs text-muted-foreground mb-4 px-0.5">
        <span>Sent</span>
        <span>Accepted</span>
      </div>

      {/* Actions */}
      <div className="flex gap-2">
        <Button
          variant="outline"
          size="sm"
          className="flex-1 text-xs"
          onClick={() => navigate(`/organizer/booking-requests/${booking.id}`)}
        >
            View Details
        </Button>
        <Button
          variant="outline"
          size="sm"
          className="flex-1 text-xs"
          onClick={() => onViewTalent(booking.talent)}
        >
          View Talent
        </Button>
        {isCancellable && (
          <Button
            variant="outline"
            size="sm"
            className="flex-1 text-xs text-red-500 border-red-200 hover:bg-red-50 hover:text-red-600"
            onClick={() => onCancel(booking.id)}
          >
            Cancel Request
          </Button>
        )}
      </div>
    </div>
  )
}
