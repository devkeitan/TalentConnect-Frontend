import { Camera } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"

export function ProfileInfo({form, onChange}) {
  return (
    <div className="bg-white rounded-xl border border-border shadow-sm p-6">
      <h3 className="font-semibold mb-4">Profile Information</h3>

      {/* Avatar + Name/Location */}
      <div className="flex items-start gap-6 mb-6">
        <div className="relative shrink-0">
          <div className="w-24 h-24 rounded-xl overflow-hidden bg-muted">
            <img
              src="https://images.unsplash.com/photo-1602026084040-78e6134b2661?w=200"
              alt="Profile"
              className="w-full h-full object-cover"
              onError={(e) => { e.target.style.display = "none" }}
            />
          </div>
          <button className="absolute -bottom-1 -right-1 w-7 h-7 bg-primary rounded-full flex items-center justify-center text-white">
            <Camera className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="flex-1 grid sm:grid-cols-2 gap-4">
          <div className="space-y-1">
            <Label>Talent Name / Group Name</Label>
            <Input
              name="talent_name"
              value={form.talent_name}
              onChange={onChange}
              required
              defaultValue="e.g. Juan dela Cruz or The Bicol Band"
            />
          </div>
          <div className="space-y-1">
            <Label>Location</Label>
            <Input
              name="location"
              value={form.location}
              onChange={onChange}
              required
              defaultValue="Los Angeles, CA"
            />
          </div>
        </div>
      </div>

      {/* Bio */}
      <div className="space-y-1">
        <Label>Bio</Label>
        <Textarea
          name="bio"
          value={form.bio}
          onChange={onChange}
          rows={4}
          defaultValue="Tell organizers about yourself"
          className="resize-none"
        />
      </div>
    </div>
  )
}
