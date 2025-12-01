       // Firebase Configuration and Initialization
        // (Already included in the head section)
        
        // Form submission handler
        document.getElementById('appointmentForm').addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form values
            const firstName = document.getElementById('firstName').value;
            const lastName = document.getElementById('lastName').value;
            const email = document.getElementById('email').value;
            const phone = document.getElementById('phone').value;
            const dob = document.getElementById('dob').value;
            const condition = document.getElementById('condition').value;
            const appointmentDate = document.getElementById('appointmentDate').value;
            const message = document.getElementById('message').value;
            
            // Create appointment object
            const appointment = {
                firstName: firstName,
                lastName: lastName,
                email: email,
                phone: phone,
                dob: dob,
                condition: condition,
                appointmentDate: appointmentDate,
                message: message,
                status: 'pending', // Default status
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString()
            };
            
            // Show loading state
            const submitButton = document.querySelector('#appointmentForm button[type="submit"]');
            const originalText = submitButton.textContent;
            submitButton.innerHTML = '<i class="fas fa-spinner fa-spin mr-2"></i> Booking...';
            submitButton.disabled = true;
            
            // Save to Firebase
            database.ref('appointments').push(appointment)
                .then(() => {
                    // Show success message
                    showFormMessage('Appointment booked successfully! We will contact you soon.', 'success');
                    
                    // Reset form
                    document.getElementById('appointmentForm').reset();
                })
                .catch((error) => {
                    console.error('Error saving appointment:', error);
                    showFormMessage('Sorry, there was an error booking your appointment. Please try again.', 'error');
                })
                .finally(() => {
                    // Restore button state
                    submitButton.textContent = originalText;
                    submitButton.disabled = false;
                });
        });
        
        // Function to show form messages
        function showFormMessage(message, type) {
            const messageDiv = document.getElementById('formMessage');
            messageDiv.textContent = message;
            messageDiv.className = type === 'success' ? 
                'bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative' :
                'bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative';
            messageDiv.classList.remove('hidden');
            
            // Auto-hide after 5 seconds
            setTimeout(() => {
                messageDiv.classList.add('hidden');
            }, 5000);
        }
        
        // Set minimum date for appointment to today
        document.getElementById('appointmentDate').min = new Date().toISOString().split('T')[0];
        
        // Set maximum date for DOB to today
        document.getElementById('dob').max = new Date().toISOString().split('T')[0];
        
        // Dashboard functionality
        document.addEventListener('DOMContentLoaded', function() {
            // Dashboard modal elements
            const dashboardModal = document.getElementById('dashboardModal');
            const closeDashboardModal = document.getElementById('closeDashboardModal');
            const refreshDashboard = document.getElementById('refreshDashboard');
            
            // Open dashboard modal when clicking dashboard link
            document.querySelector('a[href="#dashboard"]').addEventListener('click', function(e) {
                e.preventDefault();
                dashboardModal.style.display = 'block';
                loadAppointments();
            });
            
            // Close dashboard modal
            closeDashboardModal.addEventListener('click', function() {
                dashboardModal.style.display = 'none';
            });
            
            // Refresh dashboard
            refreshDashboard.addEventListener('click', function() {
                loadAppointments();
            });
            
            // Close modal when clicking outside
            window.addEventListener('click', function(e) {
                if (e.target === dashboardModal) {
                    dashboardModal.style.display = 'none';
                }
            });
        });
        
        // Load appointments from Firebase
        function loadAppointments() {
            const appointmentsRef = database.ref('appointments');
            
            appointmentsRef.on('value', (snapshot) => {
                const appointments = snapshot.val();
                const appointmentsTableBody = document.getElementById('appointmentsTableBody');
                const noAppointmentsMessage = document.getElementById('noAppointmentsMessage');
                
                // Clear table
                appointmentsTableBody.innerHTML = '';
                
                if (appointments) {
                    // Show table
                    appointmentsTableBody.parentElement.parentElement.classList.remove('hidden');
                    noAppointmentsMessage.classList.add('hidden');
                    
                    let totalCount = 0;
                    let pendingCount = 0;
                    let acceptedCount = 0;
                    
                    // Loop through appointments and add to table
                    Object.keys(appointments).forEach(key => {
                        const appointment = appointments[key];
                        totalCount++;
                        
                        if (appointment.status === 'pending') pendingCount++;
                        if (appointment.status === 'accepted') acceptedCount++;
                        
                        const row = document.createElement('tr');
                        row.className = 'hover:bg-gray-50';
                        
                        row.innerHTML = `
                            <td class="py-3 px-4">${appointment.firstName} ${appointment.lastName}</td>
                            <td class="py-3 px-4">${formatCondition(appointment.condition)}</td>
                            <td class="py-3 px-4">${formatDate(appointment.appointmentDate)}</td>
                            <td class="py-3 px-4">
                                <span class="px-2 py-1 rounded-full text-xs font-semibold ${getStatusClass(appointment.status)}">
                                    ${appointment.status.charAt(0).toUpperCase() + appointment.status.slice(1)}
                                </span>
                            </td>
                            <td class="py-3 px-4">
                                <div class="flex space-x-2">
                                    <button onclick="updateAppointmentStatus('${key}', 'accepted')" class="bg-green-500 hover:bg-green-600 text-white px-3 py-1 rounded text-sm">
                                        Accept
                                    </button>
                                    <button onclick="updateAppointmentStatus('${key}', 'rejected')" class="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded text-sm">
                                        Reject
                                    </button>
                                    <button onclick="viewAppointmentDetails('${key}')" class="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded text-sm">
                                        View
                                    </button>
                                </div>
                            </td>
                        `;
                        
                        appointmentsTableBody.appendChild(row);
                    });
                    
                    // Update counters
                    document.getElementById('totalAppointments').textContent = totalCount;
                    document.getElementById('pendingAppointments').textContent = pendingCount;
                    document.getElementById('acceptedAppointments').textContent = acceptedCount;
                } else {
                    // Show no appointments message
                    appointmentsTableBody.parentElement.parentElement.classList.add('hidden');
                    noAppointmentsMessage.classList.remove('hidden');
                    
                    // Reset counters
                    document.getElementById('totalAppointments').textContent = '0';
                    document.getElementById('pendingAppointments').textContent = '0';
                    document.getElementById('acceptedAppointments').textContent = '0';
                }
            });
        }
        
        // Update appointment status
        function updateAppointmentStatus(appointmentId, status) {
            database.ref('appointments/' + appointmentId).update({
                status: status,
                updatedAt: new Date().toISOString()
            })
            .then(() => {
                showToast(`Appointment ${status} successfully`, 'success');
            })
            .catch((error) => {
                console.error('Error updating appointment:', error);
                showToast('Error updating appointment', 'error');
            });
        }
        
        // View appointment details
        function viewAppointmentDetails(appointmentId) {
            database.ref('appointments/' + appointmentId).once('value')
            .then((snapshot) => {
                const appointment = snapshot.val();
                
                // Create and show details modal
                const detailsModal = document.createElement('div');
                detailsModal.className = 'modal';
                detailsModal.innerHTML = `
                    <div class="modal-content">
                        <div class="modal-header">
                            <h2 class="text-2xl font-bold text-gray-800">Appointment Details</h2>
                            <button onclick="this.parentElement.parentElement.parentElement.remove()" class="text-gray-500 hover:text-gray-700">
                                <i class="fas fa-times text-xl"></i>
                            </button>
                        </div>
                        <div class="modal-body">
                            <div class="space-y-4">
                                <div class="grid grid-cols-2 gap-4">
                                    <div>
                                        <p class="font-semibold">Patient Name:</p>
                                        <p>${appointment.firstName} ${appointment.lastName}</p>
                                    </div>
                                    <div>
                                        <p class="font-semibold">Email:</p>
                                        <p>${appointment.email}</p>
                                    </div>
                                </div>
                                <div class="grid grid-cols-2 gap-4">
                                    <div>
                                        <p class="font-semibold">Phone:</p>
                                        <p>${appointment.phone}</p>
                                    </div>
                                    <div>
                                        <p class="font-semibold">Date of Birth:</p>
                                        <p>${formatDate(appointment.dob)}</p>
                                    </div>
                                </div>
                                <div class="grid grid-cols-2 gap-4">
                                    <div>
                                        <p class="font-semibold">Condition:</p>
                                        <p>${formatCondition(appointment.condition)}</p>
                                    </div>
                                    <div>
                                        <p class="font-semibold">Appointment Date:</p>
                                        <p>${formatDate(appointment.appointmentDate)}</p>
                                    </div>
                                </div>
                                <div>
                                    <p class="font-semibold">Status:</p>
                                    <span class="px-2 py-1 rounded-full text-xs font-semibold ${getStatusClass(appointment.status)}">
                                        ${appointment.status.charAt(0).toUpperCase() + appointment.status.slice(1)}
                                    </span>
                                </div>
                                <div>
                                    <p class="font-semibold">Additional Information:</p>
                                    <p class="mt-1">${appointment.message || 'No additional information provided.'}</p>
                                </div>
                                <div class="grid grid-cols-2 gap-4">
                                    <div>
                                        <p class="font-semibold">Created:</p>
                                        <p>${formatDateTime(appointment.createdAt)}</p>
                                    </div>
                                    <div>
                                        <p class="font-semibold">Last Updated:</p>
                                        <p>${formatDateTime(appointment.updatedAt)}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                `;
                
                document.body.appendChild(detailsModal);
                detailsModal.style.display = 'block';
                
                // Close modal when clicking outside
                detailsModal.addEventListener('click', function(e) {
                    if (e.target === detailsModal) {
                        detailsModal.remove();
                    }
                });
            })
            .catch((error) => {
                console.error('Error fetching appointment details:', error);
                showToast('Error loading appointment details', 'error');
            });
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
            
            return conditionMap[condition] || condition;
        }
        
        function formatDate(dateString) {
            if (!dateString) return 'N/A';
            const date = new Date(dateString);
            return date.toLocaleDateString('en-US', { 
                year: 'numeric', 
                month: 'short', 
                day: 'numeric' 
            });
        }
        
        function formatDateTime(dateTimeString) {
            if (!dateTimeString) return 'N/A';
            const date = new Date(dateTimeString);
            return date.toLocaleString('en-US', { 
                year: 'numeric', 
                month: 'short', 
                day: 'numeric',
                hour: '2-digit',
                minute: '2-digit'
            });
        }
        
        function getStatusClass(status) {
            switch(status) {
                case 'pending': return 'status-pending';
                case 'accepted': return 'status-accepted';
                case 'rejected': return 'status-rejected';
                default: return 'bg-gray-200 text-gray-800';
            }
        }
        
        function showToast(message, type) {
            // Create toast element
            const toast = document.createElement('div');
            toast.className = `fixed top-4 right-4 z-50 px-6 py-3 rounded-lg shadow-lg text-white font-semibold ${
                type === 'success' ? 'bg-green-500' : 'bg-red-500'
            }`;
            toast.textContent = message;
            
            document.body.appendChild(toast);
            
            // Remove toast after 3 seconds
            setTimeout(() => {
                toast.remove();
            }, 3000);
        }