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
      <>
        <Navbar />
        <div className="min-h-screen bg-gradient-to-br from-pink-50 to-rose-50 flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-rose-600 mx-auto mb-4"></div>
            <div className="text-xl text-rose-600">Loading blog...</div>
          </div>
        </div>
      </>
    );
  }

  if (!blog) {
    return (
      <>
        <Navbar />
        <div className="min-h-screen bg-gradient-to-br from-pink-50 to-rose-50 flex items-center justify-center">
          <div className="text-center">
            <div className="text-6xl mb-4">📖</div>
            <div className="text-2xl text-rose-600 mb-4">Blog not found</div>
            <Link 
              href="/blogs" 
              className="inline-flex items-center px-6 py-3 bg-rose-600 text-white rounded-full hover:bg-rose-700 transition-colors"
            >
              ← Back to Blogs
            </Link>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gradient-to-br from-pink-50 to-rose-50">
        <div className="max-w-4xl mx-auto px-4 py-24">
          
          {/* Back Navigation */}
          <div className="mb-8">
            <Link 
              href="/blogs" 
              className="inline-flex items-center text-rose-600 hover:text-rose-800 transition-colors group"
            >
              <svg className="w-5 h-5 mr-2 group-hover:-translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              Back to All Blogs
            </Link>
          </div>

          {/* Blog Article */}
          <article className="bg-white rounded-3xl shadow-2xl overflow-hidden">
            
            {/* Featured Image */}
            <div className="relative h-64 md:h-96 overflow-hidden">
              <img 
                src={blog.imagePath} 
                alt={blog.title}
                className="w-full h-full object-cover"
                onError={(e) => {
                  e.target.src = '/api/placeholder/800/400?text=Blog+Image';
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent"></div>
              
              {/* Blog Category Badge */}
              <div className="absolute top-6 left-6">
                <span className="px-4 py-2 bg-rose-600 text-white rounded-full text-sm font-semibold">
                  📖 YogPremi Blog
                </span>
              </div>
            </div>

            {/* Blog Content */}
            <div className="p-8 md:p-12">
              
              {/* Publication Date */}
              <div className="flex items-center text-rose-500 text-sm mb-6">
                <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                Published on {blog.createdAt ? new Date(blog.createdAt).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric'
                }) : 'Recently'}
              </div>

              {/* Blog Title */}
              <h1 className="text-3xl md:text-5xl font-bold text-rose-900 mb-8 leading-tight">
                {blog.title}
              </h1>

              {/* Short Description (Summary) */}
              <div className="bg-gradient-to-r from-rose-50 to-pink-50 rounded-2xl p-6 mb-8 border-l-4 border-rose-500">
                <h2 className="text-lg font-semibold text-rose-800 mb-3 flex items-center">
                  <span className="text-2xl mr-2">💫</span>
                  Blog Summary
                </h2>
                <p className="text-xl text-rose-700 leading-relaxed font-medium">
                  {blog.shortDescription}
                </p>
              </div>

              {/* Main Content */}
              <div className="prose prose-lg prose-rose max-w-none">
                <h2 className="text-2xl font-semibold text-rose-800 mb-6 flex items-center">
                  <span className="text-3xl mr-3">📝</span>
                  Full Article
                </h2>
                <div 
                  className="text-gray-700 leading-relaxed text-lg prose prose-lg max-w-none"
                  dangerouslySetInnerHTML={{ __html: blog.longDescription }}
                />
              </div>

              {/* Blog Metadata */}
              <div className="mt-12 pt-8 border-t border-rose-200">
                <div className="grid md:grid-cols-2 gap-6">
                  
                  {/* Blog Info */}
                  <div className="bg-rose-50 rounded-xl p-6">
                    <h3 className="text-lg font-semibold text-rose-800 mb-4 flex items-center">
                      <span className="text-2xl mr-2">ℹ️</span>
                      Blog Information
                    </h3>
                    <div className="space-y-3 text-sm">
                      <div className="flex justify-between">
                        <span className="text-rose-600 font-medium">Created:</span>
                        <span className="text-rose-800">{blog.createdAt ? new Date(blog.createdAt).toLocaleDateString() : 'Recently'}</span>
                      </div>
                      {blog.updatedAt && blog.updatedAt !== blog.createdAt && (
                        <div className="flex justify-between">
                          <span className="text-rose-600 font-medium">Updated:</span>
                          <span className="text-rose-800">{new Date(blog.updatedAt).toLocaleDateString()}</span>
                        </div>
                      )}
                      <div className="flex justify-between">
                        <span className="text-rose-600 font-medium">Reading Time:</span>
                        <span className="text-rose-800">{Math.ceil((blog.longDescription?.length || 0) / 200)} min read</span>
                      </div>
                    </div>
                  </div>

                  {/* Share Section */}
                  <div className="bg-pink-50 rounded-xl p-6">
                    <h3 className="text-lg font-semibold text-rose-800 mb-4 flex items-center">
                      <span className="text-2xl mr-2">🔗</span>
                      Share This Wisdom
                    </h3>
                    <div className="flex flex-wrap gap-3">
                      <button 
                        onClick={() => window.open(`https://www.facebook.com/sharer/sharer.php?u=${window.location.href}`, '_blank')}
                        className="px-4 py-2 bg-blue-600 text-white rounded-full text-sm hover:bg-blue-700 transition-colors flex items-center"
                      >
                        📘 Facebook
                      </button>
                      <button 
                        onClick={() => window.open(`https://twitter.com/intent/tweet?url=${window.location.href}&text=${blog.title}`, '_blank')}
                        className="px-4 py-2 bg-blue-400 text-white rounded-full text-sm hover:bg-blue-500 transition-colors flex items-center"
                      >
                        🐦 Twitter
                      </button>
                      <button 
                        onClick={() => window.open(`https://wa.me/?text=${blog.title} - ${window.location.href}`, '_blank')}
                        className="px-4 py-2 bg-green-600 text-white rounded-full text-sm hover:bg-green-700 transition-colors flex items-center"
                      >
                        💬 WhatsApp
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              {/* Spiritual Quote */}
              <div className="mt-8 text-center">
                <div className="bg-gradient-to-r from-orange-100 to-amber-100 rounded-2xl p-8 border border-orange-200">
                  <p className="text-xl text-orange-800 italic font-medium mb-2">
                    "Each blog is a conversation between today's confusion and yesterday's eternal truth."
                  </p>
                  <p className="text-orange-600 text-sm">— YogPremi Wisdom</p>
                </div>
              </div>
            </div>
          </article>

          {/* Navigation to More Blogs */}
          <div className="text-center mt-12">
            <Link 
              href="/blogs"
              className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-rose-600 to-pink-600 text-white rounded-full font-semibold text-lg shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
            >
              <span className="text-2xl mr-3">📚</span>
              Explore More Wisdom
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}