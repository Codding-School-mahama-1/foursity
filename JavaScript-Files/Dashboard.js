/****************************************************
 * 🔐 AUTHENTICATION SECTION
 ****************************************************/
import { initializeApp } from "https://www.gstatic.com/firebasejs/12.5.0/firebase-app.js";
import { getDatabase, ref, set, update, remove, get, child } 
  from "https://www.gstatic.com/firebasejs/12.5.0/firebase-database.js";

// ---------------------- Firebase Initialization ----------------------
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

/****************************************************
 * 🏥 DOM & AUTH LOGIC
 ****************************************************/
document.addEventListener('DOMContentLoaded', function() {
  const authModal = document.getElementById('authModal');
  const dashboardContent = document.getElementById('dashboardContent');
  const loginFormDiv = document.getElementById('loginFormDiv');
  const signupFormDiv = document.getElementById('signupFormDiv');
  const loginForm = document.getElementById('loginForm');
  const signupForm = document.getElementById('signupForm');
  const showSignup = document.getElementById('showSignup');
  const showLogin = document.getElementById('showLogin');
  const logoutBtn = document.getElementById('logoutBtn');

  function checkAuthStatus() {
    const isLoggedIn = localStorage.getItem('isLoggedIn');
    if (isLoggedIn === 'true') showDashboard();
    else showAuthModal();
  }

  function showAuthModal() {
    authModal?.classList.remove('hidden');
    dashboardContent?.classList.add('hidden');
  }

  function showDashboard() {
    authModal?.classList.add('hidden');
    dashboardContent?.classList.remove('hidden');
    initializeCharts();
  }

  showSignup?.addEventListener('click', e => {
    e.preventDefault();
    loginFormDiv?.classList.add('hidden');
    signupFormDiv?.classList.remove('hidden');
  });

  showLogin?.addEventListener('click', e => {
    e.preventDefault();
    signupFormDiv?.classList.add('hidden');
    loginFormDiv?.classList.remove('hidden');
  });

  loginForm?.addEventListener('submit', e => {
    e.preventDefault();
    const email = document.getElementById('loginEmail').value;
    const password = document.getElementById('loginPassword').value;
    if (!email || !password) return alert('Please fill in all fields');

    const users = JSON.parse(localStorage.getItem('users') || '[]');
    const user = users.find(u => u.email === email && u.password === password);

    if (user) {
      localStorage.setItem('isLoggedIn', 'true');
      localStorage.setItem('currentUser', JSON.stringify(user));
      showDashboard();
    } else alert('Invalid email or password');
  });

  signupForm?.addEventListener('submit', e => {
    e.preventDefault();
    const name = document.getElementById('signupName').value;
    const email = document.getElementById('signupEmail').value;
    const password = document.getElementById('signupPassword').value;
    if (!name || !email || !password) return alert('Please fill in all fields');

    const users = JSON.parse(localStorage.getItem('users') || '[]');
    if (users.find(u => u.email === email)) return alert('User already exists');

    const newUser = { id: Date.now(), name, email, password, createdAt: new Date().toISOString() };
    users.push(newUser);

    localStorage.setItem('users', JSON.stringify(users));
    localStorage.setItem('isLoggedIn', 'true');
    localStorage.setItem('currentUser', JSON.stringify(newUser));
    showDashboard();
  });

  logoutBtn?.addEventListener('click', () => {
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('currentUser');
    showAuthModal();
    loginForm?.reset();
    signupForm?.reset();
    loginFormDiv?.classList.remove('hidden');
    signupFormDiv?.classList.add('hidden');
  });

  checkAuthStatus();
});

/****************************************************
 * 📊 CHARTS
 ****************************************************/
function initializeCharts() {
  const patientsCtx = document.getElementById('patientsChart')?.getContext('2d');
  if (patientsCtx) {
    new Chart(patientsCtx, {
      type: 'bar',
      data: {
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
        datasets: [{
          label: 'Patients',
          data: [65, 59, 80, 81, 56, 55],
          backgroundColor: 'rgba(54, 162, 25, 0.5)',
          borderColor: 'rgba(54, 162, 235, 1)',
          borderWidth: 1
        }]
      },
      options: { responsive: true, scales: { y: { beginAtZero: true } } }
    });
  }

  const birthCtx = document.getElementById('birthChart')?.getContext('2d');
  if (birthCtx) {
    new Chart(birthCtx, {
      type: 'pie',
      data: {
        labels: ['Male', 'Female'],
        datasets: [{
          data: [55, 45],
          backgroundColor: ['rgba(54,162,11,0.6)', 'rgba(255,99,132,0.6)']
        }]
      },
      options: { responsive: true }
    });
  }

  const trendCtx = document.getElementById('trendChart')?.getContext('2d');
  if (trendCtx) {
    new Chart(trendCtx, {
      type: 'line',
      data: {
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'],
        datasets: [{
          label: 'Births',
          data: [12, 19, 15, 17, 14, 16, 18],
          backgroundColor: 'rgba(12,102,72,0.3)',
          borderColor: 'rgba(12,10,192,1)',
          tension: 0.4
        }]
      },
      options: { responsive: true, scales: { y: { beginAtZero: true } } }
    });
  }
}

/****************************************************
 * ✅ CLEAR INPUTS
 ****************************************************/
// ✅ Clear all fields in a form
function clearFields(container) {
  if (!container) return;
  container.querySelectorAll('input').forEach(input => input.value = '');
  container.querySelectorAll('textarea').forEach(textarea => textarea.value = '');
  container.querySelectorAll('select').forEach(select => select.selectedIndex = 0);
  container.querySelectorAll('.outputField').forEach(el => el.textContent = '');
}


/****************************************************
 * 👨‍⚕️ PATIENTS SERVICES
 ****************************************************/
document.addEventListener("DOMContentLoaded", () => {
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

  function enterData() {
    if (!EnterId.value.trim()) return alert("Please enter an ID");
    set(ref(db, "Person/" + EnterId.value), {
      Name: EnterName.value,
      Age: EnterAge.value,
      Gender: EnterGender.value,
      Disease: EnterDisease.value,
      Contact: EnterContact.value,
      Address: EnterAddress.value
    })
  .then(() => {
  alert("✅ Data added successfully");
  clearFields(form); 
})

    .catch(err => alert("❌ " + err.message));
  }

  function updateData() {
    if (!EnterId.value.trim()) return alert("Please enter an ID");
    update(ref(db, "Person/" + EnterId.value), {
      Name: EnterName.value,
      Age: EnterAge.value,
      Gender: EnterGender.value,
      Disease: EnterDisease.value,
      Contact: EnterContact.value,
      Address: EnterAddress.value
    })
  .then(() => {
  alert("✅ Data added successfully");
  clearFields(form);
})

    .catch(err => alert("❌ " + err.message));
  }

  function removeData() {
    if (!EnterId.value.trim()) return alert("Please enter an ID");
    remove(ref(db, "Person/" + EnterId.value))
    .then(() => {
  alert("✅ Data added successfully");
  clearFields(form); 
})

      .catch(err => alert("❌ " + err.message));
  }

  function findData() {
    if (!findId.value.trim()) return alert("Please enter an ID");
    get(child(ref(db), "Person/" + findId.value))
      .then(snapshot => {
        if (snapshot.exists()) {
          const data = snapshot.val();
          showName.textContent = `Name: ${data.Name}`;
          showAge.textContent = `Age: ${data.Age}`;
          showGender.textContent = `Gender: ${data.Gender}`;
          showDisease.textContent = `Disease: ${data.Disease}`;
          showContact.textContent = `Contact: ${data.Contact}`;
          showAddress.textContent = `Address: ${data.Address}`;
          form?.classList.add("hidden");
          searchResult?.classList.remove("hidden");
        } else alert("Patient not found");
      })
      .catch(err => alert("❌ " + err.message));
  }

  backBtn?.addEventListener("click", () => {
    searchResult?.classList.add("hidden");
    form?.classList.remove("hidden");
  });

  enterBtn?.addEventListener("click", enterData);
  updateBtn?.addEventListener("click", updateData);
  removeBtn?.addEventListener("click", removeData);
  findById?.addEventListener("click", findData);
});

/****************************************************
 * 👶 BIRTH SERVICES
 ****************************************************/
document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById('birthForm');
  const RearchResult = document.getElementById('searchResult');
  const FindById = document.getElementById('findById');
  const BackBtn = document.getElementById('backBtn');
  const FindId = document.getElementById('findId');

  const BabyName = document.getElementById('BabyName');
  const Dob = document.getElementById('Dob');
  const Gender = document.getElementById('Gender');
  const MotherName = document.getElementById('MotherName');
  const Notes = document.getElementById('Notes');
  const RegisterNo = document.getElementById('RegisterNo');

  const InsertBtn = document.getElementById('insertBtn');
  const UpdateBtn = document.getElementById('updateBtn');
  const RemoveBtn = document.getElementById('removeBtn');

  const ShowName = document.getElementById('showName');
  const ShowDOB = document.getElementById('showDOB');
  const ShowGender = document.getElementById('showGender');
  const ShowMother = document.getElementById('showMother');
  const ShowNotes = document.getElementById('showNotes');
  const ShowRegNo = document.getElementById('showRegNo');

  function InsertData() {
    const reg = RegisterNo.value.trim();
    if (!reg) return alert("Please enter Register No");
    set(ref(db, "Births/" + reg), {
      BabyName: BabyName.value,
      Dob: Dob.value,
      Gender: Gender.value,
      MotherName: MotherName.value,
      Notes: Notes.value,
      RegisterNo: reg
    })
   .then(() => {
  alert("✅ Data added successfully");
  clearFields(form); // clears all input, textarea, select, and output fields
})

    .catch(err => alert(err.message));
  }

  function UpdateData() {
    const reg = RegisterNo.value.trim();
    if (!reg) return alert("Please enter Register No to update");
    update(ref(db, "Births/" + reg), {
      BabyName: BabyName.value,
      Dob: Dob.value,
      Gender: Gender.value,
      MotherName: MotherName.value,
      Notes: Notes.value
    })
.then(() => {
  alert("✅ Data added successfully");
  clearFields(form); // clears all input, textarea, select, and output fields
})

    .catch(err => alert(err.message));
  }

  function RemoveData() {
    const reg = RegisterNo.value.trim();
    if (!reg) return alert("Please enter Register No");
    remove(ref(db, "Births/" + reg))
     .then(() => {
  alert("✅ Data added successfully");
  clearFields(form); 
})

      .catch(err => alert(err.message));
  }

  function FindData() {
    const id = FindId.value.trim();
    if (!id) return alert("Please enter Register No");

    get(ref(db, "Births/" + id))
      .then(snapshot => {
        if (snapshot.exists()) {
          const data = snapshot.val();
          ShowName.textContent = `Baby Name: ${data.BabyName}`;
          ShowDOB.textContent = `Date of Birth: ${data.Dob}`;
          ShowGender.textContent = `Gender: ${data.Gender}`;
          ShowMother.textContent = `Mother: ${data.MotherName}`;
          ShowNotes.textContent = `Notes: ${data.Notes}`;
          ShowRegNo.textContent = `Register No: ${data.RegisterNo}`;

          form.classList.add("hidden");
          RearchResult.classList.remove("hidden");
        } else {
          alert("Record not found");
        }
      })
      .catch(err => alert(err.message));
  }

  BackBtn.addEventListener("click", () => {
    RearchResult.classList.add("hidden");
    form.classList.remove("hidden");
  });

  InsertBtn.addEventListener("click", InsertData);
  UpdateBtn.addEventListener("click", UpdateData);
  RemoveBtn.addEventListener("click", RemoveData);
  FindById.addEventListener("click", FindData);
});
