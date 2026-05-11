import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { BookingRequestCard } from "./BookingRequestCard"
import { CancelBookingDialog } from "./CancelBookingDialog"
import { cancelBookingRequest, getMyBookings } from "@/api/organizer/organizer"

const FILTERS = ["all", "pending", "accepted", "rejected", "cancelled"]

export function BookingRequestList() {
  const navigate = useNavigate()
  const [bookings, setBookings]   = useState([])
  const [loading, setLoading]     = useState(true)
  const [activeFilter, setFilter] = useState("all")
  const [cancelId, setCancelId]   = useState(null)

  useEffect(() => {
    getMyBookings()
      .then(setBookings)
      .catch(console.error)
      .finally(() => setLoading(false))
  }, [])

  const filtered = activeFilter === "all"
    ? bookings
    : bookings.filter((b) => b.status === activeFilter)

const handleConfirmCancel = async () => {
  try {
    await cancelBookingRequest(cancelId)
    setBookings((prev) =>
      prev.map((b) => b.id === cancelId ? { ...b, status: "cancelled" } : b)
    )
    setCancelId(null)
  } catch (err) {
    alert('Failed to cancel booking')
    console.error(err)
  }
}

  const counts = FILTERS.reduce((acc, f) => {
    acc[f] = f === "all" ? bookings.length : bookings.filter((b) => b.status === f).length
    return acc
  }, {})

  if (loading) return (
    <div className="flex items-center justify-center py-20">
      <Loader2 className="w-6 h-6 animate-spin text-muted-foreground" />
    </div>
  )

  return (
    <div className="space-y-5">
      {/* Filters */}
      <div className="flex flex-wrap gap-2">
        {FILTERS.map((f) => (
          <Button
            key={f}
            size="sm"
            variant={activeFilter === f ? "default" : "outline"}
            className="capitalize gap-1.5"
            onClick={() => setFilter(f)}
          >
            {f}
            <span className={`text-xs px-1.5 py-0.5 rounded-full ${
              activeFilter === f
                ? "bg-white/20 text-white"
                : "bg-muted text-muted-foreground"
            }`}>
              {counts[f]}
            </span>
          </Button>
        ))}
      </div>

      {/* Count */}
      <p className="text-sm text-muted-foreground">
        {filtered.length} booking request{filtered.length !== 1 ? "s" : ""}
      </p>

      {/* Grid */}
      {filtered.length === 0 ? (
        <div className="text-center py-20 text-sm text-muted-foreground">
          No booking requests found.
        </div>
      ) : (
        <div className="grid sm:grid-cols-2 gap-4">
          {filtered.map((booking) => (
            <BookingRequestCard
              key={booking.id}
              booking={booking}
              onCancel={setCancelId}
              onViewTalent={(id) => navigate(`/organizer/browse-talents/${id}`)}
            />
          ))}
        </div>
      )}

      <CancelBookingDialog
        open={!!cancelId}
        onClose={() => setCancelId(null)}
        onConfirm={handleConfirmCancel}
      />
    </div>
  )
}
