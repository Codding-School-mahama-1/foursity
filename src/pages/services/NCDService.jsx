import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../../components/Layout/Header';
import Footer from '../../components/Layout/Footer';

const NCDService = () => {
    const [language, setLanguage] = useState('en');
    const navigate = useNavigate();

    const conditions = [
        {
            name: 'Diabetes',
            description: 'Management and monitoring of diabetes',
            icon: '🩺'
        },
        {
            name: 'Hypertension',
            description: 'Blood pressure management and control',
            icon: '❤️'
        },
        {
            name: 'Asthma',
            description: 'Respiratory management and treatment',
            icon: '💨'
        },
        {
            name: 'Heart Disease',
            description: 'Cardiac care and monitoring',
            icon: '🫀'
        },
        {
            name: 'Cancer Support',
            description: 'Cancer care and treatment support',
            icon: '🔬'
        },
        {
            name: 'Kidney Disease',
            description: 'Renal disease management',
            icon: '🧬'
        }
    ];

    return (
        <div className="min-h-screen bg-gray-50">
            <Header language={language} setLanguage={setLanguage} />

            {/* Hero Section */}
            <div className="bg-gradient-to-r from-red-500 to-orange-600 text-white py-16">
                <div className="container mx-auto px-4">
                    <button
                        onClick={() => navigate('/')}
                        className="mb-4 flex items-center text-white hover:opacity-80 transition"
                    >
                        <i className="fas fa-arrow-left mr-2"></i> Back to Home
                    </button>
                    <h1 className="text-4xl font-bold mb-2">Chronic Disease Care</h1>
                    <p className="text-xl opacity-90">Comprehensive management for non-communicable diseases</p>
                </div>
            </div>

            {/* Conditions Grid */}
            <div className="container mx-auto px-4 py-16">
                <h2 className="text-3xl font-bold mb-12 text-center">Conditions We Manage</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
                    {conditions.map((condition, index) => (
                        <div key={index} className="bg-white p-8 rounded-lg shadow-lg hover:shadow-xl transition">
                            <div className="text-5xl mb-4">{condition.icon}</div>
                            <h3 className="text-xl font-bold mb-3">{condition.name}</h3>
                            <p className="text-gray-600">{condition.description}</p>
                        </div>
                    ))}
                </div>

                {/* Information Section */}
                <div className="bg-red-50 p-8 rounded-lg mb-16">
                    <h3 className="text-2xl font-bold mb-4">Our NCD Management Program</h3>
                    <ul className="space-y-3">
                        <li className="flex items-start">
                            <i className="fas fa-check text-red-600 mt-1 mr-3"></i>
                            <span>Regular health monitoring and check-ups</span>
                        </li>
                        <li className="flex items-start">
                            <i className="fas fa-check text-red-600 mt-1 mr-3"></i>
                            <span>Medication management and prescription</span>
                        </li>
                        <li className="flex items-start">
                            <i className="fas fa-check text-red-600 mt-1 mr-3"></i>
                            <span>Lifestyle counseling and health education</span>
                        </li>
                        <li className="flex items-start">
                            <i className="fas fa-check text-red-600 mt-1 mr-3"></i>
                            <span>Preventive care and early intervention</span>
                        </li>
                        <li className="flex items-start">
                            <i className="fas fa-check text-red-600 mt-1 mr-3"></i>
                            <span>Multidisciplinary care approach</span>
                        </li>
                    </ul>
                </div>

                {/* CTA */}
                <div className="text-center">
                    <button className="bg-red-600 text-white px-8 py-3 rounded-lg font-bold hover:bg-red-700 transition">
                        Schedule a Consultation
                    </button>
                </div>
            </div>

            <Footer />
        </div>
    );
};

export default NCDService;
