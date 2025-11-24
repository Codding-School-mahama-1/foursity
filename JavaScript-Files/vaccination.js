
        // Vaccination Registration Class
        class VaccinationRegistration {
            constructor() {
                this.db = firebase.database();
                this.registrationsRef = this.db.ref('vaccinationRegistrations');
            }

            async submitRegistration(registrationData) {
                try {
                    const timestamp = new Date().toISOString();
                    const registrationWithTimestamp = {
                        ...registrationData,
                        timestamp: timestamp,
                        status: 'pending'
                    };

                    const newRegistrationRef = this.registrationsRef.push();
                    await newRegistrationRef.set(registrationWithTimestamp);
                    
                    return { success: true, id: newRegistrationRef.key };
                } catch (error) {
                    console.error('Error submitting registration:', error);
                    return { success: false, error: error.message };
                }
            }
        }

        // Initialize vaccination registration
        const vaccinationRegistration = new VaccinationRegistration();

        // Utility function to show notification
        function showNotification(message, type = 'success') {
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

        // Form submission handler
        document.addEventListener('DOMContentLoaded', function() {
            const vaccinationForm = document.getElementById('vaccination-form');
            const successMessage = document.getElementById('success-message');

            if (vaccinationForm) {
                vaccinationForm.addEventListener('submit', async function(e) {
                    e.preventDefault();
                    
                    // Get form data
                    const formData = {
                        fullName: document.getElementById('full-name').value,
                        age: document.getElementById('age').value,
                        gender: document.getElementById('gender').value,
                        campSector: document.getElementById('camp-sector').value,
                        vaccineInterest: document.getElementById('vaccine-interest').value,
                        contact: document.getElementById('contact').value || 'Not provided'
                    };

                    try {
                        // Show loading state
                        const submitButton = vaccinationForm.querySelector('button[type="submit"]');
                        const originalText = submitButton.textContent;
                        submitButton.textContent = 'Submitting...';
                        submitButton.disabled = true;

                        // Submit to Firebase
                        const result = await vaccinationRegistration.submitRegistration(formData);
                        
                        if (result.success) {
                            // Show success message
                            successMessage.classList.remove('hidden');
                            
                            // Show notification
                            showNotification('Registration submitted successfully!', 'success');
                            
                            // Reset form
                            vaccinationForm.reset();
                            
                            // Scroll to success message
                            successMessage.scrollIntoView({ behavior: 'smooth' });
                            
                            // Hide success message after 10 seconds
                            setTimeout(() => {
                                successMessage.classList.add('hidden');
                            }, 10000);
                        } else {
                            showNotification('Error submitting registration. Please try again.', 'error');
                        }
                    } catch (error) {
                        console.error('Form submission error:', error);
                        showNotification('Error submitting registration. Please try again.', 'error');
                    } finally {
                        // Reset button state
                        const submitButton = vaccinationForm.querySelector('button[type="submit"]');
                        submitButton.textContent = 'Submit Registration';
                        submitButton.disabled = false;
                    }
                });
            }

            // Mobile menu functionality
            const mobileMenuButton = document.getElementById('mobile-menu-button');
            const mobileMenu = document.getElementById('mobile-menu');
            
            if (mobileMenuButton && mobileMenu) {
                mobileMenuButton.addEventListener('click', function() {
                    mobileMenu.classList.toggle('hidden');
                });
            }
        });
    