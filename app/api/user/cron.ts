import { NextResponse } from 'next/server';
import dbConnect from '@/lib/dbConnect';
import User from '@/models/userModel';

export async function GET(request: Request) {
  try {
    await dbConnect();

    const currentDate = new Date();

    const deletedUsers = await User.deleteMany({
      expiresAt: { $lt: currentDate }
    });

    console.log(`Deleted ${deletedUsers.deletedCount} expired users`);

    return NextResponse.json({ message: `Deleted ${deletedUsers.deletedCount} expired users` });
  } catch (error) {
    console.error('Error in delete-expired-users function:', error);
    return NextResponse.json({ error: 'Something went wrong' }, { status: 500 });
  }
}