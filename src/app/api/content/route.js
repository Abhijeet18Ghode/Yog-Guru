import { NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import Content from '@/models/Content';

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

export async function POST(request) {
  try {
    await dbConnect();
    const data = await request.json();
    
    const content = await Content.create(data);
    return NextResponse.json({ success: true, data: content });
  } catch (error) {
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}

export async function PUT(request) {
  try {
    await dbConnect();
    const { id, ...data } = await request.json();
    
    const content = await Content.findByIdAndUpdate(id, data, { new: true });
    return NextResponse.json({ success: true, data: content });
  } catch (error) {
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}

export async function DELETE(request) {
  try {
    await dbConnect();
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');
    
    await Content.findByIdAndDelete(id);
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}