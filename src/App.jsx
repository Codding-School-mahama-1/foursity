import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// Pages
import Home from './pages/Home';
import Dashboard from './pages/Dashboard';
import Doctors from './pages/Doctors';
import Emergency from './pages/Emergency';
import LabDash from './pages/LabDash';
import Login from './pages/Login';
import LoginP from './pages/LoginP';
import Pharmacy from './pages/Pharmacy';
import Total from './pages/Total';

// Service Pages
import MaternityService from './pages/services/MaternityService';
import VaccinationService from './pages/services/VaccinationService';
import MentalHealthService from './pages/services/MentalHealthService';
import NCDService from './pages/services/NCDService';
import HealthEducationService from './pages/services/HealthEducationService';
import DisabilityService from './pages/services/DisabilityService';
import EmergencyService from './pages/services/EmergencyService';

function App() {
  return (
    <Router>
      <Routes>
        {/* Main Pages */}
        <Route path="/" element={<Home />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/doctors" element={<Doctors />} />
        <Route path="/emergency" element={<Emergency />} />
        <Route path="/lab-dash" element={<LabDash />} />
        <Route path="/login" element={<Login />} />
        <Route path="/loginp" element={<LoginP />} />
        <Route path="/pharmacy" element={<Pharmacy />} />
        <Route path="/total" element={<Total />} />
        
        {/* Service Routes - Fully Implemented React Components */}
        <Route path="/services/maternity" element={<MaternityService />} />
        <Route path="/services/vaccination" element={<VaccinationService />} />
        <Route path="/services/mental-health" element={<MentalHealthService />} />
        <Route path="/services/ncd" element={<NCDService />} />
        <Route path="/services/health-education" element={<HealthEducationService />} />
        <Route path="/services/disability" element={<DisabilityService />} />
        <Route path="/services/emergency" element={<EmergencyService />} />
      </Routes>
    </Router>
  );
}

export default App;