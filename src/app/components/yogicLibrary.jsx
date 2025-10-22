"use client";
import React from 'react';

const YogicLibrary = () => {
  const scriptures = [
    {
      sanskrit: "योगः कर्मसु कौशलम्",
      translation: "Yoga is skill in action.",
      source: "Gita 2.50",
      meaning: "True yoga lies in performing actions with complete awareness and detachment from results."
    },
    {
      sanskrit: "चित्तवृत्ति निरोधः",
      translation: "Yoga is the stilling of mind's modifications.",
      source: "Patanjali 1.2", 
      meaning: "The essence of yoga is to calm the fluctuations and disturbances of the mind."
    },
    {
      sanskrit: "अहिंसा परमो धर्मः",
      translation: "Non-violence is the highest dharma.",
      source: "Ancient Wisdom",
      meaning: "The practice of non-violence in thought, word, and deed is the supreme spiritual principle."
    }
  ];

  return (
    <section className="py-20 bg-gradient-to-br from-purple-50 to-pink-50">
      <div className="max-w-6xl mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-light text-purple-900 mb-6">
            📚 Yogic Library
          </h2>
          <div className="text-2xl md:text-3xl text-purple-800 font-light mb-8">
            📜 Explore the Eternal Scriptures
          </div>
          <div className="text-xl text-purple-700 mb-4">
            ज्ञानकोश – The Wisdom Vault
          </div>
          <div className="max-w-4xl mx-auto">
            <p className="text-lg md:text-xl text-purple-700 leading-relaxed mb-4">
              "The words of Rishis are not history — they are living vibrations.
            </p>
            <p className="text-lg md:text-xl text-purple-700 leading-relaxed">
              Here you will find verses from the Gita, Upanishads, and Yoga Sutras with meanings for today."
            </p>
          </div>
        </div>

        {/* Scripture Cards */}
        <div className="space-y-8 mb-12">
          {scriptures.map((scripture, index) => (
            <div key={index} className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 border border-purple-100">
              <div className="text-center md:text-left">
                {/* Sanskrit Text */}
                <div className="text-3xl md:text-4xl font-serif text-purple-900 mb-4 text-center">
                  "{scripture.sanskrit}"
                </div>
                
                {/* Translation */}
                <div className="text-xl md:text-2xl text-purple-800 italic mb-4 text-center">
                  {scripture.translation}
                </div>
                
                {/* Source */}
                <div className="text-lg text-purple-600 font-semibold mb-4 text-center">
                  ({scripture.source})
                </div>
                
                {/* Modern Meaning */}
                <div className="bg-purple-50 rounded-xl p-6">
                  <h4 className="text-lg font-semibold text-purple-800 mb-2">Modern Understanding:</h4>
                  <p className="text-purple-700 leading-relaxed">{scripture.meaning}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Decorative Elements */}
        <div className="text-center mb-12">
          <div className="flex justify-center items-center space-x-8 text-6xl text-purple-300/50">
            <span>📜</span>
            <span>ॐ</span>
            <span>🕉</span>
            <span>📿</span>
          </div>
        </div>

        {/* CTA Button */}
        <div className="text-center">
          <button className="px-8 py-4 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-full font-semibold text-lg shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
            🔗 Enter Yogic Library
          </button>
        </div>

        {/* Additional Quote */}
        <div className="text-center mt-12">
          <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-8 max-w-3xl mx-auto">
            <p className="text-purple-800 italic text-lg">
              "Each verse is a doorway to eternal wisdom, connecting ancient insights with contemporary understanding."
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default YogicLibrary;