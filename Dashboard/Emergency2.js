// emergency_dashboard.js

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
    
    reportsBody.innerHTML = pageReports.map(report => `
        <tr class="emergency-row border-b border-gray-200">
            <td class="px-4 py-3">${escapeHtml(report.firstName)} ${escapeHtml(report.lastName || '')}</td>
            <td class="px-4 py-3">${escapeHtml(report.email)}</td>
            <td class="px-4 py-3">${escapeHtml(report.phone || 'Not provided')}</td>
            <td class="px-4 py-3">${report.subject || 'General Emergency'}</td>
            <td class="px-4 py-3 text-sm">${formatTimestamp(report.createdAt)}</td>
            <td class="px-4 py-3">
                <button onclick="viewEmergencyReport('${report.id}')" class="bg-blue-500 text-white px-2 py-1 rounded text-xs hover:bg-blue-600 mr-1" title="View Report">
                    <i class="fas fa-eye"></i>
                </button>
                <button onclick="deleteReport('${report.id}')" class="bg-red-500 text-white px-2 py-1 rounded text-xs hover:bg-red-600" title="Delete Report">
                    <i class="fas fa-trash"></i>
                </button>
            </td>
        </tr>
    `).join('');
    
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
            const reportHeaders = ['First Name', 'Last Name', 'Email', 'Phone', 'Emergency Type', 'Message', 'Created Date'];
            const reportData = reports.map(report => [
                report.firstName,
                report.lastName || '',
                report.email,
                report.phone,
                report.subject,
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
Message: ${report.message}
Received: ${formatTimestamp(report.createdAt)}
        `;
        alert(message);
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

// Event Listeners
document.addEventListener('DOMContentLoaded', function() {
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
                    report.subject?.toLowerCase().includes(searchTerm)
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

    // Initial load
    loadEmergencies();
    loadReports();
    
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
});