"use client";

import { useState, useEffect } from 'react';
import { MESSAGES, CONTACT_INFO } from '../config/constants';

export default function ContactUs() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [contactInfo, setContactInfo] = useState(CONTACT_INFO);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState('');

  useEffect(() => {
    const fetchContactInfo = async () => {
      try {
        const res = await fetch('/api/content?type=contact');
        const data = await res.json();
        if (data.success && data.data.length > 0) {
          setContactInfo(data.data[0].content);
        }
      } catch (error) {
        console.error('Error fetching contact info:', error);
      }
    };
    fetchContactInfo();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitMessage('');
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      setSubmitMessage(MESSAGES.contactSuccess);
      setFormData({ name: '', email: '', message: '' });
    } catch (error) {
      setSubmitMessage(MESSAGES.contactError);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div id="contact" className="contact-container">
      <div className="contact-content">
        {/* Left Section - Form (70%) */}
        <div className="form-section">
          <div className="form-header">
            <h2 className="form-title">Get in Touch</h2>
            <p className="form-subtitle">Begin your journey to inner peace and wellness</p>
          </div>
          
          <form onSubmit={handleSubmit} className="contact-form">
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="name" className="form-label">
                  Full Name *
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  required
                  value={formData.name}
                  onChange={handleChange}
                  className="form-input"
                  placeholder="Enter your full name"
                />
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label htmlFor="email" className="form-label">
                  Email Address *
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  className="form-input"
                  placeholder="Enter your email address"
                />
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="message" className="form-label">
                Your Message *
              </label>
              <textarea
                id="message"
                name="message"
                required
                rows={6}
                value={formData.message}
                onChange={handleChange}
                className="form-textarea"
                placeholder="Share your thoughts, questions, or how we can help you on your yoga journey..."
              />
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="submit-button"
            >
              <span className="button-text">
                {isSubmitting ? 'Sending Your Message...' : 'Send Message'}
              </span>
              <span className="button-icon">🕉️</span>
            </button>

            {submitMessage && (
              <div className={`submit-message ${
                submitMessage === MESSAGES.contactSuccess ? 'success' : 'error'
              }`}>
                {submitMessage}
              </div>
            )}
          </form>
        </div>

        {/* Right Section - Yoga Theme (30%) */}
        <div className="yoga-theme-section">
          <div className="yoga-content">
            <div className="lotus-container">
              <div className="lotus-flower">
                <div className="lotus-petal petal-1"></div>
                <div className="lotus-petal petal-2"></div>
                <div className="lotus-petal petal-3"></div>
                <div className="lotus-petal petal-4"></div>
                <div className="lotus-petal petal-5"></div>
                <div className="lotus-petal petal-6"></div>
                <div className="lotus-petal petal-7"></div>
                <div className="lotus-petal petal-8"></div>
                <div className="lotus-center"></div>
              </div>
            </div>
            
            <div className="yoga-quote">
              <h3 className="quote-text">
                "Yoga is the journey of the self, through the self, to the self."
              </h3>
              <p className="quote-author">- The Bhagavad Gita</p>
            </div>

            <div className="contact-info">
              <div className="info-item">
                <span className="info-icon">📧</span>
                <div>
                  <strong>Email</strong>
                  <p>{contactInfo.email}</p>
                </div>
              </div>
              
              <div className="info-item">
                <span className="info-icon">📞</span>
                <div>
                  <strong>Phone</strong>
                  <p>{contactInfo.phone}</p>
                </div>
              </div>
              
              <div className="info-item">
                <span className="info-icon">⏰</span>
                <div>
                  <strong>Hours</strong>
                  <p>{contactInfo.hours}</p>
                </div>
              </div>
            </div>

            <div className="yoga-decoration">
              <div className="mandala"></div>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        .contact-container {
          max-width: 1200px;
          margin: 4rem auto;
          padding: 0 2rem;
        }

        .contact-content {
          display: grid;
          grid-template-columns: 70% 30%;
          gap: 0;
          min-height: 600px;
          border-radius: 20px;
          overflow: hidden;
          box-shadow: 0 20px 40px rgba(139, 69, 19, 0.1);
          background: #fff;
        }

        /* Form Section Styles */
        .form-section {
          padding: 3rem;
          background: linear-gradient(135deg, #fef7ed 0%, #fffbeb 100%);
          display: flex;
          flex-direction: column;
        }

        .form-header {
          text-align: center;
          margin-bottom: 2.5rem;
        }

        .form-title {
          font-size: 2.5rem;
          color: #d97706;
          margin-bottom: 0.5rem;
          font-weight: 300;
          font-family: 'Georgia', serif;
        }

        .form-subtitle {
          color: #92400e;
          font-size: 1.1rem;
          opacity: 0.8;
        }

        .contact-form {
          flex: 1;
          display: flex;
          flex-direction: column;
        }

        .form-row {
          display: grid;
          grid-template-columns: 1fr;
          gap: 1.5rem;
        }

        .form-group {
          display: flex;
          flex-direction: column;
          margin-bottom: 1.5rem;
        }

        .form-label {
          font-weight: 500;
          margin-bottom: 0.5rem;
          color: #78350f;
          font-size: 0.95rem;
        }

        .form-input, .form-textarea {
          padding: 1rem 1.25rem;
          border: 2px solid #fbbf24;
          border-radius: 12px;
          font-size: 1rem;
          transition: all 0.3s ease;
          background: rgba(255, 255, 255, 0.8);
          color: #451a03;
        }

        .form-input:focus, .form-textarea:focus {
          outline: none;
          border-color: #d97706;
          box-shadow: 0 0 0 3px rgba(217, 119, 6, 0.1);
          background: #fff;
        }

        .form-input::placeholder, .form-textarea::placeholder {
          color: #a16207;
          opacity: 0.6;
        }

        .form-textarea {
          resize: vertical;
          min-height: 120px;
        }

        .submit-button {
          background: linear-gradient(135deg, #d97706 0%, #b45309 100%);
          color: white;
          padding: 1.25rem 2.5rem;
          border: none;
          border-radius: 50px;
          font-weight: 500;
          cursor: pointer;
          transition: all 0.3s ease;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 0.75rem;
          margin-top: auto;
          font-size: 1.1rem;
          box-shadow: 0 4px 15px rgba(217, 119, 6, 0.3);
        }

        .submit-button:hover:not(:disabled) {
          transform: translateY(-2px);
          box-shadow: 0 8px 25px rgba(217, 119, 6, 0.4);
          background: linear-gradient(135deg, #ea580c 0%, #c2410c 100%);
        }

        .submit-button:disabled {
          opacity: 0.7;
          cursor: not-allowed;
          transform: none;
        }

        .button-icon {
          font-size: 1.2rem;
        }

        .submit-message {
          margin-top: 1.5rem;
          padding: 1rem 1.5rem;
          border-radius: 12px;
          text-align: center;
          font-weight: 500;
        }

        .submit-message.success {
          background: #dcfce7;
          color: #166534;
          border: 1px solid #bbf7d0;
        }

        .submit-message.error {
          background: #fee2e2;
          color: #dc2626;
          border: 1px solid #fecaca;
        }

        /* Yoga Theme Section Styles */
        .yoga-theme-section {
          background: linear-gradient(135deg, #7c2d12 0%, #9a3412 100%);
          padding: 3rem 2rem;
          position: relative;
          overflow: hidden;
          display: flex;
          align-items: center;
        }

        .yoga-content {
          position: relative;
          z-index: 2;
          text-align: center;
          width: 100%;
        }

        /* Lotus Flower Animation */
        .lotus-container {
          margin: 0 auto 2rem;
          width: 120px;
          height: 120px;
        }

        .lotus-flower {
          position: relative;
          width: 100%;
          height: 100%;
          animation: float 6s ease-in-out infinite;
        }

        .lotus-petal {
          position: absolute;
          width: 40px;
          height: 60px;
          background: linear-gradient(135deg, #fef3c7 0%, #fde68a 100%);
          border-radius: 50% 50% 50% 50% / 60% 60% 40% 40%;
          opacity: 0.9;
        }

        .petal-1 { top: 0; left: 40px; transform: rotate(0deg); }
        .petal-2 { top: 15px; right: 15px; transform: rotate(45deg); }
        .petal-3 { top: 40px; right: 0; transform: rotate(90deg); }
        .petal-4 { bottom: 15px; right: 15px; transform: rotate(135deg); }
        .petal-5 { bottom: 0; left: 40px; transform: rotate(180deg); }
        .petal-6 { bottom: 15px; left: 15px; transform: rotate(225deg); }
        .petal-7 { top: 40px; left: 0; transform: rotate(270deg); }
        .petal-8 { top: 15px; left: 15px; transform: rotate(315deg); }

        .lotus-center {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          width: 30px;
          height: 30px;
          background: #f59e0b;
          border-radius: 50%;
          box-shadow: 0 0 10px rgba(245, 158, 11, 0.5);
        }

        /* Yoga Quote */
        .yoga-quote {
          margin-bottom: 2.5rem;
        }

        .quote-text {
          color: #fef3c7;
          font-size: 1.2rem;
          font-style: italic;
          line-height: 1.6;
          margin-bottom: 1rem;
          font-family: 'Georgia', serif;
        }

        .quote-author {
          color: #fde68a;
          font-size: 0.9rem;
          opacity: 0.8;
        }

        /* Contact Info */
        .contact-info {
          display: flex;
          flex-direction: column;
          gap: 1.5rem;
          margin-bottom: 2rem;
        }

        .info-item {
          display: flex;
          align-items: center;
          gap: 1rem;
          color: #fef3c7;
          text-align: left;
        }

        .info-icon {
          font-size: 1.5rem;
          flex-shrink: 0;
        }

        .info-item strong {
          display: block;
          color: #fde68a;
          margin-bottom: 0.25rem;
        }

        .info-item p {
          margin: 0;
          font-size: 0.9rem;
          opacity: 0.9;
        }

        /* Mandala Decoration */
        .mandala {
          width: 80px;
          height: 80px;
          margin: 0 auto;
          border: 2px solid #f59e0b;
          border-radius: 50%;
          position: relative;
          opacity: 0.3;
        }

        .mandala::before,
        .mandala::after {
          content: '';
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          border: 1px solid #f59e0b;
          border-radius: 50%;
        }

        .mandala::before {
          width: 60px;
          height: 60px;
        }

        .mandala::after {
          width: 40px;
          height: 40px;
        }

        /* Animations */
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-10px) rotate(5deg); }
        }

        /* Responsive Design */
        @media (max-width: 968px) {
          .contact-content {
            grid-template-columns: 1fr;
          }
          
          .yoga-theme-section {
            order: -1;
            padding: 2rem;
          }
          
          .form-section {
            padding: 2rem;
          }
        }

        @media (max-width: 768px) {
          .contact-container {
            margin: 2rem auto;
            padding: 0 1rem;
          }
          
          .form-title {
            font-size: 2rem;
          }
          
          .form-row {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </div>
  );
}