import { EventList } from "@/features/organizer/my-events"

export default function MyEventsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-semibold">My Events</h2>
        <p className="text-sm text-muted-foreground mt-1">
          Manage all your events and track their booked talents.
        </p>
      </div>
      <EventList />
    </div>
  )
}
