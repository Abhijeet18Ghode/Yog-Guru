"use client";
import { CONTACT_INFO } from '../config/constants';

const Footer = () => {
  return (
    <footer className="bg-gradient-to-b from-amber-900 via-orange-900 to-red-900 text-amber-100 py-16">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          
          {/* Brand Section */}
          <div className="lg:col-span-2">
            <div className="flex items-center space-x-4 mb-6">
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-amber-400 to-orange-500 flex items-center justify-center">
                <span className="text-white text-xl font-bold">ॐ</span>
              </div>
              <div>
                <h3 className="text-2xl font-bold text-amber-200">Ancient Yoga</h3>
                <p className="text-sm text-amber-300">ॐ शान्तिः शान्तिः शान्तिः ॐ</p>
              </div>
            </div>
            <p className="text-amber-200 mb-6 max-w-md">
              Connect with ancient wisdom for modern wellbeing through our authentic yoga practices. 
              Experience the transformative power of traditional yoga in a peaceful environment.
            </p>
            <div className="flex space-x-4">
              <div className="w-8 h-8 rounded-full bg-amber-600 flex items-center justify-center cursor-pointer hover:bg-amber-500 transition-colors">
                <span className="text-white text-sm">f</span>
              </div>
              <div className="w-8 h-8 rounded-full bg-amber-600 flex items-center justify-center cursor-pointer hover:bg-amber-500 transition-colors">
                <span className="text-white text-sm">@</span>
              </div>
              <div className="w-8 h-8 rounded-full bg-amber-600 flex items-center justify-center cursor-pointer hover:bg-amber-500 transition-colors">
                <span className="text-white text-sm">in</span>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold text-amber-200 mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li><a href="/" className="text-amber-300 hover:text-amber-200 transition-colors">Home</a></li>
              <li><a href="/about" className="text-amber-300 hover:text-amber-200 transition-colors">About Us</a></li>
              <li><a href="/blogs" className="text-amber-300 hover:text-amber-200 transition-colors">Blogs</a></li>
              <li><a href="/contact" className="text-amber-300 hover:text-amber-200 transition-colors">Contact</a></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-lg font-semibold text-amber-200 mb-4">Contact Info</h4>
            <div className="space-y-3">
              <div className="flex items-center space-x-2">
                <span className="text-amber-400">📍</span>
                <span className="text-amber-300 text-sm">{CONTACT_INFO.address}</span>
              </div>
              <div className="flex items-center space-x-2">
                <span className="text-amber-400">📞</span>
                <span className="text-amber-300 text-sm">{CONTACT_INFO.phone}</span>
              </div>
              <div className="flex items-center space-x-2">
                <span className="text-amber-400">✉️</span>
                <span className="text-amber-300 text-sm">{CONTACT_INFO.email}</span>
              </div>
              <div className="flex items-center space-x-2">
                <span className="text-amber-400">⏰</span>
                <span className="text-amber-300 text-sm">{CONTACT_INFO.hours}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-amber-700 mt-12 pt-8 text-center">
          <p className="text-amber-300 text-sm">
            © {new Date().getFullYear()} Ancient Yoga. All rights reserved. | Honoring the ancient traditions.
          </p>
          <p className="text-amber-400 text-xs mt-2 italic">
            "Yoga is the journey of the self, through the self, to the self." — The Bhagavad Gita
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;