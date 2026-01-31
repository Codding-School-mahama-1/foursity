import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../../components/Layout/Header';
import Footer from '../../components/Layout/Footer';

const VaccinationService = () => {
    const [language, setLanguage] = useState('en');
    const navigate = useNavigate();

    const vaccines = [
        {
            name: 'COVID-19 Vaccine',
            description: 'Protection against COVID-19 virus',
            schedule: 'As recommended'
        },
        {
            name: 'MMR Vaccine',
            description: 'Measles, Mumps, Rubella protection',
            schedule: '12-15 months, 4-6 years'
        },
        {
            name: 'Polio Vaccine',
            description: 'Poliomyelitis prevention',
            schedule: '2, 4, 6 months, 4-6 years'
        },
        {
            name: 'Hepatitis B',
            description: 'Hepatitis B virus protection',
            schedule: 'At birth, 1-2 months, 6 months'
        },
        {
            name: 'DPT Vaccine',
            description: 'Diphtheria, Pertussis, Tetanus',
            schedule: '2, 4, 6 months, 4-6 years'
        },
        {
            name: 'Yellow Fever',
            description: 'Yellow fever prevention',
            schedule: '9 months and booster at 10 years'
        }
    ];

    return (
        <div className="min-h-screen bg-gray-50">
            <Header language={language} setLanguage={setLanguage} />

            {/* Hero Section */}
            <div className="bg-gradient-to-r from-blue-500 to-cyan-600 text-white py-16">
                <div className="container mx-auto px-4">
                    <button
                        onClick={() => navigate('/')}
                        className="mb-4 flex items-center text-white hover:opacity-80 transition"
                    >
                        <i className="fas fa-arrow-left mr-2"></i> Back to Home
                    </button>
                    <h1 className="text-4xl font-bold mb-2">Vaccination Programs</h1>
                    <p className="text-xl opacity-90">Protect your health through our comprehensive vaccination services</p>
                </div>
            </div>

            {/* Vaccines Grid */}
            <div className="container mx-auto px-4 py-16">
                <h2 className="text-3xl font-bold mb-12 text-center">Available Vaccines</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
                    {vaccines.map((vaccine, index) => (
                        <div key={index} className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition">
                            <div className="text-4xl mb-3">💉</div>
                            <h3 className="text-xl font-bold mb-2">{vaccine.name}</h3>
                            <p className="text-gray-600 mb-3">{vaccine.description}</p>
                            <p className="text-sm text-blue-600 font-semibold">Schedule: {vaccine.schedule}</p>
                        </div>
                    ))}
                </div>

                {/* Information Section */}
                <div className="bg-blue-50 p-8 rounded-lg mb-16">
                    <h3 className="text-2xl font-bold mb-4">Why Vaccinations Matter</h3>
                    <ul className="space-y-3">
                        <li className="flex items-start">
                            <i className="fas fa-check text-blue-600 mt-1 mr-3"></i>
                            <span>Prevents serious diseases and complications</span>
                        </li>
                        <li className="flex items-start">
                            <i className="fas fa-check text-blue-600 mt-1 mr-3"></i>
                            <span>Protects vulnerable populations</span>
                        </li>
                        <li className="flex items-start">
                            <i className="fas fa-check text-blue-600 mt-1 mr-3"></i>
                            <span>Safe and well-tested by health authorities</span>
                        </li>
                        <li className="flex items-start">
                            <i className="fas fa-check text-blue-600 mt-1 mr-3"></i>
                            <span>Affordable vaccination programs available</span>
                        </li>
                    </ul>
                </div>

                {/* CTA */}
                <div className="text-center">
                    <button className="bg-blue-600 text-white px-8 py-3 rounded-lg font-bold hover:bg-blue-700 transition">
                        Schedule Vaccination
                    </button>
                </div>
            </div>

            <Footer />
        </div>
    );
};

export default VaccinationService;
