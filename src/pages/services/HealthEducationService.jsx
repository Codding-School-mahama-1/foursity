import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../../components/Layout/Header';
import Footer from '../../components/Layout/Footer';

const HealthEducationService = () => {
    const [language, setLanguage] = useState('en');
    const navigate = useNavigate();

    const programs = [
        {
            title: 'Nutrition Education',
            description: 'Learn about healthy eating and nutrition',
            icon: '🥗'
        },
        {
            title: 'Health Awareness Campaigns',
            description: 'Community health education programs',
            icon: '📢'
        },
        {
            title: 'Disease Prevention',
            description: 'Prevention strategies for common diseases',
            icon: '🛡️'
        },
        {
            title: 'Maternal Health Education',
            description: 'Education for pregnant women and mothers',
            icon: '👶'
        },
        {
            title: 'Child Health',
            description: 'Child development and health guidance',
            icon: '👧'
        },
        {
            title: 'Lifestyle Coaching',
            description: 'Guidance for healthy lifestyle changes',
            icon: '🏃'
        }
    ];

    return (
        <div className="min-h-screen bg-gray-50">
            <Header language={language} setLanguage={setLanguage} />

            {/* Hero Section */}
            <div className="bg-gradient-to-r from-green-500 to-emerald-600 text-white py-16">
                <div className="container mx-auto px-4">
                    <button
                        onClick={() => navigate('/')}
                        className="mb-4 flex items-center text-white hover:opacity-80 transition"
                    >
                        <i className="fas fa-arrow-left mr-2"></i> Back to Home
                    </button>
                    <h1 className="text-4xl font-bold mb-2">Health Education & Awareness</h1>
                    <p className="text-xl opacity-90">Empowering communities through health knowledge</p>
                </div>
            </div>

            {/* Programs Grid */}
            <div className="container mx-auto px-4 py-16">
                <h2 className="text-3xl font-bold mb-12 text-center">Our Educational Programs</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
                    {programs.map((program, index) => (
                        <div key={index} className="bg-white p-8 rounded-lg shadow-lg hover:shadow-xl transition">
                            <div className="text-5xl mb-4">{program.icon}</div>
                            <h3 className="text-xl font-bold mb-3">{program.title}</h3>
                            <p className="text-gray-600">{program.description}</p>
                        </div>
                    ))}
                </div>

                {/* Information Section */}
                <div className="bg-green-50 p-8 rounded-lg mb-16">
                    <h3 className="text-2xl font-bold mb-4">Why Health Education?</h3>
                    <p className="text-gray-700 mb-4">
                        Knowledge is power. Through health education, we empower our community to make informed decisions about their health and wellbeing.
                    </p>
                    <ul className="space-y-3">
                        <li className="flex items-start">
                            <i className="fas fa-check text-green-600 mt-1 mr-3"></i>
                            <span>Evidence-based health information</span>
                        </li>
                        <li className="flex items-start">
                            <i className="fas fa-check text-green-600 mt-1 mr-3"></i>
                            <span>Interactive workshops and seminars</span>
                        </li>
                        <li className="flex items-start">
                            <i className="fas fa-check text-green-600 mt-1 mr-3"></i>
                            <span>Community-focused education</span>
                        </li>
                        <li className="flex items-start">
                            <i className="fas fa-check text-green-600 mt-1 mr-3"></i>
                            <span>Multilingual health resources</span>
                        </li>
                    </ul>
                </div>

                {/* CTA */}
                <div className="text-center">
                    <button className="bg-green-600 text-white px-8 py-3 rounded-lg font-bold hover:bg-green-700 transition">
                        Join a Program
                    </button>
                </div>
            </div>

            <Footer />
        </div>
    );
};

export default HealthEducationService;
