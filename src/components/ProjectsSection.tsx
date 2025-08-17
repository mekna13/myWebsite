'use client'

import { useState, useEffect } from 'react'
import { Project } from '@/lib/types'

async function fetchProjects(): Promise<Project[]> {
  try {
    const response = await fetch('/api/projects')
    const result = await response.json()
    
    if (result.success) {
      return result.data
    } else {
      console.error('Failed to fetch projects:', result.error)
      return []
    }
  } catch (error) {
    console.error('Error fetching projects:', error)
    return []
  }
}

export default function ProjectsSection() {
  const [projects, setProjects] = useState<Project[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function loadProjects() {
      try {
        setLoading(true)
        const projectsData = await fetchProjects()
        setProjects(projectsData)
        setError(null)
      } catch (err) {
        setError('Failed to load projects')
        console.error('Error loading projects:', err)
      } finally {
        setLoading(false)
      }
    }

    loadProjects()
  }, [])

  if (loading) {
    return (
      <section id="projects" className="py-20 px-4 bg-primary">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-12 text-primary-light">
            Projects
          </h2>
          <div className="flex justify-center items-center py-20">
            <div className="text-primary-light">Loading projects...</div>
          </div>
        </div>
      </section>
    )
  }

  if (error) {
    return (
      <section id="projects" className="py-20 px-4 bg-primary">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-12 text-primary-light">
            Projects
          </h2>
          <div className="flex justify-center items-center py-20">
            <div className="text-primary-light">Error: {error}</div>
          </div>
        </div>
      </section>
    )
  }

  return (
    <section id="projects" className="py-20 px-4 bg-primary">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-4xl font-bold text-center mb-12 text-primary-light">
          Projects
        </h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project) => (
            <div key={project._id} className="bg-primary-light rounded-lg p-6 hover:shadow-lg transition-shadow flex flex-col h-full">
              <div className="h-48 bg-primary/20 rounded-lg mb-4 overflow-hidden">
                {project.img && project.img !== 'undefined' && project.img !== '' ? (
                  <img 
                    src={project.img} 
                    alt={project.title}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center">
                    <div className="text-center">
                      <svg className="w-12 h-12 text-primary/40 mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                      </svg>
                      <span className="text-primary/60 text-sm">Project Image</span>
                    </div>
                  </div>
                )}
              </div>
              <h3 className="text-xl font-semibold mb-2 text-primary">
                {project.title}
              </h3>
              <p className="text-primary mb-4 text-sm line-clamp-3 flex-grow">
                {project.description}
              </p>
              <div className="flex justify-center mt-auto">
                <a 
                  href={`/projects/${project._id}`}
                  className="inline-flex items-center gap-2 bg-primary text-primary-light px-6 py-3 rounded-md hover:bg-primary-accent hover:text-primary transition-colors font-medium"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/>
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"/>
                  </svg>
                  View Project
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}