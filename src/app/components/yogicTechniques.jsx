"use client";
import React from 'react';

const YogicTechniques = () => {
  const techniques = [
    {
      icon: "🩵",
      title: "Asana",
      subtitle: "Stability and balance of body",
      description: "Physical postures that create harmony between body and mind"
    },
    {
      icon: "💨",
      title: "Pranayama", 
      subtitle: "Breath as bridge to mind",
      description: "Breathing techniques to control life force energy"
    },
    {
      icon: "🔮",
      title: "Dhyana",
      subtitle: "Meditation and concentration", 
      description: "Practices to still the mind and achieve inner peace"
    },
    {
      icon: "🔱",
      title: "Mantra & Mudra",
      subtitle: "Awakening energy centers",
      description: "Sacred sounds and hand gestures for spiritual awakening"
    },
    {
      icon: "🌞",
      title: "Yogic Routine",
      subtitle: "Dinacharya and daily purification",
      description: "Daily practices for physical and spiritual cleansing"
    }
  ];

  return (
    <section className="py-20 bg-gradient-to-br from-blue-50 to-indigo-50">
      <div className="max-w-7xl mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-light text-blue-900 mb-6">
            🧘♀️ Yogic Techniques
          </h2>
          <div className="text-2xl md:text-3xl text-blue-800 font-light mb-8">
            🪷 From Practice to Realization
          </div>
          <div className="max-w-4xl mx-auto">
            <p className="text-lg md:text-xl text-blue-700 leading-relaxed mb-4">
              "Yoga is not only philosophy — it is living experience.
            </p>
            <p className="text-lg md:text-xl text-blue-700 leading-relaxed">
              Learn authentic techniques from ancient texts, explained for modern life."
            </p>
          </div>
        </div>

        {/* Techniques Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {techniques.map((technique, index) => (
            <div key={index} className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 border border-blue-100">
              <div className="text-center">
                <div className="text-6xl mb-4">{technique.icon}</div>
                <h3 className="text-2xl font-semibold text-blue-900 mb-2">{technique.title}</h3>
                <p className="text-lg text-blue-700 font-medium mb-4">{technique.subtitle}</p>
                <p className="text-blue-600 leading-relaxed mb-6">{technique.description}</p>
                
                {/* Watch Technique Button */}
                <button 
                  onClick={() => window.open('https://youtube.com', '_blank')}
                  className="w-full px-6 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-full font-semibold hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1"
                >
                  📺 Watch Technique
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Additional Info */}
        <div className="text-center">
          <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-8 max-w-2xl mx-auto">
            <p className="text-blue-800 italic text-lg">
              "Each technique includes a 'Watch Technique' button linking to corresponding YouTube video for practical learning."
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default YogicTechniques;