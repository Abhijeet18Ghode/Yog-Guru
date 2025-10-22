import { NextResponse } from 'next/server';
import { writeFile, readFile, unlink } from 'fs/promises';
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

const writeBlogs = async (blogs) => {
  await writeFile(BLOGS_FILE, JSON.stringify(blogs, null, 2));
};

export async function GET() {
  try {
    const blogs = await readBlogs();
    return NextResponse.json({ success: true, data: blogs });
  } catch (error) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

export async function POST(request) {
  try {
    const formData = await request.formData();
    const title = formData.get('title');
    const shortDescription = formData.get('shortDescription');
    const longDescription = formData.get('longDescription');
    const image = formData.get('image');

    if (!title || !shortDescription || !longDescription || !image) {
      return NextResponse.json({ success: false, error: 'All fields are required' }, { status: 400 });
    }

    const bytes = await image.arrayBuffer();
    const buffer = Buffer.from(bytes);
    const filename = `${Date.now()}-${image.name.replace(/[^a-zA-Z0-9.-]/g, '')}`;
    const filepath = path.join(process.cwd(), 'public/uploads', filename);
    
    await writeFile(filepath, buffer);
    
    const blogs = await readBlogs();
    const newBlog = {
      _id: Date.now().toString(),
      title,
      shortDescription,
      longDescription,
      imagePath: `/uploads/${filename}`,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };

    blogs.unshift(newBlog);
    await writeBlogs(blogs);

    return NextResponse.json({ success: true, data: newBlog }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

export async function PUT(request) {
  try {
    const formData = await request.formData();
    const id = formData.get('id');
    const title = formData.get('title');
    const shortDescription = formData.get('shortDescription');
    const longDescription = formData.get('longDescription');
    const image = formData.get('image');

    const blogs = await readBlogs();
    const blogIndex = blogs.findIndex(b => b._id === id);
    
    if (blogIndex === -1) {
      return NextResponse.json({ success: false, error: 'Blog not found' }, { status: 404 });
    }

    let imagePath = blogs[blogIndex].imagePath;

    if (image && image.size > 0) {
      try {
        const oldImagePath = path.join(process.cwd(), 'public', blogs[blogIndex].imagePath);
        await unlink(oldImagePath);
      } catch (err) {
        console.log('Old image deletion failed:', err.message);
      }

      const bytes = await image.arrayBuffer();
      const buffer = Buffer.from(bytes);
      const filename = `${Date.now()}-${image.name.replace(/[^a-zA-Z0-9.-]/g, '')}`;
      const filepath = path.join(process.cwd(), 'public/uploads', filename);
      
      await writeFile(filepath, buffer);
      imagePath = `/uploads/${filename}`;
    }

    blogs[blogIndex] = {
      ...blogs[blogIndex],
      title,
      shortDescription,
      longDescription,
      imagePath,
      updatedAt: new Date().toISOString()
    };

    await writeBlogs(blogs);
    return NextResponse.json({ success: true, data: blogs[blogIndex] });
  } catch (error) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

export async function DELETE(request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    const blogs = await readBlogs();
    const blogIndex = blogs.findIndex(b => b._id === id);
    
    if (blogIndex === -1) {
      return NextResponse.json({ success: false, error: 'Blog not found' }, { status: 404 });
    }

    try {
      const imagePath = path.join(process.cwd(), 'public', blogs[blogIndex].imagePath);
      await unlink(imagePath);
    } catch (err) {
      console.log('Image deletion failed:', err.message);
    }

    blogs.splice(blogIndex, 1);
    await writeBlogs(blogs);

    return NextResponse.json({ success: true, message: 'Blog deleted successfully' });
  } catch (error) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}