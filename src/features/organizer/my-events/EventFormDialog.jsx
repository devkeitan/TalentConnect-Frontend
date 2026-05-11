import { useState, useEffect } from "react"
import { Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import {
  Dialog, DialogContent, DialogHeader,
  DialogTitle, DialogFooter
} from "@/components/ui/dialog"
import {
  Select, SelectContent, SelectItem,
  SelectTrigger, SelectValue
} from "@/components/ui/select"

const EVENT_TYPES = ["Wedding", "Birthday Party", "Corporate Event", "Music Festival", "Private Party", "Charity Gala", "Other"]

const EMPTY_FORM = {
  name: "", type: "", date: "",
  time: "", location: "", description: "",
}

export function EventFormDialog({ open, onClose, onSave, event }) {
  const [form, setForm] = useState(EMPTY_FORM)
  const [saving, setSaving] = useState(false)
  const isEdit = !!event

useEffect(() => {
  setForm(event
    ? {
        name: event.event_name,        
        type: event.event_type,         
        date: event.date,
        time: event.time,
        location: event.location,
        description: event.description ?? ""
      }
    : EMPTY_FORM
  )
}, [event, open])

  const set = (key, val) => setForm((prev) => ({ ...prev, [key]: val }))

  const handleSubmit = async (e) => {
    e.preventDefault()
    setSaving(true)
    try {
      await onSave(form)
    } finally {
      setSaving(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>{isEdit ? "Edit Event" : "Create New Event"}</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4 py-2">
          <div className="space-y-1">
            <Label>Event Name</Label>
            <Input
              placeholder="e.g. Johnson Wedding Reception"
              value={form.name}
              onChange={(e) => set("name", e.target.value)}
              required
            />
          </div>

          <div className="space-y-1">
            <Label>Event Type</Label>
            <Select value={form.type} onValueChange={(v) => set("type", v)} required>
              <SelectTrigger>
                <SelectValue placeholder="Select event type" />
              </SelectTrigger>
              <SelectContent>
                {EVENT_TYPES.map((t) => (
                  <SelectItem key={t} value={t}>{t}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-1">
              <Label>Date</Label>
              <Input
                type="date"
                value={form.date}
                onChange={(e) => set("date", e.target.value)}
                required
              />
            </div>
            <div className="space-y-1">
              <Label>Time</Label>
              <Input
                type="time"
                value={form.time}
                onChange={(e) => set("time", e.target.value)}
                required
              />
            </div>
          </div>

          <div className="space-y-1">
            <Label>Location</Label>
            <Input
              placeholder="Venue name or address"
              value={form.location}
              onChange={(e) => set("location", e.target.value)}
              required
            />
          </div>

          <div className="space-y-1">
            <Label>Description <span className="text-muted-foreground text-xs">(optional)</span></Label>
            <Textarea
              placeholder="Brief description of the event..."
              rows={3}
              className="resize-none"
              value={form.description}
              onChange={(e) => set("description", e.target.value)}
            />
          </div>

          <DialogFooter>
            <Button type="button" variant="outline" onClick={onClose} disabled={saving}>
              Cancel
            </Button>
            <Button type="submit" disabled={saving}>
              {saving
                ? <><Loader2 className="w-4 h-4 animate-spin mr-1" /> Saving...</>
                : isEdit ? "Save Changes" : "Create Event"
              }
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
