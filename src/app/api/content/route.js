import { NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import Content from '@/models/Content';
import { withAuth } from '@/lib/auth';

export async function GET(request) {
  try {
    await dbConnect();
    const { searchParams } = new URL(request.url);
    const type = searchParams.get('type');
    
    const query = type ? { type, isActive: true } : { isActive: true };
    const content = await Content.find(query).sort({ createdAt: -1 });
    
    return NextResponse.json({ success: true, data: content });
  } catch (error) {
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}

export const POST = withAuth(async (request) => {
  try {
    await dbConnect();
    const data = await request.json();
    
    // Input validation
    if (!data.type || !data.title) {
      return NextResponse.json({ error: 'Type and title are required' }, { status: 400 });
    }
    
    const content = await Content.create(data);
    return NextResponse.json({ success: true, data: content });
  } catch (error) {
    console.error('Content creation error:', error);
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
});

export const PUT = withAuth(async (request) => {
  try {
    await dbConnect();
    const { id, ...data } = await request.json();
    
    if (!id) {
      return NextResponse.json({ error: 'ID is required' }, { status: 400 });
    }
    
    const content = await Content.findByIdAndUpdate(id, data, { new: true });
    if (!content) {
      return NextResponse.json({ error: 'Content not found' }, { status: 404 });
    }
    
    return NextResponse.json({ success: true, data: content });
  } catch (error) {
    console.error('Content update error:', error);
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
});

export const DELETE = withAuth(async (request) => {
  try {
    await dbConnect();
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');
    
    if (!id) {
      return NextResponse.json({ error: 'ID is required' }, { status: 400 });
    }
    
    const content = await Content.findByIdAndDelete(id);
    if (!content) {
      return NextResponse.json({ error: 'Content not found' }, { status: 404 });
    }
    
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Content deletion error:', error);
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
});