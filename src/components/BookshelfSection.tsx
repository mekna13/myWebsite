'use client'

import BookCover from './BookCover'

interface BookReview {
  _id: string
  title: string
  review: string
  author: string
  bookCoverLink: string
}

const books: BookReview[] = [
  {
    _id: "60543dad5c9b5c001591d60f",
    title: "I Contain Multitudes",
    review: "This book other than being a really fascinating account of the microbi...",
    author: "Ed Yong",
    bookCoverLink: "https://m.media-amazon.com/images/I/91Sqv2huR5L._AC_UF1000,1000_QL80_.jpg"
  },
  {
    _id: "60543d3d5c9b5c001591d60e",
    title: "Homo Deus",
    review: "In the future predicted by Yuval Noah Harari in his book 'Homo Deus'...",
    author: "Yuval Noah Harari",
    bookCoverLink: "https://images-na.ssl-images-amazon.com/images/I/71N6LbagzSL.jpg"
  },
  {
    _id: "6128c5c3cc49d10016263f05",
    title: "Flow: The Psychology of Optimal Experience",
    review: "A Pixar movie called Soul perfectly captures the main idea in the...",
    author: "Mihaly Csikszentmihalyi",
    bookCoverLink: "https://images-na.ssl-images-amazon.com/images/I/71XvcOz-HlL.jpg"
  },
  {
    _id: "603a19ddb34d340f0047a019",
    title: "On Earth We're Briefly Gorgeous",
    review: "Reading this book felt like living through a collection of memories...",
    author: "Ocean Vuong",
    bookCoverLink: "https://i.gr-assets.com/images/S/compressed.photo.goodreads.com/books/1555315092l/41880609.jpg"
  },
  {
    _id: "sample1",
    title: "The Midnight Library",
    review: "A profound exploration of life's infinite possibilities...",
    author: "Matt Haig",
    bookCoverLink: "https://images-na.ssl-images-amazon.com/images/P/0525559477.01.L.jpg"
  },
  {
    _id: "sample2",
    title: "Atomic Habits",
    review: "A practical guide to breaking bad habits and forming good ones...",
    author: "James Clear",
    bookCoverLink: "https://images-na.ssl-images-amazon.com/images/P/0735211299.01.L.jpg"
  }
]

export default function BookshelfSection() {
  const handleBookClick = (bookId: string) => {
    console.log(`Navigate to book review: ${bookId}`)
    // You can replace this with actual navigation logic:
    // router.push(`/books/${bookId}`) or open a modal
  }

  return (
    <section className="py-20 bg-primary-light relative overflow-hidden">
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
            <div className="text-3xl font-bold text-primary-accent mb-1">6</div>
            <div className="text-sm text-primary">Books Reviewed</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-primary-accent mb-1">3</div>
            <div className="text-sm text-primary">Currently Reading</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-primary-accent mb-1">5★</div>
            <div className="text-sm text-primary">Average Rating</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-primary-accent mb-1">∞</div>
            <div className="text-sm text-primary">Goal This Year</div>
          </div>
        </div>
        
        {/* Inspirational Quote */}
        <div className="text-center">
          <p className="text-primary text-lg italic mb-2">
            "A room without books is like a body without a soul."
          </p>
          <p className="text-primary/70 text-sm">— Marcus Tullius Cicero</p>
        </div>
      </div>
    </section>
  )
}