// TypeScript interfaces matching existing MongoDB schema

export interface Book {
  _id: string
  title: string
  review: string
  author: string
  bookCoverLink: string
  __v: number
}

export interface Project {
  _id: string
  title: string
  description: string
  github: string
  directLink: string
  img: string
  __v: number
}

export interface Admin {
  _id: string
  admin_name: string
  password: string
  __v: number
}

export interface Session {
  _id: string
  expires: Date
  session: string
}

// API response types
export interface ApiResponse<T> {
  success: boolean
  data?: T
  error?: string
}

// Form data types (for creating/updating)
export interface BookFormData {
  title: string
  review: string
  author: string
  bookCoverLink: string
}

export interface ProjectFormData {
  title: string
  description: string
  github: string
  directLink: string
  img?: string
}

export interface Resume {
  _id: string
  filename: string
  cloudinaryUrl: string
  cloudinaryPublicId: string
  uploadedAt: Date
  isActive: boolean
  __v: number
}

export interface ResumeFormData {
  filename: string
  cloudinaryUrl: string
  cloudinaryPublicId: string
}