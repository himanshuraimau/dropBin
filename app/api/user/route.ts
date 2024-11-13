import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/dbConnect';
import User from '@/models/userModel';
import { nanoid } from 'nanoid';

export async function POST(request: NextRequest) {
  console.log('API route called')
  try {
    await dbConnect();
    const body: { text: string, expiration: "12 hours" | "1 day" | "1 week" } = await request.json();
    
    // Validate input
    if (!body.text || !body.expiration) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    // Calculate expiresAt based on the expiration string
    const expiresAt = new Date();
    switch (body.expiration) {
      case "12 hours":
        expiresAt.setHours(expiresAt.getHours() + 12);
        break;
      case "1 day":
        expiresAt.setDate(expiresAt.getDate() + 1);
        break;
      case "1 week":
        expiresAt.setDate(expiresAt.getDate() + 7);
        break;
      default:
        return NextResponse.json({ error: 'Invalid expiration value' }, { status: 400 });
    }

    let url;
    let isUnique = false;
    while (!isUnique) {
      url = nanoid(6);
      const existing = await User.findOne({ url });
      if (!existing) {
        isUnique = true;
      }
    }

    const user = new User({ 
      text: body.text, 
      expiresAt,
      url 
    });
    
    console.log('Generated URL:', user.url)
    
    await user.save();
    console.log('User saved to database')

    return NextResponse.json({ 
      url: user.url, 
      text: user.text, 
      id: user._id, 
      expiresAt: user.expiresAt 
    });
  } catch (error) {
    console.error('Error in API route:', error);
    return NextResponse.json({ error: 'Something went wrong' }, { status: 500 });
  }
}