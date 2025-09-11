import { NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import User from '@/models/User';
import Content from '@/models/Content';

async function seedDatabase() {
  try {
    await dbConnect();

    // Create admin user
    const adminExists = await User.findOne({ email: 'admin@youguru.com' });
    if (!adminExists) {
      await User.create({
        name: 'Admin',
        email: 'admin@youguru.com',
        password: 'admin123',
        role: 'admin'
      });
    }

    // Seed hero content
    const heroExists = await Content.findOne({ type: 'hero' });
    if (!heroExists) {
      await Content.create({
        type: 'hero',
        title: 'Ancient Yoga Journey',
        content: {
          subtitle: 'Find Your Inner Peace with Expert Yoga Instructors',
          description: 'Embark on a transformative journey through ancient wisdom and modern practice',
          features: ['Expert Instructors', 'Ancient Traditions', 'Modern Techniques']
        }
      });
    }

    // Seed contact info
    const contactExists = await Content.findOne({ type: 'contact' });
    if (!contactExists) {
      await Content.create({
        type: 'contact',
        title: 'Contact Information',
        content: {
          phone: '+91 9881012691',
          whatsapp: '9881012691',
          email: 'info@ancientyoga.com',
          address: '123 Serenity Lane, Peace Valley',
          hours: 'Daily: 6AM - 8PM'
        }
      });
    }

    return NextResponse.json({ success: true, message: 'Database seeded successfully' });
  } catch (error) {
    return NextResponse.json({ error: 'Seeding failed' }, { status: 500 });
  }
}

export async function POST() {
  return await seedDatabase();
}

export async function GET() {
  return await seedDatabase();
}