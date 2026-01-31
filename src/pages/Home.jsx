import React, { useState, useEffect } from 'react';

// Translations object (same as in index.js)
const translations = {
    en: {
        // Navigation
        "home-nav": "Home",
        "about-nav": "About",
        "services-nav": "Services",
        "Maternity-nav": "Maternity & Birth Services",
        "emergency-nav": "Emergency Care",
        "vaccination-nav": "Vaccination Programs",
        "mentalhealth-nav": "Mental Health Support",
        "chronic-disease-nav": "Chronic Disease Care",
        "health-edu-nav": "Health Awareness & Education",
        "disability-nav": "Disability Care",
        "doctors-nav": "Doctors",
        "contact-nav": "Contact",
        "faq-nav": "FAQ",
        "signup-btn": "Sign Up",
        "login-btn": "Log In",
        "logo-text": "🏥 MCH",
        
        // Hero Section
        "hero-title": "Welcome to MahamaCare Hospital",
        "hero-subtitle": "A practical digital platform for camp healthcare — book appointments, and keep chronic records.",
        "learn-more-btn": "Learn more",
        "complain-btn": "Complain",
        "emergency-call": "🚨 Emergency Call: 112",
        "video-not-supported": "Your browser does not support the video tag.",
        "video-fallback-text": "Quality Healthcare for Everyone",
        
        // About Section
        "about-title": "About MahamaCare Hospital",
        "about-paragraph-1": "<strong>MahamaCare Hospital</strong> is a comprehensive medical center offering healthcare services to global standards. We aim to provide exceptional care in a safe and compassionate environment, with a qualified medical team and modern equipment. Our goal is to improve patients' lives through specialized care and accurate treatment.",
        "about-paragraph-2": "We believe that health is the most valuable asset, which is why we combine advanced medical technology and human expertise to deliver the best possible healthcare experience.",
        "hospital-hall-alt": "hospital hall",
        "medical-staff-alt": "medical staff",
        "modern-clinic-alt": "modern clinic",
        "patient-care-alt": "patient care",
        
        // Services Section
        "services-title": "Our Services",
        
        // Contact Section
        "contact-title": "Get In Touch",
        "contact-subtitle": "We're here to help and answer any questions you might have. We look forward to hearing from you.",
        "contact-form-title": "Send us a Message",
        "email-label": "Email Address",
        "phone-label": "Phone Number",
        "subject-label": "Subject",
        "message-label": "Message",
        "send-message-btn": "Send Message",
        "select-subject": "Select a subject",
        "appointment-option": "Book an Appointment",
        "general-inquiry-option": "General Inquiry",
        "feedback-option": "Feedback",
        "emergency-option": "Emergency",
        "other-option": "Other",
        "location-title": "Our Location",
        "location-address": "Mahama Refugee Camp, Kirehe District, Rwanda",
        "phone-title": "Phone Number",
        "email-title": "Email Address",
        "hours-title": "Working Hours",
        "emergency-hours": "24/7 Emergency Services",
        "regular-hours": "Mon-Fri: 8am-6pm",
        "emergency-notice-title": "Emergency Contact",
        "emergency-notice-text": "For urgent medical assistance, please call our emergency line immediately.",
        "emergency-call-btn": "Call Emergency: 112",
        
        // Footer
        "footer-hospital-name": "MahamaCare Hospital",
        "footer-tagline": "Providing high quality healthcare for over 20 years.",
        "quick-links-title": "Quick Links",
        "contact-info-title": "Contact Info",
        "follow-us-title": "Follow Us",
        "copyright": "© 2025 MahamaCare Hospital. All rights reserved.",
        
        // Complaint Modal
        "complaint-title": "Customer Complaints",
        "complaint-subtitle": "We value your feedback to improve our services",
        "new-complaint-tab": "New Complaint",
        "check-status-tab": "Check Status",
        "complaint-category-label": "Complaint Category *",
        "select-category": "Select a category",
        "poor-service": "Poor Service",
        "staff-behavior": "Staff Behavior",
        "facility-issues": "Facility Issues",
        "billing-issue": "Billing Issue",
        "waiting-time": "Long Waiting Time",
        "treatment-quality": "Treatment Quality",
        "other-category": "Other",
        "complaint-subject-label": "Subject *",
        "complaint-subject-placeholder": "Brief description of your complaint",
        "complaint-details-label": "Complaint Details *",
        "complaint-details-placeholder": "Please provide detailed information about your complaint...",
        "urgent-checkbox": "Mark as urgent",
        "reset-form-btn": "Reset Form",
        "submit-complaint-btn": "Submit Complaint",
        "check-status-title": "Check Your Complaint Status",
        "check-status-subtitle": "Enter your complaint reference number",
        "reference-number-label": "Reference Number",
        "reference-placeholder": "e.g. COMP-2023-001",
        "check-status-btn": "Check Status",
        "common-statuses-title": "Common Complaint Statuses",
        "status-received": "Received",
        "status-received-desc": "We've received your complaint and will review it shortly.",
        "status-in-progress": "In Progress",
        "status-in-progress-desc": "Your complaint is being investigated by our team.",
        "status-resolved": "Resolved",
        "status-resolved-desc": "Your complaint has been resolved successfully.",
        "status-escalated": "Escalated",
        "status-escalated-desc": "Your complaint has been escalated to a specialist.",
        "complaint-success-title": "Complaint submitted successfully!",
        "complaint-success-ref": "Your complaint reference number is: ",
        "complaint-success-save": "Please save this reference number to check your complaint status.",
        "complaint-success-time": "We'll get back to you within 24-48 hours.",
        
        // Signup/Login Modals
        "signup-title": "Create Account",
        "first-name-label": "First Name",
        "last-name-label": "Last Name",
        "password-label": "Password",
        "confirm-password-label": "Confirm Password",
        "terms-agreement": "I agree to the ",
        "terms-link": "Terms & Conditions",
        "create-account-btn": "Create Account",
        "already-have-account": "Already have an account?",
        "login-link": "Log In",
        "login-title": "Welcome Back",
        "remember-me": "Remember me",
        "forgot-password": "Forgot password?",
        "signin-btn": "Sign In",
        "no-account": "Don't have an account?",
        "signup-link": "Sign Up",
        "or-continue": "Or continue with",
        "google-login": "Google",
        "facebook-login": "Facebook",
        
        // FAQ Modal
        "faq-title": "Frequently Asked Questions",
        "faq-tab-general": "General",
        "faq-tab-emergency": "Emergency",
        "faq-tab-mental": "Mental Health",
        "faq-tab-chronic": "Chronic Diseases",
        "faq-tab-disability": "Disability",
        "faq-tab-doctors": "Doctors",
        "faq-tab-vaccination": "Vaccination",
        "faq-general-1": "What are your working hours?",
        "faq-general-1-answer": "We are open 24/7 for emergencies and 8 AM - 8 PM for regular appointments.",
        "faq-general-2": "How can I book an appointment?",
        "faq-general-2-answer": "You can book via our website, by phone, or at the hospital reception.",
        "faq-general-3": "Do you accept insurance?",
        "faq-general-3-answer": "Yes, we accept most local and international insurance providers.",
        "faq-general-4": "Where is the hospital located?",
        "faq-general-4-answer": "Mahama Refugee Camp, Kirehe District, Rwanda. See map on the contact page for directions.",
        "faq-general-5": "Is parking available?",
        "faq-general-5-answer": "Yes, free parking is available for patients and visitors.",
        "faq-general-6": "What should I bring for my first visit?",
        "faq-general-6-answer": "Bring ID, insurance info, and any previous medical records.",
        "faq-general-7": "Do you offer home visits or telemedicine services?",
        "faq-general-7-answer": "Yes, we offer both home visits and telemedicine consultations where applicable.",
        "faq-emergency-1": "Is the emergency department open 24/7?",
        "faq-emergency-1-answer": "Yes, emergency services are available 24/7.",
        "faq-emergency-2": "What should I do in case of a medical emergency?",
        "faq-emergency-2-answer": "Call our emergency number or go directly to the emergency department.",
        "faq-emergency-3": "Do I need to book an appointment for the emergency department?",
        "faq-emergency-3-answer": "No, walk-ins are accepted at all times for emergencies.",
        "faq-emergency-4": "Are ambulances available for patient transport?",
        "faq-emergency-4-answer": "Yes, ambulances are available for urgent patient transport.",
        "faq-emergency-5": "How long is the average waiting time in the emergency room?",
        "faq-emergency-5-answer": "Average waiting time is 15-30 minutes depending on severity.",
        "faq-mental-1": "Do you provide counseling or therapy sessions?",
        "faq-mental-1-answer": "Yes, we offer individual and group counseling sessions.",
        "faq-mental-2": "Are mental health services confidential?",
        "faq-mental-2-answer": "Absolutely, all mental health consultations are strictly confidential.",
        "faq-mental-3": "Can I get support for stress, anxiety, or depression?",
        "faq-mental-3-answer": "Yes, our mental health professionals provide support for stress, anxiety, depression, and other conditions.",
        "faq-mental-4": "Do you offer mental health support for refugees and families?",
        "faq-mental-4-answer": "Yes, we provide dedicated mental health support for refugees and their families.",
        "faq-mental-5": "How can I refer someone who needs mental health care?",
        "faq-mental-5-answer": "You can refer someone by contacting our mental health department directly.",
        "faq-chronic-1": "What types of chronic diseases do you manage?",
        "faq-chronic-1-answer": "We manage diabetes, hypertension, asthma, cardiovascular diseases, and more.",
        "faq-chronic-2": "How often should chronic patients come for check-ups?",
        "faq-chronic-2-answer": "Check-ups are usually every 1-3 months, depending on the condition.",
        "faq-chronic-3": "Do you offer medication follow-up or refill services?",
        "faq-chronic-3-answer": "Yes, we provide regular medication follow-ups and refill services.",
        "faq-chronic-4": "Is there a support group for chronic patients?",
        "faq-chronic-4-answer": "Yes, we organize support groups for patients with chronic diseases.",
        "faq-chronic-5": "Can I access my medical history online?",
        "faq-chronic-5-answer": "Yes, patients can access their records through our secure online portal.",
        "faq-disability-1": "Do you provide physical therapy or rehabilitation?",
        "faq-disability-1-answer": "Yes, we have a full rehabilitation and physiotherapy department.",
        "faq-disability-2": "What services are available for people with disabilities?",
        "faq-disability-2-answer": "We provide rehabilitation, assistive devices, counseling, and specialized care.",
        "faq-disability-3": "Do you offer assistive devices (wheelchairs, crutches, etc.)?",
        "faq-disability-3-answer": "Yes, we provide necessary assistive devices for patients.",
        "faq-disability-4": "Is there a special unit for children with disabilities?",
        "faq-disability-4-answer": "Yes, we have a dedicated pediatric disability unit.",
        "faq-disability-5": "Are your facilities accessible for wheelchair users?",
        "faq-disability-5-answer": "Yes, all our facilities are fully accessible.",
        "faq-doctors-1": "How qualified are your doctors?",
        "faq-doctors-1-answer": "All our doctors are fully certified and experienced in their respective fields.",
        "faq-doctors-2": "Can I choose a specific doctor for my appointment?",
        "faq-doctors-2-answer": "Yes, patients can request a preferred doctor when booking appointments.",
        "faq-doctors-3": "Do your doctors speak multiple languages?",
        "faq-doctors-3-answer": "Yes, our staff can communicate in English, Arabic, Kinyarwanda, and other languages.",
        "faq-doctors-4": "How can I check a doctor's specialization?",
        "faq-doctors-4-answer": "Specializations are listed on our website and at reception.",
        "faq-doctors-5": "Are female doctors available for women's consultations?",
        "faq-doctors-5-answer": "Yes, female doctors are available for all women's consultations.",
        "faq-vaccination-1": "Are vaccines safe for children?",
        "faq-vaccination-1-answer": "Yes, all vaccines administered are safe and approved.",
        "faq-vaccination-2": "Why are vaccines important in refugee camps?",
        "faq-vaccination-2-answer": "Vaccines prevent outbreaks and protect vulnerable populations.",
        "faq-vaccination-3": "Do you offer vaccination for adults as well?",
        "faq-vaccination-3-answer": "Yes, we provide adult vaccinations according to health guidelines.",
        "faq-vaccination-4": "How can I get information about upcoming vaccination programs?",
        "faq-vaccination-4-answer": "Check our website, contact the hospital, or follow our social media for schedules.",
        
        // Page Title
        "page-title": "MahamaCare Hospital"
    },
    rw: {
        // Similar to en, but in Kinyarwanda
        // I'll keep it brief for now, but in full implementation, include all
        "home-nav": "Ahabanza",
        "about-nav": "Abyerekeye",
        "services-nav": "Serivisi",
        "Maternity-nav": "Serivisi z'ububyeyi no kubyara",
        "emergency-nav": "Serivisi z'ibyihutirwa",
        "vaccination-nav": "Guhumurizwa",
        "mentalhealth-nav": "Gushagara ubuzima bwo mu mutwe",
        "chronic-disease-nav": "Serivisi z'uburwayi butatana",
        "health-edu-nav": "Kumenya no kwigisha ku buzima",
        "disability-nav": "Serivisi z'ubumuga",
        "doctors-nav": "Abaganga",
        "contact-nav": "Twandikire",
        "faq-nav": "Ibibazo byinsanganyamatsiko",
        "signup-btn": "Iyandike",
        "login-btn": "Injira",
        "logo-text": "🏥 MCH",
        
        // Hero Section
        "hero-title": "Murakaza neza mu bitaro MahamaCare",
        "hero-subtitle": "Uburyo bwikoranabuhanga mu buvuzi bw'imiryango - booking, kureba ubushobozi bw'imitit, no kubika amakuru y'uburwayi butatana.",
        "learn-more-btn": "Menya byinshi",
        "complain-btn": "Baza ikibazo",
        "emergency-call": "🚨 Emergence: 112",
        "video-not-supported": "Porogaramu yawe ntishobora kwereka video.",
        "video-fallback-text": "Ubuvuzi bwiza ku bose",
        
        // About Section
        "about-title": "Abyerekeye ibitaro MahamaCare",
        "about-paragraph-1": "<strong>Ibitaro MahamaCare</strong> ni icyicaro cya serivisi z'ubuvuzi cyuzuye cyifashishije ubumenyi mpuzamahanga. Dushaka gutanga serivisi z'ubuvuzi zihagije mu mwanya mwiza hamwe n'ingabo, hamwe n'itsinda ry'abaganga bafite ubumenyi n'ibikoresho bya kijyambere. Intego yacu ni ugukemura ubuzima bw'abaganga byongera ubuzima bw'abaganga.",
        "about-paragraph-2": "Turemeye ko ubuzima ari ingaruka nshya kurushaho, niyo mpamvu duhuza ibikoresho bya kijyambere n'ubumenyi bw'abantu kugirango tugere kubuzima bwiza.",
        "hospital-hall-alt": "uruganda rw'ibitaro",
        "medical-staff-alt": "abakozi b'ubuvuzi",
        "modern-clinic-alt": "ibitaro bya kijyambere",
        "patient-care-alt": "kurwara abarwayi",
        
        // Services Section
        "services-title": "Serivisi zacu",
        
        // Contact Section
        "contact-title": "Twandikire",
        "contact-subtitle": "Turimo kugufasha no gusubiza ibibazo byose ushobora kugira. Turateze amatwi kuvuga nawe.",
        "contact-form-title": "Tumere ubutumwa",
        "first-name-label": "Izina ry'umubyeyi",
        "last-name-label": "Izina ry'umuryango",
        "email-label": "Imeyili",
        "phone-label": "Nimero ya terefone",
        "subject-label": "Ingingo",
        "message-label": "Ubutumwa",
        "send-message-btn": "Ohereza ubutumwa",
        "select-subject": "Hitamo ingingo",
        "appointment-option": "Booking",
        "general-inquiry-option": "Kubaza",
        "feedback-option": "Igitekerezo",
        "emergency-option": "Emergence",
        "other-option": "Ibindi",
        "location-title": "Aho tugeze",
        "location-address": "Umuyobozi wa Mahama, Akarere ka Kirehe, u Rwanda",
        "phone-title": "Nimero ya terefone",
        "email-title": "Imeyili",
        "hours-title": "Amasaha yo gukora",
        "emergency-hours": "Serivisi z'emerence 24/7",
        "regular-hours": "Ku wa mbere kugeza ku wa gatandatu: saa 8 z'umugoroba kugeza saa 6 z'umugoroba",
        "emergency-notice-title": "Emergence",
        "emergency-notice-text": "Kugirango ugire ubuvuzi bwa emerence, ujye witabira numero ya terefone ya emerence.",
        "emergency-call-btn": "Emergence: 112",
        
        // Footer
        "footer-hospital-name": "Ibitaro MahamaCare",
        "footer-tagline": "Tugurisha serivisi z'ubuvuzi bwa kijyambere imyaka irenga 20.",
        "quick-links-title": "Amashami",
        "contact-info-title": "Amakuru",
        "follow-us-title": "Dukurikire",
        "copyright": "© 2025 Ibitaro MahamaCare. Amahoro abiriwe.",
        
        // Complaint Modal
        "complaint-title": "Ibibazo by'abakiriya",
        "complaint-subtitle": "Tureba ibitekerezo byanyu kugirango dukure serivisi zacu",
        "new-complaint-tab": "Ikibazo gishya",
        "check-status-tab": "Reba status",
        "complaint-category-label": "Ubwoko bw'ikibazo *",
        "select-category": "Hitamo ubwoko",
        "poor-service": "Serivisi nke",
        "staff-behavior": "Imiterere y'abakozi",
        "facility-issues": "Ibibazo by'ibiraro",
        "billing-issue": "Ikibazo cy'amafaranga",
        "waiting-time": "Gutegereza igihe kirekire",
        "treatment-quality": "Ubwiza bwo kurwara",
        "other-category": "Ibindi",
        "complaint-subject-label": "Ingingo *",
        "complaint-subject-placeholder": "Ibiranga ikibazo cyawe",
        "complaint-details-label": "Iby'ikibazo *",
        "complaint-details-placeholder": "Tanga amakuru y'ikibazo cyawe...",
        "urgent-checkbox": "Shyira nk'ibyihutirwa",
        "reset-form-btn": "Subiza",
        "submit-complaint-btn": "Tanga ikibazo",
        "check-status-title": "Reba status y'ikibazo cyawe",
        "check-status-subtitle": "Andika numero y'ikibazo",
        "reference-number-label": "Numero y'ikibazo",
        "reference-placeholder": "ur. COMP-2023-001",
        "check-status-btn": "Reba status",
        "common-statuses-title": "Status z'ibibazo",
        "status-received": "Yakiriwe",
        "status-received-desc": "Twakiriye ikibazo cyawe kandi turakazikurikirana.",
        "status-in-progress": "Iri gukorwa",
        "status-in-progress-desc": "Ikibazo cyawe kiri gukurikirana n'itsinda ryacu.",
        "status-resolved": "Cyakemuwe",
        "status-resolved-desc": "Ikibazo cyawe cyakemuwe neza.",
        "status-escalated": "Cyashyizwe hejuru",
        "status-escalated-desc": "Ikibazo cyawe cyashyizwe ku mugaragaro k'ubushakashatsi.",
        "complaint-success-title": "Ikibazo cyawe cyakiriwe neza!",
        "complaint-success-ref": "Numero y'ikibazo cyawe ni: ",
        "complaint-success-save": "Bika uyu mubare wo gusubiramo status y'ikibazo cyawe.",
        "complaint-success-time": "Turazasubiza mu masaha 24-48.",
        
        // Signup/Login Modals
        "signup-title": "Fungura konti",
        "password-label": "Ijambobanga",
        "confirm-password-label": "Emeza ijambobanga",
        "terms-agreement": "Nemeranya na ",
        "terms-link": "Amategeko n'amabwiriza",
        "create-account-btn": "Fungura konti",
        "already-have-account": "Ufite konti?",
        "login-link": "Injira",
        "login-title": "Murakaza neza",
        "remember-me": "Nyibutsa",
        "forgot-password": "Wibagiwe ijambobanga?",
        "signin-btn": "Injira",
        "no-account": "Nta konti?",
        "signup-link": "Iyandike",
        "or-continue": "Cyangwa komeza na",
        "google-login": "Google",
        "facebook-login": "Facebook",
        
        // FAQ Modal
        "faq-title": "Ibibazo byinsanganyamatsiko",
        "faq-tab-general": "Byose",
        "faq-tab-emergency": "Emergence",
        "faq-tab-mental": "Ubuzima bwo mu mutwe",
        "faq-tab-chronic": "Uburwayi butatana",
        "faq-tab-disability": "Ubumuga",
        "faq-tab-doctors": "Abaganga",
        "faq-tab-vaccination": "Guhumurizwa",
        "faq-general-1": "Amasaha yanyu yo gukora ni angahe?",
        "faq-general-1-answer": "Dukora 24/7 kuri emergence na 8 AM - 8 PM kuri booking.",
        "faq-general-2": "Nshobora gute gukora booking?",
        "faq-general-2-answer": "Ushobora gukora booking kuri website, kuri terefone, cyangwa kuri reception y'ibitaro.",
        "faq-general-3": "Mwakira inshuwarwa?",
        "faq-general-3-answer": "Yego, dukira inshuwarwa n'ibigo by'inshuwarwa byinshi.",
        "faq-general-4": "Ibitaro biri he?",
        "faq-general-4-answer": "Umuyobozi wa Mahama, Akarere ka Kirehe, u Rwanda. Reba ikarita kuri paje y'itumanaho kugirango ujye.",
        "faq-general-5": "Harimo gutura?",
        "faq-general-5-answer": "Yego, gutura buboneka ku bafite amafaranga n'abashyitsi.",
        "faq-general-6": "Nzananiye iki mu kugera kwambere?",
        "faq-general-6-answer": "Zana ID, amakuru y'inshuwarwa, n'ibyo ufite by'amakuru y'ubuvuzi.",
        "faq-general-7": "Mwatanga serivisi zo kugera mu ngo cyangwa telemedicine?",
        "faq-general-7-answer": "Yego, dutanga byombi kugera mu ngo no kuri terefone.",
        "faq-emergency-1": "Emergence ikora 24/7?",
        "faq-emergency-1-answer": "Yego, serivisi z'emerence ziboneka 24/7.",
        "faq-emergency-2": "Nzakora iki mu kugira emergence?",
        "faq-emergency-2-answer": "Hamagara numero ya emergence cyangwa ujye mu emergence.",
        "faq-emergency-3": "Nkeneye booking kuri emergence?",
        "faq-emergency-3-answer": "Oya, abantu bashobora kugera aho ariho hose kuri emergence.",
        "faq-emergency-4": "Ambulance aboneka?",
        "faq-emergency-4-answer": "Yego, ambulance aboneka kugirango abantu batahura.",
        "faq-emergency-5": "Igihe kingana kogereza mu emergence?",
        "faq-emergency-5-answer": "Igihe kingana kogereza ni 15-30 minute bitewe n'ibibazo.",
        "faq-mental-1": "Mwatanga ubufasha bwo mu mutwe?",
        "faq-mental-1-answer": "Yego, dutanga ubufasha ku bantu benshi.",
        "faq-mental-2": "Serivisi z'ubuzima bwo mu mutwe zihishe?",
        "faq-mental-2-answer": "Yego, serivisi zose z'ubuzima bwo mu mutwe zihishe.",
        "faq-mental-3": "Nshobora kubona ubufasha ku bantu bafite amakuba?",
        "faq-mental-3-answer": "Yego, abaganga bacu batanga ubufasha ku bantu bafite amakuba.",
        "faq-mental-4": "Mwatanga ubufasha ku bantu bafite amakuba?",
        "faq-mental-4-answer": "Yego, dutanga ubufasha ku bantu bafite amakuba n'imiryango yabo.",
        "faq-mental-5": "Nshobora gute gushaka ubufasha ku bantu?",
        "faq-mental-5-answer": "Ushobora gushaka ubufasha kuri service y'ubuzima bwo mu mutwe.",
        "faq-chronic-1": "Ni ubwoko ki bw'uburwayi butatana mushobora gukemura?",
        "faq-chronic-1-answer": "Dukemura indwara z'umusaruro, indwara z'umutima, asthma, n'izindi.",
        "faq-chronic-2": "Ni igihe kingana abafite indwara butatana bagomba kugera?",
        "faq-chronic-2-answer": "Igihe kingana ni 1-3 amezi, bitewe n'ibibazo.",
        "faq-chronic-3": "Mwatanga imiti yo gukurikirana?",
        "faq-chronic-3-answer": "Yego, dutanga imiti yo gukurikirana.",
        "faq-chronic-4": "Harimo itsinda ry'abafite indwara butatana?",
        "faq-chronic-4-answer": "Yego, dufite itsinda ry'abafite indwara butatana.",
        "faq-chronic-5": "Nshobora kubona amakuru y'ubuvuzi bwanjye online?",
        "faq-chronic-5-answer": "Yego, abarwayi bashobora kubona amakuru yabo online.",
        "faq-disability-1": "Mwatanga ubuvuzi bw'umubiri?",
        "faq-disability-1-answer": "Yego, dufite service y'ubuvuzi bw'umubiri.",
        "faq-disability-2": "Ni serivisi ki ziboneka ku bafite ubumuga?",
        "faq-disability-2-answer": "Dutanga ubuvuzi, ibikoresho, ubufasha, n'ubuvuzi bwihariye.",
        "faq-disability-3": "Mwatanga ibikoresho by'ubumuga?",
        "faq-disability-3-answer": "Yego, dutanga ibikoresho by'ubumuga.",
        "faq-disability-4": "Harimo service y'ubana bafite ubumuga?",
        "faq-disability-4-answer": "Yego, dufite service y'ubana bafite ubumuga.",
        "faq-disability-5": "Ibiraro byanyu birashobora kugerwaho n'abafite ubumuga?",
        "faq-disability-5-answer": "Yego, ibiraro byose birashobora kugerwaho.",
        "faq-doctors-1": "Abaganga banyu bafite ubumenyi?",
        "faq-doctors-1-answer": "Yego, abaganga bose bafite ubumenyi.",
        "faq-doctors-2": "Nshobora kuhitamo umuganga?",
        "faq-doctors-2-answer": "Yego, abarwayi bashobora gusaba umuganga.",
        "faq-doctors-3": "Abaganga banyu bavuga indimi?",
        "faq-doctors-3-answer": "Yego, abakozi bacu bavuga Icyongereza, Icyarabu, Kinyarwanda, n'izindi ndimi.",
        "faq-doctors-4": "Nshobora gute kumenya ubumenyi bw'umuganga?",
        "faq-doctors-4-answer": "Ubumenyi buri kuri website n'ubwanyuma.",
        "faq-doctors-5": "Harimo abaganga b'igitsina gore?",
        "faq-doctors-5-answer": "Yego, harimo abaganga b'igitsina gore.",
        "faq-vaccination-1": "Ibiryo by'umwana birashoboka?",
        "faq-vaccination-1-answer": "Yego, ibiryo byose birashoboka.",
        "faq-vaccination-2": "Kuki ibiryo by'umwana bifite agaciro?",
        "faq-vaccination-2-answer": "Ibiryo by'umwana bigabanya indwara.",
        "faq-vaccination-3": "Mwatanga ibiryo ku bantu?",
        "faq-vaccination-3-answer": "Yego, dutanga ibiryo ku bantu.",
        "faq-vaccination-4": "Nshobora gute kubona amakuru y'ibiryo?",
        "faq-vaccination-4-answer": "Reba website, hamagara ibitaro, cyangwa social media.",
        
        // Page Title
        "page-title": "Ibitaro MahamaCare"
    }
};

const Home = () => {
    const [language, setLanguage] = useState(localStorage.getItem('language') || 'en');
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [servicesMenuOpen, setServicesMenuOpen] = useState(false);
    const [faqModalOpen, setFaqModalOpen] = useState(false);
    const [signupModalOpen, setSignupModalOpen] = useState(false);
    const [loginModalOpen, setLoginModalOpen] = useState(false);
    const [complaintModalOpen, setComplaintModalOpen] = useState(false);
    const [activeFaqTab, setActiveFaqTab] = useState('general');
    const [activeComplaintTab, setActiveComplaintTab] = useState('new');
    const [expandedFaq, setExpandedFaq] = useState({});
    const [contactForm, setContactForm] = useState({
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        subject: '',
        message: ''
    });
    const [signupForm, setSignupForm] = useState({
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        password: '',
        confirmPassword: '',
        terms: false
    });
    const [loginForm, setLoginForm] = useState({
        email: '',
        password: '',
        remember: false
    });
    const [complaintForm, setComplaintForm] = useState({
        category: '',
        subject: '',
        description: '',
        urgent: false
    });
    const [complaintReference, setComplaintReference] = useState('');
    const [complaintSuccess, setComplaintSuccess] = useState(false);
    const [complaintReferenceNumber, setComplaintReferenceNumber] = useState('');

    const t = (key) => translations[language][key] || key;

    useEffect(() => {
        // Update document language
        document.documentElement.lang = language;
        localStorage.setItem('language', language);
    }, [language]);

    const handleLanguageChange = (e) => {
        setLanguage(e.target.value);
    };

    const toggleMobileMenu = () => {
        setMobileMenuOpen(!mobileMenuOpen);
    };

    const toggleServicesMenu = () => {
        setServicesMenuOpen(!servicesMenuOpen);
    };

    const openFaqModal = () => {
        setFaqModalOpen(true);
        document.body.style.overflow = 'hidden';
    };

    const closeFaqModal = () => {
        setFaqModalOpen(false);
        document.body.style.overflow = 'auto';
    };

    const openSignupModal = () => {
        setSignupModalOpen(true);
        document.body.style.overflow = 'hidden';
    };

    const closeSignupModal = () => {
        setSignupModalOpen(false);
        document.body.style.overflow = 'auto';
    };

    const openLoginModal = () => {
        setLoginModalOpen(true);
        document.body.style.overflow = 'hidden';
    };

    const closeLoginModal = () => {
        setLoginModalOpen(false);
        document.body.style.overflow = 'auto';
    };

    const openComplaintModal = () => {
        setComplaintModalOpen(true);
        document.body.style.overflow = 'hidden';
    };

    const closeComplaintModal = () => {
        setComplaintModalOpen(false);
        document.body.style.overflow = 'auto';
    };

    const switchToLogin = () => {
        setSignupModalOpen(false);
        setLoginModalOpen(true);
    };

    const switchToSignup = () => {
        setLoginModalOpen(false);
        setSignupModalOpen(true);
    };

    const handleFaqTabChange = (tab) => {
        setActiveFaqTab(tab);
    };

    const handleComplaintTabChange = (tab) => {
        setActiveComplaintTab(tab);
    };

    const toggleFaqItem = (id) => {
        setExpandedFaq(prev => ({
            ...prev,
            [id]: !prev[id]
        }));
    };

    const handleContactFormChange = (e) => {
        setContactForm({
            ...contactForm,
            [e.target.name]: e.target.value
        });
    };

    const handleContactFormSubmit = (e) => {
        e.preventDefault();
        const existingContacts = JSON.parse(localStorage.getItem('contacts')) || [];
        existingContacts.push({
            ...contactForm,
            submittedAt: new Date().toISOString()
        });
        localStorage.setItem('contacts', JSON.stringify(existingContacts));
        setContactForm({
            firstName: '',
            lastName: '',
            email: '',
            phone: '',
            subject: '',
            message: ''
        });
        alert(t('message-sent') || 'Message sent successfully!');
    };

    const handleSignupFormChange = (e) => {
        const { name, value, type, checked } = e.target;
        setSignupForm({
            ...signupForm,
            [name]: type === 'checkbox' ? checked : value
        });
    };

    const handleSignupFormSubmit = (e) => {
        e.preventDefault();
        const existingUsers = JSON.parse(localStorage.getItem('users')) || [];
        existingUsers.push({
            ...signupForm,
            createdAt: new Date().toISOString()
        });
        localStorage.setItem('users', JSON.stringify(existingUsers));
        setSignupForm({
            firstName: '',
            lastName: '',
            email: '',
            phone: '',
            password: '',
            confirmPassword: '',
            terms: false
        });
        closeSignupModal();
    };

    const handleLoginFormChange = (e) => {
        const { name, value, type, checked } = e.target;
        setLoginForm({
            ...loginForm,
            [name]: type === 'checkbox' ? checked : value
        });
    };

    const handleLoginFormSubmit = (e) => {
        e.preventDefault();
        // Simple login logic - in real app, verify with backend
        alert(t('login-success') || 'Login successful!');
        closeLoginModal();
    };

    const handleComplaintFormChange = (e) => {
        const { name, value, type, checked } = e.target;
        setComplaintForm({
            ...complaintForm,
            [name]: type === 'checkbox' ? checked : value
        });
    };

    const handleComplaintFormSubmit = (e) => {
        e.preventDefault();
        const referenceNumber = `COMP-${new Date().getFullYear()}-${String(Math.floor(Math.random() * 1000)).padStart(3, '0')}`;
        setComplaintReferenceNumber(referenceNumber);
        setComplaintSuccess(true);
        setComplaintForm({
            category: '',
            subject: '',
            description: '',
            urgent: false
        });
    };

    const resetComplaintForm = () => {
        setComplaintForm({
            category: '',
            subject: '',
            description: '',
            urgent: false
        });
        setComplaintSuccess(false);
    };

    const checkComplaintStatus = () => {
        // Mock status check
        alert(t('status-checked') || 'Status checked!');
    };

    const servicesData = [
        {
            img: "./img/baby-1531059_1280.webp",
            alt: "Maternity",
            title: t("Maternity-nav"),
            text: "Providing prenatal care, safe deliveries, and postnatal support for mothers and newborns.",
            link: "/Services/Maternity&Brith Services.html"
        },
        {
            img: "./img/emer.webp",
            alt: "Emergency",
            title: t("emergency-nav"),
            text: "Immediate attention for urgent medical conditions with trained staff available 24/7.",
            link: "./Emergency.html"
        },
        {
            img: "./img/vac.webp",
            alt: "Vaccination",
            title: t("vaccination-nav"),
            text: "Regular vaccination campaigns for children and adults to prevent infectious diseases.",
            link: "/Services/veccination.html"
        },
        {
            img: "./img/mentl.webp",
            alt: "Mental Health",
            title: t("mentalhealth-nav"),
            text: "Counseling and support services for mental well-being and trauma recovery.",
            link: "/Services/mentalhealth.html"
        },
        {
            img: "./img/chro.webp",
            alt: "Chronic Care",
            title: t("chronic-disease-nav"),
            text: "Management and monitoring of chronic diseases like diabetes, hypertension, TB, and HIV.",
            link: "/Services/NCD.html"
        },
        {
            img: "/img/awernees.webp",
            alt: "Health Education",
            title: t("health-edu-nav"),
            text: "Educational resources about hygiene, nutrition, pregnancy, child care, and disease prevention.",
            link: "/Services/Health Education.html"
        }
    ];

    return (
        <div className="font-serif text-gray-800 select-none">
            {/* Inline styles for animations */}
            <style jsx>{`
                .faq-answer {
                    max-height: 0;
                    overflow: hidden;
                    transition: max-height 0.3s ease;
                }
                .faq-item.active .faq-answer {
                    max-height: 500px;
                }
                .faq-question::after {
                    content: '+';
                    font-weight: normal;
                }
                .faq-item.active .faq-question::after {
                    content: '-';
                }
                .complaint-modal {
                    animation: modalFadeIn 0.3s ease-out;
                }
                @keyframes modalFadeIn {
                    from { opacity: 0; transform: translateY(-20px); }
                    to { opacity: 1; transform: translateY(0); }
                }
                .complaint-success {
                    animation: successSlide 0.5s ease-out;
                }
                @keyframes successSlide {
                    from { transform: translateX(-100%); opacity: 0; }
                    to { transform: translateX(0); opacity: 1; }
                }
                .complaint-loading {
                    opacity: 0.7;
                    pointer-events: none;
                }
                .status-dot {
                    display: inline-block;
                    width: 10px;
                    height: 10px;
                    border-radius: 50%;
                    margin-right: 8px;
                }
                .status-received { background-color: #3b82f6; }
                .status-in-progress { background-color: #f59e0b; }
                .status-resolved { background-color: #10b981; }
                .status-escalated { background-color: #ef4444; }
            `}</style>

            {/* NAVBAR */}
            <header className="bg-white shadow-md sticky top-0 z-50">
                <div className="container mx-auto px-4">
                    <div className="flex justify-between items-center py-4">
                        {/* Logo */}
                        <div className="flex items-center">
                            <span className="text-2xl font-bold text-blue-600">{t("logo-text")}</span>
                        </div>
                        
                        {/* Mobile menu button */}
                        <button onClick={toggleMobileMenu} className="md:hidden text-gray-600 focus:outline-none">
                            <i className="fas fa-bars text-xl"></i>
                        </button>
                        
                        {/* Navigation Links */}
                        <nav className="hidden md:flex items-center space-x-6">
                            <a href="#home" className="text-gray-700 hover:text-blue-600 transition duration-300">{t("home-nav")}</a>
                            <a href="#about" className="text-gray-700 hover:text-blue-600 transition duration-300">{t("about-nav")}</a>
                            
                            {/* Services Dropdown */}
                            <div className="relative group">
                                <button className="flex items-center text-gray-700 hover:text-blue-600 transition duration-300">
                                    {t("services-nav")} <i className="fas fa-chevron-down ml-1 text-xs"></i>
                                </button>
                                <div className="absolute left-0 mt-2 w-64 bg-white shadow-xl rounded-lg py-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 z-50">
                                    <a href="/Services/Maternity&Brith Services.html" className="block px-4 py-2 text-gray-700 hover:bg-blue-50 hover:text-blue-600">{t("Maternity-nav")}</a>
                                    <a href="/Emergency.html" className="block px-4 py-2 text-gray-700 hover:bg-blue-50 hover:text-blue-600">{t("emergency-nav")}</a>
                                    <a href="/Services/veccination.html" className="block px-4 py-2 text-gray-700 hover:bg-blue-50 hover:text-blue-600">{t("vaccination-nav")}</a>
                                    <a href="/Services/mentalhealth.html" className="block px-4 py-2 text-gray-700 hover:bg-blue-50 hover:text-blue-600">{t("mentalhealth-nav")}</a>
                                    <a href="/Services/NCD.html" className="block px-4 py-2 text-gray-700 hover:bg-blue-50 hover:text-blue-600">{t("chronic-disease-nav")}</a>
                                    <a href="/Services/Health Education.html" className="block px-4 py-2 text-gray-700 hover:bg-blue-50 hover:text-blue-600">{t("health-edu-nav")}</a>
                                    <a href="/Services/Disability.html" className="block px-4 py-2 text-gray-700 hover:bg-blue-50 hover:text-blue-600">{t("disability-nav")}</a>
                                </div>
                            </div>
                            
                            <a href="/doctors.html" className="text-gray-700 hover:text-blue-600 transition duration-300">{t("doctors-nav")}</a>
                            <a href="#contact" className="text-gray-700 hover:text-blue-600 transition duration-300">{t("contact-nav")}</a>
                            <button onClick={openFaqModal} className="text-gray-700 hover:text-blue-600 transition duration-300">{t("faq-nav")}</button>
                        </nav>
                        
                        {/* Actions */}
                        <div className="hidden md:flex items-center space-x-4">
                            <select value={language} onChange={handleLanguageChange} className="border border-gray-300 rounded px-3 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500">
                                <option value="en">English</option>
                                <option value="rw">Kinyarwanda</option>
                            </select>
                            <button onClick={openSignupModal} className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition duration-300">{t("signup-btn")}</button>
                            <button onClick={openLoginModal} className="border border-blue-600 text-blue-600 px-4 py-2 rounded hover:bg-blue-600 hover:text-white transition duration-300">{t("login-btn")}</button>
                        </div>
                    </div>
                    
                    {/* Mobile Menu */}
                    {mobileMenuOpen && (
                        <div className="md:hidden py-4 border-t border-gray-200">
                            <div className="flex flex-col space-y-4">
                                <div className="flex space-x-2">
                                    <button onClick={openSignupModal} className="flex-1 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition duration-300">{t("signup-btn")}</button>
                                    <button onClick={openLoginModal} className="flex-1 border border-blue-600 text-blue-600 px-4 py-2 rounded hover:bg-blue-600 hover:text-white transition duration-300">{t("login-btn")}</button>
                                </div>
                                <a href="#home" className="text-gray-700 hover:text-blue-600">{t("home-nav")}</a>
                                <a href="#about" className="text-gray-700 hover:text-blue-600">{t("about-nav")}</a>
                                
                                {/* Mobile Services Dropdown */}
                                <div className="relative">
                                    <button onClick={toggleServicesMenu} className="flex items-center text-gray-700 hover:text-blue-600 w-full justify-between">
                                        {t("services-nav")} <i className="fas fa-chevron-down"></i>
                                    </button>
                                    {servicesMenuOpen && (
                                        <div className="pl-4 mt-2 space-y-2">
                                            <a href="/Services/Maternity&Brith Services.html" className="block text-gray-700 hover:text-blue-600">{t("Maternity-nav")}</a>
                                            <a href="/Emergency.html" className="block text-gray-700 hover:text-blue-600">{t("emergency-nav")}</a>
                                            <a href="/Services/veccination.html" className="block text-gray-700 hover:text-blue-600">{t("vaccination-nav")}</a>
                                            <a href="/Services/mentalhealth.html" className="block text-gray-700 hover:text-blue-600">{t("mentalhealth-nav")}</a>
                                            <a href="/Services/NCD.html" className="block text-gray-700 hover:text-blue-600">{t("chronic-disease-nav")}</a>
                                            <a href="/Services/Health Education.html" className="block text-gray-700 hover:text-blue-600">{t("health-edu-nav")}</a>
                                            <a href="/Services/Disability.html" className="block text-gray-700 hover:text-blue-600">{t("disability-nav")}</a>
                                        </div>
                                    )}
                                </div>
                                
                                <a href="/doctors.html" className="text-gray-700 hover:text-blue-600">{t("doctors-nav")}</a>
                                <a href="#contact" className="text-gray-700 hover:text-blue-600">{t("contact-nav")}</a>
                                <button onClick={openFaqModal} className="text-gray-700 hover:text-blue-600">{t("faq-nav")}</button>
                                
                                <div className="pt-4 border-t border-gray-200">
                                    <select value={language} onChange={handleLanguageChange} className="w-full border border-gray-300 rounded px-3 py-2 text-sm mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500">
                                        <option value="en">English</option>
                                        <option value="rw">Kinyarwanda</option>
                                    </select>
                                    <div className="flex space-x-2">
                                        <button onClick={openSignupModal} className="flex-1 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition duration-300">{t("signup-btn")}</button>
                                        <button onClick={openLoginModal} className="flex-1 border border-blue-600 text-blue-600 px-4 py-2 rounded hover:bg-blue-600 hover:text-white transition duration-300">{t("login-btn")}</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </header>

            {/* COMPLAINTS POPUP MODAL */}
            {complaintModalOpen && (
                <div className="fixed inset-0 items-center justify-center z-[60] p-4">
                    <div className="absolute inset-0 bg-black/50 backdrop-blur-sm"></div>
                    <div className="complaint-modal relative z-10 w-full max-w-2xl max-h-[90vh] overflow-y-auto bg-white rounded-2xl shadow-2xl">
                        {/* Header Section */}
                        <div className="bg-gradient-to-r from-indigo-600 to-purple-600 p-6 text-white">
                            <div className="flex items-center justify-between">
                                <div>
                                    <h1 className="text-2xl font-bold">{t("complaint-title")}</h1>
                                    <p className="text-indigo-100 mt-1">{t("complaint-subtitle")}</p>
                                </div>
                                <div className="flex items-center space-x-2">
                                    <button onClick={closeComplaintModal} className="text-2xl hover:text-gray-200">&times;</button>
                                </div>
                            </div>
                        </div>
                        
                        {/* Navigation Tabs */}
                        <div className="flex border-b">
                            <button 
                                onClick={() => handleComplaintTabChange('new')}
                                className={`flex-1 py-4 font-medium text-center ${activeComplaintTab === 'new' ? 'bg-indigo-50 text-indigo-700 border-b-2 border-indigo-600' : 'text-gray-500 hover:text-gray-700'}`}
                            >
                                <i className="fas fa-plus-circle mr-2"></i>{t("new-complaint-tab")}
                            </button>
                            <button 
                                onClick={() => handleComplaintTabChange('status')}
                                className={`flex-1 py-4 font-medium text-center ${activeComplaintTab === 'status' ? 'bg-indigo-50 text-indigo-700 border-b-2 border-indigo-600' : 'text-gray-500 hover:text-gray-700'}`}
                            >
                                <i className="fas fa-search mr-2"></i>{t("check-status-tab")}
                            </button>
                        </div>
                        
                        {/* New Complaint Form Section */}
                        {activeComplaintTab === 'new' && (
                            <div className="p-6">
                                <form onSubmit={handleComplaintFormSubmit} className="space-y-5">
                                    <div>
                                        <label htmlFor="complaint-category" className="block text-sm font-medium text-gray-700 mb-1">{t("complaint-category-label")}</label>
                                        <select 
                                            id="complaint-category" 
                                            name="category" 
                                            value={complaintForm.category}
                                            onChange={handleComplaintFormChange}
                                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500" 
                                            required
                                        >
                                            <option value="" disabled>{t("select-category")}</option>
                                            <option value="service">{t("poor-service")}</option>
                                            <option value="staff">{t("staff-behavior")}</option>
                                            <option value="facility">{t("facility-issues")}</option>
                                            <option value="billing">{t("billing-issue")}</option>
                                            <option value="waiting">{t("waiting-time")}</option>
                                            <option value="treatment">{t("treatment-quality")}</option>
                                            <option value="other">{t("other-category")}</option>
                                        </select>
                                    </div>
                                    
                                    <div>
                                        <label htmlFor="complaint-subject" className="block text-sm font-medium text-gray-700 mb-1">{t("complaint-subject-label")}</label>
                                        <input 
                                            type="text" 
                                            id="complaint-subject" 
                                            name="subject" 
                                            value={complaintForm.subject}
                                            onChange={handleComplaintFormChange}
                                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500" 
                                            placeholder={t("complaint-subject-placeholder")}
                                            required
                                        />
                                    </div>
                                    
                                    <div>
                                        <label htmlFor="complaint-description" className="block text-sm font-medium text-gray-700 mb-1">{t("complaint-details-label")}</label>
                                        <textarea 
                                            id="complaint-description" 
                                            name="description" 
                                            rows="4" 
                                            value={complaintForm.description}
                                            onChange={handleComplaintFormChange}
                                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500" 
                                            placeholder={t("complaint-details-placeholder")}
                                            required
                                        ></textarea>
                                    </div>
                                    
                                    <div className="flex items-center">
                                        <input 
                                            type="checkbox" 
                                            id="complaint-urgent" 
                                            name="urgent" 
                                            checked={complaintForm.urgent}
                                            onChange={handleComplaintFormChange}
                                            className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                                        />
                                        <label htmlFor="complaint-urgent" className="ml-2 block text-sm text-gray-700">{t("urgent-checkbox")}</label>
                                    </div>
                                    
                                    <div className="flex justify-between pt-4">
                                        <button type="button" onClick={resetComplaintForm} className="px-5 py-2.5 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors">
                                            <i className="fas fa-redo mr-2"></i>{t("reset-form-btn")}
                                        </button>
                                        <button type="submit" className="px-5 py-2.5 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors flex items-center">
                                            <i className="fas fa-paper-plane mr-2"></i>{t("submit-complaint-btn")}
                                        </button>
                                    </div>
                                </form>
                            </div>
                        )}
                        
                        {/* Check Status Section */}
                        {activeComplaintTab === 'status' && (
                            <div className="p-6">
                                <div className="text-center mb-6">
                                    <h2 className="text-xl font-semibold text-gray-800">{t("check-status-title")}</h2>
                                    <p className="text-gray-600 mt-1">{t("check-status-subtitle")}</p>
                                </div>
                                
                                <div className="max-w-md mx-auto">
                                    <div className="mb-4">
                                        <label htmlFor="complaint-reference" className="block text-sm font-medium text-gray-700 mb-1">{t("reference-number-label")}</label>
                                        <input 
                                            type="text" 
                                            id="complaint-reference" 
                                            name="reference" 
                                            value={complaintReference}
                                            onChange={(e) => setComplaintReference(e.target.value)}
                                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500" 
                                            placeholder={t("reference-placeholder")}
                                        />
                                    </div>
                                    
                                    <button onClick={checkComplaintStatus} className="w-full py-2.5 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors flex items-center justify-center">
                                        <i className="fas fa-search mr-2"></i>{t("check-status-btn")}
                                    </button>
                                </div>
                                
                                <div className="mt-8 border-t pt-6">
                                    <h3 className="text-lg font-medium text-gray-800 mb-3">{t("common-statuses-title")}</h3>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <div className="p-3 bg-blue-50 rounded-lg border border-blue-200">
                                            <div className="flex items-center">
                                                <span className="status-dot status-received"></span>
                                                <span className="font-medium text-blue-800">{t("status-received")}</span>
                                            </div>
                                            <p className="text-sm text-blue-600 mt-1">{t("status-received-desc")}</p>
                                        </div>
                                        <div className="p-3 bg-yellow-50 rounded-lg border border-yellow-200">
                                            <div className="flex items-center">
                                                <span className="status-dot status-in-progress"></span>
                                                <span className="font-medium text-yellow-800">{t("status-in-progress")}</span>
                                            </div>
                                            <p className="text-sm text-yellow-600 mt-1">{t("status-in-progress-desc")}</p>
                                        </div>
                                        <div className="p-3 bg-green-50 rounded-lg border border-green-200">
                                            <div className="flex items-center">
                                                <span className="status-dot status-resolved"></span>
                                                <span className="font-medium text-green-800">{t("status-resolved")}</span>
                                            </div>
                                            <p className="text-sm text-green-600 mt-1">{t("status-resolved-desc")}</p>
                                        </div>
                                        <div className="p-3 bg-red-50 rounded-lg border border-red-200">
                                            <div className="flex items-center">
                                                <span className="status-dot status-escalated"></span>
                                                <span className="font-medium text-red-800">{t("status-escalated")}</span>
                                            </div>
                                            <p className="text-sm text-red-600 mt-1">{t("status-escalated-desc")}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}
                        
                        {/* Success Message Section */}
                        {complaintSuccess && (
                            <div className="p-6 bg-green-50 border-t border-green-200">
                                <div className="flex items-center">
                                    <div className="flex-shrink-0">
                                        <i className="fas fa-check-circle text-green-500 text-2xl"></i>
                                    </div>
                                    <div className="ml-4">
                                        <h3 className="text-green-800 font-medium text-lg">{t("complaint-success-title")}</h3>
                                        <div className="mt-2 text-green-700">
                                            <p>{t("complaint-success-ref")} <span className="font-bold text-xl">{complaintReferenceNumber}</span></p>
                                            <p className="text-sm mt-2">{t("complaint-success-save")}</p>
                                            <p className="text-sm mt-1">{t("complaint-success-time")}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            )}

            {/* Sign Up Modal */}
            {signupModalOpen && (
                <div className="fixed inset-0 items-center justify-center z-50">
                    <div className="absolute inset-0 bg-black/50"></div>
                    <div className="auth-modal relative z-10 w-11/12 sm:max-w-md mx-auto rounded-xl shadow-2xl overflow-hidden">
                        <div className="bg-white p-6 sm:p-8">
                            {/* Header */}
                            <div className="flex justify-between items-center mb-6">
                                <h2 className="text-2xl font-bold text-blue-700">{t("signup-title")}</h2>
                                <button onClick={closeSignupModal} className="text-gray-500 hover:text-gray-700 text-xl">&times;</button>
                            </div>

                            {/* Form */}
                            <form onSubmit={handleSignupFormSubmit} className="space-y-4">
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    <div>
                                        <label htmlFor="signup-firstname" className="block text-sm font-medium text-gray-700 mb-1">{t("first-name-label")}</label>
                                        <input 
                                            type="text" 
                                            id="signup-firstname" 
                                            name="firstName" 
                                            value={signupForm.firstName}
                                            onChange={handleSignupFormChange}
                                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent" 
                                            required
                                        />
                                    </div>
                                    <div>
                                        <label htmlFor="signup-lastname" className="block text-sm font-medium text-gray-700 mb-1">{t("last-name-label")}</label>
                                        <input 
                                            type="text" 
                                            id="signup-lastname" 
                                            name="lastName" 
                                            value={signupForm.lastName}
                                            onChange={handleSignupFormChange}
                                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent" 
                                            required
                                        />
                                    </div>
                                </div>

                                <div>
                                    <label htmlFor="signup-email" className="block text-sm font-medium text-gray-700 mb-1">{t("email-label")}</label>
                                    <input 
                                        type="email" 
                                        id="signup-email" 
                                        name="email" 
                                        value={signupForm.email}
                                        onChange={handleSignupFormChange}
                                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent" 
                                        required
                                    />
                                </div>

                                <div>
                                    <label htmlFor="signup-phone" className="block text-sm font-medium text-gray-700 mb-1">{t("phone-label")}</label>
                                    <input 
                                        type="tel" 
                                        id="signup-phone" 
                                        name="phone" 
                                        value={signupForm.phone}
                                        onChange={handleSignupFormChange}
                                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                    />
                                </div>

                                <div>
                                    <label htmlFor="signup-password" className="block text-sm font-medium text-gray-700 mb-1">{t("password-label")}</label>
                                    <input 
                                        type="password" 
                                        id="signup-password" 
                                        name="password" 
                                        value={signupForm.password}
                                        onChange={handleSignupFormChange}
                                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent" 
                                        required
                                    />
                                </div>

                                <div>
                                    <label htmlFor="signup-confirm-password" className="block text-sm font-medium text-gray-700 mb-1">{t("confirm-password-label")}</label>
                                    <input 
                                        type="password" 
                                        id="signup-confirm-password" 
                                        name="confirmPassword" 
                                        value={signupForm.confirmPassword}
                                        onChange={handleSignupFormChange}
                                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent" 
                                        required
                                    />
                                </div>

                                <div className="flex items-center">
                                    <input 
                                        type="checkbox" 
                                        id="signup-terms" 
                                        name="terms" 
                                        checked={signupForm.terms}
                                        onChange={handleSignupFormChange}
                                        className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded" 
                                        required
                                    />
                                    <label htmlFor="signup-terms" className="ml-2 block text-sm text-gray-700">
                                        {t("terms-agreement")} <a href="#" className="text-blue-600 hover:text-blue-500">{t("terms-link")}</a>
                                    </label>
                                </div>

                                <button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-4 rounded-lg transition duration-300 transform hover:-translate-y-0.5">
                                    {t("create-account-btn")}
                                </button>

                                <div className="text-center text-sm text-gray-600">
                                    {t("already-have-account")} 
                                    <button type="button" onClick={switchToLogin} className="text-blue-600 hover:text-blue-500 font-semibold">{t("login-link")}</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            )}

            {/* Login Modal */}
            {loginModalOpen && (
                <div className="fixed inset-0 items-center justify-center z-50">
                    <div className="absolute inset-0 bg-black/50"></div>
                    <div className="auth-modal relative z-10 w-11/12 sm:max-w-md mx-auto rounded-xl shadow-2xl overflow-hidden">
                        <div className="bg-white p-6 sm:p-8">
                            {/* Header */}
                            <div className="flex justify-between items-center mb-6">
                                <h2 className="text-2xl font-bold text-blue-700">{t("login-title")}</h2>
                                <button onClick={closeLoginModal} className="text-gray-500 hover:text-gray-700 text-xl">&times;</button>
                            </div>

                            {/* Form */}
                            <form onSubmit={handleLoginFormSubmit} className="space-y-4">
                                <div>
                                    <label htmlFor="login-email" className="block text-sm font-medium text-gray-700 mb-1">{t("email-label")}</label>
                                    <input 
                                        type="email" 
                                        id="login-email" 
                                        name="email" 
                                        value={loginForm.email}
                                        onChange={handleLoginFormChange}
                                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent" 
                                        required
                                    />
                                </div>

                                <div>
                                    <label htmlFor="login-password" className="block text-sm font-medium text-gray-700 mb-1">{t("password-label")}</label>
                                    <input 
                                        type="password" 
                                        id="login-password" 
                                        name="password" 
                                        value={loginForm.password}
                                        onChange={handleLoginFormChange}
                                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent" 
                                        required
                                    />
                                </div>

                                <div className="flex items-center justify-between">
                                    <div className="flex items-center">
                                        <input 
                                            type="checkbox" 
                                            id="remember-me" 
                                            name="remember" 
                                            checked={loginForm.remember}
                                            onChange={handleLoginFormChange}
                                            className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                                        />
                                        <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-700">{t("remember-me")}</label>
                                    </div>
                                    <a href="#" className="text-sm text-blue-600 hover:text-blue-500">{t("forgot-password")}</a>
                                </div>

                                <button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-4 rounded-lg transition duration-300 transform hover:-translate-y-0.5">
                                    {t("signin-btn")}
                                </button>

                                <div className="text-center text-sm text-gray-600">
                                    {t("no-account")} 
                                    <button type="button" onClick={switchToSignup} className="text-blue-600 hover:text-blue-500 font-semibold">{t("signup-link")}</button>
                                </div>

                                {/* Social Login */}
                                <div className="mt-6">
                                    <div className="relative">
                                        <div className="absolute inset-0 flex items-center">
                                            <div className="w-full border-t border-gray-300"></div>
                                        </div>
                                        <div className="relative flex justify-center text-sm">
                                            <span className="px-2 bg-white text-gray-500">{t("or-continue")}</span>
                                        </div>
                                    </div>

                                    <div className="mt-4 grid grid-cols-2 gap-3">
                                        <button type="button" className="w-full inline-flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 transition duration-300">
                                            <i className="fab fa-google text-red-500"></i>
                                            <span className="ml-2">{t("google-login")}</span>
                                        </button>
                                        <button type="button" className="w-full inline-flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 transition duration-300">
                                            <i className="fab fa-facebook text-blue-600"></i>
                                            <span className="ml-2">{t("facebook-login")}</span>
                                        </button>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            )}

            {/* HERO SECTION */}
            <section id="home" className="relative h-screen flex items-center justify-center overflow-hidden">
                {/* Video Background */}
                <video className="absolute top-0 left-0 w-full h-full object-cover z-0" autoPlay muted loop playsInline>
                    <source src="/videos/istockphoto-1632593384-640_adpp_is (1).mp4" type="video/mp4" />
                    <span>{t("video-not-supported")}</span>
                </video>
                
                {/* Fallback in case video doesn't load */}
                <div className="absolute top-0 left-0 w-full h-full z-10 flex items-center justify-center">
                    <div className="text-center text-white">
                        <p className="text-xl">{t("video-fallback-text")}</p>
                    </div>
                </div>
                
                {/* Hero Content */}
                <div className="relative z-20 text-center text-white px-4 max-w-4xl">
                    <h1 className="text-4xl md:text-5xl font-bold mb-6">{t("hero-title")}</h1>
                    <p className="text-xl md:text-2xl mb-8">{t("hero-subtitle")}</p>
                    <div className="flex flex-col sm:flex-row justify-center gap-4 mb-8">
                        <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-semibold transition duration-300 transform hover:-translate-y-1">
                            <a href="#services">{t("learn-more-btn")}</a>
                        </button>
                        <button onClick={openComplaintModal} className="border border-white hover:bg-white hover:text-blue-600 text-white px-6 py-3 rounded-lg font-semibold transition duration-300 transform hover:-translate-y-1 text-center">
                            {t("complain-btn")}
                        </button>
                    </div>
                    <div className="bg-red-600/80 inline-block px-6 py-3 rounded-lg hover:bg-red-600 text-white font-bold rounded-xl shadow-lg transition-all duration-300 transform hover:scale-105 animate-emergency-pulse">
                        🚨 {t("emergency-call")}
                    </div>
                </div>
            </section>

            {/* ABOUT SECTION */}
            <section id="about" className="py-16 bg-gray-50">
                <div className="container mx-auto px-4">
                    <div className="flex flex-col lg:flex-row items-start justify-between gap-10">
                        {/* Text Content */}
                        <div className="lg:w-1/2">
                            <h2 className="text-3xl md:text-4xl font-bold text-blue-600 mb-6">{t("about-title")}</h2>
                            <p className="text-gray-700 mb-4 text-lg" dangerouslySetInnerHTML={{__html: t("about-paragraph-1")}}></p>
                            <p className="text-gray-700 text-lg" dangerouslySetInnerHTML={{__html: t("about-paragraph-2")}}></p>
                        </div>
                        
                        {/* Image Gallery */}
                        <div className="lg:w-1/2 grid grid-cols-2 gap-4">
                            <div className="overflow-hidden rounded-xl shadow-lg transition-transform duration-300 hover:-translate-y-2">
                                <img src="./img/vecteezy_team-surgeon-at-work-in-operating-room-group-of-surgeons-in_33656243.webp" alt={t("hospital-hall-alt")} className="w-full h-full object-cover" />
                            </div>
                            <div className="overflow-hidden rounded-xl shadow-lg transition-transform duration-300 hover:-translate-y-2">
                                <img src="./img/vecteezy_a-hospital-room-with-medical-equipment-and-lights_27932654.webp" alt={t("medical-staff-alt")} className="w-full h-full object-cover" />
                            </div>
                            <div className="overflow-hidden rounded-xl shadow-lg transition-transform duration-300 hover:-translate-y-2">
                                <img src="./img/vecteezy_nurse-performing-cpr-for-patient-with-heart-attack-on-bed_8017059.webp" alt={t("modern-clinic-alt")} className="w-full h-full object-cover" />
                            </div>
                            <div className="overflow-hidden rounded-xl shadow-lg transition-transform duration-300 hover:-translate-y-2">
                                <img src="./img/vecteezy_doctor-is-guiding-the-paramedic-team-to-bring-patient-from_8016884.webp" alt={t("patient-care-alt")} className="w-full h-full object-cover" />
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* FAQ Modal */}
            {faqModalOpen && (
                <div className="fixed inset-0 items-center justify-center z-50">
                    <div className="absolute inset-0 bg-black/50"></div>
                    <div className="modal-bg relative z-10 w-11/12 sm:max-w-xl md:max-w-2xl lg:max-w-4xl mx-auto rounded-xl shadow-2xl overflow-hidden">
                        {/* Header */}
                        <div className="flex justify-between items-center p-4 sm:p-6 border-b border-gray-300">
                            <h2 className="text-2xl font-bold text-blue-700">{t("faq-title")}</h2>
                            <button onClick={closeFaqModal} className="text-gray-700 hover:text-gray-900 text-2xl">&times;</button>
                        </div>

                        {/* Tabs */}
                        <div className="flex flex-wrap border-b border-gray-300 bg-white text-sm sm:text-base">
                            <button 
                                onClick={() => handleFaqTabChange('general')}
                                className={`px-4 py-2 font-medium ${activeFaqTab === 'general' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-600 hover:text-blue-600 border-b-2 border-transparent'}`}
                            >
                                {t("faq-tab-general")}
                            </button>
                            <button 
                                onClick={() => handleFaqTabChange('emergency')}
                                className={`px-4 py-2 font-medium ${activeFaqTab === 'emergency' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-600 hover:text-blue-600 border-b-2 border-transparent'}`}
                            >
                                {t("faq-tab-emergency")}
                            </button>
                            <button 
                                onClick={() => handleFaqTabChange('mental')}
                                className={`px-4 py-2 font-medium ${activeFaqTab === 'mental' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-600 hover:text-blue-600 border-b-2 border-transparent'}`}
                            >
                                {t("faq-tab-mental")}
                            </button>
                            <button 
                                onClick={() => handleFaqTabChange('chronic')}
                                className={`px-4 py-2 font-medium ${activeFaqTab === 'chronic' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-600 hover:text-blue-600 border-b-2 border-transparent'}`}
                            >
                                {t("faq-tab-chronic")}
                            </button>
                            <button 
                                onClick={() => handleFaqTabChange('disability')}
                                className={`px-4 py-2 font-medium ${activeFaqTab === 'disability' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-600 hover:text-blue-600 border-b-2 border-transparent'}`}
                            >
                                {t("faq-tab-disability")}
                            </button>
                            <button 
                                onClick={() => handleFaqTabChange('doctors')}
                                className={`px-4 py-2 font-medium ${activeFaqTab === 'doctors' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-600 hover:text-blue-600 border-b-2 border-transparent'}`}
                            >
                                {t("faq-tab-doctors")}
                            </button>
                            <button 
                                onClick={() => handleFaqTabChange('vaccination')}
                                className={`px-4 py-2 font-medium ${activeFaqTab === 'vaccination' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-600 hover:text-blue-600 border-b-2 border-transparent'}`}
                            >
                                {t("faq-tab-vaccination")}
                            </button>
                        </div>

                        {/* Content */}
                        <div className="p-4 sm:p-6 max-h-[80vh] sm:max-h-[70vh] overflow-y-auto space-y-4">
                            {/* General */}
                            {activeFaqTab === 'general' && (
                                <div>
                                    <div className={`faq-item ${expandedFaq['general-1'] ? 'active' : ''}`}>
                                        <button onClick={() => toggleFaqItem('general-1')} className="faq-question w-full text-left py-2 font-semibold flex justify-between items-center">
                                            {t("faq-general-1")}
                                        </button>
                                        <div className="faq-answer pl-4 text-gray-700">{t("faq-general-1-answer")}</div>
                                    </div>
                                    <div className={`faq-item ${expandedFaq['general-2'] ? 'active' : ''}`}>
                                        <button onClick={() => toggleFaqItem('general-2')} className="faq-question w-full text-left py-2 font-semibold flex justify-between items-center">
                                            {t("faq-general-2")}
                                        </button>
                                        <div className="faq-answer pl-4 text-gray-700">{t("faq-general-2-answer")}</div>
                                    </div>
                                    <div className={`faq-item ${expandedFaq['general-3'] ? 'active' : ''}`}>
                                        <button onClick={() => toggleFaqItem('general-3')} className="faq-question w-full text-left py-2 font-semibold flex justify-between items-center">
                                            {t("faq-general-3")}
                                        </button>
                                        <div className="faq-answer pl-4 text-gray-700">{t("faq-general-3-answer")}</div>
                                    </div>
                                    <div className={`faq-item ${expandedFaq['general-4'] ? 'active' : ''}`}>
                                        <button onClick={() => toggleFaqItem('general-4')} className="faq-question w-full text-left py-2 font-semibold flex justify-between items-center">
                                            {t("faq-general-4")}
                                        </button>
                                        <div className="faq-answer pl-4 text-gray-700">{t("faq-general-4-answer")}</div>
                                    </div>
                                    <div className={`faq-item ${expandedFaq['general-5'] ? 'active' : ''}`}>
                                        <button onClick={() => toggleFaqItem('general-5')} className="faq-question w-full text-left py-2 font-semibold flex justify-between items-center">
                                            {t("faq-general-5")}
                                        </button>
                                        <div className="faq-answer pl-4 text-gray-700">{t("faq-general-5-answer")}</div>
                                    </div>
                                    <div className={`faq-item ${expandedFaq['general-6'] ? 'active' : ''}`}>
                                        <button onClick={() => toggleFaqItem('general-6')} className="faq-question w-full text-left py-2 font-semibold flex justify-between items-center">
                                            {t("faq-general-6")}
                                        </button>
                                        <div className="faq-answer pl-4 text-gray-700">{t("faq-general-6-answer")}</div>
                                    </div>
                                    <div className={`faq-item ${expandedFaq['general-7'] ? 'active' : ''}`}>
                                        <button onClick={() => toggleFaqItem('general-7')} className="faq-question w-full text-left py-2 font-semibold flex justify-between items-center">
                                            {t("faq-general-7")}
                                        </button>
                                        <div className="faq-answer pl-4 text-gray-700">{t("faq-general-7-answer")}</div>
                                    </div>
                                </div>
                            )}

                            {/* Emergency */}
                            {activeFaqTab === 'emergency' && (
                                <div>
                                    <div className={`faq-item ${expandedFaq['emergency-1'] ? 'active' : ''}`}>
                                        <button onClick={() => toggleFaqItem('emergency-1')} className="faq-question w-full text-left py-2 font-semibold flex justify-between items-center">
                                            {t("faq-emergency-1")}
                                        </button>
                                        <div className="faq-answer pl-4 text-gray-700">{t("faq-emergency-1-answer")}</div>
                                    </div>
                                    <div className={`faq-item ${expandedFaq['emergency-2'] ? 'active' : ''}`}>
                                        <button onClick={() => toggleFaqItem('emergency-2')} className="faq-question w-full text-left py-2 font-semibold flex justify-between items-center">
                                            {t("faq-emergency-2")}
                                        </button>
                                        <div className="faq-answer pl-4 text-gray-700">{t("faq-emergency-2-answer")}</div>
                                    </div>
                                    <div className={`faq-item ${expandedFaq['emergency-3'] ? 'active' : ''}`}>
                                        <button onClick={() => toggleFaqItem('emergency-3')} className="faq-question w-full text-left py-2 font-semibold flex justify-between items-center">
                                            {t("faq-emergency-3")}
                                        </button>
                                        <div className="faq-answer pl-4 text-gray-700">{t("faq-emergency-3-answer")}</div>
                                    </div>
                                    <div className={`faq-item ${expandedFaq['emergency-4'] ? 'active' : ''}`}>
                                        <button onClick={() => toggleFaqItem('emergency-4')} className="faq-question w-full text-left py-2 font-semibold flex justify-between items-center">
                                            {t("faq-emergency-4")}
                                        </button>
                                        <div className="faq-answer pl-4 text-gray-700">{t("faq-emergency-4-answer")}</div>
                                    </div>
                                    <div className={`faq-item ${expandedFaq['emergency-5'] ? 'active' : ''}`}>
                                        <button onClick={() => toggleFaqItem('emergency-5')} className="faq-question w-full text-left py-2 font-semibold flex justify-between items-center">
                                            {t("faq-emergency-5")}
                                        </button>
                                        <div className="faq-answer pl-4 text-gray-700">{t("faq-emergency-5-answer")}</div>
                                    </div>
                                </div>
                            )}

                            {/* Mental Health */}
                            {activeFaqTab === 'mental' && (
                                <div>
                                    <div className={`faq-item ${expandedFaq['mental-1'] ? 'active' : ''}`}>
                                        <button onClick={() => toggleFaqItem('mental-1')} className="faq-question w-full text-left py-2 font-semibold flex justify-between items-center">
                                            {t("faq-mental-1")}
                                        </button>
                                        <div className="faq-answer pl-4 text-gray-700">{t("faq-mental-1-answer")}</div>
                                    </div>
                                    <div className={`faq-item ${expandedFaq['mental-2'] ? 'active' : ''}`}>
                                        <button onClick={() => toggleFaqItem('mental-2')} className="faq-question w-full text-left py-2 font-semibold flex justify-between items-center">
                                            {t("faq-mental-2")}
                                        </button>
                                        <div className="faq-answer pl-4 text-gray-700">{t("faq-mental-2-answer")}</div>
                                    </div>
                                    <div className={`faq-item ${expandedFaq['mental-3'] ? 'active' : ''}`}>
                                        <button onClick={() => toggleFaqItem('mental-3')} className="faq-question w-full text-left py-2 font-semibold flex justify-between items-center">
                                            {t("faq-mental-3")}
                                        </button>
                                        <div className="faq-answer pl-4 text-gray-700">{t("faq-mental-3-answer")}</div>
                                    </div>
                                    <div className={`faq-item ${expandedFaq['mental-4'] ? 'active' : ''}`}>
                                        <button onClick={() => toggleFaqItem('mental-4')} className="faq-question w-full text-left py-2 font-semibold flex justify-between items-center">
                                            {t("faq-mental-4")}
                                        </button>
                                        <div className="faq-answer pl-4 text-gray-700">{t("faq-mental-4-answer")}</div>
                                    </div>
                                    <div className={`faq-item ${expandedFaq['mental-5'] ? 'active' : ''}`}>
                                        <button onClick={() => toggleFaqItem('mental-5')} className="faq-question w-full text-left py-2 font-semibold flex justify-between items-center">
                                            {t("faq-mental-5")}
                                        </button>
                                        <div className="faq-answer pl-4 text-gray-700">{t("faq-mental-5-answer")}</div>
                                    </div>
                                </div>
                            )}

                            {/* Chronic Diseases */}
                            {activeFaqTab === 'chronic' && (
                                <div>
                                    <div className={`faq-item ${expandedFaq['chronic-1'] ? 'active' : ''}`}>
                                        <button onClick={() => toggleFaqItem('chronic-1')} className="faq-question w-full text-left py-2 font-semibold flex justify-between items-center">
                                            {t("faq-chronic-1")}
                                        </button>
                                        <div className="faq-answer pl-4 text-gray-700">{t("faq-chronic-1-answer")}</div>
                                    </div>
                                    <div className={`faq-item ${expandedFaq['chronic-2'] ? 'active' : ''}`}>
                                        <button onClick={() => toggleFaqItem('chronic-2')} className="faq-question w-full text-left py-2 font-semibold flex justify-between items-center">
                                            {t("faq-chronic-2")}
                                        </button>
                                        <div className="faq-answer pl-4 text-gray-700">{t("faq-chronic-2-answer")}</div>
                                    </div>
                                    <div className={`faq-item ${expandedFaq['chronic-3'] ? 'active' : ''}`}>
                                        <button onClick={() => toggleFaqItem('chronic-3')} className="faq-question w-full text-left py-2 font-semibold flex justify-between items-center">
                                            {t("faq-chronic-3")}
                                        </button>
                                        <div className="faq-answer pl-4 text-gray-700">{t("faq-chronic-3-answer")}</div>
                                    </div>
                                    <div className={`faq-item ${expandedFaq['chronic-4'] ? 'active' : ''}`}>
                                        <button onClick={() => toggleFaqItem('chronic-4')} className="faq-question w-full text-left py-2 font-semibold flex justify-between items-center">
                                            {t("faq-chronic-4")}
                                        </button>
                                        <div className="faq-answer pl-4 text-gray-700">{t("faq-chronic-4-answer")}</div>
                                    </div>
                                    <div className={`faq-item ${expandedFaq['chronic-5'] ? 'active' : ''}`}>
                                        <button onClick={() => toggleFaqItem('chronic-5')} className="faq-question w-full text-left py-2 font-semibold flex justify-between items-center">
                                            {t("faq-chronic-5")}
                                        </button>
                                        <div className="faq-answer pl-4 text-gray-700">{t("faq-chronic-5-answer")}</div>
                                    </div>
                                </div>
                            )}

                            {/* Disability */}
                            {activeFaqTab === 'disability' && (
                                <div>
                                    <div className={`faq-item ${expandedFaq['disability-1'] ? 'active' : ''}`}>
                                        <button onClick={() => toggleFaqItem('disability-1')} className="faq-question w-full text-left py-2 font-semibold flex justify-between items-center">
                                            {t("faq-disability-1")}
                                        </button>
                                        <div className="faq-answer pl-4 text-gray-700">{t("faq-disability-1-answer")}</div>
                                    </div>
                                    <div className={`faq-item ${expandedFaq['disability-2'] ? 'active' : ''}`}>
                                        <button onClick={() => toggleFaqItem('disability-2')} className="faq-question w-full text-left py-2 font-semibold flex justify-between items-center">
                                            {t("faq-disability-2")}
                                        </button>
                                        <div className="faq-answer pl-4 text-gray-700">{t("faq-disability-2-answer")}</div>
                                    </div>
                                    <div className={`faq-item ${expandedFaq['disability-3'] ? 'active' : ''}`}>
                                        <button onClick={() => toggleFaqItem('disability-3')} className="faq-question w-full text-left py-2 font-semibold flex justify-between items-center">
                                            {t("faq-disability-3")}
                                        </button>
                                        <div className="faq-answer pl-4 text-gray-700">{t("faq-disability-3-answer")}</div>
                                    </div>
                                    <div className={`faq-item ${expandedFaq['disability-4'] ? 'active' : ''}`}>
                                        <button onClick={() => toggleFaqItem('disability-4')} className="faq-question w-full text-left py-2 font-semibold flex justify-between items-center">
                                            {t("faq-disability-4")}
                                        </button>
                                        <div className="faq-answer pl-4 text-gray-700">{t("faq-disability-4-answer")}</div>
                                    </div>
                                    <div className={`faq-item ${expandedFaq['disability-5'] ? 'active' : ''}`}>
                                        <button onClick={() => toggleFaqItem('disability-5')} className="faq-question w-full text-left py-2 font-semibold flex justify-between items-center">
                                            {t("faq-disability-5")}
                                        </button>
                                        <div className="faq-answer pl-4 text-gray-700">{t("faq-disability-5-answer")}</div>
                                    </div>
                                </div>
                            )}

                            {/* Doctors */}
                            {activeFaqTab === 'doctors' && (
                                <div>
                                    <div className={`faq-item ${expandedFaq['doctors-1'] ? 'active' : ''}`}>
                                        <button onClick={() => toggleFaqItem('doctors-1')} className="faq-question w-full text-left py-2 font-semibold flex justify-between items-center">
                                            {t("faq-doctors-1")}
                                        </button>
                                        <div className="faq-answer pl-4 text-gray-700">{t("faq-doctors-1-answer")}</div>
                                    </div>
                                    <div className={`faq-item ${expandedFaq['doctors-2'] ? 'active' : ''}`}>
                                        <button onClick={() => toggleFaqItem('doctors-2')} className="faq-question w-full text-left py-2 font-semibold flex justify-between items-center">
                                            {t("faq-doctors-2")}
                                        </button>
                                        <div className="faq-answer pl-4 text-gray-700">{t("faq-doctors-2-answer")}</div>
                                    </div>
                                    <div className={`faq-item ${expandedFaq['doctors-3'] ? 'active' : ''}`}>
                                        <button onClick={() => toggleFaqItem('doctors-3')} className="faq-question w-full text-left py-2 font-semibold flex justify-between items-center">
                                            {t("faq-doctors-3")}
                                        </button>
                                        <div className="faq-answer pl-4 text-gray-700">{t("faq-doctors-3-answer")}</div>
                                    </div>
                                    <div className={`faq-item ${expandedFaq['doctors-4'] ? 'active' : ''}`}>
                                        <button onClick={() => toggleFaqItem('doctors-4')} className="faq-question w-full text-left py-2 font-semibold flex justify-between items-center">
                                            {t("faq-doctors-4")}
                                        </button>
                                        <div className="faq-answer pl-4 text-gray-700">{t("faq-doctors-4-answer")}</div>
                                    </div>
                                    <div className={`faq-item ${expandedFaq['doctors-5'] ? 'active' : ''}`}>
                                        <button onClick={() => toggleFaqItem('doctors-5')} className="faq-question w-full text-left py-2 font-semibold flex justify-between items-center">
                                            {t("faq-doctors-5")}
                                        </button>
                                        <div className="faq-answer pl-4 text-gray-700">{t("faq-doctors-5-answer")}</div>
                                    </div>
                                </div>
                            )}

                            {/* Vaccination */}
                            {activeFaqTab === 'vaccination' && (
                                <div>
                                    <div className={`faq-item ${expandedFaq['vaccination-1'] ? 'active' : ''}`}>
                                        <button onClick={() => toggleFaqItem('vaccination-1')} className="faq-question w-full text-left py-2 font-semibold flex justify-between items-center">
                                            {t("faq-vaccination-1")}
                                        </button>
                                        <div className="faq-answer pl-4 text-gray-700">{t("faq-vaccination-1-answer")}</div>
                                    </div>
                                    <div className={`faq-item ${expandedFaq['vaccination-2'] ? 'active' : ''}`}>
                                        <button onClick={() => toggleFaqItem('vaccination-2')} className="faq-question w-full text-left py-2 font-semibold flex justify-between items-center">
                                            {t("faq-vaccination-2")}
                                        </button>
                                        <div className="faq-answer pl-4 text-gray-700">{t("faq-vaccination-2-answer")}</div>
                                    </div>
                                    <div className={`faq-item ${expandedFaq['vaccination-3'] ? 'active' : ''}`}>
                                        <button onClick={() => toggleFaqItem('vaccination-3')} className="faq-question w-full text-left py-2 font-semibold flex justify-between items-center">
                                            {t("faq-vaccination-3")}
                                        </button>
                                        <div className="faq-answer pl-4 text-gray-700">{t("faq-vaccination-3-answer")}</div>
                                    </div>
                                    <div className={`faq-item ${expandedFaq['vaccination-4'] ? 'active' : ''}`}>
                                        <button onClick={() => toggleFaqItem('vaccination-4')} className="faq-question w-full text-left py-2 font-semibold flex justify-between items-center">
                                            {t("faq-vaccination-4")}
                                        </button>
                                        <div className="faq-answer pl-4 text-gray-700">{t("faq-vaccination-4-answer")}</div>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            )}

            {/* SERVICES SECTION */}
            <section id="services" className="py-16 bg-white">
                <div className="container mx-auto px-4">
                    <h2 className="text-3xl md:text-4xl font-bold text-center text-blue-600 mb-12">
                        {t("services-title")}
                    </h2>

                    {/* Services Cards */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {servicesData.map((service, index) => (
                            <div key={index} className="service-card bg-white rounded-xl shadow-lg p-6 transition-all duration-300 hover:-translate-y-2 hover:shadow-xl">
                                <img src={service.img} alt={service.alt} className="w-full h-48 object-cover rounded-lg mb-4" />
                                <h3 className="text-xl font-bold text-gray-800 mb-2">{service.title}</h3>
                                <p className="text-gray-600 mb-4">{service.text}</p>
                                <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition duration-300">
                                    <a href={service.link}>Learn More</a>
                                </button>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CONTACT SECTION */}
            <section id="contact" className="py-16 bg-gray-50">
                <div className="container mx-auto px-4">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl md:text-4xl font-bold text-blue-600 mb-4">{t("contact-title")}</h2>
                        <p className="text-gray-600 max-w-2xl mx-auto">{t("contact-subtitle")}</p>
                    </div>
                    
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                        {/* Contact Form */}
                        <div className="bg-gray-200 rounded-xl shadow-lg p-8">
                            <h3 className="text-2xl font-bold text-gray-800 mb-6">{t("contact-form-title")}</h3>
                            <form onSubmit={handleContactFormSubmit} className="space-y-6">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div>
                                        <label htmlFor="first-name" className="block text-gray-700 mb-2">{t("first-name-label")}</label>
                                        <input 
                                            type="text" 
                                            id="first-name" 
                                            name="firstName" 
                                            value={contactForm.firstName}
                                            onChange={handleContactFormChange}
                                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" 
                                            required
                                        />
                                    </div>
                                    <div>
                                        <label htmlFor="last-name" className="block text-gray-700 mb-2">{t("last-name-label")}</label>
                                        <input 
                                            type="text" 
                                            id="last-name" 
                                            name="lastName" 
                                            value={contactForm.lastName}
                                            onChange={handleContactFormChange}
                                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" 
                                            required
                                        />
                                    </div>
                                </div>
                                
                                <div>
                                    <label htmlFor="email" className="block text-gray-700 mb-2">{t("email-label")}</label>
                                    <input 
                                        type="email" 
                                        id="email" 
                                        name="email" 
                                        value={contactForm.email}
                                        onChange={handleContactFormChange}
                                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" 
                                        required
                                    />
                                </div>
                                
                                <div>
                                    <label htmlFor="phone" className="block text-gray-700 mb-2">{t("phone-label")}</label>
                                    <input 
                                        type="tel" 
                                        id="phone" 
                                        name="phone" 
                                        value={contactForm.phone}
                                        onChange={handleContactFormChange}
                                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    />
                                </div>
                                
                                <div>
                                    <label htmlFor="subject" className="block text-gray-700 mb-2">{t("subject-label")}</label>
                                    <select 
                                        id="subject" 
                                        name="subject" 
                                        value={contactForm.subject}
                                        onChange={handleContactFormChange}
                                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    >
                                        <option value="">{t("select-subject")}</option>
                                        <option value="appointment">{t("appointment-option")}</option>
                                        <option value="general">{t("general-inquiry-option")}</option>
                                        <option value="feedback">{t("feedback-option")}</option>
                                        <option value="emergency">{t("emergency-option")}</option>
                                        <option value="other">{t("other-option")}</option>
                                    </select>
                                </div>
                                
                                <div>
                                    <label htmlFor="message" className="block text-gray-700 mb-2">{t("message-label")}</label>
                                    <textarea 
                                        id="message" 
                                        name="message" 
                                        rows="5" 
                                        value={contactForm.message}
                                        onChange={handleContactFormChange}
                                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" 
                                        required
                                    ></textarea>
                                </div>
                                
                                <button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg transition duration-300 transform hover:-translate-y-1">
                                    {t("send-message-btn")}
                                </button>
                            </form>
                        </div>
                        
                        {/* Contact Information & Map */}
                        <div className="space-y-8">
                            {/* Contact Info Cards */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="bg-white rounded-xl shadow-lg p-6 flex items-start">
                                    <div className="bg-blue-100 p-3 rounded-lg mr-4">
                                        <i className="fas fa-map-marker-alt text-blue-600 text-xl"></i>
                                    </div>
                                    <div>
                                        <h4 className="font-bold text-gray-800 mb-1">{t("location-title")}</h4>
                                        <p className="text-gray-600">{t("location-address")}</p>
                                    </div>
                                </div>
                                
                                <div className="bg-white rounded-xl shadow-lg p-6 flex items-start">
                                    <div className="bg-blue-100 p-3 rounded-lg mr-4">
                                        <i className="fas fa-phone text-blue-600 text-xl"></i>
                                    </div>
                                    <div>
                                        <h4 className="font-bold text-gray-800 mb-1">{t("phone-title")}</h4>
                                        <p className="text-gray-600">+250 000 000</p>
                                    </div>
                                </div>
                                
                                <div className="bg-white rounded-xl shadow-lg p-6 flex items-start">
                                    <div className="bg-blue-100 p-3 rounded-lg mr-4">
                                        <i className="fas fa-envelope text-blue-600 text-xl"></i>
                                    </div>
                                    <div>
                                        <h4 className="font-bold text-gray-800 mb-1">{t("email-title")}</h4>
                                        <p className="text-gray-600">unitycoders2025@gmail.com</p>
                                    </div>
                                </div>
                                
                                <div className="bg-white rounded-xl shadow-lg p-6 flex items-start">
                                    <div className="bg-blue-100 p-3 rounded-lg mr-4">
                                        <i className="fas fa-clock text-blue-600 text-xl"></i>
                                    </div>
                                    <div>
                                        <h4 className="font-bold text-gray-800 mb-1">{t("hours-title")}</h4>
                                        <p className="text-gray-600">{t("emergency-hours")}</p>
                                        <p className="text-gray-600">{t("regular-hours")}</p>
                                    </div>
                                </div>
                            </div>

                            {/* Google Map for Mahama Refugee Camp */}
                            <div className="bg-white rounded-xl shadow-lg overflow-hidden">
                                <div className="h-96">
                                    <iframe 
                                        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1334.760614585555!2d30.642434783637935!3d-2.2630583877293016!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x19c4c500078c5f45%3A0xc3605c2533855d6b!2sMahama%20refugee%20camp!5e0!3m2!1sen!2sus!4v1762760708457!5m2!1sen!2sus" 
                                        width="100%" 
                                        height="100%" 
                                        style={{border:0}} 
                                        allowFullScreen="" 
                                        loading="lazy" 
                                        referrerPolicy="no-referrer-when-downgrade"
                                        title="Mahamacare Hospital Location at Mahama Refugee Camp"
                                    ></iframe>
                                </div>
                            </div>
                            
                            {/* Emergency Notice */}
                            <div className="bg-red-50 border border-red-200 rounded-xl p-6">
                                <div className="flex items-start">
                                    <i className="fas fa-exclamation-triangle text-red-500 text-xl mt-1 mr-4"></i>
                                    <div>
                                        <h4 className="font-bold text-red-700 mb-2">{t("emergency-notice-title")}</h4>
                                        <p className="text-red-600 mb-2">{t("emergency-notice-text")}</p>
                                        <a href="tel:+250000000" className="inline-block bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-lg transition duration-300">
                                            {t("emergency-call-btn")}
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* FOOTER */}
            <footer className="bg-gray-900 text-white py-12">
                <div className="container mx-auto px-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {/* Column 1 */}
                        <div>
                            <h3 className="text-xl font-bold mb-4">{t("footer-hospital-name")}</h3>
                            <p className="text-gray-400">{t("footer-tagline")}</p>
                        </div>
                        
                        {/* Column 2 */}
                        <div>
                            <h4 className="text-lg font-semibold mb-4">{t("quick-links-title")}</h4>
                            <ul className="space-y-2">
                                <li><a href="#home" className="text-gray-400 hover:text-white transition duration-300">{t("home-nav")}</a></li>
                                <li><a href="#about" className="text-gray-400 hover:text-white transition duration-300">{t("about-nav")}</a></li>
                                <li><a href="#services" className="text-gray-400 hover:text-white transition duration-300">{t("services-nav")}</a></li>
                                <li><a href="/doctors.html" className="text-gray-400 hover:text-white transition duration-300">{t("doctors-nav")}</a></li>
                                <li><button onClick={openFaqModal} className="text-gray-400 hover:text-white transition duration-300">{t("faq-nav")}</button></li>
                                <li><a href="#contact" className="text-gray-400 hover:text-white transition duration-300">{t("contact-nav")}</a></li>
                            </ul>
                        </div>
                        
                        {/* Column 3 */}
                        <div>
                            <h4 className="text-lg font-semibold mb-4">{t("contact-info-title")}</h4>
                            <div className="space-y-2 text-gray-400">
                                <p><i className="fas fa-envelope mr-2"></i> unitycoders2025@gmail.com</p>
                                <p><i className="fas fa-phone mr-2"></i> +250 000 000</p>
                                <p><i className="fas fa-map-marker-alt mr-2"></i> {t("location-address")}</p>
                            </div>
                        </div>
                        
                        {/* Column 4 */}
                        <div>
                            <h4 className="text-lg font-semibold mb-4">{t("follow-us-title")}</h4>
                            <div className="flex space-x-4">
                                <a href="https://www.facebook.com/profile.php?id=61583964942775&mibextid=rS40aB7S9Ucbxw6v" className="text-gray-400 hover:text-white transition duration-300">
                                    <i className="fab fa-facebook-f text-xl"></i>
                                </a>
                                <a href="https://x.com/CodersUnit2026?t=ym3SPxmqVxW3QcuboUGcDg&s=03" className="text-gray-400 hover:text-white transition duration-300">
                                    <i className="fab fa-twitter text-xl"></i>
                                </a>
                                <a href="https://www.instagram.com/unitycoders?utm_source=qr&igsh=aDFjdGUxNWxwNHR3" className="text-gray-400 hover:text-white transition duration-300">
                                    <i className="fab fa-instagram text-xl"></i>
                                </a>
                                <a href="#" className="text-gray-400 hover:text-white transition duration-300">
                                    <i className="fab fa-linkedin-in text-xl"></i>
                                </a>
                            </div>
                        </div>
                    </div>
                    
                    <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-500">
                        <p>{t("copyright")}</p>
                    </div>
                </div>
            </footer>
        </div>
    );
};

export default Home;