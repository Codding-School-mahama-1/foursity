document.getElementById('showSignup').addEventListener('click', () => {
    document.getElementById('loginFormDiv').classList.add('hidden');
    document.getElementById('signupFormDiv').classList.remove('hidden');
  });
  document.getElementById('showLogin').addEventListener('click', () => {
    document.getElementById('signupFormDiv').classList.add('hidden');
    document.getElementById('loginFormDiv').classList.remove('hidden');
  });

  // Signup
  document.getElementById('signupForm').addEventListener('submit', (e) => {
    e.preventDefault();
    const name = document.getElementById('signupName').value;
    const email = document.getElementById('signupEmail').value;
    const password = document.getElementById('signupPassword').value;

    let users = JSON.parse(localStorage.getItem('users') || '[]');
    if(users.find(u => u.email === email)) {
      alert('User already exists!');
      return;
    }

    users.push({name,email,password});
    localStorage.setItem('users', JSON.stringify(users));
    alert('Account created successfully! Please login.');
    document.getElementById('signupFormDiv').classList.add('hidden');
    document.getElementById('loginFormDiv').classList.remove('hidden');
  });

  // Login
  document.getElementById('loginForm').addEventListener('submit', (e) => {
    e.preventDefault();
    const email = document.getElementById('loginEmail').value;
    const password = document.getElementById('loginPassword').value;

    const users = JSON.parse(localStorage.getItem('users') || '[]');
    const user = users.find(u => u.email===email && u.password===password);
    if(user){
      localStorage.setItem('loggedInUser', JSON.stringify(user));
      document.getElementById('authModal').classList.add('hidden');
      document.getElementById('dashboardContent').classList.remove('hidden');
    } else {
      alert('Invalid email or password!');
    }
  });

  // Logout
  document.getElementById('logoutBtn').addEventListener('click', () => {
    localStorage.removeItem('loggedInUser');
    document.getElementById('dashboardContent').classList.add('hidden');
    document.getElementById('authModal').classList.remove('hidden');
  });

  // Check if already logged in
  if(localStorage.getItem('loggedInUser')){
    document.getElementById('authModal').classList.add('hidden');
    document.getElementById('dashboardContent').classList.remove('hidden');
  }

  // Charts
  new Chart(document.getElementById('patientsChart'), {
    type: 'bar',
    data: { labels: ['Jan','Feb','Mar','Apr','May','Jun'], datasets:[{ label:'Patients', data:[120,190,300,250,200,310], backgroundColor:'rgba(37, 99, 235, 0.6)', borderRadius:8 }] },
    options:{ responsive:true }
  });
  new Chart(document.getElementById('birthChart'), {
    type:'doughnut',
    data:{ labels:['Male','Female'], datasets:[{ data:[180,140], backgroundColor:['#3b82f6','#ec4899'] }] },
    options:{ responsive:true }
  });
  new Chart(document.getElementById('trendChart'), {
    type:'line',
    data:{ labels:['Jan','Feb','Mar','Apr','May','Jun','Jul'], datasets:[{ label:'Births', data:[30,45,60,40,55,70,65], borderColor:'#10b981', backgroundColor:'rgba(16,185,129,0.2)', tension:0.3, fill:true }] },
    options:{ responsive:true }
  });