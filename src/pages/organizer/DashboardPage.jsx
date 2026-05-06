import { useState, useEffect } from "react"
import { Loader2 } from "lucide-react"
import { OrganizerStatsGrid } from "@/features/organizer/dashboard/OrganizerStatsGrid"
import { RecentActivity } from "@/features/organizer/dashboard/RecentActivity"
import { RecommendedTalents } from "@/features/organizer/dashboard/RecommendedTalents"
import { getOrganizerDashboard } from "@/api/organizer/dashboard"

export default function OrganizerDashboardPage() {
  const [data, setData]     = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    getOrganizerDashboard()
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
      <div>
        <h2 className="text-xl font-semibold">Dashboard</h2>
        <p className="text-sm text-muted-foreground mt-1">
          Welcome to your dashboard!
        </p>
      </div>
      <OrganizerStatsGrid stats={data?.stats} />
      <div className="grid lg:grid-cols-2 gap-6">
        <RecentActivity activity={data?.recent_activity} />
        <RecommendedTalents talents={data?.recommended_talents} />
      </div>

    </div>
  )
}
