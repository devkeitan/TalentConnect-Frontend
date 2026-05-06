import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import {
  Select, SelectContent, SelectItem,
  SelectTrigger, SelectValue
} from "@/components/ui/select"

export function ServiceDetails({ form, onChange }) {

  return (
    <div className="bg-white rounded-xl border border-border shadow-sm p-6">
      <h3 className="font-semibold mb-4">Service Details</h3>
      <div className="grid sm:grid-cols-3 gap-4">

        <div className="space-y-1">
          <Label>Service Type</Label>
          <Select
            value={form.service_type}
            onValueChange={(value) => onChange({ target: { name: 'service_type', value } })}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="singer">Singer</SelectItem>
              <SelectItem value="dancer">Dancer</SelectItem>
              <SelectItem value="dj">DJ</SelectItem>
              <SelectItem value="band">Band</SelectItem>
              <SelectItem value="emcee">Host / Emcee</SelectItem>
              <SelectItem value="comedian">Comedian</SelectItem>
              <SelectItem value="musician">Musician</SelectItem>
              <SelectItem value="other">Other</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-1">
          <Label>Min Price (₱)</Label>
          <Input
            type="number"
            name="min_price"
            value={form.min_price}
            onChange={onChange}
            placeholder="e.g. 5000"
          />
        </div>

        <div className="space-y-1">
          <Label>Max Price (₱)</Label>
          <Input
            type="number"
            name="max_price"
            value={form.max_price}
            onChange={onChange}
            placeholder="e.g. 15000"
          />
        </div>

      </div>
    </div>
  )
}
