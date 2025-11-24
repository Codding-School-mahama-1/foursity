 class VaccinationData {
            constructor() {
                this.db = firebase.database();
                this.registrationsRef = this.db.ref('vaccinationRegistrations');
            }

            async submitRegistration(registrationData) {
                try {
                    const timestamp = new Date().toISOString();
                    const registrationWithTimestamp = {
                        ...registrationData,
                        timestamp: timestamp,
                        status: 'pending'
                    };

                    const newRegistrationRef = this.registrationsRef.push();
                    await newRegistrationRef.set(registrationWithTimestamp);
                    
                    return { success: true, id: newRegistrationRef.key };
                } catch (error) {
                    console.error('Error submitting registration:', error);
                    return { success: false, error: error.message };
                }
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
                        ...value
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
                        ...value
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
                        updatedAt: new Date().toISOString()
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
        async function loadRegistrations() {
            try {
                const registrations = await vaccinationData.getAllRegistrations();
                displayRegistrations(registrations);
                updateStatistics(registrations);
            } catch (error) {
                console.error('Error loading registrations:', error);
                showNotification('Error loading registration data.', 'error');
            }
        }

        function displayRegistrations(registrations) {
            const registrationsBody = document.getElementById('registrations-body');
            const noDataMessage = document.getElementById('no-data-message');

            if (registrations.length === 0) {
                registrationsBody.innerHTML = '';
                noDataMessage.classList.remove('hidden');
                return;
            }

            noDataMessage.classList.add('hidden');
            
            // Sort by date, newest first
            registrations.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));
            
            registrationsBody.innerHTML = registrations.map(reg => `
                <tr class="hover:bg-gray-50" data-registration-id="${reg.id}">
                    <td class="border border-gray-300 px-4 py-2">${escapeHtml(reg.fullName)}</td>
                    <td class="border border-gray-300 px-4 py-2">${reg.age}</td>
                    <td class="border border-gray-300 px-4 py-2 capitalize">${reg.gender}</td>
                    <td class="border border-gray-300 px-4 py-2">${escapeHtml(reg.campSector)}</td>
                    <td class="border border-gray-300 px-4 py-2">
                        <span class="px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">
                            ${reg.vaccineInterest}
                        </span>
                    </td>
                    <td class="border border-gray-300 px-4 py-2">${escapeHtml(reg.contact)}</td>
                    <td class="border border-gray-300 px-4 py-2 text-sm">${formatDate(reg.timestamp)}</td>
                    <td class="border border-gray-300 px-4 py-2">
                        <button onclick="markAsCompleted('${reg.id}')" class="bg-green-500 text-white px-3 py-1 rounded text-sm hover:bg-green-600 mr-2">
                            Complete
                        </button>
                        <button onclick="deleteRegistration('${reg.id}')" class="bg-red-500 text-white px-3 py-1 rounded text-sm hover:bg-red-600">
                            Delete
                        </button>
                    </td>
                </tr>
            `).join('');
        }

        function updateStatistics(registrations) {
            const today = new Date().toDateString();
            const todayRegistrations = registrations.filter(reg => 
                new Date(reg.timestamp).toDateString() === today
            );
            
            const children = registrations.filter(reg => parseInt(reg.age) < 18);
            const adults = registrations.filter(reg => parseInt(reg.age) >= 18);

            document.getElementById('total-registrations').textContent = registrations.length;
            document.getElementById('today-registrations').textContent = todayRegistrations.length;
            document.getElementById('children-count').textContent = children.length;
            document.getElementById('adults-count').textContent = adults.length;
        }

        async function exportToCSV() {
            try {
                const registrations = await vaccinationData.getAllRegistrations();
                
                if (registrations.length === 0) {
                    showNotification('No data to export.', 'info');
                    return;
                }

                const headers = ['Name', 'Age', 'Gender', 'Location', 'Vaccine Interest', 'Contact', 'Registration Date'];
                const csvData = registrations.map(reg => [
                    reg.fullName,
                    reg.age,
                    reg.gender,
                    reg.campSector,
                    reg.vaccineInterest,
                    reg.contact,
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

        // Form Submission
        document.addEventListener('DOMContentLoaded', function() {
            const vaccinationForm = document.getElementById('vaccination-form');
            const refreshButton = document.getElementById('refresh-data');
            const exportButton = document.getElementById('export-data');

            // Handle form submission
            if (vaccinationForm) {
                vaccinationForm.addEventListener('submit', async function(e) {
                    e.preventDefault();
                    
                    const formData = {
                        fullName: document.getElementById('full-name').value,
                        age: document.getElementById('age').value,
                        gender: document.getElementById('gender').value,
                        campSector: document.getElementById('camp-sector').value,
                        vaccineInterest: document.getElementById('vaccine-interest').value,
                        contact: document.getElementById('contact').value || 'Not provided'
                    };

                    try {
                        const result = await vaccinationData.submitRegistration(formData);
                        
                        if (result.success) {
                            showNotification('Registration submitted successfully!', 'success');
                            vaccinationForm.reset();
                            loadRegistrations();
                        } else {
                            showNotification('Error submitting registration. Please try again.', 'error');
                        }
                    } catch (error) {
                        console.error('Form submission error:', error);
                        showNotification('Error submitting registration. Please try again.', 'error');
                    }
                });
            }

            // Refresh button
            if (refreshButton) {
                refreshButton.addEventListener('click', loadRegistrations);
            }

            // Export button
            if (exportButton) {
                exportButton.addEventListener('click', exportToCSV);
            }

            // Mobile menu functionality
            const mobileMenuButton = document.getElementById('mobile-menu-button');
            const mobileMenu = document.getElementById('mobile-menu');
            
            if (mobileMenuButton && mobileMenu) {
                mobileMenuButton.addEventListener('click', function() {
                    mobileMenu.classList.toggle('hidden');
                });
            }

            // Initial load
            loadRegistrations();
            
            // Real-time updates
            vaccinationData.onRegistrationsUpdate((registrations) => {
                displayRegistrations(registrations);
                updateStatistics(registrations);
            });
        });