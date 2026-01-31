import React, { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ErrorBoundary from './components/ErrorBoundary';
import { AuthProvider } from './hooks/useAuth';
import ProtectedRoute from './components/ProtectedRoute';
import LoadingPage from './components/Loading';

// Lazy load pages for better performance
const Home = lazy(() => import('./pages/Home'));
const Dashboard = lazy(() => import('./pages/Dashboard'));
const Doctors = lazy(() => import('./pages/Doctors'));
const Emergency = lazy(() => import('./pages/Emergency'));
const LabDash = lazy(() => import('./pages/LabDash'));
const Login = lazy(() => import('./pages/Login'));
const LoginP = lazy(() => import('./pages/LoginP'));
const Pharmacy = lazy(() => import('./pages/Pharmacy'));
const Total = lazy(() => import('./pages/Total'));

// Service Pages - Lazy loaded
const MaternityService = lazy(() => import('./pages/services/MaternityService'));
const VaccinationService = lazy(() => import('./pages/services/VaccinationService'));
const MentalHealthService = lazy(() => import('./pages/services/MentalHealthService'));
const NCDService = lazy(() => import('./pages/services/NCDService'));
const HealthEducationService = lazy(() => import('./pages/services/HealthEducationService'));
const DisabilityService = lazy(() => import('./pages/services/DisabilityService'));
const EmergencyService = lazy(() => import('./pages/services/EmergencyService'));

function App() {
  return (
    <ErrorBoundary>
      <AuthProvider>
        <Router>
          <Suspense fallback={<LoadingPage message="Loading page..." />}>
            <Routes>
              {/* Public Pages */}
              <Route path="/" element={<Home />} />
              <Route path="/doctors" element={<Doctors />} />
              <Route path="/emergency" element={<Emergency />} />

              {/* Service Routes - Public Access */}
              <Route path="/services/maternity" element={<MaternityService />} />
              <Route path="/services/vaccination" element={<VaccinationService />} />
              <Route path="/services/mental-health" element={<MentalHealthService />} />
              <Route path="/services/ncd" element={<NCDService />} />
              <Route path="/services/health-education" element={<HealthEducationService />} />
              <Route path="/services/disability" element={<DisabilityService />} />
              <Route path="/services/emergency" element={<EmergencyService />} />

              {/* Auth Routes - Redirect if already logged in */}
              <Route
                path="/login"
                element={
                  <ProtectedRoute requireAuth={false}>
                    <Login />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/loginp"
                element={
                  <ProtectedRoute requireAuth={false}>
                    <LoginP />
                  </ProtectedRoute>
                }
              />

              {/* Protected Routes - Require Authentication */}
              <Route
                path="/dashboard"
                element={
                  <ProtectedRoute>
                    <Dashboard />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/lab-dash"
                element={
                  <ProtectedRoute>
                    <LabDash />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/pharmacy"
                element={
                  <ProtectedRoute>
                    <Pharmacy />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/total"
                element={
                  <ProtectedRoute>
                    <Total />
                  </ProtectedRoute>
                }
              />
            </Routes>
          </Suspense>
        </Router>
      </AuthProvider>
    </ErrorBoundary>
  );
}

export default App;