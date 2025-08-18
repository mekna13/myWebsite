import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { connectToDatabase } from '@/lib/mongodb'
import { Resume, ResumeFormData } from '@/lib/types'
import cloudinary from '@/lib/cloudinary'

// GET /api/resume - Get active resume (public endpoint)
export async function GET() {
  try {
    const { db } = await connectToDatabase()
    const activeResume = await db.collection<Resume>('resumes').findOne({ isActive: true })
    
    if (!activeResume) {
      return NextResponse.json({
        success: false,
        error: 'No active resume found'
      }, { status: 404 })
    }

    return NextResponse.json({
      success: true,
      data: {
        filename: activeResume.filename,
        cloudinaryUrl: activeResume.cloudinaryUrl,
        uploadedAt: activeResume.uploadedAt
      }
    })
  } catch (error) {
    console.error('Error fetching resume:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to fetch resume' },
      { status: 500 }
    )
  }
}

// POST /api/resume - Upload new resume (admin only)
export async function POST(request: NextRequest) {
  try {
    // Check authentication
    const session = await getServerSession(authOptions)
    if (!session) {
      return NextResponse.json(
        { success: false, error: 'Unauthorized' },
        { status: 401 }
      )
    }

    const formData = await request.formData()
    const file = formData.get('file') as File
    
    if (!file) {
      return NextResponse.json(
        { success: false, error: 'No file provided' },
        { status: 400 }
      )
    }

    // Validate file type (PDF only)
    if (file.type !== 'application/pdf') {
      return NextResponse.json(
        { success: false, error: 'Invalid file type. Only PDF files are allowed.' },
        { status: 400 }
      )
    }

    // Validate file size (10MB max)
    const maxSize = 10 * 1024 * 1024 // 10MB
    if (file.size > maxSize) {
      return NextResponse.json(
        { success: false, error: 'File too large. Maximum size is 10MB.' },
        { status: 400 }
      )
    }

    // Convert file to buffer
    const bytes = await file.arrayBuffer()
    const buffer = Buffer.from(bytes)

    // Upload to Cloudinary
    const uploadResult = await new Promise((resolve, reject) => {
      cloudinary.uploader.upload_stream(
        {
          folder: 'portfolio/resume',
          resource_type: 'raw', // For non-image files like PDFs
          use_filename: true,
          unique_filename: true
        },
        (error, result) => {
          if (error) reject(error)
          else resolve(result)
        }
      ).end(buffer)
    })

    const result = uploadResult as any

    const { db } = await connectToDatabase()

    // Deactivate all existing resumes
    await db.collection('resumes').updateMany(
      { isActive: true },
      { $set: { isActive: false } }
    )

    // Create new resume record
    const newResume = {
      filename: file.name,
      cloudinaryUrl: result.secure_url,
      cloudinaryPublicId: result.public_id,
      uploadedAt: new Date(),
      isActive: true,
      __v: 0
    }

    const insertResult = await db.collection('resumes').insertOne(newResume)
    
    return NextResponse.json({
      success: true,
      data: { _id: insertResult.insertedId, ...newResume }
    }, { status: 201 })

  } catch (error) {
    console.error('Error uploading resume:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to upload resume' },
      { status: 500 }
    )
  }
}

// DELETE /api/resume - Delete active resume (admin only)
export async function DELETE(request: NextRequest) {
  try {
    // Check authentication
    const session = await getServerSession(authOptions)
    if (!session) {
      return NextResponse.json(
        { success: false, error: 'Unauthorized' },
        { status: 401 }
      )
    }

    const { db } = await connectToDatabase()
    
    // Find the active resume
    const activeResume = await db.collection('resumes').findOne({ isActive: true })

    if (!activeResume) {
      return NextResponse.json(
        { success: false, error: 'No active resume found' },
        { status: 404 }
      )
    }

    // Delete from Cloudinary
    if (activeResume.cloudinaryPublicId) {
      try {
        await cloudinary.uploader.destroy(activeResume.cloudinaryPublicId, {
          resource_type: 'raw'
        })
      } catch (cloudinaryError) {
        console.error('Error deleting from Cloudinary:', cloudinaryError)
        // Continue with database deletion even if Cloudinary deletion fails
      }
    }

    // Delete from database
    const deleteResult = await db.collection('resumes').deleteOne({
      _id: activeResume._id
    })

    if (deleteResult.deletedCount === 0) {
      return NextResponse.json(
        { success: false, error: 'Failed to delete resume' },
        { status: 500 }
      )
    }

    return NextResponse.json({
      success: true,
      message: 'Resume deleted successfully'
    })

  } catch (error) {
    console.error('Error deleting resume:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to delete resume' },
      { status: 500 }
    )
  }
}