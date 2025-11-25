  
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
        const db = firebase.database();

        // Notification function
        function showNotification(message, type = 'success') {
            // Remove existing notifications
            const existingNotifications = document.querySelectorAll('.notification');
            existingNotifications.forEach(notification => notification.remove());
            
            // Create new notification
            const notification = document.createElement('div');
            notification.className = `notification ${type}`;
            
            // Add icon based on type
            const icon = type === 'success' ? 'fa-check-circle' : 'fa-exclamation-circle';
            notification.innerHTML = `
                <i class="fas ${icon}"></i>
                <span>${message}</span>
            `;
            
            document.body.appendChild(notification);
            
            // Auto remove after 5 seconds
            setTimeout(() => {
                if (notification.parentNode) {
                    notification.parentNode.removeChild(notification);
                }
            }, 5000);
        }

        // Handle maternity appointment form submission
        document.addEventListener('DOMContentLoaded', function() {
            const maternityForm = document.getElementById('maternity-form');

            if (maternityForm) {
                console.log('Maternity form found, setting up event listener...');
                
                maternityForm.addEventListener('submit', function(e) {
                    e.preventDefault();
                    console.log('Form submitted!');
                    
                    // Get form data
                    const formData = {
                        firstName: document.getElementById('first-name').value,
                        lastName: document.getElementById('last-name').value,
                        email: document.getElementById('email').value,
                        phone: document.getElementById('phone').value,
                        pregnancyWeek: document.getElementById('pregnancy-week').value,
                        serviceType: document.getElementById('service-type').value,
                        preferredDate: document.getElementById('preferred-date').value,
                        message: document.getElementById('message').value,
                        department: 'Maternity Care',
                        createdAt: new Date().toISOString(),
                        status: 'pending'
                    };

                    console.log('Form data:', formData);

                    // Generate unique ID
                    const appointmentId = 'maternity_' + new Date().getTime() + '_' + Math.random().toString(36).substr(2, 9);

                    // Save to Firebase
                    db.ref('maternity-appointments/' + appointmentId).set(formData)
                        .then(() => {
                            console.log('Appointment saved successfully');
                            showNotification('✅ Maternity appointment request submitted successfully! We will contact you soon.', 'success');
                            maternityForm.reset();
                        })
                        .catch((error) => {
                            console.error('Error saving appointment:', error);
                            showNotification('❌ Error submitting appointment request. Please try again.', 'error');
                        });
                });
            } else {
                console.error('Maternity form not found!');
            }

            // Mobile menu functionality
            const mobileMenuButton = document.getElementById('mobile-menu-button');
            const mobileMenu = document.getElementById('mobile-menu');
            const mobileServicesToggle = document.getElementById('mobile-services-toggle');
            const mobileServicesMenu = document.getElementById('mobile-services-menu');
            
            if (mobileMenuButton && mobileMenu) {
                mobileMenuButton.addEventListener('click', function() {
                    mobileMenu.classList.toggle('hidden');
                    const icon = mobileMenuButton.querySelector('i');
                    if (mobileMenu.classList.contains('hidden')) {
                        icon.classList.remove('fa-times');
                        icon.classList.add('fa-bars');
                    } else {
                        icon.classList.remove('fa-bars');
                        icon.classList.add('fa-times');
                    }
                });
            }
            
            if (mobileServicesToggle && mobileServicesMenu) {
                mobileServicesToggle.addEventListener('click', function() {
                    mobileServicesMenu.classList.toggle('hidden');
                    const chevron = mobileServicesToggle.querySelector('i');
                    chevron.classList.toggle('fa-chevron-down');
                    chevron.classList.toggle('fa-chevron-up');
                });
            }

            // Set minimum date for appointment to today
            const dateInput = document.getElementById('preferred-date');
            if (dateInput) {
                const today = new Date().toISOString().split('T')[0];
                dateInput.min = today;
            }
        });
    