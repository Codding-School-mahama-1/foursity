import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { getAuth, signOut } from 'firebase/auth';

const Header = ({ language, setLanguage }) => {
    const [menuOpen, setMenuOpen] = useState(false);
    const [servicesOpen, setServicesOpen] = useState(false);
    const auth = getAuth();
    const navigate = useNavigate();
    const currentUser = auth.currentUser;

    const handleLogout = async () => {
        try {
            await signOut(auth);
            navigate('/login');
        } catch (error) {
            console.error('Logout error:', error);
        }
    };

    return (
        <header className="bg-white shadow-md sticky top-0 z-50">
            <div className="container mx-auto px-4">
                <div className="flex justify-between items-center py-4">
                    {/* Logo */}
                    <Link to="/" className="text-2xl font-bold text-blue-600">
                        🏥 MCH
                    </Link>

                    {/* Mobile menu button */}
                    <button
                        onClick={() => setMenuOpen(!menuOpen)}
                        className="md:hidden text-gray-600 focus:outline-none"
                    >
                        <i className="fas fa-bars text-xl"></i>
                    </button>

                    {/* Navigation Links */}
                    <nav className={`${menuOpen ? 'flex' : 'hidden'} md:flex flex-col md:flex-row items-center space-y-4 md:space-y-0 md:space-x-6 absolute md:relative top-16 md:top-0 left-0 md:left-auto right-0 bg-white md:bg-transparent p-4 md:p-0 w-full md:w-auto`}>
                        <Link to="/" className="text-gray-700 hover:text-blue-600 transition">
                            Home
                        </Link>
                        <Link to="/#about" className="text-gray-700 hover:text-blue-600 transition">
                            About
                        </Link>

                        {/* Services Dropdown */}
                        <div className="relative group">
                            <button className="flex items-center text-gray-700 hover:text-blue-600 transition">
                                Services <i className="fas fa-chevron-down ml-1 text-xs"></i>
                            </button>
                            <div className="absolute left-0 mt-2 w-64 bg-white shadow-xl rounded-lg py-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 z-50">
                                <Link to="/services/maternity" className="block px-4 py-2 text-gray-700 hover:bg-blue-50 hover:text-blue-600">
                                    Maternity & Birth
                                </Link>
                                <Link to="/services/emergency" className="block px-4 py-2 text-gray-700 hover:bg-blue-50 hover:text-blue-600">
                                    Emergency Care
                                </Link>
                                <Link to="/services/vaccination" className="block px-4 py-2 text-gray-700 hover:bg-blue-50 hover:text-blue-600">
                                    Vaccination
                                </Link>
                                <Link to="/services/mental-health" className="block px-4 py-2 text-gray-700 hover:bg-blue-50 hover:text-blue-600">
                                    Mental Health
                                </Link>
                                <Link to="/services/ncd" className="block px-4 py-2 text-gray-700 hover:bg-blue-50 hover:text-blue-600">
                                    Chronic Diseases
                                </Link>
                                <Link to="/services/health-education" className="block px-4 py-2 text-gray-700 hover:bg-blue-50 hover:text-blue-600">
                                    Health Education
                                </Link>
                                <Link to="/services/disability" className="block px-4 py-2 text-gray-700 hover:bg-blue-50 hover:text-blue-600">
                                    Disability Care
                                </Link>
                            </div>
                        </div>

                        <Link to="/doctors" className="text-gray-700 hover:text-blue-600 transition">
                            Doctors
                        </Link>
                    </nav>

                    {/* Actions */}
                    <div className="hidden md:flex items-center space-x-4">
                        {/* Language Selector */}
                        <select
                            value={language}
                            onChange={(e) => setLanguage(e.target.value)}
                            className="px-3 py-1 border border-gray-300 rounded bg-white text-gray-700"
                        >
                            <option value="en">English</option>
                            <option value="sw">Swahili</option>
                        </select>

                        {currentUser ? (
                            <div className="flex items-center space-x-3">
                                <span className="text-sm text-gray-700">{currentUser.email}</span>
                                <button
                                    onClick={handleLogout}
                                    className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition"
                                >
                                    Logout
                                </button>
                            </div>
                        ) : (
                            <>
                                <Link
                                    to="/login"
                                    className="px-4 py-2 text-blue-600 border border-blue-600 rounded hover:bg-blue-50 transition"
                                >
                                    Login
                                </Link>
                                <Link
                                    to="/loginp"
                                    className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
                                >
                                    Sign Up
                                </Link>
                            </>
                        )}
                    </div>
                </div>
            </div>
        </header>
    );
};

export default Header;
