import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { Clock, FileText, Loader2, CheckCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import {
  Select, SelectContent, SelectItem,
  SelectTrigger, SelectValue
} from "@/components/ui/select"
import { sendBookingRequest } from "@/api/organizer/organizer"

export function BookingForm({ talent, events }) {
  const navigate = useNavigate()
  const [form, setForm] = useState({ event: "", duration: "2", message: "" })
  const [sending, setSending] = useState(false)
  const [sent, setSent] = useState(false)

  const set = (key, val) => setForm((prev) => ({ ...prev, [key]: val }))

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!form.event) return alert('Please select an event')
    setSending(true)
    try {
      await sendBookingRequest({
        event: form.event,
        talent: talent.id,
        duration: form.duration,
        message: form.message,
      })
      setSent(true)
    } catch (err) {
      alert('Failed to send booking request')
      console.error(err)
    } finally {
      setSending(false)
    }
  }

  if (sent) return (
    <div className="bg-white rounded-xl border border-border shadow-sm p-6 sticky top-6 text-center space-y-3">
      <CheckCircle className="w-12 h-12 text-green-500 mx-auto" />
      <h3 className="font-semibold">Request Sent!</h3>
      <p className="text-sm text-muted-foreground">
        Your booking request has been sent to {talent.talent_name}.
      </p>
      <Button variant="outline" size="sm" className="w-full" onClick={() => navigate('/organizer/booking-requests')}>
        View My Bookings
      </Button>
      <Button size="sm" className="w-full" onClick={() => { setSent(false); setForm({ event: "", duration: "2", message: "" }) }}>
        Send Another Request
      </Button>
    </div>
  )

  return (
    <div className="bg-white rounded-xl border border-border shadow-sm p-6 sticky top-6">
      <h3 className="font-semibold mb-1">Book {talent.talent_name}</h3>
      <p className="text-sm text-muted-foreground mb-5">
        Fill in your event details to send a booking request.
      </p>

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Select Event */}
        <div className="space-y-1">
          <Label>Select Event</Label>
          <Select value={form.event} onValueChange={(v) => set("event", v)} required>
            <SelectTrigger>
              <SelectValue placeholder="Choose your event" />
            </SelectTrigger>
            <SelectContent>
              {events.length === 0 ? (
                <SelectItem value="none" disabled>No events — create one first</SelectItem>
              ) : (
                events.map((event) => (
                  <SelectItem key={event.id} value={String(event.id)}>
                    {event.event_name}
                  </SelectItem>
                ))
              )}
            </SelectContent>
          </Select>
        </div>

        {/* Duration */}
        <div className="space-y-1">
          <Label className="flex items-center gap-1">
            <Clock className="w-3.5 h-3.5" /> Duration
          </Label>
          <Select value={form.duration} onValueChange={(v) => set("duration", v)}>
            <SelectTrigger><SelectValue /></SelectTrigger>
            <SelectContent>
              {["1", "2", "3", "4", "5", "6"].map((h) => (
                <SelectItem key={h} value={h}>{h} hour{h !== "1" ? "s" : ""}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Price Estimate */}
        <div className="bg-accent rounded-lg px-4 py-3 flex items-center justify-between">
          <span className="text-sm text-muted-foreground">Estimated price</span>
          <span className="font-semibold text-primary">${talent.min_price} – ${talent.max_price}</span>
        </div>

        {/* Message */}
        <div className="space-y-1">
          <Label className="flex items-center gap-1">
            <FileText className="w-3.5 h-3.5" /> Message to Talent
          </Label>
          <Textarea
            placeholder="Tell them about your event, special requests, dress code, etc."
            rows={3}
            className="resize-none"
            value={form.message}
            onChange={(e) => set("message", e.target.value)}
          />
        </div>

        {events.length === 0 && (
          <Button type="button" variant="outline" size="sm" className="w-full text-xs"
            onClick={() => navigate('/organizer/my-events')}>
            Create an Event First
          </Button>
        )}

        <Button type="submit" className="w-full" disabled={sending || !form.event}>
          {sending
            ? <><Loader2 className="w-4 h-4 animate-spin mr-1" /> Sending...</>
            : "Send Booking Request"
          }
        </Button>
      </form>
    </div>
  )
}
