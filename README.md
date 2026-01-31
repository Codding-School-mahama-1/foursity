# MahamaCare Hospital - React & Node.js Health Management Application

A comprehensive digital health platform built with **React**, **Node.js**, and **Firebase**, designed to provide healthcare services for refugee communities.

## 🏥 Project Structure

```
src/
├── components/
│   └── Layout/
│       ├── Header.jsx          # Shared navigation header
│       └── Footer.jsx          # Shared footer component
├── config/
│   ├── firebase.js             # Firebase configuration
│   └── translations.js         # i18n language translations
├── pages/
│   ├── Home.jsx                # Homepage with hero, services, contact
│   ├── Dashboard.jsx           # User dashboard
│   ├── Doctors.jsx             # Doctors directory
│   ├── Emergency.jsx           # Emergency services page
│   ├── LabDash.jsx             # Lab dashboard
│   ├── Login.jsx               # User login
│   ├── LoginP.jsx              # User registration
│   ├── Pharmacy.jsx            # Pharmacy services
│   ├── Total.jsx               # Total health records
│   └── services/
│       ├── MaternityService.jsx       # Maternity & Birth Services
│       ├── VaccinationService.jsx     # Vaccination Programs
│       ├── MentalHealthService.jsx    # Mental Health Support
│       ├── NCDService.jsx             # Chronic Disease Care
│       ├── HealthEducationService.jsx # Health Education & Awareness
│       ├── DisabilityService.jsx      # Disability Care & Support
│       └── EmergencyService.jsx       # Emergency Medical Services
├── App.jsx                     # Main routing configuration
└── main.jsx                    # React entry point

Dashboard/                      # Legacy dashboard components (to be migrated)
Services/                       # Legacy service HTML files (to be deprecated)
JavaScript-Files/              # Legacy JavaScript files (to be deprecated)
```

## 🚀 Features

### ✅ Core Services (Fully React-Implemented)
- **Maternity & Birth Services** - Prenatal, labor, delivery, and postnatal care
- **Vaccination Programs** - Comprehensive vaccine information and scheduling
- **Mental Health Support** - Counseling, psychiatric care, and crisis intervention
- **Chronic Disease Care** - Management of diabetes, hypertension, asthma, etc.
- **Health Education & Awareness** - Community health education programs
- **Disability Care & Support** - Assessment, rehabilitation, and vocational training
- **Emergency Medical Services** - 24/7 emergency response (Call 112)

### ✅ Additional Features
- User authentication with Firebase
- Doctor directory and appointment booking
- Medicine availability checking
- Lab test dashboard
- Pharmacy services
- Chronic disease records management
- Multi-language support (English, Swahili)

## 📋 Technology Stack

- **Frontend**: React 18+ with Vite
- **Routing**: React Router v6
- **Styling**: Tailwind CSS
- **Backend**: Firebase (Authentication, Realtime Database)
- **Build Tool**: Vite
- **Package Manager**: npm/Node.js

## 🔧 Setup & Installation

### Prerequisites
- Node.js 14+ and npm installed
- Firebase account (already configured)

### Installation Steps

```bash
# 1. Navigate to project directory
cd /home/coding/Videos/foursity

# 2. Install dependencies
npm install

# 3. Start development server
npm run dev

# 4. Build for production
npm run build

# 5. Preview production build
npm preview
```

The app will be available at `http://localhost:5173` (Vite default port)

## 🌐 Firebase Configuration

Firebase is pre-configured for:
- User authentication
- Real-time database for patient records
- Complaint management
- Appointment booking

Configuration located in: `src/config/firebase.js`

## 🗣️ Internationalization (i18n)

The application supports multiple languages:
- **English** (en)
- **Swahili** (sw)

Language configuration: `src/config/translations.js`

## 📱 Responsive Design

All pages are fully responsive and optimized for:
- Mobile devices (320px+)
- Tablets (768px+)
- Desktop (1024px+)

## 🔐 Authentication

User login and registration powered by Firebase:
- Email/password authentication
- Session management
- Protected routes (ready to implement)

## 📞 Emergency Services

**Emergency Hotline**: 112
Available 24/7 for:
- Trauma care
- Acute illness
- Accident response
- Critical medical emergencies

## 🎨 UI/UX Design

- **Color Scheme**: Professional medical colors with accent variations
- **Typography**: Clear, readable fonts
- **Icons**: Font Awesome integration
- **Components**: Reusable, modular design

## 🚀 Performance Optimizations

- ✅ Code splitting with Vite
- ✅ Image optimization ready
- ✅ CSS modules and Tailwind CSS for minimal bundle
- ✅ Lazy loading routes (ready to implement)

## 📝 Migration Status

### ✅ Completed
- All service pages converted to React components
- Header and Footer shared components created
- Routing configuration updated
- Firebase configuration extracted to config files
- Translation system established

### 🔄 To Be Migrated
- Dashboard components (Dashboard/ folder)
- Additional utility components
- Form validation helpers

### 📦 Legacy Files (Can Be Deprecated)
- HTML files in root directory
- HTML files in Services/ folder
- Legacy JavaScript files in JavaScript-Files/

Once migration is complete, these legacy files can be safely removed.

## 🛠️ Development Workflow

```bash
# Start development
npm run dev

# Build production
npm run build

# Preview production build locally
npm preview
```

## 📞 Support

For issues or questions about:
- **Healthcare Services**: Visit the hospital in Mahama Refugee Camp, Kirehe District, Rwanda
- **Technical Issues**: Check the configuration in `src/config/`

## ✨ Future Enhancements

- [ ] Video consultation integration
- [ ] Appointment confirmation via SMS
- [ ] Telemedicine capabilities
- [ ] Advanced patient analytics
- [ ] Mobile app (React Native)
- [ ] PWA offline capabilities

## 📄 License

MahamaCare Hospital Health Management System

---

**Built with ❤️ for the Mahama Refugee Camp Community**
