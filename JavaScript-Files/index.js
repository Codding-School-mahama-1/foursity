// Language Configuration
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
        "hero-subtitle": "A practical digital platform for camp healthcare — book appointments, check medicine availability, and keep chronic records.",
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
        "first-name-label": "First Name",
        "last-name-label": "Last Name",
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
        // Navigation
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
        "first-name-label": "Izina ry'umubyeyi",
        "last-name-label": "Izina ry'umuryango",
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
        "faq-doctors-1-answer": "Yego, abaganga bacu bose bafite ubumenyi.",
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

// Language Switching Functionality
let currentLanguage = localStorage.getItem('language') || 'en';

// Function to update all elements with data-i18n attributes
function updateLanguage(lang) {
    // Update current language
    currentLanguage = lang;
    localStorage.setItem('language', lang);
    
    // Update language select dropdown
    const languageSelects = document.querySelectorAll('select[data-i18n="language-select"]');
    languageSelects.forEach(select => {
        select.value = lang;
    });
    
    // Update page title
    const pageTitle = document.querySelector('title[data-i18n="page-title"]');
    if (pageTitle && translations[lang] && translations[lang]['page-title']) {
        pageTitle.textContent = translations[lang]['page-title'];
    }
    
    // Update all elements with data-i18n attributes
    document.querySelectorAll('[data-i18n]').forEach(element => {
        const key = element.getAttribute('data-i18n');
        
        if (translations[lang] && translations[lang][key]) {
            // Handle different element types
            if (element.tagName === 'INPUT' || element.tagName === 'TEXTAREA') {
                // Check if it's a placeholder
                if (element.hasAttribute('data-placeholder')) {
                    element.placeholder = translations[lang][key];
                } else {
                    // Keep the value if it's user input
                    if (element.value === element.defaultValue) {
                        element.value = translations[lang][key];
                    }
                }
            } else if (element.tagName === 'IMG') {
                // Update alt text for images
                if (element.hasAttribute('data-alt')) {
                    element.alt = translations[lang][key];
                }
            } else if (element.tagName === 'OPTION') {
                // Update option text
                element.textContent = translations[lang][key];
            } else if (element.tagName === 'A' && element.hasAttribute('href')) {
                // Keep link text
                element.textContent = translations[lang][key];
            } else {
                // For regular elements, check for HTML content
                if (translations[lang][key].includes('<')) {
                    element.innerHTML = translations[lang][key];
                } else {
                    element.textContent = translations[lang][key];
                }
            }
        }
    });
    
    // Update services cards
    updateServicesCards(lang);
    
    // Update html lang attribute
    document.documentElement.lang = lang;
}

// Function to update service cards based on language
function updateServicesCards(lang) {
    const serviceDataTranslations = {
        en: [
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
        ],
        rw: [
            {
                img: "./img/baby-1531059_1280.webp",
                alt: "Ubyeyi",
                title: "Serivisi z'ububyeyi no kubyara",
                text: "Gutanga ubuvuzi bw'umubyeyi, kubya neza, no gufasha ababyeyi n'abana bashya.",
                link: "./Servscies/Maternity&Brith Servecises.html"
            },
            {
                img: "./img/emer.webp",
                alt: "Emergence",
                title: "Emergence",
                text: "Guhura n'ibyihutirwa biriho 24/7 hamwe n'abakozi bafite ubumenyi.",
                link: "./Emergency.html"
            },
            {
                img: "./img/vac.webp",
                alt: "Guhumurizwa",
                title: "Guhumurizwa",
                text: "Kurwanya indwara zandura ku bana n'abantu.",
                link: "/Servscies/veccination.html"
            },
            {
                img: "./img/mentl.webp",
                alt: "Ubuzima bwo mu mutwe",
                title: "Ubuzima bwo mu mutwe",
                text: "Ubufasha n'ubuvuzi ku bantu bafite amakuba.",
                link: "/Servscies/mentalhealth.html"
            },
            {
                img: "./img/chro.webp",
                alt: "Uburwayi butatana",
                title: "Uburwayi butatana",
                text: "Kurwanya indwara zitandukanye nka diabète, hypertension, TB, na SIDA.",
                link: "/Servscies/NCD.html"
            },
            {
                img: "/img/awernees.webp",
                alt: "Ubumenyi",
                title: "Ubumenyi n'amahugurwa",
                text: "Amahugurwa ku bijyanye n'ubuzima, ibiribwa, ububyeyi, kurera abana, no kurwanya indwara.",
                link: "/Servscies/Health Education.html"
            }
        ]
    };
    
    const services = serviceDataTranslations[lang] || serviceDataTranslations.en;
    const servicesContainer = document.getElementById('services-container');
    
    if (servicesContainer) {
        servicesContainer.innerHTML = services
            .map(service => `
                <div class="service-card bg-white rounded-xl shadow-lg p-6 transition-all duration-300 hover:-translate-y-2 hover:shadow-xl">
                    <img src="${service.img}" alt="${service.alt}" class="w-full h-48 object-cover rounded-lg mb-4">
                    <h3 class="text-xl font-bold text-gray-800 mb-2">${service.title}</h3>
                    <p class="text-gray-600 mb-4">${service.text}</p>
                    <button class="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition duration-300">
                        <a href="${service.link}">${lang === 'rw' ? 'Menya byinshi' : 'Learn More'}</a>
                    </button>
                </div>
            `)
            .join("");
        
        // Reinitialize card animations
        setTimeout(() => {
            const cards = document.querySelectorAll('.service-card');
            revealCards();
            window.addEventListener('scroll', revealCards);
        }, 100);
    }
}

// Initialize language on page load
document.addEventListener('DOMContentLoaded', function() {
    // Set initial language
    updateLanguage(currentLanguage);
    
    // Add event listeners to language selectors
    document.querySelectorAll('select[data-i18n="language-select"]').forEach(select => {
        select.value = currentLanguage;
        select.addEventListener('change', function() {
            updateLanguage(this.value);
        });
    });
    
    // YOUR EXISTING CODE CONTINUES HERE...
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
    if (faqNavLink) faqNavLink.addEventListener('click', (e) => {
        e.preventDefault();
        openFaqModal();
    });

    if (mobileFaqLink) mobileFaqLink.addEventListener('click', (e) => {
        e.preventDefault();
        openFaqModal();
        document.getElementById('mobile-menu').classList.add('hidden');
    });

    if (footerFaqLink) footerFaqLink.addEventListener('click', (e) => {
        e.preventDefault();
        openFaqModal();
    });

    if (faqClose) faqClose.addEventListener('click', closeFaqModal);

    // Close modal when clicking outside
    if (faqModal) faqModal.addEventListener('click', (e) => {
        if (e.target === faqModal) {
            closeFaqModal();
        }
    });

    // Close modal with Escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && faqModal && !faqModal.classList.contains('hidden')) {
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
        if (signupModal) {
            signupModal.classList.remove('hidden');
            document.body.style.overflow = 'hidden';
        }
    }

    // Open Login Modal
    function openLoginModal() {
        if (loginModal) {
            loginModal.classList.remove('hidden');
            document.body.style.overflow = 'hidden';
        }
    }

    // Close Modals
    function closeModals() {
        if (signupModal) signupModal.classList.add('hidden');
        if (loginModal) loginModal.classList.add('hidden');
        document.body.style.overflow = 'auto';
    }

    // Switch between modals
    if (switchToLogin) switchToLogin.addEventListener('click', switchToLoginModal);
    if (switchToSignup) switchToSignup.addEventListener('click', switchToSignupModal);

    // Event Listeners for Auth Modals
    if (signupBtn) signupBtn.addEventListener('click', openSignupModal);
    if (loginBtn) loginBtn.addEventListener('click', openLoginModal);
    
    if (mobileSignupBtn) {
        mobileSignupBtn.addEventListener('click', () => {
            openSignupModal();
            const mobileMenu = document.getElementById('mobile-menu');
            if (mobileMenu) mobileMenu.classList.add('hidden');
        });
    }
    
    if (mobileLoginBtn) {
        mobileLoginBtn.addEventListener('click', () => {
            openLoginModal();
            const mobileMenu = document.getElementById('mobile-menu');
            if (mobileMenu) mobileMenu.classList.add('hidden');
        });
    }
    
    if (signupClose) signupClose.addEventListener('click', closeModals);
    if (loginClose) loginClose.addEventListener('click', closeModals);

    // Close modals when clicking outside
    [signupModal, loginModal].forEach(modal => {
        if (modal) {
            modal.addEventListener('click', (e) => {
                if (e.target === modal) {
                    closeModals();
                }
            });
        }
    });

    // Close modals with Escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            closeModals();
        }
    });

    // Form submissions
    const signupForm = document.getElementById('signup-form');
    if (signupForm) {
        signupForm.addEventListener('submit', (e) => {
            e.preventDefault();
            // Add your signup logic here
            alert(currentLanguage === 'rw' ? 'Ibyo wishyira muri konto biri!' : 'Sign up functionality would be implemented here!');
            closeModals();
        });
    }

    const loginForm = document.getElementById('login-form');
    if (loginForm) {
        loginForm.addEventListener('submit', (e) => {
            e.preventDefault();
            // Add your login logic here
            alert(currentLanguage === 'rw' ? 'Ibyo wishyira muri konto biri!' : 'Login functionality would be implemented here!');
            closeModals();
        });
    }

    const desktopSignupBtn = document.getElementById('desktop-signup-btn');
    if (desktopSignupBtn) desktopSignupBtn.addEventListener('click', openSignupModal);
    
    const desktopLoginBtn = document.getElementById('desktop-login-btn');
    if (desktopLoginBtn) desktopLoginBtn.addEventListener('click', openLoginModal);

    // Add this to your existing script - ONLY saves to localStorage
    if (signupForm) {
        signupForm.addEventListener('submit', (e) => {
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
            signupForm.reset();
        });
    }

    // Contact form localStorage functionality
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
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
            contactForm.reset();
            
            // Show success message
            alert(currentLanguage === 'rw' ? 'Ubutumwa bwawe bwakiriwe!' : 'Your message has been sent!');
        });
    }

    // COMPLAINTS MODAL FUNCTIONALITY
    // Your existing complaint modal code continues here...
    // (All the complaint modal code you provided should be included here)
});

// Make the updateLanguage function available globally for testing
window.updateLanguage = updateLanguage;
window.currentLanguage = currentLanguage;