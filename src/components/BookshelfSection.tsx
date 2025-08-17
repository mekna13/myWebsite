'use client'

import { useState, useEffect } from 'react'
import BookCover from './BookCover'
import { Book } from '@/lib/types'

async function fetchBooks(): Promise<Book[]> {
  try {
    const response = await fetch('/api/books')
    const result = await response.json()
    
    if (result.success) {
      return result.data
    } else {
      console.error('Failed to fetch books:', result.error)
      return []
    }
  } catch (error) {
    console.error('Error fetching books:', error)
    return []
  }
}

export default function BookshelfSection() {
  const [books, setBooks] = useState<Book[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function loadBooks() {
      try {
        setLoading(true)
        const booksData = await fetchBooks()
        setBooks(booksData)
        setError(null)
      } catch (err) {
        setError('Failed to load books')
        console.error('Error loading books:', err)
      } finally {
        setLoading(false)
      }
    }

    loadBooks()
  }, [])

  const handleBookClick = (bookId: string) => {
    window.location.href = `/books/${bookId}`
  }

  if (loading) {
    return (
      <section id="bookshelf" className="py-20 bg-primary-light relative overflow-hidden">
        <div className="container mx-auto px-6">
          <h2 className="text-4xl font-bold text-primary text-center mb-16">
            My Bookshelf
          </h2>
          <div className="flex justify-center items-center py-20">
            <div className="text-primary">Loading books...</div>
          </div>
        </div>
      </section>
    )
  }

  if (error) {
    return (
      <section id="bookshelf" className="py-20 bg-primary-light relative overflow-hidden">
        <div className="container mx-auto px-6">
          <h2 className="text-4xl font-bold text-primary text-center mb-16">
            My Bookshelf
          </h2>
          <div className="flex justify-center items-center py-20">
            <div className="text-primary">Error: {error}</div>
          </div>
        </div>
      </section>
    )
  }

  return (
    <section id="bookshelf" className="py-20 bg-primary-light relative overflow-hidden">
      <div className="container mx-auto px-6">
        <h2 className="text-4xl font-bold text-primary text-center mb-16">
          My Bookshelf
        </h2>
        
        {/* Floating Reading Quote */}
        <div className="absolute top-8 right-8 opacity-10 pointer-events-none">
          <svg className="w-32 h-32 text-primary" fill="currentColor" viewBox="0 0 24 24">
            <path d="M14,17H17L19,13V7H13V13H16M6,17H9L11,13V7H5V13H8L6,17Z" />
          </svg>
        </div>
        
        {/* Bookshelf Grid */}
        <div className="relative">
          {/* Books arranged in shelf-like rows */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-12 mb-12">
            {books.map((book) => (
              <BookCover 
                key={book._id} 
                book={book} 
                onClick={() => handleBookClick(book._id)}
              />
            ))}
          </div>
        </div>
        
        {/* Reading Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12">
          <div className="text-center">
            <div className="text-3xl font-bold text-primary-accent mb-1">{books.length}</div>
            <div className="text-sm text-primary">Books Reviewed</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-primary-accent mb-1">2024</div>
            <div className="text-sm text-primary">Current Year</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-primary-accent mb-1">Fiction</div>
            <div className="text-sm text-primary">Favorite Genre</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-primary-accent mb-1">⭐ 4.5</div>
            <div className="text-sm text-primary">Avg Rating</div>
          </div>
        </div>
      </div>
    </section>
  )
}