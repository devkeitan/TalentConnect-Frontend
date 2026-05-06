import { useState, useEffect } from "react"
import { useParams, useNavigate } from "react-router-dom"
import {
  ArrowLeft, Calendar, Clock, MapPin, Timer,
  FileText, Loader2, XCircle, User
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { getMyBookings, cancelBookingRequest } from "@/api/organizer/organizer"
import { createConversation } from '@/api/messaging';
import { MessageCircle } from 'lucide-react';

const statusStyles = {
  pending:  "bg-yellow-100 text-yellow-700",
  accepted: "bg-blue-100 text-blue-700",
  rejected: "bg-red-100 text-red-700",
  confirmed:"bg-green-100 text-green-700",
  cancelled: "bg-gray-100 text-gray-500",
}

export default function OrganizerBookingDetailPage() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [booking, setBooking] = useState(null)
  const [loading, setLoading] = useState(true)
  const [cancelling, setCancelling] = useState(false)
  const [messaging, setMessaging] = useState(false)

  useEffect(() => {
    getMyBookings()
      .then((data) => {
        const found = data.find((b) => String(b.id) === String(id))
        setBooking(found || null)
      })
      .catch(console.error)
      .finally(() => setLoading(false))
  }, [id])

  const handleCancel = async () => {
    setCancelling(true)
    try {
      await cancelBookingRequest(booking.id)
      navigate("/organizer/booking-requests")
    } catch (err) {
      console.error(err)
    } finally {
      setCancelling(false)
    }
  }

  const handleMessageTalent = async () => {
  setMessaging(true);
  try {
    const res = await createConversation(booking.id);
    navigate(`/organizer/messages?conversation=${res.data.id}`);
  } catch (err) {
    console.error(err);
  } finally {
    setMessaging(false);
  }
};

  if (loading) return (
    <div className="flex items-center justify-center py-24">
      <Loader2 className="w-6 h-6 animate-spin text-muted-foreground" />
    </div>
  )

  if (!booking) return (
    <div className="flex flex-col items-center justify-center py-24 gap-4">
      <p className="text-muted-foreground text-sm">Booking not found.</p>
      <Button variant="outline" onClick={() => navigate("/organizer/booking-requests")}>
        Back to Requests
      </Button>
    </div>
  )

  const isPending = booking.status === "pending"

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      {/* Back */}
      <Button
        variant="ghost" size="sm"
        className="gap-2 -ml-2 text-muted-foreground"
        onClick={() => navigate("/organizer/booking-requests")}
      >
        <ArrowLeft className="w-4 h-4" /> Back to Requests
      </Button>

      {/* Header */}
      <div className="bg-white rounded-xl border border-border shadow-sm p-6">
        <div className="flex items-start justify-between gap-4 mb-2">
          <h2 className="text-xl font-bold">{booking.event_name}</h2>
          <Badge className={statusStyles[booking.status]}>{booking.status}</Badge>
        </div>
        <p className="text-sm text-muted-foreground flex items-center gap-1">
          <User className="w-3.5 h-3.5" />
          Talent: <span className="font-medium text-foreground ml-1">{booking.talent_name}</span>
        </p>
      </div>

      {/* Event Details */}
      <div className="bg-white rounded-xl border border-border shadow-sm p-6 space-y-4">
        <h3 className="font-semibold">Event Details</h3>
        <div className="grid sm:grid-cols-2 gap-4 text-sm">
          <div className="flex items-center gap-3 text-muted-foreground">
            <Calendar className="w-4 h-4 shrink-0" />
            <div>
              <p className="text-xs uppercase tracking-wide mb-0.5">Date</p>
              <p className="text-foreground font-medium">{booking.event_date || "—"}</p>
            </div>
          </div>
          <div className="flex items-center gap-3 text-muted-foreground">
            <Clock className="w-4 h-4 shrink-0" />
            <div>
              <p className="text-xs uppercase tracking-wide mb-0.5">Time</p>
              <p className="text-foreground font-medium">{booking.event_time || "—"}</p>
            </div>
          </div>
          <div className="flex items-center gap-3 text-muted-foreground">
            <MapPin className="w-4 h-4 shrink-0" />
            <div>
              <p className="text-xs uppercase tracking-wide mb-0.5">Location</p>
              <p className="text-foreground font-medium">{booking.event_location || "—"}</p>
            </div>
          </div>
          <div className="flex items-center gap-3 text-muted-foreground">
            <Timer className="w-4 h-4 shrink-0" />
            <div>
              <p className="text-xs uppercase tracking-wide mb-0.5">Duration</p>
              <p className="text-foreground font-medium">
                {booking.duration ? `${booking.duration} hour${booking.duration !== 1 ? "s" : ""}` : "—"}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Message */}
      {booking.message && (
        <div className="bg-white rounded-xl border border-border shadow-sm p-6">
          <h3 className="font-semibold mb-3 flex items-center gap-2">
            <FileText className="w-4 h-4" /> Your Message
          </h3>
          <p className="text-sm text-muted-foreground bg-muted/50 rounded-lg px-4 py-3">
            "{booking.message}"
          </p>
        </div>
      )}

            {/* Message Talent — show when accepted or confirmed */}
{(booking.status === 'accepted' || booking.status === 'confirmed') && (
  <Button
    className="w-full gap-2"
    onClick={handleMessageTalent}
    disabled={messaging}
  >
    {messaging
      ? <Loader2 className="w-4 h-4 animate-spin" />
      : <MessageCircle className="w-4 h-4" />}
    Message Talent
  </Button>
)}

      {/* Status banner for non-pending */}
      {!isPending && (
        <div className={`rounded-xl px-5 py-4 text-sm font-medium ${statusStyles[booking.status]}`}>
          {booking.status === "accepted" && "✅ The talent has accepted your booking request."}
          {booking.status === "rejected" && "❌ The talent has declined your booking request."}
          {booking.status === "confirmed" && "🎉 This booking is confirmed!"}
          {booking.status === "cancelled" && "🚫 You cancelled this booking request."}
        </div>
      )}

      {/* Cancel */}
      {isPending && (
        <Button
          variant="outline"
          className="w-full gap-2 text-red-500 border-red-200 hover:bg-red-50 hover:text-red-600"
          onClick={handleCancel} disabled={cancelling}
        >
          {cancelling
            ? <Loader2 className="w-4 h-4 animate-spin" />
            : <XCircle className="w-4 h-4" />}
          Cancel Booking Request
        </Button>
      )}
    </div>
  )
}
