
        // EmailJS Configuration - Replace these with your actual EmailJS credentials
        // Get these from: https://www.emailjs.com/
        const EMAILJS_CONFIG = {
            PUBLIC_KEY: 'GhBaQI-xJytzUAQjs',  // Replace with your public key
            SERVICE_ID: 'service_vh1szck',  // Replace with your service ID
            TEMPLATE_ID: 'template_73c20ql' // Replace with your template ID
        };

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
        const firebaseApp = firebase.initializeApp(firebaseConfig);
        const database = firebase.database();
        const auth = firebase.auth();

        // Initialize EmailJS
        (function() {
            emailjs.init(EMAILJS_CONFIG.PUBLIC_KEY);
            console.log('EmailJS initialized with Public Key:', EMAILJS_CONFIG.PUBLIC_KEY);
        })();

        // Chart instances
        let servicesChart, monthlyTrendChart, pregnancyStageChart;

        // Dashboard Functions
        class MaternityDashboard {
            constructor() {
                this.appointmentsRef = database.ref('maternity-appointments');
                this.patientsRef = database.ref('patients');
                this.birthsRef = database.ref('births');
                this.appointments = [];
                this.patients = [];
                this.births = [];
            }

            // Load all data
            async loadAllData() {
                await this.loadAppointments();
                await this.loadPatients();
                await this.loadBirths();
                this.updateDashboard();
                this.setupRealTimeListeners();
            }

            // Load maternity appointments
            async loadAppointments() {
                try {
                    const snapshot = await this.appointmentsRef.once('value');
                    const appointmentsData = snapshot.val();
                    
                    if (appointmentsData) {
                        this.appointments = Object.entries(appointmentsData).map(([id, appointment]) => ({
                            id,
                            ...appointment
                        }));
                    } else {
                        this.appointments = [];
                    }
                } catch (error) {
                    console.error('Error loading appointments:', error);
                    this.appointments = [];
                }
            }

            // Load patients data
            async loadPatients() {
                try {
                    const snapshot = await this.patientsRef.once('value');
                    const patientsData = snapshot.val();
                    
                    if (patientsData) {
                        this.patients = Object.entries(patientsData).map(([id, patient]) => ({
                            id,
                            ...patient
                        }));
                    } else {
                        this.patients = [];
                    }
                } catch (error) {
                    console.error('Error loading patients:', error);
                    this.patients = [];
                }
            }

            // Load births data
            async loadBirths() {
                try {
                    const snapshot = await this.birthsRef.once('value');
                    const birthsData = snapshot.val();
                    
                    if (birthsData) {
                        this.births = Object.entries(birthsData).map(([id, birth]) => ({
                            id,
                            ...birth
                        }));
                    } else {
                        this.births = [];
                    }
                } catch (error) {
                    console.error('Error loading births:', error);
                    this.births = [];
                }
            }

            // Setup real-time listeners
            setupRealTimeListeners() {
                this.appointmentsRef.on('value', (snapshot) => {
                    const appointmentsData = snapshot.val();
                    this.appointments = appointmentsData ? Object.entries(appointmentsData).map(([id, appointment]) => ({
                        id,
                        ...appointment
                    })) : [];
                    this.updateDashboard();
                });

                this.patientsRef.on('value', (snapshot) => {
                    const patientsData = snapshot.val();
                    this.patients = patientsData ? Object.entries(patientsData).map(([id, patient]) => ({
                        id,
                        ...patient
                    })) : [];
                    this.updateDashboard();
                });

                this.birthsRef.on('value', (snapshot) => {
                    const birthsData = snapshot.val();
                    this.births = birthsData ? Object.entries(birthsData).map(([id, birth]) => ({
                        id,
                        ...birth
                    })) : [];
                    this.updateDashboard();
                });
            }

            // Update dashboard with current data
            updateDashboard() {
                this.updateStatistics();
                this.updateRecentActivity();
                this.updatePregnancyOverview();
                this.updateCharts();
            }

            // Update statistics cards
            updateStatistics() {
                const totalAppointments = this.appointments.length;
                
                // Count active pregnancies (patients with pregnancy week data)
                const activePregnancies = this.appointments.filter(apt => 
                    apt.pregnancyWeek && apt.pregnancyWeek > 0
                ).length;

                // Count this week's appointments
                const oneWeekFromNow = new Date();
                oneWeekFromNow.setDate(oneWeekFromNow.getDate() + 7);
                const weeklyAppointments = this.appointments.filter(apt => {
                    if (!apt.preferredDate) return false;
                    const aptDate = new Date(apt.preferredDate);
                    return aptDate <= oneWeekFromNow && aptDate >= new Date();
                }).length;

                // Count different service types
                const serviceTypes = new Set(this.appointments.map(apt => apt.serviceType).filter(Boolean));
                const serviceDistribution = serviceTypes.size;

                // Update DOM elements
                document.getElementById('totalAppointments').textContent = totalAppointments;
                document.getElementById('activePregnancies').textContent = activePregnancies;
                document.getElementById('weeklyAppointments').textContent = weeklyAppointments;
                document.getElementById('serviceDistribution').textContent = serviceDistribution;
            }

            // Update recent activity sections
            updateRecentActivity() {
                this.updateRecentAppointments();
                this.updateUpcomingAppointments();
            }

            updateRecentAppointments() {
                const container = document.getElementById('recentAppointments');
                const countElement = document.getElementById('recentAppointmentsCount');
                
                // Get recent appointments (last 5)
                const recentAppointments = [...this.appointments]
                    .sort((a, b) => {
                        const dateA = a.createdAt ? new Date(a.createdAt) : new Date(0);
                        const dateB = b.createdAt ? new Date(b.createdAt) : new Date(0);
                        return dateB - dateA;
                    })
                    .slice(0, 5);

                countElement.textContent = recentAppointments.length;

                if (recentAppointments.length === 0) {
                    container.innerHTML = `
                        <div class="text-center text-gray-500 py-8">
                            <i class="fas fa-calendar text-4xl mb-2 opacity-50"></i>
                            <p>No recent appointments</p>
                        </div>
                    `;
                    return;
                }

                container.innerHTML = recentAppointments.map(apt => {
                    const name = `${apt.firstName || ''} ${apt.lastName || ''}`.trim() || 'Unknown';
                    const service = apt.serviceType || 'General Consultation';
                    const pregnancyWeek = apt.pregnancyWeek ? `Week ${apt.pregnancyWeek}` : 'Not specified';
                    const createdAt = apt.createdAt || 'N/A';
                    
                    // Add status badge
                    const status = apt.status || 'pending';
                    const statusColors = {
                        'completed': 'bg-green-100 text-green-800',
                        'rejected': 'bg-red-100 text-red-800',
                        'pending': 'bg-yellow-100 text-yellow-800',
                        'accepted': 'bg-blue-100 text-blue-800'
                    };
                    const statusText = status.charAt(0).toUpperCase() + status.slice(1);
                    
                    return `
                    <div class="flex flex-col p-3 bg-gray-50 rounded-lg hover:bg-pink-50 transition duration-200">
                        <div class="flex items-center justify-between mb-2">
                            <div class="flex items-center">
                                <div class="w-10 h-10 bg-pink-100 rounded-full flex items-center justify-center mr-3">
                                    <i class="fas fa-female text-pink-600"></i>
                                </div>
                                <div>
                                    <p class="font-semibold text-gray-800">${name}</p>
                                    <p class="text-sm text-gray-600">${service} • ${pregnancyWeek}</p>
                                </div>
                            </div>
                            <span class="text-xs ${statusColors[status] || 'bg-gray-100 text-gray-800'} px-2 py-1 rounded-full">${statusText}</span>
                        </div>
                        <div class="flex justify-between items-center">
                            <span class="text-xs text-gray-500">${this.formatDate(createdAt)}</span>
                            <div class="flex space-x-2">
                                <button onclick="dashboard.showAppointmentDetails('${apt.id}')" class="px-2 py-1 bg-blue-500 text-white text-xs rounded hover:bg-blue-600 transition">
                                    <i class="fas fa-eye mr-1"></i>Details
                                </button>
                                <button onclick="dashboard.acceptAppointment('${apt.id}')" class="px-2 py-1 bg-green-500 text-white text-xs rounded hover:bg-green-600 transition">
                                    <i class="fas fa-check mr-1"></i>Accept
                                </button>
                                <button onclick="dashboard.rejectAppointment('${apt.id}')" class="px-2 py-1 bg-red-500 text-white text-xs rounded hover:bg-red-600 transition">
                                    <i class="fas fa-times mr-1"></i>Reject
                                </button>
                                <button onclick="dashboard.deleteAppointment('${apt.id}')" class="px-2 py-1 bg-gray-500 text-white text-xs rounded hover:bg-gray-600 transition">
                                    <i class="fas fa-trash mr-1"></i>Delete
                                </button>
                            </div>
                        </div>
                    </div>
                `;
                }).join('');
            }

            updateUpcomingAppointments() {
                const container = document.getElementById('upcomingAppointments');
                const countElement = document.getElementById('upcomingAppointmentsCount');
                
                // Get upcoming appointments (next 7 days)
                const oneWeekFromNow = new Date();
                oneWeekFromNow.setDate(oneWeekFromNow.getDate() + 7);
                
                const upcomingAppointments = this.appointments
                    .filter(apt => {
                        if (!apt.preferredDate) return false;
                        const aptDate = new Date(apt.preferredDate);
                        return aptDate <= oneWeekFromNow && aptDate >= new Date();
                    })
                    .sort((a, b) => new Date(a.preferredDate) - new Date(b.preferredDate))
                    .slice(0, 5);

                countElement.textContent = upcomingAppointments.length;

                if (upcomingAppointments.length === 0) {
                    container.innerHTML = `
                        <div class="text-center text-gray-500 py-8">
                            <i class="fas fa-clock text-4xl mb-2 opacity-50"></i>
                            <p>No upcoming appointments</p>
                        </div>
                    `;
                    return;
                }

                container.innerHTML = upcomingAppointments.map(apt => {
                    const name = `${apt.firstName || ''} ${apt.lastName || ''}`.trim() || 'Unknown';
                    const service = apt.serviceType || 'General Consultation';
                    const date = apt.preferredDate ? this.formatDate(apt.preferredDate) : 'Not scheduled';
                    
                    // Add status badge
                    const status = apt.status || 'pending';
                    const statusColors = {
                        'completed': 'bg-green-100 text-green-800',
                        'rejected': 'bg-red-100 text-red-800',
                        'pending': 'bg-yellow-100 text-yellow-800',
                        'accepted': 'bg-blue-100 text-blue-800'
                    };
                    const statusText = status.charAt(0).toUpperCase() + status.slice(1);
                    
                    return `
                    <div class="flex flex-col p-3 bg-gray-50 rounded-lg hover:bg-green-50 transition duration-200">
                        <div class="flex items-center justify-between mb-2">
                            <div class="flex items-center">
                                <div class="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center mr-3">
                                    <i class="fas fa-calendar-check text-green-600"></i>
                                </div>
                                <div>
                                    <p class="font-semibold text-gray-800">${name}</p>
                                    <p class="text-sm text-gray-600">${service}</p>
                                </div>
                            </div>
                            <span class="text-xs ${statusColors[status] || 'bg-gray-100 text-gray-800'} px-2 py-1 rounded-full">${statusText}</span>
                        </div>
                        <div class="flex justify-between items-center">
                            <span class="text-xs text-gray-500">${date}</span>
                            <div class="flex space-x-2">
                                <button onclick="dashboard.showAppointmentDetails('${apt.id}')" class="px-2 py-1 bg-blue-500 text-white text-xs rounded hover:bg-blue-600 transition">
                                    <i class="fas fa-eye mr-1"></i>Details
                                </button>
                                <button onclick="dashboard.acceptAppointment('${apt.id}')" class="px-2 py-1 bg-green-500 text-white text-xs rounded hover:bg-green-600 transition">
                                    <i class="fas fa-check mr-1"></i>Accept
                                </button>
                                <button onclick="dashboard.rejectAppointment('${apt.id}')" class="px-2 py-1 bg-red-500 text-white text-xs rounded hover:bg-red-600 transition">
                                    <i class="fas fa-times mr-1"></i>Reject
                                </button>
                                <button onclick="dashboard.deleteAppointment('${apt.id}')" class="px-2 py-1 bg-gray-500 text-white text-xs rounded hover:bg-gray-600 transition">
                                    <i class="fas fa-trash mr-1"></i>Delete
                                </button>
                            </div>
                        </div>
                    </div>
                `;
                }).join('');
            }

            // Update pregnancy overview
            updatePregnancyOverview() {
                const container = document.getElementById('pregnancyWeeks');
                
                // Group by pregnancy week
                const weekGroups = {};
                this.appointments.forEach(apt => {
                    if (apt.pregnancyWeek) {
                        const week = apt.pregnancyWeek;
                        if (!weekGroups[week]) {
                            weekGroups[week] = 0;
                        }
                        weekGroups[week]++;
                    }
                });

                const weeks = Object.keys(weekGroups).sort((a, b) => a - b);

                if (weeks.length === 0) {
                    container.innerHTML = `
                        <div class="text-center text-gray-500 py-8">
                            <i class="fas fa-baby text-4xl mb-2 opacity-50"></i>
                            <p>No pregnancy data available</p>
                        </div>
                    `;
                    return;
                }

                container.innerHTML = weeks.map(week => {
                    const count = weekGroups[week];
                    const progress = (week / 42) * 100; // 42 weeks max pregnancy
                    
                    return `
                    <div class="space-y-2">
                        <div class="flex justify-between text-sm">
                            <span class="font-medium">Week ${week}</span>
                            <span class="text-gray-600">${count} patient(s)</span>
                        </div>
                        <div class="w-full bg-gray-200 rounded-full h-2">
                            <div class="pregnancy-progress h-2 rounded-full" style="--progress: ${progress}%"></div>
                        </div>
                    </div>
                    `;
                }).join('');
            }

            // Update charts
            updateCharts() {
                this.updateServicesChart();
                this.updateMonthlyTrendChart();
                this.updatePregnancyStageChart();
            }

            updateServicesChart() {
                const ctx = document.getElementById('servicesChart').getContext('2d');
                
                if (servicesChart) {
                    servicesChart.destroy();
                }

                // Count service types
                const serviceCounts = {};
                this.appointments.forEach(apt => {
                    const service = apt.serviceType || 'Unknown';
                    if (!serviceCounts[service]) {
                        serviceCounts[service] = 0;
                    }
                    serviceCounts[service]++;
                });

                servicesChart = new Chart(ctx, {
                    type: 'doughnut',
                    data: {
                        labels: Object.keys(serviceCounts),
                        datasets: [{
                            data: Object.values(serviceCounts),
                            backgroundColor: [
                                '#ec4899', '#f59e0b', '#10b981', '#3b82f6', 
                                '#8b5cf6', '#06b6d4', '#84cc16', '#f97316'
                            ],
                            borderWidth: 2,
                            borderColor: '#ffffff'
                        }]
                    },
                    options: {
                        responsive: true,
                        plugins: {
                            legend: {
                                position: 'bottom'
                            }
                        }
                    }
                });
            }

            updateMonthlyTrendChart() {
                const ctx = document.getElementById('monthlyTrendChart').getContext('2d');
                
                if (monthlyTrendChart) {
                    monthlyTrendChart.destroy();
                }

                // Get last 6 months data
                const months = this.getLast6Months();
                const monthlyData = this.getMonthlyAppointmentData(months);

                monthlyTrendChart = new Chart(ctx, {
                    type: 'line',
                    data: {
                        labels: months,
                        datasets: [{
                            label: 'Maternity Appointments',
                            data: monthlyData,
                            borderColor: '#ec4899',
                            backgroundColor: 'rgba(236, 72, 153, 0.1)',
                            tension: 0.4,
                            fill: true
                        }]
                    },
                    options: {
                        responsive: true,
                        plugins: {
                            legend: {
                                position: 'top'
                            }
                        },
                        scales: {
                            y: {
                                beginAtZero: true
                            }
                        }
                    }
                });
            }

            updatePregnancyStageChart() {
                const ctx = document.getElementById('pregnancyStageChart').getContext('2d');
                
                if (pregnancyStageChart) {
                    pregnancyStageChart.destroy();
                }

                // Group by pregnancy stage
                const stages = {
                    'First Trimester (1-12)': 0,
                    'Second Trimester (13-27)': 0,
                    'Third Trimester (28-42)': 0
                };

                this.appointments.forEach(apt => {
                    if (apt.pregnancyWeek) {
                        const week = parseInt(apt.pregnancyWeek);
                        if (week >= 1 && week <= 12) {
                            stages['First Trimester (1-12)']++;
                        } else if (week >= 13 && week <= 27) {
                            stages['Second Trimester (13-27)']++;
                        } else if (week >= 28 && week <= 42) {
                            stages['Third Trimester (28-42)']++;
                        }
                    }
                });

                pregnancyStageChart = new Chart(ctx, {
                    type: 'bar',
                    data: {
                        labels: Object.keys(stages),
                        datasets: [{
                            label: 'Patients',
                            data: Object.values(stages),
                            backgroundColor: ['#93c5fd', '#60a5fa', '#3b82f6'],
                            borderWidth: 1
                        }]
                    },
                    options: {
                        responsive: true,
                        plugins: {
                            legend: {
                                display: false
                            }
                        },
                        scales: {
                            y: {
                                beginAtZero: true
                            }
                        }
                    }
                });
            }

            // Send email notification to PATIENT
            async sendAppointmentNotification(appointment, action) {
                try {
                    const patientName = `${appointment.firstName || ''} ${appointment.lastName || ''}`.trim();
                    const patientEmail = appointment.email;
                    
                    console.log('=== EMAIL DEBUG INFO ===');
                    console.log('1. Patient Name:', patientName);
                    console.log('2. Patient Email (from database):', patientEmail);
                    console.log('3. EmailJS Template ID:', EMAILJS_CONFIG.TEMPLATE_ID);
                    console.log('4. Action:', action);
                    
                    if (!patientEmail) {
                        console.error('ERROR: No email found for patient:', patientName);
                        showNotification('Cannot send email: Patient email not found', 'error');
                        return false;
                    }

                    // Validate email format
                    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                    if (!emailRegex.test(patientEmail)) {
                        console.error('ERROR: Invalid email format for patient:', patientEmail);
                        showNotification('Cannot send email: Invalid patient email format', 'error');
                        return false;
                    }

                    // Prepare email template parameters for PATIENT
                    const templateParams = {
                        to_name: patientName,
                        to_email: patientEmail, // This sends to PATIENT
                        from_name: 'MahamaCare Hospital',
                        from_email: 'noreply@mahamacarehospital.com',
                        reply_to: 'unitycoders2025@gmail.com',
                        appointment_date: appointment.preferredDate ? 
                            this.formatDate(appointment.preferredDate) : 'Not specified',
                        appointment_time: appointment.preferredTime || 'Not specified',
                        service_type: appointment.serviceType || 'General Consultation',
                        pregnancy_week: appointment.pregnancyWeek ? 
                            `Week ${appointment.pregnancyWeek}` : 'Not specified',
                        action: action,
                        status: action === 'accept' ? 'ACCEPTED' : 'REJECTED',
                        message: action === 'accept' ? 
                            `Dear ${patientName}, your maternity appointment has been accepted. Please arrive 15 minutes before your scheduled time of ${appointment.preferredTime || 'the scheduled time'} on ${appointment.preferredDate ? this.formatDate(appointment.preferredDate) : 'the scheduled date'}.` :
                            `Dear ${patientName}, we regret to inform you that your maternity appointment has been rejected. Please contact the hospital for more information.`,
                        hospital_name: 'MahamaCare Hospital',
                        hospital_phone: '+250 000 000',
                        hospital_email: 'unitycoders2025@gmail.com'
                    };

                    console.log('5. Email Template Parameters:', JSON.stringify(templateParams, null, 2));
                    console.log('6. Sending to patient email:', patientEmail);
                    console.log('=== END DEBUG INFO ===');

                    // Send email using EmailJS - THIS GOES TO PATIENT
                    const response = await emailjs.send(
                        EMAILJS_CONFIG.SERVICE_ID,
                        EMAILJS_CONFIG.TEMPLATE_ID,
                        templateParams
                    );

                    console.log('SUCCESS: Email sent to PATIENT:', response);
                    console.log('Status:', response.status);
                    console.log('Text:', response.text);
                    return true;
                    
                } catch (error) {
                    console.error('FAILED to send email to patient:', error);
                    console.error('Error details:', {
                        message: error.message,
                        text: error.text,
                        status: error.status
                    });
                    return false;
                }
            }

            // Accept appointment with email notification to PATIENT
            async acceptAppointment(appointmentId) {
                if (confirm('Accept this appointment and send confirmation email to the PATIENT?')) {
                    try {
                        const appointment = this.appointments.find(apt => apt.id === appointmentId);
                        if (!appointment) {
                            showNotification('Appointment not found!', 'error');
                            return;
                        }

                        console.log('Accepting appointment for patient:', {
                            name: `${appointment.firstName} ${appointment.lastName}`,
                            email: appointment.email,
                            id: appointmentId
                        });

                        // Update appointment status
                        await database.ref(`maternity-appointments/${appointmentId}`).update({
                            status: 'accepted',
                            updatedAt: new Date().toISOString()
                        });

                        // Send email notification to PATIENT
                        const emailSent = await this.sendAppointmentNotification(appointment, 'accept');
                        
                        if (emailSent) {
                            showNotification('Appointment accepted and notification email sent to PATIENT!', 'success');
                        } else {
                            showNotification('Appointment accepted but email notification failed to PATIENT. Please check patient email address.', 'error');
                        }
                        
                    } catch (error) {
                        console.error('Error accepting appointment:', error);
                        showNotification('Error accepting appointment: ' + error.message, 'error');
                    }
                }
            }

            // Reject appointment with email notification to PATIENT
            async rejectAppointment(appointmentId) {
                if (confirm('Reject this appointment and send notification email to the PATIENT?')) {
                    try {
                        const appointment = this.appointments.find(apt => apt.id === appointmentId);
                        if (!appointment) {
                            showNotification('Appointment not found!', 'error');
                            return;
                        }

                        console.log('Rejecting appointment for patient:', {
                            name: `${appointment.firstName} ${appointment.lastName}`,
                            email: appointment.email,
                            id: appointmentId
                        });

                        // Update appointment status
                        await database.ref(`maternity-appointments/${appointmentId}`).update({
                            status: 'rejected',
                            updatedAt: new Date().toISOString()
                        });

                        // Send email notification to PATIENT
                        const emailSent = await this.sendAppointmentNotification(appointment, 'reject');
                        
                        if (emailSent) {
                            showNotification('Appointment rejected and notification email sent to PATIENT!', 'success');
                        } else {
                            showNotification('Appointment rejected but email notification failed to PATIENT. Please check patient email address.', 'error');
                        }
                        
                    } catch (error) {
                        console.error('Error rejecting appointment:', error);
                        showNotification('Error rejecting appointment: ' + error.message, 'error');
                    }
                }
            }

            // Complete appointment (kept for backward compatibility)
            async completeAppointment(appointmentId) {
                if (confirm('Mark this appointment as completed?')) {
                    try {
                        await database.ref(`maternity-appointments/${appointmentId}`).update({
                            status: 'completed',
                            updatedAt: new Date().toISOString()
                        });
                        showNotification('Appointment marked as completed!', 'success');
                    } catch (error) {
                        console.error('Error completing appointment:', error);
                        showNotification('Error completing appointment', 'error');
                    }
                }
            }

            async deleteAppointment(appointmentId) {
                if (confirm('Are you sure you want to delete this appointment? This action cannot be undone.')) {
                    try {
                        await database.ref(`maternity-appointments/${appointmentId}`).remove();
                        showNotification('Appointment deleted successfully!', 'success');
                    } catch (error) {
                        console.error('Error deleting appointment:', error);
                        showNotification('Error deleting appointment', 'error');
                    }
                }
            }

            // Show appointment details modal
            showAppointmentDetails(appointmentId) {
                const appointment = this.appointments.find(apt => apt.id === appointmentId);
                if (!appointment) {
                    showNotification('Appointment not found!', 'error');
                    return;
                }

                const modal = document.getElementById('appointmentModal');
                const detailsContainer = document.getElementById('appointmentDetails');

                // Format appointment details
                const details = `
                    <div class="detail-item">
                        <span class="detail-label">Patient Name:</span>
                        <span class="detail-value">${appointment.firstName || ''} ${appointment.lastName || ''}</span>
                    </div>
                    <div class="detail-item">
                        <span class="detail-label">Phone Number:</span>
                        <span class="detail-value">${appointment.phoneNumber || 'N/A'}</span>
                    </div>
                    <div class="detail-item">
                        <span class="detail-label">Email:</span>
                        <span class="detail-value">${appointment.email || 'N/A'}</span>
                    </div>
                    <div class="detail-item">
                        <span class="detail-label">Service Type:</span>
                        <span class="detail-value">${appointment.serviceType || 'General Consultation'}</span>
                    </div>
                    <div class="detail-item">
                        <span class="detail-label">Pregnancy Week:</span>
                        <span class="detail-value">${appointment.pregnancyWeek ? `Week ${appointment.pregnancyWeek}` : 'Not specified'}</span>
                    </div>
                    <div class="detail-item">
                        <span class="detail-label">Preferred Date:</span>
                        <span class="detail-value">${appointment.preferredDate ? this.formatDate(appointment.preferredDate) : 'Not scheduled'}</span>
                    </div>
                    <div class="detail-item">
                        <span class="detail-label">Preferred Time:</span>
                        <span class="detail-value">${appointment.preferredTime || 'Not specified'}</span>
                    </div>
                    <div class="detail-item">
                        <span class="detail-label">Status:</span>
                        <span class="detail-value">
                            <span class="px-2 py-1 rounded-full ${this.getStatusColor(appointment.status || 'pending')}">
                                ${(appointment.status || 'pending').charAt(0).toUpperCase() + (appointment.status || 'pending').slice(1)}
                            </span>
                        </span>
                    </div>
                    <div class="detail-item">
                        <span class="detail-label">Created At:</span>
                        <span class="detail-value">${appointment.createdAt ? this.formatDateTime(appointment.createdAt) : 'N/A'}</span>
                    </div>
                    <div class="detail-item">
                        <span class="detail-label">Last Updated:</span>
                        <span class="detail-value">${appointment.updatedAt ? this.formatDateTime(appointment.updatedAt) : 'N/A'}</span>
                    </div>
                    ${appointment.additionalNotes ? `
                    <div class="detail-item">
                        <span class="detail-label">Additional Notes:</span>
                        <span class="detail-value">${appointment.additionalNotes}</span>
                    </div>
                    ` : ''}
                `;

                detailsContainer.innerHTML = details;
                modal.classList.add('active');
            }

            // Close appointment details modal
            closeAppointmentDetails() {
                const modal = document.getElementById('appointmentModal');
                modal.classList.remove('active');
            }

            // Get status color class
            getStatusColor(status) {
                const colors = {
                    'completed': 'bg-green-100 text-green-800',
                    'rejected': 'bg-red-100 text-red-800',
                    'pending': 'bg-yellow-100 text-yellow-800',
                    'accepted': 'bg-blue-100 text-blue-800'
                };
                return colors[status] || 'bg-gray-100 text-gray-800';
            }

            // Utility functions
            getLast6Months() {
                const months = [];
                for (let i = 5; i >= 0; i--) {
                    const date = new Date();
                    date.setMonth(date.getMonth() - i);
                    months.push(date.toLocaleString('default', { month: 'short' }));
                }
                return months;
            }

            getMonthlyAppointmentData(months) {
                const currentYear = new Date().getFullYear();
                return months.map(month => {
                    return this.appointments.filter(apt => {
                        const aptDate = new Date(apt.createdAt || 0);
                        return aptDate.getFullYear() === currentYear && 
                               aptDate.toLocaleString('default', { month: 'short' }) === month;
                    }).length;
                });
            }

            formatDate(dateString) {
                if (!dateString || dateString === 'N/A') return 'N/A';
                try {
                    const date = new Date(dateString);
                    return date.toLocaleDateString();
                } catch (e) {
                    return 'N/A';
                }
            }

            formatDateTime(dateString) {
                if (!dateString || dateString === 'N/A') return 'N/A';
                try {
                    const date = new Date(dateString);
                    return date.toLocaleString();
                } catch (e) {
                    return 'N/A';
                }
            }
        }

        // Global dashboard instance
        let dashboard;

        // Initialize dashboard when DOM is loaded
        document.addEventListener('DOMContentLoaded', async function() {
            // Check authentication state first
            auth.onAuthStateChanged(async (user) => {
                if (!user) {
                    // User is not logged in, redirect to login page
                    console.log('No user found, redirecting to login...');
                    // showNotification('Please login to access the dashboard', 'error');
                    
                    setTimeout(() => {
                        window.location.href = '/login.html';
                    }, 2000);
                    return;
                }
                
                // User is logged in, hide loading overlay
                document.getElementById('loadingOverlay').style.display = 'none';
                
                // Initialize dashboard
                dashboard = new MaternityDashboard();
                
                // Load dashboard data
                await dashboard.loadAllData();
                
                // Show welcome notification
                // showNotification(`Welcome, ${user.email}! Dashboard loaded successfully.`, 'success');
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
                    localStorage.removeItem('user');
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

            // Mobile menu functionality
            const mobileMenuButton = document.getElementById('mobile-menu-button');
            const mobileMenu = document.getElementById('mobile-menu');
            
            if (mobileMenuButton && mobileMenu) {
                mobileMenuButton.addEventListener('click', () => {
                    mobileMenu.classList.toggle('hidden');
                });
            }

            // Sidebar toggle functionality for mobile
            const sidebarToggle = document.getElementById('sidebar-toggle');
            const sidebar = document.getElementById('sidebar');
            const sidebarOverlay = document.getElementById('sidebar-overlay');
            
            if (sidebarToggle && sidebar && sidebarOverlay) {
                sidebarToggle.addEventListener('click', () => {
                    sidebar.classList.toggle('mobile-visible');
                    sidebarOverlay.classList.toggle('active');
                });

                // Close sidebar when clicking on overlay
                sidebarOverlay.addEventListener('click', () => {
                    sidebar.classList.remove('mobile-visible');
                    sidebarOverlay.classList.remove('active');
                });

                // Close sidebar when clicking on a link (for mobile)
                const sidebarLinks = sidebar.querySelectorAll('a');
                sidebarLinks.forEach(link => {
                    link.addEventListener('click', () => {
                        if (window.innerWidth < 768) {
                            sidebar.classList.remove('mobile-visible');
                            sidebarOverlay.classList.remove('active');
                        }
                    });
                });
            }
        });

        // Export function
        function exportMaternityData() {
            alert('Maternity data export functionality would be implemented here');
        }

        // Notification function
        function showNotification(message, type = 'success') {
            const existingNotifications = document.querySelectorAll('.notification');
            existingNotifications.forEach(notification => notification.remove());
            
            const notification = document.createElement('div');
            notification.className = `notification ${type}`;
            
            const icon = type === 'success' ? 'fa-check-circle' : 'fa-exclamation-circle';
            notification.innerHTML = `
                <i class="fas ${icon}"></i>
                <span>${message}</span>
            `;
            
            document.body.appendChild(notification);
            
            setTimeout(() => {
                if (notification.parentNode) {
                    notification.parentNode.removeChild(notification);
                }
            }, 5000);
        }

        // Test function for email sending (for debugging)
        window.testPatientEmail = async function() {
            try {
                const testAppointment = {
                    firstName: 'Test',
                    lastName: 'Patient',
                    email: 'testpatient@example.com', // CHANGE THIS TO A REAL PATIENT EMAIL
                    preferredDate: '2024-12-25',
                    preferredTime: '10:00 AM',
                    serviceType: 'Prenatal Care',
                    pregnancyWeek: '24'
                };
                
                console.log('=== TESTING EMAIL TO PATIENT ===');
                console.log('Using patient email:', testAppointment.email);
                
                const result = await dashboard.sendAppointmentNotification(testAppointment, 'accept');
                
                if (result) {
                    showNotification('Test email sent to PATIENT! Check patient email inbox.', 'success');
                } else {
                    showNotification('Test email failed to send to PATIENT', 'error');
                }
            } catch (error) {
                console.error('Test error:', error);
                showNotification('Test failed: ' + error.message, 'error');
            }
        };
        
        // Function to check EmailJS template configuration
        window.checkEmailJSTemplate = function() {
            console.log('=== EMAILJS TEMPLATE CHECK ===');
            console.log('1. Go to: https://dashboard.emailjs.com/');
            console.log('2. Click on "Email Templates"');
            console.log('3. Find template: ' + EMAILJS_CONFIG.TEMPLATE_ID);
            console.log('4. Check "To" field - MUST be: {{to_email}}');
            console.log('5. NOT your email address or {{to_name}}');
            console.log('6. Save template if changed');
            console.log('=== END TEMPLATE CHECK ===');
            showNotification('Check console for EmailJS template instructions', 'success');
        };
