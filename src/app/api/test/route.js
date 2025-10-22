import { NextResponse } from 'next/server';

export async function GET() {
  try {
    return NextResponse.json({ 
      success: true, 
      message: 'API is working',
      env: {
        mongoUri: process.env.MONGO_URI ? 'Set' : 'Not set',
        dbName: process.env.DB_NAME
      }
    });
  } catch (error) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}