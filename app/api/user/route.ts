import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/dbConnect';
import User, { IUser } from '@/models/userModel';

export const runtime = 'edge';

export async function GET() {
  try {
    await dbConnect();
    const users: IUser[] = await User.find({});
    return NextResponse.json({ users }, { status: 200 });
  } catch (error) {
    console.error('Failed to fetch users:', error);
    return NextResponse.json({ error: 'Failed to fetch users' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    await dbConnect();
    const body: Partial<IUser> = await request.json();
    const user: IUser = await User.create(body);
    return NextResponse.json({ user }, { status: 201 });
  } catch (error) {
    console.error('Failed to create user:', error);
    if (error instanceof Error) {
      return NextResponse.json({ error: error.message }, { status: 400 });
    }
    return NextResponse.json({ error: 'Failed to create user' }, { status: 500 });
  }
}