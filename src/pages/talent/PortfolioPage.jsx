import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { Eye, Save, Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { ProfileInfo, ServiceDetails, MediaUpload, AvailabilityGrid } from "@/features/talent/portfolio"
import {
  getTalentPortfolio,
  createTalentPortfolio,
  updateTalentPortfolio,
  deleteTalentMedia
} from "@/api/talent/talent"
import { getMe } from "@/api/auth"

const defaultForm = {
  talent_name: "",
  location: "",
  bio: "",
  service_type: "",
  min_price: "",
  max_price: "",
  is_available: true,
}

export default function PortfolioPage() {
  const [form, setForm] = useState(defaultForm)
  const [media, setMedia] = useState([])
  const [hasPortfolio, setHasPortfolio] = useState(false)
  const [saving, setSaving] = useState(false)
  const navigate = useNavigate()

  // Load existing portfolio on mount
  useEffect(() => {
    getMe().catch(() => navigate('/login'))
    getTalentPortfolio()
      .then((data) => {
        setHasPortfolio(true)
        setMedia(data.media || [])
        setForm({
          talent_name: data.talent_name || "",
          location: data.location || "",
          bio: data.bio || "",
          service_type: data.service_type || "",
          min_price: data.min_price || "",
          max_price: data.max_price || "",
          is_available: data.is_available,
        })
      })
      .catch(() => setHasPortfolio(false))
  }, [])

  const handleChange = (e) => {
    const { name, value } = e.target
    setForm((prev) => ({ ...prev, [name]: value }))
  }

  const handleSave = async () => {
    setSaving(true)
    try {
      if (hasPortfolio) {
        await updateTalentPortfolio(form)
      } else {
        await createTalentPortfolio(form)
        setHasPortfolio(true)
      }
      alert('Portfolio saved!')
    } catch (err) {
      alert('Failed to save portfolio')
      console.error(err)
    } finally {
      setSaving(false)
    }
  }

  const handleMediaUpload = (uploaded) => {
    setMedia((prev) => [...prev, uploaded])
  }

  const handleMediaDelete = async (mediaId) => {
    try {
      setMedia((prev) => prev.filter((m) => m.id !== mediaId))
    } catch (err) {
      alert('Failed to delete media')
    }
  }

  return (
    <div className="max-w-4xl mx-auto space-y-6">

      {/* Header */}
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold">Portfolio Editor</h2>
        <div className="flex gap-2">
          <Button variant="outline" size="sm" className="gap-2">
            <Eye className="w-4 h-4" /> Preview
          </Button>
          <Button
            size="sm"
            className="gap-2"
            onClick={handleSave}
            disabled={saving}
          >
            {saving
              ? <><Loader2 className="w-4 h-4 animate-spin" /> Saving...</>
              : <><Save className="w-4 h-4" /> Save Changes</>
            }
          </Button>
        </div>
      </div>

      <ProfileInfo form={form} onChange={handleChange} />
      <ServiceDetails form={form} onChange={handleChange} />
      <MediaUpload
        media={media}
        onUpload={handleMediaUpload}
        onDelete={handleMediaDelete}
      />
      <AvailabilityGrid />

    </div>
  )
}
