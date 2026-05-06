import { useState, useEffect } from "react"
import { useParams, useNavigate } from "react-router-dom"
import { ArrowLeft, Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  TalentProfileHeader,
  TalentMediaGallery,
  BookingForm
} from "@/features/organizer/talent-detail"
import { getTalentById } from "@/api/talent/talent"
import { getEvents } from "@/api/organizer/organizer"
import { TalentReviewsPreview } from "@/features/talent/reviews"

export default function TalentDetailPage() {
  const { id } = useParams()
  const navigate = useNavigate()

  const [talent, setTalent]   = useState(null)
  const [events, setEvents]   = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    Promise.all([getTalentById(id), getEvents()])
      .then(([talentData, eventsData]) => {
        setTalent(talentData)
        setEvents(eventsData)
      })
      .catch(console.error)
      .finally(() => setLoading(false))
  }, [id])

  if (loading) return (
    <div className="flex items-center justify-center py-24">
      <Loader2 className="w-6 h-6 animate-spin text-muted-foreground" />
    </div>
  )

  if (!talent) return (
    <div className="flex flex-col items-center justify-center py-24 gap-4">
      <p className="text-muted-foreground text-sm">Talent not found.</p>
      <Button variant="outline" onClick={() => navigate("/organizer/browse-talents")}>
        Back to Browse
      </Button>
    </div>
  )

 const photos = talent.media?.filter((m) => m.media_type === 'photo') || []
const videos = talent.media?.filter((m) => m.media_type === 'video') || []


  return (
    <div className="max-w-6xl mx-auto space-y-6">
      <Button
        variant="ghost"
        size="sm"
        className="gap-2 -ml-2 text-muted-foreground"
        onClick={() => navigate("/organizer/browse-talents")}
      >
        <ArrowLeft className="w-4 h-4" /> Back to Browse
      </Button>

      <div className="grid lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <TalentProfileHeader talent={talent} />
          <TalentMediaGallery images={talent.media || []} />

          <TalentReviewsPreview talentId={talent.id} />

        </div>
        <div className="lg:col-span-1">
          <BookingForm talent={talent} events={events} />
        </div>
      </div>
    </div>
  )
}
