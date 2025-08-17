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
    console.log(`Navigate to book review: ${bookId}`)
    // You can replace this with actual navigation logic:
    // router.push(`/books/${bookId}`) or open a modal
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
        
        {/* CTA Section */}
        <div className="text-center bg-primary/5 rounded-lg p-8">
          <h3 className="text-2xl font-semibold text-primary mb-4">
            Book Recommendations?
          </h3>
          <p className="text-primary/80 mb-6 max-w-2xl mx-auto">
            I'm always looking for my next great read. If you have book recommendations that align 
            with my interests in psychology, philosophy, and technology, I'd love to hear from you!
          </p>
          <a 
            href="mailto:meghna.prd@gmail.com?subject=Book Recommendation" 
            className="inline-flex items-center gap-2 bg-primary text-primary-light px-6 py-3 rounded-md hover:bg-primary-accent hover:text-primary transition-colors"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
            </svg>
            Send a Recommendation
          </a>
        </div>
      </div>
    </section>
  )
}