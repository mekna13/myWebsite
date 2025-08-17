'use client'

import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { Book } from '@/lib/types'

export default function AdminBooks() {
  const { data: session, status } = useSession()
  const router = useRouter()
  const [books, setBooks] = useState<Book[]>([])
  const [loading, setLoading] = useState(true)
  const [deleteId, setDeleteId] = useState<string | null>(null)

  useEffect(() => {
    if (status === 'loading') return
    if (!session) {
      router.push('/admin/login')
      return
    }

    fetchBooks()
  }, [session, status, router])

  const fetchBooks = async () => {
    try {
      setLoading(true)
      const response = await fetch('/api/books')
      const result = await response.json()
      
      if (result.success) {
        setBooks(result.data)
      }
    } catch (error) {
      console.error('Error fetching books:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleDelete = async (id: string) => {
    try {
      const response = await fetch(`/api/books/${id}`, {
        method: 'DELETE',
      })
      
      if (response.ok) {
        setBooks(books.filter(book => book._id !== id))
        setDeleteId(null)
      } else {
        console.error('Failed to delete book')
      }
    } catch (error) {
      console.error('Error deleting book:', error)
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
              <h1 className="text-3xl font-bold text-primary">Manage Books</h1>
            </div>
            <button
              onClick={() => router.push('/admin/books/new')}
              className="bg-primary text-primary-light px-6 py-3 rounded-md hover:bg-primary-accent hover:text-primary transition-colors font-medium"
            >
              Add New Book
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
                    Book
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-primary uppercase tracking-wider">
                    Author
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-primary uppercase tracking-wider">
                    Review
                  </th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-primary uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-primary-light divide-y divide-primary/10">
                {books.map((book) => (
                  <tr key={book._id} className="hover:bg-primary/5">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="flex-shrink-0 h-20 w-16">
                          {book.bookCoverLink ? (
                            <img 
                              className="h-20 w-16 object-cover rounded" 
                              src={book.bookCoverLink} 
                              alt={book.title}
                            />
                          ) : (
                            <div className="h-20 w-16 bg-primary/20 rounded flex items-center justify-center">
                              <span className="text-primary text-xs">No Cover</span>
                            </div>
                          )}
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-medium text-primary">{book.title}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-primary">
                      {book.author}
                    </td>
                    <td className="px-6 py-4 text-sm text-primary">
                      <div className="max-w-xs truncate">
                        {book.review}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <div className="flex justify-end gap-2">
                        <button
                          onClick={() => router.push(`/admin/books/${book._id}/edit`)}
                          className="text-primary-accent hover:text-primary bg-primary-accent/10 hover:bg-primary-accent/20 px-3 py-1 rounded transition-colors"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => setDeleteId(book._id)}
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

        {books.length === 0 && !loading && (
          <div className="text-center py-12">
            <p className="text-primary-light text-lg">No books found.</p>
            <button
              onClick={() => router.push('/admin/books/new')}
              className="mt-4 bg-primary text-primary-light px-6 py-3 rounded-md hover:bg-primary-accent hover:text-primary transition-colors font-medium"
            >
              Add Your First Book
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
              Are you sure you want to delete this book? This action cannot be undone.
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