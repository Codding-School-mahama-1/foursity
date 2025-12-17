 
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
        const auth = firebase.auth();

        // Global variables
        let complaintsData = [];
        let currentPage = 1;
        const complaintsPerPage = 10;

        // DOM Elements
        const complaintsBody = document.getElementById('complaints-body');
        const noComplaintsMessage = document.getElementById('no-complaints-message');
        const loadingComplaints = document.getElementById('loading-complaints');
        const totalComplaintsEl = document.getElementById('total-complaints');
        const todayComplaintsEl = document.getElementById('today-complaints');
        const pendingComplaintsEl = document.getElementById('pending-complaints');
        const resolvedComplaintsEl = document.getElementById('resolved-complaints');
        const complaintsChangeEl = document.getElementById('complaints-change');
        const todayDateEl = document.getElementById('today-date');
        const pendingPercentEl = document.getElementById('pending-percent');
        const resolvedPercentEl = document.getElementById('resolved-percent');
        const categoryStatsEl = document.getElementById('category-stats');
        const searchComplaintsEl = document.getElementById('search-complaints');
        const refreshDataBtn = document.getElementById('refresh-data');
        const prevComplaintsPageBtn = document.getElementById('prev-complaints-page');
        const nextComplaintsPageBtn = document.getElementById('next-complaints-page');
        const complaintsPaginationInfo = document.getElementById('complaints-pagination-info');

        // Check authentication on page load
        document.addEventListener('DOMContentLoaded', function() {
            auth.onAuthStateChanged(async (user) => {
                if (!user) {
                    // User is not logged in, redirect to login page
                    console.log('No user found, redirecting to login...');
                    // showNotification('Please login to access the complaints dashboard', 'error');
                    
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
                loadComplaintsData();
                
                // Set up event listeners
                refreshDataBtn.addEventListener('click', loadComplaintsData);
                searchComplaintsEl.addEventListener('input', filterComplaints);
                prevComplaintsPageBtn.addEventListener('click', goToPrevPage);
                nextComplaintsPageBtn.addEventListener('click', goToNextPage);
                
                // Mobile menu toggle
                document.getElementById('mobile-menu-button').addEventListener('click', function() {
                    const mobileMenu = document.getElementById('mobile-menu');
                    mobileMenu.classList.toggle('hidden');
                });
                
                // Show welcome notification
                // showNotification(`Welcome, ${user.email}! Complaints dashboard loaded.`, 'success');
            });

            // Logout functionality
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

        // Load complaints data from Firebase
        function loadComplaintsData() {
            showLoading();
            
            const complaintsRef = database.ref('complaints');
            
            complaintsRef.once('value')
                .then((snapshot) => {
                    const data = snapshot.val();
                    complaintsData = [];
                    
                    if (data) {
                        Object.keys(data).forEach(key => {
                            const complaint = data[key];
                            complaint.id = key;
                            complaintsData.push(complaint);
                        });
                    }
                    
                    updateDashboard();
                    hideLoading();
                })
                .catch((error) => {
                    console.error('Error loading complaints:', error);
                    hideLoading();
                    showError('Failed to load complaints data');
                });
        }

        // Update dashboard with current data
        function updateDashboard() {
            updateStatistics();
            updateComplaintsTable();
            updateCategoryStats();
            updateSystemInfo();
        }

        // Update statistics cards
        function updateStatistics() {
            const total = complaintsData.length;
            const today = new Date().toISOString().split('T')[0];
            
            const todayCount = complaintsData.filter(comp => {
                const compDate = new Date(comp.createdAt).toISOString().split('T')[0];
                return compDate === today;
            }).length;
            
            const pendingCount = complaintsData.filter(comp => 
                comp.status === 'received' || comp.status === 'in-progress'
            ).length;
            
            const resolvedCount = complaintsData.filter(comp => 
                comp.status === 'resolved'
            ).length;
            
            // Update statistics cards
            totalComplaintsEl.textContent = total;
            todayComplaintsEl.textContent = todayCount;
            pendingComplaintsEl.textContent = pendingCount;
            resolvedComplaintsEl.textContent = resolvedCount;
            
            // Update additional info
            complaintsChangeEl.textContent = `+${todayCount} today`;
            pendingPercentEl.textContent = total > 0 ? `${Math.round((pendingCount / total) * 100)}% of total` : '0% of total';
            resolvedPercentEl.textContent = total > 0 ? `${Math.round((resolvedCount / total) * 100)}% of total` : '0% of total';
        }

        // Update system information
        function updateSystemInfo() {
            const total = complaintsData.length;
            
            // Calculate new complaints in last 7 days
            const sevenDaysAgo = new Date();
            sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);
            
            const newComplaints = complaintsData.filter(comp => {
                const compDate = new Date(comp.createdAt);
                return compDate >= sevenDaysAgo;
            }).length;
            
            // Calculate resolution rate
            const resolvedCount = complaintsData.filter(comp => comp.status === 'resolved').length;
            const resolutionRate = total > 0 ? Math.round((resolvedCount / total) * 100) : 0;
            
            // Find most common category
            const categoryCounts = {};
            complaintsData.forEach(comp => {
                const category = comp.category || 'Unknown';
                categoryCounts[category] = (categoryCounts[category] || 0) + 1;
            });
            
            let popularCategory = '-';
            let maxCount = 0;
            
            Object.entries(categoryCounts).forEach(([category, count]) => {
                if (count > maxCount) {
                    maxCount = count;
                    popularCategory = formatCategory(category);
                }
            });
            
            // Update DOM elements
            document.getElementById('total-messages').textContent = total;
            document.getElementById('new-complaints').textContent = newComplaints;
            document.getElementById('resolution-rate').textContent = `${resolutionRate}%`;
            document.getElementById('popular-category').textContent = popularCategory;
        }

        // Update category statistics
        function updateCategoryStats() {
            const categoryCounts = {};
            
            complaintsData.forEach(complaint => {
                const category = complaint.category || 'Unknown';
                categoryCounts[category] = (categoryCounts[category] || 0) + 1;
            });
            
            // Clear previous content
            categoryStatsEl.innerHTML = '';
            
            // Create category cards
            Object.entries(categoryCounts).forEach(([category, count]) => {
                const card = document.createElement('div');
                card.className = 'bg-gray-50 p-4 rounded-lg text-center';
                
                const formattedCategory = formatCategory(category);
                const percentage = complaintsData.length > 0 ? 
                    Math.round((count / complaintsData.length) * 100) : 0;
                
                card.innerHTML = `
                    <div class="text-2xl font-bold text-blue-600">${count}</div>
                    <div class="text-sm text-gray-600">${formattedCategory}</div>
                    <div class="text-xs text-gray-500 mt-1">${percentage}% of total</div>
                `;
                
                categoryStatsEl.appendChild(card);
            });
            
            // If no categories found, show message
            if (Object.keys(categoryCounts).length === 0) {
                categoryStatsEl.innerHTML = '<div class="text-gray-500 text-center col-span-4">No category data available</div>';
            }
        }

        // Update complaints table
        function updateComplaintsTable() {
            // Clear table
            complaintsBody.innerHTML = '';
            
            // Filter complaints based on search
            const searchTerm = searchComplaintsEl.value.toLowerCase();
            const filteredComplaints = complaintsData.filter(complaint => {
                const subject = (complaint.subject || '').toLowerCase();
                const reference = (complaint.reference || '').toLowerCase();
                const category = formatCategory(complaint.category).toLowerCase();
                
                return subject.includes(searchTerm) || reference.includes(searchTerm) || category.includes(searchTerm);
            });
            
            // Show/hide no complaints message
            if (filteredComplaints.length === 0) {
                noComplaintsMessage.classList.remove('hidden');
                complaintsBody.parentElement.classList.add('hidden');
            } else {
                noComplaintsMessage.classList.add('hidden');
                complaintsBody.parentElement.classList.remove('hidden');
                
                // Calculate pagination
                const totalPages = Math.ceil(filteredComplaints.length / complaintsPerPage);
                const startIndex = (currentPage - 1) * complaintsPerPage;
                const endIndex = Math.min(startIndex + complaintsPerPage, filteredComplaints.length);
                const paginatedComplaints = filteredComplaints.slice(startIndex, endIndex);
                
                // Populate table
                paginatedComplaints.forEach(complaint => {
                    const row = document.createElement('tr');
                    row.className = 'complaint-row border-b border-gray-200';
                    
                    const formattedDate = formatDate(complaint.createdAt);
                    const status = complaint.status || 'received';
                    
                    row.innerHTML = `
                        <td class="px-4 py-3 font-mono text-sm">${complaint.reference}</td>
                        <td class="px-4 py-3">${formatCategory(complaint.category)}</td>
                        <td class="px-4 py-3">${complaint.subject}</td>
                        <td class="px-4 py-3">${formattedDate}</td>
                        <td class="px-4 py-3">
                            <span class="status-badge ${getStatusClass(status)}">${formatStatus(status)}</span>
                        </td>
                        <td class="px-4 py-3">
                            ${complaint.urgent ? 
                                '<span class="text-red-500"><i class="fas fa-exclamation-triangle"></i> Urgent</span>' : 
                                '<span class="text-gray-400">-</span>'
                            }
                        </td>
                        <td class="px-4 py-3">
                            <div class="flex gap-2">
                                <button onclick="viewComplaintDetails('${complaint.id}')" class="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded text-sm">
                                    <i class="fas fa-eye mr-1"></i> View
                                </button>
                                <button onclick="updateComplaintStatus('${complaint.id}', 'in-progress')" class="bg-yellow-500 hover:bg-yellow-600 text-white px-3 py-1 rounded text-sm">
                                    <i class="fas fa-cog mr-1"></i> Progress
                                </button>
                                <button onclick="updateComplaintStatus('${complaint.id}', 'resolved')" class="bg-green-500 hover:bg-green-600 text-white px-3 py-1 rounded text-sm">
                                    <i class="fas fa-check mr-1"></i> Resolve
                                </button>
                                <button onclick="deleteComplaint('${complaint.id}')" class="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded text-sm">
                                    <i class="fas fa-trash mr-1"></i> Delete
                                </button>
                            </div>
                        </td>
                    `;
                    
                    complaintsBody.appendChild(row);
                });
                
                // Update pagination info and buttons
                complaintsPaginationInfo.textContent = `Showing ${startIndex + 1}-${endIndex} of ${filteredComplaints.length} complaints`;
                prevComplaintsPageBtn.disabled = currentPage === 1;
                nextComplaintsPageBtn.disabled = currentPage === totalPages;
            }
        }

        // Delete complaint function
        function deleteComplaint(complaintId) {
            if (confirm('Are you sure you want to delete this complaint? This action cannot be undone.')) {
                database.ref('complaints/' + complaintId).remove()
                    .then(() => {
                        showSuccess('Complaint deleted successfully');
                        loadComplaintsData(); // Reload data to reflect changes
                        
                        // Close any open modals
                        const modals = document.querySelectorAll('.fixed.inset-0');
                        modals.forEach(modal => modal.remove());
                    })
                    .catch((error) => {
                        console.error('Error deleting complaint:', error);
                        showError('Failed to delete complaint');
                    });
            }
        }

        // View complaint details
        function viewComplaintDetails(complaintId) {
            const complaint = complaintsData.find(comp => comp.id === complaintId);
            
            if (complaint) {
                // Create and show modal with complaint details
                const modal = document.createElement('div');
                modal.className = 'fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4';
                modal.innerHTML = `
                    <div class="bg-white rounded-lg p-6 max-w-2xl w-full max-h-[90vh] overflow-y-auto">
                        <div class="flex justify-between items-center mb-4">
                            <h3 class="text-xl font-bold text-gray-800">Complaint Details</h3>
                            <button onclick="this.parentElement.parentElement.parentElement.remove()" class="text-gray-500 hover:text-gray-700">
                                <i class="fas fa-times"></i>
                            </button>
                        </div>
                        
                        <div class="space-y-4">
                            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <strong>Reference:</strong> ${complaint.reference}
                                </div>
                                <div>
                                    <strong>Status:</strong> <span class="status-badge ${getStatusClass(complaint.status)}">${formatStatus(complaint.status)}</span>
                                </div>
                            </div>
                            
                            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <strong>Category:</strong> ${formatCategory(complaint.category)}
                                </div>
                                <div>
                                    <strong>Urgent:</strong> ${complaint.urgent ? '<span class="text-red-500">Yes</span>' : 'No'}
                                </div>
                            </div>
                            
                            <div>
                                <strong>Subject:</strong>
                                <p class="mt-1 text-gray-600">${complaint.subject}</p>
                            </div>
                            
                            <div>
                                <strong>Complaint Details:</strong>
                                <p class="mt-1 text-gray-600">${complaint.description}</p>
                            </div>
                            
                            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <strong>Submitted:</strong> ${formatDateTime(complaint.createdAt)}
                                </div>
                                <div>
                                    <strong>Last Updated:</strong> ${formatDateTime(complaint.updatedAt)}
                                </div>
                            </div>
                        </div>
                        
                        <div class="mt-6 flex justify-end gap-2">
                            <button onclick="updateComplaintStatus('${complaint.id}', 'in-progress')" class="bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-2 rounded">
                                Mark In Progress
                            </button>
                            <button onclick="updateComplaintStatus('${complaint.id}', 'resolved')" class="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded">
                                Mark Resolved
                            </button>
                            <button onclick="deleteComplaint('${complaint.id}')" class="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded">
                                <i class="fas fa-trash mr-1"></i> Delete
                            </button>
                            <button onclick="this.parentElement.parentElement.parentElement.remove()" class="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600">
                                Close
                            </button>
                        </div>
                    </div>
                `;
                
                document.body.appendChild(modal);
            }
        }

        // Update complaint status
        function updateComplaintStatus(complaintId, newStatus) {
            database.ref('complaints/' + complaintId).update({
                status: newStatus,
                updatedAt: new Date().toISOString()
            })
            .then(() => {
                showSuccess(`Complaint status updated to ${formatStatus(newStatus)}`);
                loadComplaintsData(); // Reload data to reflect changes
                
                // Close any open modals
                const modals = document.querySelectorAll('.fixed.inset-0');
                modals.forEach(modal => modal.remove());
            })
            .catch((error) => {
                console.error('Error updating complaint:', error);
                showError('Failed to update complaint status');
            });
        }

        // Export data to CSV
        function exportToCSV() {
            if (complaintsData.length === 0) {
                showError('No data to export');
                return;
            }
            
            // Create CSV content
            let csvContent = "Reference,Category,Subject,Status,Urgent,Date Submitted\n";
            
            complaintsData.forEach(complaint => {
                const category = formatCategory(complaint.category);
                const subject = complaint.subject;
                const status = formatStatus(complaint.status);
                const urgent = complaint.urgent ? 'Yes' : 'No';
                const date = formatDate(complaint.createdAt);
                
                csvContent += `"${complaint.reference}","${category}","${subject}","${status}","${urgent}","${date}"\n`;
            });
            
            // Create download link
            const blob = new Blob([csvContent], { type: 'text/csv' });
            const url = URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = `complaints-${new Date().toISOString().split('T')[0]}.csv`;
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
            URL.revokeObjectURL(url);
            
            showSuccess('Data exported successfully');
        }

        // Filter complaints based on search
        function filterComplaints() {
            currentPage = 1; // Reset to first page when filtering
            updateComplaintsTable();
        }

        // Pagination functions
        function goToPrevPage() {
            if (currentPage > 1) {
                currentPage--;
                updateComplaintsTable();
            }
        }

        function goToNextPage() {
            const searchTerm = searchComplaintsEl.value.toLowerCase();
            const filteredComplaints = complaintsData.filter(complaint => {
                const subject = (complaint.subject || '').toLowerCase();
                const reference = (complaint.reference || '').toLowerCase();
                const category = formatCategory(complaint.category).toLowerCase();
                
                return subject.includes(searchTerm) || reference.includes(searchTerm) || category.includes(searchTerm);
            });
            
            const totalPages = Math.ceil(filteredComplaints.length / complaintsPerPage);
            
            if (currentPage < totalPages) {
                currentPage++;
                updateComplaintsTable();
            }
        }

        // Clear all data
        function clearAllData() {
            if (confirm('Are you sure you want to delete ALL complaints data? This action cannot be undone.')) {
                showLoading();
                
                database.ref('complaints').remove()
                    .then(() => {
                        complaintsData = [];
                        updateDashboard();
                        hideLoading();
                        showSuccess('All complaints data has been cleared');
                    })
                    .catch((error) => {
                        console.error('Error clearing data:', error);
                        hideLoading();
                        showError('Failed to clear data');
                    });
            }
        }

        // Helper functions
        function formatCategory(category) {
            const categoryMap = {
                'service': 'Poor Service',
                'staff': 'Staff Behavior',
                'facility': 'Facility Issues',
                'billing': 'Billing Issue',
                'waiting': 'Long Waiting Time',
                'treatment': 'Treatment Quality',
                'other': 'Other'
            };
            
            return categoryMap[category] || category || 'Unknown';
        }

        function formatStatus(status) {
            const statusMap = {
                'received': 'Received',
                'in-progress': 'In Progress',
                'resolved': 'Resolved',
                'escalated': 'Escalated'
            };
            return statusMap[status] || status;
        }

        function getStatusClass(status) {
            switch(status) {
                case 'received': return 'status-received';
                case 'in-progress': return 'status-in-progress';
                case 'resolved': return 'status-resolved';
                case 'escalated': return 'status-escalated';
                default: return 'status-received';
            }
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

        function formatDateTime(dateTimeString) {
            if (!dateTimeString) return 'Not specified';
            const date = new Date(dateTimeString);
            return date.toLocaleString('en-US', { 
                year: 'numeric', 
                month: 'short', 
                day: 'numeric',
                hour: '2-digit',
                minute: '2-digit'
            });
        }

        function showLoading() {
            loadingComplaints.classList.remove('hidden');
            complaintsBody.parentElement.classList.add('hidden');
            noComplaintsMessage.classList.add('hidden');
        }

        function hideLoading() {
            loadingComplaints.classList.add('hidden');
        }

        function showSuccess(message) {
            showNotification(message, 'success');
        }

        function showError(message) {
            showNotification(message, 'error');
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
    