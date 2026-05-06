import { useState } from "react"
import { Eye, MoreHorizontal } from "lucide-react"
import { StatusBadge } from "@/components/shared/StatusBadge"

const usersTable = [
  { id: 1, name: "Sarah Johnson",  email: "sarah@example.com", role: "Organizer", status: "active",  joined: "Jan 15, 2026" },
  { id: 2, name: "Mike Chen",      email: "mike@example.com",  role: "Organizer", status: "active",  joined: "Feb 2, 2026"  },
  { id: 3, name: "Aria Melody",    email: "aria@example.com",  role: "Talent",    status: "active",  joined: "Dec 10, 2025" },
  { id: 4, name: "DJ Pulse",       email: "pulse@example.com", role: "Talent",    status: "active",  joined: "Nov 5, 2025"  },
  { id: 5, name: "Lisa Rodriguez", email: "lisa@example.com",  role: "Talent",    status: "pending", joined: "Mar 8, 2026"  },
]

const talentsTable = [
  { id: 1, name: "Aria Melody",   type: "Singer", rating: 4.9, bookings: 47, revenue: "$42,500", status: "active" },
  { id: 2, name: "DJ Pulse",      type: "DJ",     rating: 4.8, bookings: 35, revenue: "$56,000", status: "active" },
  { id: 3, name: "The Acoustics", type: "Band",   rating: 4.7, bookings: 28, revenue: "$67,200", status: "active" },
  { id: 4, name: "Marco Events",  type: "Host",   rating: 4.9, bookings: 62, revenue: "$38,400", status: "active" },
]

const reviewsTable = [
  { id: 1, reviewer: "Sarah Johnson", talent: "Aria Melody",   rating: 5, date: "Mar 10, 2026", status: "accepted" },
  { id: 2, reviewer: "Mike Chen",     talent: "DJ Pulse",      rating: 4, date: "Mar 8, 2026",  status: "accepted" },
  { id: 3, reviewer: "Anna Kim",      talent: "The Acoustics", rating: 5, date: "Mar 5, 2026",  status: "pending"  },
]

const tabs = ["users", "talents", "reviews"]

export function OrganizerDashboardTable() {
  const [activeTab, setActiveTab] = useState("users")

  return (
    <div className="bg-white rounded-xl border border-border shadow-sm overflow-hidden">
      {/* Tabs */}
      <div className="border-b border-border flex">
        {tabs.map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-5 py-3 text-sm capitalize transition-colors border-b-2 ${
              activeTab === tab
                ? "border-primary text-primary font-medium"
                : "border-transparent text-muted-foreground hover:text-foreground"
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      <div className="overflow-x-auto">
        {activeTab === "users" && (
          <table className="w-full">
            <thead>
              <tr className="text-left text-xs text-muted-foreground uppercase tracking-wider">
                <th className="px-5 py-3">Name</th>
                <th className="px-5 py-3">Email</th>
                <th className="px-5 py-3">Role</th>
                <th className="px-5 py-3">Status</th>
                <th className="px-5 py-3">Joined</th>
                <th className="px-5 py-3"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {usersTable.map((user) => (
                <tr key={user.id} className="hover:bg-muted/50">
                  <td className="px-5 py-3 text-sm font-medium">{user.name}</td>
                  <td className="px-5 py-3 text-sm text-muted-foreground">{user.email}</td>
                  <td className="px-5 py-3 text-sm">{user.role}</td>
                  <td className="px-5 py-3"><StatusBadge status={user.status} /></td>
                  <td className="px-5 py-3 text-sm text-muted-foreground">{user.joined}</td>
                  <td className="px-5 py-3">
                    <button className="text-muted-foreground hover:text-foreground">
                      <Eye className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}

        {activeTab === "talents" && (
          <table className="w-full">
            <thead>
              <tr className="text-left text-xs text-muted-foreground uppercase tracking-wider">
                <th className="px-5 py-3">Name</th>
                <th className="px-5 py-3">Type</th>
                <th className="px-5 py-3">Rating</th>
                <th className="px-5 py-3">Bookings</th>
                <th className="px-5 py-3">Revenue</th>
                <th className="px-5 py-3">Status</th>
                <th className="px-5 py-3"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {talentsTable.map((talent) => (
                <tr key={talent.id} className="hover:bg-muted/50">
                  <td className="px-5 py-3 text-sm font-medium">{talent.name}</td>
                  <td className="px-5 py-3 text-sm">{talent.type}</td>
                  <td className="px-5 py-3 text-sm">⭐ {talent.rating}</td>
                  <td className="px-5 py-3 text-sm">{talent.bookings}</td>
                  <td className="px-5 py-3 text-sm font-medium">{talent.revenue}</td>
                  <td className="px-5 py-3"><StatusBadge status={talent.status} /></td>
                  <td className="px-5 py-3">
                    <button className="text-muted-foreground hover:text-foreground">
                      <MoreHorizontal className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}

        {activeTab === "reviews" && (
          <table className="w-full">
            <thead>
              <tr className="text-left text-xs text-muted-foreground uppercase tracking-wider">
                <th className="px-5 py-3">Reviewer</th>
                <th className="px-5 py-3">Talent</th>
                <th className="px-5 py-3">Rating</th>
                <th className="px-5 py-3">Date</th>
                <th className="px-5 py-3">Status</th>
                <th className="px-5 py-3"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {reviewsTable.map((review) => (
                <tr key={review.id} className="hover:bg-muted/50">
                  <td className="px-5 py-3 text-sm font-medium">{review.reviewer}</td>
                  <td className="px-5 py-3 text-sm">{review.talent}</td>
                  <td className="px-5 py-3 text-sm">{"⭐".repeat(review.rating)}</td>
                  <td className="px-5 py-3 text-sm text-muted-foreground">{review.date}</td>
                  <td className="px-5 py-3"><StatusBadge status={review.status} /></td>
                  <td className="px-5 py-3">
                    <button className="text-muted-foreground hover:text-foreground">
                      <Eye className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  )
}
