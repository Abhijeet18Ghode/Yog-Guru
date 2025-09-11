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
    { name: 'Home', href: '/', sanskrit: 'गृहम्' },
    { name: 'Blogs', href: '#blogs', sanskrit: 'लेखाः' },
    { name: 'Book Session', href: '#book-session', sanskrit: 'बुकिंग' },
    { name: 'Contact Us', href: '#contact', sanskrit: 'सम्पर्कः' },
  ];

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-700 ease-in-out ${
        isScrolled
          ? 'bg-gradient-to-r from-orange-900/95 via-red-900/95 to-orange-900/95 backdrop-blur-xl shadow-2xl border-b-2 border-amber-400/40'
          : 'bg-gradient-to-r from-orange-950/20 via-red-950/20 to-orange-950/20 backdrop-blur-sm'
      }`}
    >
      {/* Sacred top border with mandala pattern */}
      <div className="h-2 bg-gradient-to-r from-amber-600 via-orange-500 via-red-500 via-orange-500 to-amber-600 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-yellow-300/30 to-transparent animate-shimmer"></div>
      </div>
      
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex items-center justify-between h-24">
          {/* Enhanced Logo/Brand */}
          <div className="flex items-center space-x-4">
            <div className="relative">
              {/* Main sacred symbol */}
              <div className="w-16 h-16 rounded-full bg-gradient-to-br from-amber-400 via-orange-500 to-red-600 flex items-center justify-center shadow-2xl border-2 border-amber-300/50">
                {/* Om symbol */}
                <div className="text-white text-2xl font-bold relative">
                  ॐ
                  <div className="absolute inset-0 text-yellow-300 animate-pulse opacity-50">ॐ</div>
                </div>
              </div>
              
              {/* Rotating chakra elements */}
              <div className="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-gradient-to-r from-yellow-400 to-orange-400 animate-spin-slow flex items-center justify-center">
                <div className="w-2 h-2 rounded-full bg-red-500"></div>
              </div>
              
              {/* Sacred geometry background */}
              <div className="absolute inset-0 rounded-full border-2 border-amber-300/30 animate-pulse"></div>
              <div className="absolute -inset-2 rounded-full border border-orange-300/20 animate-ping"></div>
            </div>
            
            <div>
              <h1 className="text-3xl font-bold bg-gradient-to-r from-amber-400 via-orange-300 to-red-400 bg-clip-text text-transparent relative">
                Ancient Yoga
                <div className="absolute -top-1 left-0 right-0 h-px bg-gradient-to-r from-transparent via-amber-300/50 to-transparent"></div>
              </h1>
              <div className="flex items-center space-x-2 mt-1">
                <p className="text-xs text-amber-300/90 font-bold tracking-widest">
                  ॐ शान्तिः शान्तिः शान्तिः ॐ
                </p>
                <div className="flex space-x-1">
                  <div className="w-1 h-1 rounded-full bg-amber-400 animate-pulse"></div>
                  <div className="w-1 h-1 rounded-full bg-orange-400 animate-pulse" style={{ animationDelay: '0.2s' }}></div>
                  <div className="w-1 h-1 rounded-full bg-red-400 animate-pulse" style={{ animationDelay: '0.4s' }}></div>
                </div>
              </div>
            </div>
          </div>

          {/* Enhanced Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-2">
            {navItems.map((item, index) => (
              <Link
                key={item.name}
                href={item.href}
                className="group relative px-8 py-4 text-amber-200 font-medium transition-all duration-500 hover:text-orange-300"
              >
                <div className="text-center">
                  <span className="relative z-10 text-sm tracking-wider font-semibold block">
                    {item.name}
                  </span>
                  <span className="text-xs text-white block mt-1 transition-all duration-300">
                    {item.sanskrit}
                  </span>
                </div>
                
                {/* Enhanced hover effect with sacred geometry */}
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-orange-800/30 to-red-800/30 opacity-0 group-hover:opacity-100 transition-all duration-500 transform scale-75 group-hover:scale-100 border border-amber-400/20"></div>
                
                {/* Ancient-style decorative elements */}
                <div className="absolute -top-1 left-1/2 transform -translate-x-1/2 w-0 h-0.5 bg-gradient-to-r from-amber-400 to-orange-400 group-hover:w-12 transition-all duration-500"></div>
                <div className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-0 h-0.5 bg-gradient-to-r from-orange-400 to-red-400 group-hover:w-12 transition-all duration-500"></div>
                
                {/* Lotus petals decoration */}
                <div className="absolute -top-2 -left-2 w-3 h-3 rounded-full bg-amber-400/30 opacity-0 group-hover:opacity-100 transition-all duration-500 animate-pulse"></div>
                <div className="absolute -top-2 -right-2 w-3 h-3 rounded-full bg-orange-400/30 opacity-0 group-hover:opacity-100 transition-all duration-500 animate-pulse" style={{ animationDelay: '0.2s' }}></div>
                <div className="absolute -bottom-2 -left-2 w-3 h-3 rounded-full bg-red-400/30 opacity-0 group-hover:opacity-100 transition-all duration-500 animate-pulse" style={{ animationDelay: '0.4s' }}></div>
                <div className="absolute -bottom-2 -right-2 w-3 h-3 rounded-full bg-yellow-400/30 opacity-0 group-hover:opacity-100 transition-all duration-500 animate-pulse" style={{ animationDelay: '0.6s' }}></div>
              </Link>
            ))}
            
            {/* Enhanced Sacred CTA Button */}
            <div className="ml-8 pl-8 border-l-2 border-amber-400/30 relative">
              <div className="absolute left-0 top-1/2 transform -translate-y-1/2 -translate-x-1/2 w-3 h-3 rounded-full bg-amber-400 animate-pulse"></div>
              <button 
                onClick={() => document.getElementById('book-session')?.scrollIntoView({ behavior: 'smooth' })}
                className="group relative px-8 py-3 bg-gradient-to-r from-amber-600 via-orange-600 to-red-600 text-white rounded-full font-bold shadow-2xl hover:shadow-amber-500/25 transition-all duration-500 hover:scale-110 border-2 border-amber-400/40"
              >
                <span className="text-sm tracking-wider relative z-10">Book Session</span>
                <span className="text-xs block mt-1 text-amber-200 relative z-10">सत्संग</span>
                <div className="absolute inset-0 rounded-full bg-gradient-to-r from-red-600 via-orange-600 to-amber-600 opacity-0 group-hover:opacity-100 transition-all duration-500"></div>
                
                {/* Mandala decoration */}
                <div className="absolute -inset-1 rounded-full border border-amber-300/30 animate-spin-slow"></div>
                <div className="absolute -inset-2 rounded-full border border-orange-300/20 opacity-0 group-hover:opacity-100 animate-ping"></div>
              </button>
            </div>
          </div>

          {/* Enhanced Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="relative p-3 text-amber-300 hover:text-orange-400 transition-colors duration-300 rounded-full bg-gradient-to-r from-orange-900/50 to-red-900/50 border border-amber-400/30"
            >
              <svg
                className={`w-6 h-6 transform transition-transform duration-500 ${
                  isMobileMenuOpen ? 'rotate-180' : ''
                }`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                {isMobileMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <>
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h12M4 18h8" />
                    <circle cx="20" cy="12" r="2" />
                  </>
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* Enhanced Mobile Navigation */}
        <div
          className={`md:hidden transition-all duration-700 ease-in-out ${
            isMobileMenuOpen
              ? 'max-h-96 opacity-100 pb-8'
              : 'max-h-0 opacity-0 pb-0'
          } overflow-hidden`}
        >
          <div className="bg-gradient-to-br from-orange-900/95 via-red-900/95 to-orange-900/95 backdrop-blur-xl rounded-3xl shadow-2xl border-2 border-amber-400/40 mx-4 mt-6 overflow-hidden">
            {/* Sacred header */}
            <div className="bg-gradient-to-r from-amber-600/20 to-orange-600/20 px-6 py-3 border-b border-amber-400/30">
              <div className="flex items-center justify-center space-x-2">
                <div className="text-amber-300 text-sm">॰</div>
                <span className="text-amber-200 text-xs font-bold tracking-widest">SACRED NAVIGATION</span>
                <div className="text-amber-300 text-sm">॰</div>
              </div>
            </div>
            
            <div className="px-6 py-6 space-y-3">
              {navItems.map((item, index) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className="group block px-6 py-4 text-amber-200 font-semibold hover:text-orange-300 hover:bg-gradient-to-r hover:from-orange-800/30 hover:to-red-800/30 rounded-2xl transition-all duration-500 border-l-4 border-transparent hover:border-amber-400"
                  style={{
                    animationDelay: `${index * 150}ms`,
                    animation: isMobileMenuOpen ? 'slideInUp 0.6s ease-out forwards' : 'none'
                  }}
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="text-base tracking-wider block">{item.name}</span>
                      <span className="text-xs text-amber-400/70 mt-1 opacity-0 group-hover:opacity-100 transition-all duration-300">{item.sanskrit}</span>
                    </div>
                    <div className="flex space-x-1">
                      <div className="w-2 h-2 rounded-full bg-gradient-to-r from-amber-400 to-orange-400 opacity-50 group-hover:opacity-100"></div>
                      <div className="w-1 h-1 rounded-full bg-red-400 opacity-30 group-hover:opacity-80 mt-0.5"></div>
                    </div>
                  </div>
                </Link>
              ))}
              
              <div className="pt-6 mt-6 border-t-2 border-amber-400/30">
                <button 
                  onClick={() => document.getElementById('book-session')?.scrollIntoView({ behavior: 'smooth' })}
                  className="w-full px-6 py-4 bg-gradient-to-r from-amber-600 via-orange-600 to-red-600 text-white rounded-2xl font-bold shadow-2xl hover:shadow-amber-500/25 transition-all duration-500 hover:scale-105 border-2 border-amber-400/40 relative overflow-hidden"
                >
                  <span className="text-base tracking-wider relative z-10">Book Session</span>
                  <span className="text-sm text-amber-200 mt-1 relative z-10 block">सत्संग</span>
                  <div className="absolute inset-0 bg-gradient-to-r from-red-600 via-orange-600 to-amber-600 opacity-0 hover:opacity-100 transition-all duration-500"></div>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Enhanced decorative elements */}
      <div className="absolute top-full left-0 right-0 h-px bg-gradient-to-r from-transparent via-amber-400/60 to-transparent"></div>
      <div className="absolute top-full left-1/4 right-1/4 h-px bg-gradient-to-r from-transparent via-orange-400/40 to-transparent mt-1"></div>
      
      <style jsx>{`
        @keyframes slideInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        @keyframes shimmer {
          0% {
            transform: translateX(-100%);
          }
          100% {
            transform: translateX(100%);
          }
        }
        
        @keyframes spin-slow {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }
        
        .animate-shimmer {
          animation: shimmer 3s ease-in-out infinite;
        }
        
        .animate-spin-slow {
          animation: spin-slow 8s linear infinite;
        }
        
        .animate-pulse {
          animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
        }
        
        .animate-ping {
          animation: ping 2s cubic-bezier(0, 0, 0.2, 1) infinite;
        }
        
        @keyframes pulse {
          0%, 100% {
            opacity: 1;
          }
          50% {
            opacity: 0.3;
          }
        }
        
        @keyframes ping {
          75%, 100% {
            transform: scale(1.1);
            opacity: 0;
          }
        }
      `}</style>
    </nav>
  );
};

export default Navbar;