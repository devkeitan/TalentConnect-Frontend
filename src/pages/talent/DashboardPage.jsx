import { useState, useEffect } from "react"
import { Loader2 } from "lucide-react"
import { RecentBookings } from '@/features/talent/dashboard/RecentBookings'
import { TalentStatsGrid } from '@/features/talent/dashboard/TalentsStatsGrid'
import { UpcomingEvents } from '@/features/talent/dashboard/UpcomingEvents'
import { getTalentDashboard } from "@/api/talent/dashboard"

export default function TalentDashboardPage() {
  const [data, setData]       = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    getTalentDashboard()
      .then(setData)
      .catch(console.error)
      .finally(() => setLoading(false))
  }, [])

  if (loading) return (
    <div className="flex items-center justify-center py-24">
      <Loader2 className="w-6 h-6 animate-spin text-muted-foreground" />
    </div>
  )

  return (
    <div className="space-y-6">
      <TalentStatsGrid stats={data?.stats} />
      <div className="grid lg:grid-cols-2 gap-6">
        <RecentBookings bookings={data?.recent_bookings} />
        <UpcomingEvents events={data?.upcoming_events} />
      </div>
    </div>
  )
}
