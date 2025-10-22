import { NextResponse } from 'next/server';
import { writeFile, unlink } from 'fs/promises';
import path from 'path';
import dbConnect from '@/lib/mongodb';
import Blog from '@/models/Blog';
import { withAuth } from '@/lib/auth';

const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB
const ALLOWED_TYPES = ['image/jpeg', 'image/png', 'image/webp', 'image/gif'];

function validateInput(title, shortDescription, longDescription) {
  if (!title?.trim() || title.length > 200) {
    return 'Title is required and must be less than 200 characters';
  }
  if (!shortDescription?.trim() || shortDescription.length > 500) {
    return 'Short description is required and must be less than 500 characters';
  }
  if (!longDescription?.trim() || longDescription.length > 10000) {
    return 'Long description is required and must be less than 10000 characters';
  }
  return null;
}

export async function GET() {
  try {
    await dbConnect();
    const blogs = await Blog.find({}).sort({ createdAt: -1 });
    return NextResponse.json({ success: true, data: blogs });
  } catch (error) {
    console.error('GET /api/blogs error:', error);
    return NextResponse.json({ success: false, error: 'Failed to fetch blogs' }, { status: 500 });
  }
}

export const POST = withAuth(async (request) => {
  try {
    await dbConnect();
    
    const formData = await request.formData();
    const title = formData.get('title');
    const shortDescription = formData.get('shortDescription');
    const longDescription = formData.get('longDescription');
    const image = formData.get('image');

    // Validate input
    const validationError = validateInput(title, shortDescription, longDescription);
    if (validationError) {
      return NextResponse.json({ success: false, error: validationError }, { status: 400 });
    }

    if (!image) {
      return NextResponse.json({ success: false, error: 'Image is required' }, { status: 400 });
    }

    // Validate image
    if (!ALLOWED_TYPES.includes(image.type)) {
      return NextResponse.json({ success: false, error: 'Invalid image type' }, { status: 400 });
    }

    if (image.size > MAX_FILE_SIZE) {
      return NextResponse.json({ success: false, error: 'Image too large' }, { status: 400 });
    }

    // Save image
    const bytes = await image.arrayBuffer();
    const buffer = Buffer.from(bytes);
    const filename = `${Date.now()}-${image.name.replace(/[^a-zA-Z0-9.-]/g, '')}`;
    const filepath = path.join(process.cwd(), 'public/uploads', filename);
    
    await writeFile(filepath, buffer);
    
    const blog = new Blog({
      title: title.trim(),
      shortDescription: shortDescription.trim(),
      longDescription: longDescription.trim(),
      imagePath: `/uploads/${filename}`
    });

    const savedBlog = await blog.save();
    return NextResponse.json({ success: true, data: savedBlog }, { status: 201 });
  } catch (error) {
    console.error('POST /api/blogs error:', error);
    return NextResponse.json({ success: false, error: 'Failed to create blog' }, { status: 500 });
  }
});

export const PUT = withAuth(async (request) => {
  try {
    await dbConnect();
    
    const formData = await request.formData();
    const id = formData.get('id');
    const title = formData.get('title');
    const shortDescription = formData.get('shortDescription');
    const longDescription = formData.get('longDescription');
    const image = formData.get('image');

    const blog = await Blog.findById(id);
    if (!blog) {
      return NextResponse.json({ success: false, error: 'Blog not found' }, { status: 404 });
    }

    // Validate input
    const validationError = validateInput(title, shortDescription, longDescription);
    if (validationError) {
      return NextResponse.json({ success: false, error: validationError }, { status: 400 });
    }

    let imagePath = blog.imagePath;

    if (image && image.size > 0) {
      // Validate image
      if (!ALLOWED_TYPES.includes(image.type)) {
        return NextResponse.json({ success: false, error: 'Invalid image type' }, { status: 400 });
      }

      if (image.size > MAX_FILE_SIZE) {
        return NextResponse.json({ success: false, error: 'Image too large' }, { status: 400 });
      }

      // Delete old image
      try {
        const oldImagePath = path.join(process.cwd(), 'public', blog.imagePath);
        await unlink(oldImagePath);
      } catch (err) {
        console.log('Old image deletion failed:', err.message);
      }

      // Save new image
      const bytes = await image.arrayBuffer();
      const buffer = Buffer.from(bytes);
      const filename = `${Date.now()}-${image.name.replace(/[^a-zA-Z0-9.-]/g, '')}`;
      const filepath = path.join(process.cwd(), 'public/uploads', filename);
      
      await writeFile(filepath, buffer);
      imagePath = `/uploads/${filename}`;
    }

    const updatedBlog = await Blog.findByIdAndUpdate(
      id,
      { 
        title: title.trim(), 
        shortDescription: shortDescription.trim(), 
        longDescription: longDescription.trim(), 
        imagePath 
      },
      { new: true }
    );

    return NextResponse.json({ success: true, data: updatedBlog });
  } catch (error) {
    console.error('PUT /api/blogs error:', error);
    return NextResponse.json({ success: false, error: 'Failed to update blog' }, { status: 500 });
  }
});

export const DELETE = withAuth(async (request) => {
  try {
    await dbConnect();
    
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    if (!id) {
      return NextResponse.json({ success: false, error: 'ID is required' }, { status: 400 });
    }

    const blog = await Blog.findById(id);
    if (!blog) {
      return NextResponse.json({ success: false, error: 'Blog not found' }, { status: 404 });
    }

    // Delete image file
    try {
      const imagePath = path.join(process.cwd(), 'public', blog.imagePath);
      await unlink(imagePath);
    } catch (err) {
      console.log('Image deletion failed:', err.message);
    }

    await Blog.findByIdAndDelete(id);
    return NextResponse.json({ success: true, message: 'Blog deleted successfully' });
  } catch (error) {
    console.error('DELETE /api/blogs error:', error);
    return NextResponse.json({ success: false, error: 'Failed to delete blog' }, { status: 500 });
  }
});