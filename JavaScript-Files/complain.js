 
        // Wait for DOM to be fully loaded
        document.addEventListener('DOMContentLoaded', function() {
            console.log('DOM fully loaded - initializing complaints system');
            
            // Tab switching functionality
            const newComplaintTab = document.getElementById('new-complaint-tab');
            const statusTab = document.getElementById('status-tab');
            const newComplaintContent = document.getElementById('new-complaint');
            const statusContent = document.getElementById('status');
            
            // Verify elements exist
            if (!newComplaintTab || !statusTab || !newComplaintContent || !statusContent) {
                console.error('Required DOM elements not found');
                return;
            }
            
            // Tab click handlers
            newComplaintTab.addEventListener('click', function() {
                switchTab('new-complaint');
            });
            
            statusTab.addEventListener('click', function() {
                switchTab('status');
            });
            
            // Function to switch between tabs
            function switchTab(activeTab) {
                // Reset all tabs
                newComplaintTab.classList.remove('bg-indigo-50', 'text-indigo-700', 'border-b-2', 'border-indigo-600');
                statusTab.classList.remove('bg-indigo-50', 'text-indigo-700', 'border-b-2', 'border-indigo-600');
                
                newComplaintTab.classList.add('text-gray-500');
                statusTab.classList.add('text-gray-500');
                
                // Hide all content
                newComplaintContent.classList.add('hidden');
                statusContent.classList.add('hidden');
                
                // Activate selected tab
                if (activeTab === 'new-complaint') {
                    newComplaintTab.classList.remove('text-gray-500');
                    newComplaintTab.classList.add('bg-indigo-50', 'text-indigo-700', 'border-b-2', 'border-indigo-600');
                    newComplaintContent.classList.remove('hidden');
                    newComplaintContent.classList.add('fade-in');
                } else {
                    statusTab.classList.remove('text-gray-500');
                    statusTab.classList.add('bg-indigo-50', 'text-indigo-700', 'border-b-2', 'border-indigo-600');
                    statusContent.classList.remove('hidden');
                    statusContent.classList.add('fade-in');
                }
            }
            
            // Form submission handling
            const complaintForm = document.getElementById('complaint-form');
            const successMessage = document.getElementById('success-message');
            const referenceNumber = document.getElementById('reference-number');
            
            if (!complaintForm) {
                console.error('Complaint form not found');
                return;
            }
            
            complaintForm.addEventListener('submit', function(e) {
                e.preventDefault();
                console.log('Form submission started');
                
                // Get form elements safely
                const categoryEl = document.getElementById('category');
                const subjectEl = document.getElementById('subject');
                const descriptionEl = document.getElementById('description');
                
                // Check if elements exist
                if (!categoryEl || !subjectEl || !descriptionEl) {
                    console.error('Form elements not found');
                    alert('Form error: Please refresh the page and try again.');
                    return;
                }
                
                // Get values safely
                const category = categoryEl.value;
                const subject = subjectEl.value;
                const description = descriptionEl.value;
                
                console.log('Form values:', { category, subject, description });
                
                // Basic form validation
                if (!category || !subject || !description) {
                    alert('Please fill in all required fields');
                    return;
                }
                
                // Generate a random reference number
                const refNum = 'COMP-' + new Date().getFullYear() + '-' + 
                              Math.floor(1000 + Math.random() * 9000);
                
                if (referenceNumber) {
                    referenceNumber.textContent = refNum;
                }
                
                // Create complaint object (only fields that exist in the form)
                const complaint = {
                    category: category,
                    subject: subject,
                    description: description,
                    urgent: document.getElementById('urgent') ? document.getElementById('urgent').checked : false,
                    reference: refNum,
                    status: 'received',
                    createdAt: new Date().toISOString(),
                    updatedAt: new Date().toISOString()
                };
                
                console.log('Submitting complaint:', complaint);
                
                // Show loading state
                const submitButton = complaintForm.querySelector('button[type="submit"]');
                if (submitButton) {
                    const originalText = submitButton.innerHTML;
                    submitButton.innerHTML = '<i class="fas fa-spinner fa-spin mr-2"></i> Submitting...';
                    submitButton.disabled = true;
                    complaintForm.classList.add('loading');
                }
                
                // Save to Firebase
                database.ref('complaints').push(complaint)
                    .then(() => {
                        console.log('Complaint saved successfully');
                        
                        // Hide form and show success message
                        complaintForm.classList.add('hidden');
                        if (successMessage) {
                            successMessage.classList.remove('hidden');
                            successMessage.classList.add('success-message');
                        }
                        
                        // Reset form after 5 seconds
                        setTimeout(function() {
                            complaintForm.reset();
                            complaintForm.classList.remove('hidden');
                            if (successMessage) {
                                successMessage.classList.add('hidden');
                            }
                            if (submitButton) {
                                submitButton.innerHTML = originalText;
                                submitButton.disabled = false;
                            }
                            complaintForm.classList.remove('loading');
                        }, 5000);
                    })
                    .catch((error) => {
                        console.error('Error saving complaint:', error);
                        alert('Sorry, there was an error submitting your complaint. Please try again.');
                        if (submitButton) {
                            submitButton.innerHTML = originalText;
                            submitButton.disabled = false;
                        }
                        complaintForm.classList.remove('loading');
                    });
            });
            
            // Status checking functionality
            const checkStatusBtn = document.getElementById('check-status');
            const statusResult = document.getElementById('status-result');
            const referenceInput = document.getElementById('reference');
            
            if (checkStatusBtn) {
                checkStatusBtn.addEventListener('click', function() {
                    const ref = referenceInput ? referenceInput.value.trim() : '';
                    
                    if (!ref) {
                        showStatusResult('Please enter a reference number', 'error');
                        return;
                    }
                    
                    // Show loading state
                    const originalText = checkStatusBtn.innerHTML;
                    checkStatusBtn.innerHTML = '<i class="fas fa-spinner fa-spin mr-2"></i> Checking...';
                    checkStatusBtn.disabled = true;
                    
                    // Search for complaint in Firebase
                    database.ref('complaints').orderByChild('reference').equalTo(ref).once('value')
                        .then((snapshot) => {
                            checkStatusBtn.innerHTML = originalText;
                            checkStatusBtn.disabled = false;
                            
                            if (snapshot.exists()) {
                                const complaints = snapshot.val();
                                const complaintKey = Object.keys(complaints)[0];
                                const complaintData = complaints[complaintKey];
                                
                                const statusHTML = `
                                    <div class="flex items-center justify-between">
                                        <div>
                                            <h4 class="font-medium text-gray-800">Complaint: ${ref}</h4>
                                            <div class="flex items-center mt-2">
                                                <div class="h-3 w-3 rounded-full ${getStatusColorClass(complaintData.status)} mr-2"></div>
                                                <span class="font-medium ${getStatusTextClass(complaintData.status)}">${formatStatus(complaintData.status)}</span>
                                            </div>
                                            <p class="text-sm text-gray-600 mt-2">${getStatusMessage(complaintData.status)}</p>
                                            <p class="text-xs text-gray-500 mt-2">Submitted: ${formatDate(complaintData.createdAt)}</p>
                                            ${complaintData.updatedAt !== complaintData.createdAt ? 
                                                `<p class="text-xs text-gray-500">Last Updated: ${formatDate(complaintData.updatedAt)}</p>` : ''}
                                        </div>
                                        <div class="${getStatusIconClass(complaintData.status)} text-3xl">
                                            <i class="fas fa-${getStatusIcon(complaintData.status)}"></i>
                                        </div>
                                    </div>
                                    ${complaintData.status === 'resolved' ? `
                                    <div class="mt-4 p-3 bg-green-50 rounded-lg border border-green-200">
                                        <p class="text-sm text-green-700"><strong>Resolution Note:</strong> Your complaint has been addressed and resolved. Thank you for your feedback.</p>
                                    </div>
                                    ` : ''}
                                `;
                                
                                showStatusResult(statusHTML, 'success');
                            } else {
                                showStatusResult('No complaint found with that reference number. Please check and try again.', 'error');
                            }
                        })
                        .catch((error) => {
                            console.error('Error checking status:', error);
                            if (checkStatusBtn) {
                                checkStatusBtn.innerHTML = originalText;
                                checkStatusBtn.disabled = false;
                            }
                            showStatusResult('Error checking complaint status. Please try again.', 'error');
                        });
                });
            }
            
            // Helper function to show status results
            function showStatusResult(message, type) {
                if (!statusResult) return;
                
                if (type === 'error') {
                    statusResult.innerHTML = `
                        <div class="flex items-center">
                            <i class="fas fa-exclamation-triangle text-red-500 mr-3"></i>
                            <div>
                                <p class="text-red-700">${message}</p>
                            </div>
                        </div>
                    `;
                    statusResult.className = 'mt-6 p-4 bg-red-50 rounded-lg border border-red-200 fade-in';
                } else {
                    statusResult.innerHTML = message;
                    statusResult.className = 'mt-6 p-4 bg-gray-50 rounded-lg fade-in';
                }
                statusResult.classList.remove('hidden');
            }
            
            // Helper functions for status display
            function formatStatus(status) {
                const statusMap = {
                    'received': 'Received',
                    'in-progress': 'In Progress',
                    'resolved': 'Resolved',
                    'escalated': 'Escalated'
                };
                return statusMap[status] || status;
            }
            
            function getStatusMessage(status) {
                const messages = {
                    'received': 'We have received your complaint and will review it shortly.',
                    'in-progress': 'Your complaint is currently being investigated by our team.',
                    'resolved': 'Your complaint has been resolved successfully.',
                    'escalated': 'Your complaint has been escalated to a specialist for further review.'
                };
                return messages[status] || 'Status unknown.';
            }
            
            function getStatusIcon(status) {
                switch(status) {
                    case 'received': return 'inbox';
                    case 'in-progress': return 'cog';
                    case 'resolved': return 'check-circle';
                    case 'escalated': return 'exclamation-triangle';
                    default: return 'question-circle';
                }
            }
            
            function getStatusColorClass(status) {
                switch(status) {
                    case 'received': return 'bg-blue-500';
                    case 'in-progress': return 'bg-yellow-500';
                    case 'resolved': return 'bg-green-500';
                    case 'escalated': return 'bg-red-500';
                    default: return 'bg-gray-500';
                }
            }
            
            function getStatusTextClass(status) {
                switch(status) {
                    case 'received': return 'text-blue-800';
                    case 'in-progress': return 'text-yellow-800';
                    case 'resolved': return 'text-green-800';
                    case 'escalated': return 'text-red-800';
                    default: return 'text-gray-800';
                }
            }
            
            function getStatusIconClass(status) {
                switch(status) {
                    case 'received': return 'text-blue-500';
                    case 'in-progress': return 'text-yellow-500';
                    case 'resolved': return 'text-green-500';
                    case 'escalated': return 'text-red-500';
                    default: return 'text-gray-500';
                }
            }
            
            function formatDate(dateString) {
                try {
                    const date = new Date(dateString);
                    return date.toLocaleDateString('en-US', { 
                        year: 'numeric', 
                        month: 'short', 
                        day: 'numeric',
                        hour: '2-digit',
                        minute: '2-digit'
                    });
                } catch (e) {
                    return 'Unknown date';
                }
            }
            
            console.log('Complaints system initialized successfully');
        });
    