'use client'

import { useState, useEffect } from 'react'
import { useParams, useRouter } from 'next/navigation'
import { Book } from '@/lib/types'

async function fetchBook(id: string): Promise<Book | null> {
  try {
    const response = await fetch(`/api/books/${id}`)
    const result = await response.json()
    
    if (result.success) {
      return result.data
    } else {
      console.error('Failed to fetch book:', result.error)
      return null
    }
  } catch (error) {
    console.error('Error fetching book:', error)
    return null
  }
}

export default function BookDetailPage() {
  const params = useParams()
  const router = useRouter()
  const [book, setBook] = useState<Book | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function loadBook() {
      if (!params.id) return
      
      try {
        setLoading(true)
        const bookData = await fetchBook(params.id as string)
        if (bookData) {
          setBook(bookData)
          setError(null)
        } else {
          setError('Book not found')
        }
      } catch (err) {
        setError('Failed to load book')
        console.error('Error loading book:', err)
      } finally {
        setLoading(false)
      }
    }

    loadBook()
  }, [params.id])

  if (loading) {
    return (
      <div className="min-h-screen bg-primary-light flex items-center justify-center">
        <div className="text-primary">Loading book...</div>
      </div>
    )
  }

  if (error || !book) {
    return (
      <div className="min-h-screen bg-primary-light flex items-center justify-center flex-col">
        <div className="text-primary mb-4">Error: {error || 'Book not found'}</div>
        <button 
          onClick={() => router.push('/#bookshelf')}
          className="bg-primary text-primary-light px-6 py-3 rounded-md hover:bg-primary-accent transition-colors"
        >
          Back to Bookshelf
        </button>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-primary-light">
      {/* Navigation */}
      <nav className="bg-primary p-4">
        <div className="container mx-auto flex items-center">
          <button 
            onClick={() => router.push('/#bookshelf')}
            className="text-primary-light hover:text-primary-accent transition-colors flex items-center gap-2"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Back to Bookshelf
          </button>
        </div>
      </nav>

      {/* Book Detail Content */}
      <div className="container mx-auto px-6 py-12">
        <div className="max-w-4xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-start">
            {/* Book Cover */}
            <div className="flex justify-center">
              <div className="relative">
                {book.bookCoverLink ? (
                  <img 
                    src={book.bookCoverLink} 
                    alt={book.title}
                    className="w-64 h-96 object-cover rounded-lg shadow-2xl"
                  />
                ) : (
                  <div className="w-64 h-96 bg-primary/20 rounded-lg flex items-center justify-center shadow-2xl">
                    <span className="text-primary">No Cover Available</span>
                  </div>
                )}
                
                {/* Decorative bookmark */}
                <div className="absolute -top-2 right-4 w-8 h-12 bg-primary-accent rounded-b-md shadow-lg"></div>
              </div>
            </div>

            {/* Book Information */}
            <div className="space-y-6">
              <div>
                <h1 className="text-4xl font-bold text-primary mb-2">{book.title}</h1>
                <p className="text-xl text-primary-accent font-medium">by {book.author}</p>
              </div>

              {/* Review Section */}
              <div className="bg-primary/5 rounded-lg p-6">
                <h2 className="text-2xl font-semibold text-primary mb-4 flex items-center gap-2">
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M14,17H17L19,13V7H13V13H16M6,17H9L11,13V7H5V13H8L6,17Z" />
                  </svg>
                  My Review
                </h2>
                <div className="prose prose-lg text-primary/90 leading-relaxed">
                  {book.review.split('\n').map((paragraph, index) => (
                    <p key={index} className="mb-4">
                      {paragraph}
                    </p>
                  ))}
                </div>
              </div>

              {/* Reading Stats */}
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-primary text-primary-light p-4 rounded-lg text-center">
                  <div className="text-2xl font-bold mb-1">📚</div>
                  <div className="text-sm">Added to Shelf</div>
                </div>
                <div className="bg-primary-accent text-primary p-4 rounded-lg text-center">
                  <div className="text-2xl font-bold mb-1">⭐</div>
                  <div className="text-sm">Recommended</div>
                </div>
              </div>

              {/* Actions */}
              <div className="pt-6">
                <button 
                  onClick={() => router.push('/#bookshelf')}
                  className="w-full bg-primary text-primary-light py-3 rounded-md hover:bg-primary-accent hover:text-primary transition-colors font-medium"
                >
                  Explore More Books
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}