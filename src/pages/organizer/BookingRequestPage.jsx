import { BookingRequestList } from "@/features/organizer/booking-requests"

export default function OrganizerBookingRequestPage() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-semibold">Booking Requests</h2>
        <p className="text-sm text-muted-foreground mt-1">
          Track all your sent booking requests and their current status.
        </p>
      </div>
      <BookingRequestList />
    </div>
  )
}
