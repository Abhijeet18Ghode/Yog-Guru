"use client";
import { CONTACT_INFO } from '../config/constants';

const Footer = () => {
  return (
    <footer className="bg-gradient-to-b from-orange-900 via-amber-900 to-yellow-900 text-amber-100 py-16">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        
        {/* Main Quote */}
        <div className="text-center mb-12">
          <div className="text-3xl md:text-4xl font-light text-amber-200 mb-4">
            🌸 "सर्वे भवन्तु सुखिनः — May all beings be peaceful and happy." 🌸
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          
          {/* Brand Section */}
          <div className="lg:col-span-2">
            <div className="flex items-center space-x-4 mb-6">
              <div className="w-16 h-16 rounded-full bg-gradient-to-br from-amber-400 to-orange-500 flex items-center justify-center">
                <span className="text-white text-2xl font-bold">🕉</span>
              </div>
              <div>
                <h3 className="text-3xl font-light text-amber-200">YogPremi</h3>
                <p className="text-sm text-amber-300">The Living Light of Yoga Wisdom</p>
              </div>
            </div>
            <p className="text-amber-200 mb-6 max-w-md leading-relaxed">
              "A journey from doubt to devotion, from effort to realization."
              Experience the transformative power of ancient wisdom in modern life.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold text-amber-200 mb-4">Navigation</h4>
            <ul className="space-y-2">
              <li><a href="#blogs" className="text-amber-300 hover:text-amber-200 transition-colors">Blogs</a></li>
              <li><a href="#techniques" className="text-amber-300 hover:text-amber-200 transition-colors">Techniques</a></li>
              <li><a href="#library" className="text-amber-300 hover:text-amber-200 transition-colors">Library</a></li>
              <li><a href="#research" className="text-amber-300 hover:text-amber-200 transition-colors">Anusandhan</a></li>
              <li><a href="#store" className="text-amber-300 hover:text-amber-200 transition-colors">Store</a></li>
              <li><a href="#contact" className="text-amber-300 hover:text-amber-200 transition-colors">Contact</a></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-lg font-semibold text-amber-200 mb-4">Connect</h4>
            <div className="space-y-3">
              <div className="flex items-center space-x-2">
                <span className="text-amber-400">📩</span>
                <span className="text-amber-300 text-sm">Ask Your Doubt Form</span>
              </div>
              <div className="flex items-center space-x-2">
                <span className="text-amber-400">📱</span>
                <span className="text-amber-300 text-sm">{CONTACT_INFO.phone}</span>
              </div>
              <div className="flex items-center space-x-2">
                <span className="text-amber-400">✉️</span>
                <span className="text-amber-300 text-sm">{CONTACT_INFO.email}</span>
              </div>
              <div className="flex items-center space-x-2">
                <span className="text-amber-400">🙏</span>
                <span className="text-amber-300 text-sm">Join as Seva Volunteer</span>
              </div>
            </div>
          </div>
        </div>

        {/* Social Media Icons */}
        <div className="text-center mb-8">
          <div className="flex justify-center space-x-6">
            <button 
              onClick={() => window.open('https://youtube.com', '_blank')}
              className="w-12 h-12 rounded-full bg-red-600 flex items-center justify-center cursor-pointer hover:bg-red-500 transition-colors"
            >
              <span className="text-white text-lg">📺</span>
            </button>
            <button 
              onClick={() => window.open('https://instagram.com', '_blank')}
              className="w-12 h-12 rounded-full bg-pink-600 flex items-center justify-center cursor-pointer hover:bg-pink-500 transition-colors"
            >
              <span className="text-white text-lg">📷</span>
            </button>
            <button 
              onClick={() => window.open('https://telegram.org', '_blank')}
              className="w-12 h-12 rounded-full bg-blue-600 flex items-center justify-center cursor-pointer hover:bg-blue-500 transition-colors"
            >
              <span className="text-white text-lg">✈️</span>
            </button>
            <button 
              onClick={() => window.open('https://facebook.com', '_blank')}
              className="w-12 h-12 rounded-full bg-blue-700 flex items-center justify-center cursor-pointer hover:bg-blue-600 transition-colors"
            >
              <span className="text-white text-lg">📘</span>
            </button>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-amber-700 pt-8 text-center">
          <div className="mb-4">
            <p className="text-amber-300 text-sm mb-2">
              © {new Date().getFullYear()} YogPremi. All rights reserved.
            </p>
            <p className="text-amber-400 text-lg italic font-light">
              "YogPremi — A journey from doubt to devotion, from effort to realization."
            </p>
          </div>
          
          {/* About YogPremi */}
          <div className="max-w-4xl mx-auto">
            <h4 className="text-xl font-semibold text-amber-200 mb-4">🌞 About YogPremi</h4>
            <p className="text-amber-300 leading-relaxed">
              "YogPremi was founded with a single vision — to make the ancient wisdom of Yoga and Vedanta a living light for the modern world. 
              We are a collective of seekers guided by the teachings of the Rishis, saints, and Gurus of Bharat, offering direction in every aspect of life — physical, mental, intellectual, and spiritual."
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;