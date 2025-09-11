"use client";
import React, { useState, useEffect } from 'react';
import Image from 'next/image';

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

  const defaultContent = {
    title: 'Ancient Yoga Journey',
    content: {
      subtitle: 'Find Your Inner Peace with Expert Yoga Instructors',
      description: 'Embark on a transformative journey through ancient wisdom and modern practice'
    }
  };

  const content = heroContent || defaultContent;

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-amber-50 via-orange-50 to-yellow-50">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
          <pattern id="mandala" x="0" y="0" width="50" height="50" patternUnits="userSpaceOnUse">
            <circle cx="25" cy="25" r="20" fill="none" stroke="currentColor" strokeWidth="0.5"/>
            <circle cx="25" cy="25" r="15" fill="none" stroke="currentColor" strokeWidth="0.5"/>
            <circle cx="25" cy="25" r="10" fill="none" stroke="currentColor" strokeWidth="0.5"/>
            <circle cx="25" cy="25" r="5" fill="none" stroke="currentColor" strokeWidth="0.5"/>
          </pattern>
          <rect width="100%" height="100%" fill="url(#mandala)"/>
        </svg>
      </div>

      {/* Floating Elements */}
      <div className="absolute top-20 left-10 w-16 h-16 text-amber-200/30 animate-float">
        <svg viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 2L13.09 8.26L20 9.27L13.09 10.28L12 16.54L10.91 10.28L4 9.27L10.91 8.26L12 2Z"/>
        </svg>
      </div>
      <div className="absolute top-32 right-16 w-12 h-12 text-orange-200/30 animate-float-delayed">
        <svg viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 2L13.09 8.26L20 9.27L13.09 10.28L12 16.54L10.91 10.28L4 9.27L10.91 8.26L12 2Z"/>
        </svg>
      </div>

      {/* Main Content Container */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          
          {/* Left Content */}
          <div className="text-center lg:text-left space-y-8">
            {/* Decorative Element */}
            <div className="flex justify-center lg:justify-start">
              <div className="w-24 h-1 bg-gradient-to-r from-amber-600 to-orange-600 rounded-full"></div>
            </div>

            {/* Main Heading */}
            <div className="space-y-4">
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-light text-amber-900 leading-tight">
                {content.title || 'Ancient Yoga Journey'}
              </h1>
              
              {/* Sanskrit Om Symbol */}
              <div className="flex justify-center lg:justify-start">
                <div className="text-6xl text-amber-600/70 font-serif">ॐ</div>
              </div>
            </div>

            {/* Tagline */}
            <div className="space-y-2">
              <p className="text-xl sm:text-2xl text-amber-800 font-light italic">
                "{content.content?.subtitle || 'Find Your Inner Peace with Expert Yoga Instructors'}"
              </p>
              <p className="text-base sm:text-lg text-amber-700/80 max-w-lg mx-auto lg:mx-0">
                {content.content?.description || 'Embark on a transformative journey through ancient wisdom and modern practice'}
              </p>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <button 
                onClick={() => document.getElementById('book-session')?.scrollIntoView({ behavior: 'smooth' })}
                className="group relative px-8 py-4 bg-gradient-to-r from-amber-600 to-orange-600 text-white rounded-full font-semibold text-lg shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 hover:scale-105"
              >
                <span className="relative z-10">Book a Class</span>
                <div className="absolute inset-0 bg-gradient-to-r from-orange-600 to-amber-600 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </button>
              
              <button 
                onClick={() => document.getElementById('blogs')?.scrollIntoView({ behavior: 'smooth' })}
                className="px-8 py-4 border-2 border-amber-600 text-amber-700 rounded-full font-semibold text-lg hover:bg-amber-600 hover:text-white transition-all duration-300 transform hover:-translate-y-1"
              >
                Learn More
              </button>
            </div>

            {/* Features */}
            <div className="flex flex-wrap gap-6 justify-center lg:justify-start text-sm text-amber-700">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-amber-600 rounded-full"></div>
                <span>Expert Instructors</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-amber-600 rounded-full"></div>
                <span>Ancient Traditions</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-amber-600 rounded-full"></div>
                <span>Modern Techniques</span>
              </div>
            </div>
          </div>

          {/* Right Content - Image */}
          <div className="relative">
            {/* Main Image Container */}
            <div className="relative rounded-2xl overflow-hidden shadow-2xl transform rotate-2 hover:rotate-0 transition-transform duration-500">
              {/* Placeholder for yoga image */}
              <div className="aspect-[4/5] bg-gradient-to-br from-amber-100 to-orange-100 flex items-center justify-center">
                <div className="text-center space-y-4 p-8">
                  <div className="text-8xl text-amber-600/50">🧘‍♀️</div>
                  <p className="text-amber-700 font-medium">Yoga Meditation Image</p>
                  <p className="text-sm text-amber-600">Replace with your calming yoga image/video</p>
                </div>
              </div>
              
              {/* Image Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
            </div>

            {/* Decorative Elements Around Image */}
            <div className="absolute -top-4 -right-4 w-24 h-24 border-2 border-amber-300/50 rounded-full"></div>
            <div className="absolute -bottom-6 -left-6 w-32 h-32 border border-orange-300/30 rounded-full"></div>
            
            {/* Floating Quote */}
            <div className="absolute -left-8 top-1/2 transform -translate-y-1/2 bg-white/90 backdrop-blur-sm p-6 rounded-2xl shadow-lg max-w-xs hidden lg:block">
              <p className="text-amber-800 italic text-sm mb-2">
                "Yoga is not about touching your toes, it's about what you learn on the way down."
              </p>
              <p className="text-amber-600 text-xs">- Ancient Wisdom</p>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-amber-600 rounded-full flex justify-center">
          <div className="w-1 h-3 bg-amber-600 rounded-full mt-2 animate-pulse"></div>
        </div>
      </div>

      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-20px) rotate(180deg); }
        }
        
        @keyframes float-delayed {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-15px) rotate(-180deg); }
        }
        
        .animate-float {
          animation: float 6s ease-in-out infinite;
        }
        
        .animate-float-delayed {
          animation: float-delayed 8s ease-in-out infinite;
          animation-delay: 2s;
        }
        
        @import url('https://fonts.googleapis.com/css2?family=Crimson+Text:ital,wght@0,400;0,600;1,400&family=Inter:wght@300;400;500;600;700&display=swap');
        
        .font-serif {
          font-family: 'Crimson Text', serif;
        }
      `}</style>
    </section>
  );
};

export default HeroSection;

