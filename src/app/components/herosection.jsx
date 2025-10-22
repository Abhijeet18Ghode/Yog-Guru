"use client";
import React, { useState, useEffect } from 'react';

const HeroSection = () => {
  const [heroContent, setHeroContent] = useState(null);

  useEffect(() => {
    const fetchHeroContent = async () => {
      try {
        const res = await fetch('/api/content?type=hero');
        const data = await res.json();
        if (data.success && data.data.length > 0) {
          setHeroContent(data.data[0]);
        }
      } catch (error) {
        console.error('Error fetching hero content:', error);
      }
    };
    fetchHeroContent();
  }, []);

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-orange-100 via-amber-50 to-yellow-100">
      {/* Background Sun Rays */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-1/2 transform -translate-x-1/2 w-96 h-96 bg-gradient-radial from-yellow-300/20 via-orange-200/10 to-transparent rounded-full animate-pulse"></div>
        <div className="absolute inset-0 opacity-10">
          <svg className="w-full h-full" viewBox="0 0 100 100">
            <defs>
              <radialGradient id="sunRays" cx="50%" cy="30%">
                <stop offset="0%" stopColor="#fbbf24" stopOpacity="0.3"/>
                <stop offset="100%" stopColor="#f59e0b" stopOpacity="0.1"/>
              </radialGradient>
            </defs>
            <circle cx="50" cy="30" r="40" fill="url(#sunRays)"/>
          </svg>
        </div>
      </div>

      {/* Om Symbol Background */}
      <div className="absolute top-16 right-20 text-9xl text-orange-200/20 font-serif animate-float">ॐ</div>
      <div className="absolute bottom-20 left-16 text-6xl text-amber-200/20 font-serif animate-float-delayed">🔹</div>

      {/* Main Content */}
      <div className="relative z-10 max-w-6xl mx-auto px-4 text-center">
        {/* Title */}
        <div className="space-y-6 mb-12">
          <div className="text-7xl mb-4">🌅</div>
          <h1 className="text-5xl md:text-7xl font-light text-orange-900 leading-tight">
            <span className="text-6xl md:text-8xl">🕉</span> YOGPREMI
          </h1>
          <div className="text-2xl md:text-3xl text-orange-800 font-light">
            — समत्वं योग उच्यते
          </div>
        </div>

        {/* Subtitle */}
        <div className="max-w-4xl mx-auto mb-12">
          <p className="text-xl md:text-2xl text-orange-700 italic leading-relaxed">
            "Ancient vision of the Rishis — solving the modern challenges of body, mind, intellect, and spirit."
          </p>
        </div>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-6 justify-center mb-16">
          <button 
            onClick={() => document.getElementById('blogs')?.scrollIntoView({ behavior: 'smooth' })}
            className="px-8 py-4 bg-gradient-to-r from-orange-600 to-amber-600 text-white rounded-full font-semibold text-lg shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
          >
            🔸 Explore Blogs
          </button>
          <button 
            onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
            className="px-8 py-4 border-2 border-orange-600 text-orange-700 rounded-full font-semibold text-lg hover:bg-orange-600 hover:text-white transition-all duration-300 transform hover:-translate-y-1"
          >
            🔸 Ask Your Doubt
          </button>
          <button 
            onClick={() => window.open(process.env.NEXT_PUBLIC_YOUTUBE_URL || 'https://youtube.com', '_blank')}
            className="px-8 py-4 bg-gradient-to-r from-red-600 to-red-700 text-white rounded-full font-semibold text-lg shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
          >
            🔸 Watch on YouTube
          </button>
        </div>

        {/* Meditating Yogi Illustration */}
        <div className="relative">
          <div className="text-8xl mb-4 animate-pulse">🧘‍♂️</div>
          <div className="text-sm text-orange-600 italic">
            A glowing sun emerging behind a meditating yogi, with golden rays forming an "Om" symbol in the sky.
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-orange-600 rounded-full flex justify-center">
          <div className="w-1 h-3 bg-orange-600 rounded-full mt-2 animate-pulse"></div>
        </div>
      </div>

      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-20px) rotate(5deg); }
        }
        
        @keyframes float-delayed {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-15px) rotate(-5deg); }
        }
        
        .animate-float {
          animation: float 8s ease-in-out infinite;
        }
        
        .animate-float-delayed {
          animation: float-delayed 10s ease-in-out infinite;
          animation-delay: 3s;
        }
      `}</style>
    </section>
  );
};

export default HeroSection;