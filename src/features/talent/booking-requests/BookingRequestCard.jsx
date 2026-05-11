import { useState } from "react"
import { Calendar, MapPin, DollarSign, Loader2 } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { useNavigate } from "react-router-dom"

const statusStyles = {
  pending:  "bg-yellow-100 text-yellow-700 hover:bg-yellow-100",
  accepted: "bg-blue-100 text-blue-700 hover:bg-blue-100",
  rejected: "bg-red-100 text-red-700 hover:bg-red-100",
  confirmed:"bg-green-100 text-green-700 hover:bg-green-100",
}

export function BookingRequestCard({ booking, onAccept, onReject }) {
  const navigate = useNavigate()
  const isPending = booking.status === "pending"
  const [accepting, setAccepting] = useState(false)
  const [rejecting, setRejecting] = useState(false)

  const handleAccept = async () => {
    setAccepting(true)
    await onAccept(booking.id)
    setAccepting(false)
  }

  const handleReject = async () => {
    setRejecting(true)
    await onReject(booking.id)
    setRejecting(false)
  }

  const organizerName = booking.organizer_company ?? booking.organizer?.name ?? "Organizer"
  const organizerAvatar = booking.organizer_avatar ?? booking.organizer?.avatar ?? ""
  const eventName = booking.event_name ?? booking.event?.event_name ?? "Event"
  const eventType = booking.event_type ?? booking.event?.event_type ?? ""
  const eventDate = booking.event_date ?? booking.event?.date ?? ""
  const eventTime = booking.event_time ?? booking.event?.time ?? ""
  const eventLocation = booking.event_location ?? ""

  return (
    <div
      className="bg-white rounded-xl border border-border shadow-sm p-5 cursor-pointer hover:shadow-md transition-shadow"
      onClick={() => navigate(`/talent/booking-requests/${booking.id}`)}
    >
      <div className="flex items-start justify-between gap-4 mb-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-muted overflow-hidden shrink-0">
            <img
              src={organizerAvatar}
              alt={organizerName}
              className="w-full h-full object-cover"
              onError={(e) => { e.target.style.display = "none" }}
            />
          </div>
          <div>
            <div className="font-medium text-sm">{organizerName}</div>
            <div className="text-xs text-muted-foreground">{eventType}</div>
          </div>
        </div>
        <Badge className={statusStyles[booking.status]}>
          {booking.status}
        </Badge>
      </div>

      <div className="space-y-2 mb-4">
        <h4 className="font-semibold">{eventName}</h4>
        <div className="flex flex-wrap gap-4 text-xs text-muted-foreground">
          {eventDate && (
            <span className="flex items-center gap-1">
              <Calendar className="w-3.5 h-3.5" />
              {eventDate}{eventTime && ` · ${eventTime}`}
            </span>
          )}
          {eventLocation && (
            <span className="flex items-center gap-1">
              <MapPin className="w-3.5 h-3.5" />
              {eventLocation}
            </span>
          )}
          {booking.amount && (
            <span className="flex items-center gap-1">
              <DollarSign className="w-3.5 h-3.5" />
              {booking.amount}
            </span>
          )}
        </div>
      </div>

      {booking.message && (
        <p className="text-sm text-muted-foreground bg-muted/50 rounded-lg px-4 py-3 mb-4">
          "{booking.message}"
        </p>
      )}

      {/* Stop propagation so clicking buttons doesn't navigate */}
      {isPending && (
        <div className="flex gap-2" onClick={(e) => e.stopPropagation()}>
          <Button size="sm" className="flex-1" onClick={handleAccept} disabled={accepting || rejecting}>
            {accepting ? <Loader2 className="w-4 h-4 animate-spin" /> : "Accept"}
          </Button>
          <Button
            size="sm" variant="outline"
            className="flex-1 text-red-500 border-red-200 hover:bg-red-50 hover:text-red-600"
            onClick={handleReject} disabled={accepting || rejecting}
          >
            {rejecting ? <Loader2 className="w-4 h-4 animate-spin" /> : "Decline"}
          </Button>
        </div>
      )}
    </div>
  )
}
