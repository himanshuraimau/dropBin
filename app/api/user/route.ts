import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/dbConnect';
import User from '@/models/userModel';
import { nanoid } from 'nanoid';



export async function POST(request: NextRequest) {
  try {
    
    await dbConnect();

   
    const body: { text: string } = await request.json();

    const user = new User({ text: body.text });
    
    const nanoidgen = nanoid(6);
    user.url = nanoidgen;
    
    await user.save();

    return NextResponse.json({ url: user.url, text: user.text, id: user._id });
    
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Something went wrong' }, { status: 500 });
  }
}
