
        // Doctor data
        const doctors = {
            1: {
                name: "Dr. Ahmed Mohamed",
                specialty: "Pediatrics Specialist",
                qualification: "PhD in Pediatrics - Harvard University",
                experience: "15 years",
                department: "Pediatrics",
                hospital: "King Faisal Specialist Hospital",
                phone: "0112345678",
                about: "Dr. Ahmed Mohamed is a certified Pediatrics Specialist with over 15 years of experience in diagnosing and treating diseases affecting children from birth to adolescence. He specializes in pediatric respiratory diseases and allergies. Fluent in Arabic and English.",
                image: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80"
            },
            2: {
                name: "Dr. Sara Abdullah",
                specialty: "Cardiology Specialist",
                qualification: "MD in Cardiology - Johns Hopkins University",
                experience: "12 years",
                department: "Cardiology",
                hospital: "King Abdulaziz Hospital",
                phone: "0112345679",
                about: "Dr. Sara Abdullah is a renowned cardiologist with 12 years of experience in treating heart conditions. She specializes in interventional cardiology and has performed over 500 successful cardiac procedures.",
                image: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80"
            },
            3: {
                name: "Dr. Khaled Saeed",
                specialty: "Dentistry Specialist",
                qualification: "DDS - University of Pennsylvania",
                experience: "10 years",
                department: "Dentistry",
                hospital: "Armed Forces Hospital",
                phone: "0112345680",
                about: "Dr. Khaled Saeed is a skilled dentist with expertise in cosmetic dentistry and dental implants. He has helped hundreds of patients achieve perfect smiles through advanced dental procedures.",
                image: "https://images.unsplash.com/photo-1622253692010-333f2da6031d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1064&q=80"
            },
            4: {
                name: "Dr. Fatima Ali",
                specialty: "Ophthalmology Specialist",
                qualification: "MD in Ophthalmology - Stanford University",
                experience: "14 years",
                department: "Ophthalmology",
                hospital: "King Khalid Hospital",
                phone: "0112345681",
                about: "Dr. Fatima Ali is an experienced ophthalmologist specializing in cataract surgery and retinal diseases. She has performed over 1000 successful eye surgeries and is known for her gentle approach with patients.",
                image: "./img/dr.f.png"
            }
        };

        // Calendar functionality
        let currentDate = new Date();
        let selectedDate = new Date();
        let selectedTime = null;
        let selectedDoctorId = null;

        // Page Navigation
        document.addEventListener('DOMContentLoaded', function() {
            const pages = document.querySelectorAll('.page');
            const homePage = document.getElementById('home');
            const doctorDetailsPage = document.getElementById('doctor');
            const confirmationPage = document.getElementById('confirmation');
            
            // Show specific page and hide others
            function showPage(page) {
                pages.forEach(p => p.classList.remove('active'));
                page.classList.add('active');
                window.scrollTo(0, 0);
            }
            
            // Button events
            document.querySelectorAll('.view-details, .book-now').forEach(button => {
                button.addEventListener('click', function() {
                    const doctorCard = this.closest('[data-doctor-id]');
                    selectedDoctorId = doctorCard.getAttribute('data-doctor-id');
                    loadDoctorDetails(selectedDoctorId);
                    showPage(doctorDetailsPage);
                });
            });
            
            document.getElementById('back-to-home').addEventListener('click', function() {
                showPage(homePage);
                resetForm();
            });
            
            // Print confirmation
            document.getElementById('print-confirmation').addEventListener('click', function() {
                window.print();
            });
            
            // Calendar navigation
            document.getElementById('prev-month').addEventListener('click', function() {
                currentDate.setMonth(currentDate.getMonth() - 1);
                renderCalendar();
            });
            
            document.getElementById('next-month').addEventListener('click', function() {
                currentDate.setMonth(currentDate.getMonth() + 1);
                renderCalendar();
            });
            
            // Booking form submission
            document.getElementById('booking-form').addEventListener('submit', function(e) {
                e.preventDefault();
                
                // Update confirmation details
                document.getElementById('confirm-doctor-name').textContent = doctors[selectedDoctorId].name;
                document.getElementById('confirm-date').textContent = formatDate(selectedDate);
                document.getElementById('confirm-time').textContent = selectedTime;
                document.getElementById('confirm-hospital').textContent = doctors[selectedDoctorId].hospital;
                
                showPage(confirmationPage);
            });
            
            // Initialize calendar
            renderCalendar();
            generateTimeSlots();
        });

        // Load doctor details
        function loadDoctorDetails(doctorId) {
            const doctor = doctors[doctorId];
            
            document.getElementById('detail-doctor-name').textContent = doctor.name;
            document.getElementById('detail-doctor-specialty').textContent = doctor.specialty;
            document.getElementById('detail-doctor-qualification').textContent = doctor.qualification;
            document.getElementById('detail-doctor-experience').textContent = doctor.experience;
            document.getElementById('detail-doctor-department').textContent = doctor.department;
            document.getElementById('detail-doctor-hospital').textContent = doctor.hospital;
            document.getElementById('detail-doctor-phone').textContent = doctor.phone;
            document.getElementById('detail-doctor-about').textContent = doctor.about;
            document.getElementById('detail-doctor-image').style.backgroundImage = `url('${doctor.image}')`;
            
            // Update booking summary
            document.getElementById('summary-doctor-name').textContent = doctor.name;
            document.getElementById('summary-hospital').textContent = doctor.hospital;
        }

        // Render calendar
        function renderCalendar() {
            const calendarDates = document.getElementById('calendar-dates');
            const currentMonthElement = document.getElementById('current-month');
            
            // Clear previous dates
            calendarDates.innerHTML = '';
            
            // Set current month text
            currentMonthElement.textContent = currentDate.toLocaleString('default', { month: 'long', year: 'numeric' });
            
            // Get first day of month and number of days
            const firstDay = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);
            const lastDay = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0);
            const daysInMonth = lastDay.getDate();
            
            // Add day headers
            const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
            days.forEach(day => {
                const dayElement = document.createElement('div');
                dayElement.className = 'text-center font-medium py-2';
                dayElement.textContent = day;
                calendarDates.appendChild(dayElement);
            });
            
            // Add empty cells for days before the first day of the month
            for (let i = 0; i < firstDay.getDay(); i++) {
                const emptyElement = document.createElement('div');
                emptyElement.className = 'text-center py-3 rounded';
                calendarDates.appendChild(emptyElement);
            }
            
            // Add days of the month
            for (let i = 1; i <= daysInMonth; i++) {
                const dateElement = document.createElement('div');
                dateElement.className = 'calendar-date text-center py-3 rounded';
                dateElement.textContent = i;
                
                // Check if this date is today
                const today = new Date();
                if (currentDate.getMonth() === today.getMonth() && 
                    currentDate.getFullYear() === today.getFullYear() && 
                    i === today.getDate()) {
                    dateElement.classList.add('bg-secondary', 'text-white');
                }
                
                // Check if this date is selected
                if (currentDate.getMonth() === selectedDate.getMonth() && 
                    currentDate.getFullYear() === selectedDate.getFullYear() && 
                    i === selectedDate.getDate()) {
                    dateElement.classList.add('selected-date');
                }
                
                dateElement.addEventListener('click', function() {
                    // Update selected date
                    selectedDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), i);
                    
                    // Update UI
                    document.querySelectorAll('.calendar-date').forEach(date => {
                        date.classList.remove('selected-date');
                    });
                    this.classList.add('selected-date');
                    
                    // Update selected date text
                    document.getElementById('selected-date').textContent = formatDate(selectedDate);
                    document.getElementById('summary-date').textContent = formatDate(selectedDate);
                    
                    // Generate time slots for selected date
                    generateTimeSlots();
                });
                
                calendarDates.appendChild(dateElement);
            }
        }

        // Generate time slots
        function generateTimeSlots() {
            const timeSlotsContainer = document.getElementById('time-slots');
            timeSlotsContainer.innerHTML = '';
            
            // Generate time slots from 9 AM to 6 PM in 30-minute intervals
            for (let hour = 9; hour <= 18; hour++) {
                for (let minute = 0; minute < 60; minute += 30) {
                    if (hour === 18 && minute === 30) break; // Stop at 6:00 PM
                    
                    const timeString = `${hour % 12 === 0 ? 12 : hour % 12}:${minute === 0 ? '00' : minute} ${hour < 12 ? 'AM' : 'PM'}`;
                    
                    const timeSlot = document.createElement('div');
                    timeSlot.className = 'time-slot text-center py-2 bg-gray-100 rounded';
                    timeSlot.textContent = timeString;
                    
                    // Randomly mark some time slots as booked (for demo purposes)
                    if (Math.random() < 0.2) {
                        timeSlot.classList.add('booked-time');
                        timeSlot.title = 'This time slot is already booked';
                    } else {
                        timeSlot.addEventListener('click', function() {
                            if (!this.classList.contains('booked-time')) {
                                // Update selected time
                                selectedTime = timeString;
                                
                                // Update UI
                                document.querySelectorAll('.time-slot').forEach(slot => {
                                    if (!slot.classList.contains('booked-time')) {
                                        slot.classList.remove('selected-time');
                                    }
                                });
                                this.classList.add('selected-time');
                                
                                // Update summary
                                document.getElementById('summary-time').textContent = timeString;
                            }
                        });
                    }
                    
                    timeSlotsContainer.appendChild(timeSlot);
                }
            }
        }

        // Format date for display
        function formatDate(date) {
            return date.toLocaleString('default', { month: 'long', day: 'numeric', year: 'numeric' });
        }

        // Reset form when going back to home
        function resetForm() {
            document.getElementById('booking-form').reset();
            selectedTime = null;
            document.getElementById('summary-time').textContent = 'No time selected yet';
        }

        // Mobile menu functionality
        document.addEventListener('DOMContentLoaded', function() {
            const mobileMenuButton = document.getElementById('mobile-menu-button');
            const mobileMenu = document.getElementById('mobile-menu');
            const mobileServicesToggle = document.getElementById('mobile-services-toggle');
            const mobileServicesMenu = document.getElementById('mobile-services-menu');
            
            // Toggle mobile menu
            if (mobileMenuButton && mobileMenu) {
                mobileMenuButton.addEventListener('click', function() {
                    mobileMenu.classList.toggle('hidden');
                    // Toggle icon between bars and times
                    const icon = mobileMenuButton.querySelector('i');
                    if (icon.classList.contains('fa-bars')) {
                        icon.classList.remove('fa-bars');
                        icon.classList.add('fa-times');
                    } else {
                        icon.classList.remove('fa-times');
                        icon.classList.add('fa-bars');
                    }
                });
            }
            
            // Toggle mobile services dropdown
            if (mobileServicesToggle && mobileServicesMenu) {
                mobileServicesToggle.addEventListener('click', function() {
                    mobileServicesMenu.classList.toggle('hidden');
                    // Toggle chevron icon
                    const icon = mobileServicesToggle.querySelector('i');
                    if (icon.classList.contains('fa-chevron-down')) {
                        icon.classList.remove('fa-chevron-down');
                        icon.classList.add('fa-chevron-up');
                    } else {
                        icon.classList.remove('fa-chevron-up');
                        icon.classList.add('fa-chevron-down');
                    }
                });
            }
            
            // Close mobile menu when clicking on links
            const mobileMenuLinks = mobileMenu.querySelectorAll('a');
            mobileMenuLinks.forEach(link => {
                link.addEventListener('click', function() {
                    mobileMenu.classList.add('hidden');
                    // Reset menu icon
                    const icon = mobileMenuButton.querySelector('i');
                    if (icon.classList.contains('fa-times')) {
                        icon.classList.remove('fa-times');
                        icon.classList.add('fa-bars');
                    }
                    // Reset services menu if open
                    if (mobileServicesMenu && !mobileServicesMenu.classList.contains('hidden')) {
                        mobileServicesMenu.classList.add('hidden');
                        const servicesIcon = mobileServicesToggle.querySelector('i');
                        if (servicesIcon.classList.contains('fa-chevron-up')) {
                            servicesIcon.classList.remove('fa-chevron-up');
                            servicesIcon.classList.add('fa-chevron-down');
                        }
                    }
                });
            });

            // Close mobile menu when clicking outside
            document.addEventListener('click', function(event) {
                if (!event.target.closest('#mobile-menu') && !event.target.closest('#mobile-menu-button') && mobileMenu && !mobileMenu.classList.contains('hidden')) {
                    mobileMenu.classList.add('hidden');
                    const icon = mobileMenuButton.querySelector('i');
                    if (icon.classList.contains('fa-times')) {
                        icon.classList.remove('fa-times');
                        icon.classList.add('fa-bars');
                    }
                }
            });

            // Handle window resize
            window.addEventListener('resize', function() {
                if (window.innerWidth >= 768 && !mobileMenu.classList.contains('hidden')) {
                    mobileMenu.classList.add('hidden');
                    const icon = mobileMenuButton.querySelector('i');
                    if (icon.classList.contains('fa-times')) {
                        icon.classList.remove('fa-times');
                        icon.classList.add('fa-bars');
                    }
                }
            });
        });
    