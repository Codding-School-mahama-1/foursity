// emergency.js - For the emergency.html page

// Firebase Configuration (MUST BE THE SAME AS DASHBOARD)
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

class EmergencyFormHandler {
    constructor() {
        this.db = firebase.database();
        this.reportsRef = this.db.ref('emergencyReports');
    }

    async submitEmergencyReport(reportData) {
        try {
            const newReportRef = this.reportsRef.push();
            await newReportRef.set({
                ...reportData,
                createdAt: new Date().toISOString(),
                status: 'new'
            });
            return { success: true, id: newReportRef.key };
        } catch (error) {
            console.error('Error submitting emergency report:', error);
            return { success: false, error: error.message };
        }
    }
}

// Initialize emergency form handler
const emergencyFormHandler = new EmergencyFormHandler();

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

// Mobile menu functionality
document.addEventListener('DOMContentLoaded', function() {
    const mobileMenuButton = document.getElementById('mobile-menu-button');
    const mobileMenu = document.getElementById('mobile-menu');
    const mobileServicesToggle = document.getElementById('mobile-services-toggle');
    const mobileServicesMenu = document.getElementById('mobile-services-menu');

    // Mobile menu toggle
    if (mobileMenuButton && mobileMenu) {
        mobileMenuButton.addEventListener('click', function() {
            mobileMenu.classList.toggle('hidden');
        });
    }

    // Mobile services dropdown
    if (mobileServicesToggle && mobileServicesMenu) {
        mobileServicesToggle.addEventListener('click', function() {
            mobileServicesMenu.classList.toggle('hidden');
        });
    }

    // Contact form submission
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', async function(e) {
            e.preventDefault();
            
            // Get form data
            const formData = {
                firstName: document.getElementById('first-name').value,
                email: document.getElementById('email').value,
                phone: document.getElementById('phone').value,
                subject: document.getElementById('subject').value,
                message: document.getElementById('message').value
            };

            // Validate required fields
            if (!formData.firstName || !formData.email || !formData.message) {
                showNotification('Please fill in all required fields.', 'error');
                return;
            }

            try {
                // Submit to Firebase
                const result = await emergencyFormHandler.submitEmergencyReport(formData);
                
                if (result.success) {
                    showNotification('Emergency report submitted successfully! Our team will respond shortly.', 'success');
                    contactForm.reset();
                } else {
                    showNotification('Error submitting report. Please try again.', 'error');
                }
            } catch (error) {
                console.error('Error:', error);
                showNotification('Error submitting report. Please try again.', 'error');
            }
        });
    }

    // Login/Signup buttons (placeholder functionality)
    const loginButtons = [
        document.getElementById('desktop-login-btn'),
        document.getElementById('mobile-login-btn'),
        document.getElementById('login-btn')
    ];

    const signupButtons = [
        document.getElementById('desktop-signup-btn'),
        document.getElementById('mobile-signup-btn'),
        document.getElementById('signup-btn')
    ];

    loginButtons.forEach(btn => {
        if (btn) {
            btn.addEventListener('click', function() {
                showNotification('Login functionality would be implemented here.', 'info');
            });
        }
    });

    signupButtons.forEach(btn => {
        if (btn) {
            btn.addEventListener('click', function() {
                showNotification('Signup functionality would be implemented here.', 'info');
            });
        }
    });

    // FAQ navigation
    const faqLinks = [
        document.getElementById('faq-nav-link'),
        document.getElementById('mobile-faq-link'),
        document.getElementById('footer-faq-link')
    ];

    faqLinks.forEach(link => {
        if (link) {
            link.addEventListener('click', function(e) {
                e.preventDefault();
                showNotification('FAQ section would be implemented here.', 'info');
            });
        }
    });
});