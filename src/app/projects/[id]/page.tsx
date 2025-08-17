'use client'

import { useState, useEffect } from 'react'
import { useParams, useRouter } from 'next/navigation'
import { Project } from '@/lib/types'

async function fetchProject(id: string): Promise<Project | null> {
  try {
    const response = await fetch(`/api/projects/${id}`)
    const result = await response.json()
    
    if (result.success) {
      return result.data
    } else {
      console.error('Failed to fetch project:', result.error)
      return null
    }
  } catch (error) {
    console.error('Error fetching project:', error)
    return null
  }
}

export default function ProjectDetailPage() {
  const params = useParams()
  const router = useRouter()
  const [project, setProject] = useState<Project | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function loadProject() {
      if (!params.id) return
      
      try {
        setLoading(true)
        const projectData = await fetchProject(params.id as string)
        if (projectData) {
          setProject(projectData)
          setError(null)
        } else {
          setError('Project not found')
        }
      } catch (err) {
        setError('Failed to load project')
        console.error('Error loading project:', err)
      } finally {
        setLoading(false)
      }
    }

    loadProject()
  }, [params.id])

  if (loading) {
    return (
      <div className="min-h-screen bg-primary flex items-center justify-center">
        <div className="text-primary-light">Loading project...</div>
      </div>
    )
  }

  if (error || !project) {
    return (
      <div className="min-h-screen bg-primary flex items-center justify-center flex-col">
        <div className="text-primary-light mb-4">Error: {error || 'Project not found'}</div>
        <button 
          onClick={() => router.push('/#projects')}
          className="bg-primary-light text-primary px-6 py-3 rounded-md hover:bg-primary-accent hover:text-primary transition-colors"
        >
          Back to Projects
        </button>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-primary">
      {/* Navigation */}
      <nav className="bg-primary-light p-4">
        <div className="container mx-auto flex items-center">
          <button 
            onClick={() => router.push('/#projects')}
            className="text-primary hover:text-primary-accent transition-colors flex items-center gap-2"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Back to Projects
          </button>
        </div>
      </nav>

      {/* Project Detail Content */}
      <div className="container mx-auto px-6 py-12">
        <div className="max-w-4xl mx-auto">
          {/* Project Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-primary-light mb-4">{project.title}</h1>
            <div className="w-24 h-1 bg-primary-accent mx-auto"></div>
          </div>

          <div className="grid lg:grid-cols-2 gap-12 items-start">
            {/* Project Image/Preview */}
            <div className="space-y-6">
              <div className="bg-primary-light rounded-lg p-8 min-h-96 flex items-center justify-center">
                {project.img && project.img !== 'undefined' ? (
                  <img 
                    src={project.img} 
                    alt={project.title}
                    className="max-w-full h-auto rounded-lg shadow-lg"
                  />
                ) : (
                  <div className="text-center">
                    <div className="w-24 h-24 bg-primary/20 rounded-lg mx-auto mb-4 flex items-center justify-center">
                      <svg className="w-12 h-12 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                      </svg>
                    </div>
                    <p className="text-primary text-lg font-medium">{project.title}</p>
                    <p className="text-primary/60 text-sm">Project Preview</p>
                  </div>
                )}
              </div>
            </div>

            {/* Project Information */}
            <div className="space-y-8">
              {/* Description */}
              <div className="bg-primary-light/10 rounded-lg p-6">
                <h2 className="text-2xl font-semibold text-primary-light mb-4">About This Project</h2>
                <div className="prose text-primary-light/90 leading-relaxed">
                  {project.description.split('\n').map((paragraph, index) => (
                    <p key={index} className="mb-4">
                      {paragraph}
                    </p>
                  ))}
                </div>
              </div>

              {/* Project Links */}
              <div className="space-y-4">
                <h3 className="text-xl font-semibold text-primary-light">Project Links</h3>
                <div className="flex flex-col gap-3">
                  {project.github && (
                    <a 
                      href={project.github} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-3 bg-primary-light text-primary px-6 py-4 rounded-lg hover:bg-primary-accent hover:text-primary transition-colors group"
                    >
                      <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.30.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                      </svg>
                      <div className="text-left">
                        <div className="font-medium">View Source Code</div>
                        <div className="text-sm opacity-75">Explore the GitHub repository</div>
                      </div>
                      <svg className="w-5 h-5 ml-auto group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"/>
                      </svg>
                    </a>
                  )}
                  
                  {project.directLink && (
                    <a 
                      href={project.directLink} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-3 bg-primary-accent text-primary px-6 py-4 rounded-lg hover:bg-primary-light hover:text-primary transition-colors group"
                    >
                      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"/>
                      </svg>
                      <div className="text-left">
                        <div className="font-medium">Live Demo</div>
                        <div className="text-sm opacity-75">See the project in action</div>
                      </div>
                      <svg className="w-5 h-5 ml-auto group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"/>
                      </svg>
                    </a>
                  )}
                </div>
              </div>

              {/* Back to Projects */}
              <div className="pt-6">
                <button 
                  onClick={() => router.push('/#projects')}
                  className="w-full bg-primary-light text-primary py-3 rounded-md hover:bg-primary-accent transition-colors font-medium"
                >
                  Explore More Projects
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}