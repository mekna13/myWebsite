'use client'

import { useState, useRef } from 'react'

interface ImageUploaderProps {
  onImageUpload: (imageUrl: string) => void
  currentImage?: string
  label?: string
  className?: string
}

export default function ImageUploader({ 
  onImageUpload, 
  currentImage, 
  label = "Project Image",
  className = "" 
}: ImageUploaderProps) {
  const [uploading, setUploading] = useState(false)
  const [dragActive, setDragActive] = useState(false)
  const [preview, setPreview] = useState<string | null>(currentImage || null)
  const [error, setError] = useState<string | null>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleFileUpload = async (file: File) => {
    if (!file) return

    // Validate file type
    const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp']
    if (!allowedTypes.includes(file.type)) {
      setError('Invalid file type. Only JPEG, PNG, and WebP are allowed.')
      return
    }

    // Validate file size (5MB max)
    const maxSize = 5 * 1024 * 1024
    if (file.size > maxSize) {
      setError('File too large. Maximum size is 5MB.')
      return
    }

    setError(null)
    setUploading(true)

    try {
      const formData = new FormData()
      formData.append('file', file)

      const response = await fetch('/api/upload-image', {
        method: 'POST',
        body: formData,
      })

      const result = await response.json()

      if (result.success) {
        setPreview(result.data.url)
        onImageUpload(result.data.url)
      } else {
        setError(result.error || 'Failed to upload image')
      }
    } catch (error) {
      console.error('Upload error:', error)
      setError('Failed to upload image')
    } finally {
      setUploading(false)
    }
  }

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true)
    } else if (e.type === 'dragleave') {
      setDragActive(false)
    }
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setDragActive(false)

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFileUpload(e.dataTransfer.files[0])
    }
  }

  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      handleFileUpload(e.target.files[0])
    }
  }

  const handleRemoveImage = () => {
    setPreview(null)
    onImageUpload('')
    if (fileInputRef.current) {
      fileInputRef.current.value = ''
    }
  }

  return (
    <div className={`space-y-2 ${className}`}>
      <label className="block text-sm font-medium text-primary mb-2">
        {label}
      </label>

      {preview ? (
        // Image Preview
        <div className="relative">
          <img 
            src={preview} 
            alt="Preview"
            className="w-full h-64 object-cover rounded-lg shadow-md"
          />
          <div className="absolute top-2 right-2 flex gap-2">
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              className="bg-primary text-primary-light px-3 py-1 rounded-md text-sm hover:bg-primary-accent hover:text-primary transition-colors"
            >
              Replace
            </button>
            <button
              type="button"
              onClick={handleRemoveImage}
              className="bg-red-600 text-white px-3 py-1 rounded-md text-sm hover:bg-red-700 transition-colors"
            >
              Remove
            </button>
          </div>
        </div>
      ) : (
        // Upload Area
        <div
          className={`relative border-2 border-dashed rounded-lg p-8 text-center transition-colors ${
            dragActive 
              ? 'border-primary-accent bg-primary-accent/10' 
              : 'border-primary/30 hover:border-primary/50'
          }`}
          onDragEnter={handleDrag}
          onDragLeave={handleDrag}
          onDragOver={handleDrag}
          onDrop={handleDrop}
        >
          {uploading ? (
            <div className="flex flex-col items-center">
              <svg className="animate-spin h-8 w-8 text-primary mb-2" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none"/>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"/>
              </svg>
              <p className="text-primary">Uploading...</p>
            </div>
          ) : (
            <div>
              <svg className="mx-auto h-12 w-12 text-primary/40 mb-4" stroke="currentColor" fill="none" viewBox="0 0 48 48">
                <path d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              <p className="text-primary mb-2">
                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  className="text-primary-accent hover:text-primary font-medium"
                >
                  Click to upload
                </button>{' '}
                or drag and drop
              </p>
              <p className="text-sm text-primary/60">
                PNG, JPG, WebP up to 5MB
              </p>
            </div>
          )}
        </div>
      )}

      {error && (
        <p className="text-red-600 text-sm">{error}</p>
      )}

      {/* Hidden file input */}
      <input
        ref={fileInputRef}
        type="file"
        className="hidden"
        accept="image/jpeg,image/jpg,image/png,image/webp"
        onChange={handleFileInputChange}
      />
    </div>
  )
}