import React, { useState, useEffect } from 'react';
import { initializeApp } from 'firebase/app';
import { getDatabase, ref, push, set, onValue, remove, update } from 'firebase/database';
import { getAuth, onAuthStateChanged, signOut } from 'firebase/auth';

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDt4vs7S3nckO8xxfp1_axHZ76J0cz2qdg",
  authDomain: "mahamahospital.firebaseapp.com",
  databaseURL: "https://mahamahospital-default-rtdb.firebaseio.com",
  projectId: "mahamahospital",
  storageBucket: "mahamahospital.firebasestorage.app",
  messagingSenderId: "256305692002",
  appId: "1:256305692002:web:cfef26992264204be9803b"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const database = getDatabase(app);
const auth = getAuth(app);

const LabDashboard = () => {
  const [currentSection, setCurrentSection] = useState('dashboard');
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [tests, setTests] = useState([]);
  const [results, setResults] = useState([]);
  const [doctors, setDoctors] = useState([]);
  const [activities, setActivities] = useState([]);
  const [notification, setNotification] = useState(null);
  const [showAddTestModal, setShowAddTestModal] = useState(false);
  const [showAddResultModal, setShowAddResultModal] = useState(false);
  const [showAddDoctorModal, setShowAddDoctorModal] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [testFilter, setTestFilter] = useState('all');

  // Form states
  const [testForm, setTestForm] = useState({
    patientName: '',
    patientId: '',
    patientAge: '',
    testType: '',
    requestingDoctor: '',
    priority: 'normal',
    notes: ''
  });

  const [resultForm, setResultForm] = useState({
    testId: '',
    results: '',
    status: 'completed',
    labTechnician: '',
    isCritical: false,
    notes: ''
  });

  const [doctorForm, setDoctorForm] = useState({
    name: '',
    specialization: '',
    licenseNumber: '',
    shiftStart: '',
    shiftEnd: ''
  });

  useEffect(() => {
    // Check authentication
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
        loadData();
        setLoading(false);
      } else {
        window.location.href = '/login.html';
      }
    });

    return () => unsubscribe();
  }, []);

  const loadData = () => {
    // Load tests
    const testsRef = ref(database, 'lab/tests');
    onValue(testsRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        const testsArray = Object.entries(data).map(([key, value]) => ({
          id: key,
          ...value
        }));
        setTests(testsArray);
      } else {
        setTests([]);
      }
    });

    // Load results
    const resultsRef = ref(database, 'lab/results');
    onValue(resultsRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        const resultsArray = Object.entries(data).map(([key, value]) => ({
          id: key,
          ...value
        }));
        setResults(resultsArray);
      } else {
        setResults([]);
      }
    });

    // Load doctors
    const doctorsRef = ref(database, 'lab/doctors');
    onValue(doctorsRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        const doctorsArray = Object.entries(data).map(([key, value]) => ({
          id: key,
          ...value
        }));
        setDoctors(doctorsArray);
      } else {
        setDoctors([]);
      }
    });

    // Load activities
    const activitiesRef = ref(database, 'lab/activities');
    onValue(activitiesRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        const activitiesArray = Object.entries(data).map(([key, value]) => ({
          id: key,
          ...value
        })).sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));
        setActivities(activitiesArray);
      } else {
        setActivities([]);
      }
    });
  };

  const showNotification = (message, type = 'info') => {
    setNotification({ message, type });
    setTimeout(() => setNotification(null), 5000);
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
      showNotification('Logged out successfully!', 'success');
      setTimeout(() => {
        window.location.href = '/login.html';
      }, 1500);
    } catch (error) {
      showNotification('Error during logout', 'error');
    }
  };

  const handleTestSubmit = async (e) => {
    e.preventDefault();
    try {
      const testsRef = ref(database, 'lab/tests');
      const newTestRef = push(testsRef);
      await set(newTestRef, {
        ...testForm,
        status: 'pending',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      });

      // Add activity
      const activitiesRef = ref(database, 'lab/activities');
      await push(activitiesRef).set({
        action: 'Test Added',
        details: `New test added for patient ${testForm.patientName}`,
        timestamp: new Date().toISOString()
      });

      showNotification('Test added successfully!', 'success');
      setShowAddTestModal(false);
      setTestForm({
        patientName: '',
        patientId: '',
        patientAge: '',
        testType: '',
        requestingDoctor: '',
        priority: 'normal',
        notes: ''
      });
    } catch (error) {
      showNotification('Error adding test', 'error');
    }
  };

  const handleResultSubmit = async (e) => {
    e.preventDefault();
    try {
      const resultsRef = ref(database, 'lab/results');
      const newResultRef = push(resultsRef);
      await set(newResultRef, {
        ...resultForm,
        createdAt: new Date().toISOString()
      });

      // Update test status
      if (resultForm.testId) {
        const testRef = ref(database, `lab/tests/${resultForm.testId}`);
        await update(testRef, {
          status: resultForm.status,
          updatedAt: new Date().toISOString()
        });
      }

      // Add activity
      const activitiesRef = ref(database, 'lab/activities');
      await push(activitiesRef).set({
        action: 'Result Added',
        details: `Test result added for test ID ${resultForm.testId}`,
        timestamp: new Date().toISOString()
      });

      showNotification('Result added successfully!', 'success');
      setShowAddResultModal(false);
      setResultForm({
        testId: '',
        results: '',
        status: 'completed',
        labTechnician: '',
        isCritical: false,
        notes: ''
      });
    } catch (error) {
      showNotification('Error adding result', 'error');
    }
  };

  const handleDoctorSubmit = async (e) => {
    e.preventDefault();
    try {
      const doctorsRef = ref(database, 'lab/doctors');
      const newDoctorRef = push(doctorsRef);
      await set(newDoctorRef, {
        ...doctorForm,
        status: 'Active',
        createdAt: new Date().toISOString()
      });

      // Add activity
      const activitiesRef = ref(database, 'lab/activities');
      await push(activitiesRef).set({
        action: 'Doctor Added',
        details: `New doctor ${doctorForm.name} added`,
        timestamp: new Date().toISOString()
      });

      showNotification('Doctor added successfully!', 'success');
      setShowAddDoctorModal(false);
      setDoctorForm({
        name: '',
        specialization: '',
        licenseNumber: '',
        shiftStart: '',
        shiftEnd: ''
      });
    } catch (error) {
      showNotification('Error adding doctor', 'error');
    }
  };

  const getStatusClass = (status) => {
    switch(status) {
      case 'active': return 'status-active';
      case 'pending': return 'status-pending';
      case 'critical': return 'status-critical';
      case 'completed': return 'status-completed';
      default: return '';
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    return new Date(dateString).toLocaleDateString();
  };

  const filteredTests = tests.filter(test => {
    const matchesSearch = test.patientName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         test.patientId?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = testFilter === 'all' || test.status === testFilter;
    return matchesSearch && matchesFilter;
  });

  const stats = {
    totalTests: tests.length,
    criticalResults: results.filter(r => r.status === 'critical').length,
    completedToday: tests.filter(t => t.status === 'completed' && 
      new Date(t.updatedAt).toDateString() === new Date().toDateString()).length,
    activeDoctors: doctors.filter(d => d.status === 'Active').length
  };

  if (loading) {
    return (
      <div className="fixed inset-0 bg-white flex justify-center items-center z-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading lab dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gray-200 font-serif min-h-screen">
      {/* Fixed Sidebar */}
      <aside className="fixed left-0 top-0 h-screen w-56 bg-gradient-to-b from-blue-600 to-blue-800 text-white flex flex-col shadow-lg">
        <div className="text-xl font-bold p-6 border-b border-blue-400 bg-blue-700 flex items-center">
          <i className="fas fa-flask mr-3 text-yellow-400"></i>
          Lab Admin
        </div>

        <nav className="flex-1 p-5 space-y-3">
          <button
            onClick={() => setCurrentSection('dashboard')}
            className={`nav-item w-full text-left p-3 rounded-xl transition-all duration-200 ${
              currentSection === 'dashboard' ? 'bg-white/20 border-r-4 border-yellow-400' : 'hover:bg-white/10'
            }`}
          >
            <i className="fas fa-tachometer-alt text-yellow-400 text-xl mr-3"></i>
            <span className="font-medium">Dashboard</span>
          </button>

          <button
            onClick={() => setCurrentSection('results')}
            className={`nav-item w-full text-left p-3 rounded-xl transition-all duration-200 ${
              currentSection === 'results' ? 'bg-white/20 border-r-4 border-yellow-400' : 'hover:bg-white/10'
            }`}
          >
            <i className="fas fa-file-medical-alt text-yellow-400 text-xl mr-3"></i>
            <span className="font-medium">Lab Results</span>
          </button>

          <button
            onClick={() => setCurrentSection('doctors')}
            className={`nav-item w-full text-left p-3 rounded-xl transition-all duration-200 ${
              currentSection === 'doctors' ? 'bg-white/20 border-r-4 border-yellow-400' : 'hover:bg-white/10'
            }`}
          >
            <i className="fas fa-user-md text-yellow-400 text-xl mr-3"></i>
            <span className="font-medium">Doctors</span>
          </button>

          <button
            onClick={() => setCurrentSection('reports')}
            className={`nav-item w-full text-left p-3 rounded-xl transition-all duration-200 ${
              currentSection === 'reports' ? 'bg-white/20 border-r-4 border-yellow-400' : 'hover:bg-white/10'
            }`}
          >
            <i className="fas fa-chart-bar text-yellow-400 text-xl mr-3"></i>
            <span className="font-medium">Reports</span>
          </button>

          <div className="border-t border-blue-400 pt-3">
            <button
              onClick={() => setShowAddTestModal(true)}
              className="w-full nav-item text-left p-3 rounded-xl hover:bg-white/10 transition-all duration-200 mb-2"
            >
              <i className="fas fa-vial text-yellow-400 text-xl mr-3"></i>
              <span className="font-medium">Add Test</span>
            </button>

            <button
              onClick={() => setShowAddResultModal(true)}
              className="w-full nav-item text-left p-3 rounded-xl hover:bg-white/10 transition-all duration-200 mb-2"
            >
              <i className="fas fa-microscope text-yellow-400 text-xl mr-3"></i>
              <span className="font-medium">New Result</span>
            </button>

            <button
              onClick={() => setShowAddDoctorModal(true)}
              className="w-full nav-item text-left p-3 rounded-xl hover:bg-white/10 transition-all duration-200"
            >
              <i className="fas fa-user-md text-yellow-400 text-xl mr-3"></i>
              <span className="font-medium">Add Doctor</span>
            </button>
          </div>
        </nav>

        <div className="p-4 border-t border-blue-400 bg-blue-700/50">
          <div className="text-sm text-blue-100 text-center">
            <i className="fas fa-shield-alt mr-2"></i>
            Secure Lab System
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <div className="ml-56 min-h-screen bg-gray-100">
        {/* Top Header */}
        <header className="bg-white shadow-md sticky top-0 z-30">
          <div className="px-6 py-4">
            <div className="flex justify-between items-center">
              <div className="flex items-center">
                <h1 className="text-2xl font-bold text-blue-600">🏥 Hospital Lab Management System</h1>
                <span className="ml-4 text-sm text-gray-600">
                  Logged in as: {user?.email}
                </span>
              </div>

              <div className="flex items-center space-x-4">
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Search tests, patients..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-64 px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                  <i className="fas fa-search absolute right-3 top-3 text-gray-400"></i>
                </div>

                <button
                  onClick={handleLogout}
                  className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
                >
                  <i className="fas fa-sign-out-alt mr-2"></i>Logout
                </button>
              </div>
            </div>
          </div>
        </header>

        {/* Dashboard Section */}
        {currentSection === 'dashboard' && (
          <div className="px-6 py-8">
            {/* Quick Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-8">
              <div className="bg-white rounded-lg shadow p-6">
                <div className="flex items-center">
                  <div className="rounded-full bg-blue-100 p-3 mr-4">
                    <i className="fas fa-vial text-blue-600 text-xl"></i>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Total Tests</p>
                    <h3 className="text-2xl font-bold">{stats.totalTests}</h3>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-lg shadow p-6">
                <div className="flex items-center">
                  <div className="rounded-full bg-red-100 p-3 mr-4">
                    <i className="fas fa-exclamation-triangle text-red-600 text-xl"></i>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Critical Results</p>
                    <h3 className="text-2xl font-bold text-red-600">{stats.criticalResults}</h3>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-lg shadow p-6">
                <div className="flex items-center">
                  <div className="rounded-full bg-green-100 p-3 mr-4">
                    <i className="fas fa-check-circle text-green-600 text-xl"></i>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Completed Today</p>
                    <h3 className="text-2xl font-bold">{stats.completedToday}</h3>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-lg shadow p-6">
                <div className="flex items-center">
                  <div className="rounded-full bg-purple-100 p-3 mr-4">
                    <i className="fas fa-user-md text-purple-600 text-xl"></i>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Active Doctors</p>
                    <h3 className="text-2xl font-bold">{stats.activeDoctors}</h3>
                  </div>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Main Content */}
              <div className="lg:col-span-2 space-y-6">
                {/* Recent Tests Table */}
                <div className="bg-white rounded-lg shadow">
                  <div className="px-6 py-4 border-b flex justify-between items-center">
                    <h2 className="text-xl font-bold">Recent Lab Tests</h2>
                    <div className="flex gap-2">
                      <select
                        value={testFilter}
                        onChange={(e) => setTestFilter(e.target.value)}
                        className="px-3 py-2 border rounded-lg text-sm"
                      >
                        <option value="all">All Tests</option>
                        <option value="pending">Pending</option>
                        <option value="completed">Completed</option>
                        <option value="critical">Critical</option>
                      </select>
                      <button
                        onClick={() => setShowAddTestModal(true)}
                        className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 text-sm"
                      >
                        <i className="fas fa-plus mr-2"></i>Add Test
                      </button>
                    </div>
                  </div>

                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead className="bg-gray-50">
                        <tr>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Test ID</th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Patient</th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Test Type</th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Date</th>
                        </tr>
                      </thead>
                      <tbody className="bg-white divide-y divide-gray-200">
                        {filteredTests.slice(0, 10).map((test) => (
                          <tr key={test.id}>
                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                              {test.id.slice(-8)}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                              {test.patientName}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                              {test.testType}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <span className={`status-badge ${getStatusClass(test.status)}`}>
                                {test.status}
                              </span>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                              {formatDate(test.createdAt)}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>

                {/* Recent Activity */}
                <div className="bg-white rounded-lg shadow">
                  <div className="px-6 py-4 border-b">
                    <h2 className="text-xl font-bold">Recent Activity</h2>
                  </div>
                  <div className="p-6">
                    <div className="space-y-3">
                      {activities.slice(0, 5).map((activity) => (
                        <div key={activity.id} className="flex items-start">
                          <div className="w-2 h-2 bg-blue-600 rounded-full mt-2 mr-3"></div>
                          <div>
                            <p className="text-sm font-medium">{activity.action}</p>
                            <p className="text-sm text-gray-600">{activity.details}</p>
                            <p className="text-xs text-gray-400">
                              {new Date(activity.timestamp).toLocaleString()}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Sidebar */}
              <div className="space-y-6">
                {/* Quick Actions */}
                <div className="bg-white rounded-lg shadow p-6">
                  <h3 className="text-lg font-bold mb-4">
                    <i className="fas fa-bolt mr-2"></i>Quick Actions
                  </h3>
                  <div className="grid grid-cols-2 gap-3">
                    <button
                      onClick={() => setShowAddTestModal(true)}
                      className="p-3 bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100 text-sm"
                    >
                      <i className="fas fa-vial mb-1 block text-lg"></i> Add Test
                    </button>
                    <button
                      onClick={() => setShowAddResultModal(true)}
                      className="p-3 bg-green-50 text-green-600 rounded-lg hover:bg-green-100 text-sm"
                    >
                      <i className="fas fa-microscope mb-1 block text-lg"></i> New Result
                    </button>
                    <button
                      onClick={() => setShowAddDoctorModal(true)}
                      className="p-3 bg-purple-50 text-purple-600 rounded-lg hover:bg-purple-100 text-sm"
                    >
                      <i className="fas fa-user-md mb-1 block text-lg"></i> Add Doctor
                    </button>
                    <button
                      onClick={() => setCurrentSection('reports')}
                      className="p-3 bg-yellow-50 text-yellow-600 rounded-lg hover:bg-yellow-100 text-sm"
                    >
                      <i className="fas fa-file-pdf mb-1 block text-lg"></i> Reports
                    </button>
                  </div>
                </div>

                {/* Critical Results */}
                <div className="bg-white rounded-lg shadow p-6">
                  <h3 className="text-lg font-bold mb-4 text-red-600">
                    <i className="fas fa-exclamation-circle mr-2"></i>Critical Results
                  </h3>
                  <div className="space-y-3">
                    {results.filter(r => r.status === 'critical').slice(0, 3).map((result) => (
                      <div key={result.id} className="p-3 bg-red-50 rounded-lg border-l-4 border-red-500">
                        <p className="text-sm font-medium">Test ID: {result.testId?.slice(-8)}</p>
                        <p className="text-sm text-gray-600">{result.results?.slice(0, 50)}...</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Results Section */}
        {currentSection === 'results' && (
          <div className="px-6 py-8">
            <div className="bg-white rounded-lg shadow">
              <div className="px-6 py-4 border-b flex justify-between items-center">
                <h2 className="text-xl font-bold">Lab Results</h2>
                <div className="flex gap-2">
                  <button
                    onClick={() => setShowAddResultModal(true)}
                    className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 text-sm"
                  >
                    <i className="fas fa-plus mr-2"></i>New Result
                  </button>
                </div>
              </div>
              <div className="p-6">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Test ID</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Results</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Date</th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {results.map((result) => (
                        <tr key={result.id}>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                            {result.testId?.slice(-8)}
                          </td>
                          <td className="px-6 py-4 text-sm text-gray-500 max-w-xs truncate">
                            {result.results}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span className={`status-badge ${getStatusClass(result.status)}`}>
                              {result.status}
                            </span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {formatDate(result.createdAt)}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Doctors Section */}
        {currentSection === 'doctors' && (
          <div className="px-6 py-8">
            <div className="bg-white rounded-lg shadow">
              <div className="px-6 py-4 border-b flex justify-between items-center">
                <h2 className="text-xl font-bold">Doctors Management</h2>
                <button
                  onClick={() => setShowAddDoctorModal(true)}
                  className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 text-sm"
                >
                  <i className="fas fa-plus mr-2"></i>Add Doctor
                </button>
              </div>
              <div className="p-6">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Name</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Specialization</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {doctors.map((doctor) => (
                        <tr key={doctor.id}>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                            {doctor.name}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {doctor.specialization}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span className={`status-badge ${getStatusClass(doctor.status?.toLowerCase())}`}>
                              {doctor.status}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Reports Section */}
        {currentSection === 'reports' && (
          <div className="px-6 py-8">
            <div className="bg-white rounded-lg shadow p-6">
              <h2 className="text-xl font-bold mb-6">Reports & Analytics</h2>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <div className="border rounded-lg p-4">
                  <h3 className="font-bold mb-4">Tests Report</h3>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span>Total Tests:</span>
                      <span className="font-bold">{stats.totalTests}</span>
                    </div>
                    <div className="flex justify-between text-red-600">
                      <span>Critical:</span>
                      <span className="font-bold">{stats.criticalResults}</span>
                    </div>
                    <div className="flex justify-between text-green-600">
                      <span>Completed:</span>
                      <span className="font-bold">{stats.completedToday}</span>
                    </div>
                  </div>
                </div>

                <div className="border rounded-lg p-4">
                  <h3 className="font-bold mb-4">Doctors Report</h3>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span>Total Doctors:</span>
                      <span className="font-bold">{stats.activeDoctors}</span>
                    </div>
                  </div>
                </div>

                <div className="border rounded-lg p-4">
                  <h3 className="font-bold mb-4">Activity Summary</h3>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span>Today's Activity:</span>
                      <span className="font-bold">{activities.length}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Modals */}
      {/* Add Test Modal */}
      {showAddTestModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-bold">Add New Test</h3>
              <button
                onClick={() => setShowAddTestModal(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                <i className="fas fa-times"></i>
              </button>
            </div>
            <form onSubmit={handleTestSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Patient Name *</label>
                <input
                  type="text"
                  value={testForm.patientName}
                  onChange={(e) => setTestForm({...testForm, patientName: e.target.value})}
                  className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Patient ID *</label>
                  <input
                    type="text"
                    value={testForm.patientId}
                    onChange={(e) => setTestForm({...testForm, patientId: e.target.value})}
                    className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Age</label>
                  <input
                    type="number"
                    value={testForm.patientAge}
                    onChange={(e) => setTestForm({...testForm, patientAge: e.target.value})}
                    className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Test Type *</label>
                <select
                  value={testForm.testType}
                  onChange={(e) => setTestForm({...testForm, testType: e.target.value})}
                  className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                  required
                >
                  <option value="">Select Test Type</option>
                  <option value="Complete Blood Count">Complete Blood Count</option>
                  <option value="Urinalysis">Urinalysis</option>
                  <option value="Blood Culture">Blood Culture</option>
                  <option value="Liver Function Test">Liver Function Test</option>
                  <option value="Glucose Test">Glucose Test</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Requesting Doctor *</label>
                <select
                  value={testForm.requestingDoctor}
                  onChange={(e) => setTestForm({...testForm, requestingDoctor: e.target.value})}
                  className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                  required
                >
                  <option value="">Select Doctor</option>
                  {doctors.map(doctor => (
                    <option key={doctor.id} value={doctor.id}>{doctor.name}</option>
                  ))}
                </select>
              </div>
              <div className="flex justify-end space-x-3 pt-4">
                <button
                  type="button"
                  onClick={() => setShowAddTestModal(false)}
                  className="px-4 py-2 border rounded-lg hover:bg-gray-100"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                >
                  Add Test
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Add Result Modal */}
      {showAddResultModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-bold">Add Test Result</h3>
              <button
                onClick={() => setShowAddResultModal(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                <i className="fas fa-times"></i>
              </button>
            </div>
            <form onSubmit={handleResultSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Test ID *</label>
                <select
                  value={resultForm.testId}
                  onChange={(e) => setResultForm({...resultForm, testId: e.target.value})}
                  className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                  required
                >
                  <option value="">Select Test</option>
                  {tests.map(test => (
                    <option key={test.id} value={test.id}>
                      {test.id.slice(-8)} - {test.patientName}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Test Results *</label>
                <textarea
                  value={resultForm.results}
                  onChange={(e) => setResultForm({...resultForm, results: e.target.value})}
                  rows="3"
                  className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Status *</label>
                  <select
                    value={resultForm.status}
                    onChange={(e) => setResultForm({...resultForm, status: e.target.value})}
                    className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                    required
                  >
                    <option value="completed">Completed</option>
                    <option value="pending">Pending</option>
                    <option value="critical">Critical</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Lab Technician</label>
                  <input
                    type="text"
                    value={resultForm.labTechnician}
                    onChange={(e) => setResultForm({...resultForm, labTechnician: e.target.value})}
                    className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>
              <div className="flex justify-end space-x-3 pt-4">
                <button
                  type="button"
                  onClick={() => setShowAddResultModal(false)}
                  className="px-4 py-2 border rounded-lg hover:bg-gray-100"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
                >
                  Save Result
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Add Doctor Modal */}
      {showAddDoctorModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-bold">Add New Doctor</h3>
              <button
                onClick={() => setShowAddDoctorModal(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                <i className="fas fa-times"></i>
              </button>
            </div>
            <form onSubmit={handleDoctorSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Doctor Name *</label>
                <input
                  type="text"
                  value={doctorForm.name}
                  onChange={(e) => setDoctorForm({...doctorForm, name: e.target.value})}
                  className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Specialization *</label>
                <input
                  type="text"
                  value={doctorForm.specialization}
                  onChange={(e) => setDoctorForm({...doctorForm, specialization: e.target.value})}
                  className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">License Number</label>
                <input
                  type="text"
                  value={doctorForm.licenseNumber}
                  onChange={(e) => setDoctorForm({...doctorForm, licenseNumber: e.target.value})}
                  className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Shift Start *</label>
                  <input
                    type="time"
                    value={doctorForm.shiftStart}
                    onChange={(e) => setDoctorForm({...doctorForm, shiftStart: e.target.value})}
                    className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Shift End *</label>
                  <input
                    type="time"
                    value={doctorForm.shiftEnd}
                    onChange={(e) => setDoctorForm({...doctorForm, shiftEnd: e.target.value})}
                    className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>
              </div>
              <div className="flex justify-end space-x-3 pt-4">
                <button
                  type="button"
                  onClick={() => setShowAddDoctorModal(false)}
                  className="px-4 py-2 border rounded-lg hover:bg-gray-100"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700"
                >
                  Add Doctor
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

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

      <style jsx>{`
        .status-badge {
          padding: 0.25rem 0.5rem;
          border-radius: 9999px;
          font-size: 0.75rem;
          font-weight: 600;
          display: inline-flex;
          align-items: center;
        }

        .status-badge::before {
          content: '●';
          margin-right: 0.25rem;
        }

        .status-active {
          background-color: #d4edda;
          color: #155724;
        }

        .status-pending {
          background-color: #fff3cd;
          color: #856404;
        }

        .status-critical {
          background-color: #f8d7da;
          color: #721c24;
        }

        .status-completed {
          background-color: #d1ecf1;
          color: #0c5460;
        }
      `}</style>
    </div>
  );
};

export default LabDash;