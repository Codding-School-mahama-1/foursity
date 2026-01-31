import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
    return (
        <footer className="bg-gray-800 text-white py-12">
            <div className="container mx-auto px-4">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
                    {/* About */}
                    <div>
                        <h3 className="text-lg font-bold mb-4">🏥 MahamaCare Hospital</h3>
                        <p className="text-gray-400">
                            Providing high quality healthcare for over 20 years.
                        </p>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h3 className="text-lg font-bold mb-4">Quick Links</h3>
                        <ul className="space-y-2 text-gray-400">
                            <li><Link to="/" className="hover:text-white transition">Home</Link></li>
                            <li><Link to="/#about" className="hover:text-white transition">About</Link></li>
                            <li><Link to="/doctors" className="hover:text-white transition">Doctors</Link></li>
                            <li><Link to="/services/maternity" className="hover:text-white transition">Services</Link></li>
                        </ul>
                    </div>

                    {/* Contact */}
                    <div>
                        <h3 className="text-lg font-bold mb-4">Contact Info</h3>
                        <ul className="space-y-2 text-gray-400">
                            <li>📍 Mahama Refugee Camp, Kirehe District, Rwanda</li>
                            <li>📞 +250 xxx xxx xxx</li>
                            <li>✉️ info@mahamahospital.com</li>
                            <li>🚨 Emergency: 112</li>
                        </ul>
                    </div>

                    {/* Follow Us */}
                    <div>
                        <h3 className="text-lg font-bold mb-4">Follow Us</h3>
                        <div className="flex space-x-4">
                            <a href="#" className="text-gray-400 hover:text-white transition text-xl">
                                <i className="fab fa-facebook"></i>
                            </a>
                            <a href="#" className="text-gray-400 hover:text-white transition text-xl">
                                <i className="fab fa-twitter"></i>
                            </a>
                            <a href="#" className="text-gray-400 hover:text-white transition text-xl">
                                <i className="fab fa-instagram"></i>
                            </a>
                            <a href="#" className="text-gray-400 hover:text-white transition text-xl">
                                <i className="fab fa-linkedin"></i>
                            </a>
                        </div>
                    </div>
                </div>

                <div className="border-t border-gray-700 pt-8">
                    <p className="text-center text-gray-400">
                        © 2025 MahamaCare Hospital. All rights reserved.
                    </p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
