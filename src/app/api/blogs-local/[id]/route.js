import { NextResponse } from 'next/server';
import { readFile } from 'fs/promises';
import path from 'path';

const BLOGS_FILE = path.join(process.cwd(), 'public', 'blogs.json');

const readBlogs = async () => {
  try {
    const data = await readFile(BLOGS_FILE, 'utf8');
    return JSON.parse(data);
  } catch {
    return [];
  }
};

export async function GET(request, { params }) {
  try {
    const blogs = await readBlogs();
    const blog = blogs.find(b => b._id === params.id);
    
    if (!blog) {
      return NextResponse.json({ success: false, error: 'Blog not found' }, { status: 404 });
    }
    
    return NextResponse.json({ success: true, data: blog });
  } catch (error) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}