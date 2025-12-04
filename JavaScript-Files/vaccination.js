// vaccination.js - For the vaccination.html page with Language Support

// Language Configuration for Vaccination Page
const vaccinationTranslations = {
    en: {
        // Page Title
        "vaccination-page-title": "Vaccination Program - Protecting Our Community",
        
        // Navigation
        "home-nav": "Home",
        "about-nav": "About",
        "services-nav": "Services",
        "maternity-nav": "Maternity & Birth Services",
        "emergency-nav": "Emergency Care",
        "vaccination-nav": "Vaccination Programs",
        "mentalhealth-nav": "Mental Health Support",
        "chronic-disease-nav": "Chronic Disease Care",
        "health-edu-nav": "Health Awareness & Education",
        "disability-nav": "Disability Care",
        "doctors-nav": "Doctors",
        "register-vaccination-nav": "Register for Vaccination",
        "signup-btn": "Sign Up",
        "login-btn": "Log In",
        "logo-text": "🏥 MCH",
        
        // Hero Section
        "vaccination-hero-title": "Protecting Our Community Through Vaccination",
        "vaccination-hero-subtitle": "Free vaccination services available for all residents of the refugee camp. Stay protected from preventable diseases.",
        "register-vaccination-btn": "Register for Vaccination",
        "view-schedule-btn": "View Vaccination Schedule",
        "video-not-supported": "Your browser does not support the video tag.",
        
        // Schedule Section
        "schedule-title": "Vaccination Schedule",
        "schedule-subtitle": "Recommended vaccination timeline for different age groups",
        "infants-title": "Infants (0-12 months)",
        "infants-subtitle": "Essential early childhood vaccines",
        "children-title": "Children (1-5 years)",
        "children-subtitle": "Continuing protection",
        "adults-title": "Adults & Special Groups",
        "adults-subtitle": "Ongoing protection",
        
        // Vaccine Names
        "bcg-vaccine": "BCG",
        "polio-opv-vaccine": "Polio (OPV)",
        "pentavalent-vaccine": "Pentavalent",
        "pcv-vaccine": "PCV",
        "measles-vaccine": "Measles",
        "mmr-vaccine": "MMR",
        "vitamin-a": "Vitamin A",
        "cholera-vaccine": "Cholera",
        "typhoid-vaccine": "Typhoid",
        "hpv-girls": "HPV (Girls)",
        "tetanus-vaccine": "Tetanus",
        "covid19-vaccine": "COVID-19",
        "influenza-vaccine": "Influenza",
        "pregnant-women": "Pregnant Women",
        "elderly": "Elderly",
        
        // Schedule Times
        "at-birth": "At birth",
        "weeks-6-10-14": "6, 10, 14 weeks",
        "9-months": "9 months",
        "12-15-months": "12-15 months",
        "every-6-months": "Every 6 months",
        "as-needed": "As needed",
        "2-years-plus": "2 years+",
        "9-14-years": "9-14 years",
        "every-10-years": "Every 10 years",
        "as-recommended": "As recommended",
        "yearly": "Yearly",
        "tt-influenza": "TT, Influenza",
        "pneumococcal": "Pneumococcal",
        
        // Vaccine Information
        "vaccine-info-title": "Vaccine Information",
        "vaccine-info-subtitle": "Learn about the vaccines available in our program",
        "pentavalent-title": "Pentavalent Vaccine",
        "pentavalent-desc": "Protects against five deadly diseases: Diphtheria, Tetanus, Pertussis, Hepatitis B, and Haemophilus influenzae type B.",
        "pcv-title": "Pneumococcal Vaccine (PCV)",
        "pcv-desc": "Protects against pneumonia, meningitis, and other infections caused by Streptococcus pneumoniae bacteria.",
        "opv-title": "Oral Polio Vaccine (OPV)",
        "opv-desc": "Protects against poliomyelitis, a highly infectious viral disease that can lead to permanent paralysis.",
        "measles-title": "Measles Vaccine",
        "measles-desc": "Protects against measles, a highly contagious viral disease that can cause severe complications, especially in children.",
        "covid19-title": "COVID-19 Vaccine",
        "covid19-desc": "Protects against COVID-19, reducing severe illness, hospitalization, and death from the virus.",
        "cholera-title": "Cholera Vaccine",
        "cholera-desc": "Protects against cholera, a waterborne disease that can cause severe diarrhea and dehydration.",
        "dosage-schedule": "Dosage Schedule:",
        "available-vaccines": "Available Vaccines:",
        "first-dose-6weeks": "First dose: 6 weeks",
        "second-dose-10weeks": "Second dose: 10 weeks",
        "third-dose-14weeks": "Third dose: 14 weeks",
        "first-dose-9months": "First dose: 9 months",
        "second-dose-15-18months": "Second dose: 15-18 months",
        "two-doses-2weeks": "Two doses, 2 weeks apart",
        "protection-3years": "Protection lasts about 3 years",
        
        // Registration Section
        "register-title": "Register for Vaccination",
        "register-subtitle": "Pre-register for vaccination to reduce waiting time",
        "form-title": "Vaccination Registration Form",
        "full-name-label": "Full Name *",
        "age-label": "Age *",
        "gender-label": "Gender *",
        "select-gender": "Select",
        "male": "Male",
        "female": "Female",
        "other": "Other",
        "camp-sector-label": "Camp Sector/Location *",
        "vaccine-interest-label": "Vaccines of Interest",
        "select-vaccine": "Select vaccine(s)",
        "routine-vaccines": "Routine childhood vaccines",
        "covid-vaccine": "COVID-19 vaccine",
        "cholera-vaccine": "Cholera vaccine",
        "all-vaccines": "All available vaccines",
        "need-advice": "Not sure - need advice",
        "contact-info-label": "Contact Information (Optional)",
        "phone-placeholder": "Phone number or other contact method",
        "submit-btn": "Submit Registration",
        "registration-success": "Registration Successful!",
        "registration-thankyou": "Thank you for registering for vaccination.",
        
        // Contact Information
        "location-title": "Our Location",
        "location-address": "Mahama Refugee Camp, Kirehe District, Rwanda",
        "phone-title": "Phone Number",
        "email-title": "Email Address",
        "hours-title": "Working Hours",
        "emergency-hours": "24/7 Emergency Services",
        "regular-hours": "Mon-Fri: 8am-6pm",
        "emergency-notice-title": "Need Immediate Assistance?",
        "emergency-notice-text": "Visit any vaccination location during operating hours - no appointment needed for routine vaccines.",
        
        // Footer
        "hospital-name": "MahamaCare Hospital",
        "hospital-tagline": "Providing high quality healthcare for over 20 years.",
        "quick-links-title": "Quick Links",
        "contact-info-title": "Contact Info",
        "follow-us-title": "Follow Us",
        "copyright": "© 2025 MahamaCare Hospital. All rights reserved."
    },
    rw: {
        // Page Title
        "vaccination-page-title": "Porogaramu yo Gukirurira - Kurinda Umuryango Wacu",
        
        // Navigation
        "home-nav": "Ahabanza",
        "about-nav": "Abyerekeye",
        "services-nav": "Serivisi",
        "maternity-nav": "Serivisi z'ububyeyi no kubyara",
        "emergency-nav": "Emergence",
        "vaccination-nav": "Guhumurizwa",
        "mentalhealth-nav": "Ubuzima bwo mu mutwe",
        "chronic-disease-nav": "Uburwayi butatana",
        "health-edu-nav": "Ubumenyi n'amahugurwa",
        "disability-nav": "Ubumuga",
        "doctors-nav": "Abaganga",
        "register-vaccination-nav": "Iyandikishe kwakirwa kiruru",
        "signup-btn": "Iyandike",
        "login-btn": "Injira",
        "logo-text": "🏥 MCH",
        
        // Hero Section
        "vaccination-hero-title": "Kurinda Umuryango Wacu Binyuze mu Kiruru",
        "vaccination-hero-subtitle": "Serivisi za kiruru zihariye kuri buri muntu utuye iyi misa. Iribe urindiriye indwara zokwirinda.",
        "register-vaccination-btn": "Iyandikishe kwakirwa kiruru",
        "view-schedule-btn": "Reba Gahunda yo gukirurira",
        "video-not-supported": "Porogaramu yawe ntishobora kwereka video.",
        
        // Schedule Section
        "schedule-title": "Gahunda yo Gukirurira",
        "schedule-subtitle": "Igihe gihuriweho cyo gukirurira ibitsina by'imyaka itandukanye",
        "infants-title": "Abana bato (imyaka 0-12)",
        "infants-subtitle": "Kiruru ngenderwaho zo mu buzima bwa mbere",
        "children-title": "Abana (imyaka 1-5)",
        "children-subtitle": "Komeza kurindiriza",
        "adults-title": "Abakuru n'Ibitsina by'ingenzi",
        "adults-subtitle": "Kurindiriza bikomeje",
        
        // Vaccine Names
        "bcg-vaccine": "BCG",
        "polio-opv-vaccine": "Polio (OPV)",
        "pentavalent-vaccine": "Pentavalent",
        "pcv-vaccine": "PCV",
        "measles-vaccine": "Indwara y'ibicurane",
        "mmr-vaccine": "MMR",
        "vitamin-a": "Vitamini A",
        "cholera-vaccine": "Kolera",
        "typhoid-vaccine": "Tiporoide",
        "hpv-girls": "HPV (Abakobwa)",
        "tetanus-vaccine": "Tetanisi",
        "covid19-vaccine": "COVID-19",
        "influenza-vaccine": "Influenza",
        "pregnant-women": "Abagore bafite inda",
        "elderly": "Abasaza",
        
        // Schedule Times
        "at-birth": "Igihe avukiye",
        "weeks-6-10-14": "Ibyumweru 6, 10, 14",
        "9-months": "Amezi 9",
        "12-15-months": "Amezi 12-15",
        "every-6-months": "Buri mezi 6",
        "as-needed": "Nk'uko bikenewe",
        "2-years-plus": "Imyaka 2 n'iyongereye",
        "9-14-years": "Imyaka 9-14",
        "every-10-years": "Buri myaka 10",
        "as-recommended": "Nk'uko byarekomowe",
        "yearly": "Buri mwaka",
        "tt-influenza": "TT, Influenza",
        "pneumococcal": "Pneumococcal",
        
        // Vaccine Information
        "vaccine-info-title": "Amakuru ku Kiruru",
        "vaccine-info-subtitle": "Menya ibijyanye na kiruru zirimo muri porogaramu yacu",
        "pentavalent-title": "Kiruru ya Pentavalent",
        "pentavalent-desc": "Iririnda indwara eshanu zica: Diphtheria, Tetanus, Pertussis, Hepatitis B, na Haemophilus influenzae type B.",
        "pcv-title": "Kiruru ya Pneumococcal (PCV)",
        "pcv-desc": "Iririnda umusonga, meningitis, n'izindi ndwara zitangwa na bakteriya ya Streptococcus pneumoniae.",
        "opv-title": "Kiruru ya Polio yo Kunywa (OPV)",
        "opv-desc": "Iririnda poliomyelitis, indwara yanduza cyane ishobora gutera igihumura cyihariye.",
        "measles-title": "Kiruru y'ibicurane",
        "measles-desc": "Iririnda indwara y'ibicurane, indwara yanduza cyane ishobora gutera ibibazo bihambaye, cyane cyane ku bana.",
        "covid19-title": "Kiruru ya COVID-19",
        "covid19-desc": "Iririnda COVID-19, igabanya ububabare bukabije, kwinjirwa mu bitaro, no gufa kuri iyi virusi.",
        "cholera-title": "Kiruru ya Kolera",
        "cholera-desc": "Iririnda kolera, indwara y'amazi ishobora gutera impatwe nyinshi no kuribwa.",
        "dosage-schedule": "Gahunda yo Kwinjiza:",
        "available-vaccines": "Kiruru zihari:",
        "first-dose-6weeks": "Dosi ya mbere: ibyumweru 6",
        "second-dose-10weeks": "Dosi ya kabiri: ibyumweru 10",
        "third-dose-14weeks": "Dosi ya gatatu: ibyumweru 14",
        "first-dose-9months": "Dosi ya mbere: amezi 9",
        "second-dose-15-18months": "Dosi ya kabiri: amezi 15-18",
        "two-doses-2weeks": "Dosi ebyiri, hagati y'ibyumweru bibiri",
        "protection-3years": "Umutekano urakomeza imyaka 3",
        
        // Registration Section
        "register-title": "Iyandikishe kwakirwa kiruru",
        "register-subtitle": "Iyandikishe mbere kugirango ugabanye igihe wakiriye",
        "form-title": "Ifishi yo kwiyandikisha kiruru",
        "full-name-label": "Amazina yuzuye *",
        "age-label": "Imaka *",
        "gender-label": "Itsinda ry'igitsina *",
        "select-gender": "Hitamo",
        "male": "Gabo",
        "female": "Gore",
        "other": "Ikindimwe",
        "camp-sector-label": "Umurenge/ahantu *",
        "vaccine-interest-label": "Kiruru ushaka",
        "select-vaccine": "Hitamo kiruru",
        "routine-vaccines": "Kiruru rusange zo ku bana",
        "covid-vaccine": "Kiruru ya COVID-19",
        "cholera-vaccine": "Kiruru ya Kolera",
        "all-vaccines": "Kiruru zose zihari",
        "need-advice": "Sinzi - nkeneye inama",
        "contact-info-label": "Amakuru yo kuvugana (Bihariye)",
        "phone-placeholder": "Numero ya telefoni cyangwa uburyo bwo kuvugana",
        "submit-btn": "Ohereza kwiyandikisha",
        "registration-success": "Kwiyandikisha byakunze!",
        "registration-thankyou": "Murakoze kwiyandikisha kwakirwa kiruru.",
        
        // Contact Information
        "location-title": "Aho turi",
        "location-address": "Umukambi w'impunzi wa Mahama, Akarere ka Kirehe, u Rwanda",
        "phone-title": "Numero ya telefoni",
        "email-title": "Imeyili",
        "hours-title": "Amasaha yo gukora",
        "emergency-hours": "Emergence 24/7",
        "regular-hours": "Ku wa mbere-kuwa gatandatu: saa 8 z'umugoroba-6 z'umugoroba",
        "emergency-notice-title": "Ukeneye ubufasha bwa gihutira?",
        "emergency-notice-text": "Jya aho ariho hose hakirurirwa mu masaha yo gukora - ntibikenewe gusaba isaha ya mbere kuri kiruru rusange.",
        
        // Footer
        "hospital-name": "Ibitaro bya MahamaCare",
        "hospital-tagline": "Dutanga serivisi z'ubuzima zihagije imyaka irenga 20.",
        "quick-links-title": "Amashami",
        "contact-info-title": "Amakuru",
        "follow-us-title": "Dukurikire",
        "copyright": "© 2025 Ibitaro bya MahamaCare. Amahoro abiriwe."
    }
};

let currentLanguage = localStorage.getItem('language') || 'en';

// Function to update language
function updateLanguage(lang) {
    currentLanguage = lang;
    localStorage.setItem('language', lang);
    
    // Update language select dropdowns
    document.querySelectorAll('.language-selector').forEach(select => {
        select.value = lang;
    });
    
    // Update page title
    const pageTitle = document.querySelector('title[data-i18n="vaccination-page-title"]');
    if (pageTitle && vaccinationTranslations[lang] && vaccinationTranslations[lang]['vaccination-page-title']) {
        pageTitle.textContent = vaccinationTranslations[lang]['vaccination-page-title'];
    }
    
    // Update all elements with data-i18n
    document.querySelectorAll('[data-i18n]').forEach(element => {
        const key = element.getAttribute('data-i18n');
        
        if (vaccinationTranslations[lang] && vaccinationTranslations[lang][key]) {
            if (element.tagName === 'INPUT' || element.tagName === 'TEXTAREA') {
                if (element.hasAttribute('data-placeholder')) {
                    element.placeholder = vaccinationTranslations[lang][key];
                } else if (element.hasAttribute('placeholder')) {
                    element.setAttribute('placeholder', vaccinationTranslations[lang][key]);
                }
            } else if (element.tagName === 'OPTION') {
                element.textContent = vaccinationTranslations[lang][key];
            } else {
                element.textContent = vaccinationTranslations[lang][key];
            }
        }
    });
    
    // Update html lang attribute
    document.documentElement.lang = lang;
}

// Utility function to show notifications
function showNotification(message, type = 'info') {
    // Remove existing notifications
    const existingNotifications = document.querySelectorAll('.notification');
    existingNotifications.forEach(notification => notification.remove());
    
    // Create new notification
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

// Form submission handler
document.addEventListener('DOMContentLoaded', function() {
    // Initialize language
    updateLanguage(currentLanguage);
    
    // Add event listeners to language selectors
    document.querySelectorAll('.language-selector').forEach(select => {
        select.value = currentLanguage;
        select.addEventListener('change', function() {
            updateLanguage(this.value);
        });
    });
    
    const vaccinationForm = document.getElementById('vaccination-form');
    const successMessage = document.getElementById('success-message');

    // Mobile menu functionality
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
                contact: document.getElementById('contact').value || 'Not provided',
                language: currentLanguage
            };

            try {
                // Show loading state
                const submitButton = vaccinationForm.querySelector('button[type="submit"]');
                const originalText = submitButton.textContent;
                submitButton.textContent = currentLanguage === 'rw' ? 'Ariko...' : 'Submitting...';
                submitButton.disabled = true;

                // Submit to Firebase
                const result = await vaccinationRegistration.submitRegistration(formData);
                
                if (result.success) {
                    // Show success message
                    successMessage.classList.remove('hidden');
                    
                    // Show notification
                    showNotification(
                        currentLanguage === 'rw' 
                            ? 'Kwiyandikisha byakunze!' 
                            : 'Registration submitted successfully!', 
                        'success'
                    );
                    
                    // Reset form
                    vaccinationForm.reset();
                    
                    // Scroll to success message
                    successMessage.scrollIntoView({ behavior: 'smooth' });
                    
                    // Hide success message after 10 seconds
                    setTimeout(() => {
                        successMessage.classList.add('hidden');
                    }, 10000);
                } else {
                    showNotification(
                        currentLanguage === 'rw'
                            ? 'Ikosa mu kwiyandikisha. Ongera ugerageze.'
                            : 'Error submitting registration. Please try again.',
                        'error'
                    );
                }
            } catch (error) {
                console.error('Form submission error:', error);
                showNotification(
                    currentLanguage === 'rw'
                        ? 'Ikosa mu kwiyandikisha. Ongera ugerageze.'
                        : 'Error submitting registration. Please try again.',
                    'error'
                );
            } finally {
                // Reset button state
                const submitButton = vaccinationForm.querySelector('button[type="submit"]');
                submitButton.textContent = vaccinationTranslations[currentLanguage]['submit-btn'] || 'Submit Registration';
                submitButton.disabled = false;
            }
        });
    }

    // Login/Signup buttons (placeholder functionality)
    const loginButtons = [
        document.getElementById('desktop-login-btn'),
        document.getElementById('mobile-login-btn')
    ];

    const signupButtons = [
        document.getElementById('desktop-signup-btn'),
        document.getElementById('mobile-signup-btn')
    ];

    loginButtons.forEach(btn => {
        if (btn) {
            btn.addEventListener('click', function() {
                showNotification(
                    currentLanguage === 'rw'
                        ? 'Ubushobozi bwo kwinjira buri hano.'
                        : 'Login functionality would be implemented here.',
                    'info'
                );
            });
        }
    });

    signupButtons.forEach(btn => {
        if (btn) {
            btn.addEventListener('click', function() {
                showNotification(
                    currentLanguage === 'rw'
                        ? 'Ubushobozi bwo kwiyandika buri hano.'
                        : 'Signup functionality would be implemented here.',
                    'info'
                );
            });
        }
    });
});

// Make the updateLanguage function available globally
window.updateLanguage = updateLanguage;