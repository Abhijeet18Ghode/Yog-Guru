"use client";
import { useState, useEffect } from 'react';
import Link from 'next/link';
import Navbar from '../components/navbar';

export default function BlogsPage() {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchBlogs();
  }, []);

  const fetchBlogs = async () => {
    try {
      let res = await fetch('/api/blogs');
      
      // Fallback to local storage if MongoDB fails
      if (!res.ok) {
        console.log('MongoDB failed, trying local storage...');
        res = await fetch('/api/blogs-local');
      }
      
      const data = await res.json();
      if (data.success) {
        setBlogs(data.data);
      }
    } catch (error) {
      console.error('Error fetching blogs:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-pink-50 to-rose-50 flex items-center justify-center">
        <div className="text-2xl text-rose-600">Loading blogs...</div>
      </div>
    );
  }

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gradient-to-br from-pink-50 to-rose-50">
        <div className="max-w-7xl mx-auto px-4 py-20">
          {/* Header */}
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-5xl font-light text-rose-900 mb-6">
              📖 YogPremi Blogs
            </h1>
            <div className="text-2xl md:text-3xl text-rose-800 font-light mb-8">
              🌼 Read — Reflect — Realize
            </div>
            <p className="text-lg md:text-xl text-rose-700 leading-relaxed italic max-w-4xl mx-auto">
              &quot;Each blog is a conversation between today&apos;s confusion and yesterday&apos;s eternal truth.&quot;
            </p>
          </div>

          {/* Blogs Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {blogs.length === 0 ? (
              <div className="col-span-full text-center py-12">
                <p className="text-rose-700 text-xl">No blogs available yet. Check back soon!</p>
              </div>
            ) : (
              blogs.map((blog) => (
                <div key={blog._id} className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 border border-rose-100">
                  <div className="mb-4 rounded-xl overflow-hidden">
                    <img 
                      src={blog.imagePath} 
                      alt={blog.title}
                      className="w-full h-48 object-cover hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  
                  <div className="mb-4">
                    <h3 className="text-xl font-semibold text-rose-900 mb-3 leading-tight">
                      {blog.title}
                    </h3>
                    <p className="text-rose-700 leading-relaxed mb-4">
                      {blog.shortDescription}
                    </p>
                  </div>
                  
                  <div className="flex justify-between items-center">
                    <button 
                      onClick={() => window.location.href = `/blogs/${blog._id}`}
                      className="px-6 py-2 bg-gradient-to-r from-rose-600 to-pink-600 text-white rounded-full font-medium hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1"
                    >
                      Read More
                    </button>
                    <div className="text-rose-400 text-sm">
                      {blog.createdAt ? new Date(blog.createdAt).toLocaleDateString() : 'Recently'}
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </>
  );
}