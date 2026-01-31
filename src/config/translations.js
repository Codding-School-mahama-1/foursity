export const translations = {
    en: {
        // Navigation
        "home-nav": "Home",
        "about-nav": "About",
        "services-nav": "Services",
        "maternity-nav": "Maternity & Birth Services",
        "emergency-nav": "Emergency Care",
        "vaccination-nav": "Vaccination Programs",
        "mentalhealth-nav": "Mental Health Support",
        "chronic-disease-nav": "Chronic Disease Care",
        "health-education-nav": "Health Awareness & Education",
        "disability-nav": "Disability Care",
        "doctors-nav": "Doctors",
        "contact-nav": "Contact",
        "faq-nav": "FAQ",
        "signup-btn": "Sign Up",
        "login-btn": "Log In",
        "logo-text": "🏥 MCH",
        
        // Hero Section
        "hero-title": "Welcome to MahamaCare Hospital",
        "hero-subtitle": "A practical digital platform for camp healthcare — book appointments, check medicine availability, and keep chronic records.",
        "learn-more-btn": "Learn more",
        "complain-btn": "Complain",
        "emergency-call": "🚨 Emergency Call: 112",
        
        // Services
        "services-title": "Our Services",
        "maternity-title": "Maternity & Birth Services",
        "vaccination-title": "Vaccination Programs",
        "mental-health-title": "Mental Health Support",
        "ncd-title": "Chronic Disease Care",
        "health-education-title": "Health Awareness & Education",
        "disability-title": "Disability Care",
        
        // General
        "learn-more": "Learn More",
        "book-appointment": "Book Appointment",
        "back-home": "Back to Home",
    },
    sw: {
        // Navigation - Swahili
        "home-nav": "Nyumba",
        "about-nav": "Kuhusu",
        "services-nav": "Huduma",
        "maternity-nav": "Huduma za Uhamiaji na Kuzaliwa",
        "emergency-nav": "Huduma ya Dharura",
        "vaccination-nav": "Programu za Chanjo",
        "mentalhealth-nav": "Msaada wa Afya ya Akili",
        "chronic-disease-nav": "Huduma ya Magonjwa ya Muda Mrefu",
        "health-education-nav": "Elimu ya Afya",
        "disability-nav": "Huduma ya Wasumbufu",
        "doctors-nav": "Madaktari",
        "logo-text": "🏥 MCH",
        
        // Services
        "services-title": "Huduma Zetu",
        "maternity-title": "Huduma za Uhamiaji na Kuzaliwa",
        "vaccination-title": "Programu za Chanjo",
        "mental-health-title": "Msaada wa Afya ya Akili",
        "ncd-title": "Huduma ya Magonjwa ya Muda Mrefu",
        "health-education-title": "Elimu ya Afya",
        "disability-title": "Huduma ya Wasumbufu",
    }
};

export const getTranslation = (language, key) => {
    return translations[language]?.[key] || translations['en']?.[key] || key;
};
