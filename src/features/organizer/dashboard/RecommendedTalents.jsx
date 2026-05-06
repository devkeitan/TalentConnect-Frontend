import { useNavigate } from "react-router-dom"
import { Star } from "lucide-react"

export function RecommendedTalents({ talents = [] }) {
  const navigate = useNavigate()

  return (
    <div className="bg-white rounded-xl border border-border shadow-sm">
      <div className="p-5 border-b border-border flex items-center justify-between">
        <h3 className="font-semibold">Recommended Talents</h3>
        <button
          onClick={() => navigate("/organizer/browse-talents")}
          className="text-xs text-primary hover:underline"
        >
          Browse All
        </button>
      </div>

      {talents.length === 0 ? (
        <div className="p-8 text-center text-sm text-muted-foreground">
          No talents available yet.
        </div>
      ) : (
        <div className="divide-y divide-border">
          {talents.map((talent) => (
            <div
              key={talent.id}
              onClick={() => navigate(`/organizer/browse-talents/${talent.id}`)}
              className="p-4 flex items-center gap-4 hover:bg-muted/50 transition-colors cursor-pointer"
            >
              <div className="w-12 h-12 rounded-lg overflow-hidden bg-muted shrink-0">
                <img
                  src={talent.avatar}
                  alt={talent.talent_name}
                  className="w-full h-full object-cover"
                  onError={(e) => { e.target.style.display = "none" }}
                />
              </div>
              <div className="flex-1">
                <div className="font-medium text-sm">{talent.talent_name}</div>
                <div className="text-xs text-muted-foreground">{talent.service_type}</div>
              </div>
              {talent.rating > 0 && (
                <div className="flex items-center gap-1">
                  <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                  <span className="text-sm font-medium">{talent.rating}</span>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
