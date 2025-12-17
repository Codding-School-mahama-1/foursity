  
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

        // Disability Care Data Management
        class DisabilityCareData {
            constructor() {
                this.db = firebase.database();
                this.appointmentsRef = this.db.ref('appointments');
                this.contactsRef = this.db.ref('contacts');
                this.appointments = [];
                this.contacts = [];
            }

            async getAllAppointments() {
                try {
                    const snapshot = await this.appointmentsRef.once('value');
                    const appointments = snapshot.val();
                    
                    if (!appointments) {
                        return [];
                    }

                    return Object.entries(appointments).map(([key, value]) => ({
                        id: key,
                        ...value
                    }));
                } catch (error) {
                    console.error('Error fetching appointments:', error);
                    return [];
                }
            }

            async getAllContacts() {
                try {
                    const snapshot = await this.contactsRef.once('value');
                    const contacts = snapshot.val();
                    
                    if (!contacts) {
                        return [];
                    }

                    return Object.entries(contacts).map(([key, value]) => ({
                        id: key,
                        ...value
                    }));
                } catch (error) {
                    console.error('Error fetching contacts:', error);
                    return [];
                }
            }

            onAppointmentsUpdate(callback) {
                this.appointmentsRef.on('value', (snapshot) => {
                    const appointments = snapshot.val();
                    if (!appointments) {
                        callback([]);
                        return;
                    }

                    const appointmentsArray = Object.entries(appointments).map(([key, value]) => ({
                        id: key,
                        ...value
                    }));

                    callback(appointmentsArray);
                });
            }

            onContactsUpdate(callback) {
                this.contactsRef.on('value', (snapshot) => {
                    const contacts = snapshot.val();
                    if (!contacts) {
                        callback([]);
                        return;
                    }

                    const contactsArray = Object.entries(contacts).map(([key, value]) => ({
                        id: key,
                        ...value
                    }));

                    callback(contactsArray);
                });
            }

            async updateAppointmentStatus(appointmentId, status) {
                try {
                    await this.appointmentsRef.child(appointmentId).update({
                        status: status,
                        updatedAt: new Date().toISOString()
                    });
                    return { success: true };
                } catch (error) {
                    console.error('Error updating appointment:', error);
                    return { success: false, error: error.message };
                }
            }

            async deleteAppointment(appointmentId) {
                try {
                    await this.appointmentsRef.child(appointmentId).remove();
                    return { success: true };
                } catch (error) {
                    console.error('Error deleting appointment:', error);
                    return { success: false, error: error.message };
                }
            }

            async deleteContact(contactId) {
                try {
                    await this.contactsRef.child(contactId).remove();
                    return { success: true };
                } catch (error) {
                    console.error('Error deleting contact:', error);
                    return { success: false, error: error.message };
                }
            }
        }

        // Initialize disability care data manager
        const disabilityCareData = new DisabilityCareData();

        // Dashboard State
        let allAppointments = [];
        let allContacts = [];
        let currentAppointmentsPage = 1;
        const pageSize = 10;
        let filteredAppointments = [];

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

        function formatTimestamp(timestamp) {
            if (!timestamp) return 'N/A';
            const date = new Date(timestamp);
            return date.toLocaleDateString() + ' ' + date.toLocaleTimeString();
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
        async function loadAppointments() {
            try {
                document.getElementById('loading-appointments').classList.remove('hidden');
                document.getElementById('no-appointments-message').classList.add('hidden');
                
                allAppointments = await disabilityCareData.getAllAppointments();
                filteredAppointments = [...allAppointments];
                
                displayAppointments();
                updateStatistics();
                
                document.getElementById('loading-appointments').classList.add('hidden');
                
                if (allAppointments.length === 0) {
                    document.getElementById('no-appointments-message').classList.remove('hidden');
                }
            } catch (error) {
                console.error('Error loading appointments:', error);
                showNotification('Error loading appointment data.', 'error');
                document.getElementById('loading-appointments').classList.add('hidden');
            }
        }

        async function loadContacts() {
            try {
                allContacts = await disabilityCareData.getAllContacts();
                updateStatistics();
            } catch (error) {
                console.error('Error loading contacts:', error);
                // Don't show notification for contacts as they might not exist
            }
        }

        function displayAppointments() {
            const appointmentsBody = document.getElementById('appointments-body');
            const noAppointmentsMessage = document.getElementById('no-appointments-message');
            const paginationInfo = document.getElementById('appointments-pagination-info');
            const prevButton = document.getElementById('prev-appointments-page');
            const nextButton = document.getElementById('next-appointments-page');

            if (filteredAppointments.length === 0) {
                appointmentsBody.innerHTML = '';
                noAppointmentsMessage.classList.remove('hidden');
                paginationInfo.textContent = 'Showing 0 appointments';
                prevButton.disabled = true;
                nextButton.disabled = true;
                return;
            }

            noAppointmentsMessage.classList.add('hidden');
            
            // Sort by date, newest first
            filteredAppointments.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
            
            // Calculate pagination
            const totalPages = Math.ceil(filteredAppointments.length / pageSize);
            const startIndex = (currentAppointmentsPage - 1) * pageSize;
            const endIndex = Math.min(startIndex + pageSize, filteredAppointments.length);
            const pageAppointments = filteredAppointments.slice(startIndex, endIndex);
            
            appointmentsBody.innerHTML = pageAppointments.map(appointment => {
                const status = appointment.status || 'pending';
                const statusClass = `status-${status}`;
                const statusText = status.charAt(0).toUpperCase() + status.slice(1);
                
                return `
                    <tr class="patient-row border-b border-gray-200">
                        <td class="px-4 py-3">${escapeHtml(appointment.fullName || 'Not specified')}</td>
                        <td class="px-4 py-3">${appointment.service || 'Not specified'}</td>
                        <td class="px-4 py-3">${appointment.preferredDate || 'Not specified'}</td>
                        <td class="px-4 py-3">${appointment.preferredTime || 'Not specified'}</td>
                        <td class="px-4 py-3">${escapeHtml(appointment.phone || 'Not provided')}</td>
                        <td class="px-4 py-3">
                            <span class="status-badge ${statusClass}">${statusText}</span>
                        </td>
                        <td class="px-4 py-3">
                            <button onclick="updateAppointmentStatus('${appointment.id}', 'scheduled')" class="bg-blue-500 text-white px-2 py-1 rounded text-xs hover:bg-blue-600 mr-1" title="Mark as Scheduled">
                                <i class="fas fa-calendar-check"></i>
                            </button>
                            <button onclick="updateAppointmentStatus('${appointment.id}', 'completed')" class="bg-green-500 text-white px-2 py-1 rounded text-xs hover:bg-green-600 mr-1" title="Mark as Completed">
                                <i class="fas fa-check"></i>
                            </button>
                            <button onclick="deleteAppointment('${appointment.id}')" class="bg-red-500 text-white px-2 py-1 rounded text-xs hover:bg-red-600" title="Delete Appointment">
                                <i class="fas fa-trash"></i>
                            </button>
                        </td>
                    </tr>
                `;
            }).join('');
            
            // Update pagination info
            paginationInfo.textContent = `Showing ${startIndex + 1}-${endIndex} of ${filteredAppointments.length} appointments`;
            
            // Update pagination buttons
            prevButton.disabled = currentAppointmentsPage === 1;
            nextButton.disabled = currentAppointmentsPage === totalPages;
        }

        function updateStatistics() {
            const today = new Date().toDateString();
            const todayAppointments = allAppointments.filter(appointment => {
                const appointmentDate = appointment.preferredDate || appointment.createdAt;
                return new Date(appointmentDate).toDateString() === today;
            });
            
            const pendingAppointments = allAppointments.filter(appointment => 
                !appointment.status || appointment.status === 'pending'
            );
            const completedAppointments = allAppointments.filter(appointment => 
                appointment.status === 'completed'
            );
            
            const appointmentsChange = todayAppointments.length > 0 ? `+${todayAppointments.length} today` : 'No new appointments today';
            
            document.getElementById('total-appointments').textContent = allAppointments.length;
            document.getElementById('today-appointments').textContent = todayAppointments.length;
            document.getElementById('pending-appointments').textContent = pendingAppointments.length;
            document.getElementById('completed-appointments').textContent = completedAppointments.length;
            document.getElementById('appointments-change').textContent = appointmentsChange;
            document.getElementById('today-date').textContent = new Date().toLocaleDateString();
            
            // Calculate percentages
            const pendingPercent = allAppointments.length > 0 ? Math.round((pendingAppointments.length / allAppointments.length) * 100) : 0;
            const completedPercent = allAppointments.length > 0 ? Math.round((completedAppointments.length / allAppointments.length) * 100) : 0;
            
            document.getElementById('pending-percent').textContent = `${pendingPercent}% of total`;
            document.getElementById('completed-percent').textContent = `${completedPercent}% of total`;
            
            // Update service statistics
            updateServiceStats(allAppointments);
            
            // Update contact statistics
            updateContactStats(allContacts);
        }

        function updateServiceStats(appointments) {
            const serviceCounts = {};
            appointments.forEach(appointment => {
                const service = appointment.service || 'Not specified';
                serviceCounts[service] = (serviceCounts[service] || 0) + 1;
            });
            
            const serviceStatsContainer = document.getElementById('service-stats');
            serviceStatsContainer.innerHTML = '';
            
            Object.entries(serviceCounts).forEach(([service, count]) => {
                const percent = Math.round((count / appointments.length) * 100);
                serviceStatsContainer.innerHTML += `
                    <div class="bg-gray-50 p-4 rounded-lg">
                        <div class="text-lg font-bold text-blue-600">${count}</div>
                        <div class="text-sm text-gray-600">${service}</div>
                        <div class="text-xs text-gray-500">${percent}% of total</div>
                    </div>
                `;
            });
        }

        function updateContactStats(contacts) {
            const sevenDaysAgo = new Date();
            sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);
            
            const newContacts = contacts.filter(contact => 
                new Date(contact.createdAt) > sevenDaysAgo
            );
            
            document.getElementById('total-contacts').textContent = contacts.length;
            document.getElementById('new-contacts').textContent = newContacts.length;
            
            // Calculate response rate (simplified)
            const totalAppointments = allAppointments.length;
            const respondedAppointments = allAppointments.filter(appointment => 
                appointment.status && appointment.status !== 'pending'
            ).length;
            
            const responseRate = totalAppointments > 0 ? Math.round((respondedAppointments / totalAppointments) * 100) : 0;
            document.getElementById('response-rate').textContent = `${responseRate}%`;
            
            // Find most popular service
            const serviceCounts = {};
            allAppointments.forEach(appointment => {
                const service = appointment.service || 'Not specified';
                serviceCounts[service] = (serviceCounts[service] || 0) + 1;
            });
            
            let popularService = '-';
            let maxCount = 0;
            Object.entries(serviceCounts).forEach(([service, count]) => {
                if (count > maxCount) {
                    maxCount = count;
                    popularService = service;
                }
            });
            
            document.getElementById('popular-service').textContent = popularService;
        }

        async function exportToCSV() {
            try {
                // Combine appointments and contacts data
                const appointments = await disabilityCareData.getAllAppointments();
                const contacts = await disabilityCareData.getAllContacts();
                
                if (appointments.length === 0 && contacts.length === 0) {
                    showNotification('No data to export.', 'info');
                    return;
                }

                let csvContent = '';
                
                // Export appointments
                if (appointments.length > 0) {
                    const appointmentHeaders = ['Name', 'Email', 'Phone', 'Service', 'Preferred Date', 'Preferred Time', 'Accessibility Needs', 'Message', 'Status', 'Created Date'];
                    const appointmentData = appointments.map(appointment => [
                        appointment.fullName,
                        appointment.email,
                        appointment.phone,
                        appointment.service,
                        appointment.preferredDate,
                        appointment.preferredTime,
                        appointment.accessibility,
                        appointment.message,
                        appointment.status || 'pending',
                        formatTimestamp(appointment.createdAt)
                    ]);

                    csvContent += 'DISABILITY CARE APPOINTMENTS\n';
                    csvContent += appointmentHeaders.join(',') + '\n';
                    csvContent += appointmentData.map(row => row.map(field => `"${field}"`).join(',')).join('\n');
                    csvContent += '\n\n';
                }
                
                // Export contacts
                if (contacts.length > 0) {
                    const contactHeaders = ['First Name', 'Last Name', 'Email', 'Phone', 'Subject', 'Message', 'Created Date'];
                    const contactData = contacts.map(contact => [
                        contact.firstName,
                        contact.lastName,
                        contact.email,
                        contact.phone,
                        contact.subject,
                        contact.message,
                        formatTimestamp(contact.createdAt)
                    ]);

                    csvContent += 'DISABILITY CARE CONTACT MESSAGES\n';
                    csvContent += contactHeaders.join(',') + '\n';
                    csvContent += contactData.map(row => row.map(field => `"${field}"`).join(',')).join('\n');
                }

                const blob = new Blob([csvContent], { type: 'text/csv' });
                const url = window.URL.createObjectURL(blob);
                const a = document.createElement('a');
                a.href = url;
                a.download = `disability-care-data-${new Date().toISOString().split('T')[0]}.csv`;
                a.click();
                window.URL.revokeObjectURL(url);
                
                showNotification('Data exported successfully!', 'success');
            } catch (error) {
                console.error('Error exporting data:', error);
                showNotification('Error exporting data.', 'error');
            }
        }

        // Global functions for buttons
        window.updateAppointmentStatus = async function(appointmentId, status) {
            try {
                const result = await disabilityCareData.updateAppointmentStatus(appointmentId, status);
                if (result.success) {
                    showNotification(`Appointment marked as ${status}!`, 'success');
                    loadAppointments();
                }
            } catch (error) {
                showNotification('Error updating appointment.', 'error');
            }
        };

        window.deleteAppointment = async function(appointmentId) {
            if (confirm('Are you sure you want to delete this appointment?')) {
                try {
                    const result = await disabilityCareData.deleteAppointment(appointmentId);
                    if (result.success) {
                        showNotification('Appointment deleted successfully!', 'success');
                        loadAppointments();
                    }
                } catch (error) {
                    showNotification('Error deleting appointment.', 'error');
                }
            }
        };

        window.clearAllData = function() {
            if (confirm('Are you sure you want to clear ALL data? This action cannot be undone.')) {
                showNotification('Data clearing functionality would be implemented here.', 'info');
                // In a real implementation, you would call methods to clear the database
            }
        };

        window.generateReport = function() {
            showNotification('Report generation would be implemented here.', 'info');
            // In a real implementation, you would generate a detailed report
        };

        // Event Listeners and Initialization
        document.addEventListener('DOMContentLoaded', async function() {
            // Check authentication state first
            auth.onAuthStateChanged(async (user) => {
                if (!user) {
                    // User is not logged in, redirect to login page
                    console.log('No user found, redirecting to login...');
                    showNotification('Please login to access the disability dashboard', 'error');
                    
                    setTimeout(() => {
                        window.location.href = '/login.html';
                    }, 2000);
                    return;
                }
                
                // User is logged in, hide loading overlay
                document.getElementById('loadingOverlay').style.display = 'none';
                
                // Load data
                await loadAppointments();
                await loadContacts();
                
                // Setup event listeners
                setupEventListeners();
                
                // Show welcome notification
                showNotification(`Welcome, ${user.email}! Disability dashboard loaded.`, 'success');
            });

            // Fixed Logout functionality
            document.getElementById('logoutBtn').addEventListener('click', async function(e) {
                e.preventDefault();
                
                try {
                    // Show loading state
                    showNotification('Logging out...', 'success');
                    
                    // Sign out from Firebase
                    await auth.signOut();
                    console.log('User signed out successfully');
                    
                    // Clear any stored data
                    localStorage.removeItem('userEmail');
                    sessionStorage.clear();
                    
                    // Show success message
                    showNotification('Logged out successfully! Redirecting to login...', 'success');
                    
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
            const searchAppointmentsInput = document.getElementById('search-appointments');
            const prevAppointmentsButton = document.getElementById('prev-appointments-page');
            const nextAppointmentsButton = document.getElementById('next-appointments-page');
            const mobileMenuButton = document.getElementById('mobile-menu-button');
            const mobileMenu = document.getElementById('mobile-menu');

            // Refresh buttons
            if (refreshButton) {
                refreshButton.addEventListener('click', loadAppointments);
            }

            // Search functionality
            if (searchAppointmentsInput) {
                searchAppointmentsInput.addEventListener('input', function() {
                    const searchTerm = this.value.toLowerCase();
                    if (searchTerm) {
                        filteredAppointments = allAppointments.filter(appointment => 
                            (appointment.fullName && appointment.fullName.toLowerCase().includes(searchTerm)) ||
                            (appointment.service && appointment.service.toLowerCase().includes(searchTerm)) ||
                            (appointment.email && appointment.email.toLowerCase().includes(searchTerm)) ||
                            (appointment.phone && appointment.phone.toLowerCase().includes(searchTerm))
                        );
                    } else {
                        filteredAppointments = [...allAppointments];
                    }
                    currentAppointmentsPage = 1;
                    displayAppointments();
                });
            }

            // Pagination
            if (prevAppointmentsButton) {
                prevAppointmentsButton.addEventListener('click', function() {
                    if (currentAppointmentsPage > 1) {
                        currentAppointmentsPage--;
                        displayAppointments();
                    }
                });
            }

            if (nextAppointmentsButton) {
                nextAppointmentsButton.addEventListener('click', function() {
                    const totalPages = Math.ceil(filteredAppointments.length / pageSize);
                    if (currentAppointmentsPage < totalPages) {
                        currentAppointmentsPage++;
                        displayAppointments();
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
            disabilityCareData.onAppointmentsUpdate((appointments) => {
                allAppointments = appointments;
                filteredAppointments = [...allAppointments];
                displayAppointments();
                updateStatistics();
            });

            disabilityCareData.onContactsUpdate((contacts) => {
                allContacts = contacts;
                updateStatistics();
            });
        }
    