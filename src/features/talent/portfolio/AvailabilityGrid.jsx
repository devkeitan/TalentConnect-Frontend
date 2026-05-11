import { useState } from "react"

const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"]
const initialAvailable = [2, 3, 5, 8, 9, 12, 15, 16, 19, 22, 23, 26]

export function AvailabilityGrid() {
  const [available, setAvailable] = useState(initialAvailable)

  const toggle = (i) => {
    setAvailable((prev) =>
      prev.includes(i) ? prev.filter((d) => d !== i) : [...prev, i]
    )
  }

  return (
    <div className="bg-white rounded-xl border border-border shadow-sm p-6">
      <h3 className="font-semibold mb-4">Availability</h3>

      <div className="grid grid-cols-7 gap-2 text-center mb-4">
        {days.map((day) => (
          <div key={day} className="text-xs text-muted-foreground font-medium py-1">{day}</div>
        ))}
        {Array.from({ length: 28 }, (_, i) => (
          <button
            key={i}
            onClick={() => toggle(i)}
            className={`py-2 rounded-lg text-sm transition-colors ${
              available.includes(i)
                ? "bg-green-100 text-green-700 hover:bg-green-200"
                : "bg-muted text-muted-foreground hover:bg-muted/80"
            }`}
          >
            {i + 1}
          </button>
        ))}
      </div>

      <div className="flex items-center gap-4 text-xs text-muted-foreground">
        <span className="flex items-center gap-1">
          <span className="w-3 h-3 bg-green-100 rounded" /> Available
        </span>
        <span className="flex items-center gap-1">
          <span className="w-3 h-3 bg-muted rounded" /> Unavailable
        </span>
      </div>
    </div>
  )
}
