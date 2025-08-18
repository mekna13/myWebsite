'use client'

import { useSession, signOut } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'

export default function AdminDashboard() {
  const { data: session, status } = useSession()
  const router = useRouter()
  const [stats, setStats] = useState({ books: 0, projects: 0 })

  useEffect(() => {
    if (status === 'loading') return
    if (!session) {
      router.push('/admin/login')
      return
    }

    // Fetch stats
    const fetchStats = async () => {
      try {
        const [booksRes, projectsRes] = await Promise.all([
          fetch('/api/books'),
          fetch('/api/projects')
        ])
        
        const booksData = await booksRes.json()
        const projectsData = await projectsRes.json()
        
        setStats({
          books: booksData.success ? booksData.data.length : 0,
          projects: projectsData.success ? projectsData.data.length : 0
        })
      } catch (error) {
        console.error('Error fetching stats:', error)
      }
    }

    fetchStats()
  }, [session, status, router])

  const handleSignOut = async () => {
    await signOut({ callbackUrl: '/' })
  }

  if (status === 'loading') {
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
              <h1 className="text-3xl font-bold text-primary">Admin Dashboard</h1>
              <p className="text-primary/70">Welcome back, {session.user?.name}</p>
            </div>
            <div className="flex items-center gap-4">
              <a 
                href="/"
                className="text-primary hover:text-primary-accent transition-colors"
              >
                View Portfolio
              </a>
              <button
                onClick={handleSignOut}
                className="bg-primary text-primary-light px-4 py-2 rounded-md hover:bg-primary-accent hover:text-primary transition-colors"
              >
                Sign Out
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          <div className="bg-primary-light rounded-lg p-6 shadow-lg">
            <div className="flex items-center">
              <div className="p-3 rounded-md bg-primary text-primary-light">
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>
              </div>
              <div className="ml-5">
                <p className="text-sm font-medium text-primary/70">Total Books</p>
                <p className="text-2xl font-bold text-primary">{stats.books}</p>
              </div>
            </div>
          </div>

          <div className="bg-primary-light rounded-lg p-6 shadow-lg">
            <div className="flex items-center">
              <div className="p-3 rounded-md bg-primary-accent text-primary">
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                </svg>
              </div>
              <div className="ml-5">
                <p className="text-sm font-medium text-primary/70">Total Projects</p>
                <p className="text-2xl font-bold text-primary">{stats.projects}</p>
              </div>
            </div>
          </div>

          <div className="bg-primary-light rounded-lg p-6 shadow-lg">
            <div className="flex items-center">
              <div className="p-3 rounded-md bg-green-500 text-white">
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div className="ml-5">
                <p className="text-sm font-medium text-primary/70">Status</p>
                <p className="text-2xl font-bold text-primary">Active</p>
              </div>
            </div>
          </div>
        </div>

        {/* Action Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Book Management */}
          <div className="bg-primary-light rounded-lg shadow-lg overflow-hidden">
            <div className="p-6">
              <div className="flex items-center mb-4">
                <svg className="w-8 h-8 text-primary mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>
                <h3 className="text-xl font-semibold text-primary">Book Management</h3>
              </div>
              <p className="text-primary/70 mb-6">
                Add, edit, and manage your book reviews and ratings.
              </p>
              <div className="space-y-3">
                <button 
                  onClick={() => router.push('/admin/books')}
                  className="w-full bg-primary text-primary-light px-4 py-3 rounded-md hover:bg-primary-accent hover:text-primary transition-colors font-medium"
                >
                  Manage Books
                </button>
                <button 
                  onClick={() => router.push('/admin/books/new')}
                  className="w-full border border-primary text-primary px-4 py-3 rounded-md hover:bg-primary hover:text-primary-light transition-colors font-medium"
                >
                  Add New Book
                </button>
              </div>
            </div>
          </div>

          {/* Project Management */}
          <div className="bg-primary-light rounded-lg shadow-lg overflow-hidden">
            <div className="p-6">
              <div className="flex items-center mb-4">
                <svg className="w-8 h-8 text-primary mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                </svg>
                <h3 className="text-xl font-semibold text-primary">Project Management</h3>
              </div>
              <p className="text-primary/70 mb-6">
                Add, edit, and manage your portfolio projects.
              </p>
              <div className="space-y-3">
                <button 
                  onClick={() => router.push('/admin/projects')}
                  className="w-full bg-primary text-primary-light px-4 py-3 rounded-md hover:bg-primary-accent hover:text-primary transition-colors font-medium"
                >
                  Manage Projects
                </button>
                <button 
                  onClick={() => router.push('/admin/projects/new')}
                  className="w-full border border-primary text-primary px-4 py-3 rounded-md hover:bg-primary hover:text-primary-light transition-colors font-medium"
                >
                  Add New Project
                </button>
              </div>
            </div>
          </div>

          {/* Resume Management */}
          <div className="bg-primary-light rounded-lg shadow-lg overflow-hidden">
            <div className="p-6">
              <div className="flex items-center mb-4">
                <svg className="w-8 h-8 text-primary mr-3" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M8.267 14.68c-.184 0-.308.018-.372.036v1.178c.076.018.171.023.302.023.479 0 .774-.242.774-.651 0-.366-.254-.586-.704-.586zm3.487.012c-.2 0-.33.018-.407.036v2.61c.077.018.201.018.313.018.817.006 1.349-.444 1.349-1.396.006-.83-.479-1.268-1.255-1.268z"/>
                  <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8l-6-6zM9.498 16.19c-.309.29-.765.42-1.296.42a2.23 2.23 0 01-.308-.018v1.426H7v-3.936A7.558 7.558 0 018.219 14c.557 0 .953.106 1.22.319.254.202.426.533.426.923-.001.392-.131.723-.367.948zm3.807 1.355c-.42.349-1.059.515-1.84.515-.468 0-.799-.03-1.024-.06v-3.917A7.947 7.947 0 0111.66 14c.757 0 1.249.136 1.633.426.415.308.675.799.675 1.504 0 .763-.279 1.29-.663 1.615zM17 14.77h-1.532v.911H16.9v.734h-1.432v1.604h-.906V14.03H17v.74zM14 9h-1V4l5 5h-4z"/>
                </svg>
                <h3 className="text-xl font-semibold text-primary">Resume Management</h3>
              </div>
              <p className="text-primary/70 mb-6">
                Upload and manage your resume for portfolio downloads.
              </p>
              <div className="space-y-3">
                <button 
                  onClick={() => router.push('/admin/resume')}
                  className="w-full bg-primary text-primary-light px-4 py-3 rounded-md hover:bg-primary-accent hover:text-primary transition-colors font-medium"
                >
                  Manage Resume
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}