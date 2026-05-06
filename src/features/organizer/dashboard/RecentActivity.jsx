import { StatusBadge } from "@/components/shared"
import { formatDistanceToNow } from "date-fns"

export function RecentActivity({ activity = [] }) {
  return (
    <div className="bg-white rounded-xl border border-border shadow-sm">
      <div className="p-5 border-b border-border">
        <h3 className="font-semibold">Recent Booking Activity</h3>
      </div>

      {activity.length === 0 ? (
        <div className="p-8 text-center text-sm text-muted-foreground">
          No recent activity yet.
        </div>
      ) : (
        <div className="divide-y divide-border">
          {activity.map((item) => (
            <div key={item.id} className="p-4 flex items-center justify-between hover:bg-muted/50 transition-colors">
              <div>
                <div className="text-sm">{item.action}</div>
                <div className="text-xs text-muted-foreground">
                  {formatDistanceToNow(new Date(item.created_at), { addSuffix: true })}
                </div>
              </div>
              <StatusBadge status={item.status} />
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
