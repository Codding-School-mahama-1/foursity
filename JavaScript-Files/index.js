  
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
    // Scroll animation for service cards - IMPROVED VERSION
const cards = document.querySelectorAll('.service-card');

const revealCards = () => {
  const triggerBottom = window.innerHeight * 0.8; // Reduced from 0.85 to 0.8
  
  cards.forEach(card => {
    const cardTop = card.getBoundingClientRect().top;
    
    if (cardTop < triggerBottom) {
      card.style.opacity = '1';
      card.style.transform = 'translateY(0)';
      card.classList.add('show');
    }
  });
};

// Initialize cards as visible but ready for animation
cards.forEach(card => {
  card.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
});

window.addEventListener('scroll', revealCards);
window.addEventListener('load', revealCards);
// Also check on resize
window.addEventListener('resize', revealCards);

// Initial check
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
  
  alert('Message sent successfully!');
  
  // Reset form
  document.getElementById('contact-form').reset();
});