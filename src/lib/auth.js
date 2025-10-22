import jwt from 'jsonwebtoken';
import { NextResponse } from 'next/server';

export function verifyToken(request) {
  try {
    const token = request.cookies.get('token')?.value;
    if (!token) {
      return { error: 'No token provided', status: 401 };
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    if (decoded.role !== 'admin') {
      return { error: 'Admin access required', status: 403 };
    }

    return { user: decoded };
  } catch (error) {
    return { error: 'Invalid token', status: 401 };
  }
}

export function withAuth(handler) {
  return async (request) => {
    const auth = verifyToken(request);
    if (auth.error) {
      return NextResponse.json({ error: auth.error }, { status: auth.status });
    }
    return handler(request, auth.user);
  };
}