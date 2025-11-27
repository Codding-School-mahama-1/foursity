import { initializeApp } from "https://www.gstatic.com/firebasejs/12.6.0/firebase-app.js";
  import {
    getDatabase,
    ref,
    push,
    set,
    serverTimestamp,
  } from "https://www.gstatic.com/firebasejs/12.6.0/firebase-database.js";

  const firebaseConfig = {
    apiKey: "AIzaSyDt4vs7S3nckO8xxfp1_axHZ76J0cz2qdg",
    authDomain: "mahamahospital.firebaseapp.com",
    databaseURL: "https://mahamahospital-default-rtdb.firebaseio.com",
    projectId: "mahamahospital",
    storageBucket: "mahamahospital.firebasestorage.app",
    messagingSenderId: "256305692002",
    appId: "1:256305692002:web:cfef26992264204be9803b"
  };



  // show notifications
    function showNotification(message, type = 'info') {
              const notification = document.createElement('div');
              notification.className = `fixed top-4 right-4 p-4 rounded-lg shadow-lg z-50 ${
                  type === 'success' ? 'bg-green-500 text-white' :
                  type === 'error' ? 'bg-red-500 text-white' :
                  'bg-blue-500 text-white'
              }`;
              notification.textContent = message;
              
              document.body.appendChild(notification);
              
              setTimeout(() => {
                  notification.remove();
              }, 5000);
          }
  // Init
  const app = initializeApp(firebaseConfig);
  const db = getDatabase(app);

  // Helper: write record
  async function saveRecord(path, data) {
    const newRef = push(ref(db, path));
    await set(newRef, data);
    return newRef.key;
  }

  // Appointment form
  const appointmentForm = document.getElementById('appointmentForm');
  if (appointmentForm) {
    appointmentForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      try {
        const f = appointmentForm.elements; // IMPORTANT: use form.elements to avoid duplicate id collisions
        const payload = {
          fullName: (f['name'] && f['name'].value) || '',
          email: (f['email'] && f['email'].value) || '',
          phone: (f['phone'] && f['phone'].value) || '',
          service: (f['service'] && f['service'].value) || '',
          preferredDate: (f['date'] && f['date'].value) || '',
          preferredTime: (f['time'] && f['time'].value) || '',
          accessibility: (f['accessibility'] && f['accessibility'].value) || '',
          message: (f['message'] && f['message'].value) || '',
          createdAt: Date.now()
        };

        await saveRecord('appointments', payload);

                showNotification('Appointment request sent. Thank you!');
        // alert('Appointment request sent. Thank you!');
        appointmentForm.reset();
      } catch (err) {
        console.error(err);
        alert('Failed to send appointment. Try again later.');
      }
    });
  }

  // Contact form
  const contactForm = document.getElementById('contact-form');
  if (contactForm) {
    contactForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      try {
        const f = contactForm.elements; // use form.elements here too
        const payload = {
          firstName: (f['first-name'] && f['first-name'].value) || '',
          lastName: (f['last-name'] && f['last-name'].value) || '',
          email: (f['email'] && f['email'].value) || '',
          phone: (f['phone'] && f['phone'].value) || '',
          subject: (f['subject'] && f['subject'].value) || '',
          message: (f['message'] && f['message'].value) || '',
          createdAt: Date.now()
        };

        await saveRecord('contacts', payload);
        alert('Message sent. We will contact you soon.');
        contactForm.reset();
      } catch (err) {
        console.error(err);
        alert('Failed to send message. Try again later.');
      }
    });
  }