   
        // Firebase Configuration
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
        const firebaseApp = firebase.initializeApp(firebaseConfig);
        const database = firebase.database();
        const auth = firebase.auth();

        // Vaccination Data Management
        class VaccinationData {
            constructor() {
                this.db = firebase.database();
                this.registrationsRef = this.db.ref('vaccinationRegistrations');
                this.registrations = [];
            }

            async getAllRegistrations() {
                try {
                    const snapshot = await this.registrationsRef.once('value');
                    const registrations = snapshot.val();
                    
                    if (!registrations) {
                        return [];
                    }

                    return Object.entries(registrations).map(([key, value]) => ({
                        id: key,
                        ...value,
                        status: value.status || 'pending' // Default to pending if no status
                    }));
                } catch (error) {
                    console.error('Error fetching registrations:', error);
                    return [];
                }
            }

            onRegistrationsUpdate(callback) {
                this.registrationsRef.on('value', (snapshot) => {
                    const registrations = snapshot.val();
                    if (!registrations) {
                        callback([]);
                        return;
                    }

                    const registrationsArray = Object.entries(registrations).map(([key, value]) => ({
                        id: key,
                        ...value,
                        status: value.status || 'pending'
                    }));

                    callback(registrationsArray);
                });
            }

            async deleteRegistration(registrationId) {
                try {
                    await this.registrationsRef.child(registrationId).remove();
                    return { success: true };
                } catch (error) {
                    console.error('Error deleting registration:', error);
                    return { success: false, error: error.message };
                }
            }

            async updateRegistrationStatus(registrationId, status) {
                try {
                    await this.registrationsRef.child(registrationId).update({
                        status: status,
                        updatedAt: new Date().toISOString(),
                        completedAt: status === 'completed' ? new Date().toISOString() : null
                    });
                    return { success: true };
                } catch (error) {
                    console.error('Error updating registration:', error);
                    return { success: false, error: error.message };
                }
            }
        }

        // Initialize vaccination data manager
        const vaccinationData = new VaccinationData();

        // Dashboard State
        let allRegistrations = [];
        let currentPage = 1;
        const pageSize = 10;
        let filteredRegistrations = [];

        // Utility Functions
        function escapeHtml(unsafe) {
            if (!unsafe) return '';
            return unsafe
                .replace(/&/g, "&amp;")
                .replace(/</g, "&lt;")
                .replace(/>/g, "&gt;")
                .replace(/"/g, "&quot;")
                .replace(/'/g, "&#039;");
        }

        function formatDate(dateString) {
            if (!dateString) return 'N/A';
            const date = new Date(dateString);
            return date.toLocaleDateString();
        }

        function getStatusBadge(status) {
            const statusMap = {
                'pending': {
                    text: 'Pending',
                    class: 'status-pending'
                },
                'completed': {
                    text: 'Completed',
                    class: 'status-completed'
                },
                'in-progress': {
                    text: 'In Progress',
                    class: 'status-in-progress'
                }
            };
            
            const statusInfo = statusMap[status] || { text: 'Unknown', class: 'status-pending' };
            return `<span class="status-badge ${statusInfo.class}">${statusInfo.text}</span>`;
        }

        function getStatusColor(status) {
            const colors = {
                'pending': 'bg-yellow-100 text-yellow-800',
                'completed': 'bg-green-100 text-green-800',
                'in-progress': 'bg-blue-100 text-blue-800'
            };
            return colors[status] || 'bg-gray-100 text-gray-800';
        }

        function showNotification(message, type = 'info') {
            const notification = document.createElement('div');
            notification.className = `fixed top-4 right-4 p-4 rounded-lg shadow-lg z-50 ${
                type === 'success' ? 'bg-green-500 text-white' :
                type === 'error' ? 'bg-red-500 text-white' :
                'bg-blue-500 text-white'
            }`;
            notification.textContent = message;
            
            document.body.appendChild(notification);
            
            setTimeout(() => {
                notification.remove();
            }, 5000);
        }

        // Dashboard Functions
        async function loadRegistrations() {
            try {
                document.getElementById('loading-data').classList.remove('hidden');
                document.getElementById('no-data-message').classList.add('hidden');
                
                allRegistrations = await vaccinationData.getAllRegistrations();
                filteredRegistrations = [...allRegistrations];
                
                displayRegistrations();
                updateStatistics(allRegistrations);
                updateCharts(allRegistrations);
                
                document.getElementById('loading-data').classList.add('hidden');
                
                if (allRegistrations.length === 0) {
                    document.getElementById('no-data-message').classList.remove('hidden');
                }
            } catch (error) {
                console.error('Error loading registrations:', error);
                showNotification('Error loading registration data.', 'error');
                document.getElementById('loading-data').classList.add('hidden');
            }
        }

        function displayRegistrations() {
            const registrationsBody = document.getElementById('registrations-body');
            const noDataMessage = document.getElementById('no-data-message');
            const paginationInfo = document.getElementById('pagination-info');
            const prevButton = document.getElementById('prev-page');
            const nextButton = document.getElementById('next-page');

            if (filteredRegistrations.length === 0) {
                registrationsBody.innerHTML = '';
                noDataMessage.classList.remove('hidden');
                paginationInfo.textContent = 'Showing 0 registrations';
                prevButton.disabled = true;
                nextButton.disabled = true;
                return;
            }

            noDataMessage.classList.add('hidden');
            
            // Sort by date, newest first
            filteredRegistrations.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));
            
            // Calculate pagination
            const totalPages = Math.ceil(filteredRegistrations.length / pageSize);
            const startIndex = (currentPage - 1) * pageSize;
            const endIndex = Math.min(startIndex + pageSize, filteredRegistrations.length);
            const pageRegistrations = filteredRegistrations.slice(startIndex, endIndex);
            
            registrationsBody.innerHTML = pageRegistrations.map(reg => {
                const status = reg.status || 'pending';
                const isCompleted = status === 'completed';
                
                return `
                <tr class="registration-row border-b border-gray-200">
                    <td class="px-4 py-3">${escapeHtml(reg.fullName)}</td>
                    <td class="px-4 py-3">${reg.age}</td>
                    <td class="px-4 py-3 capitalize">${reg.gender}</td>
                    <td class="px-4 py-3">${escapeHtml(reg.campSector)}</td>
                    <td class="px-4 py-3">
                        <span class="px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-xs">
                            ${reg.vaccineInterest}
                        </span>
                    </td>
                    <td class="px-4 py-3">${escapeHtml(reg.contact)}</td>
                    <td class="px-4 py-3 text-sm">${formatDate(reg.timestamp)}</td>
                    <td class="px-4 py-3">
                        ${getStatusBadge(status)}
                    </td>
                    <td class="px-4 py-3">
                        ${!isCompleted ? `
                        <button onclick="markAsCompleted('${reg.id}')" class="bg-green-500 text-white px-2 py-1 rounded text-xs hover:bg-green-600 mr-1">
                            Complete
                        </button>
                        ` : `
                        <span class="text-green-600 text-xs font-semibold">
                            <i class="fas fa-check mr-1"></i>Completed
                        </span>
                        `}
                        <button onclick="deleteRegistration('${reg.id}')" class="bg-red-500 text-white px-2 py-1 rounded text-xs hover:bg-red-600">
                            Delete
                        </button>
                    </td>
                </tr>
                `;
            }).join('');
            
            // Update pagination info
            paginationInfo.textContent = `Showing ${startIndex + 1}-${endIndex} of ${filteredRegistrations.length} registrations`;
            
            // Update pagination buttons
            prevButton.disabled = currentPage === 1;
            nextButton.disabled = currentPage === totalPages;
        }

        function updateStatistics(registrations) {
            const today = new Date().toDateString();
            const todayRegistrations = registrations.filter(reg => 
                new Date(reg.timestamp).toDateString() === today
            );
            
            const completedRegistrations = registrations.filter(reg => reg.status === 'completed');
            const pendingRegistrations = registrations.filter(reg => reg.status !== 'completed');
            
            const totalChange = todayRegistrations.length > 0 ? `+${todayRegistrations.length} today` : 'No new registrations today';
            
            document.getElementById('total-registrations').textContent = registrations.length;
            document.getElementById('today-registrations').textContent = todayRegistrations.length;
            document.getElementById('completed-count').textContent = completedRegistrations.length;
            document.getElementById('pending-count').textContent = pendingRegistrations.length;
            document.getElementById('total-change').textContent = totalChange;
            document.getElementById('today-date').textContent = new Date().toLocaleDateString();
            
            // Calculate percentages
            const completedPercent = registrations.length > 0 ? Math.round((completedRegistrations.length / registrations.length) * 100) : 0;
            const pendingPercent = registrations.length > 0 ? Math.round((pendingRegistrations.length / registrations.length) * 100) : 0;
            
            document.getElementById('completed-percent').textContent = `${completedPercent}% of total`;
            document.getElementById('pending-percent').textContent = `${pendingPercent}% of total`;
        }

        function updateCharts(registrations) {
            updateVaccinePreferenceChart(registrations);
            updateAgeDistributionChart(registrations);
            updateRegistrationTrendsChart(registrations);
            updateGenderDistributionChart(registrations);
            updateLocationStats(registrations);
        }

        function updateVaccinePreferenceChart(registrations) {
            const vaccineCounts = {};
            registrations.forEach(reg => {
                const vaccine = reg.vaccineInterest || 'Not specified';
                vaccineCounts[vaccine] = (vaccineCounts[vaccine] || 0) + 1;
            });
            
            console.log('Vaccine preferences:', vaccineCounts);
        }

        function updateAgeDistributionChart(registrations) {
            const ageGroups = {
                '0-5': 0,
                '6-17': 0,
                '18-30': 0,
                '31-50': 0,
                '51+': 0
            };
            
            registrations.forEach(reg => {
                const age = parseInt(reg.age);
                if (age <= 5) ageGroups['0-5']++;
                else if (age <= 17) ageGroups['6-17']++;
                else if (age <= 30) ageGroups['18-30']++;
                else if (age <= 50) ageGroups['31-50']++;
                else ageGroups['51+']++;
            });
            
            console.log('Age distribution:', ageGroups);
        }

        function updateRegistrationTrendsChart(registrations) {
            const registrationsByDate = {};
            registrations.forEach(reg => {
                const date = new Date(reg.timestamp).toDateString();
                registrationsByDate[date] = (registrationsByDate[date] || 0) + 1;
            });
            
            console.log('Registration trends:', registrationsByDate);
        }

        function updateGenderDistributionChart(registrations) {
            const genderCounts = {
                'male': 0,
                'female': 0,
                'other': 0
            };
            
            registrations.forEach(reg => {
                const gender = reg.gender?.toLowerCase() || 'other';
                if (genderCounts.hasOwnProperty(gender)) {
                    genderCounts[gender]++;
                } else {
                    genderCounts['other']++;
                }
            });
            
            console.log('Gender distribution:', genderCounts);
        }

        function updateLocationStats(registrations) {
            const locationStats = {};
            registrations.forEach(reg => {
                const location = reg.campSector || 'Unknown';
                locationStats[location] = (locationStats[location] || 0) + 1;
            });
            
            const locationStatsContainer = document.getElementById('location-stats');
            locationStatsContainer.innerHTML = '';
            
            Object.entries(locationStats).forEach(([location, count]) => {
                const percent = Math.round((count / registrations.length) * 100);
                locationStatsContainer.innerHTML += `
                    <div class="bg-gray-50 p-4 rounded-lg">
                        <div class="text-lg font-bold text-blue-600">${count}</div>
                        <div class="text-sm text-gray-600">${location}</div>
                        <div class="text-xs text-gray-500">${percent}% of total</div>
                    </div>
                `;
            });
        }

        async function exportToCSV() {
            try {
                const registrations = await vaccinationData.getAllRegistrations();
                
                if (registrations.length === 0) {
                    showNotification('No data to export.', 'info');
                    return;
                }

                const headers = ['Name', 'Age', 'Gender', 'Location', 'Vaccine Interest', 'Contact', 'Status', 'Registration Date'];
                const csvData = registrations.map(reg => [
                    reg.fullName,
                    reg.age,
                    reg.gender,
                    reg.campSector,
                    reg.vaccineInterest,
                    reg.contact,
                    reg.status || 'pending',
                    formatDate(reg.timestamp)
                ]);

                const csvContent = [
                    headers.join(','),
                    ...csvData.map(row => row.map(field => `"${field}"`).join(','))
                ].join('\n');

                const blob = new Blob([csvContent], { type: 'text/csv' });
                const url = window.URL.createObjectURL(blob);
                const a = document.createElement('a');
                a.href = url;
                a.download = `vaccination-registrations-${new Date().toISOString().split('T')[0]}.csv`;
                a.click();
                window.URL.revokeObjectURL(url);
                
                showNotification('Data exported successfully!', 'success');
            } catch (error) {
                console.error('Error exporting data:', error);
                showNotification('Error exporting data.', 'error');
            }
        }

        // Global functions for buttons
        window.markAsCompleted = async function(registrationId) {
            try {
                const result = await vaccinationData.updateRegistrationStatus(registrationId, 'completed');
                if (result.success) {
                    showNotification('Registration marked as completed!', 'success');
                    loadRegistrations();
                }
            } catch (error) {
                showNotification('Error updating registration.', 'error');
            }
        };

        window.deleteRegistration = async function(registrationId) {
            if (confirm('Are you sure you want to delete this registration?')) {
                try {
                    const result = await vaccinationData.deleteRegistration(registrationId);
                    if (result.success) {
                        showNotification('Registration deleted successfully!', 'success');
                        loadRegistrations();
                    }
                } catch (error) {
                    showNotification('Error deleting registration.', 'error');
                }
            }
        };

        // Event Listeners and Initialization
        document.addEventListener('DOMContentLoaded', async function() {
            // Check authentication state first
            auth.onAuthStateChanged(async (user) => {
                if (!user) {
                    // User is not logged in, redirect to login page
                    console.log('No user found, redirecting to login...');
                    // showNotification('Please login to access the vaccination dashboard', 'error');
                    
                    setTimeout(() => {
                        window.location.href = '/login.html';
                    }, 2000);
                    return;
                }
                
                // User is logged in, hide loading overlay
                document.getElementById('loadingOverlay').style.display = 'none';
                
                // Load data
                await loadRegistrations();
                
                // Setup event listeners
                setupEventListeners();
                
                // Show welcome notification
                // showNotification(`Welcome, ${user.email}! Vaccination dashboard loaded.`, 'success');
            });

            // Fixed Logout functionality
            document.getElementById('logoutBtn').addEventListener('click', async function(e) {
                e.preventDefault();
                
                try {
                    // Show loading state
                    // showNotification('Logging out...', 'success');
                    
                    // Sign out from Firebase
                    await auth.signOut();
                    console.log('User signed out successfully');
                    
                    // Clear any stored data
                    localStorage.removeItem('userEmail');
                    sessionStorage.clear();
                    
                    // Show success message
                    // showNotification('Logged out successfully! Redirecting to login...', 'success');
                    
                    // Redirect to login page after a short delay
                    setTimeout(() => {
                        window.location.href = '/login.html';
                    }, 1500);
                    
                } catch (error) {
                    console.error('Logout error:', error);
                    showNotification('Error during logout. Please try again.', 'error');
                    
                    // Still redirect even if there's an error
                    setTimeout(() => {
                        window.location.href = '/login.html';
                    }, 2000);
                }
            });
        });

        function setupEventListeners() {
            const refreshButton = document.getElementById('refresh-data');
            const searchInput = document.getElementById('search-registrations');
            const prevButton = document.getElementById('prev-page');
            const nextButton = document.getElementById('next-page');
            const mobileMenuButton = document.getElementById('mobile-menu-button');
            const mobileMenu = document.getElementById('mobile-menu');

            // Refresh button
            if (refreshButton) {
                refreshButton.addEventListener('click', loadRegistrations);
            }

            // Search functionality
            if (searchInput) {
                searchInput.addEventListener('input', function() {
                    const searchTerm = this.value.toLowerCase();
                    if (searchTerm) {
                        filteredRegistrations = allRegistrations.filter(reg => 
                            reg.fullName?.toLowerCase().includes(searchTerm) ||
                            reg.campSector?.toLowerCase().includes(searchTerm) ||
                            reg.vaccineInterest?.toLowerCase().includes(searchTerm) ||
                            reg.contact?.toLowerCase().includes(searchTerm) ||
                            reg.status?.toLowerCase().includes(searchTerm)
                        );
                    } else {
                        filteredRegistrations = [...allRegistrations];
                    }
                    currentPage = 1;
                    displayRegistrations();
                });
            }

            // Pagination
            if (prevButton) {
                prevButton.addEventListener('click', function() {
                    if (currentPage > 1) {
                        currentPage--;
                        displayRegistrations();
                    }
                });
            }

            if (nextButton) {
                nextButton.addEventListener('click', function() {
                    const totalPages = Math.ceil(filteredRegistrations.length / pageSize);
                    if (currentPage < totalPages) {
                        currentPage++;
                        displayRegistrations();
                    }
                });
            }

            // Mobile menu
            if (mobileMenuButton && mobileMenu) {
                mobileMenuButton.addEventListener('click', function() {
                    mobileMenu.classList.toggle('hidden');
                });
            }

            // Real-time updates
            vaccinationData.onRegistrationsUpdate((registrations) => {
                allRegistrations = registrations;
                filteredRegistrations = [...allRegistrations];
                displayRegistrations();
                updateStatistics(registrations);
                updateCharts(registrations);
            });
        }
