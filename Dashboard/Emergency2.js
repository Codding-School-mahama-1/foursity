 
        // EmailJS Configuration - Use your NEW template ID
        const EMAILJS_CONFIG = {
            PUBLIC_KEY: 'GhBaQI-xJytzUAQjs',
            SERVICE_ID: 'service_vh1szck',
            TEMPLATE_ID: 'template_5dwr27s' // Make sure this matches your template ID
        };
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

        // Initialize EmailJS
        (function() {
            emailjs.init(EMAILJS_CONFIG.PUBLIC_KEY);
            console.log('EmailJS initialized with template:', EMAILJS_CONFIG.TEMPLATE_ID);
        })();

        // Emergency System Data Management
        class EmergencySystemData {
            constructor() {
                this.db = firebase.database();
                this.emergenciesRef = this.db.ref('emergencies');
                this.reportsRef = this.db.ref('emergencyReports');
            }

            async getAllEmergencies() {
                try {
                    const snapshot = await this.emergenciesRef.once('value');
                    const emergencies = snapshot.val();
                    
                    if (!emergencies) {
                        return [];
                    }

                    return Object.entries(emergencies).map(([key, value]) => ({
                        id: key,
                        ...value
                    }));
                } catch (error) {
                    console.error('Error fetching emergencies:', error);
                    return [];
                }
            }

            async getAllReports() {
                try {
                    const snapshot = await this.reportsRef.once('value');
                    const reports = snapshot.val();
                    
                    if (!reports) {
                        return [];
                    }

                    return Object.entries(reports).map(([key, value]) => ({
                        id: key,
                        ...value
                    }));
                } catch (error) {
                    console.error('Error fetching reports:', error);
                    return [];
                }
            }

            onEmergenciesUpdate(callback) {
                this.emergenciesRef.on('value', (snapshot) => {
                    const emergencies = snapshot.val();
                    if (!emergencies) {
                        callback([]);
                        return;
                    }

                    const emergenciesArray = Object.entries(emergencies).map(([key, value]) => ({
                        id: key,
                        ...value
                    }));

                    callback(emergenciesArray);
                });
            }

            onReportsUpdate(callback) {
                this.reportsRef.on('value', (snapshot) => {
                    const reports = snapshot.val();
                    if (!reports) {
                        callback([]);
                        return;
                    }

                    const reportsArray = Object.entries(reports).map(([key, value]) => ({
                        id: key,
                        ...value
                    }));

                    callback(reportsArray);
                });
            }

            async updateEmergencyStatus(emergencyId, status) {
                try {
                    await this.emergenciesRef.child(emergencyId).update({
                        status: status,
                        updatedAt: new Date().toISOString()
                    });
                    return { success: true };
                } catch (error) {
                    console.error('Error updating emergency:', error);
                    return { success: false, error: error.message };
                }
            }

            async updateReportStatus(reportId, status, priority = null) {
                try {
                    const updates = {
                        status: status,
                        updatedAt: new Date().toISOString()
                    };
                    
                    if (priority) {
                        updates.priority = priority;
                    }
                    
                    await this.reportsRef.child(reportId).update(updates);
                    return { success: true };
                } catch (error) {
                    console.error('Error updating report:', error);
                    return { success: false, error: error.message };
                }
            }

            async deleteEmergency(emergencyId) {
                try {
                    await this.emergenciesRef.child(emergencyId).remove();
                    return { success: true };
                } catch (error) {
                    console.error('Error deleting emergency:', error);
                    return { success: false, error: error.message };
                }
            }

            async deleteReport(reportId) {
                try {
                    await this.reportsRef.child(reportId).remove();
                    return { success: true };
                } catch (error) {
                    console.error('Error deleting report:', error);
                    return { success: false, error: error.message };
                }
            }

            async simulateEmergency(emergencyData) {
                try {
                    const newEmergencyRef = this.emergenciesRef.push();
                    await newEmergencyRef.set({
                        ...emergencyData,
                        createdAt: new Date().toISOString(),
                        status: 'pending',
                        priority: 'high'
                    });
                    return { success: true, id: newEmergencyRef.key };
                } catch (error) {
                    console.error('Error simulating emergency:', error);
                    return { success: false, error: error.message };
                }
            }
        }

        // Initialize emergency system data manager
        const emergencySystemData = new EmergencySystemData();

        // Dashboard State
        let allEmergencies = [];
        let allReports = [];
        let currentEmergenciesPage = 1;
        let currentReportsPage = 1;
        const pageSize = 10;
        let filteredEmergencies = [];
        let filteredReports = [];

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
            return date.toLocaleDateString() + ' ' + date.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'});
        }

        function showNotification(message, type = 'info') {
            const existingNotifications = document.querySelectorAll('.notification');
            existingNotifications.forEach(notification => notification.remove());
            
            const notification = document.createElement('div');
            notification.className = `notification ${type}`;
            
            const icon = type === 'success' ? 'fa-check-circle' : 
                        type === 'error' ? 'fa-exclamation-circle' : 'fa-info-circle';
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

        // Updated Email function for NEW template format
        async function sendEmergencyEmailNotification(report, action, additionalNotes = '') {
            try {
                const reporterName = `${report.firstName} ${report.lastName || ''}`.trim();
                const reporterEmail = report.email;
                
                console.log('Sending emergency email to:', reporterEmail);
                
                if (!reporterEmail) {
                    showNotification('Cannot send email: No email found', 'error');
                    return false;
                }

                // Validate email
                const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                if (!emailRegex.test(reporterEmail)) {
                    showNotification('Invalid email format', 'error');
                    return false;
                }

                // Determine status based on action
                let status;
                let messageType;
                if (action === 'review') {
                    status = 'UNDER REVIEW';
                    messageType = 'Emergency Report Update';
                } else if (action === 'resolve') {
                    status = 'RESOLVED';
                    messageType = 'Emergency Report Resolved';
                } else if (action === 'reject') {
                    status = 'REJECTED';
                    messageType = 'Emergency Report Status';
                } else {
                    status = 'RECEIVED';
                    messageType = 'Emergency Report Confirmation';
                }
                
                // Format dates
                const reportedDate = formatTimestamp(report.createdAt);
                const currentDate = new Date().toLocaleDateString();
                const currentTime = new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'});
                
                // Create message based on status
                let messageText = '';
                if (status === 'UNDER REVIEW') {
                    messageText = 'Your emergency report has been received and is being reviewed by our emergency response team. We will contact you with updates.';
                } else if (status === 'RESOLVED') {
                    messageText = 'Your emergency report has been successfully resolved by our emergency response team. Thank you for bringing this to our attention.';
                } else if (status === 'REJECTED') {
                    messageText = 'Your emergency report has been reviewed but was not accepted for further action. If you believe this is an error, please contact our emergency hotline.';
                } else {
                    messageText = 'Thank you for reporting this emergency. Our team has received your report and will respond accordingly.';
                }
                
                if (additionalNotes) {
                    messageText += '\n\n' + additionalNotes;
                }

                // Prepare template parameters for NEW template format
                const templateParams = {
                    // Basic variables from your template
                    name: reporterName,
                    message_type: messageType,
                    date: `${currentDate} at ${currentTime}`,
                    
                    // Emergency specific variables
                    emergency_type: report.subject || 'General Emergency',
                    status: status,
                    notes: additionalNotes || '',
                    message: messageText,
                    
                    // Additional variables
                    to_email: reporterEmail,
                    subject: `${messageType}: ${report.subject || 'Emergency Report'}`,
                    
                    // Conditionals - set patient_info to false since we don't have patient data in emergency reports
                    patient_info: false,
                    patient_id: '',
                    patient_name: ''
                };

                console.log('Sending email with NEW template parameters:', templateParams);

                // Send email using your template
                const response = await emailjs.send(
                    EMAILJS_CONFIG.SERVICE_ID,
                    EMAILJS_CONFIG.TEMPLATE_ID,
                    templateParams
                );

                console.log('Emergency email sent successfully!', response);
                showNotification(`Email notification sent to ${reporterEmail}`, 'success');
                return true;
                
            } catch (error) {
                console.error('Failed to send emergency email:', error);
                console.error('Full error:', error);
                showNotification('Failed to send email: ' + error.message, 'error');
                return false;
            }
        }

        // Dashboard Functions
        async function loadEmergencies() {
            try {
                document.getElementById('loading-emergencies').classList.remove('hidden');
                document.getElementById('no-emergencies-message').classList.add('hidden');
                
                allEmergencies = await emergencySystemData.getAllEmergencies();
                filteredEmergencies = [...allEmergencies];
                
                displayEmergencies();
                updateStatistics();
                
                document.getElementById('loading-emergencies').classList.add('hidden');
                
                if (allEmergencies.length === 0) {
                    document.getElementById('no-emergencies-message').classList.remove('hidden');
                }
            } catch (error) {
                console.error('Error loading emergencies:', error);
                showNotification('Error loading emergency data.', 'error');
                document.getElementById('loading-emergencies').classList.add('hidden');
            }
        }

        async function loadReports() {
            try {
                document.getElementById('loading-reports').classList.remove('hidden');
                document.getElementById('no-reports-message').classList.add('hidden');
                
                allReports = await emergencySystemData.getAllReports();
                // Initialize status and priority if not set
                allReports.forEach(report => {
                    if (!report.status) {
                        report.status = 'new';
                    }
                    if (!report.priority) {
                        // Determine priority based on subject/content
                        const subject = report.subject || '';
                        const message = report.message || '';
                        const emergencyText = (subject + ' ' + message).toLowerCase();
                        
                        if (emergencyText.includes('fire') || 
                            emergencyText.includes('heart attack') || 
                            emergencyText.includes('bleeding') ||
                            emergencyText.includes('critical')) {
                            report.priority = 'high';
                        } else if (emergencyText.includes('accident') || 
                                 emergencyText.includes('injury') ||
                                 emergencyText.includes('emergency')) {
                            report.priority = 'medium';
                        } else {
                            report.priority = 'low';
                        }
                    }
                });
                
                filteredReports = [...allReports];
                
                displayReports();
                updateStatistics();
                
                document.getElementById('loading-reports').classList.add('hidden');
                
                if (allReports.length === 0) {
                    document.getElementById('no-reports-message').classList.remove('hidden');
                }
            } catch (error) {
                console.error('Error loading reports:', error);
                showNotification('Error loading report data.', 'error');
                document.getElementById('loading-reports').classList.add('hidden');
            }
        }

        function displayEmergencies() {
            const emergenciesBody = document.getElementById('emergencies-body');
            const noEmergenciesMessage = document.getElementById('no-emergencies-message');
            const paginationInfo = document.getElementById('emergencies-pagination-info');
            const prevButton = document.getElementById('prev-emergencies-page');
            const nextButton = document.getElementById('next-emergencies-page');

            if (filteredEmergencies.length === 0) {
                emergenciesBody.innerHTML = '';
                noEmergenciesMessage.classList.remove('hidden');
                paginationInfo.textContent = 'Showing 0 emergencies';
                prevButton.disabled = true;
                nextButton.disabled = true;
                return;
            }

            noEmergenciesMessage.classList.add('hidden');
            
            // Sort by date, newest first
            filteredEmergencies.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
            
            // Calculate pagination
            const totalPages = Math.ceil(filteredEmergencies.length / pageSize);
            const startIndex = (currentEmergenciesPage - 1) * pageSize;
            const endIndex = Math.min(startIndex + pageSize, filteredEmergencies.length);
            const pageEmergencies = filteredEmergencies.slice(startIndex, endIndex);
            
            emergenciesBody.innerHTML = pageEmergencies.map(emergency => {
                const status = emergency.status || 'pending';
                const priority = emergency.priority || 'medium';
                const statusClass = `status-${status}`;
                const priorityClass = `priority-${priority}`;
                const statusText = status.charAt(0).toUpperCase() + status.slice(1);
                const priorityText = priority.charAt(0).toUpperCase() + priority.slice(1);
                
                return `
                    <tr class="emergency-row border-b border-gray-200">
                        <td class="px-4 py-3">${escapeHtml(emergency.reporterName || 'Anonymous')}</td>
                        <td class="px-4 py-3">${emergency.emergencyType || 'Not specified'}</td>
                        <td class="px-4 py-3">${emergency.location || 'Unknown'}</td>
                        <td class="px-4 py-3">
                            <span class="status-badge ${priorityClass}">${priorityText}</span>
                        </td>
                        <td class="px-4 py-3">
                            <span class="status-badge ${statusClass}">${statusText}</span>
                        </td>
                        <td class="px-4 py-3 text-sm">${formatTimestamp(emergency.createdAt)}</td>
                        <td class="px-4 py-3">
                            <button onclick="updateEmergencyStatus('${emergency.id}', 'responding')" class="bg-blue-500 text-white px-2 py-1 rounded text-xs hover:bg-blue-600 mr-1" title="Mark as Responding">
                                <i class="fas fa-play"></i>
                            </button>
                            <button onclick="updateEmergencyStatus('${emergency.id}', 'resolved')" class="bg-green-500 text-white px-2 py-1 rounded text-xs hover:bg-green-600 mr-1" title="Mark as Resolved">
                                <i class="fas fa-check"></i>
                            </button>
                            <button onclick="deleteEmergency('${emergency.id}')" class="bg-red-500 text-white px-2 py-1 rounded text-xs hover:bg-red-600" title="Delete Emergency">
                                <i class="fas fa-trash"></i>
                            </button>
                        </td>
                    </tr>
                `;
            }).join('');
            
            // Update pagination info
            paginationInfo.textContent = `Showing ${startIndex + 1}-${endIndex} of ${filteredEmergencies.length} emergencies`;
            
            // Update pagination buttons
            prevButton.disabled = currentEmergenciesPage === 1;
            nextButton.disabled = currentEmergenciesPage === totalPages;
        }

        function displayReports() {
            const reportsBody = document.getElementById('reports-body');
            const noReportsMessage = document.getElementById('no-reports-message');
            const paginationInfo = document.getElementById('reports-pagination-info');
            const prevButton = document.getElementById('prev-reports-page');
            const nextButton = document.getElementById('next-reports-page');

            if (filteredReports.length === 0) {
                reportsBody.innerHTML = '';
                noReportsMessage.classList.remove('hidden');
                paginationInfo.textContent = 'Showing 0 reports';
                prevButton.disabled = true;
                nextButton.disabled = true;
                return;
            }

            noReportsMessage.classList.add('hidden');
            
            // Sort by date, newest first
            filteredReports.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
            
            // Calculate pagination
            const totalPages = Math.ceil(filteredReports.length / pageSize);
            const startIndex = (currentReportsPage - 1) * pageSize;
            const endIndex = Math.min(startIndex + pageSize, filteredReports.length);
            const pageReports = filteredReports.slice(startIndex, endIndex);
            
            reportsBody.innerHTML = pageReports.map(report => {
                const status = report.status || 'new';
                const priority = report.priority || 'medium';
                const statusClass = `status-${status.replace(' ', '-')}`;
                const priorityClass = `priority-${priority}`;
                const statusText = status.split('-').map(word => 
                    word.charAt(0).toUpperCase() + word.slice(1)
                ).join(' ');
                const priorityText = priority.charAt(0).toUpperCase() + priority.slice(1);
                
                return `
                    <tr class="emergency-row border-b border-gray-200">
                        <td class="px-4 py-3">${escapeHtml(report.firstName)} ${escapeHtml(report.lastName || '')}</td>
                        <td class="px-4 py-3">${report.subject || 'General Emergency'}</td>
                        <td class="px-4 py-3">${escapeHtml(report.email)}</td>
                        <td class="px-4 py-3">
                            <span class="status-badge ${priorityClass}">${priorityText}</span>
                        </td>
                        <td class="px-4 py-3">
                            <span class="status-badge ${statusClass}">${statusText}</span>
                        </td>
                        <td class="px-4 py-3 text-sm">${formatTimestamp(report.createdAt)}</td>
                        <td class="px-4 py-3">
                            ${status === 'new' ? `
                                <button onclick="markReportUnderReview('${report.id}')" class="bg-blue-500 text-white px-2 py-1 rounded text-xs hover:bg-blue-600 mr-1" title="Mark as Under Review">
                                    <i class="fas fa-eye"></i> Review
                                </button>
                            ` : ''}
                            ${status !== 'resolved' ? `
                                <button onclick="markReportResolved('${report.id}')" class="bg-green-500 text-white px-2 py-1 rounded text-xs hover:bg-green-600 mr-1" title="Mark as Resolved">
                                    <i class="fas fa-check"></i> Resolve
                                </button>
                            ` : ''}
                            ${status !== 'rejected' ? `
                                <button onclick="rejectEmergencyReport('${report.id}')" class="bg-red-500 text-white px-2 py-1 rounded text-xs hover:bg-red-600 mr-1" title="Reject Report">
                                    <i class="fas fa-times"></i> Reject
                                </button>
                            ` : ''}
                            <button onclick="viewEmergencyReport('${report.id}')" class="bg-gray-500 text-white px-2 py-1 rounded text-xs hover:bg-gray-600 mr-1" title="View Report">
                                <i class="fas fa-eye"></i>
                            </button>
                            <button onclick="deleteReport('${report.id}')" class="bg-red-500 text-white px-2 py-1 rounded text-xs hover:bg-red-600" title="Delete Report">
                                <i class="fas fa-trash"></i>
                            </button>
                        </td>
                    </tr>
                `;
            }).join('');
            
            // Update pagination info
            paginationInfo.textContent = `Showing ${startIndex + 1}-${endIndex} of ${filteredReports.length} reports`;
            
            // Update pagination buttons
            prevButton.disabled = currentReportsPage === 1;
            nextButton.disabled = currentReportsPage === totalPages;
        }

        function updateStatistics() {
            const today = new Date().toDateString();
            const todayEmergencies = allEmergencies.filter(emergency => 
                new Date(emergency.createdAt).toDateString() === today
            );
            
            const activeEmergencies = allEmergencies.filter(emergency => 
                emergency.status === 'pending' || emergency.status === 'responding'
            );
            const criticalEmergencies = allEmergencies.filter(emergency => 
                emergency.priority === 'high' || emergency.priority === 'critical'
            );
            const resolvedEmergencies = allEmergencies.filter(emergency => 
                emergency.status === 'resolved'
            );
            
            const emergenciesChange = todayEmergencies.length > 0 ? `+${todayEmergencies.length} today` : 'No new emergencies today';
            
            document.getElementById('total-emergencies').textContent = allEmergencies.length;
            document.getElementById('active-emergencies').textContent = activeEmergencies.length;
            document.getElementById('critical-emergencies').textContent = criticalEmergencies.length;
            document.getElementById('resolved-emergencies').textContent = resolvedEmergencies.length;
            document.getElementById('emergencies-change').textContent = emergenciesChange;
            
            // Show/hide active alert
            const activeAlert = document.getElementById('active-alert');
            if (activeEmergencies.length > 0) {
                activeAlert.classList.remove('hidden');
                activeAlert.textContent = `${activeEmergencies.length} require attention`;
            } else {
                activeAlert.classList.add('hidden');
            }
            
            // Calculate percentages
            const criticalPercent = allEmergencies.length > 0 ? Math.round((criticalEmergencies.length / allEmergencies.length) * 100) : 0;
            const resolvedPercent = allEmergencies.length > 0 ? Math.round((resolvedEmergencies.length / allEmergencies.length) * 100) : 0;
            
            document.getElementById('critical-percent').textContent = `${criticalPercent}% of total`;
            document.getElementById('resolved-percent').textContent = `${resolvedPercent}% of total`;
            
            // Update emergency type statistics
            updateEmergencyTypeStats(allEmergencies);
            
            // Update response metrics
            updateResponseMetrics(allEmergencies, allReports);
        }

        function updateEmergencyTypeStats(emergencies) {
            const typeCounts = {};
            emergencies.forEach(emergency => {
                const type = emergency.emergencyType || 'Not specified';
                typeCounts[type] = (typeCounts[type] || 0) + 1;
            });
            
            const typeStatsContainer = document.getElementById('emergency-type-stats');
            typeStatsContainer.innerHTML = '';
            
            Object.entries(typeCounts).forEach(([type, count]) => {
                const percent = Math.round((count / emergencies.length) * 100);
                typeStatsContainer.innerHTML += `
                    <div class="bg-gray-50 p-4 rounded-lg">
                        <div class="text-lg font-bold text-blue-600">${count}</div>
                        <div class="text-sm text-gray-600">${type}</div>
                        <div class="text-xs text-gray-500">${percent}% of total</div>
                    </div>
                `;
            });
        }

        function updateResponseMetrics(emergencies, reports) {
            document.getElementById('total-reports').textContent = reports.length;
            
            // Calculate average response time (simplified)
            const respondedEmergencies = emergencies.filter(emergency => 
                emergency.status === 'resolved' && emergency.createdAt && emergency.updatedAt
            );
            
            let totalResponseTime = 0;
            respondedEmergencies.forEach(emergency => {
                const created = new Date(emergency.createdAt);
                const updated = new Date(emergency.updatedAt);
                const responseTime = (updated - created) / (1000 * 60); // Convert to minutes
                totalResponseTime += responseTime;
            });
            
            const avgResponseTime = respondedEmergencies.length > 0 ? 
                Math.round(totalResponseTime / respondedEmergencies.length) : 0;
            document.getElementById('response-time').textContent = `${avgResponseTime} min`;
            
            // Find most common emergency type
            const typeCounts = {};
            emergencies.forEach(emergency => {
                const type = emergency.emergencyType || 'Not specified';
                typeCounts[type] = (typeCounts[type] || 0) + 1;
            });
            
            let commonEmergency = '-';
            let maxCount = 0;
            Object.entries(typeCounts).forEach(([type, count]) => {
                if (count > maxCount) {
                    maxCount = count;
                    commonEmergency = type;
                }
            });
            
            document.getElementById('common-emergency').textContent = commonEmergency;
            
            // Find peak hours (simplified)
            const hourCounts = {};
            emergencies.forEach(emergency => {
                if (emergency.createdAt) {
                    const hour = new Date(emergency.createdAt).getHours();
                    hourCounts[hour] = (hourCounts[hour] || 0) + 1;
                }
            });
            
            let peakHour = '-';
            let maxHourCount = 0;
            Object.entries(hourCounts).forEach(([hour, count]) => {
                if (count > maxHourCount) {
                    maxHourCount = count;
                    peakHour = `${hour}:00`;
                }
            });
            
            document.getElementById('peak-hours').textContent = peakHour;
        }

        async function exportToCSV() {
            try {
                // Combine emergencies and reports data
                const emergencies = await emergencySystemData.getAllEmergencies();
                const reports = await emergencySystemData.getAllReports();
                
                if (emergencies.length === 0 && reports.length === 0) {
                    showNotification('No data to export.', 'info');
                    return;
                }

                let csvContent = '';
                
                // Export emergencies
                if (emergencies.length > 0) {
                    const emergencyHeaders = ['Reporter', 'Emergency Type', 'Location', 'Priority', 'Status', 'Description', 'Created Date', 'Updated Date'];
                    const emergencyData = emergencies.map(emergency => [
                        emergency.reporterName || 'Anonymous',
                        emergency.emergencyType,
                        emergency.location,
                        emergency.priority,
                        emergency.status,
                        emergency.description || '',
                        formatTimestamp(emergency.createdAt),
                        emergency.updatedAt ? formatTimestamp(emergency.updatedAt) : 'N/A'
                    ]);

                    csvContent += 'EMERGENCY SYSTEM DATA\n';
                    csvContent += emergencyHeaders.join(',') + '\n';
                    csvContent += emergencyData.map(row => row.map(field => `"${field}"`).join(',')).join('\n');
                    csvContent += '\n\n';
                }
                
                // Export reports
                if (reports.length > 0) {
                    const reportHeaders = ['First Name', 'Last Name', 'Email', 'Phone', 'Emergency Type', 'Priority', 'Status', 'Message', 'Created Date'];
                    const reportData = reports.map(report => [
                        report.firstName,
                        report.lastName || '',
                        report.email,
                        report.phone,
                        report.subject,
                        report.priority || 'medium',
                        report.status || 'new',
                        report.message,
                        formatTimestamp(report.createdAt)
                    ]);

                    csvContent += 'EMERGENCY REPORTS DATA\n';
                    csvContent += reportHeaders.join(',') + '\n';
                    csvContent += reportData.map(row => row.map(field => `"${field}"`).join(',')).join('\n');
                }

                const blob = new Blob([csvContent], { type: 'text/csv' });
                const url = window.URL.createObjectURL(blob);
                const a = document.createElement('a');
                a.href = url;
                a.download = `emergency-system-data-${new Date().toISOString().split('T')[0]}.csv`;
                a.click();
                window.URL.revokeObjectURL(url);
                
                showNotification('Data exported successfully!', 'success');
            } catch (error) {
                console.error('Error exporting data:', error);
                showNotification('Error exporting data.', 'error');
            }
        }

        // Global functions for buttons
        window.updateEmergencyStatus = async function(emergencyId, status) {
            try {
                const result = await emergencySystemData.updateEmergencyStatus(emergencyId, status);
                if (result.success) {
                    showNotification(`Emergency marked as ${status}!`, 'success');
                    loadEmergencies();
                }
            } catch (error) {
                showNotification('Error updating emergency.', 'error');
            }
        };

        window.deleteEmergency = async function(emergencyId) {
            if (confirm('Are you sure you want to delete this emergency?')) {
                try {
                    const result = await emergencySystemData.deleteEmergency(emergencyId);
                    if (result.success) {
                        showNotification('Emergency deleted successfully!', 'success');
                        loadEmergencies();
                    }
                } catch (error) {
                    showNotification('Error deleting emergency.', 'error');
                }
            }
        };

        window.deleteReport = async function(reportId) {
            if (confirm('Are you sure you want to delete this emergency report?')) {
                try {
                    const result = await emergencySystemData.deleteReport(reportId);
                    if (result.success) {
                        showNotification('Emergency report deleted successfully!', 'success');
                        loadReports();
                    }
                } catch (error) {
                    showNotification('Error deleting emergency report.', 'error');
                }
            }
        };

        window.viewEmergencyReport = function(reportId) {
            const report = allReports.find(r => r.id === reportId);
            if (report) {
                const message = `
Name: ${report.firstName} ${report.lastName || ''}
Email: ${report.email}
Phone: ${report.phone || 'Not provided'}
Emergency Type: ${report.subject || 'General Emergency'}
Priority: ${report.priority || 'Medium'}
Status: ${report.status || 'New'}
Message: ${report.message}
Received: ${formatTimestamp(report.createdAt)}
${report.updatedAt ? `Last Updated: ${formatTimestamp(report.updatedAt)}` : ''}
                `;
                alert(message);
            }
        };

        // Mark report as under review with email notification
        window.markReportUnderReview = async function(reportId) {
            const report = allReports.find(r => r.id === reportId);
            if (!report) {
                showNotification('Report not found!', 'error');
                return;
            }

            const notes = prompt('Enter any additional notes for the reporter (optional):');
            
            try {
                console.log('Marking emergency report as under review for:', {
                    name: `${report.firstName} ${report.lastName}`,
                    email: report.email,
                    emergencyType: report.subject
                });

                // Update status in database
                const result = await emergencySystemData.updateReportStatus(reportId, 'under-review');
                
                if (result.success) {
                    // Send email notification to REPORTER using new template format
                    const emailSent = await sendEmergencyEmailNotification(report, 'review', notes);
                    
                    if (emailSent) {
                        showNotification('Emergency report marked as Under Review and notification email sent!', 'success');
                    } else {
                        showNotification('Emergency report marked as Under Review but email notification failed.', 'error');
                    }
                    
                    // Reload reports to show updated status
                    loadReports();
                }
            } catch (error) {
                console.error('Error updating emergency report:', error);
                showNotification('Error updating emergency report: ' + error.message, 'error');
            }
        };

        // Mark report as resolved with email notification
        window.markReportResolved = async function(reportId) {
            const report = allReports.find(r => r.id === reportId);
            if (!report) {
                showNotification('Report not found!', 'error');
                return;
            }

            const resolutionNotes = prompt('Enter resolution notes for the reporter (optional):');
            
            try {
                console.log('Marking emergency report as resolved for:', {
                    name: `${report.firstName} ${report.lastName}`,
                    email: report.email,
                    emergencyType: report.subject
                });

                // Update status in database
                const result = await emergencySystemData.updateReportStatus(reportId, 'resolved');
                
                if (result.success) {
                    // Send email notification to REPORTER using new template format
                    const emailSent = await sendEmergencyEmailNotification(report, 'resolve', resolutionNotes);
                    
                    if (emailSent) {
                        showNotification('Emergency report marked as Resolved and notification email sent!', 'success');
                    } else {
                        showNotification('Emergency report marked as Resolved but email notification failed.', 'error');
                    }
                    
                    // Reload reports to show updated status
                    loadReports();
                }
            } catch (error) {
                console.error('Error resolving emergency report:', error);
                showNotification('Error resolving emergency report: ' + error.message, 'error');
            }
        };

        // Reject emergency report with email notification
        window.rejectEmergencyReport = async function(reportId) {
            const report = allReports.find(r => r.id === reportId);
            if (!report) {
                showNotification('Report not found!', 'error');
                return;
            }

            const rejectionReason = prompt('Enter rejection reason for the reporter (optional):');
            
            try {
                console.log('Rejecting emergency report for:', {
                    name: `${report.firstName} ${report.lastName}`,
                    email: report.email,
                    emergencyType: report.subject
                });

                // Update status in database
                const result = await emergencySystemData.updateReportStatus(reportId, 'rejected');
                
                if (result.success) {
                    // Send email notification to REPORTER using new template format
                    const emailSent = await sendEmergencyEmailNotification(report, 'reject', rejectionReason);
                    
                    if (emailSent) {
                        showNotification('Emergency report rejected and notification email sent!', 'success');
                    } else {
                        showNotification('Emergency report rejected but email notification failed.', 'error');
                    }
                    
                    // Reload reports to show updated status
                    loadReports();
                }
            } catch (error) {
                console.error('Error rejecting emergency report:', error);
                showNotification('Error rejecting emergency report: ' + error.message, 'error');
            }
        };

        window.simulateEmergency = async function() {
            const emergencyTypes = [
                'Fire Emergency', 
                'Medical Emergency', 
                'Natural Disaster', 
                'Traffic Accident',
                'Security Incident'
            ];
            
            const locations = [
                'Sector A - Residential Area',
                'Sector B - Market Area', 
                'Sector C - School Zone',
                'Sector D - Medical Center',
                'Main Road - Highway'
            ];
            
            const randomType = emergencyTypes[Math.floor(Math.random() * emergencyTypes.length)];
            const randomLocation = locations[Math.floor(Math.random() * locations.length)];
            
            const emergencyData = {
                reporterName: 'System Simulation',
                emergencyType: randomType,
                location: randomLocation,
                description: `Simulated ${randomType} at ${randomLocation}`,
                priority: 'high'
            };
            
            try {
                const result = await emergencySystemData.simulateEmergency(emergencyData);
                if (result.success) {
                    showNotification('Emergency simulation created successfully!', 'success');
                    loadEmergencies();
                }
            } catch (error) {
                showNotification('Error simulating emergency.', 'error');
            }
        };

        window.simulateEmergencyReport = async function() {
            const firstNames = ['John', 'Jane', 'Robert', 'Mary', 'David', 'Sarah'];
            const lastNames = ['Smith', 'Johnson', 'Williams', 'Brown', 'Jones', 'Garcia'];
            const emergencyTypes = [
                'Medical Emergency',
                'Fire Emergency',
                'Traffic Accident',
                'Security Threat',
                'Natural Disaster',
                'Health Emergency'
            ];
            
            const randomFirstName = firstNames[Math.floor(Math.random() * firstNames.length)];
            const randomLastName = lastNames[Math.floor(Math.random() * lastNames.length)];
            const randomType = emergencyTypes[Math.floor(Math.random() * emergencyTypes.length)];
            
            const testReport = {
                firstName: randomFirstName,
                lastName: randomLastName,
                email: 'test@example.com',
                phone: '+250 123 456 789',
                subject: randomType,
                message: `This is a simulated emergency report for ${randomType}. Please review and take appropriate action.`,
                createdAt: new Date().toISOString(),
                status: 'new'
            };
            
            try {
                const newReportRef = database.ref('emergencyReports').push();
                await newReportRef.set(testReport);
                
                showNotification('Test emergency report created successfully!', 'success');
                loadReports();
            } catch (error) {
                showNotification('Error simulating emergency report.', 'error');
            }
        };

        window.clearAllData = function() {
            if (confirm('Are you sure you want to clear ALL emergency data? This action cannot be undone.')) {
                showNotification('Data clearing functionality would be implemented here.', 'info');
                // In a real implementation, you would call methods to clear the database
            }
        };

        window.generateEmergencyReport = function() {
            showNotification('Emergency report generation would be implemented here.', 'info');
            // In a real implementation, you would generate a detailed emergency report
        };

        // Test function for email sending (for debugging)
        window.testEmergencyEmail = async function() {
            try {
                // Create a test emergency report
                const testReport = {
                    firstName: 'Test',
                    lastName: 'Reporter',
                    email: 'unitycoders2025@gmail.com', // Use your email for testing
                    phone: '+250 123 456 789',
                    subject: 'TEST: Medical Emergency',
                    message: 'This is a test emergency report to verify email functionality.',
                    createdAt: new Date().toISOString(),
                    status: 'new'
                };
                
                console.log('=== TESTING EMERGENCY EMAIL SYSTEM ===');
                console.log('Using template:', EMAILJS_CONFIG.TEMPLATE_ID);
                
                const result = await sendEmergencyEmailNotification(testReport, 'review', 'This is a test email to verify the system is working.');
                
                if (result) {
                    showNotification('Test emergency email sent! Check your email inbox.', 'success');
                } else {
                    showNotification('Test emergency email failed to send', 'error');
                }
            } catch (error) {
                console.error('Test error:', error);
                showNotification('Test failed: ' + error.message, 'error');
            }
        };

        // Event Listeners and Initialization
        document.addEventListener('DOMContentLoaded', async function() {
            // Check authentication state first
            auth.onAuthStateChanged(async (user) => {
                if (!user) {
                    // User is not logged in, redirect to login page
                    console.log('No user found, redirecting to login...');
                    showNotification('Please login to access the emergency dashboard', 'error');
                    
                    setTimeout(() => {
                        window.location.href = '/login.html';
                    }, 2000);
                    return;
                }
                
                // User is logged in, hide loading overlay
                document.getElementById('loadingOverlay').style.display = 'none';
                
                // Load data
                await loadEmergencies();
                await loadReports();
                
                // Setup event listeners
                setupEventListeners();
                
                // Show welcome notification
                showNotification(`Welcome, ${user.email}! Emergency dashboard loaded.`, 'success');
            });

            // Fixed Logout functionality
            document.getElementById('logoutBtn').addEventListener('click', async function(e) {
                e.preventDefault();
                
                try {
                    // Show loading state
                    showNotification('Logging out...', 'info');
                    
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
            const refreshReportsButton = document.getElementById('refresh-reports');
            const searchEmergenciesInput = document.getElementById('search-emergencies');
            const searchReportsInput = document.getElementById('search-reports');
            const prevEmergenciesButton = document.getElementById('prev-emergencies-page');
            const nextEmergenciesButton = document.getElementById('next-emergencies-page');
            const prevReportsButton = document.getElementById('prev-reports-page');
            const nextReportsButton = document.getElementById('next-reports-page');
            const mobileMenuButton = document.getElementById('mobile-menu-button');
            const mobileMenu = document.getElementById('mobile-menu');

            // Refresh buttons
            if (refreshButton) {
                refreshButton.addEventListener('click', loadEmergencies);
            }
            if (refreshReportsButton) {
                refreshReportsButton.addEventListener('click', loadReports);
            }

            // Search functionality
            if (searchEmergenciesInput) {
                searchEmergenciesInput.addEventListener('input', function() {
                    const searchTerm = this.value.toLowerCase();
                    if (searchTerm) {
                        filteredEmergencies = allEmergencies.filter(emergency => 
                            emergency.reporterName?.toLowerCase().includes(searchTerm) ||
                            emergency.emergencyType?.toLowerCase().includes(searchTerm) ||
                            emergency.location?.toLowerCase().includes(searchTerm) ||
                            emergency.description?.toLowerCase().includes(searchTerm)
                        );
                    } else {
                        filteredEmergencies = [...allEmergencies];
                    }
                    currentEmergenciesPage = 1;
                    displayEmergencies();
                });
            }

            if (searchReportsInput) {
                searchReportsInput.addEventListener('input', function() {
                    const searchTerm = this.value.toLowerCase();
                    if (searchTerm) {
                        filteredReports = allReports.filter(report => 
                            report.firstName?.toLowerCase().includes(searchTerm) ||
                            report.lastName?.toLowerCase().includes(searchTerm) ||
                            report.email?.toLowerCase().includes(searchTerm) ||
                            report.subject?.toLowerCase().includes(searchTerm) ||
                            report.status?.toLowerCase().includes(searchTerm)
                        );
                    } else {
                        filteredReports = [...allReports];
                    }
                    currentReportsPage = 1;
                    displayReports();
                });
            }

            // Pagination
            if (prevEmergenciesButton) {
                prevEmergenciesButton.addEventListener('click', function() {
                    if (currentEmergenciesPage > 1) {
                        currentEmergenciesPage--;
                        displayEmergencies();
                    }
                });
            }

            if (nextEmergenciesButton) {
                nextEmergenciesButton.addEventListener('click', function() {
                    const totalPages = Math.ceil(filteredEmergencies.length / pageSize);
                    if (currentEmergenciesPage < totalPages) {
                        currentEmergenciesPage++;
                        displayEmergencies();
                    }
                });
            }

            if (prevReportsButton) {
                prevReportsButton.addEventListener('click', function() {
                    if (currentReportsPage > 1) {
                        currentReportsPage--;
                        displayReports();
                    }
                });
            }

            if (nextReportsButton) {
                nextReportsButton.addEventListener('click', function() {
                    const totalPages = Math.ceil(filteredReports.length / pageSize);
                    if (currentReportsPage < totalPages) {
                        currentReportsPage++;
                        displayReports();
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
            emergencySystemData.onEmergenciesUpdate((emergencies) => {
                allEmergencies = emergencies;
                filteredEmergencies = [...allEmergencies];
                displayEmergencies();
                updateStatistics();
            });

            emergencySystemData.onReportsUpdate((reports) => {
                allReports = reports;
                filteredReports = [...allReports];
                displayReports();
                updateStatistics();
            });
        }
    