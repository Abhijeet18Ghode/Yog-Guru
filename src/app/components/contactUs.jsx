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
    <div id="contact" className="contact-form-container">
      <h2 className="contact-title">Contact Us</h2>
      
      <form onSubmit={handleSubmit} className="contact-form">
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

        <div className="form-group">
          <label htmlFor="message" className="form-label">
            Message *
          </label>
          <textarea
            id="message"
            name="message"
            required
            rows={5}
            value={formData.message}
            onChange={handleChange}
            className="form-textarea"
            placeholder="Tell us how we can help you..."
          />
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className="submit-button"
        >
          {isSubmitting ? 'Sending...' : 'Send Message'}
        </button>

        {submitMessage && (
          <div className={`mt-4 p-3 rounded-md text-sm ${
            submitMessage === MESSAGES.contactSuccess 
              ? 'bg-green-100 text-green-700 border border-green-300' 
              : 'bg-red-100 text-red-700 border border-red-300'
          }`}>
            {submitMessage}
          </div>
        )}
      </form>

      <div className="contact-info">
        <h3 className="info-title">Other Ways to Reach Us</h3>
        <div className="info-details">
          <p className="info-item">
            <strong>Email:</strong> {contactInfo.email}
          </p>
          <p className="info-item">
            <strong>Phone:</strong> {contactInfo.phone}
          </p>
          <p className="info-item">
            <strong>Address:</strong> {contactInfo.address}
          </p>
          <p className="info-item">
            <strong>Hours:</strong> {contactInfo.hours}
          </p>
        </div>
      </div>

      <style jsx>{`
        .contact-form-container {
          background: linear-gradient(to-br, #fef3c7, #fed7aa);
          padding: 3rem;
          border-radius: 24px;
          box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
          border: 2px solid rgba(245, 158, 11, 0.2);
          margin: 4rem auto;
          max-width: 4xl;
        }
        
        .contact-title {
          font-size: 2.5rem;
          color: #92400e;
          margin-bottom: 2rem;
          text-align: center;
          font-weight: bold;
        }
        
        .contact-form {
          display: flex;
          flex-direction: column;
          gap: 1.5rem;
        }
        
        .form-group {
          display: flex;
          flex-direction: column;
        }
        
        .form-label {
          font-weight: 500;
          margin-bottom: 0.5rem;
          color: #374151;
        }
        
        .form-input, .form-textarea {
          padding: 0.75rem;
          border: 1px solid #d1d5db;
          border-radius: 6px;
          font-size: 1rem;
          transition: border-color 0.2s;
        }
        
        .form-input:focus, .form-textarea:focus {
          outline: none;
          border-color: #3b82f6;
          box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
        }
        
        .submit-button {
          background: linear-gradient(to-r, #d97706, #ea580c);
          color: white;
          padding: 1rem 2rem;
          border: none;
          border-radius: 50px;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.3s;
          box-shadow: 0 4px 15px rgba(217, 119, 6, 0.3);
        }
        
        .submit-button:hover:not(:disabled) {
          background: linear-gradient(to-r, #b45309, #c2410c);
          transform: translateY(-2px);
          box-shadow: 0 6px 20px rgba(217, 119, 6, 0.4);
        }
        
        .submit-button:disabled {
          background-color: #9ca3af;
          cursor: not-allowed;
        }
        
        .contact-info {
          margin-top: 2rem;
          padding-top: 1.5rem;
          border-top: 1px solid #e5e7eb;
        }
        
        .info-title {
          font-size: 1.2rem;
          color: #374151;
          margin-bottom: 1rem;
        }
        
        .info-details {
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
        }
        
        .info-item {
          color: #6b7280;
        }
        
        @media (max-width: 768px) {
          .contact-form-container {
            padding: 1.5rem;
          }
        }
      `}</style>
    </div>
  );
}