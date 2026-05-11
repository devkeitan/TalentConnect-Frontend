import { Button } from "@/components/ui/button"

const filters = ["all", "pending", "accepted", "rejected", "confirmed"]

export function BookingRequestFilters({ active, onChange }) {
  return (
    <div className="flex flex-wrap gap-2">
      {filters.map((filter) => (
        <Button
          key={filter}
          size="sm"
          variant={active === filter ? "default" : "outline"}
          className="capitalize"
          onClick={() => onChange(filter)}
        >
          {filter}
        </Button>
      ))}
    </div>
  )
}
