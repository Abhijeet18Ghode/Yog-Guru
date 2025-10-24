import { NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';
import dbConnect from '@/lib/mongodb';
import User from '@/models/User';

// Fallback admin credentials
const FALLBACK_ADMIN = {
  email: 'admin@youguru.com',
  password: 'admin123',
  name: 'Admin',
  role: 'admin',
  id: 'admin-fallback'
};

export async function POST(request) {
  try {
    const { email, password } = await request.json();

    let user = null;
    let useDatabase = true;

    // Try MongoDB first
    try {
      await dbConnect();
      user = await User.findOne({ email });
      if (user && !(await user.comparePassword(password))) {
        return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 });
      }
    } catch (dbError) {
      console.log('Database unavailable, using fallback auth');
      useDatabase = false;
    }

    // Fallback authentication
    if (!useDatabase || !user) {
      if (email === FALLBACK_ADMIN.email && password === FALLBACK_ADMIN.password) {
        user = FALLBACK_ADMIN;
      } else {
        return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 });
      }
    }

    const token = jwt.sign(
      { userId: user._id || user.id, role: user.role },
      process.env.JWT_SECRET || 'fallback-secret',
      { expiresIn: process.env.JWT_EXPIRE || '30d' }
    );

    const response = NextResponse.json({
      success: true,
      user: { 
        id: user._id || user.id, 
        name: user.name, 
        email: user.email, 
        role: user.role 
      }
    });

    response.cookies.set('token', token, {
      httpOnly: true,
      maxAge: 30 * 24 * 60 * 60 * 1000
    });

    return response;
  } catch (error) {
    console.error('Auth error:', error);
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}