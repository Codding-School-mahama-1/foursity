  
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


//  SERVICE CARDS DATA 
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

//  RENDER CARDS USING .map() 
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