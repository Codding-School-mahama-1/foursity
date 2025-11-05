document.addEventListener('DOMContentLoaded', function() {
    // DOM Elements
    const authModal = document.getElementById('authModal');
    const dashboardContent = document.getElementById('dashboardContent');
    const loginFormDiv = document.getElementById('loginFormDiv');
    const signupFormDiv = document.getElementById('signupFormDiv');
    const loginForm = document.getElementById('loginForm');
    const signupForm = document.getElementById('signupForm');
    const showSignup = document.getElementById('showSignup');
    const showLogin = document.getElementById('showLogin');
    const logoutBtn = document.getElementById('logoutBtn');

    // Check if user is already logged in (from localStorage)
    function checkAuthStatus() {
      const isLoggedIn = localStorage.getItem('isLoggedIn');
      if (isLoggedIn === 'true') {
        showDashboard();
      } else {
        showAuthModal();
      }
    }

    // Show authentication modal
    function showAuthModal() {
      authModal.classList.remove('hidden');
      dashboardContent.classList.add('hidden');
    }

    // Show dashboard
    function showDashboard() {
      authModal.classList.add('hidden');
      dashboardContent.classList.remove('hidden');
      initializeCharts();
    }

    // Switch to Signup form
    showSignup.addEventListener('click', function(e) {
      e.preventDefault();
      loginFormDiv.classList.add('hidden');
      signupFormDiv.classList.remove('hidden');
    });

    // Switch to Login form
    showLogin.addEventListener('click', function(e) {
      e.preventDefault();
      signupFormDiv.classList.add('hidden');
      loginFormDiv.classList.remove('hidden');
    });

    // Handle Login
    loginForm.addEventListener('submit', function(e) {
      e.preventDefault();
      
      const email = document.getElementById('loginEmail').value;
      const password = document.getElementById('loginPassword').value;

      // Simple validation
      if (!email || !password) {
        alert('Please fill in all fields');
        return;
      }

      // For demo purposes - in real app, you would validate against a backend
      // Check if user exists in localStorage
      const users = JSON.parse(localStorage.getItem('users') || '[]');
      const user = users.find(u => u.email === email && u.password === password);
      
      if (user) {
        // Successful login
        localStorage.setItem('isLoggedIn', 'true');
        localStorage.setItem('currentUser', JSON.stringify(user));
        showDashboard();
      } else {
        alert('Invalid email or password');
      }
    });

    // Handle Signup
    signupForm.addEventListener('submit', function(e) {
      e.preventDefault();
      
      const name = document.getElementById('signupName').value;
      const email = document.getElementById('signupEmail').value;
      const password = document.getElementById('signupPassword').value;

      // Simple validation
      if (!name || !email || !password) {
        alert('Please fill in all fields');
        return;
      }

      // Check if user already exists
      const users = JSON.parse(localStorage.getItem('users') || '[]');
      const existingUser = users.find(u => u.email === email);
      
      if (existingUser) {
        alert('User with this email already exists');
        return;
      }

      // Create new user
      const newUser = {
        id: Date.now(),
        name: name,
        email: email,
        password: password, // In real app, this should be hashed
        createdAt: new Date().toISOString()
      };

      users.push(newUser);
      localStorage.setItem('users', JSON.stringify(users));
      
      // Auto login after signup
      localStorage.setItem('isLoggedIn', 'true');
      localStorage.setItem('currentUser', JSON.stringify(newUser));
      
      showDashboard();
    });

    // Handle Logout
    logoutBtn.addEventListener('click', function(e) {
      e.preventDefault();
      localStorage.removeItem('isLoggedIn');
      localStorage.removeItem('currentUser');
      showAuthModal();
      
      // Reset forms
      loginForm.reset();
      signupForm.reset();
      loginFormDiv.classList.remove('hidden');
      signupFormDiv.classList.add('hidden');
    });

    // Chart initialization
    function initializeCharts() {
      // Patients by Month Chart
      const patientsCtx = document.getElementById('patientsChart')?.getContext('2d');
      if (patientsCtx) {
        new Chart(patientsCtx, {
          type: 'bar',
          data: {
            labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
            datasets: [{
              label: 'Patients',
              data: [65, 59, 80, 81, 56, 55],
              backgroundColor: 'rgba(54, 162, 235, 3)',
              borderColor: 'rgba(54, 162, 235, 3)',
              borderWidth: 1
            }]
          },
          options: {
            responsive: true,
            scales: {
              y: {
                beginAtZero: true
              }
            }
          }
        });
      }

      // Birth Gender Ratio Chart
      const birthCtx = document.getElementById('birthChart')?.getContext('2d');
      if (birthCtx) {
        new Chart(birthCtx, {
          type: 'pie',
          data: {
            labels: ['Male', 'Female'],
            datasets: [{
              data: [55, 45],
              backgroundColor: [
                'rgba(54, 162, 235, 5)',
                'rgba(255, 99, 132, 5)'
              ],
              borderColor: [
                'rgba(54, 162, 235, 1)',
                'rgba(255, 99, 132, 1)'
              ],
              borderWidth: 1
            }]
          },
          options: {
            responsive: true
          }
        });
      }

      // Monthly Birth Trends Chart
      const trendCtx = document.getElementById('trendChart')?.getContext('2d');
      if (trendCtx) {
        new Chart(trendCtx, {
          type: 'line',
          data: {
            labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
            datasets: [{
              label: 'Births',
              data: [12, 19, 15, 17, 14, 16, 18, 20, 22, 19, 21, 23],
              backgroundColor: 'rgba(75, 192, 102, 2)',
              borderColor: 'rgba(75, 102, 192, 2)',
              borderWidth: 2,
              tension: 0.4,
              fill: true
            }]
          },
          options: {
            responsive: true,
            scales: {
              y: {
                beginAtZero: true
              }
            }
          }
        });
      }
    }

    // Initialize the app
    checkAuthStatus();
  });