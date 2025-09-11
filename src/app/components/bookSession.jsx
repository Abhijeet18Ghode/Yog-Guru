// pages/bookSession.jsx
"use client"
import Head from 'next/head';
import { useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';
import { CONTACT_INFO, MESSAGES } from '../config/constants';

const BookSession = () => {
  const router = useRouter();
  const [sessionTypes, setSessionTypes] = useState([]);

  useEffect(() => {
    const fetchSessions = async () => {
      try {
        const res = await fetch('/api/content?type=session');
        const data = await res.json();
        if (data.success) {
          setSessionTypes(data.data);
        }
      } catch (error) {
        console.error('Error fetching sessions:', error);
      }
    };
    fetchSessions();
  }, []);

  const handleWhatsAppRedirect = () => {
    const message = encodeURIComponent(MESSAGES.whatsappBooking);
    window.open(`https://wa.me/${CONTACT_INFO.whatsapp}?text=${message}`, '_blank');
  };

  const yogaBenefits = [
    { icon: '🧘', title: 'Inner Peace', description: 'Find tranquility and balance through guided meditation' },
    { icon: '💪', title: 'Strength', description: 'Build physical and mental resilience with ancient postures' },
    { icon: '🌿', title: 'Natural Healing', description: 'Tap into the body\'s innate healing capabilities' },
    { icon: '🕉️', title: 'Spiritual Growth', description: 'Connect with your higher self through traditional practices' }
  ];

  return (
    <div className="min-h-screen bg-amber-50">
      <Head>
        <title>Book Session | Ancient Yoga</title>
        <meta name="description" content="Book your ancient yoga session" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      {/* Header */}
      <header className="relative py-12 bg-gradient-to-b from-amber-100 to-amber-50 overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full opacity-10">
          <div className="absolute top-10 left-20 w-72 h-72 bg-amber-600 rounded-full mix-blend-multiply filter blur-xl animate-blob"></div>
          <div className="absolute top-10 right-20 w-72 h-72 bg-rose-300 rounded-full mix-blend-multiply filter blur-xl animate-blob animation-delay-2000"></div>
          <div className="absolute -bottom-8 left-40 w-72 h-72 bg-emerald-300 rounded-full mix-blend-multiply filter blur-xl animate-blob animation-delay-4000"></div>
        </div>
        
        <div className="container mx-auto px-4 relative z-10">
          <h1 className="text-5xl md:text-6xl font-serif font-bold text-center text-amber-900 mb-4">
            Book Your Session
          </h1>
          <p className="text-xl text-amber-800 text-center max-w-2xl mx-auto">
            Begin your journey to inner peace and wellness with our ancient yoga practices
          </p>
          
          <div className="flex justify-center mt-8">
            <div className="w-24 h-1 bg-amber-700 rounded-full"></div>
          </div>
        </div>
      </header>

      <main id="book-session" className="container mx-auto px-4 py-16">
        <div className="flex flex-col lg:flex-row gap-12">
          {/* Benefits Section */}
          <div className="lg:w-1/2">
            <div className="bg-white rounded-2xl p-8 shadow-lg border border-amber-100">
              <h2 className="text-3xl font-serif font-semibold text-amber-900 mb-8 text-center">The Benefits of Ancient Yoga</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {yogaBenefits.map((benefit, index) => (
                  <div key={index} className="bg-amber-50 rounded-xl p-6 border border-amber-200 transition-all duration-300 hover:shadow-md">
                    <div className="text-4xl mb-4">{benefit.icon}</div>
                    <h3 className="text-xl font-semibold text-amber-800 mb-2">{benefit.title}</h3>
                    <p className="text-amber-700">{benefit.description}</p>
                  </div>
                ))}
              </div>
              
              <div className="mt-10 bg-amber-100 rounded-xl p-6 border border-amber-200">
                <h3 className="text-xl font-semibold text-amber-800 mb-4">Why Choose Our Sessions?</h3>
                <ul className="space-y-3 text-amber-700">
                  <li className="flex items-start">
                    <span className="text-amber-600 mr-2">✓</span>
                    <span>Authentic ancient techniques passed down through generations</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-amber-600 mr-2">✓</span>
                    <span>Personalized approach based on your needs and goals</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-amber-600 mr-2">✓</span>
                    <span>Small class sizes for individual attention</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-amber-600 mr-2">✓</span>
                    <span>Peaceful, natural environment for practice</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          
          {/* Booking Section */}
          <div className="lg:w-1/2">
            <div className="bg-white rounded-2xl p-8 shadow-lg border border-amber-100">
              <h2 className="text-3xl font-serif font-semibold text-amber-900 mb-8 text-center">Session Options</h2>
              
              <div className="space-y-6 mb-10">
                {sessionTypes.length === 0 ? (
                  <div className="text-center py-8">
                    <p className="text-amber-700">No sessions available. Add some from the admin panel!</p>
                  </div>
                ) : (
                  sessionTypes.map((session, index) => (
                    <div key={session._id || index} className="border border-amber-200 rounded-xl p-6 transition-all duration-300 hover:shadow-md">
                      <div className="flex justify-between items-start mb-3">
                        <h3 className="text-xl font-semibold text-amber-800">{session.title}</h3>
                        <span className="bg-amber-100 text-amber-800 py-1 px-3 rounded-full text-sm">{session.content?.duration}</span>
                      </div>
                      <p className="text-amber-700 mb-4">{session.content?.description}</p>
                      <div className="flex justify-between items-center">
                        <span className="text-2xl font-semibold text-amber-900">{session.content?.price}</span>
                        <span className="text-sm text-amber-600">Per session</span>
                      </div>
                    </div>
                  ))
                )}
              </div>
              
              <div className="bg-amber-100 rounded-xl p-6 border border-amber-200 mb-8">
                <h3 className="text-xl font-semibold text-amber-800 mb-4">Package Deals</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-white p-4 rounded-lg text-center">
                    <p className="font-semibold text-amber-800">5 Sessions</p>
                    <p className="text-amber-600">Save 10%</p>
                  </div>
                  <div className="bg-white p-4 rounded-lg text-center">
                    <p className="font-semibold text-amber-800">10 Sessions</p>
                    <p className="text-amber-600">Save 15%</p>
                  </div>
                </div>
              </div>
              
              <div className="text-center">
                <h3 className="text-xl font-semibold text-amber-800 mb-6">Ready to Begin Your Journey?</h3>
                <p className="text-amber-700 mb-6">Contact us via WhatsApp to book your session or ask any questions</p>
                
                <button 
                  onClick={handleWhatsAppRedirect}
                  className="bg-green-600 hover:bg-green-700 text-white font-semibold py-4 px-8 rounded-full inline-flex items-center justify-center transition-all duration-300 shadow-md hover:shadow-lg"
                >
                  <svg className="w-6 h-6 mr-3" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.297-.497.1-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.465 3.49"/>
                  </svg>
                  Book via WhatsApp
                </button>
                
                <p className="text-sm text-amber-600 mt-4">We typically respond within 2 hours</p>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* <footer className="bg-amber-900 text-amber-100 py-12 mt-16">
        <div className="container mx-auto px-4 text-center">
          <div className="flex justify-center mb-6">
            <div className="w-16 h-16 rounded-full bg-amber-700 flex items-center justify-center">
              <svg 
                className="w-8 h-8 text-amber-100" 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24" 
                xmlns="http://www.w3.org/2000/svg"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 11c0 3.517-1.009 6.799-2.753 9.571m-3.44-2.04l.054-.09A13.916 13.916 0 008 11a4 4 0 118 0c0 1.017-.07 2.019-.203 3m-2.118 6.844A21.88 21.88 0 0015.171 17m3.839 1.132c.645-2.266.99-4.659.99-7.132A8 8 0 008 4.07M3 15.364c.64-1.319 1-2.8 1-4.364 0-1.457.39-2.823 1.07-4"></path>
              </svg>
            </div>
          </div>
          
          <p className="text-lg font-serif mb-4">Ancient Yoga Studio</p>
          <p className="text-amber-200 max-w-lg mx-auto">
            Connect with ancient wisdom for modern wellbeing through our authentic yoga practices.
          </p>
          
          <div className="mt-8 pt-8 border-t border-amber-700">
            <p className="text-sm text-amber-300">
              © {new Date().getFullYear()} Ancient Yoga. All rights reserved.
            </p>
          </div>
        </div>
      </footer> */}

      <style jsx global>{`
        @keyframes blob {
          0% { transform: translate(0px, 0px) scale(1); }
          33% { transform: translate(30px, -50px) scale(1.1); }
          66% { transform: translate(-20px, 20px) scale(0.9); }
          100% { transform: translate(0px, 0px) scale(1); }
        }
        .animate-blob {
          animation: blob 7s infinite;
        }
        .animation-delay-2000 {
          animation-delay: 2s;
        }
        .animation-delay-4000 {
          animation-delay: 4s;
        }
      `}</style>
    </div>
  );
};

export default BookSession;