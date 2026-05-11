import { useEffect, useState } from "react"
import { Outlet, useLocation } from "react-router-dom"
import { Menu } from "lucide-react"
import {
  LayoutDashboard, BookImage, ClipboardList,
  MessageSquare, CalendarCheck, Star
} from "lucide-react"
import { Sidebar } from "@/components/layout/Sidebar"
import { getMe } from "@/api/auth"

const navItems = [
  { path: "/talent/dashboard",        label: "Dashboard",        icon: <LayoutDashboard className="w-4 h-4" /> },
  { path: "/talent/portfolio",        label: "Portfolio",        icon: <BookImage className="w-4 h-4" /> },
  { path: "/talent/booking-requests", label: "Booking Requests", icon: <ClipboardList className="w-4 h-4" /> },
  { path: "/talent/messages",         label: "Messages",         icon: <MessageSquare className="w-4 h-4" /> },
  { path: "/talent/reviews",          label: "Reviews",          icon: <Star className="w-4 h-4" /> },
]

export default function TalentLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const location = useLocation()
  const [user, setUser] = useState("")
   
  useEffect(() => {
    getMe()
      .then(setUser)
      .catch(() => setUser(null));
  }, [])
  
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
          {user && <span className="text-sm text-muted-foreground">Hello, {user.name}</span>}
        </header>

        <main className="flex-1 p-6 overflow-auto">
          <Outlet />
        </main>
      </div>
    </div>
  )
}
