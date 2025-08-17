import { NextRequest, NextResponse } from 'next/server'
import { connectToDatabase } from '@/lib/mongodb'
import { Book, BookFormData } from '@/lib/types'
import { ObjectId } from 'mongodb'

// GET /api/books - Fetch all books
export async function GET() {
  try {
    const { db } = await connectToDatabase()
    const books = await db.collection<Book>('books').find({}).toArray()
    
    return NextResponse.json({
      success: true,
      data: books
    })
  } catch (error) {
    console.error('Error fetching books:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to fetch books' },
      { status: 500 }
    )
  }
}

// POST /api/books - Create new book
export async function POST(request: NextRequest) {
  try {
    const { db } = await connectToDatabase()
    const body: BookFormData = await request.json()
    
    // Validate required fields
    if (!body.title || !body.author || !body.review) {
      return NextResponse.json(
        { success: false, error: 'Title, author, and review are required' },
        { status: 400 }
      )
    }

    const newBook = {
      ...body,
      __v: 0
    }

    const result = await db.collection('books').insertOne(newBook)
    
    return NextResponse.json({
      success: true,
      data: { _id: result.insertedId, ...newBook }
    }, { status: 201 })
  } catch (error) {
    console.error('Error creating book:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to create book' },
      { status: 500 }
    )
  }
}