import { useState, useEffect } from "react"
import { Loader2 } from "lucide-react"
import { BookingRequestCard } from "./BookingRequestCard"
import { BookingRequestFilters } from "./BookingRequestFilters"
import { getBookingInbox, updateBookingStatus } from "@/api/organizer/organizer"

export function BookingRequestList() {
  const [bookings, setBookings] = useState([])
  const [activeFilter, setActiveFilter] = useState("all")
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    getBookingInbox()
      .then(setBookings)
      .catch(console.error)
      .finally(() => setLoading(false))
  }, [])

  const filtered = activeFilter === "all"
    ? bookings
    : bookings.filter((b) => b.status === activeFilter)

  const handleAccept = async (id) => {
    try {
      await updateBookingStatus(id, "accepted")
      setBookings((prev) =>
        prev.map((b) => b.id === id ? { ...b, status: "accepted" } : b)
      )
    } catch (err) {
      console.error("Failed to accept booking", err)
    }
  }

  const handleReject = async (id) => {
    try {
      await updateBookingStatus(id, "rejected")
      setBookings((prev) =>
        prev.map((b) => b.id === id ? { ...b, status: "rejected" } : b)
      )
    } catch (err) {
      console.error("Failed to reject booking", err)
    }
  }

  if (loading) return (
    <div className="flex items-center justify-center py-24">
      <Loader2 className="w-6 h-6 animate-spin text-muted-foreground" />
    </div>
  )

  return (
    <div className="space-y-4">
      <BookingRequestFilters active={activeFilter} onChange={setActiveFilter} />

      {filtered.length === 0 ? (
        <div className="text-center py-16 text-muted-foreground text-sm">
          No booking requests found.
        </div>
      ) : (
        <div className="grid sm:grid-cols-2 gap-4">
          {filtered.map((booking) => (
            <BookingRequestCard
              key={booking.id}
              booking={booking}
              onAccept={handleAccept}
              onReject={handleReject}
            />
          ))}
        </div>
      )}
    </div>
  )
}
