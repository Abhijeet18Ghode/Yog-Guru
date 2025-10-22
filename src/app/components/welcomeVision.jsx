"use client";
import React from 'react';

const WelcomeVision = () => {
  return (
    <section className="py-20 bg-gradient-to-br from-green-50 to-emerald-50">
      <div className="max-w-6xl mx-auto px-4 text-center">
        {/* Welcome Text */}
        <div className="mb-16">
          <h2 className="text-4xl md:text-5xl font-light text-green-900 mb-8">
            🌿 Welcome & Vision Statement
          </h2>
          <div className="max-w-4xl mx-auto">
            <p className="text-lg md:text-xl text-green-800 leading-relaxed mb-6">
              "YogPremi is not just a website — it is a living platform of awakening.
            </p>
            <p className="text-lg md:text-xl text-green-800 leading-relaxed mb-6">
              Here, timeless knowledge from saints, yogis, and scriptures meets the needs of the modern mind.
            </p>
            <p className="text-lg md:text-xl text-green-800 leading-relaxed">
              Every physical discomfort, every mental restlessness, every spiritual question — finds its answer in the eternal light of Yoga and Vedanta."
            </p>
          </div>
        </div>

        {/* Four Yogas Mandala */}
        <div className="mb-12">
          <h3 className="text-2xl text-green-800 mb-8">A mandala showing harmony of the Four Yogas:</h3>
          <div className="relative w-80 h-80 mx-auto mb-8">
            {/* Central Om */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-6xl text-green-600">ॐ</div>
            </div>
            
            {/* Four Yogas in circular arrangement */}
            <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-4">
              <div className="bg-white rounded-full p-4 shadow-lg border-2 border-green-200">
                <div className="text-center">
                  <div className="text-2xl mb-2">🔥</div>
                  <div className="text-sm font-semibold text-green-800">Karma Yoga</div>
                </div>
              </div>
            </div>
            
            <div className="absolute right-0 top-1/2 transform translate-x-4 -translate-y-1/2">
              <div className="bg-white rounded-full p-4 shadow-lg border-2 border-green-200">
                <div className="text-center">
                  <div className="text-2xl mb-2">💖</div>
                  <div className="text-sm font-semibold text-green-800">Bhakti Yoga</div>
                </div>
              </div>
            </div>
            
            <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-4">
              <div className="bg-white rounded-full p-4 shadow-lg border-2 border-green-200">
                <div className="text-center">
                  <div className="text-2xl mb-2">🧠</div>
                  <div className="text-sm font-semibold text-green-800">Jnana Yoga</div>
                </div>
              </div>
            </div>
            
            <div className="absolute left-0 top-1/2 transform -translate-x-4 -translate-y-1/2">
              <div className="bg-white rounded-full p-4 shadow-lg border-2 border-green-200">
                <div className="text-center">
                  <div className="text-2xl mb-2">👑</div>
                  <div className="text-sm font-semibold text-green-800">Raja Yoga</div>
                </div>
              </div>
            </div>
            
            {/* Connecting lines */}
            <svg className="absolute inset-0 w-full h-full" viewBox="0 0 320 320">
              <circle cx="160" cy="160" r="120" fill="none" stroke="#16a34a" strokeWidth="1" opacity="0.3"/>
              <circle cx="160" cy="160" r="80" fill="none" stroke="#16a34a" strokeWidth="1" opacity="0.2"/>
              <circle cx="160" cy="160" r="40" fill="none" stroke="#16a34a" strokeWidth="1" opacity="0.1"/>
            </svg>
          </div>
          
          <div className="flex justify-center text-green-700 text-lg space-x-2">
            <span>Karma Yoga</span>
            <span>•</span>
            <span>Bhakti Yoga</span>
            <span>•</span>
            <span>Jnana Yoga</span>
            <span>•</span>
            <span>Raja Yoga</span>
          </div>
        </div>

        {/* CTA Button */}
        <button className="px-8 py-4 bg-gradient-to-r from-green-600 to-emerald-600 text-white rounded-full font-semibold text-lg shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
          ✨ Discover Our Vision
        </button>
      </div>
    </section>
  );
};

export default WelcomeVision;