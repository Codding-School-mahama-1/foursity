import React, { useState, useEffect } from 'react';
import { initializeApp } from 'firebase/app';
import { getAuth, onAuthStateChanged, signOut } from 'firebase/auth';
import { getDatabase, ref, onValue, off } from 'firebase/database';
import {
    Chart as ChartJS,
    ArcElement,
    Tooltip,
    Legend,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
} from 'chart.js';
import { Doughnut, Pie, Line } from 'react-chartjs-2';

ChartJS.register(
    ArcElement,
    Tooltip,
    Legend,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title
);

// Firebase config
const firebaseConfig = {
    apiKey: "AIzaSyDt4vs7S3nckO8xxfp1_axHZ76J0cz2qdg",
    authDomain: "mahamahospital.firebaseapp.com",
    databaseURL: "https://mahamahospital-default-rtdb.firebaseio.com",
    projectId: "mahamahospital",
    storageBucket: "mahamahospital.firebasestorage.app",
    messagingSenderId: "256305692002",
    appId: "1:256305692002:web:cfef26992264204be9803b"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const database = getDatabase(app);

const Dashboard = () => {
    const [loading, setLoading] = useState(true);
    const [authenticated, setAuthenticated] = useState(false);
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [patients, setPatients] = useState([]);
    const [births, setBirths] = useState([]);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (user) {
                setAuthenticated(true);
                setLoading(false);
                loadData();
            } else {
                window.location.href = '/login.html';
            }
        });

        return () => unsubscribe();
    }, []);

    const loadData = () => {
        const patientsRef = ref(database, 'patients');
        const birthsRef = ref(database, 'births');

        onValue(patientsRef, (snapshot) => {
            const data = snapshot.val();
            if (data) {
                const patientsArray = Object.entries(data).map(([id, patient]) => ({
                    id,
                    ...patient
                }));
                setPatients(patientsArray);
            } else {
                setPatients([]);
            }
        });

        onValue(birthsRef, (snapshot) => {
            const data = snapshot.val();
            if (data) {
                const birthsArray = Object.entries(data).map(([id, birth]) => ({
                    id,
                    ...birth
                }));
                setBirths(birthsArray);
            } else {
                setBirths([]);
            }
        });
    };

    const handleLogout = async () => {
        try {
            await signOut(auth);
        } catch (error) {
            console.error('Logout error:', error);
        }
    };

    const toggleSidebar = () => {
        setSidebarOpen(!sidebarOpen);
    };

    const toggleMobileMenu = () => {
        setMobileMenuOpen(!mobileMenuOpen);
    };

    // Calculate statistics
    const totalPatients = patients.length;
    const totalBirths = births.length;
    const malePatients = patients.filter(p => 
        (p.gender && p.gender.toLowerCase() === 'male') || 
        (p.Gender && p.Gender.toLowerCase() === 'male')
    ).length;
    const femalePatients = patients.filter(p => 
        (p.gender && p.gender.toLowerCase() === 'female') || 
        (p.Gender && p.Gender.toLowerCase() === 'female')
    ).length;
    const malePercent = totalPatients > 0 ? Math.round((malePatients / totalPatients) * 100) : 0;
    const femalePercent = totalPatients > 0 ? Math.round((femalePatients / totalPatients) * 100) : 0;

    // Recent patients
    const recentPatients = [...patients]
        .sort((a, b) => {
            const dateA = a.createdAt ? new Date(a.createdAt) : new Date(0);
            const dateB = b.createdAt ? new Date(b.createdAt) : new Date(0);
            return dateB - dateA;
        })
        .slice(0, 5);

    // Recent births
    const recentBirths = [...births]
        .sort((a, b) => {
            const dateA = a.createdAt ? new Date(a.createdAt) : new Date(0);
            const dateB = b.createdAt ? new Date(b.createdAt) : new Date(0);
            return dateB - dateA;
        })
        .slice(0, 5);

    // Chart data
    const genderChartData = {
        labels: ['Male', 'Female', 'Other'],
        datasets: [{
            data: [malePatients, femalePatients, totalPatients - malePatients - femalePatients],
            backgroundColor: ['#4f46e5', '#ec4899', '#6b7280'],
            borderWidth: 2,
            borderColor: '#ffffff'
        }]
    };

    const birthChartData = {
        labels: ['Male', 'Female'],
        datasets: [{
            data: [
                births.filter(b => (b.gender && b.gender.toLowerCase() === 'male') || (b.Gender && b.Gender.toLowerCase() === 'male')).length,
                births.filter(b => (b.gender && b.gender.toLowerCase() === 'female') || (b.Gender && b.Gender.toLowerCase() === 'female')).length
            ],
            backgroundColor: ['#60a5fa', '#f472b6'],
            borderWidth: 2,
            borderColor: '#ffffff'
        }]
    };

    const getLast6Months = () => {
        const months = [];
        for (let i = 5; i >= 0; i--) {
            const date = new Date();
            date.setMonth(date.getMonth() - i);
            months.push(date.toLocaleString('default', { month: 'short' }));
        }
        return months;
    };

    const getMonthlyData = (data, months) => {
        const currentYear = new Date().getFullYear();
        return months.map(month => {
            return data.filter(item => {
                const itemDate = new Date(item.createdAt || 0);
                return itemDate.getFullYear() === currentYear && 
                       itemDate.toLocaleString('default', { month: 'short' }) === month;
            }).length;
        });
    };

    const months = getLast6Months();
    const trendChartData = {
        labels: months,
        datasets: [
            {
                label: 'Patients',
                data: getMonthlyData(patients, months),
                borderColor: '#3b82f6',
                backgroundColor: 'rgba(59, 130, 246, 0.1)',
                tension: 0.4,
                fill: true
            },
            {
                label: 'Births',
                data: getMonthlyData(births, months),
                borderColor: '#10b981',
                backgroundColor: 'rgba(16, 185, 129, 0.1)',
                tension: 0.4,
                fill: true
            }
        ]
    };

    const formatDate = (dateString) => {
        if (!dateString || dateString === 'N/A') return 'N/A';
        try {
            const date = new Date(dateString);
            return date.toLocaleDateString();
        } catch (e) {
            return 'N/A';
        }
    };

    if (loading) {
        return (
            <div className="fixed inset-0 bg-white flex items-center justify-center z-50">
                <div className="text-center">
                    <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-100 rounded-full mb-4">
                        <i className="fas fa-spinner fa-spin text-2xl text-blue-600"></i>
                    </div>
                    <p className="text-gray-600">Loading dashboard...</p>
                </div>
            </div>
        );
    }

    if (!authenticated) {
        return null;
    }

    return (
        <div className="bg-gray-100 text-gray-800 select-none font-serif">
            {/* Sidebar overlay for mobile */}
            {sidebarOpen && (
                <div 
                    className="fixed inset-0 bg-black/50 z-39 md:hidden"
                    onClick={() => setSidebarOpen(false)}
                ></div>
            )}

            <div className="flex">
                {/* Sidebar */}
                <aside className={`fixed left-0 top-0 h-screen w-56 bg-gradient-to-b from-blue-500 to-blue-600 text-white flex flex-col shadow-xl z-40 transition-transform duration-300 ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} md:translate-x-0`}>
                    <div className="text-xl font-bold p-6 border-b border-blue-400 bg-blue-600">
                        <div className="flex items-center">
                            <span>Hospital Admin</span>
                        </div>
                    </div>
                    
                    {/* Navigation Menu */}
                    <nav className="flex-1 p-5 space-y-3">
                        {/* Logout Button */}
                        <button 
                            onClick={handleLogout}
                            className="flex items-center p-3 rounded-xl hover:bg-blue-400 transition-all duration-200 text-red-100 bg-blue-700/30 w-full text-left"
                        >
                            <i className="fa-solid fa-right-from-bracket text-xl mr-3"></i>
                            <span className="font-medium">Logout</span>
                        </button>
                        
                        <a href="/Dashboard/maternity.html" className="flex items-center p-3 rounded-xl hover:bg-blue-400 transition-all duration-200 bg-white/10">
                            <i className="fa-solid fa-user-injured text-yellow-400 text-2xl mr-3"></i>
                            <span className="font-medium">Maternity</span>
                        </a>

                        {/* Emergency */}
                        <a href="./Dashboard/Emergency2.html" className="flex items-center p-3 rounded-xl hover:bg-blue-400 transition-all duration-200 bg-white/10">
                            <i className="fa-solid fa-truck-medical text-yellow-400 text-2xl mr-3"></i>
                            <span className="font-medium">Emergency</span>
                        </a>

                        {/* Vaccination */}
                        <a href="./Dashboard/vaccination2.html" className="flex items-center p-3 rounded-xl hover:bg-blue-400 transition-all duration-200 bg-white/10">
                            <i className="fa-solid fa-syringe text-yellow-400 text-2xl mr-3"></i>
                            <span className="font-medium">Vaccination</span>
                        </a>
                        
                        {/* mental */}
                        <a href="/Dashboard/mental heath.html" className="flex items-center p-3 rounded-xl hover:bg-blue-400 transition-all duration-200 bg-white/10">
                            <i className="fa-solid fa-head-side-brain mr-2 text-yellow-400 text-2xl"></i>
                            <span className="font-medium">Mental Health</span>
                        </a>
                            
                        {/* NCD */}
                        <a href="/Dashboard/NCD_Dashboard.html" className="flex items-center p-3 rounded-xl hover:bg-blue-400 transition-all duration-200 bg-white/10">
                            <i className="fas fa-heartbeat mr-2 text-yellow-400 text-2xl"></i> 
                            <span className="font-medium">NCD</span>
                        </a>
                        
                        {/* Disability */}
                        <a href="./Dashboard/Disability2.html" className="flex items-center p-3 rounded-xl hover:bg-blue-400 transition-all duration-200 bg-white/10">
                            <i className="fa-solid fa-wheelchair text-yellow-400 text-2xl mr-3"></i>
                            <span className="font-medium">Disability</span>
                        </a>
            
                        <a href="/Dashboard/complain_Dashboard.html" className="flex items-center p-3 rounded-xl hover:bg-blue-400 transition-all duration-200 bg-white/10">
                            <i className="fas fa-headset mr-2 text-yellow-400 text-2xl"></i>
                            <span className="font-medium">Complain</span>
                        </a>
                    </nav>
                    
                    <div className="p-4 border-t border-blue-400 bg-blue-600/50 rounded-br-3xl">
                        <div className="text-sm text-blue-100 text-center">
                            <i className="fa-solid fa-shield-heart mr-2"></i>
                            Secure System
                        </div>
                    </div>
                </aside>
                
                {/* Main Content */}
                <main className="w-full md:ml-56">
                    <header className="bg-white shadow-md sticky top-0 z-30">
                        <div className="container mx-auto px-4">
                            <div className="flex justify-between items-center py-4">
                                <div className="flex items-center">
                                    {/* Sidebar toggle button for mobile */}
                                    <button onClick={toggleSidebar} className="md:hidden text-gray-600 focus:outline-none mr-4">
                                        <i className="fas fa-bars text-xl"></i>
                                    </button>
                                    <span className="text-2xl font-bold text-blue-600"> 
                                        <a href="/index.html">🏥 MCH</a> Patients and Births Dashboard
                                    </span>
                                </div>
                                
                                <button onClick={toggleMobileMenu} className="md:hidden text-gray-600 focus:outline-none">
                                    <i className="fas fa-ellipsis-v text-xl"></i>
                                </button>
                                
                                <nav className="hidden md:flex items-center space-x-6">
                                    <a href="#Statistic" className="text-gray-700 hover:text-blue-600 transition duration-300">Statistics</a>
                                    <a href="/Services/paitents-Services.html" className="text-gray-700 hover:text-blue-600 transition duration-300">Patients Registration</a>
                                    <a href="/Services/Briths Services.html" className="text-gray-700 hover:text-blue-600 transition duration-300">Birth Registration</a>
                                </nav>
                            </div>
                            
                            {mobileMenuOpen && (
                                <div className="md:hidden py-4 border-t border-gray-200">
                                    <div className="flex flex-col space-y-4">
                                        <a href="#Statistic" className="text-gray-700 hover:text-blue-600">Statistics</a>
                                        <a href="/Services/paitents-Services.html" className="text-gray-700 hover:text-blue-600 transition duration-300">Patients Registration</a>
                                        <a href="/Services/Briths Services.html" className="text-gray-700 hover:text-blue-600 transition duration-300">Birth Registration</a>
                                    </div>
                                </div>
                            )}
                        </div>
                    </header>

                    <section id="dashboard" className="mx-auto px-4 py-8">
                        <h1 className="text-3xl font-bold m-8 text-blue-800">Dashboard Overview</h1>

                        {/* Stats Cards */}
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8 m-8">
                            <div className="stat-card bg-white rounded-xl shadow-lg p-6 text-center">
                                <h2 className="text-gray-500 font-semibold">Total Patients</h2>
                                <p className="text-4xl font-bold text-blue-700 mt-2">{totalPatients}</p>
                                <p className="text-sm text-gray-500 mt-1">Registered in system</p>
                            </div>
                            
                            <div className="bg-white rounded-2xl shadow-lg p-6 text-center">
                                <h2 className="text-gray-500 font-semibold">Birth Records</h2>
                                <p className="text-4xl font-bold text-green-600 mt-2">{totalBirths}</p>
                                <p className="text-sm text-gray-500 mt-1">Births registered</p>
                            </div>
                            
                            <div className="bg-white rounded-2xl shadow-lg p-6 text-center">
                                <h2 className="text-gray-500 font-semibold">Male Patients</h2>
                                <p className="text-4xl font-bold text-indigo-600 mt-2">{malePatients}</p>
                                <p className="text-sm text-gray-500 mt-1">{malePercent}% of total</p>
                            </div>
                            
                            <div className="bg-white rounded-2xl shadow-lg p-6 text-center">
                                <h2 className="text-gray-500 font-semibold">Female Patients</h2>
                                <p className="text-4xl font-bold text-pink-600 mt-2">{femalePatients}</p>
                                <p className="text-sm text-gray-500 mt-1">{femalePercent}% of total</p>
                            </div>
                        </div>

                        {/* Recent Activity */}
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-8 m-8">
                            <div className="bg-white rounded-2xl shadow-lg p-6">
                                <div className="flex justify-between items-center mb-4">
                                    <h2 className="text-xl font-semibold text-gray-800">Recent Patients</h2>
                                    <span className="bg-blue-100 text-blue-800 text-sm px-3 py-1 rounded-full">{recentPatients.length}</span>
                                </div>
                                <div className="space-y-3 max-h-80 overflow-y-auto">
                                    {recentPatients.length === 0 ? (
                                        <div className="text-center text-gray-500 py-8">
                                            <i className="fas fa-users text-4xl mb-2 opacity-50"></i>
                                            <p>No patients registered yet</p>
                                        </div>
                                    ) : (
                                        recentPatients.map(patient => (
                                            <div key={patient.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-blue-50 transition duration-200">
                                                <div className="flex items-center">
                                                    <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center mr-3">
                                                        <i className="fas fa-user text-blue-600"></i>
                                                    </div>
                                                    <div>
                                                        <p className="font-semibold text-gray-800">{patient.name || patient.Name || 'Unknown'}</p>
                                                        <p className="text-sm text-gray-600">{patient.age || patient.Age || 'Unknown'} years • {patient.gender || patient.Gender || 'Unknown'}</p>
                                                    </div>
                                                </div>
                                                <span className="text-xs text-gray-500">{formatDate(patient.createdAt)}</span>
                                            </div>
                                        ))
                                    )}
                                </div>
                            </div>
                            
                            <div className="bg-white rounded-2xl shadow-lg p-6">
                                <div className="flex justify-between items-center mb-4">
                                    <h2 className="text-xl font-semibold text-gray-800">Recent Births</h2>
                                    <span className="bg-green-100 text-green-800 text-sm px-3 py-1 rounded-full">{recentBirths.length}</span>
                                </div>
                                <div className="space-y-3 max-h-80 overflow-y-auto">
                                    {recentBirths.length === 0 ? (
                                        <div className="text-center text-gray-500 py-8">
                                            <i className="fas fa-baby text-4xl mb-2 opacity-50"></i>
                                            <p>No births registered yet</p>
                                        </div>
                                    ) : (
                                        recentBirths.map(birth => (
                                            <div key={birth.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-green-50 transition duration-200">
                                                <div className="flex items-center">
                                                    <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center mr-3">
                                                        <i className="fas fa-baby text-green-600"></i>
                                                    </div>
                                                    <div>
                                                        <p className="font-semibold text-gray-800">{birth.BabyName || birth.babyName || 'Unknown'}</p>
                                                        <p className="text-sm text-gray-600">{birth.Gender || birth.gender || 'Unknown'} • Mother: {birth.MotherName || birth.motherName || 'Unknown'}</p>
                                                    </div>
                                                </div>
                                                <span className="text-xs text-gray-500">{formatDate(birth.createdAt)}</span>
                                            </div>
                                        ))
                                    )}
                                </div>
                            </div>
                        </div>

                        {/* Charts */}
                        <div id="Statistic" className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-8 m-8">
                            <div className="bg-white rounded-2xl shadow-lg p-6">
                                <h2 className="text-lg font-semibold mb-4 text-gray-800">Patients by Gender</h2>
                                <Doughnut data={genderChartData} />
                            </div>
                            
                            <div className="bg-white rounded-2xl shadow-lg p-6">
                                <h2 className="text-lg font-semibold mb-4 text-gray-800">Birth Gender Ratio</h2>
                                <Pie data={birthChartData} />
                            </div>
                            
                            <div className="bg-white rounded-2xl shadow-lg p-6 lg:col-span-2">
                                <h2 className="text-lg font-semibold mb-4 text-gray-800">Monthly Registration Trends</h2>
                                <Line data={trendChartData} />
                            </div>
                        </div>
                    </section>
                </main>
            </div>
        </div>
    );
};

export default Dashboard;