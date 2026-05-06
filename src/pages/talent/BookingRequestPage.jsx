import { BookingRequestList } from "@/features/talent/booking-requests"

export default function BookingRequestPage() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-semibold">Booking Requests</h2>
        <p className="text-sm text-muted-foreground mt-1">
          Manage and respond to your incoming booking requests.
        </p>
      </div>
      <BookingRequestList />
    </div>
  )
}
