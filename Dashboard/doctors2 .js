

    //Firebase Configuration and JavaScript -->
    <script>
        // Firebase Configuration
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
        firebase.initializeApp(firebaseConfig);
        const database = firebase.database();

        // Doctor Appointment Data Management
        class DoctorAppointmentData {
            constructor() {
                this.db = firebase.database();
                this.appointmentsRef = this.db.ref('doctorAppointments');
                this.doctorsRef = this.db.ref('doctors');
                this.patientsRef = this.db.ref('patients');
                this.appointments = [];
                this.doctors = [];
                this.patients = [];
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

            async getAllDoctors() {
                try {
                    const snapshot = await this.doctorsRef.once('value');
                    const doctors = snapshot.val();
                    
                    if (!doctors) {
                        return [];
                    }

                    return Object.entries(doctors).map(([key, value]) => ({
                        id: key,
                        ...value
                    }));
                } catch (error) {
                    console.error('Error fetching doctors:', error);
                    return [];
                }
            }

            async getAllPatients() {
                try {
                    const snapshot = await this.patientsRef.once('value');
                    const patients = snapshot.val();
                    
                    if (!patients) {
                        return [];
                    }

                    return Object.entries(patients).map(([key, value]) => ({
                        id: key,
                        ...value
                    }));
                } catch (error) {
                    console.error('Error fetching patients:', error);
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

            onDoctorsUpdate(callback) {
                this.doctorsRef.on('value', (snapshot) => {
                    const doctors = snapshot.val();
                    if (!doctors) {
                        callback([]);
                        return;
                    }

                    const doctorsArray = Object.entries(doctors).map(([key, value]) => ({
                        id: key,
                        ...value
                    }));

                    callback(doctorsArray);
                });
            }

            onPatientsUpdate(callback) {
                this.patientsRef.on('value', (snapshot) => {
                    const patients = snapshot.val();
                    if (!patients) {
                        callback([]);
                        return;
                    }

                    const patientsArray = Object.entries(patients).map(([key, value]) => ({
                        id: key,
                        ...value
                    }));

                    callback(patientsArray);
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

            async deleteDoctor(doctorId) {
                try {
                    await this.doctorsRef.child(doctorId).remove();
                    return { success: true };
                } catch (error) {
                    console.error('Error deleting doctor:', error);
                    return { success: false, error: error.message };
                }
            }

            async deletePatient(patientId) {
                try {
                    await this.patientsRef.child(patientId).remove();
                    return { success: true };
                } catch (error) {
                    console.error('Error deleting patient:', error);
                    return { success: false, error: error.message };
                }
            }
        }

        // Initialize doctor appointment data manager
        const doctorAppointmentData = new DoctorAppointmentData();

        // Dashboard State
        let allAppointments = [];
        let allDoctors = [];
        let allPatients = [];
        let currentAppointmentsPage = 1;
        const pageSize = 10;
        let filteredAppointments = [];
        let filteredDoctors = [];
        let filteredPatients = [];

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

        function formatDateTime(dateTimeString) {
            if (!dateTimeString) return 'N/A';
            const date = new Date(dateTimeString);
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
                
                allAppointments = await doctorAppointmentData.getAllAppointments();
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

        async function loadDoctors() {
            try {
                document.getElementById('loading-doctors').classList.remove('hidden');
                document.getElementById('no-doctors-message').classList.add('hidden');
                
                allDoctors = await doctorAppointmentData.getAllDoctors();
                filteredDoctors = [...allDoctors];
                
                displayDoctors();
                updateStatistics();
                
                document.getElementById('loading-doctors').classList.add('hidden');
                
                if (allDoctors.length === 0) {
                    document.getElementById('no-doctors-message').classList.remove('hidden');
                }
            } catch (error) {
                console.error('Error loading doctors:', error);
                showNotification('Error loading doctor data.', 'error');
                document.getElementById('loading-doctors').classList.add('hidden');
            }
        }

        async function loadPatients() {
            try {
                document.getElementById('loading-patients').classList.remove('hidden');
                document.getElementById('no-patients-message').classList.add('hidden');
                
                allPatients = await doctorAppointmentData.getAllPatients();
                filteredPatients = [...allPatients];
                
                displayPatients();
                updateStatistics();
                
                document.getElementById('loading-patients').classList.add('hidden');
                
                if (allPatients.length === 0) {
                    document.getElementById('no-patients-message').classList.remove('hidden');
                }
            } catch (error) {
                console.error('Error loading patients:', error);
                showNotification('Error loading patient data.', 'error');
                document.getElementById('loading-patients').classList.add('hidden');
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
                    <tr class="appointment-row border-b border-gray-200">
                        <td class="px-4 py-3">${escapeHtml(appointment.patientName)}</td>
                        <td class="px-4 py-3">${appointment.doctorName}</td>
                        <td class="px-4 py-3">
                            <span class="specialty-badge">${appointment.specialty}</span>
                        </td>
                        <td class="px-4 py-3">${formatDateTime(appointment.appointmentDateTime)}</td>
                        <td class="px-4 py-3">
                            <span class="status-badge ${statusClass}">${statusText}</span>
                        </td>
                        <td class="px-4 py-3">${appointment.reason || 'General Consultation'}</td>
                        <td class="px-4 py-3">
                            <button onclick="updateAppointmentStatus('${appointment.id}', 'confirmed')" class="bg-blue-500 text-white px-2 py-1 rounded text-xs hover:bg-blue-600 mr-1" title="Confirm Appointment">
                                <i class="fas fa-check"></i>
                            </button>
                            <button onclick="updateAppointmentStatus('${appointment.id}', 'completed')" class="bg-green-500 text-white px-2 py-1 rounded text-xs hover:bg-green-600 mr-1" title="Mark as Completed">
                                <i class="fas fa-check-double"></i>
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

        function displayDoctors() {
            const doctorsBody = document.getElementById('doctors-body');
            const noDoctorsMessage = document.getElementById('no-doctors-message');

            if (filteredDoctors.length === 0) {
                doctorsBody.innerHTML = '';
                noDoctorsMessage.classList.remove('hidden');
                return;
            }

            noDoctorsMessage.classList.add('hidden');
            
            doctorsBody.innerHTML = filteredDoctors.map(doctor => {
                const doctorAppointments = allAppointments.filter(app => app.doctorName === doctor.name);
                
                return `
                    <tr class="appointment-row border-b border-gray-200">
                        <td class="px-4 py-3">${escapeHtml(doctor.name)}</td>
                        <td class="px-4 py-3">
                            <span class="specialty-badge">${doctor.specialty}</span>
                        </td>
                        <td class="px-4 py-3">${doctor.qualification}</td>
                        <td class="px-4 py-3">${doctor.experience} years</td>
                        <td class="px-4 py-3">${doctorAppointments.length}</td>
                        <td class="px-4 py-3">
                            <span class="status-badge status-confirmed">Active</span>
                        </td>
                        <td class="px-4 py-3">
                            <button onclick="viewDoctorDetails('${doctor.id}')" class="bg-blue-500 text-white px-2 py-1 rounded text-xs hover:bg-blue-600 mr-1" title="View Details">
                                <i class="fas fa-eye"></i>
                            </button>
                            <button onclick="deleteDoctor('${doctor.id}')" class="bg-red-500 text-white px-2 py-1 rounded text-xs hover:bg-red-600" title="Delete Doctor">
                                <i class="fas fa-trash"></i>
                            </button>
                        </td>
                    </tr>
                `;
            }).join('');
        }

        function displayPatients() {
            const patientsBody = document.getElementById('patients-body');
            const noPatientsMessage = document.getElementById('no-patients-message');

            if (filteredPatients.length === 0) {
                patientsBody.innerHTML = '';
                noPatientsMessage.classList.remove('hidden');
                return;
            }

            noPatientsMessage.classList.add('hidden');
            
            patientsBody.innerHTML = filteredPatients.map(patient => {
                const patientAppointments = allAppointments.filter(app => app.patientName === patient.name);
                const lastAppointment = patientAppointments.length > 0 ? 
                    patientAppointments[patientAppointments.length - 1] : null;
                
                return `
                    <tr class="appointment-row border-b border-gray-200">
                        <td class="px-4 py-3">${escapeHtml(patient.name)}</td>
                        <td class="px-4 py-3">${patient.email}</td>
                        <td class="px-4 py-3">${patient.phone}</td>
                        <td class="px-4 py-3">${patient.age}</td>
                        <td class="px-4 py-3">${patientAppointments.length}</td>
                        <td class="px-4 py-3">${lastAppointment ? formatDate(lastAppointment.appointmentDateTime) : 'Never'}</td>
                        <td class="px-4 py-3">
                            <button onclick="viewPatientDetails('${patient.id}')" class="bg-blue-500 text-white px-2 py-1 rounded text-xs hover:bg-blue-600 mr-1" title="View Details">
                                <i class="fas fa-eye"></i>
                            </button>
                            <button onclick="deletePatient('${patient.id}')" class="bg-red-500 text-white px-2 py-1 rounded text-xs hover:bg-red-600" title="Delete Patient">
                                <i class="fas fa-trash"></i>
                            </button>
                        </td>
                    </tr>
                `;
            }).join('');
        }

        function updateStatistics() {
            const today = new Date().toDateString();
            const todayAppointments = allAppointments.filter(appointment => 
                new Date(appointment.appointmentDateTime).toDateString() === today
            );
            
            const pendingAppointments = allAppointments.filter(appointment => 
                appointment.status === 'pending'
            );
            const confirmedAppointments = allAppointments.filter(appointment => 
                appointment.status === 'confirmed'
            );
            
            const appointmentsChange = todayAppointments.length > 0 ? `+${todayAppointments.length} today` : 'No new appointments today';
            
            document.getElementById('total-appointments').textContent = allAppointments.length;
            document.getElementById('today-appointments').textContent = todayAppointments.length;
            document.getElementById('pending-appointments').textContent = pendingAppointments.length;
            document.getElementById('confirmed-appointments').textContent = confirmedAppointments.length;
            document.getElementById('appointments-change').textContent = appointmentsChange;
            document.getElementById('today-date').textContent = new Date().toLocaleDateString();
            
            // Calculate percentages
            const pendingPercent = allAppointments.length > 0 ? Math.round((pendingAppointments.length / allAppointments.length) * 100) : 0;
            const confirmedPercent = allAppointments.length > 0 ? Math.round((confirmedAppointments.length / allAppointments.length) * 100) : 0;
            
            document.getElementById('pending-percent').textContent = `${pendingPercent}% of total`;
            document.getElementById('confirmed-percent').textContent = `${confirmedPercent}% of total`;
            
            // Update specialty statistics
            updateSpecialtyStats(allAppointments);
            
            // Update system metrics
            updateSystemMetrics(allAppointments, allDoctors, allPatients);
        }

        function updateSpecialtyStats(appointments) {
            const specialtyCounts = {};
            appointments.forEach(appointment => {
                const specialty = appointment.specialty || 'General';
                specialtyCounts[specialty] = (specialtyCounts[specialty] || 0) + 1;
            });
            
            const specialtyStatsContainer = document.getElementById('specialty-stats');
            specialtyStatsContainer.innerHTML = '';
            
            Object.entries(specialtyCounts).forEach(([specialty, count]) => {
                const percent = Math.round((count / appointments.length) * 100);
                specialtyStatsContainer.innerHTML += `
                    <div class="bg-gray-50 p-4 rounded-lg">
                        <div class="text-lg font-bold text-blue-600">${count}</div>
                        <div class="text-sm text-gray-600">${specialty}</div>
                        <div class="text-xs text-gray-500">${percent}% of total</div>
                    </div>
                `;
            });
        }

        function updateSystemMetrics(appointments, doctors, patients) {
            document.getElementById('total-patients').textContent = patients.length;
            document.getElementById('total-doctors').textContent = doctors.length;
            
            // Calculate average appointments per day (last 7 days)
            const sevenDaysAgo = new Date();
            sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);
            
            const recentAppointments = appointments.filter(app => 
                new Date(app.appointmentDateTime) > sevenDaysAgo
            );
            
            const avgAppointments = recentAppointments.length > 0 ? 
                Math.round(recentAppointments.length / 7) : 0;
            document.getElementById('avg-appointments').textContent = avgAppointments;
            
            // Find most popular specialty
            const specialtyCounts = {};
            appointments.forEach(appointment => {
                const specialty = appointment.specialty || 'General';
                specialtyCounts[specialty] = (specialtyCounts[specialty] || 0) + 1;
            });
            
            let popularSpecialty = '-';
            let maxCount = 0;
            Object.entries(specialtyCounts).forEach(([specialty, count]) => {
                if (count > maxCount) {
                    maxCount = count;
                    popularSpecialty = specialty;
                }
            });
            
            document.getElementById('popular-specialty').textContent = popularSpecialty;
        }

        async function exportToCSV() {
            try {
                // Combine appointments, doctors, and patients data
                const appointments = await doctorAppointmentData.getAllAppointments();
                const doctors = await doctorAppointmentData.getAllDoctors();
                const patients = await doctorAppointmentData.getAllPatients();
                
                if (appointments.length === 0 && doctors.length === 0 && patients.length === 0) {
                    showNotification('No data to export.', 'info');
                    return;
                }

                let csvContent = '';
                
                // Export appointments
                if (appointments.length > 0) {
                    const appointmentHeaders = ['Patient Name', 'Doctor Name', 'Specialty', 'Appointment Date', 'Status', 'Reason', 'Patient Phone', 'Patient Email', 'Created Date'];
                    const appointmentData = appointments.map(appointment => [
                        appointment.patientName,
                        appointment.doctorName,
                        appointment.specialty,
                        formatDateTime(appointment.appointmentDateTime),
                        appointment.status,
                        appointment.reason,
                        appointment.patientPhone,
                        appointment.patientEmail,
                        formatDateTime(appointment.createdAt)
                    ]);

                    csvContent += 'DOCTOR APPOINTMENTS\n';
                    csvContent += appointmentHeaders.join(',') + '\n';
                    csvContent += appointmentData.map(row => row.map(field => `"${field}"`).join(',')).join('\n');
                    csvContent += '\n\n';
                }
                
                // Export doctors
                if (doctors.length > 0) {
                    const doctorHeaders = ['Name', 'Specialty', 'Qualification', 'Experience', 'Hospital', 'Phone', 'Email'];
                    const doctorData = doctors.map(doctor => [
                        doctor.name,
                        doctor.specialty,
                        doctor.qualification,
                        doctor.experience,
                        doctor.hospital,
                        doctor.phone,
                        doctor.email
                    ]);

                    csvContent += 'DOCTORS\n';
                    csvContent += doctorHeaders.join(',') + '\n';
                    csvContent += doctorData.map(row => row.map(field => `"${field}"`).join(',')).join('\n');
                    csvContent += '\n\n';
                }
                
                // Export patients
                if (patients.length > 0) {
                    const patientHeaders = ['Name', 'Email', 'Phone', 'Age', 'Last Appointment'];
                    const patientData = patients.map(patient => {
                        const patientAppointments = appointments.filter(app => app.patientName === patient.name);
                        const lastAppointment = patientAppointments.length > 0 ? 
                            patientAppointments[patientAppointments.length - 1] : null;
                        
                        return [
                            patient.name,
                            patient.email,
                            patient.phone,
                            patient.age,
                            lastAppointment ? formatDate(lastAppointment.appointmentDateTime) : 'Never'
                        ];
                    });

                    csvContent += 'PATIENTS\n';
                    csvContent += patientHeaders.join(',') + '\n';
                    csvContent += patientData.map(row => row.map(field => `"${field}"`).join(',')).join('\n');
                }

                const blob = new Blob([csvContent], { type: 'text/csv' });
                const url = window.URL.createObjectURL(blob);
                const a = document.createElement('a');
                a.href = url;
                a.download = `doctor-appointments-${new Date().toISOString().split('T')[0]}.csv`;
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
                const result = await doctorAppointmentData.updateAppointmentStatus(appointmentId, status);
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
                    const result = await doctorAppointmentData.deleteAppointment(appointmentId);
                    if (result.success) {
                        showNotification('Appointment deleted successfully!', 'success');
                        loadAppointments();
                    }
                } catch (error) {
                    showNotification('Error deleting appointment.', 'error');
                }
            }
        };

        window.deleteDoctor = async function(doctorId) {
            if (confirm('Are you sure you want to delete this doctor?')) {
                try {
                    const result = await doctorAppointmentData.deleteDoctor(doctorId);
                    if (result.success) {
                        showNotification('Doctor deleted successfully!', 'success');
                        loadDoctors();
                    }
                } catch (error) {
                    showNotification('Error deleting doctor.', 'error');
                }
            }
        };

        window.deletePatient = async function(patientId) {
            if (confirm('Are you sure you want to delete this patient?')) {
                try {
                    const result = await doctorAppointmentData.deletePatient(patientId);
                    if (result.success) {
                        showNotification('Patient deleted successfully!', 'success');
                        loadPatients();
                    }
                } catch (error) {
                    showNotification('Error deleting patient.', 'error');
                }
            }
        };

        window.viewDoctorDetails = function(doctorId) {
            const doctor = allDoctors.find(d => d.id === doctorId);
            if (doctor) {
                const details = `
Name: ${doctor.name}
Specialty: ${doctor.specialty}
Qualification: ${doctor.qualification}
Experience: ${doctor.experience} years
Hospital: ${doctor.hospital}
Phone: ${doctor.phone}
Email: ${doctor.email}
                `;
                alert(details);
            }
        };

        window.viewPatientDetails = function(patientId) {
            const patient = allPatients.find(p => p.id === patientId);
            if (patient) {
                const patientAppointments = allAppointments.filter(app => app.patientName === patient.name);
                const details = `
Name: ${patient.name}
Email: ${patient.email}
Phone: ${patient.phone}
Age: ${patient.age}
Total Appointments: ${patientAppointments.length}
Last Appointment: ${patientAppointments.length > 0 ? 
    formatDateTime(patientAppointments[patientAppointments.length - 1].appointmentDateTime) : 'Never'}
                `;
                alert(details);
            }
        };

        window.addNewAppointment = function() {
            showNotification('New appointment functionality would be implemented here.', 'info');
            // In a real implementation, you would show a form to add a new appointment
        };

        window.addNewDoctor = function() {
            showNotification('New doctor functionality would be implemented here.', 'info');
            // In a real implementation, you would show a form to add a new doctor
        };

        window.clearAllData = function() {
            if (confirm('Are you sure you want to clear ALL appointment data? This action cannot be undone.')) {
                showNotification('Data clearing functionality would be implemented here.', 'info');
                // In a real implementation, you would call methods to clear the database
            }
        };

        window.generateReport = function() {
            showNotification('Report generation would be implemented here.', 'info');
            // In a real implementation, you would generate a detailed appointment report
        };

        // Event Listeners
        document.addEventListener('DOMContentLoaded', function() {
            const refreshButton = document.getElementById('refresh-data');
            const refreshDoctorsButton = document.getElementById('refresh-doctors');
            const refreshPatientsButton = document.getElementById('refresh-patients');
            const searchAppointmentsInput = document.getElementById('search-appointments');
            const searchDoctorsInput = document.getElementById('search-doctors');
            const searchPatientsInput = document.getElementById('search-patients');
            const prevAppointmentsButton = document.getElementById('prev-appointments-page');
            const nextAppointmentsButton = document.getElementById('next-appointments-page');
            const mobileMenuButton = document.getElementById('mobile-menu-button');
            const mobileMenu = document.getElementById('mobile-menu');

            // Refresh buttons
            if (refreshButton) {
                refreshButton.addEventListener('click', loadAppointments);
            }
            if (refreshDoctorsButton) {
                refreshDoctorsButton.addEventListener('click', loadDoctors);
            }
            if (refreshPatientsButton) {
                refreshPatientsButton.addEventListener('click', loadPatients);
            }

            // Search functionality
            if (searchAppointmentsInput) {
                searchAppointmentsInput.addEventListener('input', function() {
                    const searchTerm = this.value.toLowerCase();
                    if (searchTerm) {
                        filteredAppointments = allAppointments.filter(appointment => 
                            appointment.patientName?.toLowerCase().includes(searchTerm) ||
                            appointment.doctorName?.toLowerCase().includes(searchTerm) ||
                            appointment.specialty?.toLowerCase().includes(searchTerm) ||
                            appointment.reason?.toLowerCase().includes(searchTerm)
                        );
                    } else {
                        filteredAppointments = [...allAppointments];
                    }
                    currentAppointmentsPage = 1;
                    displayAppointments();
                });
            }

            if (searchDoctorsInput) {
                searchDoctorsInput.addEventListener('input', function() {
                    const searchTerm = this.value.toLowerCase();
                    if (searchTerm) {
                        filteredDoctors = allDoctors.filter(doctor => 
                            doctor.name?.toLowerCase().includes(searchTerm) ||
                            doctor.specialty?.toLowerCase().includes(searchTerm) ||
                            doctor.qualification?.toLowerCase().includes(searchTerm)
                        );
                    } else {
                        filteredDoctors = [...allDoctors];
                    }
                    displayDoctors();
                });
            }

            if (searchPatientsInput) {
                searchPatientsInput.addEventListener('input', function() {
                    const searchTerm = this.value.toLowerCase();
                    if (searchTerm) {
                        filteredPatients = allPatients.filter(patient => 
                            patient.name?.toLowerCase().includes(searchTerm) ||
                            patient.email?.toLowerCase().includes(searchTerm) ||
                            patient.phone?.toLowerCase().includes(searchTerm)
                        );
                    } else {
                        filteredPatients = [...allPatients];
                    }
                    displayPatients();
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

            // Initial load
            loadAppointments();
            loadDoctors();
            loadPatients();
            
            // Real-time updates
            doctorAppointmentData.onAppointmentsUpdate((appointments) => {
                allAppointments = appointments;
                filteredAppointments = [...allAppointments];
                displayAppointments();
                updateStatistics();
            });

            doctorAppointmentData.onDoctorsUpdate((doctors) => {
                allDoctors = doctors;
                filteredDoctors = [...allDoctors];
                displayDoctors();
                updateStatistics();
            });

            doctorAppointmentData.onPatientsUpdate((patients) => {
                allPatients = patients;
                filteredPatients = [...allPatients];
                displayPatients();
                updateStatistics();
            });
        });
 