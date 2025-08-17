'use client'

import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { Project } from '@/lib/types'

export default function AdminProjects() {
  const { data: session, status } = useSession()
  const router = useRouter()
  const [projects, setProjects] = useState<Project[]>([])
  const [loading, setLoading] = useState(true)
  const [deleteId, setDeleteId] = useState<string | null>(null)

  useEffect(() => {
    if (status === 'loading') return
    if (!session) {
      router.push('/admin/login')
      return
    }

    fetchProjects()
  }, [session, status, router])

  const fetchProjects = async () => {
    try {
      setLoading(true)
      const response = await fetch('/api/projects')
      const result = await response.json()
      
      if (result.success) {
        setProjects(result.data)
      }
    } catch (error) {
      console.error('Error fetching projects:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleDelete = async (id: string) => {
    try {
      const response = await fetch(`/api/projects/${id}`, {
        method: 'DELETE',
      })
      
      if (response.ok) {
        setProjects(projects.filter(project => project._id !== id))
        setDeleteId(null)
      } else {
        console.error('Failed to delete project')
      }
    } catch (error) {
      console.error('Error deleting project:', error)
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
            <div className="flex items-center gap-4">
              <button 
                onClick={() => router.push('/admin/dashboard')}
                className="text-primary hover:text-primary-accent transition-colors"
              >
                ← Dashboard
              </button>
              <h1 className="text-3xl font-bold text-primary">Manage Projects</h1>
            </div>
            <button
              onClick={() => router.push('/admin/projects/new')}
              className="bg-primary text-primary-light px-6 py-3 rounded-md hover:bg-primary-accent hover:text-primary transition-colors font-medium"
            >
              Add New Project
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="bg-primary-light rounded-lg shadow-lg overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-primary/10">
              <thead className="bg-primary/5">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-primary uppercase tracking-wider">
                    Project
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-primary uppercase tracking-wider">
                    Description
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-primary uppercase tracking-wider">
                    Links
                  </th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-primary uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-primary-light divide-y divide-primary/10">
                {projects.map((project) => (
                  <tr key={project._id} className="hover:bg-primary/5">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="flex-shrink-0 h-20 w-20">
                          {project.img && project.img !== 'undefined' ? (
                            <img 
                              className="h-20 w-20 object-cover rounded" 
                              src={project.img} 
                              alt={project.title}
                            />
                          ) : (
                            <div className="h-20 w-20 bg-primary/20 rounded flex items-center justify-center">
                              <span className="text-primary text-xs">No Image</span>
                            </div>
                          )}
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-medium text-primary">{project.title}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-sm text-primary">
                      <div className="max-w-xs truncate">
                        {project.description}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-primary">
                      <div className="space-y-1">
                        {project.github && (
                          <div className="flex items-center">
                            <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 24 24">
                              <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.30.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                            </svg>
                            GitHub
                          </div>
                        )}
                        {project.directLink && (
                          <div className="flex items-center">
                            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"/>
                            </svg>
                            Live Demo
                          </div>
                        )}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <div className="flex justify-end gap-2">
                        <button
                          onClick={() => router.push(`/admin/projects/${project._id}/edit`)}
                          className="text-primary-accent hover:text-primary bg-primary-accent/10 hover:bg-primary-accent/20 px-3 py-1 rounded transition-colors"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => setDeleteId(project._id)}
                          className="text-red-600 hover:text-red-900 bg-red-50 hover:bg-red-100 px-3 py-1 rounded transition-colors"
                        >
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {projects.length === 0 && !loading && (
          <div className="text-center py-12">
            <p className="text-primary-light text-lg">No projects found.</p>
            <button
              onClick={() => router.push('/admin/projects/new')}
              className="mt-4 bg-primary text-primary-light px-6 py-3 rounded-md hover:bg-primary-accent hover:text-primary transition-colors font-medium"
            >
              Add Your First Project
            </button>
          </div>
        )}
      </main>

      {/* Delete Confirmation Modal */}
      {deleteId && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-primary-light rounded-lg p-6 max-w-md w-full mx-4">
            <h3 className="text-lg font-medium text-primary mb-4">
              Confirm Delete
            </h3>
            <p className="text-primary/70 mb-6">
              Are you sure you want to delete this project? This action cannot be undone.
            </p>
            <div className="flex justify-end gap-3">
              <button
                onClick={() => setDeleteId(null)}
                className="px-4 py-2 text-primary border border-primary/20 rounded-md hover:bg-primary/5 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={() => handleDelete(deleteId)}
                className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}