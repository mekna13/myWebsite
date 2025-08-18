import { NextRequest, NextResponse } from 'next/server'
import { connectToDatabase } from '@/lib/mongodb'

// GET /api/resume/download - Download resume as PDF file
export async function GET() {
  try {
    const { db } = await connectToDatabase()
    const activeResume = await db.collection('resumes').findOne({ isActive: true })
    
    if (!activeResume) {
      return NextResponse.json(
        { success: false, error: 'No resume found' },
        { status: 404 }
      )
    }

    // Fetch the PDF from Cloudinary
    const response = await fetch(activeResume.cloudinaryUrl)
    
    if (!response.ok) {
      return NextResponse.json(
        { success: false, error: 'Failed to fetch resume file' },
        { status: 500 }
      )
    }

    // Get the PDF buffer
    const pdfBuffer = await response.arrayBuffer()
    
    // Create response with proper headers for PDF download
    const pdfResponse = new NextResponse(pdfBuffer, {
      status: 200,
      headers: {
        'Content-Type': 'application/pdf',
        'Content-Disposition': `attachment; filename="${activeResume.filename}"`,
        'Content-Length': pdfBuffer.byteLength.toString(),
        'Cache-Control': 'no-cache'
      }
    })

    return pdfResponse

  } catch (error) {
    console.error('Error downloading resume:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to download resume' },
      { status: 500 }
    )
  }
}