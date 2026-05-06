import { useNavigate } from "react-router-dom"

export function UpcomingEvents({ events = [] }) {
  const navigate = useNavigate()

  return (
    <div className="bg-white rounded-xl border border-border shadow-sm">
      <div className="p-5 border-b border-border flex items-center justify-between">
        <h3 className="font-semibold">Upcoming Events</h3>
        <span
          className="text-xs text-primary cursor-pointer hover:underline"
          onClick={() => navigate("/talent/booking-requests")}
        >
          View All
        </span>
      </div>

      {events.length === 0 ? (
        <div className="p-8 text-center text-sm text-muted-foreground">
          No upcoming events.
        </div>
      ) : (
        <div className="divide-y divide-border">
          {events.map((event) => {
            const [month, day] = new Date(event.date)
              .toLocaleDateString("en-US", { month: "short", day: "numeric" })
              .split(" ")

            return (
              <div key={event.id} className="p-4 flex items-center gap-4 hover:bg-muted/50 transition-colors">
                <div className="w-12 h-12 bg-accent rounded-lg flex flex-col items-center justify-center shrink-0">
                  <div className="text-xs text-primary font-medium">{month}</div>
                  <div className="text-lg font-bold text-primary leading-tight">{day}</div>
                </div>
                <div>
                  <div className="font-medium text-sm">{event.name}</div>
                  <div className="text-xs text-muted-foreground">
                    {event.time} · {event.location}
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      )}
    </div>
  )
}
