'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    let timeoutId;
    const handleScroll = () => {
      if (timeoutId) clearTimeout(timeoutId);
      timeoutId = setTimeout(() => {
        setIsScrolled(window.scrollY > 20);
      }, 10);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (timeoutId) clearTimeout(timeoutId);
    };
  }, []);

  const navItems = [
    { name: 'Home', href: '/' },
    { name: 'About Us', href: '#about' },
    { name: 'Blogs', href: '/blogs' },
    { name: 'Contact', href: '#contact' },
  ];

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-700 ease-in-out ${
        isScrolled
          ? 'bg-gradient-to-r from-orange-900/95 via-amber-900/95 to-orange-900/95 backdrop-blur-xl shadow-2xl'
          : 'bg-gradient-to-r from-orange-950/20 via-amber-950/20 to-orange-950/20 backdrop-blur-sm'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo/Brand */}
          <div className="flex items-center space-x-4">
            <div className="relative">
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-amber-400 via-orange-500 to-red-600 flex items-center justify-center shadow-lg">
                <div className="text-white text-xl font-bold">🕉</div>
              </div>
            </div>
            
            <div>
              <h1 className="text-2xl font-light bg-gradient-to-r from-amber-200 to-orange-200 bg-clip-text text-transparent">
                YogPremi
              </h1>
              <p className="text-xs text-amber-300/80">
                The Living Light of Yoga Wisdom
              </p>
            </div>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="text-amber-200 hover:text-orange-300 font-medium transition-all duration-300 hover:scale-105"
              >
                {item.name}
              </Link>
            ))}
            
            <button 
              onClick={() => window.open(process.env.NEXT_PUBLIC_YOUTUBE_URL || 'https://youtube.com', '_blank')}
              className="px-6 py-2 bg-gradient-to-r from-red-600 to-red-700 text-white rounded-full font-semibold hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1"
            >
              YouTube
            </button>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 text-amber-300 hover:text-orange-400 transition-colors"
            >
              <svg
                className={`w-6 h-6 transform transition-transform duration-300 ${
                  isMobileMenuOpen ? 'rotate-180' : ''
                }`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                {isMobileMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        <div
          className={`md:hidden transition-all duration-500 ease-in-out ${
            isMobileMenuOpen
              ? 'max-h-96 opacity-100 pb-6'
              : 'max-h-0 opacity-0 pb-0'
          } overflow-hidden`}
        >
          <div className="bg-gradient-to-br from-orange-900/95 to-amber-900/95 rounded-2xl shadow-xl mx-4 mt-4 p-6">
            <div className="space-y-4">
              {navItems.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className="block px-4 py-3 text-amber-200 hover:text-orange-300 hover:bg-orange-800/30 rounded-xl transition-all duration-300"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {item.name}
                </Link>
              ))}
              
              <button 
                onClick={() => window.open(process.env.NEXT_PUBLIC_YOUTUBE_URL || 'https://youtube.com', '_blank')}
                className="w-full px-4 py-3 bg-gradient-to-r from-red-600 to-red-700 text-white rounded-xl font-semibold hover:shadow-lg transition-all duration-300"
              >
                YouTube
              </button>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;