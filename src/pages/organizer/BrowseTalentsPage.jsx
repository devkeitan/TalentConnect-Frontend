import { TalentGrid } from "@/features/organizer/browse-talents"

export default function BrowseTalentsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-semibold">Browse Talents</h2>
        <p className="text-sm text-muted-foreground mt-1">
          Discover and book talented performers for your events.
        </p>
      </div>
      <TalentGrid />
    </div>
  )
}
