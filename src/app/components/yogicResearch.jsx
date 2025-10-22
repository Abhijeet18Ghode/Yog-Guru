"use client";
import React from 'react';

const YogicResearch = () => {
  const researchTopics = [
    {
      icon: "🧬",
      title: "The Science of Breath and Brain",
      description: "Exploring how pranayama affects neural pathways and cognitive function"
    },
    {
      icon: "💫", 
      title: "Consciousness in Upanishads & Quantum Physics",
      description: "Bridging ancient understanding of consciousness with modern quantum theories"
    },
    {
      icon: "🧘",
      title: "Mind & Chitta — Ancient Psychology of Yoga Sutra", 
      description: "Patanjali's psychological insights validated by contemporary neuroscience"
    },
    {
      icon: "🌎",
      title: "Global Peace through Yogic Vision",
      description: "How yogic principles can contribute to world harmony and understanding"
    }
  ];

  return (
    <section className="py-20 bg-gradient-to-br from-teal-50 to-cyan-50">
      <div className="max-w-7xl mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-light text-teal-900 mb-6">
            🔬 Yogic Anusandhan
          </h2>
          <div className="text-2xl md:text-3xl text-teal-800 font-light mb-8">
            🧠 Where Ancient Science Meets Modern Understanding
          </div>
          <div className="text-xl text-teal-700 mb-4">
            Research & Reflection
          </div>
          <div className="max-w-4xl mx-auto">
            <p className="text-lg md:text-xl text-teal-700 leading-relaxed mb-4">
              "Yoga is the eternal science of consciousness.
            </p>
            <p className="text-lg md:text-xl text-teal-700 leading-relaxed">
              In this section, we explore how ancient yogic principles harmonize with modern psychology, neuroscience, and life sciences."
            </p>
          </div>
        </div>

        {/* Research Topics Grid */}
        <div className="grid md:grid-cols-2 gap-8 mb-12">
          {researchTopics.map((topic, index) => (
            <div key={index} className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 border border-teal-100">
              <div className="flex items-start space-x-4">
                <div className="text-5xl flex-shrink-0">{topic.icon}</div>
                <div>
                  <h3 className="text-2xl font-semibold text-teal-900 mb-4">{topic.title}</h3>
                  <p className="text-teal-700 leading-relaxed mb-6">{topic.description}</p>
                  
                  <button className="px-6 py-3 bg-gradient-to-r from-teal-600 to-cyan-600 text-white rounded-full font-semibold hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1">
                    Explore Research
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Scientific Integration Visual */}
        <div className="bg-white rounded-2xl p-8 mb-12 shadow-lg border border-teal-100">
          <div className="text-center">
            <h3 className="text-2xl font-semibold text-teal-900 mb-8">Ancient Wisdom ↔ Modern Science</h3>
            
            <div className="grid md:grid-cols-3 gap-8 items-center">
              {/* Ancient Side */}
              <div className="text-center">
                <div className="text-6xl mb-4">📜</div>
                <h4 className="text-xl font-semibold text-teal-800 mb-2">Ancient Texts</h4>
                <p className="text-teal-600">Vedas, Upanishads, Yoga Sutras</p>
              </div>
              
              {/* Bridge */}
              <div className="text-center">
                <div className="text-6xl mb-4">🌉</div>
                <h4 className="text-xl font-semibold text-teal-800 mb-2">Integration</h4>
                <p className="text-teal-600">Bridging Wisdom & Knowledge</p>
              </div>
              
              {/* Modern Side */}
              <div className="text-center">
                <div className="text-6xl mb-4">🔬</div>
                <h4 className="text-xl font-semibold text-teal-800 mb-2">Modern Science</h4>
                <p className="text-teal-600">Neuroscience, Psychology, Physics</p>
              </div>
            </div>
          </div>
        </div>

        {/* CTA Button */}
        <div className="text-center">
          <button className="px-8 py-4 bg-gradient-to-r from-teal-600 to-cyan-600 text-white rounded-full font-semibold text-lg shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
            🔍 Explore Yogic Research
          </button>
        </div>

        {/* Quote */}
        <div className="text-center mt-12">
          <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-8 max-w-3xl mx-auto">
            <p className="text-teal-800 italic text-lg">
              "When ancient wisdom meets modern understanding, we discover that the Rishis were the first scientists of consciousness."
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default YogicResearch;