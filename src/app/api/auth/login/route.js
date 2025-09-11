import { NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';
import dbConnect from '@/lib/mongodb';
import User from '@/models/User';

export async function POST(request) {
  try {
    await dbConnect();
    const { email, password } = await request.json();

    const user = await User.findOne({ email });
    if (!user || !(await user.comparePassword(password))) {
      return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 });
    }

    const token = jwt.sign(
      { userId: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRE }
    );

    const response = NextResponse.json({
      success: true,
      user: { id: user._id, name: user.name, email: user.email, role: user.role }
    });

    response.cookies.set('token', token, {
      httpOnly: true,
      maxAge: 30 * 24 * 60 * 60 * 1000
    });

    return response;
  } catch (error) {
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}