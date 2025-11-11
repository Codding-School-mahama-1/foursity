import { initializeApp } from "https://www.gstatic.com/firebasejs/12.5.0/firebase-app.js";
    import { getDatabase, ref, set, update, remove, get, child }
      from "https://www.gstatic.com/firebasejs/12.5.0/firebase-database.js";

    const firebaseConfig = {
      apiKey: "AIzaSyCZ774I4-U7CnvJ0R43zJifEfE5sGM48lY",
      authDomain: "halawani-7126f.firebaseapp.com",
      databaseURL: "https://halawani-7126f-default-rtdb.firebaseio.com",
      projectId: "halawani-7126f",
      storageBucket: "halawani-7126f.appspot.com",
      messagingSenderId: "1065152267257",
      appId: "1:1065152267257:web:636940f4c120e4ae927328"
    };

    const app = initializeApp(firebaseConfig);
    const db = getDatabase(app);

    // Elements
    const form = document.getElementById('birthForm');
    const searchResult = document.getElementById('searchResult');
    const findById = document.getElementById('findById');
    const backBtn = document.getElementById('backBtn');
    const findId = document.getElementById('findId');

    const babyName = document.getElementById('babyName');
    const dob = document.getElementById('dob');
    const gender = document.getElementById('gender');
    const motherName = document.getElementById('motherName');
    const notes = document.getElementById('notes');
    const registerNo = document.getElementById('registerNo');

    const insertBtn = document.getElementById('insertBtn');
    const updateBtn = document.getElementById('updateBtn');
    const removeBtn = document.getElementById('removeBtn');

    const showName = document.getElementById('showName');
    const showDOB = document.getElementById('showDOB');
    const showGender = document.getElementById('showGender');
    const showMother = document.getElementById('showMother');
    const showNotes = document.getElementById('showNotes');
    const showRegNo = document.getElementById('showRegNo');

    // INSERT
    function insertData() {
      if (!registerNo.value.trim()) {
        alert("Please enter Register No");
        return;
      }
      set(ref(db, "Births/" + registerNo.value), {
        babyName: babyName.value,
        dob: dob.value,
        gender: gender.value,
        motherName: motherName.value,
        notes: notes.value,
        registerNo: registerNo.value
      })
        .then(() => alert("✅ Birth record added successfully"))
        .catch(err => alert("❌ Error: " + err.message));
    }

    // UPDATE
    function updateData() {
      if (!registerNo.value.trim()) {
        alert("Please enter Register No to update");
        return;
      }
      update(ref(db, "Births/" + registerNo.value), {
        babyName: babyName.value,
        dob: dob.value,
        gender: gender.value,
        motherName: motherName.value,
        notes: notes.value
      })
        .then(() => alert("✅ Record updated successfully"))
        .catch(err => alert("❌ Error: " + err.message));
    }

    // REMOVE
    function removeData() {
      if (!registerNo.value.trim()) {
        alert("Please enter Register No to remove");
        return;
      }
      remove(ref(db, "Births/" + registerNo.value))
        .then(() => alert("🗑️ Record removed successfully"))
        .catch(err => alert("❌ Error: " + err.message));
    }

    // FIND
    function findData() {
      if (!findId.value.trim()) {
        alert("Please enter Register No to search");
        return;
      }
      const dbRef = ref(db);
      get(child(dbRef, "Births/" + findId.value))
        .then(snapshot => {
          if (snapshot.exists()) {
            const data = snapshot.val();
            showName.textContent = "Baby Name: " + data.babyName;
            showDOB.textContent = "Date of Birth: " + data.dob;
            showGender.textContent = "Gender: " + data.gender;
            showMother.textContent = "Mother Name: " + data.motherName;
            showNotes.textContent = "Notes: " + data.notes;
            showRegNo.textContent = "Register No: " + data.registerNo;

            form.classList.add("hidden");
            searchResult.classList.remove("hidden");
          } else {
            alert("❌ Record not found");
          }
        })
        .catch(err => alert("❌ Error: " + err.message));
    }

    // BACK button
    backBtn.addEventListener("click", () => {
      searchResult.classList.add("hidden");
      form.classList.remove("hidden");
    });

    // Event listeners
    insertBtn.addEventListener("click", insertData);
    updateBtn.addEventListener("click", updateData);
    removeBtn.addEventListener("click", removeData);
    findById.addEventListener("click", findData);