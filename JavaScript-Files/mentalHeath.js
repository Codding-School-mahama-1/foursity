   
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

        // Utility function to show notifications
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

        // Contact form submission handler
        const contactForm = document.getElementById('contactForm');
        const successModal = document.getElementById('successModal');
        const closeSuccessModal = document.getElementById('closeSuccessModal');
        
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const formData = {
                name: document.getElementById('name').value || 'Anonymous',
                contact: document.getElementById('contact').value || 'Not provided',
                supportType: document.getElementById('support-type').value,
                message: document.getElementById('message').value,
                urgent: document.getElementById('urgent').checked,
                createdAt: new Date().toISOString(),
                status: 'new'
            };
            
            // Validate required fields
            if (!formData.supportType) {
                showNotification('Please select the type of support needed.', 'error');
                return;
            }
            
            if (!formData.message) {
                showNotification('Please provide a message so we can help you.', 'error');
                return;
            }
            
            // Save to Firebase
            const newContactRef = database.ref('mentalHealthContacts').push();
            newContactRef.set(formData)
                .then(() => {
                    // Show success modal
                    successModal.classList.remove('hidden');
                    // Reset form
                    contactForm.reset();
                })
                .catch((error) => {
                    console.error('Error saving contact:', error);
                    showNotification('There was an error sending your message. Please try again or call 845 for immediate help.', 'error');
                });
        });

        // Close success modal
        closeSuccessModal.addEventListener('click', function() {
            successModal.classList.add('hidden');
        });

        // Close modal when clicking outside
        successModal.addEventListener('click', function(e) {
            if (e.target === successModal) {
                successModal.classList.add('hidden');
            }
        });

        // Mobile menu functionality
        const mobileMenuButton = document.getElementById('mobile-menu-button');
        const mobileMenu = document.getElementById('mobile-menu');
        const mobileServicesToggle = document.getElementById('mobile-services-toggle');
        const mobileServicesMenu = document.getElementById('mobile-services-menu');

        if (mobileMenuButton && mobileMenu) {
            mobileMenuButton.addEventListener('click', function() {
                mobileMenu.classList.toggle('hidden');
            });
        }

        if (mobileServicesToggle && mobileServicesMenu) {
            mobileServicesToggle.addEventListener('click', function() {
                mobileServicesMenu.classList.toggle('hidden');
            });
        }
    