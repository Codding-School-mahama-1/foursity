import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../../components/Layout/Header';
import Footer from '../../components/Layout/Footer';

const MentalHealthService = () => {
    const [language, setLanguage] = useState('en');
    const navigate = useNavigate();

    const services = [
        {
            title: 'Counseling Services',
            description: 'Professional mental health counseling',
            icon: '🗣️'
        },
        {
            title: 'Psychiatric Care',
            description: 'Medication and psychiatric treatment',
            icon: '👨‍⚕️'
        },
        {
            title: 'Trauma Support',
            description: 'Support for trauma and PTSD',
            icon: '🛡️'
        },
        {
            title: 'Group Therapy',
            description: 'Group counseling and support sessions',
            icon: '👥'
        },
        {
            title: 'Crisis Intervention',
            description: '24/7 crisis support services',
            icon: '🆘'
        },
        {
            title: 'Family Therapy',
            description: 'Family counseling and support',
            icon: '👨‍👩‍👧‍👦'
        }
    ];

    return (
        <div className="min-h-screen bg-gray-50">
            <Header language={language} setLanguage={setLanguage} />

            {/* Hero Section */}
            <div className="bg-gradient-to-r from-purple-500 to-indigo-600 text-white py-16">
                <div className="container mx-auto px-4">
                    <button
                        onClick={() => navigate('/')}
                        className="mb-4 flex items-center text-white hover:opacity-80 transition"
                    >
                        <i className="fas fa-arrow-left mr-2"></i> Back to Home
                    </button>
                    <h1 className="text-4xl font-bold mb-2">Mental Health Support</h1>
                    <p className="text-xl opacity-90">Comprehensive mental health services for your wellbeing</p>
                </div>
            </div>

            {/* Services Grid */}
            <div className="container mx-auto px-4 py-16">
                <h2 className="text-3xl font-bold mb-12 text-center">Our Mental Health Services</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
                    {services.map((service, index) => (
                        <div key={index} className="bg-white p-8 rounded-lg shadow-lg hover:shadow-xl transition">
                            <div className="text-5xl mb-4">{service.icon}</div>
                            <h3 className="text-xl font-bold mb-3">{service.title}</h3>
                            <p className="text-gray-600">{service.description}</p>
                        </div>
                    ))}
                </div>

                {/* Information Section */}
                <div className="bg-purple-50 p-8 rounded-lg mb-16">
                    <h3 className="text-2xl font-bold mb-4">Why Mental Health Matters</h3>
                    <p className="text-gray-700 mb-4">
                        Mental health is as important as physical health. Our team of experienced professionals is here to support you through life's challenges.
                    </p>
                    <ul className="space-y-3">
                        <li className="flex items-start">
                            <i className="fas fa-check text-purple-600 mt-1 mr-3"></i>
                            <span>Confidential and professional care</span>
                        </li>
                        <li className="flex items-start">
                            <i className="fas fa-check text-purple-600 mt-1 mr-3"></i>
                            <span>Personalized treatment plans</span>
                        </li>
                        <li className="flex items-start">
                            <i className="fas fa-check text-purple-600 mt-1 mr-3"></i>
                            <span>24/7 crisis support available</span>
                        </li>
                        <li className="flex items-start">
                            <i className="fas fa-check text-purple-600 mt-1 mr-3"></i>
                            <span>Affordable mental health services</span>
                        </li>
                    </ul>
                </div>

                {/* CTA */}
                <div className="text-center">
                    <button className="bg-purple-600 text-white px-8 py-3 rounded-lg font-bold hover:bg-purple-700 transition">
                        Get Support Now
                    </button>
                </div>
            </div>

            <Footer />
        </div>
    );
};

export default MentalHealthService;
