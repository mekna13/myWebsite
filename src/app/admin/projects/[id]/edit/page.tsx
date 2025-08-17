'use client'

import { useSession } from 'next-auth/react'
import { useRouter, useParams } from 'next/navigation'
import { useEffect, useState } from 'react'
import { Project } from '@/lib/types'
import ImageUploader from '@/components/ImageUploader'

export default function EditProject() {
  const { data: session, status } = useSession()
  const router = useRouter()
  const params = useParams()
  const [loading, setLoading] = useState(false)
  const [pageLoading, setPageLoading] = useState(true)
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    github: '',
    directLink: '',
    img: ''
  })

  useEffect(() => {
    if (status === 'loading') return
    if (!session) {
      router.push('/admin/login')
      return
    }

    if (params.id) {
      fetchProject(params.id as string)
    }
  }, [session, status, router, params.id])

  const fetchProject = async (id: string) => {
    try {
      const response = await fetch(`/api/projects/${id}`)
      const result = await response.json()
      
      if (result.success) {
        const project: Project = result.data
        setFormData({
          title: project.title,
          description: project.description,
          github: project.github || '',
          directLink: project.directLink || '',
          img: project.img || ''
        })
      } else {
        console.error('Project not found')
        router.push('/admin/projects')
      }
    } catch (error) {
      console.error('Error fetching project:', error)
      router.push('/admin/projects')
    } finally {
      setPageLoading(false)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      const response = await fetch(`/api/projects/${params.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })

      if (response.ok) {
        router.push('/admin/projects')
      } else {
        const result = await response.json()
        console.error('Failed to update project:', result.error)
        alert('Failed to update project: ' + result.error)
      }
    } catch (error) {
      console.error('Error updating project:', error)
      alert('Error updating project')
    } finally {
      setLoading(false)
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  if (status === 'loading' || pageLoading) {
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
          <div className="flex items-center py-6">
            <button 
              onClick={() => router.push('/admin/projects')}
              className="text-primary hover:text-primary-accent transition-colors mr-4"
            >
              ← Back to Projects
            </button>
            <h1 className="text-3xl font-bold text-primary">Edit Project</h1>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="bg-primary-light rounded-lg shadow-lg p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="title" className="block text-sm font-medium text-primary mb-2">
                Project Title *
              </label>
              <input
                type="text"
                id="title"
                name="title"
                value={formData.title}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 border border-primary/20 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-accent focus:border-transparent bg-white text-primary"
                placeholder="Enter project title"
              />
            </div>

            <div>
              <label htmlFor="description" className="block text-sm font-medium text-primary mb-2">
                Description *
              </label>
              <textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={handleChange}
                required
                rows={4}
                className="w-full px-4 py-3 border border-primary/20 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-accent focus:border-transparent bg-white text-primary resize-vertical"
                placeholder="Describe your project..."
              />
            </div>

            <div>
              <label htmlFor="github" className="block text-sm font-medium text-primary mb-2">
                GitHub Repository URL
              </label>
              <input
                type="url"
                id="github"
                name="github"
                value={formData.github}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-primary/20 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-accent focus:border-transparent bg-white text-primary"
                placeholder="https://github.com/username/repository"
              />
            </div>

            <div>
              <label htmlFor="directLink" className="block text-sm font-medium text-primary mb-2">
                Live Demo URL (Optional)
              </label>
              <input
                type="url"
                id="directLink"
                name="directLink"
                value={formData.directLink}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-primary/20 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-accent focus:border-transparent bg-white text-primary"
                placeholder="https://yourproject.com"
              />
            </div>

            <ImageUploader
              onImageUpload={(imageUrl) => setFormData({ ...formData, img: imageUrl })}
              currentImage={formData.img}
              label="Project Image"
            />

            {/* Alternative URL input */}
            <div>
              <label htmlFor="img" className="block text-sm font-medium text-primary mb-2">
                Or paste image URL
              </label>
              <input
                type="url"
                id="img"
                name="img"
                value={formData.img}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-primary/20 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-accent focus:border-transparent bg-white text-primary"
                placeholder="https://example.com/project-screenshot.jpg"
              />
            </div>

            <div className="flex justify-end gap-4 pt-6">
              <button
                type="button"
                onClick={() => router.push('/admin/projects')}
                className="px-6 py-3 border border-primary/20 text-primary rounded-md hover:bg-primary/5 transition-colors font-medium"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={loading}
                className="px-6 py-3 bg-primary text-primary-light rounded-md hover:bg-primary-accent hover:text-primary transition-colors font-medium disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
              >
                {loading ? (
                  <>
                    <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none"/>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"/>
                    </svg>
                    Updating...
                  </>
                ) : (
                  'Update Project'
                )}
              </button>
            </div>
          </form>
        </div>
      </main>
    </div>
  )
}