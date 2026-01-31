import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const Doctors = () => {
  const [currentPage, setCurrentPage] = useState('home');
  const [selectedDoctorId, setSelectedDoctorId] = useState(null);
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedTime, setSelectedTime] = useState(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [mobileServicesOpen, setMobileServicesOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    age: '',
    reason: ''
  });

  const doctors = {
    1: {
      name: "Dr. Ahmed Mohamed",
      specialty: "Pediatrics Specialist",
      qualification: "PhD in Pediatrics - Harvard University",
      experience: "15 years",
      department: "Pediatrics",
      hospital: "King Faisal Specialist Hospital",
      phone: "0112345678",
      about: "Dr. Ahmed Mohamed is a certified Pediatrics Specialist with over 15 years of experience in diagnosing and treating diseases affecting children from birth to adolescence. He specializes in pediatric respiratory diseases and allergies. Fluent in Arabic and English.",
      image: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80"
    },
    2: {
      name: "Dr. Sara Abdullah",
      specialty: "Cardiology Specialist",
      qualification: "MD in Cardiology - Johns Hopkins University",
      experience: "12 years",
      department: "Cardiology",
      hospital: "King Abdulaziz Hospital",
      phone: "0112345679",
      about: "Dr. Sara Abdullah is a renowned cardiologist with 12 years of experience in treating heart conditions. She specializes in interventional cardiology and has performed over 500 successful cardiac procedures.",
      image: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80"
    },
    3: {
      name: "Dr. Khaled Saeed",
      specialty: "Dentistry Specialist",
      qualification: "DDS - University of Pennsylvania",
      experience: "10 years",
      department: "Dentistry",
      hospital: "Armed Forces Hospital",
      phone: "0112345680",
      about: "Dr. Khaled Saeed is a skilled dentist with expertise in cosmetic dentistry and dental implants. He has helped hundreds of patients achieve perfect smiles through advanced dental procedures.",
      image: "https://images.unsplash.com/photo-1622253692010-333f2da6031d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1064&q=80"
    },
    4: {
      name: "Dr. Fatima Ali",
      specialty: "Ophthalmology Specialist",
      qualification: "MD in Ophthalmology - Stanford University",
      experience: "14 years",
      department: "Ophthalmology",
      hospital: "King Khalid Hospital",
      phone: "0112345681",
      about: "Dr. Fatima Ali is an experienced ophthalmologist specializing in cataract surgery and retinal diseases. She has performed over 1000 successful eye surgeries and is known for her gentle approach with patients.",
      image: "./img/dr.f.png"
    }
  };

  const specialties = [
    { name: "Pediatrics", image: "../img/children.webp" },
    { name: "Cardiology", image: "img/c.webp" },
    { name: "Dentistry", image: "./img/dentisty.webp" },
    { name: "Ophthalmology", image: "./img/ds3.webp" },
    { name: "Neurology", image: "./img/maind.webp" },
    { name: "Orthopedics", image: "./img/bond.webp" },
    { name: "Gynecology", image: "./img/gyncology.webp" },
    { name: "Internal Medicine", image: "./img/igt.webp" }
  ];

  const formatDate = (date) => {
    return date.toLocaleString('default', { month: 'long', day: 'numeric', year: 'numeric' });
  };

  const generateTimeSlots = () => {
    const slots = [];
    for (let hour = 9; hour <= 18; hour++) {
      for (let minute = 0; minute < 60; minute += 30) {
        if (hour === 18 && minute === 30) break;
        const timeString = `${hour % 12 === 0 ? 12 : hour % 12}:${minute === 0 ? '00' : minute} ${hour < 12 ? 'AM' : 'PM'}`;
        const isBooked = Math.random() < 0.2;
        slots.push({ time: timeString, booked: isBooked });
      }
    }
    return slots;
  };

  const renderCalendar = () => {
    const firstDay = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);
    const lastDay = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startDay = firstDay.getDay();

    const days = [];
    const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

    // Add day headers
    dayNames.forEach(day => {
      days.push(
        <div key={`header-${day}`} className="text-center font-medium py-2">
          {day}
        </div>
      );
    });

    // Add empty cells
    for (let i = 0; i < startDay; i++) {
      days.push(
        <div key={`empty-${i}`} className="text-center py-3 rounded"></div>
      );
    }

    // Add days
    for (let i = 1; i <= daysInMonth; i++) {
      const date = new Date(currentDate.getFullYear(), currentDate.getMonth(), i);
      const isToday = date.toDateString() === new Date().toDateString();
      const isSelected = date.toDateString() === selectedDate.toDateString();

      days.push(
        <div
          key={`day-${i}`}
          className={`calendar-date text-center py-3 rounded cursor-pointer transition-all duration-300 hover:scale-105 ${
            isToday ? 'bg-secondary text-white' : ''
          } ${isSelected ? 'selected-date' : ''}`}
          onClick={() => {
            setSelectedDate(date);
          }}
        >
          {i}
        </div>
      );
    }

    return days;
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    setCurrentPage('confirmation');
  };

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const resetForm = () => {
    setFormData({
      name: '',
      phone: '',
      email: '',
      age: '',
      reason: ''
    });
    setSelectedTime(null);
  };

  const timeSlots = generateTimeSlots();

  return (
    <div className="bg-gray-50 font-serif text-gray-800 select-none">
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
            </nav>

            {/* Actions */}
            <div className="hidden md:flex items-center space-x-4">
              <select className="language-selector border border-gray-300 rounded px-3 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500">
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

                <div className="pt-4 border-t border-gray-200">
                  <select className="language-selector w-full border border-gray-300 rounded px-3 py-2 text-sm mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500">
                    <option value="en">English</option>
                    <option value="rw">Kinyarwanda</option>
                  </select>
                </div>
              </div>
            </div>
          )}
        </div>
      </header>

      {/* Home Page */}
      {currentPage === 'home' && (
        <div className="page active animate-fadeIn">
          {/* Hero Section */}
          <div className="bg-[url(img/image.webp)] bg-no-repeat bg-cover text-black py-11 md:py-40">
            <div className="container mx-auto px-4 text-center">
              <h1 className="text-4xl md:text-5xl font-bold mb-8">Find the Best Doctors & Book Appointments Easily</h1>
              <p className="text-xl max-w-2xl mx-auto mb-8">Get access to thousands of certified doctors across various medical specialties</p>
              <div className="flex flex-col sm:flex-row justify-center gap-4 mb-8">
                <a href="#Medical-Specialties" className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-semibold transition duration-300 transform hover:-translate-y-1">Medical Specialties</a>
                <a href="#doctor" className="border border-white hover:bg-white hover:text-blue-600 text-white px-6 py-3 rounded-lg font-semibold transition duration-300 transform hover:-translate-y-1">Available Doctors</a>
              </div>
            </div>
          </div>

          <div className="container mx-auto px-4 py-12">
            {/* Medical Specialties */}
            <section className="mb-16" id="Medical-Specialties">
              <h2 className="text-3xl font-bold text-center mb-10">Medical Specialties</h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                {specialties.map((specialty, index) => (
                  <div key={index} className="bg-white rounded-lg shadow-md p-6 text-center transition-transform hover:-translate-y-1 cursor-pointer hover:shadow-lg">
                    <div className="text-4xl text-primary mb-3">
                      <img src={specialty.image} alt={specialty.name} />
                    </div>
                    <h3 className="text-lg font-semibold">{specialty.name}</h3>
                  </div>
                ))}
              </div>
            </section>

            {/* Doctors List */}
            <section>
              <h2 className="text-3xl font-bold text-center mb-10" id="doctor">Available Doctors</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                {Object.entries(doctors).map(([id, doctor]) => (
                  <div key={id} className="bg-white rounded-lg shadow-lg overflow-hidden transition-transform hover:-translate-y-1 hover:shadow-xl">
                    <div
                      className="h-48 doctor-image"
                      style={{ backgroundImage: `url('${doctor.image}')` }}
                    ></div>
                    <div className="p-6">
                      <h3 className="text-xl font-bold mb-2">{doctor.name}</h3>
                      <p className="text-primary font-medium mb-1">{doctor.specialty}</p>
                      <p className="text-gray-600 mb-4">{doctor.hospital}</p>
                      <div className="flex justify-between">
                        <button
                          onClick={() => {
                            setSelectedDoctorId(id);
                            setCurrentPage('details');
                          }}
                          className="view-details px-4 py-2 border border-primary text-primary rounded-md hover:bg-primary hover:text-white transition-colors"
                        >
                          View Details
                        </button>
                        <button
                          onClick={() => {
                            setSelectedDoctorId(id);
                            setCurrentPage('details');
                          }}
                          className="book-now px-4 py-2 bg-primary text-white rounded-md hover:bg-blue-700 transition-colors"
                        >
                          Book Now
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          </div>
        </div>
      )}

      {/* Doctor Details Page */}
      {currentPage === 'details' && selectedDoctorId && (
        <div className="page active animate-fadeIn">
          <div className="container mx-auto px-4 py-12">
            <div className="doctor-details">
              <div className="bg-white rounded-lg shadow-lg overflow-hidden mb-8">
                <div className="flex flex-col md:flex-row">
                  <div
                    className="md:w-1/3 h-80 doctor-image"
                    style={{ backgroundImage: `url('${doctors[selectedDoctorId].image}')` }}
                  ></div>
                  <div className="md:w-2/3 p-8">
                    <h1 className="text-3xl font-bold mb-2">{doctors[selectedDoctorId].name}</h1>
                    <p className="text-xl text-primary mb-4">{doctors[selectedDoctorId].specialty}</p>
                    <div className="mb-6">
                      <p className="mb-1"><strong>Qualification:</strong> {doctors[selectedDoctorId].qualification}</p>
                      <p className="mb-1"><strong>Years of Experience:</strong> {doctors[selectedDoctorId].experience}</p>
                      <p className="mb-1"><strong>Department:</strong> {doctors[selectedDoctorId].department}</p>
                      <p className="mb-1"><strong>Hospital:</strong> {doctors[selectedDoctorId].hospital}</p>
                      <p className="mb-1"><strong>Phone:</strong> {doctors[selectedDoctorId].phone}</p>
                    </div>
                    <div>
                      <h3 className="text-xl font-bold mb-2">About the Doctor</h3>
                      <p className="leading-relaxed">{doctors[selectedDoctorId].about}</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Appointment Schedule */}
              <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
                <h2 className="text-2xl font-bold text-center mb-6">Available Appointments</h2>

                {/* Calendar */}
                <div className="mb-8">
                  <div className="flex justify-between items-center mb-4">
                    <button
                      onClick={() => {
                        const newDate = new Date(currentDate);
                        newDate.setMonth(newDate.getMonth() - 1);
                        setCurrentDate(newDate);
                      }}
                      className="px-4 py-2 border border-primary text-primary rounded-md hover:bg-primary hover:text-white transition-colors"
                    >
                      Previous Month
                    </button>
                    <h3 className="text-xl font-bold">{currentDate.toLocaleString('default', { month: 'long', year: 'numeric' })}</h3>
                    <button
                      onClick={() => {
                        const newDate = new Date(currentDate);
                        newDate.setMonth(newDate.getMonth() + 1);
                        setCurrentDate(newDate);
                      }}
                      className="px-4 py-2 border border-primary text-primary rounded-md hover:bg-primary hover:text-white transition-colors"
                    >
                      Next Month
                    </button>
                  </div>
                  <div className="grid grid-cols-7 gap-1" id="calendar-dates">
                    {renderCalendar()}
                  </div>
                </div>

                {/* Available Times */}
                <h3 className="text-xl font-bold mb-4">Available Times for {formatDate(selectedDate)}</h3>
                <div className="grid grid-cols-3 md:grid-cols-5 lg:grid-cols-10 gap-3">
                  {timeSlots.map((slot, index) => (
                    <div
                      key={index}
                      className={`time-slot text-center py-2 rounded cursor-pointer transition-all duration-300 hover:scale-105 ${
                        slot.booked
                          ? 'booked-time'
                          : selectedTime === slot.time
                          ? 'selected-time'
                          : 'bg-gray-100'
                      }`}
                      onClick={() => {
                        if (!slot.booked) {
                          setSelectedTime(slot.time);
                        }
                      }}
                    >
                      {slot.time}
                    </div>
                  ))}
                </div>
              </div>

              {/* Booking Form */}
              <div className="bg-white rounded-lg shadow-lg p-8">
                <h2 className="text-2xl font-bold text-center mb-6">Book Appointment</h2>

                <div className="bg-gray-100 p-6 rounded-lg mb-6">
                  <h3 className="text-xl font-bold mb-4">Booking Summary</h3>
                  <p className="mb-2"><strong>Doctor:</strong> {doctors[selectedDoctorId].name}</p>
                  <p className="mb-2"><strong>Date:</strong> {formatDate(selectedDate)}</p>
                  <p className="mb-2"><strong>Time:</strong> {selectedTime || 'No time selected yet'}</p>
                  <p className="mb-2"><strong>Location:</strong> {doctors[selectedDoctorId].hospital}</p>
                </div>

                <form onSubmit={handleFormSubmit}>
                  <div className="mb-4">
                    <label htmlFor="name" className="block font-medium mb-2">Full Name</label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                      required
                    />
                  </div>

                  <div className="mb-4">
                    <label htmlFor="phone" className="block font-medium mb-2">Phone Number</label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                      required
                    />
                  </div>

                  <div className="mb-4">
                    <label htmlFor="email" className="block font-medium mb-2">Email Address</label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                      required
                    />
                  </div>

                  <div className="mb-4">
                    <label htmlFor="age" className="block font-medium mb-2">Age</label>
                    <input
                      type="number"
                      id="age"
                      name="age"
                      value={formData.age}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                      required
                    />
                  </div>

                  <div className="mb-6">
                    <label htmlFor="reason" className="block font-medium mb-2">Reason for Visit</label>
                    <textarea
                      id="reason"
                      name="reason"
                      value={formData.reason}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                      rows="3"
                    ></textarea>
                  </div>

                  <button
                    type="submit"
                    className="w-full bg-primary text-white py-3 rounded-md hover:bg-blue-700 transition-colors text-lg font-medium"
                  >
                    Confirm Booking
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Confirmation Page */}
      {currentPage === 'confirmation' && selectedDoctorId && (
        <div className="page active animate-fadeIn">
          <div className="container mx-auto px-4 py-16">
            <div className="text-center max-w-2xl mx-auto">
              <div className="text-green-500 text-6xl mb-6"><i className="fas fa-check-circle"></i></div>
              <h2 className="text-3xl font-bold mb-4">Your Appointment Has Been Confirmed!</h2>
              <p className="text-lg mb-8">
                Your appointment with {doctors[selectedDoctorId].name} has been booked for {formatDate(selectedDate)} at {selectedTime} at {doctors[selectedDoctorId].hospital}.
                A confirmation message has been sent to your email and phone number.
              </p>
              <div className="flex flex-col sm:flex-row justify-center gap-4">
                <button
                  onClick={() => {
                    setCurrentPage('home');
                    resetForm();
                  }}
                  className="bg-primary text-white px-6 py-3 rounded-md hover:bg-blue-700 transition-colors"
                >
                  Back to Home
                </button>
                <button
                  onClick={() => window.print()}
                  className="border border-primary text-primary px-6 py-3 rounded-md hover:bg-primary hover:text-white transition-colors"
                >
                  Print Confirmation
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Column 1 */}
            <div>
              <h3 className="text-xl font-bold mb-4">MahamaCare Hospital</h3>
              <p className="text-gray-400">Providing high quality healthcare for over 20 years.</p>
            </div>

            {/* Column 2 */}
            <div>
              <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
              <ul className="space-y-2">
                <li><Link to="/" className="text-gray-400 hover:text-white transition duration-300">Home</Link></li>
                <li><Link to="/#about" className="text-gray-400 hover:text-white transition duration-300">About</Link></li>
                <li><Link to="/#services" className="text-gray-400 hover:text-white transition duration-300">Services</Link></li>
                <li><Link to="/doctors" className="text-gray-400 hover:text-white transition duration-300">Doctors</Link></li>
                <li><Link to="/#faq" className="text-gray-400 hover:text-white transition duration-300">FAQ</Link></li>
                <li><Link to="/#contact" className="text-gray-400 hover:text-white transition duration-300">Contact</Link></li>
              </ul>
            </div>

            {/* Column 3 */}
            <div>
              <h4 className="text-lg font-semibold mb-4">Contact Info</h4>
              <div className="space-y-2 text-gray-400">
                <p><i className="fas fa-envelope mr-2"></i> info@hopecare.com</p>
                <p><i className="fas fa-phone mr-2"></i> +250 000 000</p>
                <p><i className="fas fa-map-marker-alt mr-2"></i> Mahama Refugee Camp, Rwanda</p>
              </div>
            </div>

            {/* Column 4 */}
            <div>
              <h4 className="text-lg font-semibold mb-4">Follow Us</h4>
              <div className="flex space-x-4">
                <a href="https://www.facebook.com/profile.php?id=61583964942775&mibextid=rS40aB7S9Ucbxw6v" className="text-gray-400 hover:text-white transition duration-300">
                  <i className="fab fa-facebook-f text-xl"></i>
                </a>
                <a href="https://x.com/CodersUnit2026?t=ym3SPxmqVxW3QcuboUGcDg&s=03" className="text-gray-400 hover:text-white transition duration-300">
                  <i className="fab fa-twitter text-xl"></i>
                </a>
                <a href="https://www.instagram.com/unitycoders?utm_source=qr&igsh=aDFjdGUxNWxwNHR3" className="text-gray-400 hover:text-white transition duration-300">
                  <i className="fab fa-instagram text-xl"></i>
                </a>
                <a href="https://www.linkedin.com/in/unity-coders-56aa0739a?utm_source=share_via&utm_medium=member_android" className="text-gray-400 hover:text-white transition duration-300">
                  <i className="fab fa-linkedin-in text-xl"></i>
                </a>
              </div>
            </div>
          </div>

          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-500">
            <p>&copy; 2025 MahamaCare Hospital. All rights reserved.</p>
          </div>
        </div>
      </footer>

      <style jsx>{`
        .calendar-date, .time-slot {
          transition: all 0.3s ease;
          cursor: pointer;
        }
        .calendar-date:hover, .time-slot:hover {
          transform: scale(1.05);
        }
        .page {
          display: none;
        }
        .page.active {
          display: block;
          animation: fadeIn 0.5s ease;
        }
        .doctor-image {
          background-size: cover;
          background-position: center;
        }
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        .selected-date {
          background-color: #2c7fb8 !important;
          color: white !important;
        }
        .selected-time {
          background-color: #7fcdbb !important;
          color: white !important;
        }
        .booked-time {
          background-color: #f56565 !important;
          color: white !important;
          cursor: not-allowed;
        }
        .nav-link {
          position: relative;
        }
        .nav-link::after {
          content: '';
          position: absolute;
          width: 0;
          height: 2px;
          bottom: -5px;
          left: 0;
          background-color: #2c7fb8;
          transition: width 0.3s ease;
        }
        .nav-link:hover::after {
          width: 100%;
        }
      `}</style>
    </div>
  );
};

export default Doctors;