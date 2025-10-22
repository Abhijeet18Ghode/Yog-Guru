"use client";
import { useState, useEffect } from 'react';

const Blog = () => {
  const [blogPosts, setBlogPosts] = useState([]);

  useEffect(() => {
    const fetchBlogPosts = async () => {
      try {
        const res = await fetch('/api/blogs');
        const data = await res.json();
        if (data.success) {
          setBlogPosts(data.data.slice(0, 6)); // Show only first 6 blogs on homepage
        } else {
          // Fallback to local storage
          const localRes = await fetch('/api/blogs-local');
          const localData = await localRes.json();
          if (localData.success) {
            setBlogPosts(localData.data.slice(0, 6));
          }
        }
      } catch (error) {
        console.error('Error fetching blog posts:', error);
      }
    };
    fetchBlogPosts();
  }, []);

  const featuredBlogs = [
    {
      title: "🧘 Overthinking & Restlessness — Insights from Yoga Vasistha",
      excerpt: "Ancient wisdom to calm the restless mind and find inner peace through timeless teachings."
    },
    {
      title: "💫 Bhagavad Gita for Daily Work — Yoga of Action", 
      excerpt: "Transform your daily work into spiritual practice with Krishna's teachings on Karma Yoga."
    },
    {
      title: "💖 From Emotion to Devotion — True Meaning of Bhakti",
      excerpt: "Discover how to channel emotions into divine love and spiritual awakening."
    },
    {
      title: "🔥 The Mind According to Patanjali — How to Master It",
      excerpt: "Practical insights from Yoga Sutras to understand and control the fluctuations of mind."
    },
    {
      title: "🌍 Living Consciously in a Digital World — The Yogic Way",
      excerpt: "Ancient principles for maintaining spiritual balance in our modern digital age."
    }
  ];

  return (
    <section id="blogs" className="py-20 bg-gradient-to-br from-pink-50 to-rose-50">
      <div className="max-w-7xl mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-light text-rose-900 mb-6">
            📖 Blogs — Modern Problems, Ancient Solutions
          </h2>
          <div className="text-2xl md:text-3xl text-rose-800 font-light mb-8">
            🌼 Read — Reflect — Realize
          </div>
          <div className="max-w-4xl mx-auto">
            <p className="text-lg md:text-xl text-rose-700 leading-relaxed italic">
              "Each blog is a conversation between today's confusion and yesterday's eternal truth."
            </p>
          </div>
        </div>

        {/* Featured Blog Tiles */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {/* Show featured blogs if no dynamic content */}
          {blogPosts.length === 0 && featuredBlogs.map((blog, index) => (
            <div key={index} className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 border border-rose-100">
              <div className="mb-4">
                <h3 className="text-xl font-semibold text-rose-900 mb-3 leading-tight">
                  {blog.title}
                </h3>
                <p className="text-rose-700 leading-relaxed mb-4">
                  {blog.excerpt}
                </p>
              </div>
              
              <div className="flex justify-between items-center">
                <button className="px-6 py-2 bg-gradient-to-r from-rose-600 to-pink-600 text-white rounded-full font-medium hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1">
                  Read More
                </button>
                <div className="text-rose-400 text-sm">
                  {new Date().toLocaleDateString()}
                </div>
              </div>
            </div>
          ))}

          {/* Show dynamic blog posts */}
          {blogPosts.map((post) => (
            <div key={post._id} className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 border border-rose-100">
              {post.imagePath && (
                <div className="mb-4 rounded-xl overflow-hidden">
                  <img 
                    src={post.imagePath} 
                    alt={post.title}
                    className="w-full h-48 object-cover"
                  />
                </div>
              )}
              
              <div className="mb-4">
                <h3 className="text-xl font-semibold text-rose-900 mb-3 leading-tight">
                  {post.title}
                </h3>
                <p className="text-rose-700 leading-relaxed mb-4">
                  {post.shortDescription || 'Discover ancient wisdom for modern challenges...'}
                </p>
              </div>
              
              <div className="flex justify-between items-center">
                <button 
                  onClick={() => window.location.href = `/blogs/${post._id}`}
                  className="px-6 py-2 bg-gradient-to-r from-rose-600 to-pink-600 text-white rounded-full font-medium hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1"
                >
                  Read More
                </button>
                <div className="text-rose-400 text-sm">
                  {new Date(post.createdAt).toLocaleDateString()}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* CTA Button */}
        <div className="text-center">
          <button 
            onClick={() => window.location.href = '/blogs'}
            className="px-8 py-4 bg-gradient-to-r from-rose-600 to-pink-600 text-white rounded-full font-semibold text-lg shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
          >
            📚 View All Blogs
          </button>
        </div>

        {/* Decorative Elements */}
        <div className="text-center mt-12">
          <div className="flex justify-center items-center space-x-8 text-4xl text-rose-300/50">
            <span>📖</span>
            <span>🌼</span>
            <span>💫</span>
            <span>🔥</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Blog;