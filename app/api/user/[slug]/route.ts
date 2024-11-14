import { NextRequest, NextResponse } from 'next/server'
import dbConnect from '@/lib/dbConnect'
import User from '@/models/userModel'

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    await dbConnect()

    const { slug } = await params

    if (!slug) {
      return NextResponse.json({ error: 'Slug parameter missing' }, { status: 400 })
    }
  
    const data = await User.findOne({ url: slug })
   
    if (!data) {
      return NextResponse.json({ error: 'No data found' }, { status: 404 })
    }
    return NextResponse.json(data)

  } catch (error) {
    console.error('Error in GET request:', error)
    return NextResponse.json({ error: 'Something went wrong' }, { status: 500 })
  }
}