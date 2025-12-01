
    // Mobile menu toggle
    document.getElementById('mobile-menu-button').addEventListener('click', function() {
      const mobileMenu = document.getElementById('mobile-menu');
      mobileMenu.classList.toggle('hidden');
    });
    
    // Mobile services dropdown toggle
    document.getElementById('mobile-services-toggle').addEventListener('click', function() {
      const mobileServicesMenu = document.getElementById('mobile-services-menu');
      mobileServicesMenu.classList.toggle('hidden');
    });

    // SERVICE CARDS DATA 
    const servicesData = [
      {
        img: "./img/baby-1531059_1280.webp",
        alt: "Maternity",
        title: "Maternity & Birth Services",
        text: "Providing prenatal care, safe deliveries, and postnatal support for mothers and newborns.",
        link: "./Servscies/Maternity&Brith Servecises.html"
      },
      {
        img: "./img/emer.webp",
        alt: "Emergency",
        title: "Emergency Care",
        text: "Immediate attention for urgent medical conditions with trained staff available 24/7.",
        link: "./Emergency.html"
      },
      {
        img: "./img/vac.webp",
        alt: "Vaccination",
        title: "Vaccination Programs",
        text: "Regular vaccination campaigns for children and adults to prevent infectious diseases.",
        link: "/Servscies/veccination.html"
      },
      {
        img: "./img/mentl.webp",
        alt: "Mental Health",
        title: "Mental Health Support",
        text: "Counseling and support services for mental well-being and trauma recovery.",
        link: "/Servscies/mentalhealth.html"
      },
      {
        img: "./img/chro.webp",
        alt: "Chronic Care",
        title: "Chronic Disease Care",
        text: "Management and monitoring of chronic diseases like diabetes, hypertension, TB, and HIV.",
        link: "/Servscies/NCD.html"
      },
      {
        img: "/img/awernees.webp",
        alt: "Health Education",
        title: "Health Awareness & Education",
        text: "Educational resources about hygiene, nutrition, pregnancy, child care, and disease prevention.",
        link: "/Servscies/Health Education.html"
      }
    ];

    // RENDER CARDS USING .map() 
    const servicesContainer = document.getElementById("services-container");

    servicesContainer.innerHTML = servicesData
      .map(service => `
        <div class="service-card bg-white rounded-xl shadow-lg p-6 transition-all duration-300 hover:-translate-y-2 hover:shadow-xl">
          <img src="${service.img}" alt="${service.alt}" class="w-full h-48 object-cover rounded-lg mb-4">
          <h3 class="text-xl font-bold text-gray-800 mb-2">${service.title}</h3>
          <p class="text-gray-600 mb-4">${service.text}</p>
          <button class="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition duration-300">
            <a href="${service.link}">Learn More</a>
          </button>
        </div>
      `)
      .join("");

    // ANIMATION (your original code) 
    const cards = document.querySelectorAll('.service-card');

    const revealCards = () => {
      const triggerBottom = window.innerHeight * 0.8;

      cards.forEach(card => {
        const cardTop = card.getBoundingClientRect().top;

        if (cardTop < triggerBottom) {
          card.classList.add('show');
        }
      });
    };

    window.addEventListener('scroll', revealCards);
    window.addEventListener('load', revealCards);
    window.addEventListener('resize', revealCards);
    revealCards();

    // FAQ Modal Functionality
    const faqModal = document.getElementById('faq-modal');
    const faqNavLink = document.getElementById('faq-nav-link');
    const mobileFaqLink = document.getElementById('mobile-faq-link');
    const footerFaqLink = document.getElementById('footer-faq-link');
    const faqClose = document.getElementById('faq-close');
    const tabBtns = document.querySelectorAll('.tab-btn');
    const faqItems = document.querySelectorAll('.faq-item');

    // Open FAQ Modal
    function openFaqModal() {
      faqModal.classList.remove('hidden');
      document.body.style.overflow = 'hidden';
    }

    // Close FAQ Modal
    function closeFaqModal() {
      faqModal.classList.add('hidden');
      document.body.style.overflow = 'auto';
    }

    // Tab switching
    tabBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        const tabId = btn.getAttribute('data-tab');
        
        // Update active tab
        tabBtns.forEach(b => b.classList.remove('active', 'text-blue-600', 'border-blue-600'));
        btn.classList.add('active', 'text-blue-600', 'border-blue-600');
        
        // Show active tab content
        document.querySelectorAll('.tab-content').forEach(content => {
          content.classList.add('hidden');
        });
        document.getElementById(tabId).classList.remove('hidden');
      });
    });

    // FAQ item toggle
    faqItems.forEach(item => {
      const question = item.querySelector('.faq-question');
      question.addEventListener('click', () => {
        item.classList.toggle('active');
      });
    });

    // Event listeners
    faqNavLink.addEventListener('click', (e) => {
      e.preventDefault();
      openFaqModal();
    });

    mobileFaqLink.addEventListener('click', (e) => {
      e.preventDefault();
      openFaqModal();
      document.getElementById('mobile-menu').classList.add('hidden');
    });

    footerFaqLink.addEventListener('click', (e) => {
      e.preventDefault();
      openFaqModal();
    });

    faqClose.addEventListener('click', closeFaqModal);

    // Close modal when clicking outside
    faqModal.addEventListener('click', (e) => {
      if (e.target === faqModal) {
        closeFaqModal();
      }
    });

    // Close modal with Escape key
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && !faqModal.classList.contains('hidden')) {
        closeFaqModal();
      }
    });

    // Auth Modals Functionality
    const signupModal = document.getElementById('signup-modal');
    const loginModal = document.getElementById('login-modal');
    const signupBtn = document.getElementById('signup-btn');
    const loginBtn = document.getElementById('login-btn');
    const mobileSignupBtn = document.getElementById('mobile-signup-btn');
    const mobileLoginBtn = document.getElementById('mobile-login-btn');
    const signupClose = document.getElementById('signup-close');
    const loginClose = document.getElementById('login-close');
    const switchToLogin = document.getElementById('switch-to-login');
    const switchToSignup = document.getElementById('switch-to-signup');

    // Open Sign Up Modal
    function openSignupModal() {
      signupModal.classList.remove('hidden');
      document.body.style.overflow = 'hidden';
    }

    // Open Login Modal
    function openLoginModal() {
      loginModal.classList.remove('hidden');
      document.body.style.overflow = 'hidden';
    }

    // Close Modals
    function closeModals() {
      signupModal.classList.add('hidden');
      loginModal.classList.add('hidden');
      document.body.style.overflow = 'auto';
    }

    // Switch between modals
    function switchToLoginModal() {
      closeModals();
      setTimeout(openLoginModal, 300);
    }

    function switchToSignupModal() {
      closeModals();
      setTimeout(openSignupModal, 300);
    }

    // Event Listeners for Auth Modals
    signupBtn.addEventListener('click', openSignupModal);
    loginBtn.addEventListener('click', openLoginModal);
    mobileSignupBtn.addEventListener('click', () => {
      openSignupModal();
      document.getElementById('mobile-menu').classList.add('hidden');
    });
    mobileLoginBtn.addEventListener('click', () => {
      openLoginModal();
      document.getElementById('mobile-menu').classList.add('hidden');
    });
    signupClose.addEventListener('click', closeModals);
    loginClose.addEventListener('click', closeModals);
    switchToLogin.addEventListener('click', switchToLoginModal);
    switchToSignup.addEventListener('click', switchToSignupModal);

    // Close modals when clicking outside
    [signupModal, loginModal].forEach(modal => {
      modal.addEventListener('click', (e) => {
        if (e.target === modal) {
          closeModals();
        }
      });
    });

    // Close modals with Escape key
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        closeModals();
      }
    });

    // Form submissions
    document.getElementById('signup-form').addEventListener('submit', (e) => {
      e.preventDefault();
      // Add your signup logic here
      alert('Sign up functionality would be implemented here!');
      closeModals();
    });

    document.getElementById('login-form').addEventListener('submit', (e) => {
      e.preventDefault();
      // Add your login logic here
      alert('Login functionality would be implemented here!');
      closeModals();
    });

    document.getElementById('desktop-signup-btn').addEventListener('click', openSignupModal);
    document.getElementById('desktop-login-btn').addEventListener('click', openLoginModal);

    // Add this to your existing script - ONLY saves to localStorage
    document.getElementById('signup-form').addEventListener('submit', (e) => {
      e.preventDefault();
      
      // Get form data
      const formData = {
        firstname: document.getElementById('signup-firstname').value,
        lastname: document.getElementById('signup-lastname').value,
        email: document.getElementById('signup-email').value,
        phone: document.getElementById('signup-phone').value,
        password: document.getElementById('signup-password').value,
        createdAt: new Date().toISOString()
      };

      // Get existing users from localStorage or create empty array
      const existingUsers = JSON.parse(localStorage.getItem('users')) || [];
      
      // Add new user to array
      existingUsers.push(formData);
      
      // Save to localStorage
      localStorage.setItem('users', JSON.stringify(existingUsers));
      
      // Close modal and reset form (your existing functionality)
      closeModals();
      document.getElementById('signup-form').reset();
    });

    // Contact form localStorage functionality
    document.getElementById('contact-form').addEventListener('submit', (e) => {
      e.preventDefault();
      
      // Get form data
      const contactData = {
        firstname: document.getElementById('first-name').value,
        lastname: document.getElementById('last-name').value,
        email: document.getElementById('email').value,
        phone: document.getElementById('phone').value,
        subject: document.getElementById('subject').value,
        message: document.getElementById('message').value,
        submittedAt: new Date().toISOString()
      };

      // Get existing contacts from localStorage or create empty array
      const existingContacts = JSON.parse(localStorage.getItem('contacts')) || [];
      
      // Add new contact to array
      existingContacts.push(contactData);
      
      // Save to localStorage
      localStorage.setItem('contacts', JSON.stringify(existingContacts));
      
      // Reset form
      document.getElementById('contact-form').reset();
    });

    // COMPLAINTS MODAL FUNCTIONALITY
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

    // Complaint Modal Elements
    const complaintModal = document.getElementById('complaint-modal');
    const complainBtn = document.getElementById('complain-btn');
    const complaintClose = document.getElementById('complaint-close');
    const complaintDashboardBtn = document.getElementById('complaint-dashboard-btn');

    // Open Complaint Modal
    function openComplaintModal() {
        complaintModal.classList.remove('hidden');
        document.body.style.overflow = 'hidden';
        // Reset to New Complaint tab
        switchComplaintTab('new');
    }

    // Close Complaint Modal
    function closeComplaintModal() {
        complaintModal.classList.add('hidden');
        document.body.style.overflow = 'auto';
    }

    // Switch between complaint tabs
    function switchComplaintTab(activeTab) {
        const newTab = document.getElementById('complaint-new-tab');
        const statusTab = document.getElementById('complaint-status-tab');
        const newContent = document.getElementById('complaint-new-content');
        const statusContent = document.getElementById('complaint-status-content');
        
        // Reset all tabs
        newTab.classList.remove('bg-indigo-50', 'text-indigo-700', 'border-b-2', 'border-indigo-600');
        statusTab.classList.remove('bg-indigo-50', 'text-indigo-700', 'border-b-2', 'border-indigo-600');
        newTab.classList.add('text-gray-500');
        statusTab.classList.add('text-gray-500');
        
        // Hide all content
        if (newContent) newContent.classList.add('hidden');
        if (statusContent) statusContent.classList.add('hidden');
        
        // Show success message if it exists
        const successMsg = document.getElementById('complaint-success-message');
        if (successMsg) successMsg.classList.add('hidden');
        
        // Activate selected tab
        if (activeTab === 'new') {
            newTab.classList.remove('text-gray-500');
            newTab.classList.add('bg-indigo-50', 'text-indigo-700', 'border-b-2', 'border-indigo-600');
            if (newContent) newContent.classList.remove('hidden');
        } else {
            statusTab.classList.remove('text-gray-500');
            statusTab.classList.add('bg-indigo-50', 'text-indigo-700', 'border-b-2', 'border-indigo-600');
            if (statusContent) statusContent.classList.remove('hidden');
        }
    }

    // Generate reference number
    function generateReferenceNumber() {
        const year = new Date().getFullYear();
        const randomNum = Math.floor(1000 + Math.random() * 9000);
        return `COMP-${year}-${randomNum}`;
    }

    // Format date for display
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

    // Get status display properties
    function getStatusProperties(status) {
        const properties = {
            'received': { color: 'blue', text: 'Received', icon: 'inbox' },
            'in-progress': { color: 'yellow', text: 'In Progress', icon: 'cog' },
            'resolved': { color: 'green', text: 'Resolved', icon: 'check-circle' },
            'escalated': { color: 'red', text: 'Escalated', icon: 'exclamation-triangle' }
        };
        
        return properties[status] || { color: 'gray', text: 'Unknown', icon: 'question-circle' };
    }

    // Get status message
    function getStatusMessage(status) {
        const messages = {
            'received': 'We have received your complaint and will review it shortly.',
            'in-progress': 'Your complaint is currently being investigated by our team.',
            'resolved': 'Your complaint has been resolved successfully.',
            'escalated': 'Your complaint has been escalated to a specialist for further review.'
        };
        return messages[status] || 'Status unknown.';
    }

    // Initialize complaints modal when DOM is loaded
    document.addEventListener('DOMContentLoaded', function() {
        console.log('Initializing complaints system...');
        
        // Event listeners for complaint modal
        if (complainBtn) {
            complainBtn.addEventListener('click', function(e) {
                e.preventDefault();
                openComplaintModal();
            });
        }
        
        if (complaintClose) {
            complaintClose.addEventListener('click', closeComplaintModal);
        }
        
        if (complaintDashboardBtn) {
            complaintDashboardBtn.addEventListener('click', function() {
                window.location.href = '/Dashboard/complain_Dashboard.html';
            });
        }
        
        // Tab switching
        const newTabBtn = document.getElementById('complaint-new-tab');
        const statusTabBtn = document.getElementById('complaint-status-tab');
        
        if (newTabBtn) {
            newTabBtn.addEventListener('click', function() {
                switchComplaintTab('new');
            });
        }
        
        if (statusTabBtn) {
            statusTabBtn.addEventListener('click', function() {
                switchComplaintTab('status');
            });
        }
        
        // Form submission
        const complaintForm = document.getElementById('complaint-form');
        if (complaintForm) {
            complaintForm.addEventListener('submit', function(e) {
                e.preventDefault();
                
                // Get form values
                const category = document.getElementById('complaint-category').value;
                const subject = document.getElementById('complaint-subject').value;
                const description = document.getElementById('complaint-description').value;
                const urgent = document.getElementById('complaint-urgent').checked;
                
                // Validation
                if (!category || !subject || !description) {
                    alert('Please fill in all required fields');
                    return;
                }
                
                // Generate reference number
                const refNum = generateReferenceNumber();
                
                // Create complaint object
                const complaint = {
                    category: category,
                    subject: subject,
                    description: description,
                    urgent: urgent,
                    reference: refNum,
                    status: 'received',
                    createdAt: new Date().toISOString(),
                    updatedAt: new Date().toISOString()
                };
                
                // Show loading state
                const submitButton = complaintForm.querySelector('button[type="submit"]');
                const originalText = submitButton.innerHTML;
                submitButton.innerHTML = '<i class="fas fa-spinner fa-spin mr-2"></i> Submitting...';
                submitButton.disabled = true;
                complaintForm.classList.add('complaint-loading');
                
                // Save to Firebase
                database.ref('complaints').push(complaint)
                    .then(() => {
                        console.log('Complaint saved successfully');
                        
                        // Show success message
                        const refNumberSpan = document.getElementById('complaint-reference-number');
                        if (refNumberSpan) refNumberSpan.textContent = refNum;
                        
                        const successMessage = document.getElementById('complaint-success-message');
                        if (successMessage) {
                            successMessage.classList.remove('hidden');
                            successMessage.classList.add('complaint-success');
                        }
                        
                        // Hide form
                        complaintForm.classList.add('hidden');
                        
                        // Reset form and restore button after 5 seconds
                        setTimeout(() => {
                            complaintForm.reset();
                            complaintForm.classList.remove('hidden', 'complaint-loading');
                            if (successMessage) successMessage.classList.add('hidden');
                            submitButton.innerHTML = originalText;
                            submitButton.disabled = false;
                        }, 5000);
                    })
                    .catch((error) => {
                        console.error('Error saving complaint:', error);
                        alert('Sorry, there was an error submitting your complaint. Please try again.');
                        submitButton.innerHTML = originalText;
                        submitButton.disabled = false;
                        complaintForm.classList.remove('complaint-loading');
                    });
            });
        }
        
        // Check status functionality
        const checkStatusBtn = document.getElementById('complaint-check-status');
        if (checkStatusBtn) {
            checkStatusBtn.addEventListener('click', function() {
                const referenceInput = document.getElementById('complaint-reference');
                const statusResult = document.getElementById('complaint-status-result');
                
                const ref = referenceInput.value.trim();
                if (!ref) {
                    if (statusResult) {
                        statusResult.innerHTML = `
                            <div class="flex items-center">
                                <i class="fas fa-exclamation-triangle text-red-500 mr-3"></i>
                                <p class="text-red-700">Please enter a reference number</p>
                            </div>
                        `;
                        statusResult.classList.remove('hidden');
                    }
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
                            
                            const statusProps = getStatusProperties(complaintData.status);
                            
                            const statusHTML = `
                                <div class="space-y-4">
                                    <div class="flex items-center justify-between">
                                        <div>
                                            <h4 class="font-bold text-gray-800">Complaint: ${ref}</h4>
                                            <div class="flex items-center mt-2">
                                                <span class="status-dot status-${statusProps.color}"></span>
                                                <span class="font-medium text-${statusProps.color}-800">${statusProps.text}</span>
                                            </div>
                                            <p class="text-sm text-gray-600 mt-2">${getStatusMessage(complaintData.status)}</p>
                                        </div>
                                        <div class="text-${statusProps.color}-500 text-3xl">
                                            <i class="fas fa-${statusProps.icon}"></i>
                                        </div>
                                    </div>
                                    
                                    <div class="border-t pt-4">
                                        <h5 class="font-medium text-gray-700 mb-2">Complaint Details:</h5>
                                        <p class="text-sm text-gray-600"><strong>Subject:</strong> ${complaintData.subject}</p>
                                        <p class="text-sm text-gray-600 mt-1"><strong>Category:</strong> ${complaintData.category}</p>
                                        ${complaintData.urgent ? '<p class="text-sm text-red-600 mt-1"><strong>⚠️ Marked as Urgent</strong></p>' : ''}
                                    </div>
                                    
                                    <div class="border-t pt-4">
                                        <p class="text-xs text-gray-500"><strong>Submitted:</strong> ${formatDate(complaintData.createdAt)}</p>
                                        ${complaintData.updatedAt !== complaintData.createdAt ? 
                                            `<p class="text-xs text-gray-500 mt-1"><strong>Last Updated:</strong> ${formatDate(complaintData.updatedAt)}</p>` : ''}
                                    </div>
                                    
                                    ${complaintData.status === 'resolved' ? `
                                    <div class="mt-4 p-3 bg-green-50 rounded-lg border border-green-200">
                                        <p class="text-sm text-green-700"><i class="fas fa-check-circle mr-2"></i><strong>Resolution Note:</strong> Your complaint has been addressed and resolved. Thank you for your feedback.</p>
                                    </div>
                                    ` : ''}
                                </div>
                            `;
                            
                            if (statusResult) {
                                statusResult.innerHTML = statusHTML;
                                statusResult.classList.remove('hidden');
                            }
                        } else {
                            if (statusResult) {
                                statusResult.innerHTML = `
                                    <div class="flex items-center">
                                        <i class="fas fa-exclamation-triangle text-red-500 mr-3"></i>
                                        <div>
                                            <p class="text-red-700">No complaint found with reference: ${ref}</p>
                                            <p class="text-sm text-gray-600 mt-1">Please check the reference number and try again.</p>
                                        </div>
                                    </div>
                                `;
                                statusResult.classList.remove('hidden');
                            }
                        }
                    })
                    .catch((error) => {
                        console.error('Error checking status:', error);
                        if (checkStatusBtn) {
                            checkStatusBtn.innerHTML = originalText;
                            checkStatusBtn.disabled = false;
                        }
                        if (statusResult) {
                            statusResult.innerHTML = `
                                <div class="flex items-center">
                                    <i class="fas fa-exclamation-triangle text-red-500 mr-3"></i>
                                    <p class="text-red-700">Error checking complaint status. Please try again.</p>
                                </div>
                            `;
                            statusResult.classList.remove('hidden');
                        }
                    });
            });
        }
        
        // Close modal when clicking outside
        complaintModal.addEventListener('click', function(e) {
            if (e.target === complaintModal) {
                closeComplaintModal();
            }
        });
        
        // Close modal with Escape key
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape' && !complaintModal.classList.contains('hidden')) {
                closeComplaintModal();
            }
        });
        
        console.log('Complaints system initialized successfully');
    });