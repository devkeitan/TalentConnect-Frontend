import { MapPin, DollarSign } from "lucide-react"
import { Badge } from "@/components/ui/badge"

export function TalentProfileHeader({ talent }) {
const coverImage = talent.media?.find((m) => m.media_type === 'photo')?.file


  return (
    <div className="bg-white rounded-xl border border-border shadow-sm overflow-hidden">
      <div className="h-48 bg-muted overflow-hidden">
        {coverImage ? (
          <img src={coverImage} alt={talent.talent_name} className="w-full h-full object-cover" />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-muted-foreground text-sm">
            No cover photo
          </div>
        )}
      </div>

      <div className="p-6">
        <div className="flex flex-wrap items-center gap-2 mb-1">
          <h2 className="text-xl font-bold">{talent.talent_name}</h2>
          <Badge variant="secondary">{talent.service_type}</Badge>
        </div>
        <div className="flex flex-wrap gap-4 text-sm text-muted-foreground mb-3">
          <span className="flex items-center gap-1">
            <MapPin className="w-3.5 h-3.5" />{talent.location || 'Location not set'}
          </span>
          <span className="flex items-center gap-1">
            <DollarSign className="w-3.5 h-3.5" />${talent.min_price} – ${talent.max_price} per event
          </span>
        </div>
        {talent.bio && (
          <p className="text-sm text-muted-foreground mt-4 leading-relaxed">{talent.bio}</p>
        )}
      </div>
    </div>
  )
}
