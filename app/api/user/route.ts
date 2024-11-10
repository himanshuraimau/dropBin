import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/dbConnect';
import User from '@/models/userModel';
import { nanoid } from 'nanoid';

export async function POST(request: NextRequest) {
  console.log('API route called')
  try {
    await dbConnect();
    const body: { text: string } = await request.json();
    console.log('Received text:', body.text)
    
    const user = new User({ text: body.text });
    
    const nanoidgen = nanoid(6);
    user.url = nanoidgen;
    console.log('Generated URL:', user.url)
    
    await user.save();
    console.log('User saved to database')

    return NextResponse.json({ url: user.url, text: user.text, id: user._id });
  } catch (error) {
    console.error('Error in API route:', error);
    return NextResponse.json({ error: 'Something went wrong' }, { status: 500 });
  }
}