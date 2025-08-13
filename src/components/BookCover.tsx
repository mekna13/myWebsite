'use client'

import { useState } from 'react'

interface BookReview {
  _id: string
  title: string
  review: string
  author: string
  bookCoverLink: string
}

interface BookCoverProps {
  book: BookReview
  onClick?: () => void
}

export default function BookCover({ book, onClick }: BookCoverProps) {
  const [imageError, setImageError] = useState(false)
  
  return (
    <div className="group cursor-pointer" onClick={onClick}>
      <div className="relative">
        {/* Book Cover */}
        <div className="aspect-[3/4] bg-primary/10 rounded-sm shadow-lg transform transition-all duration-300 group-hover:scale-105 group-hover:-rotate-2 group-hover:shadow-2xl w-40 mx-auto">
          {!imageError ? (
            <img 
              src={book.bookCoverLink}
              alt={book.title}
              className="w-full h-full object-cover rounded-sm"
              onError={() => setImageError(true)}
            />
          ) : (
            /* Fallback gradient book */
            <div className="w-full h-full bg-gradient-to-br from-primary to-primary-accent rounded-sm flex items-center justify-center p-2">
              <span className="text-primary-light text-xs font-bold text-center leading-tight">
                {book.title}
              </span>
            </div>
          )}
        </div>
        
        {/* Tooltip on hover */}
        <div className="absolute -top-12 left-1/2 transform -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none z-10">
          <div className="bg-primary text-primary-light text-xs px-3 py-2 rounded shadow-lg max-w-xs text-center">
            <div className="font-semibold leading-tight">{book.title}</div>
            <div className="text-primary-light/80 text-xs mt-1">by {book.author}</div>
          </div>
        </div>
      </div>
    </div>
  )
}