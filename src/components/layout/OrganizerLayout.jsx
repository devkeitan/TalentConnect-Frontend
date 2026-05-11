import { useState } from "react"
import { Outlet, useLocation } from "react-router-dom"
import { Menu, User } from "lucide-react"
import {
  LayoutDashboard, Search, CalendarDays,
  ClipboardList, MessageSquare, Star
} from "lucide-react"
import { Sidebar } from "@/components/layout/Sidebar"

const navItems = [
  { path: "/organizer/dashboard",        label: "Dashboard",        icon: <LayoutDashboard className="w-4 h-4" /> },
  { path: "/organizer/my-events",        label: "My Events",        icon: <CalendarDays className="w-4 h-4" /> },
  { path: "/organizer/browse-talents",   label: "Browse Talents",   icon: <Search className="w-4 h-4" /> },
  { path: "/organizer/booking-requests", label: "Booking Requests", icon: <ClipboardList className="w-4 h-4" /> },
  { path: "/organizer/messages",         label: "Messages",         icon: <MessageSquare className="w-4 h-4" /> },
  { path: "/organizer/reviews",          label: "Reviews",          icon: <Star className="w-4 h-4" /> },
  { path: "/organizer/profile",          label: "Profile",          icon: <User className="w-4 h-4" /> }
]

export default function OrganizerLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const location = useLocation()

    const currentLabel = navItems.find((item) =>
    location.pathname.startsWith(item.path)
  )?.label ?? "Dashboard"
  return (
    <div className="flex min-h-screen bg-background">
      <Sidebar
        items={navItems}
        open={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
      />

      <div className="flex-1 flex flex-col min-w-0">
        {/* Topbar */}
        <header className="h-[73px] border-b border-border  flex items-center px-6 gap-4">
          <button
            className="lg:hidden text-muted-foreground hover:text-foreground"
            onClick={() => setSidebarOpen(true)}
          >
            <Menu className="w-5 h-5" />
          </button>
          <span className="text-sm text-muted-foreground">{currentLabel}</span>
        </header>

        <main className="flex-1 p-6 overflow-auto">
          <Outlet />
        </main>
      </div>
    </div>
  )
}
