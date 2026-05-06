import { useNavigate } from "react-router-dom"
import { StatusBadge } from "@/components/shared/StatusBadge"

export function RecentBookings({ bookings = [] }) {
  const navigate = useNavigate()

  return (
    <div className="bg-white rounded-xl border border-border shadow-sm">
      <div className="p-5 border-b border-border flex items-center justify-between">
        <h3 className="font-semibold">Recent Booking Requests</h3>
        <span
          className="text-xs text-primary cursor-pointer hover:underline"
          onClick={() => navigate("/talent/booking-requests")}
        >
          View All
        </span>
      </div>

      {bookings.length === 0 ? (
        <div className="p-8 text-center text-sm text-muted-foreground">
          No booking requests yet.
        </div>
      ) : (
        <div className="divide-y divide-border">
          {bookings.map((booking) => (
            <div
              key={booking.id}
              className="p-4 flex items-center justify-between hover:bg-muted/50 transition-colors cursor-pointer"
              onClick={() => navigate(`/talent/booking-requests/${booking.id}`)}
            >
              <div>
                <div className="font-medium text-sm">{booking.event}</div>
                <div className="text-xs text-muted-foreground">
                  {booking.organizer} · {booking.date}
                </div>
              </div>
              <StatusBadge status={booking.status} />
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
