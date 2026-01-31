import React, { useState, useEffect } from 'react';
import { initializeApp } from 'firebase/app';
import { getAuth, onAuthStateChanged, signOut } from 'firebase/auth';
import { getDatabase, ref, onValue, set, push } from 'firebase/database';

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

const Pharmacy = () => {
    const [user, setUser] = useState(null);
    const [medicines, setMedicines] = useState([]);
    const [sidebarOpen, setSidebarOpen] = useState(false);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (user) {
                setUser(user);
            } else {
                setUser(null);
            }
        });

        // Load medicines from Firebase
        const medicinesRef = ref(database, 'medicines');
        onValue(medicinesRef, (snapshot) => {
            const data = snapshot.val();
            if (data) {
                const medicinesList = Object.keys(data).map(key => ({
                    id: key,
                    ...data[key]
                }));
                setMedicines(medicinesList);
            }
        });

        return () => unsubscribe();
    }, []);

    const handleLogout = async () => {
        try {
            await signOut(auth);
        } catch (error) {
            console.error('Logout error:', error);
        }
    };

    return (
        <div className="flex min-h-screen bg-gray-100">
            {/* Sidebar */}
            <div className={`fixed inset-y-0 left-0 z-50 w-64 bg-gradient-to-b from-blue-600 to-blue-800 transform ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} transition-transform duration-300 ease-in-out md:translate-x-0 md:static md:inset-0`}>
                <div className="flex items-center justify-center h-16 bg-blue-700">
                    <h1 className="text-white text-xl font-bold">Pharmacy System</h1>
                </div>
                <nav className="mt-8">
                    <a href="#" className="nav-item active flex items-center px-6 py-3 text-white">
                        <i className="fas fa-pills mr-3"></i> Medicines
                    </a>
                    <a href="#" className="nav-item flex items-center px-6 py-3 text-white">
                        <i className="fas fa-shopping-cart mr-3"></i> Orders
                    </a>
                    <a href="#" className="nav-item flex items-center px-6 py-3 text-white">
                        <i className="fas fa-chart-bar mr-3"></i> Reports
                    </a>
                    <a href="#" className="nav-item flex items-center px-6 py-3 text-white">
                        <i className="fas fa-cog mr-3"></i> Settings
                    </a>
                </nav>
                <div className="absolute bottom-0 w-full p-4">
                    <button
                        onClick={handleLogout}
                        className="w-full bg-red-600 text-white py-2 rounded hover:bg-red-700 transition duration-300"
                    >
                        <i className="fas fa-sign-out-alt mr-2"></i> Logout
                    </button>
                </div>
            </div>

            {/* Main Content */}
            <div className="flex-1 md:ml-64">
                {/* Header */}
                <header className="bg-white shadow-md px-6 py-4 flex justify-between items-center">
                    <button
                        onClick={() => setSidebarOpen(!sidebarOpen)}
                        className="md:hidden text-gray-600 focus:outline-none"
                    >
                        <i className="fas fa-bars"></i>
                    </button>
                    <h2 className="text-2xl font-bold text-gray-800">Pharmacy Dashboard</h2>
                    <div className="text-gray-600">
                        Welcome, {user?.email}
                    </div>
                </header>

                {/* Content */}
                <main className="p-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                        <div className="bg-white p-6 rounded-lg shadow-md">
                            <div className="flex items-center">
                                <div className="p-3 bg-blue-100 rounded-full">
                                    <i className="fas fa-pills text-blue-600 text-2xl"></i>
                                </div>
                                <div className="ml-4">
                                    <h3 className="text-lg font-semibold text-gray-800">Total Medicines</h3>
                                    <p className="text-2xl font-bold text-blue-600">{medicines.length}</p>
                                </div>
                            </div>
                        </div>

                        <div className="bg-white p-6 rounded-lg shadow-md">
                            <div className="flex items-center">
                                <div className="p-3 bg-green-100 rounded-full">
                                    <i className="fas fa-check-circle text-green-600 text-2xl"></i>
                                </div>
                                <div className="ml-4">
                                    <h3 className="text-lg font-semibold text-gray-800">In Stock</h3>
                                    <p className="text-2xl font-bold text-green-600">
                                        {medicines.filter(m => m.quantity > 0).length}
                                    </p>
                                </div>
                            </div>
                        </div>

                        <div className="bg-white p-6 rounded-lg shadow-md">
                            <div className="flex items-center">
                                <div className="p-3 bg-red-100 rounded-full">
                                    <i className="fas fa-exclamation-triangle text-red-600 text-2xl"></i>
                                </div>
                                <div className="ml-4">
                                    <h3 className="text-lg font-semibold text-gray-800">Low Stock</h3>
                                    <p className="text-2xl font-bold text-red-600">
                                        {medicines.filter(m => m.quantity < 10).length}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Medicines Table */}
                    <div className="bg-white rounded-lg shadow-md">
                        <div className="px-6 py-4 border-b border-gray-200">
                            <h3 className="text-lg font-semibold text-gray-800">Medicines Inventory</h3>
                        </div>
                        <div className="overflow-x-auto">
                            <table className="w-full">
                                <thead className="bg-gray-50">
                                    <tr>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Quantity</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Expiry Date</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                                    </tr>
                                </thead>
                                <tbody className="bg-white divide-y divide-gray-200">
                                    {medicines.map((medicine) => (
                                        <tr key={medicine.id}>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                                {medicine.name}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                                {medicine.quantity}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                                {medicine.expiryDate}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                                                    medicine.quantity > 10 ? 'bg-green-100 text-green-800' :
                                                    medicine.quantity > 0 ? 'bg-yellow-100 text-yellow-800' :
                                                    'bg-red-100 text-red-800'
                                                }`}>
                                                    {medicine.quantity > 10 ? 'In Stock' :
                                                     medicine.quantity > 0 ? 'Low Stock' : 'Out of Stock'}
                                                </span>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </main>
            </div>
        </div>
    );
};

export default Pharmacy;