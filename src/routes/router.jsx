import { createBrowserRouter, Navigate } from "react-router-dom"

// Layouts
import OrganizerLayout from "@/components/layout/OrganizerLayout"
import TalentLayout from "@/components/layout/TalentLayout"

// Organizer Pages
import OrganizerDashboard from "@/pages/organizer/DashboardPage"
import BrowseTalents from "@/pages/organizer/BrowseTalentsPage"
import MyEvents from "@/pages/organizer/MyEventsPage"
import OrganizerMessages from "@/pages/organizer/MessagesPage"
import OrganizerReviews from "@/pages/organizer/ReviewsPage"
import TalentDetailPage from "@/pages/organizer/TalentDetailPage"

// Talent Pages
import TalentDashboard from "@/pages/talent/DashboardPage"
import Portfolio from "@/pages/talent/PortfolioPage"
import TalentBookingRequests from "@/pages/talent/BookingRequestPage"
import TalentMessages from "@/pages/talent/MessagesPage"
import TalentReviews from "@/pages/talent/ReviewsPage"

// Public Pages
import LoginPage from "@/pages/LoginPage"
import RegisterPage from "@/pages/RegisterPage"
import OrganizerBookingRequestPage from "@/pages/organizer/BookingRequestPage"
import AvailabilityPage from "@/pages/talent/AvailabilityPage"
import OrganizerProfile from "@/pages/organizer/Profile"
import TalentBookingDetailPage from "@/pages/talent/BookingDetailPage"
import OrganizerBookingDetailPage from "@/pages/organizer/BookingDetailPage"
import LandingPage from "@/pages/LandingPage"

const router = createBrowserRouter([
  // Public Routes
  { path: "/", element: <Navigate to="/landing" replace /> },
  {path: "/landing", element: <LandingPage /> },
  { path: "/login", element: <LoginPage /> },
  { path: "/register", element: <RegisterPage /> },

  // Organizer Routes
  {
    path: "/organizer",
    element: <OrganizerLayout />,
    children: [
      { index: true, element: <Navigate to="dashboard" replace /> },
      { path: "dashboard", element: <OrganizerDashboard /> },
      { path: "browse-talents", element: <BrowseTalents /> },
      { path: "my-events", element: <MyEvents /> },
      { path: "booking-requests", element: <OrganizerBookingRequestPage /> },
      { path: "booking-requests/:id", element: <OrganizerBookingDetailPage /> },
      { path: "browse-talents/:id", element: <TalentDetailPage /> },
      { path: "messages", element: <OrganizerMessages /> },
      { path: "reviews", element: <OrganizerReviews /> },
      { path: "profile", element: <OrganizerProfile /> }
    ],
  },

  // Talent Routes
  {
    path: "/talent",
    element: <TalentLayout />,
    children: [
      { index: true, element: <Navigate to="dashboard" replace /> },
      { path: "dashboard", element: <TalentDashboard /> },
      { path: "portfolio", element: <Portfolio /> },
      { path: "booking-requests", element: <TalentBookingRequests /> },
      { path: "booking-requests/:id", element: <TalentBookingDetailPage /> },
      { path: "messages", element: <TalentMessages /> },
      { path: "availability", element: <AvailabilityPage /> },
      { path: "reviews", element: <TalentReviews /> },
    ],
  },

  // Catch-all
  { path: "*", element: <Navigate to="/landing" replace /> },
])

export default router
