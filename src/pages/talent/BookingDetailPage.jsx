import { useState, useEffect } from "react"
import { useParams, useNavigate } from "react-router-dom"
import {
  ArrowLeft, Calendar, Clock, MapPin,
  Building2, FileText, Timer, Loader2, CheckCircle, XCircle
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { getBookingInbox, updateBookingStatus } from "@/api/organizer/organizer"
import { createConversation } from '@/api/messaging';
import { MessageCircle } from 'lucide-react';


const statusStyles = {
  pending:   "bg-yellow-100 text-yellow-700",
  accepted:  "bg-blue-100 text-blue-700",
  rejected:  "bg-red-100 text-red-700",
  confirmed: "bg-green-100 text-green-700",
}

export default function TalentBookingDetailPage() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [booking, setBooking] = useState(null)
  const [loading, setLoading]   = useState(true)
  const [accepting, setAccepting] = useState(false)
  const [rejecting, setRejecting] = useState(false)
  const [messaging, setMessaging] = useState(false)

  useEffect(() => {
    getBookingInbox()
      .then((data) => {
        const found = data.find((b) => String(b.id) === String(id))
        setBooking(found || null)
      })
      .catch(console.error)
      .finally(() => setLoading(false))
  }, [id])

  const handleAccept = async () => {
    setAccepting(true)
    try {
      await updateBookingStatus(booking.id, "accepted")
      setBooking((prev) => ({ ...prev, status: "accepted" }))
    } catch (err) {
      console.error(err)
    } finally {
      setAccepting(false)
    }
  }

  const handleReject = async () => {
    setRejecting(true)
    try {
      await updateBookingStatus(booking.id, "rejected")
      setBooking((prev) => ({ ...prev, status: "rejected" }))
    } catch (err) {
      console.error(err)
    } finally {
      setRejecting(false)
    }
  }
  
  const handleMessageOrganizer = async () => {
  setMessaging(true);
  try {
    const res = await createConversation(booking.id);
    navigate(`/talent/messages?conversation=${res.data.id}`);
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
      <Button variant="outline" onClick={() => navigate("/talent/booking-requests")}>
        Back to Inbox
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
        onClick={() => navigate("/talent/booking-requests")}
      >
        <ArrowLeft className="w-4 h-4" /> Back to Inbox
      </Button>

      {/* Header */}
      <div className="bg-white rounded-xl border border-border shadow-sm p-6">
        <div className="flex items-start justify-between gap-4 mb-2">
          <h2 className="text-xl font-bold">{booking.event_name}</h2>
          <Badge className={statusStyles[booking.status]}>{booking.status}</Badge>
        </div>
        <p className="text-sm text-muted-foreground">
          Booking request from <span className="font-medium text-foreground">
            {booking.organizer_company || "an organizer"}
          </span>
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
          <div className="flex items-center gap-3 text-muted-foreground">
            <Building2 className="w-4 h-4 shrink-0" />
            <div>
              <p className="text-xs uppercase tracking-wide mb-0.5">Event Type</p>
              <p className="text-foreground font-medium">{booking.event_type || "—"}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Message */}
      {booking.message && (
        <div className="bg-white rounded-xl border border-border shadow-sm p-6">
          <h3 className="font-semibold mb-3 flex items-center gap-2">
            <FileText className="w-4 h-4" /> Message from Organizer
          </h3>
          <p className="text-sm text-muted-foreground leading-relaxed bg-muted/50 rounded-lg px-4 py-3">
            "{booking.message}"
          </p>
        </div>
      )}

      {/* Message Organizer — show when accepted */}
{booking.status === 'accepted' && (
  <Button
    className="w-full gap-2"
    onClick={handleMessageOrganizer}
    disabled={messaging}
  >
    {messaging
      ? <Loader2 className="w-4 h-4 animate-spin" />
      : <MessageCircle className="w-4 h-4" />}
    Message Organizer
  </Button>
)}

      {/* Actions */}
      {isPending && (
        <div className="flex gap-3">
          <Button className="flex-1 gap-2" onClick={handleAccept} disabled={accepting || rejecting}>
            {accepting
              ? <Loader2 className="w-4 h-4 animate-spin" />
              : <CheckCircle className="w-4 h-4" />}
            Accept Booking
          </Button>
          <Button
            variant="outline"
            className="flex-1 gap-2 text-red-500 border-red-200 hover:bg-red-50 hover:text-red-600"
            onClick={handleReject} disabled={accepting || rejecting}
          >
            {rejecting
              ? <Loader2 className="w-4 h-4 animate-spin" />
              : <XCircle className="w-4 h-4" />}
            Decline
          </Button>
        </div>
      )}

      {!isPending && (
        <div className={`rounded-xl px-5 py-4 text-sm font-medium flex items-center gap-2 ${
          booking.status === "accepted"
            ? "bg-blue-50 text-blue-700"
            : "bg-red-50 text-red-700"
        }`}>
          {booking.status === "accepted"
            ? <><CheckCircle className="w-4 h-4" /> You accepted this booking.</>
            : <><XCircle className="w-4 h-4" /> You declined this booking.</>
          }
        </div>
      )}
    </div>
  )
}
