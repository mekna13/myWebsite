'use client'

import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import FileUploader from '@/components/FileUploader'
import { Resume } from '@/lib/types'

export default function AdminResume() {
  const { data: session, status } = useSession()
  const router = useRouter()
  const [resume, setResume] = useState<Resume | null>(null)
  const [loading, setLoading] = useState(true)
  const [deleting, setDeleting] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState<string | null>(null)

  useEffect(() => {
    if (status === 'loading') return
    if (!session) {
      router.push('/admin/login')
      return
    }

    fetchResume()
  }, [session, status, router])

  const fetchResume = async () => {
    try {
      setLoading(true)
      const response = await fetch('/api/resume')
      const result = await response.json()
      
      if (result.success) {
        // We need to get the full resume data including ID for deletion
        // Since the public endpoint doesn't return ID, we'll create a mock structure
        setResume({
          _id: 'current', // We'll handle this in delete function
          filename: result.data.filename,
          cloudinaryUrl: result.data.cloudinaryUrl,
          cloudinaryPublicId: '',
          uploadedAt: new Date(result.data.uploadedAt),
          isActive: true,
          __v: 0
        })
      } else {
        setResume(null)
      }
    } catch (error) {
      console.error('Error fetching resume:', error)
      setError('Failed to load resume')
    } finally {
      setLoading(false)
    }
  }

  const handleFileUpload = (fileUrl: string, filename: string) => {
    if (fileUrl && filename) {
      setSuccess('Resume uploaded successfully!')
      setError(null)
      // Refresh the resume data
      fetchResume()
    }
  }

  const handleDeleteResume = async () => {
    if (!resume || !confirm('Are you sure you want to delete the current resume?')) {
      return
    }

    try {
      setDeleting(true)
      setError(null)
      
      // For deletion, we need to fetch all resumes to get the actual ID
      // This is a limitation of our current public API design
      const response = await fetch('/api/resume', {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
      })

      const result = await response.json()
      
      if (result.success) {
        setSuccess('Resume deleted successfully!')
        setResume(null)
      } else {
        setError(result.error || 'Failed to delete resume')
      }
    } catch (error) {
      console.error('Error deleting resume:', error)
      setError('Failed to delete resume')
    } finally {
      setDeleting(false)
    }
  }

  if (status === 'loading' || loading) {
    return (
      <div className="min-h-screen bg-primary flex items-center justify-center">
        <div className="text-primary-light">Loading...</div>
      </div>
    )
  }

  if (!session) {
    return null
  }

  return (
    <div className="min-h-screen bg-primary">
      {/* Header */}
      <header className="bg-primary-light shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div>
              <h1 className="text-3xl font-bold text-primary">Resume Management</h1>
              <p className="text-primary/70">Upload and manage your resume</p>
            </div>
            <div className="flex items-center gap-4">
              <button
                onClick={() => router.push('/admin/dashboard')}
                className="text-primary hover:text-primary-accent transition-colors"
              >
                ← Back to Dashboard
              </button>
              <a 
                href="/"
                className="text-primary hover:text-primary-accent transition-colors"
              >
                View Portfolio
              </a>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Status Messages */}
        {error && (
          <div className="mb-6 p-4 bg-red-100 border border-red-400 text-red-700 rounded-md">
            {error}
          </div>
        )}
        
        {success && (
          <div className="mb-6 p-4 bg-green-100 border border-green-400 text-green-700 rounded-md">
            {success}
          </div>
        )}

        <div className="space-y-8">
          {/* Current Resume */}
          {resume ? (
            <div className="bg-primary-light rounded-lg shadow-lg p-6">
              <h2 className="text-xl font-semibold text-primary mb-4">Current Resume</h2>
              
              <div className="flex items-center justify-between bg-white p-4 rounded-md border">
                <div className="flex items-center space-x-4">
                  <div className="p-3 bg-red-100 rounded-md">
                    <svg className="w-8 h-8 text-red-600" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M8.267 14.68c-.184 0-.308.018-.372.036v1.178c.076.018.171.023.302.023.479 0 .774-.242.774-.651 0-.366-.254-.586-.704-.586zm3.487.012c-.2 0-.33.018-.407.036v2.61c.077.018.201.018.313.018.817.006 1.349-.444 1.349-1.396.006-.83-.479-1.268-1.255-1.268z"/>
                      <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8l-6-6zM9.498 16.19c-.309.29-.765.42-1.296.42a2.23 2.23 0 01-.308-.018v1.426H7v-3.936A7.558 7.558 0 018.219 14c.557 0 .953.106 1.22.319.254.202.426.533.426.923-.001.392-.131.723-.367.948zm3.807 1.355c-.42.349-1.059.515-1.84.515-.468 0-.799-.03-1.024-.06v-3.917A7.947 7.947 0 0111.66 14c.757 0 1.249.136 1.633.426.415.308.675.799.675 1.504 0 .763-.279 1.29-.663 1.615zM17 14.77h-1.532v.911H16.9v.734h-1.432v1.604h-.906V14.03H17v.74zM14 9h-1V4l5 5h-4z"/>
                    </svg>
                  </div>
                  <div>
                    <p className="font-medium text-primary">{resume.filename}</p>
                    <p className="text-sm text-primary/60">
                      Uploaded: {new Date(resume.uploadedAt).toLocaleDateString()}
                    </p>
                  </div>
                </div>
                
                <div className="flex space-x-2">
                  <a
                    href={resume.cloudinaryUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-primary text-primary-light px-4 py-2 rounded-md hover:bg-primary-accent hover:text-primary transition-colors"
                  >
                    View
                  </a>
                  <button
                    onClick={handleDeleteResume}
                    disabled={deleting}
                    className="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700 transition-colors disabled:opacity-50"
                  >
                    {deleting ? 'Deleting...' : 'Delete'}
                  </button>
                </div>
              </div>
            </div>
          ) : (
            <div className="bg-primary-light rounded-lg shadow-lg p-6">
              <h2 className="text-xl font-semibold text-primary mb-4">No Resume Found</h2>
              <p className="text-primary/70">Upload a resume to make it available for download on your portfolio.</p>
            </div>
          )}

          {/* Upload New Resume */}
          <div className="bg-primary-light rounded-lg shadow-lg p-6">
            <h2 className="text-xl font-semibold text-primary mb-4">
              {resume ? 'Upload New Resume' : 'Upload Resume'}
            </h2>
            <p className="text-primary/70 mb-6">
              {resume 
                ? 'Uploading a new resume will replace the current one and deactivate it.' 
                : 'Upload a PDF file to make your resume downloadable from the portfolio.'
              }
            </p>
            
            <FileUploader
              onFileUpload={handleFileUpload}
              label="Resume (PDF)"
              acceptedTypes={['application/pdf']}
              maxSizeMB={10}
              uploadEndpoint="/api/resume"
            />
          </div>

          {/* Instructions */}
          <div className="bg-primary-light rounded-lg shadow-lg p-6">
            <h2 className="text-xl font-semibold text-primary mb-4">Instructions</h2>
            <ul className="text-primary/70 space-y-2">
              <li>• Only PDF files are accepted</li>
              <li>• Maximum file size is 10MB</li>
              <li>• The resume will be available for download in the "About Me" section</li>
              <li>• Only one resume can be active at a time</li>
              <li>• Uploading a new resume will automatically replace the current one</li>
            </ul>
          </div>
        </div>
      </main>
    </div>
  )
}