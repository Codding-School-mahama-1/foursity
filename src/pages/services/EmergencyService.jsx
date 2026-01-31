import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../../components/Layout/Header';
import Footer from '../../components/Layout/Footer';

const EmergencyService = () => {
    const [language, setLanguage] = useState('en');
    const navigate = useNavigate();

    const emergencyServices = [
        {
            title: '24/7 Emergency Response',
            description: 'Round-the-clock emergency medical services',
            icon: '🚑'
        },
        {
            title: 'Trauma Care',
            description: 'Treatment for traumatic injuries',
            icon: '🏥'
        },
        {
            title: 'Accident Response',
            description: 'Immediate response to accidents',
            icon: '⚠️'
        },
        {
            title: 'Acute Illness Care',
            description: 'Treatment for sudden acute conditions',
            icon: '🤒'
        },
        {
            title: 'Intensive Care',
            description: 'ICU and high-dependency care',
            icon: '💊'
        },
        {
            title: 'Stabilization Services',
            description: 'Patient stabilization and transfer',
            icon: '⚡'
        }
    ];

    return (
        <div className="min-h-screen bg-gray-50">
            <Header language={language} setLanguage={setLanguage} />

            {/* Hero Section */}
            <div className="bg-gradient-to-r from-red-600 to-pink-600 text-white py-16">
                <div className="container mx-auto px-4">
                    <button
                        onClick={() => navigate('/')}
                        className="mb-4 flex items-center text-white hover:opacity-80 transition"
                    >
                        <i className="fas fa-arrow-left mr-2"></i> Back to Home
                    </button>
                    <h1 className="text-4xl font-bold mb-2">Emergency Medical Services</h1>
                    <p className="text-xl opacity-90">24/7 Emergency Response - Call 112</p>
                </div>
            </div>

            {/* Alert Box */}
            <div className="bg-red-50 border-l-4 border-red-600 p-4 mb-8">
                <div className="container mx-auto px-4">
                    <div className="flex items-center">
                        <div className="text-3xl text-red-600 mr-4">🚨</div>
                        <div>
                            <h3 className="text-lg font-bold text-red-600">Emergency Hotline</h3>
                            <p className="text-red-700">Call <strong>112</strong> for immediate medical assistance</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Services Grid */}
            <div className="container mx-auto px-4 py-16">
                <h2 className="text-3xl font-bold mb-12 text-center">Emergency Services Available</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
                    {emergencyServices.map((service, index) => (
                        <div key={index} className="bg-white p-8 rounded-lg shadow-lg hover:shadow-xl transition">
                            <div className="text-5xl mb-4">{service.icon}</div>
                            <h3 className="text-xl font-bold mb-3">{service.title}</h3>
                            <p className="text-gray-600">{service.description}</p>
                        </div>
                    ))}
                </div>

                {/* What to Do in Emergency */}
                <div className="bg-red-50 p-8 rounded-lg mb-16">
                    <h3 className="text-2xl font-bold mb-4">What to Do in an Emergency</h3>
                    <ol className="space-y-3 list-decimal list-inside">
                        <li className="text-gray-700"><strong>Call 112</strong> immediately for emergency services</li>
                        <li className="text-gray-700"><strong>Provide location</strong> details to the dispatcher</li>
                        <li className="text-gray-700"><strong>Describe symptoms</strong> or injuries clearly</li>
                        <li className="text-gray-700"><strong>Follow instructions</strong> from emergency personnel</li>
                        <li className="text-gray-700"><strong>Keep calm</strong> and reassure the patient</li>
                    </ol>
                </div>

                {/* Our Capabilities */}
                <div className="bg-blue-50 p-8 rounded-lg mb-16">
                    <h3 className="text-2xl font-bold mb-4">Our Emergency Care Capabilities</h3>
                    <ul className="space-y-3">
                        <li className="flex items-start">
                            <i className="fas fa-check text-blue-600 mt-1 mr-3"></i>
                            <span>Advanced life support equipment</span>
                        </li>
                        <li className="flex items-start">
                            <i className="fas fa-check text-blue-600 mt-1 mr-3"></i>
                            <span>Experienced emergency medicine doctors</span>
                        </li>
                        <li className="flex items-start">
                            <i className="fas fa-check text-blue-600 mt-1 mr-3"></i>
                            <span>Ambulance service with trained paramedics</span>
                        </li>
                        <li className="flex items-start">
                            <i className="fas fa-check text-blue-600 mt-1 mr-3"></i>
                            <span>Rapid trauma assessment and treatment</span>
                        </li>
                        <li className="flex items-start">
                            <i className="fas fa-check text-blue-600 mt-1 mr-3"></i>
                            <span>Transfer coordination with specialized centers</span>
                        </li>
                    </ul>
                </div>

                {/* CTA */}
                <div className="text-center bg-red-600 text-white p-8 rounded-lg">
                    <h3 className="text-2xl font-bold mb-4">Need Emergency Help?</h3>
                    <button className="bg-white text-red-600 px-8 py-3 rounded-lg font-bold hover:bg-gray-100 transition text-lg">
                        CALL 112 NOW
                    </button>
                </div>
            </div>

            <Footer />
        </div>
    );
};

export default EmergencyService;
