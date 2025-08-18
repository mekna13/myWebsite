import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { connectToDatabase } from '@/lib/mongodb'
import { ObjectId } from 'mongodb'
import cloudinary from '@/lib/cloudinary'

// DELETE /api/resume/[id] - Delete resume (admin only)
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    // Check authentication
    const session = await getServerSession(authOptions)
    if (!session) {
      return NextResponse.json(
        { success: false, error: 'Unauthorized' },
        { status: 401 }
      )
    }

    const { id } = await params

    if (!ObjectId.isValid(id)) {
      return NextResponse.json(
        { success: false, error: 'Invalid resume ID' },
        { status: 400 }
      )
    }

    const { db } = await connectToDatabase()
    
    // Find the resume to get Cloudinary public ID
    const resume = await db.collection('resumes').findOne({ 
      _id: new ObjectId(id) 
    })

    if (!resume) {
      return NextResponse.json(
        { success: false, error: 'Resume not found' },
        { status: 404 }
      )
    }

    // Delete from Cloudinary
    if (resume.cloudinaryPublicId) {
      try {
        await cloudinary.uploader.destroy(resume.cloudinaryPublicId, {
          resource_type: 'raw'
        })
      } catch (cloudinaryError) {
        console.error('Error deleting from Cloudinary:', cloudinaryError)
        // Continue with database deletion even if Cloudinary deletion fails
      }
    }

    // Delete from database
    const deleteResult = await db.collection('resumes').deleteOne({
      _id: new ObjectId(id)
    })

    if (deleteResult.deletedCount === 0) {
      return NextResponse.json(
        { success: false, error: 'Resume not found' },
        { status: 404 }
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