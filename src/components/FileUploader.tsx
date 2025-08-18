'use client'

import { useState, useRef } from 'react'

interface FileUploaderProps {
  onFileUpload: (fileUrl: string, filename: string) => void
  currentFile?: string
  label?: string
  className?: string
  acceptedTypes?: string[]
  maxSizeMB?: number
  uploadEndpoint?: string
}

export default function FileUploader({ 
  onFileUpload, 
  currentFile, 
  label = "Upload File",
  className = "",
  acceptedTypes = ['application/pdf'],
  maxSizeMB = 10,
  uploadEndpoint = '/api/resume'
}: FileUploaderProps) {
  const [uploading, setUploading] = useState(false)
  const [dragActive, setDragActive] = useState(false)
  const [preview, setPreview] = useState<{ url: string; filename: string } | null>(
    currentFile ? { url: currentFile, filename: 'Current File' } : null
  )
  const [error, setError] = useState<string | null>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const getFileTypeDisplay = () => {
    if (acceptedTypes.includes('application/pdf')) {
      return 'PDF'
    }
    return acceptedTypes.join(', ').toUpperCase()
  }

  const validateFile = (file: File) => {
    // Validate file type
    if (!acceptedTypes.includes(file.type)) {
      return `Invalid file type. Only ${getFileTypeDisplay()} files are allowed.`
    }

    // Validate file size
    const maxSize = maxSizeMB * 1024 * 1024
    if (file.size > maxSize) {
      return `File too large. Maximum size is ${maxSizeMB}MB.`
    }

    return null
  }

  const handleFileUpload = async (file: File) => {
    if (!file) return

    const validationError = validateFile(file)
    if (validationError) {
      setError(validationError)
      return
    }

    setError(null)
    setUploading(true)

    try {
      const formData = new FormData()
      formData.append('file', file)

      const response = await fetch(uploadEndpoint, {
        method: 'POST',
        body: formData,
      })

      const result = await response.json()

      if (result.success) {
        const fileUrl = result.data.cloudinaryUrl
        const filename = result.data.filename
        setPreview({ url: fileUrl, filename })
        onFileUpload(fileUrl, filename)
      } else {
        setError(result.error || 'Failed to upload file')
      }
    } catch (error) {
      console.error('Upload error:', error)
      setError('Failed to upload file')
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

  const handleRemoveFile = () => {
    setPreview(null)
    onFileUpload('', '')
    if (fileInputRef.current) {
      fileInputRef.current.value = ''
    }
  }

  const getFileIcon = () => {
    if (acceptedTypes.includes('application/pdf')) {
      return (
        <svg className="w-12 h-12 text-red-600" fill="currentColor" viewBox="0 0 24 24">
          <path d="M8.267 14.68c-.184 0-.308.018-.372.036v1.178c.076.018.171.023.302.023.479 0 .774-.242.774-.651 0-.366-.254-.586-.704-.586zm3.487.012c-.2 0-.33.018-.407.036v2.61c.077.018.201.018.313.018.817.006 1.349-.444 1.349-1.396.006-.83-.479-1.268-1.255-1.268z"/>
          <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8l-6-6zM9.498 16.19c-.309.29-.765.42-1.296.42a2.23 2.23 0 01-.308-.018v1.426H7v-3.936A7.558 7.558 0 018.219 14c.557 0 .953.106 1.22.319.254.202.426.533.426.923-.001.392-.131.723-.367.948zm3.807 1.355c-.42.349-1.059.515-1.84.515-.468 0-.799-.03-1.024-.06v-3.917A7.947 7.947 0 0111.66 14c.757 0 1.249.136 1.633.426.415.308.675.799.675 1.504 0 .763-.279 1.29-.663 1.615zM17 14.77h-1.532v.911H16.9v.734h-1.432v1.604h-.906V14.03H17v.74zM14 9h-1V4l5 5h-4z"/>
        </svg>
      )
    }
    return (
      <svg className="w-12 h-12 text-primary/40" stroke="currentColor" fill="none" viewBox="0 0 48 48">
        <path d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    )
  }

  return (
    <div className={`space-y-2 ${className}`}>
      <label className="block text-sm font-medium text-primary mb-2">
        {label}
      </label>

      {preview ? (
        // File Preview
        <div className="relative bg-primary-light border border-primary/20 rounded-lg p-6">
          <div className="flex items-center space-x-4">
            {getFileIcon()}
            <div className="flex-1">
              <p className="text-primary font-medium truncate">{preview.filename}</p>
              <p className="text-primary/60 text-sm">
                {acceptedTypes.includes('application/pdf') ? 'PDF Document' : 'File'}
              </p>
            </div>
            <div className="flex gap-2">
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className="bg-primary text-primary-light px-3 py-1 rounded-md text-sm hover:bg-primary-accent hover:text-primary transition-colors"
              >
                Replace
              </button>
              <button
                type="button"
                onClick={handleRemoveFile}
                className="bg-red-600 text-white px-3 py-1 rounded-md text-sm hover:bg-red-700 transition-colors"
              >
                Remove
              </button>
            </div>
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
              {getFileIcon()}
              <p className="text-primary mb-2 mt-4">
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
                {getFileTypeDisplay()} up to {maxSizeMB}MB
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
        accept={acceptedTypes.join(',')}
        onChange={handleFileInputChange}
      />
    </div>
  )
}