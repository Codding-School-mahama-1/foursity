/****************************************************
 * 🔐 AUTHENTICATION SECTION
 ****************************************************/
import { initializeApp } from "https://www.gstatic.com/firebasejs/12.6.0/firebase-app.js";
import { 
    getDatabase, 
    ref, 
    set, 
    update, 
    remove, 
    get, 
    child,
    onValue 
} from "https://www.gstatic.com/firebasejs/12.6.0/firebase-database.js";

// ---------------------- Firebase Initialization ----------------------
const firebaseConfig = {
    apiKey: "AIzaSyDt4vs7S3nckO8xxfp1_axHZ76J0cz2qdg",
    authDomain: "mahamahospital.firebaseapp.com",
    databaseURL: "https://mahamahospital-default-rtdb.firebaseio.com",
    projectId: "mahamahospital",
    storageBucket: "mahamahospital.firebasestorage.app",
    messagingSenderId: "256305692002",
    appId: "1:256305692002:web:cfef26992264204be9803b"
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
        if (isLoggedIn === 'true') {
            showDashboard();
            initializeRealTimeDashboard(); // Start real-time updates
        } else {
            showAuthModal();
        }
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
            initializeRealTimeDashboard(); // Start real-time updates
        } else {
            alert('Invalid email or password');
        }
    });

    signupForm?.addEventListener('submit', e => {
        e.preventDefault();
        const name = document.getElementById('signupName').value;
        const email = document.getElementById('signupEmail').value;
        const password = document.getElementById('signupPassword').value;
        if (!name || !email || !password) return alert('Please fill in all fields');

        const users = JSON.parse(localStorage.getItem('users') || '[]');
        if (users.find(u => u.email === email)) return alert('User already exists');

        const newUser = { 
            id: Date.now(), 
            name, 
            email, 
            password, 
            createdAt: new Date().toISOString() 
        };
        users.push(newUser);

        localStorage.setItem('users', JSON.stringify(users));
        localStorage.setItem('isLoggedIn', 'true');
        localStorage.setItem('currentUser', JSON.stringify(newUser));
        showDashboard();
        initializeRealTimeDashboard(); // Start real-time updates
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
 * 📊 REAL-TIME DASHBOARD UPDATES
 ****************************************************/
function initializeRealTimeDashboard() {
    // Listen for patients data changes
    const patientsRef = ref(db, 'patients');
    onValue(patientsRef, (snapshot) => {
        const patientsData = snapshot.val();
        updateDashboardStats(patientsData, 'patients');
        updateRecentPatients(patientsData);
        updateChartsWithRealData(patientsData, 'patients');
    });

    // Listen for births data changes
    const birthsRef = ref(db, 'births');
    onValue(birthsRef, (snapshot) => {
        const birthsData = snapshot.val();
        updateDashboardStats(birthsData, 'births');
        updateRecentBirths(birthsData);
        updateChartsWithRealData(birthsData, 'births');
    });
}

function updateDashboardStats(data, type) {
    if (!data) return;

    const dataArray = Object.values(data);
    
    if (type === 'patients') {
        const totalPatients = dataArray.length;
        const malePatients = dataArray.filter(p => p.Gender === 'Male').length;
        const femalePatients = dataArray.filter(p => p.Gender === 'Female').length;
        
        document.getElementById('totalPatients').textContent = totalPatients;
        document.getElementById('malePatients').textContent = malePatients;
        document.getElementById('femalePatients').textContent = femalePatients;
        
        // Update percentages
        const malePercent = totalPatients > 0 ? Math.round((malePatients / totalPatients) * 100) : 0;
        const femalePercent = totalPatients > 0 ? Math.round((femalePatients / totalPatients) * 100) : 0;
        document.getElementById('malePercent').textContent = `${malePercent}%`;
        document.getElementById('femalePercent').textContent = `${femalePercent}%`;
        
    } else if (type === 'births') {
        const totalBirths = dataArray.length;
        document.getElementById('totalBirths').textContent = totalBirths;
    }
}

function updateRecentPatients(patientsData) {
    const container = document.getElementById('recentPatients');
    if (!container) return;
    
    if (!patientsData) {
        container.innerHTML = `
            <div class="text-center text-gray-500 py-8">
                <i class="fas fa-users text-4xl mb-2 opacity-50"></i>
                <p>No patients registered yet</p>
            </div>
        `;
        return;
    }

    const recentPatients = Object.values(patientsData)
        .sort((a, b) => new Date(b.createdAt || 0) - new Date(a.createdAt || 0))
        .slice(0, 5);

    document.getElementById('recentPatientsCount').textContent = recentPatients.length;

    if (recentPatients.length === 0) {
        container.innerHTML = `
            <div class="text-center text-gray-500 py-8">
                <i class="fas fa-users text-4xl mb-2 opacity-50"></i>
                <p>No patients registered yet</p>
            </div>
        `;
        return;
    }

    container.innerHTML = recentPatients.map(patient => `
        <div class="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-blue-50 transition duration-200">
            <div class="flex items-center">
                <div class="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center mr-3">
                    <i class="fas fa-user text-blue-600"></i>
                </div>
                <div>
                    <p class="font-semibold text-gray-800">${patient.Name || 'N/A'}</p>
                    <p class="text-sm text-gray-600">${patient.Age || 'N/A'} years • ${patient.Gender || 'N/A'}</p>
                </div>
            </div>
            <span class="text-xs text-gray-500">${formatDate(patient.createdAt)}</span>
        </div>
    `).join('');
}

function updateRecentBirths(birthsData) {
    const container = document.getElementById('recentBirths');
    if (!container) return;
    
    if (!birthsData) {
        container.innerHTML = `
            <div class="text-center text-gray-500 py-8">
                <i class="fas fa-baby text-4xl mb-2 opacity-50"></i>
                <p>No births registered yet</p>
            </div>
        `;
        return;
    }

    const recentBirths = Object.values(birthsData)
        .sort((a, b) => new Date(b.createdAt || 0) - new Date(a.createdAt || 0))
        .slice(0, 5);

    document.getElementById('recentBirthsCount').textContent = recentBirths.length;

    if (recentBirths.length === 0) {
        container.innerHTML = `
            <div class="text-center text-gray-500 py-8">
                <i class="fas fa-baby text-4xl mb-2 opacity-50"></i>
                <p>No births registered yet</p>
            </div>
        `;
        return;
    }

    container.innerHTML = recentBirths.map(birth => `
        <div class="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-green-50 transition duration-200">
            <div class="flex items-center">
                <div class="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center mr-3">
                    <i class="fas fa-baby text-green-600"></i>
                </div>
                <div>
                    <p class="font-semibold text-gray-800">${birth.BabyName || 'N/A'}</p>
                    <p class="text-sm text-gray-600">${birth.Gender || 'N/A'} • Mother: ${birth.MotherName || 'N/A'}</p>
                </div>
            </div>
            <span class="text-xs text-gray-500">${formatDate(birth.createdAt)}</span>
        </div>
    `).join('');
}

function formatDate(dateString) {
    if (!dateString) return 'N/A';
    try {
        const date = new Date(dateString);
        return date.toLocaleDateString();
    } catch {
        return 'N/A';
    }
}

/****************************************************
 * 📊 CHARTS
 ****************************************************/
function initializeCharts() {
    // Charts will be updated with real data via real-time listeners
}

function updateChartsWithRealData(data, type) {
    // This will be called when real data arrives
    if (type === 'patients') {
        updatePatientsChart(data);
    } else if (type === 'births') {
        updateBirthsChart(data);
    }
}

function updatePatientsChart(patientsData) {
    const ctx = document.getElementById('genderChart')?.getContext('2d');
    if (!ctx || !patientsData) return;

    const patientsArray = Object.values(patientsData);
    const maleCount = patientsArray.filter(p => p.Gender === 'Male').length;
    const femaleCount = patientsArray.filter(p => p.Gender === 'Female').length;
    const otherCount = patientsArray.filter(p => p.Gender === 'Other').length;

    new Chart(ctx, {
        type: 'doughnut',
        data: {
            labels: ['Male', 'Female', 'Other'],
            datasets: [{
                data: [maleCount, femaleCount, otherCount],
                backgroundColor: ['#4f46e5', '#ec4899', '#6b7280'],
                borderWidth: 2,
                borderColor: '#ffffff'
            }]
        },
        options: {
            responsive: true,
            plugins: {
                legend: { position: 'bottom' }
            }
        }
    });
}

function updateBirthsChart(birthsData) {
    const ctx = document.getElementById('birthChart')?.getContext('2d');
    if (!ctx || !birthsData) return;

    const birthsArray = Object.values(birthsData);
    const maleBirths = birthsArray.filter(b => b.Gender === 'Male').length;
    const femaleBirths = birthsArray.filter(b => b.Gender === 'Female').length;

    new Chart(ctx, {
        type: 'pie',
        data: {
            labels: ['Male', 'Female'],
            datasets: [{
                data: [maleBirths, femaleBirths],
                backgroundColor: ['#60a5fa', '#f472b6'],
                borderWidth: 2,
                borderColor: '#ffffff'
            }]
        },
        options: {
            responsive: true,
            plugins: {
                legend: { position: 'bottom' }
            }
        }
    });
}

/****************************************************
 * ✅ CLEAR INPUTS
 ****************************************************/
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
        
        const patientData = {
            Name: EnterName.value,
            Age: EnterAge.value,
            Gender: EnterGender.value,
            Disease: EnterDisease.value,
            Contact: EnterContact.value,
            Address: EnterAddress.value,
            createdAt: new Date().toISOString() // Add timestamp for dashboard
        };

        set(ref(db, "patients/" + EnterId.value), patientData)
            .then(() => {
                alert("✅ Patient data added successfully");
                clearFields(form);
            })
            .catch(err => alert("❌ " + err.message));
    }

    function updateData() {
        if (!EnterId.value.trim()) return alert("Please enter an ID");
        
        const patientData = {
            Name: EnterName.value,
            Age: EnterAge.value,
            Gender: EnterGender.value,
            Disease: EnterDisease.value,
            Contact: EnterContact.value,
            Address: EnterAddress.value,
            updatedAt: new Date().toISOString()
        };

        update(ref(db, "patients/" + EnterId.value), patientData)
            .then(() => {
                alert("✅ Patient data updated successfully");
                clearFields(form);
            })
            .catch(err => alert("❌ " + err.message));
    }

    function removeData() {
        if (!EnterId.value.trim()) return alert("Please enter an ID");
        
        remove(ref(db, "patients/" + EnterId.value))
            .then(() => {
                alert("✅ Patient data removed successfully");
                clearFields(form);
            })
            .catch(err => alert("❌ " + err.message));
    }

    function findData() {
        if (!findId.value.trim()) return alert("Please enter an ID");
        
        get(child(ref(db), "patients/" + findId.value))
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
                } else {
                    alert("Patient not found");
                }
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
        
        const birthData = {
            BabyName: BabyName.value,
            Dob: Dob.value,
            Gender: Gender.value,
            MotherName: MotherName.value,
            Notes: Notes.value,
            RegisterNo: reg,
            createdAt: new Date().toISOString() // Add timestamp for dashboard
        };

        set(ref(db, "births/" + reg), birthData)
            .then(() => {
                alert("✅ Birth record added successfully");
                clearFields(form);
            })
            .catch(err => alert("❌ " + err.message));
    }

    function UpdateData() {
        const reg = RegisterNo.value.trim();
        if (!reg) return alert("Please enter Register No to update");
        
        const birthData = {
            BabyName: BabyName.value,
            Dob: Dob.value,
            Gender: Gender.value,
            MotherName: MotherName.value,
            Notes: Notes.value,
            updatedAt: new Date().toISOString()
        };

        update(ref(db, "births/" + reg), birthData)
            .then(() => {
                alert("✅ Birth record updated successfully");
                clearFields(form);
            })
            .catch(err => alert("❌ " + err.message));
    }

    function RemoveData() {
        const reg = RegisterNo.value.trim();
        if (!reg) return alert("Please enter Register No");
        
        remove(ref(db, "births/" + reg))
            .then(() => {
                alert("✅ Birth record removed successfully");
                clearFields(form);
            })
            .catch(err => alert("❌ " + err.message));
    }

    function FindData() {
        const id = FindId.value.trim();
        if (!id) return alert("Please enter Register No");

        get(ref(db, "births/" + id))
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
                    alert("Birth record not found");
                }
            })
            .catch(err => alert("❌ " + err.message));
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