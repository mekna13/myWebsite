import { NextRequest, NextResponse } from 'next/server'
import { connectToDatabase } from '@/lib/mongodb'
import { BookFormData } from '@/lib/types'
import { ObjectId } from 'mongodb'

// GET /api/books/[id] - Fetch single book
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params
  try {
    const { db } = await connectToDatabase()
    const book = await db.collection('books').findOne({ _id: new ObjectId(id) })
    
    if (!book) {
      return NextResponse.json(
        { success: false, error: 'Book not found' },
        { status: 404 }
      )
    }
    
    return NextResponse.json({
      success: true,
      data: book
    })
  } catch (error) {
    console.error('Error fetching book:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to fetch book' },
      { status: 500 }
    )
  }
}

// PUT /api/books/[id] - Update book
export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params
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

    const result = await db.collection('books').updateOne(
      { _id: new ObjectId(id) },
      { $set: body }
    )
    
    if (result.matchedCount === 0) {
      return NextResponse.json(
        { success: false, error: 'Book not found' },
        { status: 404 }
      )
    }
    
    return NextResponse.json({
      success: true,
      data: { _id: id, ...body }
    })
  } catch (error) {
    console.error('Error updating book:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to update book' },
      { status: 500 }
    )
  }
}

// DELETE /api/books/[id] - Delete book
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params
  try {
    const { db } = await connectToDatabase()
    const result = await db.collection('books').deleteOne({ _id: new ObjectId(id) })
    
    if (result.deletedCount === 0) {
      return NextResponse.json(
        { success: false, error: 'Book not found' },
        { status: 404 }
      )
    }
    
    return NextResponse.json({
      success: true,
      data: { message: 'Book deleted successfully' }
    })
  } catch (error) {
    console.error('Error deleting book:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to delete book' },
      { status: 500 }
    )
  }
}