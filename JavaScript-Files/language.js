// language.js - Simplified version for separate file

// Language Configuration (same as above)
const translations = {
    en: {
        // English translations (same as above)
        "home-nav": "Home",
        "about-nav": "About",
        // ... all other English translations
    },
    rw: {
        // Kinyarwanda translations (same as above)
        "home-nav": "Ahabanza",
        "about-nav": "Abyerekeye",
        // ... all other Kinyarwanda translations
    }
};

let currentLanguage = localStorage.getItem('language') || 'en';

function updateLanguage(lang) {
    currentLanguage = lang;
    localStorage.setItem('language', lang);
    
    // Update language select dropdowns
    document.querySelectorAll('select[data-i18n="language-select"]').forEach(select => {
        select.value = lang;
    });
    
    // Update page title
    const pageTitle = document.querySelector('title[data-i18n="page-title"]');
    if (pageTitle && translations[lang] && translations[lang]['page-title']) {
        pageTitle.textContent = translations[lang]['page-title'];
    }
    
    // Update all elements with data-i18n
    document.querySelectorAll('[data-i18n]').forEach(element => {
        const key = element.getAttribute('data-i18n');
        
        if (translations[lang] && translations[lang][key]) {
            if (element.tagName === 'INPUT' || element.tagName === 'TEXTAREA') {
                if (element.hasAttribute('data-placeholder')) {
                    element.placeholder = translations[lang][key];
                }
            } else if (element.tagName === 'IMG') {
                if (element.hasAttribute('data-alt')) {
                    element.alt = translations[lang][key];
                }
            } else if (element.tagName === 'OPTION') {
                element.textContent = translations[lang][key];
            } else {
                element.textContent = translations[lang][key];
            }
        }
    });
    
    // Update html lang attribute
    document.documentElement.lang = lang;
}

// Initialize on load
document.addEventListener('DOMContentLoaded', function() {
    updateLanguage(currentLanguage);
    
    // Add event listeners to language selectors
    document.querySelectorAll('select[data-i18n="language-select"]').forEach(select => {
        select.value = currentLanguage;
        select.addEventListener('change', function() {
            updateLanguage(this.value);
        });
    });
});