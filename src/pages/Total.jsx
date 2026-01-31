import React, { useState, useEffect } from 'react';
import { initializeApp } from 'firebase/app';
import { getAuth, onAuthStateChanged, signOut } from 'firebase/auth';
import { getDatabase, ref, onValue, get } from 'firebase/database';
import { Link, useNavigate } from 'react-router-dom';

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDt4vs7S3nckO8xxfp1_axHZ76J0cz2qdg",
  authDomain: "mahamahospital.firebasestorage.app",
  databaseURL: "https://mahamahospital-default-rtdb.firebaseio.com",
  projectId: "mahamahospital",
  storageBucket: "mahamahospital.firebasestorage.app",
  messagingSenderId: "256305692002",
  appId: "1:256305692002:web:cfef26992264204be9803b"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const database = getDatabase(app);

const TotalAppointments = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [allAppointments, setAllAppointments] = useState([]);
  const [todayAppointments, setTodayAppointments] = useState([]);
  const [departmentStats, setDepartmentStats] = useState({});
  const [notification, setNotification] = useState(null);

  // Show notification
  const showNotification = (message, type = 'info') => {
    setNotification({ message, type });
    setTimeout(() => setNotification(null), 5000);
  };

  // Load all appointments from different departments
  const loadAllAppointments = async () => {
    try {
      const [
        maternityData,
        ncdData,
        disabilityData,
        vaccinationData,
        emergencyData,
        mentalHealthData
      ] = await Promise.all([
        loadDepartmentData('maternity-appointments'),
        loadDepartmentData('appointments', 'NCD'),
        loadDepartmentData('appointments', 'Disability'),
        loadDepartmentData('vaccinationRegistrations'),
        loadDepartmentData('emergencies'),
        loadDepartmentData('mentalHealthContacts')
      ]);

      const appointments = [
        ...maternityData.map(app => ({...app, department: 'Maternity'})),
        ...ncdData.map(app => ({...app, department: 'NCD'})),
        ...disabilityData.map(app => ({...app, department: 'Disability'})),
        ...vaccinationData.map(app => ({...app, department: 'Vaccination'})),
        ...emergencyData.map(app => ({...app, department: 'Emergency'})),
        ...mentalHealthData.map(app => ({...app, department: 'Mental Health'}))
      ];

      setAllAppointments(appointments);
      updateDashboardData(appointments);
    } catch (error) {
      console.error('Error loading appointments:', error);
      showNotification('Error loading appointment data', 'error');
    }
  };

  // Load data from a specific department
  const loadDepartmentData = async (path, department = null) => {
    try {
      const snapshot = await get(ref(database, path));
      const data = snapshot.val();

      if (!data) return [];

      return Object.entries(data).map(([id, item]) => ({
        id,
        ...item,
        department: department || path
      }));
    } catch (error) {
      console.error(`Error loading ${path}:`, error);
      return [];
    }
  };

  // Update dashboard data
  const updateDashboardData = (appointments) => {
    // Update today's appointments
    const today = new Date().toISOString().split('T')[0];
    const todayApps = appointments.filter(app => {
      const appDate = app.appointmentDate || app.preferredDate || app.createdAt;
      return appDate && appDate.toString().includes(today);
    });
    setTodayAppointments(todayApps);

    // Update department stats
    const deptCounts = {};
    appointments.forEach(app => {
      const dept = app.department;
      deptCounts[dept] = (deptCounts[dept] || 0) + 1;
    });
    setDepartmentStats(deptCounts);
  };

  // Calculate statistics
  const getTotalStats = () => {
    const total = allAppointments.length;
    const today = new Date().toISOString().split('T')[0];
    const todayCount = allAppointments.filter(app => {
      const appDate = app.appointmentDate || app.preferredDate || app.createdAt;
      return appDate && appDate.toString().includes(today);
    }).length;

    const pending = allAppointments.filter(app =>
      app.status === 'pending' || app.status === 'new'
    ).length;

    const completed = allAppointments.filter(app =>
      app.status === 'completed' || app.status === 'resolved'
    ).length;

    return { total, todayCount, pending, completed };
  };

  // Get monthly trends
  const getMonthlyTrends = () => {
    const now = new Date();
    const currentMonth = now.getMonth();
    const currentYear = now.getFullYear();
    const lastMonth = currentMonth === 0 ? 11 : currentMonth - 1;
    const lastMonthYear = currentMonth === 0 ? currentYear - 1 : currentYear;

    const thisMonthApps = allAppointments.filter(app => {
      const appDate = new Date(app.createdAt || app.appointmentDate || now);
      return appDate.getMonth() === currentMonth &&
             appDate.getFullYear() === currentYear;
    });

    const lastMonthApps = allAppointments.filter(app => {
      const appDate = new Date(app.createdAt || app.appointmentDate || now);
      return appDate.getMonth() === lastMonth &&
             appDate.getFullYear() === lastMonthYear;
    });

    const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
    const avgDaily = Math.round(thisMonthApps.length / daysInMonth);

    return {
      thisMonth: thisMonthApps.length,
      lastMonth: lastMonthApps.length,
      avgDaily
    };
  };

  // Get most active department
  const getMostActiveDepartment = () => {
    let mostActive = '-';
    let maxCount = 0;
    Object.entries(departmentStats).forEach(([dept, count]) => {
      if (count > maxCount) {
        maxCount = count;
        mostActive = dept;
      }
    });
    return mostActive;
  };

  // Export all appointments
  const exportAllAppointments = () => {
    if (allAppointments.length === 0) {
      showNotification('No data to export', 'error');
      return;
    }

    try {
      const headers = ['Department', 'Patient Name', 'Contact', 'Appointment Date', 'Status', 'Created At'];
      const csvContent = [
        headers.join(','),
        ...allAppointments.map(app => [
          app.department,
          app.patientName || app.fullName || app.firstName + ' ' + app.lastName || 'Unknown',
          app.phone || app.contact || 'Not provided',
          app.appointmentDate || app.preferredDate || 'N/A',
          app.status || 'pending',
          app.createdAt ? new Date(app.createdAt).toLocaleDateString() : 'N/A'
        ].map(field => `"${field}"`).join(','))
      ].join('\n');

      const blob = new Blob([csvContent], { type: 'text/csv' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `all-appointments-${new Date().toISOString().split('T')[0]}.csv`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);

      showNotification('All appointments exported successfully!', 'success');
    } catch (error) {
      console.error('Error exporting appointments:', error);
      showNotification('Error exporting data', 'error');
    }
  };

  // Logout functionality
  const handleLogout = async () => {
    try {
      await signOut(auth);
      navigate('/login');
    } catch (error) {
      console.error('Logout error:', error);
      showNotification('Error during logout', 'error');
    }
  };

  // Setup real-time listeners
  useEffect(() => {
    const paths = [
      'maternity-appointments',
      'appointments',
      'vaccinationRegistrations',
      'emergencies',
      'mentalHealthContacts'
    ];

    const listeners = paths.map(path => {
      const dbRef = ref(database, path);
      return onValue(dbRef, () => {
        loadAllAppointments();
      });
    });

    return () => {
      listeners.forEach(unsubscribe => unsubscribe());
    };
  }, []);

  // Initialize component
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (!user) {
        navigate('/login');
        return;
      }

      setLoading(false);
      loadAllAppointments();
    });

    return () => unsubscribe();
  }, [navigate]);

  if (loading) {
    return (
      <div className="fixed inset-0 bg-white flex items-center justify-center z-50">
        <div className="text-center">
          <div className="loading-spinner"></div>
          <p className="mt-4 text-gray-600">Loading total appointments dashboard...</p>
        </div>
      </div>
    );
  }

  const stats = getTotalStats();
  const trends = getMonthlyTrends();
  const mostActiveDept = getMostActiveDepartment();

  return (
    <div className="bg-gray-50 min-h-screen font-serif">
      {/* Notification */}
      {notification && (
        <div className={`fixed top-4 right-4 p-4 rounded-lg shadow-lg z-50 ${
          notification.type === 'success' ? 'bg-green-500 text-white' :
          notification.type === 'error' ? 'bg-red-500 text-white' :
          'bg-blue-500 text-white'
        }`}>
          {notification.message}
        </div>
      )}

      {/* Fixed Sidebar */}
      <aside className="fixed left-0 top-0 h-screen w-56 z-40 bg-gradient-to-b from-blue-500 to-blue-600 text-white flex flex-col shadow-xl">
        <div className="text-xl font-bold p-6 border-b border-blue-400 bg-blue-600">Hospital Admin</div>

        <nav className="flex-1 p-5 space-y-3">
          <button
            onClick={handleLogout}
            className="flex items-center p-3 rounded-xl hover:bg-blue-400 transition-all duration-200 text-red-100 bg-blue-700/30 w-full text-left"
          >
            <i className="fa-solid fa-right-from-bracket text-xl mr-3"></i>
            <span className="font-medium">Logout</span>
          </button>

          <Link to="/dashboard" className="flex items-center p-3 rounded-xl hover:bg-blue-400 transition-all duration-200 bg-white/10">
            <i className="fa-solid fa-user text-yellow-400 text-2xl mr-3"></i>
            <span className="font-medium">Birth & Patient</span>
          </Link>

          <Link to="/dashboard/maternity" className="flex items-center p-3 rounded-xl hover:bg-blue-400 transition-all duration-200 bg-white/10">
            <i className="fa-solid fa-user-injured text-yellow-400 text-2xl mr-3"></i>
            <span className="font-medium">Maternity</span>
          </Link>

          <Link to="/dashboard/emergency" className="flex items-center p-3 rounded-xl hover:bg-blue-400 transition-all duration-200 bg-white/10">
            <i className="fas fa-truck-medical mr-2 text-yellow-400 text-2xl"></i>
            <span className="font-medium">Emergency</span>
          </Link>

          <Link to="/dashboard/vaccination" className="flex items-center p-3 rounded-xl hover:bg-blue-400 transition-all duration-200 bg-white/10">
            <i className="fas fa-syringe text-yellow-400 text-2xl mr-3"></i>
            <span className="font-medium">Vaccination</span>
          </Link>

          <Link to="/dashboard/mental-health" className="flex items-center p-3 rounded-xl hover:bg-blue-400 transition-all duration-200 bg-white/10">
            <i className="fa-solid fa-head-side-brain mr-2 text-yellow-400 text-2xl"></i>
            <span className="font-medium">Mental Health</span>
          </Link>

          <Link to="/dashboard/ncd" className="flex items-center p-3 rounded-xl hover:bg-blue-400 transition-all duration-200 bg-white/10">
            <i className="fas fa-heartbeat mr-2 text-yellow-400 text-2xl"></i>
            <span className="font-medium">NCD</span>
          </Link>

          <Link to="/dashboard/disability" className="flex items-center p-3 rounded-xl hover:bg-blue-400 transition-all duration-200 bg-white/10">
            <i className="fa-solid fa-wheelchair text-yellow-400 text-2xl mr-3"></i>
            <span className="font-medium">Disability</span>
          </Link>

          <Link to="/dashboard/complain" className="flex items-center p-3 rounded-xl hover:bg-blue-400 transition-all duration-200 bg-white/10">
            <i className="fas fa-headset mr-2 text-yellow-400 text-2xl"></i>
            <span className="font-medium">Complain</span>
          </Link>
        </nav>

        <div className="p-4 border-t border-blue-400 bg-blue-600/50 rounded-br-3xl">
          <div className="text-sm text-blue-100 text-center">
            <i className="fa-solid fa-shield-heart mr-2"></i>
            Secure System
          </div>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="ml-56 min-h-screen">
        {/* Header */}
        <header className="bg-white shadow-md sticky top-0 z-30">
          <div className="container mx-auto px-4">
            <div className="flex justify-between items-center py-4">
              <div className="flex items-center">
                <span className="text-2xl font-bold text-blue-600">
                  <Link to="/">🏥 MCH</Link> Total Appointments Dashboard
                </span>
              </div>

              <nav className="hidden md:flex items-center space-x-6">
                <a href="#today" className="text-gray-700 hover:text-blue-600 transition duration-300">Today</a>
                <a href="#departments" className="text-gray-700 hover:text-blue-600 transition duration-300">By Department</a>
                <a href="#monthly" className="text-gray-700 hover:text-blue-600 transition duration-300">Monthly</a>
              </nav>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main className="container mx-auto px-4 py-8">
          {/* Total Statistics */}
          <section className="mb-12">
            <h2 className="text-3xl font-bold text-gray-800 mb-6">Total Appointments Overview</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              <div className="stat-card bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-xl shadow-lg p-6 text-center">
                <div className="text-3xl font-bold mb-2">{stats.total}</div>
                <div className="text-blue-100">Total Appointments</div>
                <div className="text-sm text-blue-200 mt-2">All Departments</div>
              </div>

              <div className="stat-card bg-gradient-to-r from-green-500 to-green-600 text-white rounded-xl shadow-lg p-6 text-center">
                <div className="text-3xl font-bold mb-2">{stats.todayCount}</div>
                <div className="text-green-100">Today's Appointments</div>
                <div className="text-sm text-green-200 mt-2">
                  {new Date().toLocaleDateString('en-US', {
                    weekday: 'long',
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                  })}
                </div>
              </div>

              <div className="stat-card bg-gradient-to-r from-purple-500 to-purple-600 text-white rounded-xl shadow-lg p-6 text-center">
                <div className="text-3xl font-bold mb-2">{stats.pending}</div>
                <div className="text-purple-100">Pending Appointments</div>
                <div className="text-sm text-purple-200 mt-2">
                  {stats.total > 0 ? `${Math.round((stats.pending / stats.total) * 100)}% of total` : '0% of total'}
                </div>
              </div>

              <div className="stat-card bg-gradient-to-r from-orange-500 to-orange-600 text-white rounded-xl shadow-lg p-6 text-center">
                <div className="text-3xl font-bold mb-2">{stats.completed}</div>
                <div className="text-orange-100">Completed Appointments</div>
                <div className="text-sm text-orange-200 mt-2">
                  {stats.total > 0 ? `${Math.round((stats.completed / stats.total) * 100)}% of total` : '0% of total'}
                </div>
              </div>
            </div>
          </section>

          {/* Department Breakdown */}
          <section id="departments" className="mb-12">
            <h2 className="text-3xl font-bold text-gray-800 mb-6">Appointments by Department</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              <div className="stat-card bg-white rounded-xl shadow-lg p-6 text-center">
                <i className="fas fa-user-injured text-3xl text-pink-500 mb-3"></i>
                <div className="text-2xl font-bold text-gray-800 mb-1">{departmentStats.Maternity || 0}</div>
                <div className="text-gray-600">Maternity</div>
                <div className="text-sm text-gray-500 mt-2">
                  {stats.total > 0 ? `${Math.round(((departmentStats.Maternity || 0) / stats.total) * 100)}% of total` : '0% of total'}
                </div>
              </div>

              <div className="stat-card bg-white rounded-xl shadow-lg p-6 text-center">
                <i className="fas fa-heartbeat text-3xl text-red-500 mb-3"></i>
                <div className="text-2xl font-bold text-gray-800 mb-1">{departmentStats.NCD || 0}</div>
                <div className="text-gray-600">NCD Care</div>
                <div className="text-sm text-gray-500 mt-2">
                  {stats.total > 0 ? `${Math.round(((departmentStats.NCD || 0) / stats.total) * 100)}% of total` : '0% of total'}
                </div>
              </div>

              <div className="stat-card bg-white rounded-xl shadow-lg p-6 text-center">
                <i className="fas fa-wheelchair text-3xl text-blue-500 mb-3"></i>
                <div className="text-2xl font-bold text-gray-800 mb-1">{departmentStats.Disability || 0}</div>
                <div className="text-gray-600">Disability Care</div>
                <div className="text-sm text-gray-500 mt-2">
                  {stats.total > 0 ? `${Math.round(((departmentStats.Disability || 0) / stats.total) * 100)}% of total` : '0% of total'}
                </div>
              </div>

              <div className="stat-card bg-white rounded-xl shadow-lg p-6 text-center">
                <i className="fas fa-syringe text-3xl text-green-500 mb-3"></i>
                <div className="text-2xl font-bold text-gray-800 mb-1">{departmentStats.Vaccination || 0}</div>
                <div className="text-gray-600">Vaccination</div>
                <div className="text-sm text-gray-500 mt-2">
                  {stats.total > 0 ? `${Math.round(((departmentStats.Vaccination || 0) / stats.total) * 100)}% of total` : '0% of total'}
                </div>
              </div>
            </div>
          </section>

          {/* Today's Appointments */}
          <section id="today" className="mb-12">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
              <h2 className="text-3xl font-bold text-gray-800">Today's Appointments</h2>
              <button
                onClick={loadAllAppointments}
                className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition duration-300"
              >
                <i className="fas fa-sync-alt mr-2"></i>Refresh Data
              </button>
            </div>

            <div className="bg-white rounded-xl shadow-lg overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full border-collapse">
                  <thead>
                    <tr className="bg-gray-100">
                      <th className="border-b border-gray-300 px-4 py-3 text-left font-semibold text-gray-700">Department</th>
                      <th className="border-b border-gray-300 px-4 py-3 text-left font-semibold text-gray-700">Patient Name</th>
                      <th className="border-b border-gray-300 px-4 py-3 text-left font-semibold text-gray-700">Time</th>
                      <th className="border-b border-gray-300 px-4 py-3 text-left font-semibold text-gray-700">Contact</th>
                      <th className="border-b border-gray-300 px-4 py-3 text-left font-semibold text-gray-700">Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {todayAppointments.length === 0 ? (
                      <tr>
                        <td colSpan="5" className="text-center py-8 text-gray-500">
                          <i className="fas fa-calendar-check text-4xl mb-4"></i>
                          <p>No appointments scheduled for today.</p>
                        </td>
                      </tr>
                    ) : (
                      todayAppointments.slice(0, 10).map((app, index) => (
                        <tr key={index} className="border-b border-gray-200 hover:bg-gray-50">
                          <td className="px-4 py-3">
                            <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-xs">
                              {app.department}
                            </span>
                          </td>
                          <td className="px-4 py-3">
                            {app.patientName || app.fullName || app.firstName + ' ' + app.lastName || 'Unknown'}
                          </td>
                          <td className="px-4 py-3">{app.appointmentTime || app.preferredTime || 'Not specified'}</td>
                          <td className="px-4 py-3">{app.phone || app.contact || 'Not provided'}</td>
                          <td className="px-4 py-3">
                            <span className={`px-2 py-1 rounded-full text-xs ${
                              app.status === 'completed' ? 'bg-green-100 text-green-800' :
                              app.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                              'bg-gray-100 text-gray-800'
                            }`}>
                              {app.status || 'pending'}
                            </span>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </section>

          {/* Monthly Trends */}
          <section id="monthly" className="mb-12">
            <h2 className="text-3xl font-bold text-gray-800 mb-6">Monthly Appointment Trends</h2>

            <div className="bg-white rounded-xl shadow-lg p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <div className="text-center">
                  <div className="text-2xl font-bold text-blue-600">{trends.thisMonth}</div>
                  <div className="text-gray-600">This Month</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-green-600">{trends.lastMonth}</div>
                  <div className="text-gray-600">Last Month</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-purple-600">{trends.avgDaily}</div>
                  <div className="text-gray-600">Average Daily</div>
                </div>
              </div>
            </div>
          </section>
        </main>

        {/* Footer */}
        <footer className="bg-gray-800 text-white py-8 mt-12">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div>
                <h3 className="text-xl font-bold mb-4">MahamaCare Hospital</h3>
                <p className="text-gray-400">Comprehensive healthcare management system.</p>
              </div>

              <div>
                <h4 className="text-lg font-semibold mb-4">Quick Stats</h4>
                <div className="text-gray-400 space-y-2">
                  <p>Total Appointments: <span className="font-bold">{stats.total}</span></p>
                  <p>Today: <span className="font-bold">{stats.todayCount}</span></p>
                  <p>Most Active: <span className="font-bold">{mostActiveDept}</span></p>
                </div>
              </div>

              <div>
                <h4 className="text-lg font-semibold mb-4">Export</h4>
                <button
                  onClick={exportAllAppointments}
                  className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition duration-300 w-full"
                >
                  <i className="fas fa-download mr-2"></i>Export All Data
                </button>
              </div>
            </div>

            <div className="border-t border-gray-700 mt-8 pt-8 text-center text-gray-500">
              <p>&copy; 2025 MahamaCare Hospital. All rights reserved.</p>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
};

export default Total;