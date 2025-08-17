import { NextRequest, NextResponse } from 'next/server'
import { connectToDatabase } from '@/lib/mongodb'
import { Project, ProjectFormData } from '@/lib/types'
import { ObjectId } from 'mongodb'

// GET /api/projects - Fetch all projects
export async function GET() {
  try {
    const { db } = await connectToDatabase()
    const projects = await db.collection<Project>('projects').find({}).toArray()
    
    return NextResponse.json({
      success: true,
      data: projects
    })
  } catch (error) {
    console.error('Error fetching projects:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to fetch projects' },
      { status: 500 }
    )
  }
}

// POST /api/projects - Create new project
export async function POST(request: NextRequest) {
  try {
    const { db } = await connectToDatabase()
    const body: ProjectFormData = await request.json()
    
    // Validate required fields
    if (!body.title || !body.description) {
      return NextResponse.json(
        { success: false, error: 'Title and description are required' },
        { status: 400 }
      )
    }

    const newProject = {
      ...body,
      img: body.img || '', // Handle optional image field
      __v: 0
    }

    const result = await db.collection('projects').insertOne(newProject)
    
    return NextResponse.json({
      success: true,
      data: { _id: result.insertedId, ...newProject }
    }, { status: 201 })
  } catch (error) {
    console.error('Error creating project:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to create project' },
      { status: 500 }
    )
  }
}