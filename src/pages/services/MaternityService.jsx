import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Layout/Header';
import Footer from '../components/Layout/Footer';

const MaternityService = () => {
    const [language, setLanguage] = useState('en');
    const navigate = useNavigate();

    const services = [
        {
            title: 'Prenatal Care',
            description: 'Regular check-ups and monitoring during pregnancy',
            icon: '🤰'
        },
        {
            title: 'Labor & Delivery',
            description: 'Safe delivery services with experienced midwives',
            icon: '👶'
        },
        {
            title: 'Postnatal Care',
            description: 'Care and support after delivery',
            icon: '💝'
        },
        {
            title: 'Breastfeeding Support',
            description: 'Guidance and assistance with breastfeeding',
            icon: '🍼'
        }
    ];

    return (
        <div className="min-h-screen bg-gray-50">
            <Header language={language} setLanguage={setLanguage} />

            {/* Hero Section */}
            <div className="bg-gradient-to-r from-pink-500 to-purple-600 text-white py-16">
                <div className="container mx-auto px-4">
                    <button
                        onClick={() => navigate('/')}
                        className="mb-4 flex items-center text-white hover:opacity-80 transition"
                    >
                        <i className="fas fa-arrow-left mr-2"></i> Back to Home
                    </button>
                    <h1 className="text-4xl font-bold mb-2">Maternity & Birth Services</h1>
                    <p className="text-xl opacity-90">Comprehensive care for expecting mothers and newborns</p>
                </div>
            </div>

            {/* Services Grid */}
            <div className="container mx-auto px-4 py-16">
                <h2 className="text-3xl font-bold mb-12 text-center">Our Services</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
                    {services.map((service, index) => (
                        <div key={index} className="bg-white p-8 rounded-lg shadow-lg hover:shadow-xl transition">
                            <div className="text-5xl mb-4">{service.icon}</div>
                            <h3 className="text-2xl font-bold mb-3">{service.title}</h3>
                            <p className="text-gray-600">{service.description}</p>
                        </div>
                    ))}
                </div>

                {/* Information Section */}
                <div className="bg-gradient-to-r from-pink-50 to-purple-50 p-8 rounded-lg mb-16">
                    <h3 className="text-2xl font-bold mb-4">Why Choose Our Maternity Services?</h3>
                    <ul className="space-y-3">
                        <li className="flex items-start">
                            <i className="fas fa-check text-pink-500 mt-1 mr-3"></i>
                            <span>Experienced and compassionate healthcare professionals</span>
                        </li>
                        <li className="flex items-start">
                            <i className="fas fa-check text-pink-500 mt-1 mr-3"></i>
                            <span>Modern medical equipment and facilities</span>
                        </li>
                        <li className="flex items-start">
                            <i className="fas fa-check text-pink-500 mt-1 mr-3"></i>
                            <span>24/7 emergency services</span>
                        </li>
                        <li className="flex items-start">
                            <i className="fas fa-check text-pink-500 mt-1 mr-3"></i>
                            <span>Family-centered care approach</span>
                        </li>
                        <li className="flex items-start">
                            <i className="fas fa-check text-pink-500 mt-1 mr-3"></i>
                            <span>Affordable healthcare services</span>
                        </li>
                    </ul>
                </div>

                {/* CTA */}
                <div className="text-center">
                    <button className="bg-pink-600 text-white px-8 py-3 rounded-lg font-bold hover:bg-pink-700 transition">
                        Book an Appointment
                    </button>
                </div>
            </div>

            <Footer />
        </div>
    );
};

export default MaternityService;
