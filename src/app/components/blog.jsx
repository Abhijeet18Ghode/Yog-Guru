"use client";
// pages/blog.jsx
import Head from 'next/head';

const Blog = () => {
  const blogPosts = [
    {
      id: 1,
      title: "The Origins of Hatha Yoga",
      excerpt: "Explore the ancient roots of Hatha Yoga and its transformation through the centuries.",
      image: "/api/placeholder/400/250?text=Hatha+Yoga",
      readTime: "5 min read",
      category: "History"
    },
    {
      id: 2,
      title: "Pranayama Breathing Techniques",
      excerpt: "Learn seven ancient breathing techniques that enhance vitality and mental clarity.",
      image: "/api/placeholder/400/250?text=Pranayama",
      readTime: "7 min read",
      category: "Practice"
    },
    {
      id: 3,
      title: "Sacred Mantras and Their Meanings",
      excerpt: "Discover the power of sacred sounds used in yoga tradition for millennia.",
      image: "/api/placeholder/400/250?text=Mantras",
      readTime: "6 min read",
      category: "Philosophy"
    },
    {
      id: 4,
      title: "Ayurveda and Yoga: Sister Sciences",
      excerpt: "Understand how these two ancient Indian disciplines complement each other.",
      image: "/api/placeholder/400/250?text=Ayurveda",
      readTime: "8 min read",
      category: "Wellness"
    },
    {
      id: 5,
      title: "The Seven Chakras Explained",
      excerpt: "A journey through the energy centers of the body according to yogic tradition.",
      image: "/api/placeholder/400/250?text=Chakras",
      readTime: "10 min read",
      category: "Energy"
    },
    {
      id: 6,
      title: "Meditation Practices of the Sages",
      excerpt: "Ancient meditation techniques that have been passed down through generations.",
      image: "/api/placeholder/400/250?text=Meditation",
      readTime: "9 min read",
      category: "Spirituality"
    }
  ];

  return (
    <div className="min-h-screen bg-amber-50">
      <Head>
        <title>Ancient Wisdom | Yoga Blog</title>
        <meta name="description" content="Discover ancient yoga wisdom and practices" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      {/* Header */}
      <header className="relative py-12 bg-gradient-to-b from-amber-100 to-amber-50 overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full opacity-10">
          <div className="absolute top-10 left-20 w-72 h-72 bg-amber-600 rounded-full mix-blend-multiply filter blur-xl animate-blob"></div>
          <div className="absolute top-10 right-20 w-72 h-72 bg-rose-300 rounded-full mix-blend-multiply filter blur-xl animate-blob animation-delay-2000"></div>
          <div className="absolute -bottom-8 left-40 w-72 h-72 bg-emerald-300 rounded-full mix-blend-multiply filter blur-xl animate-blob animation-delay-4000"></div>
        </div>
        
        <div className="container mx-auto px-4 relative z-10">
          <h1 className="text-5xl md:text-6xl font-serif font-bold text-center text-amber-900 mb-4">
            Ancient Wisdom
          </h1>
          <p className="text-xl text-amber-800 text-center max-w-2xl mx-auto">
            Explore the timeless teachings of yoga through our collection of articles
          </p>
          
          <div className="flex justify-center mt-8">
            <div className="w-24 h-1 bg-amber-700 rounded-full"></div>
          </div>
        </div>
      </header>

      {/* Blog Posts Grid */}
      <main id="blogs" className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {blogPosts.map((post) => (
            <div 
              key={post.id} 
              className="bg-white rounded-lg overflow-hidden shadow-lg transition-transform duration-300 hover:translate-y-2 hover:shadow-xl"
            >
              <div className="relative overflow-hidden h-48">
                <img 
                  src={post.image} 
                  alt={post.title}
                  className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                />
                <div className="absolute top-4 right-4 bg-amber-700 text-white px-3 py-1 rounded-full text-sm">
                  {post.category}
                </div>
              </div>
              
              <div className="p-6">
                <div className="flex items-center text-sm text-amber-600 mb-2">
                  <span>{post.readTime}</span>
                </div>
                
                <h2 className="text-2xl font-serif font-semibold text-amber-900 mb-3">
                  {post.title}
                </h2>
                
                <p className="text-amber-700 mb-4">
                  {post.excerpt}
                </p>
                
                <button 
                  onClick={() => window.open(`/blog/${post.id}`, '_blank')}
                  className="flex items-center text-amber-700 font-medium group hover:text-amber-600 transition-colors"
                  aria-label={`Read more about ${post.title}`}
                >
                  Read More
                  <svg 
                    className="w-5 h-5 ml-2 transition-transform group-hover:translate-x-1" 
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24" 
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
                  </svg>
                </button>
              </div>
            </div>
          ))}
        </div>
      </main>

      {/* Footer */}
      {/* <footer className="bg-amber-900 text-amber-100 py-12">
        <div className="container mx-auto px-4 text-center">
          <div className="flex justify-center mb-6">
            <div className="w-16 h-16 rounded-full bg-amber-700 flex items-center justify-center">
              <svg 
                className="w-8 h-8 text-amber-100" 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24" 
                xmlns="http://www.w3.org/2000/svg"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 11c0 3.517-1.009 6.799-2.753 9.571m-3.44-2.04l.054-.09A13.916 13.916 0 008 11a4 4 0 118 0c0 1.017-.07 2.019-.203 3m-2.118 6.844A21.88 21.88 0 0015.171 17m3.839 1.132c.645-2.266.99-4.659.99-7.132A8 8 0 008 4.07M3 15.364c.64-1.319 1-2.8 1-4.364 0-1.457.39-2.823 1.07-4"></path>
              </svg>
            </div>
          </div>
          
          <p className="text-lg font-serif mb-4">Ancient Wisdom Yoga Blog</p>
          <p className="text-amber-200 max-w-lg mx-auto">
            Connecting modern practitioners with the ancient roots of yoga through knowledge and practice.
          </p>
          
          <div className="mt-8 pt-8 border-t border-amber-700">
            <p className="text-sm text-amber-300">
              © {new Date().getFullYear()} Ancient Wisdom. All rights reserved.
            </p>
          </div>
        </div>
      </footer> */}

      <style jsx global>{`
        @keyframes blob {
          0% { transform: translate(0px, 0px) scale(1); }
          33% { transform: translate(30px, -50px) scale(1.1); }
          66% { transform: translate(-20px, 20px) scale(0.9); }
          100% { transform: translate(0px, 0px) scale(1); }
        }
        .animate-blob {
          animation: blob 7s infinite;
        }
        .animation-delay-2000 {
          animation-delay: 2s;
        }
        .animation-delay-4000 {
          animation-delay: 4s;
        }
      `}</style>
    </div>
  );
};

export default Blog;