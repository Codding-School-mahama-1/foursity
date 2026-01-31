import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { initializeApp } from 'firebase/app';
import { getDatabase, ref, push, set } from 'firebase/database';

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDt4vs7S3nckO8xxfp1_axHZ76J0cz2qdg",
  authDomain: "mahamahospital.firebaseapp.com",
  databaseURL: "https://mahamahospital-default-rtdb.firebaseio.com",
  projectId: "mahamahospital",
  storageBucket: "mahamahospital.firebasestorage.app",
  messagingSenderId: "256305692002",
  appId: "1:256305692002:web:cfef26992264204be9803b"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

const Emergency = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [mobileServicesOpen, setMobileServicesOpen] = useState(false);
  const [formData, setFormData] = useState({
    firstName: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  });
  const [notification, setNotification] = useState(null);

  const emergencyTypes = [
    {
      title: "Fire Emergencies",
      description: "Includes house or forest fires, requiring quick evacuation and use of fire extinguishers.",
      image: "./img/fire.webp"
    },
    {
      title: "Medical Emergencies",
      description: "Such as serious injuries, heart attacks, or fainting, requiring immediate ambulance response.",
      image: "./img/medicalE.webp"
    },
    {
      title: "Natural Disasters",
      description: "Like floods, earthquakes, and storms, requiring preparation with pre-planned emergency procedures.",
      image: "./img/natural.webp"
    },
    {
      title: "Traffic Accidents",
      description: "Require immediate reporting to police and ambulance, and ensuring the safety of the injured.",
      image: "./img/traffic.webp"
    }
  ];

  const preventionMethods = [
    "Install fire alarm devices in homes.",
    "Learn basic first aid skills.",
    "Keep emergency numbers in a visible place.",
    "Participate in evacuation and emergency drills.",
    "Prepare an emergency kit with essential supplies.",
    "Create a family emergency communication plan."
  ];

  const emergencyNumbers = [
    { name: "Fire Department", number: "111", icon: "🚒" },
    { name: "Ambulance", number: "912", icon: "🚑" },
    { name: "Police", number: "112", icon: "🚓" },
    { name: "General Emergency", number: "112", icon: "⚡" }
  ];

  const showNotification = (message, type = 'info') => {
    setNotification({ message, type });
    setTimeout(() => setNotification(null), 5000);
  };

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    // Validate required fields
    if (!formData.firstName || !formData.email || !formData.message) {
      showNotification('Please fill in all required fields.', 'error');
      return;
    }

    try {
      const reportsRef = ref(database, 'emergencyReports');
      const newReportRef = push(reportsRef);
      await set(newReportRef, {
        ...formData,
        createdAt: new Date().toISOString(),
        status: 'new'
      });

      showNotification('Emergency report submitted successfully! Our team will respond shortly.', 'success');
      setFormData({
        firstName: '',
        email: '',
        phone: '',
        subject: '',
        message: ''
      });
    } catch (error) {
      console.error('Error submitting emergency report:', error);
      showNotification('Error submitting report. Please try again.', 'error');
    }
  };

  return (
    <div className="font-serif text-gray-800 select-none">
      {/* Header */}
      <header className="bg-white shadow-md sticky top-0 z-50">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center py-4">
            {/* Logo */}
            <div className="flex items-center">
              <Link to="/" className="text-2xl font-bold text-blue-600">🏥 MCH</Link>
            </div>

            {/* Mobile menu button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden text-gray-600 focus:outline-none"
            >
              <i className={`fas ${mobileMenuOpen ? 'fa-times' : 'fa-bars'} text-xl`}></i>
            </button>

            {/* Navigation Links */}
            <nav className="hidden md:flex items-center space-x-6">
              <Link to="/" className="text-gray-700 hover:text-blue-600 transition duration-300">Home</Link>
              <Link to="/#about" className="text-gray-700 hover:text-blue-600 transition duration-300">About</Link>

              {/* Services Dropdown */}
              <div className="relative group">
                <button className="flex items-center text-gray-700 hover:text-blue-600 transition duration-300">
                  <span>Services</span> <i className="fas fa-chevron-down ml-1 text-xs"></i>
                </button>
                <div className="absolute left-0 mt-2 w-64 bg-white shadow-xl rounded-lg py-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 z-50">
                  <Link to="/services/maternity" className="block px-4 py-2 text-gray-700 hover:bg-blue-50 hover:text-blue-600">Maternity & Birth Services</Link>
                  <Link to="/emergency" className="block px-4 py-2 text-gray-700 hover:bg-blue-50 hover:text-blue-600">Emergency Care</Link>
                  <Link to="/services/vaccination" className="block px-4 py-2 text-gray-700 hover:bg-blue-50 hover:text-blue-600">Vaccination Programs</Link>
                  <Link to="/services/mentalhealth" className="block px-4 py-2 text-gray-700 hover:bg-blue-50 hover:text-blue-600">Mental Health Support</Link>
                  <Link to="/services/ncd" className="block px-4 py-2 text-gray-700 hover:bg-blue-50 hover:text-blue-600">Chronic Disease Care</Link>
                  <Link to="/services/health-education" className="block px-4 py-2 text-gray-700 hover:bg-blue-50 hover:text-blue-600">Health Awareness & Education</Link>
                  <Link to="/services/disability" className="block px-4 py-2 text-gray-700 hover:bg-blue-50 hover:text-blue-600">Disability Care</Link>
                </div>
              </div>

              <Link to="/doctors" className="text-gray-700 hover:text-blue-600 transition duration-300">Doctors</Link>
              <a href="#contact" className="text-gray-700 hover:text-blue-600 transition duration-300">Report an Emergency</a>
            </nav>

            {/* Actions */}
            <div className="hidden md:flex items-center space-x-4">
              <select className="border border-gray-300 rounded px-3 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500">
                <option value="en">English</option>
                <option value="rw">Kinyarwanda</option>
              </select>
            </div>
          </div>

          {/* Mobile Menu */}
          {mobileMenuOpen && (
            <div className="md:hidden py-4 border-t border-gray-200">
              <div className="flex flex-col space-y-4">
                <div className="flex space-x-2">
                  <button className="flex-1 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition duration-300">Sign Up</button>
                  <button className="flex-1 border border-blue-600 text-blue-600 px-4 py-2 rounded hover:bg-blue-600 hover:text-white transition duration-300">Log In</button>
                </div>
                <Link to="/" className="text-gray-700 hover:text-blue-600">Home</Link>
                <Link to="/#about" className="text-gray-700 hover:text-blue-600">About</Link>

                {/* Mobile Services Dropdown */}
                <div className="relative">
                  <button
                    onClick={() => setMobileServicesOpen(!mobileServicesOpen)}
                    className="flex items-center text-gray-700 hover:text-blue-600 w-full justify-between"
                  >
                    <span>Services</span> <i className={`fas fa-chevron-${mobileServicesOpen ? 'up' : 'down'}`}></i>
                  </button>
                  {mobileServicesOpen && (
                    <div className="pl-4 mt-2 space-y-2">
                      <Link to="/services/maternity" className="block text-gray-700 hover:text-blue-600">Maternity & Birth Services</Link>
                      <Link to="/emergency" className="block text-gray-700 hover:text-blue-600">Emergency Care</Link>
                      <Link to="/services/vaccination" className="block text-gray-700 hover:text-blue-600">Vaccination Programs</Link>
                      <Link to="/services/mentalhealth" className="block text-gray-700 hover:text-blue-600">Mental Health Support</Link>
                      <Link to="/services/ncd" className="block text-gray-700 hover:text-blue-600">Chronic Disease Care</Link>
                      <Link to="/services/health-education" className="block text-gray-700 hover:text-blue-600">Health Awareness & Education</Link>
                      <Link to="/services/disability" className="block text-gray-700 hover:text-blue-600">Disability Care</Link>
                    </div>
                  )}
                </div>

                <Link to="/doctors" className="text-gray-700 hover:text-blue-600">Doctors</Link>
                <a href="#contact" className="text-gray-700 hover:text-blue-600">Report an Emergency</a>

                <div className="pt-4 border-t border-gray-200">
                  <select className="w-full border border-gray-300 rounded px-3 py-2 text-sm mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500">
                    <option value="en">English</option>
                    <option value="rw">Kinyarwanda</option>
                  </select>
                </div>
              </div>
            </div>
          )}
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative py-8 md:py-12 px-4" id="home">
        <video
          className="hero-video absolute top-0 left-0 w-full h-full object-cover z-0"
          autoPlay
          muted
          loop
          playsInline
        >
          <source src="/videos/emergency_1080p.mp4" type="video/mp4" />
          <span>Your browser does not support the video tag.</span>
        </video>

        <div className="max-w-7xl mx-auto text-center relative px-4">
          <h2 className="text-3xl md:text-5xl font-bold mb-4 md:mb-6 text-white">Emergency Response System</h2>
          <p className="text-lg md:text-xl text-gray-300 max-w-3xl mx-auto mb-6 md:mb-8">
            Learn about emergency types, prevention methods, and how to respond correctly to protect yourself and others.
          </p>
          <div className="hero-buttons flex flex-col sm:flex-row justify-center gap-4 mb-6 md:mb-8">
            <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-semibold transition duration-300 transform hover:-translate-y-1">
              <a href="#Emergency">Emergency Types</a>
            </button>
            <a href="#Prevention" className="border border-white hover:bg-white hover:text-blue-600 text-white px-6 py-3 rounded-lg font-semibold transition duration-300 transform hover:-translate-y-1">Prevention Methods</a>
          </div>
          <div className="bg-red-600/80 inline-block px-4 py-2 rounded-lg hover:bg-danger-600 text-white font-bold py-3 md:py-4 px-6 md:px-8 rounded-xl shadow-lg transition-all duration-300 transform hover:scale-105 animate-emergency-pulse">
            🚨 Emergency Call: 112
          </div>
          <div className="flex items-center mb-4">
            <h2 className="text-xl md:text-2xl font-bold text-white p-6 m-3">Emergency Definition</h2>
          </div>

          <p className="text-gray-100 text-base md:text-lg">
            An emergency is a sudden situation that threatens human life, property, or the environment, requiring a quick and immediate response such as fires, accidents, natural disasters, or critical health conditions.
          </p>
        </div>
      </section>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 py-8 md:py-11">
        {/* Emergency Types */}
        <section id="Emergency" className="py-12 md:py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <h2 className="text-2xl md:text-4xl font-bold text-center text-blue-600 mb-8 md:mb-12">Emergency Types</h2>

            <div className="emergency-cards grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
              {emergencyTypes.map((emergency, index) => (
                <div key={index} className="Emergency-card bg-white rounded-xl shadow-lg p-4 md:p-6 transition-all duration-300 hover:-translate-y-2 hover:shadow-xl">
                  <img src={emergency.image} alt={emergency.title} className="w-full h-40 md:h-48 object-cover rounded-lg mb-4" />
                  <h3 className="text-lg md:text-xl font-bold text-gray-800 mb-2">{emergency.title}</h3>
                  <p className="text-sm md:text-base text-gray-600 mb-4">{emergency.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Prevention Methods */}
        <section id="Prevention" className="bg-white/10 backdrop-blur-sm rounded-2xl py-8 md:py-11 px-4 md:px-6 mb-8 border border-white/10 shadow-xl">
          <div className="flex items-center mb-4">
            <h2 className="text-xl md:text-2xl font-bold">Prevention Methods</h2>
          </div>
          <div className="prevention-grid grid grid-cols-1 md:grid-cols-2 gap-4">
            {preventionMethods.map((method, index) => (
              <div key={index} className="flex items-start">
                <div className="p-2 rounded-lg mr-3 mt-1">
                  <span className="text-green-800">✓</span>
                </div>
                <p className="text-gray-600">{method}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Emergency Numbers */}
        <section className="mb-8 md:mb-12">
          <div className="flex items-center mb-4 md:mb-6">
            <h2 className="text-xl md:text-2xl font-bold">Important Emergency Numbers</h2>
          </div>
          <div className="emergency-numbers grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
            {emergencyNumbers.map((emergency, index) => (
              <div key={index} className="bg-gradient-to-br from-yellow-500/20 to-yellow-600/10 backdrop-blur-sm rounded-xl p-4 md:p-6 border border-yellow-500/30 shadow-lg">
                <div className="flex items-center mb-3">
                  <div className="bg-red-500 p-2 rounded-lg mr-3">
                    <span className="text-white">{emergency.icon}</span>
                  </div>
                  <h3 className="text-base md:text-lg font-semibold">{emergency.name}</h3>
                </div>
                <p className="text-xl md:text-2xl font-bold">{emergency.number}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Contact Section */}
        <section id="contact" className="py-12 md:py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="text-center mb-8 md:mb-12">
              <h2 className="text-2xl md:text-4xl font-bold text-blue-600 mb-4">Report an Emergency</h2>
              <p className="text-gray-600 max-w-2xl mx-auto">Contact Us to Report an Emergency</p>
            </div>

            <div className="contact-grid grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12">
              {/* Contact Form */}
              <div className="bg-gray-200 rounded-xl shadow-lg p-6 md:p-8">
                <h3 className="text-xl md:text-2xl font-bold text-gray-800 mb-4 md:mb-6">Report an Emergency</h3>
                <form onSubmit={handleFormSubmit} className="space-y-4 md:space-y-6">
                  <div className="contact-form-grid grid grid-cols-1 gap-6">
                    <div>
                      <label htmlFor="first-name" className="block text-gray-700 mb-2">Full Name</label>
                      <input
                        type="text"
                        id="first-name"
                        name="firstName"
                        value={formData.firstName}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="email" className="block text-gray-700 mb-2">Email Address</label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      required
                    />
                  </div>

                  <div>
                    <label htmlFor="phone" className="block text-gray-700 mb-2">Phone Number</label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>

                  <div>
                    <label htmlFor="subject" className="block text-gray-700 mb-2">Emergency Types</label>
                    <select
                      id="subject"
                      name="subject"
                      value={formData.subject}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="">Select Emergency Types</option>
                      <option value="fire">Fire Emergencies</option>
                      <option value="medical">Medical Emergencies</option>
                      <option value="natural">Natural Disasters</option>
                      <option value="traffic">Traffic Accidents</option>
                      <option value="other">Other</option>
                    </select>
                  </div>

                  <div>
                    <label htmlFor="message" className="block text-gray-700 mb-2">Briefly describe the situation...</label>
                    <textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleInputChange}
                      rows="5"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      required
                    ></textarea>
                  </div>

                  <button
                    type="submit"
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg transition duration-300 transform hover:-translate-y-1"
                  >
                    Send Emergency Report
                  </button>
                </form>
              </div>

              {/* Contact Information & Map */}
              <div className="space-y-6 md:space-y-8">
                {/* Contact Info Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                  <div className="bg-white rounded-xl shadow-lg p-4 md:p-6 flex items-start">
                    <div className="bg-blue-100 p-3 rounded-lg mr-4">
                      <i className="fas fa-map-marker-alt text-blue-600 text-xl"></i>
                    </div>
                    <div>
                      <h4 className="font-bold text-gray-800 mb-1">Our Location</h4>
                      <p className="text-gray-600">Mahama Refugee Camp, Kirehe District, Rwanda</p>
                    </div>
                  </div>

                  <div className="bg-white rounded-xl shadow-lg p-4 md:p-6 flex items-start">
                    <div className="bg-blue-100 p-3 rounded-lg mr-4">
                      <i className="fas fa-phone text-blue-600 text-xl"></i>
                    </div>
                    <div>
                      <h4 className="font-bold text-gray-800 mb-1">Phone Number</h4>
                      <p className="text-gray-600">+250 000 000</p>
                    </div>
                  </div>

                  <div className="bg-white rounded-xl shadow-lg p-4 md:p-6 flex items-start">
                    <div className="bg-blue-100 p-3 rounded-lg mr-4">
                      <i className="fas fa-envelope text-blue-600 text-xl"></i>
                    </div>
                    <div>
                      <h4 className="font-bold text-gray-800 mb-1">Email Address</h4>
                      <p className="text-gray-600">info@hopecare.com</p>
                    </div>
                  </div>

                  <div className="bg-white rounded-xl shadow-lg p-4 md:p-6 flex items-start">
                    <div className="bg-blue-100 p-3 rounded-lg mr-4">
                      <i className="fas fa-clock text-blue-600 text-xl"></i>
                    </div>
                    <div>
                      <h4 className="font-bold text-gray-800 mb-1">Working Hours</h4>
                      <p className="text-gray-600">24/7 Emergency Services</p>
                      <p className="text-gray-600">Mon-Fri: 8am-6pm</p>
                    </div>
                  </div>
                </div>

                {/* Google Map */}
                <div className="bg-white rounded-xl shadow-lg overflow-hidden">
                  <div className="h-64 md:h-96">
                    <iframe
                      src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1334.760614585555!2d30.642434783637935!3d-2.2630583877293016!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x19c4c500078c5f45%3A0xc3605c2533855d6b!2sMahama%20refugee%20camp!5e0!3m2!1sen!2sus!4v1762760708457!5m2!1sen!2sus"
                      width="100%"
                      height="100%"
                      style={{ border: 0 }}
                      allowFullScreen=""
                      loading="lazy"
                      referrerPolicy="no-referrer-when-downgrade"
                      title="Mahamacare Hospital Location at Mahama Refugee Camp"
                    ></iframe>
                  </div>
                </div>

                {/* Emergency Notice */}
                <div className="bg-red-50 border border-red-200 rounded-xl p-4 md:p-6">
                  <div className="flex items-start">
                    <i className="fas fa-exclamation-triangle text-red-500 text-xl mt-1 mr-4"></i>
                    <div>
                      <h4 className="font-bold text-red-700 mb-2">Emergency Contact</h4>
                      <p className="text-red-600 mb-2">For urgent medical assistance, please call our emergency line immediately.</p>
                      <a
                        href="tel:+250000000"
                        className="inline-block bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-lg transition duration-300"
                      >
                        Call Emergency: +250 000 000
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Notification */}
      {notification && (
        <div className={`fixed top-4 right-4 p-4 rounded-lg shadow-lg z-50 ${
          notification.type === 'success' ? 'bg-green-500 text-white' :
          notification.type === 'error' ? 'bg-red-500 text-white' :
          'bg-blue-500 text-white'
        }`}>
          {notification.message}
        </div>
      )}

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-8 md:py-12">
        <div className="container mx-auto px-4">
          <div className="footer-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
            {/* Column 1 */}
            <div>
              <h3 className="text-lg md:text-xl font-bold mb-3 md:mb-4">MahamaCare Hospital</h3>
              <p className="text-sm md:text-base text-gray-400">Providing high quality healthcare for over 20 years.</p>
            </div>

            {/* Column 2 */}
            <div>
              <h4 className="text-base md:text-lg font-semibold mb-3 md:mb-4">Quick Links</h4>
              <ul className="space-y-2">
                <li><Link to="/" className="text-sm md:text-base text-gray-400 hover:text-white transition duration-300">Home</Link></li>
                <li><Link to="/#about" className="text-sm md:text-base text-gray-400 hover:text-white transition duration-300">About</Link></li>
                <li><Link to="/#services" className="text-sm md:text-base text-gray-400 hover:text-white transition duration-300">Services</Link></li>
                <li><Link to="/doctors" className="text-sm md:text-base text-gray-400 hover:text-white transition duration-300">Doctors</Link></li>
                <li><Link to="/#faq" className="text-sm md:text-base text-gray-400 hover:text-white transition duration-300">FAQ</Link></li>
                <li><Link to="/#contact" className="text-sm md:text-base text-gray-400 hover:text-white transition duration-300">Contact</Link></li>
              </ul>
            </div>

            {/* Column 3 */}
            <div>
              <h4 className="text-base md:text-lg font-semibold mb-3 md:mb-4">Contact Info</h4>
              <div className="space-y-2 text-sm md:text-base text-gray-400">
                <p><i className="fas fa-envelope mr-2"></i> info@hopecare.com</p>
                <p><i className="fas fa-phone mr-2"></i> +250 000 000</p>
                <p><i className="fas fa-map-marker-alt mr-2"></i> Mahama Refugee Camp, Rwanda</p>
              </div>
            </div>

            {/* Column 4 */}
            <div>
              <h4 className="text-lg font-semibold mb-4">Follow Us</h4>
              <div className="flex space-x-4">
                <a href="https://www.facebook.com/profile.php?id=61583964942775&mibextid=rS40aB7S9Ucbxw6v" target="_self" className="text-gray-400 hover:text-white transition duration-300">
                  <i className="fab fa-facebook-f text-xl"></i>
                </a>
                <a href="https://x.com/CodersUnit2026?t=ym3SPxmqVxW3QcuboUGcDg&s=03" target="_self" className="text-gray-400 hover:text-white transition duration-300">
                  <i className="fab fa-twitter text-xl"></i>
                </a>
                <a href="https://www.instagram.com/unitycoders?utm_source=qr&igsh=aDFjdGUxNWxwNHR3" target="_self" className="text-gray-400 hover:text-white transition duration-300">
                  <i className="fab fa-instagram text-xl"></i>
                </a>
                <a href="https://www.linkedin.com/in/unity-coders-56aa0739a?utm_source=share_via&utm_medium=member_android" target="_self" className="text-gray-400 hover:text-white transition duration-300">
                  <i className="fab fa-linkedin-in text-xl"></i>
                </a>
              </div>
            </div>
          </div>

          <div className="border-t border-gray-800 mt-6 md:mt-8 pt-6 md:pt-8 text-center text-sm md:text-base text-gray-500">
            <p>&copy; 2025 MahamaCare Hospital. All rights reserved.</p>
          </div>
        </div>
      </footer>

      <style jsx>{`
        @media (max-width: 768px) {
          .hero-video {
            height: 60vh;
          }

          .emergency-cards {
            grid-template-columns: 1fr;
          }

          .contact-grid {
            grid-template-columns: 1fr;
          }

          .footer-grid {
            grid-template-columns: 1fr;
          }
        }

        @media (max-width: 640px) {
          .hero-buttons {
            flex-direction: column;
            gap: 1rem;
          }

          .hero-buttons button,
          .hero-buttons a {
            width: 100%;
            text-align: center;
          }

          .prevention-grid {
            grid-template-columns: 1fr;
          }

          .emergency-numbers {
            grid-template-columns: 1fr;
          }

          .contact-form-grid {
            grid-template-columns: 1fr;
          }
        }

        .animate-emergency-pulse {
          animation: emergency-pulse 2s infinite;
        }

        @keyframes emergency-pulse {
          0% {
            box-shadow: 0 0 0 0 rgba(239, 68, 68, 0.7);
          }
          70% {
            box-shadow: 0 0 0 10px rgba(239, 68, 68, 0);
          }
          100% {
            box-shadow: 0 0 0 0 rgba(239, 68, 68, 0);
          }
        }
      `}</style>
    </div>
  );
};

export default Emergency;