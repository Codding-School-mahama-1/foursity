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



  //paitent js file
   
    import { initializeApp } from "https://www.gstatic.com/firebasejs/12.5.0/firebase-app.js";
    import { getDatabase, ref, set, update, remove, get, child }
      from "https://www.gstatic.com/firebasejs/12.5.0/firebase-database.js";

    const firebaseConfig = {
      apiKey: "AIzaSyCZ774I4-U7CnvJ0R43zJifEfE5sGM48lY",
      authDomain: "halawani-7126f.firebaseapp.com",
      databaseURL: "https://halawani-7126f-default-rtdb.firebaseio.com",
      projectId: "halawani-7126f",
      storageBucket: "halawani-7126f.firebasestorage.app",
      messagingSenderId: "1065152267257",
      appId: "1:1065152267257:web:636940f4c120e4ae927328"
    };

    const app = initializeApp(firebaseConfig);
    const db = getDatabase(app);

    // Elements
    const form = document.getElementById('patientForm');
    const searchResult = document.getElementById('searchResult');
    const findById = document.getElementById('findById');
    const backBtn = document.getElementById('backBtn');
    const findId = document.getElementById('findId');

    const EnterName = document.getElementById('EnterName');
    const EnterAge = document.getElementById('EnterAge');
    const EnterGender = document.getElementById('EnterGender');
    const EnterDisease = document.getElementById('EnterDisease');
    const EnterContact = document.getElementById('EnterContact');
    const EnterAddress = document.getElementById('EnterAddress');
    const EnterId = document.getElementById('EnterId');

    const enterBtn = document.getElementById('enterBtn');
    const updateBtn = document.getElementById('updateBtn');
    const removeBtn = document.getElementById('removeBtn');

    const showName = document.getElementById('showName');
    const showAge = document.getElementById('showAge');
    const showGender = document.getElementById('showGender');
    const showDisease = document.getElementById('showDisease');
    const showContact = document.getElementById('showContact');
    const showAddress = document.getElementById('showAddress');

    // INSERT
    function enterData() {
      if (!EnterId.value.trim()) {
        alert("Please enter an ID");
        return;
      }
      set(ref(db, "Person/" + EnterId.value), {
        Name: EnterName.value,
        Age: EnterAge.value,
        Gender: EnterGender.value,
        Disease: EnterDisease.value,
        Contact: EnterContact.value,
        Address: EnterAddress.value
      }).then(() => alert("Data added successfully"))
        .catch(err => alert("Error: " + err.message));
    }

    // UPDATE
    function updateData() {
      if (!EnterId.value.trim()) {
        alert("Please enter an ID to update");
        return;
      }
      update(ref(db, "Person/" + EnterId.value), {
        Name: EnterName.value,
        Age: EnterAge.value,
        Gender: EnterGender.value,
        Disease: EnterDisease.value,
        Contact: EnterContact.value,
        Address: EnterAddress.value
      }).then(() => alert("Data updated successfully"))
        .catch(err => alert("Error: " + err.message));
    }

    // REMOVE
    function removeData() {
      if (!EnterId.value.trim()) {
        alert("Please enter an ID to remove");
        return;
      }
      remove(ref(db, "Person/" + EnterId.value))
        .then(() => alert("Data removed successfully"))
        .catch(err => alert("Error: " + err.message));
    }

    // FIND
    function findData() {
      if (!findId.value.trim()) {
        alert("Please enter an ID to search");
        return;
      }

      const dbRef = ref(db);
      get(child(dbRef, "Person/" + findId.value))
        .then(snapshot => {
          if (snapshot.exists()) {
            const data = snapshot.val();
            showName.textContent = `Name: ${data.Name}`;
            showAge.textContent = `Age: ${data.Age}`;
            showGender.textContent = `Gender: ${data.Gender}`;
            showDisease.textContent = `Disease: ${data.Disease}`;
            showContact.textContent = `Contact: ${data.Contact}`;
            showAddress.textContent = `Address: ${data.Address}`;

            form.classList.add("hidden");
            searchResult.classList.remove("hidden");
          } else {
            alert("Patient not found");
          }
        })
        .catch(err => alert("Error: " + err.message));
    }

    // BACK
    backBtn.addEventListener("click", () => {
      searchResult.classList.add("hidden");
      form.classList.remove("hidden");
    });

    // Event listeners
    enterBtn.addEventListener("click", enterData);
    updateBtn.addEventListener("click", updateData);
    removeBtn.addEventListener("click", removeData);
    findById.addEventListener("click", findData);
  



    //Brith registaration
    