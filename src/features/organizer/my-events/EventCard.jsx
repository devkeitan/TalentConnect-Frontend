import { Calendar, MapPin, Star, MoreVertical, Pencil, Trash2 } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu, DropdownMenuContent,
  DropdownMenuItem, DropdownMenuTrigger
} from "@/components/ui/dropdown-menu"

const EVENT_IMAGES = {
  "Wedding": "https://images.unsplash.com/photo-1519225421980-715cb0215aed?w=400&q=80",
  "Birthday Party": "https://images.unsplash.com/photo-1530103862676-de8c9debad1d?w=400&q=80",
  "Corporate Event": "https://images.unsplash.com/photo-1511578314322-379afb476865?w=400&q=80",
  "Music Festival": "https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?w=400&q=80",
  "Private Party": "https://images.unsplash.com/photo-1543007630-9710e4a00a20?w=400&q=80",
  "Charity Gala": "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=400&q=80",
  "Other": "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=400&q=80",
}

const statusStyles = {
  upcoming:  "bg-blue-100 text-blue-700 hover:bg-blue-100",
  ongoing:   "bg-green-100 text-green-700 hover:bg-green-100",
  completed: "bg-purple-100 text-purple-700 hover:bg-purple-100",
  cancelled: "bg-red-100 text-red-700 hover:bg-red-100",
}

export function EventCard({ event, onEdit, onDelete, onReview }) {
  const isCompleted = event.status === "completed"
  const eventImage = EVENT_IMAGES[event.event_type] || EVENT_IMAGES["Other"]

  return (
    <div className="bg-white rounded-xl border border-border shadow-sm overflow-hidden hover:shadow-md transition-shadow">
      {/* Cover */}
      <div className="h-36 bg-muted overflow-hidden relative">
        <img
          src={eventImage}
          alt={event.event_type}
          className="w-full h-full object-cover"
        />
        <div className="absolute top-3 right-3">
          <Badge className={statusStyles[event.status]}>{event.status}</Badge>
        </div>
      </div>

      <div className="p-4">
        {/* Title + Menu */}
        <div className="flex items-start justify-between gap-2 mb-3">
          <div>
            <h4 className="font-semibold text-sm">{event.event_name}</h4>
            <p className="text-xs text-muted-foreground mt-0.5">{event.event_type}</p>
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="w-7 h-7 shrink-0">
                <MoreVertical className="w-4 h-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={() => onEdit(event)} className="gap-2">
                <Pencil className="w-3.5 h-3.5" /> Edit
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => onDelete(event.id)}
                className="gap-2 text-red-500 focus:text-red-500"
              >
                <Trash2 className="w-3.5 h-3.5" /> Delete
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        {/* Details */}
        <div className="space-y-1.5 mb-4">
          <div className="flex items-center gap-2 text-xs text-muted-foreground">
            <Calendar className="w-3.5 h-3.5 shrink-0" />
            {event.date} · {event.time}
          </div>
          <div className="flex items-center gap-2 text-xs text-muted-foreground">
            <MapPin className="w-3.5 h-3.5 shrink-0" />
            {event.location}
          </div>
        </div>

        {/* Actions */}
        <div className="flex gap-2">
          <Button
            variant="outline"
            size="sm"
            className="flex-1 text-xs"
            onClick={() => onEdit(event)}
          >
            View Details
          </Button>
          {isCompleted && (
            <Button
              size="sm"
              className="flex-1 text-xs gap-1"
              onClick={() => onReview(event)}
            >
              <Star className="w-3.5 h-3.5" /> Review
            </Button>
          )}
        </div>
      </div>
    </div>
  )
}
