"use client";
import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import Navbar from '../../components/navbar';

export default function SingleBlogPage() {
  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);
  const params = useParams();

  useEffect(() => {
    if (params.id) {
      fetchBlog();
    }
  }, [params.id]);

  const fetchBlog = async () => {
    try {
      let res = await fetch(`/api/blogs/${params.id}`);
      
      // Fallback to local storage if MongoDB fails
      if (!res.ok) {
        console.log('MongoDB failed, trying local storage...');
        res = await fetch(`/api/blogs-local/${params.id}`);
      }
      
      const data = await res.json();
      if (data.success) {
        setBlog(data.data);
      }
    } catch (error) {
      console.error('Error fetching blog:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-pink-50 to-rose-50 flex items-center justify-center">
        <div className="text-2xl text-rose-600">Loading blog...</div>
      </div>
    );
  }

  if (!blog) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-pink-50 to-rose-50 flex items-center justify-center">
        <div className="text-center">
          <div className="text-2xl text-rose-600 mb-4">Blog not found</div>
          <Link href="/blogs" className="text-rose-500 hover:text-rose-700">
            ← Back to Blogs
          </Link>
        </div>
      </div>
    );
  }

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gradient-to-br from-pink-50 to-rose-50">
        <div className="max-w-4xl mx-auto px-4 py-20">
        {/* Back Button */}
        <div className="mb-8">
          <Link 
            href="/blogs" 
            className="inline-flex items-center text-rose-600 hover:text-rose-800 transition-colors"
          >
            ← Back to Blogs
          </Link>
        </div>

        {/* Blog Content */}
        <article className="bg-white rounded-2xl shadow-xl overflow-hidden">
          {/* Blog Image */}
          <div className="w-full h-64 md:h-96 overflow-hidden">
            <img 
              src={blog.imagePath} 
              alt={blog.title}
              className="w-full h-full object-cover"
            />
          </div>

          {/* Blog Content */}
          <div className="p-8 md:p-12">
            {/* Date */}
            <div className="text-rose-500 text-sm mb-4">
              {new Date(blog.createdAt).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric'
              })}
            </div>

            {/* Title */}
            <h1 className="text-3xl md:text-4xl font-bold text-rose-900 mb-6 leading-tight">
              {blog.title}
            </h1>

            {/* Short Description */}
            <div className="text-xl text-rose-700 mb-8 font-medium leading-relaxed">
              {blog.shortDescription}
            </div>

            {/* Long Description */}
            <div className="prose prose-lg prose-rose max-w-none">
              <div className="text-gray-700 leading-relaxed whitespace-pre-wrap">
                {blog.longDescription}
              </div>
            </div>

            {/* Share Section */}
            <div className="mt-12 pt-8 border-t border-rose-200">
              <div className="flex items-center justify-between">
                <div className="text-rose-600 font-medium">
                  Share this wisdom:
                </div>
                <div className="flex space-x-4">
                  <button className="px-4 py-2 bg-blue-600 text-white rounded-full text-sm hover:bg-blue-700 transition-colors">
                    Facebook
                  </button>
                  <button className="px-4 py-2 bg-blue-400 text-white rounded-full text-sm hover:bg-blue-500 transition-colors">
                    Twitter
                  </button>
                  <button className="px-4 py-2 bg-green-600 text-white rounded-full text-sm hover:bg-green-700 transition-colors">
                    WhatsApp
                  </button>
                </div>
              </div>
            </div>
          </div>
        </article>

        {/* Related Blogs CTA */}
        <div className="text-center mt-12">
          <Link 
            href="/blogs"
            className="inline-block px-8 py-4 bg-gradient-to-r from-rose-600 to-pink-600 text-white rounded-full font-semibold text-lg shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
          >
            📚 Explore More Wisdom
          </Link>
        </div>
      </div>
      </div>
    </>
  );
}
