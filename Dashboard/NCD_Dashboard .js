   
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

        // Global variables
        let appointmentsData = [];
        let currentPage = 1;
        const appointmentsPerPage = 10;

        // DOM Elements
        const appointmentsBody = document.getElementById('appointments-body');
        const noAppointmentsMessage = document.getElementById('no-appointments-message');
        const loadingAppointments = document.getElementById('loading-appointments');
        const totalAppointmentsEl = document.getElementById('total-appointments');
        const todayAppointmentsEl = document.getElementById('today-appointments');
        const pendingAppointmentsEl = document.getElementById('pending-appointments');
        const completedAppointmentsEl = document.getElementById('completed-appointments');
        const appointmentsChangeEl = document.getElementById('appointments-change');
        const todayDateEl = document.getElementById('today-date');
        const pendingPercentEl = document.getElementById('pending-percent');
        const completedPercentEl = document.getElementById('completed-percent');
        const conditionStatsEl = document.getElementById('condition-stats');
        const searchAppointmentsEl = document.getElementById('search-appointments');
        const refreshDataBtn = document.getElementById('refresh-data');
        const prevAppointmentsPageBtn = document.getElementById('prev-appointments-page');
        const nextAppointmentsPageBtn = document.getElementById('next-appointments-page');
        const appointmentsPaginationInfo = document.getElementById('appointments-pagination-info');
        const totalContactsEl = document.getElementById('total-contacts');
        const newContactsEl = document.getElementById('new-contacts');
        const responseRateEl = document.getElementById('response-rate');
        const popularConditionEl = document.getElementById('popular-condition');

        // Initialize the dashboard
        document.addEventListener('DOMContentLoaded', function() {
            // Check authentication state first
            auth.onAuthStateChanged(async (user) => {
                if (!user) {
                    // User is not logged in, redirect to login page
                    console.log('No user found, redirecting to login...');
                    // showNotification('Please login to access the NCD dashboard', 'error');
                    
                    setTimeout(() => {
                        window.location.href = '/login.html';
                    }, 2000);
                    return;
                }
                
                // User is logged in, hide loading overlay
                document.getElementById('loadingOverlay').style.display = 'none';
                
                // Set today's date
                const today = new Date();
                todayDateEl.textContent = today.toLocaleDateString('en-US', { 
                    weekday: 'long', 
                    year: 'numeric', 
                    month: 'long', 
                    day: 'numeric' 
                });

                // Load data
                await loadAppointmentsData();
                
                // Setup event listeners
                refreshDataBtn.addEventListener('click', loadAppointmentsData);
                searchAppointmentsEl.addEventListener('input', filterAppointments);
                prevAppointmentsPageBtn.addEventListener('click', goToPrevPage);
                nextAppointmentsPageBtn.addEventListener('click', goToNextPage);
                
                // Mobile menu toggle
                document.getElementById('mobile-menu-button').addEventListener('click', function() {
                    document.getElementById('mobile-menu').classList.toggle('hidden');
                });
                
                // Show welcome notification
                // showNotification(`Welcome, ${user.email}! NCD dashboard loaded.`, 'success');
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

        // Load appointments data from Firebase
        async function loadAppointmentsData() {
            showLoading();
            
            const appointmentsRef = database.ref('appointments');
            
            try {
                const snapshot = await appointmentsRef.once('value');
                const data = snapshot.val();
                appointmentsData = [];
                
                if (data) {
                    Object.keys(data).forEach(key => {
                        const appointment = data[key];
                        appointment.id = key;
                        appointmentsData.push(appointment);
                    });
                }
                
                updateDashboard();
                hideLoading();
            } catch (error) {
                console.error('Error loading appointments:', error);
                hideLoading();
                showNotification('Failed to load appointment data', 'error');
            }
        }

        // Update dashboard with current data
        function updateDashboard() {
            updateStatistics();
            updateAppointmentsTable();
            updateConditionStats();
            updateSystemInfo();
        }

        // Update statistics cards
        function updateStatistics() {
            const total = appointmentsData.length;
            const today = new Date().toISOString().split('T')[0];
            
            const todayCount = appointmentsData.filter(app => 
                app.appointmentDate === today
            ).length;
            
            const pendingCount = appointmentsData.filter(app => 
                app.status === 'pending'
            ).length;
            
            const completedCount = appointmentsData.filter(app => 
                app.status === 'completed'
            ).length;
            
            // Update statistics cards
            totalAppointmentsEl.textContent = total;
            todayAppointmentsEl.textContent = todayCount;
            pendingAppointmentsEl.textContent = pendingCount;
            completedAppointmentsEl.textContent = completedCount;
            
            // Update additional info
            appointmentsChangeEl.textContent = `+${todayCount} today`;
            pendingPercentEl.textContent = total > 0 ? `${Math.round((pendingCount / total) * 100)}% of total` : '0% of total';
            completedPercentEl.textContent = total > 0 ? `${Math.round((completedCount / total) * 100)}% of total` : '0% of total';
        }

        // Update condition statistics
        function updateConditionStats() {
            const conditionCounts = {};
            
            appointmentsData.forEach(appointment => {
                const condition = appointment.condition || 'Unknown';
                conditionCounts[condition] = (conditionCounts[condition] || 0) + 1;
            });
            
            // Clear previous content
            conditionStatsEl.innerHTML = '';
            
            // Create condition cards
            Object.entries(conditionCounts).forEach(([condition, count]) => {
                const card = document.createElement('div');
                card.className = 'bg-gray-50 p-4 rounded-lg text-center';
                
                const formattedCondition = formatCondition(condition);
                const percentage = appointmentsData.length > 0 ? 
                    Math.round((count / appointmentsData.length) * 100) : 0;
                
                card.innerHTML = `
                    <div class="text-2xl font-bold text-blue-600">${count}</div>
                    <div class="text-sm text-gray-600">${formattedCondition}</div>
                    <div class="text-xs text-gray-500 mt-1">${percentage}% of total</div>
                `;
                
                conditionStatsEl.appendChild(card);
            });
            
            // If no conditions found, show message
            if (Object.keys(conditionCounts).length === 0) {
                conditionStatsEl.innerHTML = '<div class="text-gray-500 text-center col-span-4">No condition data available</div>';
            }
        }

        // Update appointments table
        function updateAppointmentsTable() {
            // Clear table
            appointmentsBody.innerHTML = '';
            
            // Filter appointments based on search
            const searchTerm = searchAppointmentsEl.value.toLowerCase();
            const filteredAppointments = appointmentsData.filter(appointment => {
                const fullName = `${appointment.firstName || ''} ${appointment.lastName || ''}`.toLowerCase();
                const condition = (appointment.condition || '').toLowerCase();
                
                return fullName.includes(searchTerm) || condition.includes(searchTerm);
            });
            
            // Show/hide no appointments message
            if (filteredAppointments.length === 0) {
                noAppointmentsMessage.classList.remove('hidden');
                appointmentsBody.parentElement.classList.add('hidden');
            } else {
                noAppointmentsMessage.classList.add('hidden');
                appointmentsBody.parentElement.classList.remove('hidden');
                
                // Calculate pagination
                const totalPages = Math.ceil(filteredAppointments.length / appointmentsPerPage);
                const startIndex = (currentPage - 1) * appointmentsPerPage;
                const endIndex = Math.min(startIndex + appointmentsPerPage, filteredAppointments.length);
                const paginatedAppointments = filteredAppointments.slice(startIndex, endIndex);
                
                // Populate table
                paginatedAppointments.forEach(appointment => {
                    const row = document.createElement('tr');
                    row.className = 'patient-row border-b border-gray-200';
                    
                    const formattedDate = formatDate(appointment.appointmentDate);
                    const formattedTime = appointment.appointmentTime || 'Not specified';
                    const phone = appointment.phone || 'Not provided';
                    const status = appointment.status || 'pending';
                    
                    row.innerHTML = `
                        <td class="px-4 py-3">${appointment.firstName} ${appointment.lastName}</td>
                        <td class="px-4 py-3">${formatCondition(appointment.condition)}</td>
                        <td class="px-4 py-3">${formattedDate}</td>
                        <td class="px-4 py-3">${formattedTime}</td>
                        <td class="px-4 py-3">${phone}</td>
                        <td class="px-4 py-3">
                            <span class="status-badge ${getStatusClass(status)}">${formatStatus(status)}</span>
                        </td>
                        <td class="px-4 py-3">
                            <div class="flex gap-2">
                                <button onclick="viewAppointmentDetails('${appointment.id}')" class="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded text-sm">
                                    <i class="fas fa-eye mr-1"></i> View
                                </button>
                                <button onclick="updateAppointmentStatus('${appointment.id}', 'completed')" class="bg-green-500 hover:bg-green-600 text-white px-3 py-1 rounded text-sm">
                                    <i class="fas fa-check mr-1"></i> Complete
                                </button>
                                <button onclick="updateAppointmentStatus('${appointment.id}', 'cancelled')" class="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded text-sm">
                                    <i class="fas fa-times mr-1"></i> Cancel
                                </button>
                            </div>
                        </td>
                    `;
                    
                    appointmentsBody.appendChild(row);
                });
                
                // Update pagination info and buttons
                appointmentsPaginationInfo.textContent = `Showing ${startIndex + 1}-${endIndex} of ${filteredAppointments.length} appointments`;
                prevAppointmentsPageBtn.disabled = currentPage === 1;
                nextAppointmentsPageBtn.disabled = currentPage === totalPages;
            }
        }

        // Update system information
        function updateSystemInfo() {
            // Calculate from actual data
            const totalContacts = appointmentsData.length;
            
            // Calculate new contacts from last 7 days
            const sevenDaysAgo = new Date();
            sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);
            const newContacts = appointmentsData.filter(app => {
                const appDate = new Date(app.appointmentDate || app.createdAt);
                return appDate >= sevenDaysAgo;
            }).length;
            
            // Calculate response rate (completed appointments / total appointments)
            const completedAppointments = appointmentsData.filter(app => app.status === 'completed').length;
            const responseRate = totalContacts > 0 ? Math.round((completedAppointments / totalContacts) * 100) : 0;
            
            // Get most common condition
            const mostCommonCondition = getMostCommonCondition();
            
            totalContactsEl.textContent = totalContacts;
            newContactsEl.textContent = newContacts;
            responseRateEl.textContent = `${responseRate}%`;
            popularConditionEl.textContent = mostCommonCondition;
        }

        // Get the most common condition
        function getMostCommonCondition() {
            if (appointmentsData.length === 0) return '-';
            
            const conditionCounts = {};
            appointmentsData.forEach(app => {
                const condition = app.condition || 'Unknown';
                conditionCounts[condition] = (conditionCounts[condition] || 0) + 1;
            });
            
            let mostCommon = '';
            let maxCount = 0;
            
            Object.entries(conditionCounts).forEach(([condition, count]) => {
                if (count > maxCount) {
                    mostCommon = condition;
                    maxCount = count;
                }
            });
            
            return formatCondition(mostCommon);
        }

        // View appointment details
        function viewAppointmentDetails(appointmentId) {
            const appointment = appointmentsData.find(app => app.id === appointmentId);
            
            if (appointment) {
                // Create and show modal with appointment details
                const modal = document.createElement('div');
                modal.className = 'fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50';
                modal.innerHTML = `
                    <div class="bg-white rounded-lg p-6 max-w-md w-full mx-4">
                        <div class="flex justify-between items-center mb-4">
                            <h3 class="text-xl font-bold text-gray-800">Appointment Details</h3>
                            <button onclick="this.parentElement.parentElement.parentElement.remove()" class="text-gray-500 hover:text-gray-700">
                                <i class="fas fa-times"></i>
                            </button>
                        </div>
                        
                        <div class="space-y-3">
                            <div>
                                <strong>Patient:</strong> ${appointment.firstName} ${appointment.lastName}
                            </div>
                            <div>
                                <strong>Condition:</strong> ${formatCondition(appointment.condition)}
                            </div>
                            <div>
                                <strong>Date:</strong> ${formatDate(appointment.appointmentDate)}
                            </div>
                            <div>
                                <strong>Contact:</strong> ${appointment.phone || 'Not provided'}
                            </div>
                            <div>
                                <strong>Email:</strong> ${appointment.email || 'Not provided'}
                            </div>
                            <div>
                                <strong>Status:</strong> <span class="status-badge ${getStatusClass(appointment.status)}">${formatStatus(appointment.status)}</span>
                            </div>
                            ${appointment.message ? `
                            <div>
                                <strong>Additional Information:</strong>
                                <p class="mt-1 text-gray-600">${appointment.message}</p>
                            </div>
                            ` : ''}
                        </div>
                        
                        <div class="mt-6 flex justify-end">
                            <button onclick="this.parentElement.parentElement.parentElement.remove()" class="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
                                Close
                            </button>
                        </div>
                    </div>
                `;
                
                document.body.appendChild(modal);
            }
        }

        // Update appointment status
        async function updateAppointmentStatus(appointmentId, newStatus) {
            try {
                await database.ref('appointments/' + appointmentId).update({
                    status: newStatus,
                    updatedAt: new Date().toISOString()
                });
                
                showNotification(`Appointment status updated to ${newStatus}`, 'success');
                await loadAppointmentsData(); // Reload data to reflect changes
            } catch (error) {
                console.error('Error updating appointment:', error);
                showNotification('Failed to update appointment status', 'error');
            }
        }

        // Export data to CSV
        function exportToCSV() {
            if (appointmentsData.length === 0) {
                showNotification('No data to export', 'error');
                return;
            }
            
            // Create CSV content
            let csvContent = "Patient Name,Condition,Appointment Date,Contact,Status\n";
            
            appointmentsData.forEach(appointment => {
                const name = `${appointment.firstName} ${appointment.lastName}`;
                const condition = formatCondition(appointment.condition);
                const date = formatDate(appointment.appointmentDate);
                const contact = appointment.phone || 'Not provided';
                const status = formatStatus(appointment.status);
                
                csvContent += `"${name}","${condition}","${date}","${contact}","${status}"\n`;
            });
            
            // Create download link
            const blob = new Blob([csvContent], { type: 'text/csv' });
            const url = URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = `ncd-appointments-${new Date().toISOString().split('T')[0]}.csv`;
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
            URL.revokeObjectURL(url);
            
            showNotification('Data exported successfully', 'success');
        }

        // Clear all data (for demo purposes)
        async function clearAllData() {
            if (confirm('Are you sure you want to clear all appointment data? This action cannot be undone.')) {
                try {
                    await database.ref('appointments').remove();
                    showNotification('All appointment data cleared', 'success');
                    await loadAppointmentsData();
                } catch (error) {
                    console.error('Error clearing data:', error);
                    showNotification('Failed to clear data', 'error');
                }
            }
        }

        // Generate report (placeholder function)
        function generateReport() {
            showNotification('Report generation feature coming soon', 'success');
        }

        // Filter appointments based on search
        function filterAppointments() {
            currentPage = 1; // Reset to first page when filtering
            updateAppointmentsTable();
        }

        // Pagination functions
        function goToPrevPage() {
            if (currentPage > 1) {
                currentPage--;
                updateAppointmentsTable();
            }
        }

        function goToNextPage() {
            const searchTerm = searchAppointmentsEl.value.toLowerCase();
            const filteredAppointments = appointmentsData.filter(appointment => {
                const fullName = `${appointment.firstName || ''} ${appointment.lastName || ''}`.toLowerCase();
                const condition = (appointment.condition || '').toLowerCase();
                
                return fullName.includes(searchTerm) || condition.includes(searchTerm);
            });
            
            const totalPages = Math.ceil(filteredAppointments.length / appointmentsPerPage);
            
            if (currentPage < totalPages) {
                currentPage++;
                updateAppointmentsTable();
            }
        }

        // Helper functions
        function formatCondition(condition) {
            const conditionMap = {
                'hypertension': 'Hypertension',
                'diabetes': 'Diabetes',
                'asthma': 'Asthma',
                'copd': 'COPD',
                'heart_disease': 'Heart Disease',
                'arthritis': 'Arthritis',
                'thyroid': 'Thyroid Disorder',
                'other': 'Other'
            };
            
            return conditionMap[condition] || condition || 'Unknown';
        }

        function formatDate(dateString) {
            if (!dateString) return 'Not specified';
            const date = new Date(dateString);
            return date.toLocaleDateString('en-US', { 
                year: 'numeric', 
                month: 'short', 
                day: 'numeric' 
            });
        }

        function formatStatus(status) {
            return status ? status.charAt(0).toUpperCase() + status.slice(1) : 'Pending';
        }

        function getStatusClass(status) {
            switch(status) {
                case 'pending': return 'status-pending';
                case 'scheduled': return 'status-scheduled';
                case 'completed': return 'status-completed';
                case 'cancelled': return 'status-cancelled';
                default: return 'status-pending';
            }
        }

        function showLoading() {
            loadingAppointments.classList.remove('hidden');
            appointmentsBody.parentElement.classList.add('hidden');
            noAppointmentsMessage.classList.add('hidden');
        }

        function hideLoading() {
            loadingAppointments.classList.add('hidden');
        }

        function showNotification(message, type) {
            const notification = document.createElement('div');
            notification.className = `fixed top-4 right-4 z-50 px-6 py-3 rounded-lg shadow-lg text-white font-semibold ${
                type === 'success' ? 'bg-green-500' : 'bg-red-500'
            }`;
            notification.textContent = message;
            
            document.body.appendChild(notification);
            
            // Remove notification after 3 seconds
            setTimeout(() => {
                notification.remove();
            }, 3000);
        }
    