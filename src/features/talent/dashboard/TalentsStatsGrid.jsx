import { BookOpen, Clock, CalendarDays, Star } from "lucide-react"
import { StatCard } from "@/components/shared/StatCard"

export function TalentStatsGrid({ stats }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      <StatCard title="Total Bookings"   value={stats?.total_bookings   ?? "—"} icon={<BookOpen className="w-5 h-5" />}    />
      <StatCard title="Pending Requests" value={stats?.pending_requests ?? "—"} icon={<Clock className="w-5 h-5" />}        />
      <StatCard title="Upcoming Events"  value={stats?.upcoming_events  ?? "—"} icon={<CalendarDays className="w-5 h-5" />} />
      <StatCard title="Average Rating"   value={stats?.avg_rating       ?? "—"} icon={<Star className="w-5 h-5" />}         />
    </div>
  )
}
