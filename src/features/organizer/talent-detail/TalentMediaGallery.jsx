import { useState } from "react"

export function TalentMediaGallery({ images = [] }) {
  const [active, setActive] = useState(0)

  if (images.length === 0) return null

  return (
    <div className="bg-white rounded-xl border border-border shadow-sm p-6">
      <h3 className="font-semibold mb-4">Media Gallery</h3>

      {/* Main Image */}
      <div className="aspect-video bg-muted rounded-lg overflow-hidden mb-3">
        <img
          src={images[active]?.file}
          alt="Performance"
          className="w-full h-full object-cover"
          onError={(e) => { e.target.style.display = "none" }}
        />
      </div>

      {/* Thumbnails */}
      <div className="flex gap-2 overflow-x-auto pb-1">
        {images.map((img, i) => (
          <button
            key={i}
            onClick={() => setActive(i)}
            className={`w-16 h-16 rounded-lg overflow-hidden shrink-0 border-2 transition-colors ${
              active === i ? "border-primary" : "border-transparent"
            }`}
          >
            <img
              src={img?.file}
              alt={`thumb-${i}`}
              className="w-full h-full object-cover"
              onError={(e) => { e.target.style.display = "none" }}
            />
          </button>
        ))}
      </div>
    </div>
  )
}
