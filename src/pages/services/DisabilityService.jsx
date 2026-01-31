import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../../components/Layout/Header';
import Footer from '../../components/Layout/Footer';

const DisabilityService = () => {
    const [language, setLanguage] = useState('en');
    const navigate = useNavigate();

    const services = [
        {
            title: 'Assessment & Diagnosis',
            description: 'Comprehensive disability assessment',
            icon: '🔍'
        },
        {
            title: 'Rehabilitation Services',
            description: 'Physical and occupational therapy',
            icon: '💪'
        },
        {
            title: 'Mobility Aids',
            description: 'Provision of assistive devices',
            icon: '🦽'
        },
        {
            title: 'Counseling Support',
            description: 'Psychological and social support',
            icon: '🗣️'
        },
        {
            title: 'Education Support',
            description: 'Support for learning and education',
            icon: '📚'
        },
        {
            title: 'Livelihood Training',
            description: 'Vocational training and skills',
            icon: '🏭'
        }
    ];

    return (
        <div className="min-h-screen bg-gray-50">
            <Header language={language} setLanguage={setLanguage} />

            {/* Hero Section */}
            <div className="bg-gradient-to-r from-amber-500 to-orange-600 text-white py-16">
                <div className="container mx-auto px-4">
                    <button
                        onClick={() => navigate('/')}
                        className="mb-4 flex items-center text-white hover:opacity-80 transition"
                    >
                        <i className="fas fa-arrow-left mr-2"></i> Back to Home
                    </button>
                    <h1 className="text-4xl font-bold mb-2">Disability Care & Support</h1>
                    <p className="text-xl opacity-90">Inclusive services for persons with disabilities</p>
                </div>
            </div>

            {/* Services Grid */}
            <div className="container mx-auto px-4 py-16">
                <h2 className="text-3xl font-bold mb-12 text-center">Our Disability Services</h2>
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
                <div className="bg-amber-50 p-8 rounded-lg mb-16">
                    <h3 className="text-2xl font-bold mb-4">Our Commitment to Inclusion</h3>
                    <p className="text-gray-700 mb-4">
                        We believe that everyone deserves equal access to healthcare and support services. Our disability services are designed to be inclusive and accessible for all.
                    </p>
                    <ul className="space-y-3">
                        <li className="flex items-start">
                            <i className="fas fa-check text-amber-600 mt-1 mr-3"></i>
                            <span>Accessible healthcare facilities</span>
                        </li>
                        <li className="flex items-start">
                            <i className="fas fa-check text-amber-600 mt-1 mr-3"></i>
                            <span>Specialized staff training</span>
                        </li>
                        <li className="flex items-start">
                            <i className="fas fa-check text-amber-600 mt-1 mr-3"></i>
                            <span>Community integration support</span>
                        </li>
                        <li className="flex items-start">
                            <i className="fas fa-check text-amber-600 mt-1 mr-3"></i>
                            <span>Affordable and quality services</span>
                        </li>
                    </ul>
                </div>

                {/* CTA */}
                <div className="text-center">
                    <button className="bg-amber-600 text-white px-8 py-3 rounded-lg font-bold hover:bg-amber-700 transition">
                        Get Support Now
                    </button>
                </div>
            </div>

            <Footer />
        </div>
    );
};

export default DisabilityService;
