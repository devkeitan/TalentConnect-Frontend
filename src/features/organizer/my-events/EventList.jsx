import { useState, useEffect } from "react"
import { Plus, Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { EventCard } from "./EventCard"
import { EventFormDialog } from "./EventFormDialog"
import { DeleteEventDialog } from "./DeleteEventDialog"
import { getEvents, createEvent, deleteEvent, updateEvent } from "@/api/organizer/organizer"

import { parseISO, isToday, isPast } from "date-fns"
const STATUS_FILTERS = ["all", "upcoming", "ongoing", "completed", "cancelled"]

export function EventList() {
  const [events, setEvents]         = useState([])
  const [loading, setLoading]       = useState(true)
  const [filter, setFilter]         = useState("all")
  const [formOpen, setFormOpen]     = useState(false)
  const [editTarget, setEditTarget] = useState(null)
  const [deleteId, setDeleteId]     = useState(null)
  const [saving, setSaving]         = useState(false)

  // Load events from API on mount
  useEffect(() => {
    getEvents()
      .then(setEvents)
      .catch(console.error)
      .finally(() => setLoading(false))
  }, [])

  const filtered = filter === "all" ? events : events.filter((e) => e.status === filter)

 const handleSave = async (form) => {
  setSaving(true)
  try {
    const payload = {
      event_name: form.name,
      event_type: form.type,
      date: form.date,
      time: form.time,
      location: form.location,
      description: form.description,
    }

    if (editTarget) {
      // ← now actually saves to backend
      const updated = await updateEvent(editTarget.id, payload)
      setEvents((prev) => prev.map((e) => e.id === editTarget.id ? updated : e))
    } else {
      const created = await createEvent(payload)
      setEvents((prev) => [...prev, created])
    }

    setFormOpen(false)
    setEditTarget(null)
  } catch (err) {
    alert('Failed to save event')
    console.error(err)
  } finally {
    setSaving(false)
  }
}

  const handleEdit = (event) => {
    setEditTarget(event)
    setFormOpen(true)
  }

  const handleDeleteConfirm = async () => {
    try {
      await deleteEvent(deleteId)
      setEvents((prev) => prev.filter((e) => e.id !== deleteId))
      setDeleteId(null)
    } catch (err) {
      alert('Failed to delete event')
      console.error(err)
    }
  }

  const getEventStatus = (dateStr) => {
  const date = parseISO(dateStr)
  if (isToday(date)) return "ongoing"
  if (isPast(date))  return "completed"
  return "upcoming"
}

  if (loading) return (
    <div className="flex items-center justify-center py-20">
      <Loader2 className="w-6 h-6 animate-spin text-muted-foreground" />
    </div>
  )
  

  return (
    <div className="space-y-5">

      {/* Toolbar */}
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex flex-wrap gap-1.5">
          {STATUS_FILTERS.map((f) => (
            <Button
              key={f}
              size="sm"
              variant={filter === f ? "default" : "outline"}
              className="capitalize"
              onClick={() => setFilter(f)}
            >
              {f}
            </Button>
          ))}
        </div>
        <Button size="sm" className="gap-2" onClick={() => { setEditTarget(null); setFormOpen(true) }}>
          <Plus className="w-4 h-4" /> New Event
        </Button>
      </div>

      {/* Count */}
      <p className="text-sm text-muted-foreground">
        {filtered.length} event{filtered.length !== 1 ? "s" : ""}
      </p>

      {/* Grid */}
      {filtered.length === 0 ? (
        <div className="text-center py-20 text-sm text-muted-foreground">
          No events found.
        </div>
      ) : (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {filtered.map((event) => (
            <EventCard
              key={event.id}
              event={event}
              onEdit={handleEdit}
              onDelete={setDeleteId}
            />
          ))}
        </div>
      )}

      {/* Dialogs */}
      <EventFormDialog
        open={formOpen}
        onClose={() => { setFormOpen(false); setEditTarget(null) }}
        onSave={handleSave}
        event={editTarget}
        saving={saving}
      />
      <DeleteEventDialog
        open={!!deleteId}
        onClose={() => setDeleteId(null)}
        onConfirm={handleDeleteConfirm}
      />

    </div>
  )
}
