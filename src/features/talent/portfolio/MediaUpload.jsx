import { useState, useRef } from "react"
import { Plus, Upload, Trash2, Loader2 } from "lucide-react"
import { uploadTalentMedia, deleteTalentMedia } from "@/api/talent/talent"

export function MediaUpload({ media = [], onUpload, onDelete }) {
  const [uploading, setUploading] = useState(false)
  const photoInputRef = useRef(null)
  const videoInputRef = useRef(null)

  const photos = media.filter((m) => m.media_type === 'photo')
  const videos = media.filter((m) => m.media_type === 'video')

  const handleFileChange = async (e, mediaType) => {
    const files = Array.from(e.target.files)
    if (!files.length) return
    setUploading(true)
    try {
      for (const file of files) {
        const formData = new FormData()
        formData.append('file', file)
        formData.append('media_type', mediaType)
        formData.append('caption', file.name)
        const uploaded = await uploadTalentMedia(formData)
        onUpload(uploaded)
      }
    } catch (err) {
      alert('Upload failed')
      console.error(err)
    } finally {
      setUploading(false)
      e.target.value = ''  // reset input
    }
  }

  const handleDelete = async (mediaId) => {
    try {
      await deleteTalentMedia(mediaId)
      onDelete(mediaId)
    } catch (err) {
      alert('Failed to delete')
    }
  }

  return (
    <div className="bg-white rounded-xl border border-border shadow-sm p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-semibold">Media Upload</h3>
        {uploading && (
          <div className="flex items-center gap-1 text-sm text-muted-foreground">
            <Loader2 className="w-4 h-4 animate-spin" />
            Uploading...
          </div>
        )}
      </div>

      <div className="grid sm:grid-cols-2 gap-6">

        {/* Photos */}
        <div>
          <p className="text-sm text-muted-foreground mb-2">Photos</p>
          <div className="grid grid-cols-3 gap-2 mb-3">
            {/* Existing photos */}
            {photos.map((photo) => (
              <div key={photo.id} className="relative aspect-square rounded-lg overflow-hidden group">
                <img
                  src={photo.file}
                  alt={photo.caption}
                  className="w-full h-full object-cover"
                />
               <button
      type="button"
      onClick={() => handleDelete(photo.id)}
      className="absolute top-1 right-1 bg-red-500 hover:bg-red-600 text-white rounded-full p-1 transition-colors"
    >
                  <Trash2 className="w-4 h-4 text-white" />
                </button>
              </div>
            ))}
            {/* Empty placeholders */}
            {photos.length === 0 && [1, 2, 3].map((i) => (
              <div key={i} className="aspect-square bg-muted rounded-lg" />
            ))}
          </div>

          {/* Hidden file input */}
          <input
            ref={photoInputRef}
            type="file"
            accept="image/*"
            multiple
            className="hidden"
            onChange={(e) => handleFileChange(e, 'photo')}
          />
          <button
            type="button"
            onClick={() => photoInputRef.current.click()}
            disabled={uploading}
            className="flex items-center gap-2 text-sm text-primary hover:underline disabled:opacity-50"
          >
            <Plus className="w-4 h-4" /> Add Photos
          </button>
        </div>

        {/* Videos */}
        <div>
          <p className="text-sm text-muted-foreground mb-2">Performance Videos</p>

          {/* Existing videos */}
          {videos.length > 0 && (
            <div className="space-y-2 mb-3">
              {videos.map((video) => (
                <div key={video.id} className="relative rounded-lg overflow-hidden group">
                  <video
                    src={video.file}
                    controls
                    className="w-full rounded-lg"
                  />
                 <button
      type="button"
      onClick={() => handleDelete(video.id)}
      className="absolute top-2 right-2 bg-red-500 hover:bg-red-600 text-white rounded-full p-1 transition-colors"
    >
                    <Trash2 className="w-3 h-3" />
                  </button>
                </div>
              ))}
            </div>
          )}

          {/* Hidden video input */}
          <input
            ref={videoInputRef}
            type="file"
            accept="video/*"
            multiple
            className="hidden"
            onChange={(e) => handleFileChange(e, 'video')}
          />

          {/* Drop zone — clicking also triggers upload */}
          <div
            onClick={() => videoInputRef.current.click()}
            className="border-2 border-dashed border-border rounded-lg p-8 text-center cursor-pointer hover:border-primary/50 transition-colors"
          >
            <Upload className="w-8 h-8 text-muted-foreground mx-auto mb-2" />
            <p className="text-sm text-muted-foreground">Drag & drop videos or click to upload</p>
            <p className="text-xs text-muted-foreground mt-1">MP4, MOV up to 100MB</p>
          </div>
        </div>

      </div>
    </div>
  )
}
