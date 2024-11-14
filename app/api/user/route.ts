import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/dbConnect';
import User from '@/models/userModel';
import { nanoid } from 'nanoid';

export async function POST(request: NextRequest) {
  console.log('API route called')
  try {
    await dbConnect();
    const body: { text: string,  } = await request.json();
    
    // Validate input
    if (!body.text) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
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
      url 
    });
    
    console.log('Generated URL:', user.url)
    
    await user.save();
    console.log('User saved to database')

    return NextResponse.json({ 
      url: user.url, 
      text: user.text, 
      id: user._id
    });
  } catch (error) {
    console.error('Error in API route:', error);
    return NextResponse.json({ error: 'Something went wrong' }, { status: 500 });
  }
}