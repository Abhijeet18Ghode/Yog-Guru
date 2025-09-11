// Configuration constants for the Yog Guru application

export const CONTACT_INFO = {
  phone: '+91 9881012691',
  whatsapp: process.env.WHATSAPP_NUMBER || '9881012691',
  email: 'info@ancientyoga.com',
  address: '123 Serenity Lane, Peace Valley',
  hours: 'Daily: 6AM - 8PM'
};

export const SOCIAL_LINKS = {
  facebook: '#',
  instagram: '#',
  linkedin: '#'
};

export const NAVIGATION = {
  home: '/',
  blogs: '#blogs',
  bookSession: '#book-session',
  contact: '#contact'
};

export const MESSAGES = {
  whatsappBooking: 'Hello, I would like to book a yoga session. Please provide more information.',
  contactSuccess: 'Thank you for your message! We\'ll get back to you soon.',
  contactError: 'Sorry, there was an error sending your message. Please try again.'
};