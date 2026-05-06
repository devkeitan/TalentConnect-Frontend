import { Calendar, Clock, Users, CheckCircle } from "lucide-react"
import { StatCard } from "@/components/shared/StatCard"

export function OrganizerStatsGrid({ stats }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      <StatCard title="Active Events"     value={stats?.active_events     ?? "—"} icon={<Calendar className="w-5 h-5" />}    />
      <StatCard title="Pending Bookings"  value={stats?.pending_bookings  ?? "—"} icon={<Clock className="w-5 h-5" />}        />
      <StatCard title="Confirmed Talents" value={stats?.confirmed_talents ?? "—"} icon={<Users className="w-5 h-5" />}        />
      <StatCard title="Completed Events"  value={stats?.completed_events  ?? "—"} icon={<CheckCircle className="w-5 h-5" />}  />
    </div>
  )
}
